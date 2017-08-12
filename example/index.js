/**
 * Created by yeanzhi on 17/4/12.
 */
'use strict';
import 'babel-polyfill';
import React, {Component} from "react";
import {observable} from 'mobx';
import {Router, Route} from '../router';
import emmm, {observer,inject} from '../main.js';

import DemoContainer from './DemoContainer';

class Todo {

    namespace = 'todo';

    @observable list = [
        {
            content:'one',
            userName:'yeanzhi'
        }
    ];
};

const todo = new Todo();

const app = emmm({
    debug:true
});
app.addModel(todo);

app.router(({history}) => {
    return (
        <Router history={history}>
            <Route path="/demo.html" component={DemoContainer} />
            <Route path="/demo" component={DemoContainer} />
            <Route path="/" component={DemoContainer} />
        </Router>
    );
});
app.start('#app');
