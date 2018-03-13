/**
 * Created by Joe on 18/03/12.
 */
var express = require('express');
var router = express.Router();
var os = require('os')

require("./schedule/job")
require("./schedule/payhistory")

module.exports = router;