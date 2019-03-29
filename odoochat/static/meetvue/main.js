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
/* harmony import */ var _components_jitsi_jitsi_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../components/jitsi/jitsi.component */ "./src/components/jitsi/jitsi.component.ts");
/* harmony import */ var _components_setpassword_setpassword_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../components/setpassword/setpassword.component */ "./src/components/setpassword/setpassword.component.ts");
/* harmony import */ var src_components_signdoc_signdoc_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! src/components/signdoc/signdoc.component */ "./src/components/signdoc/signdoc.component.ts");
/* harmony import */ var src_components_chat_chat_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! src/components/chat/chat.component */ "./src/components/chat/chat.component.ts");
/* harmony import */ var _components_messenger_messenger_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../components/messenger/messenger.component */ "./src/components/messenger/messenger.component.ts");
/* harmony import */ var _components_votingdetails_votingdetails_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../components/votingdetails/votingdetails.component */ "./src/components/votingdetails/votingdetails.component.ts");
/* harmony import */ var src_components_votingresults_votingresults_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! src/components/votingresults/votingresults.component */ "./src/components/votingresults/votingresults.component.ts");
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
    { path: 'set-password', component: _components_setpassword_setpassword_component__WEBPACK_IMPORTED_MODULE_22__["SetpasswordComponent"] },
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
    { path: 'signature/doc/:res_id', component: src_components_signdoc_signdoc_component__WEBPACK_IMPORTED_MODULE_23__["SigndocComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: ':doc_type/doc/:res_id', component: _components_document_document_component__WEBPACK_IMPORTED_MODULE_19__["DocumentComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: ':doc_type/doc/:res_id/:kw', component: _components_document_document_component__WEBPACK_IMPORTED_MODULE_19__["DocumentComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'iframe/:doc_type/:res_id/:token', component: _components_document_document_component__WEBPACK_IMPORTED_MODULE_19__["DocumentComponent"] },
    { path: 'chat', component: src_components_chat_chat_component__WEBPACK_IMPORTED_MODULE_24__["ChatComponent"] },
    { path: 'messenger', component: _components_messenger_messenger_component__WEBPACK_IMPORTED_MODULE_25__["MessengerComponent"] },
    { path: 'iframe/comments/:res_modal/:res_id/:token', component: _components_comments_comments_component__WEBPACK_IMPORTED_MODULE_0__["CommentsComponent"] },
    { path: 'comments/:res_modal', component: _components_comments_comments_component__WEBPACK_IMPORTED_MODULE_0__["CommentsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'settings', component: _components_settings_settings_component__WEBPACK_IMPORTED_MODULE_20__["SettingsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'jitsilow', component: _components_jitsi_jitsi_component__WEBPACK_IMPORTED_MODULE_21__["JitsiComponent"] },
    { path: 'jitsilow/:room', component: _components_jitsi_jitsi_component__WEBPACK_IMPORTED_MODULE_21__["JitsiComponent"] },
    { path: 'meetings/completed/:id', component: _components_meetingdetails_meetingdetails_component__WEBPACK_IMPORTED_MODULE_12__["MeetingDetailsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'meetings/archived/:id', component: _components_meetingdetails_meetingdetails_component__WEBPACK_IMPORTED_MODULE_12__["MeetingDetailsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'voting/:id', component: _components_votingdetails_votingdetails_component__WEBPACK_IMPORTED_MODULE_26__["VotingdetailsComponent"] },
    { path: 'voting/:id/results', component: src_components_votingresults_votingresults_component__WEBPACK_IMPORTED_MODULE_27__["VotingresultsComponent"] },
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

module.exports = "<div *ngIf=\"!odoo_build\">\n    <app-header></app-header>\n    <router-outlet></router-outlet>\n    <button (click)=\"topFunction()\" id=\"backTop\" title=\"Go to top\"><i class=\"fa fa-arrow-up\"></i></button>\n    <div class=\"modal fade\" id=\"signModal\" role=\"dialog\" aria-hidden=\"true\">\n        <div class=\"modal-dialog modal-md modal-dialog-centered\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">×</button>\n                </div>\n                <div id=\"signature-body\" class=\"modal-body\" style=\"min-height: 1009px;\">\n                    <div class=\"DocsButtonWrapper\">\n                        <span class=\"btn btn-primary btn-sm DocsBtn\" id=\"draw-sig\">Draw</span>\n                        <span id=\"upload-sig-btn\" class=\"btn btn-sm btn-primary DocsBtn o_select_file_button\" title=\"Select\" >Upload</span>\n                        <input id=\"upload-sig\" accept=\".jpg,.png,.jpeg\" style=\"display:none\" type=\"file\">\n                        <span class=\"btn btn-primary btn-sm DocsBtn\" id=\"auto-sig\">Auto</span>\n                        <!-- <span class=\"btn btn-primary btn-sm DocsBtn\" id=\"insert-sig\">Insert</span> -->\n                    </div>\n                    <div id=\"signature_editor\" class=\"kbw-signature\">\n                    </div>\n                    <span class=\"btn btn-danger btn-sm DocsBtn\" id=\"clear-sig\">Clear</span>\n                    <span class=\"btn btn-primary btn-sm DocsBtn\" id=\"save-sig\">Save</span>\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

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
/* harmony import */ var _components_jitsi_jitsi_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../components/jitsi/jitsi.component */ "./src/components/jitsi/jitsi.component.ts");
/* harmony import */ var _components_setpassword_setpassword_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../components/setpassword/setpassword.component */ "./src/components/setpassword/setpassword.component.ts");
/* harmony import */ var _components_forgotpassword_forgotpassword_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ../components/forgotpassword/forgotpassword.component */ "./src/components/forgotpassword/forgotpassword.component.ts");
/* harmony import */ var _components_signdoc_signdoc_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ../components/signdoc/signdoc.component */ "./src/components/signdoc/signdoc.component.ts");
/* harmony import */ var _components_comments_comments_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ../components/comments/comments.component */ "./src/components/comments/comments.component.ts");
/* harmony import */ var _components_messenger_messenger_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ../components/messenger/messenger.component */ "./src/components/messenger/messenger.component.ts");
/* harmony import */ var _components_messageicon_messageicon_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ../components/messageicon/messageicon.component */ "./src/components/messageicon/messageicon.component.ts");
/* harmony import */ var _components_votingdetails_votingdetails_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ../components/votingdetails/votingdetails.component */ "./src/components/votingdetails/votingdetails.component.ts");
/* harmony import */ var _components_votingresults_votingresults_component__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ../components/votingresults/votingresults.component */ "./src/components/votingresults/votingresults.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







































var bootstrap_Components = undefined;
(function () {
    if (window['odoo']) {
        //console.log("Is export build");
        bootstrap_Components = [_app_component__WEBPACK_IMPORTED_MODULE_8__["AppComponent"], _components_messageicon_messageicon_component__WEBPACK_IMPORTED_MODULE_35__["MessageiconComponent"], _components_messenger_messenger_component__WEBPACK_IMPORTED_MODULE_34__["MessengerComponent"], _components_chat_chat_component__WEBPACK_IMPORTED_MODULE_15__["ChatComponent"], _components_comments_comments_component__WEBPACK_IMPORTED_MODULE_33__["CommentsComponent"], _components_document_document_component__WEBPACK_IMPORTED_MODULE_27__["DocumentComponent"]];
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
                _pipes_keys_pipe__WEBPACK_IMPORTED_MODULE_5__["KeysPipe"],
                _components_chat_chat_component__WEBPACK_IMPORTED_MODULE_15__["ChatComponent"],
                _components_jitsi_jitsi_component__WEBPACK_IMPORTED_MODULE_29__["JitsiComponent"],
                _components_setpassword_setpassword_component__WEBPACK_IMPORTED_MODULE_30__["SetpasswordComponent"],
                _components_forgotpassword_forgotpassword_component__WEBPACK_IMPORTED_MODULE_31__["ForgotpasswordComponent"],
                _components_signdoc_signdoc_component__WEBPACK_IMPORTED_MODULE_32__["SigndocComponent"],
                _components_comments_comments_component__WEBPACK_IMPORTED_MODULE_33__["CommentsComponent"],
                _components_messenger_messenger_component__WEBPACK_IMPORTED_MODULE_34__["MessengerComponent"],
                _components_messageicon_messageicon_component__WEBPACK_IMPORTED_MODULE_35__["MessageiconComponent"],
                _components_votingdetails_votingdetails_component__WEBPACK_IMPORTED_MODULE_36__["VotingdetailsComponent"],
                _components_votingresults_votingresults_component__WEBPACK_IMPORTED_MODULE_37__["VotingresultsComponent"]
            ],
            providers: [
                _auth_guard__WEBPACK_IMPORTED_MODULE_10__["AuthGuard"],
                _socket_service__WEBPACK_IMPORTED_MODULE_6__["SocketService"],
                _http_service__WEBPACK_IMPORTED_MODULE_7__["HttpService"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_8__["AppComponent"]],
            entryComponents: [_components_messageicon_messageicon_component__WEBPACK_IMPORTED_MODULE_35__["MessageiconComponent"], _components_messenger_messenger_component__WEBPACK_IMPORTED_MODULE_34__["MessengerComponent"], _components_chat_chat_component__WEBPACK_IMPORTED_MODULE_15__["ChatComponent"], _components_comments_comments_component__WEBPACK_IMPORTED_MODULE_33__["CommentsComponent"], _components_document_document_component__WEBPACK_IMPORTED_MODULE_27__["DocumentComponent"]],
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

/***/ "./src/app/dynamicngloader.ts":
/*!************************************!*\
  !*** ./src/app/dynamicngloader.ts ***!
  \************************************/
/*! exports provided: DynamicNg2Loader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicNg2Loader", function() { return DynamicNg2Loader; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");

var DynamicNg2Loader = /** @class */ (function () {
    function DynamicNg2Loader(injector) {
        this.injector = injector;
        this.appRef = injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationRef"]);
        this.zone = injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]);
        this.componentFactoryResolver = injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"]);
    }
    DynamicNg2Loader.prototype.loadComponentAtDom = function (component, dom, onInit) {
        var _this = this;
        var componentRef;
        this.zone.run(function () {
            try {
                var componentFactory = _this.componentFactoryResolver.resolveComponentFactory(component);
                componentRef = componentFactory.create(_this.injector, [], dom);
                onInit && onInit(componentRef.instance);
                _this.appRef.attachView(componentRef.hostView);
            }
            catch (e) {
                console.error("Unable to load component", component, "at", dom);
                throw e;
            }
        });
        return componentRef;
    };
    return DynamicNg2Loader;
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
    $('#server-wait').show();
    setTimeout(function(){
    if (calendar_added == 0) {
        $('body').prepend('<link rel="stylesheet" href="assets/static/libs/css/fullcalendar.css"/>');
        $('body').append('<script src="/assets/static/libs/js/fullcalendar.js"></script>');        
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
                schedule += '<div class="col"> <span>' + events[i].date[1] + ' ' + events[i].date[0] +','+ events[i].date[2]+'</span></div>';
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
    $('#server-wait').hide();


},100)
}
function showCalendarEvnetPopup(result)
{
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
    console.log(result);
    for (var key in result)
    {
        if(!result[key])
            continue;
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
            var route = '';
            var obj_this = this;
            if (window['odoo']) {
                var item_id = item.res_id;
                var item_model = item.res_model;
                if (item.parent_res_id) {
                    item_id = item.parent_res_id;
                    item_model = item.parent_res_model;
                }
                var action_url = '/web#id=' + item_id;
                action_url += '&model=' + item_model;
                action_url += '&view_type=form';
                action_url += '&menu_id=' + obj_this.get_param('menu_id');
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
        this.io = window['io'];
        var obj_this = this;
        if (!window['socket_manager']) {
            window['socket_manager'] = obj_this;
        }
        // else
        // {
        //     var socket_manager = window['socket_manager'];
        //     if(socket_manager.verified)
        //     {
        //         Object.assign(obj_this, window['socket_manager']);
        //         // console.log(obj_this.server_events);
        //         return;
        //     }
        // }
        var url = window['pathname'];
        if (!url.startsWith('/iframe')) {
            obj_this.iframe_url = false;
        }
        var res = window['public_routes'].indexOf(url);
        if (res == -1) {
            try {
                var user_cookie = localStorage.getItem('user');
                var verification_data = undefined;
                if (window['odoo']) {
                    user_cookie = window['odoo'].session_info.user;
                    //console.log(user_cookie);
                    obj_this.connect_socket(user_cookie);
                }
                else if (user_cookie) {
                    verification_data = JSON.parse(user_cookie);
                    if (verification_data && verification_data['token']) {
                        verification_data['app_name'] = window['site_config']['app_name'];
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
                }
                else {
                    console.log("No user in cookies", user_cookie);
                    obj_this.router.navigate(['/login']);
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
        obj_this.user_data = authorized_user;
        obj_this.socket = this.io(window['site_config'].chat_server, {
            'reconnection': false,
            "transports": ['websocket'],
            'reconnectionDelay': 2000,
            'reconnectionDelayMax': 5000,
            'reconnectionAttempts': 2
        });
        var site_config = window['site_config'];
        obj_this.socket.on('connect', function () {
            obj_this.socket.off('server_event');
            authorized_user.socket_id = obj_this.socket.id;
            var socket_error = socket_error = "Socket connection not established at " + window['site_config'].chat_server + 'because ';
            $.ajax({
                url: site_config.chat_server + '/verify-client',
                data: authorized_user,
                success: function (data) {
                    if (data && !data.error) {
                        socket_error = '';
                        onAuthenticated(data.data);
                    }
                    else if (data.error) {
                        console.log(authorized_user);
                        socket_error += data.error;
                    }
                    else {
                        socket_error += ' no response';
                    }
                },
                error: function (a, b) {
                    socket_error += b.responseText;
                },
                complete: function () {
                    if (socket_error) {
                        console.log(socket_error);
                    }
                }
            });
            function onAuthenticated(data) {
                if (data.user && data.friends) {
                }
                else {
                    console.log('invalid user data ', data);
                    return;
                }
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
            }
            ;
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
            // if(site_config.show_logs.includes('socket'))
            // console.log('Socket server easily connected.. at '+Date());
        });
    };
    SocketService.prototype.update_unseen_message_count = function (event, target_id, target) {
        var inc = 0;
        var obj_this = this;
        try {
            switch (event) {
                case "receive-new-message":
                    inc = 1;
                    break;
                case "read-new-message":
                    inc = -1;
                    break;
                case "user-selected":
                    inc = target.unseen * -1;
                    break;
            }
            target.unseen = target.unseen + inc;
            obj_this.unseen_messages = obj_this.unseen_messages + inc;
            if (obj_this.unseen_messages >= 1) {
                $('.un-read-msg.count').show();
            }
            else if (obj_this.unseen_messages <= 0) {
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
        obj_this.server_events['meeting_started'] = function (res) {
            bootbox.alert(res);
        };
        obj_this.server_events['notification_received'] = function (res) {
            obj_this.receive_notification(res);
        };
        obj_this.server_events['notification_updated'] = function (res) {
            console.log('notifications updated');
        };
        obj_this.server_events['friend_joined'] = function (user) {
            if (obj_this.user_data.id == user.id) {
                console.log(user, "Should never happen now");
                return;
            }
            if (!obj_this.friends[user.id]) {
                console.log(user.id + ' not found in list -- ', obj_this.friends);
                return;
                //pending to add this user in list
            }
            else {
                obj_this.friends[user.id].online = user.online;
            }
        };
        obj_this.server_events['user_left'] = function (user) {
            if (obj_this.user_data.id == user.id) {
                console.log(user, "Should never happen now");
                return;
            }
            if (!obj_this.friends[user.id]) {
                console.log(user.id + ' not found in list -- ', obj_this.friends);
                return;
                //pending to add this user in list
            }
            else {
                obj_this.friends[user.id].online = user.online;
            }
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
            //if (href.indexOf("localhost") == -1) 
            {
                window["bootbox"].alert("You are logged out due to " + res.reason);
                obj_this.close_socket();
                if (window['odoo']) {
                    window['functions'].logout_odoo();
                }
                else {
                    window["current_user"].logout(1);
                }
            }
        };
        obj_this.server_events['chat_message_received'] = function (msg) {
            var sender = obj_this.friends[msg.sender];
            if (!sender) {
                console.log(obj_this.friends, ' Dev issue as ' + msg.sender + ' not found');
                return;
            }
            obj_this.update_unseen_message_count("receive-new-message", msg.sender, sender);
        };
        obj_this.server_events['comment_received'] = function (data) {
        };
        obj_this.server_events['point_comment_received'] = function (data) {
        };
        if (window["odoo"]) {
            obj_this.server_events['to_do_item_updated'] = function () {
                if (window["get_param_value"]("model") == "meeting_point.news") {
                    setTimeout(function () {
                        $('.o_menu_sections a:first').click();
                        $('#loaderContainerajax').hide();
                    }, 5000);
                }
            };
        }
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
            item.res_id = res_id = item.parent_res_id;
            item.res_model = res_model = item.parent_res_model;
        }
        if (item.parent_res_id || obj_this.current_model != res_model || obj_this.current_id != res_id) {
            index = obj_this.find_notification_index(res_model, res_id);
            if (index != -1) {
                obj_this.notificationList[index].counter = obj_this.notificationList[index].counter + 1;
            }
            else {
                item.counter = 1;
                obj_this.add_item_in_notification_list(item);
            }
            if (item.parent_res_id && index == -1) {
                obj_this.active_parent_notification = item;
                obj_this.active_parent_notification.active = 1;
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
    SocketService.prototype.get_param = function (name, url) {
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

/***/ "./src/components/chat/chat.component.html":
/*!*************************************************!*\
  !*** ./src/components/chat/chat.component.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"notification-container\">\n    <link rel=\"stylesheet\" href=\"/assets/static/css/components/notification.css\">\n    <div class=\"main-user-navbar\">\n        <div class=\"mobile-chatroom nav-icon dropdown\">\n            <button *ngIf=\"!odoo_build\" (mouseup)=\"toggle_notifications($event)\"\n            class=\"showmouseawaybutton notification-icon\">\n                <i class=\"fas fa-bell\"></i>\n            </button>\n            <span *ngIf=\"odoo_build\" (mouseup)=\"toggle_notifications($event)\">\n                <i class=\"fas fa-bell\"></i>\n            </span>\n            <span class=\"un-read-msg\" *ngIf=\"socketService.notificationList.length > 0\">{{socketService.notificationList.length}}</span>\n        </div>\n    </div>\n    \n    <div class=\"container right-panel notification-list hidemouseaway\">\n        <div (click)=\"close_right_panel()\" class=\"chat-list-close\">\n            <i class=\"fas fa-times\"></i>\n        </div>\n        <ul *ngIf=\"!odoo_build\" class=\"chat-items list-group\">\n            <li *ngFor=\"let note of socketService.notificationList\">\n                <a *ngIf=\"note.counter > 0\"  class=\"list-group-item contact\"\n                    [ngClass]=\"[note.active ? 'online': '']\"\n                    routerLink=\"{{note.client_route}}\">\n                    <div style=\"display: contents;\" class=\"wrap\">\n                        {{ note.counter +' '+ note.content }}\n                    </div>\n                    <!-- <span style=\"right: 10px;position: absolute;\" *ngIf=\"socketService.active_parent_notification && socketService.active_parent_notification.id == note.id\" class=\"badge badge-success\">Opened</span> -->\n                </a>\n            </li>\n            <li *ngIf=\"socketService.notificationList == 0\" class=\"list-group-item contact\">\n                No New Notifications\n            </li>\n        </ul>\n        <ul *ngIf=\"odoo_build\" class=\"chat-items list-group\">\n            <li *ngFor=\"let note of socketService.notificationList\">\n                <a *ngIf=\"note.counter > 0\"  class=\"list-group-item contact\"\n                    [ngClass]=\"[note.active ? 'online': '']\"\n                    href=\"{{note.client_route}}\">\n                    <div style=\"display: contents;\" class=\"wrap\">\n                        {{ note.counter +' '+ note.content }}\n                    </div>\n                    <!-- <span style=\"right: 10px;position: absolute;\" *ngIf=\"socketService.active_parent_notification && socketService.active_parent_notification.id == note.id\" class=\"badge badge-success\">Opened</span> -->\n                </a>\n            </li>\n            <li *ngIf=\"socketService.notificationList == 0\" class=\"list-group-item contact\">\n                No New Notifications\n            </li>\n        </ul>\n    </div>\n</div>\n"

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
        }),
        __metadata("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"],
            _app_http_service__WEBPACK_IMPORTED_MODULE_3__["HttpService"],
            _app_socket_service__WEBPACK_IMPORTED_MODULE_1__["SocketService"]])
    ], ChatComponent);
    return ChatComponent;
}());



/***/ }),

/***/ "./src/components/comments/comments.component.html":
/*!*********************************************************!*\
  !*** ./src/components/comments/comments.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"comments\" class=\"comments main-container oe_read_only\">\n    <link rel=\"stylesheet\" href=\"/assets/static/css/components/comments.css\">\n\t<div class=\"row\">\n\t\t<div class=\"btn-group col-sm-12\">\n\t\t\t<button [ngClass]=\"{active: comment_subtype === 1}\" (click)=\"comment_subtype=1\" class=\"btn btn-default btn-block\">\n\t\t\t\tComments\n\t\t\t</button>\n\t\t\t<button [ngClass]=\"{active: comment_subtype === 2}\" (click)=\"comment_subtype=2\" class=\"btn btn-default btn-block\">\n\t\t\t\tPersonal Notes\n\t\t\t</button>\n\t\t</div>\n\t</div>\n\t<div class=\"row\">\n\t\t<form class=\"col-lg-12\" style=\"padding-top:15px; padding-bottom:15px\">\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<div *ngIf=\"comment_subtype === 1\">\n\t\t\t\t\t<textarea name=\"hj\" [(ngModel)]=\"new_comment\" (keyup)=\"save_comment_key_up($event, null)\" class=\"form-control\" rows=\"4\" id=\"comment\" placeholder=\"Add comments here.\"></textarea>\n\t\t\t\t</div>\n\t\t\t\t<div *ngIf=\"comment_subtype === 2\">\n\t\t\t\t\t<textarea name=\"hj\" [(ngModel)]=\"new_comment\" (keyup)=\"save_comment_key_up($event, null)\" class=\"form-control\" rows=\"4\" id=\"notes\" placeholder=\"Add notes here\"></textarea>\n\t\t\t\t</div>\n\t\t\t\t<button [disabled]=\"!new_comment\" class=\"btn btn-primary\" type = \"submit\" (click)=\"save_comment(null)\" >Post</button>\n\t\t\t</div>\n\t\t</form>\n    </div>\n    \n\t<div *ngIf=\"comment_subtype == 1\" class=\"container comments comments-container\">\n\t\t<div *ngFor=\"let c of comments\">\n\t\t\t<div id=\"{{c.id}}\" *ngIf=\"c\" class=\"row comment\">\n\t\t\t\t<div class=\"container\">\n\t\t\t\t\t<div class=\"row mainthread\">\n\t\t\t\t\t\t<span class=\"comment-user\" *ngIf=\"c.user\">{{c.user.name}} : </span>\n                        <div class=\"comment-body\">\n                            <pre [innerHtml]=\"c.body.trim()\"></pre>\n                        </div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row comment_response main\">\n\t\t\t\t\t\t<span>{{c.create_date | date:'medium' }}</span>&nbsp;&nbsp;\n\t\t\t\t\t\t<!-- <a *ngIf=\"0 && c.user.uid == myID\" title=\"Delete comment\" (click)=\"deleteComment(c.id, 'comment')\" >\n\t\t\t\t\t\t\t<i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\n\t\t\t\t\t\t</a> -->\n\t\t\t\t\t\t<a title=\"Add reply\" (click)=\"commentReply(c)\">\n\t\t\t\t\t\t\t<i class=\"fa fa-reply\" aria-hidden=\"true\"></i>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t\t<div class=\"label replies-wrapper\" title=\"Replies\" *ngIf=\"c.children && c.children.length\">\n\t\t\t\t\t\t\t<div (click)=\"showReplies(c.id)\">\n\t\t\t\t\t\t\t\t<span *ngIf=\"!c['showRep']\"><i class=\"fa fa-angle-down\"></i></span>\n\t\t\t\t\t\t\t\t<span *ngIf=\"c['showRep']\"><i class=\"fa fa-angle-up\"></i></span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"reply-input\">\n\t\t\t\t\t<div *ngIf=\"c.active\" class=\"reply-textarea-conatiner\">\n\t\t\t\t\t\t<textarea (keyup)=\"save_comment_key_up($event, c)\" [(ngModel)]=\"new_reply\"  class=\"form-control reply-box\" rows=\"4\" id=\"reply\" placeholder=\"type here . . .\"></textarea>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"reply container\" *ngIf=\"c.children && c.children.length\">\n\n\t\t\t\t\t\t<div *ngIf=\"c['showRep']\">\n\t\t\t\t\t\t\t<div class=\"container oform\" *ngFor=\"let rep of c.children\">\n\t\t\t\t\t\t\t\t<div class=\"row reply message\">\n\t\t\t\t\t\t\t\t\t<span class=\"comment-user\" *ngIf=\"rep.user\">{{rep.user.name}} : </span>\n                                    <div class=\"comment-body\">\n                                        <pre [innerHtml]=\"rep.body.trim()\"></pre>\n                                    </div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"row comment_response\">\n\t\t\t\t\t\t\t\t\t<span>{{c.create_date | date:'medium' }} </span>&nbsp;&nbsp;\n\t\t\t\t\t\t\t\t\t<!-- <a title=\"Delete comment\" (click)=\"deleteComment(rep.id, c.id)\">\n\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\n\t\t\t\t\t\t\t\t\t</a> -->\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div *ngIf=\"comment_subtype == 2\" class=\"container notes comments-container\">\n\t\t<div *ngFor=\"let c of notes\">\n\t\t\t<div *ngIf=\"c\" class=\"row\">\n\t\t\t\t<div class=\"container\">\n\t\t\t\t\t<div class=\"row mainthread\">\n\t\t\t\t\t\t<span class=\"comment-user\" *ngIf=\"c.user\">{{c.user.name}} : </span>\n                        <div class=\"comment-body\">\n                            <pre [innerHtml]=\"c.body.trim()\"></pre>\n                        </div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"row comment_response main\">\n\t\t\t\t\t\t<span>{{c.create_date | date:'medium'}} </span>\n\t\t\t\t\t\t<!--<a title=\"Delete Note\" (click)=\"deleteComment(c.id,  'note')\" style=\"cursor: pointer\">-->\n\t\t\t\t\t\t<!--<i class=\"fa fa-trash\" aria-hidden=\"true\"></i>-->\n\t\t\t\t\t\t<!--</a>-->\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n"

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
        var valid_mdels = ['calendar.event', 'meeting_point.voting'];
        if (input_data.res_model && valid_mdels.includes(input_data.res_model)) {
        }
        else {
            return;
        }
        var obj_this = this;
        obj_this.socketService.server_events['comment_received'] = function (data) {
            var container = $('.comments.main-container');
            if (container.length < 1) {
                return;
            }
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
    CommentsComponent.prototype.commentReply = function (comment) {
        this.new_reply = '';
        if (this.active_comment)
            this.active_comment.active = false;
        comment.active = true;
        this.active_comment = comment;
        setTimeout(function () {
            $('.reply-box:first').focus();
        }, 100);
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
        if (item.subtype_id == 2) {
            item['no_notify'] = 1;
            item['body'] = obj_this.new_comment;
            obj_this.notes.splice(0, 0, item);
            this.new_comment = '';
        }
        else {
            if (parent_item) {
                item['parent_id'] = parent_item.id;
                item['body'] = obj_this.new_reply;
                if (!Array.isArray(parent_item.children))
                    parent_item.children = [item];
                else
                    parent_item.children.push(item);
                this.new_reply = '';
                item['reply'] = 1;
            }
            else {
                item['body'] = obj_this.new_comment;
                obj_this.comments.splice(0, 0, item);
                this.new_comment = '';
                item['reply'] = false;
            }
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
            template: __webpack_require__(/*! ./comments.component.html */ "./src/components/comments/comments.component.html")
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"],
            _app_socket_service__WEBPACK_IMPORTED_MODULE_2__["SocketService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], CommentsComponent);
    return CommentsComponent;
}());



/***/ }),

/***/ "./src/components/committeedetails/commiteedetails.component.html":
/*!************************************************************************!*\
  !*** ./src/components/committeedetails/commiteedetails.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"main-div\">\n    <link rel=\"stylesheet\" href=\"assets/static/css/components/commiteedetails.css\">\n    <div class=\" breadcrumbSection\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-sm-12\">\n                    <ol class=\"breadcrumb\">\n                        <li class=\"breadcrumb-item\">\n                            <a routerLink=\"/committees\">\n                                Committees\n                            </a>\n                        </li>\n                        <li class=\"breadcrumb-item active\" *ngIf=\"committee\">{{committee.name}}</li>\n                    </ol>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div  class=\"cards container\">\n        <div class=\"page-links\">\n            <span class=\"prev next-prev-link\" title=\"Privious\">\n                <i class=\"fa fa-angle-left\"></i>\n            </span>\n            <span class=\"next next-prev-link\" title=\"Next\">\n                <i class=\"fa fa-angle-right\"></i>\n            </span>\n        </div>\n\n        <div class=\"container\">\n            <div *ngIf=\"committee\" class=\"deatils-form\">\n                <h2 class=\"heading-title\">\n                    <span>{{committee.name}}</span>\n                </h2>\n                <!-- <div class=\"row\">\n                        <div class=\"col-sm-4\" style=\"border-right: 1px solid #cccccc;\">\n                            <label>\n                                <b>Charter</b>\n                            </label>\n                        </div>\n                        <div class=\"col-sm-8\">\n                                <span [innerHtml]=\"committee.summary\"></span>\n                        </div>\n                </div> -->\n\n                <div  class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"kanban-committees col-xs-12 col-sm-6 col-md-4\" *ngFor=\"let member of committee.members\">\n                            <a class=\"kanban-committees-info-box\" routerLink=\"/profile/{{member.id}}\">\n                                <div class=\"kanban-profiles-user-img\">\n                                    <img title=\"{{member.name}}\" class=\"img-thumbnail-md\" src=\"{{member.image_small}}\">\n                                </div>\n                                <div class=\"kanban-profiles-user-info\">\n                                    <div class=\"kanban-profiles-user-name\">\n                                        {{member.name}}\n                                    </div>\n                                    <div *ngIf=\"member.email\" class=\"kanban-profiles-user-email\">\n                                        {{member.email}}\n                                    </div>\n                                </div>\n                            </a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <!-- <span title=\"Next\" *ngIf=\"next\" style=\"font-size: 72px; color: black;\" routerLink=\"/committees/{{next}}\">\n            <i class=\"fa fa-angle-right\"></i>\n        </span> \n        <span title=\"Previous\" *ngIf=\"prev\" style=\"font-size: 72px; color: black;\" routerLink=\"/committees/{{prev}}\">\n            <i class=\"fa fa-angle-left\"></i>\n        </span> -->\n    </div>\n</div>\n"

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
            template: __webpack_require__(/*! ./commiteedetails.component.html */ "./src/components/committeedetails/commiteedetails.component.html")
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"]])
    ], CommitteeDetailsComponent);
    return CommitteeDetailsComponent;
}());



/***/ }),

/***/ "./src/components/committees/committees.component.html":
/*!*************************************************************!*\
  !*** ./src/components/committees/committees.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-paginator></app-paginator>\n<div id=\"main-div\">\n    <link rel=\"stylesheet\" href=\"assets/static/css/components/committees.css\">\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"kanban-committees col-xs-12 col-sm-6 col-md-4\"\n                    *ngFor=\"let committee of committees\">\n                <a class=\"kanban-committees-info-box\" routerLink=\"/committees/{{committee.id}}\">\n                        <a class=\"kanban-committees-info-box-name\">\n                            {{committee.name}}\n                        </a>\n                    <div class=\"kanban-committees-info-box-img\">\n                        <a  *ngFor=\"let member of committee.members; let index = index\" routerLink=\"/profile/{{member.id}}\">\n                        <span *ngIf=\"index < 3\">\n                            <img title=\"{{member.name}}\" class=\"img-thumbnail-sm\" src=\"{{member.image_small}}\">\n                        </span>\n                        <span *ngIf=\"index === 3\">\n                            <b>. . .</b>\n                        </span>\n                        </a>\n                    </div>\n                    \n                </a>\n            </div>\n        </div>\n    </div>\n    <div class=\"jumbotron text-center\" *ngIf=\"no_committees\">\n        <h1>There are no Committees to show for now!</h1>\n        <hr>\n    </div>\n</div>\n"

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
            template: __webpack_require__(/*! ./committees.component.html */ "./src/components/committees/committees.component.html")
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

