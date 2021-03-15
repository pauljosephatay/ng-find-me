(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "+QEs":
/*!***************************************************************************************!*\
  !*** ./libs/ng-find-me/users/data-access/users-state/src/lib/+state/users.reducer.ts ***!
  \***************************************************************************************/
/*! exports provided: USERS_FEATURE_KEY, usersAdapter, initialState, reducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "USERS_FEATURE_KEY", function() { return USERS_FEATURE_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "usersAdapter", function() { return usersAdapter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducer", function() { return reducer; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "tqRt");
/* harmony import */ var _ngrx_entity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/entity */ "7MCK");
/* harmony import */ var _users_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./users.actions */ "lRdf");



const USERS_FEATURE_KEY = 'users';
const usersAdapter = Object(_ngrx_entity__WEBPACK_IMPORTED_MODULE_1__["createEntityAdapter"])();
const initialState = usersAdapter.getInitialState({
    // set initial required properties
    loaded: false,
});
const usersReducer = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createReducer"])(initialState, Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["on"])(_users_actions__WEBPACK_IMPORTED_MODULE_2__["init"], (state) => (Object.assign(Object.assign({}, state), { loaded: false, error: null }))), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["on"])(_users_actions__WEBPACK_IMPORTED_MODULE_2__["loadUsersSuccess"], (state, { users }) => usersAdapter.setAll(users, Object.assign(Object.assign({}, state), { loaded: true }))), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["on"])(_users_actions__WEBPACK_IMPORTED_MODULE_2__["loadUsersFailure"], (state, { error }) => (Object.assign(Object.assign({}, state), { error }))));
function reducer(state, action) {
    return usersReducer(state, action);
}


/***/ }),

/***/ 0:
/*!*******************************************!*\
  !*** multi ./apps/ng-find-me/src/main.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\work\github\ng-find-me\apps\ng-find-me\src\main.ts */"aJYn");


/***/ }),

/***/ "1rjH":
/*!********************************************************************************!*\
  !*** ./libs/ng-find-me/users/data-access/users-api/src/lib/request-builder.ts ***!
  \********************************************************************************/
/*! exports provided: RequestBuilder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestBuilder", function() { return RequestBuilder; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "IheW");
/* tslint:disable */
/* eslint-disable */

/**
 * Custom parameter codec to correctly handle the plus sign in parameter
 * values. See https://github.com/angular/angular/issues/18261
 */
class ParameterCodec {
    encodeKey(key) {
        return encodeURIComponent(key);
    }
    encodeValue(value) {
        return encodeURIComponent(value);
    }
    decodeKey(key) {
        return decodeURIComponent(key);
    }
    decodeValue(value) {
        return decodeURIComponent(value);
    }
}
const ParameterCodecInstance = new ParameterCodec();
/**
 * Base class for a parameter
 */
class Parameter {
    constructor(name, value, options, defaultStyle, defaultExplode) {
        this.name = name;
        this.value = value;
        this.options = options;
        this.options = options || {};
        if (this.options.style === null || this.options.style === undefined) {
            this.options.style = defaultStyle;
        }
        if (this.options.explode === null || this.options.explode === undefined) {
            this.options.explode = defaultExplode;
        }
    }
    serializeValue(value, separator = ',') {
        if (value === null || value === undefined) {
            return '';
        }
        else if (value instanceof Array) {
            return value
                .map((v) => this.serializeValue(v)
                .split(separator)
                .join(encodeURIComponent(separator)))
                .join(separator);
        }
        else if (typeof value === 'object') {
            const array = [];
            for (const key of Object.keys(value)) {
                let propVal = value[key];
                if (propVal !== null && propVal !== undefined) {
                    propVal = this.serializeValue(propVal)
                        .split(separator)
                        .join(encodeURIComponent(separator));
                    if (this.options.explode) {
                        array.push(`${key}=${propVal}`);
                    }
                    else {
                        array.push(key);
                        array.push(propVal);
                    }
                }
            }
            return array.join(separator);
        }
        else {
            return String(value);
        }
    }
}
/**
 * A parameter in the operation path
 */
class PathParameter extends Parameter {
    constructor(name, value, options) {
        super(name, value, options, 'simple', false);
    }
    append(path) {
        let value = this.value;
        if (value === null || value === undefined) {
            value = '';
        }
        let prefix = this.options.style === 'label' ? '.' : '';
        let separator = this.options.explode ? (prefix === '' ? ',' : prefix) : ',';
        if (this.options.style === 'matrix') {
            // The parameter name is just used as prefix, except in some cases...
            prefix = `;${this.name}=`;
            if (this.options.explode && typeof value === 'object') {
                prefix = ';';
                if (value instanceof Array) {
                    // For arrays we have to repeat the name for each element
                    value = value.map((v) => `${this.name}=${this.serializeValue(v, ';')}`);
                    separator = ';';
                }
                else {
                    // For objects we have to put each the key / value pairs
                    value = this.serializeValue(value, ';');
                }
            }
        }
        value = prefix + this.serializeValue(value, separator);
        // Replace both the plain variable and the corresponding variant taking in the prefix and explode into account
        path = path.replace(`{${this.name}}`, value);
        path = path.replace(`{${prefix}${this.name}${this.options.explode ? '*' : ''}}`, value);
        return path;
    }
}
/**
 * A parameter in the query
 */
