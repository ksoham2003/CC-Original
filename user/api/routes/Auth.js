const express = require('express');
const router = express.Router();

const { register, login, getProducts, getProduct, enrollEvent, checkUserRegistration } = require('../controllers/User');

router.post('/register', register);
router.post('/login', login);
router.get('/get-events', getProducts);
router.post('/get-event', getProduct);
router.post('/book', enrollEvent);
router.post('/check-registration', checkUserRegistration); // New route

module.exports = router;