module.exports = "<div class=\"pdf-annotator\" id=\"annotated-doc-conatiner\" style=\"display:none;\">\n    <div class=\"toolbar topbar\" style=\"display:none\">\n        <a class=\"icon back\" title=\"Back\">\n            <img src=\"/assets/static/images/back.png\" style=\"border:1px solid silver\" height=\"28\">\n        </a>\n        \n        <div class=\"paginator\">\n            <span (click)=\"changePage(page_num-1)\" class=\"pager prev page-prev-btn\" disabled=\"\"><i _ngcontent-c1=\"\" class=\"fa fa-arrow-up\"></i></span>\n            <span (click)=\"changePage(page_num+1)\" class=\"pager next page-next-btn\" disabled=\"\"><i _ngcontent-c1=\"\" class=\"fa fa-arrow-down\"></i></span>\n\n            <input (change)=\"changePage(page_num)\" (blur)=\"changePage(page_num)\" (keyup.enter)=\"changePage(page_num)\" class=\"form-control\" [(ngModel)]=\"page_num\" type=\"number\" class=\"page-number\" value=\"1\">\n            <span>of <span class=\"page-count\">1</span></span>\n        </div>\n\n        <button class=\"strt_sign pdfjs btn-primary\" url='/meeting_point/save_signature_doc' style=\"display: none\">Sign</button>\n        <div style=\"margin-top: 12px;\">\n            <span style=\"display: none\" class=\"sign_completed pdfjs badge badge-success\">Signed</span>\n        </div>\n\n        <button class=\"cursor annotation_button\" type=\"button\" title=\"Cursor\" data-tooltype=\"cursor\">\n            <div class=\"Icon\">\n                <svg viewBox=\"0 0 24 24\" id=\"ic_select_black_24px\" width=\"100%\" height=\"100%\">\n                    <g fill=\"none\" fill-rule=\"evenodd\">\n                        <path d=\"M11.022 14.577l-2.92 1.047a1 1 0 0 1-1.33-1.036L7.817 3.465a1 1 0 0 1 1.701-.614l7.95 7.92a1 1 0 0 1-.37 1.651l-2.96 1.061 2.576 7.078a.996.996 0 0 1-.596 1.278l-1.23.448a.996.996 0 0 1-1.278-.596z\" fill=\"currentColor\"></path>\n                        <path d=\"M0 0h24v24H0z\"></path>\n                    </g>\n                </svg>\n            </div>\n        </button>\n\n        <button class=\"pen annotation_button\" type=\"button\" title=\"Pen Tool\" data-tooltype=\"draw\">\n            <div class=\"Icon\">\n                <svg viewBox=\"0 0 24 24\" id=\"ic_annotation_freehand_black_24px\" width=\"100%\" height=\"100%\">\n                    <g fill=\"none\" fill-rule=\"evenodd\">\n                        <path d=\"M0 0h24v24H0z\"></path>\n                        <path fill=\"currentColor\" d=\"M9.662 8.523l4.242-4.243 7.071 7.071-4.242 4.243a1 1 0 0 1-1.414 0L9.662 9.937a1 1 0 0 1 0-1.414zm-.707 2.121l5.656 5.657L9.6 18.807a1 1 0 0 1-1.154-.187l-1.81-1.81a1 1 0 0 1-.186-1.154zm-2.829 7.071l1.414 1.414c-1.32 1.037-2.144 1.39-2.474 1.06-.33-.33.023-1.154 1.06-2.474z\"></path>\n                    </g>\n                </svg>\n            </div>\n        </button>\n\n        <div class=\"PenSize pen-child annotation_button prop\">\n            <select class=\"pen-size\">\n                <option value=\"2\"> ▁▁▁▁▁▁▁▁ </option>\n                <option value=\"4\"> ▂▂▂▂▂▂▂▂ </option>\n                <option value=\"6\"> ▃▃▃▃▃▃▃▃ </option>\n                <option value=\"7\"> ▄▄▄▄▄▄▄▄▄ </option>\n                <option value=\"8\"> ▅▅▅▅▅▅▅▅ </option>\n                <option value=\"9\"> ▆▆▆▆▆▆▆▆ </option>\n                <option value=\"10\"> ▇▇▇▇▇▇▇▇ </option>\n            </select>\n        </div>\n        <div class=\"pen-color annotation_button prop\">            \n        </div>\n\n        \n        <button class=\"comment annotation_button\" style=\"padding-top: 0\" type=\"button\" title=\"Show all comments\">\n            <span class=\"Icon\">\n            <svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"25px\" height=\"25px\" viewBox=\"0 0 30 30\" style=\"enable-background:new 0 0 30 30;\" xml:space=\"preserve\">\n                <g>\n                    <g>\n                        <g>\n                            <path d=\"M28.023,23.309C29.258,22.154,30,20.675,30,19.061c0-3.688-3.877-6.679-8.659-6.679s-8.66,2.99-8.66,6.679\n                                    c0,3.688,3.877,6.681,8.66,6.681c1.511,0,2.931-0.3,4.166-0.824l3.153,1.608L28.023,23.309z M15.975,22.673\n                                    c-1.292-0.997-2.003-2.279-2.003-3.612c0-1.332,0.711-2.615,2.003-3.611c1.418-1.093,3.322-1.695,5.366-1.695\n                                    c2.043,0,3.949,0.603,5.366,1.695c1.292,0.996,2.003,2.279,2.003,3.611c0,1.333-0.711,2.615-2.003,3.612\n                                    c-1.417,1.093-3.323,1.693-5.366,1.693C19.297,24.368,17.393,23.766,15.975,22.673z\"></path>\n                            <g>\n                                <circle cx=\"18.27\" cy=\"19.081\" r=\"0.948\"></circle>\n                                <circle cx=\"21.34\" cy=\"19.081\" r=\"0.948\"></circle>\n                                <circle cx=\"24.413\" cy=\"19.081\" r=\"0.948\"></circle>\n                            </g>\n                        </g>\n                        <g>\n                            <path d=\"M5.268,19.437c-2.066-1.594-3.205-3.645-3.205-5.776c0-2.131,1.138-4.183,3.205-5.776\n                                    c2.267-1.748,5.315-2.711,8.583-2.711c3.269,0,6.316,0.963,8.583,2.711c1.564,1.207,2.598,2.676,3.006,4.243\n                                    c0.787,0.197,1.533,0.463,2.229,0.789c-0.496-5.553-6.492-9.939-13.817-9.939C6.201,2.978,0,7.761,0,13.661\n                                    c0,2.581,1.187,4.948,3.163,6.795l-2.691,6.566l6.715-3.995c1.774,0.752,3.786,1.214,5.926,1.3\n                                    c-0.576-0.705-1.018-1.48-1.296-2.309C9.331,21.704,7.056,20.816,5.268,19.437z\"></path>\n                        </g>\n                    </g>\n                </g>\n            </svg>\n        </span>\n        </button>\n        <button data-tooltype=\"point\" class=\"add-point-button annotation_button comment\" title=\"Add new comment point\">\n            <svg viewBox=\"0 0 24 24\" id=\"add-point\" width=\"100%\" height=\"100%\">\n                <g fill=\"none\" fill-rule=\"evenodd\">\n                    <path d=\"M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\" fill=\"white\" fill-rule=\"nonzero\"></path>\n                    <path d=\"M0 0h24v24H0z\"></path>\n                </g>\n            </svg>\n        </button>\n\n        \n        <button class=\"personal comment annotation_button\" type=\"button\" title=\"Show all Personal Note\" >\n            <div class=\"Icon\">\n                <svg width=\"28\" height=\"25\" x=\"461\" y=\"185\" data-pdf-annotate-id=\"e8114a67-e5e3-4bf3-be35-d25aa831f0e2\" data-pdf-annotate-type=\"point\" aria-hidden=\"true\" transform=\"scale(1) rotate(0) translate(0, 0)\">\n                    <rect width=\"25\" height=\"22\" x=\"1.962286\" y=\"1\" style=\"fill:white;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:1;stroke-opacity:1\"></rect>\n                    <rect width=\"18.4\" height=\"1.5012145\" x=\"5.8\" y=\"5\" style=\"fill:#000000;fill-opacity:1;stroke:none\"></rect>\n                    <rect width=\"18\" height=\"0.86\" x=\"6\" y=\"10\" style=\"fill:#000000;fill-opacity:1;stroke:none\"></rect>\n                    <rect width=\"18.4\" height=\"0.86\" x=\"5.8\" y=\"14\" style=\"fill:#000000;fill-opacity:1;stroke:none\"></rect>\n                    <rect width=\"18\" height=\"0.86\" x=\"6\" y=\"18\" style=\"fill:#000000;fill-opacity:1;stroke:none\"></rect>\n                </svg>\n            </div>\n        </button>\n        <button data-tooltype=\"point\" class=\"add-point-button annotation_button comment personal\" title=\"Add anew note\">\n            <svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\">\n                <g fill=\"none\" fill-rule=\"evenodd\">\n                    <path d=\"M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\" fill=\"white\" fill-rule=\"nonzero\"></path>\n                    <path d=\"M0 0h24v24H0z\"></path>\n                </g>\n            </svg>\n        </button>\n\n        <button class=\"zoomout\">\n            <div class=\"Icon\">\n                <svg viewBox=\"0 0 24 24\" id=\"ic_zoom_out_black_24px\" width=\"100%\" height=\"100%\">\n                    <g fill=\"none\" fill-rule=\"evenodd\">\n                        <path d=\"M7 11v2h10v-2zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\" fill=\"currentColor\" fill-rule=\"nonzero\"></path>\n                        <path d=\"M0 0h24v24H0z\"></path>\n                    </g>\n                </svg>\n            </div>\n        </button>\n        <div class=\"selectBox\">\n            <select class=\"scale\" disabled>\n                <option value=\"0.25\">25%</option>\n                <option value=\"0.5\">50%</option>\n                <option value=\"0.75\">75%</option>\n                <option value=\"1\">100%</option>\n                <option value=\"1.25\">125%</option>\n                <option value=\"1.5\">150%</option>\n                <option value=\"1.75\">175%</option>\n                <option value=\"2\">200%</option>\n                <option value=\"2.5\">250%</option>\n                <option value=\"3\">300%</option>\n                <option value=\"4\">400%</option>\n                <option value=\"5\">500%</option>\n            </select>\n        </div>\n\n        <button class=\"zoomin\">\n            <div class=\"Icon\">\n                <svg viewBox=\"0 0 24 24\" id=\"ic_zoom_in_black_24px\" width=\"100%\" height=\"100%\">\n                    <g fill=\"none\" fill-rule=\"evenodd\">\n                        <path d=\"M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\" fill=\"currentColor\" fill-rule=\"nonzero\"></path>\n                        <path d=\"M0 0h24v24H0z\"></path>\n                    </g>\n                </svg>\n            </div>\n        </button>\n        <a href=\"javascript://\" class=\"rotate-ccw\" title=\"Rotate Counter Clockwise\">\n            <div class=\"Icon\">\n                <svg viewBox=\"0 0 24 24\" id=\"ic_rotate_left_black_24px\" width=\"100%\" height=\"100%\">\n                    <g fill=\"none\" fill-rule=\"evenodd\">\n                        <path d=\"M7.11 8.53L5.7 7.11C4.8 8.27 4.24 9.61 4.07 11h2.02c.14-.87.49-1.72 1.02-2.47zM6.09 13H4.07c.17 1.39.72 2.73 1.62 3.89l1.41-1.42c-.52-.75-.87-1.59-1.01-2.47zm1.01 5.32c1.16.9 2.51 1.44 3.9 1.61V17.9c-.87-.15-1.71-.49-2.46-1.03zM13 4.07V1L8.45 5.55 13 10V6.09c2.84.48 5 2.94 5 5.91s-2.16 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93s-3.05-7.44-7-7.93z\" fill=\"currentColor\" fill-rule=\"nonzero\"></path>\n                        <path d=\"M0 0h24v24H0z\"></path>\n                    </g>\n                </svg>\n            </div>\n        </a>\n        <a href=\"javascript://\" class=\"rotate-cw\" title=\"Rotate Clockwise\">\n            <div class=\"Icon\">\n                <svg viewBox=\"0 0 24 24\" id=\"ic_rotate_right_black_24px\" width=\"100%\" height=\"100%\">\n                    <g fill=\"none\" fill-rule=\"evenodd\">\n                        <path d=\"M15.55 5.55L11 1v3.07C7.06 4.56 4 7.92 4 12s3.05 7.44 7 7.93v-2.02c-2.84-.48-5-2.94-5-5.91s2.16-5.43 5-5.91V10zM19.93 11a7.906 7.906 0 0 0-1.62-3.89l-1.42 1.42c.54.75.88 1.6 1.02 2.47zM13 17.9v2.02c1.39-.17 2.74-.71 3.9-1.61l-1.44-1.44c-.75.54-1.59.89-2.46 1.03zm3.89-2.42l1.42 1.41c.9-1.16 1.45-2.5 1.62-3.89h-2.02c-.14.87-.48 1.72-1.02 2.48z\" fill=\"currentColor\" fill-rule=\"nonzero\"></path>\n                        <path d=\"M0 0h24v24H0z\"></path>\n                    </g>\n                </svg>\n            </div>\n        </a>\n\n        <a (click)=\"toggleAnnotations()\" class=\"annot-toggler\" title=\"Hide/Show all annotations\">\n            <div class=\"Icon\">\n                <i *ngIf=\"!annot_hidden\" class=\"fa fa-eye-slash\" aria-hidden=\"true\"></i>\n                <i *ngIf=\"annot_hidden\" class=\"fa fa-eye\" aria-hidden=\"true\"></i>\n            </div>\n        </a>\n        <button *ngIf=\"active_parent_notification && active_parent_notification['counter'] > 0\" class=\"unread annotation_button\">\n            <span class=\"unread\">{{active_parent_notification.counter}}</span><span> Click to read</span>\n        </button>\n    </div>\n\n    <div id=\"viewer-wrapper\">\n        <div id=\"content-wrapper\">\n            <div id=\"viewer\" class=\"pdfViewer\"></div>\n        </div>\n        <div id=\"comment-wrapper\">\n            <div class=\"header comment-header\">\n                <span class=\"show-all-comments\">\n                    <i class=\"fa fa-times-circle\"></i>\n                </span>\n                <span class=\"title\">Comments</span>\n            </div>\n\n            <div class=\"comment-list\">\n                <div class=\"comment-list-container\">\n                    <div class=\"comment-list-item\">No comments</div>\n                </div>\n            </div>\n            <form class=\"comment-list-form\">\n                <textarea id=\"commentText\" placeholder=\"Add a Comment\"></textarea>\n            </form>\n        </div>\n        <!--<div id=\"notification-wrapper\">-->\n        <!--<div class=\"notification-list\">-->\n        <!--<div class=\"notification-list-container\">-->\n        <!--<div class=\"notification-list-item\">No Notifications</div>-->\n        <!--</div>-->\n        <!--</div>-->\n        <!--</div>-->\n    </div>\n\n    <div class=\"toolbar annotation-options ContextMenuPopup\">\n        <div class=\"Button icon\">\n            <button class=\"underline\" type=\"button\" title=\"underline\" data-tooltype=\"underline\">\n                <div class=\"Icon\">\n                    <svg viewBox=\"0 0 24 24\" id=\"ic_annotation_underline_black_24px\" width=\"100%\" height=\"100%\">\n                        <g fill=\"none\" fill-rule=\"evenodd\">\n                            <path fill=\"currentColor\" d=\"M14.308 14.321H9.684L8.804 17H6l4.765-13h2.444L18 17h-2.804zm-3.912-2.17h3.2l-1.61-4.865zM5 18.5h14v2H5z\"></path>\n                            <path d=\"M0 0h24v24H0z\"></path>\n                        </g>\n                    </svg>\n                </div>\n            </button>\n        </div>\n        <div class=\"Button icon\">\n            <button class=\"strikeout\" type=\"button\" title=\"strikeout\" data-tooltype=\"strikeout\">\n                <div class=\"Icon\">\n                    <svg viewBox=\"0 0 24 24\" id=\"ic_annotation_strikeout_black_24px\" width=\"100%\" height=\"100%\">\n                        <g fill=\"none\" fill-rule=\"evenodd\">\n                            <path fill=\"currentColor\" d=\"M9.521 16l-.717 3H6l1.021-3zm-1.139-4l2.383-7h2.444l2.395 7h-2.39l-1.227-3.714L10.772 12zm8.591 4L18 19h-2.804l-.725-3zM5 13h14v2H5z\"></path>\n                            <path d=\"M0 0h24v24H0z\"></path>\n                        </g>\n                    </svg>\n                </div>\n            </button>\n        </div>\n        <div class=\"Button icon\">\n            <button class=\"highlight\" type=\"button\" title=\"Highlight\" data-tooltype=\"highlight\">\n                <div class=\"Icon\">\n                    <svg viewBox=\"0 0 24 24\" id=\"ic_annotation_highlight_black_24px\" width=\"100%\" height=\"100%\">\n                        <g fill=\"none\" fill-rule=\"evenodd\">\n                            <path fill=\"currentColor\" d=\"M19 3c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2zm-4.947 12.341l.789 2.344h2.492L13.076 6.31h-2.172L6.67 17.685h2.492l.781-2.344zm-3.477-1.898l1.414-4.258 1.43 4.258z\"></path>\n                            <path d=\"M0 0h24v24H0z\"></path>\n                        </g>\n                    </svg>\n                </div>\n            </button>\n        </div>\n\n        <div class=\"Button icon\">\n            <button class=\"copy\" type=\"button\" title=\"Copy\" data-tooltype=\"copy\">\n                <div class=\"Icon\">\n                    <svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 34.555 34.555\" style=\"enable-background:new 0 0 34.555 34.555;\" xml:space=\"preserve\">\n                        <g>\n                            <g>\n                                <g>\n                                    <path d=\"M24.065,34.555H5.489c-1.379,0-2.5-1.122-2.5-2.5V7.864c0-1.378,1.121-2.5,2.5-2.5h2.364c0.276,0,0.5,0.224,0.5,0.5\n                                        s-0.224,0.5-0.5,0.5H5.489c-0.827,0-1.5,0.673-1.5,1.5v24.19c0,0.827,0.673,1.5,1.5,1.5h18.576c0.827,0,1.5-0.673,1.5-1.5v-2.365\n                                        c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5v2.365C26.565,33.433,25.444,34.555,24.065,34.555z\" />\n                                </g>\n                            </g>\n                            <g>\n                                <g>\n                                    <path d=\"M29.065,29.19H10.489c-1.379,0-2.5-1.122-2.5-2.5V2.5c0-1.378,1.121-2.5,2.5-2.5h13.604c0.276,0,0.5,0.224,0.5,0.5\n                                        S24.37,1,24.094,1H10.489c-0.827,0-1.5,0.673-1.5,1.5v24.19c0,0.827,0.673,1.5,1.5,1.5h18.576c0.827,0,1.5-0.673,1.5-1.5V7.661\n                                        c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5V26.69C31.565,28.069,30.444,29.19,29.065,29.19z\" />\n                                    <path d=\"M31.065,8.161h-6.972c-0.276,0-0.5-0.224-0.5-0.5V0.688c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5v6.473h6.472\n                                        c0.276,0,0.5,0.224,0.5,0.5S31.342,8.161,31.065,8.161z\" />\n                                    <path d=\"M31.065,8.161c-0.13,0-0.26-0.051-0.358-0.151l-6.972-7.161c-0.192-0.198-0.188-0.514,0.01-0.707\n                                        c0.197-0.191,0.516-0.187,0.707,0.01l6.972,7.161c0.192,0.198,0.188,0.514-0.01,0.707C31.317,8.114,31.191,8.161,31.065,8.161z\" />\n                                </g>\n                            </g>\n                        </g>\n                    </svg>\n                </div>\n            </button>\n        </div>\n\n    </div>\n\n    <div class=\"update-comment ContextMenuPopup\">\n        <div class=\"Button icon\">\n            <button class=\"edit\" type=\"button\">\n                <div class=\"Icon\">\n                    Edit\n                </div>\n            </button>\n        </div>\n        <div class=\"Button icon\">\n            <button class=\"delete\" type=\"button\">\n                <div class=\"Icon\">\n                    Delete\n                </div>\n            </button>\n        </div>\n    </div>\n\n    <div class=\"Popup ColorPalettePopup hidemouseaway ContextMenuPopup colors\">\n        <div class=\"Popup StylePopup\">\n            <div class=\"row\">\n                <div class=\"cell colored\" hex=\"#000000\" rgb=\"rgb(0,0,0)\" style=\"background-color: rgb(0,0,0);\">\n                    <div id=\"applied_color\" class=\"Icon check-mark dark\" viewBox=\"0 0 24 24\">\n                        <svg viewBox=\"0 0 24 24\" id=\"ic_check_black_24px\" width=\"100%\" height=\"100%\">\n                            <g fill=\"none\" fill-rule=\"evenodd\">\n                                <path d=\"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z\" fill=\"currentColor\" fill-rule=\"nonzero\"></path>\n                                <path d=\"M0 0h24v24H0z\"></path>\n                            </g>\n                        </svg>\n                    </div>\n                </div>\n                <div class=\"cell colored\" hex=\"#FFFFFF\" rgb=\"rgb(255,255,255)\" style=\"background-color: rgb(255,255,255);\"></div>\n                <div class=\"cell colored\" hex=\"#FF0000\" rgb=\"rgb(255,0,0)\" style=\"background-color: rgb(255,0,0);\"></div>\n                <div class=\"cell colored\" hex=\"#00FF00\" rgb=\"rgb(0,255,0)\" style=\"background-color: rgb(0,255,0)\"></div>\n            </div>\n            <div class=\"row\">\n                <div class=\"cell colored\" hex=\"#0000FF\" rgb=\"rgb(0,0,255)\" style=\"background-color: rgb(0,0,255);\"></div>\n                <div class=\"cell colored\" hex=\"#FFFF00\" rgb=\"rgb(255,255,0)\" style=\"background-color: rgb(255,255,0);\"></div>\n                <div class=\"cell colored\" hex=\"#00FFFF\" rgb=\"rgb(0,255,255)\" style=\"background-color: rgb(0,255,255);\"></div>\n                <div class=\"cell colored\" hex=\"#FF00FF\" rgb=\"rgb(255,0,255)\" style=\"background-color: rgb(255,0,255);\"></div>\n\n            </div>\n            <div class=\"row\">\n                <div class=\"cell colored\" hex=\"#C0C0C0\" rgb=\"rgb(192,192,192)\" style=\"background-color: rgb(192,192,192);\"></div>\n                <div class=\"cell colored\" hex=\"#808080\" rgb=\"rgb(128,128,128)\" style=\"background-color: rgb(128,128,128);\"></div>\n                <div class=\"cell colored\" hex=\"#00cc63\" rgb=\"rgb(128,0,0)\" style=\"background-color: rgb(0, 204, 99);\"></div>\n                <div class=\"cell colored\" hex=\"#808000\" rgb=\"rgb(128,128,0)\" style=\"background-color: rgb(128,128,0);\"></div>\n            </div>\n            <div class=\"row\">\n                <div class=\"cell colored\" hex=\"#008000\" rgb=\"rgb(0,128,0)\" style=\"background-color: rgb(0,128,0);\"></div>\n                <div class=\"cell colored\" hex=\"#800080\" rgb=\"rgb(128,0,128)\" style=\"background-color: rgb(128,0,128);\"></div>\n                <div class=\"cell colored\" hex=\"#008080\" rgb=\"rgb(0,128,128)\" style=\"background-color: rgb(0,128,121);\"></div>\n                <div class=\"cell colored\" hex=\"#000080\" rgb=\"rgb(0,0,128)\" style=\"background-color: rgb(0,0,128);\"></div>\n            </div>\n        </div>\n    </div>\n</div>\n"

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
        var prefix = '/assets/static/annotator';
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
        if (!window["odoo"]) {
            libs += '<script src="/assets/static/libs/js/jquery.mark.min.js"></script>';
            libs += '<script src="/assets/static/libs/js/mark.min.js"></script>';
        }
        libs += '<script src="' + prefix + '/js/main.js"></script>';
        libs += '<script src="' + prefix + '/js/annotator.js"></script>';
        $(libs_container).removeAttr('uninitialized');
        $(libs_container).append(libs);
    };
    DocumentComponent.prototype.loadDoc = function () {
        var obj_this = this;
        window['show_annotation'] = false;
        window['functions'].showLoader('loaddocwaiter');
        setTimeout(function () {
            var libs_container = $('#pdf-libs-conatiner');
            if (libs_container.length == 0) {
                console.log("Could not find #pdf-libs-container");
                return;
            }
            if (libs_container.attr('uninitialized')) {
                obj_this.loadLibs(libs_container);
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
            var _model = $('.doc_view_form .dn_documents_doc_path').html();
            var _id = $('.doc_view_form .dn_doc_id').html();
            doc_id = _id;
            if (_model == "meeting_point.doc") {
                doc_type = "meeting";
            }
            if (_model == "meeting_point.topicdoc") {
                doc_type = "topic";
            }
            if (_model == "meeting_point.files") {
                doc_type = "resource";
            }
            if (_model == "meeting_point.news.doc") {
                doc_type = "home";
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
            else if (doc_type == 'resource') {
                res_model = 'meeting_point.files';
            }
        }
        function ativate_notification() {
            var active_notification = undefined;
            var list = obj_this.socketService.notificationList;
            for (var id in list) {
                if (list[id].res_id == doc_id && list[id].res_model == res_model) {
                    list[id].active = 1;
                    active_notification = list[id];
                    active_notification.active = 1;
                    break;
                }
            }
            obj_this.active_parent_notification = obj_this.socketService.active_parent_notification = active_notification;
            obj_this.socketService.current_id = doc_id;
            obj_this.socketService.current_model = res_model;
        }
        if (obj_this.socketService.verified) {
            ativate_notification();
        }
        else
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
            //console.log("No doc_type");
            return;
        }
        obj_this.httpService.call_post_http(req_url, input_data, fetchDocData, null);
    };
    DocumentComponent.prototype.ngOnInit = function () {
        var obj_this = this;
        var content = $("#content-wrapper");
        var results;
        var currentClass = "current";
        var offsetTop = 50;
        var currentIndex = 0;
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

module.exports = "<link rel=\"stylesheet\" href=\"/assets/static/css/login.css\" />\n<div id=\"main-div\" style=\"display:none\" class=\"Login-form-wrapper\">\n\t<div *ngIf=\"!sent\" class=\"login-form-div\">\n        <form>\n                <div class=\"form-group\">\n                        <input \n                            name=\"email\"\n                            id=\"username\"\n                               placeholder=\"Email\"\n                               type=\"email\"\n                               class=\"form-control\"\n                               [(ngModel)]=\"email\"\n                               (keyup)=\"email_validation()\"\n                               (blur)=\"email_validation()\"\n                               [ngClass]=\"{ 'is-invalid': !valid }\" />\n            \n                        <div *ngIf=\"!first && !valid\" class=\"invalid-feedback\">\n                            <div *ngIf=\"email == ''\">Email is required</div>\n                            <div *ngIf=\"email != ''\">Incorrect email</div>\n                        </div>\n                    </div>\n                    <div class=\"form-group text-left\">\n                        <button [disabled]=\"!valid\" class=\"login-btn\" (click)=\"onSubmit()\">Submit</button>\n                        <img *ngIf=\"loading\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\" />\n                        <a class=\"forgot\" routerLink=\"/login\">Back to login</a>\n                    </div>\n                    <div *ngIf=\"error\" class=\"alert alert-danger\">{{error}}</div>\n        </form>\n\t\t\n\t</div>\n</div>\n\n<div *ngIf=\"sent\" style=\"position: fixed;top: 20%;width: 100%;\" class=\"jumbotron\">\n\t<span>An email has been sent to <h3><b>{{email}}</b></h3><br>\n        Please check your email, Thanks!</span>\n        <a style=\"font-size: 14px;font-weight: bold;margin-left: 10px;\"\n        routerLink=\"/login\">Back to login</a>\t\n</div>\n"

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
        var obj_this = this;
        var req_url = '/password-reset-email';
        var input_data = {
            login: this.email,
            no_login: 1,
        };
        var success_cb = function (result) {
            obj_this.sent = true;
        };
        var failure_cb = function (error) {
            obj_this.error = error;
        };
        this.httpService.call_post_http(req_url, input_data, success_cb, failure_cb);
    };
    ForgotpasswordComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-forgotpassword',
            template: __webpack_require__(/*! ./forgotpassword.component.html */ "./src/components/forgotpassword/forgotpassword.component.html")
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _app_http_service__WEBPACK_IMPORTED_MODULE_3__["HttpService"]])
    ], ForgotpasswordComponent);
    return ForgotpasswordComponent;
}());