class QueryParameter extends Parameter {
    constructor(name, value, options) {
        super(name, value, options, 'form', true);
    }
    append(params) {
        if (this.value instanceof Array) {
            // Array serialization
            if (this.options.explode) {
                for (const v of this.value) {
                    params = params.append(this.name, this.serializeValue(v));
                }
            }
            else {
                const separator = this.options.style === 'spaceDelimited'
                    ? ' '
                    : this.options.style === 'pipeDelimited'
                        ? '|'
                        : ',';
                return params.append(this.name, this.serializeValue(this.value, separator));
            }
        }
        else if (this.value !== null && typeof this.value === 'object') {
            // Object serialization
            if (this.options.style === 'deepObject') {
                // Append a parameter for each key, in the form `name[key]`
                for (const key of Object.keys(this.value)) {
                    const propVal = this.value[key];
                    if (propVal !== null && propVal !== undefined) {
                        params = params.append(`${this.name}[${key}]`, this.serializeValue(propVal));
                    }
                }
            }
            else if (this.options.explode) {
                // Append a parameter for each key without using the parameter name
                for (const key of Object.keys(this.value)) {
                    const propVal = this.value[key];
                    if (propVal !== null && propVal !== undefined) {
                        params = params.append(key, this.serializeValue(propVal));
                    }
                }
            }
            else {
                // Append a single parameter whose values are a comma-separated list of key,value,key,value...
                const array = [];
                for (const key of Object.keys(this.value)) {
                    const propVal = this.value[key];
                    if (propVal !== null && propVal !== undefined) {
                        array.push(key);
                        array.push(propVal);
                    }
                }
                params = params.append(this.name, this.serializeValue(array));
            }
        }
        else if (this.value !== null && this.value !== undefined) {
            // Plain value
            params = params.append(this.name, this.serializeValue(this.value));
        }
        return params;
    }
}
/**
 * A parameter in the HTTP request header
 */
class HeaderParameter extends Parameter {
    constructor(name, value, options) {
        super(name, value, options, 'simple', false);
    }
    append(headers) {
        if (this.value !== null && this.value !== undefined) {
            if (this.value instanceof Array) {
                for (const v of this.value) {
                    headers = headers.append(this.name, this.serializeValue(v));
                }
            }
            else {
                headers = headers.append(this.name, this.serializeValue(this.value));
            }
        }
        return headers;
    }
}
/**
 * Helper to build http requests from parameters
 */
class RequestBuilder {
    constructor(rootUrl, operationPath, method) {
        this.rootUrl = rootUrl;
        this.operationPath = operationPath;
        this.method = method;
        this._path = new Map();
        this._query = new Map();
        this._header = new Map();
    }
    /**
     * Sets a path parameter
     */
    path(name, value, options) {
        this._path.set(name, new PathParameter(name, value, options || {}));
    }
    /**
     * Sets a query parameter
     */
    query(name, value, options) {
        this._query.set(name, new QueryParameter(name, value, options || {}));
    }
    /**
     * Sets a header parameter
     */
    header(name, value, options) {
        this._header.set(name, new HeaderParameter(name, value, options || {}));
    }
    /**
     * Sets the body content, along with the content type
     */
    body(value, contentType = 'application/json') {
        if (value instanceof Blob) {
            this._bodyContentType = value.type;
        }
        else {
            this._bodyContentType = contentType;
        }
        if (this._bodyContentType === 'application/x-www-form-urlencoded' &&
            value !== null &&
            typeof value === 'object') {
            // Handle URL-encoded data
            const pairs = [];
            for (const key of Object.keys(value)) {
                let val = value[key];
                if (!(val instanceof Array)) {
                    val = [val];
                }
                for (const v of val) {
                    const formValue = this.formDataValue(v);
                    if (formValue !== null) {
                        pairs.push([key, formValue]);
                    }
                }
            }
            this._bodyContent = pairs
                .map((p) => `${encodeURIComponent(p[0])}=${encodeURIComponent(p[1])}`)
                .join('&');
        }
        else if (this._bodyContentType === 'multipart/form-data') {
            // Handle multipart form data
            const formData = new FormData();
            if (value !== null && value !== undefined) {
                for (const key of Object.keys(value)) {
                    const val = value[key];
                    if (val instanceof Array) {
                        for (const v of val) {
                            const toAppend = this.formDataValue(v);
                            if (toAppend !== null) {
                                formData.append(key, toAppend);
                            }
                        }
                    }
                    else {
                        const toAppend = this.formDataValue(val);
                        if (toAppend !== null) {
                            formData.set(key, toAppend);
                        }
                    }
                }
            }
            this._bodyContent = formData;
        }
        else {
            // The body is the plain content
            this._bodyContent = value;
        }
    }
    formDataValue(value) {
        if (value === null || value === undefined) {
            return null;
        }
        if (value instanceof Blob) {
            return value;
        }
        if (typeof value === 'object') {
            return JSON.stringify(value);
        }
        return String(value);
    }
    /**
     * Builds the request with the current set parameters
     */
    build(options) {
        options = options || {};
        // Path parameters
        let path = this.operationPath;
        for (const pathParam of this._path.values()) {
            path = pathParam.append(path);
        }
        const url = this.rootUrl + path;
        // Query parameters
        let httpParams = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpParams"]({
            encoder: ParameterCodecInstance,
        });
        for (const queryParam of this._query.values()) {
            httpParams = queryParam.append(httpParams);
        }
        // Header parameters
        let httpHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpHeaders"]();
        if (options.accept) {
            httpHeaders = httpHeaders.append('Accept', options.accept);
        }
        for (const headerParam of this._header.values()) {
            httpHeaders = headerParam.append(httpHeaders);
        }
        // Request content headers
        if (this._bodyContentType && !(this._bodyContent instanceof FormData)) {
            httpHeaders = httpHeaders.set('Content-Type', this._bodyContentType);
        }
        // Perform the request
        return new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpRequest"](this.method.toUpperCase(), url, this._bodyContent, {
            params: httpParams,
            headers: httpHeaders,
            responseType: options.responseType,
            reportProgress: options.reportProgress,
        });
    }
}


