/**
 * Created by yeanzhi on 17/4/12.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _router = require('../router');

var _emmm = require('./emmm');

var _emmm2 = _interopRequireDefault(_emmm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _emmm2.default)({
    defaultHistory: _router.browserHistory,
    setupHistory: function setupHistory(history) {
        this._history = history;
    }
});