/***/ }),

/***/ "./src/components/header/header.component.html":
/*!*****************************************************!*\
  !*** ./src/components/header/header.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"header-container\">\n    <link rel=\"stylesheet\" href=\"assets/static/css/components/header.css\">\n    <div *ngIf=\"!socketService.iframe_url && socketService.user_data\">\n        <div class=\"headerheight\"></div>\n        <div *ngIf=\"socketService.user_data\" class=\"header-fixed\">    \n            <button class=\"navbar-toggler showmouseawaybutton\">        \n                <span class=\"fa fa-bars\"></span>\n            </button>\n            <div class=\"main-nav-header\">\n                <div class=\"brand-logo\">\n                    <a routerLink=\"/\">\n                        <img src=\"/assets/static/images/meetvue-logo.svg\">\t\t\t\n                    </a>\n                </div>\n    \n                <nav class=\"navbar MainHeader\">\n                    <div class=\"navbarNavDropdown hidemouseaway\">\n                        <ul class=\"navbar-nav main-nav\">\n                            <li class=\"nav-item\">\n                                <h3>\n                                    Meeting\n                                </h3>\n                                <div class=\"dropdown-menu-list\" aria-labelledby=\"navbarDropdownMenuLink\">\n                                    <a class=\"nav-sub-link\" routerLink=\"/meetings/upcoming\"><i class=\"fa fa-table\"></i> Upcoming</a>\n                                    <a class=\"nav-sub-link\" routerLink=\"/meetings/completed\"><i class=\"fas fa-calendar-check\"></i> Completed</a>\n                                    <a class=\"nav-sub-link\" routerLink=\"/meetings/archived\"><i class=\"fa fa-archive\"></i> Archived</a>\n                                </div>\n                            </li>\n                            <li class=\"nav-item\">\n                                <a class=\"nav-link\" routerLink=\"/resources\"><i class=\"fa fa-folder-open\"></i> Resources</a>\n                            </li>\n                            <li class=\"nav-item\">\n                                <a class=\"nav-link\" routerLink=\"/profiles\"><i class=\"fa fa-user-circle\"></i> Profiles</a>\n                            </li>\n                            <li class=\"nav-item\">\n                                <a class=\"nav-link\" routerLink=\"/committees\"><i class=\"fas fa-user-friends\"></i> Committees</a>\n                            </li>\n                            <!-- <li class=\"nav-item\">\n                                <a class=\"nav-link\" routerLink=\"/jitsilow\"><i class=\"fas fa-video\"></i> Video Calls</a>\n                            </li> -->\n                        </ul>\n                    </div>\n                </nav>\n            </div>\n            \n            <div class=\"main-user-navbar\">\n                <div class=\"searchheader-icon nav-icon\">\n                    <button id=\"search-btn\"><i class=\"fas fa-search\"></i></button>\n                </div>\n                <div class=\"nav-icon\" (click)=\"change_cursor()\">\n                    <span class=\"cursor_chooser\"><i class=\"fas fa-hand-pointer\" id=\"cursor_chooser\"></i></span>\n                    <canvas id=\"cursor_canvas\" width=\"20\" height=\"20\" style=\"display:none\" ></canvas>\n                </div>\n                <!-- <div class=\"mobile-chatroom nav-icon dropdown\">\n                    <button routerLink=\"/messenger\" class=\"showmouseawaybutton notification-icon\">\n                        <i class=\"fas fa-comment\"></i>\n                    </button>\n                    <span class=\"un-read-msg\" *ngIf=\"socketService.unseen_messages !=0 \">{{socketService.unseen_messages}}</span>\n                </div> -->\n                <app-messageicon></app-messageicon>\n                <!-- <app-messenger></app-messenger> -->\n                <app-chat></app-chat>\n                <div class=\"navbar-profile-menu dropdown\">\n                    <button class=\"profile-icon showmouseawaybutton\" (click)=\"show_profile_menu($events)\">\n                        <span class=\"header-user-name\">{{socketService.user_data.name}}</span>\n                        <img id=\"navbar-profile-img\" class=\"img-thumbnail-sm\" src=\"{{socketService.user_data.photo}}\">\n                    </button>\n                    <div class=\"profile-menu dropdown-menu hidemouseaway\">\n                        <a class=\"dropdown-item\" routerLink=\"/my-profile\">\n                            <div class=\"drop-down-user\">\n                                <img class=\"img-thumbnail-sm\" src=\"{{socketService.user_data.photo}}\">\n                                <h5>{{socketService.user_data.name}}</h5>\n                            </div>\n                        </a>\n                        <hr>\n                        <a class=\"dropdown-item\" routerLink=\"/settings\"><i class=\"fa fa-cogs\"></i> Change Password</a>\n                        <a id='logout_link' (click)=\"logout()\" class=\"dropdown-item\"><i class=\"icon-logout\"></i> Logout</a>\n                    </div>\n                </div>        \n            </div>\n            \n            <div class=\"searchbar-full-width\" style=\"display: none;\">\n                <div class=\"lowerheader input-group\">\n                    <input id=\"search-box\" type=\"text\"\n                        pattern=\"[a-zA-Z ]*\"\n                        [(ngModel)]=\"search_key_word\"\n                        (keyup.enter)=\"search()\"\n                        placeholder=\"Search\"  aria-expanded=\"false\" class=\"form-control\" />\n    \n                    <div class=\"input-group-append\">\n                            <span class=\"input-group-text\">\n                                <input [(ngModel)]=\"is_content_search\" type=\"checkbox\" aria-label=\"Checkbox for following text input\">\n                                <span style=\"margin-left: 10px;\">In FIles</span>\n                            </span>\n                        <span class=\"input-group-text\">\n                                <button (click)=\"search()\" class=\"btn btn-secondary\" type=\"button\">\n                                    <i class=\"fa fa-search\"></i>\n                                </button>\n                            </span>\n                    </div>\n    \n                </div>\n            </div>\n        </div>\n    \n        <div *ngIf=\"show_search_results\">\n            <div class=\"show_search_results\">\n                <div *ngIf=\"no_search\" class=\"no-search\">\n                    <h1>No Result Found!</h1>\n                </div>\n                <div class=\"close-button\" (click)=\"show_search_results = false; search_key_word = '';\">\n                    <i class=\"fa fa-times\"></i>\n                </div>\n                <div *ngIf=\"!no_search\" class=\"container\">\n                    <h3 *ngIf=\"is_content_search\" style=\"color: #696969\">Search Results Based on Content of Documents.</h3>\n                    <div *ngIf=\"!content_search\" class=\"row search-box-wrapper\">\n                        <div *ngIf=\"search_results.users.length\" class=\"col-sm\">\n                            <div class=\"result-box-info\">\n                                <h2>Moderators</h2>\n                                <h3 *ngFor=\"let item of search_results.users\">\n                                    <a (click)=\"show_search_results = false;\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                                </h3>\n                            </div>\n                        </div>\n                        <div *ngIf=\"search_results.meetings.length\" class=\"col-sm\">\n                            <div class=\"result-box-info\">\n                                <h2>Meetings</h2>\n                                <h3 *ngFor=\"let item of search_results.meetings\">\n                                    <a (click)=\"show_search_results = false;\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                                </h3>\n                            </div>\n                        </div>\n                        <div *ngIf=\"search_results.committees.length\" class=\"col-sm\">\n                            <div class=\"result-box-info\">\n                                <h2>Committees</h2>\n                                <h3 *ngFor=\"let item of search_results.committees\">\n                                    <a (click)=\"show_search_results = false;\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                                </h3>\n                            </div>\n                        </div>\n                        <div *ngIf=\"search_results.resources.length\" class=\"col-sm\">\n                            <div class=\"result-box-info\">\n                                <h2>Resources</h2>\n                                <h3 *ngFor=\"let item of search_results.resources\">\n                                    <a (click)=\"show_search_results = false;\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                                </h3>\n                            </div>\n                        </div>\n                        <div *ngIf=\"search_results.topics.length\" class=\"col-sm\">\n                            <div class=\"result-box-info\">\n                                <h2>Topics</h2>\n                                <h3 *ngFor=\"let item of search_results.topics\">\n                                    <a (click)=\"show_search_results = false;\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                                </h3>\n                            </div>\n                        </div>\n                        <div *ngIf=\"search_results.documents.length\" class=\"col-sm\">\n                            <div class=\"result-box-info\">\n                                <h2>Documents</h2>\n                                <h3 *ngFor=\"let item of search_results.documents\">\n                                    <a (click)=\"show_search_results = false;\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                                </h3>\n                            </div>\n                        </div>\n                    </div>\n                    <div *ngIf=\"content_search\" class=\"row\">\n                        <div *ngIf=\"search_results.signature_doc.length\" class=\"col-sm\">\n                            <div class=\"result-box-info\">\n                                <h2>Documents for Signature</h2>\n                                <h3 *ngFor=\"let item of search_results.signature_doc\">\n                                    <a (click)=\"show_search_results = false;\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                                </h3>\n                            </div>\n                        </div>\n                        <div *ngIf=\"search_results.meeting_doc.length\" class=\"col-sm\">\n                            <div class=\"result-box-info\">\n                                <h2>Meeting Documents</h2>\n                                <h3 *ngFor=\"let item of search_results.meeting_doc\">\n                                    <a (click)=\"show_search_results = false;\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                                </h3>\n                            </div>\n                        </div>\n                        <div *ngIf=\"search_results.topic_doc.length\" class=\"col-sm\">\n                            <div class=\"result-box-info\">\n                                <h2>Documents in Topics</h2>\n                                <h3 *ngFor=\"let item of search_results.topic_doc\">\n                                    <a (click)=\"show_search_results = false;\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                                </h3>\n                            </div>\n                        </div>\n                        <div *ngIf=\"search_results.resourse_doc.length\" class=\"col-sm\">\n                            <div class=\"result-box-info\">\n                                <h2>Documents in Resources</h2>\n                                <h3 *ngFor=\"let item of search_results.resourse_doc\">\n                                    <a (click)=\"show_search_results = false;\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                                </h3>\n                            </div>\n                        </div>\n                        <div *ngIf=\"search_results.home_doc.length\" class=\"col-sm\">\n                            <div class=\"result-box-info\">\n                                <h2>Home Page Documents</h2>\n                                <h3 *ngFor=\"let item of search_results.home_doc\">\n                                    <a (click)=\"show_search_results = false;\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                                </h3>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

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
            template: __webpack_require__(/*! ./header.component.html */ "./src/components/header/header.component.html")
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _app_socket_service__WEBPACK_IMPORTED_MODULE_2__["SocketService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"]])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/components/home/home.component.html":
/*!*************************************************!*\
  !*** ./src/components/home/home.component.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<link rel=\"stylesheet\" href=\"assets/static/css/components/home.css\" />\n<div id=\"main-div\" class=\"home-container\" *ngIf=\"ng_init\">        \n    <div class=\"home\">\n        <div class=\"container\">\n            <div id=\"collapsibleNavbar\">\n                <button (click)=\"show_welcom(0)\" class=\"active\">\n                    <i class=\"far fa-handshake\"></i>\n                    <span>Welcome</span>\n                </button>\n                <button (click)=\"show_calendar(1)\">\n                    <i class=\"fa fa-calendar\"></i>\n                    <span>Calendar</span>\n                </button>\n                <button class=\"to-do-alram\" (click)=\"show_to_do(2)\" >                    \n                    <i class=\"fa fa-bell\"><span *ngIf=\"to_do_count>0\" class=\"to-do-count\">{{to_do_count}}</span></i>\n                    <span>To-Do Items</span>\n                </button>\n            </div>\n        </div>\n    </div>\n\n    <!--Welcome-->\n    <div *ngIf=\"welcome\" id=\"welcome\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-sm WelcomeContent\">\n                    <h4 class=\"HomeTitle\">\n                        <span>{{home_data.title}}</span>\n                    </h4>\n                    <div class=\"HomePageDiscription\">\n                        <div *ngIf=\"home_data.description\" class=\"HomePageContentText\">\n                                <div class=\"HomePageContentImg\">                        \n                                        <img width=\"100%\" src=\"{{home_data.photo}}\">\n                                    </div>\n                            <div id=\"home-content\" [innerHtml]=\"home_data.description\"></div>\n                        </div>\n                        \n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div style=\"padding: 10%\" *ngIf=\"!home_data.title && !home_data.description\">\n            <h1>WELCOME<br>TO MeetVUE</h1>\n        </div>\n\n        <section *ngIf=\"home_data.doc_ids && home_data.doc_ids.length\" class=\"HomepageDocumentSection\">\n            <div class=\"container\">\n                <div class=\"row\">\n                    <div class=\"col-sm-12\">\n                        <h4>\n                            <b>Documents</b>\n                        </h4>\n                        <br>\n                    </div>\n                    <div class=\"col-sm-12\">\n                        <div class=\"row\">\n                            <a class=\"col-sm-6 col-md-4 col-lg-3\" routerLink=\"/home/doc/{{doc.id}}\" *ngFor=\"let doc of home_data.doc_ids\">\n                                <div class=\"DocumentWrapper\">\n                                    <div class=\"DocIcon\">\n                                            <!-- doc_type='home' doc_id='{{doc.id}}' -->\n                                        <i class=\"fa fa-file\"></i>\n                                    </div>\n                                    <div class=\"DocText\">{{doc.name}}</div>\n                                </div>\n                            </a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </section>\n\n        <div *ngIf=\"home_data.video_ids && home_data.video_ids.length\" class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-sm-12\">\n                    <h4>\n                        <b>Videos</b>\n                    </h4>\n                    <br>\n                </div>\n                <div class=\"col-sm-12\">\n                    <div class=\"row\">                        \n                        <div class=\"video thumbnail col-sm-6 col-md-4 col-lg-3\" *ngFor=\"let video of home_data.video_ids\">\n                            <h5 class=\"docname\">{{video.name}}</h5>\n                            <iframe class=\"docThumbnail\" frameborder=\"0\" [src]=\"video.url\"></iframe>\n                            <div class=\"videoOverLayWrapper\" (click)=\"view_video(video.name, video.original_url)\"></div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <!--Calander-->\n    <section class=\"CalendarWrapper\">\n        <div id=\"calendar\"></div>\n        <div id=\"event-summary\" style=\"display:none;\">\n            <div class=\"event-card\">\n                <table class=\"o_group o_inner_group\">\n                    <tbody>\n                        <tr>\n                            <td>\n                                <label >Title</label>\n                            </td>\n                            <td><span name=\"name\">Meeting Title</span></td>\n                        </tr>\n                        <tr>\n                            <td>\n                                <label >Starting at</label>\n                            </td>\n                            <td><span name=\"start\">10/24/2018 08:00:00</span></td>\n                        </tr>\n                        <tr>\n                            <td>\n                                <label >Ending at</label>\n                            </td>\n                            <td><span name=\"stop\">10/24/2018 16:00:00</span></td>\n                        </tr>\n                        <tr>\n                            <td>\n                                <label>Duration</label>\n                            </td>\n                            <td><span name=\"duration\">08:00</span></td>\n                        </tr>\n                        <tr>\n                            <td>\n                                <label>Video Call Link</label>\n                            </td>\n                            <td>\n                                <span name=\"video_call_link\">\n                                    <a class=\"video_call_link\" href=\"\">Video Call</a>\n                                </span>\n                            </td>\n                        </tr>\n                        <tr>\n                            <td>\n                                <label>Conference Bridge No.</label>\n                            </td>\n                            <td><span name=\"conference_bridge_number\">123-456-7890</span></td>\n                        </tr>\n                        <tr>\n                            <td>\n                                <label>Meeting PIN</label>\n                            </td>\n                            <td><span name=\"pin\">1234567989</span></td>\n                        </tr>\n                        <tr>\n                            <td>\n                                <label>Location</label>\n                            </td>\n                            <td><span name=\"location\">London</span></td>\n                        </tr>\n                    </tbody>\n                </table>\n                <div class=\"upcomingButton\">\n                    <button class=\"btn btn-primary\">\n                        <span name=\"accepted\">Accept</span>\n                    </button>\n                    <button class=\"btn btn-primary\">\n                        <span name=\"declined\">Decline</span>\n                    </button>\n                    <button class=\"btn btn-primary\">\n                        <span name=\"tentative\">Tentative</span>\n                    </button>\n                </div>\n            </div>\n        </div>\n    </section>\n\n    <!--To Do-->\n    <div class=\"container\">\n        <div id=\"to-do\" style=\"display:none\">\n            <div *ngIf=\"home_data.to_do_items.pending_meetings && home_data.to_do_items.pending_meetings.length>0\" class=\"\">\n                <div class=\"container bordered\">\n                    <div class=\" modal-header\">\n                        Upcoming Meetings\n                    </div>\n                    <div class=\"\">\n                        <div class=\"container\">\n                            <div class=\"row\">\n                                <div class=\"kanban-card\" *ngFor=\"let meeting_object of home_data.to_do_items.pending_meetings\">\n                                    <div class=\"kanban-meeting-info\">\n                                        <a class=\"kanban-upcoming-meeting\" routerLink=\"/home/meeting/{{meeting_object.id}}\">\n                                            <div class=\"CalendarDateWrapper\">\n                                                <span *ngIf=\"meeting_object.start\" class=\"CalendarDateWrap\">\n                                                    <span class=\"kanban-upcoming-meeting-date\">\n                                                        {{meeting_object.start_dt.day}}\n                                                    </span>\n                                                    <span>\n                                                        {{meeting_object.start_dt.month_year}}\n                                                    </span>\n                                                    <span>\n                                                        {{meeting_object.start_dt.time}}\n                                                    </span>\n                                                </span>\n                                            </div>\n                                            <div class=\"Info\">\n                                                <p *ngIf=\"meeting_object.name\">\n                                                    <b>{{meeting_object.name}}</b>\n                                                </p>\n\t\t\t\t\t\t\t\t\t\t\t\t<span *ngIf=\"meeting_object.location\">{{meeting_object.location}}</span>\t\t\t\t\t\t\t\t\t\t\t\t\n                                            </div>\n                                        </a>\n                                        <div class=\"upcomingButton btn-flex-1\" id=\"tdmrb{{meeting_object.id}}\">\n                                            <button (click)=\"respond_invitation('accepted', meeting_object.id)\" class=\"btn btn-primary\">\n                                                <i *ngIf=\"meeting_object.attendee_status == 'accepted'\" class=\"fa fa-check fa-lg\" style=\"color:white\" modifiers=\"{}\"></i>\n                                                <span name=\"accepted\">Accept</span>\n                                            </button>\n                                            <button (click)=\"respond_invitation('declined', meeting_object.id)\" class=\"btn btn-primary\">\n                                                <i *ngIf=\"meeting_object.attendee_status == 'declined'\" class=\"fa fa-check fa-lg\" style=\"color:white\" modifiers=\"{}\"></i>\n                                                <span name=\"declined\">Decline</span>\n                                            </button>\n                                            <button (click)=\"respond_invitation('tentative', meeting_object.id)\" class=\"btn btn-primary\">\n                                                <i *ngIf=\"meeting_object.attendee_status == 'tentative'\" class=\"fa fa-check fa-lg\" style=\"color:white\" modifiers=\"{}\"></i>\n                                                <span name=\"tentative\">Tentative</span>\n                                            </button>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n            <!--Surveys-->\n            <div *ngIf=\"home_data.to_do_items.pending_surveys && home_data.to_do_items.pending_surveys.length\" class=\"\">\n                <div class=\"container bordered\">\n                    <div class=\"modal-header\">\n                        Surveys\n                    </div>\n                    <div class=\"\">\n                        <div class=\"container\">\n                            <div class=\"row\">\n                                <div class=\"kanban-card survey\" *ngFor=\"let sur of home_data.to_do_items.pending_surveys\">\n                                    <div class=\"SurveysInfoBox d-flex flex-wrap justify-content-between align-items-center\">\n                                        <div class=\"SurveysInfoBoxTitle\">\n                                            <h5>\n                                                <b>{{sur.title}}</b>\n                                                <span *ngIf=\"sur.meeting_name\"> Meeting: {{sur.meeting_name}}</span>\n                                            </h5>\n                                        </div>\n                                        <div class=\"\">\n                                            <button class=\"btn btn-primary\" routerLink=\"/home/survey/{{sur.id}}\">                                                \n                                                <span>Start</span>\n                                            </button>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n\n            <!--Votings-->\n            <div *ngIf=\"home_data.to_do_items.pending_votings && home_data.to_do_items.pending_votings.length\" class=\"\">\n                <div class=\"container bordered\">\n                    <div class=\"modal-header\">\n                        Votings/Approvals\n                    </div>\n                    <div class=\"\">\n                        <div class=\"container\">\n                            <div class=\"row\">\n                                <div class=\"kanban-card voting\" *ngFor=\"let vote of home_data.to_do_items.pending_votings\">\n                                    <div class=\"VotingsInfoBox d-flex flex-wrap justify-content-between align-items-center\">\n                                        <div class=\"VotingsInfoBoxTitle \">\n                                            <h5>\n                                                <b>{{vote.name}}</b>\n                                                <span *ngIf=\"vote.meeting_name\"> Meeting: {{vote.meeting_name}}</span>\n                                                <div><strong>Voting Type :</strong><span style=\"display:inline-block;\">{{vote.voting_type_name}}</span></div>\n                                            </h5>\n                                        </div>\n\n                                        <div class=\"\">\n                                            <button class=\"btn btn-primary\" routerLink=\"/voting/{{vote.id}}\">                                                \n                                                <span>Start</span>\n                                            </button>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n            <!--Documents-->\n            <div *ngIf=\"home_data.to_do_items.pending_documents && home_data.to_do_items.pending_documents.length\" class=\"DocumentsSignWrapper\">\n                <div class=\"container bordered\">\n                    <div class=\"modal-header\">\n                        Documents To Sign\n                    </div>\n                    <div class=\"\">\n                        <div class=\"container\">\n                            <div class=\"row\">\n                                <div class=\"kanban-card\" *ngFor=\"let doc of home_data.to_do_items.pending_documents\">\n                                    <a class=\"DocumentWrapper gray-bg\" routerLink=\"/signature/doc/{{doc.id}}\">\n                                        <div class=\"DocIcon\">\n                                            <i class=\"fa fa-file\"></i>\n                                        </div>\n                                        <div class=\"DocText\">\n                                            <div class=\"DocName\">\n                                                <h5>Title: {{doc.name}}</h5>\n                                            </div>\n                                            <div class=\"DocMeeting\">\n                                                Meeting: {{doc.meeting_name}}\n                                            </div>\n                                            <div class=\"SignatureText font-11\">\n                                                <span>My Signature: </span>\n                                                <span class=\"pending-status\">{{doc.mp_signature_status}}</span>\n                                            </div>\n                                        </div>\n                                    </a>\n                                </div>\n                            </div>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n            <div style=\"border: 2px solid black;padding: 10%\" *ngIf=\"!to_do_data\">\n                <h1>Congratulations!<br>You have no task pending :)</h1>\n            </div>\n        </div>\n\n    <!--:::::::::::::::::::::: TOASTS ::::::::::::::::::::::-->\n\n    <div id=\"slot-select-success\" class=\"snackbar-success\">Successfully Saved Your Response.</div>\n    <div id=\"slot-select-error\" class=\"snackbar-error\">Something went wrong, Try Again After Some Time.</div>\n\n    <!--:::::::::::::::::::::: TOASTS ::::::::::::::::::::::-->\n    </div>\n</div>\n\n<div class=\"modal fade video\" id=\"videoModal\" role=\"dialog\" aria-hidden=\"true\">\n    <div class=\"modal-dialog modal-lg modal-dialog-centered\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <span class=\"title\"></span>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">×</span></button>\n            </div>\n            <div class=\"modal-body\">\n                <div class=\"embed-responsive embed-responsive-16by9\">\n                </div>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"modal fade\" id=\"calenderModal\" role=\"dialog\" aria-hidden=\"true\">\n\t<div class=\"modal-dialog modal-lg modal-dialog-centered\">\n\t\t<div class=\"modal-content\">\n\t\t\t<div class=\"modal-header\">\n                <span class=\"title\"></span>\n\t\t\t\t<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n\t\t\t</div>\n\t\t\t<div id=\"modal-body\" class=\"modal-body\">\n\n\t\t\t</div>\n\t\t\t<div class=\"modal-footer\">\n\t\t\t\t<button style=\"display: none\" (click)=\"navigate_meeting()\" type=\"button\" class=\"btn btn-default go_details\" data-dismiss=\"modal\">Details</button>\n\t\t\t\t<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n"

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
        this.ng_init = false;
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
            console.log(home_data);
            var result = home_data['to_do_items']['pending_meetings'];
            for (var i in result) {
                var start = result[i]['start'];
                start = Object(_app_js_methods__WEBPACK_IMPORTED_MODULE_5__["meeting_time"])(start);
                result[i]['start_dt'] = start;
            }
            home_data.description = obj_this.sanitizer.bypassSecurityTrustHtml(home_data.description);
            var valid_videos = [];
            home_data.video_ids.forEach(function (element) {
                element.original_url = element.url;
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
            else if (to_do_items.pending_votings.length) {
                obj_this.to_do_data = true;
            }
            obj_this.to_do_count = to_do_items.pending_documents.length + to_do_items.pending_meetings.length + to_do_items.pending_surveys.length + to_do_items.pending_votings.length;
        };
        var failure_cb = function (er) {
            console.log(er);
        };
        obj_this.httpService.call_post_http(req_url, input_data, success_cb, failure_cb);
    };
    HomeComponent.prototype.view_video = function (video_name, video_url) {
        console.log(video_url);
        $('#videoModal .modal-heaer').html('<h3>' + video_name + '</h3>');
        $('#videoModal .modal-body .embed-responsive').html("\n            <iframe class=\"embed-responsive-item\" frameborder=\"0\"  allowfullscreen=\"allowfullscreen\"\n             src=\"" + video_url + "?autoplay=1\">\n             </iframe>\n        ");
        $('#videoModal').modal('show');
    };
    HomeComponent.prototype.ngOnInit = function () {
        var obj_this = this;
        $('.home-container').show();
        $('#videoModal').on('hidden.bs.modal', function () {
            $('#videoModal .modal-body .embed-responsive').html('');
        });
        // $('#calenderModal').on('hidden.bs.modal', function () {
        //     $('#calenderModal .modal-body').html('');
        // });
        $('#event-summary tr').hide();
        obj_this.get_home_data();
        $(function () {
            obj_this.ng_init = true;
        });
        this.socketService.server_events['to_do_item_updated'] = function () {
            if (obj_this) {
                setTimeout(function () {
                    obj_this.get_home_data();
                }, 5000);
            }
        };
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./home.component.html */ "./src/components/home/home.component.html")
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DomSanitizer"],
            _app_socket_service__WEBPACK_IMPORTED_MODULE_3__["SocketService"]])
    ], HomeComponent);
    return HomeComponent;
}());



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
            template: __webpack_require__(/*! ./jitsi.component.html */ "./src/components/jitsi/jitsi.component.html")
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

