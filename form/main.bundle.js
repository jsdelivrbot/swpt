webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
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
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/add-form/add-form.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "iframe {\r\n    width: 100%;\r\n    height: 100vh;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/add-form/add-form.component.html":
/***/ (function(module, exports) {

module.exports = "<button class=\"btn btn-primary btn-small\" style=\"float:right;\" [routerLink]=\"['/home','true']\">返回数据表</button>\r\n\r\n<iframe [src]=\"safeTarget\" frameborder=\"0\" style=\"width:100%;height:100vh;\"></iframe>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/add-form/add-form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AddFormComponent = (function () {
    function AddFormComponent(routeInfo, sanitizer, router) {
        var _this = this;
        this.routeInfo = routeInfo;
        this.sanitizer = sanitizer;
        this.router = router;
        this.router.events
            .filter(function (event) { return event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* NavigationEnd */]; })
            .subscribe(function (event) {
            _this.routeInfo.params.subscribe(function (params) { return _this.target = params['target']; });
            _this.safeTarget = _this.sanitizer.bypassSecurityTrustResourceUrl(_this.target); // 防止 NG4 识别xxs攻击， 转换链接为安全资源
        });
    }
    AddFormComponent.prototype.ngOnInit = function () {
    };
    AddFormComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-add-form',
            template: __webpack_require__("../../../../../src/app/add-form/add-form.component.html"),
            styles: [__webpack_require__("../../../../../src/app/add-form/add-form.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["DomSanitizer"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["DomSanitizer"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* Router */]) === "function" && _c || Object])
    ], AddFormComponent);
    return AddFormComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=add-form.component.js.map

/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_form_add_form_component__ = __webpack_require__("../../../../../src/app/add-form/add-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__form_manage_form_manage_component__ = __webpack_require__("../../../../../src/app/form-manage/form-manage.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_3__form_manage_form_manage_component__["a" /* FormManageComponent */], children: [
            // { path: '', component: DataTableComponent },
            { path: 'add/:target', component: __WEBPACK_IMPORTED_MODULE_2__add_form_add_form_component__["a" /* AddFormComponent */] },
        ] },
    { path: '**', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_3__form_manage_form_manage_component__["a" /* FormManageComponent */] },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_0__angular_router__["e" /* RouterModule */].forRoot(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_0__angular_router__["e" /* RouterModule */]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n  \n  <div class=\"row\">\n    <div id=\"tree\" class=\"tree\">\n      <!-- <app-form-manage></app-form-manage> -->\n      <router-outlet></router-outlet>\n    </div>\n    \n  </div>\n</div>\n"

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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () { };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_http_data_service__ = __webpack_require__("../../../../../src/app/service/http-data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__swimlane_ngx_datatable__ = __webpack_require__("../../../../@swimlane/ngx-datatable/release/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__swimlane_ngx_datatable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__swimlane_ngx_datatable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__form_manage_form_manage_component__ = __webpack_require__("../../../../../src/app/form-manage/form-manage.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_tree__ = __webpack_require__("../../../../ng2-tree/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_tree___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_ng2_tree__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__data_table_data_table_component__ = __webpack_require__("../../../../../src/app/data-table/data-table.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_routing_module__ = __webpack_require__("../../../../../src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__add_form_add_form_component__ = __webpack_require__("../../../../../src/app/add-form/add-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
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
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_6__form_manage_form_manage_component__["a" /* FormManageComponent */],
                __WEBPACK_IMPORTED_MODULE_8__data_table_data_table_component__["a" /* DataTableComponent */],
                __WEBPACK_IMPORTED_MODULE_10__add_form_add_form_component__["a" /* AddFormComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_5__swimlane_ngx_datatable__["NgxDatatableModule"],
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["BrowserModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_7_ng2_tree__["TreeModule"],
                __WEBPACK_IMPORTED_MODULE_9__app_routing_module__["a" /* AppRoutingModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_0__service_http_data_service__["a" /* HttpDataService */],
                { provide: __WEBPACK_IMPORTED_MODULE_11__angular_common__["LocationStrategy"], useClass: __WEBPACK_IMPORTED_MODULE_11__angular_common__["HashLocationStrategy"] }
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/data-table/data-table.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "li {\r\n  list-style-type: none;\r\n}\r\n\r\n#toggleData .modal-body {\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -ms-flex-flow: wrap;\r\n      flex-flow: wrap;\r\n  padding-right: 5px;\r\n}\r\n\r\n#toggleData li {\r\n  width: auto;\r\n  margin-right: 10px;\r\n}\r\n\r\n.qa:nth-child(even) {\r\n  float: right;\r\n}\r\n\r\n.qa:not(:first-child):not(:nth-child(2)) {\r\n  margin-top: 10px;\r\n}\r\n\r\n.btn-group.tool{\r\n    margin:  0 0 10px 0;\r\n}      \r\n\r\n.btn-fun,\r\n.btn-info:active:hover,\r\n.btn-info.active:hover,\r\n.open>.dropdown-toggle.btn-info:hover,\r\n.btn-info:active:focus,\r\n.btn-info.active:focus,\r\n.open>.dropdown-toggle.btn-info:focus,\r\n.btn-info:active.focus,\r\n.btn-info.active.focus,\r\n.open>.dropdown-toggle.btn-info.focus,\r\n.btn-info:active,\r\n.btn-info.active,\r\n.open>.dropdown-toggle.btn-info {\r\n  box-shadow: none;\r\n  background: none;\r\n  border: none;\r\n  color: rgb(97, 193, 248);\r\n  outline: none;\r\n}\r\n\r\n.btn-fun::after {\r\n  content: '';\r\n  display: block;\r\n  width: 1px;\r\n  height: 13px;\r\n  background: #229ddd;\r\n  position: absolute;\r\n  right: 0;\r\n  top: 50%;\r\n  transform: translate(-50%, -50%);\r\n}\r\n\r\n.btn-img, .a-img {\r\n  width: 15px;\r\n  margin-right: 5px;\r\n  margin-top: -3px;\r\n}\r\n\r\n.dropdown-menu li a{\r\n  color: #757373;\r\n  line-height: 25px;\r\n}\r\n\r\n.dropdown-menu li a:not(:last-child) {\r\n  border-bottom: 1px solid #eaeaea;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/data-table/data-table.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <div class=\"info\">\r\n    <p>This demonstrates a simple single selection table with the 3rd row selected by default.</p>\r\n</div> -->\r\n<div class=\"modal fade\" id=\"toggleData\" tabindex=\"-1\" style=\"display:none\">\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">\r\n                    <span>&times;</span>\r\n                </button>\r\n                <h4 class=\"modal-title\">请选择你想 显示/隐藏 的数据</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <li *ngFor=\"let title of allTitles\">\r\n                    <input type='checkbox' class=\"selectBtn\" [id]=\"title.prop\" (click)='toggle(title)' [checked]='isChecked(title)' />\r\n                    <label [attr.for]=\"title.prop\">{{title.name}}</label>\r\n                </li>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">关闭</button>\r\n                <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" (click)='saveSelect($event)'>保存</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"btn-group tool\" style=\"width:100%\">\r\n    <button class=\"btn btn-info btn-small btn-fun\" (click)=\"jumpAdd()\"><img class=\"btn-img\" src=\"./assets/icon/add.png\">添加数据</button>\r\n    <button class=\"btn btn-info btn-small btn-fun\" (click)=\"jumpWatch()\"><img class=\"btn-img\" src=\"./assets/icon/watch.png\">查看数据</button>\r\n    <button class=\"btn btn-info btn-small btn-fun\" (click)=\"jumpDel()\"><img class=\"btn-img\" src=\"./assets/icon/delete.png\">删除数据</button>\r\n    <button class=\"btn btn-info btn-small btn-fun\" (click)=\"jumpChange()\"><img class=\"btn-img\" src=\"./assets/icon/change.png\">修改数据</button>\r\n    <button class=\"btn btn-info btn-small btn-fun\" (click)=\"jumpAddAgain()\"><img class=\"btn-img\" src=\"./assets/icon/add.png\">继续添加</button>\r\n    <div class=\"btn-group\" role=\"group\">\r\n        <button type=\"button\" class=\"btn btn-info btn-small dropdown-toggle btn-fun\" data-toggle=\"dropdown\">\r\n            <img class=\"btn-img\" src=\"./assets/icon/changeFn.png\">\r\n            功能按钮\r\n            <span class=\"caret\"></span>\r\n        </button>\r\n        <ul class=\"dropdown-menu\">\r\n            <li>\r\n                <a href=\"javascript:;\" data-toggle=\"modal\" data-target=\"#toggleData\"><img class=\"btn-img\" src=\"./assets/icon/show.png\">显示/隐藏数据</a>\r\n                <a href=\"javascript:;\" (click)=\"print()\"><img class=\"btn-img\" src=\"./assets/icon/print.png\">打印</a>\r\n                <a href=\"javascript:;\" (click)=\"download()\"><img class=\"btn-img\" src=\"./assets/icon/download.png\">下载</a>\r\n                <a href=\"javascript:;\"><img class=\"btn-img\" src=\"./assets/icon/import.png\">导入</a>\r\n                <a href=\"javascript:;\"><img class=\"btn-img\" src=\"./assets/icon/export.png\">导出</a>\r\n                <a href=\"javascript:;\"><img class=\"btn-img\" src=\"./assets/icon/resouseDelete.png\">回收站</a>\r\n                <a href=\"javascript:;\"><img class=\"btn-img\" src=\"./assets/icon/share.png\">分享</a>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n    <!-- <button class=\"btn btn-info btn-small\" type=\"button\" data-toggle=\"modal\" data-target=\"#toggleData\">显示/隐藏数据</button> -->\r\n    <div class=\"form-inline pull-right\">\r\n        <div class=\"form-group\">\r\n            <select #select name=\"select\" id=\"select\" class=\"form-control\" (change)=\"this.searchTarget = $event.target.value;\">\r\n                <option value=\"all\">全部</option>\r\n                <option value=\"{{title.prop}}\" *ngFor=\"let title of columns\">{{title.name}}</option>\r\n            </select>\r\n        </div>\r\n        <div class=\"form-group\">\r\n            <input (keyup)=\"search($event)\" type=\"search\" name=\"search\" id=\"search\" class=\"form-control\" placeholder=\"请输入你要搜索的内容\">\r\n        </div>\r\n    </div>\r\n</div>\r\n<ngx-datatable class=\"material\" [messages]=\"messages\" [rows]=\"rows\" [columnMode]=\"'force'\" [columns]=\"columns\" [headerHeight]=\"50\" [footerHeight]=\"50\" [rowHeight]=\"'auto'\" [limit]=\"10\" [selected]=\"selected\" [selectionType]=\"'multiClick'\" (select)='onSelect($event)'>\r\n</ngx-datatable>\r\n"

/***/ }),

/***/ "../../../../../src/app/data-table/data-table.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataTableComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_timers__ = __webpack_require__("../../../../timers-browserify/main.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_timers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_timers__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_http_data_service__ = __webpack_require__("../../../../../src/app/service/http-data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var DataTableComponent = (function () {
    function DataTableComponent(http, el, router, httpData) {
        this.http = http;
        this.el = el;
        this.router = router;
        this.httpData = httpData;
        this.messages = {};
        this.rows = [];
        this.selected = [];
        this.selectId = []; // 修改时选择的Id
        this.titles = []; // 表头数组
        this.datas = []; // 解析的字段
        this.allTitles = []; // 全部表头数据，要作 隐藏/显示 数据功能的。
        this.columns = []; // 数据表渲染的表头字段
        /* Search - 搜索 */
        this.searchTarget = 'all'; // 要搜索的字段
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json; charset=UTF-8' });
        this.options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: this.headers });
    }
    DataTableComponent.prototype.ngOnInit = function () {
        this.messages = {
            emptyMessage: '您好，可显示的数据为空！',
            totalMessage: '条数据'
        };
    };
    DataTableComponent.prototype.fetch = function (cb) {
        /*
         * 查询数据
         *
         */
        var url = this.httpData.Datas_HOST + 'pageDesignOperatorFacade/selectFormRecord';
        this.http.post(url, {
            'node_id': this.nodeId,
            'classname': this.nodeName,
            'method': 'selectList'
        }, this.options)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            cb(data);
        });
    };
    DataTableComponent.prototype.onSelect = function (_a) {
        var _this = this;
        var selected = _a.selected;
        /*
         * 选择数据
         *
         */
        this.selectId = [];
        selected.forEach(function (value, index, obj) {
            _this.selectId.push(value.id);
        });
        this.selectGid = selected[0].gid;
        console.log("\u9009\u62E9\u7684Id\uFF1A" + this.selectId);
        console.log('Select Event', selected);
    };
    DataTableComponent.prototype.getKeys = function (item) {
        return Object.keys(item);
    };
    DataTableComponent.prototype.sorts = function (array) {
        /*
         * 排序
         *
         */
        array.sort(function (x, y) {
            var tmpX = parseInt(x.split('data')[1], 0);
            var tmpY = parseInt(y.split('data')[1], 0);
            if (tmpX > tmpY) {
                return 1;
            }
            else {
                return -1;
            }
        });
    };
    DataTableComponent.prototype.queryRecord = function (nodeId, nodeName) {
        var _this = this;
        /*
         * 查询所有数据
         *
         */
        this.nodeId = nodeId;
        this.nodeName = nodeName;
        this.fetch(function (data) {
            if (data.status !== '2') {
                _this.selected = []; // 重新查询的时候清除 已点击选择的 数组
                _this.rows = data['msg'].data;
                _this.titles = data['msg'].title;
                _this.columns = [];
                _this.datas = [];
                if (data['msg']['data'] !== null) {
                    Object.keys(data['msg']['data'][0]).forEach(function (value, index, obj) {
                        // 提取 数据字段 ，要来对应数据
                        if (value.search(/^data/) === 0) {
                            _this.datas.push(value);
                        }
                    });
                    _this.sorts(_this.datas); // 排序，让data1 - x 能顺序排下去
                    var _loop_1 = function (i) {
                        _this.datas.forEach(function (value, index, obj) {
                            if (data['msg']['data'][i][value] !== null) {
                                if (data['msg']['data'][i][value].search(/^http:\/\/1388w.cn:8888\/folder\//) === 0) {
                                    data['msg']['data'][i][value] = data['msg']['data'][i][value].split('http://1388w.cn:8888/folder/')[1];
                                }
                            }
                        });
                    };
                    for (var i = 0; i < data['msg']['data'].length; i++) {
                        _loop_1(i);
                    }
                    _this.datas.push('gid');
                }
                data['msg']['title'].push('关联ID');
                data['msg']['title'].forEach(function (value, index, obj) {
                    // 循环生成表头
                    _this.columns.push({ name: value, prop: _this.datas[index] });
                });
                _this.allTitles = _this.columns; // 显示/隐藏数据 功能 需要的。 // 用来循环选项在页面
                if (data['msg']['selected']) {
                    var selectedArr = _this.getKeys(data['msg']['selected']);
                    _this.sorts(selectedArr);
                    _this.columns.forEach(function (value, index, obj) {
                        if (data['msg']['selected']["data" + (index + 1)] === 0) {
                            _this.toggle(value); // 进来就循环，用户上一次保存的展示数据信息。
                        }
                    });
                }
            }
            else {
                alert('抱歉，可显示的数据为空！');
                window.location.reload();
            }
        });
    };
    DataTableComponent.prototype.jumpPreview = function (method, selectId, selectGid) {
        /*
         * 跳转到预览界面
         *
         */
        var url;
        if (method === 'addAgain') {
            url = this.httpData.Datas_EditorAdd + "assets/ueditor/formdesign/preview.html?" +
                ("id=" + this.nodeId + "&name=" + this.nodeName + "&method=" + method + "&gid=" + this.selectGid);
        }
        else if (method !== 'add') {
            url = this.httpData.Datas_EditorAdd + "assets/ueditor/formdesign/preview.html?" +
                ("id=" + this.nodeId + "&name=" + this.nodeName + "&method=" + method + "&selectId=" + this.selectId);
        }
        else {
            url = this.httpData.Datas_EditorAdd + "assets/ueditor/formdesign/preview.html?" +
                ("id=" + this.nodeId + "&name=" + this.nodeName + "&method=" + method);
        }
        this.openWin(url);
    };
    DataTableComponent.prototype.openWin = function (url) {
        var _this = this;
        /*
         * 新建窗口打开。
         * 监控着窗口有没有关闭，如果窗口关闭就Ajax请求数据刷新。
         */
        var win = window.open(url, 'add', 'toolbar=no,resizable=yes,location=no,menubar=no,' +
            'width=' + (screen.availWidth - 300) + ',height=' + (screen.availHeight - 200) + '');
        var reloadValue = Object(__WEBPACK_IMPORTED_MODULE_2_timers__["setInterval"])((function (Xwin) {
            return function () {
                if (Xwin.closed) {
                    _this.queryRecord(_this.nodeId, _this.nodeName);
                    Object(__WEBPACK_IMPORTED_MODULE_2_timers__["clearInterval"])(reloadValue);
                    // window.location.reload();
                }
            };
        })(win), 1000);
    };
    DataTableComponent.prototype.jumpDel = function () {
        var _this = this;
        /*
         * 删除数据
         *
         */
        var method, url;
        var flag = 1;
        var record = this.selectId.toString();
        if (this.selectId.length > 1) {
            method = 'deleteArray';
            url = this.httpData.Datas_HOST + ("pageDesignOperatorFacade/" + method);
        }
        else {
            method = 'updateDelete';
            url = this.httpData.Datas_HOST + "pageDesignOperatorFacade/deleteFormRecord";
        }
        this.http.post(url, {
            'record': record,
            'classname': this.nodeName,
            'method': method,
            'flag': flag
        }, this.options)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            alert(data.statusMsg);
            _this.queryRecord(_this.nodeId, _this.nodeName);
        });
    };
    DataTableComponent.prototype.jumpChange = function () {
        /*
         * 修改数据
         *
         */
        if (this.selectId.length > 1) {
            alert('抱歉，不支持同时修改多条数据！');
        }
        else if (this.selectId.length < 1) {
            alert('出错！请选择一条数据！');
        }
        else {
            this.jumpPreview('change', this.selectId);
        }
    };
    DataTableComponent.prototype.jumpAdd = function () {
        /*
         * 添加数据
         *
         */
        this.jumpPreview('add');
    };
    DataTableComponent.prototype.jumpWatch = function () {
        /*
         * 查看数据
         *
         */
        if (this.selectId.length > 1) {
            alert('抱歉，不支持同时查看多条数据！');
        }
        else if (this.selectId.length < 1) {
            alert('出错！请选择一条数据！');
        }
        else {
            this.jumpPreview('watch', this.selectId);
        }
    };
    DataTableComponent.prototype.jumpAddAgain = function () {
        /*
         * 再次添加数据
         *
         */
        if (this.selectId.length > 1) {
            alert('抱歉，不支持同时添加多条数据！');
        }
        else if (this.selectId.length < 1) {
            alert('出错！请选择一条数据！');
        }
        else {
            this.jumpPreview('addAgain', [], this.selectGid);
        }
    };
    DataTableComponent.prototype.search = function (e) {
        var _this = this;
        /*
         * 搜索数据
         *
         * Problems: 现在搜索是 每键入一次就请求一次。 之后要优化这方面，减少请求次数。
         * 未完成 ↑
         */
        var data; // 参数
        var searchValue = e.target.value; // 搜索的值
        var searchKey = this.searchTarget; // 要搜索的对象
        if (searchKey === 'all') {
            data = {
                'searchAllKey': "%" + searchValue + "%",
                'classname': this.nodeName,
                'method': 'searchAllKey'
            };
        }
        else {
            data = {
                'searchKey': searchKey,
                'searchValue': "%" + searchValue + "%",
                'classname': this.nodeName,
                'method': 'searchKey'
            };
        }
        this.http.post(this.httpData.Datas_HOST + 'pageDesignOperatorFacade/selectFormRecord', data, this.options)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            console.log(res);
            _this.rows = res.msg.data;
        });
    };
    DataTableComponent.prototype.print = function () {
        var newWindow = window.open('打印窗口', '_blank');
        var docStr = __WEBPACK_IMPORTED_MODULE_6_jquery__('.ngx-datatable').prop('outerHTML');
        var headStr = document.head.innerHTML.concat('<style>@page { size: landscape; }</style>');
        newWindow.document.write(docStr);
        newWindow.document.head.innerHTML = headStr;
        newWindow.document.close();
        newWindow.print();
        newWindow.close();
    };
    DataTableComponent.prototype.share = function () {
    };
    DataTableComponent.prototype.download = function (e) {
        alert("\u201C" + this.nodeName + "\u201D : " + this.nodeId + " \u8282\u70B9\u7B2C" + this.selectId + "\u884C\u6587\u4EF6\u5F00\u59CB\u4E0B\u8F7D\u3002");
    };
    /* 显示/隐藏 数据 */
    DataTableComponent.prototype.toggle = function (col) {
        var isChecked = this.isChecked(col);
        if (isChecked) {
            this.columns = this.columns.filter(function (c) {
                return c.prop !== col.prop;
            });
        }
        else {
            this.columns = this.columns.concat([col]);
        }
    };
    DataTableComponent.prototype.isChecked = function (col) {
        return this.columns.find(function (c) {
            return c.prop === col.prop;
        });
    };
    DataTableComponent.prototype.saveSelect = function (e) {
        var selectBtn = this.el.nativeElement.querySelectorAll('.selectBtn');
        var selected = {};
        selectBtn.forEach(function (value, index, obj) {
            if (value.checked) {
                selected["data" + (index + 1)] = 1;
            }
            else {
                selected["data" + (index + 1)] = 0;
            }
        });
        this.http.post(this.httpData.Datas_HOST + 'pageDesignOperatorFacade/updatePageEditor', {
            selected: selected,
            'id': this.nodeId,
        }, this.options)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            if (res.status !== '0') {
                alert('抱歉，保存失败！请重新尝试！');
            }
        });
    };
    DataTableComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-data-table',
            template: __webpack_require__("../../../../../src/app/data-table/data-table.component.html"),
            styles: [__webpack_require__("../../../../../src/app/data-table/data-table.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__service_http_data_service__["a" /* HttpDataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__service_http_data_service__["a" /* HttpDataService */]) === "function" && _d || Object])
    ], DataTableComponent);
    return DataTableComponent;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=data-table.component.js.map

