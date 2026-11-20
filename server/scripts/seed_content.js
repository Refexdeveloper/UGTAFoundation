/**
 * Seed default CMS sections into site_contents.
 *   npm run seed:content
 */
require('dotenv').config();
const { sequelize, SiteContent } = require('../models');
const defaultContent = require('../data/defaultContent');
const cmsController = require('../controllers/cms');
const SECTION_META = cmsController.sectionMeta || {};

async function main() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    for (const [key, content] of Object.entries(defaultContent)) {
      const [row, created] = await SiteContent.findOrCreate({
        where: { section_key: key },
        defaults: {
          section_key: key,
          title: SECTION_META[key] || key,
          content,
          is_active: true,
        },
      });
      if (!created && process.env.FORCE_CONTENT === '1') {
        await row.update({ content, title: SECTION_META[key] || key });
        console.log(`Updated section: ${key}`);
      } else {
        console.log(`${created ? 'Created' : 'Kept'} section: ${key}`);
      }
    }

    await sequelize.close();
    console.log('Content seed complete.');
  } catch (error) {
    console.error('Content seed failed:', error.message);
    process.exit(1);
  }
}

main();