module.exports = "<link rel=\"stylesheet\" href=\"/assets/static/css/login.css\" />\n<div id=\"main-div\" style=\"display:none\" class=\"Login-form-wrapper\" *ngIf=\"page_loaded\">\n    <div class=\"login-form-div\">\n        \n        <!--<div class=\"img-thumbnail\" id='output'></div>-->\n        <form [formGroup]=\"loginForm\" (ngSubmit)=\"onSubmit()\">\n            <div class=\"meet-logo-text\">\n                <h1>MeetVUE</h1>\n                <span>Welcome to Login</span>\n            </div>\n            <div class=\"form-group input-label-icon\">\n                <i class=\"fas fa-user\"></i>\n                <input id=\"username\" placeholder=\"Username\" type=\"text\" formControlName=\"username\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.username.errors }\" />\n                <div *ngIf=\"submitted && f.username.errors\" class=\"invalid-feedback\">\n                    <div *ngIf=\"f.username.errors.required\">Username is required</div>\n                </div>\n            </div>\n            <div class=\"form-group input-label-icon\">\n                <i class=\"fas fa-key\"></i>\n                <input id=\"password\" placeholder=\"Password\" type=\"password\" formControlName=\"password\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.password.errors }\" />\n                <div *ngIf=\"submitted && f.password.errors\" class=\"invalid-feedback\">\n                    <div *ngIf=\"f.password.errors.required\">Password is required</div>\n                </div>\n            </div>\n            <div class=\"form-group text-left\">\n                <button class=\"login-btn\">Login</button>\n                <a class=\"forgot\" routerLink=\"/forgot-password\">Forogt Password?</a>\n            </div>\n            <div *ngIf=\"error\" class=\"alert alert-danger\">{{error}}</div>\n        </form>\n    </div>\n</div>"

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
            template: __webpack_require__(/*! ./login.component.html */ "./src/components/login/login.component.html")
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

