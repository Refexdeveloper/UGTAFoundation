const { SiteContent } = require('../models');
const Response = require('../helpers/response');
const defaultContent = require('../data/defaultContent');

const SECTION_META = {
  foundation: 'Foundation details',
  home_hero: 'Home hero',
  mission: 'Mission points',
  values: 'Core values',
  impact: 'Impact statistics',
  programmes: 'Programmes',
  gallery: 'Gallery',
  reports: 'Reports list',
};

exports.listPublic = async (_req, res) => {
  try {
    const rows = await SiteContent.findAll({
      where: { is_active: true },
      order: [['section_key', 'ASC']],
    });

    const payload = { ...defaultContent };
    for (const row of rows) {
      payload[row.section_key] = row.content;
    }

    return res.json({ success: true, data: payload });
  } catch (error) {
    return Response.responseStatus(res, 500, 'Failed to load content', {
      error: error.message,
    });
  }
};

exports.listAdmin = async (_req, res) => {
  try {
    const rows = await SiteContent.findAll({ order: [['section_key', 'ASC']] });
    return Response.responseStatus(res, 200, 'CMS sections fetched', rows);
  } catch (error) {
    return Response.responseStatus(res, 500, 'Failed to load CMS sections', {
      error: error.message,
    });
  }
};

exports.getSection = async (req, res) => {
  try {
    const key = req.params.key;
    const row = await SiteContent.findOne({ where: { section_key: key } });
    if (!row) {
      if (defaultContent[key] !== undefined) {
        return Response.responseStatus(res, 200, 'Default section', {
          section_key: key,
          title: SECTION_META[key] || key,
          content: defaultContent[key],
          is_active: true,
        });
      }
      return Response.responseStatus(res, 404, 'Section not found');
    }
    return Response.responseStatus(res, 200, 'Section fetched', row);
  } catch (error) {
    return Response.responseStatus(res, 500, 'Failed to load section', {
      error: error.message,
    });
  }
};

exports.upsertSection = async (req, res) => {
  try {
    const key = req.params.key;
    const { content, title, is_active = true } = req.body;

    if (content === undefined) {
      return Response.responseStatus(res, 400, 'content is required');
    }

    let parsed = content;
    if (typeof content === 'string') {
      try {
        parsed = JSON.parse(content);
      } catch {
        return Response.responseStatus(res, 400, 'content must be valid JSON');
      }
    }

    const [row, created] = await SiteContent.findOrCreate({
      where: { section_key: key },
      defaults: {
        section_key: key,
        title: title || SECTION_META[key] || key,
        content: parsed,
        is_active: Boolean(is_active),
        updated_by: req.user?.id || null,
      },
    });

    if (!created) {
      await row.update({
        content: parsed,
        title: title || row.title || SECTION_META[key] || key,
        is_active: Boolean(is_active),
        updated_by: req.user?.id || null,
      });
    }

    await row.reload();
    return Response.responseStatus(res, 200, 'Section saved', row);
  } catch (error) {
    return Response.responseStatus(res, 500, 'Failed to save section', {
      error: error.message,
    });
  }
};

exports.sectionMeta = SECTION_META;