/***/ }),

/***/ "2xtJ":
/*!****************************************************************************************!*\
  !*** ./libs/ng-find-me/users/data-access/users-api/src/lib/models/api-user-summary.ts ***!
  \****************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "7pwz":
/*!**************************************************************************************!*\
  !*** ./libs/ng-find-me/users/data-access/users-api/src/lib/models/api-address-vm.ts ***!
  \**************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "8XMm":
/*!*****************************************************************************************!*\
  !*** ./libs/ng-find-me/users/data-access/users-state/src/lib/+state/users.selectors.ts ***!
  \*****************************************************************************************/
/*! exports provided: getUsersState, getUsersLoaded, getUsersError, getAllUsers, getUsersEntities, getSelectedId, getSelected */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUsersState", function() { return getUsersState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUsersLoaded", function() { return getUsersLoaded; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUsersError", function() { return getUsersError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllUsers", function() { return getAllUsers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUsersEntities", function() { return getUsersEntities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSelectedId", function() { return getSelectedId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSelected", function() { return getSelected; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "tqRt");
/* harmony import */ var _users_reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./users.reducer */ "+QEs");


// Lookup the 'Users' feature state managed by NgRx
const getUsersState = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createFeatureSelector"])(_users_reducer__WEBPACK_IMPORTED_MODULE_1__["USERS_FEATURE_KEY"]);
const { selectAll, selectEntities } = _users_reducer__WEBPACK_IMPORTED_MODULE_1__["usersAdapter"].getSelectors();
const getUsersLoaded = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(getUsersState, (state) => state.loaded);
const getUsersError = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(getUsersState, (state) => state.error);
const getAllUsers = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(getUsersState, (state) => selectAll(state));
const getUsersEntities = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(getUsersState, (state) => selectEntities(state));
const getSelectedId = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(getUsersState, (state) => state.selectedId);
const getSelected = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(getUsersEntities, getSelectedId, (entities, selectedId) => selectedId && entities[selectedId]);


/***/ }),

/***/ "Alcq":
/*!************************************************************************!*\
  !*** ./libs/ng-find-me/feature-shell/src/lib/shell/shell.component.ts ***!
  \************************************************************************/
/*! exports provided: ShellComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShellComponent", function() { return ShellComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "iInd");


class ShellComponent {
}
ShellComponent.ɵfac = function ShellComponent_Factory(t) { return new (t || ShellComponent)(); };
ShellComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ShellComponent, selectors: [["findme-shell"]], decls: 1, vars: 0, template: function ShellComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzaGVsbC5jb21wb25lbnQuY3NzIn0= */"] });


/***/ }),

/***/ "DSsS":
/*!***********************************************!*\
  !*** ./apps/ng-find-me/src/app/app.module.ts ***!
  \***********************************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "cUpR");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ "vLbj");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var _findme_ng_find_me_feature_shell__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @findme/ng-find-me/feature-shell */ "j/hC");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "IheW");
/* harmony import */ var _taiga_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @taiga-ui/core */ "fHwI");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "omvX");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "8Y7J");








