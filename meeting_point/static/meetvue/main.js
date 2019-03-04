(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _components_comments_comments_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/comments/comments.component */ "./src/components/comments/comments.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_guard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth.guard */ "./src/app/auth.guard.ts");
/* harmony import */ var _pagenotfound__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pagenotfound */ "./src/app/pagenotfound.ts");
/* harmony import */ var _socket_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./socket.service */ "./src/app/socket.service.ts");
/* harmony import */ var _components_home_home_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/home/home.component */ "./src/components/home/home.component.ts");
/* harmony import */ var _components_login_login_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/login/login.component */ "./src/components/login/login.component.ts");
/* harmony import */ var _components_forgotpassword_forgotpassword_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/forgotpassword/forgotpassword.component */ "./src/components/forgotpassword/forgotpassword.component.ts");
/* harmony import */ var _components_committees_committees_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/committees/committees.component */ "./src/components/committees/committees.component.ts");
/* harmony import */ var _components_committeedetails_commiteedetails_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/committeedetails/commiteedetails.component */ "./src/components/committeedetails/commiteedetails.component.ts");
/* harmony import */ var _components_meetings_meetings_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/meetings/meetings.component */ "./src/components/meetings/meetings.component.ts");
/* harmony import */ var _components_meetingdetails_meetingdetails_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../components/meetingdetails/meetingdetails.component */ "./src/components/meetingdetails/meetingdetails.component.ts");
/* harmony import */ var _components_profiledetails_profiledetails_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../components/profiledetails/profiledetails.component */ "./src/components/profiledetails/profiledetails.component.ts");
/* harmony import */ var _components_profiles_profiles_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../components/profiles/profiles.component */ "./src/components/profiles/profiles.component.ts");
/* harmony import */ var _components_resources_resources_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../components/resources/resources.component */ "./src/components/resources/resources.component.ts");
/* harmony import */ var _components_resourcedetails_resourcedetails_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../components/resourcedetails/resourcedetails.component */ "./src/components/resourcedetails/resourcedetails.component.ts");
/* harmony import */ var _components_survey_survey_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../components/survey/survey.component */ "./src/components/survey/survey.component.ts");
/* harmony import */ var _components_topics_topics_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../components/topics/topics.component */ "./src/components/topics/topics.component.ts");
/* harmony import */ var _components_document_document_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../components/document/document.component */ "./src/components/document/document.component.ts");
/* harmony import */ var _components_settings_settings_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../components/settings/settings.component */ "./src/components/settings/settings.component.ts");
/* harmony import */ var _components_peer_peer_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../components/peer/peer.component */ "./src/components/peer/peer.component.ts");
/* harmony import */ var _components_jitsi_jitsi_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../components/jitsi/jitsi.component */ "./src/components/jitsi/jitsi.component.ts");
/* harmony import */ var _components_setpassword_setpassword_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../components/setpassword/setpassword.component */ "./src/components/setpassword/setpassword.component.ts");
/* harmony import */ var src_components_signdoc_signdoc_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! src/components/signdoc/signdoc.component */ "./src/components/signdoc/signdoc.component.ts");
/* harmony import */ var src_components_chat_chat_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! src/components/chat/chat.component */ "./src/components/chat/chat.component.ts");
/* harmony import */ var _components_messenger_messenger_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../components/messenger/messenger.component */ "./src/components/messenger/messenger.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



























var appRoutes = [
    { path: 'login', component: _components_login_login_component__WEBPACK_IMPORTED_MODULE_7__["LoginComponent"] },
    { path: 'logout', component: _components_login_login_component__WEBPACK_IMPORTED_MODULE_7__["LoginComponent"] },
    { path: '', component: _components_home_home_component__WEBPACK_IMPORTED_MODULE_6__["HomeComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'forgot-password', component: _components_forgotpassword_forgotpassword_component__WEBPACK_IMPORTED_MODULE_8__["ForgotpasswordComponent"] },
    { path: 'set-password', component: _components_setpassword_setpassword_component__WEBPACK_IMPORTED_MODULE_23__["SetpasswordComponent"] },
    { path: 'my-profile', component: _components_profiledetails_profiledetails_component__WEBPACK_IMPORTED_MODULE_13__["ProfileDetailsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'committees', data: { searchAble: true }, component: _components_committees_committees_component__WEBPACK_IMPORTED_MODULE_9__["CommitteesComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'profiles', data: { searchAble: true }, component: _components_profiles_profiles_component__WEBPACK_IMPORTED_MODULE_14__["ProfilesComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'resources', data: { searchAble: true }, component: _components_resources_resources_component__WEBPACK_IMPORTED_MODULE_15__["ResourcesComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'meetings/archived', data: { searchAble: true }, component: _components_meetings_meetings_component__WEBPACK_IMPORTED_MODULE_11__["MeetingsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'meetings/completed', data: { searchAble: true }, component: _components_meetings_meetings_component__WEBPACK_IMPORTED_MODULE_11__["MeetingsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'meetings/upcoming', data: { searchAble: true }, component: _components_meetings_meetings_component__WEBPACK_IMPORTED_MODULE_11__["MeetingsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'upcoming/meeting/:id', component: _components_meetingdetails_meetingdetails_component__WEBPACK_IMPORTED_MODULE_12__["MeetingDetailsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'completed/meeting/:id', component: _components_meetingdetails_meetingdetails_component__WEBPACK_IMPORTED_MODULE_12__["MeetingDetailsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'archived/meeting/:id', component: _components_meetingdetails_meetingdetails_component__WEBPACK_IMPORTED_MODULE_12__["MeetingDetailsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'meeting/:id', component: _components_meetingdetails_meetingdetails_component__WEBPACK_IMPORTED_MODULE_12__["MeetingDetailsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'committees/:id', component: _components_committeedetails_commiteedetails_component__WEBPACK_IMPORTED_MODULE_10__["CommitteeDetailsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'profile/:id', component: _components_profiledetails_profiledetails_component__WEBPACK_IMPORTED_MODULE_13__["ProfileDetailsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'resource/:id', component: _components_resourcedetails_resourcedetails_component__WEBPACK_IMPORTED_MODULE_16__["ResourceDetailsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'home/meeting/:id', component: _components_meetingdetails_meetingdetails_component__WEBPACK_IMPORTED_MODULE_12__["MeetingDetailsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'survey/:id', component: _components_survey_survey_component__WEBPACK_IMPORTED_MODULE_17__["SurveyComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'home/survey/:id', component: _components_survey_survey_component__WEBPACK_IMPORTED_MODULE_17__["SurveyComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'topic/:id', component: _components_topics_topics_component__WEBPACK_IMPORTED_MODULE_18__["TopicsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'signature/doc/:res_id', component: src_components_signdoc_signdoc_component__WEBPACK_IMPORTED_MODULE_24__["SigndocComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: ':doc_type/doc/:res_id', component: _components_document_document_component__WEBPACK_IMPORTED_MODULE_19__["DocumentComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: ':doc_type/doc/:res_id/:kw', component: _components_document_document_component__WEBPACK_IMPORTED_MODULE_19__["DocumentComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'iframe/:doc_type/:res_id/:token', component: _components_document_document_component__WEBPACK_IMPORTED_MODULE_19__["DocumentComponent"] },
    { path: 'chat', component: src_components_chat_chat_component__WEBPACK_IMPORTED_MODULE_25__["ChatComponent"] },
    { path: 'messenger', component: _components_messenger_messenger_component__WEBPACK_IMPORTED_MODULE_26__["MessengerComponent"] },
    { path: 'iframe/comments/:res_modal/:res_id/:token', component: _components_comments_comments_component__WEBPACK_IMPORTED_MODULE_0__["CommentsComponent"] },
    { path: 'comments/:res_modal', component: _components_comments_comments_component__WEBPACK_IMPORTED_MODULE_0__["CommentsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'settings', component: _components_settings_settings_component__WEBPACK_IMPORTED_MODULE_20__["SettingsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'conference/:id/:pin', component: _components_peer_peer_component__WEBPACK_IMPORTED_MODULE_21__["PeerComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'conference/:id', component: _components_peer_peer_component__WEBPACK_IMPORTED_MODULE_21__["PeerComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'jitsilow', component: _components_jitsi_jitsi_component__WEBPACK_IMPORTED_MODULE_22__["JitsiComponent"] },
    { path: 'jitsilow/:room', component: _components_jitsi_jitsi_component__WEBPACK_IMPORTED_MODULE_22__["JitsiComponent"] },
    { path: 'meetings/completed/:id', component: _components_meetingdetails_meetingdetails_component__WEBPACK_IMPORTED_MODULE_12__["MeetingDetailsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'meetings/archived/:id', component: _components_meetingdetails_meetingdetails_component__WEBPACK_IMPORTED_MODULE_12__["MeetingDetailsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'videocall/:room', component: _components_peer_peer_component__WEBPACK_IMPORTED_MODULE_21__["PeerComponent"] },
    { path: 'conference', component: _components_peer_peer_component__WEBPACK_IMPORTED_MODULE_21__["PeerComponent"] },
    // otherwise redirect to home
    { path: '**', component: _pagenotfound__WEBPACK_IMPORTED_MODULE_4__["PageNotFound"] }
];
var site_functions = window['functions'];
var first_route = true;
var routing_options = {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(appRoutes)],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
};
// if(window.location.origin.indexOf('meetvue.com') == -1)
// {
//     routing_options = {
//         imports: [RouterModule.forRoot(appRoutes, {useHash: true})],    
//         exports: [RouterModule],    
//     };
// }
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule(router, socketService) {
        this.router = router;
        this.socketService = socketService;
        router.events.subscribe(function (event) {
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__["NavigationStart"]) {
                socketService.init_route(event.url);
                $('.showmouseawaybutton.active').removeClass('active');
                $('.hidemouseaway').hide();
                $('#jitsi-meet-container').hide();
                $('#annotated-doc-conatiner').hide();
                site_functions.showLoader('route' + event.url);
                $('body').removeClass('pdf-viewer');
                window['pathname'] = event.url;
            }
            else if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__["NavigationEnd"]) {
                if (first_route) {
                    $('#main-div').hide();
                    first_route = false;
                }
                var next_url = event.url;
                var current_url = localStorage.getItem('current_url');
                if (!current_url) {
                    current_url = next_url;
                }
                localStorage.setItem('previous_url', current_url);
                localStorage.setItem('current_url', next_url);
                site_functions.hideLoader('route' + next_url);
            }
        });
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])(routing_options),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _socket_service__WEBPACK_IMPORTED_MODULE_5__["SocketService"]])
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"!odoo_build\">\n    <app-header></app-header>\n    <router-outlet></router-outlet>\n    <button (click)=\"topFunction()\" id=\"backTop\" title=\"Go to top\"><i class=\"fa fa-arrow-up\"></i></button>\n    <div class=\"modal fade\" id=\"signModal\" role=\"dialog\" aria-hidden=\"true\">\n        <div class=\"modal-dialog modal-md modal-dialog-centered\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">×</button>\n                </div>\n                <div id=\"signature-body\" class=\"modal-body\" style=\"min-height: 1009px;\">\n                    <div class=\"DocsButtonWrapper\">\n                        <span class=\"btn btn-primary btn-sm DocsBtn\" id=\"draw-sig\">Draw</span>\n                        <button id=\"upload-sig-btn\" class=\"btn btn-sm btn-primary DocsBtn o_select_file_button\" title=\"Select\" type=\"button\">Upload</button>\n                        <input id=\"upload-sig\" accept=\".jpg,.png,.jpeg\" style=\"display:none\" type=\"file\">\n                        <span class=\"btn btn-primary btn-sm DocsBtn\" id=\"auto-sig\">Auto</span>\n                        <span class=\"btn btn-primary btn-sm DocsBtn\" id=\"insert-sig\">Insert</span>\n                    </div>\n                    <div id=\"signature_editor\" class=\"kbw-signature\">\n                    </div>\n                    <span class=\"btn btn-danger btn-sm DocsBtn\" id=\"clear-sig\">Clear</span>\n                    <span class=\"btn btn-primary btn-sm DocsBtn\" id=\"save-sig\">Save</span>\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _socket_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./socket.service */ "./src/app/socket.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = /** @class */ (function () {
    function AppComponent(ss) {
        this.ss = ss;
        this.odoo_build = window['odoo'] ? 1 : undefined;
        this.socketService = ss;
    }
    AppComponent.prototype.topFunction = function () {
        document.body.scrollTop = 0;
        $("html, body").animate({ scrollTop: 0 }, 600);
    };
    AppComponent.prototype.scrollFunction = function () {
        if (window['odoo'])
            return;
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("backTop").style.display = "block";
        }
        else {
            document.getElementById("backTop").style.display = "none";
        }
    };
    AppComponent.prototype.ngOnInit = function () {
        var obj_this = this;
        window.onscroll = function () { obj_this.scrollFunction(); };
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
        }),
        __metadata("design:paramtypes", [_socket_service__WEBPACK_IMPORTED_MODULE_1__["SocketService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _pipes_format_time_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pipes/format-time.pipe */ "./src/app/pipes/format-time.pipe.ts");
/* harmony import */ var _pipes_keys_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pipes/keys.pipe */ "./src/app/pipes/keys.pipe.ts");
/* harmony import */ var _socket_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./socket.service */ "./src/app/socket.service.ts");
/* harmony import */ var _http_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./http.service */ "./src/app/http.service.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _auth_guard__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./auth.guard */ "./src/app/auth.guard.ts");
/* harmony import */ var _components_login_login_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/login/login.component */ "./src/components/login/login.component.ts");
/* harmony import */ var _components_home_home_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../components/home/home.component */ "./src/components/home/home.component.ts");
/* harmony import */ var _pagenotfound__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./pagenotfound */ "./src/app/pagenotfound.ts");
/* harmony import */ var _components_header_header_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../components/header/header.component */ "./src/components/header/header.component.ts");
/* harmony import */ var _components_chat_chat_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../components/chat/chat.component */ "./src/components/chat/chat.component.ts");
/* harmony import */ var _components_committees_committees_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../components/committees/committees.component */ "./src/components/committees/committees.component.ts");
/* harmony import */ var _components_committeedetails_commiteedetails_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../components/committeedetails/commiteedetails.component */ "./src/components/committeedetails/commiteedetails.component.ts");
/* harmony import */ var _components_profiledetails_profiledetails_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../components/profiledetails/profiledetails.component */ "./src/components/profiledetails/profiledetails.component.ts");
/* harmony import */ var _components_profiles_profiles_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../components/profiles/profiles.component */ "./src/components/profiles/profiles.component.ts");
/* harmony import */ var _components_meetings_meetings_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../components/meetings/meetings.component */ "./src/components/meetings/meetings.component.ts");
/* harmony import */ var _components_meetingdetails_meetingdetails_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../components/meetingdetails/meetingdetails.component */ "./src/components/meetingdetails/meetingdetails.component.ts");
/* harmony import */ var _components_resources_resources_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../components/resources/resources.component */ "./src/components/resources/resources.component.ts");
/* harmony import */ var _components_resourcedetails_resourcedetails_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../components/resourcedetails/resourcedetails.component */ "./src/components/resourcedetails/resourcedetails.component.ts");
/* harmony import */ var _components_survey_survey_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../components/survey/survey.component */ "./src/components/survey/survey.component.ts");
/* harmony import */ var _components_topics_topics_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../components/topics/topics.component */ "./src/components/topics/topics.component.ts");
/* harmony import */ var _components_paginator_paginator_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../components/paginator/paginator.component */ "./src/components/paginator/paginator.component.ts");
/* harmony import */ var _components_document_document_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../components/document/document.component */ "./src/components/document/document.component.ts");
/* harmony import */ var _components_settings_settings_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../components/settings/settings.component */ "./src/components/settings/settings.component.ts");
/* harmony import */ var _components_peer_peer_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../components/peer/peer.component */ "./src/components/peer/peer.component.ts");
/* harmony import */ var _components_jitsi_jitsi_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../components/jitsi/jitsi.component */ "./src/components/jitsi/jitsi.component.ts");
/* harmony import */ var _components_setpassword_setpassword_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ../components/setpassword/setpassword.component */ "./src/components/setpassword/setpassword.component.ts");
/* harmony import */ var _components_forgotpassword_forgotpassword_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ../components/forgotpassword/forgotpassword.component */ "./src/components/forgotpassword/forgotpassword.component.ts");
/* harmony import */ var _components_signdoc_signdoc_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ../components/signdoc/signdoc.component */ "./src/components/signdoc/signdoc.component.ts");
/* harmony import */ var _components_comments_comments_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ../components/comments/comments.component */ "./src/components/comments/comments.component.ts");
/* harmony import */ var _components_messenger_messenger_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ../components/messenger/messenger.component */ "./src/components/messenger/messenger.component.ts");
/* harmony import */ var _components_messageicon_messageicon_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ../components/messageicon/messageicon.component */ "./src/components/messageicon/messageicon.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






































var bootstrap_Components = undefined;
(function () {
    if (window['odoo']) {
        console.log("Is export build");
        bootstrap_Components = [_app_component__WEBPACK_IMPORTED_MODULE_8__["AppComponent"], _components_messageicon_messageicon_component__WEBPACK_IMPORTED_MODULE_36__["MessageiconComponent"], _components_messenger_messenger_component__WEBPACK_IMPORTED_MODULE_35__["MessengerComponent"], _components_chat_chat_component__WEBPACK_IMPORTED_MODULE_15__["ChatComponent"], _components_comments_comments_component__WEBPACK_IMPORTED_MODULE_34__["CommentsComponent"], _components_document_document_component__WEBPACK_IMPORTED_MODULE_27__["DocumentComponent"]];
    }
    else {
        window['odoo_build'] = 1;
        bootstrap_Components = [_app_component__WEBPACK_IMPORTED_MODULE_8__["AppComponent"]];
    }
})();
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_9__["AppRoutingModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"]
            ],
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_8__["AppComponent"],
                _components_home_home_component__WEBPACK_IMPORTED_MODULE_12__["HomeComponent"],
                _components_login_login_component__WEBPACK_IMPORTED_MODULE_11__["LoginComponent"],
                _pagenotfound__WEBPACK_IMPORTED_MODULE_13__["PageNotFound"],
                _components_header_header_component__WEBPACK_IMPORTED_MODULE_14__["HeaderComponent"],
                _components_profiledetails_profiledetails_component__WEBPACK_IMPORTED_MODULE_18__["ProfileDetailsComponent"],
                _components_profiles_profiles_component__WEBPACK_IMPORTED_MODULE_19__["ProfilesComponent"],
                _components_committees_committees_component__WEBPACK_IMPORTED_MODULE_16__["CommitteesComponent"],
                _components_committeedetails_commiteedetails_component__WEBPACK_IMPORTED_MODULE_17__["CommitteeDetailsComponent"],
                _components_resources_resources_component__WEBPACK_IMPORTED_MODULE_22__["ResourcesComponent"],
                _components_resourcedetails_resourcedetails_component__WEBPACK_IMPORTED_MODULE_23__["ResourceDetailsComponent"],
                _components_meetings_meetings_component__WEBPACK_IMPORTED_MODULE_20__["MeetingsComponent"],
                _components_meetingdetails_meetingdetails_component__WEBPACK_IMPORTED_MODULE_21__["MeetingDetailsComponent"],
                _components_survey_survey_component__WEBPACK_IMPORTED_MODULE_24__["SurveyComponent"],
                _components_topics_topics_component__WEBPACK_IMPORTED_MODULE_25__["TopicsComponent"],
                _pipes_format_time_pipe__WEBPACK_IMPORTED_MODULE_4__["FormatTimePipe"],
                _components_paginator_paginator_component__WEBPACK_IMPORTED_MODULE_26__["PaginatorComponent"],
                _components_document_document_component__WEBPACK_IMPORTED_MODULE_27__["DocumentComponent"],
                _components_settings_settings_component__WEBPACK_IMPORTED_MODULE_28__["SettingsComponent"],
                _components_peer_peer_component__WEBPACK_IMPORTED_MODULE_29__["PeerComponent"],
                _pipes_keys_pipe__WEBPACK_IMPORTED_MODULE_5__["KeysPipe"],
                _components_chat_chat_component__WEBPACK_IMPORTED_MODULE_15__["ChatComponent"],
                _components_jitsi_jitsi_component__WEBPACK_IMPORTED_MODULE_30__["JitsiComponent"],
                _components_setpassword_setpassword_component__WEBPACK_IMPORTED_MODULE_31__["SetpasswordComponent"],
                _components_forgotpassword_forgotpassword_component__WEBPACK_IMPORTED_MODULE_32__["ForgotpasswordComponent"],
                _components_signdoc_signdoc_component__WEBPACK_IMPORTED_MODULE_33__["SigndocComponent"],
                _components_comments_comments_component__WEBPACK_IMPORTED_MODULE_34__["CommentsComponent"],
                _components_messenger_messenger_component__WEBPACK_IMPORTED_MODULE_35__["MessengerComponent"],
                _components_messageicon_messageicon_component__WEBPACK_IMPORTED_MODULE_36__["MessageiconComponent"]
            ],
            providers: [
                _auth_guard__WEBPACK_IMPORTED_MODULE_10__["AuthGuard"],
                _socket_service__WEBPACK_IMPORTED_MODULE_6__["SocketService"],
                _http_service__WEBPACK_IMPORTED_MODULE_7__["HttpService"]
            ],
            bootstrap: bootstrap_Components
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/auth.guard.ts":
/*!*******************************!*\
  !*** ./src/app/auth.guard.ts ***!
  \*******************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _socket_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./socket.service */ "./src/app/socket.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = /** @class */ (function () {
    function AuthGuard(router, socketService) {
        this.router = router;
        this.socketService = socketService;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var dn_current_site_user = window['current_user'];
        if (dn_current_site_user.verified != 1) {
            dn_current_site_user.verifyCookie();
        }
        if (dn_current_site_user.verified != 1) {
            window['functions'].hideLoader('route' + state.url);
            if (!window['odoo']) {
                this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            }
        }
        else
            this.socketService.not_public_url = 1;
        //console.log(this.socketService.not_public_url, dn_current_site_user);
        return true;
    };
    AuthGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _socket_service__WEBPACK_IMPORTED_MODULE_1__["SocketService"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/http.service.ts":
/*!*********************************!*\
  !*** ./src/app/http.service.ts ***!
  \*********************************/
/*! exports provided: HttpService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpService", function() { return HttpService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _js_methods__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js_methods */ "./src/app/js_methods.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HttpService = /** @class */ (function () {
    function HttpService() {
        this.fetch_paged_data = function (off_set, limit) { };
        this.server_url = window['server_url'];
        this.no_image = this.server_url + '/dn_base/static/img/no-image.png';
    }
    HttpService.prototype.call_post_http = function (url, input_data, success_cb, failure_cb) {
        var options = this.makeOptions(url, input_data, success_cb, failure_cb);
        Object(_js_methods__WEBPACK_IMPORTED_MODULE_1__["call_ajax"])(options);
    };
    HttpService.prototype.call_post_http_post = function (url, input_data, success_cb, failure_cb, req_type) {
        var options = this.makeOptions(url, input_data, success_cb, failure_cb);
        console.log(options);
        if (req_type) {
            options['type'] = req_type;
        }
        try {
            Object(_js_methods__WEBPACK_IMPORTED_MODULE_1__["call_ajax"])(options);
        }
        catch (e) {
            console.log(e);
        }
    };
    HttpService.prototype.authenticate = function (url, input_data, success_cb, failure_cb, complete_cb) {
        var httpservie = this;
        var options = httpservie.makeOptions(url, input_data, success_cb, failure_cb);
        options.onSuccess = function (data) {
            window['current_user'].onLogin(data);
            if (success_cb)
                success_cb(data);
        };
        options.type = 'get';
        options.onComplete = complete_cb;
        options.onError = failure_cb;
        Object(_js_methods__WEBPACK_IMPORTED_MODULE_1__["call_ajax"])(options);
    };
    HttpService.prototype.makeOptions = function (url, input_data, success_cb, failure_cb) {
        var http_service = this;
        var onRequestFailed = function (res) {
            if (failure_cb)
                failure_cb(res);
            else {
                console.log(res, url);
            }
        };
        var options = {
            url: url,
            type: 'get',
            before: function (a, b) {
                //console.log(b.url);
            },
            data: input_data,
            //type:'post',
            onSuccess: success_cb,
            onError: onRequestFailed,
            onComplete: function () {
            }
        };
        return options;
    };
    HttpService.prototype.make_bread_crumb = function () {
        var comeplete_url = window.location + '';
        var base_url = window.location.origin + '';
        var page_url = comeplete_url.replace(base_url + '/', '');
        var ar = page_url.split('/');
        var last_link = '';
        var links = [];
        for (var i in ar) {
            if (parseInt(i) !== ar.length - 1) {
                last_link = last_link + '/' + ar[i];
                links.push({ url: last_link, title: ar[i] });
            }
        }
        return links;
    };
    HttpService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], HttpService);
    return HttpService;
}());



/***/ }),

/***/ "./src/app/js_methods.js":
/*!*******************************!*\
  !*** ./src/app/js_methods.js ***!
  \*******************************/
/*! exports provided: meeting_time, showCalendar, initPDFAnnotator, formatDate, call_ajax */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "meeting_time", function() { return meeting_time; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showCalendar", function() { return showCalendar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initPDFAnnotator", function() { return initPDFAnnotator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDate", function() { return formatDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "call_ajax", function() { return call_ajax; });

var calendar_added = 0;
function scheduleDetails()
{
    var event_id = $(this).attr('event_id');    
    var req_url = '/meeting/summary'
    var input_data = {
        id: event_id
    }
    dn_rpc_object({
        url:req_url,
        data: input_data,
        onSuccess: function (data) {
            if(data)
            if(typeof(data) !="string"){
                showCalendarEvnetPopup(data);
            }
        }
    });
};
function showCalendar(events) {
    if (calendar_added == 0) {
        $('body').prepend('<link rel="stylesheet" href="assets/libs/css/fullcalendar.css"/>');
        $('body').append('<script src="assets/libs/js/fullcalendar.js"></script>');        
        calendar_added = 1;
    }
    
    $('#calendar').fullCalendar({
        events: events,
        eventClick: function (calEvent, jsEvent, view) {
            var id = calEvent.id;
            var req_url = '/meeting/summary'
            var input_data = {
                id: id
            }
            dn_rpc_object({
                url:req_url,
                data: input_data,
                onSuccess: function (data) {
                    if(data)
                    if(typeof(data) != "string"){
                        showCalendarEvnetPopup(data);
                    }
                }
            });
        },
        header:
        {
            left: 'year,month,agendaWeek,agendaDay',
            center: 'title'
        }, // buttons for switching between views
        eventLimit: true, // for all non-agenda views
        // views: {
        //     agenda: {
        //         eventLimit: 6 // adjust to 6 only for agendaWeek/agendaDay
        //     }
        // }
    });

    if ($('.fc-schedule-button').length == 0) {
        var schedule = '<div class="container-fluid schedule-container schedule-wrap">';
        for (var i = 0; i < events.length; i++) {
            if (events[i]['my_event']) {
                schedule += '<div event_id='+events[i].id+' class="scheduleDetailOpener row">';
                schedule += '<div class="col"> <span>' + events[i].date[0] + '</span><span>' + events[i].date[1] + '</span><span>' + events[i].date[2] + '</span></div>';
                schedule += '<div class="col">'+ hour_minutes(new Date(events[i].start)) + ' - ' + hour_minutes(new Date(events[i].stop)) + '</div>';
                schedule += '<div class="col">' + events[i].title + '</div>';
                schedule += '</div>'
            }
        }
        schedule += '</div>';
        schedule = $(schedule);
        schedule.find('.scheduleDetailOpener').click(scheduleDetails);
        var btn = $('<button type="button" class="fc-schedule-button fc-button fc-state-default fc-corner-right">Schedule</button>')
        $('.fc-button-group:first').append(btn);

        btn.click(function showSchedule() {
            $('.schedule-container').show();
            $('.fc-view-container').empty().html(schedule);
            $('.fc-prev-button').hide();
            $('.fc-next-button').hide();
            $('.fc-center').hide();
            $('.fc-today-button').hide();
            $('.fc-state-active').removeClass('fc-state-active');
            btn.addClass('fc-state-active');
        });
    }

}
function showCalendarEvnetPopup(result)
{
    console.log(result);
    var container = $('#event-summary');    
    var appmodal = $('#calenderModal');
    var upcoming_buttons = container.find('.upcomingButton');
    result.start = moment(result.start).format("DD MMM, YYYY HH:mm a");
    result.stop = moment(result.stop).format("DD MMM, YYYY HH:mm a");
    if (result.my_event)
    {
        appmodal.find('.go_details').attr('id', result.id).show();
        upcoming_buttons.show();
        container.find('.upcomingButton').show();
        if(result.attendee_status)
        {            
            upcoming_buttons.find('.fa-check').remove();
            upcoming_buttons.find('span[name="'+result.attendee_status+'"]').before('<i class="fa fa-check fa-lg" style="color:white" modifiers="{}"></i>');
        }
    }
    else
    {
        appmodal.find('.go_details').attr('id', 0).hide();
        upcoming_buttons.hide();
    }
    
    function calLocation(result){
        result['location'] = '';        
        result.location = result.location;
    }
    calLocation(result);
    //console.log(result);
	container.find('tr').hide();

    for (var key in result)
    {
        var span = container.find('span[name="'+key+'"]');
		span.closest('tr').show();
		if(key == 'pin' || key == 'conference_bridge_number' || key == 'video_call_link')
        {
            if(result['conference_status'] != 'active')
            {
                span.closest('tr').hide();
                continue;
            }
            else
            {
                if(key == 'video_call_link'){
                    var video_call_link = '/conference/'+ result['id']+'/'+ result['pin']
                    var element = span.find('a');
                    var base_url = window.location.origin.toString();
                    //base_url = base_url.slice(0,-1);
                    element.html(base_url + video_call_link);
                    element.attr('href', base_url + video_call_link);
                    span.closest('tr').show();
                    continue;
                }
                span.closest('tr').show();
            }                    
        }
        if(span.length > 0)
        {
            span.html(result[key]);                
        }
    }
    
    //upcoming_buttons.attr('meetingid',result.id);
    //appmodal.find('.modal-header:first h3');
    appmodal.find('.modal-header:first').find('h3').html(result.name);
    appmodal.find('.modal-body:first').html(container.html());
    
    upcoming_buttons = appmodal.find('.upcomingButton:first');

    // calender event pop up buttons click listener
    upcoming_buttons.children().click(function(){
        var elbtn = $(this);
        var response = elbtn.find('span').attr('name');        
        upcoming_buttons.find('i').remove();
        elbtn.find('span').before('<i class="fa fa-check fa-lg" style="color:white" modifiers="{}"></i>');
        var input_data = {meeting_id: result.id, response:response};        
        dn_rpc_object({
            url:'/meeting/respond-invitation',
            data: input_data,            
            onSuccess: function(data){
                
            },
            onComplete: function(){
                
            },
			no_loader: 1
        });
        $('#tdmrb'+result.id).find('i').remove();                
        $('#tdmrb'+result.id).find('span[name="'+response+'"]').before('<i class="fa fa-check fa-lg" style="color:white" modifiers="{}"></i>');
    });
    appmodal.modal('show');
}

function meeting_time(dt) {
    var moment_time = moment(dt, 'YYYY-MM-DD HH:mm:ss')
    var res = {
        day: moment_time.format('DD'),
        month_year: moment_time.format('MMM YYYY'),
        time: moment_time.format('HH:mm A')
    }
    return res;
}

function hour_minutes(dt) {
    if (typeof (dt) == "string")
        dt = new Date(dt);
    var hour = dt.getHours();
    var minut = dt.getMinutes();
    if (minut < 10) {
        minut = '0' + minut;
    }
    return hour + ':' + minut;
}

function formatDate(date) {
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return [day, monthNames[monthIndex], year];
}

function initPDFAnnotator()
{
     
}

var call_ajax = dn_rpc_object;



/***/ }),

/***/ "./src/app/pagenotfound.ts":
/*!*********************************!*\
  !*** ./src/app/pagenotfound.ts ***!
  \*********************************/
/*! exports provided: PageNotFound */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageNotFound", function() { return PageNotFound; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var PageNotFound = /** @class */ (function () {
    function PageNotFound() {
    }
    PageNotFound = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: "\n    <h2>Oops - You landed to the page that doesn't exists.</h2>\n    "
        })
    ], PageNotFound);
    return PageNotFound;
}());



/***/ }),

/***/ "./src/app/pipes/format-time.pipe.ts":
/*!*******************************************!*\
  !*** ./src/app/pipes/format-time.pipe.ts ***!
  \*******************************************/
/*! exports provided: FormatTimePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormatTimePipe", function() { return FormatTimePipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FormatTimePipe = /** @class */ (function () {
    function FormatTimePipe() {
    }
    FormatTimePipe.prototype.transform = function (minutes, arg) {
        return decimal2time(minutes);
    };
    FormatTimePipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'formatTime'
        })
    ], FormatTimePipe);
    return FormatTimePipe;
}());

function addZeroToUnder10(d) {
    if (d < 10)
        d = "0" + d;
    return d;
}
function decimal2time(decimalTime) {
    var clockTime = '0:00';
    try {
        var hrs = parseInt(decimalTime);
        var min = Math.round((decimalTime - hrs) * 60);
        hrs = addZeroToUnder10(parseFloat(hrs.toString()));
        min = addZeroToUnder10(parseFloat(min.toString()));
        clockTime = hrs + ':' + min;
    }
    catch (er) { }
    return clockTime;
}


/***/ }),

/***/ "./src/app/pipes/keys.pipe.ts":
/*!************************************!*\
  !*** ./src/app/pipes/keys.pipe.ts ***!
  \************************************/
/*! exports provided: KeysPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeysPipe", function() { return KeysPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var KeysPipe = /** @class */ (function () {
    function KeysPipe() {
    }
    KeysPipe.prototype.transform = function (value, args) {
        var keys = [];
        for (var key in value) {
            keys.push(key);
        }
        return keys;
    };
    KeysPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({ name: 'keys' })
    ], KeysPipe);
    return KeysPipe;
}());



/***/ }),

/***/ "./src/app/socket.service.ts":
/*!***********************************!*\
  !*** ./src/app/socket.service.ts ***!
  \***********************************/
/*! exports provided: SocketService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocketService", function() { return SocketService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SocketService = /** @class */ (function () {
    function SocketService(router, route) {
        this.router = router;
        this.friends = [];
        this.on_verified = [];
        this.verified = false;
        this.iframe_url = true;
        this.current_route = '';
        this.not_public_url = 0;
        this.server_events = {};
        this.unseen_messages = 0;
        this.notificationList = [];
        this.current_id = undefined;
        this.current_model = undefined;
        this.active_parent_notification = undefined;
        this.execute_on_verified = function (method) {
            if (this.verified)
                method();
            else {
                this.on_verified.push(method);
            }
        };
        this.make_route = function (item) {
            window['site_functions']['get_odoo_param_value'] = function (name, url) {
                try {
                    if (!url)
                        url = location.href;
                    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
                    var regexS = "[\\?&]" + name + "=([^&#]*)";
                    var regex = new RegExp(regexS);
                    var results = regex.exec(url);
                    var result = results[1];
                    return result;
                }
                catch (er) {
                    return '';
                }
            };
            var route = '';
            var obj_this = this;
            if (window['odoo']) {
                var item_id = item.res_id;
                if (item.parent_res_id)
                    item_id = item.parent_res_id;
                var action_url = '/web#id=' + item_id + '&action=' + item.action_id;
                action_url += '&view_type=form';
                action_url += '&menu_id=' + window['site_functions']['get_odoo_param_value']('menu_id');
                route = action_url;
            }
            else {
                switch (item.res_model) {
                    case 'calendar.event':
                        route = '/meeting/' + item.res_id;
                        break;
                    case 'annotation.point':
                        if (item.parent_res_model == 'meeting_point.doc')
                            route = '/meeting/doc/' + item.parent_res_id;
                        else if (item.parent_res_model == 'meeting_point.topicdoc')
                            route = '/topic/doc/' + item.parent_res_id;
                        break;
                    case 'meeting_point.doc':
                        route = '/meeting/doc/' + item.res_id;
                        break;
                    case 'meeting_point.topicdoc':
                        route = '/topic/doc/' + item.res_id;
                        break;
                }
                //console.log(route, item.res_model, item.parent_res_model);
            }
            item.client_route = route;
        };
        if (window['socket_manager']) {
            Object.assign(this, window['socket_manager']);
            return;
        }
        this.io = window['io'];
        var obj_this = this;
        window['socket_manager'] = obj_this;
        var url = window['pathname'];
        if (!url.startsWith('/iframe')) {
            obj_this.iframe_url = false;
        }
        var res = window['public_routes'].indexOf(url);
        if (res == -1) {
            try {
                var user_cookie = localStorage.getItem('user');
                var verification_data = undefined;
                if (user_cookie)
                    verification_data = JSON.parse(user_cookie);
                else {
                    var token = route.snapshot.params.token;
                    verification_data = {
                        token: token
                    };
                }
                ;
                if (window['odoo']) {
                    verification_data = window['odoo'].session_info;
                    verification_data.id = window['odoo'].session_info.uid;
                }
                if (verification_data && verification_data['token']) {
                    verification_data['app_name'] = window['site_config']['app_name'];
                    //console.log(verification_data);
                    var options = {
                        url: '/ws/verifytoken',
                        data: verification_data,
                        onSuccess: function (user_data) {
                            if (user_data.user)
                                user_data = user_data.user;
                            obj_this.connect_socket(user_data);
                        },
                        onFailure: function (er) {
                            if (!window['odoo']) {
                                obj_this.router.navigate(['/login']);
                            }
                        }
                    };
                    window['dn_rpc_object'](options);
                }
                else {
                    console.log("No user in cookies", user_cookie);
                    if (!window['odoo']) {
                        obj_this.router.navigate(['/login']);
                    }
                    ;
                }
            }
            catch (er) {
                console.log(er);
                if (!window['odoo']) {
                    obj_this.router.navigate(['/login']);
                }
                ;
            }
        }
        else {
            $('#main-div').show();
        }
    }
    SocketService.prototype.connect_socket = function (authorized_user) {
        var obj_this = this;
        if (!authorized_user) {
            console.log('Not authorized');
            return;
        }
        obj_this.user_data = authorized_user;
        //console.log(obj_this.user_data);
        window['current_user'].cookie = authorized_user;
        $('#main-div').show();
        this.user_data = authorized_user;
        obj_this.socket = this.io(window['site_config'].chat_server, {
            'reconnection': false,
            "transports": ['websocket'],
            'reconnectionDelay': 2000,
            'reconnectionDelayMax': 5000,
            'reconnectionAttempts': 2
        });
        var site_config = window['site_config'];
        obj_this.socket.on('connect', function () {
            obj_this.socket.off('test');
            obj_this.socket.off('authenticated');
            obj_this.socket.off('server_event');
            obj_this.socket.emit('verify', authorized_user);
            obj_this.socket.on('authenticated', function (data) {
                window['current_user'].cookie = data.user;
                // if(site_config.show_logs.includes('socket'))
                {
                    console.log("Authenticated\n\n");
                }
                obj_this.verified = true;
                obj_this.unseen_messages = data.unseen;
                obj_this.friends = data.friends;
                //console.log(data.friends);
                obj_this.notificationList = [];
                for (var i in data.notifications) {
                    obj_this.add_item_in_notification_list(data.notifications[i]);
                }
                // console.log(1111, obj_this.notificationList);
                obj_this.notificationList = obj_this.notificationList.reverse();
                obj_this.registerEventListeners();
                for (var i in obj_this.on_verified) {
                    obj_this.on_verified[i]();
                }
                obj_this.on_verified = [];
            });
            obj_this.socket.on('test', function (res) {
                console.log(res, ': in test event...\n\n');
            });
            obj_this.socket.on('server_event', function (res) {
                try {
                    if (!obj_this.server_events[res.name]) {
                        if (!obj_this.verified) {
                            obj_this.execute_on_verified(function () {
                                obj_this.server_events[res.name](res.data);
                            });
                        }
                        else {
                            console.log('Not handeled ', res.name);
                        }
                    }
                    else
                        obj_this.server_events[res.name](res.data);
                }
                catch (er) {
                    console.log(er.message, ' in ' + res.name + ' with data ', res);
                }
            });
            if (site_config.show_logs.includes('socket'))
                console.log('Socket server connected.. at ' + Date());
        });
        setTimeout(function () {
            if (!obj_this.verified) {
                if (obj_this.socket && obj_this.socket.connected) {
                    console.log("Socket connection not valid at " + window['site_config'].chat_server);
                }
                else
                    console.log("Socket connection not established at " + window['site_config'].chat_server);
            }
        }, 11000);
    };
    SocketService.prototype.update_unseen_message_count = function (inc) {
        var obj_this = this;
        try {
            obj_this.unseen_messages += inc;
            if (obj_this.unseen_messages == 1) {
                $('.un-read-msg.count').show();
            }
            else if (obj_this.unseen_messages == 0) {
                $('.un-read-msg.count').hide();
            }
        }
        catch (er) {
            console.log("update message count err no ", er);
        }
    };
    SocketService.prototype.registerEventListeners = function () {
        var obj_this = this;
        var bootbox = window["bootbox"];
        obj_this.server_events['chat_message_received'] = function (msg) {
            obj_this.unseen_messages++;
            obj_this.friends[msg.sender]['unseen']++;
            obj_this.server_events['active_chat_message_received'](msg);
        };
        obj_this.server_events['meeting_started'] = function (res) {
            bootbox.alert(res);
        };
        obj_this.server_events['notification_received'] = function (res) {
            //console.log(res);
            obj_this.receive_notification(res);
        };
        obj_this.server_events['notification_updated'] = function (res) {
            console.log('notifications updated');
        };
        obj_this.server_events['error'] = function (res) {
            if (res == 'Invalid Token') {
                obj_this.close_socket();
                window["current_user"].logout();
                if (!window['odoo']) {
                    obj_this.router.navigate(['/login']);
                }
                ;
            }
            else
                console.log("Error from chat ", res);
        };
        obj_this.server_events['forced_logged_out'] = function (res) {
            var href = window.location.toString();
            if (href.indexOf("localhost") == -1) {
                window["bootbox"].alert("You are logged out due to " + res.reason);
                obj_this.close_socket();
                window["current_user"].logout();
                if (!window['odoo']) {
                    obj_this.router.navigate(['/login']);
                }
                ;
            }
        };
    };
    ;
    SocketService.prototype.emit_server_event = function (input_data, model, method) {
        try {
            //console.log(111, event_name);
            if (!model || !method) {
                console.log('Invalid args');
                return;
            }
            var current_user = window['current_user'];
            var user_token = current_user.cookie.token;
            var socket_connecttion = current_user.socket.connected;
            var cookie = current_user.cookie;
            var data = {
                auth: {
                    db: cookie.db,
                    token: cookie.token,
                    uid: cookie.id,
                    name: cookie.name
                },
                req_data: input_data,
                args: { model: model, method: method }
            };
            input_data = { 'data': JSON.stringify(data), no_loader: 1 };
            var options = {
                url: '/socket_server_request',
                data: input_data,
                onSucess: null,
                onFailure: function () {
                    console.log('Failed in processing ' + model + "." + method);
                }
            };
            window['dn_rpc_object'](options);
        }
        catch (er) {
            console.log(er, ' in ' + model + '.' + method);
        }
    };
    SocketService.prototype.init_route = function (url) {
        this.not_public_url = 0;
        this.current_route = url;
        this.current_id = undefined;
        this.current_model = undefined;
        this.active_parent_notification = undefined;
        this.notificationList.forEach(function (el, i) {
            el.active = undefined;
        });
    };
    SocketService.prototype.activate_notification = function () {
    };
    SocketService.prototype.find_notification_index = function (res_model, res_id) {
        var index = -1;
        for (var i in this.notificationList) {
            var item_in_list = this.notificationList[i];
            if (item_in_list.res_model == res_model && item_in_list.res_id == res_id) {
                index = parseInt(i);
                break;
            }
        }
        return index;
    };
    SocketService.prototype.receive_notification = function (item) {
        var obj_this = this;
        var index = -1;
        var res_id = item.res_id;
        var res_model = item.res_model;
        if (item.parent_res_id) {
            res_id = item.parent_res_id;
            res_model = item.parent_res_model;
        }
        if (item.parent_res_id || obj_this.current_model != res_model || obj_this.current_id != res_id) {
            index = obj_this.find_notification_index(item.res_model, item.res_id);
            if (index != -1) {
                obj_this.notificationList[index].counter += 1;
            }
            else {
                item.counter = 1;
                obj_this.add_item_in_notification_list(item);
            }
        }
    };
    SocketService.prototype.removeParentNotification = function (parent_res_model, parent_res_id, res_model, res_id, counter) {
        if (!this.verified)
            return;
        var index = -1;
        var active_item = undefined;
        for (var i in this.notificationList) {
            var item = this.notificationList[i];
            var r_model = '';
            var r_id = 0;
            item.active = false;
            item.parent_res_model ? r_model = item.parent_res_model : r_model = item.res_model;
            item.parent_res_id ? r_id = item.parent_res_id : r_id = item.res_id;
            if (r_model == parent_res_model && r_id == parent_res_id) {
                active_item = item;
                index = parseInt(i);
            }
        }
        if (!active_item)
            return;
        if (active_item.counter < counter) {
            console.log('Issue in parent counter', counter, active_item.counter, active_item);
        }
        active_item.counter -= counter;
        var input_data = {
            no_notify: 1,
            res_model: res_model,
            res_id: res_id
        };
        this.emit_server_event(input_data, 'notification', 'update_counter');
        if (active_item.counter <= 0)
            this.remove_item_from_notification_list(index);
    };
    SocketService.prototype.removeNotification = function (res_model, res_id) {
        if (!this.verified)
            return;
        var index = -1;
        var active_item = undefined;
        for (var i in this.notificationList) {
            var item = this.notificationList[i];
            item.active = false;
            if (item.res_model == res_model && item.res_id == res_id) {
                active_item = item;
                index = parseInt(i);
            }
        }
        if (!active_item)
            return;
        var input_data = {
            no_notify: 1,
            res_model: res_model,
            res_id: res_id
        };
        if (active_item.counter > 0)
            this.emit_server_event(input_data, 'notification', 'update_counter');
        this.remove_item_from_notification_list(index);
    };
    SocketService.prototype.add_item_in_notification_list = function (item) {
        var obj_this = this;
        obj_this.make_route(item);
        if (isNaN(item.counter))
            item.counter = 1;
        obj_this.notificationList.splice(0, 0, item);
    };
    SocketService.prototype.remove_item_from_notification_list = function (i) {
        this.notificationList.splice(i, 1);
    };
    SocketService.prototype.close_socket = function () {
        var socket = window['socket_manager'].socket;
        if (socket && socket.connected) {
            socket.emit('logout', '');
            socket = false;
        }
        this.user_data = undefined;
    };
    SocketService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], SocketService);
    return SocketService;
}());



/***/ }),

/***/ "./src/assets/css/login.css":
/*!**********************************!*\
  !*** ./src/assets/css/login.css ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "body{\n    padding-top: 0px;    \n}\n#main-div.Login-form-wrapper{\n    padding-top:10px;\n    padding-bottom:10px; \n}\n.Login-form-wrapper{\n    display: flex;\n\tjustify-content: center;    \n    height: 100vh;\n    overflow: auto;\n    /* background-image: url(\"../img/login-bg.jpg\"); */\n    background-repeat: no-repeat;\n    background-size: cover;\n    position: relative;\n}\n.Login-form-wrapper:before{\n    content: \"\";\n    display: none;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background-color:rgba(0, 0, 0, 0.33);\n}\n.login-form-div {\n    min-width: 300px;\n    height: 100%;\n    display: table;\n    position: relative;\n    z-index: 200;\n}\n.login-form-div form{\n    padding: 30px 0 100px;\n    display: table-cell;\n    vertical-align: middle;\n}\n.meet-logo{\n    text-align: center;\n    margin-bottom: 1.5rem;\n    /* display: none; */\n}\n.meet-logo-text {\n    text-align: center;\n}\n.meet-logo-text h1 {\n    color: #875a7b;\n    font-size: 56px;\n    font-weight: 600;\n    margin-bottom: 0;\n    line-height: 1;\n}\n.meet-logo-text  span {\n    font-size: 16px;\n    display: block;\n    font-weight: 500;\n    margin-bottom: 15px;\n}\n.meet-logo img{ max-width: 100%; }\n.login-form-div .form-control{\n    height: 35px;\n    line-height:35px;\n\tborder-radius: 0;\n\tbackground-color: transparent;\n    border: solid 1px #875a7b;\n    padding: 0 20px 0 30px;\n    color: #ffffff;\n    background:rgba(0, 0, 0, 0.40);\n    font-size: 14px;\n}\n.form-control::-webkit-input-placeholder {\n    color: #FFFFFF !important;\n    opacity: 1;\n}\n.form-control::-ms-input-placeholder {\n    color: #FFFFFF !important;\n    opacity: 1;\n}\n.form-control::placeholder {\n    color: #FFFFFF !important;\n    opacity: 1;\n}\n.form-control::-webkit-input-placeholder {\n    color: #FFFFFF !important;\n    opacity: 1;\n}\n.form-control::-ms-input-placeholder {\n    color: #FFFFFF !important;\n    opacity: 1;\n}\n.form-control::placeholder {\n    color: #FFFFFF !important;\n    opacity: 1;\n}\n.login-form-div .form-group {\n    margin-bottom: 10px;\n}\ninput:-webkit-autofill,\ninput:-webkit-autofill:hover,\ninput:-webkit-autofill:focus,\ninput:-webkit-autofill:active {\n-webkit-box-shadow: 0 0 0px 1000px white inset !important;\n}\n.login-btn{\n    width: 100%;\n    display: block;\n    height: 35px;\n    line-height: 35px;\n\tborder-radius: 0;\n    background-color: #875a7b;\n\n    border:transparent;\n    color: #ffffff;\n\n    font-size: 14px;\n    font-weight: 400;\n    margin-bottom:10px; \n}\n.forgot{\n    display: block;\n    width: 100%;\n    color:#875a7b; \n    font-size: 11px;\n    font-weight: 600;\n    text-align: left;\n}\n.forgot:hover{\n    text-decoration: underline;\n}\n.input-label-icon{ position: relative;}\n.input-label-icon i{\n    font-size: 12px;\n    color: #875a7b;\n    display: block;\n    position: absolute;\n    top: 50%;\n    left: 10px;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%);\n}\n.\n@media (min-width: 800px) and (max-width: 1200px) {\n    .Login-form-wrapper:before{\n        display: block;\n    }\n}\n@media (min-width: 768px) and (max-width: 991px) {\n    .Login-form-wrapper{justify-content: center;}\n    .meet-logo, .login-form-div .form-group{ margin-bottom: 1rem; }\n    .Login-form-wrapper{ padding: 0 10vw; }\n    \n}\n@media (max-width: 767px) { \n        .Login-form-wrapper{justify-content: center;}\n        .meet-logo, .login-form-div .form-group{ margin-bottom: 1rem; }\n        .Login-form-wrapper{ padding: 0 10vw; }\n        .meet-logo img{ max-width: 60%; }\n}"

/***/ }),

/***/ "./src/components/chat/chat.component.css":
/*!************************************************!*\
  !*** ./src/components/chat/chat.component.css ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mobile-chatroom button, .navbar-profile-menu button{\n\tbackground: transparent;\n\tborder: transparent;\n\tcolor: #ffffff;\n\tfont-size: 14px;\n\tfont-weight: bolder;\n}\n\n.nav-icon button{\n\tbackground: #63628a;\n    border-radius: 50% !important;\n    padding: 0;\n    color: #ffffff;\n    outline: none;\n    font-size: 16px;\n    border: none;\n    opacity: 0.9;\n    width: 36px;\n    height: 36px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n\tcursor: pointer;\n\tposition: relative;\n\tmargin: 0 5px;\n}\n\n.nav-icon button:hover{\n\topacity: 1;\n}\n\n.chat,\n.chat:after,\n.chatbox {\n\ttransition: all .4s ease-in-out\n}\n\n.chat,\n.close-chat,\n.minim-button,\n.maxi-button,\n.chat-text {\n\tfont-weight: 500;\n\tcursor: pointer;\n\tfont-family: Arial, sans-serif;\n\ttext-align: center;\n\theight: 20px;\n\tline-height: 20px\n}\n\n.chat-text {\n\tposition: absolute;\n\ttop: 5px;\n\tleft: 10px;\n\tfont-size: 14px;\n\tcolor: #ffffff;\n}\n\n.chat,\n.close-chat,\n.chatbox {\n\tborder: 1px solid #616087;\n}\n\n.chat:after,\n.chat:before {\n\tposition: absolute;\n\tborder-style: solid;\n\tcontent: \"\"\n}\n\n.chat-img{\n\theight: 30px;\n\tpadding: 2px;\n}\n\n.online{\n\tbackground: linear-gradient(to bottom,#95c33b,#fbfbfb);\n}\n\n.offline{\n\tbackground: linear-gradient(to bottom,silver,#fbfbfb);\n}\n\n.chatbox {\n\tmax-width: 350px;\n\twidth: 330px;\n\tposition: fixed;\n\tbottom: 0;\n\tleft: 50px;\n\t/* margin: 0 0 -1500px; */\n\tbackground: #f5f5f5;\n\tborder-bottom: none;\n\tpadding: 36px 0px 10px;\n\tz-index: 100000;\n\toverflow: hidden;\n}\n\n.chat-room-header {\n\theight: 30px;\n\tbackground: linear-gradient(to bottom,#7c7bad,#7c7bad);\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\tright: 0;\n\tborder-bottom: 1px solid rgba(0, 0, 0, 0.22);\n}\n\n.chat-room-toolbar {\n\tposition: relative;\n}\n\n.chatbox hr{\n\tmargin: 0;\n\tpadding: 0;\n}\n\n.smartchatbox{\n\twidth: 104%;\n\tmax-height: 300px;\n\theight: 50vh;\n\toverflow-y: scroll;\n\tpadding-bottom: 10px;\n}\n\n.msg-item{\n\tword-wrap: break-word;\n}\n\n.close-chat {\n\tposition: absolute;\n\ttop: 5px;\n\tright: 2px;\n\tfont-size: 24px;\n\tborder: none;\n\twidth: 20px;\n\tbackground: transparent;\n\tz-index: 2;\n\tcolor: #ffffff;\n\tfont-size: 16px;\n}\n\n.minim-chat,\n.maxi-chat {\n\tposition: absolute;\n\theight: 20px;\n\tline-height: 20px;\n\tcursor: pointer;\n\tz-index: 1;\n\tborder: none;\n\twidth: 20px;\n\tbackground: transparent;\n\tfont-size:14px;\n\ttop: 4px;\n\tright: 26px;\n}\n\n.minim-button, .maxi-button {\n\tposition: relative;\n\tdisplay: flex;\n\theight: 20px;\n\tjustify-content: center;\n\talign-items: center;\n}\n\n.minim-button .fa{\n\tfont-size: 14px;\n\tposition: absolute;\n\tleft: 50%;\n\ttop: 50%;\n\t-webkit-transform: translate(-50%, -50%);\n\t        transform: translate(-50%, -50%);\n\twidth: 20px;\n\theight: 20px;\n\tcolor: #ffffff;\n}\n\n.maxi-button .fa{\n\tfont-size: 16px;\n\tposition: absolute;\n\tleft: 50%;\n\ttop: 50%;\n\t-webkit-transform: translate(-50%, -50%);\n\t        transform: translate(-50%, -50%);\n\tcolor: #ffffff;\n}\n\n/*\n\t.maxi-button .fa{\n\t\tfont-size: 14px;\n\t\tposition: absolute;\n\t\tright: 3.5px;\n\t\tbottom: 4.5px;\n\t}\n\t*/\n\n.chat {\n\twidth: -webkit-fit-content;\n\twidth: -moz-fit-content;\n\twidth: fit-content;\n\tborder-radius: 3px;\n\tpadding: 0 8px;\n\tfont-size: 12px;\n\tbackground: #fff;\n\t-webkit-transform: translateZ(0);\n\ttransform: translateZ(0);\n\tmargin: 20px;\n}\n\n.chat:before {\n\tborder-width: 10px 11px 0 0;\n\tborder-color: #A8A8A8 transparent transparent;\n\tleft: 7px;\n\tbottom: -10px\n}\n\n.chat:after {\n\tborder-width: 9px 8px 0 0;\n\tborder-color: #fff transparent transparent;\n\tleft: 8px;\n\tbottom: -8px\n}\n\n.chat:hover {\n\tbackground: #ddd;\n\t-webkit-animation-name: hvr-pulse-grow;\n\tanimation-name: hvr-pulse-grow;\n\t-webkit-animation-duration: .3s;\n\tanimation-duration: .3s;\n\t-webkit-animation-timing-function: linear;\n\tanimation-timing-function: linear;\n\t-webkit-animation-iteration-count: infinite;\n\tanimation-iteration-count: infinite;\n\t-webkit-animation-direction: alternate;\n\tanimation-direction: alternate\n}\n\n.chat:hover:after {\n\tborder-color: #ddd transparent transparent!important;\n}\n\n.animated-chat {\n\t-webkit-animation-duration: 1s;\n\tanimation-duration: 1s;\n\t-webkit-animation-fill-mode: both;\n\tanimation-fill-mode: both;\n\t-webkit-animation-timing-function: ease-in;\n\tanimation-timing-function: ease-in;\n}\n\n#send_btn{\n\tbackground: #9c4784;\n\tcolor: white;\n\tfont-weight: bolder;\n\tborder-top-left-radius: 0px;\n\tborder-bottom-left-radius: 0px;\n}\n\n.chatbox #message-form{\n\tpadding-left:10px;\n\tpadding-right:10px;\n}\n\n/* .fa{\n    font-size: 14px;\n    position: absolute;\n    right: 2px;\n    bottom: 5px;\n} */\n\n#messages ul\n{\n\tmargin: 0;\n\tpadding-left: 20px;\n}\n\n.chatbox li.sent>div {\n    padding: 5px;\n    margin-bottom:8px;\n    max-width: 60%;\n    position: relative;\n\tfloat: left;\n\tborder-radius: 4px;\n    background: #9c4784;\n\tcolor: #f5f5f5;\n}\n\n.chatbox li.replies > div  {\n    padding: 5px;\n    margin-bottom:4px;\n    max-width: 60%;\n    position: relative;\n\tborder-radius: 8px;\n    background: rgb(124, 123, 173);\n\tfloat: right;\n\tcolor: #fff;\n}\n\n.chatbox li.sent>div:before {\n\tposition: absolute;\n\tcontent: '';\n\tborder: 10px solid transparent;\n\tborder-bottom-color: transparent;\n\tborder-bottom-color: #9c4784;\n\tbottom: 0px;\n\tleft: -10px;\n}\n\n.chatbox li.replies>div:before{\n\tposition: absolute;\n\tcontent: '';\n\tborder: 10px solid transparent;\n\tborder-bottom-color: transparent;\n\tborder-bottom-color: rgb(124, 123, 173);;\n\tbottom: 0px;\n\tright: -10px;\n}\n\n.date-time{\n\tdisplay: block;\n\tfont-size: xx-small;\n\tmargin-top: 4px;\n}\n\n.chatbox .messages ul li {\n\tdisplay: inline-block;\n\tclear: both;\n\twidth: calc(100% - 25px);\n\tfont-size: 0.9em;\n}\n\n.chatbox .messages ul li p {\n\tdisplay: inline-block;\n\tpadding: 10px 10px;\n\tborder-radius: 6px;\n\tmax-width: 205px;\n\tline-height: 16px !important;\n}\n\n@-webkit-keyframes tada {\n\t0% {\n\t\t-webkit-transform: scale(1)\n\t}\n\t10%,\n\t20% {\n\t\t-webkit-transform: scale(.9)rotate(-3deg)\n\t}\n\t30%,\n\t50%,\n\t70%,\n\t90% {\n\t\t-webkit-transform: scale(1.1)rotate(3deg)\n\t}\n\t40%,\n\t60%,\n\t80% {\n\t\t-webkit-transform: scale(1.1)rotate(-3deg)\n\t}\n\t100% {\n\t\t-webkit-transform: scale(1)rotate(0)\n\t}\n}\n\n@keyframes tada {\n\t0% {\n\t\t-webkit-transform: scale(1);\n\t\t        transform: scale(1)\n\t}\n\t10%,\n\t20% {\n\t\t-webkit-transform: scale(.9)rotate(-3deg);\n\t\t        transform: scale(.9)rotate(-3deg)\n\t}\n\t30%,\n\t50%,\n\t70%,\n\t90% {\n\t\t-webkit-transform: scale(1.1)rotate(3deg);\n\t\t        transform: scale(1.1)rotate(3deg)\n\t}\n\t40%,\n\t60%,\n\t80% {\n\t\t-webkit-transform: scale(1.1)rotate(-3deg);\n\t\t        transform: scale(1.1)rotate(-3deg)\n\t}\n\t100% {\n\t\t-webkit-transform: scale(1)rotate(0);\n\t\t        transform: scale(1)rotate(0)\n\t}\n}\n\n.tada {\n\t-webkit-animation-name: tada;\n\tanimation-name: tada\n}\n\n@-webkit-keyframes hvr-pulse-grow {\n\tto {\n\t\t-webkit-transform: scale(1.1);\n\t\ttransform: scale(1.1)\n\t}\n}\n\n@keyframes hvr-pulse-grow {\n\tto {\n\t\t-webkit-transform: scale(1.1);\n\t\ttransform: scale(1.1)\n\t}\n}\n\nbody {\n\tbackground: #dedede\n}\n\n.chat-list , .notification-list{\n\tposition: fixed;\n    display: none;\n    z-index: 99999;\n    top: 50px;\n    right: 0;\n    width: 380px;\n    background: white;\n    height: auto;\n    box-shadow: 0 0px 5px 0 rgba(0, 0, 0, 0.2), 0 0px 0px 0 rgba(0, 0, 0, 0.19);\n    overflow-y: auto;\n    padding: 10px;\n    border: 1px solid #dadada;\n}\n\n.notification-list:first .list-group-item.online\n{\n    background: green;\n    color: white;\n}\n\n.chat-list>.nav-tabs>li\n{\n\tborder: 1px solid #dedede;\n\tborder-radius: 5px;\n}\n\n.contact{\n\tcursor: pointer;\n\tcolor: black;\n\tfont-weight: bolder;\n}\n\n.chat-items.list-group\n{\n    margin-top: 23px;\n    padding: 0;\n}\n\n.chat-list-close, .notification-list-close{\n\tcursor: pointer;\n    background: red;\n    padding: 0 5px;\n    color: white;\n    float: right;\n}\n\n.chat-list-close{\n\tdisplay: none;\n}\n\nspan.unseen{\n\tcolor:white;\n\tmargin-left:5px;\n\tpadding:2px 4px;\n\tbackground:#dc3545;\n\tborder-radius: 3px;\n}\n\n.fa-user-cog, .fas fa-user-circle{\n\tmargin-right: 3px;\n\tmargin-left: 10px;\n}\n\n.chatbox .form-control{\n\tpadding-left:10px;\n\tpadding-right:10px;\n}\n\n.emoji-wysiwyg-editor\n{\n    height: 38px;\n}\n\n.un-read-msg{\n    background: #dc3545;\n    color: white;\n    border-radius: 20px;\n    padding: 0 5px;\n    padding-top: 2px;\n    font-weight: bold;\n    font-size: 12px;\n    position: absolute;\n    top: 0px;\n    right: -2px;\n    z-index: 200;\n}\n\n.notification-btn{\n    background: white;\n    padding: 5px;\n}\n\n.notification-icon img{\n    width: 30px;\n    border-radius: 5px !important;\n    overflow: hidden;\n    opacity: 0.9;\n}\n\n.notification-icon img:hover{\n    opacity: 1;\n}\n\n.main-user-navbar {\n\tdisplay: flex;\n    align-items: center;\n}\n\n.main-user-navbar button {\n\tmargin: 0 3px;\n}\n\n@media (max-width: 575.98px) {\n\n    .nav-icon buttonser{\n        font-size: 10px;\n        width: 26px;\n        height: 26px;\n        margin: 0 3px;\n    }\n}\n\nbody.iframe {\n    background: transparent;\n}\n\n.toggle_notification_btn\n{\n    cursor: pointer;\n}"

/***/ }),

/***/ "./src/components/chat/chat.component.html":
/*!*************************************************!*\
  !*** ./src/components/chat/chat.component.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main-user-navbar\">\n    <div class=\"mobile-chatroom nav-icon dropdown\">\n        <button *ngIf=\"!odoo_build\" (mouseup)=\"toggle_notifications($event)\"\n        class=\"showmouseawaybutton notification-icon\">\n            <i class=\"fas fa-bell\"></i>\n        </button>\n        <span *ngIf=\"odoo_build\" (mouseup)=\"toggle_notifications($event)\">\n            <i class=\"fas fa-bell\"></i>\n        </span>\n        <span class=\"un-read-msg\" *ngIf=\"socketService.notificationList.length > 0\">{{socketService.notificationList.length}}</span>\n    </div>\n</div>\n\n<div class=\"container right-panel notification-list hidemouseaway\">\n    <div (click)=\"close_right_panel()\" class=\"chat-list-close\">\n        <i class=\"fas fa-times\"></i>\n    </div>\n    <ul class=\"chat-items list-group\">\n        <li *ngFor=\"let note of socketService.notificationList\">\n            <a *ngIf=\"note.counter > 0\"  class=\"list-group-item contact\"\n                [ngClass]=\"[note.active ? 'online': '']\"\n                routerLink=\"{{note.client_route}}\">\n                <div style=\"display: contents;\" class=\"wrap\">\n                    {{ note.counter +' '+ note.content }}\n                </div>\n                <span style=\"right: 10px;position: absolute;\" *ngIf=\"socketService.active_parent_notification && socketService.active_parent_notification.id == note.id\" class=\"badge badge-success\">Opened</span>\n            </a>\n        </li>\n        <li *ngIf=\"socketService.notificationList == 0\" class=\"list-group-item contact\">\n            No New Notifications\n        </li>\n    </ul>\n</div>"

/***/ }),

/***/ "./src/components/chat/chat.component.ts":
/*!***********************************************!*\
  !*** ./src/components/chat/chat.component.ts ***!
  \***********************************************/
/*! exports provided: ChatComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatComponent", function() { return ChatComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_socket_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../app/socket.service */ "./src/app/socket.service.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _app_http_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../app/http.service */ "./src/app/http.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ChatComponent = /** @class */ (function () {
    function ChatComponent(sanitizer, httpService, ss) {
        this.sanitizer = sanitizer;
        this.httpService = httpService;
        this.ss = ss;
        this.odoo_build = window['odoo'] ? 1 : undefined;
        var obj_this = this;
        obj_this.socketService = ss;
    }
    ChatComponent.prototype.close_right_panel = function () {
        $(".right-panel").hide();
    };
    ChatComponent.prototype.toggle_notifications = function (e) {
        var togglerelated = window['functions'].togglerelated;
        togglerelated(e, $(e.target).closest('.showmouseawaybutton'), '.container.notification-list');
    };
    ChatComponent.prototype.ngOnInit = function () {
        var obj_this = this;
        var route = window['pathname'];
        if (route == '/chat') {
            //console.log("Loaded as route");
            $('body').css('background-color', 'transparent');
            $('.main-user-navbar').css({ 'padding-top': '8px' });
        }
        else {
            //console.log("Loaded in app");
        }
    };
    ChatComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-chat",
            template: __webpack_require__(/*! ./chat.component.html */ "./src/components/chat/chat.component.html"),
            styles: [__webpack_require__(/*! ./chat.component.css */ "./src/components/chat/chat.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"],
            _app_http_service__WEBPACK_IMPORTED_MODULE_3__["HttpService"],
            _app_socket_service__WEBPACK_IMPORTED_MODULE_1__["SocketService"]])
    ], ChatComponent);
    return ChatComponent;
}());



/***/ }),

/***/ "./src/components/comments/comments.component.css":
/*!********************************************************!*\
  !*** ./src/components/comments/comments.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".note{\n\tborder: 1px solid gray;\n\tpadding: 1%;\n\tmargin: 1% 0;\n\tbackground: #f1f2f4;\n\tfont-size: 14px;\n\tfont-weight: 900;\n}\n\n.active{\n\tbackground-color: #9c4784 !important;\n\tcolor: white;\n}\n\n.btn-default{\n\tbackground-color: silver;\n}\n\n.btn-default:focus {\n\toutline: solid;\n}\n\n.navbar{\n\tbackground-color: #eeeeee;\n}\n\n.bordered{\n\tborder: 1px solid #808080;\n}\n\n.modal-header, .modal-footer{\n\tbackground-color: #eeeeee !important;\n}\n\n#addSlot>.modal-dialog>.modal-content{\n\tborder: 0px !important;\n\tbox-shadow: 1px 5px 20px 3px #808080;\n}\n\n.add-slot{\n\tcursor: pointer;\n\tbackground-color: #54ab35;\n\theight: 50px;\n\twidth: 50px;\n\tcolor: white;\n\tfont-size: 32px;\n\tposition: fixed;\n\ttop: 68px;\n\tleft: 20px;\n\tborder: 0px !important;\n\tborder-radius: 50px;\n\tbox-shadow: 1px 2px 10px 1px #808080;\n}\n\n.btn-info, .btn-info>a, .btn-secondary{\n\tbackground-color: white;\n\tborder-color: white;\n}\n\n.title-wrapper .modal-header{\n\tmargin: 0px 0 25px;\n\tpadding: 10px 0;\n\tfont-size: 16px;\n\tfont-weight: 500;\n\tbackground: transparent !important;\n}\n\n.comments button{\n\tmargin: 0 !important;\n}\n\n.comments textarea.form-control{\n\tmargin-bottom: 20px;\n\tmin-height: 150xp;\n}\n\n.label\n{\n    padding-bottom: 20px;\n    cursor: pointer;\n    float: right;\n    background: gray;\n    padding: 0 5px;\n    color: white;\n    border-radius: 25px;\n    font-weight: bolder;\n}\n\n.container.comments {\n\tpadding-bottom: 20px;\n}\n\n.message.reply, .mainthread{\n\tbackground: #eeeeee;\n\tborder-radius: 13px;\n\tpadding: 1%;\n}\n\n.message.reply{\n\tbackground: silver;\n}\n\n.comments-container {\n\tborder-right: 1px solid #eeeeee;\n\tborder-left: 1px solid #eeeeee;\n\tpadding: 0 6%;\n}\n\n.comment_response{\n\tfont-size: 12px;\n\tcolor: grey;\n\tpadding: 0 0 0 3%;\n\tmargin-bottom: 10px;\n\tmargin-top: 5px;\n}\n\n.label > div {\n\twidth: 35px;\n\ttext-align: center;\n}\n\n.main.comment_response a {\n\tpadding: 0 5px 0 5px;\n}\n\n.reply-input {\n    margin: 0 0 10px 0;\n    width: 100%;\n}\n\n.reply-body{\n\tword-wrap: break-word;\n\twidth: 80%;\n}\n\n/* .comments{\n\twidth: 80%;\n    margin-left: 10%;\n    margin-top: 10%;\n} */\n\n.o_form_view .comments.oe_read_only\n{\n    margin: auto;\n}\n\n.o_form_view .comments.oe_read_only .btn-group button\n{\n    color: white;\n}\n\n.comments.oe_read_only .row pre\n{\n    margin-bottom: 0;\n    margin-top: 1px;\n}\n\n.o_form_view .comments.oe_read_only .row pre\n{\n    margin: -8px;\n    font-size: inherit;\n    background-color: transparent;\n    border: none;\n}\n\n.comment-user\n{\n    float: left;\n    font-weight:bold;\n}\n\n.comment-body\n{\n    float: left;\n    margin-left: 5px;\n    margin-top: 1px;\n}\n\n.reply-input textarea\n{\n    margin-bottom: 5px;\n    line-height: 1;\n}"

/***/ }),

/***/ "./src/components/comments/comments.component.html":
/*!*********************************************************!*\
  !*** ./src/components/comments/comments.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"comments\" class=\"comments oe_read_only\">\n\t<div class=\"row\">\n\t\t<div class=\"btn-group col-sm-12\">\n\t\t\t<button [ngClass]=\"{active: comment_subtype === 1}\" (click)=\"comment_subtype=1\" class=\"btn btn-default btn-block\">\n\t\t\t\tMeeting Group Comments\n\t\t\t</button>\n\t\t\t<button [ngClass]=\"{active: comment_subtype === 2}\" (click)=\"comment_subtype=2\" class=\"btn btn-default btn-block\">\n\t\t\t\tPersonal Notes\n\t\t\t</button>\n\t\t</div>\n\t</div>\n\t<div class=\"row\">\n\t\t<form class=\"col-lg-12\" style=\"padding-top:15px; padding-bottom:15px\">\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<div *ngIf=\"comment_subtype === 1\">\n\t\t\t\t\t<textarea name=\"hj\" [(ngModel)]=\"new_comment\" (keyup)=\"save_comment_key_up($event, null)\" class=\"form-control\" rows=\"4\" id=\"comment\" placeholder=\"Add comments here.\"></textarea>\n\t\t\t\t</div>\n\t\t\t\t<div *ngIf=\"comment_subtype === 2\">\n\t\t\t\t\t<textarea name=\"hj\" [(ngModel)]=\"new_comment\" (keyup)=\"save_comment_key_up($event, null)\" class=\"form-control\" rows=\"4\" id=\"notes\" placeholder=\"Add notes here\"></textarea>\n\t\t\t\t</div>\n\t\t\t\t<button [disabled]=\"!new_comment\" class=\"btn btn-primary\" type = \"submit\" (click)=\"save_comment(null)\" >Post</button>\n\t\t\t</div>\n\t\t</form>\n\t</div>\n\t<div *ngIf=\"comment_subtype == 1\" class=\"container comments comments-container\">\n\t\t<div *ngFor=\"let c of comments\">\n\t\t\t<div id=\"{{c.id}}\" *ngIf=\"c\" class=\"row comment\">\n\t\t\t\t<div class=\"container\">\n\t\t\t\t\t<div class=\"row mainthread\">\n\t\t\t\t\t\t<span class=\"comment-user\" *ngIf=\"c.user\">{{c.user.name}} : </span>\n                        <div class=\"comment-body\">\n                            <pre [innerHtml]=\"c.body.trim()\"></pre>\n                        </div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row comment_response main\">\n\t\t\t\t\t\t<span>{{c.create_date | date:'medium' }}</span>&nbsp;&nbsp;\n\t\t\t\t\t\t<a *ngIf=\"0 && c.user.uid == myID\" title=\"Delete comment\" (click)=\"deleteComment(c.id, 'comment')\" >\n\t\t\t\t\t\t\t<i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t\t<a title=\"Add reply\" (click)=\"commentReply(c.id)\">\n\t\t\t\t\t\t\t<i class=\"fa fa-reply\" aria-hidden=\"true\"></i>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t\t<div class=\"label\" title=\"Replies\" *ngIf=\"c.children && c.children.length\">\n\t\t\t\t\t\t\t<div (click)=\"showReplies(c.id)\">\n\t\t\t\t\t\t\t\t<span *ngIf=\"!c['showRep']\"><i class=\"fa fa-angle-down\"></i></span>\n\t\t\t\t\t\t\t\t<span *ngIf=\"c['showRep']\"><i class=\"fa fa-angle-up\"></i></span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"reply-input\">\n\t\t\t\t\t<div *ngIf=\"c['reply']\">\n\t\t\t\t\t\t<textarea (keyup)=\"save_comment_key_up($event, c)\" [(ngModel)]=\"new_reply\"  class=\"form-control\" rows=\"4\" id=\"reply\" placeholder=\"type here . . .\"></textarea>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"reply container\" *ngIf=\"c.children && c.children.length\">\n\n\t\t\t\t\t\t<div *ngIf=\"c['showRep']\">\n\t\t\t\t\t\t\t<div class=\"container\" *ngFor=\"let rep of c.children\">\n\t\t\t\t\t\t\t\t<div class=\"row reply message\">\n\t\t\t\t\t\t\t\t\t<span class=\"comment-user\" *ngIf=\"rep.user\">{{rep.user.name}} : </span>\n                                    <div class=\"comment-body\">\n                                        <pre [innerHtml]=\"rep.body.trim()\"></pre>\n                                    </div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"row comment_response\">\n\t\t\t\t\t\t\t\t\t<span>{{c.create_date | date:'medium' }} </span>&nbsp;&nbsp;\n\t\t\t\t\t\t\t\t\t<a title=\"Delete comment\" (click)=\"deleteComment(rep.id, c.id)\">\n\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\n\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div *ngIf=\"comment_subtype == 2\" class=\"container notes comments-container\">\n\t\t<div *ngFor=\"let c of notes\">\n\t\t\t<div *ngIf=\"c\" class=\"row\">\n\t\t\t\t<div class=\"container\">\n\t\t\t\t\t<div class=\"row mainthread\">\n\t\t\t\t\t\t<span class=\"comment-user\" *ngIf=\"c.user\">{{c.user.name}} : </span>\n                        <div class=\"comment-body\">\n                            <pre [innerHtml]=\"c.body.trim()\"></pre>\n                        </div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"row comment_response main\">\n\t\t\t\t\t\t<span>{{c.create_date | date:'medium'}} </span>\n\t\t\t\t\t\t<!--<a title=\"Delete Note\" (click)=\"deleteComment(c.id,  'note')\" style=\"cursor: pointer\">-->\n\t\t\t\t\t\t<!--<i class=\"fa fa-trash\" aria-hidden=\"true\"></i>-->\n\t\t\t\t\t\t<!--</a>-->\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n"

/***/ }),

/***/ "./src/components/comments/comments.component.ts":
/*!*******************************************************!*\
  !*** ./src/components/comments/comments.component.ts ***!
  \*******************************************************/
/*! exports provided: CommentsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommentsComponent", function() { return CommentsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../app/http.service */ "./src/app/http.service.ts");
/* harmony import */ var _app_socket_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../app/socket.service */ "./src/app/socket.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CommentsComponent = /** @class */ (function () {
    function CommentsComponent(httpService, socketService, route) {
        this.httpService = httpService;
        this.socketService = socketService;
        this.route = route;
        this.comments = [];
        this.notes = [];
        this.new_reply = '';
        this.comment_subtype = 1;
        this.new_comment = '';
    }
    CommentsComponent.prototype.get_data = function (input_data) {
        var valid_mdels = ['calendar.event'];
        if (input_data.res_model && valid_mdels.includes(input_data.res_model)) {
        }
        else {
            return;
        }
        var obj_this = this;
        obj_this.socketService.server_events['comment_received'] = function (data) {
            if (data.subtype_id === 2) {
                if (data.body && data.body.startsWith('<p>')) {
                    data.body = $(data.body)[0].innerHTML;
                }
                obj_this.notes.splice(0, 0, data);
            }
            else if (data.subtype_id === 1) {
                if (obj_this.res_id != data.res_id || obj_this.res_model != data.res_model) {
                    return;
                }
                if (data.parent_id) {
                    for (var i in obj_this.comments) {
                        if (obj_this.comments[i].id == data.parent_id) {
                            obj_this.comments[i].children.push(data);
                            break;
                        }
                    }
                }
                else {
                    obj_this.comments.splice(0, 0, data);
                }
            }
        };
        var on_comments_list = function (result) {
            try {
                for (var i in result) {
                    var item = result[i];
                    if (item.subtype_id) {
                        if (item.subtype_id === 1) {
                            item.reply = false;
                            if (item.body && item.body.startsWith('<p>')) {
                                item.body = $(item.body)[0].innerHTML;
                            }
                            obj_this.comments.push(item);
                        }
                        else if (item.subtype_id === 2) {
                            if (item.body && item.body.startsWith('<p>')) {
                                item.body = $(item.body)[0].innerHTML;
                            }
                            obj_this.notes.push(item);
                        }
                    }
                    if (item.children) {
                        for (var j in item.children) {
                            var child_item = item.children[j];
                            if (child_item.body && child_item.body.startsWith('<p>')) {
                                child_item.body = $(child_item.body)[0].innerHTML;
                            }
                        }
                    }
                }
            }
            catch (er) {
                console.log(er);
            }
        };
        this.httpService.call_post_http('/get-comments', input_data, on_comments_list, null);
    };
    CommentsComponent.prototype.showReplies = function (id) {
        this.comments.forEach(function (com) {
            if (com.id === id) {
                if (com['showRep']) {
                    com['showRep'] = !com['showRep'];
                }
                else {
                    com['showRep'] = true;
                }
            }
            else {
                if (com['showRep']) {
                    com['showRep'] = !com['showRep'];
                }
                else {
                    com['showRep'] = false;
                }
            }
        });
    };
    CommentsComponent.prototype.commentReply = function (id) {
        this.new_reply = '';
        this.comments.forEach(function (com) {
            if (com.id === id) {
                com['reply'] = true;
            }
            else {
                com['reply'] = false;
            }
        });
    };
    CommentsComponent.prototype.save_comment = function (parent_item) {
        var obj_this = this;
        var item = {
            res_model: obj_this.res_model,
            res_id: obj_this.res_id,
            subtype_id: obj_this.comment_subtype,
            create_date: new Date(),
            user: obj_this.socketService.user_data
        };
        if (parent_item) {
            item['parent_id'] = parent_item.id;
            item['body'] = obj_this.new_reply;
            // if(!Array.isArray(parent_item.children))
            //     parent_item.children = [item]
            // else
            //     parent_item.children.push(item);
            this.new_reply = '';
            item['reply'] = 1;
        }
        else {
            item['body'] = obj_this.new_comment;
            // if(obj_this.comment_subtype == 2)
            // {
            // 	item['no_notify'] = 1;
            // 	obj_this.notes.splice(0, 0, item);
            // }
            // else {
            // 	obj_this.comments.splice(0, 0, item);
            // }
            this.new_comment = '';
            item['reply'] = false;
        }
        this.socketService.emit_server_event(item, 'mail.message', 'post_comment');
    };
    CommentsComponent.prototype.deleteComment = function (id, type) {
        var obj_this = this;
        var input_data = {
            id: id
        };
        obj_this.httpService.call_post_http('/comment/delete-json', input_data, function (result) {
            if (type === 'comment') {
                for (var i = 0; i < obj_this.comments.length; i++) {
                    if (obj_this.comments[i].id === id) {
                        obj_this.comments.splice(i, 1);
                        break;
                    }
                }
            }
            else if (type === 'note') {
                for (var i = 0; i < obj_this.notes.length; i++) {
                    if (obj_this.notes[i].id === id) {
                        obj_this.notes.splice(i, 1);
                        break;
                    }
                }
            }
            else {
                for (var i = 0; i < obj_this.comments.length; i++) {
                    if (obj_this.comments[i].id === type) {
                        var replies = obj_this.comments[i].children;
                        for (var j = 0; j < replies.length; j++) {
                            if (replies[j].id == id)
                                replies.splice(j, 1);
                        }
                        break;
                    }
                }
            }
        }, function (error) {
        });
    };
    CommentsComponent.prototype.cancelComment = function () {
        this.new_comment = '';
    };
    CommentsComponent.prototype.ngOnInit = function () {
        var obj_this = this;
        if (!this.res_model) {
            this.route.params.subscribe(function (params) {
                obj_this.res_model = params['res_modal'];
                obj_this.res_id = params['res_id'];
                if (window['odoo']) {
                    var url = window.location.href;
                    if (url.indexOf('model=') > -1) {
                        var _modal = url.split("model=")[1].split("&")[0];
                        var _id = url.split("id=")[1].split("&")[0];
                        obj_this.res_model = _modal;
                        obj_this.res_id = _id;
                    }
                }
            });
        }
        var input_data = {
            res_model: obj_this.res_model,
            res_id: obj_this.res_id,
            no_loader: 1
        };
        obj_this.get_data(input_data);
        function remove_notification() {
            obj_this.socketService.current_model = obj_this.res_model;
            obj_this.socketService.current_id = obj_this.res_id;
            obj_this.socketService.removeNotification(obj_this.res_model, obj_this.res_id);
        }
        obj_this.socketService.execute_on_verified(remove_notification);
    };
    CommentsComponent.prototype.save_comment_key_up = function (e, parent) {
        var obj_this = this;
        if (e.keyCode == 13 && !e.shiftKey) {
            e.preventDefault();
            obj_this.save_comment(parent);
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], CommentsComponent.prototype, "res_model", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], CommentsComponent.prototype, "res_id", void 0);
    CommentsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-comments',
            template: __webpack_require__(/*! ./comments.component.html */ "./src/components/comments/comments.component.html"),
            styles: [__webpack_require__(/*! ./comments.component.css */ "./src/components/comments/comments.component.css")]
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"],
            _app_socket_service__WEBPACK_IMPORTED_MODULE_2__["SocketService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], CommentsComponent);
    return CommentsComponent;
}());



/***/ }),

/***/ "./src/components/committeedetails/commiteedetails.component.css":
/*!***********************************************************************!*\
  !*** ./src/components/committeedetails/commiteedetails.component.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h2.heading-title {\n    margin-bottom: 20px;    \n}\nh2.heading-title span {\n    position: relative;\n}\nh2.heading-title span:before {\n    border-top: 1px solid #dddddd;\n    content: \"\";\n    position: absolute;\n    bottom: -7px;\n    left: 0px;\n    width: 100%;\n}\n.modal-header, .modal-footer{\n    background-color: #eeeeee !important;\n}\n.bordered{\n    border: 1px solid #808080;\n}\n.kanban-committees-info-box{\n    background: #f3f3f3;\n    border-radius: 3px;\n    border: 1px solid #f1eeee;\n    margin: 15px 0;\n    padding: 10px;\n    align-items: center;\n    display: flex;\n    justify-content: space-between;\n}"

/***/ }),

/***/ "./src/components/committeedetails/commiteedetails.component.html":
/*!************************************************************************!*\
  !*** ./src/components/committeedetails/commiteedetails.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div id=\"main-div\">\n    <div class=\" breadcrumbSection\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-sm-12\">\n                    <ol class=\"breadcrumb\">\n                        <li class=\"breadcrumb-item\">\n                            <a routerLink=\"/committees\">\n                                Committees\n                            </a>\n                        </li>\n                        <li class=\"breadcrumb-item active\" *ngIf=\"committee\">{{committee.name}}</li>\n                    </ol>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div  class=\"cards container\">\n        <div class=\"page-links\">\n            <span class=\"prev next-prev-link\" title=\"Privious\">\n                <i class=\"fa fa-angle-left\"></i>\n            </span>\n            <span class=\"next next-prev-link\" title=\"Next\">\n                <i class=\"fa fa-angle-right\"></i>\n            </span>\n        </div>\n\n        <div class=\"container\">\n            <div *ngIf=\"committee\" class=\"deatils-form\">\n                <h2 class=\"heading-title\">\n                    <span>{{committee.name}}</span>\n                </h2>\n                <!-- <div class=\"row\">\n                        <div class=\"col-sm-4\" style=\"border-right: 1px solid #cccccc;\">\n                            <label>\n                                <b>Charter</b>\n                            </label>\n                        </div>\n                        <div class=\"col-sm-8\">\n                                <span [innerHtml]=\"committee.summary\"></span>\n                        </div>\n                </div> -->\n\n                <div  class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"kanban-committees col-xs-12 col-sm-6 col-md-4\" *ngFor=\"let member of committee.members\">\n                            <a class=\"kanban-committees-info-box\" routerLink=\"/profile/{{member.id}}\">\n                                <div class=\"kanban-profiles-user-img\">\n                                    <img title=\"{{member.name}}\" class=\"img-thumbnail-md\" src=\"{{member.image_small}}\">\n                                </div>\n                                <div class=\"kanban-profiles-user-info\">\n                                    <div class=\"kanban-profiles-user-name\">\n                                        {{member.name}}\n                                    </div>\n                                    <div *ngIf=\"member.email\" class=\"kanban-profiles-user-email\">\n                                        {{member.email}}\n                                    </div>\n                                </div>\n                            </a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <span title=\"Next\" *ngIf=\"next\" style=\"font-size: 72px; color: black;\" routerLink=\"/committees/{{next}}\">\n            <i class=\"fa fa-angle-right\"></i>\n        </span>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/components/committeedetails/commiteedetails.component.ts":
/*!**********************************************************************!*\
  !*** ./src/components/committeedetails/commiteedetails.component.ts ***!
  \**********************************************************************/
/*! exports provided: CommitteeDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommitteeDetailsComponent", function() { return CommitteeDetailsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_http_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../app/http.service */ "./src/app/http.service.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CommitteeDetailsComponent = /** @class */ (function () {
    function CommitteeDetailsComponent(httpService, route, sanitizer) {
        var _this = this;
        this.httpService = httpService;
        this.route = route;
        this.sanitizer = sanitizer;
        this.img = 'http://pngimg.com/uploads/folder/folder_PNG8773.png';
        this.next = '';
        this.prev = '';
        this.route.params.subscribe(function (params) { return _this.get_data(); });
    }
    CommitteeDetailsComponent.prototype.get_data = function () {
        var obj_this = this;
        var id = obj_this.route.snapshot.params.id;
        var input_data = { id: id };
        obj_this.httpService.call_post_http('/committee/details-json', input_data, function (result) {
            obj_this.committee = result.committee;
            obj_this.next = result.next;
            obj_this.prev = result.prev;
            obj_this.committee.summary = obj_this.sanitizer.bypassSecurityTrustHtml(obj_this.committee.summary);
        }, false);
    };
    CommitteeDetailsComponent.prototype.next_prev = function (id) {
        var input_data = { id: id };
        var obj_this = this;
        obj_this.httpService.call_post_http('/committee/details-json', input_data, function (result) {
            obj_this.committee = result.committee;
            obj_this.next = result.next;
            obj_this.prev = result.prev;
            obj_this.committee.summary = obj_this.sanitizer.bypassSecurityTrustHtml(obj_this.committee.summary);
        }, false);
    };
    CommitteeDetailsComponent.prototype.ngOnInit = function () {
    };
    CommitteeDetailsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./commiteedetails.component.html */ "./src/components/committeedetails/commiteedetails.component.html"),
            styles: [__webpack_require__(/*! ./commiteedetails.component.css */ "./src/components/committeedetails/commiteedetails.component.css")]
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"]])
    ], CommitteeDetailsComponent);
    return CommitteeDetailsComponent;
}());



/***/ }),

/***/ "./src/components/committees/committees.component.css":
/*!************************************************************!*\
  !*** ./src/components/committees/committees.component.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".kanbancard{\n    cursor: pointer;\n    padding: 2%;\n    margin: 2%;\n    box-shadow: 1px 2px 10px #000000;\n    background: rgba(255,255,255,0.5);\n}\n\n.kanban-committees-info-box{\n    background: #f3f3f3;\n    border-radius: 3px;\n    border: 1px solid #f1eeee;\n    margin: 15px 0;\n    padding: 7px;\n    align-items: self-end;\n    display: flex;\n    flex-direction: column;\n}\n\n.kanban-committees-info-box-img {\n    display: flex;\n    flex-wrap: wrap;\n}\n\n.kanban-committees-info-box-name{\n    margin-bottom: 5px;\n}\n\n.kanban-committees a {\n    color: #777777;\n    text-transform: capitalize;\n    margin: 3px;\n}\n\n.kanban-committees a i {\n    font-size: 24px;\n    color: #ffffff;\n    text-align: center;\n    border-radius: 3px;\n    background: #9c4784;\n    padding: 5px 8px;\n}"

/***/ }),

/***/ "./src/components/committees/committees.component.html":
/*!*************************************************************!*\
  !*** ./src/components/committees/committees.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<app-paginator></app-paginator>\n<div id=\"main-div\">\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"kanban-committees col-xs-12 col-sm-6 col-md-4\"\n                    *ngFor=\"let committee of committees\">\n                <a class=\"kanban-committees-info-box\" routerLink=\"/committees/{{committee.id}}\">\n                        <a class=\"kanban-committees-info-box-name\">\n                            {{committee.name}}\n                        </a>\n                    <div class=\"kanban-committees-info-box-img\">\n                        <a  *ngFor=\"let member of committee.members; let index = index\" routerLink=\"/profile/{{member.id}}\">\n                        <span *ngIf=\"index < 3\">\n                            <img title=\"{{member.name}}\" class=\"img-thumbnail-sm\" src=\"{{member.image_small}}\">\n                        </span>\n                        <span *ngIf=\"index === 3\">\n                            <b>. . .</b>\n                        </span>\n                        </a>\n                    </div>\n                    \n                </a>\n            </div>\n        </div>\n    </div>\n    <div class=\"jumbotron text-center\" *ngIf=\"no_committees\">\n        <h1>There are no Committees to show for now!</h1>\n        <hr>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/components/committees/committees.component.ts":
/*!***********************************************************!*\
  !*** ./src/components/committees/committees.component.ts ***!
  \***********************************************************/
/*! exports provided: CommitteesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommitteesComponent", function() { return CommitteesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../app/http.service */ "./src/app/http.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CommitteesComponent = /** @class */ (function () {
    function CommitteesComponent(httpService) {
        this.httpService = httpService;
        this.committees = [];
        this.no_committees = false;
        this.img = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png';
        var obj_this = this;
        obj_this.httpService.fetch_paged_data = function (off_set, limit) {
            var req_url = '/ws/committees-json';
            var input_data = { paging: { offset: off_set, limit: limit } };
            var success_cb = function (result) {
                obj_this.committees = result.records;
                obj_this.httpService.total_records = result.total;
                obj_this.committees.length > 0 ? obj_this.no_committees = false : obj_this.no_committees = true;
            };
            var failure_cb = false;
            obj_this.httpService.call_post_http(req_url, input_data, success_cb, failure_cb);
        };
    }
    CommitteesComponent.prototype.ngOnInit = function () {
        var req_url = '/ws/committees-json';
        var input_data = { paging: { offset: 0, limit: 10 } };
        var obj_this = this;
        var success_cb = function (result) {
            obj_this.committees = result.records;
            obj_this.httpService.total_records = result.total;
            obj_this.committees.length > 0 ? obj_this.no_committees = false : obj_this.no_committees = true;
        };
        var failure_cb = false;
        this.httpService.call_post_http(req_url, input_data, success_cb, failure_cb);
    };
    CommitteesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./committees.component.html */ "./src/components/committees/committees.component.html"),
            styles: [__webpack_require__(/*! ./committees.component.css */ "./src/components/committees/committees.component.css")]
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"]])
    ], CommitteesComponent);
    return CommitteesComponent;
}());



/***/ }),

/***/ "./src/components/document/document.component.html":
/*!*********************************************************!*\
  !*** ./src/components/document/document.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"pdf-annotator\" id=\"annotated-doc-conatiner\" style=\"display:none;\">\n    <div class=\"toolbar topbar\" style=\"display:none\">\n        <a class=\"icon back\" title=\"Back\">\n            <img style=\"border:1px solid silver\" height=\"28\" src=\"assets/img/back.png\">\n        </a>\n\n        <div class=\"d-flex align-self-center pdf-searchbar\">\n            <div class=\"search-bar-container\">\n\n                <input type=\"search\" placeholder=\"search items\" (focus)=\"hint()\" (blur)=\"unhint()\">\n                <span class=\"search-hint-text\">Search your text here!</span>\n                <div class=\"show-hide-arrows\" style=\"display: none;\">\n                    <button data-search=\"prev\"><i class=\"fas fa-long-arrow-alt-up\"></i></button>\n                    <button data-search=\"next\"><i class=\"fas fa-long-arrow-alt-down\"></i></button>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"paginator\">\n            <span (click)=\"changePage(page_num-1)\" class=\"pager prev page-prev-btn\" disabled=\"\"><i _ngcontent-c1=\"\" class=\"fas fa-arrow-up\"></i></span>\n            <span (click)=\"changePage(page_num+1)\" class=\"pager next page-next-btn\" disabled=\"\"><i _ngcontent-c1=\"\" class=\"fas fa-arrow-down\"></i></span>\n\n            <input (change)=\"changePage(page_num)\" (blur)=\"changePage(page_num)\" (keyup.enter)=\"changePage(page_num)\" class=\"form-control\" [(ngModel)]=\"page_num\" type=\"number\" class=\"page-number\" value=\"1\">\n            <span>of <span class=\"page-count\">1</span></span>\n        </div>\n\n        <button class=\"strt_sign pdfjs btn-primary\" url='/meeting_point/save_signature_doc' style=\"display: none\">Sign</button>\n        <div style=\"margin-top: 12px;\">\n            <span style=\"display: none\" class=\"sign_completed pdfjs badge badge-success\">Signed</span>\n        </div>\n\n        <button class=\"cursor annotation_button\" type=\"button\" title=\"Cursor\" data-tooltype=\"cursor\">\n            <div class=\"Icon\">\n                <svg viewBox=\"0 0 24 24\" id=\"ic_select_black_24px\" width=\"100%\" height=\"100%\">\n                    <g fill=\"none\" fill-rule=\"evenodd\">\n                        <path d=\"M11.022 14.577l-2.92 1.047a1 1 0 0 1-1.33-1.036L7.817 3.465a1 1 0 0 1 1.701-.614l7.95 7.92a1 1 0 0 1-.37 1.651l-2.96 1.061 2.576 7.078a.996.996 0 0 1-.596 1.278l-1.23.448a.996.996 0 0 1-1.278-.596z\" fill=\"currentColor\"></path>\n                        <path d=\"M0 0h24v24H0z\"></path>\n                    </g>\n                </svg>\n            </div>\n        </button>\n\n        <button class=\"pen annotation_button\" type=\"button\" title=\"Pen Tool\" data-tooltype=\"draw\">\n            <div class=\"Icon\">\n                <svg viewBox=\"0 0 24 24\" id=\"ic_annotation_freehand_black_24px\" width=\"100%\" height=\"100%\">\n                    <g fill=\"none\" fill-rule=\"evenodd\">\n                        <path d=\"M0 0h24v24H0z\"></path>\n                        <path fill=\"currentColor\" d=\"M9.662 8.523l4.242-4.243 7.071 7.071-4.242 4.243a1 1 0 0 1-1.414 0L9.662 9.937a1 1 0 0 1 0-1.414zm-.707 2.121l5.656 5.657L9.6 18.807a1 1 0 0 1-1.154-.187l-1.81-1.81a1 1 0 0 1-.186-1.154zm-2.829 7.071l1.414 1.414c-1.32 1.037-2.144 1.39-2.474 1.06-.33-.33.023-1.154 1.06-2.474z\"></path>\n                    </g>\n                </svg>\n            </div>\n        </button>\n\n        <div class=\"PenSize pen-child annotation_button prop\">\n            <select class=\"pen-size\">\n                <option value=\"2\"> ▁▁▁▁▁▁▁▁ </option>\n                <option value=\"4\"> ▂▂▂▂▂▂▂▂ </option>\n                <option value=\"6\"> ▃▃▃▃▃▃▃▃ </option>\n                <option value=\"7\"> ▄▄▄▄▄▄▄▄▄ </option>\n                <option value=\"8\"> ▅▅▅▅▅▅▅▅ </option>\n                <option value=\"9\"> ▆▆▆▆▆▆▆▆ </option>\n                <option value=\"10\"> ▇▇▇▇▇▇▇▇ </option>\n            </select>\n        </div>\n        <div class=\"pen-color annotation_button prop\">            \n        </div>\n\n        \n        <button class=\"comment annotation_button\" style=\"padding-top: 0\" type=\"button\" title=\"Show all comments\">\n            <span class=\"Icon\">\n            <svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"25px\" height=\"25px\" viewBox=\"0 0 30 30\" style=\"enable-background:new 0 0 30 30;\" xml:space=\"preserve\">\n                <g>\n                    <g>\n                        <g>\n                            <path d=\"M28.023,23.309C29.258,22.154,30,20.675,30,19.061c0-3.688-3.877-6.679-8.659-6.679s-8.66,2.99-8.66,6.679\n                                    c0,3.688,3.877,6.681,8.66,6.681c1.511,0,2.931-0.3,4.166-0.824l3.153,1.608L28.023,23.309z M15.975,22.673\n                                    c-1.292-0.997-2.003-2.279-2.003-3.612c0-1.332,0.711-2.615,2.003-3.611c1.418-1.093,3.322-1.695,5.366-1.695\n                                    c2.043,0,3.949,0.603,5.366,1.695c1.292,0.996,2.003,2.279,2.003,3.611c0,1.333-0.711,2.615-2.003,3.612\n                                    c-1.417,1.093-3.323,1.693-5.366,1.693C19.297,24.368,17.393,23.766,15.975,22.673z\"></path>\n                            <g>\n                                <circle cx=\"18.27\" cy=\"19.081\" r=\"0.948\"></circle>\n                                <circle cx=\"21.34\" cy=\"19.081\" r=\"0.948\"></circle>\n                                <circle cx=\"24.413\" cy=\"19.081\" r=\"0.948\"></circle>\n                            </g>\n                        </g>\n                        <g>\n                            <path d=\"M5.268,19.437c-2.066-1.594-3.205-3.645-3.205-5.776c0-2.131,1.138-4.183,3.205-5.776\n                                    c2.267-1.748,5.315-2.711,8.583-2.711c3.269,0,6.316,0.963,8.583,2.711c1.564,1.207,2.598,2.676,3.006,4.243\n                                    c0.787,0.197,1.533,0.463,2.229,0.789c-0.496-5.553-6.492-9.939-13.817-9.939C6.201,2.978,0,7.761,0,13.661\n                                    c0,2.581,1.187,4.948,3.163,6.795l-2.691,6.566l6.715-3.995c1.774,0.752,3.786,1.214,5.926,1.3\n                                    c-0.576-0.705-1.018-1.48-1.296-2.309C9.331,21.704,7.056,20.816,5.268,19.437z\"></path>\n                        </g>\n                    </g>\n                </g>\n            </svg>\n        </span>\n        </button>\n        <button data-tooltype=\"point\" class=\"add-point-button annotation_button comment\" title=\"Add new comment point\">\n            <svg viewBox=\"0 0 24 24\" id=\"add-point\" width=\"100%\" height=\"100%\">\n                <g fill=\"none\" fill-rule=\"evenodd\">\n                    <path d=\"M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\" fill=\"white\" fill-rule=\"nonzero\"></path>\n                    <path d=\"M0 0h24v24H0z\"></path>\n                </g>\n            </svg>\n        </button>\n\n        \n        <button class=\"personal comment annotation_button\" type=\"button\" title=\"Show all Personal Note\" >\n            <div class=\"Icon\">\n                <svg width=\"28\" height=\"25\" x=\"461\" y=\"185\" data-pdf-annotate-id=\"e8114a67-e5e3-4bf3-be35-d25aa831f0e2\" data-pdf-annotate-type=\"point\" aria-hidden=\"true\" transform=\"scale(1) rotate(0) translate(0, 0)\">\n                    <rect width=\"25\" height=\"22\" x=\"1.962286\" y=\"1\" style=\"fill:white;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:1;stroke-opacity:1\"></rect>\n                    <rect width=\"18.4\" height=\"1.5012145\" x=\"5.8\" y=\"5\" style=\"fill:#000000;fill-opacity:1;stroke:none\"></rect>\n                    <rect width=\"18\" height=\"0.86\" x=\"6\" y=\"10\" style=\"fill:#000000;fill-opacity:1;stroke:none\"></rect>\n                    <rect width=\"18.4\" height=\"0.86\" x=\"5.8\" y=\"14\" style=\"fill:#000000;fill-opacity:1;stroke:none\"></rect>\n                    <rect width=\"18\" height=\"0.86\" x=\"6\" y=\"18\" style=\"fill:#000000;fill-opacity:1;stroke:none\"></rect>\n                </svg>\n            </div>\n        </button>\n        <button data-tooltype=\"point\" class=\"add-point-button annotation_button comment personal\" title=\"Add anew note\">\n            <svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\">\n                <g fill=\"none\" fill-rule=\"evenodd\">\n                    <path d=\"M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\" fill=\"white\" fill-rule=\"nonzero\"></path>\n                    <path d=\"M0 0h24v24H0z\"></path>\n                </g>\n            </svg>\n        </button>\n\n        <button class=\"zoomout\">\n            <div class=\"Icon\">\n                <svg viewBox=\"0 0 24 24\" id=\"ic_zoom_out_black_24px\" width=\"100%\" height=\"100%\">\n                    <g fill=\"none\" fill-rule=\"evenodd\">\n                        <path d=\"M7 11v2h10v-2zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\" fill=\"currentColor\" fill-rule=\"nonzero\"></path>\n                        <path d=\"M0 0h24v24H0z\"></path>\n                    </g>\n                </svg>\n            </div>\n        </button>\n        <div class=\"selectBox\">\n            <select class=\"scale\" disabled>\n                <option value=\"0.25\">25%</option>\n                <option value=\"0.5\">50%</option>\n                <option value=\"0.75\">75%</option>\n                <option value=\"1\">100%</option>\n                <option value=\"1.25\">125%</option>\n                <option value=\"1.5\">150%</option>\n                <option value=\"1.75\">175%</option>\n                <option value=\"2\">200%</option>\n                <option value=\"2.5\">250%</option>\n                <option value=\"3\">300%</option>\n                <option value=\"4\">400%</option>\n                <option value=\"5\">500%</option>\n            </select>\n        </div>\n\n        <button class=\"zoomin\">\n            <div class=\"Icon\">\n                <svg viewBox=\"0 0 24 24\" id=\"ic_zoom_in_black_24px\" width=\"100%\" height=\"100%\">\n                    <g fill=\"none\" fill-rule=\"evenodd\">\n                        <path d=\"M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\" fill=\"currentColor\" fill-rule=\"nonzero\"></path>\n                        <path d=\"M0 0h24v24H0z\"></path>\n                    </g>\n                </svg>\n            </div>\n        </button>\n        <a href=\"javascript://\" class=\"rotate-ccw\" title=\"Rotate Counter Clockwise\">\n            <div class=\"Icon\">\n                <svg viewBox=\"0 0 24 24\" id=\"ic_rotate_left_black_24px\" width=\"100%\" height=\"100%\">\n                    <g fill=\"none\" fill-rule=\"evenodd\">\n                        <path d=\"M7.11 8.53L5.7 7.11C4.8 8.27 4.24 9.61 4.07 11h2.02c.14-.87.49-1.72 1.02-2.47zM6.09 13H4.07c.17 1.39.72 2.73 1.62 3.89l1.41-1.42c-.52-.75-.87-1.59-1.01-2.47zm1.01 5.32c1.16.9 2.51 1.44 3.9 1.61V17.9c-.87-.15-1.71-.49-2.46-1.03zM13 4.07V1L8.45 5.55 13 10V6.09c2.84.48 5 2.94 5 5.91s-2.16 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93s-3.05-7.44-7-7.93z\" fill=\"currentColor\" fill-rule=\"nonzero\"></path>\n                        <path d=\"M0 0h24v24H0z\"></path>\n                    </g>\n                </svg>\n            </div>\n        </a>\n        <a href=\"javascript://\" class=\"rotate-cw\" title=\"Rotate Clockwise\">\n            <div class=\"Icon\">\n                <svg viewBox=\"0 0 24 24\" id=\"ic_rotate_right_black_24px\" width=\"100%\" height=\"100%\">\n                    <g fill=\"none\" fill-rule=\"evenodd\">\n                        <path d=\"M15.55 5.55L11 1v3.07C7.06 4.56 4 7.92 4 12s3.05 7.44 7 7.93v-2.02c-2.84-.48-5-2.94-5-5.91s2.16-5.43 5-5.91V10zM19.93 11a7.906 7.906 0 0 0-1.62-3.89l-1.42 1.42c.54.75.88 1.6 1.02 2.47zM13 17.9v2.02c1.39-.17 2.74-.71 3.9-1.61l-1.44-1.44c-.75.54-1.59.89-2.46 1.03zm3.89-2.42l1.42 1.41c.9-1.16 1.45-2.5 1.62-3.89h-2.02c-.14.87-.48 1.72-1.02 2.48z\" fill=\"currentColor\" fill-rule=\"nonzero\"></path>\n                        <path d=\"M0 0h24v24H0z\"></path>\n                    </g>\n                </svg>\n            </div>\n        </a>\n\n        <a (click)=\"toggleAnnotations()\" class=\"annot-toggler\" title=\"Hide/Show all annotations\">\n            <div class=\"Icon\">\n                <i *ngIf=\"!annot_hidden\" class=\"fa fa-eye-slash\" aria-hidden=\"true\"></i>\n                <i *ngIf=\"annot_hidden\" class=\"fa fa-eye\" aria-hidden=\"true\"></i>\n            </div>\n        </a>\n        <button *ngIf=\"active_parent_notification && active_parent_notification['counter'] > 0\" class=\"unread annotation_button\">\n            <span class=\"unread\">{{active_parent_notification.counter}}</span><span> Click to read</span>\n        </button>\n\n\n        <!-- <a class=\"doc-reseter annotation_button\" title=\"Reset Annotations\">\n                <img height=\"25\" src=\"assets/img/reset.png\">\n            </a> -->\n\n    </div>\n\n    <div id=\"viewer-wrapper\">\n        <div id=\"content-wrapper\">\n            <div id=\"viewer\" class=\"pdfViewer\"></div>\n        </div>\n        <div id=\"comment-wrapper\">\n            <div class=\"header comment-header\">\n                <span class=\"show-all-comments\">\n                    <i class=\"glyphicon glyphicon-eye-close\"></i>\n                    <i class=\"far fa-times-circle\"></i>\n                </span>\n                <span class=\"title\">Comments</span>\n            </div>\n\n            <div class=\"comment-list\">\n                <div class=\"comment-list-container\">\n                    <div class=\"comment-list-item\">No comments</div>\n                </div>\n            </div>\n            <form class=\"comment-list-form\">\n                <textarea id=\"commentText\" placeholder=\"Add a Comment\"></textarea>\n            </form>\n        </div>\n        <!--<div id=\"notification-wrapper\">-->\n        <!--<div class=\"notification-list\">-->\n        <!--<div class=\"notification-list-container\">-->\n        <!--<div class=\"notification-list-item\">No Notifications</div>-->\n        <!--</div>-->\n        <!--</div>-->\n        <!--</div>-->\n    </div>\n\n    <div class=\"toolbar annotation-options ContextMenuPopup\">\n        <div class=\"Button icon\">\n            <button class=\"underline\" type=\"button\" title=\"underline\" data-tooltype=\"underline\">\n                <div class=\"Icon\">\n                    <svg viewBox=\"0 0 24 24\" id=\"ic_annotation_underline_black_24px\" width=\"100%\" height=\"100%\">\n                        <g fill=\"none\" fill-rule=\"evenodd\">\n                            <path fill=\"currentColor\" d=\"M14.308 14.321H9.684L8.804 17H6l4.765-13h2.444L18 17h-2.804zm-3.912-2.17h3.2l-1.61-4.865zM5 18.5h14v2H5z\"></path>\n                            <path d=\"M0 0h24v24H0z\"></path>\n                        </g>\n                    </svg>\n                </div>\n            </button>\n        </div>\n        <div class=\"Button icon\">\n            <button class=\"strikeout\" type=\"button\" title=\"strikeout\" data-tooltype=\"strikeout\">\n                <div class=\"Icon\">\n                    <svg viewBox=\"0 0 24 24\" id=\"ic_annotation_strikeout_black_24px\" width=\"100%\" height=\"100%\">\n                        <g fill=\"none\" fill-rule=\"evenodd\">\n                            <path fill=\"currentColor\" d=\"M9.521 16l-.717 3H6l1.021-3zm-1.139-4l2.383-7h2.444l2.395 7h-2.39l-1.227-3.714L10.772 12zm8.591 4L18 19h-2.804l-.725-3zM5 13h14v2H5z\"></path>\n                            <path d=\"M0 0h24v24H0z\"></path>\n                        </g>\n                    </svg>\n                </div>\n            </button>\n        </div>\n        <div class=\"Button icon\">\n            <button class=\"highlight\" type=\"button\" title=\"Highlight\" data-tooltype=\"highlight\">\n                <div class=\"Icon\">\n                    <svg viewBox=\"0 0 24 24\" id=\"ic_annotation_highlight_black_24px\" width=\"100%\" height=\"100%\">\n                        <g fill=\"none\" fill-rule=\"evenodd\">\n                            <path fill=\"currentColor\" d=\"M19 3c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2zm-4.947 12.341l.789 2.344h2.492L13.076 6.31h-2.172L6.67 17.685h2.492l.781-2.344zm-3.477-1.898l1.414-4.258 1.43 4.258z\"></path>\n                            <path d=\"M0 0h24v24H0z\"></path>\n                        </g>\n                    </svg>\n                </div>\n            </button>\n        </div>\n\n        <div class=\"Button icon\">\n            <button class=\"copy\" type=\"button\" title=\"Copy\" data-tooltype=\"copy\">\n                <div class=\"Icon\">\n                    <svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 34.555 34.555\" style=\"enable-background:new 0 0 34.555 34.555;\" xml:space=\"preserve\">\n                        <g>\n                            <g>\n                                <g>\n                                    <path d=\"M24.065,34.555H5.489c-1.379,0-2.5-1.122-2.5-2.5V7.864c0-1.378,1.121-2.5,2.5-2.5h2.364c0.276,0,0.5,0.224,0.5,0.5\n                                        s-0.224,0.5-0.5,0.5H5.489c-0.827,0-1.5,0.673-1.5,1.5v24.19c0,0.827,0.673,1.5,1.5,1.5h18.576c0.827,0,1.5-0.673,1.5-1.5v-2.365\n                                        c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5v2.365C26.565,33.433,25.444,34.555,24.065,34.555z\" />\n                                </g>\n                            </g>\n                            <g>\n                                <g>\n                                    <path d=\"M29.065,29.19H10.489c-1.379,0-2.5-1.122-2.5-2.5V2.5c0-1.378,1.121-2.5,2.5-2.5h13.604c0.276,0,0.5,0.224,0.5,0.5\n                                        S24.37,1,24.094,1H10.489c-0.827,0-1.5,0.673-1.5,1.5v24.19c0,0.827,0.673,1.5,1.5,1.5h18.576c0.827,0,1.5-0.673,1.5-1.5V7.661\n                                        c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5V26.69C31.565,28.069,30.444,29.19,29.065,29.19z\" />\n                                    <path d=\"M31.065,8.161h-6.972c-0.276,0-0.5-0.224-0.5-0.5V0.688c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5v6.473h6.472\n                                        c0.276,0,0.5,0.224,0.5,0.5S31.342,8.161,31.065,8.161z\" />\n                                    <path d=\"M31.065,8.161c-0.13,0-0.26-0.051-0.358-0.151l-6.972-7.161c-0.192-0.198-0.188-0.514,0.01-0.707\n                                        c0.197-0.191,0.516-0.187,0.707,0.01l6.972,7.161c0.192,0.198,0.188,0.514-0.01,0.707C31.317,8.114,31.191,8.161,31.065,8.161z\" />\n                                </g>\n                            </g>\n                        </g>\n                    </svg>\n                </div>\n            </button>\n        </div>\n\n    </div>\n\n    <div class=\"update-comment ContextMenuPopup\">\n        <div class=\"Button icon\">\n            <button class=\"edit\" type=\"button\">\n                <div class=\"Icon\">\n                    Edit\n                </div>\n            </button>\n        </div>\n        <div class=\"Button icon\">\n            <button class=\"delete\" type=\"button\">\n                <div class=\"Icon\">\n                    Delete\n                </div>\n            </button>\n        </div>\n    </div>\n\n    <div class=\"Popup ColorPalettePopup hidemouseaway ContextMenuPopup colors\">\n        <div class=\"Popup StylePopup\">\n            <div class=\"row\">\n                <div class=\"cell colored\" hex=\"#000000\" rgb=\"rgb(0,0,0)\" style=\"background-color: rgb(0,0,0);\">\n                    <div id=\"applied_color\" class=\"Icon check-mark dark\" viewBox=\"0 0 24 24\">\n                        <svg viewBox=\"0 0 24 24\" id=\"ic_check_black_24px\" width=\"100%\" height=\"100%\">\n                            <g fill=\"none\" fill-rule=\"evenodd\">\n                                <path d=\"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z\" fill=\"currentColor\" fill-rule=\"nonzero\"></path>\n                                <path d=\"M0 0h24v24H0z\"></path>\n                            </g>\n                        </svg>\n                    </div>\n                </div>\n                <div class=\"cell colored\" hex=\"#FFFFFF\" rgb=\"rgb(255,255,255)\" style=\"background-color: rgb(255,255,255);\"></div>\n                <div class=\"cell colored\" hex=\"#FF0000\" rgb=\"rgb(255,0,0)\" style=\"background-color: rgb(255,0,0);\"></div>\n                <div class=\"cell colored\" hex=\"#00FF00\" rgb=\"rgb(0,255,0)\" style=\"background-color: rgb(0,255,0)\"></div>\n            </div>\n            <div class=\"row\">\n                <div class=\"cell colored\" hex=\"#0000FF\" rgb=\"rgb(0,0,255)\" style=\"background-color: rgb(0,0,255);\"></div>\n                <div class=\"cell colored\" hex=\"#FFFF00\" rgb=\"rgb(255,255,0)\" style=\"background-color: rgb(255,255,0);\"></div>\n                <div class=\"cell colored\" hex=\"#00FFFF\" rgb=\"rgb(0,255,255)\" style=\"background-color: rgb(0,255,255);\"></div>\n                <div class=\"cell colored\" hex=\"#FF00FF\" rgb=\"rgb(255,0,255)\" style=\"background-color: rgb(255,0,255);\"></div>\n\n            </div>\n            <div class=\"row\">\n                <div class=\"cell colored\" hex=\"#C0C0C0\" rgb=\"rgb(192,192,192)\" style=\"background-color: rgb(192,192,192);\"></div>\n                <div class=\"cell colored\" hex=\"#808080\" rgb=\"rgb(128,128,128)\" style=\"background-color: rgb(128,128,128);\"></div>\n                <div class=\"cell colored\" hex=\"#00cc63\" rgb=\"rgb(128,0,0)\" style=\"background-color: rgb(0, 204, 99);\"></div>\n                <div class=\"cell colored\" hex=\"#808000\" rgb=\"rgb(128,128,0)\" style=\"background-color: rgb(128,128,0);\"></div>\n            </div>\n            <div class=\"row\">\n                <div class=\"cell colored\" hex=\"#008000\" rgb=\"rgb(0,128,0)\" style=\"background-color: rgb(0,128,0);\"></div>\n                <div class=\"cell colored\" hex=\"#800080\" rgb=\"rgb(128,0,128)\" style=\"background-color: rgb(128,0,128);\"></div>\n                <div class=\"cell colored\" hex=\"#008080\" rgb=\"rgb(0,128,128)\" style=\"background-color: rgb(0,128,121);\"></div>\n                <div class=\"cell colored\" hex=\"#000080\" rgb=\"rgb(0,0,128)\" style=\"background-color: rgb(0,0,128);\"></div>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/components/document/document.component.ts":
/*!*******************************************************!*\
  !*** ./src/components/document/document.component.ts ***!
  \*******************************************************/
/*! exports provided: DocumentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentComponent", function() { return DocumentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _app_socket_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../app/socket.service */ "./src/app/socket.service.ts");
/* harmony import */ var _app_http_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../app/http.service */ "./src/app/http.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DocumentComponent = /** @class */ (function () {
    function DocumentComponent(route, ss, httpService, router, _location) {
        var _this = this;
        this.route = route;
        this.ss = ss;
        this.httpService = httpService;
        this.router = router;
        this._location = _location;
        this.page_num = 1;
        this.total_pages = 0;
        this.annot_hidden = false;
        this.active_parent_notification = undefined;
        this.preventFind = function (e) {
            // if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) {
            // 	e.preventDefault();
            // 	$('.search-bar-container input[type="search"]').focus();
            // }
        };
        this.socketService = ss;
        this.route.params.subscribe(function (params) { return _this.loadDoc(); });
    }
    DocumentComponent.prototype.changePage = function (pageToMove) {
        this.total_pages = $('.page-count').html();
        if (pageToMove < 1 || pageToMove > this.total_pages)
            this.page_num = pageToMove = 1;
        if (pageToMove == 1)
            $('.page-prev-btn').attr("disabled", "disabled");
        else
            $('.page-prev-btn').removeAttr('disabled');
        if (pageToMove == this.total_pages)
            $('.page-next-btn').attr("disabled", "disabled");
        else
            $('.page-next-btn').removeAttr('disabled');
        $('#viewer-wrapper').scrollTop(802 * (pageToMove - 1));
    };
    DocumentComponent.prototype.hint = function () {
        $('.search-bar-container .search-hint-text').css("display", "none").fadeIn(700);
    };
    DocumentComponent.prototype.unhint = function () {
        $('.search-bar-container .search-hint-text').hide();
    };
    DocumentComponent.prototype.toggleAnnotations = function () {
        this.annot_hidden = !this.annot_hidden;
        window['show_annotation'] = !window['show_annotation'];
        $('.annotation_button').toggle();
        $('.annotationLayer').toggle();
    };
    DocumentComponent.prototype.go_to_parent_url = function () {
        var obj_this = this;
        var parent_url = localStorage.getItem('previous_url');
        var curl = window['pathname'];
        if (!parent_url || curl == parent_url) {
            parent_url = '/';
        }
        else if (parent_url == '/login')
            parent_url = '/';
        obj_this.router.navigate([parent_url]);
    };
    DocumentComponent.prototype.loadLibs = function (libs_container) {
        var prefix = 'annotator';
        var libs = '';
        libs += '<link href="' + prefix + '/shared/pdf.viewer.css" rel="stylesheet" type="text/css"  />';
        libs += '<link href="' + prefix + '/css/toolbar.css" rel="stylesheet" type="text/css" />';
        libs += '<link href="' + prefix + '/css/custom.css" rel="stylesheet" type="text/css" />';
        libs += '<script src="' + prefix + '/shared/pdf.viewer.js"></script>';
        libs += '<script src="' + prefix + '/shared/rt_clipboard.js"></script>';
        libs += '<script src="' + prefix + '/shared/color.js"></script>';
        libs += '<script src="' + prefix + '/shared/jsonlib.js"></script>';
        libs += '<script src="' + prefix + '/modules/m0.js"></script>';
        libs += '<script src="' + prefix + '/modules/m1.js"></script>';
        libs += '<script src="' + prefix + '/modules/m2.js"></script>';
        libs += '<script src="' + prefix + '/modules/m3.js"></script>';
        libs += '<script src="' + prefix + '/modules/m4.js"></script>';
        libs += '<script src="assets/libs/js/jquery.ui.touch-punch.min.js"></script>';
        libs += '<script src="assets/libs/js/jquery.mark.min.js"></script>';
        libs += '<script src="assets/libs/js/mark.min.js"></script>';
        libs += '<script src="' + prefix + '/js/main.js"></script>';
        libs += '<script src="' + prefix + '/js/annotator.js"></script>';
        // if($('.strt_sign').length == 0)
        // {
        //     libs += '<script src="annotator/js/dn_sign.js"></script>';
        // }
        $(libs_container).removeAttr('uninitialized');
        $(libs_container).append(libs);
    };
    DocumentComponent.prototype.loadDoc = function () {
        var obj_this = this;
        window['show_annotation'] = false;
        window['functions'].showLoader('loaddocwaiter');
        setTimeout(function () {
            if (!window["odoo"]) {
                var libs_container = $('#pdf-libs-conatiner');
                if (libs_container.length == 0) {
                    console.log("Could not find #pdf-libs-container");
                    return;
                }
                if (libs_container.attr('uninitialized')) {
                    obj_this.loadLibs(libs_container);
                }
            }
            var back_btn = $('.topbar .icon.back');
            back_btn.unbind('click');
            back_btn.click(function () {
                obj_this.go_to_parent_url();
            });
            obj_this.onLibsLoaded();
        }, 10);
    };
    DocumentComponent.prototype.onLibsLoaded = function () {
        var obj_this = this;
        var doc_type = obj_this.route.snapshot.params.doc_type;
        var doc_id = obj_this.route.snapshot.params.res_id;
        if (window["odoo"]) {
            var url = window.location.href;
            if (url.indexOf('model=') > -1) {
                var _model = url.split("model=")[1].split("&")[0];
                var _id = url.split("id=")[1].split("&")[0];
                doc_id = _id;
                if (_model == "meeting_point.doc") {
                    doc_type = "meeting";
                }
                if (_model == "meeting_point.topicdoc") {
                    doc_type = "topic";
                }
            }
        }
        var input_data = undefined;
        var req_url = undefined;
        var res_model = '';
        if (doc_type == 'resume') {
            res_model = 'meeting_point.users';
            req_url = '/model/binary';
            input_data = {
                res_id: doc_id,
                field: 'resume',
                model: res_model,
            };
        }
        else {
            req_url = '/doc/binary';
            input_data = {
                doc_id: doc_id,
                doc_type: doc_type
            };
            if (doc_type == 'meeting') {
                res_model = 'meeting_point.doc';
            }
            else if (doc_type == 'topic') {
                res_model = 'meeting_point.topicdoc';
            }
        }
        function ativate_notification() {
            obj_this.socketService.current_model = res_model;
            obj_this.socketService.current_id = doc_id;
            var list = obj_this.socketService.notificationList;
            for (var id in list) {
                if (list[id].res_id == doc_id && list[id].res_model == res_model) {
                    list[id].active = 1;
                    obj_this.active_parent_notification = list[id];
                }
            }
            if (obj_this.active_parent_notification) {
                obj_this.active_parent_notification.active = true;
                obj_this.socketService.active_parent_notification = obj_this.active_parent_notification;
            }
        }
        obj_this.socketService.execute_on_verified(ativate_notification);
        var fetchDocData = function (data) {
            obj_this.doc_data = data;
            var doc_data = {
                doc: data.doc,
                id: doc_id,
                first_time: 1,
                type: doc_type,
                attendees: data.attendees,
                mp_signature_status: data.mp_signature_status
            };
            window['pdf_js_module'].render(doc_data);
            var c_path = window['pathname'];
            $('.notification-list:first .list-group-item[ng-reflect-router-link="' + c_path + '"]').addClass('active');
        };
        if (!doc_type) {
            console.log("No doc_type");
            return;
        }
        obj_this.httpService.call_post_http(req_url, input_data, fetchDocData, null);
    };
    DocumentComponent.prototype.ngOnInit = function () {
        var obj_this = this;
        var input = $("input[type='search']");
        var prevBtn = $("button[data-search='prev']");
        var nextBtn = $("button[data-search='next']");
        var content = $("#content-wrapper");
        var results;
        var currentClass = "current";
        var offsetTop = 50;
        var currentIndex = 0;
        function jumpTo() {
            if (results.length) {
                $('html, #viewer-wrapper').scrollTop(0);
                var position, current = results.eq(currentIndex);
                results.removeClass(currentClass);
                if (current.length) {
                    current.addClass(currentClass);
                    position = current.offset().top - offsetTop;
                    $('html, #viewer-wrapper').animate({
                        scrollTop: $(".current").offset().top - 180
                    }, 0);
                    //window.scrollTo(0, position - 100);
                }
            }
        }
        function nextMatch(element) {
            if (results.length) {
                currentIndex += $(element).is(prevBtn) ? -1 : 1;
                if (currentIndex < 0) {
                    currentIndex = results.length - 1;
                }
                if (currentIndex > results.length - 1) {
                    currentIndex = 0;
                }
                jumpTo();
            }
        }
        function search(searchVal) {
            searchVal ? $('.show-hide-arrows').show() : $('.show-hide-arrows').hide();
            content.unmark({
                done: function () {
                    content.mark(searchVal, {
                        separateWordSearch: true,
                        done: function () {
                            results = content.find("mark");
                            currentIndex = 0;
                            jumpTo();
                        }
                    });
                }
            });
        }
        input.on("input", function () {
            $('.search-bar-container .search-hint-text').hide();
            var searchVal = this.value;
            search(searchVal);
        });
        input.on("keyup", function (e) {
            if (e.keyCode == 13) {
                nextMatch(nextBtn);
            }
        });
        nextBtn.add(prevBtn).on("click", function () {
            nextMatch(this);
        });
        this.route.params.subscribe(function (params) {
            if (params['kw']) {
                input.val(params['kw']);
                setTimeout(function () {
                    search(params['kw']);
                }, 2000);
            }
        });
        var obj_this = this;
        $('#viewer-wrapper').scroll(function () {
            var scroll = $(this).scrollTop();
            if (scroll == 0)
                scroll = 1;
            obj_this.page_num = Math.ceil(scroll / 791);
            if (obj_this.page_num == 1)
                $('.page-prev-btn').attr("disabled", "disabled");
            else
                $('.page-prev-btn').removeAttr('disabled');
            if (obj_this.page_num == $('.page-count').html())
                $('.page-next-btn').attr("disabled", "disabled");
            else
                $('.page-next-btn').removeAttr('disabled');
        });
    };
    DocumentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-document',
            template: __webpack_require__(/*! ./document.component.html */ "./src/components/document/document.component.html")
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _app_socket_service__WEBPACK_IMPORTED_MODULE_3__["SocketService"],
            _app_http_service__WEBPACK_IMPORTED_MODULE_4__["HttpService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"]])
    ], DocumentComponent);
    return DocumentComponent;
}());



/***/ }),

/***/ "./src/components/forgotpassword/forgotpassword.component.html":
/*!*********************************************************************!*\
  !*** ./src/components/forgotpassword/forgotpassword.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<link rel=\"stylesheet\" href=\"/assets/css/login.css\" />\n\n<div id=\"main-div\" style=\"display:none\" class=\"Login-form-wrapper\">\n\t<div *ngIf=\"!sent\" class=\"login-form-div\">\n\t\t<div class=\"form-group\">\n\t\t\t<input id=\"username\"\n\t\t\t\t   placeholder=\"Email\"\n\t\t\t\t   type=\"email\"\n\t\t\t\t   class=\"form-control\"\n\t\t\t\t   [(ngModel)]=\"email\"\n\t\t\t\t   (keyup)=\"email_validation()\"\n\t\t\t\t   (blur)=\"email_validation()\"\n\t\t\t\t   [ngClass]=\"{ 'is-invalid': !valid }\" />\n\n\t\t\t<div *ngIf=\"!first && !valid\" class=\"invalid-feedback\">\n\t\t\t\t<div *ngIf=\"email == ''\">Email is required</div>\n\t\t\t\t<div *ngIf=\"email != ''\">Incorrect email</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"form-group text-left\">\n\t\t\t<button [disabled]=\"!valid\" class=\"login-btn\" (click)=\"onSubmit()\">Submit</button>\n\t\t\t<img *ngIf=\"loading\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\" />\n\t\t\t<a style=\"font-size: 14px;font-weight: bold;margin-left: 10px;color:white\"\n\t\t\t   routerLink=\"/login\">Back to login</a>\n\t\t</div>\n\t\t<div *ngIf=\"error\" class=\"alert alert-danger\">{{error}}</div>\n\t</div>\n</div>\n\n<div *ngIf=\"sent\" style=\"position: fixed;top: 20%;width: 100%;\" class=\"jumbotron\">\n\t<span>An email has been sent to <h3><b>{{email}}</b></h3><br>\n        Please check your email, Thanks!</span>\n        <a style=\"font-size: 14px;font-weight: bold;margin-left: 10px;\"\n        routerLink=\"/login\">Back to login</a>\t\n</div>\n"

/***/ }),

/***/ "./src/components/forgotpassword/forgotpassword.component.ts":
/*!*******************************************************************!*\
  !*** ./src/components/forgotpassword/forgotpassword.component.ts ***!
  \*******************************************************************/
/*! exports provided: ForgotpasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgotpasswordComponent", function() { return ForgotpasswordComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_http_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../app/http.service */ "./src/app/http.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ForgotpasswordComponent = /** @class */ (function () {
    function ForgotpasswordComponent(formBuilder, route, router, httpService) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.httpService = httpService;
        this.loading = false;
        this.sent = false;
        this.email = '';
        this.valid = false;
        this.first = true;
    }
    ForgotpasswordComponent.prototype.ngOnInit = function () {
        $(document).ready(function () {
            setTimeout(function () {
                $('#server-wait').hide();
                $('#main-div').show();
            }, 100);
        });
    };
    ForgotpasswordComponent.prototype.email_validation = function () {
        var obj_this = this;
        obj_this.first = false;
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(obj_this.email).toLowerCase())) {
            obj_this.valid = true;
        }
        else {
            obj_this.valid = false;
        }
    };
    ForgotpasswordComponent.prototype.onSubmit = function () {
        this.loading = true;
        var obj_this = this;
        var req_url = '/password-reset-email';
        var input_data = {
            login: this.email
        };
        var success_cb = function (result) {
            obj_this.loading = false;
            obj_this.sent = true;
        };
        var failure_cb = function (error) {
            obj_this.error = error;
            obj_this.loading = false;
        };
        this.httpService.call_post_http(req_url, input_data, success_cb, failure_cb);
    };
    ForgotpasswordComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-forgotpassword',
            template: __webpack_require__(/*! ./forgotpassword.component.html */ "./src/components/forgotpassword/forgotpassword.component.html"),
            styles: [__webpack_require__(/*! ../../assets/css/login.css */ "./src/assets/css/login.css")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _app_http_service__WEBPACK_IMPORTED_MODULE_3__["HttpService"]])
    ], ForgotpasswordComponent);
    return ForgotpasswordComponent;
}());



/***/ }),

/***/ "./src/components/header/header.component.css":
/*!****************************************************!*\
  !*** ./src/components/header/header.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n.brand-logo{\n    padding: 0 7px;\n    margin-top: 3px;\n    position: relative;\n    z-index: 200;\n}\n\nbutton.navbar-toggler {    \n    padding: 0;\n    z-index: 200;\n    color: #ffffff;\n    width: 50px;\n}\n\n.navbar-nav\n{\n    display: flex;\n    flex-direction: column;\n    padding-left: 0;\n    margin-bottom: 0;\n    list-style: none;\n}\n\n.navbarNavDropdown {\n    position: fixed;\n    background: #f5f5f5;\n    width: 240px;\n    top: 50px;\n    overflow-y: auto;\n    z-index: 99;\n    left: 0;\n    padding-bottom: 1rem;\n    border-right: 1px solid #e8e8e8;\n    bottom: 0;\n}\n\n/*\n.brand-logo a{\n    color: white;\n    font-weight: bolder;\n    font-size: 21px;\n    background: #884775;\n    padding: 3px 6px;\n    display: inline-block;\n    border-radius: 5px;\n}\n\n.brand-logo a:hover{\n    background: silver;\n}\n*/\n\n.brand-logo a img{\n    width: 90px;\n}\n\n.main-nav-header {\n    display: flex;\n    flex: 1;\n}\n\n.main-nav-header nav.navbar{\n    padding: 0;\n}\n\n.MainHeader.navbar .navbar-nav a {\n    padding: 8px 10px;\n    text-decoration: none;\n    display: inline-block;\n    font-size: 15px;\n}\n\n.MainHeader.navbar .navbar-brand{\n    padding: 7px 14px;\n}\n\n.MainHeader.navbar .navbar-brand img{\n    width:25px;\n}\n\n.MainHeader.navbar .navbar-nav a.active {\n    color: #ffffff;\n\n}\n\n.nav-sub-link {\n    /* color: black !important; */\n    width:100%;\n}\n\n.MainHeader.navbar .navbar-nav li.nav-item.dropdown.show .dropdown-menu{\n    padding: 0;\n    display: block;\n    overflow: hidden;\n    border-top-left-radius: 0;\n    border-top-right-radius: 0;\n    border: 1px solid #76767617;\n    border-top: none;\n    margin-top: 0px;\n    margin-left: -1px;\n}\n\n.MainHeader.navbar .navbar-nav li.nav-item.dropdown.show{\n    background-color: #CFD8DC;\n}\n\n.MainHeader.navbar .navbar-nav li.nav-item.dropdown.show .dropdown-menu a{\n    padding:5px 10px;\n    font-size: 13px;\n}\n\n.MainHeader.navbar .navbar-nav li.nav-item.dropdown.show a.nav-link{\n    color:#333333;\n    display: block;\n}\n\n.header-option{\n    margin-left: 15px;\n    padding-left: 0px;\n    border-left: 1px solid #8e3976;\n}\n\n.MainHeader.navbar .header-option a{ padding-left:15px; padding-right: 15px;  }\n\n.MainHeader.navbar .header-option a i{ padding-right: 5px;  position: relative; top: 1px; }\n\n.custom-control{\n    font-weight: normal;\n}\n\n.dropdown-toggle{\n    padding-left: 10px;\n    border-radius: 0px !important;\n}\n\n.dropdown-menu{\n    box-shadow: 0px 2px 3px -1px #c1c1c1;\n}\n\n.lowerheader{\n    position: relative;\n    z-index: 7;\n    padding: 5px;\n    display: flex;\n    flex-basis:360px;\n    align-items: center;\n    margin-left: 15px;\n    margin-right:15px;\n}\n\ninput#search-box {\n    padding-left: 5px;\n}\n\n.lowerheader .form-control{\n    height: 35px;\n    line-height: 35px;\n    padding: 0 15px !important;\n    font-size: 15px;\n    outline: transparent;\n    border: transparent;\n}\n\n.lowerheader  .form-control:focus {\n    color: #495057;\n    background-color: #fff;\n    border-color: #80bdff;\n    outline: 0;\n    box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.15);\n}\n\n/*\n.topsearchbar{\n    flex-grow: 0;\n    flex-basis: 100%;\n    position: absolute;\n    right: 120px;\n    left: 55px;\n\n}\n\n.topsearchbar .dropdown-menu{\n    min-width: 100%;\n    padding: 15px;\n}\n\n.topsearchbar label, .topsearchbar .form-control{\n    font-size: 0.895em;\n}\n\n.topsearchbar .form-control-search{\n    background-color: rgba(255, 255, 255, 0.97);\n    border-bottom: 5px solid #7c7bad !important ;\n    height: 53px;\n    line-height: 30px;\n    font-size: 12px;\n}\n\n.topsearchbar .dropdown-toggle-split{\n    background: #eaeaea;\n    color: black;\n    border: none;\n}\n.topsearchbar .dropdown-toggle-split:after{\n    vertical-align: middle;\n}\n\n.topsearchbar .submit-btn{\n    background: #d6d5d5;\n    color: black;\n    border: none;\n}\n\n.topsearchbar button{\n    height: 30px;\n    line-height: 30px;\n    padding-top:0;\n    padding-bottom: 0;\n    border: none;\n}\n\n.topsearchbar .form-control-search, .topsearchbar button:active, .topsearchbar button:focus{\n    border: none;\n    box-shadow: 0 0 0 0rem rgba(108, 117, 125, 0) !important;\n} */\n\n.show_search_results{\n    height: 100vh;\n    position: fixed;\n    top: 0;\n    background: rgba(224, 224, 224, 0.98);\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 100%;\n    z-index: 900;\n    overflow: hidden;\n    bottom: 0;\n    left: 0;\n    right: 0;\n}\n\n.search-box-wrapper{\n    background: #ffffff;\n    border-radius: 3px;\n    margin: 0;\n}\n\n.show_search_results .row .col-sm{\n    display: flex;\n    flex-direction: column;\n    flex-wrap: nowrap;\n    justify-content: flex-start;\n    align-items: stretch;\n    align-content: stretch;\n    background: #ffffff;\n    margin: 15px;\n    border-radius: 3px;\n}\n\n.result-box-info h2{\n    font-size: 1.2em;\n    margin:0 0 15px; \n}\n\n.result-box-info h3{\n    font-size: 0.795em;\n}\n\n.result-box-info h3 a {\n    padding: 10px 17px;\n    display: block;\n    border-radius: 3px;\n    color: #ffffff;\n    font-size: 13px;\n    font-weight: 500;\n    background: linear-gradient(to bottom,#af669a,#a1508a);\n}\n\n.result-box-info h3 a:hover{\n    background: linear-gradient(to bottom,#dddddd,#dddddd);\n    color: #000000;\n}\n\ndiv#search-modal {\n    position: absolute;\n    background: #ffffff;\n    min-width: 100%;\n    top:  100%;\n    padding: 15px;\n    border-radius: 0.25rem;\n    margin-top: 3px;\n\n    overflow: hidden;\n    border-top-left-radius: 0;\n    border-top-right-radius: 0;\n    border: 1px solid #76767617;\n\n    box-shadow: 0px 2px 3px -1px #c1c1c1;\n}\n\n.close-button{\n    position: absolute;\n    top: 72px;\n    right: 23px;\n    background: rgba(0, 0, 0, 0.2901960784313726);\n    width: 50px;\n    height: 50px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    border-radius: 30px;\n    color: rgba(255, 255, 255, 0.6392156862745098);\n    cursor: pointer;\n    font-size: 30px;\n    z-index: 9999;\n}\n\n.close-button i.fa.fa-close {\n    font-size: 28px;\n}\n\n.close-button:hover{\n    background: rgba(255, 255, 255, 1);\n    color: #000000;\n}\n\n.no-search{\n    text-align: center;\n    color: #ffffff;\n}\n\n/*\n.topsearchbar .dropdown.dropdown-lg .dropdown-menu{\n  overflow: hidden;\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n  border: 1px solid #76767617;\n  border-top: none;\n  margin-top: 0px;\n  margin-left: -1px;\n}*/\n\n/*End Of Nav*/\n\n.loader {\n    height: 5px;\n    width: 100%;\n    position: relative;\n    overflow: hidden;\n    background-color: #ddd;\n}\n\n.loader:before{\n    display: block;\n    position: absolute;\n    content: \"\";\n    left: -200px;\n    width: 200px;\n    height: 5px;\n    background-color: #9c4784;\n    -webkit-animation: loading 2s linear infinite;\n            animation: loading 2s linear infinite;\n}\n\n@-webkit-keyframes loading {\n    from {left: -200px; width: 30%;}\n    50% {width: 30%;}\n    70% {width: 70%;}\n    80% { left: 50%;}\n    95% {left: 120%;}\n    to {left: 100%;}\n}\n\n@keyframes loading {\n    from {left: -200px; width: 30%;}\n    50% {width: 30%;}\n    70% {width: 70%;}\n    80% { left: 50%;}\n    95% {left: 120%;}\n    to {left: 100%;}\n}\n\n.topsearchbar .input-group{\n    justify-content: flex-end;\n}\n\n.input {\n    position: fixed;\n    top: 0;\n    right: 0;\n    box-sizing: border-box;\n    width: 0px;\n    height: 63px;\n    padding: 0 20px;\n    outline: none;\n    font-size: 18px;\n    border-radius: 50px;\n    color: #29313a;\n    border: 3px solid #888da8;\n    transition: all 0.3s ease;\n    visibility: hidden;\n    border-top-left-radius: 0rem  !important;\n    border-bottom-left-radius: 0rem  !important;\n    z-index: 999;\n}\n\n::-webkit-input-placeholder {\n    /* Chrome/Opera/Safari */\n    color: #888da8;\n}\n\n::-moz-placeholder {\n    /* Firefox 19+ */\n    color: #888da8;\n}\n\n:-ms-input-placeholder {\n    /* IE 10+ */\n    color: #888da8;\n}\n\n:-moz-placeholder {\n    /* Firefox 18- */\n    color: #888da8;\n}\n\n.btn {\n    cursor: pointer;\n    text-align: center;\n    line-height: 80px;\n    font-size: 20px;\n    color: #fff;\n    transition: all 0.3s ease;\n    border-top-left-radius: 0.2rem  !important;\n    border-bottom-left-radius: 0.2rem  !important;\n    z-index: 200;\n}\n\n.input.active {\n    width: 100%;\n    visibility: visible;\n    z-index: 9999;\n}\n\n.btn.animate {\n    right: 0;\n    border-top-left-radius: 0  !important;\n    border-bottom-left-radius: 0  !important;\n}\n\n.topsearchbar .input-group-btn{\n    position: relative;\n    z-index: 999;\n}\n\n.main-user-navbar {\n    display: flex;\n    align-items: center;\n    padding-right: 20px;\n}\n\n.main-user-navbar button {\n    padding: 0;\n    display: block;\n}\n\n.mobile-logout{ display: none; }\n\n.desktop-logout{ display: flex;align-content: center;}\n\n.desktop-logout a{ padding: 15px 10px;\n    text-decoration: none;\n    display: inline-block;\n    color: #ffffff;\n    font-size: 15px;\n}\n\n.desktop-logout a:hover {\n    color: #000000;\n    background-color: #CFD8DC;\n}\n\n.navbar-profile-menu button{\n    background: transparent;\n    border: transparent;\n    color: #ffffff;\n    font-size: 14px;\n    font-weight: bolder;\n}\n\n.profile-menu.dropdown-menu .drop-down-user {\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-content: center;\n}\n\n.drop-down-user>img {\n\tborder-radius: 50%;\n\twidth: 50%;\n\tmargin: auto;\n}\n\n.drop-down-user>h5 {\n\tmargin: auto;\n}\n\n.profile-menu.dropdown-menu .dropdown-item {\n    font-size: 13px;\n}\n\n.profile-menu.dropdown-menu .dropdown-item i{ display: inline-block; width: 20px; }\n\n.Mobilesearchbar.hide{ display: none; }\n\n.nav-icon button, .cursor_chooser{\n    background: #63628a;\n    border-radius: 50% !important;\n    padding: 0;\n    color: #ffffff;\n    outline: none;\n    font-size: 16px;\n    border: none;\n    opacity: 0.9;\n    width: 36px;\n    height: 36px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    cursor: pointer;\n    position: relative;\n    margin: 0 5px;\n}\n\n.nav-icon button:hover{\n    opacity: 1;\n}\n\n/* .dropdown:hover>.dropdown-menu {\n    display: block;\n} */\n\n.dropdown>.dropdown-toggle:active {\n    /*Without this, clicking will make it sticky*/\n    pointer-events: none;\n}\n\n.notification-icon::after{\n    content: none;\n}\n\n.profile-menu{\n    margin: 0;\n}\n\n.profile-menu.dropdown-menu{\n    right: 0;\n    left: auto;\n}\n\n.header-user-name{\n    padding-right: 5px;\n}\n\n.navbar-nav .dropdown-menu\n{\n    left: -1px;\n    top: 34px;\n}\n\n.lowerheader.input-group .input-group-append {\n    height: 35px;\n}\n\n.lowerheader.input-group .btn{\n    line-height: 1px;\n    background: transparent;\n    padding: 0;\n    color: #333333;\n    border: transparent;\n}\n\n.searchbar-full-width {\n    position: absolute;\n    top: 50px;\n    background: linear-gradient(to bottom,#7c7bad,#7c7bad);\n    width: 100%;\n    left: 0;\n    right: 0;\n    padding:3px 15px;\n    z-index: 2;\n}\n\n.searchbar-full-width .lowerheader.input-group{\n    width: 50%;\n    margin: 0 auto;\n}\n\n@media (max-width: 575.98px) {\n    .searchbar-full-width .lowerheader.input-group{\n        width: 99%;\n    }\n}\n\n@media (min-width: 576px) and (max-width: 767.98px) {\n    .searchbar-full-width .lowerheader.input-group{\n        width: 97%;\n    }\n\n}\n\n@media (min-width: 768px) and (max-width: 991.98px) {\n    .searchbar-full-width .lowerheader.input-group{\n        width: 85%;\n    }\n}\n\n@media (min-width: 768px) and (max-width: 1070px) {\n\n    .lowerheader{\n        flex-basis:280px;\n    }\n}\n\n/* Portrait phones and smaller */\n\n.navbar{\n    position: inherit;\n    overflow-y: auto;\n\n    background: #9c4784;\n}\n\n.MainHeader.navbar .navbar-nav li.nav-item.dropdown.show .dropdown-menu {\n    padding: 10px 30px;\n    margin-right: -1px;\n    border-radius: 0;\n}\n\n.header-user-name{\n    display: none;\n}\n\n.MainHeader.navbar .navbar-nav a {\n    min-height: var(--paper-item-min-height, 45px);\n    padding: 0 24px;\n    cursor: pointer;\n    box-sizing: border-box;\n    outline: 0;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    font-size: 14px;\n}\n\n.MainHeader.navbar .navbar-nav a i{ margin-right: 24px; font-size: 18px;width: 18px;}\n\n.MainHeader.navbar .navbar-nav h3{\n    display: block;\n    padding: 8px 24px;\n    font-size: 14px;\n    font-weight: 500;\n    letter-spacing: .007px;\n    text-transform: uppercase;\n    margin-top: 10px;\n    line-height: 1.4em;\n    margin-bottom: 0;\n}\n\n.dropdown-menu-list{\n    border-bottom:1px solid #e8e8e8;\n    margin-bottom: 10px;\n    padding-bottom: 10px;\n}\n\n.show_search_results {\n    justify-content: center;\n    align-items: start;\n    overflow: auto;\n    padding: 80px 0;\n}\n\n.navbar-collapse.show .main-nav {\n    padding: 0 0 70px;\n}\n\n@media (max-width: 767px) {\n    h3, .h3 {\n        font-size: 1.0rem;\n    }\n    .close-button[_ngcontent-c0] {\n        top: 62px;\n        right: 23px;\n        width: 30px;\n        height: 30px;\n        border-radius: 30px;\n        font-size: 20px;\n        }\n        div#welcome{\n            padding: 0 ;\n        }\n}\n\n.headerheight{\n    height: 50px;\n}\n\n.header-fixed {\n    background: linear-gradient(to bottom,#7c7bad,#7c7bad);\n    padding: 0;\n    display: flex;\n    height: 50px;\n    color: #ffffff;\n    box-sizing: border-box;\n    position: fixed;\n    width: 100%;\n    top: 0;\n    left: 0;\n    right:0;\n    z-index: 9020;\n    display: flex;\n}\n\n.profile-icon img\n{\n    width: 36px;\n    border-radius: 36px !important;\n    overflow: hidden;\n    opacity: 0.9;\n    height: 36px;\n    margin-left: 5px;   \n}\n\n@media (max-width: 575.98px) {\n\n    .nav-icon button, .cursor_chooser, .main-user-navbar button{\n        font-size: 10px;\n        width: 26px;\n        height: 26px;\n        margin: 0 3px;\n    }\n    .profile-icon img{\n        width: 26px;\n        border-radius: 26px !important;\n        height: 26px;\n        margin-left: 2px;\n    }\n}"

/***/ }),

/***/ "./src/components/header/header.component.html":
/*!*****************************************************!*\
  !*** ./src/components/header/header.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"!socketService.iframe_url && socketService.user_data\">\n    <div class=\"headerheight\"></div>\n    <div *ngIf=\"socketService.user_data\" class=\"header-fixed\">    \n        <button class=\"navbar-toggler showmouseawaybutton\">        \n            <span class=\"fa fa-bars\"></span>\n        </button>\n        <div class=\"main-nav-header\">\n            <div class=\"brand-logo\">\n                <a routerLink=\"/\">\n                    <img src=\"assets/img/meetvue-logo.svg\">\t\t\t\n                </a>\n            </div>\n\n            <nav class=\"navbar MainHeader\">\n                <div class=\"navbarNavDropdown hidemouseaway\">\n                    <ul class=\"navbar-nav main-nav\">\n                        <li class=\"nav-item\">\n                            <h3>\n                                Meeting\n                            </h3>\n                            <div class=\"dropdown-menu-list\" aria-labelledby=\"navbarDropdownMenuLink\">\n                                <a class=\"nav-sub-link\" routerLink=\"/meetings/upcoming\"><i class=\"fa fa-table\"></i> Upcoming</a>\n                                <a class=\"nav-sub-link\" routerLink=\"/meetings/completed\"><i class=\"fas fa-calendar-check\"></i> Completed</a>\n                                <a class=\"nav-sub-link\" routerLink=\"/meetings/archived\"><i class=\"fa fa-archive\"></i> Archived</a>\n                            </div>\n                        </li>\n                        <li class=\"nav-item\">\n                            <a class=\"nav-link\" routerLink=\"/resources\"><i class=\"fa fa-folder-open\"></i> Resources</a>\n                        </li>\n                        <li class=\"nav-item\">\n                            <a class=\"nav-link\" routerLink=\"/profiles\"><i class=\"fa fa-user-circle\"></i> Profiles</a>\n                        </li>\n                        <li class=\"nav-item\">\n                            <a class=\"nav-link\" routerLink=\"/committees\"><i class=\"fas fa-user-friends\"></i> Committees</a>\n                        </li>\n                        <!-- <li class=\"nav-item\">\n                            <a class=\"nav-link\" routerLink=\"/jitsilow\"><i class=\"fas fa-video\"></i> Video Calls</a>\n                        </li> -->\n                    </ul>\n                </div>\n            </nav>\n        </div>\n        \n        <div class=\"main-user-navbar\">\n            <div class=\"searchheader-icon nav-icon\">\n                <button id=\"search-btn\"><i class=\"fas fa-search\"></i></button>\n            </div>\n            <div class=\"nav-icon\" (click)=\"change_cursor()\">\n                <span class=\"cursor_chooser\"><i class=\"fas fa-hand-pointer\" id=\"cursor_chooser\"></i></span>\n                <canvas id=\"cursor_canvas\" width=\"20\" height=\"20\" style=\"display:none\" ></canvas>\n            </div>\n\t\t\t<!-- <div class=\"mobile-chatroom nav-icon dropdown\">\n\t\t\t\t<button routerLink=\"/messenger\" class=\"showmouseawaybutton notification-icon\">\n\t\t\t\t\t<i class=\"fas fa-comment\"></i>\n\t\t\t\t</button>\n\t\t\t\t<span class=\"un-read-msg\" *ngIf=\"socketService.unseen_messages !=0 \">{{socketService.unseen_messages}}</span>\n            </div> -->\n            <app-messageicon></app-messageicon>\n            <!-- <app-messenger></app-messenger> -->\n            <app-chat></app-chat>\n            <div class=\"navbar-profile-menu dropdown\">\n                <button class=\"profile-icon showmouseawaybutton\" (click)=\"show_profile_menu($events)\">\n                    <span class=\"header-user-name\">{{socketService.user_data.name}}</span>\n                    <img id=\"navbar-profile-img\" class=\"img-thumbnail-sm\" src=\"{{socketService.user_data.photo}}\">\n                </button>\n                <div class=\"profile-menu dropdown-menu hidemouseaway\">\n                    <a class=\"dropdown-item\" routerLink=\"/my-profile\">\n\t\t\t\t\t\t<div class=\"drop-down-user\">\n\t\t\t\t\t\t\t<img class=\"img-thumbnail-sm\" src=\"{{socketService.user_data.photo}}\">\n\t\t\t\t\t\t\t<h5>{{socketService.user_data.name}}</h5>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</a>\n\t\t\t\t\t<hr>\n                    <a class=\"dropdown-item\" routerLink=\"/settings\"><i class=\"fa fa-cogs\"></i> Change Password</a>\n                    <a id='logout_link' (click)=\"logout()\" class=\"dropdown-item\"><i class=\"icon-logout\"></i> Logout</a>\n                </div>\n            </div>        \n        </div>\n        \n        <div class=\"searchbar-full-width\" style=\"display: none;\">\n            <div class=\"lowerheader input-group\">\n                <input id=\"search-box\" type=\"text\"\n                    pattern=\"[a-zA-Z ]*\"\n                    [(ngModel)]=\"search_key_word\"\n                    (keyup.enter)=\"search()\"\n                    placeholder=\"Search\"  aria-expanded=\"false\" class=\"form-control\" />\n\n                <div class=\"input-group-append\">\n                        <span class=\"input-group-text\">\n                            <input [(ngModel)]=\"is_content_search\" type=\"checkbox\" aria-label=\"Checkbox for following text input\">\n                            <span style=\"margin-left: 10px;\">In FIles</span>\n                        </span>\n                    <span class=\"input-group-text\">\n                            <button (click)=\"search()\" class=\"btn btn-secondary\" type=\"button\">\n                                <i class=\"fa fa-search\"></i>\n                            </button>\n                        </span>\n                </div>\n\n            </div>\n        </div>\n    </div>\n\n    <div *ngIf=\"show_search_results\">\n        <div class=\"show_search_results\">\n            <div *ngIf=\"no_search\" class=\"no-search\">\n                <h1>No Result Found!</h1>\n            </div>\n            <div class=\"close-button\" (click)=\"show_search_results = false; search_key_word = '';\">\n                <i class=\"fa fa-times\"></i>\n            </div>\n            <div *ngIf=\"!no_search\" class=\"container\">\n                <h3 *ngIf=\"is_content_search\" style=\"color: #696969\">Search Results Based on Content of Documents.</h3>\n                <div *ngIf=\"!content_search\" class=\"row search-box-wrapper\">\n                    <div *ngIf=\"search_results.users.length\" class=\"col-sm\">\n                        <div class=\"result-box-info\">\n                            <h2>Moderators</h2>\n                            <h3 *ngFor=\"let item of search_results.users\">\n                                <a (click)=\"show_search_results = false;\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                            </h3>\n                        </div>\n                    </div>\n                    <div *ngIf=\"search_results.meetings.length\" class=\"col-sm\">\n                        <div class=\"result-box-info\">\n                            <h2>Meetings</h2>\n                            <h3 *ngFor=\"let item of search_results.meetings\">\n                                <a (click)=\"show_search_results = false;\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                            </h3>\n                        </div>\n                    </div>\n                    <div *ngIf=\"search_results.committees.length\" class=\"col-sm\">\n                        <div class=\"result-box-info\">\n                            <h2>Committees</h2>\n                            <h3 *ngFor=\"let item of search_results.committees\">\n                                <a (click)=\"show_search_results = false;\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                            </h3>\n                        </div>\n                    </div>\n                    <div *ngIf=\"search_results.resources.length\" class=\"col-sm\">\n                        <div class=\"result-box-info\">\n                            <h2>Resources</h2>\n                            <h3 *ngFor=\"let item of search_results.resources\">\n                                <a (click)=\"show_search_results = false;\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                            </h3>\n                        </div>\n                    </div>\n                    <div *ngIf=\"search_results.topics.length\" class=\"col-sm\">\n                        <div class=\"result-box-info\">\n                            <h2>Topics</h2>\n                            <h3 *ngFor=\"let item of search_results.topics\">\n                                <a (click)=\"show_search_results = false;\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                            </h3>\n                        </div>\n                    </div>\n                    <div *ngIf=\"search_results.documents.length\" class=\"col-sm\">\n                        <div class=\"result-box-info\">\n                            <h2>Documents</h2>\n                            <h3 *ngFor=\"let item of search_results.documents\">\n                                <a (click)=\"show_search_results = false;\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                            </h3>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf=\"content_search\" class=\"row\">\n                    <div *ngIf=\"search_results.signature_doc.length\" class=\"col-sm\">\n                        <div class=\"result-box-info\">\n                            <h2>Documents for Signature</h2>\n                            <h3 *ngFor=\"let item of search_results.signature_doc\">\n                                <a (click)=\"show_search_results = false;\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                            </h3>\n                        </div>\n                    </div>\n                    <div *ngIf=\"search_results.meeting_doc.length\" class=\"col-sm\">\n                        <div class=\"result-box-info\">\n                            <h2>Meeting Documents</h2>\n                            <h3 *ngFor=\"let item of search_results.meeting_doc\">\n                                <a (click)=\"show_search_results = false;\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                            </h3>\n                        </div>\n                    </div>\n                    <div *ngIf=\"search_results.topic_doc.length\" class=\"col-sm\">\n                        <div class=\"result-box-info\">\n                            <h2>Documents in Topics</h2>\n                            <h3 *ngFor=\"let item of search_results.topic_doc\">\n                                <a (click)=\"show_search_results = false;\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                            </h3>\n                        </div>\n                    </div>\n                    <div *ngIf=\"search_results.resourse_doc.length\" class=\"col-sm\">\n                        <div class=\"result-box-info\">\n                            <h2>Documents in Resources</h2>\n                            <h3 *ngFor=\"let item of search_results.resourse_doc\">\n                                <a (click)=\"show_search_results = false;\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                            </h3>\n                        </div>\n                    </div>\n                    <div *ngIf=\"search_results.home_doc.length\" class=\"col-sm\">\n                        <div class=\"result-box-info\">\n                            <h2>Home Page Documents</h2>\n                            <h3 *ngFor=\"let item of search_results.home_doc\">\n                                <a (click)=\"show_search_results = false;\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                            </h3>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/components/header/header.component.ts":
/*!***************************************************!*\
  !*** ./src/components/header/header.component.ts ***!
  \***************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../app/http.service */ "./src/app/http.service.ts");
/* harmony import */ var _app_socket_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../app/socket.service */ "./src/app/socket.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(router, sserv, route, httpService) {
        var _this = this;
        this.router = router;
        this.sserv = sserv;
        this.route = route;
        this.httpService = httpService;
        this.search_bar = false;
        this.show_search_results = false;
        this.searchAble = true;
        this.is_content_search = false;
        this.content_search = false;
        this.search_key_word = '';
        this.global_search = true;
        this.search_results = {
            meetings: [],
            resources: [],
            topics: [],
            surveys: [],
            committees: [],
            documents: [],
            users: [],
            signature_doc: [],
            resourse_doc: [],
            topic_doc: [],
            meeting_doc: [],
            home_doc: []
        };
        this.no_search = false;
        this.route_map = {
            'calendar.event': {
                model: '/meeting/',
                type: 'meetings'
            },
            'meeting_point.topic': {
                model: '/topic/',
                type: 'topics'
            },
            'meeting_point.folder': {
                model: '/resource/',
                type: 'resource'
            },
            'meeting_point.committee': {
                model: '/committee/',
                type: 'committee'
            },
            'survey.survey': {
                model: '/survey/',
                type: 'survey'
            },
            'meeting_point.document': {
                model: '/signature/doc/',
                type: 'document'
            },
            'meeting_point.files': {
                model: '/resource/doc/',
                type: 'document'
            },
            'meeting_point.doc': {
                model: '/meeting/doc/',
                type: 'document'
            },
            'meeting_point.topicdoc': {
                model: '/topic/doc/',
                type: 'document'
            },
            'meeting_point.news.doc': {
                model: '/home/doc/',
                type: 'document'
            },
            'meeting_point.users': {
                model: '/profile/',
                type: 'user'
            }
        };
        this.socketService = sserv;
        this.route.data.subscribe(function (data) {
            if (!data.searchAble) {
                _this.searchAble = false;
            }
        });
    }
    HeaderComponent.prototype.search = function () {
        this.content_search = this.is_content_search;
        this.search_results = {
            meetings: [],
            resources: [],
            topics: [],
            surveys: [],
            committees: [],
            documents: [],
            users: [],
            signature_doc: [],
            resourse_doc: [],
            topic_doc: [],
            meeting_doc: [],
            home_doc: []
        };
        var url = window.location + '';
        this.search_key_word = this.search_key_word.replace(/[^a-zA-Z0-9 ]/g, '');
        if (this.search_key_word.length < 1) {
            return;
        }
        else {
            var obj_this_1 = this;
            var req_url = '/meeting_point/search-json';
            this.content_search ? req_url = '/meeting_point/search-docs' : null;
            var input_data = { kw: obj_this_1.search_key_word, is_content_search: obj_this_1.is_content_search };
            var search_model = '';
            if (this.searchAble && !this.global_search) {
                if (url.indexOf('meetings') !== -1) {
                    input_data['model'] = 'calendar.event';
                }
                else if (url.indexOf('resources') !== -1) {
                    input_data['model'] = 'meeting_point.folder';
                }
                else if (url.indexOf('committees') !== -1) {
                    input_data['model'] = 'meeting_point.committee';
                }
                else if (url.indexOf('profiles') !== -1) {
                    input_data['model'] = 'meeting_point.users';
                }
            }
            else {
                input_data['model'] = '';
            }
            var success_cb = function (result) {
                $('.searchbar-full-width').hide();
                if (obj_this_1.content_search) {
                    result.forEach(function (item) {
                        item['route'] = obj_this_1.route_map[item.model].model + item.id + '/' + obj_this_1.search_key_word;
                        item['type'] = obj_this_1.route_map[item.model].type;
                        item.route.indexOf('signature') != -1 ? obj_this_1.search_results.signature_doc.push(item) : null;
                        item.route.indexOf('resource') != -1 ? obj_this_1.search_results.resourse_doc.push(item) : null;
                        item.route.indexOf('meeting') != -1 ? obj_this_1.search_results.meeting_doc.push(item) : null;
                        item.route.indexOf('topic') != -1 ? obj_this_1.search_results.topic_doc.push(item) : null;
                        item.route.indexOf('home') != -1 ? obj_this_1.search_results.home_doc.push(item) : null;
                    });
                }
                else {
                    result.forEach(function (item) {
                        item['route'] = obj_this_1.route_map[item.model].model + item.id;
                        item['type'] = obj_this_1.route_map[item.model].type;
                        item.type === 'meetings' ? obj_this_1.search_results.meetings.push(item) : null;
                        item.type === 'topics' ? obj_this_1.search_results.topics.push(item) : null;
                        item.type === 'resource' ? obj_this_1.search_results.resources.push(item) : null;
                        item.type === 'committee' ? obj_this_1.search_results.committees.push(item) : null;
                        item.type === 'survey' ? obj_this_1.search_results.surveys.push(item) : null;
                        item.type === 'document' ? obj_this_1.search_results.documents.push(item) : null;
                        item.type === 'user' ? obj_this_1.search_results.users.push(item) : null;
                    });
                }
                if (result.length < 1) {
                    obj_this_1.no_search = true;
                }
                else {
                    obj_this_1.no_search = false;
                }
                obj_this_1.show_search_results = true;
                //console.log(obj_this.search_results)
            };
            var failure_cb = function (error) {
            };
            this.httpService.call_post_http(req_url, input_data, success_cb, failure_cb);
        }
    };
    HeaderComponent.prototype.logout = function () {
        var obj_this = this;
        obj_this.socketService.close_socket();
        window['current_user'].logout();
        if (!window['odoo']) {
            obj_this.router.navigate(['/login']);
        }
        ;
    };
    HeaderComponent.prototype.change_cursor = function () {
        //console.log(322);
        window['functions'].change_cursor();
    };
    HeaderComponent.prototype.show_profile_menu = function (e) {
        var togglerelated = window['functions'].togglerelated;
        togglerelated(e, this, '.profile-menu.dropdown-menu');
    };
    HeaderComponent.prototype.ngOnInit = function () {
        var obj_this = this;
        $(document).click(function (event) {
            if (obj_this.show_search_results && !$(event).closest('.show_search_results').length) {
                obj_this.show_search_results = false;
            }
        });
    };
    HeaderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-header',
            template: __webpack_require__(/*! ./header.component.html */ "./src/components/header/header.component.html"),
            styles: [__webpack_require__(/*! ./header.component.css */ "./src/components/header/header.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _app_socket_service__WEBPACK_IMPORTED_MODULE_2__["SocketService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"]])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/components/home/home.component.css":
/*!************************************************!*\
  !*** ./src/components/home/home.component.css ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*Homepage TabBar setting*/\n\n\n.home{\n\tbackground:#f1f4f2;\n    padding:0 10%;\n    padding:0;\n    position:relative;\t\n    margin-top: -20px;\n}\n\n\n.home #collapsibleNavbar .active{\n    background:#ffffff;\n  }\n\n\n.home div#collapsibleNavbar {\n    justify-content: center;\n    display:flex;\n}\n\n\n.home div#collapsibleNavbar button{\n    background: none;\n\tcolor:#777a7e;\n\tborder:none;\n\tflex-grow: 1;\n\tfont-size:18px;\n\tfont-family: 'Roboto', sans-serif;\n\tfont-weight:500;\n\tpadding:20px 0;\n\tposition:relative;\n}\n\n\n.HomePageDiscription{\n    display:flex;\n    justify-content: space-between;\n}\n\n\n#calenderModal\n{\n    min-height: calc(100vh - 5px);\n}\n\n\n.HomepageDocumentSection{\n    background:#f2f6fb;\n    padding:50px 0;\n    margin-bottom:30px;\n}\n\n\n.WelcomeContent{\n    padding-bottom:30px;\n    flex:1 1 auto;\n}\n\n\ndiv#welcome {\n    padding: 30px 0;\n}\n\n\n.WelcomeContent h4.HomeTitle{\n    margin-bottom:20px;\n}\n\n\n.WelcomeContent h4.HomeTitle span{\n    position:relative;\n}\n\n\n.WelcomeContent h4.HomeTitle span:before{\n    border-top:1px solid #dddddd;\n    content:\"\";\n    position:absolute;\n    bottom:-7px;\n    left:0px;\n    width:100%;\n}\n\n\n.HomePageContentText{\n  width: 100%;\n  text-align: justify;\n}\n\n\n.HomePageContentImg {\n    margin: 0px 0px 20px 20px;\n    flex-basis: 320px;\n    width: 320px;\n    float: right;\n}\n\n\n.fc-more-cell{\n\tbackground: darkgreen;\n\tcolor: white;\n\tborder-radius: 5px;\n}\n\n\n@media (max-width: 767px) { \n\n   .HomePageContentImg {\n        margin: 0px 0px 20px 0px;\n        flex-basis: 100%;\n        width: 100%;\n        float: none;\n    }\n\n    .HomePageContentText {\n        width: 100%;    \n    }\n    \n}\n\n\n#collapsibleNavbar>button::before\n{\n    width:1px;\n\theight:50%;\n\tbackground:#d8dce0;\n\tcontent:\"\";\n\tposition:absolute;\n    top:25%;\n    left:0px;\n}\n\n\n#collapsibleNavbar button:nth-child(3)::after{\t\n\tleft:0px;\n}\n\n\n#collapsibleNavbar button i{\n\tdisplay:block;\n\tfont-size:26px;\n\tmargin-bottom:5px;\n\t}\n\n\n#collapsibleNavbar button:focus {\n    outline: 0px dotted;\n    outline: 0px auto -webkit-focus-ring-color;\n}\n\n\n#collapsibleNavbar button.active\n{\n    background:white;\n}\n\n\n.active{\n  background-color: #7c7bad;\n  color: white;\n  border-color: #7c7bad;\n}\n\n\n.snackbar-success {\n    visibility: hidden;\n    min-width: 250px;\n    margin-left: -125px;\n    background-color: #54C036;\n    color: #fff;\n    text-align: center;\n    border-radius: 2px;\n    padding: 16px;\n    position: fixed;\n    z-index: 1;\n    left: 50%;\n    bottom: 30px;\n    font-size: 17px;\n    z-index: 999999;\n}\n\n\n.snackbar-success.show {\n    visibility: visible;\n    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;\n    animation: fadein 0.5s, fadeout 0.5s 2.5s;\n}\n\n\n@-webkit-keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n\n\n@keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n\n\n@-webkit-keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n\n\n@keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n\n\n.snackbar-error {\n    visibility: hidden;\n    min-width: 250px;\n    margin-left: -125px;\n    background-color: #ff0033;\n    color: white;\n    text-align: center;\n    border-radius: 2px;\n    padding: 16px;\n    position: fixed;\n    z-index: 1;\n    left: 50%;\n    bottom: 30px;\n    font-size: 17px;\n    z-index: 999999;\n}\n\n\n.snackbar-error.show {\n    visibility: visible;\n    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;\n    animation: fadein 0.5s, fadeout 0.5s 2.5s;\n}\n\n\n@-webkit-keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n\n\n@keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n\n\n@-webkit-keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n\n\n@keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n\n\n#to-do .modal-header {\n    margin: 0px 15px 25px;\n    padding: 10px 0;\n    font-size: 16px;\n    font-weight: 500;\n}\n\n\n.ToDoDocumentsItem{\n   padding-top:25px;\n}\n\n\n.light-blue-bg{\n   background: #f2f6fb !important;\n}\n\n\n.DocToDoText{\n    color:#313030;\n\tfont-size:13px;\n\tfont-weight:600;\n\ttext-transform:capitalize;\n\tfont-family: 'Roboto', sans-serif;\n}\n\n\n.font-11{\n    font-size:11px;\n}\n\n\n.SignatureText{\nfont-weight:500;\n\n}\n\n\n.pending-status{\n     color:#db4437;\n}\n\n\n.DocName h5 {\n    font-size: 14px;\n    margin: 5px 0;\n    padding: 0;\n    font-weight: 700;\n}\n\n\n.DocMeetingDetails{\n    color:#66676f;\n    font-size:11px;\n    font-weight:400;\n}\n\n\n.SurveysInfoBox {\n    background: #f3f3f3;\n    min-height: 110px;\n    border-radius: 3px;\n    border: 1px solid #f1eeee;    \n    padding: 5px 15px;\n    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.27);\n}\n\n\n.SurveysInfoBoxTitle h5 b{\n    font-weight: 700;\n    line-height: 1.3;\n    color: #515365;\n}\n\n\n.SurveysInfoBoxTitle h5 span{\n  display:block;\n  font-weight:400;\n  font-size:13px;\n}\n\n\n.gray-bg{\n    background: #f3f3f3\n}\n\n\n.CalendarDateWrap{\n    background-color: #7c7bad;\n    background: linear-gradient(to bottom,#7c7bad,#7c7bad);\n    color: #ffffff;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    text-align: center;\n    padding: 7px 5px;\n    font-size: 0.885em;\n    font-weight: 400;\n    letter-spacing: -0.5px;\n}\n\n\n.FormWrapper {\n    padding: 2%;\n    border-left: 5px solid #7c7bad;\n    background: #f3f3f3;\n}\n\n\n.FormWrapper textarea.form-control{\n    margin-bottom: 20px;\n    min-height: 150px;\n    resize: none;\n}\n\n\n.FormWrapper .form-control{\n    margin-bottom: 20px;\n}\n\n\n.cancelbtn, .signupbtn{\n    min-width: 130px;\n    font-size: 0.859em;\n    margin-right: 5px;\n}\n\n\n.home-survey-title .title{\n    font-size: 1.500em;\n    margin-bottom: 15px;\n}\n\n\na.fc-more{\n    background-color: blue !important;\n    color: white !important;\n}\n\n\n.to-do-alram\n{\n    position: relative;\n}\n\n\n.to-do-alram i{\n    width: 30px;\n    margin: 0 auto;\n    position: relative;\n}\n\n\nspan.to-do-count {\n    background: #dc3545;\n    color: white;\n    border-radius: 20px;\n    padding: 3px 6px 2px;\n    font-weight: bold;\n    font-size: 12px;\n    position: absolute;\n    top: -6px;\n    right: -11px;\n    border: 2px solid #ffffff;\n}\n\n\n.event-card label\n{\n    margin-bottom: 0;\n    font-weight: bold;\n}\n\n\n.event-card td {\n    padding-bottom: 10px;\n    padding-right: 20px;\n    font-size: 0.85rem;\n}\n\n\n.Info p {\n    margin-bottom: 5px;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n\nspan.kanban-upcoming-meeting-date {\n    font-size: 26px;\n}\n\n\n.kanban-upcoming-meeting{\n    display: flex;\n}\n\n\n.kanban-upcoming-meeting-date {\n    font-size: 26px;\n    font-weight: 500;\n    letter-spacing: normal;\n    margin-bottom: 3px;\n}\n\n\n.kanban-meeting-info{\n    background: #f3f3f3;\n    display: flex;\n    border-radius: 3px;\n    border: 1px solid #f1eeee;    \n    padding: 10px 2px 10px 6px;\n    flex-direction: column;\n    white-space: nowrap;\n    overflow-x: hidden;\n    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.27);\n}\n\n\n.kanban-card.survey\n{\n    width: 240px;\n}\n\n\n.kanban-upcoming-meeting a {\n    text-decoration: none;\n}\n\n\n.kanban-upcoming-meeting .Info {\n    font-size: 13px;\n    color: #6a6a6a;\n    padding-left: 10px;\n    line-height: 1.4em;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n\n.upcomingButton button\n{\n    font-size: 0.85rem;\n}\n\n\n.upcomingButton{\n    display: flex;\n    margin-top: 5px;\n    flex: 1;\n\n}\n\n\n.upcomingButton button{\n    margin-right: 4px;\n}\n\n\n.upcomingButton button i {\n    font-size: 14px;\n    padding-right: 4px;\n}\n\n\n@media (max-width: 575px) {\n\n\n.home div#collapsibleNavbar button {\n    font-size: 13px;\n    font-weight: 500;\n    padding: 10px 0;\n}\n\n.home div#collapsibleNavbar button i {\n    display: block;\n    font-size: 15px;\n}\n\nspan.to-do-count{\n    right: -6px;\n    font-size: 9px;\n    top: -8px;\n    padding:3px 5px 2px;\n}\n\n}\n\n\n@media (min-width: 576px) and (max-width: 767px) {\n    \n}\n\n\n@media (min-width: 768px) and (max-width: 991px) {\n\n}\n"

/***/ }),

/***/ "./src/components/home/home.component.html":
/*!*************************************************!*\
  !*** ./src/components/home/home.component.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"main-div\">\n    <div class=\"home\">\n        <div class=\"container\">\n            <div id=\"collapsibleNavbar\">\n                <button (click)=\"show_welcom(0)\" class=\"active\">\n                    <i class=\"far fa-handshake\"></i>\n                    <span>Welcome</span>\n                </button>\n                <button (click)=\"show_calendar(1)\">\n                    <i class=\"fa fa-calendar\"></i>\n                    <span>Calendar</span>\n                </button>\n                <button class=\"to-do-alram\" (click)=\"show_to_do(2)\" >                    \n                    <i class=\"fa fa-bell\"><span *ngIf=\"to_do_count>0\" class=\"to-do-count\">{{to_do_count}}</span></i>\n                    <span>To-Do Items</span>\n                </button>\n            </div>\n        </div>\n    </div>\n\n    <!--Welcome-->\n    <div *ngIf=\"welcome\" id=\"welcome\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-sm WelcomeContent\">\n                    <h4 class=\"HomeTitle\">\n                        <span>{{home_data.title}}</span>\n                    </h4>\n                    <div class=\"HomePageDiscription\">\n                        <div *ngIf=\"home_data.description\" class=\"HomePageContentText\">\n                                <div class=\"HomePageContentImg\">                        \n                                        <img width=\"100%\" src=\"{{home_data.photo}}\">\n                                    </div>\n                            <div id=\"home-content\" [innerHtml]=\"home_data.description\"></div>\n                        </div>\n                        \n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div style=\"padding: 10%\" *ngIf=\"!home_data.title && !home_data.description\">\n            <h1>WELCOME<br>TO MeetVUE</h1>\n        </div>\n\n        <section *ngIf=\"home_data.doc_ids && home_data.doc_ids.length\" class=\"HomepageDocumentSection\">\n            <div class=\"container\">\n                <div class=\"row\">\n                    <div class=\"col-sm-12\">\n                        <h4>\n                            <b>Documents</b>\n                        </h4>\n                        <br>\n                    </div>\n                    <div class=\"col-sm-12\">\n                        <div class=\"row\">\n                            <a class=\"col-sm-6 col-md-4 col-lg-3\" routerLink=\"/home/doc/{{doc.id}}\" *ngFor=\"let doc of home_data.doc_ids\">\n                                <div class=\"DocumentWrapper\">\n                                    <div class=\"DocIcon\">\n                                            <!-- doc_type='home' doc_id='{{doc.id}}' -->\n                                        <i class=\"fa fa-file\"></i>\n                                    </div>\n                                    <div class=\"DocText\">{{doc.name}}</div>\n                                </div>\n                            </a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </section>\n\n        <div *ngIf=\"home_data.video_ids && home_data.video_ids.length\" class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-sm-12\">\n                    <h4>\n                        <b>Videos</b>\n                    </h4>\n                    <br>\n                </div>\n                <div class=\"col-sm-12\">\n                    <div class=\"row\">\n                        <div class=\"col-sm-6 col-md-4 col-lg-3\" *ngFor=\"let video of home_data.video_ids\">\n                            <div class=\"HomePageVideoWrapper\">\n                                <div class=\"ThumnailWrapper\">\n                                    <div class=\"embed-responsive embed-responsive-16by9\">\n                                        <iframe class=\"embed-responsive-item\" [src]=\"video.url\" frameborder=\"0\" allowfullscreen></iframe>\n                                    </div>\n                                </div>\n                                <span>\n                                    <p>{{video.name}}</p>\n                                </span>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <!--Calander-->\n    <section class=\"CalendarWrapper\">\n        \n        <div id=\"calendar\"></div>\n        <div id=\"event-summary\" style=\"display:none;\">\n            <div class=\"event-card\">\n                <!-- <h2>\n                    <span name=\"name\">Meeting 22</span>\n                </h2> -->\n                <table class=\"o_group o_inner_group\">\n                    <tbody>\n                        <tr>\n                            <td>\n                                <label >Starting at</label>\n                            </td>\n                            <td><span name=\"start\">10/24/2018 08:00:00</span></td>\n                        </tr>\n                        <tr>\n                            <td>\n                                <label >Ending at</label>\n                            </td>\n                            <td><span name=\"stop\">10/24/2018 16:00:00</span></td>\n                        </tr>\n                        <tr>\n                            <td>\n                                <label>Duration</label>\n                            </td>\n                            <td><span name=\"duration\">08:00</span></td>\n                        </tr>\n                        <tr>\n                            <td>\n                                <label>Video Call Link</label>\n                            </td>\n                            <td>\n                                <span name=\"video_call_link\">\n                                    <a class=\"video_call_link\" href=\"\">Video Call</a>\n                                </span>\n                            </td>\n                        </tr>\n                        <tr>\n                            <td>\n                                <label>Conference Bridge No.</label>\n                            </td>\n                            <td><span name=\"conference_bridge_number\">123-456-7890</span></td>\n                        </tr>\n                        <tr>\n                            <td>\n                                <label>Meeting PIN</label>\n                            </td>\n                            <td><span name=\"pin\">1234567989</span></td>\n                        </tr>\n                        <tr>\n                            <td>\n                                <label>Location</label>\n                            </td>\n                            <td><span name=\"location\">London</span></td>\n                        </tr>\n                    </tbody>\n                </table>\n                <div class=\"upcomingButton\">\n                    <button class=\"btn btn-primary\">\n                        <span name=\"accepted\">Accept</span>\n                    </button>\n                    <button class=\"btn btn-primary\">\n                        <span name=\"declined\">Decline</span>\n                    </button>\n                    <button class=\"btn btn-primary\">\n                        <span name=\"tentative\">Tentative</span>\n                    </button>\n                </div>\n            </div>\n        </div>\n    </section>\n\n    <!--To Do-->\n    <div class=\"container\">\n        <div id=\"to-do\" style=\"display:none\">\n            <div *ngIf=\"home_data.to_do_items.pending_meetings && home_data.to_do_items.pending_meetings.length>0\" class=\"\">\n                <div class=\"container bordered\">\n                    <div class=\" modal-header\">\n                        Upcoming Meetings\n                    </div>\n                    <div class=\"\">\n                        <div class=\"container\">\n                            <div class=\"row\">\n                                <div class=\"kanban-card\" *ngFor=\"let meeting_object of home_data.to_do_items.pending_meetings\">\n                                    <div class=\"kanban-meeting-info\">\n                                        <a class=\"kanban-upcoming-meeting\" routerLink=\"/home/meeting/{{meeting_object.id}}\">\n                                            <div class=\"CalendarDateWrapper\">\n                                                <span *ngIf=\"meeting_object.start\" class=\"CalendarDateWrap\">\n                                                    <span class=\"kanban-upcoming-meeting-date\">\n                                                        {{meeting_object.start_dt.day}}\n                                                    </span>\n                                                    <span>\n                                                        {{meeting_object.start_dt.month_year}}\n                                                    </span>\n                                                    <span>\n                                                        {{meeting_object.start_dt.time}}\n                                                    </span>\n                                                </span>\n                                            </div>\n                                            <div class=\"Info\">\n                                                <p *ngIf=\"meeting_object.name\">\n                                                    <b>{{meeting_object.name}}</b>\n                                                </p>\n\t\t\t\t\t\t\t\t\t\t\t\t<span *ngIf=\"meeting_object.location\">{{meeting_object.location}}</span>\t\t\t\t\t\t\t\t\t\t\t\t\n                                            </div>\n                                        </a>\n                                        <div class=\"upcomingButton btn-flex-1\" id=\"tdmrb{{meeting_object.id}}\">\n                                            <button (click)=\"respond_invitation('accepted', meeting_object.id)\" class=\"btn btn-primary\">\n                                                <i *ngIf=\"meeting_object.attendee_status == 'accepted'\" class=\"fa fa-check fa-lg\" style=\"color:white\" modifiers=\"{}\"></i>\n                                                <span name=\"accepted\">Accept</span>\n                                            </button>\n                                            <button (click)=\"respond_invitation('declined', meeting_object.id)\" class=\"btn btn-primary\">\n                                                <i *ngIf=\"meeting_object.attendee_status == 'declined'\" class=\"fa fa-check fa-lg\" style=\"color:white\" modifiers=\"{}\"></i>\n                                                <span name=\"declined\">Decline</span>\n                                            </button>\n                                            <button (click)=\"respond_invitation('tentative', meeting_object.id)\" class=\"btn btn-primary\">\n                                                <i *ngIf=\"meeting_object.attendee_status == 'tentative'\" class=\"fa fa-check fa-lg\" style=\"color:white\" modifiers=\"{}\"></i>\n                                                <span name=\"tentative\">Tentative</span>\n                                            </button>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n            <!--Surveys-->\n            <div *ngIf=\"home_data.to_do_items.pending_surveys && home_data.to_do_items.pending_surveys.length\" class=\"\">\n                <div class=\"container bordered\">\n                    <div class=\"modal-header\">\n                        Surveys\n                    </div>\n                    <div class=\"\">\n                        <div class=\"container\">\n                            <div class=\"row\">\n                                <div class=\"kanban-card survey\" *ngFor=\"let sur of home_data.to_do_items.pending_surveys\">\n                                    <div class=\"SurveysInfoBox d-flex flex-wrap justify-content-between align-items-center\">\n                                        <div class=\"SurveysInfoBoxTitle\">\n                                            <h5>\n                                                <b>{{sur.title}}</b>\n                                                <span *ngIf=\"sur.meeting_name\"> Meeting: {{sur.meeting_name}}</span>\n                                            </h5>\n                                        </div>\n                                        <div class=\"\">\n                                            <button class=\"btn btn-primary\" routerLink=\"/home/survey/{{sur.id}}\">\n                                                <span *ngIf = \"sur.my_status == 'done'\">Results</span>\n                                                <span *ngIf = \"sur.my_status == 'pending'\">Start</span>\n                                            </button>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n            <!--Documents-->\n            <div *ngIf=\"home_data.to_do_items.pending_documents && home_data.to_do_items.pending_documents.length\" class=\"DocumentsSignWrapper\">\n                <div class=\"container bordered\">\n                    <div class=\"modal-header\">\n                        Documents To Sign\n                    </div>\n                    <div class=\"\">\n                        <div class=\"container\">\n                            <div class=\"row\">\n                                <div class=\"kanban-card\" *ngFor=\"let doc of home_data.to_do_items.pending_documents\">\n                                    <a class=\"DocumentWrapper gray-bg\" routerLink=\"/signature/doc/{{doc.id}}\">\n                                        <div class=\"DocIcon\">\n                                            <i class=\"fa fa-file\"></i>\n                                        </div>\n                                        <div class=\"DocText\">\n                                            <div class=\"DocName\">\n                                                <h5>Title: {{doc.name}}</h5>\n                                            </div>\n                                            <div class=\"DocMeeting\">\n                                                Meeting: {{doc.meeting_name}}\n                                            </div>\n                                            <div class=\"SignatureText font-11\">\n                                                <span>My Signature: </span>\n                                                <span class=\"pending-status\">{{doc.mp_signature_status}}</span>\n                                            </div>\n                                        </div>\n                                    </a>\n                                </div>\n                            </div>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n            <div style=\"border: 2px solid black;padding: 10%\" *ngIf=\"!to_do_data\">\n                <h1>Congratulations!<br>You have no task pending :)</h1>\n            </div>\n        </div>\n\n    <!--:::::::::::::::::::::: TOASTS ::::::::::::::::::::::-->\n\n    <div id=\"slot-select-success\" class=\"snackbar-success\">Successfully Saved Your Response.</div>\n    <div id=\"slot-select-error\" class=\"snackbar-error\">Something went wrong, Try Again After Some Time.</div>\n\n    <!--:::::::::::::::::::::: TOASTS ::::::::::::::::::::::-->\n    </div>\n</div>\n\n<div class=\"modal fade\" id=\"calenderModal\" role=\"dialog\" aria-hidden=\"true\">\n\t<div class=\"modal-dialog modal-lg modal-dialog-centered\">\n\t\t<div class=\"modal-content\">\n\t\t\t<div class=\"modal-header\">\n\t\t\t\t<h3></h3>\n\t\t\t\t<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n\t\t\t</div>\n\t\t\t<div id=\"modal-body\" class=\"modal-body\">\n\n\t\t\t</div>\n\t\t\t<div class=\"modal-footer\">\n\t\t\t\t<button style=\"display: none\" (click)=\"navigate_meeting()\" type=\"button\" class=\"btn btn-default go_details\" data-dismiss=\"modal\">Details</button>\n\t\t\t\t<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n"

/***/ }),

/***/ "./src/components/home/home.component.ts":
/*!***********************************************!*\
  !*** ./src/components/home/home.component.ts ***!
  \***********************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _app_http_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../app/http.service */ "./src/app/http.service.ts");
/* harmony import */ var _app_socket_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../app/socket.service */ "./src/app/socket.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_js_methods__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../app/js_methods */ "./src/app/js_methods.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomeComponent = /** @class */ (function () {
    function HomeComponent(httpService, router, sanitizer, socketService) {
        this.httpService = httpService;
        this.router = router;
        this.sanitizer = sanitizer;
        this.socketService = socketService;
        this.to_do_data = false;
        this.to_do_count = 0;
        this.survey_name = '';
        this.date = Date.now();
        this.events = [];
        this.surveyDetails = {};
        this.welcome = true;
        this.calendar = false;
        this.to_do = false;
        this.survey_show = false;
        this.home_data = {
            doc_ids: [],
            photo: '',
            to_do_items: {}
        };
        $('#collapsibleNavbar').children().eq(0).addClass('active');
    }
    HomeComponent.prototype.getSurveyDetails = function (id, name) {
        this.survey_name = name;
        var obj_this = this;
        this.httpService.call_post_http('/survey-questions-json', {
            survey_id: id
        }, function (result) {
            obj_this.surveyDetails['questions'] = result;
            obj_this.surveyDetails['survey_id'] = id;
            obj_this.toggle_Survey();
        }, function (error) {
            console.log(error);
        });
    };
    HomeComponent.prototype.toggle_Survey = function () {
        this.welcome = false;
        this.calendar = false;
        this.survey_show = !this.survey_show;
        this.to_do = !this.to_do;
    };
    HomeComponent.prototype.onSelectionChange = function (entry, question) {
        this.surveyDetails['questions'].forEach(function (ques) {
            if (ques.id === question.id) {
                ques['answer'] = entry.toString();
            }
        });
    };
    HomeComponent.prototype.submit_survey = function () {
        var _this = this;
        var obj_this = this;
        var questions = obj_this.surveyDetails['questions'];
        questions = JSON.stringify(questions);
        var input_data = {
            survey_id: obj_this.surveyDetails['id'],
            questions: questions
        };
        this.httpService.call_post_http('/survey-user-response', input_data, function (data) {
            console.log(data);
            _this.ngOnInit();
            _this.toggle_Survey();
        }, function (error) { });
    };
    HomeComponent.prototype.show_welcom = function (index) {
        $('#to-do').hide();
        $('#collapsibleNavbar').children().removeClass('active');
        $('#collapsibleNavbar').children().eq(index).addClass('active');
        this.welcome = true;
        this.calendar = false;
        document.getElementById('calendar').style.display = 'none';
        this.to_do = false;
        this.survey_show = false;
    };
    HomeComponent.prototype.show_calendar = function (index) {
        $('#to-do').hide();
        $('#collapsibleNavbar').children().removeClass('active');
        $('#collapsibleNavbar').children().eq(index).addClass('active');
        document.getElementById('calendar').style.display = 'block';
        this.welcome = false;
        this.to_do = false;
        this.survey_show = false;
        this.calendar = true;
        var home_data = this.home_data;
        var events = [];
        if (this.events.length != 0) {
            events = this.events;
        }
        else {
            if (home_data.calendar) {
                home_data.calendar.forEach(function (event) {
                    var date = Object(_app_js_methods__WEBPACK_IMPORTED_MODULE_5__["formatDate"])(new Date(event.start));
                    events.push({
                        title: event.name,
                        start: event.start,
                        stop: event.stop,
                        date: date,
                        id: event['id'],
                        my_event: event['my_event']
                    });
                });
                this.events = events;
            }
        }
        if (home_data.calendar)
            Object(_app_js_methods__WEBPACK_IMPORTED_MODULE_5__["showCalendar"])(events);
    };
    HomeComponent.prototype.show_to_do = function (index) {
        $('#collapsibleNavbar').children().removeClass('active');
        $('#collapsibleNavbar').children().eq(index).addClass('active');
        this.welcome = false;
        this.calendar = false;
        document.getElementById('calendar').style.display = 'none';
        this.survey_show = false;
        $('#to-do').show();
    };
    HomeComponent.prototype.respond_invitation = function (response, meet_id) {
        var req_url = '/meeting/respond-invitation-json';
        var obj_this = this;
        var input_data = {
            meeting_id: meet_id,
            response: response,
            no_loader: 1
        };
        var meeting_being_updated;
        this.home_data.to_do_items.pending_meetings.forEach(function (meeting) {
            if (meeting.id === meet_id) {
                meeting_being_updated = meeting;
            }
        });
        if (response) {
            this.httpService.call_post_http(req_url, input_data, function (data) {
                meeting_being_updated.attendee_status = response;
            }, null);
        }
    };
    HomeComponent.prototype.navigate_meeting = function () {
        var obj_this = this;
        var id = document.getElementsByClassName('go_details')[0].id;
        obj_this.router.navigate(['/upcoming/meeting/' + id]);
    };
    HomeComponent.prototype.get_home_data = function () {
        var req_url = '/ws/mp-home-json';
        var input_data = {};
        var obj_this = this;
        var success_cb = function (home_data) {
            if (!home_data['to_do_items']) {
                console.log("invalid data", home_data);
                return;
            }
            var result = home_data['to_do_items']['pending_meetings'];
            for (var i in result) {
                var start = result[i]['start'];
                start = Object(_app_js_methods__WEBPACK_IMPORTED_MODULE_5__["meeting_time"])(start);
                result[i]['start_dt'] = start;
            }
            home_data.description = obj_this.sanitizer.bypassSecurityTrustHtml(home_data.description);
            var valid_videos = [];
            home_data.video_ids.forEach(function (element) {
                if (element.url.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
                    element.url = obj_this.sanitizer.bypassSecurityTrustResourceUrl(element.url);
                    valid_videos.push(element);
                }
                else {
                    console.log(element.url + 'is not valid');
                }
            });
            home_data.video_ids = valid_videos;
            obj_this.home_data = home_data;
            var to_do_items = obj_this.home_data.to_do_items;
            if (to_do_items.pending_meetings.length) {
                obj_this.to_do_data = true;
            }
            else if (to_do_items.pending_surveys.length) {
                obj_this.to_do_data = true;
            }
            else if (to_do_items.pending_documents.length) {
                obj_this.to_do_data = true;
            }
            obj_this.to_do_count = to_do_items.pending_documents.length + to_do_items.pending_meetings.length + to_do_items.pending_surveys.length;
        };
        var failure_cb = function (er) {
            console.log(er);
        };
        obj_this.httpService.call_post_http(req_url, input_data, success_cb, failure_cb);
    };
    HomeComponent.prototype.ngOnInit = function () {
        var obj_this = this;
        obj_this.get_home_data();
        this.socketService.server_events['to_do_item_updated'] = function () {
            if (obj_this)
                obj_this.get_home_data();
        };
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./home.component.html */ "./src/components/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.css */ "./src/components/home/home.component.css")]
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DomSanitizer"],
            _app_socket_service__WEBPACK_IMPORTED_MODULE_3__["SocketService"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/components/jitsi/jitsi.component.css":
/*!**************************************************!*\
  !*** ./src/components/jitsi/jitsi.component.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n"

/***/ }),

/***/ "./src/components/jitsi/jitsi.component.html":
/*!***************************************************!*\
  !*** ./src/components/jitsi/jitsi.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"jitsi-meet-container\">\n    <div id=\"meeting-room\">\n        \n    </div>\n    <div id=\"audience\"></div>\n    <div id=\"setup-buttons\">\n        <button id='leave-room'>Leave Room</button>\n        <button id='switch_screen'>SwitchScreen</button>\n    </div>    \n</div>"

/***/ }),

/***/ "./src/components/jitsi/jitsi.component.ts":
/*!*************************************************!*\
  !*** ./src/components/jitsi/jitsi.component.ts ***!
  \*************************************************/
/*! exports provided: JitsiComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JitsiComponent", function() { return JitsiComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var JitsiComponent = /** @class */ (function () {
    function JitsiComponent(router) {
        this.router = router;
    }
    JitsiComponent.prototype.ngOnInit = function () {
        var obj_this = this;
        /* global $, JitsiMeetJS */
        var JitsiMeetJS = window['JitsiMeetJS'];
        console.log(JitsiMeetJS, 13);
        $('#meeting-room').html('');
        $('#audience').html('');
        var options = {
            hosts: {
                domain: 'meet.jit.si',
                //bridge: 'jitsi-videobridge.meet.jit.si',
                muc: 'conference.meet.jit.si' // FIXME: use XEP-0030
            },
            bosh: 'https://meet.jit.si/http-bind',
        };
        var confOptions = {
            openBridgeChannel: true
        };
        var connection = null;
        var isJoined = false;
        var room = undefined;
        var conference = undefined;
        var roomName = undefined;
        var localTracks = [];
        var remoteTracks = {};
        var notJoined = true;
        $('#leave-room').click(function () {
            unload();
            obj_this.router.navigate(['/']);
        });
        var isVideo = true;
        $(window).bind('beforeunload', unload);
        $(window).bind('unload', unload);
        $('#switch_screen').click(function () {
            switchVideo();
        });
        $('body').on('click', '#audience video', function () {
            showAsMainVideo(this.srcObject);
        });
        var meParticipant = undefined;
        // JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);
        var initOptions = {
            disableAudioLevels: true,
            // The ID of the jidesha extension for Chrome.
            desktopSharingChromeExtId: 'kglhbbefdnlheedjiejgomgmfplipfeb',
            // Whether desktop sharing should be disabled on Chrome.
            desktopSharingChromeDisabled: false,
            // The media sources to use when using screen sharing with the Chrome
            // extension.
            desktopSharingChromeSources: ['screen', 'window'],
            // Required version of Chrome extension
            desktopSharingChromeMinExtVersion: '0.1',
            // Whether desktop sharing should be disabled on Firefox.
            desktopSharingFirefoxDisabled: false
        };
        JitsiMeetJS.init(initOptions);
        connection = new JitsiMeetJS.JitsiConnection(null, null, options);
        //console.log(initOptions, options);
        connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, onConnectionSuccess);
        connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED, onConnectionFailed);
        connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, disconnect);
        JitsiMeetJS.mediaDevices.addEventListener(JitsiMeetJS.events.mediaDevices.DEVICE_LIST_CHANGED, onDeviceListChanged);
        connection.connect();
        JitsiMeetJS.createLocalTracks({
            devices: ['audio', 'video']
        }).then(onLocalTracks).catch(function (error) {
            throw error;
        });
        if (JitsiMeetJS.mediaDevices.isDeviceChangeAvailable('output')) {
            JitsiMeetJS.mediaDevices.enumerateDevices(function (devices) {
                var audioOutputDevices = devices.filter(function (d) { return d.kind === 'audiooutput'; });
                if (audioOutputDevices.length > 1) {
                    $('#audioOutputSelect').html(audioOutputDevices
                        .map(function (d) {
                        return "<option value=\"" + d.deviceId + "\">" + d.label + "</option>";
                    })
                        .join('\n'));
                    $('#audioOutputSelectWrapper').show();
                }
            });
        }
        function showAsMainVideo(videoSource) {
            //console.log(videoSource);
            $('#meeting-room').html('<video autoplay/>');
            $('#meeting-room video')[0].srcObject = videoSource;
        }
        function onLocalTracks(tracks) {
            localTracks = tracks;
            for (var i = 0; i < localTracks.length; i++) {
                localTracks[i].addEventListener(JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED, function (audioLevel) { return console.log("Audio Level local: " + audioLevel); });
                localTracks[i].addEventListener(JitsiMeetJS.events.track.TRACK_MUTE_CHANGED, function () { return console.log('local track muted'); });
                localTracks[i].addEventListener(JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED, function () { return console.log('local track stoped'); });
                localTracks[i].addEventListener(JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED, function (deviceId) {
                    return console.log("track audio output device was changed to " + deviceId);
                });
                var mediaHtml = '';
                var trackType = localTracks[i].getType();
                if (trackType === 'audio') {
                    mediaHtml = "<div class='audio'>";
                    mediaHtml += "<audio autoplay='1' id='localAudio" + i + "' class=\"localaudio\" />";
                    mediaHtml += "</div>";
                    $('#audience').append(mediaHtml);
                    localTracks[i].attach($("#localAudio" + i)[0]);
                }
                else {
                    mediaHtml = "<div class='video'>";
                    mediaHtml += "<video autoplay='1' id='localVideo" + i + "' class=\"localvideo\" />";
                    mediaHtml += "</div>";
                    $('#audience').append(mediaHtml);
                    localTracks[i].attach($("#localVideo" + i)[0]);
                }
                //console.log($('#meeting-room'));
                if (isJoined) {
                    room.addTrack(localTracks[i]);
                }
                if (trackType != 'video') {
                    $('#audience video:last').click();
                }
            }
        }
        function onRemoteTrack(track) {
            if (track.isLocal()) {
                return;
            }
            var participant = track.getParticipantId();
            if (!remoteTracks[participant]) {
                remoteTracks[participant] = [];
            }
            var idx = remoteTracks[participant].push(track);
            var trackType = track.getType();
            // if(trackType != 'audio')
            // {
            //     console.log(participant);
            //     console.log (track.conference.participants);
            // }
            track.addEventListener(JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED, function (audioLevel) { return console.log("Audio Level remote: " + audioLevel); });
            track.addEventListener(JitsiMeetJS.events.track.TRACK_MUTE_CHANGED, function () { return console.log('remote track muted'); });
            track.addEventListener(JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED, function () { return console.log('remote track stoped'); });
            track.addEventListener(JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED, function (deviceId) {
                return console.log("track audio output device was changed to " + deviceId);
            });
            var trackType = track.getType();
            var elementId = trackType + participant;
            var remoteHtml = '';
            if (track.getType() != 'audio') {
                remoteHtml = "<div class='video'><video autoplay='1' id='" + elementId + "' /><div>";
                $('#audience').append(remoteHtml);
            }
            else {
                remoteHtml = "<div class='audio'><audio autoplay='1' id='" + elementId + "' /></div>";
                $('#audience').append(remoteHtml);
            }
            track.attach($("#" + elementId)[0]);
            if (trackType == 'video') {
                $('#audience video:last').click();
            }
            if (!conference) {
                conference = room.e2eping.conference;
                var pinoo = conference.getPhonePin();
                console.log(pinoo, 17);
            }
        }
        function onRemoteTrackRemoved(track) {
            if (track.isLocal()) {
                return;
            }
            var participant = track.getParticipantId();
            var elementId = track.getType() + participant;
            $('#' + elementId).parent().remove();
            //delete participant[participant];            
            track = undefined;
        }
        function onConferenceJoined() {
            //console.log(room.avgRtpStatsReporter._conference);
            notJoined = false;
            isJoined = true;
            for (var i = 0; i < localTracks.length; i++) {
                room.addTrack(localTracks[i]);
            }
            $('#leave-room').show();
        }
        function onUserLeft(id) {
            console.log('user left');
            if (!remoteTracks[id]) {
                return;
            }
            var tracks = remoteTracks[id];
            for (var i = 0; i < tracks.length; i++) {
                tracks[i].detach($("#" + id + tracks[i].getType()));
            }
        }
        function onConnectionSuccess() {
            var locs = window.location.toString();
            var arr = locs.split('/');
            locs = arr[arr.length - 1];
            if (locs != 'jitsilow') {
                roomName = locs;
            }
            else {
                var rand = Math.floor(Math.random() * (999 - 100 + 1) + 100);
                roomName = 'dnr' + rand;
            }
            joinRoom(roomName);
        }
        function joinRoom(roomName) {
            room = connection.initJitsiConference(roomName, confOptions);
            //console.log(room);
            room.on(JitsiMeetJS.events.conference.TRACK_ADDED, onRemoteTrack);
            room.on(JitsiMeetJS.events.conference.TRACK_REMOVED, onRemoteTrackRemoved);
            room.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, onConferenceJoined);
            room.on(JitsiMeetJS.events.conference.USER_JOINED, function (id) {
                notJoined = false;
                $('#leave-room').show();
                console.log('user joined room ' + roomName);
                remoteTracks[id] = [];
            });
            room.on(JitsiMeetJS.events.conference.USER_LEFT, onUserLeft);
            room.on(JitsiMeetJS.events.conference.TRACK_MUTE_CHANGED, function (track) {
                console.log(track.getType() + " - " + track.isMuted());
            });
            room.on(JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED, function (userID, displayName) { return console.log(userID + " - " + displayName); });
            room.on(JitsiMeetJS.events.conference.TRACK_AUDIO_LEVEL_CHANGED, function (userID, audioLevel) { return console.log(userID + " - " + audioLevel); });
            room.on(JitsiMeetJS.events.conference.PHONE_NUMBER_CHANGED, function () { return console.log(room.getPhoneNumber() + " - " + room.getPhonePin()); });
            room.join();
            setTimeout(function () {
                if (notJoined)
                    console.log("Not joined");
            }, 6000);
        }
        function onConnectionFailed() {
            console.error('Connection Failed!');
        }
        function onDeviceListChanged(devices) {
            console.info('current devices', devices);
        }
        function disconnect() {
            console.log('disconnect!');
            connection.removeEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, onConnectionSuccess);
            connection.removeEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED, onConnectionFailed);
            connection.removeEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, disconnect);
        }
        function unload() {
            try {
                for (var i = 0; i < localTracks.length; i++) {
                    localTracks[i].dispose();
                }
                //room.leave();
                connection.disconnect();
            }
            catch (er) {
                console.log(er);
            }
        }
        function switchVideo() {
            // eslint-disable-line no-unused-vars
            isVideo = !isVideo;
            if (localTracks[1]) {
                localTracks[1].dispose();
                localTracks.pop();
            }
            JitsiMeetJS.createLocalTracks({
                devices: [isVideo ? 'video' : 'desktop']
            }).then(function (tracks) {
                localTracks.push(tracks[0]);
                localTracks[1].addEventListener(JitsiMeetJS.events.track.TRACK_MUTE_CHANGED, function () { return console.log('local track muted'); });
                localTracks[1].addEventListener(JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED, function () { return console.log('local track stoped'); });
                localTracks[1].attach($('#localVideo1')[0]);
                room.addTrack(localTracks[1]);
            }).catch(function (error) {
                console.log("Error in screen share => ", error.message);
            });
        }
        function changeAudioOutput(selected) {
            // eslint-disable-line no-unused-vars
            JitsiMeetJS.mediaDevices.setAudioOutputDevice(selected.value);
        }
    };
    JitsiComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-jitsi',
            template: __webpack_require__(/*! ./jitsi.component.html */ "./src/components/jitsi/jitsi.component.html"),
            styles: [__webpack_require__(/*! ./jitsi.component.css */ "./src/components/jitsi/jitsi.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], JitsiComponent);
    return JitsiComponent;
}());



/***/ }),

/***/ "./src/components/login/login.component.html":
/*!***************************************************!*\
  !*** ./src/components/login/login.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"main-div\" style=\"display:none\" class=\"Login-form-wrapper\" *ngIf=\"page_loaded\">\n    <div class=\"login-form-div\">\n        \n        <!--<div class=\"img-thumbnail\" id='output'></div>-->\n        <form [formGroup]=\"loginForm\" (ngSubmit)=\"onSubmit()\">\n            <div class=\"meet-logo-text\">\n                <h1>MeetVUE</h1>\n                <span>Welcome to Login</span>\n            </div>\n            <div class=\"form-group input-label-icon\">\n                <i class=\"fas fa-user\"></i>\n                <input id=\"username\" placeholder=\"Username\" type=\"text\" formControlName=\"username\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.username.errors }\" />\n                <div *ngIf=\"submitted && f.username.errors\" class=\"invalid-feedback\">\n                    <div *ngIf=\"f.username.errors.required\">Username is required</div>\n                </div>\n            </div>\n            <div class=\"form-group input-label-icon\">\n                <i class=\"fas fa-key\"></i>\n                <input id=\"password\" placeholder=\"Password\" type=\"password\" formControlName=\"password\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.password.errors }\" />\n                <div *ngIf=\"submitted && f.password.errors\" class=\"invalid-feedback\">\n                    <div *ngIf=\"f.password.errors.required\">Password is required</div>\n                </div>\n            </div>\n            <div class=\"form-group text-left\">\n                <button class=\"login-btn\">Login</button>\n                <a class=\"forgot\" routerLink=\"/forgot-password\">Forogt Password?</a>\n            </div>\n            <div *ngIf=\"error\" class=\"alert alert-danger\">{{error}}</div>\n        </form>\n    </div>\n</div>"

/***/ }),

/***/ "./src/components/login/login.component.ts":
/*!*************************************************!*\
  !*** ./src/components/login/login.component.ts ***!
  \*************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_http_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../app/http.service */ "./src/app/http.service.ts");
/* harmony import */ var _app_socket_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../app/socket.service */ "./src/app/socket.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginComponent = /** @class */ (function () {
    function LoginComponent(formBuilder, route, router, httpService, socketService) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.httpService = httpService;
        this.socketService = socketService;
        this.selectedFile = null;
        this.loading = false;
        this.submitted = false;
        this.page_loaded = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        $(document).ready(function () {
            setTimeout(function () {
                $('#main-div').show();
                window['functions'].hideLoader('force', 'login');
            }, 100);
        });
        var path_name = window['pathname'];
        if (path_name == '/logout') {
            window['current_user'].logout();
        }
        var login_info = { login: '', password: '' };
        this.loginForm = this.formBuilder.group({
            username: [login_info.login, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            password: [login_info.password, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
        this.page_loaded = true;
    };
    Object.defineProperty(LoginComponent.prototype, "f", {
        // convenience getter for easy access to form fields
        get: function () { return this.loginForm.controls; },
        enumerable: true,
        configurable: true
    });
    LoginComponent.prototype.onSubmit = function () {
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        var obj_this = this;
        obj_this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        var req_url = '/ws/authenticate-json';
        var input_data = {
            login: this.f.username.value,
            password: this.f.password.value,
        };
        input_data['app_name'] = window['site_config'].app_name;
        var success_cb = function (user) {
            obj_this.socketService.connect_socket(user);
            obj_this.loading = false;
            obj_this.router.navigate([obj_this.returnUrl]);
        };
        var failure_cb = function (error) {
            obj_this.error = error;
            obj_this.loading = false;
        };
        var complete_cb = function () {
            obj_this.loading = false;
        };
        this.httpService.authenticate(req_url, input_data, success_cb, failure_cb, complete_cb);
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./login.component.html */ "./src/components/login/login.component.html"),
            styles: [__webpack_require__(/*! ../../assets/css/login.css */ "./src/assets/css/login.css")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _app_http_service__WEBPACK_IMPORTED_MODULE_3__["HttpService"],
            _app_socket_service__WEBPACK_IMPORTED_MODULE_4__["SocketService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/components/meetingdetails/meetingdetails.component.css":
/*!********************************************************************!*\
  !*** ./src/components/meetingdetails/meetingdetails.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".note{\n\tborder: 1px solid gray;\n\tpadding: 1%;\n\tmargin: 1% 0;\n\tbackground: #f1f2f4;\n\tfont-size: 14px;\n\tfont-weight: 900;\n}\n\nh5, .h5 {\n    font-size: 0.898rem;\n}\n\n.meet-elements {\n    border-right: 1px solid #cccccc;\n    font-weight: bolder;\n}\n\n.active{\n    background-color: #9c4784 !important;\n    color: white;\n}\n\n.btn-default{\n    background-color: silver;\n}\n\n.btn-default:focus {\n    outline: solid;\n}\n\n.navbar{\n    background-color: #eeeeee;\n}\n\n.home{\n    background-color: transparent !important;\n}\n\n.kanban-card.survey\n{\n    width: 240px;\n}\n\n.bordered{\n    border: 1px solid #808080;\n}\n\n.modal-header, .modal-footer{\n    background-color: #eeeeee !important;\n}\n\n#addSlot>.modal-dialog>.modal-content{\n    border: 0px !important;\n    box-shadow: 1px 5px 20px 3px #808080;\n}\n\n.add-slot{\n    cursor: pointer;\n    background-color: #54ab35;\n    height: 50px;\n    width: 50px;\n    color: white;\n    font-size: 32px;\n    position: fixed;\n    top: 68px;\n    left: 20px;\n    border: 0px !important;\n    border-radius: 50px;\n    box-shadow: 1px 2px 10px 1px #808080;\n}\n\n.btn-info, .btn-info>a, .btn-secondary{\n    background-color: white;\n    border-color: white;\n}\n\n/*Success Snackbar*/\n\n.snackbar-success {\n    visibility: hidden;\n    min-width: 250px;\n    margin-left: -125px;\n    background-color: #54C036;\n    color: #fff;\n    text-align: center;\n    border-radius: 2px;\n    padding: 16px;\n    position: fixed;\n    z-index: 1;\n    left: 50%;\n    bottom: 30px;\n    font-size: 17px;\n    z-index: 999999;\n}\n\n.snackbar-success.show {\n    visibility: visible;\n    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;\n    animation: fadein 0.5s, fadeout 0.5s 2.5s;\n}\n\n@-webkit-keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n\n@keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n\n@-webkit-keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n\n@keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n\n/*ERROR SNACKBAR*/\n\n.snackbar-error {\n    visibility: hidden;\n    min-width: 250px;\n    margin-left: -125px;\n    background-color: #ff0033;\n    color: white;\n    text-align: center;\n    border-radius: 2px;\n    padding: 16px;\n    position: fixed;\n    z-index: 1;\n    left: 50%;\n    bottom: 30px;\n    font-size: 17px;\n    z-index: 999999;\n}\n\n.snackbar-error.show {\n    visibility: visible;\n    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;\n    animation: fadein 0.5s, fadeout 0.5s 2.5s;\n}\n\n@-webkit-keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n\n@keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n\n@-webkit-keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n\n@keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n\n/* .meeting-details-form {\n    background: #f3f3f3;\n    border-left: 5px solid #7c7bad;\n    padding: 30px;\n    margin-bottom: 30px;\n} */\n\n.kanban-profiles-user-img{\n    margin-right: 10px;\n}\n\n.kanban-profiles-user-info{\n    flex: 1 1 auto;\n}\n\n.title-wrapper .modal-header{\n    margin: 0px 0 25px;\n    padding: 10px 0;\n    font-size: 16px;\n    font-weight: 500;\n    background: transparent !important;\n}\n\n.SurveysInfoBox {\n    background: #f3f3f3;\n    min-height: 110px;\n    border-radius: 3px;\n    border: 1px solid #f1eeee;    \n    padding: 5px 15px;\n    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.27);\n}\n\n.SurveysInfoBoxTitle h5 b{\n    font-weight: 700;\n    line-height: 1.3;\n    color: #515365;\n}\n\n.SurveysInfoBoxTitle h5 span{\n  display:block;\n  font-weight:400;\n  font-size:13px;\n}\n\n.meeting-details-roster-info-img{\n    margin-right: 15px;\n}\n\n.comments button{\n    margin: 0 !important;\n}\n\n.comments textarea.form-control{\n    margin-bottom: 20px;\n    min-height: 150xp;\n}\n\n.reply.container .label\n{\n    padding-bottom: 20px;\n}\n\n.container.comments {\n    padding-bottom: 20px;\n}\n\n.message.reply, .mainthread{\n    background: #eeeeee;\n    border-radius: 13px;\n    padding: 1%;\n}\n\n.message.reply{\n    background: silver;\n}\n\n.comments-container {\n    border-right: 1px solid #eeeeee;\n    border-left: 1px solid #eeeeee;\n    padding: 0 6%;\n}\n\n.label{\n    cursor: pointer;\n    float: right;\n    background: #eeeeee;\n    padding: 0 5px;\n    border-radius: 25px;\n    font-weight: bolder;\n}\n\n.comment_response{\n    font-size: 12px;\n    color: grey;\n    padding: 0 0 0 3%;\n    margin-bottom: 10px;\n    margin-top: 5px;\n}\n\n.label > div {\n    width: 35px;\n    text-align: center;\n}\n\n.main.comment_response a {\n    padding: 0 5px 0 5px;\n}\n\n.reply-input {\n    margin: 0 0 10px 0;\n}\n\n.reply-body{\n\tword-wrap: break-word;\n\twidth: 80%;\n}\n\n.upcomingButton button\n{\n    font-size: 0.85rem;\n}\n\n.upcomingButton{\n    display: flex;\n    margin-top: 5px;\n    margin-bottom: 10px;\n\n}\n\n.upcomingButton button{\n    margin-right: 4px;\n}\n\n.upcomingButton button i {\n    font-size: 14px;\n    padding-right: 4px;\n}\n"

/***/ }),

/***/ "./src/components/meetingdetails/meetingdetails.component.html":
/*!*********************************************************************!*\
  !*** ./src/components/meetingdetails/meetingdetails.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div  id=\"main-div\">\n\t<div class=\" breadcrumbSection\">\n\t\t<div class=\"container\">\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t\t<ol class=\"breadcrumb\">\n\t\t\t\t\t\t<li class=\"breadcrumb-item\" *ngFor=\"let item of bread_crumb.items\">\n\t\t\t\t\t\t\t<a routerLink=\"{{item.link}}\">\n\t\t\t\t\t\t\t\t{{item.title}}\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t<li class=\"breadcrumb-item\">{{bread_crumb.title}}</li>\n\t\t\t\t\t</ol>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<div class=\"page-links\">\n        <span class=\"prev next-prev-link\" title=\"Privious\">\n            <i class=\"fa fa-angle-left\"></i>\n        </span>\n\t\t<span class=\"next next-prev-link\" title=\"Next\">\n            <i class=\"fa fa-angle-right\"></i>\n        </span>\n\t</div>\n\n\t<div class=\"container\">\n\t\t<div class=\" form-details\">\n\t\t\t<div class=\"meeting-details-form\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-sm-12 d-flex\" style=\"justify-content:flex-end;\">\n\t\t\t\t\t\t<span *ngIf=\"title === 'Completed'\" class=\"badge badge-success\">{{title}}</span>\n\t\t\t\t\t\t<span *ngIf=\"title === 'Archived'\" class=\"badge badge-danger\">{{title}}</span>\n\t\t\t\t\t\t<span *ngIf=\"title === 'Upcoming'\" class=\"badge badge-warning\">{{title}}</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"row note\" *ngIf=\"conference_not_active\">\n\t\t\t\t\tMeeting conference URL will be available 15 minutes before meeting start.\n\t\t\t\t</div>\n\t\t\t\t<div *ngIf=\"me && me.state && meeting_type == 'upcoming'\">\n\t\t\t\t\t<div class=\"upcomingButton\" id=\"tdmrb{{meeting_object.id}}\">\n\t\t\t\t\t\t<button (click)=\"respond_invitation('accepted', meeting_object.id)\" class=\"btn btn-primary\">\n\t\t\t\t\t\t\t<i *ngIf=\"meeting_object.attendee_status == 'accepted' || meeting_object.status == 'Accept'\" class=\"fa fa-check fa-lg\" style=\"color:white\" modifiers=\"{}\"></i>\n\t\t\t\t\t\t\t<span name=\"accepted\">Accept</span>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t\t<button (click)=\"respond_invitation('declined', meeting_object.id)\" class=\"btn btn-primary\">\n\t\t\t\t\t\t\t<i *ngIf=\"meeting_object.attendee_status == 'declined' || meeting_object.status == 'decline'\" class=\"fa fa-check fa-lg\" style=\"color:white\" modifiers=\"{}\"></i>\n\t\t\t\t\t\t\t<span name=\"declined\">Decline</span>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t\t<button (click)=\"respond_invitation('tentative', meeting_object.id)\" class=\"btn btn-primary\">\n\t\t\t\t\t\t\t<i *ngIf=\"meeting_object.attendee_status == 'tentative' || meeting_object.status == 'tentative'\" class=\"fa fa-check fa-lg\" style=\"color:white\" modifiers=\"{}\"></i>\n\t\t\t\t\t\t\t<span name=\"tentative\">Tentative</span>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"div1\" *ngIf=\"meeting_object\">\n\t\t\t\t\t<div *ngIf=\"me && me.state\" class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-3 meet-elements\">\n\t\t\t\t\t\t\tMy Status\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<label class=\"col-sm-9\">\n\t\t\t\t\t\t\t{{me.state}}\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div *ngIf=\"meeting_object.name && meeting_object.name\" class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-3 meet-elements\">\n\t\t\t\t\t\t\tMeeting Subject\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<label class=\"col-sm-9\">\n\t\t\t\t\t\t\t{{meeting_object.name}}\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div *ngIf=\"meeting_object.start && meeting_object.start\" class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-3 meet-elements\">\n\t\t\t\t\t\t\tStart Date & Time\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<label class=\"col-sm-9\">\n\t\t\t\t\t\t\t{{meeting_object.start | date:'medium' }}\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div *ngIf=\"meeting_object.stop && meeting_object.stop\" class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-3 meet-elements\">\n\t\t\t\t\t\t\tEnd Date & Time\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<label class=\"col-sm-9\">\n\t\t\t\t\t\t\t{{meeting_object.stop | date:'medium'}}\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div *ngIf=\"meeting_object.duration && meeting_object.duration\" class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-3 meet-elements\">\n\t\t\t\t\t\t\tDuration\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<label class=\"col-sm-9\">\n\t\t\t\t\t\t\t{{meeting_object.duration}}\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<!-- <h2>Status {{meeting_object.conference_status}}</h2> -->\n\n\t\t\t\t<div class=\"div2\" *ngIf=\"meeting_object.conference_status == 'active'\">\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-3 meet-elements\">\n\t\t\t\t\t\t\tConference Bridge No.\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<label class=\"col-sm-9\">\n\t\t\t\t\t\t\t{{meeting_object.conference_bridge_number}}\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-3 meet-elements\">\n\t\t\t\t\t\t\tMeeting PIN\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<label class=\"col-sm-9\">{{meeting_object.pin}}</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-3 meet-elements\">\n\t\t\t\t\t\t\tVideo Call Link\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<label class=\"col-sm-9\">\n\t\t\t\t\t\t\t<a href=\"{{meeting_object.video_call_link}}\">{{meeting_object.video_call_link}}</a>\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div  class=\"div3\">\n\n\t\t\t\t\t<div *ngIf=\"meeting_object.location\" class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-3 meet-elements\">\n\t\t\t\t\t\t\tLocation\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<label class=\"col-sm-9\">\n\t\t\t\t\t\t\t{{meeting_object.location}}\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div  class=\"div5\">\n\t\t\t\t\t<div  *ngIf=\"meeting_object.hasOwnProperty('description') && meeting_object.description\" class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-3 meet-elements\">\n\t\t\t\t\t\t\tDescription\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<label class=\"col-sm-9\" [innerHtml]=\"meeting_object.description\"></label>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div *ngIf=\"meeting_object.topics && meeting_object.topics.length\" class=\"title-wrapper\">\n\t\t\t<div class=\"modal-header\">\n\t\t\t\tAgenda Topics\n\t\t\t</div>\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t\t<div class=\"table-responsive\">\n\t\t\t\t\t\t<table class=\"table table-bordered\">\n\t\t\t\t\t\t\t<thead class=\"thead-light\">\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<th>Title</th>\n\t\t\t\t\t\t\t\t<th>Lead</th>\n\t\t\t\t\t\t\t\t<th>Duration</th>\n\t\t\t\t\t\t\t\t<th>Attachment</th>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t</thead>\n\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t<tr style=\"cursor:pointer\" routerLink=\"/topic/{{topic.id}}\" *ngFor=\"let topic of meeting_object.topics\">\n\t\t\t\t\t\t\t\t<td>{{topic.name}}</td>\n\t\t\t\t\t\t\t\t<td>{{topic.lead}}</td>\n\t\t\t\t\t\t\t\t<td >{{topic.duration}}</td>\n\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t<div class=\"talbe-docs-wrapper\">\n\t\t\t\t\t\t\t\t\t\t<div *ngIf=\"topic.docs && topic.docs.length && topic.docs.length > 0\">\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-file\"></i>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t</table>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div *ngIf=\"meeting_object.attendees && meeting_object.attendees.length\" class=\"meeting-details-roster title-wrapper\">\n\t\t\t<div class=\"modal-header\">\n\t\t\t\tRoster\n\t\t\t</div>\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"kanban-card\" *ngFor=\"let attendee of meeting_object.attendees\">\n\t\t\t\t\t<a class=\"kanban-profiles-user-info-box\">\n\t\t\t\t\t\t<div class=\"meeting-details-roster-info-img\">\n\t\t\t\t\t\t\t<img class=\"img-thumbnail-md\" alt='N/A' src=\"{{attendee.photo}}\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"meeting-details-roster-info-text\">\n\t\t\t\t\t\t\t<h6>{{attendee.name}}</h6>\n\t\t\t\t\t\t\t<div *ngIf=\"attendee.response_by\">Response By: {{attendee.response_by}}</div>\n\t\t\t\t\t\t\t<div *ngIf=\"attendee.email\" class=\"\">\n\t\t\t\t\t\t\t\t{{attendee.email}}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div *ngIf=\"attendee.state\" class=\"\">\n\t\t\t\t\t\t\t\t<b>Status : </b> {{attendee.state}}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div *ngIf=\"meeting_object.surveys && meeting_object.surveys.length\" class=\"title-wrapper\">\n\t\t\t<!--Surveys-->\n\t\t\t<div class=\"modal-header\">\n\t\t\t\tSurveys\n\t\t\t</div>\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"kanban-card survey\" *ngFor=\"let sur of meeting_object.surveys\">\n\t\t\t\t\t<div class=\"SurveysInfoBox d-flex flex-wrap justify-content-between align-items-center\">\n\t\t\t\t\t\t<div class=\"SurveysInfoBoxTitle\">\n                            <span class=\"container\">\n                                <h5>\n                                    <b>{{sur.title}}</b>\n                                </h5>\n                            </span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"\">\n\t\t\t\t\t\t\t<button class=\"btn btn-primary\" routerLink=\"/survey/{{sur.id}}\">\n\t\t\t\t\t\t\t\t<span *ngIf = \"sur.my_status == 'done'\">Results</span>\n\t\t\t\t\t\t\t\t<span *ngIf = \"sur.my_status == 'pending'\">Start</span>\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div *ngIf=\"meeting_object.meeting_docs && meeting_object.meeting_docs.length\" class=\"title-wrapper\">\n\t\t\t<div class=\"modal-header\">\n\t\t\t\tMeeting Documents\n\t\t\t</div>\n\t\t\t<div class=\"row docwrappercontainer\">\n\t\t\t\t<div class=\"kanban-card\" routerLink=\"/meeting/doc/{{doc.id}}\" *ngFor=\"let doc of meeting_object.meeting_docs\">\n\t\t\t\t\t<div class=\"DocumentWrapper gray-bg\">\n\t\t\t\t\t\t<div class=\"DocIcon\">\n\t\t\t\t\t\t\t<i class=\"fa fa-file\"></i>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"DocText\">\n\t\t\t\t\t\t\t<div class=\"DocName\">\n\t\t\t\t\t\t\t\t<h5>{{doc.name}}</h5>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div *ngIf=\"meeting_object.sign_docs && meeting_object.sign_docs.length\" class=\"DocumentsSignWrapper title-wrapper\">\n\t\t\t<div class=\"modal-header\">\n\t\t\t\tDocuments To Sign\n\t\t\t</div>\n\t\t\t<div class=\"row docwrappercontainer\">\n\t\t\t\t<a class=\"col-sm-6 col-md-4 col-lg-4\" routerLink=\"/signature/doc/{{doc.id}}\" *ngFor=\"let doc of meeting_object.sign_docs\">\n\t\t\t\t\t<div class=\"DocumentWrapper signdocu gray-bg\">\n\t\t\t\t\t\t<div class=\"DocIcon\">\n\t\t\t\t\t\t\t<i class=\"fa fa-file\"></i>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"DocText\">\n\t\t\t\t\t\t\t<div class=\"DocName\">\n\t\t\t\t\t\t\t\t<h5>Title: {{doc.name}}</h5>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"SignatureText font-11\">\n\t\t\t\t\t\t\t\t<span>My Signature: </span>\n\t\t\t\t\t\t\t\t<span class=\"pending-status\">{{doc.mp_signature_status}}</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</a>\n\t\t\t</div>\n\t\t</div>\n\t\t<app-comments *ngIf=\"meetObjLoaded\" res_model=\"{{meeting_object.model}}\" res_id=\"{{meeting_object.id}}\"></app-comments>\n\t</div>\n</div>\n"

/***/ }),

/***/ "./src/components/meetingdetails/meetingdetails.component.ts":
/*!*******************************************************************!*\
  !*** ./src/components/meetingdetails/meetingdetails.component.ts ***!
  \*******************************************************************/
/*! exports provided: MeetingDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MeetingDetailsComponent", function() { return MeetingDetailsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_http_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../app/http.service */ "./src/app/http.service.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _app_socket_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../app/socket.service */ "./src/app/socket.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MeetingDetailsComponent = /** @class */ (function () {
    function MeetingDetailsComponent(route, router, httpService, sanitizer, socketService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.httpService = httpService;
        this.sanitizer = sanitizer;
        this.socketService = socketService;
        this.meetObjLoaded = false;
        this.notes = [];
        this.new_reply = '';
        this.bread_crumb = {
            items: [],
            title: ''
        };
        this.next = '';
        this.prev = '';
        this.meeting_type = 'upcoming';
        this.title = '';
        this.flag = '';
        this.first_time = true;
        this.conference_not_active = false;
        this.meeting_object = {};
        this.route.params.subscribe(function (params) { return _this.get_data(); });
    }
    MeetingDetailsComponent.prototype.get_data = function () {
        this.bread_crumb = {
            items: [],
            title: ''
        };
        var page_url = window.location + '';
        var req_peram = (window.location + '').split('/');
        this.flag = req_peram[req_peram.length - 3];
        if (['upcoming', 'completed', 'archived'].indexOf(this.flag) === -1) {
            this.flag = '';
        }
        var obj_this = this;
        var input_data = { id: this.route.snapshot.params.id, meeting_type: this.flag };
        var on_data = function (result) {
            try {
                if (result.message) {
                    $('#main-div').html('<h2 style="text-align:center">' + result.message + '</h2>');
                    return;
                }
                var meeting_object = obj_this.meeting_object = result.meeting;
                obj_this.next = result.next;
                obj_this.prev = result.prev;
                if (result.meeting && result.meeting.name) {
                }
                else {
                    obj_this.router.navigate(['/']);
                    return;
                }
                obj_this.meeting_type = result.meeting.exectime;
                obj_this.meeting_type === 'ongoing' ? obj_this.meeting_type = 'upcoming' : obj_this.meeting_type;
                obj_this.meeting_type === 'past' ? obj_this.meeting_type = 'archived' : obj_this.meeting_type;
                try {
                    obj_this.title = obj_this.meeting_type[0].toUpperCase() + obj_this.meeting_type.slice(1).toLowerCase();
                }
                catch (er) {
                    console.log(er);
                }
                make_bread_crumb(result.meeting.name);
                meeting_object.description = obj_this.sanitizer.bypassSecurityTrustHtml(obj_this.meeting_object.description);
                var uid = window['current_user'].cookie.id;
                var pp = 0;
                var me = {};
                var myindex = -1;
                var attendees = meeting_object.attendees;
                attendees.forEach(function (att) {
                    if (att.uid == uid) {
                        myindex = pp;
                        me = att;
                    }
                    pp++;
                });
                attendees.splice(myindex, 1);
                attendees.splice(0, 0, me);
                obj_this.me = attendees[0];
                meeting_object.video_call_link = '';
                if (meeting_object.conference_status == 'active') {
                    var curl = window.location.origin.toString();
                    meeting_object.video_call_link = curl + '/conference/' + meeting_object.id + '/' + meeting_object.pin;
                }
                else if (obj_this.meeting_type == 'upcoming') {
                    obj_this.conference_not_active = true;
                }
            }
            catch (er) {
                console.log(er);
            }
            obj_this.meetObjLoaded = true;
        };
        this.httpService.call_post_http('/meeting/details-json', input_data, on_data, null);
        function make_bread_crumb(page_title) {
            var bread_crumb_items = obj_this.bread_crumb.items;
            if (page_url.indexOf('home') > -1) {
                bread_crumb_items.push({ title: 'Home', link: '/' });
            }
            bread_crumb_items.push({ title: obj_this.title, link: '/meetings/' + obj_this.meeting_type });
            if (page_title) {
                obj_this.bread_crumb.title = page_title;
            }
        }
    };
    MeetingDetailsComponent.prototype.isInProgress = function () {
        // var startTime = moment('8:45am', 'h:mma');
        // var endTime = moment('9:00am', 'h:mma').add(3, 'hours');
        // var now = moment();
        // if(now.isBefore(endTime) && now.isAfter(startTime))
        // console.log('In Progress!!!')
        // else
        // console.log('Finished!!')
        return true;
    };
    MeetingDetailsComponent.prototype.respond_invitation = function (response, meet_id) {
        var req_url = '/meeting/respond-invitation-json';
        var obj_this = this;
        var input_data = {
            meeting_id: meet_id,
            response: response,
            no_loader: 1
        };
        obj_this.meeting_object.attendee_status = response;
        obj_this.me.state = response;
        var meeting_being_updated = obj_this.meeting_object;
        if (response) {
            this.httpService.call_post_http(req_url, input_data, function (data) {
                meeting_being_updated.attendee_status = response;
            }, null);
        }
    };
    MeetingDetailsComponent.prototype.ngOnInit = function () {
    };
    MeetingDetailsComponent.prototype.ngOnDestroy = function () {
    };
    MeetingDetailsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./meetingdetails.component.html */ "./src/components/meetingdetails/meetingdetails.component.html"),
            styles: [__webpack_require__(/*! ./meetingdetails.component.css */ "./src/components/meetingdetails/meetingdetails.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _app_http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"],
            _app_socket_service__WEBPACK_IMPORTED_MODULE_4__["SocketService"]])
    ], MeetingDetailsComponent);
    return MeetingDetailsComponent;
}());



/***/ }),

/***/ "./src/components/meetings/meetings.component.css":
/*!********************************************************!*\
  !*** ./src/components/meetings/meetings.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".Info p {\n    margin-bottom: 5px;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.CalendarDateWrap{\n    background-color: #7c7bad;\n    background: linear-gradient(to bottom,#7c7bad,#7c7bad);\n    color: #ffffff;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    text-align: center;\n    padding: 7px 5px;\n    font-size: 0.885em;\n    font-weight: 400;\n    letter-spacing: -0.5px;\n}\n\nspan.kanban-upcoming-meeting-date {\n    font-size: 26px;\n}\n\n.kanban-upcoming-meeting{\n    display: flex;\n}\n\n.kanban-upcoming-meeting-date {\n    font-size: 26px;\n    font-weight: 500;\n    letter-spacing: normal;\n    margin-bottom: 3px;\n}\n\n.kanban-meeting-info{\n    background: #f3f3f3;\n    display: flex;\n    border-radius: 3px;\n    border: 1px solid #f1eeee;    \n    padding: 10px 2px 10px 6px;\n    flex-direction: column;\n    white-space: nowrap;\n    overflow-x: hidden;\n    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.27);\n}\n\n.kanban-upcoming-meeting a {\n    text-decoration: none;\n}\n\n.kanban-upcoming-meeting .Info {\n    font-size: 13px;\n    color: #6a6a6a;\n    padding-left: 10px;\n    padding-right: 10px;\n    line-height: 1.4em;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.upcomingButton button\n{\n    font-size: 0.85rem;\n}\n\n.upcomingButton{\n    display: flex;\n    margin-top: 5px;\n\n}\n\n.upcomingButton button{\n    margin-right: 4px;\n}\n\n.upcomingButton button i {\n    font-size: 14px;\n    padding-right: 4px;\n}"

/***/ }),

/***/ "./src/components/meetings/meetings.component.html":
/*!*********************************************************!*\
  !*** ./src/components/meetings/meetings.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<app-paginator></app-paginator>\n<div id=\"main-div\">\n\t<div *ngIf=\"no_meet\" class=\"jumbotron text-center\">\n\t\t<h1>No {{heading |titlecase}} for you :)</h1>\n\t\t<hr>\n\t</div>\n\t<div class=\"container\">\n\t\t<div class=\"row\">\n\t\t\t<div class=\"kanban-card\" *ngFor=\"let meeting_object of meeting_list\">\n\t\t\t\t<div class=\"kanban-meeting-info\">\n\t\t\t\t\t<a class=\"kanban-upcoming-meeting\" routerLink=\"/home/meeting/{{meeting_object.id}}\">\n\t\t\t\t\t\t<div class=\"CalendarDateWrapper\">\n\t\t\t\t\t\t\t<span *ngIf=\"meeting_object.start\" class=\"CalendarDateWrap\">\n\t\t\t\t\t\t\t\t<span class=\"kanban-upcoming-meeting-date\">\n\t\t\t\t\t\t\t\t\t{{meeting_object.start_dt.day}}\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t\t{{meeting_object.start_dt.month_year}}\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t\t{{meeting_object.start_dt.time}}\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"Info\">\n\t\t\t\t\t\t\t<p *ngIf=\"meeting_object.name\">\n\t\t\t\t\t\t\t\t<b>{{meeting_object.name}}</b>\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t<span *ngIf=\"meeting_object.location\">{{meeting_object.location}}</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</a>\n\t\t\t\t\t<div *ngIf=\"meeting_type == 'upcoming'\" class=\"upcomingButton btn-flex-1\" id=\"tdmrb{{meeting_object.id}}\">\n\t\t\t\t\t\t<button (click)=\"respond_invitation('accepted', meeting_object.id)\" class=\"btn btn-primary\">\n\t\t\t\t\t\t\t<i *ngIf=\"meeting_object.attendee_status == 'accepted'\" class=\"fa fa-check fa-lg\" style=\"color:white\" modifiers=\"{}\"></i>\n\t\t\t\t\t\t\t<span name=\"accepted\">Accept</span>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t\t<button (click)=\"respond_invitation('declined', meeting_object.id)\" class=\"btn btn-primary\">\n\t\t\t\t\t\t\t<i *ngIf=\"meeting_object.attendee_status == 'declined'\" class=\"fa fa-check fa-lg\" style=\"color:white\" modifiers=\"{}\"></i>\n\t\t\t\t\t\t\t<span name=\"declined\">Decline</span>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t\t<button (click)=\"respond_invitation('tentative', meeting_object.id)\" class=\"btn btn-primary\">\n\t\t\t\t\t\t\t<i *ngIf=\"meeting_object.attendee_status == 'tentative'\" class=\"fa fa-check fa-lg\" style=\"color:white\" modifiers=\"{}\"></i>\n\t\t\t\t\t\t\t<span name=\"tentative\">Tentative</span>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n"

/***/ }),

/***/ "./src/components/meetings/meetings.component.ts":
/*!*******************************************************!*\
  !*** ./src/components/meetings/meetings.component.ts ***!
  \*******************************************************/
/*! exports provided: MeetingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MeetingsComponent", function() { return MeetingsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../app/http.service */ "./src/app/http.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_js_methods__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../app/js_methods */ "./src/app/js_methods.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MeetingsComponent = /** @class */ (function () {
    function MeetingsComponent(httpService, router, route) {
        this.httpService = httpService;
        this.router = router;
        this.route = route;
        this.no_meet = false;
        this.show = false;
        this.heading = 'Home';
        var obj_this = this;
        this.httpService.fetch_paged_data = function (off_set, limit) {
            var req_peram = (window.location + '').split('/');
            var flag = req_peram[req_peram.length - 1];
            var req_url = '/meeting/list-json';
            var input_data = { meeting_type: flag, paging: { offset: off_set, limit: limit } };
            var success_cb = function (result) {
                console.log(result);
                for (var i in result.records) {
                    var start = result.records[i]['start'];
                    start = Object(_app_js_methods__WEBPACK_IMPORTED_MODULE_3__["meeting_time"])(start);
                    result.records[i]['start_dt'] = start;
                }
                obj_this.meeting_list = result.records;
                obj_this.httpService.total_records = result.total;
                obj_this.meeting_list.length > 0 ? obj_this.no_meet = false : obj_this.no_meet = true;
            };
            obj_this.httpService.call_post_http(req_url, input_data, success_cb, null);
        };
    }
    MeetingsComponent.prototype.respond_invitation = function (response, meet_id) {
        var req_url = '/meeting/respond-invitation-json';
        var obj_this = this;
        var input_data = {
            meeting_id: meet_id,
            response: response,
            no_loader: 1
        };
        var meeting_being_updated;
        obj_this.meeting_list.forEach(function (meeting) {
            if (meeting.id === meet_id) {
                meeting_being_updated = meeting;
            }
        });
        if (response) {
            this.httpService.call_post_http(req_url, input_data, function (data) {
                meeting_being_updated.attendee_status = response;
            }, null);
        }
    };
    MeetingsComponent.prototype.ngOnInit = function () {
        var req_peram = (window.location + '').split('/');
        var flag = req_peram[req_peram.length - 1];
        this.meeting_type = flag;
        // console.log(flag)
        this.heading = flag + ' Meetings';
        var obj_this = this;
        var req_url = '/meeting/list-json';
        var input_data = { meeting_type: flag, paging: { offset: 0, limit: 10 } };
        var success_cb = function (result) {
            // console.log(result)
            for (var i in result.records) {
                var start = result.records[i]['start'];
                start = Object(_app_js_methods__WEBPACK_IMPORTED_MODULE_3__["meeting_time"])(start);
                result.records[i]['start_dt'] = start;
            }
            obj_this.meeting_list = result.records;
            obj_this.httpService.total_records = result.total;
            obj_this.meeting_list.length > 0 ? obj_this.no_meet = false : obj_this.no_meet = true;
        };
        var failure_cb = function (error) {
        };
        this.httpService.call_post_http(req_url, input_data, success_cb, failure_cb);
    };
    MeetingsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./meetings.component.html */ "./src/components/meetings/meetings.component.html"),
            styles: [__webpack_require__(/*! ./meetings.component.css */ "./src/components/meetings/meetings.component.css")]
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], MeetingsComponent);
    return MeetingsComponent;
}());



/***/ }),

/***/ "./src/components/messageicon/messageicon.component.css":
/*!**************************************************************!*\
  !*** ./src/components/messageicon/messageicon.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".nav-icon button{\n\tbackground: #63628a;\n    border-radius: 50% !important;\n    padding: 0;\n    color: #ffffff;\n    outline: none;\n    font-size: 16px;\n    border: none;\n    opacity: 0.9;\n    width: 36px;\n    height: 36px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n\tcursor: pointer;\n\tposition: relative;\n\tmargin: 0 5px;\n}"

/***/ }),

/***/ "./src/components/messageicon/messageicon.component.html":
/*!***************************************************************!*\
  !*** ./src/components/messageicon/messageicon.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"mobile-chatroom nav-icon dropdown\">\n    <button *ngIf=\"!odoo_build\" routerLink=\"/messenger\" class=\"showmouseawaybutton notification-icon\">\n        <i class=\"fas fa-comment\"></i>\n    </button>\n    <span *ngIf=\"odoo_build\">\n        <i class=\"fas fa-comment\"></i>\n    </span>\n    <span class=\"un-read-msg\" *ngIf=\"socketService.unseen_messages !=0 \">{{socketService.unseen_messages}}</span>\n</div>"

/***/ }),

/***/ "./src/components/messageicon/messageicon.component.ts":
/*!*************************************************************!*\
  !*** ./src/components/messageicon/messageicon.component.ts ***!
  \*************************************************************/
/*! exports provided: MessageiconComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageiconComponent", function() { return MessageiconComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_socket_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../app/socket.service */ "./src/app/socket.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MessageiconComponent = /** @class */ (function () {
    function MessageiconComponent(ss) {
        this.ss = ss;
        this.odoo_build = window['odoo'] ? 1 : undefined;
        this.socketService = ss;
    }
    MessageiconComponent.prototype.ngOnInit = function () { };
    MessageiconComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-messageicon',
            template: __webpack_require__(/*! ./messageicon.component.html */ "./src/components/messageicon/messageicon.component.html"),
            styles: [__webpack_require__(/*! ./messageicon.component.css */ "./src/components/messageicon/messageicon.component.css")]
        }),
        __metadata("design:paramtypes", [_app_socket_service__WEBPACK_IMPORTED_MODULE_1__["SocketService"]])
    ], MessageiconComponent);
    return MessageiconComponent;
}());



/***/ }),

/***/ "./src/components/messenger/messenger.component.css":
/*!**********************************************************!*\
  !*** ./src/components/messenger/messenger.component.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".messenger-container\n{\n    height: calc(100vh - 50px);\n    margin: 0;\n    margin-top:50px;\n}\n\n#body-div{\n\theight: 100%;\n\tmargin: 0;\n\tbackground: transparent;\n}\n\n#body-div .container-fluid, .row{\n\theight: 100%;\n}\n\n#body-div .chat{\t\n    padding: 0;    \n}\n\n@media (max-width: 575px)\n{\n    #body-div .chat{\t\n        height: -webkit-fit-content;\t\n        height: -moz-fit-content;\t\n        height: fit-content;\n    }\n}\n\n.chat-container-wrppaer{\n\twidth: calc(100% - 420px);\n\tposition: relative;\n\tborder-left: 1px solid rgba(0, 0, 0, .20);\n}\n\n.friends-chat-box{\n    width: 420px;\n}\n\n#body-div .card\n{\n    border: 0;\n}\n\n#body-div h3 {\n    padding-top: 10px;\n    text-align: center;\n}\n\n#body-div .contacts_body{\n\tpadding: 0;\n    overflow-y: auto;\n    white-space: nowrap;\n    height: calc(100vh - 154px);\n}\n\n.contacts_body ul\n{\n    margin: 0;\n    padding: 0;\n}\n\n#body-div .msg_card_body{\n\toverflow-y: auto;\n}\n\n#body-div .container{\n\talign-content: center;\n}\n\n#body-div .search{\n\tborder-radius: 0px 5px 5px 0px !important;\n\tbackground-color: #f5f6f7;\n\tborder-style: none;\n\tbox-sizing: border-box;\n\tfont-size: 13px;\n\theight: 30px;\n\tline-height: 30px;\n\tpadding: 0 4px;\n}\n\n#body-div .search:focus{\n\tbox-shadow:none !important;\n\toutline:0px !important;\n}\n\n#body-div .type_msg{\n\tborder:0 !important;\n\tcolor:white !important;\n\theight: 60px !important;\n\toverflow-y: auto;\n}\n\n.type_msg:focus{\n\tbox-shadow:none !important;\n\toutline:0px !important;\n}\n\n.attach_btn{\n\tborder-radius: 5px 0 0 5px !important;\n    background-color: #ffffff;\n    color: #7c7bad !important;\n\tcursor: pointer;\n}\n\n#body-div .send_btn{\n\tborder-radius: 0 5px 5px 0 !important;\n    background-color: rgb(255, 255, 255) !important;\n    color: #7c7bad !important;\n\tcursor: pointer;\n}\n\n#body-div .search_btn{\n\tborder-radius:5px 0 0 5px !important;\n    border: 0 !important;\n    color: #bec3c9 !important;\n    cursor: pointer;\n\t\n    background-color: #f5f6f7;\n    border-style: none;\n    box-sizing: border-box;\n    font-size: 12px;\n    height: 30px;\n    line-height: 30px;\n}\n\n#body-div .contacts{\n\tlist-style: none;\n\tpadding: 0;\n}\n\n#body-div .contacts li a{\n\tdisplay: block;\n    margin: 0;\n    padding: 6px 10px;\n\tbackground-color: #ffffff;\n\tposition: relative;\n}\n\n#body-div .contacts li a:hover\n{    \n    background: rgba(0, 0, 0, .05);    \n}\n\n#body-div .contacts li.active a{    \n    background-color: rgba(0, 0, 0, .05);\n}\n\n#body-div .user_img{\n\theight: 50px;\n\twidth: 50px;\n\tborder:1.5px solid #f5f6fa;\n\tposition: relative;\n\tz-index: 20;\n}\n\n#body-div .user_img_msg{\n\theight: 40px;\n\twidth: 40px;\n\tborder:1.5px solid #f5f6fa;\n\tposition: relative;\n\tz-index: 20;\n\n}\n\n#body-div .img_cont{\n\tposition: relative;\n\theight: 50px;\n\twidth: 50px;\n}\n\n#body-div .img_cont_msg{\n\theight: 40px;\n\twidth: 40px;\n}\n\n#body-div span.unseen {\n\tcolor: white;\n\tpadding: 2px 4px;\n\tbackground: #dc3545;\n\tborder-radius: 3px;\n\theight: 22px;\n\tposition: absolute;\n\tright: 10px;\n}\n\n#body-div .online_icon{\n\tposition: absolute;\n\theight: 15px;\n\twidth:15px;\n\tbackground-color: #4cd137;\n\tborder-radius: 50%;\n\tbottom: 0.2em;\n\tright: 0.4em;\n\tborder:1.5px solid white;\n\tz-index: 200;\n}\n\n.offline{\n\tbackground-color: #c23616 !important;\n}\n\n.user_info{\n\tmargin-top: auto;\n    margin-bottom: auto;\n    margin-left: 15px;\n    line-height: 1.0em;\n    display: flex;\n    flex-direction: column;\n\tjustify-content: center;\n\ttext-transform: capitalize;\n}\n\n.user_info span{\n\tcolor: rgba(0, 0, 0, 1);\n\tfont-size: 15px;\n\tfont-weight: 400;\n\tline-height: 1.4;\n\ttext-transform: capitalize;\n}\n\n.user_info p{\n\tcolor: rgba(153, 153, 153, 1);\n\tfont-size: 12px;\n\tfont-weight: 400;\n\tmargin: 0;\n\ttext-transform: capitalize;\n}\n\n.video_cam{\n\tmargin-left: 50px;\n\tmargin-top: 5px;\n}\n\n.video_cam span{\n\tcolor: white;\n\tfont-size: 20px;\n\tcursor: pointer;\n\tmargin-right: 20px;\n}\n\n.msg_cotainer{\n\tmargin-top: auto;\n\tmargin-bottom: auto;\n\tmargin-left: 10px;\n\tposition: relative;\n\tmin-width: 55px;\n\tmax-width: 400px;\n}\n\n.msg-box-wrapper{\n\t\n    \n}\n\n.msg_cotainer_send{\n\tmargin-top: auto;\n\tmargin-bottom: auto;\n\tmargin-left: 10px;\n\tposition: relative;\n\tmin-width: 55px;\n\tmax-width: 400px;\n}\n\n.msg_time, .msg_time_send{\n\tdisplay: block;\n    font-size: 9px;\n\tfont-weight: 400;\n\tcolor: #888888;\n\tmargin-top: 7px;\n}\n\n.msg_time_send{ text-align: right; padding-right: 11px;}\n\n.msg_head{\n\tposition: relative;\n}\n\n#action_menu_btn{\n\tposition: absolute;\n\tright: 10px;\n\ttop: 10px;\n\tcolor: white;\n\tcursor: pointer;\n\tfont-size: 20px;\n}\n\n.action_menu{\n\tz-index: 1;\n\tposition: absolute;\n\tpadding: 15px 0;\n\tbackground-color: rgba(0,0,0,0.5);\n\tcolor: white;\n\tborder-radius: 15px;\n\ttop: 30px;\n\tright: 15px;\n\tdisplay: none;\n}\n\n.action_menu ul{\n\tlist-style: none;\n\tpadding: 0;\n\tmargin: 0;\n}\n\n.action_menu ul li{\n\twidth: 100%;\n\tpadding: 10px 15px;\n\tmargin-bottom: 5px;\n}\n\n.action_menu ul li i{\n\tpadding-right: 10px;\n\n}\n\n.action_menu ul li:hover{\n\tcursor: pointer;\n\tbackground-color: rgba(0,0,0,0.2);\n}\n\n.msg-send-box-wrapper{\n\tmargin: auto 10px auto 0;\n\tposition: relative;\n\tmax-width: 440px;\n}\n\n.msg-box-wrapper{\n\tmargin: auto 10px auto 0;\n\tposition: relative;\n\tmax-width: 440px;\n}\n\n.msg-send-box-text{\n\tbackground-color: #09f;\n\tcolor: #ffffff;\n\tfloat: right;\n\tmargin-top: auto;\n    margin-bottom: auto;\n    border-radius:1.3em;\n    padding: 6px 12px 7px;\n    font-size: 12px;\n\tline-height: 16px;\n}\n\n.msg-box-text{\n\tbackground-color: #f1f0f0;\n\tcolor: rgba(0, 0, 0, 1);\n\tfloat: left;\n\tmargin-top: auto;\n    margin-bottom: auto;\n    border-radius: 1.3em;\n    padding: 6px 12px 7px;\n    font-size: 12px;\n\tline-height: 16px;\n}\n\n.msg-send-box-wrapper::before, .msg-send-box-wrapper::after, .msg-box-wrapper::before, .msg-box-wrapper:after{\n\tdisplay: block;\n\tclear: both;\n\tcontent: \"\";\n}\n\n.chat-full-height{\n\theight: 100%;\n\tborder-radius: 0%;\n}\n\n.chat-full-height .form-control, .emoji-wysiwyg-editor.form-control{\n\theight: 40px !important;\n    line-height: 36px !important;\n    padding-top: 2px !important;\n    padding-bottom: 0px !important;\n\tfont-size: 13px;\n\tborder-left: 0;\n\tborder-right: 0;\n\tpadding-left: 15px;\n    border: none !important;\n}\n\n.chat-full-height .form-control:focus, .emoji-wysiwyg-editor.form-control:focus {\n    color: #495057;\n    background-color: #fff;\n    border-color:transparent;\n    outline: 0;\n    box-shadow: 0 transparent;\n}\n\n.meetVue-chat-body{\n flex: 1 1 0;\n    order: 1;\n    position: relative;\n\tz-index: 1;\n\tpadding: 0;\n}\n\n.meetVue-chat-footer{\n\tmin-height: 62px;\n\torder: 2;\n\tposition: relative;\n\tflex: none;\n\twidth: 100%;\n\tbox-sizing: border-box;\n\tz-index: 1;\n\tbackground: #ffffff;\n}\n\n.emoji-wysiwyg-editor.form-control{\n    line-height: 38px;\n    padding: 0 10px;\n    font-size: 12px;\n}\n\n.wellcomescreen {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\tright: 0;\n\tbottom: 0;\n    z-index: 1;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n.wellcomescreen:after{\n\tfont-family: \"Font Awesome 5 Free\";\n    font-weight: 400;\n    content: \"\\f118\";\n    font-size: 50px;\n    color: #7c7bad;\n}\n\n.MessengerSearchWrap {\n    display: block;\n    padding: 12px 12px;\n    position: relative;\n    background: transparent;\n    border-style: none;\n}\n\n.MessengerWrap{\n\tborder-bottom: 1px solid rgba(0, 0, 0, .10);\n\tbox-sizing: border-box;\n\theight: 50px;\n\tjustify-content: space-between;\n\tpadding: 8px;\n\twidth: 100%;\n}\n\n.MessengerText {\n\tcolor: #1d2129;\n    flex-basis: 100%;\n    font-size: 16px;\n    font-weight: 400;\n    margin: 7px 0 0;\n    overflow: hidden;\n    text-align: center;\n}\n\n.chat-user-title{\n\tborder-bottom: 1px solid rgba(0, 0, 0, .10);\n\tbox-sizing: border-box;\n\theight: 50px;\n\tpadding: 8px;\n\tposition: relative;\n\ttext-align: center;\n\tz-index: 201;\n\tline-height: 1;\n}\n\n.chat-user-title h2{\n\tcolor: rgba(0, 0, 0, 1);\n\tfont-size: 15px;\n\tfont-weight: 400;\n\tmargin: 0;\n\ttext-transform: capitalize;\n}\n\n.userstat{\n\tcolor: rgba(0, 0, 0, .40);\n\tfont-size: 12px;\n\tfont-weight: normal;\n\tmargin-top: 2px;\n\tvertical-align: middle;\n\twhite-space: nowrap;\n\ttext-align: center;\n}\n\n.messenger-body{\n\tpadding:12px;\n}\n\n.meetVue-chat-footer .input-group-text{\n\tborder: 0 !important;\n\tpadding: 0 7px;\n}\n\n.meetVue-chat-footer .input-group-append{\n\tmargin: 0;\n}\n\n.meetVue-chat-footer .input-group{\n\talign-items: center;\n}\n\n.backchatlist{\n\tdisplay: none;\n\tposition: absolute;\n    top: 50%;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%);\n    font-size: 22px;\n    left: 20px;\n    color: #0099ff;\n}\n\n#mobi-active-chat{\n\tdisplay: block  !important;\n\tposition:fixed  !important;\n\ttop: 50px  !important;\n\tleft: 0  !important;\n\tright: 0  !important;\n\tz-index: 200  !important;\n\twidth: 100%  !important;\n\tbackground: #ffffff;\n\theight:calc(100% - 50px) !important;\n}\n\n/* Responsive */\n\n@media (max-width: 575px) {\n\t.friends-chat-box{\n\t\twidth: 100%;\n\t}\n\t.chat-container-wrppaer{\n\t\twidth:100%;\n\t}\n\t.backchatlist{ display: block;}\n\n\t.chat-user-title{\n\t\tborder-bottom: 0;\n\t\tbox-shadow: 0px 2px 3px 0px rgba(142, 127, 127, 0.23);\n\t} \n}\n\n@media (min-width: 576px) and (max-width: 767px) {\n    .friends-chat-box{\n\t\twidth: 100%;\n\t}\n\t.chat-container-wrppaer{\n\t\twidth:100%;\n\t}\n\t.backchatlist{ display: block;}\n\n\t.chat-user-title{\n\t\tborder-bottom: 0;\n\t\tbox-shadow: 0px 2px 3px 0px rgba(142, 127, 127, 0.23);\n\t}\n}\n\n@media (min-width: 768px) and (max-width: 991px) {\n\t.friends-chat-box{\n\t\twidth: 250px;\n\t}\n\t.chat-container-wrppaer{\n\t\twidth: calc(100% - 250px);\n\t}\n}\n\n.messenger-container {\n    height: calc(100vh - 52px);\n    margin: 0;\n    position: absolute;\n    top: 50px;\n    width: 100vw;\n    left: 0;\n    z-index: 7853;\n}\n\n.nav-icon button{\n\tbackground: #63628a;\n    border-radius: 50% !important;\n    padding: 0;\n    color: #ffffff;\n    outline: none;\n    font-size: 16px;\n    border: none;\n    opacity: 0.9;\n    width: 36px;\n    height: 36px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n\tcursor: pointer;\n\tposition: relative;\n\tmargin: 0 5px;\n}\n\n.contact-item\n{\n    cursor: pointer;\n}"

/***/ }),

/***/ "./src/components/messenger/messenger.component.html":
/*!***********************************************************!*\
  !*** ./src/components/messenger/messenger.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"messenger-container\">\n    <link rel=\"stylesheet\" type=\"text/css\" href=\"https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.min.css\">\n    <!-- <script type=\"text/javascript\" src=\"https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.min.js\"></script> -->\n    <div id=\"body-div\">\n        <div class=\"container-fluid\">\n            <div class=\"row\">\n                <div class=\"chat friends-chat-box\">\n                    <div class=\"card mb-sm-4 mb-md-0 contacts_card\">\n                        <div class=\"MessengerWrap\"><h1 class=\"MessengerText\">Messenger</h1></div>\n                        <div class=\"card-header MessengerSearchWrap\">\n                            <div class=\"input-group\">\n                                <div class=\"input-group-prepend\">\n                                    <span class=\"input-group-text search_btn\"><i class=\"fas fa-search\"></i></span>\n                                </div>\n                                <input [(ngModel)]=\"searchVal\" type=\"text\" placeholder=\"Search or start new chat\" name=\"\" class=\"form-control search\">\n                            </div>\n                        </div>\n                        <div class=\"card-body contacts_body\">\n                            <ul class=\"contacts\">\n                                <li *ngFor=\"let uid of keys_chat_users\"\n                                    (click)=\"select_chat_user(uid)\"\n                                    [ngClass]=\"[active_chat_user && uid == active_chat_user.id ? 'active': '']\">                                \n                                    <div *ngIf=\"chat_users[uid] && chat_users[uid].name && chat_users[uid].name.toLowerCase().indexOf(searchVal.toLowerCase()) > -1\">\n                                        <a class=\"contact-item d-flex align-items-center bd-highlight\">\n                                            <div class=\"img_cont\">\n                                                <img src=\"{{chat_users[uid].photo}}\" class=\"rounded-circle user_img\">\n                                                <span [ngClass]=\"[chat_users[uid].online ? '': 'offline']\" class=\"online_icon\"></span>\n                                            </div>\n                                            <div class=\"user_info\">\n                                                <span>{{ chat_users[uid].name }}</span>\n                                                <p *ngIf=\"chat_users[uid].online\">Online</p>\n                                                <p *ngIf=\"!chat_users[uid].online\">Offline</p>\n                                            </div>\n                                            <span class=\"unseen\" *ngIf=\"chat_users[uid].unseen != 0\">\n                                                {{chat_users[uid].unseen}}\n                                            </span>\n                                        </a>\n                                    </div>\n                                </li>\n                            </ul>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"chat chat-container-wrppaer\" id=\"\"> <!-- mobi-active-chat-->\n                    <div *ngIf=\"active_chat_user\" class=\"card chat-full-height\">\n                        <div class=\"chat-user-title\">\n                            <span (click)=\"hide_chat_box()\" class=\"backchatlist\"><i class=\"fas fa-arrow-left\"></i></span>\n                            <h2>{{active_chat_user.name}}</h2>\n                            <div *ngIf=\"active_chat_user.online\" class=\"userstat\">Online</div>\n                            <div *ngIf=\"!active_chat_user.online\" class=\"userstat\">Offline</div>\n                        </div>\t\t\t\n                        <div class=\"card-body msg_card_body meetVue-chat-body\">\n                            <div class=\"messenger-body\" *ngFor=\"let msg of active_chat_user.messages\">\n                                    <div *ngIf=\"msg.sender == user_data.id\"\n                                         class=\"d-flex align-items-end justify-content-end mb-4\">\n                                        <div class=\"msg_cotainer_send\">\n                                            <div class=\"msg-send-box-wrapper\">\n                                                <div class=\"msg-send-box-text\" [innerHTML]=\"msg.content\"></div>\n                                            </div>\n                                            <span class=\"msg_time_send\">{{msg.create_date | date:'medium'}}</span>\n                                        </div>\n    \n                                        <div class=\"img_cont_msg\">\n                                            <img src=\"{{user_data.photo}}\" class=\"rounded-circle user_img_msg\">\n                                        </div>\n                                    </div>\n                                    <div *ngIf=\"msg.sender != user_data.id\"\n                                         class=\"d-flex align-items-end justify-content-start mb-4\">\n                                        <div class=\"img_cont_msg\">\n                                            <img src=\"{{active_chat_user.photo}}\" class=\"rounded-circle user_img_msg\">\n                                        </div>\n                                        <div class=\"msg_cotainer\">\n                                            <div class=\"msg-box-wrapper\">\n                                                <div class=\"msg-box-text\" [innerHTML]=\"msg.content\"></div>\n                                            </div>\n                                            <span class=\"msg_time\">{{msg.create_date | date:'medium'}}</span>\n                                        </div>\n    \n                                    </div>\n                                </div>\n                        </div>\n                        <div class=\"card-footer meetVue-chat-footer\">\n                            <div class=\"input-group\">\n                                <input type=\"text\" id=\"message_input_box\" data-emojiable=\"true\"\n                                       data-type=\"image\" class=\"form-control\" placeholder=\"Type your message here\" />                                \n                                <div class=\"input-group-append\">\n                                    <span id=\"send_btn\" class=\"input-group-text send_btn\"><i class=\"fas fa-location-arrow\"></i></span>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div *ngIf=\"!active_chat_user\" class=\"card wellcomescreen\">\n                        <h3>Welcome to MeetVUE</h3>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    \n</div>\n"

/***/ }),

/***/ "./src/components/messenger/messenger.component.ts":
/*!*********************************************************!*\
  !*** ./src/components/messenger/messenger.component.ts ***!
  \*********************************************************/
/*! exports provided: MessengerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessengerComponent", function() { return MessengerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _app_http_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../app/http.service */ "./src/app/http.service.ts");
/* harmony import */ var _app_socket_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../app/socket.service */ "./src/app/socket.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MessengerComponent = /** @class */ (function () {
    function MessengerComponent(sanitizer, httpService, ss) {
        this.sanitizer = sanitizer;
        this.httpService = httpService;
        this.ss = ss;
        this.chat_users = {};
        this.keys_chat_users = [];
        this.active_chat_user = undefined;
        this.is_minimize = true;
        this.chat_initilized = 0;
        this.searchVal = '';
        this.is_request_sent = true;
        this.odoo_build = window['odoo'] ? 1 : undefined;
        var obj_this = this;
        obj_this.socketService = ss;
        var socketService = ss;
        function registerChatEventListeners() {
            obj_this.chat_users = socketService.friends;
            obj_this.user_data = socketService.user_data;
            obj_this.keys_chat_users = Object.keys(obj_this.chat_users);
            socketService.server_events['friend_joined'] = updateUserStatus;
            socketService.server_events['user_left'] = updateUserStatus;
            socketService.server_events['active_chat_message_received'] = function (msg) {
                obj_this.receiveMessage(obj_this, msg, msg.sender);
            };
            function updateUserStatus(user) {
                //console.log(user.id+' online status = '+ user.online);
                if (obj_this.user_data.id == user.id) {
                    console.log(user, "Should never happen now");
                    return;
                }
                if (!obj_this.chat_users[user.id]) {
                    console.log(user.id + ' not found in list -- ', obj_this.chat_users);
                    return;
                    //pending to add this user in list
                }
                else {
                    obj_this.chat_users[user.id].online = user.online;
                }
            }
            if (!obj_this.user_data) {
                console.log("No user data is socket service yet");
                return;
            }
        }
        ss.execute_on_verified(registerChatEventListeners);
    }
    MessengerComponent.prototype.select_chat_user = function (target_id) {
        var ww = $(window).width();
        // .screen.availWidth <= 767
        if (ww <= 767) {
            $('.chat-container-wrppaer').attr("id", "mobi-active-chat");
        }
        var obj_this = this;
        if (obj_this.chat_initilized != 1) {
            var emoji_libs = '';
            obj_this.chat_initilized = 1;
            var prefix = '';
            if (!window['odoo']) {
                emoji_libs += '<script src="assets/js/emoji/config.js"></script>';
                emoji_libs += '<script src="assets/js/emoji/emoji-picker.js"></script>';
                emoji_libs += '<script src="assets/js/emoji/jquery.emojiarea.js"></script>';
                emoji_libs += '<script src="assets/js/emoji/util.js"></script>';
                emoji_libs += '<script src="assets/js/emoji/jQueryEmoji.js"></script>';
            }
            $('body').append(emoji_libs);
            $('body').on('keyup', '.emoji-wysiwyg-editor', function (e) {
                if (e.keyCode == 13 && !e.shiftKey) {
                    obj_this.sendMessage();
                }
                $('.emoji-menu').hide();
            });
            $('body').on('click', '#send_btn', function () {
                obj_this.sendMessage();
            });
        }
        obj_this.active_chat_user = obj_this.chat_users[target_id];
        //console.log(111, obj_this.active_chat_user.id, obj_this.user_data.id, 2);
        this.is_minimize = false;
        obj_this.httpService.call_post_http('/active-user-messages', { target_id: target_id }, function (data) {
            obj_this.is_request_sent = false;
            obj_this.onUserSelected(data);
        }, null);
    };
    MessengerComponent.prototype.hide_chat_box = function () {
        $('.chat-container-wrppaer').removeAttr("id");
    };
    MessengerComponent.prototype.onUserSelected = function (messages) {
        var obj_this = this;
        for (var i in messages) {
            messages[i].content = obj_this.sanitizer.bypassSecurityTrustHtml(messages[i].content);
        }
        obj_this.active_chat_user.messages = messages;
        obj_this.update_unseen_count("user-selected", obj_this.active_chat_user.id, null);
        setTimeout(function () {
            var emoji_config = {
                emojiable_selector: "[data-emojiable=true]",
                assetsPath: "/assets/img/",
                popupButtonClasses: "far fa-smile"
            };
            if (window['odoo']) {
                emoji_config.assetsPath = '/meeting_point/static/meetvue/assets/img';
            }
            var emojiPicker = new window["EmojiPicker"](emoji_config);
            emojiPicker.discover();
            $('.msg-item').Emoji();
        }, 100);
        obj_this.scrollToEnd();
        $(".msg_card_body").unbind("scroll");
        $(".msg_card_body").scroll(function () {
            var height = Math.floor(0.3 * $(".msg_card_body").height());
            if ($(".msg_card_body").scrollTop() <= height) {
                if (obj_this.is_request_sent) {
                    return;
                }
                obj_this.is_request_sent = true;
                obj_this.httpService.call_post_http('/active-user-messages', { target_id: obj_this.active_chat_user.id, offset: obj_this.active_chat_user.messages.length }, function (data) {
                    if (data.length > 0) {
                        obj_this.is_request_sent = false;
                        obj_this.active_chat_user.messages = data.concat(obj_this.active_chat_user.messages);
                        setTimeout(function () {
                            var height = $($(".messenger-body")[data.length - 1]).offset().top;
                            $(".msg_card_body").scrollTop(height);
                        }, 200);
                    }
                }, null);
            }
        });
    };
    MessengerComponent.prototype.send_message_request = function (input_data, model, method) {
        try {
            if (!model || !method) {
                console.log('Invalid args');
                return;
            }
            var current_user = window['current_user'];
            var cookie = current_user.cookie;
            var data = {
                auth: {
                    db: cookie.db,
                    token: cookie.token,
                    uid: cookie.id,
                    name: cookie.name
                },
                req_data: input_data,
                args: { model: model, method: method }
            };
            input_data = { 'data': JSON.stringify(data), no_loader: 1 };
            this.httpService.call_post_http('/messege_request', input_data, null, function () {
                console.log('Failed in processing ' + model + "." + method);
            });
        }
        catch (er) {
            console.log(er, ' in calling ' + model + "." + method);
        }
    };
    MessengerComponent.prototype.sendMessage = function () {
        var obj_this = this;
        if (!obj_this.active_chat_user) {
            console.log('There must be some active user');
            return;
        }
        var to_id = obj_this.active_chat_user["id"];
        var message_content = $('.emoji-wysiwyg-editor').html();
        if (message_content.endsWith('<div><br></div>'))
            message_content = message_content.slice(0, -15);
        if (!message_content)
            return;
        var input_data = {
            content: message_content,
            sender: obj_this.user_data.id,
            to: obj_this.active_chat_user["id"],
            create_date: new Date()
        };
        obj_this.send_message_request(input_data, 'odoochat.message', 'save');
        input_data.content = obj_this.sanitizer.bypassSecurityTrustHtml(message_content);
        obj_this.active_chat_user.messages.push(input_data);
        $('.emoji-wysiwyg-editor').html("");
        obj_this.scrollToEnd();
    };
    MessengerComponent.prototype.scrollToEnd = function () {
        setTimeout(function () {
            var message_body = $(".msg_card_body");
            if (message_body.length > 0) {
                message_body.scrollTop(message_body[0].scrollHeight);
            }
            else {
                console.log('.msg_card_body not present');
            }
        }, 10);
    };
    MessengerComponent.prototype.receiveMessage = function (obj_this, message, sender_id) {
        //console.log(1123);
        message.content = obj_this.sanitizer.bypassSecurityTrustHtml(message.content);
        var is_chat_open = obj_this.active_chat_user &&
            obj_this.active_chat_user.id == sender_id &&
            !this.is_minimize;
        if (!obj_this.chat_users[sender_id]) {
            console.log(obj_this.chat_users, ' Dev issue as ' + sender_id + ' not found');
        }
        if (!obj_this.chat_users[sender_id].messages) {
            obj_this.chat_users[sender_id].messages = [];
        }
        obj_this.chat_users[sender_id].messages.push(message);
        if (is_chat_open) {
            obj_this.scrollToEnd();
            var input_data = {
                message_id: message.id,
                no_loader: 1
            };
            obj_this.httpService.call_post_http('/set_message_status', input_data, null, null);
            obj_this.update_unseen_count("new-message", sender_id, sender_id);
        }
        else {
            obj_this.update_unseen_count("new-message", sender_id);
        }
    };
    MessengerComponent.prototype.update_unseen_count = function (event, target_id, active_id) {
        var inc = 0;
        var obj_this = this;
        var target = obj_this.chat_users[target_id];
        try {
            switch (event) {
                case "new-message":
                    inc = 1;
                    if (target_id == active_id)
                        inc = -1;
                    target.unseen += inc;
                    break;
                case "user-selected":
                    inc = target.unseen * -1;
                    target.unseen = 0;
                    break;
            }
            obj_this.socketService.update_unseen_message_count(inc);
        }
        catch (er) {
            console.log("update message count err no ", er);
        }
    };
    MessengerComponent.prototype.toggle_messenger = function (e) {
        var togglerelated = window['functions'].togglerelated;
        togglerelated(e, $(e.target).closest('.showmouseawaybutton'), '.messenger-container');
    };
    MessengerComponent.prototype.ngOnInit = function () {
        $(document).ready(function () {
            $('#action_menu_btn').click(function () {
                $('.action_menu').toggle();
            });
            if (window.screen.availWidth <= 767) {
                $('.chat-container-wrppaer').hide();
            }
        });
    };
    MessengerComponent.prototype.ngOnDestroy = function () {
        this.active_chat_user = undefined;
        this.socketService.server_events['active_chat_message_received'] = function () {
        };
    };
    MessengerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-messenger',
            template: __webpack_require__(/*! ./messenger.component.html */ "./src/components/messenger/messenger.component.html"),
            styles: [__webpack_require__(/*! ./messenger.component.css */ "./src/components/messenger/messenger.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DomSanitizer"],
            _app_http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"],
            _app_socket_service__WEBPACK_IMPORTED_MODULE_3__["SocketService"]])
    ], MessengerComponent);
    return MessengerComponent;
}());



/***/ }),

/***/ "./src/components/paginator/paginator.component.css":
/*!**********************************************************!*\
  !*** ./src/components/paginator/paginator.component.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".odoo-navigation {\n    padding: 5px 0;\n}\n\n.odoo-navigation-container {\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: flex-end;\n\tmin-height: 56px;\n\tpadding: 0;\n\tflex-wrap: wrap-reverse;\n}\n\n.odoo-navigation-page-size {\n\tdisplay: flex;\n\talign-items: baseline;\n}\n\n.odoo-navigation, .odoo-navigation-page-size .mat-select-trigger {\n\tcolor: rgba(0,0,0,.54);\n}\n\n.odoo-navigation, .odoo-navigation-page-size .mat-select-trigger {\n\tfont-family: Roboto,\"Helvetica Neue\",sans-serif;\n\tfont-size: 12px;\n}\n\n.odoo-navigation-page-size-label {\n\tmargin: 0 4px;\n}\n\n.mat-form-field {\n\tdisplay: inline-block;\n\tposition: relative;\n\ttext-align: left;\n}\n\n.mat-form-field {\n\ttext-align: left;\n}\n\n.mat-form-field {\n\tfont-size: inherit;\n\tfont-weight: 400;\n\tline-height: 1.125;\n\tfont-family: Roboto,\"Helvetica Neue\",sans-serif;\n}\n\n.odoo-navigation-mat-form-field-flex {\n\tcursor: pointer;\n}\n\n.odoo-navigation-mat-form-field-flex {\n\tdisplay: inline-flex;\n\talign-items: baseline;\n\tbox-sizing: border-box;\n\twidth: 100%;\n}\n\n.odoo-navigation, .odoo-navigation-page-size .mat-select-trigger {\n\tcolor: rgba(0,0,0,.54);\n}\n\n.odoo-navigation-page-size-select {\n\tmargin: 6px 4px 0 4px;\n\twidth: auto;\n}\n\n.mat-form-field {\n\tfont-size: inherit;\n\tfont-weight: 400;\n\tline-height: 1.125;\n\tfont-family: Roboto,\"Helvetica Neue\",sans-serif;\n}\n\n.odoo-navigation-range-actions {\n\tdisplay: flex;\n\talign-items: center;\n\tmin-height: 48px;\n}\n\n.odoo-navigation-range-label {\n\tmargin: 0 32px 0 24px;\n}\n\n.odoo-navigation, .odoo-navigation-page-size .mat-select-trigger {\n\tcolor: rgba(0,0,0,.54);\n}\n\n.odoo-navigation-page-size-label, .odoo-navigation-range-label {\n\tfont-family: Roboto,\"Helvetica Neue\",sans-serif;\n\tfont-size: 12px;\n}\n\n.odoo-navigation-icon {\n\twidth: 28px;\n\tfill: currentColor;\n}\n\n.odoo-navigation-navigation-previous, .odoo-navigation-navigation-next {\n\tpadding: 0;\n\tmin-width: 0;\n\twidth: 40px;\n\theight: 40px;\n\tflex-shrink: 0;\n\tline-height: 40px;\n\tfont-size: 14px;\n    color: #757575;\n    display: flex;\n    justify-content: center;\n\talign-items: center;\n\tbackground: transparent;\n    border: none;\n}\n\n.custom-select {\n\tborder-radius: 0;\n\tborder-top: none;\n\tborder-right: none;\n    border-left: none;\n    height: auto;\n    padding: 0rem 1.75rem 0rem 0.75rem;\n    color: rgba(0,0,0,.70);\n}\n\n.custom-select:focus {\n\tborder-color: #ced4da;\n\toutline: 0;\n\tbox-shadow: inset 0 0px 0px rgba(0, 0, 0, 0.075), 0 0 5px rgba(128, 189, 255, 0);\n}\n"

/***/ }),

/***/ "./src/components/paginator/paginator.component.html":
/*!***********************************************************!*\
  !*** ./src/components/paginator/paginator.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"odoo-navigation\">\n        <div class=\"odoo-navigation-container\">\n\n            <div class=\"odoo-navigation-page-size ng-star-inserted\">\n              <div class=\"odoo-navigation-page-size-label\">Items per page:</div>\n\n              <div class=\"odoo-navigation-page-size-select m\">\n                <div class=\"odoo-navigation-mat-form-field-flex\">\n                    <select (change)=\"change_limit()\" [(ngModel)]=\"limit\" class=\"custom-select mb-2 mr-sm-2 mb-sm-0\" id=\"inlineFormCustomSelect\">\n                      <option *ngFor=\"let opt of limit_options\">{{opt}}</option>\n                    </select>\n                </div>\n            </div>\n            <div class=\"odoo-navigation-range-actions\">\n              <div class=\"odoo-navigation-range-label\">\n                <span *ngIf=\"httpService.total_records > 0\">{{off_set + 1}}</span>\n                <span *ngIf=\"httpService.total_records <= 0\">0</span> - {{off_set+httpService.count}} of {{httpService.total_records}}</div>\n                <button [disabled]=\"off_set === 0\"\n                  (click)=\"change_page(-limit)\"\n                  class=\"odoo-navigation-navigation-previous\">\n                  <i class=\"fa fa-chevron-left\"></i>\n                </button>\n                <button [disabled]=\"off_set+httpService.count >= httpService.total_records\"\n                  (click)=\"change_page(limit)\"\n                  class=\"odoo-navigation-navigation-next\">\n                  <i class=\"fa fa-chevron-right\"></i>\n                </button>\n            </div>\n          </div>\n        </div>\n    </div>\n</div>\n\n"

/***/ }),

/***/ "./src/components/paginator/paginator.component.ts":
/*!*********************************************************!*\
  !*** ./src/components/paginator/paginator.component.ts ***!
  \*********************************************************/
/*! exports provided: PaginatorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaginatorComponent", function() { return PaginatorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../app/http.service */ "./src/app/http.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PaginatorComponent = /** @class */ (function () {
    function PaginatorComponent(httpServ) {
        this.httpServ = httpServ;
        this.off_set = 0;
        this.limit = 10;
        this.limit_options = [
            10,
            20,
            50,
            100
        ];
        this.httpService = httpServ;
    }
    PaginatorComponent.prototype.change_page = function (change) {
        this.off_set += Number(change);
        this.off_set < 0 ? this.off_set = 0 : this.off_set;
        this.httpService.fetch_paged_data(Number(this.off_set), Number(this.limit));
    };
    PaginatorComponent.prototype.change_limit = function () {
        this.httpService.fetch_paged_data(Number(this.off_set), Number(this.limit));
    };
    PaginatorComponent.prototype.ngOnInit = function () {
    };
    PaginatorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-paginator',
            template: __webpack_require__(/*! ./paginator.component.html */ "./src/components/paginator/paginator.component.html"),
            styles: [__webpack_require__(/*! ./paginator.component.css */ "./src/components/paginator/paginator.component.css")]
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"]])
    ], PaginatorComponent);
    return PaginatorComponent;
}());



/***/ }),

/***/ "./src/components/peer/peer.component.css":
/*!************************************************!*\
  !*** ./src/components/peer/peer.component.css ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#videos-container\n{\n    position: absolute;\n    bottom: 10px;\n    left: 10px;\n    text-align: left;\n}\n\n#active-video\n{\n    width:500px;\n    height: 500px;\n    border: 1px solid;\n    background: white;\n    display: none;\n}\n\n#videos-container .media-container .media-box {\n    border: transparent  !important;\n    margin: 1px;\n}\n\n#videos-container .media-box video {\n    /* object-fit: contain !important; */\n}\n\n.media-controls .control, .volume-control .control {\n    width: 35px;\n    height: 35px;\n    background-position: center center;\n    background-repeat: no-repeat;\n    float: left;\n    background-color: #ffffff !important;\n    border-radius: 35px !important;\n    padding: 30px !important;\n}\n\n#videos-container .media-container{\n    width: 100px;\n    height: 100px;\n    border: transparent;\n    border-radius: 0px;\n    background: #000000;\n}\n\n#peerrtccontainer{\n    background: #46515d;\n    position: fixed;\n    top:50px;\n    left: 0;\n    right: 0;\n    bottom: 0;\n}\n\n#csetupbuttons{\n    position: absolute;\n    top: 40px;\n    left: 0;\n    width: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n#csetupbuttons button{\n    margin: 0 10px;\n}\n\n#csetupbuttons input:first-child\n{\n    margin-left: 18px;\n}\n\n#incall-buttons-conariner{\n    position: absolute;\n    bottom: 40px;\n    left: 0;\n    width: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n#meeting-info-btn\n{\n    cursor: pointer;\n    background: #875A7B;\n    color: #ffffff;\n    border: none;\n    outline: none;\n    padding: 10px 15px;\n    cursor: pointer;\n\tfont-size: 15px;\n\tmargin-bottom: 6px;\n}\n\n#meeting-info-box\n{\n    position: fixed;\n    text-align: left;\n    color: white;\n    background: grey;\n    left:5px;\n\tfont-size: 15px;\n\tcursor: pointer;\n\tz-index: 1;\n}\n\n#meeting-info-box>div\n{\n    padding: 5px;\n}\n\n.btn {\n\tmargin: 3px 3px;\n\tfont-size: 12px !important;\n\tbackground-color: #875A7B;\n\tborder: none;\n\tcolor: white;\n\tfont-size: 16px;\n\tcursor: pointer;\n}\n\n/* Darker background on mouse-over */\n\n.btn:hover {\n\tbackground-color: #875B7B;\n}\n"

/***/ }),

/***/ "./src/components/peer/peer.component.html":
/*!*************************************************!*\
  !*** ./src/components/peer/peer.component.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <div id=\"jitsi-meet-container\" style=\"text-align:center\">\n\t<div id=\"meeting-info-panel\">\n\t\t<div style=\"padding-top:6px\">\n\t\t\t<button (click)=\"info_box = !info_box\" id='meeting-info-btn'>Show/Hide Meeting Info</button>\n\t\t</div>\n\t\t<div *ngIf=\"info_box\" id='meeting-info-box'>\n\t\t\t<div id=\"meet-info-details\">\n\t\t\t\t<div *ngIf=\"url != ''\" class=\"url\">{{url}}</div>\n\t\t\t\t<div *ngIf=\"pin != ''\" class=\"pin\">{{pin}}</div>\n\t\t\t\t<div class=\"dialin\">Dial-in: +1.512.402.2718</div>\n\t\t\t</div>\n\t\t\t<button class=\"btn\"\n\t\t\t\t\t(click)=\"info_box = !info_box\"\n\t\t\t\t\ttitle=\"Hide Details Box\">\n\t\t\t\t<i class=\"fa fa-eye-slash\" aria-hidden=\"true\"></i>\n\t\t\t</button>\n\t\t\t<button class=\"btn\"\n\t\t\t\t\t(click)=\"copyDivToClipboard('meet-info-details')\"\n\t\t\t\t\ttitle=\"Click to Copy Details\">\n\t\t\t\t<i *ngIf=\"!copied\" class=\"far fa-copy\"></i>\n\t\t\t\t<span *ngIf=\"copied\">Copied!</span>\n\t\t\t</button>\n\t\t</div>\n\t</div>\n\t<div id=\"meeting-room\" style=\"position:relative\">\n\t</div>\n</div> -->\n\n\n<iframe\nsrc=\"https://tokbox.com/embed/embed/ot-embed.js?embedId=5c4c6da5-b5fc-4d91-95d4-be3e044f1da7&room=DEFAULT_ROOM&iframe=true\"\nwidth=\"800px\"\nheight=\"640px\"\nallow=\"microphone; camera\"\n></iframe>\n"

/***/ }),

/***/ "./src/components/peer/peer.component.ts":
/*!***********************************************!*\
  !*** ./src/components/peer/peer.component.ts ***!
  \***********************************************/
/*! exports provided: PeerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PeerComponent", function() { return PeerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_http_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../app/http.service */ "./src/app/http.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PeerComponent = /** @class */ (function () {
    function PeerComponent(router, route, httpService) {
        this.router = router;
        this.route = route;
        this.httpService = httpService;
        this.info_box = false;
        this.copied = false;
        this.url = '';
        this.pin = '';
        this.is_peer_call = false;
    }
    PeerComponent.prototype.copyDivToClipboard = function (containerid) {
        this.copied = true;
        var textarea = document.createElement('textarea');
        textarea.id = 'temp_element';
        textarea.style.height = '0';
        ;
        document.body.appendChild(textarea);
        textarea.value = document.getElementById(containerid).innerText;
        $('#temp_element').select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    };
    PeerComponent.prototype.ngOnInit = function () { };
    PeerComponent.prototype.ngOnInit1 = function () {
        var obj_this = this;
        var bootbox = window['bootbox'];
        var roomName = undefined;
        var curl = window.location.toString();
        var roomPin = obj_this.route.snapshot.params.pin;
        var meeting_id = obj_this.route.snapshot.params.id;
        if (meeting_id == 'videocall') {
            obj_this.is_peer_call = true;
        }
        var verfify_user = function (password) {
            var input_data = {
                pin: roomPin,
                meeting_id: meeting_id,
            };
            if (obj_this.is_peer_call) {
                obj_this.httpService.call_post_http('/meeting/getroom', input_data, function (res_data) {
                    roomName = res_data.roomName;
                }, null);
            }
            else {
                if (password) {
                    input_data['password'] = password;
                }
                var attendees_data = { im_attendee: 'yes' };
                obj_this.httpService.call_post_http('/meeting/attendees', input_data, function (attendees_data) {
                    if (attendees_data.im_attendee) {
                        roomName = attendees_data.roomName;
                        console.log(attendees_data);
                        obj_this.joinCononference(obj_this, roomName, roomPin, curl, meeting_id, attendees_data.end_call);
                    }
                }, function (er) {
                    bootbox.alert(er);
                    //obj_this.router.navigate(['/meeting/'+meeting_id]);
                });
            }
        };
        // bootbox.prompt("Please Enter Password", function(promptValue){
        //     verfify_user(promptValue);
        // });
        verfify_user(null);
    };
    PeerComponent.prototype.joinCononference = function (obj_this, roomName, roomPin, curl, meeting_id, end_call) {
        var peer_this = this;
        var site_functions = window['functions'];
        site_functions.showLoader('jitsiconnection');
        setTimeout(function () {
            site_functions.hideLoader('jitsiconnection');
        }, 9000);
        var domain = "meet.jit.si";
        var config = {
            enableUserRolesBasedOnToken: true,
            // Local Recording
            localRecording: {
                //Enables local recording.
                //button to show up on the toolbar.
                enabled: true,
                //The recording format, can be one of 'ogg', 'flac' or 'wav'.
                format: 'flac'
            },
        };
        var interfaceConfig = {
            SHOW_JITSI_WATERMARK: false,
            //JITSI_WATERMARK_LINK: 'https://jitsi.org',
            JITSI_WATERMARK_LINK: '',
            SHOW_WATERMARK_FOR_GUESTS: false,
            SHOW_BRAND_WATERMARK: false,
            BRAND_WATERMARK_LINK: '',
            APP_NAME: 'MeetVUE',
            NATIVE_APP_NAME: 'MeetVUE',
            AUTHENTICATION_ENABLE: true,
            DISPLAY_WELCOME_PAGE_CONTENT: false,
            /**
             * The name of the toolbar buttons to display in the toolbar. If present,
             * the button will display. Exceptions are "livestreaming" and "recording"
             * which also require being a moderator and some values in config.js to be
             * enabled. Also, the "profile" button will not display for user's with a
             * jwt.
             */
            TOOLBAR_BUTTONS: [
                'microphone',
                'camera',
                //'closedcaptions',
                'desktop',
                'fullscreen',
                //'fodeviceselection',
                'hangup',
                'profile',
                'chat',
                'recording',
                //'info',
                //'livestreaming',
                //'etherpad',
                'sharedvideo',
                //'settings',
                //'raisehand',
                'videoquality',
                'filmstrip',
            ],
            MOBILE_APP_PROMO: false,
        };
        var options = {
            roomName: roomName,
            width: window.innerWidth - 10,
            height: window.innerHeight - 112,
            parentNode: document.querySelector('#meeting-room'),
            configOverwrite: config,
            //jwt: "dnmeetvuemeetingtoken",
            interfaceConfigOverwrite: interfaceConfig
        };
        var JitsiAPI = window['JitsiAPI'];
        var api = new JitsiAPI(domain, options);
        var joinin_user_name = window['current_user'].cookie.name;
        api.executeCommand('displayName', joinin_user_name);
        var is_admin = false;
        var moderator_id = undefined;
        var bootbox = window['bootbox'];
        // socket.on('moderatorleft', function(){
        // });
        var check_info_interval = undefined;
        var events = {
            videoConferenceJoined: function (data) {
                var cnt = 0;
                for (var uid in api._participants) {
                    ++cnt;
                    if (cnt == 1)
                        moderator_id = uid;
                    if (uid == api._myUserID) {
                        if (uid === moderator_id)
                            is_admin = true;
                        api._participants[uid]['uname'] = joinin_user_name;
                    }
                }
                peer_this.url = 'Link: ' + curl;
                peer_this.pin = 'PIN: ' + roomPin + '#';
                site_functions.hideLoader('jitsiconnection');
            },
            videoConferenceLeft: function (data) {
                $('#jitsi-meet-container').hide();
                bootbox.alert("You are out of meeting");
                obj_this.router.navigate(['/meeting/' + meeting_id]);
            },
            participantLeft: function (data) {
                if (end_call && data.id == moderator_id) {
                    bootbox.alert("You have left meeting");
                    obj_this.router.navigate(['/meeting/' + meeting_id]);
                }
            }
        };
        api.addEventListeners(events);
    };
    PeerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-peer',
            template: __webpack_require__(/*! ./peer.component.html */ "./src/components/peer/peer.component.html"),
            styles: [__webpack_require__(/*! ./peer.component.css */ "./src/components/peer/peer.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _app_http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"]])
    ], PeerComponent);
    return PeerComponent;
}());



/***/ }),

/***/ "./src/components/profiledetails/profiledetails.component.css":
/*!********************************************************************!*\
  !*** ./src/components/profiledetails/profiledetails.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".details-card {\n    padding: 2%;\n    border-left: 5px solid #7c7bad;\n    background: #f3f3f3;\n    margin-bottom: 5px;    \n}\n\n.details-card h3{\n    margin: 25px 0;\n    font-size: 1.7em;\n}\n\n.pill{\n    border-radius: 50px;\n    background-color: #808080;\n    color: white;\n    font-size: 16px;\n    padding: 5px 20px 5px 20px;\n    margin-right: 5px;\n}\n\n.label-control-form label{\n    padding-top: 7px;\n}\n\ninput[type=text], input[type=password] {\n    width: 100%;\n    padding:0 10px;\n    margin: 5px 0 15px 0;\n    display: block;\n    border: 1px solid #dedee8;\n    height: 40px;\n    line-height: 40px;\n}\n\ninput[type=text]:focus, input[type=password]:focus {\n    background-color: #ddd;\n    outline: none;\n}\n\nhr {\n    border: 1px solid #f1f1f1;\n    margin: 25px 0 25px 0;\n}\n\n/* Set a style for all buttons */\n\nbutton {\n    background-color: #4CAF50;\n    color: white;\n    padding: 14px 20px;\n    margin: 8px 0;\n    border: none;\n    cursor: pointer;\n    width: 100%;\n    opacity: 0.9;\n}\n\nbutton:hover {\n    opacity:1;\n}\n\n/* Extra styles for the cancel button */\n\n.cancelbtn {\n    padding: 14px 20px;\n    background-color: #f44336;\n}\n\n/* Float cancel and signup buttons and add an equal width */\n\n.cancelbtn {\n    float: left;\n    width: 100%;\n}\n\n.signupbtn {\n    width: 100%;\n}\n\n/* Add padding to container elements */\n\n/* Clear floats */\n\n.clearfix::after {\n    content: \"\";\n    clear: both;\n    display: table;\n}\n\n/* Change styles for cancel button and signup button on extra small screens */\n\n@media screen and (max-width: 300px) {\n    .cancelbtn, .signupbtn {\n        width: 100%;\n    }\n}\n\n/*Success Snackbar*/\n\n.snackbar-success {\n    visibility: hidden;\n    min-width: 250px;\n    margin-left: -125px;\n    background-color: #54C036;\n    color: #fff;\n    text-align: center;\n    border-radius: 2px;\n    padding: 16px;\n    position: fixed;\n    z-index: 1;\n    left: 50%;\n    bottom: 30px;\n    font-size: 17px;\n    z-index: 999999;\n}\n\n.snackbar-success.show {\n    visibility: visible;\n    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;\n    animation: fadein 0.5s, fadeout 0.5s 2.5s;\n}\n\n@-webkit-keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n\n@keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n\n@-webkit-keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n\n@keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n\n/*ERROR SNACKBAR*/\n\n.snackbar-error {\n    visibility: hidden;\n    min-width: 250px;\n    margin-left: -125px;\n    background-color: #ff0033;\n    color: white;\n    text-align: center;\n    border-radius: 2px;\n    padding: 16px;\n    position: fixed;\n    z-index: 1;\n    left: 50%;\n    bottom: 30px;\n    font-size: 17px;\n    z-index: 999999;\n}\n\n.snackbar-error.show {\n    visibility: visible;\n    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;\n    animation: fadein 0.5s, fadeout 0.5s 2.5s;\n}\n\n@-webkit-keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n\n@keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n\n@-webkit-keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n\n@keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n"

/***/ }),

/***/ "./src/components/profiledetails/profiledetails.component.html":
/*!*********************************************************************!*\
  !*** ./src/components/profiledetails/profiledetails.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"main-div\" >\n    <div *ngIf=\"!edit_mode\">\n        <div class=\" breadcrumbSection\">\n            <div class=\"container\">\n                <div class=\"row\">\n                    <div class=\"col-sm-12\">\n                        <ol class=\"breadcrumb\">\n                            <a routerLink=\"/profiles\">\n                                <li class=\"breadcrumb-item\">\n                                    Profiles / &nbsp;\n                                </li>\n                            </a>\n                            <li class=\"breadcrumb-item active\">{{profile_data.name}}</li>\n                        </ol>\n                    </div>\n                </div>\n            </div>\n        </div>\n        \n        <div class=\"container\">\n            <div class=\"page-links\">\n                <span class=\"prev next-prev-link\" title=\"Privious\">\n                    <i class=\"fa fa-angle-left\"></i>\n                </span>\n                <span class=\"next next-prev-link\" title=\"Next\">\n                    <i class=\"fa fa-angle-right\"></i>\n                </span>\n            </div>      \n            <div class=\"details-card\">\n                    <div *ngIf=\"my_profile\" class=\"clearfix\">\n                            <button (click)=\"editProfile()\" type=\"button\" class=\"cancelbtn\">Edit</button>\n                        </div>\n                <div class=\"row\">\n                    <div class=\"col-sm-8\">\n                        <img *ngIf = \"profile_data.image_medium\" class=\"img-thumbnail-lg\" src=\"{{profile_data.image_medium}}\">\n                        <img *ngIf = \"!profile_data.image_medium\" class=\"img-thumbnail-lg\" src=\"assets/img/no-profile.png\">\n                    </div>\n                    <div class=\"col-sm-4\">\n                        <div *ngIf=\"my_profile\">\n                            <div class=\"container\" *ngIf=\"profile_data.login.second_last\">\n                                <div class=\"row last-login-details\">\n                                    <div class=\"col-sm-12\">\n                                        <h3>Last Login Details</h3>\n                                        <span *ngIf=\"profile_data.login.second_last.login_time\">Login Time: {{profile_data.login['second_last'].login_time}}</span>\n                                        <span *ngIf=\"profile_data.login.second_last.platform\">OS: {{profile_data.login['second_last'].platform}}</span>\n                                        <span *ngIf=\"profile_data.login.second_last.browser\">Browser: {{profile_data.login['second_last'].browser}}</span>\n                                        <span *ngIf=\"profile_data.login.second_last.ip\">IP: {{profile_data.login['second_last'].ip}}</span>\n                                        <span *ngIf=\"profile_data.login.second_last.location\">Location: {{profile_data.login['second_last'].location}}</span>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"container\" *ngIf=\"!(profile_data.login.second_last)\">\n                                <div class=\"row last-login-details\">\n                                    <div class=\"col-sm-12\">\n                                        <h3>Last Login Details</h3>\n                                        <span *ngIf=\"profile_data.login.last.login_time\">Login Time: {{profile_data.login['last'].login_time}}</span>\n                                        <span *ngIf=\"profile_data.login.last.platform\">OS: {{profile_data.login['last'].platform}}</span>\n                                        <span *ngIf=\"profile_data.login.last.browser\">Browser: {{profile_data.login['last'].browser}}</span>\n                                        <span *ngIf=\"profile_data.login.last.ip\">IP: {{profile_data.login['last'].ip}}</span>\n                                        <span *ngIf=\"profile_data.login.last.location\">Location: {{profile_data.login['last'].location}}</span>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div *ngIf=\"!(my_profile)\">\n                                <div class=\"container\" *ngIf=\"profile_data.login.last\">\n                                    <div class=\"row last-login-details\">\n                                        <div class=\"col-sm-12\">\n                                            <h3>Last Login Details</h3>\n                                            <span *ngIf=\"profile_data.login.last.login_time\">Login Time: {{profile_data.login['last'].login_time}}</span>\n                                            <span *ngIf=\"profile_data.login.last.platform\">OS: {{profile_data.login['last'].platform}}</span>\n                                            <span *ngIf=\"profile_data.login.last.browser\">Browser: {{profile_data.login['last'].browser}}</span>\n                                            <span *ngIf=\"profile_data.login.last.ip\">IP: {{profile_data.login['last'].ip}}</span>\n                                            <span *ngIf=\"profile_data.login.last.location\">Location: {{profile_data.login['last'].location}}</span>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        <div *ngIf=\"!(profile_data.login.last)\" class=\"container\" >\n                                <h3>No login data</h3>\n                            </div>\n                    </div>\n                </div>\n                <hr>\n                <div class=\"row\">\n                    <div class=\"container\">\n                    \n                        <div *ngIf=\"profile_data.name\" class=\"row\">\n                            <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                <label for=\"job-title\">\n                                    <b>Name</b>\n                                </label>\n                            </div>\n                            <div class=\"col-sm-8\">\n                                {{profile_data.name}}\n                            </div>\n                        </div>\n                        <div *ngIf=\"profile_data.nick_name\" class=\"row\">\n                            <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                <label for=\"department\">\n                                    <b>Nick Name</b>\n                                </label>\n                            </div>\n                            <div class=\"col-sm-8\">\n                                {{profile_data.nick_name}}\n                            </div>\n                        </div>\n                        <div *ngIf=\"profile_data.email\" class=\"row\">\n                            <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                <label for=\"w-phone\">\n                                    <b>Email</b>\n                                </label>\n                            </div>\n                            <div class=\"col-sm-8\">\n                                {{profile_data.email}}\n                            </div>\n                        </div>\n\n\n\n                        <div *ngIf=\"profile_data.job_title\" class=\"row\">\n                            <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                <label for=\"job-title\">\n                                    <b>Job Title</b>\n                                </label>\n                            </div>\n                            <div class=\"col-sm-8\">\n                                {{profile_data.job_title}}\n                            </div>\n                        </div>\n                        <div *ngIf=\"profile_data.department\" class=\"row\">\n                            <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                <label for=\"department\">\n                                    <b>Department</b>\n                                </label>\n                            </div>\n                            <div class=\"col-sm-8\">\n                                {{profile_data.department}}\n                            </div>\n                        </div>\n                        <div *ngIf=\"profile_data.work_phone\" class=\"row\">\n                            <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                <label for=\"w-phone\">\n                                    <b>Work Phone</b>\n                                </label>\n                            </div>\n                            <div class=\"col-sm-8\">\n                                {{profile_data.work_phone}}\n                            </div>\n                        </div>\n                        <div *ngIf=\"profile_data.mobile_phone\" class=\"row\">\n                            <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                <label for=\"c-phone\">\n                                    <b>Cell Phone</b>\n                                </label>\n                            </div>\n                            <div class=\"col-sm-8\">\n                                {{profile_data.mobile_phone}}\n                            </div>\n                        </div>\n                        <div *ngIf=\"profile_data.fax\" class=\"row\">\n                            <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                <label for=\"fax\">\n                                    <b>Fax</b>\n                                </label>\n                            </div>\n                            <div class=\"col-sm-8\">\n                                {{profile_data.fax}}\n                            </div>\n                        </div>\n                        <div *ngIf=\"profile_data.website\" class=\"row\">\n                            <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                <label for=\"website\">\n                                    <b>Website</b>\n                                </label>\n                            </div>\n                            <div class=\"col-sm-8\">\n                                {{profile_data.website}}\n                            </div>\n                        </div>\n\n                        <!--Committees-->\n                        <div *ngIf=\"profile_data['committees'] && profile_data['committees'].length > 0\" class=\"row\">\n                            <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                <label for=\"job-title\">\n                                    <b>Committees</b>\n                                </label>\n                            </div>\n                            <div class=\"col-sm-8\">\n                                <span class=\"pill\" *ngFor=\"let com of profile_data.committees\">\n                                    <span style=\"cursor: pointer\" routerLink=\"/committees/{{com['id']}}\">{{com['name']}}</span>\n                                </span>\n                            </div>\n                        </div><br>\n\n                        <!-- Resume -->\n                        <div *ngIf=\"profile_data.resume\" class=\"row\">\n                            <div class=\"col-sm-12\">\n                                <h3>Resume</h3>\n                            </div>\n                            <a routerLink=\"/resume/doc/{{profile_data.id}}\" class=\"kanban-card\">\t\t\t\t\t\t\t\t\n                                <div class=\"DocumentWrapper\">\n                                    <div class=\"DocIcon\">\n                                        <i class=\"fa fa-file\"></i>\n                                    </div>\n                                </div>\n                            </a>\n                        </div>\n\n\n                        <!--Admin Details-->\n\n                        <div class=\"row assistant\" *ngIf=\"admin_info\">\n                            <div class=\"col-sm-12\">\n                                <h3>\n                                    <b>Administrative Assistant</b>\n                                </h3>\n                            </div>\n                            <div class=\"container row\">\n                                <div class=\"col-sm-8\">\n                                    <img *ngIf = \"profile_data.admin_image\" class=\"img-thumbnail-lg\" src=\"{{profile_data.admin_image}}\">\n                                    <img *ngIf = \"!(profile_data.admin_image)\" class=\"img-thumbnail-lg\" src=\"assets/img/no-profile.png\">\n                                </div>\n                            </div>\n                            <div class=\"admin_info_after_name container\">\n\t\t\t\t\t\t\t\t<div *ngIf=\"profile_data.admin_first_name\" class=\"row\">\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n\t\t\t\t\t\t\t\t\t\t<label>\n\t\t\t\t\t\t\t\t\t\t\t<b>First Name</b>\n\t\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-8\">\n\t\t\t\t\t\t\t\t\t\t{{profile_data.admin_first_name}}\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div *ngIf=\"profile_data.admin_last_name\" class=\"row\">\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n\t\t\t\t\t\t\t\t\t\t<label>\n\t\t\t\t\t\t\t\t\t\t\t<b>Last Name</b>\n\t\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-8\">\n\t\t\t\t\t\t\t\t\t\t{{profile_data.admin_last_name}}\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div *ngIf=\"profile_data.admin_nick_name\" class=\"row\">\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n\t\t\t\t\t\t\t\t\t\t<label>\n\t\t\t\t\t\t\t\t\t\t\t<b>Nick Name</b>\n\t\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-8\">\n\t\t\t\t\t\t\t\t\t\t{{profile_data.admin_nick_name}}\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\n\n\t\t\t\t\t\t\t\t<div *ngIf=\"profile_data.admin_email\" class=\"row\">\n                                    <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                        <label>\n                                            <b>Email</b>\n                                        </label>\n                                    </div>\n                                    <div class=\"col-sm-8\">\n                                        {{profile_data.admin_email}}\n                                    </div>\n                                </div>\n                                <div *ngIf=\"profile_data.admin_cell_phone\" class=\"row\">\n                                    <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                        <label>\n                                            <b>Cell Phone</b>\n                                        </label>\n                                    </div>\n                                    <div class=\"col-sm-8\">\n                                        {{profile_data.admin_cell_phone}}\n                                    </div>\n                                </div>\n                                <div *ngIf=\"profile_data.admin_fax\" class=\"row\">\n                                    <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                        <label>\n                                            <b>Fax</b>\n                                        </label>\n                                    </div>\n                                    <div class=\"col-sm-8\">\n                                        {{profile_data.admin_fax}}\n                                    </div>\n                                </div>\n                                <div *ngIf=\"profile_data.admin_work_phone\" class=\"row\">\n                                    <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                        <label>\n                                            <b>Work Phone</b>\n                                        </label>\n                                    </div>\n                                    <div class=\"col-sm-8\">\n                                        {{profile_data.admin_work_phone}}\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n<div class=\"container\">\n    <div class=\"details-card\" *ngIf=\"edit_mode\">\n        <div class=\"row\">\n            <div class=\"container row\">\n                <div class=\"col-sm-8\">\n                        <img *ngIf = \"profile_data.image_medium\" class=\"img-thumbnail-lg\" src=\"{{profile_data.image_medium}}\">\n                        <img *ngIf = \"!(profile_data.image_medium)\" class=\"img-thumbnail\" src=\"assets/img/no-profile.png\">\n                    <input (change)=\"addFile($event, 'profile')\" type=\"file\" name=\"pic\" accept=\"image/*\">\n                </div>\n            </div>\n            <div class=\"col-sm-4\">\n                <div class=\"container\" *ngIf=\"last_login.login_time\">\n                    <div class=\"row last-login-details\">\n                        <div class=\"col-sm-12\">\n                            <h3>Last Login Details</h3>\n                            <span *ngIf=\"last_login.login_time\">Login Time: {{last_login.login_time}}</span>\n                            <span *ngIf=\"last_login.platform\">OS: {{last_login.platform}}</span>\n                            <span *ngIf=\"last_login.browser\">Browser: {{last_login.browser}}</span>\n                            <span *ngIf=\"last_login.ip\">IP: {{last_login.ip}}</span>\n                            <span *ngIf=\"last_login.location\">Location: {{last_login.location}}</span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <hr>\n        <div class=\"row label-control-form\">\n\t\t\t<div class=\"container\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-sm\">\n\t\t\t\t\t\t<label for=\"name\">\n\t\t\t\t\t\t\t<b>Name</b>\n\t\t\t\t\t\t</label>\n\t\t\t\t\t\t<input value=\"{{profile_data.name}}\" (change)=\"modified_profile_data.name = $event.target.value\" type=\"text\" placeholder=\"Enter Name\" id=\"name\">\n\t\t\t\t\t\t<input value=\"{{profile_data.nick_name}}\" (change)=\"modified_profile_data.nick_name = $event.target.value\" type=\"text\" placeholder=\"Enter Nick\" id=\"nick\">\n\n\t\t\t\t\t\t<label for=\"email\">\n\t\t\t\t\t\t\t<b>Email</b>\n\t\t\t\t\t\t</label>\n\t\t\t\t\t\t<input value=\"{{profile_data.email}}\" (change)=\"modified_profile_data.email = $event.target.value\" type=\"text\" placeholder=\"Enter Email\" id=\"email\" disabled>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n\t\t\t\t\t\t\t<label for=\"job-title\">\n\t\t\t\t\t\t\t\t<b>Job Title</b>\n\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-sm-8\">\n\t\t\t\t\t\t\t<input value=\"{{profile_data.job_title}}\"  (change)=\"modified_profile_data.job_title = $event.target.value\" type=\"text\" placeholder=\"Enter Job Title\" id=\"job-title\" required>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n\t\t\t\t\t\t\t<label for=\"department\">\n\t\t\t\t\t\t\t\t<b>Department</b>\n\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-sm-8\">\n\t\t\t\t\t\t\t<input value=\"{{profile_data.department}}\"  (change)=\"modified_profile_data.department = $event.target.value\" type=\"text\" placeholder=\"Enter Department\" id=\"department\" required>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n\t\t\t\t\t\t\t<label for=\"w-phone\">\n\t\t\t\t\t\t\t\t<b>Work Phone</b>\n\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-sm-8\">\n\t\t\t\t\t\t\t<input value=\"{{profile_data.work_phone}}\"  (change)=\"modified_profile_data.work_phone = $event.target.value\" type=\"text\" placeholder=\"Enter Work Phone\" id=\"w-phone\" required>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n\t\t\t\t\t\t\t<label for=\"c-phone\">\n\t\t\t\t\t\t\t\t<b>Cell Phone</b>\n\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-sm-8\">\n\t\t\t\t\t\t\t<input value=\"{{profile_data.mobile_phone}}\"  (change)=\"modified_profile_data.mobile_phone = $event.target.value\" type=\"text\" placeholder=\"Enter Cell Phone\" id=\"c-phone\" required>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n\t\t\t\t\t\t\t<label for=\"fax\">\n\t\t\t\t\t\t\t\t<b>Fax</b>\n\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-sm-8\">\n\t\t\t\t\t\t\t<input value=\"{{profile_data.fax}}\"  (change)=\"modified_profile_data.fax = $event.target.value\" type=\"text\" placeholder=\"Enter Fax\" id=\"fax\" required>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n\t\t\t\t\t\t\t<label for=\"website\">\n\t\t\t\t\t\t\t\t<b>Website</b>\n\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-sm-8\">\n\t\t\t\t\t\t\t<input value=\"{{profile_data.website}}\"  (change)=\"modified_profile_data.website = $event.target.value\" type=\"text\" placeholder=\"Enter Website\" id=\"website\" required>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n\t\t\t\t\t\t\t<label for=\"website\">\n\t\t\t\t\t\t\t\t<b>Resume</b>\n\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-sm-8\">\n\t\t\t\t\t\t\t<input (change)=\"addFile($event, '')\" type=\"file\" name=\"pic\" />\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\n\n\t\t\t\t<!--Admin block-->\n\t\t\t\t\n\t\t\t\t\t<div class=\"row\" style=\"margin-top:20px;\">\n\t\t\t\t\t\t<div class=\"col-sm-12\">\n                            <h3>\n\t\t\t\t\t\t\t  <b>Administrative Assistant</b>\n                            </h3>\n                        </div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t\t\t\t<img *ngIf = \"profile_data.admin_image\" class=\"img-thumbnail-lg\" src=\"{{profile_data.admin_image}}\">\n\t\t\t\t\t\t\t<img *ngIf = \"!(profile_data.admin_image)\" class=\"img-thumbnail-lg\" src=\"assets/img/no-profile.png\">\n\t\t\t\t\t\t\t<input (change)=\"addFile($event, 'admin')\" type=\"file\" name=\"pic\" accept=\"image/*\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm\">\n\t\t\t\t\t\t\t<input value=\"{{profile_data.admin_first_name}}\"  (change)=\"modified_profile_data.admin_first_name = $event.target.value\" type=\"text\" placeholder=\"First Name\" required>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-sm\">\n\t\t\t\t\t\t\t<input value=\"{{profile_data.admin_last_name}}\"  (change)=\"modified_profile_data.admin_last_name = $event.target.value\" type=\"text\" placeholder=\"Last Name\" required>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-sm\">\n\t\t\t\t\t\t\t<input value=\"{{profile_data.admin_nick_name}}\"  (change)=\"modified_profile_data.admin_nick_name = $event.target.value\" type=\"text\" placeholder=\"Nick Name\" required>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"admin_info_after_name\">\n\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t<div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n\t\t\t\t\t\t\t\t<label for=\"admin-e-mail\">\n\t\t\t\t\t\t\t\t\t<b>E-mail</b>\n\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"col-sm-8\">\n\t\t\t\t\t\t\t\t<input value=\"{{profile_data.admin_email}}\"  (change)=\"modified_profile_data.admin_email = $event.target.value\" type=\"text\" id=\"admin-e-mail\" placeholder=\"\" required>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t<div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n\t\t\t\t\t\t\t\t<label for=\"admin-cell\">\n\t\t\t\t\t\t\t\t\t<b>Cell Phone</b>\n\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"col-sm-8\">\n\t\t\t\t\t\t\t\t<input value=\"{{profile_data.admin_cell_phone}}\"  (change)=\"modified_profile_data.admin_cell_phone = $event.target.value\" type=\"text\" placeholder=\"\" id=\"admin-cell\" required>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t<div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n\t\t\t\t\t\t\t\t<label for=\"admin-fax\">\n\t\t\t\t\t\t\t\t\t<b>Fax</b>\n\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"col-sm-8\">\n\t\t\t\t\t\t\t\t<input value=\"{{profile_data.admin_fax}}\"  (change)=\"modified_profile_data.admin_fax = $event.target.value\" type=\"text\" placeholder=\"\" id=\"admin-fax\" required>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t<div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n\t\t\t\t\t\t\t\t<label for=\"admin-work-phone\">\n\t\t\t\t\t\t\t\t\t<b>Work Phone</b>\n\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"col-sm-8\">\n\t\t\t\t\t\t\t\t<input value=\"{{profile_data.admin_work_phone}}\"  (change)=\"modified_profile_data.admin_work_phone = $event.target.value\" type=\"text\" placeholder=\"\" id=\"admin-work-phone\" required>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\n\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-sm\">\n\t\t\t\t\t\t<button type=\"button\" id=\"{{profile_data['id']}}\"  class=\"strt_sign profile btn btn-primary\" url='/profile/save_signature'>Signature</button>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"clearfix col-sm\">\n\t\t\t\t\t\t<button (click)=\"editProfile()\" type=\"button\" class=\"cancelbtn\">Cancel</button>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"clearfix col-sm\">\n\t\t\t\t\t\t<button (click)=\"onSubmit()\" type=\"submit\" class=\"signupbtn\">Save</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n        </div>\n    </div>\n</div>\n</div>\n\n<div id=\"slot-select-success\" class=\"snackbar-success\">Successfully Saved Your Profile.</div>\n<div id=\"slot-select-error\" class=\"snackbar-error\">Something went wrong, Try Again After Some Time.</div>\n"

/***/ }),

/***/ "./src/components/profiledetails/profiledetails.component.ts":
/*!*******************************************************************!*\
  !*** ./src/components/profiledetails/profiledetails.component.ts ***!
  \*******************************************************************/
/*! exports provided: ProfileDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileDetailsComponent", function() { return ProfileDetailsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_http_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../app/http.service */ "./src/app/http.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProfileDetailsComponent = /** @class */ (function () {
    function ProfileDetailsComponent(httpService, formBuilder, route) {
        var _this = this;
        this.httpService = httpService;
        this.formBuilder = formBuilder;
        this.route = route;
        this.my_profile = true;
        this.last_login = {
            last: {
                login_time: '',
                platform: '',
                browser: '',
                ip: '',
                location: ''
            },
            second_last: {
                login_time: '',
                platform: '',
                browser: '',
                ip: '',
                location: ''
            }
        };
        this.profile_data = {
            login: this.last_login,
        };
        this.modified_profile_data = {};
        this.submitted = false;
        this.admin_info = false;
        this.next = '';
        this.prev = '';
        this.edit_mode = false;
        this.route.params.subscribe(function (params) { return _this.get_data(); });
    }
    ProfileDetailsComponent.prototype.editProfile = function () {
        this.edit_mode = !this.edit_mode;
    };
    ProfileDetailsComponent.prototype.addFile = function (event, filter) {
        var obj_this = this;
        var element = event.target;
        console.log(element);
        var file = element.files[0];
        var fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = function () {
            if (filter === 'profile') {
                obj_this.profile_data['image_medium'] = fileReader.result;
                obj_this.modified_profile_data['image_medium'] = fileReader.result;
            }
            else if (filter === 'admin') {
                obj_this.profile_data['admin_image'] = fileReader.result;
                obj_this.modified_profile_data['admin_image'] = fileReader.result;
            }
            else {
                obj_this.modified_profile_data['resume'] = fileReader.result;
            }
        };
        fileReader.onerror = function (error) {
            console.log('Error: ', error);
        };
    };
    ProfileDetailsComponent.prototype.get_data = function () {
        var obj_input = {};
        var id = this.route.snapshot.params.id;
        // this.bread_crumb_items = this.httpService.make_bread_crumb();
        if (id) {
            this.my_profile = false;
            obj_input = { id: id };
        }
        var obj_this = this;
        var req_url = '/ws/profile-json';
        var input_data = obj_input;
        var success_cb = function (result) {
            if (result.profile.admin_email || result.profile.admin_cell_phone
                || result.profile.admin_fax || result.profile.admin_work_phone
                || result.profile.admin_image || result.profile.admin_first_name
                || result.profile.admin_last_name || result.profile.admin_nick_name) {
                obj_this.admin_info = true;
            }
            if (result.profile.image_medium) {
                var d = Date.now();
                result.profile.image_medium += '?a=' + d;
                $('#navbar-profile-img').attr('src', result.profile.image_medium);
                //console.log(result.profile.image_medium, 111);
            }
            for (var key in result.profile) {
                if (key == 'resume') {
                    localStorage.setItem('resume', result.profile[key]);
                }
                obj_this.profile_data[key] = result.profile[key];
            }
        };
        var failure_cb = function (error) {
        };
        this.httpService.call_post_http(req_url, input_data, success_cb, failure_cb);
    };
    ProfileDetailsComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        var obj_this = this;
        var form_data = obj_this.modified_profile_data;
        var input_data = {};
        for (var key in form_data) {
            if (obj_this.modified_profile_data[key] != '')
                input_data[key] = obj_this.modified_profile_data[key];
            obj_this.modified_profile_data[key] = '';
        }
        this.httpService.call_post_http_post('/ws/change-profile-json', input_data, function (data) {
            obj_this.edit_mode = false;
            var x = document.getElementById('slot-select-success');
            x.className = 'snackbar-success show';
            setTimeout(function () {
                x.className = x.className.replace('show', '');
            }, 3000);
            _this.get_data();
        }, function (error) {
            var x = document.getElementById('slot-select-error');
            x.className = 'snackbar-error show';
            setTimeout(function () {
                x.className = x.className.replace('show', '');
            }, 3000);
        }, 'post');
    };
    ProfileDetailsComponent.prototype.ngOnInit = function () {
        if ($('.strt_sign').length == 0) {
            $('body').append('<script src="annotator/js/dn_sign.js"></script>');
        }
    };
    ProfileDetailsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./profiledetails.component.html */ "./src/components/profiledetails/profiledetails.component.html"),
            styles: [__webpack_require__(/*! ./profiledetails.component.css */ "./src/components/profiledetails/profiledetails.component.css")]
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], ProfileDetailsComponent);
    return ProfileDetailsComponent;
}());



/***/ }),

/***/ "./src/components/profiles/profiles.component.css":
/*!********************************************************!*\
  !*** ./src/components/profiles/profiles.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".pill{\n    border-radius: 50px;\n    background-color: #808080;\n    color: white;\n    font-size: 16px;\n    padding: 5px 20px 5px 20px;\n}\n\n.kanban-profiles-user-img{\n    margin-right: 10px;\n}\n\n.kanban-profiles-user-info{\n    flex: 1 1 auto;\n}"

/***/ }),

/***/ "./src/components/profiles/profiles.component.html":
/*!*********************************************************!*\
  !*** ./src/components/profiles/profiles.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<app-paginator></app-paginator>\n<div id=\"main-div\">\n    <div class=\" breadcrumbSection\">\n        <div class=\"container\">\n            <div *ngIf=\"profiles_data.length\" class=\"row\">\n                <div class=\"col-sm-12\">\n                    <ol class=\"breadcrumb\">\n                        <li class=\"breadcrumb-item active\">Profiles</li>\n                    </ol>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div  class=\"container\">\n        <div class=\"row\">\n            <div class=\"kanban-profiles kanban-card\" *ngFor=\"let profile of profiles_data\">\n                <a class=\"kanban-profiles-user-info-box\" routerLink=\"/profile/{{profile.id}}\">\n                    <div class=\"kanban-profiles-user-img\">\n                        <img class=\"img-thumbnail-md\"\n                        src=\"{{profile.image_small}}\">                        \n                    </div>\n                    <div class=\"kanban-profiles-user-info\">\n                        <div class=\"kanban-profiles-user-name\">\n                            {{profile.name}}\n                        </div>\n                        <div *ngIf=\"profile.email\" class=\"kanban-profiles-user-email\">\n                            {{profile.email}}\n                        </div>\n                    </div>\n                </a>\n            </div>\n        </div>\n    </div>\n    <div class=\"jumbotron text-center\" *ngIf=\"no_prof\">\n        <h1>There are no Directors to show for now!</h1>\n        <hr>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/components/profiles/profiles.component.ts":
/*!*******************************************************!*\
  !*** ./src/components/profiles/profiles.component.ts ***!
  \*******************************************************/
/*! exports provided: ProfilesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilesComponent", function() { return ProfilesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../app/http.service */ "./src/app/http.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ProfilesComponent = /** @class */ (function () {
    function ProfilesComponent(httpService) {
        this.httpService = httpService;
        this.no_prof = false;
        var obj_this = this;
        this.profiles_data = [];
        this.get_data();
    }
    ProfilesComponent.prototype.get_data = function () {
        var obj_this = this;
        var input_data = {};
        obj_this.httpService.call_post_http('/ws/profiles-json', input_data, function (result) {
            if (result) {
                //console.log(result.records);
                obj_this.profiles_data = result.records;
                obj_this.httpService.total_records = result.total;
                obj_this.profiles_data && obj_this.profiles_data.length > 0 ? obj_this.no_prof = false : obj_this.no_prof = true;
            }
        }, function (error) { });
    };
    ProfilesComponent.prototype.ngOnInit = function () {
    };
    ProfilesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./profiles.component.html */ "./src/components/profiles/profiles.component.html"),
            styles: [__webpack_require__(/*! ./profiles.component.css */ "./src/components/profiles/profiles.component.css")]
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"]])
    ], ProfilesComponent);
    return ProfilesComponent;
}());



/***/ }),

/***/ "./src/components/resourcedetails/resourcedetails.component.css":
/*!**********************************************************************!*\
  !*** ./src/components/resourcedetails/resourcedetails.component.css ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".modal-header, .modal-footer{\n    background-color: #eeeeee !important;\n}\n\n.bordered{\n    border: 1px solid #808080;\n}\n\n"

/***/ }),

/***/ "./src/components/resourcedetails/resourcedetails.component.html":
/*!***********************************************************************!*\
  !*** ./src/components/resourcedetails/resourcedetails.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div id=\"main-div\" >\n    <div *ngIf=\"folder\">\n        <div class=\" breadcrumbSection\">\n            <div class=\"container\">\n                <ul *ngIf=\"folder && folder.parents\" class=\"breadcrumb\">\n                    <li class=\"breadcrumb-item\">                                                \n                        <a routerLink=\"/resources\">\n                            Resources\n                        </a>\n                    </li>\n                    <li class=\"breadcrumb-item\" *ngFor=\"let parent of folder.parents\">                                                \n                        <a routerLink=\"/resource/{{parent.id}}\">\n                            {{parent.name}}\n                        </a>\n                    </li>\n                    <li class=\"breadcrumb-item active\">{{folder.name}}</li>\n                </ul>\n            </div>\n        </div>\n        <div class=\"cards container\">\n            <h6 *ngIf=\"!(no_files)\">Files</h6>\n            <div class=\"row\">\n                <a style=\"cursor:pointer\" *ngFor=\"let doc of folder.files\" class=\"kanban-card\" routerLink=\"/resource/doc/{{doc.id}}\">\n                    <div class=\"DocumentWrapper gray-bg\">\n                            <div class=\"DocIcon\">\n                                    <!-- doc_type='resource' doc_id='{{doc.id}}' -->\n                            <i class=\"fa fa-file\"></i>\n                        </div>\n                        <div class=\"DocText\">\n                            {{doc.name}}\n                        </div>\n                    </div>\n                </a>\n            </div>\n            <p></p>\n            <h6 *ngIf=\"!(no_folders)\">Sub Folders</h6>\n            <div class=\"row\">\n                <div class=\"kanban-card\" *ngFor=\"let folder of folder.sub_folders\">\n                    <a routerLink=\"/resource/{{folder.id}}\" class=\"kanban-folder\">\n                        <i class=\"fa fa-folder\"></i>\n                        <span>{{folder.name}}</span>\n                    </a>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/components/resourcedetails/resourcedetails.component.ts":
/*!*********************************************************************!*\
  !*** ./src/components/resourcedetails/resourcedetails.component.ts ***!
  \*********************************************************************/
/*! exports provided: ResourceDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResourceDetailsComponent", function() { return ResourceDetailsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_http_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../app/http.service */ "./src/app/http.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ResourceDetailsComponent = /** @class */ (function () {
    function ResourceDetailsComponent(httpService, route) {
        var _this = this;
        this.httpService = httpService;
        this.route = route;
        this.root = true;
        this.no_folders = false;
        this.no_files = false;
        this.route.params.subscribe(function (params) { return _this.get_data(); });
    }
    ResourceDetailsComponent.prototype.get_data = function () {
        var obj_this = this;
        var input_data = { id: this.route.snapshot.params.id };
        this.httpService.call_post_http('/folder-contents-json', input_data, function (result) {
            obj_this.root = !(result.hasOwnProperty('parent_id'));
            obj_this.folder = result;
            var parents = result.parents;
            if (parents && parents.length > 0) {
                parents.reverse();
                parents[parents.length - 1]['is_last'] = 1888;
            }
            obj_this.folder.files.length > 0 ? obj_this.no_files = false : obj_this.no_files = true;
            obj_this.folder.sub_folders.length > 0 ? obj_this.no_folders = false : obj_this.no_folders = true;
        }, function (error) {
            console.log(error);
            //alert(error);
        });
    };
    ResourceDetailsComponent.prototype.ngOnInit = function () {
    };
    ResourceDetailsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./resourcedetails.component.html */ "./src/components/resourcedetails/resourcedetails.component.html"),
            styles: [__webpack_require__(/*! ./resourcedetails.component.css */ "./src/components/resourcedetails/resourcedetails.component.css")]
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], ResourceDetailsComponent);
    return ResourceDetailsComponent;
}());



/***/ }),

/***/ "./src/components/resources/resources.component.css":
/*!**********************************************************!*\
  !*** ./src/components/resources/resources.component.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/components/resources/resources.component.html":
/*!***********************************************************!*\
  !*** ./src/components/resources/resources.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<app-paginator></app-paginator>\n<div id=\"main-div\">\n    <div class=\"cards container\">\n        <div class=\"row\">\n            <div class=\"kanban-card \" *ngFor=\"let folder of folders\"> \n                <a routerLink=\"/resource/{{folder.id}}\" class=\"kanban-folder\">                \n                    <i class=\"fa fa-folder\"></i>\n                    <span>{{folder.name}}</span>\n                </a>\n            </div>\n        </div>\n    </div>\n    <div class=\"jumbotron text-center\" *ngIf=\"no_resource\">\n        <h1>There are no resources for now!</h1>\n        <hr>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/components/resources/resources.component.ts":
/*!*********************************************************!*\
  !*** ./src/components/resources/resources.component.ts ***!
  \*********************************************************/
/*! exports provided: ResourcesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResourcesComponent", function() { return ResourcesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../app/http.service */ "./src/app/http.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ResourcesComponent = /** @class */ (function () {
    function ResourcesComponent(httpService) {
        this.httpService = httpService;
        this.folders = [];
        this.no_resource = false;
        this.get_data();
    }
    ResourcesComponent.prototype.get_data = function () {
        var obj_this = this;
        obj_this.httpService.call_post_http('/root-folder-json', {}, function (result) {
            obj_this.folders = result.records;
            obj_this.httpService.count = result.count;
            obj_this.httpService.total_records = result.total;
            obj_this.folders && obj_this.folders.length > 0 ? obj_this.no_resource = false : obj_this.no_resource = true;
        }, function (error) {
            //console.log(error);
            //alert(error);
        });
    };
    ResourcesComponent.prototype.ngOnInit = function () {
    };
    ResourcesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./resources.component.html */ "./src/components/resources/resources.component.html"),
            styles: [__webpack_require__(/*! ./resources.component.css */ "./src/components/resources/resources.component.css")]
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"]])
    ], ResourcesComponent);
    return ResourcesComponent;
}());



/***/ }),

/***/ "./src/components/setpassword/setpassword.component.html":
/*!***************************************************************!*\
  !*** ./src/components/setpassword/setpassword.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"main-div\" style=\"display:none\">\n\t<div class=\"container\">\n\t\t<div class=\"row justify-content-center\">\n\t\t\t<div class=\"col-sm-10 col-md-6 col-lg-4\">\n\t\t\t\t<div class=\"password-box\">\n\t\t\t\t\t<label>New Password</label>\n\t\t\t\t\t<div class=\"form-group pass_show\">\n\t\t\t\t\t\t<input [(ngModel)]=\"new_password\" type=\"password\" class=\"form-control\" placeholder=\"New Password\">\n\t\t\t\t\t\t<span *ngIf=\"new_password\" class=\"ptxt\">Show</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<label>Confirm Password</label>\n\t\t\t\t\t<div class=\"form-group pass_show\">\n\t\t\t\t\t\t<input [(ngModel)]=\"confirm_new_password\" type=\"password\" class=\"form-control\" placeholder=\"Confirm Password\">\n\t\t\t\t\t\t<span *ngIf=\"confirm_new_password\" class=\"ptxt\">Show</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t\tPlease set password according to the following\n\t\t\t\t\t\t\t\t</span>\n                          \t<ul class=\"pass_rules\">\n\t\t\t\t\t\t\t\t<li [ngClass]=\"{ 'valid-password': lower_regex.test(new_password) }\">At least one lower case letter</li>\n\t\t\t\t\t\t\t\t<li [ngClass]=\"{ 'valid-password': uper_regex.test(new_password) }\">At least one upper case letter</li>\n\t\t\t\t\t\t\t\t<li [ngClass]=\"{ 'valid-password': numeric_regex.test(new_password) }\">At least one numeric chracter</li>\n\t\t\t\t\t\t\t\t<li [ngClass]=\"{ 'valid-password': special_regex.test(new_password) }\">At least one special chracter</li>\n\t\t\t\t\t\t\t\t<li [ngClass]=\"{ 'valid-password': min_length_regex.test(new_password) }\">Minimume 8 chracters</li>\n\t\t\t\t\t\t\t\t<li [ngClass]=\"{ 'valid-password': (new_password != '' && new_password == confirm_new_password) }\">Password Does not Match</li>\n                          \t</ul>\n                        </span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t\t\t\t<button class=\"btn btn-primary\" (click)=\"submit_password()\">Submit</button>\n\t\t\t\t\t\t\t<a style=\"font-size: 14px;font-weight: bold;margin-left: 10px;\"\n\t\t\t\t\t\t\t   href=\"/login\">Back to login</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n"

/***/ }),

/***/ "./src/components/setpassword/setpassword.component.ts":
/*!*************************************************************!*\
  !*** ./src/components/setpassword/setpassword.component.ts ***!
  \*************************************************************/
/*! exports provided: SetpasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetpasswordComponent", function() { return SetpasswordComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../app/http.service */ "./src/app/http.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SetpasswordComponent = /** @class */ (function () {
    function SetpasswordComponent(router, httpService) {
        this.router = router;
        this.httpService = httpService;
        this.new_password = '';
        this.confirm_new_password = '';
        this.loading = false;
        this.valid = false;
        this.all_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@~`!@#$%^&*()_=+\\';:"\/?>.<,-])(?=.{8,})/;
        this.lower_regex = /^(?=.*[a-z])/;
        this.uper_regex = /^(?=.*[A-Z])/;
        this.numeric_regex = /^(?=.*[0-9])/;
        this.special_regex = /^(?=.*[@~`!@#$%^&*()_=+\\';:"\/?>.<,-])/;
        this.min_length_regex = /^(?=.{8,})/;
    }
    SetpasswordComponent.prototype.submit_password = function () {
        var bootbox = window['bootbox'];
        if (!this.all_regex.test(this.new_password) && this.new_password != this.confirm_new_password) {
            return;
        }
        var obj_this = this;
        this.loading = true;
        var token = new URLSearchParams(window.location.search).get('token');
        var db = new URLSearchParams(window.location.search).get('db');
        if (!token || !db) {
            bootbox.alert('Invalid perameters in set password request. Please contact your admin.');
            return;
        }
        var req_url = '/reset-password';
        var input_data = {
            token: token,
            db: db,
            password: this.new_password,
        };
        var success_cb = function (result) {
            obj_this.loading = false;
            bootbox.alert('Password is successfully updated');
            if (!window['odoo']) {
                obj_this.router.navigate(['/login']);
            }
            ;
        };
        var failure_cb = function (error) {
            obj_this.error = error;
            obj_this.loading = false;
            console.log(error);
            if (error == 'Invalid Token') {
                error = "Token is already used";
            }
            bootbox.alert(error);
        };
        this.httpService.call_post_http(req_url, input_data, success_cb, failure_cb);
    };
    SetpasswordComponent.prototype.ngOnInit = function () {
        $(document).on('click', '.pass_show .ptxt', function () {
            $(this).text($(this).text() == "Show" ? "Hide" : "Show");
            $(this).prev().attr('type', function (index, attr) {
                return attr == 'password' ? 'text' : 'password';
            });
        });
        $(document).ready(function () {
            setTimeout(function () {
                $('#server-wait').hide();
                $('#main-div').show();
            }, 100);
        });
    };
    SetpasswordComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-setpassword',
            template: __webpack_require__(/*! ./setpassword.component.html */ "./src/components/setpassword/setpassword.component.html"),
            styles: [__webpack_require__(/*! ../../assets/css/login.css */ "./src/assets/css/login.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"]])
    ], SetpasswordComponent);
    return SetpasswordComponent;
}());



/***/ }),

/***/ "./src/components/settings/settings.component.css":
/*!********************************************************!*\
  !*** ./src/components/settings/settings.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".password-box{\n    background: #f9f9f9;\n    border: 1px solid #eaeaea;\n    padding: 15px;\n    margin-top: 80px;\n}\n\n.pass_show{position: relative}\n\n.pass_show .ptxt { \n    position: absolute;\n    top: 50%;\n    right: 10px;\n    z-index: 1;\n    color: #f36c01;\n    margin-top: -10px;\n    cursor: pointer;\n    transition: .3s ease all;\n}\n\n.pass_show .ptxt:hover{color: #333333;}\n\n.pass_rules li{\n\tcolor: red;\n\tfont-weight: 700;\n}\n\n.valid-password{\n\tcolor: Green !important;\n}\n"

/***/ }),

/***/ "./src/components/settings/settings.component.html":
/*!*********************************************************!*\
  !*** ./src/components/settings/settings.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"main-div\" style=\"padding-bottom: 0;\">\n\t<div class=\"container\">\n\t\t<div class=\"row justify-content-center\">\n\t\t\t<div class=\"col-sm-10 col-md-6 col-lg-4\">\n\t\t\t\t<div class=\"password-box\">\n\t\t\t\t\t<label>Current Password</label>\n\t\t\t\t\t<div class=\"form-group pass_show\">\n\t\t\t\t\t\t<input [(ngModel)]=\"old_password\" type=\"password\" class=\"form-control\" placeholder=\"Current Password\">\n\t\t\t\t\t\t<span *ngIf=\"old_password\" class=\"ptxt\">Show</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<label>New Password</label>\n\t\t\t\t\t<div class=\"form-group pass_show\">\n\t\t\t\t\t\t<input [(ngModel)]=\"new_password\" type=\"password\" class=\"form-control\" placeholder=\"New Password\">\n\t\t\t\t\t\t<span *ngIf=\"new_password\" class=\"ptxt\">Show</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<label>Confirm Password</label>\n\t\t\t\t\t<div class=\"form-group pass_show\">\n\t\t\t\t\t\t<input [(ngModel)]=\"confirm_new_password\" type=\"password\" class=\"form-control\" placeholder=\"Confirm Password\">\n\t\t\t\t\t\t<span *ngIf=\"confirm_new_password\" class=\"ptxt\">Show</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t\tPlease set password according to the following\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t<ul class=\"pass_rules\">\n\t\t\t\t\t\t\t\t\t<li [ngClass]=\"{ 'valid-password': lower_regex.test(new_password) }\">At least one lower case letter</li>\n\t\t\t\t\t\t\t\t\t<li [ngClass]=\"{ 'valid-password': uper_regex.test(new_password) }\">At least one upper case letter</li>\n\t\t\t\t\t\t\t\t\t<li [ngClass]=\"{ 'valid-password': numeric_regex.test(new_password) }\">At least one numeric chracter</li>\n\t\t\t\t\t\t\t\t\t<li [ngClass]=\"{ 'valid-password': special_regex.test(new_password) }\">At least one special chracter</li>\n\t\t\t\t\t\t\t\t\t<li [ngClass]=\"{ 'valid-password': min_length_regex.test(new_password) }\">Minimume 8 chracters</li>\n\t\t\t\t\t\t\t\t\t<li [ngClass]=\"{ 'valid-password': (new_password != '' && new_password == confirm_new_password) }\">Password\n\t\t\t\t\t\t\t\t\t\tDoes not Match</li>\n\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t\t\t\t<button class=\"btn btn-primary\" (click)=\"submit_password()\">Submit</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>"

/***/ }),

/***/ "./src/components/settings/settings.component.ts":
/*!*******************************************************!*\
  !*** ./src/components/settings/settings.component.ts ***!
  \*******************************************************/
/*! exports provided: SettingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsComponent", function() { return SettingsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../app/http.service */ "./src/app/http.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(httpService) {
        this.httpService = httpService;
        this.old_password = '';
        this.new_password = '';
        this.confirm_new_password = '';
        this.loading = false;
        this.valid = false;
        this.all_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@~`!@#$%^&*()_=+\\';:"\/?>.<,-])(?=.{8,})/;
        this.lower_regex = /^(?=.*[a-z])/;
        this.uper_regex = /^(?=.*[A-Z])/;
        this.numeric_regex = /^(?=.*[0-9])/;
        this.special_regex = /^(?=.*[@~`!@#$%^&*()_=+\\';:"\/?>.<,-])/;
        this.min_length_regex = /^(?=.{8,})/;
    }
    SettingsComponent.prototype.submit_password = function () {
        var bootbox = window['bootbox'];
        if (!this.old_password) {
            bootbox.alert('Please provide your previous password.');
            return;
        }
        if (!this.all_regex.test(this.new_password) || this.new_password != this.confirm_new_password) {
            bootbox.alert('Please follow the rules to set your new password.');
            return;
        }
        var obj_this = this;
        this.loading = true;
        var req_url = '/dn_base/change_password';
        var input_data = {
            old: this.old_password,
            new: this.new_password,
            app_name: 'MeetingPoint'
        };
        var success_cb = function (result) {
            obj_this.loading = false;
            bootbox.alert('Password is successfully updated');
            console.log(result);
            window["current_user"].logout();
        };
        var failure_cb = function (error) {
            obj_this.error = error;
            obj_this.loading = false;
            bootbox.alert('Something went wrong, Please try in some time');
            console.log(error);
        };
        var complete_cb = function () {
            obj_this.loading = false;
        };
        this.httpService.authenticate(req_url, input_data, success_cb, failure_cb, complete_cb);
    };
    SettingsComponent.prototype.ngOnInit = function () {
        $(document).on('click', '.pass_show .ptxt', function () {
            $(this).text($(this).text() == "Show" ? "Hide" : "Show");
            $(this).prev().attr('type', function (index, attr) {
                return attr == 'password' ? 'text' : 'password';
            });
        });
    };
    SettingsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-settings',
            template: __webpack_require__(/*! ./settings.component.html */ "./src/components/settings/settings.component.html"),
            styles: [__webpack_require__(/*! ./settings.component.css */ "./src/components/settings/settings.component.css")]
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"]])
    ], SettingsComponent);
    return SettingsComponent;
}());



/***/ }),

/***/ "./src/components/signdoc/signdoc.component.css":
/*!******************************************************!*\
  !*** ./src/components/signdoc/signdoc.component.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/components/signdoc/signdoc.component.html":
/*!*******************************************************!*\
  !*** ./src/components/signdoc/signdoc.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"dociframecontaine\"style=\"\nwidth: calc(100vw + 30px);\ntop: 50px;\nmargin-left: -15px;\nposition: fixed;\nheight: calc(100vh - 32px)\n\"\n>\n    <iframe id='signdocframe' style=\"\n    width: 100%;\n    height: 100%;\n    display:none\n    \"\n    >\n    </iframe>\n</div>"

/***/ }),

/***/ "./src/components/signdoc/signdoc.component.ts":
/*!*****************************************************!*\
  !*** ./src/components/signdoc/signdoc.component.ts ***!
  \*****************************************************/
/*! exports provided: SigndocComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SigndocComponent", function() { return SigndocComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../app/http.service */ "./src/app/http.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SigndocComponent = /** @class */ (function () {
    function SigndocComponent(route, httpService) {
        this.route = route;
        this.httpService = httpService;
    }
    SigndocComponent.prototype.ngOnInit = function () {
        var doc_id = this.route.snapshot.params.res_id;
        $('body').addClass('overflow-hide');
        window['functions'].showLoader('dociframe');
        $('#signdocframe').load(function () {
            $(this).show();
            window['functions'].hideLoader('dociframe');
        });
        this.httpService.call_post_http('/get-sign-token', { doc_id: doc_id }, function (data) {
            var path = window['site_config'].server_base_url + '/e_sign/sign/model=meeting_point.document&id=' + doc_id + ' &/' + data.token;
            $('#signdocframe').attr('src', path);
        }, undefined);
    };
    SigndocComponent.prototype.ngOnDestroy = function () {
        $('body').removeClass('overflow-hide');
    };
    SigndocComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-signdoc',
            template: __webpack_require__(/*! ./signdoc.component.html */ "./src/components/signdoc/signdoc.component.html"),
            styles: [__webpack_require__(/*! ./signdoc.component.css */ "./src/components/signdoc/signdoc.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"]])
    ], SigndocComponent);
    return SigndocComponent;
}());



/***/ }),

/***/ "./src/components/survey/survey.component.css":
/*!****************************************************!*\
  !*** ./src/components/survey/survey.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "main-div.survey-form-wrap{\n    border-left: 5px solid #7c7bad;\n    background: #f3f3f3;\n    padding:15px;\n}\n.survey-form-container textarea.form-control{\n    margin-bottom: 20px;\n    min-height: 150px;\n    resize: none;\n}\n.survey-form-container .form-control{\n    margin-bottom: 20px;\n}\n.cancelbtn, .signupbtn{\n    min-width: 130px;\n    font-size: 0.859em;\n    margin-right: 5px;\n}\n.home-survey-title .title{\n    font-size: 1.500em;\n    margin-bottom: 15px;\n}\na.fc-more{\n    background-color: blue !important;\n    color: white !important;\n}\n.radio-wrap{\n    margin-bottom:15px; \n}\n.row.submit\n{\n    padding-top: 30px;\n}\n"

/***/ }),

/***/ "./src/components/survey/survey.component.html":
/*!*****************************************************!*\
  !*** ./src/components/survey/survey.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"main-div\">\n\t<div class=\" breadcrumbSection\">\n\t\t<div class=\"container\">\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t\t<ol class=\"breadcrumb\">\n\t\t\t\t\t\t<li class=\"breadcrumb-item\" *ngFor=\"let item of bread_crumb.items\">\n\t\t\t\t\t\t\t<a routerLink=\"{{item.link}}\">\n\t\t\t\t\t\t\t\t{{item.title}}\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t<li class=\"breadcrumb-item\">{{bread_crumb.title}}</li>\n\t\t\t\t\t</ol>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<div class=\"dociframecontaine\"style=\"width: calc(100vw + 30px);top: 94px;margin-left: -15px;position: fixed;height: calc(100vh - 32px)\">\n\t\t<iframe id='survey-iframe' style=\"width: 100%;height: 100%;\">\n\t\t</iframe>\n\t</div>\n</div>\n\n\n<!--<div *ngIf=\"surveyDetails.pending\">-->\n<!--<div class=\"container\">-->\n<!--<form (ngSubmit)=\"submit_survey()\" validate>-->\n<!--<div class=\"survey-form-container survey-form-wrap\">-->\n<!--<div class=\"row\" *ngFor=\"let ques of surveyDetails.questions\">-->\n<!--<div class=\"col-sm-12\">-->\n\n<!--<label for=\"name\">-->\n<!--<b>{{ques.question}}</b>-->\n<!--</label>-->\n<!--<textarea class=\"form-control\" *ngIf=\"ques.type === 'free_text'\" type=\"text\" [(ngModel)]=\"ques.answer\" placeholder=\"Write your answer\" id=\"name\" name=\"name\"></textarea>-->\n\n<!--<div class=\"radio-wrap\" *ngIf=\"ques.type === 'simple_choice'\">-->\n<!--<div class=\"form-check\" *ngFor=\"let ans of ques.valid_answers\">-->\n<!--<label class=\"form-check-label\">-->\n<!--<input type=\"radio\" (change)=\"onSelectionChange(ans.id, ques)\" class=\"form-check-input\" name=\"options\">-->\n<!--{{ans.val}}-->\n<!--</label>-->\n<!--</div>-->\n<!--</div>-->\n<!--<input *ngIf=\"ques.type === 'numerical_box'\" type=\"number\" [(ngModel)]=\"ques.answer\" name=\"name\" />-->\n<!--<input class=\"form-control\" *ngIf=\"ques.type === 'date'\" type=\"date\" [(ngModel)]=\"ques.answer\" name=\"name\" />-->\n\n<!--</div>-->\n<!--</div>-->\n<!--<div class=\"row submit\">-->\n<!--<div class=\"col-sm-12\">-->\n<!--<button type=\"submit\" class=\"btn btn-primary signupbtn\">Save</button>-->\n<!--</div>-->\n<!--</div>-->\n\n<!--</div>-->\n<!--</form>-->\n<!--</div>-->\n<!--</div>-->\n<!--<div *ngIf=\"surveyDetails.completed\">-->\n<!--<div class=\"container\">-->\n<!--<div class=\"survey-form-container survey-form-wrap\">-->\n<!--<div class=\"row\" *ngFor=\"let ques of surveyDetails.questions\">-->\n<!--<div class=\"col-sm-12\">-->\n<!--<h5>{{ques.question}}</h5>-->\n<!--<p>{{ques.answer}}</p>-->\n<!--</div>-->\n<!--</div>-->\n\n<!--</div>-->\n<!--</div>-->\n<!--</div>-->\n"

/***/ }),

/***/ "./src/components/survey/survey.component.ts":
/*!***************************************************!*\
  !*** ./src/components/survey/survey.component.ts ***!
  \***************************************************/
/*! exports provided: SurveyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SurveyComponent", function() { return SurveyComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../app/http.service */ "./src/app/http.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SurveyComponent = /** @class */ (function () {
    function SurveyComponent(httpService, route) {
        this.httpService = httpService;
        this.route = route;
        this.bread_crumb = {
            items: [],
            title: ''
        };
    }
    SurveyComponent.prototype.ngOnInit = function () {
        var _this = this;
        var obj_this = this;
        var page_url = window.location + '';
        this.httpService.call_post_http('/survey-details-json', { survey_id: obj_this.route.snapshot.params.id }, function (result) {
            obj_this.surveyDetails = result;
            if (obj_this.surveyDetails['url']) {
                $('#survey-iframe').attr('src', obj_this.surveyDetails['url']);
            }
            _this.bread_crumb.title = _this.surveyDetails['title'];
            if (page_url.indexOf('home') !== -1) {
                _this.bread_crumb.items.push({ title: 'Home', link: '/' });
            }
            if (obj_this.surveyDetails['meeting_name'] || obj_this.surveyDetails['meeting_id']) {
                _this.bread_crumb.items.push({
                    title: obj_this.surveyDetails['meeting_name'],
                    link: '/meeting/' + obj_this.surveyDetails['meeting_id']
                });
            }
        }, function (error) {
        });
    };
    SurveyComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'survey',
            template: __webpack_require__(/*! ./survey.component.html */ "./src/components/survey/survey.component.html"),
            styles: [__webpack_require__(/*! ./survey.component.css */ "./src/components/survey/survey.component.css")]
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], SurveyComponent);
    return SurveyComponent;
}());



/***/ }),

/***/ "./src/components/topics/topics.component.css":
/*!****************************************************!*\
  !*** ./src/components/topics/topics.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/components/topics/topics.component.html":
/*!*****************************************************!*\
  !*** ./src/components/topics/topics.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div id=\"main-div\">\n\n        <div class=\" breadcrumbSection\">\n                <div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col-sm-12\">\n                                <ol class=\"breadcrumb\">\n                                        <li class=\"breadcrumb-item\" *ngFor=\"let item of bread_crumb.items\">\n                                            <a routerLink=\"{{item.link}}\">\n                                                {{item.title}}\n                                            </a>\n                                        </li>\n                                        <li class=\"breadcrumb-item\">{{bread_crumb.title}}</li>\n                                </ol>\n                        </div>\n                    </div>\n                </div>\n            </div>\n    <div class=\"container\">\n        <div class=\"row\">\n\n            <div class=\"col-sm-12 mr-b20\">\n                <div *ngIf=\"topic.name\" class=\"row\">\n                    <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                        <label>\n                            <b>Name</b>\n                        </label>\n                    </div>\n                    <div class=\"col-sm-8\">\n                        {{topic.name}}\n                    </div>\n                </div>\n                <div *ngIf=\"topic.lead\" class=\"row\">\n                    <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                        <label>\n                            <b>Lead</b>\n                        </label>\n                    </div>\n                    <div class=\"col-sm-8\">\n                        {{topic.lead}}\n                    </div>\n                </div>\n                <div *ngIf=\"topic.duration\" class=\"row\">\n                    <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                        <label>\n                            <b>Duration</b>\n                        </label>\n                    </div>\n                    <div class=\"col-sm-8\">\n                        {{topic.duration}}\n                    </div>\n                </div>\n                <div *ngIf=\"topic.content\" class=\"row\">\n                    <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                        <label>\n                            <b>Content</b>\n                        </label>\n                    </div>\n                    <div class=\"col-sm-8\">\n                        {{topic.content}}\n                    </div>\n                </div>\n\n                \n            </div>\n        </div>\n    </div>\n    <section *ngIf=\"topic.docs && topic.docs.length\" class=\"HomepageDocumentSection\">\n            <div class=\"container\">\n                <div class=\"row\">\n                    <div class=\"col-sm-12\">\n                        <h4>\n                            <b>Documents</b>\n                        </h4>\n                        <br>\n                    </div>\n                    <div class=\"col-sm-12\">\n                        <div class=\"row\">\n                            <a class=\"col-sm-6 col-md-4 col-lg-3\" routerLink=\"/topic/doc/{{doc.id}}\" *ngFor=\"let doc of topic.docs\">\n                                <div class=\"DocumentWrapper\">\n                                        <div class=\"DocIcon\">\n                                                <!-- doc_type='topic' doc_id='{{doc.id}}' -->\n                                        <i class=\"fa fa-file\"></i>\n                                    </div>\n                                    <div class=\"DocText\">{{doc.name}}</div>\n                                </div>\n                            </a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </section>\n</div>\n"

/***/ }),

/***/ "./src/components/topics/topics.component.ts":
/*!***************************************************!*\
  !*** ./src/components/topics/topics.component.ts ***!
  \***************************************************/
/*! exports provided: TopicsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TopicsComponent", function() { return TopicsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../app/http.service */ "./src/app/http.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TopicsComponent = /** @class */ (function () {
    function TopicsComponent(httpService, route) {
        this.httpService = httpService;
        this.route = route;
        this.topic = {
            lead: '',
            content: '',
            duration: '00:00',
            name: '',
            docs: []
        };
        this.bread_crumb = {
            items: [],
            title: ''
        };
    }
    TopicsComponent.prototype.ngOnInit = function () {
        var obj_this = this;
        var req_url = '/topic/details-json';
        var input_data = { id: obj_this.route.snapshot.params.id };
        var success_cb = function (result) {
            obj_this.topic = result;
            obj_this.bread_crumb.title = obj_this.topic['name'];
            obj_this.bread_crumb.items.push({
                title: obj_this.topic['meeting_name'],
                link: '/meeting/' + obj_this.topic['meeting_id']
            });
        };
        var failure_cb = function (error) {
        };
        this.httpService.call_post_http(req_url, input_data, success_cb, failure_cb);
    };
    TopicsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-topics',
            template: __webpack_require__(/*! ./topics.component.html */ "./src/components/topics/topics.component.html"),
            styles: [__webpack_require__(/*! ./topics.component.css */ "./src/components/topics/topics.component.css")]
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], TopicsComponent);
    return TopicsComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: true
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/sami/meetvue/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map