const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  standardHeaders: true,
  legacyHeaders: false,
  // Skip rate limiting in development to avoid throttling local testing.
  skip: (req) => process.env.NODE_ENV === 'development',
  message: { success: false, message: 'Too many requests, please try again later' }
});
