/**
 * Created by yeanzhi on 17/4/12.
 */
'use strict';
import { browserHistory } from '../router';
import initEmmm from './emmm';
export default initEmmm({
    defaultHistory: browserHistory,
    setupHistory(history) {
        this._history = history;
    }
});
