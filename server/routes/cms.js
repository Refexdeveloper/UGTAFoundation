const router = require('express').Router();
const cmsController = require('../controllers/cms');
const auth = require('../middlewares/auth');
const Type = require('../utils/userTypes');

const canEdit = [
  auth.authCheck,
  auth.authAllowTypes([Type.SuperAdmin, Type.Admin, Type.Editor]),
];

// Public site content
router.get('/content', cmsController.listPublic);
router.get('/content/:key', cmsController.getSection);

// Admin CMS
router.get('/cms/sections', ...canEdit, cmsController.listAdmin);
router.put('/cms/sections/:key', ...canEdit, cmsController.upsertSection);

module.exports = router;