/***/ "./src/components/meetingdetails/meetingdetails.component.html":
/*!*********************************************************************!*\
  !*** ./src/components/meetingdetails/meetingdetails.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div  id=\"main-div\">\n    <link rel=\"stylesheet\" href=\"assets/static/css/components/meetingdetails.css\">\n\t<div class=\" breadcrumbSection\">\n\t\t<div class=\"container\">\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t\t<ol class=\"breadcrumb\">\n\t\t\t\t\t\t<li class=\"breadcrumb-item\" *ngFor=\"let item of bread_crumb.items\">\n\t\t\t\t\t\t\t<a routerLink=\"{{item.link}}\">\n\t\t\t\t\t\t\t\t{{item.title}}\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t<li class=\"breadcrumb-item\">{{bread_crumb.title}}</li>\n\t\t\t\t\t</ol>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<div class=\"page-links\">\n        <span class=\"prev next-prev-link\" title=\"Privious\">\n            <i class=\"fa fa-angle-left\"></i>\n        </span>\n\t\t<span class=\"next next-prev-link\" title=\"Next\">\n            <i class=\"fa fa-angle-right\"></i>\n        </span>\n\t</div>\n\n\t<div class=\"container\">\n\t\t<div class=\" form-details\">\n\t\t\t<div class=\"meeting-details-form\">\n\t\t\t\t<div class=\"d-flex justify-content-between\">\n\n\t\t\t\t\t<div class=\"row note\" *ngIf=\"conference_not_active\">\n\t\t\t\t\t\tMeeting conference URL will be available 15 minutes before meeting start.\n\t\t\t\t\t</div>\n\t\t\t\t\t<div *ngIf=\"me && me.state && meeting_type == 'upcoming'\">\n\t\t\t\t\t\t<div class=\"upcomingButton\" id=\"tdmrb{{meeting_object.id}}\">\n\t\t\t\t\t\t\t<button (click)=\"respond_invitation('accepted', meeting_object.id)\" class=\"btn btn-primary\">\n\t\t\t\t\t\t\t\t<i *ngIf=\"meeting_object.attendee_status == 'accepted' || meeting_object.status == 'Accept'\" class=\"fa fa-check fa-lg\" style=\"color:white\" modifiers=\"{}\"></i>\n\t\t\t\t\t\t\t\t<span name=\"accepted\">Accept</span>\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t<button (click)=\"respond_invitation('declined', meeting_object.id)\" class=\"btn btn-primary\">\n\t\t\t\t\t\t\t\t<i *ngIf=\"meeting_object.attendee_status == 'declined' || meeting_object.status == 'decline'\" class=\"fa fa-check fa-lg\" style=\"color:white\" modifiers=\"{}\"></i>\n\t\t\t\t\t\t\t\t<span name=\"declined\">Decline</span>\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t<button (click)=\"respond_invitation('tentative', meeting_object.id)\" class=\"btn btn-primary\">\n\t\t\t\t\t\t\t\t<i *ngIf=\"meeting_object.attendee_status == 'tentative' || meeting_object.status == 'tentative'\" class=\"fa fa-check fa-lg\" style=\"color:white\" modifiers=\"{}\"></i>\n\t\t\t\t\t\t\t\t<span name=\"tentative\">Tentative</span>\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"\" style=\"justify-content:flex-end;\">\n\t\t\t\t\t\t<span *ngIf=\"title === 'Completed'\" class=\"badge badge-success\">{{title}}</span>\n\t\t\t\t\t\t<span *ngIf=\"title === 'Archived'\" class=\"badge badge-danger\">{{title}}</span>\n\t\t\t\t\t\t<span *ngIf=\"title === 'Upcoming'\" class=\"badge badge-warning\">{{title}}</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t<div class=\"div1\" *ngIf=\"meeting_object\">\n\t\t\t\t\t<div *ngIf=\"me && me.state\" class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-3 meet-elements\">\n\t\t\t\t\t\t\tMy Status\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<label class=\"col-sm-9\">\n\t\t\t\t\t\t\t{{me.state}}\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div *ngIf=\"meeting_object.name && meeting_object.name\" class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-3 meet-elements\">\n\t\t\t\t\t\t\tMeeting Subject\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<label class=\"col-sm-9\">\n\t\t\t\t\t\t\t{{meeting_object.name}}\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div *ngIf=\"meeting_object.start && meeting_object.start\" class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-3 meet-elements\">\n\t\t\t\t\t\t\tStart Date & Time\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<label class=\"col-sm-9\">\n\t\t\t\t\t\t\t{{meeting_object.start | date:'medium' }}\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div *ngIf=\"meeting_object.stop && meeting_object.stop\" class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-3 meet-elements\">\n\t\t\t\t\t\t\tEnd Date & Time\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<label class=\"col-sm-9\">\n\t\t\t\t\t\t\t{{meeting_object.stop | date:'medium'}}\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div *ngIf=\"meeting_object.duration && meeting_object.duration\" class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-3 meet-elements\">\n\t\t\t\t\t\t\tDuration\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<label class=\"col-sm-9\">\n\t\t\t\t\t\t\t{{meeting_object.duration}}\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<!-- <h2>Status {{meeting_object.conference_status}}</h2> -->\n\n\t\t\t\t<div class=\"div2\" *ngIf=\"meeting_object.conference_status == 'active'\">\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-3 meet-elements\">\n\t\t\t\t\t\t\tConference Bridge No.\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<label class=\"col-sm-9\">\n\t\t\t\t\t\t\t{{meeting_object.conference_bridge_number}}\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-3 meet-elements\">\n\t\t\t\t\t\t\tMeeting PIN\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<label class=\"col-sm-9\">{{meeting_object.pin}}</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-3 meet-elements\">\n\t\t\t\t\t\t\tVideo Call Link\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<label class=\"col-sm-9\">\n\t\t\t\t\t\t\t<a href=\"{{meeting_object.video_call_link}}\">{{meeting_object.video_call_link}}</a>\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div  class=\"div3\">\n\n\t\t\t\t\t<div *ngIf=\"meeting_object.location\" class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-3 meet-elements\">\n\t\t\t\t\t\t\tLocation\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<label class=\"col-sm-9\">\n\t\t\t\t\t\t\t{{meeting_object.location}}\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div  class=\"div5\">\n\t\t\t\t\t<div  *ngIf=\"meeting_object.hasOwnProperty('description') && meeting_object.description\" class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-3 meet-elements\">\n\t\t\t\t\t\t\tDescription\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<label class=\"col-sm-9\" [innerHtml]=\"meeting_object.description\"></label>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div *ngIf=\"meeting_object.topics && meeting_object.topics.length\" class=\"title-wrapper\">\n\t\t\t<div class=\"modal-header\">\n\t\t\t\tAgenda Topics\n\t\t\t</div>\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t\t<div class=\"table-responsive\">\n\t\t\t\t\t\t<table class=\"table table-bordered\">\n\t\t\t\t\t\t\t<thead class=\"thead-light\">\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<th>Title</th>\n\t\t\t\t\t\t\t\t<th>Lead</th>\n\t\t\t\t\t\t\t\t<th>Duration</th>\n\t\t\t\t\t\t\t\t<th>Attachment</th>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t</thead>\n\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t<tr style=\"cursor:pointer\" routerLink=\"/topic/{{topic.id}}\" *ngFor=\"let topic of meeting_object.topics\">\n\t\t\t\t\t\t\t\t<td>{{topic.name}}</td>\n\t\t\t\t\t\t\t\t<td>{{topic.lead}}</td>\n\t\t\t\t\t\t\t\t<td >{{topic.duration}}</td>\n\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t<div class=\"talbe-docs-wrapper\">\n\t\t\t\t\t\t\t\t\t\t<div *ngIf=\"topic.docs && topic.docs.length && topic.docs.length > 0\">\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-file\"></i>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t</table>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div *ngIf=\"meeting_object.attendees && meeting_object.attendees.length\" class=\"meeting-details-roster title-wrapper\">\n\t\t\t<div class=\"modal-header\">\n\t\t\t\tRoster\n\t\t\t</div>\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"kanban-card\" *ngFor=\"let attendee of meeting_object.attendees\">\n\t\t\t\t\t<a class=\"kanban-profiles-user-info-box\">\n\t\t\t\t\t\t<div class=\"meeting-details-roster-info-img\">\n\t\t\t\t\t\t\t<img class=\"img-thumbnail-md\" alt='N/A' src=\"{{attendee.photo}}\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"meeting-details-roster-info-text\">\n\t\t\t\t\t\t\t<h6>{{attendee.name}}</h6>\n\t\t\t\t\t\t\t<div *ngIf=\"attendee.response_by\">Response By: {{attendee.response_by}}</div>\n\t\t\t\t\t\t\t<div *ngIf=\"attendee.email\" class=\"\">\n\t\t\t\t\t\t\t\t{{attendee.email}}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div *ngIf=\"attendee.state\" class=\"\">\n\t\t\t\t\t\t\t\t<b>Status : </b> {{attendee.state}}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div *ngIf=\"meeting_object.surveys && meeting_object.surveys.length\" class=\"title-wrapper\">\n\t\t\t<!--Surveys-->\n\t\t\t<div class=\"modal-header\">\n\t\t\t\tSurveys\n\t\t\t</div>\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"kanban-card survey\" *ngFor=\"let sur of meeting_object.surveys\">\n\t\t\t\t\t<div class=\"SurveysInfoBox d-flex flex-wrap justify-content-between align-items-center\">\n\t\t\t\t\t\t<div class=\"SurveysInfoBoxTitle\">\n                            <span class=\"container\">\n                                <h5>\n                                    <b>{{sur.title}}</b>\n                                </h5>\n                            </span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"\">\n\t\t\t\t\t\t\t<button class=\"btn btn-primary\" routerLink=\"/survey/{{sur.id}}\">\n\t\t\t\t\t\t\t\t<span *ngIf = \"sur.my_status == 'done'\">Results</span>\n\t\t\t\t\t\t\t\t<span *ngIf = \"sur.my_status == 'pending'\">Start</span>\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div *ngIf=\"meeting_object.meeting_docs && meeting_object.meeting_docs.length\" class=\"title-wrapper\">\n\t\t\t<div class=\"modal-header\">\n\t\t\t\tMeeting Documents\n\t\t\t</div>\n\t\t\t<div class=\"row docwrappercontainer\">\n\t\t\t\t<div class=\"kanban-card\" routerLink=\"/meeting/doc/{{doc.id}}\" *ngFor=\"let doc of meeting_object.meeting_docs\">\n\t\t\t\t\t<div class=\"DocumentWrapper gray-bg\">\n\t\t\t\t\t\t<div class=\"DocIcon\">\n\t\t\t\t\t\t\t<i class=\"fa fa-file\"></i>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"DocText\">\n\t\t\t\t\t\t\t<div class=\"DocName\">\n\t\t\t\t\t\t\t\t<h5>{{doc.name}}</h5>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div *ngIf=\"meeting_object.sign_docs && meeting_object.sign_docs.length\" class=\"DocumentsSignWrapper title-wrapper\">\n\t\t\t<div class=\"modal-header\">\n\t\t\t\tDocuments To Sign\n\t\t\t</div>\n\t\t\t<div class=\"row docwrappercontainer\">\n\t\t\t\t<a class=\"col-sm-6 col-md-4 col-lg-4\" routerLink=\"/signature/doc/{{doc.id}}\" *ngFor=\"let doc of meeting_object.sign_docs\">\n\t\t\t\t\t<div class=\"DocumentWrapper signdocu gray-bg\">\n\t\t\t\t\t\t<div class=\"DocIcon\">\n\t\t\t\t\t\t\t<i class=\"fa fa-file\"></i>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"DocText\">\n\t\t\t\t\t\t\t<div class=\"DocName\">\n\t\t\t\t\t\t\t\t<h5>Title: {{doc.name}}</h5>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"SignatureText font-11\">\n\t\t\t\t\t\t\t\t<span>My Signature: </span>\n\t\t\t\t\t\t\t\t<span class=\"pending-status\">{{doc.mp_signature_status}}</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</a>\n\t\t\t</div>\n\t\t</div>\n\t\t<app-comments *ngIf=\"meetObjLoaded\" res_model=\"{{meeting_object.model}}\" res_id=\"{{meeting_object.id}}\"></app-comments>\n\t</div>\n</div>\n"

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
                // console.log(meeting_object.video_call_link.length);
                // meeting_object.video_call_link = '';
                // if (meeting_object.conference_status == 'active') {
                //     var curl = window.location.origin.toString();
                //     meeting_object.video_call_link = curl + '/conference/' + meeting_object.id + '/' + meeting_object.pin;
                // } else if (obj_this.meeting_type == 'upcoming') {
                //     obj_this.conference_not_active = true;
                // }
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
            template: __webpack_require__(/*! ./meetingdetails.component.html */ "./src/components/meetingdetails/meetingdetails.component.html")
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

/***/ "./src/components/meetings/meetings.component.html":
/*!*********************************************************!*\
  !*** ./src/components/meetings/meetings.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<app-paginator></app-paginator>\n<div id=\"main-div\">\n    <link rel=\"stylesheet\" href=\"assets/static/css/components/meetings.css\">\n\t<div *ngIf=\"no_meet\" class=\"jumbotron text-center\">\n\t\t<h1>No {{heading |titlecase}} for you :)</h1>\n\t\t<hr>\n\t</div>\n\t<div class=\"container\">\n\t\t<div class=\"row\">\n\t\t\t<div class=\"kanban-card\" *ngFor=\"let meeting_object of meeting_list\">\n\t\t\t\t<div class=\"kanban-meeting-info\">\n\t\t\t\t\t<a class=\"kanban-upcoming-meeting\" routerLink=\"/home/meeting/{{meeting_object.id}}\">\n\t\t\t\t\t\t<div class=\"CalendarDateWrapper\">\n\t\t\t\t\t\t\t<span *ngIf=\"meeting_object.start\" class=\"CalendarDateWrap\">\n\t\t\t\t\t\t\t\t<span class=\"kanban-upcoming-meeting-date\">\n\t\t\t\t\t\t\t\t\t{{meeting_object.start_dt.day}}\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t\t{{meeting_object.start_dt.month_year}}\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t\t{{meeting_object.start_dt.time}}\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"Info\">\n\t\t\t\t\t\t\t<p *ngIf=\"meeting_object.name\">\n\t\t\t\t\t\t\t\t<b>{{meeting_object.name}}</b>\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t<span *ngIf=\"meeting_object.location\">{{meeting_object.location}}</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</a>\n\t\t\t\t\t<div *ngIf=\"meeting_type == 'upcoming'\" class=\"upcomingButton btn-flex-1\" id=\"tdmrb{{meeting_object.id}}\">\n\t\t\t\t\t\t<button (click)=\"respond_invitation('accepted', meeting_object.id)\" class=\"btn btn-primary\">\n\t\t\t\t\t\t\t<i *ngIf=\"meeting_object.attendee_status == 'accepted'\" class=\"fa fa-check fa-lg\" style=\"color:white\" modifiers=\"{}\"></i>\n\t\t\t\t\t\t\t<span name=\"accepted\">Accept</span>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t\t<button (click)=\"respond_invitation('declined', meeting_object.id)\" class=\"btn btn-primary\">\n\t\t\t\t\t\t\t<i *ngIf=\"meeting_object.attendee_status == 'declined'\" class=\"fa fa-check fa-lg\" style=\"color:white\" modifiers=\"{}\"></i>\n\t\t\t\t\t\t\t<span name=\"declined\">Decline</span>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t\t<button (click)=\"respond_invitation('tentative', meeting_object.id)\" class=\"btn btn-primary\">\n\t\t\t\t\t\t\t<i *ngIf=\"meeting_object.attendee_status == 'tentative'\" class=\"fa fa-check fa-lg\" style=\"color:white\" modifiers=\"{}\"></i>\n\t\t\t\t\t\t\t<span name=\"tentative\">Tentative</span>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n"

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
            template: __webpack_require__(/*! ./meetings.component.html */ "./src/components/meetings/meetings.component.html")
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], MeetingsComponent);
    return MeetingsComponent;
}());



/***/ }),

/***/ "./src/components/messageicon/messageicon.component.html":
/*!***************************************************************!*\
  !*** ./src/components/messageicon/messageicon.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"messageicon-container mobile-chatroom nav-icon dropdown\">\n    <link rel=\"stylesheet\" href=\"/assets/static/css/components/messageicon.css\">\n    <button *ngIf=\"!odoo_build\" routerLink=\"/messenger\" class=\"showmouseawaybutton notification-icon\">\n        <i class=\"fas fa-comment\"></i>\n    </button>\n    <span *ngIf=\"odoo_build\">\n        <i class=\"fas fa-comment\"></i>\n    </span>\n    <span class=\"un-read-msg\" *ngIf=\"socketService.unseen_messages !=0 \">{{socketService.unseen_messages}}</span>\n</div>"

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
            template: __webpack_require__(/*! ./messageicon.component.html */ "./src/components/messageicon/messageicon.component.html")
        }),
        __metadata("design:paramtypes", [_app_socket_service__WEBPACK_IMPORTED_MODULE_1__["SocketService"]])
    ], MessageiconComponent);
    return MessageiconComponent;
}());



/***/ }),