/***/ }),

/***/ "../../../../../src/app/form-manage/form-manage.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".mat-drawer-container {\r\n  height: 100%;\r\n}\r\n\r\n.tree-info {\r\n  -ms-flex: 1 0 100%;\r\n      flex: 1 0 100%;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -ms-flex-direction: column;\r\n      flex-direction: column;\r\n  -ms-flex-align: start;\r\n      align-items: flex-start;\r\n}\r\n\r\n.tree-controlls {\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -ms-flex-direction: column;\r\n      flex-direction: column;\r\n}\r\n\r\n.tree-content {\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -ms-flex-direction: column;\r\n      flex-direction: column;\r\n}\r\n\r\n.tree-container {\r\n  padding: 10px 0px 0 0;\r\n  float: left;\r\n  height: 100vh;\r\n  overflow-y: auto;\r\n}\r\n\r\n.tree-container--with-controls {\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap;\r\n}\r\n\r\n.tree-demo-app {\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -ms-flex-direction: column;\r\n      flex-direction: column;\r\n}\r\n\r\n.tree-title {\r\n  margin: 0;\r\n  color: #40a070;\r\n  font-size: 2em;\r\n}\r\n\r\n.tree-controlls button {\r\n  margin: 5px;\r\n}\r\n\r\n.formManager {\r\n  width: 100%;\r\n  height: 100vh;\r\n  overflow: hidden;\r\n}\r\n\r\n.datatable-container {\r\n  overflow: auto;\r\n  padding: 10px 10px 15px 10px;\r\n  height: 100vh;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/form-manage/form-manage.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"formManager\">\n<div class=\"tree-container\" style=\"height: 100vh;overflow-y: auto;\">\n    <div class=\"tree-content\">\n      <tree #treePages [tree]=\"tree\" [settings]=\"settings\" (menuItemSelected)=\"onMenuItemSelected($event)\" (nodeMoved)=\"handleMoved($event)\" (nodeRenamed)=\"handleRenamed($event)\"\n        (nodeRemoved)=\"handleRemoved($event)\" (nodeSelected)=\"handleSelected($event)\"\n        (nodeCreated)=\"handleCreated($event)\">\n      </tree>\n    </div>\n  </div>\n\n  <div class=\"datatable-container\">\n    <app-data-table [hidden]=\"!dataTableShow\"></app-data-table>\n    <router-outlet></router-outlet>\n  </div>\n  \n</div>\n"

/***/ }),

