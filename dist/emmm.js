'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = initEmmm;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobxReact = require('mobx-react');

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initEmmm(createOpts) {
    var defaultHistory = createOpts.defaultHistory,
        setupHistory = createOpts.setupHistory;


    return function emmm() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        options = Object.assign({ historyFirstCall: true }, options);
        var history = options.history || defaultHistory;
        delete options.history;

        var app = {
            //private member variable
            _models: {},
            _router: null,
            _history: null,
            _getProvider: null,
            //public member function
            addModel: addModel,
            router: router,
            start: start
        };
        return app;

        /**
         * Register a model.
         *
         * @param model
         */
        function addModel(model) {
            this._models[model.namespace] = model;
        }

        /**
         * Config router. Takes a function with arguments { history, dispatch },
         * and expects router config. It use the same api as react-router,
         * return jsx elements or JavaScript Object for dynamic routing.
         *
         * @param router
         */
        function router(router) {
            (0, _invariant2.default)(typeof router === 'function', 'app.router: router should be function');
            this._router = router;
        }

        function start(container) {
            if (typeof container === 'string') {
                container = document.querySelector(container);
                (0, _invariant2.default)(container, 'app.start: could not query selector: ' + container);
            }
            (0, _invariant2.default)(!container || isHTMLElement(container), 'app.start: container should be HTMLElement');
            (0, _invariant2.default)(this._router, 'app.start: router should be defined');
            if (setupHistory) {
                setupHistory.call(this, history);
            }
            // If has container, render; else, return react component
            if (container) {
                render(container, this, this._router);
            } else {
                return getProvider(this, this._router);
            }
        }

        function isEmpty(val) {
            return val === null || val === void 0;
        }

        function getProvider(app, router) {
            return function (extraProps) {
                return _react2.default.createElement(
                    _mobxReact.Provider,
                    app._models,
                    router(_extends({ app: app, history: app._history }, extraProps))
                );
            };
        }

        function render(container, app, router) {
            var ReactDOM = require('react-dom');
            ReactDOM.render(_react2.default.createElement(getProvider(app, router)), container);
        }
        function isHTMLElement(node) {
            return (typeof node === 'undefined' ? 'undefined' : _typeof(node)) === 'object' && node !== null && node.nodeType && node.nodeName;
        }
    };
}