class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({ providers: [
        {
            provide: _taiga_ui_core__WEBPACK_IMPORTED_MODULE_5__["TUI_ICONS_PATH"],
            useValue: Object(_taiga_ui_core__WEBPACK_IMPORTED_MODULE_5__["iconsPathFactory"])('assets/taiga-ui/icons/'),
        },
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"],
            _taiga_ui_core__WEBPACK_IMPORTED_MODULE_5__["TuiRootModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientJsonpModule"],
            _findme_ng_find_me_feature_shell__WEBPACK_IMPORTED_MODULE_3__["NgFindMeFeatureShellModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"],
        _taiga_ui_core__WEBPACK_IMPORTED_MODULE_5__["TuiRootModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientJsonpModule"],
        _findme_ng_find_me_feature_shell__WEBPACK_IMPORTED_MODULE_3__["NgFindMeFeatureShellModule"]] }); })();


/***/ }),

/***/ "G0kw":
/*!**************************************************************************************!*\
  !*** ./libs/ng-find-me/users/data-access/users-state/src/lib/+state/users.models.ts ***!
  \**************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "GULU":
/*!******************************************************************!*\
  !*** ./libs/ng-find-me/users/data-access/users-api/src/index.ts ***!
  \******************************************************************/
/*! exports provided: UsersApiModule, ApiUsersService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_users_api_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/users-api.module */ "bMBW");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UsersApiModule", function() { return _lib_users_api_module__WEBPACK_IMPORTED_MODULE_0__["UsersApiModule"]; });

/* harmony import */ var _lib_models_api_user_summary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/models/api-user-summary */ "2xtJ");
/* empty/unused harmony star reexport *//* harmony import */ var _lib_models_api_address_vm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/models/api-address-vm */ "7pwz");
/* empty/unused harmony star reexport *//* harmony import */ var _lib_services_api_users_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/services/api-users.service */ "Oda8");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiUsersService", function() { return _lib_services_api_users_service__WEBPACK_IMPORTED_MODULE_3__["ApiUsersService"]; });







/***/ }),

/***/ "K91o":
/*!******************************************************************************************************************!*\
  !*** ./libs/ng-find-me/users/data-access/users-state/src/lib/ng-find-me-users-data-access-users-state.module.ts ***!
  \******************************************************************************************************************/
/*! exports provided: NgFindMeUsersDataAccessUsersStateModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgFindMeUsersDataAccessUsersStateModule", function() { return NgFindMeUsersDataAccessUsersStateModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "SVse");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ "tqRt");
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/effects */ "7bNT");
/* harmony import */ var _state_users_reducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./+state/users.reducer */ "+QEs");
/* harmony import */ var _state_users_effects__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./+state/users.effects */ "e9Of");
/* harmony import */ var _findme_ng_find_me_users_data_access_users_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @findme/ng-find-me/users/data-access/users-api */ "GULU");
/* harmony import */ var _findme_ng_find_me_shared_environments__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @findme/ng-find-me/shared/environments */ "zcu3");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "IheW");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _users_api_src_lib_users_api_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../users-api/src/lib/users-api.module */ "bMBW");












class NgFindMeUsersDataAccessUsersStateModule {
}
NgFindMeUsersDataAccessUsersStateModule.ɵfac = function NgFindMeUsersDataAccessUsersStateModule_Factory(t) { return new (t || NgFindMeUsersDataAccessUsersStateModule)(); };
NgFindMeUsersDataAccessUsersStateModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({ type: NgFindMeUsersDataAccessUsersStateModule });
NgFindMeUsersDataAccessUsersStateModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"],
            _ngrx_store__WEBPACK_IMPORTED_MODULE_1__["StoreModule"].forFeature(_state_users_reducer__WEBPACK_IMPORTED_MODULE_3__["USERS_FEATURE_KEY"], _state_users_reducer__WEBPACK_IMPORTED_MODULE_3__["reducer"]),
            _ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["EffectsModule"].forFeature([_state_users_effects__WEBPACK_IMPORTED_MODULE_4__["UsersEffects"]]),
            _findme_ng_find_me_users_data_access_users_api__WEBPACK_IMPORTED_MODULE_5__["UsersApiModule"].forRoot({ rootUrl: _findme_ng_find_me_shared_environments__WEBPACK_IMPORTED_MODULE_6__["environment"].apiRootUrl }),
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](NgFindMeUsersDataAccessUsersStateModule, { imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"], _ngrx_store__WEBPACK_IMPORTED_MODULE_1__["StoreFeatureModule"], _ngrx_effects__WEBPACK_IMPORTED_MODULE_2__["EffectsFeatureModule"], _users_api_src_lib_users_api_module__WEBPACK_IMPORTED_MODULE_9__["UsersApiModule"]] }); })();


/***/ }),

/***/ "Oda8":
/*!*******************************************************************************************!*\
  !*** ./libs/ng-find-me/users/data-access/users-api/src/lib/services/api-users.service.ts ***!
  \*******************************************************************************************/
