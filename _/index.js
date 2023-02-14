/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tasks_startUp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks/startUp */ "./src/tasks/startUp.ts");

await (0,_tasks_startUp__WEBPACK_IMPORTED_MODULE_0__.startUp)();

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),

/***/ "./src/manager/StorageManager.ts":
/*!***************************************!*\
  !*** ./src/manager/StorageManager.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StorageManager": () => (/* binding */ StorageManager),
/* harmony export */   "persistedProgressKey": () => (/* binding */ persistedProgressKey)
/* harmony export */ });
const persistedProgressKey = "persistedProgress";
class StorageManager {
    static prefix = "kelsny.mmnm:";
    static storage = typeof window !== "undefined"
        ? window.localStorage
        : ({
            clear() { },
            getItem: () => null,
            key: () => null,
            length: 0,
            removeItem() { },
            setItem() { },
        });
    static set(key, value) {
        this.storage.setItem(this.prefix + key, JSON.stringify(value));
        return value;
    }
    static get(key) {
        return JSON.parse(this.storage.getItem(this.prefix + key)) ?? undefined;
    }
    static has(key) {
        return this.storage.getItem(this.prefix + key) !== null;
    }
    static delete(key) {
        if (this.storage.getItem(this.prefix + key) === null)
            return false;
        this.storage.removeItem(this.prefix + key);
        return true;
    }
}


/***/ }),

/***/ "./src/tasks/startUp.ts":
/*!******************************!*\
  !*** ./src/tasks/startUp.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startUp": () => (/* binding */ startUp)
/* harmony export */ });
/* harmony import */ var _manager_StorageManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../manager/StorageManager */ "./src/manager/StorageManager.ts");
/* harmony import */ var _utils_waitForClick__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/waitForClick */ "./src/utils/waitForClick.ts");


function hideGenderSelection() {
    document.querySelector(".choose-gender-container").classList.add("choose-gender-done");
}
async function startUp() {
    const progress = _manager_StorageManager__WEBPACK_IMPORTED_MODULE_0__.StorageManager.get(_manager_StorageManager__WEBPACK_IMPORTED_MODULE_0__.persistedProgressKey);
    if (!progress) {
        const [chooseBoy, chooseGirl] = Array.from(document.querySelectorAll(".choose-gender-card"));
        const choice = await (0,_utils_waitForClick__WEBPACK_IMPORTED_MODULE_1__.waitForClick)(chooseBoy, chooseGirl);
        hideGenderSelection();
        _manager_StorageManager__WEBPACK_IMPORTED_MODULE_0__.StorageManager.set(_manager_StorageManager__WEBPACK_IMPORTED_MODULE_0__.persistedProgressKey, {
            gender: choice === chooseBoy ? "boy" : "girl",
        });
    }
    else {
        hideGenderSelection();
        // load skin info
    }
}


/***/ }),

/***/ "./src/utils/waitForClick.ts":
/*!***********************************!*\
  !*** ./src/utils/waitForClick.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "waitForClick": () => (/* binding */ waitForClick),
