const getDocumentCount = require('../controllers/countController')
const express = require('express')
const useMiddleware = require("../middleware/useMiddleware");
const router = express.Router();

router.get('/', useMiddleware, getDocumentCount);

module.exports = router;