/*! exports provided: ApiUsersService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiUsersService", function() { return ApiUsersService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "IheW");
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base-service */ "RqdY");
/* harmony import */ var _api_configuration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api-configuration */ "eQ0b");
/* harmony import */ var _request_builder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../request-builder */ "1rjH");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "8Y7J");








class ApiUsersService extends _base_service__WEBPACK_IMPORTED_MODULE_1__["BaseService"] {
    constructor(config, http) {
        super(config, http);
    }
    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `usersGet$Plain()` instead.
     *
     * This method doesn't expect any request body.
     */
    usersGet$Plain$Response(params) {
        const rb = new _request_builder__WEBPACK_IMPORTED_MODULE_3__["RequestBuilder"](this.rootUrl, ApiUsersService.UsersGetPath, 'get');
        if (params) {
        }
        return this.http
            .request(rb.build({
            responseType: 'text',
            accept: 'text/plain',
        }))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])((r) => r instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpResponse"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((r) => {
            return r;
        }));
    }
    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `usersGet$Plain$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    usersGet$Plain(params) {
        return this.usersGet$Plain$Response(params).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((r) => r.body));
    }
    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `usersGet$Json()` instead.
     *
     * This method doesn't expect any request body.
     */
    usersGet$Json$Response(params) {
        const rb = new _request_builder__WEBPACK_IMPORTED_MODULE_3__["RequestBuilder"](this.rootUrl, ApiUsersService.UsersGetPath, 'get');
        if (params) {
        }
        return this.http
            .request(rb.build({
            responseType: 'json',
            accept: 'text/json',
        }))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])((r) => r instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpResponse"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((r) => {
            return r;
        }));
    }
    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `usersGet$Json$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    usersGet$Json(params) {
        return this.usersGet$Json$Response(params).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((r) => r.body));
    }
}
/**
 * Path part for operation usersGet
 */