/***/ "./src/components/messenger/messenger.component.html":
/*!***********************************************************!*\
  !*** ./src/components/messenger/messenger.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"odoo_build\">\n    <link rel=\"stylesheet\" href=\"/assets/static/css/scrollbar.min.css\" />\n    <link rel=\"stylesheet\" href=\"/assets/static/css/components/messenger.css\" />\n</div>\n<div *ngIf=\"!odoo_build\">\n    <link rel=\"stylesheet\" href=\"assets/static/css/scrollbar.min.css\" />\n    <link rel=\"stylesheet\" href=\"assets/static/css/components/messenger.css\" />\n</div>\n<div class=\"messenger-container\" *ngIf=\"ng_init\">        \n    <div id=\"body-div\">\n        <div class=\"container-fluid\">\n            <div class=\"row\">\n                <div class=\"chat friends-chat-box\">\n                    <div class=\"card contacts_card\">\n                        <div class=\"MessengerWrap\"><h1 class=\"MessengerText\">Messenger</h1></div>\n                        <div class=\"card-header MessengerSearchWrap\">\n                            <div class=\"input-group\">\n                                <div class=\"input-group-prepend\">\n                                    <span class=\"input-group-text search_btn\"><i class=\"fas fa-search\"></i></span>\n                                </div>\n                                <input [(ngModel)]=\"searchVal\" type=\"text\" placeholder=\"Search or start new chat\" name=\"\" class=\"form-control search\">\n                            </div>\n                        </div>\n                        <div class=\"card-body contacts_body\">\n                            <ul class=\"contacts\">\n                                <li *ngFor=\"let uid of keys_chat_users\"\n                                    (click)=\"select_chat_user(uid)\"\n                                    [ngClass]=\"[active_chat_user && uid == active_chat_user.id ? 'active': '']\">                                \n                                    <div *ngIf=\"chat_users[uid] && chat_users[uid].name && chat_users[uid].name.toLowerCase().indexOf(searchVal.toLowerCase()) > -1\">\n                                        <a class=\"contact-item d-flex align-items-center bd-highlight\">\n                                            <div class=\"img_cont\">\n                                                <img src=\"{{chat_users[uid].photo}}\" class=\"rounded-circle user_img\">\n                                                <span [ngClass]=\"[chat_users[uid].online ? '': 'offline']\" class=\"online_icon\"></span>\n                                            </div>\n                                            <div class=\"user_info\">\n                                                <span>{{ chat_users[uid].name }}</span>\n                                                <p *ngIf=\"chat_users[uid].online\">Online</p>\n                                                <p *ngIf=\"!chat_users[uid].online\">Offline</p>\n                                            </div>\n                                            <span class=\"unseen\" *ngIf=\"chat_users[uid].unseen != 0\">\n                                                {{chat_users[uid].unseen}}\n                                            </span>\n                                        </a>\n                                    </div>\n                                </li>\n                            </ul>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"chat chat-container-wrppaer\" id=\"\"> <!-- mobi-active-chat-->\n                    <div *ngIf=\"active_chat_user\" class=\"card chat-full-height\">\n                        <div class=\"chat-user-title\">\n                            <span (click)=\"hide_chat_box()\" class=\"backchatlist\"><i class=\"fas fa-arrow-left\"></i></span>\n                            <h2>{{active_chat_user.name}}</h2>\n                            <div *ngIf=\"active_chat_user.online\" class=\"userstat\">Online</div>\n                            <div *ngIf=\"!active_chat_user.online\" class=\"userstat\">Offline</div>\n                            <div class=\"active_chat_user_id\" style=\"display:none\">{{active_chat_user.id}}</div>\n                        </div>\t\t\t\n                        <div class=\"card-body msg_card_body meetVue-chat-body\">\n                            <div class=\"messenger-body\" *ngFor=\"let msg of active_chat_user.messages\">\n                                <div *ngIf=\"msg.sender == user_data.id\"\n                                        class=\"d-flex align-items-end justify-content-end mb-4\">\n                                    <div class=\"msg_cotainer_send\">\n                                        <div class=\"msg-send-box-wrapper\">\n                                            <div class=\"msg-send-box-text\" [innerHTML]=\"msg.content\"></div>\n                                        </div>\n                                        <span class=\"msg_time_send\">{{msg.create_date | date:'medium'}}</span>\n                                    </div>\n\n                                    <div class=\"img_cont_msg\">\n                                        <img src=\"{{user_data.photo}}\" class=\"rounded-circle user_img_msg\">\n                                    </div>\n                                </div>\n                                <div *ngIf=\"msg.sender != user_data.id\"\n                                        class=\"d-flex align-items-end justify-content-start mb-4\">\n                                    <div class=\"img_cont_msg\">\n                                        <img src=\"{{active_chat_user.photo}}\" class=\"rounded-circle user_img_msg\">\n                                    </div>\n                                    <div class=\"msg_cotainer\">\n                                        <div class=\"msg-box-wrapper\">\n                                            <div class=\"msg-box-text\" [innerHTML]=\"msg.content\"></div>\n                                        </div>\n                                        <span class=\"msg_time\">{{msg.create_date | date:'medium'}}</span>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"card-footer meetVue-chat-footer\">\n                            <div class=\"input-group\">\n                                <input type=\"text\" id=\"message_input_box\" data-emojiable=\"true\"\n                                       data-type=\"image\" class=\"form-control\" placeholder=\"Type your message here\" />                                \n                                <div class=\"input-group-append\">\n                                    <span id=\"send_btn\" class=\"input-group-text send_btn\"><i class=\"fas fa-location-arrow\"></i></span>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div *ngIf=\"!is_mobile_device && !active_chat_user\" class=\"card wellcomescreen\">\n                        <h3>Welcome to MeetVUE</h3>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>    \n</div>\n"

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
        this.is_mobile_device = false;
        this.ng_init = false;
        var obj_this = this;
        obj_this.socketService = ss;
        var socketService = ss;
        function registerChatEventListeners() {
            obj_this.chat_users = socketService.friends;
            obj_this.user_data = socketService.user_data;
            obj_this.keys_chat_users = Object.keys(obj_this.chat_users);
            socketService.server_events['friend_joined'] = updateUserStatus;
            socketService.server_events['user_left'] = updateUserStatus;
            socketService.server_events['chat_message_received'] = function (msg) {
                try {
                    //console.log('redifen chat_message_received');
                    obj_this.receiveMessage(obj_this, msg, msg.sender);
                }
                catch (er) {
                    console.log(er);
                }
            };
            function updateUserStatus(user) {
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
        try {
            ss.execute_on_verified(registerChatEventListeners);
        }
        catch (er) {
            console.log(113, er);
        }
    }
    MessengerComponent.prototype.select_chat_user = function (target_id) {
        var obj_this = this;
        var ww = $(window).width();
        if (ww <= 767) {
            obj_this.is_mobile_device = true;
            $('.chat-container-wrppaer').attr("id", "mobi-active-chat");
        }
        else {
            obj_this.is_mobile_device = false;
        }
        if (obj_this.chat_initilized != 1) {
            obj_this.chat_initilized = 1;
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
        obj_this.httpService.call_post_http('/get-user-messages', { target_id: target_id }, function (data) {
            obj_this.is_request_sent = false;
            obj_this.onUserSelected(data);
        }, null);
    };
    MessengerComponent.prototype.hide_chat_box = function () {
        $('.chat-container-wrppaer').removeAttr("id");
    };
    MessengerComponent.prototype.onUserSelected = function (messages) {
        var obj_this = this;
        //waiting because [data-emojiable=true] needs to render
        setTimeout(function () {
            var emoji_config = {
                emojiable_selector: "[data-emojiable=true]",
                assetsPath: "/assets/static/emoji/images",
                popupButtonClasses: "far fa-smile"
            };
            var emojiPicker = new window["EmojiPicker"](emoji_config);
            emojiPicker.discover();
            obj_this.update_emjoi_urls(messages);
            obj_this.active_chat_user.messages = messages;
            obj_this.socketService.update_unseen_message_count("user-selected", obj_this.active_chat_user.id, obj_this.chat_users[obj_this.active_chat_user.id]);
            $('.msg-item').Emoji();
            obj_this.scrollToEnd();
        }, 20);
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
            create_date: new Date(),
            no_loader: 1,
        };
        //console.log(1111, window['odoo'], input_data.content);
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
        var sender = obj_this.chat_users[sender_id];
        if (!sender) {
            console.log(obj_this.chat_users, ' Dev issue as ' + sender_id + ' not found');
            return;
        }
        message.content = obj_this.sanitizer.bypassSecurityTrustHtml(message.content);
        // var is_chat_open = obj_this.active_chat_user &&
        // 	obj_this.active_chat_user.id == sender_id &&
        // 	!this.is_minimize;
        var active_uid = parseInt($(".active_chat_user_id").html());
        var is_chat_open = $(".msg_card_body").length > 0 &&
            active_uid == sender_id;
        if (!sender.messages) {
            sender.messages = [];
        }
        sender.messages.push(message);
        obj_this.socketService.update_unseen_message_count("receive-new-message", sender_id, sender);
        if (is_chat_open) {
            var input_data = {
                message_id: message.id,
                no_loader: 1
            };
            setTimeout(function () {
                obj_this.httpService.call_post_http('/set_message_status', input_data, function (res_data) {
                }, null);
            }, 2000);
            obj_this.socketService.update_unseen_message_count("read-new-message", sender_id, sender);
            setTimeout(function () {
                obj_this.scrollToEnd();
            }, 200);
        }
    };
    MessengerComponent.prototype.toggle_messenger = function (e) {
        var togglerelated = window['functions'].togglerelated;
        togglerelated(e, $(e.target).closest('.showmouseawaybutton'), '.messenger-container');
    };
    MessengerComponent.prototype.update_emjoi_urls = function (messages) {
        var obj_this = this;
        {
            messages.forEach(function (element) {
                element.content = obj_this.sanitizer.bypassSecurityTrustHtml(element.content);
            });
        }
    };
    MessengerComponent.prototype.ngOnInit = function () {
        var obj_this = this;
        $(document).ready(function () {
            $('#action_menu_btn').click(function () {
                $('.action_menu').toggle();
            });
            if ($(window).width() <= 767) {
                $('.chat-container-wrppaer').hide();
                obj_this.is_mobile_device = true;
            }
            else {
                obj_this.is_mobile_device = false;
            }
            obj_this.ng_init = true;
        });
        $(".msg_card_body").unbind("scroll");
        $(".msg_card_body").scroll(function () {
            var height = Math.floor(0.3 * $(".msg_card_body").height());
            if ($(".msg_card_body").scrollTop() <= height) {
                if (obj_this.is_request_sent) {
                    return;
                }
                obj_this.is_request_sent = true;
                obj_this.httpService.call_post_http('/get-user-messages', { target_id: obj_this.active_chat_user.id, offset: obj_this.active_chat_user.messages.length }, function (data) {
                    if (data.length > 0) {
                        obj_this.is_request_sent = false;
                        obj_this.update_emjoi_urls(data);
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
    MessengerComponent.prototype.ngOnDestroy = function () {
        this.active_chat_user = undefined;
        // this.socketService.server_events['chat_message_received'] = function(){
        //     //alert(34233434);
        // };
    };
    MessengerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-messenger',
            template: __webpack_require__(/*! ./messenger.component.html */ "./src/components/messenger/messenger.component.html")
        }),
        __metadata("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DomSanitizer"],
            _app_http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"],
            _app_socket_service__WEBPACK_IMPORTED_MODULE_3__["SocketService"]])
    ], MessengerComponent);
    return MessengerComponent;
}());



/***/ }),

/***/ "./src/components/paginator/paginator.component.html":
/*!***********************************************************!*\
  !*** ./src/components/paginator/paginator.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <link rel=\"stylesheet\" href=\"assets/static/css/components/paginator.css\">\n    <div class=\"odoo-navigation\">\n        <div class=\"odoo-navigation-container\">\n\n            <div class=\"odoo-navigation-page-size ng-star-inserted\">\n              <div class=\"odoo-navigation-page-size-label\">Items per page:</div>\n\n              <div class=\"odoo-navigation-page-size-select m\">\n                <div class=\"odoo-navigation-mat-form-field-flex\">\n                    <select (change)=\"change_limit()\" [(ngModel)]=\"limit\" class=\"custom-select mb-2 mr-sm-2 mb-sm-0\" id=\"inlineFormCustomSelect\">\n                      <option *ngFor=\"let opt of limit_options\">{{opt}}</option>\n                    </select>\n                </div>\n            </div>\n            <div class=\"odoo-navigation-range-actions\">\n              <div class=\"odoo-navigation-range-label\">\n                <span *ngIf=\"httpService.total_records > 0\">{{off_set + 1}}</span>\n                <span *ngIf=\"httpService.total_records <= 0\">0</span> - {{off_set+httpService.count}} of {{httpService.total_records}}</div>\n                <button [disabled]=\"off_set === 0\"\n                  (click)=\"change_page(-limit)\"\n                  class=\"odoo-navigation-navigation-previous\">\n                  <i class=\"fa fa-chevron-left\"></i>\n                </button>\n                <button [disabled]=\"off_set+httpService.count >= httpService.total_records\"\n                  (click)=\"change_page(limit)\"\n                  class=\"odoo-navigation-navigation-next\">\n                  <i class=\"fa fa-chevron-right\"></i>\n                </button>\n            </div>\n          </div>\n        </div>\n    </div>\n</div>\n\n"

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
            template: __webpack_require__(/*! ./paginator.component.html */ "./src/components/paginator/paginator.component.html")
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"]])
    ], PaginatorComponent);
    return PaginatorComponent;
}());



/***/ }),

