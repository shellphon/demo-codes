webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<game-matches></game-matches>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: []
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__business_matches_matches_module__ = __webpack_require__("../../../../../src/app/business/matches/matches.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["E" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__business_matches_matches_module__["a" /* MatchesModule */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/business/matches/matches.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "@font-face{\n  font-family: icofont;\n  src: url('http://shellphon.wang/images/fonts/funmatches/fontawesome.eot');\n  src: url('http://shellphon.wang/images/fonts/funmatches/fontawesome.eot?#iefix') format('embedded-opentype'),\n       url('http://shellphon.wang/images/fonts/funmatches/fontawesome.woff') format('woff'),\n       url('http://shellphon.wang/images/fonts/funmatches/fontawesome.ttf') format('truetype'),\n       url('http://shellphon.wang/images/fonts/funmatches/fontawesome.svg#fontawesome') format('svg');\n}\n*{\n  margin: 0;\n  padding: 0;\n}\n  .map{\n    width: 320px;\n    margin: 2em auto;\n    overflow: hidden;\n  }\n  .map .item{\n    float: left;\n    width: 76px;\n    height: 76px;\n    margin: 2px;\n    position: relative;\n    cursor: pointer;\n  }\n  .map .item>div{\n    border-radius: 50%;\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top:0px;\n    left: 0px;\n    transition:all 500ms;\n    text-align: center;\n    -webkit-backface-visibility: hidden;\n    backface-visibility: hidden;\n  }\n  .map .item .front{\n    background-color: #7BDDA8;\n  }\n  .map .item .back{\n    -webkit-transform:rotateY(180deg);\n    transform:rotateY(180deg);\n  }\n\n  .map .un .front::after{\n    content:'';\n    display: block;\n    width: 40%;\n    height: 40%;\n    border-radius: 100%;\n    background-color: #89EA89;\n    position: absolute;\n    top: 30%;\n    left: 30%; \n  }\n  \n  .map .item .back span{\n    font-family: icofont,'Microsoft Yahei',Arial;\n    font-size: 1.5em;\n    display: inline-block;\n    margin: 30%;\n  }\n  .map .show .front{\n    -webkit-transform:rotateY(180deg);\n    transform:rotateY(180deg);\n  }\n  .map .show .back{\n    -webkit-transform:rotateY(0deg);\n    transform:rotateY(0deg);\n  }\n  .map .match{\n    visibility: hidden;\n  }\n  .map .match>div{\n    transition:none;\n  }\n@media (min-width: 1000px){\n  .result{\n    position: fixed;\n    top: 15px;\n    left: 15px;\n  }\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/business/matches/matches.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"map\" [ngStyle]=\"{'width': (80*(level+1))+'px'}\">\n    <div *ngFor=\"let item of items; let i = index;\" class=\"item\" \n    [ngClass]=\"{'un':!item.showed, 'match':item.isCheck, 'show':item.isShow}\"\n    (click)=\"clickItem(item, i);\">\n        <div class=\"back\"><span>{{item.content}}</span></div>\n        <div class=\"front\"></div>\n    </div>\n</div>\n<div class=\"result\">\n    <div class=\"result-item\" *ngFor=\"let item of record\">\n        <label for=\"\">第{{item.level}}关：</label>\n        <span>步数：{{item.step}}</span>\n        <span>时间：{{item.time | timeStr }}</span>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/business/matches/matches.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MatchesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MatchesComponent = (function () {
    function MatchesComponent() {
        //console.log('constructor');
        this.first = null;
        this.level = 1;
        this.source = 'ABCDEFGHI☆J❤KLMNOPQRSTUVWXYZ123456789♂♀♠♣★△▽囧你我她';
        this.record = [];
    }
    MatchesComponent.prototype.ngOnInit = function () {
        //console.log('init');
        this.initItems();
    };
    MatchesComponent.prototype.initItems = function () {
        var column = this.level + 1;
        var num;
        if (column % 2) {
            num = column * (column + 1);
        }
        else {
            num = column * column;
        }
        console.log(num);
        num = num / 2;
        var src = this.source.split('');
        var srcTmp = __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.sampleSize(src, num).join('');
        srcTmp = srcTmp + srcTmp;
        this.items = __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.shuffle(srcTmp.split(''))
            .map(function (item) {
            return {
                content: '' + item,
                showed: false,
                isShow: false,
                isCheck: false
            };
        });
        this.initRecord();
    };
    MatchesComponent.prototype.initRecord = function () {
        this.resultStart = new Date();
        this.resultStep = 0;
    };
    MatchesComponent.prototype.nextLevel = function () {
        this.level++;
        this.initItems();
    };
    MatchesComponent.prototype.checkItems = function (indexs) {
        var _this = this;
        setTimeout(function () {
            indexs.forEach(function (index) {
                _this.items[index].isCheck = true;
            });
            if (_this.items.every(function (item) {
                return item.isCheck;
            })) {
                _this.recordResult();
                if (_this.level == 8) {
                    alert('过关');
                }
                else {
                    _this.nextLevel();
                }
            }
        }, 500);
    };
    MatchesComponent.prototype.recordResult = function () {
        var now = new Date();
        this.record.push({
            level: this.level,
            step: this.resultStep,
            time: now.getTime() - this.resultStart.getTime()
        });
    };
    MatchesComponent.prototype.hideItems = function (indexs) {
        var _this = this;
        setTimeout(function () {
            indexs.forEach(function (index) {
                _this.items[index].isShow = false;
            });
        }, 500);
    };
    MatchesComponent.prototype.clickItem = function (item, index) {
        item.showed = true;
        if (item.isShow || item.isCheck) {
            return;
        }
        this.resultStep++;
        item.isShow = true;
        if (this.first !== null) {
            if (this.items[this.first].content === item.content) {
                this.checkItems([this.first, index]);
            }
            else {
                this.hideItems([this.first, index]);
            }
            this.first = null;
        }
        else {
            this.first = index;
        }
    };
    MatchesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'game-matches',
            template: __webpack_require__("../../../../../src/app/business/matches/matches.component.html"),
            styles: [__webpack_require__("../../../../../src/app/business/matches/matches.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], MatchesComponent);
    return MatchesComponent;
}());



/***/ }),

/***/ "../../../../../src/app/business/matches/matches.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MatchesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__matches_component__ = __webpack_require__("../../../../../src/app/business/matches/matches.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipe_time_pipe__ = __webpack_require__("../../../../../src/app/pipe/time.pipe.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var MatchesModule = (function () {
    function MatchesModule() {
    }
    MatchesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */]
            ],
            exports: [__WEBPACK_IMPORTED_MODULE_2__matches_component__["a" /* MatchesComponent */]],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__matches_component__["a" /* MatchesComponent */], __WEBPACK_IMPORTED_MODULE_3__pipe_time_pipe__["a" /* TimeStr */]],
            providers: []
        })
    ], MatchesModule);
    return MatchesModule;
}());



/***/ }),

/***/ "../../../../../src/app/pipe/time.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimeStr; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var TimeStr = (function () {
    function TimeStr() {
    }
    TimeStr.prototype.transform = function (value) {
        value = Math.round(value / 1000);
        var min = Math.floor(value / 60);
        return min ? (min + '分' + value % 60 + '秒') : (value % 60 + '秒');
    };
    TimeStr = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* Pipe */])({ name: 'timeStr' })
    ], TimeStr);
    return TimeStr;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map