ApiUsersService.UsersGetPath = '/users';
ApiUsersService.ɵfac = function ApiUsersService_Factory(t) { return new (t || ApiUsersService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_api_configuration__WEBPACK_IMPORTED_MODULE_2__["ApiConfiguration"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"])); };
ApiUsersService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({ token: ApiUsersService, factory: ApiUsersService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "Q/rn":
/*!********************************************************************!*\
  !*** ./libs/ng-find-me/users/data-access/users-state/src/index.ts ***!
  \********************************************************************/
/*! exports provided: init, loadUsersSuccess, loadUsersFailure, USERS_FEATURE_KEY, usersAdapter, initialState, reducer, getUsersState, getUsersLoaded, getUsersError, getAllUsers, getUsersEntities, getSelectedId, getSelected, NgFindMeUsersDataAccessUsersStateModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_state_users_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/+state/users.actions */ "lRdf");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "init", function() { return _lib_state_users_actions__WEBPACK_IMPORTED_MODULE_0__["init"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "loadUsersSuccess", function() { return _lib_state_users_actions__WEBPACK_IMPORTED_MODULE_0__["loadUsersSuccess"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "loadUsersFailure", function() { return _lib_state_users_actions__WEBPACK_IMPORTED_MODULE_0__["loadUsersFailure"]; });

/* harmony import */ var _lib_state_users_reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/+state/users.reducer */ "+QEs");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "USERS_FEATURE_KEY", function() { return _lib_state_users_reducer__WEBPACK_IMPORTED_MODULE_1__["USERS_FEATURE_KEY"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "usersAdapter", function() { return _lib_state_users_reducer__WEBPACK_IMPORTED_MODULE_1__["usersAdapter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return _lib_state_users_reducer__WEBPACK_IMPORTED_MODULE_1__["initialState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "reducer", function() { return _lib_state_users_reducer__WEBPACK_IMPORTED_MODULE_1__["reducer"]; });

/* harmony import */ var _lib_state_users_selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/+state/users.selectors */ "8XMm");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getUsersState", function() { return _lib_state_users_selectors__WEBPACK_IMPORTED_MODULE_2__["getUsersState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getUsersLoaded", function() { return _lib_state_users_selectors__WEBPACK_IMPORTED_MODULE_2__["getUsersLoaded"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getUsersError", function() { return _lib_state_users_selectors__WEBPACK_IMPORTED_MODULE_2__["getUsersError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getAllUsers", function() { return _lib_state_users_selectors__WEBPACK_IMPORTED_MODULE_2__["getAllUsers"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getUsersEntities", function() { return _lib_state_users_selectors__WEBPACK_IMPORTED_MODULE_2__["getUsersEntities"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getSelectedId", function() { return _lib_state_users_selectors__WEBPACK_IMPORTED_MODULE_2__["getSelectedId"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getSelected", function() { return _lib_state_users_selectors__WEBPACK_IMPORTED_MODULE_2__["getSelected"]; });

/* harmony import */ var _lib_state_users_models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/+state/users.models */ "G0kw");
/* empty/unused harmony star reexport *//* harmony import */ var _lib_ng_find_me_users_data_access_users_state_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/ng-find-me-users-data-access-users-state.module */ "K91o");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NgFindMeUsersDataAccessUsersStateModule", function() { return _lib_ng_find_me_users_data_access_users_state_module__WEBPACK_IMPORTED_MODULE_4__["NgFindMeUsersDataAccessUsersStateModule"]; });








/***/ }),

/***/ "RqdY":
/*!*****************************************************************************!*\
  !*** ./libs/ng-find-me/users/data-access/users-api/src/lib/base-service.ts ***!
  \*****************************************************************************/
/*! exports provided: BaseService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseService", function() { return BaseService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "IheW");
/* harmony import */ var _api_configuration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api-configuration */ "eQ0b");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "8Y7J");





/**
 * Base class for services
 */
class BaseService {
    constructor(config, http) {
        this.config = config;
        this.http = http;
        this._rootUrl = '';
    }
    /**
     * Returns the root url for all operations in this service. If not set directly in this
     * service, will fallback to `ApiConfiguration.rootUrl`.
     */
    get rootUrl() {
        return this._rootUrl || this.config.rootUrl;
    }
    /**
     * Sets the root URL for API operations in this service.
     */
    set rootUrl(rootUrl) {
        this._rootUrl = rootUrl;
    }
}
BaseService.ɵfac = function BaseService_Factory(t) { return new (t || BaseService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_api_configuration__WEBPACK_IMPORTED_MODULE_1__["ApiConfiguration"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"])); };
BaseService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: BaseService, factory: BaseService.ɵfac });


/***/ }),

/***/ "UB/l":
/*!********************************************************************!*\
  !*** ./libs/ng-find-me/shared/data-access/src/lib/+state/index.ts ***!
  \********************************************************************/
/*! exports provided: reducers, metaReducers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducers", function() { return reducers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "metaReducers", function() { return metaReducers; });
const reducers = {};
const metaReducers = [];


/***/ }),

/***/ "aJYn":
/*!*************************************!*\
  !*** ./apps/ng-find-me/src/main.ts ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "cUpR");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "DSsS");
/* harmony import */ var _findme_ng_find_me_shared_environments__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @findme/ng-find-me/shared/environments */ "zcu3");




if (_findme_ng_find_me_shared_environments__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]()
    .bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch((err) => console.error(err));


/***/ }),

/***/ "bMBW":
/*!*********************************************************************************!*\
  !*** ./libs/ng-find-me/users/data-access/users-api/src/lib/users-api.module.ts ***!
  \*********************************************************************************/
/*! exports provided: UsersApiModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersApiModule", function() { return UsersApiModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "IheW");
/* harmony import */ var _api_configuration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api-configuration */ "eQ0b");
/* harmony import */ var _services_api_users_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/api-users.service */ "Oda8");
/* tslint:disable */
/* eslint-disable */






/**
 * Module that provides all services and configuration.
 */
class UsersApiModule {
    constructor(parentModule, http) {
        if (parentModule) {
            throw new Error('UsersApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
                'See also https://github.com/angular/angular/issues/20575');
        }
    }
    static forRoot(params) {
        return {
            ngModule: UsersApiModule,
            providers: [
                {
                    provide: _api_configuration__WEBPACK_IMPORTED_MODULE_2__["ApiConfiguration"],
                    useValue: params,
                },
            ],
        };
    }
}
UsersApiModule.ɵfac = function UsersApiModule_Factory(t) { return new (t || UsersApiModule)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](UsersApiModule, 12), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], 8)); };
UsersApiModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: UsersApiModule });
UsersApiModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ providers: [_services_api_users_service__WEBPACK_IMPORTED_MODULE_3__["ApiUsersService"], _api_configuration__WEBPACK_IMPORTED_MODULE_2__["ApiConfiguration"]], imports: [[]] });


/***/ }),

/***/ "cTdo":
/*!*********************************************************!*\
  !*** ./libs/ng-find-me/shared/data-access/src/index.ts ***!
  \*********************************************************/
/*! exports provided: NgFindMeSharedDataAccessModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_ng_find_me_shared_data_access_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/ng-find-me-shared-data-access.module */ "fwlf");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NgFindMeSharedDataAccessModule", function() { return _lib_ng_find_me_shared_data_access_module__WEBPACK_IMPORTED_MODULE_0__["NgFindMeSharedDataAccessModule"]; });




/***/ }),

/***/ "e9Of":
/*!***************************************************************************************!*\
  !*** ./libs/ng-find-me/users/data-access/users-state/src/lib/+state/users.effects.ts ***!
  \***************************************************************************************/
