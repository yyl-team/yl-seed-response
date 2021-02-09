/*!
 * yyl-seed-response cjs 0.2.0
 * (c) 2020 - 2021 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class Response {
    constructor() {
        this.resFn = {};
        this.triLog = {};
        this.resFn = {};
        this.triLog = {};
        return this;
    }
    on(eventName, fn) {
        var _a;
        if (!(eventName in this.resFn)) {
            this.resFn[eventName] = [];
        }
        if (typeof fn !== 'function') {
            return this;
        }
        this.resFn[eventName].push(fn);
        if ((_a = this.triLog[eventName]) === null || _a === void 0 ? void 0 : _a.length) {
            this.triLog[eventName].forEach((args) => {
                fn(...args);
            });
        }
        return this;
    }
    trigger(eventName, args) {
        const handleFns = this.resFn[eventName];
        if (handleFns === null || handleFns === void 0 ? void 0 : handleFns.length) {
            handleFns.forEach((fn) => {
                fn(...args);
            });
        }
        if (!this.triLog[eventName]) {
            this.triLog[eventName] = [];
        }
        this.triLog[eventName].push(args);
        if (eventName === 'finished' && this.resFn.finished && this.resFn.finished.length) {
            this.triLog = {};
        }
        return this;
    }
    off(eventName) {
        if (eventName) {
            this.resFn[eventName] = [];
            this.triLog[eventName] = [];
        }
        else {
            this.resFn = {};
            this.triLog = {};
        }
        return this;
    }
}
module.exports = Response;

exports.default = Response;