/* harmony export */   "waitForClickRejectOnTimeout": () => (/* binding */ waitForClickRejectOnTimeout),
/* harmony export */   "waitForClickWithTimeout": () => (/* binding */ waitForClickWithTimeout)
/* harmony export */ });
async function waitForClick(...elements) {
    return Promise.race(elements.map((element) => new Promise((resolve) => {
        const controller = new AbortController();
        return element.addEventListener("click", () => {
            controller.abort();
            return resolve(element);
        }, { signal: controller.signal });
    })));
}
async function waitForClickWithTimeout(...args) {
    const elements = args.slice(0, -1);
    const timeout = args.at(-1);
    return Promise.race(elements.map((element) => new Promise((resolve) => {
        const controller = new AbortController();
        setTimeout(() => {
            controller.abort();
            return resolve(undefined);
        }, timeout);
        return element.addEventListener("click", () => {
            controller.abort();
            return resolve(element);
        }, { signal: controller.signal });
    })));
}
async function waitForClickRejectOnTimeout(...args) {
    const elements = args.slice(0, -1);
    const timeout = args.at(-1);
    return Promise.race(elements.map((element) => new Promise((resolve, reject) => {
        const controller = new AbortController();
        setTimeout(() => {
            controller.abort();
            return reject();
        }, timeout);
        return element.addEventListener("click", () => {
            controller.abort();
            return resolve(element);
        }, { signal: controller.signal });
    })));
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && !queue.d) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = 1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsSUFBSTtXQUNKO1dBQ0E7V0FDQSxJQUFJO1dBQ0o7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsQ0FBQztXQUNEO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFQUFFO1dBQ0Y7V0FDQSxzR0FBc0c7V0FDdEc7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBLEVBQUU7V0FDRjtXQUNBOzs7OztXQ2hFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL0BrZWxzbnkvbW1ubS8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9Aa2Vsc255L21tbm0vLi9zcmMvbWFuYWdlci9TdG9yYWdlTWFuYWdlci50cyIsIndlYnBhY2s6Ly9Aa2Vsc255L21tbm0vLi9zcmMvdGFza3Mvc3RhcnRVcC50cyIsIndlYnBhY2s6Ly9Aa2Vsc255L21tbm0vLi9zcmMvdXRpbHMvd2FpdEZvckNsaWNrLnRzIiwid2VicGFjazovL0BrZWxzbnkvbW1ubS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Aa2Vsc255L21tbm0vd2VicGFjay9ydW50aW1lL2FzeW5jIG1vZHVsZSIsIndlYnBhY2s6Ly9Aa2Vsc255L21tbm0vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0BrZWxzbnkvbW1ubS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0BrZWxzbnkvbW1ubS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0BrZWxzbnkvbW1ubS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL0BrZWxzbnkvbW1ubS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vQGtlbHNueS9tbW5tL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzdGFydFVwIH0gZnJvbSBcIi4vdGFza3Mvc3RhcnRVcFwiO1xuXG5hd2FpdCBzdGFydFVwKCk7XG4iLCJleHBvcnQgY29uc3QgcGVyc2lzdGVkUHJvZ3Jlc3NLZXkgPSBcInBlcnNpc3RlZFByb2dyZXNzXCI7XG5cbmV4cG9ydCBjbGFzcyBTdG9yYWdlTWFuYWdlciB7XG4gICAgc3RhdGljIHJlYWRvbmx5IHByZWZpeCA9IFwia2Vsc255Lm1tbm06XCI7XG5cbiAgICBzdGF0aWMgcmVhZG9ubHkgc3RvcmFnZSA9XG4gICAgICAgIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCJcbiAgICAgICAgICAgID8gd2luZG93LmxvY2FsU3RvcmFnZVxuICAgICAgICAgICAgOiAoe1xuICAgICAgICAgICAgICAgICAgY2xlYXIoKSB7fSxcbiAgICAgICAgICAgICAgICAgIGdldEl0ZW06ICgpID0+IG51bGwsXG4gICAgICAgICAgICAgICAgICBrZXk6ICgpID0+IG51bGwsXG4gICAgICAgICAgICAgICAgICBsZW5ndGg6IDAsXG4gICAgICAgICAgICAgICAgICByZW1vdmVJdGVtKCkge30sXG4gICAgICAgICAgICAgICAgICBzZXRJdGVtKCkge30sXG4gICAgICAgICAgICAgIH0gc2F0aXNmaWVzIFN0b3JhZ2UpO1xuXG4gICAgc3RhdGljIHNldDxUPihrZXk6IHN0cmluZywgdmFsdWU6IFQpOiBUIHtcbiAgICAgICAgdGhpcy5zdG9yYWdlLnNldEl0ZW0odGhpcy5wcmVmaXggKyBrZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQ8VD4oa2V5OiBzdHJpbmcpOiBUIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodGhpcy5zdG9yYWdlLmdldEl0ZW0odGhpcy5wcmVmaXggKyBrZXkpISkgPz8gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHN0YXRpYyBoYXMoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXRJdGVtKHRoaXMucHJlZml4ICsga2V5KSAhPT0gbnVsbDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVsZXRlKGtleTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLnN0b3JhZ2UuZ2V0SXRlbSh0aGlzLnByZWZpeCArIGtleSkgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICAgICAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLnByZWZpeCArIGtleSk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgcGVyc2lzdGVkUHJvZ3Jlc3NLZXksIFN0b3JhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uL21hbmFnZXIvU3RvcmFnZU1hbmFnZXJcIjtcbmltcG9ydCB0eXBlIHsgU2tpbkluZm8gfSBmcm9tIFwiLi4vdHlwZXNcIjtcbmltcG9ydCB7IHdhaXRGb3JDbGljayB9IGZyb20gXCIuLi91dGlscy93YWl0Rm9yQ2xpY2tcIjtcblxuZnVuY3Rpb24gaGlkZUdlbmRlclNlbGVjdGlvbigpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNob29zZS1nZW5kZXItY29udGFpbmVyXCIpIS5jbGFzc0xpc3QuYWRkKFwiY2hvb3NlLWdlbmRlci1kb25lXCIpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3RhcnRVcCgpIHtcbiAgICBjb25zdCBwcm9ncmVzcyA9IFN0b3JhZ2VNYW5hZ2VyLmdldDxTa2luSW5mbz4ocGVyc2lzdGVkUHJvZ3Jlc3NLZXkpO1xuXG4gICAgaWYgKCFwcm9ncmVzcykge1xuICAgICAgICBjb25zdCBbY2hvb3NlQm95LCBjaG9vc2VHaXJsXSA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jaG9vc2UtZ2VuZGVyLWNhcmRcIikpO1xuXG4gICAgICAgIGNvbnN0IGNob2ljZSA9IGF3YWl0IHdhaXRGb3JDbGljayhjaG9vc2VCb3ksIGNob29zZUdpcmwpO1xuXG4gICAgICAgIGhpZGVHZW5kZXJTZWxlY3Rpb24oKTtcblxuICAgICAgICBTdG9yYWdlTWFuYWdlci5zZXQocGVyc2lzdGVkUHJvZ3Jlc3NLZXksIHtcbiAgICAgICAgICAgIGdlbmRlcjogY2hvaWNlID09PSBjaG9vc2VCb3kgPyBcImJveVwiIDogXCJnaXJsXCIsXG4gICAgICAgIH0gc2F0aXNmaWVzIFNraW5JbmZvKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBoaWRlR2VuZGVyU2VsZWN0aW9uKCk7XG5cbiAgICAgICAgLy8gbG9hZCBza2luIGluZm9cbiAgICB9XG59XG4iLCJleHBvcnQgYXN5bmMgZnVuY3Rpb24gd2FpdEZvckNsaWNrPEUgZXh0ZW5kcyBFbGVtZW50PiguLi5lbGVtZW50czogRVtdKTogUHJvbWlzZTxFPiB7XG4gICAgcmV0dXJuIFByb21pc2UucmFjZShcbiAgICAgICAgZWxlbWVudHMubWFwKFxuICAgICAgICAgICAgKGVsZW1lbnQpID0+XG4gICAgICAgICAgICAgICAgbmV3IFByb21pc2U8RT4oKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuYWJvcnQoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCB9LFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICApLFxuICAgICk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB3YWl0Rm9yQ2xpY2tXaXRoVGltZW91dDxFIGV4dGVuZHMgRWxlbWVudD4oLi4uYXJnczogWy4uLkVbXSwgbnVtYmVyXSk6IFByb21pc2U8RSB8IHVuZGVmaW5lZD4ge1xuICAgIGNvbnN0IGVsZW1lbnRzID0gYXJncy5zbGljZSgwLCAtMSkgYXMgRVtdO1xuICAgIGNvbnN0IHRpbWVvdXQgPSBhcmdzLmF0KC0xKSBhcyBudW1iZXI7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yYWNlKFxuICAgICAgICBlbGVtZW50cy5tYXAoXG4gICAgICAgICAgICAoZWxlbWVudCkgPT5cbiAgICAgICAgICAgICAgICBuZXcgUHJvbWlzZTxFIHwgdW5kZWZpbmVkPigocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlci5hYm9ydCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgICB9LCB0aW1lb3V0KTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuYWJvcnQoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCB9LFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICApLFxuICAgICk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB3YWl0Rm9yQ2xpY2tSZWplY3RPblRpbWVvdXQ8RSBleHRlbmRzIEVsZW1lbnQ+KC4uLmFyZ3M6IFsuLi5FW10sIG51bWJlcl0pOiBQcm9taXNlPEU+IHtcbiAgICBjb25zdCBlbGVtZW50cyA9IGFyZ3Muc2xpY2UoMCwgLTEpIGFzIEVbXTtcbiAgICBjb25zdCB0aW1lb3V0ID0gYXJncy5hdCgtMSkgYXMgbnVtYmVyO1xuXG4gICAgcmV0dXJuIFByb21pc2UucmFjZShcbiAgICAgICAgZWxlbWVudHMubWFwKFxuICAgICAgICAgICAgKGVsZW1lbnQpID0+XG4gICAgICAgICAgICAgICAgbmV3IFByb21pc2U8RT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlci5hYm9ydCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlci5hYm9ydCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsIH0sXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICksXG4gICAgKTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJ2YXIgd2VicGFja1F1ZXVlcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgcXVldWVzXCIpIDogXCJfX3dlYnBhY2tfcXVldWVzX19cIjtcbnZhciB3ZWJwYWNrRXhwb3J0cyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgZXhwb3J0c1wiKSA6IFwiX193ZWJwYWNrX2V4cG9ydHNfX1wiO1xudmFyIHdlYnBhY2tFcnJvciA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgZXJyb3JcIikgOiBcIl9fd2VicGFja19lcnJvcl9fXCI7XG52YXIgcmVzb2x2ZVF1ZXVlID0gKHF1ZXVlKSA9PiB7XG5cdGlmKHF1ZXVlICYmICFxdWV1ZS5kKSB7XG5cdFx0cXVldWUuZCA9IDE7XG5cdFx0cXVldWUuZm9yRWFjaCgoZm4pID0+IChmbi5yLS0pKTtcblx0XHRxdWV1ZS5mb3JFYWNoKChmbikgPT4gKGZuLnItLSA/IGZuLnIrKyA6IGZuKCkpKTtcblx0fVxufVxudmFyIHdyYXBEZXBzID0gKGRlcHMpID0+IChkZXBzLm1hcCgoZGVwKSA9PiB7XG5cdGlmKGRlcCAhPT0gbnVsbCAmJiB0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKSB7XG5cdFx0aWYoZGVwW3dlYnBhY2tRdWV1ZXNdKSByZXR1cm4gZGVwO1xuXHRcdGlmKGRlcC50aGVuKSB7XG5cdFx0XHR2YXIgcXVldWUgPSBbXTtcblx0XHRcdHF1ZXVlLmQgPSAwO1xuXHRcdFx0ZGVwLnRoZW4oKHIpID0+IHtcblx0XHRcdFx0b2JqW3dlYnBhY2tFeHBvcnRzXSA9IHI7XG5cdFx0XHRcdHJlc29sdmVRdWV1ZShxdWV1ZSk7XG5cdFx0XHR9LCAoZSkgPT4ge1xuXHRcdFx0XHRvYmpbd2VicGFja0Vycm9yXSA9IGU7XG5cdFx0XHRcdHJlc29sdmVRdWV1ZShxdWV1ZSk7XG5cdFx0XHR9KTtcblx0XHRcdHZhciBvYmogPSB7fTtcblx0XHRcdG9ialt3ZWJwYWNrUXVldWVzXSA9IChmbikgPT4gKGZuKHF1ZXVlKSk7XG5cdFx0XHRyZXR1cm4gb2JqO1xuXHRcdH1cblx0fVxuXHR2YXIgcmV0ID0ge307XG5cdHJldFt3ZWJwYWNrUXVldWVzXSA9IHggPT4ge307XG5cdHJldFt3ZWJwYWNrRXhwb3J0c10gPSBkZXA7XG5cdHJldHVybiByZXQ7XG59KSk7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmEgPSAobW9kdWxlLCBib2R5LCBoYXNBd2FpdCkgPT4ge1xuXHR2YXIgcXVldWU7XG5cdGhhc0F3YWl0ICYmICgocXVldWUgPSBbXSkuZCA9IDEpO1xuXHR2YXIgZGVwUXVldWVzID0gbmV3IFNldCgpO1xuXHR2YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzO1xuXHR2YXIgY3VycmVudERlcHM7XG5cdHZhciBvdXRlclJlc29sdmU7XG5cdHZhciByZWplY3Q7XG5cdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlaikgPT4ge1xuXHRcdHJlamVjdCA9IHJlajtcblx0XHRvdXRlclJlc29sdmUgPSByZXNvbHZlO1xuXHR9KTtcblx0cHJvbWlzZVt3ZWJwYWNrRXhwb3J0c10gPSBleHBvcnRzO1xuXHRwcm9taXNlW3dlYnBhY2tRdWV1ZXNdID0gKGZuKSA9PiAocXVldWUgJiYgZm4ocXVldWUpLCBkZXBRdWV1ZXMuZm9yRWFjaChmbiksIHByb21pc2VbXCJjYXRjaFwiXSh4ID0+IHt9KSk7XG5cdG1vZHVsZS5leHBvcnRzID0gcHJvbWlzZTtcblx0Ym9keSgoZGVwcykgPT4ge1xuXHRcdGN1cnJlbnREZXBzID0gd3JhcERlcHMoZGVwcyk7XG5cdFx0dmFyIGZuO1xuXHRcdHZhciBnZXRSZXN1bHQgPSAoKSA9PiAoY3VycmVudERlcHMubWFwKChkKSA9PiB7XG5cdFx0XHRpZihkW3dlYnBhY2tFcnJvcl0pIHRocm93IGRbd2VicGFja0Vycm9yXTtcblx0XHRcdHJldHVybiBkW3dlYnBhY2tFeHBvcnRzXTtcblx0XHR9KSlcblx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG5cdFx0XHRmbiA9ICgpID0+IChyZXNvbHZlKGdldFJlc3VsdCkpO1xuXHRcdFx0Zm4uciA9IDA7XG5cdFx0XHR2YXIgZm5RdWV1ZSA9IChxKSA9PiAocSAhPT0gcXVldWUgJiYgIWRlcFF1ZXVlcy5oYXMocSkgJiYgKGRlcFF1ZXVlcy5hZGQocSksIHEgJiYgIXEuZCAmJiAoZm4ucisrLCBxLnB1c2goZm4pKSkpO1xuXHRcdFx0Y3VycmVudERlcHMubWFwKChkZXApID0+IChkZXBbd2VicGFja1F1ZXVlc10oZm5RdWV1ZSkpKTtcblx0XHR9KTtcblx0XHRyZXR1cm4gZm4uciA/IHByb21pc2UgOiBnZXRSZXN1bHQoKTtcblx0fSwgKGVycikgPT4gKChlcnIgPyByZWplY3QocHJvbWlzZVt3ZWJwYWNrRXJyb3JdID0gZXJyKSA6IG91dGVyUmVzb2x2ZShleHBvcnRzKSksIHJlc29sdmVRdWV1ZShxdWV1ZSkpKTtcblx0cXVldWUgJiYgKHF1ZXVlLmQgPSAwKTtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnbW9kdWxlJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==