/*! exports provided: UsersEffects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersEffects", function() { return UsersEffects; });
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/effects */ "7bNT");
/* harmony import */ var _nrwl_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nrwl/angular */ "ZB9N");
/* harmony import */ var _users_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./users.actions */ "lRdf");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _findme_ng_find_me_users_data_access_users_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @findme/ng-find-me/users/data-access/users-api */ "GULU");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "8Y7J");








class UsersEffects {
    constructor(actions$, usersApi) {
        this.actions$ = actions$;
        this.usersApi = usersApi;
        this.init$ = Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__["createEffect"])(() => this.actions$.pipe(Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__["ofType"])(_users_actions__WEBPACK_IMPORTED_MODULE_2__["init"]), Object(_nrwl_angular__WEBPACK_IMPORTED_MODULE_1__["fetch"])({
            run: (action) => {
                return this.usersApi
                    .usersGet$Json()
                    .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((users) => _users_actions__WEBPACK_IMPORTED_MODULE_2__["loadUsersSuccess"]({ users })));
            },
            onError: (action, error) => {
                console.error('Error', error);
                return _users_actions__WEBPACK_IMPORTED_MODULE_2__["loadUsersFailure"]({ error });
            },
        })));
    }
}
UsersEffects.ɵfac = function UsersEffects_Factory(t) { return new (t || UsersEffects)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_ngrx_effects__WEBPACK_IMPORTED_MODULE_0__["Actions"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_findme_ng_find_me_users_data_access_users_api__WEBPACK_IMPORTED_MODULE_4__["ApiUsersService"])); };
UsersEffects.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({ token: UsersEffects, factory: UsersEffects.ɵfac });


/***/ }),

/***/ "eQ0b":
/*!**********************************************************************************!*\
  !*** ./libs/ng-find-me/users/data-access/users-api/src/lib/api-configuration.ts ***!
  \**********************************************************************************/
/*! exports provided: ApiConfiguration */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiConfiguration", function() { return ApiConfiguration; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");

/**
 * Global configuration
 */
class ApiConfiguration {
    constructor() {
        this.rootUrl = '';
    }
}
ApiConfiguration.ɵfac = function ApiConfiguration_Factory(t) { return new (t || ApiConfiguration)(); };
ApiConfiguration.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ApiConfiguration, factory: ApiConfiguration.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "fwlf":
/*!********************************************************************************************!*\
  !*** ./libs/ng-find-me/shared/data-access/src/lib/ng-find-me-shared-data-access.module.ts ***!
  \********************************************************************************************/
/*! exports provided: NgFindMeSharedDataAccessModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgFindMeSharedDataAccessModule", function() { return NgFindMeSharedDataAccessModule; });
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/effects */ "7bNT");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ "tqRt");
/* harmony import */ var _ngrx_store_devtools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store-devtools */ "yQ3t");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./+state */ "UB/l");
/* harmony import */ var _state_app_effects__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./+state/app.effects */ "wogh");
/* harmony import */ var _findme_ng_find_me_shared_environments__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @findme/ng-find-me/shared/environments */ "zcu3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "8Y7J");










class NgFindMeSharedDataAccessModule {
}
NgFindMeSharedDataAccessModule.ɵfac = function NgFindMeSharedDataAccessModule_Factory(t) { return new (t || NgFindMeSharedDataAccessModule)(); };
NgFindMeSharedDataAccessModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: NgFindMeSharedDataAccessModule });
NgFindMeSharedDataAccessModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ imports: [[
            _ngrx_store__WEBPACK_IMPORTED_MODULE_1__["StoreModule"].forRoot(_state__WEBPACK_IMPORTED_MODULE_3__["reducers"], {
                metaReducers: _state__WEBPACK_IMPORTED_MODULE_3__["metaReducers"],
                runtimeChecks: {
                    strictStateImmutability: true,
                    strictActionImmutability: true,
                },
            }),
            !_findme_ng_find_me_shared_environments__WEBPACK_IMPORTED_MODULE_5__["environment"].production ? _ngrx_store_devtools__WEBPACK_IMPORTED_MODULE_2__["StoreDevtoolsModule"].instrument() : [],
            _ngrx_effects__WEBPACK_IMPORTED_MODULE_0__["EffectsModule"].forRoot([_state_app_effects__WEBPACK_IMPORTED_MODULE_4__["AppEffects"]]),
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](NgFindMeSharedDataAccessModule, { imports: [_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["StoreRootModule"], _ngrx_store_devtools__WEBPACK_IMPORTED_MODULE_2__["StoreDevtoolsModule"], _ngrx_effects__WEBPACK_IMPORTED_MODULE_0__["EffectsRootModule"]] }); })();


/***/ }),

/***/ "j/hC":
/*!****************************************************!*\
  !*** ./libs/ng-find-me/feature-shell/src/index.ts ***!
  \****************************************************/
/*! exports provided: NgFindMeFeatureShellModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_ng_find_me_feature_shell_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/ng-find-me-feature-shell.module */ "nx55");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NgFindMeFeatureShellModule", function() { return _lib_ng_find_me_feature_shell_module__WEBPACK_IMPORTED_MODULE_0__["NgFindMeFeatureShellModule"]; });




/***/ }),

/***/ "lRdf":
/*!***************************************************************************************!*\
  !*** ./libs/ng-find-me/users/data-access/users-state/src/lib/+state/users.actions.ts ***!
  \***************************************************************************************/
/*! exports provided: init, loadUsersSuccess, loadUsersFailure */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadUsersSuccess", function() { return loadUsersSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadUsersFailure", function() { return loadUsersFailure; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "tqRt");

const init = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Users Page] Init');
const loadUsersSuccess = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Users/API] Load Users Success', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
const loadUsersFailure = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Users/API] Load Users Failure', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());


/***/ }),

/***/ "m7JY":
/*!********************************************************************!*\
  !*** ./libs/ng-find-me/shared/environments/src/lib/environment.ts ***!
  \********************************************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    apiRootUrl: 'https://findmeapi-env.eba-y8ktwmfy.ap-southeast-2.elasticbeanstalk.com',
};


/***/ }),

/***/ "nx55":
/*!**********************************************************************************!*\
  !*** ./libs/ng-find-me/feature-shell/src/lib/ng-find-me-feature-shell.module.ts ***!
  \**********************************************************************************/
/*! exports provided: NgFindMeFeatureShellModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgFindMeFeatureShellModule", function() { return NgFindMeFeatureShellModule; });
/* harmony import */ var _findme_ng_find_me_shared_data_access__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @findme/ng-find-me/shared/data-access */ "cTdo");
/* harmony import */ var _findme_ng_find_me_users_data_access_users_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @findme/ng-find-me/users/data-access/users-state */ "Q/rn");
/* harmony import */ var _shell_shell_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shell/shell.component */ "Alcq");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "8Y7J");






const routes = [
    {
        path: '',
        component: _shell_shell_component__WEBPACK_IMPORTED_MODULE_2__["ShellComponent"],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'user-address-search',
            },
            {
                path: 'user-address-search',
                loadChildren: () => __webpack_require__.e(/*! import() | findme-ng-find-me-feature-user-address-search */ "findme-ng-find-me-feature-user-address-search").then(__webpack_require__.bind(null, /*! @findme/ng-find-me/feature-user-address-search */ "Bbl4")).then((esModule) => esModule.NgFindMeFeatureUserAddressSearchModule),
            },
        ],
    },
];
class NgFindMeFeatureShellModule {
}
NgFindMeFeatureShellModule.ɵfac = function NgFindMeFeatureShellModule_Factory(t) { return new (t || NgFindMeFeatureShellModule)(); };
NgFindMeFeatureShellModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: NgFindMeFeatureShellModule });
NgFindMeFeatureShellModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forRoot(routes),
            _findme_ng_find_me_shared_data_access__WEBPACK_IMPORTED_MODULE_0__["NgFindMeSharedDataAccessModule"],
            _findme_ng_find_me_users_data_access_users_state__WEBPACK_IMPORTED_MODULE_1__["NgFindMeUsersDataAccessUsersStateModule"],
        ], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](NgFindMeFeatureShellModule, { declarations: [_shell_shell_component__WEBPACK_IMPORTED_MODULE_2__["ShellComponent"]], imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"], _findme_ng_find_me_shared_data_access__WEBPACK_IMPORTED_MODULE_0__["NgFindMeSharedDataAccessModule"],
        _findme_ng_find_me_users_data_access_users_state__WEBPACK_IMPORTED_MODULE_1__["NgFindMeUsersDataAccessUsersStateModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"]] }); })();


/***/ }),

/***/ "vLbj":
/*!**************************************************!*\
  !*** ./apps/ng-find-me/src/app/app.component.ts ***!
  \**************************************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _taiga_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @taiga-ui/core */ "fHwI");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "iInd");



class AppComponent {
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["findme-root"]], decls: 2, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tui-root");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_taiga_ui_core__WEBPACK_IMPORTED_MODULE_1__["TuiRootComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "wogh":
/*!**************************************************************************!*\
  !*** ./libs/ng-find-me/shared/data-access/src/lib/+state/app.effects.ts ***!
  \**************************************************************************/
/*! exports provided: AppEffects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppEffects", function() { return AppEffects; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");

class AppEffects {
}
AppEffects.ɵfac = function AppEffects_Factory(t) { return new (t || AppEffects)(); };
AppEffects.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AppEffects, factory: AppEffects.ɵfac });


/***/ }),

/***/ "zcu3":
/*!**********************************************************!*\
  !*** ./libs/ng-find-me/shared/environments/src/index.ts ***!
  \**********************************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/environment */ "m7JY");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return _lib_environment__WEBPACK_IMPORTED_MODULE_0__["environment"]; });




/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map