/***/ "./src/components/profiledetails/profiledetails.component.html":
/*!*********************************************************************!*\
  !*** ./src/components/profiledetails/profiledetails.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"main-div\">\n    <link rel=\"stylesheet\" href=\"assets/static/css/components/profiledetails.css\">\n    <div *ngIf=\"!edit_mode\">\n        <div class=\" breadcrumbSection\">\n            <div class=\"container\">\n                <div class=\"row\">\n                    <div class=\"col-sm-12\">\n                        <ol class=\"breadcrumb\">\n                            <a routerLink=\"/profiles\">\n                                <li class=\"breadcrumb-item\">\n                                    Profiles / &nbsp;\n                                </li>\n                            </a>\n                            <li class=\"breadcrumb-item active\">{{profile_data.name}}</li>\n                        </ol>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"container\">\n            <div class=\"page-links\">\n                <span class=\"prev next-prev-link\" title=\"Privious\">\n                    <i class=\"fa fa-angle-left\"></i>\n                </span>\n                <span class=\"next next-prev-link\" title=\"Next\">\n                    <i class=\"fa fa-angle-right\"></i>\n                </span>\n            </div>\n            <div class=\"details-card\">\n                <div *ngIf=\"my_profile\" class=\"clearfix\">\n                    <button (click)=\"editProfile()\" type=\"button\" class=\"cancelbtn\">Edit</button>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col-sm-8\">\n                        <img *ngIf=\"profile_data.image_medium\" class=\"img-thumbnail-lg\" src=\"{{profile_data.image_medium}}\">\n                        <img *ngIf=\"!profile_data.image_medium\" class=\"img-thumbnail-lg\" src=\"/assets/static/images/no-profile.png\">\n                    </div>\n                    <div class=\"col-sm-4\">\n                        <div *ngIf=\"my_profile\">\n                            <div class=\"container\" *ngIf=\"profile_data.login.second_last\">\n                                <div class=\"row last-login-details\">\n                                    <div class=\"col-sm-12\">\n                                        <h3>Last Login Details</h3>\n                                        <span *ngIf=\"profile_data.login.second_last.login_time\">Login Time:\n                                            {{profile_data.login['second_last'].login_time | date:'MMM dd,yyyy HH:mm:ss'}}</span>\n                                        <span *ngIf=\"profile_data.login.second_last.platform\">OS:\n                                            {{profile_data.login['second_last'].platform}}</span>\n                                        <span *ngIf=\"profile_data.login.second_last.browser\">Browser:\n                                            {{profile_data.login['second_last'].browser}}</span>\n                                        <span *ngIf=\"profile_data.login.second_last.ip\">IP:\n                                            {{profile_data.login['second_last'].ip}}</span>\n                                        <span *ngIf=\"profile_data.login.second_last.location\">Location:\n                                            {{profile_data.login['second_last'].location}}</span>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"container\" *ngIf=\"!(profile_data.login.second_last)\">\n                                <div class=\"row last-login-details\">\n                                    <div class=\"col-sm-12\">\n                                        <h3>Last Login Details</h3>\n                                        <span *ngIf=\"profile_data.login.last.login_time\">Login Time:\n                                            {{profile_data.login['last'].login_time | date:'MMM dd,yyyy HH:mm:ss'}}</span>\n                                        <span *ngIf=\"profile_data.login.last.platform\">OS:\n                                            {{profile_data.login['last'].platform}}</span>\n                                        <span *ngIf=\"profile_data.login.last.browser\">Browser:\n                                            {{profile_data.login['last'].browser}}</span>\n                                        <span *ngIf=\"profile_data.login.last.ip\">IP: {{profile_data.login['last'].ip}}</span>\n                                        <span *ngIf=\"profile_data.login.last.location\">Location:\n                                            {{profile_data.login['last'].location}}</span>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div *ngIf=\"!(my_profile)\">\n                            <div class=\"container\" *ngIf=\"profile_data.login.last\">\n                                <div class=\"row last-login-details\">\n                                    <div class=\"col-sm-12\">\n                                        <h3>Last Login Details</h3>\n                                        <span *ngIf=\"profile_data.login.last.login_time\">Login Time:\n                                            {{profile_data.login['last'].login_time| date:'MMM dd,yyyy HH:mm:ss'}}</span>\n                                        <span *ngIf=\"profile_data.login.last.platform\">OS:\n                                            {{profile_data.login['last'].platform}}</span>\n                                        <span *ngIf=\"profile_data.login.last.browser\">Browser:\n                                            {{profile_data.login['last'].browser}}</span>\n                                        <span *ngIf=\"profile_data.login.last.ip\">IP: {{profile_data.login['last'].ip}}</span>\n                                        <span *ngIf=\"profile_data.login.last.location\">Location:\n                                            {{profile_data.login['last'].location}}</span>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div *ngIf=\"!(profile_data.login.last)\" class=\"container\">\n                            <h3>No login data</h3>\n                        </div>\n                    </div>\n                </div>\n                <hr>\n                <div class=\"row\">\n                    <div class=\"container\">\n\n                        <div *ngIf=\"profile_data.name\" class=\"row\">\n                            <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                <label for=\"job-title\">\n                                    <b>Name</b>\n                                </label>\n                            </div>\n                            <div class=\"col-sm-8\">\n                                {{profile_data.name}}\n                            </div>\n                        </div>\n                        <div *ngIf=\"profile_data.nick_name\" class=\"row\">\n                            <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                <label for=\"department\">\n                                    <b>Nick Name</b>\n                                </label>\n                            </div>\n                            <div class=\"col-sm-8\">\n                                {{profile_data.nick_name}}\n                            </div>\n                        </div>\n                        <div *ngIf=\"profile_data.email\" class=\"row\">\n                            <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                <label for=\"w-phone\">\n                                    <b>Email</b>\n                                </label>\n                            </div>\n                            <div class=\"col-sm-8\">\n                                {{profile_data.email}}\n                            </div>\n                        </div>\n\n\n\n                        <div *ngIf=\"profile_data.job_title\" class=\"row\">\n                            <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                <label for=\"job-title\">\n                                    <b>Job Title</b>\n                                </label>\n                            </div>\n                            <div class=\"col-sm-8\">\n                                {{profile_data.job_title}}\n                            </div>\n                        </div>\n                        <div *ngIf=\"profile_data.department\" class=\"row\">\n                            <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                <label for=\"department\">\n                                    <b>Department</b>\n                                </label>\n                            </div>\n                            <div class=\"col-sm-8\">\n                                {{profile_data.department}}\n                            </div>\n                        </div>\n                        <div *ngIf=\"profile_data.work_phone\" class=\"row\">\n                            <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                <label for=\"w-phone\">\n                                    <b>Work Phone</b>\n                                </label>\n                            </div>\n                            <div class=\"col-sm-8\">\n                                {{profile_data.work_phone}}\n                            </div>\n                        </div>\n                        <div *ngIf=\"profile_data.mobile_phone\" class=\"row\">\n                            <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                <label for=\"c-phone\">\n                                    <b>Cell Phone</b>\n                                </label>\n                            </div>\n                            <div class=\"col-sm-8\">\n                                {{profile_data.mobile_phone}}\n                            </div>\n                        </div>\n                        <div *ngIf=\"profile_data.fax\" class=\"row\">\n                            <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                <label for=\"fax\">\n                                    <b>Fax</b>\n                                </label>\n                            </div>\n                            <div class=\"col-sm-8\">\n                                {{profile_data.fax}}\n                            </div>\n                        </div>\n                        <div *ngIf=\"profile_data.website\" class=\"row\">\n                            <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                <label for=\"website\">\n                                    <b>Website</b>\n                                </label>\n                            </div>\n                            <div class=\"col-sm-8\">\n                                {{profile_data.website}}\n                            </div>\n                        </div>\n\n                        <!-- Term Date -->\n\n                        <div *ngIf=\"profile_data.term_start_date\" class=\"row\">\n                            <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                <label for=\"website\">\n                                    <b>Term Start Date</b>\n                                </label>\n                            </div>\n                            <div class=\"col-sm-8\">\n                                {{profile_data.term_start_date | date:'MMM dd,yyyy'}}\n                            </div>\n                        </div>\n\n                        <div *ngIf=\"profile_data.term_end_date\" class=\"row\">\n                            <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                <label for=\"website\">\n                                    <b>Term End Date</b>\n                                </label>\n                            </div>\n                            <div class=\"col-sm-8\">\n                                {{profile_data.term_end_date| date:'MMM dd,yyyy'}}\n                            </div>\n                        </div>\n\n                        <!--Committees-->\n                        <div *ngIf=\"profile_data['committees'] && profile_data['committees'].length > 0\" class=\"row\">\n                            <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                <label for=\"job-title\">\n                                    <b>Committees</b>\n                                </label>\n                            </div>\n                            <div class=\"col-sm-8\">\n                                <span class=\"pill\" *ngFor=\"let com of profile_data.committees\">\n                                    <span style=\"cursor: pointer\" routerLink=\"/committees/{{com['id']}}\">{{com['name']}}</span>\n                                </span>\n                            </div>\n                        </div><br>\n\n                        <!-- Resume -->\n                        <div *ngIf=\"profile_data.resume\" class=\"row\">\n                            <div class=\"col-sm-12\">\n                                <h3>Resume</h3>\n                            </div>\n                            <a routerLink=\"/resume/doc/{{profile_data.id}}\" class=\"kanban-card\">\n                                <div class=\"DocumentWrapper\">\n                                    <div class=\"DocIcon\">\n                                        <i class=\"fa fa-file\"></i>\n                                    </div>\n                                </div>\n                            </a>\n                        </div>\n\n\n                        <!--Admin Details-->\n\n                        <div class=\"row assistant\" *ngIf=\"admin_info\">\n                            <div class=\"col-sm-12\">\n                                <h3>\n                                    <b>Administrative Assistant</b>\n                                </h3>\n                            </div>\n                            <div class=\"container row\">\n                                <div class=\"col-sm-8\">\n                                    <img *ngIf=\"profile_data.admin_image\" class=\"img-thumbnail-lg\" src=\"{{profile_data.admin_image}}\">\n                                    <img *ngIf=\"!(profile_data.admin_image)\" class=\"img-thumbnail-lg\" src=\"/assets/static/images/no-profile.png\">\n                                </div>\n                            </div>\n                            <div class=\"admin_info_after_name container\">\n                                <div *ngIf=\"profile_data.admin_first_name\" class=\"row\">\n                                    <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                        <label>\n                                            <b>First Name</b>\n                                        </label>\n                                    </div>\n                                    <div class=\"col-sm-8\">\n                                        {{profile_data.admin_first_name}}\n                                    </div>\n                                </div>\n                                <div *ngIf=\"profile_data.admin_last_name\" class=\"row\">\n                                    <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                        <label>\n                                            <b>Last Name</b>\n                                        </label>\n                                    </div>\n                                    <div class=\"col-sm-8\">\n                                        {{profile_data.admin_last_name}}\n                                    </div>\n                                </div>\n                                <div *ngIf=\"profile_data.admin_nick_name\" class=\"row\">\n                                    <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                        <label>\n                                            <b>Nick Name</b>\n                                        </label>\n                                    </div>\n                                    <div class=\"col-sm-8\">\n                                        {{profile_data.admin_nick_name}}\n                                    </div>\n                                </div>\n\n\n                                <div *ngIf=\"profile_data.admin_email\" class=\"row\">\n                                    <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                        <label>\n                                            <b>Email</b>\n                                        </label>\n                                    </div>\n                                    <div class=\"col-sm-8\">\n                                        {{profile_data.admin_email}}\n                                    </div>\n                                </div>\n                                <div *ngIf=\"profile_data.admin_cell_phone\" class=\"row\">\n                                    <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                        <label>\n                                            <b>Cell Phone</b>\n                                        </label>\n                                    </div>\n                                    <div class=\"col-sm-8\">\n                                        {{profile_data.admin_cell_phone}}\n                                    </div>\n                                </div>\n                                <div *ngIf=\"profile_data.admin_fax\" class=\"row\">\n                                    <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                        <label>\n                                            <b>Fax</b>\n                                        </label>\n                                    </div>\n                                    <div class=\"col-sm-8\">\n                                        {{profile_data.admin_fax}}\n                                    </div>\n                                </div>\n                                <div *ngIf=\"profile_data.admin_work_phone\" class=\"row\">\n                                    <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                        <label>\n                                            <b>Work Phone</b>\n                                        </label>\n                                    </div>\n                                    <div class=\"col-sm-8\">\n                                        {{profile_data.admin_work_phone}}\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class=\"row\">\n                            <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\" *ngIf=\"profile_data.signature_img\">\n                                <label>\n                                    <b>Signature</b>\n                                </label>\n                            </div>\n                            <div class=\"col-sm-8 \" style=\"display: flex;\">\n                                <div style=\"position:relative;cursor: pointer;\">\n                                    <img class=\" profile \" style=\"width: 100%;\" url='/profile/save_signature' *ngIf=\"profile_data.signature_img\"\n                                        src=\"{{profile_data.signature_img}}\">\n                                        <span *ngIf=\"!profile_data.signature_img\"></span>\n                                    \n    \n                                 \n                                </div>\n    \n                            </div>\n                        </div>\n\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"container\">\n        <div class=\"details-card\" *ngIf=\"edit_mode\">\n            <div class=\"row\">\n                <div class=\"container row\">\n                    <div class=\"col-sm-8\">\n                        <img *ngIf=\"profile_data.image_medium\" class=\"img-thumbnail-lg\" src=\"{{profile_data.image_medium}}\">\n                        <img *ngIf=\"!(profile_data.image_medium)\" class=\"img-thumbnail\" src=\"/assets/static/images/no-profile.png\">\n                        <input (change)=\"addFile($event, 'profile')\" type=\"file\" name=\"pic\" accept=\"image/*\">\n                    </div>\n                </div>\n                <div class=\"col-sm-4\">\n                    <div class=\"container\" *ngIf=\"last_login.login_time\">\n                        <div class=\"row last-login-details\">\n                            <div class=\"col-sm-12\">\n                                <h3>Last Login Details</h3>\n                                <span *ngIf=\"last_login.login_time\">Login Time: {{last_login.login_time | date:'MMM dd,yyyy HH:mm:ss'}}</span>\n                                <span *ngIf=\"last_login.platform\">OS: {{last_login.platform}}</span>\n                                <span *ngIf=\"last_login.browser\">Browser: {{last_login.browser}}</span>\n                                <span *ngIf=\"last_login.ip\">IP: {{last_login.ip}}</span>\n                                <span *ngIf=\"last_login.location\">Location: {{last_login.location}}</span>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <hr>\n            <div class=\"row label-control-form\">\n                <div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col-sm\">\n                            <label for=\"name\">\n                                <b>Name</b>\n                            </label>\n                            <input value=\"{{profile_data.name}}\" (change)=\"modified_profile_data.name = $event.target.value\"\n                                type=\"text\" placeholder=\"Enter Name\" id=\"name\">\n                            <input value=\"{{profile_data.nick_name}}\" (change)=\"modified_profile_data.nick_name = $event.target.value\"\n                                type=\"text\" placeholder=\"Enter Nick\" id=\"nick\">\n\n                            <label for=\"email\">\n                                <b>Email</b>\n                            </label>\n                            <input value=\"{{profile_data.email}}\" (change)=\"modified_profile_data.email = $event.target.value\"\n                                type=\"text\" placeholder=\"Enter Email\" id=\"email\" disabled>\n                        </div>\n                    </div>\n\n\n                    <div class=\"row\">\n                        <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                            <label for=\"job-title\">\n                                <b>Job Title</b>\n                            </label>\n                        </div>\n                        <div class=\"col-sm-8\">\n                            <input value=\"{{profile_data.job_title}}\" (change)=\"modified_profile_data.job_title = $event.target.value\"\n                                type=\"text\" placeholder=\"Enter Job Title\" id=\"job-title\" required>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                            <label for=\"department\">\n                                <b>Department</b>\n                            </label>\n                        </div>\n                        <div class=\"col-sm-8\">\n                            <input value=\"{{profile_data.department}}\" (change)=\"modified_profile_data.department = $event.target.value\"\n                                type=\"text\" placeholder=\"Enter Department\" id=\"department\" required>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                            <label for=\"w-phone\">\n                                <b>Work Phone</b>\n                            </label>\n                        </div>\n                        <div class=\"col-sm-8\">\n                            <input value=\"{{profile_data.work_phone}}\" (change)=\"modified_profile_data.work_phone = $event.target.value\"\n                                type=\"text\" placeholder=\"Enter Work Phone\" id=\"w-phone\" required>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                            <label for=\"c-phone\">\n                                <b>Cell Phone</b>\n                            </label>\n                        </div>\n                        <div class=\"col-sm-8\">\n                            <input value=\"{{profile_data.mobile_phone}}\" (change)=\"modified_profile_data.mobile_phone = $event.target.value\"\n                                type=\"text\" placeholder=\"Enter Cell Phone\" id=\"c-phone\" required>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                            <label for=\"fax\">\n                                <b>Fax</b>\n                            </label>\n                        </div>\n                        <div class=\"col-sm-8\">\n                            <input value=\"{{profile_data.fax}}\" (change)=\"modified_profile_data.fax = $event.target.value\"\n                                type=\"text\" placeholder=\"Enter Fax\" id=\"fax\" required>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                            <label for=\"website\">\n                                <b>Website</b>\n                            </label>\n                        </div>\n                        <div class=\"col-sm-8\">\n                            <input value=\"{{profile_data.website}}\" (change)=\"modified_profile_data.website = $event.target.value\"\n                                type=\"text\" placeholder=\"Enter Website\" id=\"website\" required>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                            <label for=\"website\">\n                                <b>Resume</b>\n                            </label>\n                        </div>\n                        <div class=\"col-sm-8\">\n                            <input (change)=\"addFile($event, '')\" type=\"file\" name=\"pic\" />\n                        </div>\n                    </div>\n\n\n                    <!--Admin block-->\n\n                    <div class=\"row\" style=\"margin-top:20px;\">\n                        <div class=\"col-sm-12\">\n                            <h3>\n                                <b>Administrative Assistant</b>\n                            </h3>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-sm-12\">\n                            <img *ngIf=\"profile_data.admin_image\" class=\"img-thumbnail-lg\" src=\"{{profile_data.admin_image}}\">\n                            <img *ngIf=\"!(profile_data.admin_image)\" class=\"img-thumbnail-lg\" src=\"/assets/static/images/no-profile.png\">\n                            <input (change)=\"addFile($event, 'admin')\" type=\"file\" name=\"pic\" accept=\"image/*\">\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-sm\">\n                            <input value=\"{{profile_data.admin_first_name}}\" (change)=\"modified_profile_data.admin_first_name = $event.target.value\"\n                                type=\"text\" placeholder=\"First Name\" required>\n                        </div>\n                        <div class=\"col-sm\">\n                            <input value=\"{{profile_data.admin_last_name}}\" (change)=\"modified_profile_data.admin_last_name = $event.target.value\"\n                                type=\"text\" placeholder=\"Last Name\" required>\n                        </div>\n                        <div class=\"col-sm\">\n                            <input value=\"{{profile_data.admin_nick_name}}\" (change)=\"modified_profile_data.admin_nick_name = $event.target.value\"\n                                type=\"text\" placeholder=\"Nick Name\" required>\n                        </div>\n                    </div>\n                    <div class=\"admin_info_after_name\">\n                        <div class=\"row\">\n                            <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                <label for=\"admin-e-mail\">\n                                    <b>E-mail</b>\n                                </label>\n                            </div>\n                            <div class=\"col-sm-8\">\n                                <input value=\"{{profile_data.admin_email}}\" (change)=\"modified_profile_data.admin_email = $event.target.value\"\n                                    type=\"text\" id=\"admin-e-mail\" placeholder=\"\" required>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                <label for=\"admin-cell\">\n                                    <b>Cell Phone</b>\n                                </label>\n                            </div>\n                            <div class=\"col-sm-8\">\n                                <input value=\"{{profile_data.admin_cell_phone}}\" (change)=\"modified_profile_data.admin_cell_phone = $event.target.value\"\n                                    type=\"text\" placeholder=\"\" id=\"admin-cell\" required>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                <label for=\"admin-fax\">\n                                    <b>Fax</b>\n                                </label>\n                            </div>\n                            <div class=\"col-sm-8\">\n                                <input value=\"{{profile_data.admin_fax}}\" (change)=\"modified_profile_data.admin_fax = $event.target.value\"\n                                    type=\"text\" placeholder=\"\" id=\"admin-fax\" required>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                                <label for=\"admin-work-phone\">\n                                    <b>Work Phone</b>\n                                </label>\n                            </div>\n                            <div class=\"col-sm-8\">\n                                <input value=\"{{profile_data.admin_work_phone}}\" (change)=\"modified_profile_data.admin_work_phone = $event.target.value\"\n                                    type=\"text\" placeholder=\"\" id=\"admin-work-phone\" required>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                            <label>\n                                <b>Signature</b>\n                            </label>\n                        </div>\n                        <div class=\"col-sm-8 \" style=\"display: flex;\">\n                            <div style=\"position:relative;cursor: pointer;\">\n                                <img class=\"strt_sign profile \" style=\"width: 100%;\" url='/profile/save_signature' *ngIf=\"profile_data.signature_img\"\n                                    src=\"{{profile_data.signature_img}}\">\n\n                                <a style=\"position: absolute;right: 1px;\" *ngIf=\"profile_data.signature_img\" id=\"{{profile_data['id']}}\" class=\"fa fa-pen fa-lg strt_sign profile\" url='/profile/save_signature'></a>\n                                <img class=\"strt_sign profile \" url='/profile/save_signature' *ngIf=\"!profile_data.signature_img\"\n                                src=\"{{profile_data.signature_img}}\">\n                                <button  *ngIf=\"!profile_data.signature_img\" id=\"{{profile_data['id']}}\" class=\"fa fa-pen fa-lg strt_sign profile btn-primary\" url='/profile/save_signature'></button>\n\n                            </div>\n\n                        </div>\n                    </div>\n\n\n                    <div class=\"row\">\n\n                        <div class=\"clearfix col-sm\">\n                            <button (click)=\"editProfile()\" type=\"button\" class=\"cancelbtn\">Cancel</button>\n                        </div>\n                        <div class=\"clearfix col-sm\">\n                            <button (click)=\"onSubmit()\" type=\"submit\" class=\"signupbtn\">Save</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div id=\"slot-select-success\" class=\"snackbar-success\">Successfully Saved Your Profile.</div>\n<div id=\"slot-select-error\" class=\"snackbar-error\">Something went wrong, Try Again After Some Time.</div>"

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
            if (result.profile.signature_img) {
                var d = Date.now();
                result.profile.signature_img += '?a=' + d;
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
        console.log("ngOnInit");
        if ($('.strt_sign').length == 0) {
            $('body').append('<script src="/assets/static/annotator/js/dn_sign.js"></script>');
        }
    };
    ProfileDetailsComponent.prototype.ngOnChanges = function () {
        console.log("ngOnChanges");
    };
    ProfileDetailsComponent.prototype.ngDoCheck = function () {
        // this.profile_data["signature_img"]=this.profile_data["signature_img"]+"&h="+ Math.random();
        // console.log("ngDoCheck",this.profile_data["signature_img"])
    };
    ProfileDetailsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./profiledetails.component.html */ "./src/components/profiledetails/profiledetails.component.html")
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], ProfileDetailsComponent);
    return ProfileDetailsComponent;
}());



/***/ }),

/***/ "./src/components/profiles/profiles.component.html":
/*!*********************************************************!*\
  !*** ./src/components/profiles/profiles.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<app-paginator></app-paginator>\n<div id=\"main-div\">\n    <link rel=\"stylesheet\" href=\"assets/static/css/components/profiles.css\">\n    <div class=\" breadcrumbSection\">\n        <div class=\"container\">\n            <div *ngIf=\"profiles_data.length\" class=\"row\">\n                <div class=\"col-sm-12\">\n                    <ol class=\"breadcrumb\">\n                        <li class=\"breadcrumb-item active\">Profiles</li>\n                    </ol>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div  class=\"container\">\n        <div class=\"row\">\n            <div class=\"kanban-profiles kanban-card\" *ngFor=\"let profile of profiles_data\">\n                <a class=\"kanban-profiles-user-info-box\" routerLink=\"/profile/{{profile.id}}\">\n                    <div class=\"kanban-profiles-user-img\">\n                        <img class=\"img-thumbnail-md\"\n                        src=\"{{profile.image_small}}\">                        \n                    </div>\n                    <div class=\"kanban-profiles-user-info\">\n                        <div class=\"kanban-profiles-user-name\">\n                            {{profile.name}}\n                        </div>\n                        <div *ngIf=\"profile.email\" class=\"kanban-profiles-user-email\">\n                            {{profile.email}}\n                        </div>\n                    </div>\n                </a>\n            </div>\n        </div>\n    </div>\n    <div class=\"jumbotron text-center\" *ngIf=\"no_prof\">\n        <h1>There are no Directors to show for now!</h1>\n        <hr>\n    </div>\n</div>\n"

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
            template: __webpack_require__(/*! ./profiles.component.html */ "./src/components/profiles/profiles.component.html")
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"]])
    ], ProfilesComponent);
    return ProfilesComponent;
}());



/***/ }),

/***/ "./src/components/resourcedetails/resourcedetails.component.html":
/*!***********************************************************************!*\
  !*** ./src/components/resourcedetails/resourcedetails.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"main-div\" >\n    <link rel=\"stylesheet\" href=\"assets/static/css/components/resourcedetails.css\">\n    <div *ngIf=\"folder\">\n        <div class=\" breadcrumbSection\">\n            <div class=\"container\">\n                <ul *ngIf=\"folder && folder.parents\" class=\"breadcrumb\">\n                    <li class=\"breadcrumb-item\">                                                \n                        <a routerLink=\"/resources\">\n                            Resources\n                        </a>\n                    </li>\n                    <li class=\"breadcrumb-item\" *ngFor=\"let parent of folder.parents\">                                                \n                        <a routerLink=\"/resource/{{parent.id}}\">\n                            {{parent.name}}\n                        </a>\n                    </li>\n                    <li class=\"breadcrumb-item active\">{{folder.name}}</li>\n                </ul>\n            </div>\n        </div>\n        <div class=\"cards container\">\n            <h6 *ngIf=\"!(no_files)\">Files</h6>\n            <div class=\"row\">\n                <a style=\"cursor:pointer\" *ngFor=\"let doc of folder.files\" class=\"kanban-card\" routerLink=\"/resource/doc/{{doc.id}}\">\n                    <div class=\"DocumentWrapper gray-bg\">\n                            <div class=\"DocIcon\">\n                                    <!-- doc_type='resource' doc_id='{{doc.id}}' -->\n                            <i class=\"fa fa-file\"></i>\n                        </div>\n                        <div class=\"DocText\">\n                            {{doc.name}}\n                        </div>\n                    </div>\n                </a>\n            </div>\n            <p></p>\n            <h6 *ngIf=\"!(no_folders)\">Sub Folders</h6>\n            <div class=\"row\">\n                <div class=\"kanban-card\" *ngFor=\"let folder of folder.sub_folders\">\n                    <a routerLink=\"/resource/{{folder.id}}\" class=\"kanban-folder\">\n                        <i class=\"fa fa-folder\"></i>\n                        <span>{{folder.name}}</span>\n                    </a>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n"

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
            template: __webpack_require__(/*! ./resourcedetails.component.html */ "./src/components/resourcedetails/resourcedetails.component.html")
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], ResourceDetailsComponent);
    return ResourceDetailsComponent;
}());



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
            template: __webpack_require__(/*! ./resources.component.html */ "./src/components/resources/resources.component.html")
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

module.exports = "<div id=\"main-div\" style=\"display:none\">\n\t<link rel=\"stylesheet\" href=\"assets/static/css/components/setpassword.css\">\n\t<div class=\"container\">\n\t\t<div class=\"row justify-content-center\">\n\t\t\t<div class=\"col-sm-10 col-md-6 col-lg-4\">\n\t\t\t\t<div class=\"password-box\">\n\t\t\t\t\t<label>New Password</label>\n\t\t\t\t\t<div class=\"form-group pass_show\">\n\t\t\t\t\t\t<input [(ngModel)]=\"new_password\" type=\"password\" class=\"form-control\" placeholder=\"New Password\">\n\t\t\t\t\t\t<span *ngIf=\"new_password\" class=\"ptxt\">Show</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<label>Confirm Password</label>\n\t\t\t\t\t<div class=\"form-group pass_show\">\n\t\t\t\t\t\t<input [(ngModel)]=\"confirm_new_password\" type=\"password\" class=\"form-control\" placeholder=\"Confirm Password\">\n\t\t\t\t\t\t<span *ngIf=\"confirm_new_password\" class=\"ptxt\">Show</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t\tPlease set password according to the following\n\t\t\t\t\t\t\t\t</span>\n                          \t<ul class=\"pass_rules\">\n\t\t\t\t\t\t\t\t<li [ngClass]=\"{ 'valid-password': lower_regex.test(new_password) }\">At least one lower case letter</li>\n\t\t\t\t\t\t\t\t<li [ngClass]=\"{ 'valid-password': uper_regex.test(new_password) }\">At least one upper case letter</li>\n\t\t\t\t\t\t\t\t<li [ngClass]=\"{ 'valid-password': numeric_regex.test(new_password) }\">At least one numeric chracter</li>\n\t\t\t\t\t\t\t\t<li [ngClass]=\"{ 'valid-password': special_regex.test(new_password) }\">At least one special chracter</li>\n\t\t\t\t\t\t\t\t<li [ngClass]=\"{ 'valid-password': min_length_regex.test(new_password) }\">Minimume 8 chracters</li>\n\t\t\t\t\t\t\t\t<li [ngClass]=\"{ 'valid-password': (new_password != '' && new_password == confirm_new_password) }\">Password Does not Match</li>\n                          \t</ul>\n                        </span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t\t\t\t<button class=\"btn btn-primary\" (click)=\"submit_password()\">Submit</button>\n\t\t\t\t\t\t\t<a style=\"font-size: 14px;font-weight: bold;margin-left: 10px;\"\n\t\t\t\t\t\t\t   href=\"/login\">Back to login</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n"

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
            template: __webpack_require__(/*! ./setpassword.component.html */ "./src/components/setpassword/setpassword.component.html")
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"]])
    ], SetpasswordComponent);
    return SetpasswordComponent;
}());



/***/ }),

