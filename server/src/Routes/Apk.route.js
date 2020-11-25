const express = require('express');
const router = express.Router();

const ApkController = require('../Controllers/Apk.controller');

//Get a list of all Apks
router.get('/', ApkController.getAllApks);

//Create a new Apk
router.post('/', ApkController.createNewApk);

module.exports = router;