/***/ "../../../../../src/app/form-manage/form-manage.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormManageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_tree__ = __webpack_require__("../../../../ng2-tree/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_tree___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_tree__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_table_data_table_component__ = __webpack_require__("../../../../../src/app/data-table/data-table.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_http_data_service__ = __webpack_require__("../../../../../src/app/service/http-data.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var theTree = {
    value: '您好,看到这里..',
    id: 9999,
    settings: {
        cssClasses: {
            expanded: 'fa fa-caret-down',
            collapsed: 'fa fa-caret-right',
            empty: 'fa fa-caret-right disabled',
            leaf: 'fa'
        },
        templates: {
            node: '<i class="fa fa-folder-o"></i>',
            leaf: '<i class="fa fa-file-o"></i>'
        },
        static: true
    },
    children: [
        { value: '就证明了..', id: 9999, children: [
                { value: '你的树节点为空..', id: 9999 }
            ] },
        { value: '所以我们显示这个提醒您 :)', id: 9999 }
    ]
};
var FormManageComponent = (function () {
    function FormManageComponent(http, router, httpData) {
        var _this = this;
        this.http = http;
        this.router = router;
        this.httpData = httpData;
        this.settings = {
            rootIsVisible: true
        };
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-type': 'application/json; charset=UTF-8' });
        this.options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: this.headers });
        this.node_level = 1; // 节点的 Level
        this.nodeMenuItem = [
            { action: __WEBPACK_IMPORTED_MODULE_2_ng2_tree__["NodeMenuItemAction"].NewTag, name: '新建文件', cssClass: 'fa fa-file-o' },
            { action: __WEBPACK_IMPORTED_MODULE_2_ng2_tree__["NodeMenuItemAction"].NewFolder, name: '新建文件夹', cssClass: 'fa fa-folder-o' },
            { action: __WEBPACK_IMPORTED_MODULE_2_ng2_tree__["NodeMenuItemAction"].Rename, name: '重命名', cssClass: 'rename' },
            { action: __WEBPACK_IMPORTED_MODULE_2_ng2_tree__["NodeMenuItemAction"].Remove, name: '删除', cssClass: 'remove' },
            { action: __WEBPACK_IMPORTED_MODULE_2_ng2_tree__["NodeMenuItemAction"].Custom, name: '配置节点', cssClass: 'fa fa-cog' }
        ];
        this.dataTableShow = true;
        this.tree = theTree;
        this.router.events
            .filter(function (event) { return event instanceof __WEBPACK_IMPORTED_MODULE_5__angular_router__["c" /* NavigationStart */]; })
            .subscribe(function (event) {
            if (event.url.split('/').indexOf('add') === -1) {
                _this.dataTableShow = true;
                _this.dataTable.queryRecord(_this.node_id, _this.node_name);
            }
            else {
                _this.dataTableShow = false;
            }
            // event.url.split('/').indexOf('add') === -1 ? this.dataTableShow = true : this.dataTableShow = false;
        });
    }
    FormManageComponent.prototype.ngOnInit = function () {
        this.getTreeNode();
    };
    FormManageComponent.prototype.ajax = function (method, dataObj, callback) {
        var _this = this;
        /*
         * 统一请求的接口
         *
         */
        var url, data;
        if (method === 'add') {
            url = this.httpData.Manage_HOST + this.control_Url + '/addTreeNode';
            data = {
                'value': this.node_name,
                'node_level': this.node_level,
                'parent_id': this.node_parentId
            };
        }
        else if (method === 'removed') {
            url = this.httpData.Manage_HOST + this.control_Url + '/deleteTreeNode';
            data = dataObj;
        }
        else if (method === 'rename' || method === 'updataUrl') {
            url = this.httpData.Manage_HOST + this.control_Url + '/updateTreeNode';
            data = dataObj;
        }
        this.http.post(url, JSON.stringify(data), this.options)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            console.log(res);
            if (callback) {
                callback.apply(_this);
            }
        });
    };
    FormManageComponent.prototype.getTreeNode = function () {
        var _this = this;
        /*
         * 查询树节点
         *
         * 根据进入的模块不同 显示不同的树节点
         */
        // 子站管理 pid 16
        var url = 'nodeQueryFacade/getTreeNode';
        this.control_Url = 'nodeOperatorFacade';
        if (window.location.hash !== '') {
            if (window.location.hash.split('=')[1] === 'zizhan') {
                this.control_Url = 'herdNodeOperatorFacade';
                url = 'herdNodeQueryFacade/getTreeNode';
            }
        }
        this.http.get(this.httpData.Manage_HOST + url)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            var nodes = data['msg'];
            _this.deleteChild(nodes);
            // 还有三个Settings在后端设置了, 1. 折叠 2. 样式 3. 图标(节点名称前的图标)
            nodes.settings.menuItems = _this.nodeMenuItem;
            _this.tree = nodes;
        });
    };
    FormManageComponent.prototype.onMenuItemSelected = function (e) {
        /*
         * 配置 Custom 的按钮的操作
         * 根据 name 的不一样，执行不同的操作
         */
        switch (e.selectedItem) {
            case '配置节点':
                var url = prompt('请输入您需要配置的Url', 'http://');
                var node = e.node.node;
                node.url = url;
                this.ajax('updataUrl', node);
                break;
            default:
                break;
        }
    };
    FormManageComponent.prototype.deleteChild = function (obj) {
        /*
         * 用途：区分文件夹和文件
         * 操作：If 节点没有children 删除该字段
         */
        var length;
        obj.length === undefined ? length = 1 : length = obj.length;
        for (var i = 0; i < length; i++) {
            var objChild = void 0;
            var isFirstFlag = void 0;
            obj[i] === undefined ? objChild = obj.children : objChild = obj[i].children;
            obj[i] === undefined ? isFirstFlag = true : isFirstFlag = false;
            if (objChild.length === 0) {
                isFirstFlag ? delete obj.children : delete obj[i].children;
            }
            else {
                this.deleteChild(objChild);
            }
        }
    };
    FormManageComponent.prototype.handleSelected = function ($event) {
        /*
         * 树形点击选择操作
         *
         */
        document.title = "\u540E\u53F0\u6570\u636E\u7BA1\u7406 - " + $event.node.node.value;
        this.node_id = $event.node.node.id;
        this.node_name = $event.node.node.value;
        switch (this.node_id) {
            case 794:
                window.open('http://13net.net');
                break;
            default:
                this.jumpLink(this.httpData.Datas_EditorAdd + "assets/ueditor/formdesign/preview.html?" +
                    ("id=" + this.node_id + "&name=" + this.node_name + "&method=add"));
                break;
        }
    };
    FormManageComponent.prototype.jumpLink = function (target) {
        /*
         * 仅目前 假数据 跳链接使用
         *
         */
        this.dataTableShow = false;
        this.router.navigate(['/home/add', target]);
    };
    FormManageComponent.prototype.handleCreated = function ($event) {
        /*
         * 树形新建文件操作
         *
         */
        this.node_parentId = $event.node.parent.node.id;
        this.node_name = $event.node.value;
        this.findLevel($event.node.parent);
        this.ajax('add');
    };
    FormManageComponent.prototype.handleRemoved = function ($event) {
        /*
         * 树形删除操作
         *
         */
        console.log($event);
        var dataObj = $event.node.node;
        delete dataObj.createTime;
        delete dataObj.settings;
        this.ajax('removed', dataObj);
    };
    FormManageComponent.prototype.handleRenamed = function ($event) {
        /*
         * 树形重命名操作
         *
         */
        var dataObj = $event.node.node;
        delete dataObj.createTime;
        delete dataObj.settings;
        this.ajax('rename', dataObj, this.getTreeNode());
    };
    FormManageComponent.prototype.handleMoved = function ($event) {
        /*
         * 树形移动节点操作 - 未测试
         * BUG. 暂时不能跨级拖动，他跨级拖动的时候会执行 remove 然后再 move，询问github作者没果，暂没解决办法
         */
        console.log($event);
        this.node_id = $event.node.node.id;
        this.node_parentId = $event.node.parent.id;
        this.node_sore = $event.node.node.node_sore;
        this.newNode_sore = $event.node.positionInParent;
        this.ajax('moved');
    };
    FormManageComponent.prototype.findLevel = function (obj) {
        if (obj.parent === null) {
            this.node_level = this.node_level;
        }
        else {
            this.node_level++;
            this.findLevel(obj.parent);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('treePages'),
        __metadata("design:type", Object)
    ], FormManageComponent.prototype, "treePage", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_3__data_table_data_table_component__["a" /* DataTableComponent */]),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__data_table_data_table_component__["a" /* DataTableComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__data_table_data_table_component__["a" /* DataTableComponent */]) === "function" && _a || Object)
    ], FormManageComponent.prototype, "dataTable", void 0);
    FormManageComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-form-manage',
            template: __webpack_require__("../../../../../src/app/form-manage/form-manage.component.html"),
            styles: [__webpack_require__("../../../../../src/app/form-manage/form-manage.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__angular_router__["d" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_router__["d" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__service_http_data_service__["a" /* HttpDataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__service_http_data_service__["a" /* HttpDataService */]) === "function" && _d || Object])
    ], FormManageComponent);
    return FormManageComponent;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=form-manage.component.js.map

/***/ }),

/***/ "../../../../../src/app/service/http-data.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpDataService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HttpDataService = (function () {
    function HttpDataService() {
        var localhost = window.location.host;
        /* this.Datas_HOST = 'http://1388w.cn:20890/';
        this.Datas_EditorAdd = 'http://1388w.cn/editor/';
        this.Manage_HOST = 'http://1388w.cn:20890/'; */
        this.Datas_HOST = 'http://' + localhost + ':20890/';
        this.Datas_EditorAdd = 'http://' + localhost + '/editor/';
        this.Manage_HOST = 'http://' + localhost + ':20890/';
    }
    HttpDataService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], HttpDataService);
    return HttpDataService;
}());

//# sourceMappingURL=http-data.service.js.map

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
//# sourceMappingURL=environment.js.map

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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map