/***/ "./src/components/settings/settings.component.html":
/*!*********************************************************!*\
  !*** ./src/components/settings/settings.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"main-div\" style=\"padding-bottom: 0;\">\n\t<link rel=\"stylesheet\" href=\"assets/static/css/components/settings.css\">\n\t<div class=\"container\">\n\t\t<div class=\"row justify-content-center\">\n\t\t\t<div class=\"col-sm-10 col-md-6 col-lg-4\">\n\t\t\t\t<div class=\"password-box\">\n\t\t\t\t\t<label>Current Password</label>\n\t\t\t\t\t<div class=\"form-group pass_show\">\n\t\t\t\t\t\t<input [(ngModel)]=\"old_password\" type=\"password\" class=\"form-control\" placeholder=\"Current Password\">\n\t\t\t\t\t\t<span *ngIf=\"old_password\" class=\"ptxt\">Show</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<label>New Password</label>\n\t\t\t\t\t<div class=\"form-group pass_show\">\n\t\t\t\t\t\t<input [(ngModel)]=\"new_password\" type=\"password\" class=\"form-control\" placeholder=\"New Password\">\n\t\t\t\t\t\t<span *ngIf=\"new_password\" class=\"ptxt\">Show</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<label>Confirm Password</label>\n\t\t\t\t\t<div class=\"form-group pass_show\">\n\t\t\t\t\t\t<input [(ngModel)]=\"confirm_new_password\" type=\"password\" class=\"form-control\" placeholder=\"Confirm Password\">\n\t\t\t\t\t\t<span *ngIf=\"confirm_new_password\" class=\"ptxt\">Show</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t\tPlease set password according to the following\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t<ul class=\"pass_rules\">\n\t\t\t\t\t\t\t\t\t<li [ngClass]=\"{ 'valid-password': lower_regex.test(new_password) }\">At least one lower case letter</li>\n\t\t\t\t\t\t\t\t\t<li [ngClass]=\"{ 'valid-password': uper_regex.test(new_password) }\">At least one upper case letter</li>\n\t\t\t\t\t\t\t\t\t<li [ngClass]=\"{ 'valid-password': numeric_regex.test(new_password) }\">At least one numeric chracter</li>\n\t\t\t\t\t\t\t\t\t<li [ngClass]=\"{ 'valid-password': special_regex.test(new_password) }\">At least one special chracter</li>\n\t\t\t\t\t\t\t\t\t<li [ngClass]=\"{ 'valid-password': min_length_regex.test(new_password) }\">Minimume 8 chracters</li>\n\t\t\t\t\t\t\t\t\t<li [ngClass]=\"{ 'valid-password': (new_password != '' && new_password == confirm_new_password) }\">Password\n\t\t\t\t\t\t\t\t\t\tDoes not Match</li>\n\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t\t\t\t<button class=\"btn btn-primary\" (click)=\"submit_password()\">Submit</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>"

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



var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(router, httpService) {
        this.router = router;
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
            window["current_user"].logout(1);
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
            template: __webpack_require__(/*! ./settings.component.html */ "./src/components/settings/settings.component.html")
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"]])
    ], SettingsComponent);
    return SettingsComponent;
}());



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
            template: __webpack_require__(/*! ./signdoc.component.html */ "./src/components/signdoc/signdoc.component.html")
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"]])
    ], SigndocComponent);
    return SigndocComponent;
}());



/***/ }),

/***/ "./src/components/survey/survey.component.html":
/*!*****************************************************!*\
  !*** ./src/components/survey/survey.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"main-div\">\n\t<link rel=\"stylesheet\" href=\"assets/static/css/components/survey.css\">\n\t<div class=\" breadcrumbSection\">\n\t\t<div class=\"container\">\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t\t<ol class=\"breadcrumb\">\n\t\t\t\t\t\t<li class=\"breadcrumb-item\" *ngFor=\"let item of bread_crumb.items\">\n\t\t\t\t\t\t\t<a routerLink=\"{{item.link}}\">\n\t\t\t\t\t\t\t\t{{item.title}}\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t<li class=\"breadcrumb-item\">{{bread_crumb.title}}</li>\n\t\t\t\t\t</ol>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<div class=\"dociframecontaine\"style=\"width: calc(100vw + 17px);\n    top: 94px;\n    margin-left: -15px;\n    position: fixed;\n    height: calc(100vh - 94px);\">\n\t\t<iframe id='survey-iframe' style=\"width: 100%;height: 100%;\">\n\t\t</iframe>\n\t</div>\n</div>"

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
        window["functions"].showLoader('survey-iframe');
        this.httpService.call_post_http('/survey-details-json', { survey_id: obj_this.route.snapshot.params.id }, function (result) {
            obj_this.surveyDetails = result;
            if (obj_this.surveyDetails['url']) {
                $('#survey-iframe').attr('src', obj_this.surveyDetails['url']);
                $('#survey-iframe').load(function () {
                    window["functions"].hideLoader('survey-iframe');
                });
            }
            _this.bread_crumb.title = _this.surveyDetails['title'];
            if (page_url.indexOf('home') !== -1) {
                _this.bread_crumb.items.push({ title: 'Home', link: '/' });
            }
            if (obj_this.surveyDetails['meeting_name'] && obj_this.surveyDetails['meeting_id']) {
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
            template: __webpack_require__(/*! ./survey.component.html */ "./src/components/survey/survey.component.html")
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], SurveyComponent);
    return SurveyComponent;
}());



/***/ }),

/***/ "./src/components/topics/topics.component.html":
/*!*****************************************************!*\
  !*** ./src/components/topics/topics.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div id=\"main-div\">\n        <div class=\" breadcrumbSection\">\n                <div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col-sm-12\">\n                                <ol class=\"breadcrumb\">\n                                        <li class=\"breadcrumb-item\" *ngFor=\"let item of bread_crumb.items\">\n                                            <a routerLink=\"{{item.link}}\">\n                                                {{item.title}}\n                                            </a>\n                                        </li>\n                                        <li class=\"breadcrumb-item\">{{bread_crumb.title}}</li>\n                                </ol>\n                        </div>\n                    </div>\n                </div>\n            </div>\n    <div class=\"container\">\n        <div class=\"row\">\n\n            <div class=\"col-sm-12 mr-b20\">\n                <div *ngIf=\"topic.name\" class=\"row\">\n                    <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                        <label>\n                            <b>Name</b>\n                        </label>\n                    </div>\n                    <div class=\"col-sm-8\">\n                        {{topic.name}}\n                    </div>\n                </div>\n                <div *ngIf=\"topic.lead\" class=\"row\">\n                    <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                        <label>\n                            <b>Lead</b>\n                        </label>\n                    </div>\n                    <div class=\"col-sm-8\">\n                        {{topic.lead}}\n                    </div>\n                </div>\n                <div *ngIf=\"topic.duration\" class=\"row\">\n                    <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                        <label>\n                            <b>Duration</b>\n                        </label>\n                    </div>\n                    <div class=\"col-sm-8\">\n                        {{topic.duration}}\n                    </div>\n                </div>\n                <div *ngIf=\"topic.content\" class=\"row\">\n                    <div class=\"col-sm-2\" style=\"border-right: 1px solid #cccccc;\">\n                        <label>\n                            <b>Content</b>\n                        </label>\n                    </div>\n                    <div class=\"col-sm-8\">\n                        {{topic.content}}\n                    </div>\n                </div>\n\n                \n            </div>\n        </div>\n    </div>\n    <section *ngIf=\"topic.docs && topic.docs.length\" class=\"HomepageDocumentSection\">\n            <div class=\"container\">\n                <div class=\"row\">\n                    <div class=\"col-sm-12\">\n                        <h4>\n                            <b>Documents</b>\n                        </h4>\n                        <br>\n                    </div>\n                    <div class=\"col-sm-12\">\n                        <div class=\"row\">\n                            <a class=\"col-sm-6 col-md-4 col-lg-3\" routerLink=\"/topic/doc/{{doc.id}}\" *ngFor=\"let doc of topic.docs\">\n                                <div class=\"DocumentWrapper\">\n                                        <div class=\"DocIcon\">\n                                                <!-- doc_type='topic' doc_id='{{doc.id}}' -->\n                                        <i class=\"fa fa-file\"></i>\n                                    </div>\n                                    <div class=\"DocText\">{{doc.name}}</div>\n                                </div>\n                            </a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </section>\n</div>\n"

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
            template: __webpack_require__(/*! ./topics.component.html */ "./src/components/topics/topics.component.html")
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], TopicsComponent);
    return TopicsComponent;
}());



/***/ }),

/***/ "./src/components/votingdetails/votingdetails.component.html":
/*!*******************************************************************!*\
  !*** ./src/components/votingdetails/votingdetails.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div  id=\"main-div\">\n    <link rel=\"stylesheet\" href=\"assets/static/css/components/meetingdetails.css\">\n\t<div class=\" breadcrumbSection\">\n\t\t<div class=\"container\">\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t\t<ol class=\"breadcrumb\">\n\t\t\t\t\t\t<li class=\"breadcrumb-item\" *ngFor=\"let item of bread_crumb.items\">\n\t\t\t\t\t\t\t<a routerLink=\"{{item.link}}\">\n\t\t\t\t\t\t\t\t{{item.title}}\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t<li class=\"breadcrumb-item\">{{bread_crumb.title}}</li>\n\t\t\t\t\t</ol>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\n\t<div class=\"container\">\n\t\t<div class=\" form-details\">\n\t\t\t<div class=\"meeting-details-form\" *ngIf=\"voting_object\">\n\t\t\t\t<div class=\"d-flex justify-content-between\">\n          <div *ngIf=\"voting_object\">\n                  <div class=\"upcomingButton\" id=\"tdmrb{{voting_object.id}}\">\n                    <button (click)='respond_invitation(option.name, option.id, voting_object.id)' class=\"btn btn-primary\" *ngFor=\"let option of voting_object.voting_options\">\n                      <i *ngIf=\"voting_object.my_status == option.name\" class=\"fa fa-check fa-lg\" style=\"color:white\" modifiers=\"{}\"></i>\n                      <span name=\"option.name\">{{option.name}}</span>\n                    </button>\n                    <button style=\"background: #875a7b; border-color: #875a7b;\" *ngIf=\"voting_object.public_visibility == true\" routerLink=\"/voting/{{voting_object.id}}/results\" class=\"btn btn-primary\">\n                      <span>View Results</span>\n                    </button>\n                  </div>\n          </div>\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t<div class=\"div1\" *ngIf=\"voting_object\">\n\t\t\t\t\t<div *ngIf=\"voting_object.my_status\" class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-3 meet-elements\">\n\t\t\t\t\t\t\tMy Status\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<label class=\"col-sm-9\">\n\t\t\t\t\t\t\t{{voting_object.my_status}}\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div *ngIf=\"voting_object.name && voting_object.name\" class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-3 meet-elements\">\n\t\t\t\t\t\t\tSubject\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<label class=\"col-sm-9\">\n\t\t\t\t\t\t\t{{voting_object.name}}\n\t\t\t\t\t\t</label>\n          </div>\n          \n          <div *ngIf=\"voting_object.motion_first\" class=\"row\">\n              <div class=\"col-sm-3 meet-elements\">\n                Motion First\n              </div>\n              <a class=\"col-sm-6 col-md-4 col-lg-4 anchor-mb\" routerLink=\"/profile/{{voting_object.motion_first.id}}\">{{voting_object.motion_first.name}}</a>\n          </div>\n\n          <div *ngIf=\"voting_object.motion_second\" class=\"row\">\n              <div class=\"col-sm-3 meet-elements\">\n                Motion Second\n              </div>\n              <a class=\"col-sm-6 col-md-4 col-lg-4 anchor-mb\" routerLink=\"/profile/{{voting_object.motion_second.id}}\">{{voting_object.motion_second.name}}</a>\n          </div>\n\n          <div *ngIf=\"voting_object.meeting.name\" class=\"row\">\n            <div class=\"col-sm-3 meet-elements\">\n              Meeting Subject\n            </div>\n            <a class=\"col-sm-6 col-md-4 col-lg-4 anchor-mb\" routerLink=\"/home/meeting/{{voting_object.meeting.id}}\">{{voting_object.meeting.name}}</a>\n          </div>\n\n          <div *ngIf=\"voting_object.topic.name\" class=\"row\">\n              <div class=\"col-sm-3 meet-elements\">\n                Topic Subject\n              </div>\n              <a class=\"col-sm-6 col-md-4 col-lg-4 anchor-mb\" routerLink=\"/topic/{{voting_object.topic.id}}\">{{voting_object.topic.name}}</a>\n            </div>\n\n\t\t\t\t\t<div *ngIf=\"voting_object.open_date && voting_object.open_date\" class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-3 meet-elements\">\n\t\t\t\t\t\t\tOpen Date\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<label class=\"col-sm-9\">\n\t\t\t\t\t\t\t{{voting_object.open_date | date:'medium' }}\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div *ngIf=\"voting_object.close_date && voting_object.close_date\" class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-3 meet-elements\">\n\t\t\t\t\t\t\tClose Date\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<label class=\"col-sm-9\">\n\t\t\t\t\t\t\t{{voting_object.close_date | date:'medium'}}\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n          \n\t\t\t\t</div>\n\n        <div  class=\"div2\" *ngIf=\"voting_object\">\n          <div  *ngIf=\"voting_object.hasOwnProperty('description') && voting_object.description\" class=\"row\">\n            <div class=\"col-sm-3 meet-elements\">\n             Description\n            </div>\n            <label class=\"col-sm-9\" [innerHtml]=\"voting_object.description\"></label>\n          </div>\n        </div>\n\n\n        <div *ngIf=\"voting_object.voting_docs && voting_object.voting_docs.length\" class=\"title-wrapper\">\n            <div class=\"modal-header\">\n              Voting Documents\n            </div>\n            <div class=\"row docwrappercontainer\">\n              <div class=\"kanban-card\" routerLink=\"/voting/doc/{{doc.id}}\" *ngFor=\"let doc of voting_object.voting_docs\">\n                <div class=\"DocumentWrapper gray-bg\">\n                  <div class=\"DocIcon\">\n                    <i class=\"fa fa-file\"></i>\n                  </div>\n                  <div class=\"DocText\">\n                    <div class=\"DocName\">\n                      <h5>{{doc.name}}</h5>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n\t\t\t</div>\n\t\t</div>\n\t\t<app-comments *ngIf=\"meetObjLoaded && voting_object.enable_discussion\" res_model=\"{{voting_object.model}}\" res_id=\"{{voting_object.id}}\"></app-comments>\n\t</div>\n</div>\n"

/***/ }),

/***/ "./src/components/votingdetails/votingdetails.component.ts":
/*!*****************************************************************!*\
  !*** ./src/components/votingdetails/votingdetails.component.ts ***!
  \*****************************************************************/
/*! exports provided: VotingdetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VotingdetailsComponent", function() { return VotingdetailsComponent; });
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





var VotingdetailsComponent = /** @class */ (function () {
    function VotingdetailsComponent(route, router, httpService, sanitizer, socketService) {
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
    VotingdetailsComponent.prototype.get_data = function () {
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
                obj_this.voting_object = result.voting;
                obj_this.meetObjLoaded = true;
                obj_this.voting_object.model = 'meeting_point.voting';
                make_bread_crumb(obj_this.voting_object.name);
            }
            catch (er) {
                console.log(er);
            }
        };
        this.httpService.call_post_http('/voting/details', input_data, on_data, null);
        function make_bread_crumb(page_title) {
            var bread_crumb_items = obj_this.bread_crumb.items;
            if (obj_this.voting_object.topic.name) {
                bread_crumb_items.push({ title: obj_this.voting_object.topic.name, link: '/topic/' + obj_this.voting_object.topic.id });
            }
            else if (obj_this.voting_object.meeting.name) {
                bread_crumb_items.push({ title: obj_this.voting_object.meeting.name, link: '/home/meeting/' + obj_this.voting_object.meeting.id });
            }
            else {
                bread_crumb_items.push({ title: 'Home', link: '/' });
            }
            if (page_title) {
                obj_this.bread_crumb.title = page_title;
            }
        }
    };
    VotingdetailsComponent.prototype.isInProgress = function () {
        // var startTime = moment('8:45am', 'h:mma');
        // var endTime = moment('9:00am', 'h:mma').add(3, 'hours');
        // var now = moment();
        // if(now.isBefore(endTime) && now.isAfter(startTime))
        // console.log('In Progress!!!')
        // else
        // console.log('Finished!!')
        return true;
    };
    VotingdetailsComponent.prototype.respond_invitation = function (option_name, response, voting_id) {
        var req_url = '/voting/submit';
        var obj_this = this;
        var input_data = {
            voting_id: voting_id,
            voting_option_id: response
        };
        if (response) {
            this.httpService.call_post_http(req_url, input_data, function (data) {
                obj_this.voting_object.my_status = option_name;
            }, null);
        }
    };
    VotingdetailsComponent.prototype.ngOnInit = function () {
    };
    VotingdetailsComponent.prototype.ngOnDestroy = function () {
    };
    VotingdetailsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-votingdetails',
            template: __webpack_require__(/*! ./votingdetails.component.html */ "./src/components/votingdetails/votingdetails.component.html")
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _app_http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"],
            _app_socket_service__WEBPACK_IMPORTED_MODULE_4__["SocketService"]])
    ], VotingdetailsComponent);
    return VotingdetailsComponent;
}());



/***/ }),

/***/ "./src/components/votingresults/votingresults.component.html":
/*!*******************************************************************!*\
  !*** ./src/components/votingresults/votingresults.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"main-div\">\n    <link rel=\"stylesheet\" href=\"assets/static/css/components/survey.css\">\n    <div class=\" breadcrumbSection\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-sm-12\">\n                    <ol class=\"breadcrumb\">\n                        <li class=\"breadcrumb-item\" *ngFor=\"let item of bread_crumb.items\">\n                            <a routerLink=\"{{item.link}}\">\n                                {{item.title}}\n                            </a>\n                        </li>\n                        <li class=\"breadcrumb-item\">{{bread_crumb.title}}</li>\n                    </ol>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"dociframecontaine\"style=\"width: calc(100vw + 17px);\n    top: 94px;\n    margin-left: -15px;\n    position: fixed;\n    height: calc(100vh - 94px);\">\n        <iframe id='survey-iframe' style=\"width: 100%;height: 100%;\">\n        </iframe>\n    </div>\n</div>"

/***/ }),

/***/ "./src/components/votingresults/votingresults.component.ts":
/*!*****************************************************************!*\
  !*** ./src/components/votingresults/votingresults.component.ts ***!
  \*****************************************************************/
/*! exports provided: VotingresultsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VotingresultsComponent", function() { return VotingresultsComponent; });
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



var VotingresultsComponent = /** @class */ (function () {
    function VotingresultsComponent(httpService, route) {
        this.httpService = httpService;
        this.route = route;
        this.bread_crumb = {
            items: [],
            title: ''
        };
    }
    VotingresultsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var obj_this = this;
        var page_url = window.location + '';
        window["functions"].showLoader('survey-iframe');
        var cookie = window['current_user'].cookie;
        var voting_id = obj_this.route.snapshot.params.id;
        var voting_url = window["site_config"].server_base_url + '/voting/graphical/a-' + voting_id + '/' + cookie.token + '/' + cookie.db;
        console.log(voting_url);
        $('#survey-iframe').attr('src', voting_url);
        $('#survey-iframe').load(function () {
            window["functions"].hideLoader('survey-iframe');
        });
        this.httpService.call_post_http('/voting/summary', { voting_id: voting_id }, function (result) {
            obj_this.surveyDetails = result;
            _this.bread_crumb.title = _this.surveyDetails['title'];
            if (page_url.indexOf('home') !== -1) {
                _this.bread_crumb.items.push({
                    title: 'Home',
                    link: '/'
                });
            }
            if (obj_this.surveyDetails['meeting_name'] && obj_this.surveyDetails['meeting_id']) {
                _this.bread_crumb.items.push({
                    title: obj_this.surveyDetails['meeting_name'],
                    link: '/meeting/' + obj_this.surveyDetails['meeting_id']
                });
            }
            if (obj_this.surveyDetails['topic_name'] && obj_this.surveyDetails['topic_id']) {
                _this.bread_crumb.items.push({
                    title: obj_this.surveyDetails['topic_name'],
                    link: '/topic/' + obj_this.surveyDetails['topic_id']
                });
            }
        }, function (error) { });
    };
    VotingresultsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-votingresults',
            template: __webpack_require__(/*! ./votingresults.component.html */ "./src/components/votingresults/votingresults.component.html"),
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], VotingresultsComponent);
    return VotingresultsComponent;
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
/* harmony import */ var _components_chat_chat_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/chat/chat.component */ "./src/components/chat/chat.component.ts");
/* harmony import */ var _components_document_document_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/document/document.component */ "./src/components/document/document.component.ts");
/* harmony import */ var _components_comments_comments_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/comments/comments.component */ "./src/components/comments/comments.component.ts");
/* harmony import */ var _components_messenger_messenger_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/messenger/messenger.component */ "./src/components/messenger/messenger.component.ts");
/* harmony import */ var _components_messageicon_messageicon_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/messageicon/messageicon.component */ "./src/components/messageicon/messageicon.component.ts");
/* harmony import */ var _app_dynamicngloader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./app/dynamicngloader */ "./src/app/dynamicngloader.ts");










if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"]).then(function (ng2ModulerRef) {
    var ng2Loader = new _app_dynamicngloader__WEBPACK_IMPORTED_MODULE_9__["DynamicNg2Loader"](ng2ModulerRef.injector);
    var components = { chat: _components_chat_chat_component__WEBPACK_IMPORTED_MODULE_4__["ChatComponent"], messenger: _components_messenger_messenger_component__WEBPACK_IMPORTED_MODULE_7__["MessengerComponent"], messengericon: _components_messageicon_messageicon_component__WEBPACK_IMPORTED_MODULE_8__["MessageiconComponent"], document: _components_document_document_component__WEBPACK_IMPORTED_MODULE_5__["DocumentComponent"], comments: _components_comments_comments_component__WEBPACK_IMPORTED_MODULE_6__["CommentsComponent"] };
    var loadedComponentReferences = [];
    window["loadComponent"] = function (component, target) {
        var compRef = ng2Loader.loadComponentAtDom(components[component], document.querySelector(target), function (instance) {
            // instance.value = count;
        });
        loadedComponentReferences.push(compRef);
    };
    window["destroyComponents"] = function () {
        loadedComponentReferences.forEach(function (compRef) {
            compRef.destroy();
        });
    };
}).catch(function (err) { return console.log(err); });


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