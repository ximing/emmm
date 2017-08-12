import React from 'react';
import {observer,Provider} from 'mobx-react';
import invariant from 'invariant';
export default function initEmmm(createOpts) {
    const {
        defaultHistory,
        setupHistory
    } = createOpts;

    return function emmm(options = {}){
        options = Object.assign({historyFirstCall:true},options);
        const history = options.history || defaultHistory;
        delete options.history;

        const app = {
            //private member variable
            _models: {},
            _router: null,
            _history: null,
            _getProvider: null,
            //public member function
            addModel,
            router,
            start
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
            invariant(typeof router === 'function', 'app.router: router should be function');
            this._router = router;
        }

        function start(container) {
            if (typeof container === 'string') {
                container = document.querySelector(container);
                invariant(container, `app.start: could not query selector: ${container}`);
            }
            invariant(!container || isHTMLElement(container), 'app.start: container should be HTMLElement');
            invariant(this._router, 'app.start: router should be defined');
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
            return val === null || val === (void 0);
        }

        function getProvider(app, router) {
            return extraProps => (
                <Provider {...app._models}>
                    { router({app, history: app._history, ...extraProps}) }
                </Provider>
            );
        }

        function render(container, app, router) {
            const ReactDOM = require('react-dom');
            ReactDOM.render(React.createElement(getProvider(app, router)), container);
        }
        function isHTMLElement(node) {
            return typeof node === 'object' && node !== null && node.nodeType && node.nodeName;
        }
    }
}
