const express = require('express');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const { sendContactEmail } = require('../services/email');

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many submissions. Please try again later.',
    emailSent: false,
  },
});

const noHtml = (value) => {
  if (/[<>]|javascript\s*:|on\w+\s*=/i.test(String(value || ''))) {
    throw new Error('HTML tags and script content are not allowed');
  }
  return true;
};

router.post(
  '/contact',
  contactLimiter,
  [
    body('name')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be between 2 and 100 characters')
      .matches(/^[\p{L}\p{M}\s'.-]+$/u)
      .withMessage('Name contains invalid characters')
      .custom(noHtml),
    body('email').trim().isEmail().normalizeEmail().custom(noHtml),
    body('phone')
      .optional({ checkFalsy: true })
      .trim()
      .custom((value) => {
        noHtml(value);
        const digits = String(value).replace(/[^\d+]/g, '');
        if (digits.startsWith('+')) {
          if (!/^\+[1-9]\d{7,14}$/.test(digits)) {
            throw new Error('Please provide a valid phone number');
          }
        } else if (digits && !/^[1-9]\d{7,14}$/.test(digits)) {
          throw new Error('Please provide a valid phone number');
        }
        return true;
      }),
    body('organisation')
      .optional({ checkFalsy: true })
      .trim()
      .isLength({ max: 200 })
      .custom(noHtml),
    body('message')
      .trim()
      .isLength({ min: 10, max: 1000 })
      .withMessage('Message must be between 10 and 1000 characters')
      .custom(noHtml),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const first = errors.array()[0];
      return res.status(400).json({
        success: false,
        message: first?.msg || 'Validation failed',
        field: first?.path,
        emailSent: false,
      });
    }

    try {
      await sendContactEmail({
        ...req.body,
        ipAddress:
          (typeof req.headers['x-forwarded-for'] === 'string'
            ? req.headers['x-forwarded-for'].split(',')[0].trim()
            : null) ||
          req.ip ||
          'Unknown',
      });

      return res.status(200).json({
        success: true,
        message: 'Contact form submitted successfully',
        emailSent: true,
      });
    } catch (err) {
      console.error('Contact form error:', err.message);
      return res.status(500).json({
        success: false,
        message: 'We could not send your message. Please try again later.',
        emailSent: false,
      });
    }
  }
);

module.exports = router;
