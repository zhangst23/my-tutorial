/*
* @Author: dmyang
* @Date:   2015-08-05 00:35:47
* @Last Modified by:   dmyang
* @Last Modified time: 2015-09-14 14:55:52
*/

'use strict';

console.info('require page b.');

require('commonCss');
require('../css/b.css');

require('zepto');

// 直接使用npm模块
var _ = require('lodash');

var report = require('./helpers/report');
var bar = require('./helpers/bar');
