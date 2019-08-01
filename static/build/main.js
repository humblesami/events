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
		var e = new Error("Cannot find module '" + req + "'");
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
/* harmony import */ var _components_calendar_calendar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/calendar/calendar.component */ "./src/components/calendar/calendar.component.ts");
/* harmony import */ var _components_login_login_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/login/login.component */ "./src/components/login/login.component.ts");
/* harmony import */ var _components_forgotpassword_forgotpassword_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/forgotpassword/forgotpassword.component */ "./src/components/forgotpassword/forgotpassword.component.ts");
/* harmony import */ var _components_committees_committees_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/committees/committees.component */ "./src/components/committees/committees.component.ts");
/* harmony import */ var _components_committeedetails_committeedetails_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/committeedetails/committeedetails.component */ "./src/components/committeedetails/committeedetails.component.ts");
/* harmony import */ var _components_meetings_meetings_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../components/meetings/meetings.component */ "./src/components/meetings/meetings.component.ts");
/* harmony import */ var _components_meetingdetails_meetingdetails_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../components/meetingdetails/meetingdetails.component */ "./src/components/meetingdetails/meetingdetails.component.ts");
/* harmony import */ var _components_profiledetails_profiledetails_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../components/profiledetails/profiledetails.component */ "./src/components/profiledetails/profiledetails.component.ts");
/* harmony import */ var _components_profileedit_profileedit_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../components/profileedit/profileedit.component */ "./src/components/profileedit/profileedit.component.ts");
/* harmony import */ var _components_profiles_profiles_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../components/profiles/profiles.component */ "./src/components/profiles/profiles.component.ts");
/* harmony import */ var _components_resources_resources_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../components/resources/resources.component */ "./src/components/resources/resources.component.ts");
/* harmony import */ var _components_resourcedetails_resourcedetails_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../components/resourcedetails/resourcedetails.component */ "./src/components/resourcedetails/resourcedetails.component.ts");
/* harmony import */ var _components_survey_survey_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../components/survey/survey.component */ "./src/components/survey/survey.component.ts");
/* harmony import */ var _components_topics_topics_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../components/topics/topics.component */ "./src/components/topics/topics.component.ts");
/* harmony import */ var _components_document_document_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../components/document/document.component */ "./src/components/document/document.component.ts");
/* harmony import */ var _components_settings_settings_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../components/settings/settings.component */ "./src/components/settings/settings.component.ts");
/* harmony import */ var _components_setpassword_setpassword_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../components/setpassword/setpassword.component */ "./src/components/setpassword/setpassword.component.ts");
/* harmony import */ var src_components_signdoc_signdoc_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! src/components/signdoc/signdoc.component */ "./src/components/signdoc/signdoc.component.ts");
/* harmony import */ var src_components_chat_chat_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! src/components/chat/chat.component */ "./src/components/chat/chat.component.ts");
/* harmony import */ var _components_messenger_messenger_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../components/messenger/messenger.component */ "./src/components/messenger/messenger.component.ts");
/* harmony import */ var _components_votingdetails_votingdetails_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../components/votingdetails/votingdetails.component */ "./src/components/votingdetails/votingdetails.component.ts");
/* harmony import */ var src_components_votingresults_votingresults_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! src/components/votingresults/votingresults.component */ "./src/components/votingresults/votingresults.component.ts");
/* harmony import */ var _components_recordedit_recordedit_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../components/recordedit/recordedit.component */ "./src/components/recordedit/recordedit.component.ts");
/* harmony import */ var _components_recorddetails_recorddetails_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../components/recorddetails/recorddetails.component */ "./src/components/recorddetails/recorddetails.component.ts");
/* harmony import */ var _components_votings_votings_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ../components/votings/votings.component */ "./src/components/votings/votings.component.ts");
/* harmony import */ var src_components_esigndocs_esigndocs_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! src/components/esigndocs/esigndocs.component */ "./src/components/esigndocs/esigndocs.component.ts");
/* harmony import */ var src_components_esigndocdetails_esigndocdetails_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! src/components/esigndocdetails/esigndocdetails.component */ "./src/components/esigndocdetails/esigndocdetails.component.ts");
/* harmony import */ var _components_rtc_rtc_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ../components/rtc/rtc.component */ "./src/components/rtc/rtc.component.ts");
/* harmony import */ var _components_surveys_surveys_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ../components/surveys/surveys.component */ "./src/components/surveys/surveys.component.ts");
/* harmony import */ var _components_surveyresults_surveyresults_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ../components/surveyresults/surveyresults.component */ "./src/components/surveyresults/surveyresults.component.ts");
/* harmony import */ var _components_support_support_component__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ../components/support/support.component */ "./src/components/support/support.component.ts");
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
    { path: 'login', component: _components_login_login_component__WEBPACK_IMPORTED_MODULE_8__["LoginComponent"] },
    { path: 'logout', component: _components_login_login_component__WEBPACK_IMPORTED_MODULE_8__["LoginComponent"] },
    { path: '', component: _components_home_home_component__WEBPACK_IMPORTED_MODULE_6__["HomeComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'calendar', component: _components_calendar_calendar_component__WEBPACK_IMPORTED_MODULE_7__["CalendarComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'forgot-password', component: _components_forgotpassword_forgotpassword_component__WEBPACK_IMPORTED_MODULE_9__["ForgotpasswordComponent"] },
    { path: 'set-password', component: _components_setpassword_setpassword_component__WEBPACK_IMPORTED_MODULE_23__["SetpasswordComponent"] },
    { path: 'set-password/:token', component: _components_setpassword_setpassword_component__WEBPACK_IMPORTED_MODULE_23__["SetpasswordComponent"] },
    { path: 'my-profile', component: _components_profiledetails_profiledetails_component__WEBPACK_IMPORTED_MODULE_14__["ProfileDetailsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'my-profile/edit', component: _components_profileedit_profileedit_component__WEBPACK_IMPORTED_MODULE_15__["ProfileeditComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'profiles', data: { app: 'meetings', model: 'Profile' }, component: _components_profiles_profiles_component__WEBPACK_IMPORTED_MODULE_16__["ProfilesComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'profiles/directors', data: { app: 'meetings', model: 'Profile' }, component: _components_profiles_profiles_component__WEBPACK_IMPORTED_MODULE_16__["ProfilesComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'profiles/admins', data: { app: 'meetings', model: 'Profile' }, component: _components_profiles_profiles_component__WEBPACK_IMPORTED_MODULE_16__["ProfilesComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'profiles/staff', data: { app: 'meetings', model: 'Profile' }, component: _components_profiles_profiles_component__WEBPACK_IMPORTED_MODULE_16__["ProfilesComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'profile/:id', component: _components_profiledetails_profiledetails_component__WEBPACK_IMPORTED_MODULE_14__["ProfileDetailsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'director/:id', component: _components_profiledetails_profiledetails_component__WEBPACK_IMPORTED_MODULE_14__["ProfileDetailsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'admin/:id', component: _components_profiledetails_profiledetails_component__WEBPACK_IMPORTED_MODULE_14__["ProfileDetailsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'staff/:id', component: _components_profiledetails_profiledetails_component__WEBPACK_IMPORTED_MODULE_14__["ProfileDetailsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'committees', data: { app: 'meetings', model: 'Committee' }, component: _components_committees_committees_component__WEBPACK_IMPORTED_MODULE_10__["CommitteesComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'committees/:id', component: _components_committeedetails_committeedetails_component__WEBPACK_IMPORTED_MODULE_11__["CommitteeDetailsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'resources', data: { app: 'resources', model: 'Folder', search_models: { resources: ['Folder', 'ResourceDocument'] } }, component: _components_resources_resources_component__WEBPACK_IMPORTED_MODULE_17__["ResourcesComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'meetings/archived', data: { app: 'meetings', model: 'Event', search_models: { meetings: ['Event', 'Topic', 'MeetingDocument', 'AgendaDocument'] } }, component: _components_meetings_meetings_component__WEBPACK_IMPORTED_MODULE_12__["MeetingsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'meetings/completed', data: { app: 'meetings', model: 'Event', search_models: { meetings: ['Event', 'Topic', 'MeetingDocument', 'AgendaDocument'] } }, component: _components_meetings_meetings_component__WEBPACK_IMPORTED_MODULE_12__["MeetingsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'meetings/upcoming', data: { app: 'meetings', model: 'Event', search_models: { meetings: ['Event', 'Topic', 'MeetingDocument', 'AgendaDocument'] } }, component: _components_meetings_meetings_component__WEBPACK_IMPORTED_MODULE_12__["MeetingsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'meetings/draft', data: { app: 'meetings', model: 'Event', search_models: { meetings: ['Event', 'Topic', 'MeetingDocument', 'AgendaDocument'] } }, component: _components_meetings_meetings_component__WEBPACK_IMPORTED_MODULE_12__["MeetingsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'upcoming/meeting/:id', component: _components_meetingdetails_meetingdetails_component__WEBPACK_IMPORTED_MODULE_13__["MeetingDetailsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'completed/meeting/:id', component: _components_meetingdetails_meetingdetails_component__WEBPACK_IMPORTED_MODULE_13__["MeetingDetailsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'draft/meeting/:id', component: _components_meetingdetails_meetingdetails_component__WEBPACK_IMPORTED_MODULE_13__["MeetingDetailsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'meeting/archived/:id', component: _components_meetingdetails_meetingdetails_component__WEBPACK_IMPORTED_MODULE_13__["MeetingDetailsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'meeting/:id', component: _components_meetingdetails_meetingdetails_component__WEBPACK_IMPORTED_MODULE_13__["MeetingDetailsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'resource/:id', component: _components_resourcedetails_resourcedetails_component__WEBPACK_IMPORTED_MODULE_18__["ResourceDetailsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'home/meeting/:id', component: _components_meetingdetails_meetingdetails_component__WEBPACK_IMPORTED_MODULE_13__["MeetingDetailsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'survey/:id', component: _components_survey_survey_component__WEBPACK_IMPORTED_MODULE_19__["SurveyComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'home/survey/:id', component: _components_survey_survey_component__WEBPACK_IMPORTED_MODULE_19__["SurveyComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'topic/:id', component: _components_topics_topics_component__WEBPACK_IMPORTED_MODULE_20__["TopicsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'signature/doc/:res_id', component: src_components_signdoc_signdoc_component__WEBPACK_IMPORTED_MODULE_24__["SigndocComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: ':doc_type/doc/:res_id', component: _components_document_document_component__WEBPACK_IMPORTED_MODULE_21__["DocumentComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: ':doc_type/doc/:res_id/:kw', component: _components_document_document_component__WEBPACK_IMPORTED_MODULE_21__["DocumentComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'iframe/:doc_type/:res_id/:token', component: _components_document_document_component__WEBPACK_IMPORTED_MODULE_21__["DocumentComponent"] },
    { path: 'chat', component: src_components_chat_chat_component__WEBPACK_IMPORTED_MODULE_25__["ChatComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'messenger', component: _components_messenger_messenger_component__WEBPACK_IMPORTED_MODULE_26__["MessengerComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'comments/:res_modal', component: _components_comments_comments_component__WEBPACK_IMPORTED_MODULE_0__["CommentsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'settings', component: _components_settings_settings_component__WEBPACK_IMPORTED_MODULE_22__["SettingsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'meetings/completed/:id', component: _components_meetingdetails_meetingdetails_component__WEBPACK_IMPORTED_MODULE_13__["MeetingDetailsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'meetings/archived/:id', component: _components_meetingdetails_meetingdetails_component__WEBPACK_IMPORTED_MODULE_13__["MeetingDetailsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'edit/:app/:model/:id/:action', component: _components_recordedit_recordedit_component__WEBPACK_IMPORTED_MODULE_29__["RecordEditComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'edit/:app/:model/add', component: _components_recordedit_recordedit_component__WEBPACK_IMPORTED_MODULE_29__["RecordEditComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: ':app/:model/details/:id', component: _components_recorddetails_recorddetails_component__WEBPACK_IMPORTED_MODULE_30__["RecorddetailsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'surveys', data: { app: 'survey', model: 'Survey', search_models: { survey: ['Survey', 'Question'] } }, component: _components_surveys_surveys_component__WEBPACK_IMPORTED_MODULE_35__["SurveysComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'signdocs', data: { app: 'esign', model: 'SignatureDoc' }, component: src_components_esigndocs_esigndocs_component__WEBPACK_IMPORTED_MODULE_32__["EsignDocsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'votings', data: { app: 'voting', model: 'Voting', search_models: { voting: ['Voting', 'VotingChoice', 'VotingType'] } }, component: _components_votings_votings_component__WEBPACK_IMPORTED_MODULE_31__["VotingsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'actions/surveys', data: { app: 'survey', model: 'Survey', search_models: { survey: ['Survey', 'Question'] } }, component: _components_surveys_surveys_component__WEBPACK_IMPORTED_MODULE_35__["SurveysComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'actions/signdocs', data: { app: 'esign', model: 'SignatureDoc' }, component: src_components_esigndocs_esigndocs_component__WEBPACK_IMPORTED_MODULE_32__["EsignDocsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'actions/votings', data: { app: 'voting', model: 'Voting', search_models: { voting: ['Voting', 'VotingChoice', 'VotingType'] } }, component: _components_votings_votings_component__WEBPACK_IMPORTED_MODULE_31__["VotingsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'actions', data: { app: 'voting', model: 'Voting', search_models: { survey: ['Survey', 'Question'], esign: ['SignatureDoc'], voting: ['Voting', 'VotingChoice', 'VotingType'] } }, component: _components_votings_votings_component__WEBPACK_IMPORTED_MODULE_31__["VotingsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'voting/:id', component: _components_votingdetails_votingdetails_component__WEBPACK_IMPORTED_MODULE_27__["VotingdetailsComponent"] },
    { path: 'voting/:id/results', component: src_components_votingresults_votingresults_component__WEBPACK_IMPORTED_MODULE_28__["VotingresultsComponent"] },
    { path: 'survey/:id/results', component: _components_surveyresults_surveyresults_component__WEBPACK_IMPORTED_MODULE_36__["SurveyresultsComponent"] },
    { path: 'signdoc/:id', component: src_components_esigndocdetails_esigndocdetails_component__WEBPACK_IMPORTED_MODULE_33__["EsignDocDetailsComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]] },
    { path: 'token-sign-doc/:id/:token', component: src_components_esigndocdetails_esigndocdetails_component__WEBPACK_IMPORTED_MODULE_33__["EsignDocDetailsComponent"] },
    { path: 'support', component: _components_support_support_component__WEBPACK_IMPORTED_MODULE_37__["SupportComponent"] },
    { path: 'rtc', component: _components_rtc_rtc_component__WEBPACK_IMPORTED_MODULE_34__["RtcComponent"] },
    // otherwise redirect to home
    { path: '**', component: _pagenotfound__WEBPACK_IMPORTED_MODULE_4__["PageNotFound"] }
];
var site_functions = window['functions'];
var routing_options = {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(appRoutes, { useHash: true })],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
};
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule(router, socketService) {
        this.router = router;
        this.socketService = socketService;
        var crouter = router;
        router.events.subscribe(function (event) {
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__["NavigationStart"]) {
                // console.log(event, router.routerState);
                socketService.init_route(event.url);
                $('.hidemouseaway').hide();
                $('.searchbar-full-width').hide();
                $('.modal:visible button.close:first').click();
                socketService.search_bar_shown = false;
                site_functions.showLoader('route' + event.url);
                $('body').removeClass('pdf-viewer');
                window['pathname'] = event.url;
            }
            else if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__["NavigationEnd"]) {
                var next_url = event.url;
                var current_url = localStorage.getItem('current_url');
                if (!current_url) {
                    current_url = next_url;
                }
                localStorage.setItem('previous_url', current_url);
                localStorage.setItem('current_url', next_url);
                site_functions.hideLoader('route' + next_url);
            }
            else if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__["RoutesRecognized"]) {
                var route = event.state.root.firstChild;
                socketService.route_changed(route);
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

module.exports = "<div class=\"header-div\">\n    <app-header></app-header>\n</div>\n<div class=\"pager-div\">\n    <aside class=\"app-sidebar\">\n        <ul class=\"app-menu\">            \n            <li><a class=\"app-menu__item\" routerLink=\"/\"><i class=\"icon-dashboard app-menu__icon\"></i> <span class=\"app-menu__label\">Dashboard</span></a></li>\n            <li><a class=\"app-menu__item\" routerLink=\"/meetings/upcoming\"><i class=\"icon-meeting app-menu__icon\"></i> <span class=\"app-menu__label\">Meetings</span></a></li>\n            <li><a class=\"app-menu__item\" routerLink=\"/votings\"><i class=\"icon-action app-menu__icon\"></i> <span class=\"app-menu__label\">Actions</span></a> </li>\n            <li><a class=\"app-menu__item\" routerLink=\"/resources\"><i class=\"icon-folder app-menu__icon\"></i> <span class=\"app-menu__label\">Resources</span></a> </li>\n            <li><a class=\"app-menu__item\" routerLink=\"/committees\"><i class=\"icon-committees\t app-menu__icon\"></i> <span class=\"app-menu__label\">Committees</span></a> </li>\n            <li><a class=\"app-menu__item\" routerLink=\"/profiles/directors\"><i class=\"icon-profile app-menu__icon\"></i> <span class=\"app-menu__label\">Profiles</span></a> </li>\n        </ul>\n    </aside>\n    <div class=\"app-content\">\n        <div id=\"server-wait\" class=\"loadingoverlay\">            \n            <div class=\"spinner-border text-primary\" role=\"status\">\n                <span class=\"sr-only\">Loading...</span>\n            </div>\n        </div>\n        <div id=\"main-div\" class=\"main-div\">\n            <router-outlet></router-outlet>\n        </div>\n\n        <div class=\"popup messenger\">\n            <div class=\"messenger-head\">\n\t\t\t\t<a class=\"full-messger-link\" routerLink=\"/messenger\">\n\t\t\t\t\t<i class=\"fas fa-expand-arrows-alt\"></i> Full messenger\n\t\t\t\t</a>\n\t\t\t\t<button class=\"popup-closer\" (click)=\"close_messenger_popup()\">\n\t\t\t\t<i class=\"fas fa-times\"></i>\n            </button>\n\t\t\t</div>\n\n            <app-messenger>\n            </app-messenger>\n        </div>\n\n        <div class=\"modal fade video\" id=\"appModal\" role=\"dialog\" aria-hidden=\"true\">\n            <div class=\"modal-dialog modal-lg modal-dialog-centered\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <span class=\"title\"></span>\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">×</span></button>\n                    </div>\n                    <div class=\"modal-body\">\n                        \n                    </div>\n                    <div class=\"modal-footer\">\n                        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n                    </div>\n                </div>\n            </div>\n        </div>        \n\n        <div id=\"rtc-container\" style=\"display:none\" class=\"make-center full\">\n            <!-- <link type=\"text/css\" rel=\"stylesheet\" href=\"/static/assets/rtc/style.css\"/> -->\n            <link type=\"text/css\" rel=\"stylesheet\" href=\"/static/assets/rtc/getHTMLMediaElement.css\"/>    \n            <div class=\"closer max\">\n                <div class=\"minimizer\">\n                    <span (click)=\"socketService.video_call.minimize()\">\n                    <i class=\"fa fa-window-minimize\"></i>\n                    </span>\n                    <span (click)=\"socketService.video_call.quit()\">\n                    <i class=\"fa fa-window-close\"></i>\n                    </span>                       \n                </div>\n                <div class=\"maximizer\">\n                    <span (click)=\"socketService.video_call.maximize()\" >\n                    <i class=\"fa fa-window-maximize\"></i>\n                    </span>\n                    <span (click)=\"socketService.video_call.quit()\">\n                    <i class=\"fa fa-window-close\"></i>\n                    </span>\n                </div>\n            </div>\n\n            <div class=\"CallingOutterwrapper\" *ngIf=\"socketService.video_call\">\n\n                <div class=\"CallingContainer\" *ngIf=\"socketService.video_call.state == 'incoming'\">\n                    <div class=\"user-call-infobox-wrapper\">\n                        <div class=\"user-call-img-wrapper\">\n                            <img src=\"{{socketService.server_url}}{{socketService.video_call.caller.photo}}\" alt=\"Avatar\" />\n                        </div>\n                        <h5 class=\"text-center\">Incoming Call From</h5>                        \n                        <span class=\"d-block text-center\">{{socketService.video_call.caller.name}}</span>                        \n                    </div>\n                    <div class=\"spinner\">\n                        <div></div>\n                        <div></div>\n                        <div></div>\n                        <div></div>\n                    </div>                        \n                    \n                    <div class=\"CallOptionsButton\">                            \n                        <a class=\"accept\" (click)=\"socketService.video_call.accept()\">\n                            <img src=\"static/assets/images/end-call.png\" alt=\"Avatar\" />\n                        </a>\n                        <a class=\"reject\" (click)=\"socketService.video_call.reject()\">\n                            <img src=\"static/assets/images/end-call.png\" alt=\"Avatar\" />\n                        </a>\n                    </div>                    \n                    \n                    <audio class=\"call_sound\" style=\"display:none\" controls autoplay>\n                        <source src=\"/static/assets/audio/call.mp3\" type=\"audio/mpeg\">\n                    </audio>\n                </div>\n\n                <div class=\"CallingContainer\" *ngIf=\"socketService.video_call.state == 'outgoing'\">\n                    <div class=\"user-call-infobox-wrapper\">\n                        <div class=\"user-call-img-wrapper\">\n                            <img src=\"{{socketService.server_url}}{{socketService.video_call.callee.photo}}\" alt=\"Avatar\" />\n                        </div>\n                        <h5 class=\"text-center\">Calling</h5>\n                        <span class=\"d-block text-center\">{{socketService.video_call.callee.name}}</span>                        \n                    </div>\n                    <div class=\"spinner\">\n                        <div></div>\n                        <div></div>\n                        <div></div>\n                        <div></div>\n                    </div>\n                    \n                    <div class=\"CallOptionsButton\">\n                        <a class=\"reject\" (click)=\"socketService.video_call.cancel()\">\n                            <img src=\"static/assets/images/end-call.png\" alt=\"Avatar\" />\n                        </a>\n                    </div>                    \n                    \n                    <audio class=\"call_sound\" style=\"display:none\" controls autoplay>\n                        <source src=\"/static/assets/audio/call.mp3\" type=\"audio/mpeg\">\n                    </audio>\n                </div>\n                \n                \n            </div>\n\n            <div class=\"call_room\" id=\"ongoing_controls\">\n                <div class=\"setup-buttons\">\n                    <input type=\"text\" id=\"room-id\" value=\"abcdef\" \n                    autocorrect=\"off\" autocapitalize=\"off\" size=\"20\"\n                    style=\"display:none\"\n                    >\n                    <!-- <button id=\"toggle-camera\" (click)=\"socketService.video_call.toggle_camera()\">Toggle Camera</button> -->\n                    <button id=\"open-room\" style=\"display:none\">Open Room</button>\n                    <button id=\"share-screen\" disabled=\"\">Share Your Screen</button>\n                    <button id=\"leave-room\" (click)=\"socketService.video_call.terminate()\">Hangup (Leave)</button>\n                </div>\n            </div>\n            \n            <div id=\"videos-container\" style=\"margin: 20px 0;\"></div>                \n        </div>\n        \n        <div class=\"modal fade\" id=\"signModal\" role=\"dialog\" aria-hidden=\"true\">\n            <div class=\"modal-dialog modal-md modal-dialog-centered\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">×</button>\n                    </div>\n                    <div id=\"signature-body\" class=\"modal-body\" style=\"min-height: 1009px;\">\n                        <div class=\"DocsButtonWrapper\">\n                            <span class=\"btn btn-primary btn-sm DocsBtn\" id=\"draw-sig\">Draw</span>\n                            <span id=\"upload-sig-btn\" class=\"btn btn-sm btn-primary DocsBtn o_select_file_button\" title=\"Select\" >Upload</span>\n                            <input id=\"upload-sig\" accept=\".jpg,.png,.jpeg\" style=\"display:none\" type=\"file\">\n                            <span class=\"btn btn-primary btn-sm DocsBtn\" id=\"auto-sig\">Auto</span>                            \n                        </div>\n                        <div id=\"signature_editor\" class=\"kbw-signature\">\n                        </div>\n                        <span class=\"btn btn-danger btn-sm DocsBtn\" id=\"clear-sig\">Clear</span>\n                        <span class=\"btn btn-primary btn-sm DocsBtn\" id=\"save-sig\">Save</span>\n                    </div>\n                    <div class=\"modal-footer\">\n                        <button type=\"button\" class=\"btn btn-sm btn-default\" data-dismiss=\"modal\">Close</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<button (click)=\"topFunction()\" id=\"backTop\" title=\"Go to top\">\n    <i class=\"fa fa-arrow-up\"></i>\n</button>\n"

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
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("backTop").style.display = "block";
        }
        else {
            document.getElementById("backTop").style.display = "none";
        }
    };
    AppComponent.prototype.close_messenger_popup = function () {
        $('.popup.messenger').hide();
    };
    AppComponent.prototype.ngOnInit = function () {
        var obj_this = this;
        window['loader'] = $('#server-wait');
        window.onscroll = function () { obj_this.scrollFunction(); };
        var treeviewMenu = $('.app-menu');
        $('body').on('click', '.main-nav-header [data-toggle="sidebar"]', function (event) {
            event.preventDefault();
            $('body.user').toggleClass('sidenav-toggled');
        });
        $('body').on('click', '.main-nav-header [data-toggle="treeview"]', function (event) {
            console.log('toggleing 2');
            event.preventDefault();
            if (!$(this).parent().hasClass('is-expanded')) {
                treeviewMenu.find("[data-toggle='treeview']").parent().removeClass('is-expanded');
            }
            $(this).parent().toggleClass('is-expanded');
        });
        $("body").on("click", ".top-search-btn", function () {
            $(".serach-input")
                .toggleClass("active")
                .focus();
            $(".btn-search").toggleClass("animate");
            $(".serach-input").val("");
        });
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
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _pipes_format_time_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pipes/format-time.pipe */ "./src/app/pipes/format-time.pipe.ts");
/* harmony import */ var _pipes_keys_pipe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pipes/keys.pipe */ "./src/app/pipes/keys.pipe.ts");
/* harmony import */ var _pipes_camel_pipe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pipes/camel.pipe */ "./src/app/pipes/camel.pipe.ts");
/* harmony import */ var _socket_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./socket.service */ "./src/app/socket.service.ts");
/* harmony import */ var _http_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./http.service */ "./src/app/http.service.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _auth_guard__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./auth.guard */ "./src/app/auth.guard.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_router_testing__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router/testing */ "./node_modules/@angular/router/fesm5/testing.js");
/* harmony import */ var angular_mentions__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! angular-mentions */ "./node_modules/angular-mentions/fesm5/angular-mentions.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/fesm5/ng-select.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _pipes_date_ago_pipe__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./pipes/date-ago.pipe */ "./src/app/pipes/date-ago.pipe.ts");
/* harmony import */ var _pipes_string_first_to_upper_pipe__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./pipes/string-first-to-upper.pipe */ "./src/app/pipes/string-first-to-upper.pipe.ts");
/* harmony import */ var _components_login_login_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../components/login/login.component */ "./src/components/login/login.component.ts");
/* harmony import */ var _components_home_home_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../components/home/home.component */ "./src/components/home/home.component.ts");
/* harmony import */ var _pagenotfound__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./pagenotfound */ "./src/app/pagenotfound.ts");
/* harmony import */ var _components_header_header_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../components/header/header.component */ "./src/components/header/header.component.ts");
/* harmony import */ var _components_chat_chat_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../components/chat/chat.component */ "./src/components/chat/chat.component.ts");
/* harmony import */ var _components_committees_committees_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../components/committees/committees.component */ "./src/components/committees/committees.component.ts");
/* harmony import */ var _components_committeedetails_committeedetails_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../components/committeedetails/committeedetails.component */ "./src/components/committeedetails/committeedetails.component.ts");
/* harmony import */ var _components_profiledetails_profiledetails_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../components/profiledetails/profiledetails.component */ "./src/components/profiledetails/profiledetails.component.ts");
/* harmony import */ var _components_profiles_profiles_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../components/profiles/profiles.component */ "./src/components/profiles/profiles.component.ts");
/* harmony import */ var _components_meetings_meetings_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../components/meetings/meetings.component */ "./src/components/meetings/meetings.component.ts");
/* harmony import */ var _components_meetingdetails_meetingdetails_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../components/meetingdetails/meetingdetails.component */ "./src/components/meetingdetails/meetingdetails.component.ts");
/* harmony import */ var _components_resources_resources_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ../components/resources/resources.component */ "./src/components/resources/resources.component.ts");
/* harmony import */ var _components_resourcedetails_resourcedetails_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ../components/resourcedetails/resourcedetails.component */ "./src/components/resourcedetails/resourcedetails.component.ts");
/* harmony import */ var _components_survey_survey_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ../components/survey/survey.component */ "./src/components/survey/survey.component.ts");
/* harmony import */ var _components_topics_topics_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ../components/topics/topics.component */ "./src/components/topics/topics.component.ts");
/* harmony import */ var _components_paginator_paginator_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ../components/paginator/paginator.component */ "./src/components/paginator/paginator.component.ts");
/* harmony import */ var _components_document_document_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ../components/document/document.component */ "./src/components/document/document.component.ts");
/* harmony import */ var _components_settings_settings_component__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ../components/settings/settings.component */ "./src/components/settings/settings.component.ts");
/* harmony import */ var _components_setpassword_setpassword_component__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ../components/setpassword/setpassword.component */ "./src/components/setpassword/setpassword.component.ts");
/* harmony import */ var _components_forgotpassword_forgotpassword_component__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ../components/forgotpassword/forgotpassword.component */ "./src/components/forgotpassword/forgotpassword.component.ts");
/* harmony import */ var _components_signdoc_signdoc_component__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ../components/signdoc/signdoc.component */ "./src/components/signdoc/signdoc.component.ts");
/* harmony import */ var _components_comments_comments_component__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ../components/comments/comments.component */ "./src/components/comments/comments.component.ts");
/* harmony import */ var _components_messenger_messenger_component__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ../components/messenger/messenger.component */ "./src/components/messenger/messenger.component.ts");
/* harmony import */ var _components_messageicon_messageicon_component__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ../components/messageicon/messageicon.component */ "./src/components/messageicon/messageicon.component.ts");
/* harmony import */ var _components_votingdetails_votingdetails_component__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ../components/votingdetails/votingdetails.component */ "./src/components/votingdetails/votingdetails.component.ts");
/* harmony import */ var _components_votingresults_votingresults_component__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ../components/votingresults/votingresults.component */ "./src/components/votingresults/votingresults.component.ts");
/* harmony import */ var _components_recordedit_recordedit_component__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ../components/recordedit/recordedit.component */ "./src/components/recordedit/recordedit.component.ts");
/* harmony import */ var _components_votings_votings_component__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ../components/votings/votings.component */ "./src/components/votings/votings.component.ts");
/* harmony import */ var src_components_esigndocs_esigndocs_component__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! src/components/esigndocs/esigndocs.component */ "./src/components/esigndocs/esigndocs.component.ts");
/* harmony import */ var src_components_esigndocdetails_esigndocdetails_component__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! src/components/esigndocdetails/esigndocdetails.component */ "./src/components/esigndocdetails/esigndocdetails.component.ts");
/* harmony import */ var _components_rtc_rtc_component__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ../components/rtc/rtc.component */ "./src/components/rtc/rtc.component.ts");
/* harmony import */ var _components_surveys_surveys_component__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ../components/surveys/surveys.component */ "./src/components/surveys/surveys.component.ts");
/* harmony import */ var _components_recorddetails_recorddetails_component__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ../components/recorddetails/recorddetails.component */ "./src/components/recorddetails/recorddetails.component.ts");
/* harmony import */ var _components_calendar_calendar_component__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ../components/calendar/calendar.component */ "./src/components/calendar/calendar.component.ts");
/* harmony import */ var _components_breadcrumb_breadcrumb_component__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ../components/breadcrumb/breadcrumb.component */ "./src/components/breadcrumb/breadcrumb.component.ts");
/* harmony import */ var _components_surveyresults_surveyresults_component__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ../components/surveyresults/surveyresults.component */ "./src/components/surveyresults/surveyresults.component.ts");
/* harmony import */ var _components_meetingresponse_meetingresponse_component__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ../components/meetingresponse/meetingresponse.component */ "./src/components/meetingresponse/meetingresponse.component.ts");
/* harmony import */ var _components_support_support_component__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ../components/support/support.component */ "./src/components/support/support.component.ts");
/* harmony import */ var _components_profileedit_profileedit_component__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ../components/profileedit/profileedit.component */ "./src/components/profileedit/profileedit.component.ts");
/* harmony import */ var _components_roster_roster_component__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ../components/roster/roster.component */ "./src/components/roster/roster.component.ts");
/* harmony import */ var _components_profilesummary_profilesummary_component__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ../components/profilesummary/profilesummary.component */ "./src/components/profilesummary/profilesummary.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






























































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _app_routing_module__WEBPACK_IMPORTED_MODULE_11__["AppRoutingModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_16__["NgSelectModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                angular_mentions__WEBPACK_IMPORTED_MODULE_15__["MentionModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_13__["RouterModule"],
                _angular_router_testing__WEBPACK_IMPORTED_MODULE_14__["RouterTestingModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_17__["NgbModule"],
            ],
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_10__["AppComponent"],
                _components_home_home_component__WEBPACK_IMPORTED_MODULE_21__["HomeComponent"],
                _components_login_login_component__WEBPACK_IMPORTED_MODULE_20__["LoginComponent"],
                _pagenotfound__WEBPACK_IMPORTED_MODULE_22__["PageNotFound"],
                _components_header_header_component__WEBPACK_IMPORTED_MODULE_23__["HeaderComponent"],
                _components_profiledetails_profiledetails_component__WEBPACK_IMPORTED_MODULE_27__["ProfileDetailsComponent"],
                _components_profiles_profiles_component__WEBPACK_IMPORTED_MODULE_28__["ProfilesComponent"],
                _components_committees_committees_component__WEBPACK_IMPORTED_MODULE_25__["CommitteesComponent"],
                _components_committeedetails_committeedetails_component__WEBPACK_IMPORTED_MODULE_26__["CommitteeDetailsComponent"],
                _components_resources_resources_component__WEBPACK_IMPORTED_MODULE_31__["ResourcesComponent"],
                _components_resourcedetails_resourcedetails_component__WEBPACK_IMPORTED_MODULE_32__["ResourceDetailsComponent"],
                _components_meetings_meetings_component__WEBPACK_IMPORTED_MODULE_29__["MeetingsComponent"],
                _components_meetingdetails_meetingdetails_component__WEBPACK_IMPORTED_MODULE_30__["MeetingDetailsComponent"],
                _components_survey_survey_component__WEBPACK_IMPORTED_MODULE_33__["SurveyComponent"],
                _components_topics_topics_component__WEBPACK_IMPORTED_MODULE_34__["TopicsComponent"],
                _pipes_format_time_pipe__WEBPACK_IMPORTED_MODULE_5__["FormatTimePipe"],
                _pipes_camel_pipe__WEBPACK_IMPORTED_MODULE_7__["CamelCasePipe"],
                _components_paginator_paginator_component__WEBPACK_IMPORTED_MODULE_35__["PaginatorComponent"],
                _components_document_document_component__WEBPACK_IMPORTED_MODULE_36__["DocumentComponent"],
                _components_settings_settings_component__WEBPACK_IMPORTED_MODULE_37__["SettingsComponent"],
                _pipes_keys_pipe__WEBPACK_IMPORTED_MODULE_6__["KeysPipe"],
                _components_chat_chat_component__WEBPACK_IMPORTED_MODULE_24__["ChatComponent"],
                _components_setpassword_setpassword_component__WEBPACK_IMPORTED_MODULE_38__["SetpasswordComponent"],
                _components_forgotpassword_forgotpassword_component__WEBPACK_IMPORTED_MODULE_39__["ForgotpasswordComponent"],
                _components_signdoc_signdoc_component__WEBPACK_IMPORTED_MODULE_40__["SigndocComponent"],
                _components_comments_comments_component__WEBPACK_IMPORTED_MODULE_41__["CommentsComponent"],
                _components_messenger_messenger_component__WEBPACK_IMPORTED_MODULE_42__["MessengerComponent"],
                _components_messageicon_messageicon_component__WEBPACK_IMPORTED_MODULE_43__["MessageiconComponent"],
                _components_votingdetails_votingdetails_component__WEBPACK_IMPORTED_MODULE_44__["VotingdetailsComponent"],
                _components_votingresults_votingresults_component__WEBPACK_IMPORTED_MODULE_45__["VotingresultsComponent"],
                _components_recordedit_recordedit_component__WEBPACK_IMPORTED_MODULE_46__["RecordEditComponent"],
                _components_votings_votings_component__WEBPACK_IMPORTED_MODULE_47__["VotingsComponent"],
                src_components_esigndocs_esigndocs_component__WEBPACK_IMPORTED_MODULE_48__["EsignDocsComponent"],
                src_components_esigndocdetails_esigndocdetails_component__WEBPACK_IMPORTED_MODULE_49__["EsignDocDetailsComponent"],
                _components_rtc_rtc_component__WEBPACK_IMPORTED_MODULE_50__["RtcComponent"],
                _components_surveys_surveys_component__WEBPACK_IMPORTED_MODULE_51__["SurveysComponent"],
                _components_recorddetails_recorddetails_component__WEBPACK_IMPORTED_MODULE_52__["RecorddetailsComponent"],
                _components_calendar_calendar_component__WEBPACK_IMPORTED_MODULE_53__["CalendarComponent"],
                _components_breadcrumb_breadcrumb_component__WEBPACK_IMPORTED_MODULE_54__["BreadcrumbComponent"],
                _components_surveyresults_surveyresults_component__WEBPACK_IMPORTED_MODULE_55__["SurveyresultsComponent"],
                _components_meetingresponse_meetingresponse_component__WEBPACK_IMPORTED_MODULE_56__["MeetingresponseComponent"],
                _components_support_support_component__WEBPACK_IMPORTED_MODULE_57__["SupportComponent"],
                _components_profileedit_profileedit_component__WEBPACK_IMPORTED_MODULE_58__["ProfileeditComponent"],
                _pipes_date_ago_pipe__WEBPACK_IMPORTED_MODULE_18__["DateAgoPipe"],
                _pipes_string_first_to_upper_pipe__WEBPACK_IMPORTED_MODULE_19__["StringFirstToUpperPipe"],
                _components_roster_roster_component__WEBPACK_IMPORTED_MODULE_59__["RosterComponent"],
                _components_profilesummary_profilesummary_component__WEBPACK_IMPORTED_MODULE_60__["ProfilesummaryComponent"],
            ],
            providers: [
                _auth_guard__WEBPACK_IMPORTED_MODULE_12__["AuthGuard"],
                _socket_service__WEBPACK_IMPORTED_MODULE_8__["SocketService"],
                _http_service__WEBPACK_IMPORTED_MODULE_9__["HttpService"],
                _angular_common__WEBPACK_IMPORTED_MODULE_4__["Location"],
                { provide: _angular_common__WEBPACK_IMPORTED_MODULE_4__["LocationStrategy"], useClass: _angular_common__WEBPACK_IMPORTED_MODULE_4__["HashLocationStrategy"] }
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_10__["AppComponent"]],
            entryComponents: [_components_messageicon_messageicon_component__WEBPACK_IMPORTED_MODULE_43__["MessageiconComponent"], _components_messenger_messenger_component__WEBPACK_IMPORTED_MODULE_42__["MessengerComponent"], _components_chat_chat_component__WEBPACK_IMPORTED_MODULE_24__["ChatComponent"], _components_comments_comments_component__WEBPACK_IMPORTED_MODULE_41__["CommentsComponent"], _components_document_document_component__WEBPACK_IMPORTED_MODULE_36__["DocumentComponent"], _components_profilesummary_profilesummary_component__WEBPACK_IMPORTED_MODULE_60__["ProfilesummaryComponent"]],
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
        var cuser = window['current_user'].cookie;
        if (cuser && cuser.token) {
            return true;
        }
        else {
            window['functions'].hideLoader('route/' + route.routeConfig.path);
            window['functions'].go_to_login();
            return false;
        }
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
    HttpService.prototype.search = function (input_data, success_cb, failure_cb) {
        var options = this.makeOptions_search('get', input_data, success_cb, failure_cb);
        window['dn_rpc_object'](options);
    };
    HttpService.prototype.get = function (input_data, success_cb, failure_cb) {
        var options = this.makeOptions_secure('get', input_data, success_cb, failure_cb);
        window['dn_rpc_object'](options);
    };
    HttpService.prototype.post = function (input_data, success_cb, failure_cb) {
        var options = this.makeOptions_secure('post', input_data, success_cb, failure_cb);
        window['dn_rpc_object'](options);
    };
    HttpService.prototype.post_public = function (input_data, success_cb, failure_cb) {
        var options = this.makeOptions_public(input_data, success_cb, failure_cb);
        window['dn_rpc_object'](options);
    };
    HttpService.prototype.authenticate = function (url, input_data, success_cb, failure_cb, complete_cb) {
        var httpservie = this;
        input_data = {
            args: {
                app: 'authsignup',
                model: 'AuthUser',
                method: 'login_user',
            },
            params: input_data
        };
        var options = httpservie.makeOptions_public(input_data, success_cb, failure_cb);
        options.onSuccess = function (data) {
            window['current_user'].onLogin(data);
            if (success_cb) {
                success_cb(data);
            }
        };
        options.type = 'get';
        options.onComplete = complete_cb;
        options.onError = failure_cb;
        window['dn_rpc_object'](options);
    };
    HttpService.prototype.makeOptions_secure = function (type, input_data, success_cb, failure_cb) {
        var onRequestFailed = function (res) {
            if (failure_cb)
                failure_cb(res);
        };
        var options = {
            url: '/rest/secure',
            type: type,
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
    HttpService.prototype.makeOptions_search = function (type, input_data, success_cb, failure_cb) {
        var onRequestFailed = function (res) {
            if (failure_cb)
                failure_cb(res);
        };
        var options = {
            url: '/rest/search',
            type: type,
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
    HttpService.prototype.makeOptions_public = function (input_data, success_cb, failure_cb) {
        var http_service = this;
        var onRequestFailed = function (res) {
            if (failure_cb)
                failure_cb(res);
        };
        var options = {
            url: '/rest/public',
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
            template: "\n        <div style=\"padding-top:10%; text-align:center\">\n            <h2>404- Page Not Found.</h2>\n        </div>\n    "
        })
    ], PageNotFound);
    return PageNotFound;
}());



/***/ }),

/***/ "./src/app/pipes/camel.pipe.ts":
/*!*************************************!*\
  !*** ./src/app/pipes/camel.pipe.ts ***!
  \*************************************/
/*! exports provided: CamelCasePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CamelCasePipe", function() { return CamelCasePipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var CamelCasePipe = /** @class */ (function () {
    function CamelCasePipe() {
    }
    CamelCasePipe.prototype.transform = function (value, args) {
        var keys = [];
        for (var key in value) {
            keys.push(key);
        }
        return keys;
    };
    CamelCasePipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({ name: 'keys' })
    ], CamelCasePipe);
    return CamelCasePipe;
}());

// import { Pipe, PipeTransform } from '@angular/core';
// @Pipe({name: 'camel'})
// export class CamelCasePipe implements PipeTransform {
//   transform(value: string, arg: any) : any {
//     let arr = value.split(' ');
//     let res = arr[0];
//     res = res.substr(0, 1).toUpperCase() + res.substr(1, res.length - 1);    
//     for(let i= 1; i<arr.length; i++)
//     {
//         let temp = arr[1];
//         temp = temp.substr(0, 1).toUpperCase() + temp.substr(1, temp.length - 1);
//         res += ' '+temp;
//     }
//     return res;
//   }
// }


/***/ }),

/***/ "./src/app/pipes/date-ago.pipe.ts":
/*!****************************************!*\
  !*** ./src/app/pipes/date-ago.pipe.ts ***!
  \****************************************/
/*! exports provided: DateAgoPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DateAgoPipe", function() { return DateAgoPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var DateAgoPipe = /** @class */ (function () {
    function DateAgoPipe() {
    }
    DateAgoPipe.prototype.transform = function (value, args) {
        if (value) {
            var seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
            if (seconds < 29) // less than 30 seconds ago will show as 'Just now'
                return 'Just now';
            var intervals = {
                'year': 31536000,
                'month': 2592000,
                'week': 604800,
                'day': 86400,
                'hour': 3600,
                'minute': 60,
                'second': 1
            };
            var counter = void 0;
            for (var i in intervals) {
                counter = Math.floor(seconds / intervals[i]);
                if (counter > 0)
                    if (counter === 1) {
                        return counter + ' ' + i + ' ago'; // singular (1 day ago)
                    }
                    else {
                        return counter + ' ' + i + 's ago'; // plural (2 days ago)
                    }
            }
        }
        return value;
    };
    DateAgoPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'dateAgo',
            pure: true
        })
    ], DateAgoPipe);
    return DateAgoPipe;
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
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({ name: 'formatTime' })
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

/***/ "./src/app/pipes/string-first-to-upper.pipe.ts":
/*!*****************************************************!*\
  !*** ./src/app/pipes/string-first-to-upper.pipe.ts ***!
  \*****************************************************/
/*! exports provided: StringFirstToUpperPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StringFirstToUpperPipe", function() { return StringFirstToUpperPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var StringFirstToUpperPipe = /** @class */ (function () {
    function StringFirstToUpperPipe() {
    }
    StringFirstToUpperPipe.prototype.transform = function (value, args) {
        var result = value.toLowerCase().split(' ');
        for (var i = 0; i < result.length; i++) {
            result[i] = result[i].charAt(0).toUpperCase() + result[i].substring(1);
        }
        result = result.join(' ');
        return result;
    };
    StringFirstToUpperPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'firstToUpper'
        })
    ], StringFirstToUpperPipe);
    return StringFirstToUpperPipe;
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
    function SocketService(router) {
        this.router = router;
        this.server_url = '';
        this.media_url = '';
        this.user_photo = '';
        this.on_verified = [];
        this.verified = false;
        this.iframe_url = true;
        this.not_public_url = 0;
        this.server_events = {};
        this.unseen_messages = 0;
        this.notificationList = [];
        this.current_id = undefined;
        this.site_config = undefined;
        this.current_model = undefined;
        this.search_bar_shown = false;
        this.is_admin = false;
        this.execute_on_verified = function (method) {
            if (this.verified)
                method();
            else {
                this.on_verified.push(method);
            }
        };
        this.model_routes = {
            'meetings': {
                'Event': '/meeting/',
            },
            'voting': {
                'Voting': '/voting/'
            },
            'documents': {
                'PointAnnotation': '/doc'
            }
        };
        var obj_this = this;
        obj_this.video_call = {
            id: undefined,
            message: undefined,
            caller: undefined,
            callee: undefined,
            timeout: 21000,
            init: function (uid, audio_only) {
                var video_call = this;
                video_call.drag_enabled = false;
                video_call.maximize();
                if (audio_only) {
                    video_call.is_audio_call = true;
                }
                else {
                    video_call.is_audio_call = false;
                }
                var the_user = obj_this.get_user_by_id(uid);
                if (!the_user.online) {
                    video_call.show_notification(the_user.name + ' is not online yet, but will be informed when online');
                    return;
                }
                var call_id = obj_this.user_data.id + '-' + uid + '-call';
                video_call.caller = obj_this.user_data;
                video_call.callee = the_user;
                video_call.id = call_id;
                var data = {
                    caller_id: obj_this.user_data.id,
                    callee_id: uid,
                    call_id: call_id,
                    is_audio_call: video_call.is_audio_call
                };
                // console.log(video_call.caller, video_call.callee);
                if (the_user.online) {
                    obj_this.emit_rtc_event('incoming_call', data, [uid]);
                    video_call.message = 'Calling...';
                }
                else {
                    video_call.message = "Called person is not online but will be informed about your call when he/she will be online";
                }
                video_call.state = 'outgoing';
                video_call.initialize();
                setTimeout(function () {
                    // console.log(video_call.state, video_call.callee.id, 727);
                    if (video_call.state == 'outgoing') {
                        video_call.cancel('Not available');
                    }
                }, video_call.timeout);
            },
            initialize: function () {
                this.maximize();
                $('#rtc-container').show();
            },
            show_incoming_call: function (data) {
                var video_call = this;
                if (obj_this.ongoing_call || video_call.state != 'available') {
                    video_call.show_notification('Another incoming call');
                    return;
                }
                // console.log(data, 1334);
                video_call.state = 'incoming';
                video_call.id = data.call_id;
                video_call.is_audio_call = data.is_audio_call;
                video_call.caller = obj_this.get_user_by_id(data.caller_id);
                video_call.callee = obj_this.user_data;
                video_call.initialize();
            },
            incoming_call: undefined,
            state: 'available',
            accept: function () {
                var data = {
                    user_id: obj_this.user_data.id
                };
                var video_call = this;
                obj_this.emit_rtc_event('accepted', data, [video_call.caller.id]);
                video_call.state = 'accepted';
                video_call.message = 'Connecting caller';
            },
            accepted: function (data) {
                this.start_for_me(data);
            },
            start_for_me: function (data) {
                // console.log(data, 156);
                var video_call = obj_this.video_call;
                video_call.state = 'ongoing';
                if (!video_call.id) {
                    console.log(video_call.state, 'Invalid call id, it must has been alreasy set');
                    // console.log(video_call, video_call.incoming);
                    return;
                }
                var params = {
                    uid: obj_this.user_data.id,
                    room: video_call.id,
                    token: obj_this.user_data.token
                };
                // console.log(params, 1577);
                if (!obj_this.rtc_multi_connector) {
                    obj_this.rtc_multi_connector = window['video_caller'];
                }
                obj_this.ongoing_call = video_call.id;
                // console.log(obj_this.rtc_multi_connector, 190);
                var on_started = undefined;
                if (video_call.caller.id == params.uid) {
                    on_started = function () {
                        // console.log(data, 14);
                        if (data) {
                            data = {
                                create_time: Date(),
                                room: video_call.id,
                                user_id: data.user_id
                            };
                            // console.log(data, 14889);
                            obj_this.emit_rtc_event('started_by_caller', data, [data.user_id]);
                        }
                    };
                }
                $('#rtc-container').addClass('ongoing_call');
                obj_this.rtc_multi_connector.init(params, on_started, video_call.is_audio_call);
            },
            started_by_caller: function (data) {
                var video_call = this;
                video_call.start_for_me(data);
            },
            same: function (val) {
                return val;
            },
            cancel: function () {
                var video_call = this;
                // console.log('Cancelling', this.caller.id, this.callee.id);
                obj_this.emit_rtc_event('cancelled', '', [video_call.callee.id]);
                this.quit();
            },
            cancelled: function (data) {
                // console.log('Cancelled', this.caller.id, this.callee.id);
                this.quit();
            },
            reject: function () {
                var video_call = this;
                var data = { message: 'Sorry busy' };
                if (!video_call.caller.id) {
                    console.log('No caller id to send in reject');
                }
                obj_this.emit_rtc_event('rejected', data, [video_call.caller.id]);
                this.quit();
            },
            rejected: function (data) {
                if (this.state == 'outgoing') {
                    this.show_notification('User is busy, try later');
                }
                else {
                    console.log(this.state, ' Not calling how cancelled');
                }
                this.quit(data.message);
            },
            terminate: function () {
                // console.log('Do terminate');
                var data = {
                    user_id: obj_this.user_data.id,
                    room_id: this.id
                };
                obj_this.socket.emit('call_terminated', data);
                // console.log(obj_this.ongoing_call, this, 568);
                this.quit('terminating');
            },
            terminated: function (data) {
                if (obj_this.ongoing_call) {
                    console.log('Leaving now');
                    // console.log(obj_this.ongoing_call, this, 189);
                    this.quit();
                }
                else {
                    console.log('Already left');
                }
            },
            toggle_camera: function () {
                try {
                    obj_this.rtc_multi_connector.toggle_camera();
                }
                catch (er) {
                    console.log(14, er);
                }
                // 
            },
            quit: function (request_type) {
                var video_call = this;
                // console.log(obj_this.ongoing_call, request_type, 193);
                if (obj_this.ongoing_call && request_type != 'terminating') {
                    video_call.terminate();
                }
                video_call.drag_enabled = false;
                video_call.caller = undefined;
                video_call.callee = undefined;
                if (obj_this.ongoing_call) {
                    try {
                        obj_this.rtc_multi_connector.stop_my_tracks();
                        obj_this.rtc_multi_connector.socket.disconnect();
                    }
                    catch (er) {
                        console.log('error in rtc end call', er);
                    }
                }
                obj_this.video_call.state = 'available';
                obj_this.ongoing_call = undefined;
                $('#videos-container').html('');
                $('#rtc-container').removeClass('ongoing_call').hide();
            },
            drag_enabled: false,
            minimize: function () {
                $('#rtc-container').removeClass('full').addClass('min');
                window['rtc-call-max'] = undefined;
                $('#rtc-container').draggable({ 'containment': [0, 0, '100vw', window.innerHeight - 10] });
                $('#rtc-container').css({ top: 'unset', left: 'unset', bottom: '10px', right: '10px' }).draggable('enable');
                this.drag_enabled = true;
            },
            maximize: function () {
                if (this.drag_enabled) {
                    $('#rtc-container').draggable('disable');
                    this.drag_enabled = false;
                }
                $('#rtc-container').css({ top: 0, left: 0 });
                $('#rtc-container').removeClass('min').addClass('full');
                window['rtc-call-max'] = 1;
            },
            show_notification: function (message) {
                window['bootbox'].alert(message);
                setTimeout(function () {
                    $('.bootbox.modal.fade.bootbox-alert.show').css('display', 'flex');
                }, 151);
            },
        };
        if (!window['socket_manager']) {
            window['socket_manager'] = obj_this;
            // console.log(obj_this, 342);
        }
        this.site_config = window['site_config'];
        this.server_url = this.site_config.server_base_url;
        this.media_url = this.server_url + '/media';
        this.user_photo = this.media_url + '/profile/ETjUSr1v2n.png';
        var res = window['functions'].is_public_route();
        if (!res) {
            try {
                var user_cookie = localStorage.getItem('user');
                var cuser = undefined;
                if (user_cookie) {
                    cuser = JSON.parse(user_cookie);
                }
                else {
                    window['functions'].go_to_login();
                    return;
                }
                if (cuser && cuser.token) {
                    obj_this.connect_socket(cuser);
                }
                else {
                    window['functions'].go_to_login();
                    return;
                }
            }
            catch (er) {
                console.log('Failed socket exception ', er);
            }
        }
        else {
            $('#main-div').show();
        }
    }
    SocketService.prototype.get_user_by_id = function (uid) {
        return this.chat_users.find(function (item) {
            return item.id == uid;
        });
    };
    SocketService.prototype.route_changed = function (route) {
        this.active_route_snapshot = route;
    };
    SocketService.prototype.connect_socket = function (authorized_user) {
        var obj_this = this;
        if (!authorized_user) {
            console.log('Not authorized');
            return;
        }
        var me = {
            id: authorized_user.id,
            group: undefined
        };
        if (authorized_user.groups.length > 0) {
            me.group = authorized_user.groups[0].name;
        }
        console.log(me);
        $('#main-div').show();
        for (var i = 0; i < authorized_user.groups.length; i++) {
            if (authorized_user.groups[i].name == 'Admin') {
                obj_this.is_admin = true;
                break;
            }
        }
        obj_this.user_data = authorized_user;
        var complete_server_url = obj_this.site_config.chat_server + '/sio';
        obj_this.socket = window['io'].connect(complete_server_url, {
            reconnection: false,
            transports: ['websocket'],
            reconnectionDelay: 2000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 2,
        }).on('connect_error', function (err) {
            console.log('Socket connection failed ' + complete_server_url + ' please run socket server is up');
        });
        obj_this.socket.on('connect', function () {
            obj_this.socket.off('server_event');
            authorized_user.socket_id = obj_this.socket.id;
            var socket_error = "Socket connection not established at " + obj_this.site_config.chat_server + ' because ';
            var options = {
                url: obj_this.site_config.chat_server + '/verify_socket',
                data: authorized_user,
                success: function (data) {
                    if (data && !data.error) {
                        socket_error = '';
                        onAuthenticated(data.data);
                    }
                    else if (data.error) {
                        // obj_this.user_data = undefined;
                        // console.log(data.error+' for ', authorized_user);
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
            };
            $.ajax(options);
            function onAuthenticated(data) {
                if (data.message) {
                    console.log(data.message.error);
                }
                if (data.user && data.friends) {
                }
                else {
                    console.log('invalid user data ', data);
                    return;
                }
                console.log("Authenticated\n\n");
                obj_this.user_data.photo = obj_this.server_url + data.user.photo;
                obj_this.user_photo = obj_this.server_url + data.user.photo;
                localStorage.setItem('user', JSON.stringify(obj_this.user_data));
                obj_this.verified = true;
                if (!data.unseen && data.unseen != 0) {
                    data.unseen = 0;
                    console.log('Please ask to add unseen attribute from service developer of get_user_data');
                }
                obj_this.unseen_messages = data.unseen;
                obj_this.chat_clients = new Array();
                for (var kk in data.chat_groups) {
                    obj_this.chat_clients.push(data.chat_groups[kk]);
                }
                for (var km in data.friends) {
                    obj_this.chat_clients.push(data.friends[km]);
                }
                obj_this.chat_groups = data.chat_groups;
                obj_this.chat_users = data.friends;
                // console.log(obj_this.chat_users, 4509);
                obj_this.notificationList = [];
                data.notifications = data.notifications.list;
                for (var i_1 in data.notifications) {
                    obj_this.add_item_in_notification_list(data.notifications[i_1], null);
                }
                // console.log(1111, obj_this.notificationList);
                obj_this.notificationList = obj_this.notificationList.reverse();
                obj_this.registerEventListeners();
                for (var i_2 in obj_this.on_verified) {
                    obj_this.on_verified[i_2]();
                }
                obj_this.on_verified = [];
            }
            ;
            obj_this.socket.on('server_event', function (res) {
                try {
                    // console.log(res.name);
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
        });
    };
    SocketService.prototype.add_chat_user = function (chat_cleint) {
        this.chat_users.push(chat_cleint);
    };
    SocketService.prototype.update_unseen_message_count = function (event, target) {
        if (!target) {
            console.log('Selection failed for', target);
            return;
        }
        if (!target.unseen && target.unseen != 0) {
            target.unseen = 0;
            console.log('Please ask to add unseen attribute for each friend from service developer of get_user_data');
        }
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
            obj_this.add_item_in_notification_list(res, 1);
        };
        obj_this.server_events['notification_updated'] = function (res) {
            console.log('notifications updated');
        };
        obj_this.server_events['incoming_call'] = function (data) {
            obj_this.video_call.show_incoming_call(data);
        };
        obj_this.server_events['cancelled'] = function (data) {
            obj_this.video_call.cancelled(data);
        };
        obj_this.server_events['call_terminated'] = function (data) {
            obj_this.video_call.terminated(data);
        };
        obj_this.server_events['rejected'] = function (data) {
            obj_this.video_call.rejected(data);
        };
        obj_this.server_events['accepted'] = function (data) {
            obj_this.video_call.accepted(data);
        };
        obj_this.server_events['started_by_caller'] = function (data) {
            obj_this.video_call.started_by_caller(data);
        };
        obj_this.server_events['error'] = function (res) {
            if (res == 'Invalid Token') {
                console.log('Unauthorized due to invalid token');
                window["functions"].go_to_login();
                return;
            }
            else
                console.log("Error from chat ", res);
        };
        obj_this.server_events['force_log_out'] = function (res) {
            var href = window.location.toString();
            if (href.indexOf('172.16') == -1 || href.indexOf('localhost') == -1) {
                window["functions"].go_to_login();
                return;
            }
        };
        obj_this.server_events['point_comment_received'] = function (data) {
            window['on_annotation_comment_received'](data);
        };
    };
    ;
    SocketService.prototype.emit_rtc_event = function (event_name, data, audience) {
        data = {
            name: event_name,
            audience: audience,
            data: data
        };
        this.socket.emit('client_event', data);
    };
    SocketService.prototype.emit_server_event = function (input_data, args) {
        try {
            var options = {
                data: {
                    params: input_data,
                    args: args
                }
            };
            window['dn_rpc_object'](options);
        }
        catch (er) {
            console.log(er);
        }
    };
    SocketService.prototype.init_route = function (url) {
        this.not_public_url = 0;
        this.current_id = undefined;
        this.current_model = undefined;
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
    SocketService.prototype.set_notification_text = function (item) {
        var obj_this = this;
        if (obj_this.user_data.id in item.senders) {
            item.senders = item.senders[obj_this.user_data.id];
            item.senders = item.senders.filter(function (obj) {
                return obj.id != obj_this.user_data.id;
            });
            var count = item.senders.length;
            var senders = item.senders[0].name;
            for (var i = 1; i < count - 1; i++) {
                senders += ', ' + item.senders[i].name;
            }
            if (count > 1) {
                senders += ' and ' + item.senders[count - 1].name;
            }
            item.body = senders + ' ' + item.body;
        }
    };
    SocketService.prototype.add_item_in_notification_list = function (item, on_receive) {
        var obj_this = this;
        try {
            if (!item.body) {
                console.log(item, ' no body');
                return;
            }
            item.body = item.body.trim();
            if (item.body.length == 0) {
                console.log('Not notif text in', item);
                return;
            }
        }
        catch (er) {
            console.log(er, 'Invalid notif text ' + item.body);
            return;
        }
        var route = obj_this.model_routes[item.address.res_app][item.address.res_model];
        if (item.address.info) {
            if (item.address.info.file_type) {
                route = '/' + item.address.info.file_type + route + '/';
            }
            route += item.address.info.post_parent_id + '/';
        }
        item.client_route = route + item.address.res_id;
        // item.counter = 1;
        obj_this.set_notification_text(item);
        if (!item.count) {
            item.count = 1;
        }
        var in_list = false;
        if (on_receive) {
            for (var i in obj_this.notificationList) {
                if (item.id == obj_this.notificationList[i].id) {
                    obj_this.notificationList[i].body = item.body;
                    item.count += 1;
                    in_list = true;
                    break;
                }
            }
        }
        if (!in_list) {
            obj_this.notificationList.push(item);
        }
    };
    SocketService.prototype.remove_item_from_notification_list = function (i) {
        this.notificationList.splice(i, 1);
        setTimeout(function () {
            $('.notif:first').click();
            setTimeout(function () {
                $('.notif:first').click();
            }, 5);
        }, 10);
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
            socket.disconnect();
            socket = false;
        }
        this.user_data = undefined;
    };
    SocketService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], SocketService);
    return SocketService;
}());



/***/ }),

/***/ "./src/components/breadcrumb/breadcrumb.component.css":
/*!************************************************************!*\
  !*** ./src/components/breadcrumb/breadcrumb.component.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/components/breadcrumb/breadcrumb.component.html":
/*!*************************************************************!*\
  !*** ./src/components/breadcrumb/breadcrumb.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"breadcrumbSection\">\n    \n    <div class=\"breadcrumb-container\">\n        <ul class=\"breadcrumb\">\n            <li *ngFor=\"let item of route_links\" class=\"breadcrumb-item\">\n                <a routerLink=\"{{item.link}}\">\n                    {{item.title}}\n                </a>\n            </li>\n            <li class=\"breadcrumb-item active\">{{title}}</li>\n        </ul>\n    </div>\n    <div *ngIf=\"socketService && socketService.is_admin\" class=\"edit-buttons\">\n        <a *ngIf=\"create\" class=\"btn btn-primary\" routerLink=\"/edit/{{app}}/{{model}}/add\">Create</a>\n        <a *ngIf=\"edit\" class=\"btn btn-primary\" routerLink=\"/edit/{{app}}/{{model}}/{{rid}}/change\">Edit</a>\n        <a *ngIf=\"delete\" class=\"btn btn-danger\" routerLink=\"/edit/{{app}}/{{model}}/{{rid}}/delete\">Delete</a>        \n    </div>\n    \n</div>"

/***/ }),

/***/ "./src/components/breadcrumb/breadcrumb.component.ts":
/*!***********************************************************!*\
  !*** ./src/components/breadcrumb/breadcrumb.component.ts ***!
  \***********************************************************/
/*! exports provided: BreadcrumbComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BreadcrumbComponent", function() { return BreadcrumbComponent; });
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


var BreadcrumbComponent = /** @class */ (function () {
    function BreadcrumbComponent(sserv) {
        this.sserv = sserv;
        this.create_button = false;
        this.edit_button = false;
        this.delete_button = false;
        this.socketService = sserv;
        if (this.create) {
            this.create_button = true;
        }
        if (this.edit) {
            this.edit_button = true;
        }
        if (this.delete) {
            this.delete_button = true;
        }
        this.route_links = [];
    }
    BreadcrumbComponent.prototype.ngOnInit = function () {
        if (this.routes) {
            try {
                //console.log(this.app, this.model, this.rid, this.routes);
                this.route_links = JSON.parse(this.routes);
            }
            catch (er) {
                console.log(er, this.routes);
            }
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], BreadcrumbComponent.prototype, "create", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], BreadcrumbComponent.prototype, "edit", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], BreadcrumbComponent.prototype, "delete", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], BreadcrumbComponent.prototype, "model", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], BreadcrumbComponent.prototype, "rid", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], BreadcrumbComponent.prototype, "app", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], BreadcrumbComponent.prototype, "title", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], BreadcrumbComponent.prototype, "routes", void 0);
    BreadcrumbComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-breadcrumb',
            template: __webpack_require__(/*! ./breadcrumb.component.html */ "./src/components/breadcrumb/breadcrumb.component.html"),
            styles: [__webpack_require__(/*! ./breadcrumb.component.css */ "./src/components/breadcrumb/breadcrumb.component.css")]
        }),
        __metadata("design:paramtypes", [_app_socket_service__WEBPACK_IMPORTED_MODULE_1__["SocketService"]])
    ], BreadcrumbComponent);
    return BreadcrumbComponent;
}());



/***/ }),

/***/ "./src/components/calendar/calendar.component.css":
/*!********************************************************!*\
  !*** ./src/components/calendar/calendar.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/components/calendar/calendar.component.html":
/*!*********************************************************!*\
  !*** ./src/components/calendar/calendar.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-breadcrumb title=\"Calendar\"></app-breadcrumb>\n<div class=\"router-outlet\">\n    <div id=\"calendar\"></div>\n    <div id=\"event-summary\" style=\"display:none;\">\n        <div class=\"event-card\">\n            <table class=\"o_group o_inner_group\">\n                <tbody>\n                    <tr>\n                        <td>\n                            <label >Title</label>\n                        </td>\n                        <td><span name=\"name\">Meeting Title</span></td>\n                    </tr>\n                    <tr>\n                        <td>\n                            <label >Starting at</label>\n                        </td>\n                        <td><span name=\"start\">10/24/2018 08:00:00</span></td>\n                    </tr>\n                    <tr>\n                        <td>\n                            <label >Ending at</label>\n                        </td>\n                        <td><span name=\"stop\">10/24/2018 16:00:00</span></td>\n                    </tr>\n                    <tr>\n                        <td>\n                            <label>Duration</label>\n                        </td>\n                        <td><span name=\"duration\">08:00</span></td>\n                    </tr>\n                    <tr>\n                        <td>\n                            <label>Location</label>\n                        </td>\n                        <td><span name=\"location\">08:00</span></td>\n                    </tr>\n                    <tr>\n                        <td>\n                            <label>Video Call Link</label>\n                        </td>\n                        <td>\n                            <span name=\"video_call_link\">\n                                <a class=\"video_call_link\" href=\"\">Video Call</a>\n                            </span>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            <label>Conference Bridge No.</label>\n                        </td>\n                        <td><span name=\"conference_bridge_number\">123-456-7890</span></td>\n                    </tr>\n                    <tr>\n                        <td>\n                            <label>Meeting PIN</label>\n                        </td>\n                        <td><span name=\"pin\">1234567989</span></td>\n                    </tr>\n                    <tr>\n                        <td>\n                            <label>Location</label>\n                        </td>\n                        <td><span name=\"location\">London</span></td>\n                    </tr>\n                </tbody>\n            </table>\n            <div class=\"upcomingButton\">\n                <button class=\"btn btn-primary\">\n                    <span name=\"accepted\">Accept</span>\n                </button>\n                <button class=\"btn btn-primary\">\n                    <span name=\"declined\">Decline</span>\n                </button>\n                <button class=\"btn btn-primary\">\n                    <span name=\"tentative\">Tentative</span>\n                </button>\n            </div>\n        </div>\n    </div>\n    <div class=\"modal fade\" id=\"calenderModal\" role=\"dialog\" aria-hidden=\"true\">\n        <div class=\"modal-dialog modal-lg modal-dialog-centered\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <span class=\"title\"></span>\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n                </div>\n                <div id=\"modal-body\" class=\"modal-body\">\n    \n                </div>\n                <div class=\"modal-footer\">\n                    <button style=\"display: none\" (click)=\"navigate_meeting()\" type=\"button\" class=\"btn btn-default go_details\" data-dismiss=\"modal\">Details</button>\n                    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/components/calendar/calendar.component.ts":
/*!*******************************************************!*\
  !*** ./src/components/calendar/calendar.component.ts ***!
  \*******************************************************/
/*! exports provided: CalendarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalendarComponent", function() { return CalendarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _app_http_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../app/http.service */ "./src/app/http.service.ts");
/* harmony import */ var _app_socket_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../app/socket.service */ "./src/app/socket.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CalendarComponent = /** @class */ (function () {
    function CalendarComponent(httpService, router, sanitizer, socketService) {
        this.httpService = httpService;
        this.router = router;
        this.sanitizer = sanitizer;
        this.socketService = socketService;
        this.events = [];
    }
    CalendarComponent.prototype.ngOnInit = function () {
        $('#event-summary tr').hide();
        this.get_home_data();
    };
    CalendarComponent.prototype.get_home_data = function () {
        var obj_this = this;
        var success_cb = function (home_data) {
            console.log(home_data);
            obj_this.home_data = home_data;
            obj_this.show_calendar();
        };
        var args = {
            app: 'meetings',
            model: 'News',
            method: 'get_data'
        };
        var input_data = {
            params: {},
            args: args
        };
        obj_this.httpService.get(input_data, success_cb, null);
    };
    CalendarComponent.prototype.show_calendar = function () {
        var obj_this = this;
        var home_data = obj_this.home_data;
        var events = [];
        if (obj_this.events.length != 0) {
            events = obj_this.events;
        }
        else {
            if (home_data.calendar) {
                home_data.calendar.forEach(function (event) {
                    var date = window['functions'].meeting_time_str(event.start);
                    events.push({
                        title: event.name,
                        start: event.start,
                        stop: event.stop,
                        date: date,
                        id: event['id'],
                        my_event: event['my_event']
                    });
                });
                obj_this.events = events;
            }
        }
        if (home_data.calendar)
            obj_this.renderCalendar(events);
    };
    CalendarComponent.prototype.renderCalendar = function (events) {
        var obj_this = this;
        $('#calendar').fullCalendar({
            events: events,
            eventClick: function (calEvent, jsEvent, view) {
                var id = calEvent.id;
                var req_url = '/meeting/summary';
                var args = {
                    app: 'meetings',
                    model: 'Event',
                    method: 'meeting_summary'
                };
                var input_data = {
                    params: {
                        id: id
                    },
                    args: args
                };
                obj_this.httpService.get(input_data, function (data) {
                    if (data)
                        if (typeof (data) != "string") {
                            obj_this.render_CalendarEvnetPopup(data);
                        }
                }, null);
            },
            header: {
                left: 'year,month,agendaWeek,agendaDay',
                center: 'title'
            },
            eventLimit: true,
        });
        if ($('.fc-schedule-button').length == 0) {
            var schedule_html = '<div class="container-fluid schedule-container schedule-wrap">';
            for (var i = 0; i < events.length; i++) {
                if (events[i]['my_event']) {
                    schedule_html += '<div event_id=' + events[i].id + ' class="scheduleDetailOpener row">';
                    // schedule_html += '<div class="col"> <span>' + events[i].date[1] + ' ' + events[i].date[0] +','+ events[i].date[2]+'</span></div>';
                    schedule_html += '<div class="col"> <span>' + events[i].date + '</span></div>';
                    schedule_html += '<div class="col">' + window['functions'].hour_minutes(new Date(events[i].start)) + ' - ' + window['functions'].hour_minutes(new Date(events[i].stop)) + '</div>';
                    schedule_html += '<div class="col">' + events[i].title + '</div>';
                    schedule_html += '</div>';
                }
            }
            schedule_html += '</div>';
            var schedule_1 = $(schedule_html);
            schedule_1.find('.scheduleDetailOpener').click(function () {
                obj_this.scheduleDetails(this);
            });
            var btn = $('<button type="button" class="fc-schedule-button fc-button fc-state-default fc-corner-right">Schedule</button>');
            $('.fc-button-group:first').append(btn);
            btn.click(function showSchedule() {
                $('.schedule-container').show();
                $('.fc-view-container').empty().html(schedule_1);
                $('.fc-prev-button').hide();
                $('.fc-next-button').hide();
                $('.fc-center').hide();
                $('.fc-today-button').hide();
                $('.fc-state-active').removeClass('fc-state-active');
                btn.addClass('fc-state-active');
            });
        }
    };
    CalendarComponent.prototype.scheduleDetails = function (el) {
        var obj_this = this;
        var event_id = $(el).attr('event_id');
        var req_url = '/meeting/summary';
        var args = {
            app: 'meetings',
            model: 'Event',
            method: 'meeting_summary'
        };
        var input_data = {
            params: {
                id: event_id
            },
            args: args
        };
        obj_this.httpService.get(input_data, function (data) {
            if (data)
                if (data)
                    if (typeof (data) != "string") {
                        obj_this.render_CalendarEvnetPopup(data);
                    }
        }, function (error) { });
    };
    ;
    CalendarComponent.prototype.render_CalendarEvnetPopup = function (result) {
        var obj_this = this;
        var event_summary = $('#event-summary');
        var calendar_modal = $('#calenderModal');
        var upcoming_buttons = event_summary.find('.upcomingButton');
        result.start = window['functions'].meeting_time_str(result.start);
        result.stop = window['functions'].meeting_time_str(result.stop);
        if (result.my_event) {
            calendar_modal.find('.go_details').attr('id', result.id).show();
            upcoming_buttons.show();
            event_summary.find('.upcomingButton').show();
            if (result.attendee_status) {
                upcoming_buttons.find('.fa-check').remove();
                upcoming_buttons.find('span[name="' + result.attendee_status + '"]').before('<i class="fa fa-check fa-lg" style="color:white" modifiers="{}"></i>');
            }
        }
        else {
            calendar_modal.find('.go_details').attr('id', 0).hide();
            upcoming_buttons.hide();
        }
        function calLocation(result) {
            result['location'] = '';
            result.location = result.location;
        }
        calLocation(result);
        //console.log(result);
        event_summary.find('tr').hide();
        for (var key in result) {
            if (!result[key])
                continue;
            var span = event_summary.find('span[name="' + key + '"]');
            span.closest('tr').show();
            if (key == 'pin' || key == 'conference_bridge_number' || key == 'video_call_link') {
                if (result['conference_status'] != 'active') {
                    span.closest('tr').hide();
                    continue;
                }
                else {
                    if (key == 'video_call_link') {
                        var video_call_link = '/conference/' + result['id'] + '/' + result['pin'];
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
            if (span.length > 0) {
                span.html(result[key]);
            }
        }
        //upcoming_buttons.attr('meetingid',result.id);
        //calendar_modal.find('.modal-header:first h3');
        calendar_modal.find('.modal-header:first').find('h3').html(result.name);
        calendar_modal.find('.modal-body:first').html(event_summary.html());
        upcoming_buttons = calendar_modal.find('.upcomingButton:first');
        // calender event pop up buttons click listener
        upcoming_buttons.children().click(function () {
            var elbtn = $(this);
            var response = elbtn.find('span').attr('name');
            upcoming_buttons.find('i').remove();
            elbtn.find('span').before('<i class="fa fa-check fa-lg" style="color:white" modifiers="{}"></i>');
            window['is_popup'] = 1;
            obj_this.respond_invitation(response, result.id);
            $('#tdmrb' + result.id).find('i').remove();
            $('#tdmrb' + result.id).find('span[name="' + response + '"]').before('<i class="fa fa-check fa-lg" style="color:white" modifiers="{}"></i>');
        });
        calendar_modal.modal('show');
    };
    CalendarComponent.prototype.respond_invitation = function (response, meet_id) {
        var req_url = '/meeting/respond-invitation-json';
        var obj_this = this;
        var input_data = {
            meeting_id: meet_id,
            response: response,
            no_loader: 1
        };
        var pending_meetings = obj_this.home_data.to_do_items.pending_meetings;
        var meeting_being_updated = pending_meetings.filter(function (item) {
            return item.id == meet_id;
        });
        if (response) {
            var args = {
                app: 'meetings',
                model: 'Event',
                method: 'respond_invitation'
            };
            var final_input_data = {
                params: input_data,
                args: args,
                no_loader: 1,
            };
            obj_this.httpService.get(final_input_data, function (data) {
                if (!window['is_popup']) {
                    meeting_being_updated.attendee_status = response;
                }
                else {
                    window['is_popup'] = 0;
                }
            }, null);
        }
    };
    CalendarComponent.prototype.navigate_meeting = function () {
        var obj_this = this;
        var id = document.getElementsByClassName('go_details')[0].id;
        obj_this.router.navigate(['/upcoming/meeting/' + id]);
    };
    CalendarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-calendar',
            template: __webpack_require__(/*! ./calendar.component.html */ "./src/components/calendar/calendar.component.html"),
            styles: [__webpack_require__(/*! ./calendar.component.css */ "./src/components/calendar/calendar.component.css")]
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DomSanitizer"],
            _app_socket_service__WEBPACK_IMPORTED_MODULE_3__["SocketService"]])
    ], CalendarComponent);
    return CalendarComponent;
}());



/***/ }),

/***/ "./src/components/chat/chat.component.html":
/*!*************************************************!*\
  !*** ./src/components/chat/chat.component.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"notification-container\">\n    <div class=\"main-user-navbar\">\n        <div class=\"mobile-chatroom nav-icon dropdown\">\n            <button (click)=\"toggle_notifications($event)\"\n            class=\"showmouseawaybutton notification-icon notif\">\n               <i class=\"icon-noti\"></i>\n            </button>\n            <span class=\"un-read-msg\" *ngIf=\"socketService.notificationList.length > 0\">{{socketService.notificationList.length}}</span>\n        </div>\n    </div>\n    \n    <div class=\"container right-panel notification-list hidemouseaway\">\n\t\t<div class=\"arrow\"></div>\n        <div class=\"notihead\">Notification</div>\n\t\t<!--<div (click)=\"close_right_panel()\" class=\"chat-list-close\">-->\n            <!--<i class=\"fas fa-times\"></i>-->\n        <!--</div>-->\n        <ul class=\"chat-items list-group\">\n            <li *ngFor=\"let note of socketService.notificationList\">                \n                <a class=\"list-group-item contact\"                    \n                    routerLink=\"{{note.client_route}}\">\n                    <div style=\"display: contents;\" class=\"wrap\">\n                        {{ note.body }}\n                    </div>\n                </a>\n            </li>\n            <li *ngIf=\"socketService.notificationList.length == 0\" class=\"list-group-item contact\">\n                No New Notifications\n            </li>\n        </ul>\n    </div>\n</div>\n"

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
    function ChatComponent(ss) {
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
        togglerelated('.container.notification-list');
    };
    ChatComponent.prototype.mark_notifications_read = function (li) {
        var obj_this = this;
        var item = obj_this.socketService.notificationList[li.index()];
        if (!item.id) {
            return;
        }
        var options = {
            data: {
                params: {
                    notification_id: item.id,
                },
                args: {
                    app: 'chat',
                    model: 'Notification',
                    method: 'mark_read'
                }
            },
            onSuccess: function (read_notification_ids) {
                for (var i in read_notification_ids) {
                    var notificationList = obj_this.socketService.notificationList;
                    var notif_count = notificationList.length;
                    for (var j = 0; j < notif_count; j++) {
                        if (read_notification_ids[i] == notificationList[j].id) {
                            obj_this.socketService.remove_item_from_notification_list(j);
                            break;
                        }
                    }
                }
            }
        };
        window['dn_rpc_object'](options);
    };
    ChatComponent.prototype.ngOnInit = function () {
        var obj_this = this;
        var route = window['pathname'];
        $('body').on('click', '.notification-list li', function () {
            obj_this.mark_notifications_read($(this));
        });
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
            styles: [__webpack_require__(/*! ./notification.css */ "./src/components/chat/notification.css")],
            template: __webpack_require__(/*! ./chat.component.html */ "./src/components/chat/chat.component.html"),
        }),
        __metadata("design:paramtypes", [_app_socket_service__WEBPACK_IMPORTED_MODULE_1__["SocketService"]])
    ], ChatComponent);
    return ChatComponent;
}());



/***/ }),

/***/ "./src/components/chat/notification.css":
/*!**********************************************!*\
  !*** ./src/components/chat/notification.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/components/comments/comments.component.html":
/*!*********************************************************!*\
  !*** ./src/components/comments/comments.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row d-flex justify-content-center\">\n\t<div class=\"col-sm-12 col-md-10 col-lg-8\">\n\t\t<div *ngIf=\"comments\" class=\"comments main-container oe_read_only\">\n\t\t\t<div class=\"row row pt-5 pb-3\">\n\t\t\t\t<div class=\"btn-group col-sm-12\">\n\t\t\t\t\t<button [ngClass]=\"{active: comment_subtype === 1}\" (click)=\"comment_subtype=1\" class=\"btn btn-default btn-block\">\n\t\t\t\t\t\tComments\n\t\t\t\t\t</button>\n\t\t\t\t\t<button [ngClass]=\"{active: comment_subtype === 2}\" (click)=\"comment_subtype=2\" class=\"btn btn-default btn-block\">\n\t\t\t\t\t\tPersonal Notes\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"row\">\n\t\t\t\t<form class=\"col-lg-12\">\n\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t<div *ngIf=\"comment_subtype === 1\">\n\t\t\t\t\t\t\t<div (keydown)=\"comment_reply_keydown($event)\" [mentionConfig]= \"mentionConfig\" (click)=\"manage_comment()\" (keyup)=\"save_comment_key_up($event, null)\" placeholder=\"Add comments here.\" contenteditable=\"true\" class=\"mention-div-comment active-mention form-control\" rows=\"4\" id=\"comment\"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div *ngIf=\"comment_subtype === 2\">\n\t\t\t\t\t\t\t<div \n\t\t\t\t\t\t\t(keydown)=\"comment_reply_keydown($event)\" \n\t\t\t\t\t\t\t[mentionConfig]= \"mentionConfig\" \n\t\t\t\t\t\t\tname=\"hj\" (click)=\"manage_comment()\" \n\t\t\t\t\t\t\t(keyup)=\"save_comment_key_up($event, null)\" \n\t\t\t\t\t\t\tplaceholder=\"Add notes here\"\n\t\t\t\t\t\t\tcontenteditable=\"true\" \n\t\t\t\t\t\t\tclass=\"mention-div-comment active-mention form-control\" \n\t\t\t\t\t\t\trows=\"4\" \n\t\t\t\t\t\t\tid=\"notes\"></div>\n\t\t\t\t\t\t\t<!-- <textarea \n\t\t\t\t\t\t\t(keydown)=\"comment_reply_keydown($event)\" \n\t\t\t\t\t\t\t[mentionConfig]=\"mentionConfig\"  \n\t\t\t\t\t\t\t[(ngModel)]=\"new_comment\" \n\t\t\t\t\t\t\t(keyup)=\"save_comment_key_up($event, null)\" \n\t\t\t\t\t\t\tclass=\"mention-div-comment active-mention form-control\"  \n\t\t\t\t\t\t\trows=\"4\" \n\t\t\t\t\t\t\tid=\"notes\" \n\t\t\t\t\t\t\tplaceholder=\"Add notes here\"></textarea> -->\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<button [disabled]=\"!post_btn_disable\" class=\"btn btn-primary\" type = \"submit\" (click)=\"save_comment(null)\" >Post</button>\n\t\t\t\t\t</div>\n\t\t\t\t</form>\n\t\t\t</div>\n\t\t\t\n\t\t\t<div *ngIf=\"comment_subtype == 1\" class=\"comments comments-container\">\n\t\t\t\t<div class=\"row\" *ngFor=\"let c of comments\">\n\t\t\t\t\t<div id=\"comment-{{c.id}}\" *ngIf=\"c\" class=\"col-lg-12\">\n\t\t\t\t\t\t<div class=\"CommentsWrapper\">\n\t\t\t\t\t\t\t<div class=\"comment\">\n\t\t\t\t\t\t\t\t<a routerLink=\"/profile/{{c.user.id}}\" class=\"CommentUserNameTimeWrap\">\n\t\t\t\t\t\t\t\t\t<div class=\"comment-user-pic\">\n\t\t\t\t\t\t\t\t\t\t<img src=\"{{socketService.server_url}}{{c.user.photo}}\" alt=\"user\" />\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<a routerLink=\"/profile/{{c.user.id}}\" class=\"mainthread\">\n\t\t\t\t\t\t\t\t\t<span class=\"comment-user\" *ngIf=\"c.user\">{{c.user.name}} : </span>\n                                </a>\n                                <input type=\"hidden\" class=\"comment_id\" value=\"{{c.id}}\" />\n\t\t\t\t\t\t\t\t<div class=\"CommentsWrap\">\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<div class=\"comment-body\" [innerHtml]=\"c.body.trim()\">\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<div class=\"row comment_response main\">\n\t\t\t\t\t\t\t\t\t\t<span>{{c.create_date | date:'medium' }}</span>&nbsp;&nbsp;\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<a *ngIf=\"c.id\" class=\"comment-reply\" title=\"Add reply\" (click)=\"commentReply($event, c)\">\n\t\t\t\t\t\t\t\t\t\t\tReply\n\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t\t<div class=\"label replies-wrapper\" title=\"Replies\" *ngIf=\"c.children && c.children.length\">\n\t\t\t\t\t\t\t\t\t\t\t<div (click)=\"showReplies($event, c)\">\n\t\t\t\t\t\t\t\t\t\t\t\t<span *ngIf=\"!c['showRep']\"><i class=\"fa fa-angle-down\"></i></span>\n\t\t\t\t\t\t\t\t\t\t\t\t<span *ngIf=\"c['showRep']\"><i class=\"fa fa-angle-up\"></i></span>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"reply-input\">\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<div class=\"reply\" *ngIf=\"c['showRep'] && c.children && c.children.length\">\n                                    <div class=\"comment\" *ngFor=\"let rep of c.children\">\n                                        <a routerLink=\"/profile/{{rep.user.id}}\" class=\"CommentUserNameTimeWrap\">\n                                            <div class=\"comment-user-pic\">\n                                                <img src=\"{{socketService.server_url}}{{rep.user.photo}}\" alt=\"user\" />\n                                            </div>\n                                        </a>   \n                                        <a routerLink=\"/profile/{{rep.user.id}}\" class=\"mainthread\">\n                                            <span class=\"comment-user\">{{rep.user.name}} : </span>\n                                        </a>\n                                        <div class=\"CommentsWrap\">                                            \n                                            <div class=\"comment-body\" [innerHtml]=\"rep.body.trim()\">\n                                            </div>                                            \n                                            <div class=\"row comment_response main\">\n                                                <span>{{rep.create_date | date:'medium' }}</span>&nbsp;&nbsp;                                                \n                                            </div>\n                                        </div>\n                                    </div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div *ngIf=\"comment_subtype == 2\" class=\"container notes comments-container\">\n\t\t\t\t<div *ngFor=\"let c of notes\">\n\t\t\t\t\t<div *ngIf=\"c\" class=\"row\">\n\t\t\t\t\t\t<div class=\"container\">\n\t\t\t\t\t\t\t<div class=\"row mainthread\">\n\t\t\t\t\t\t\t\t<span class=\"comment-user\" *ngIf=\"c.user\">{{c.user.name}} : </span>\n\t\t\t\t\t\t\t\t<div class=\"comment-body\">\n\t\t\t\t\t\t\t\t\t<div [innerHtml]=\"c.body.trim()\"></div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class=\"row comment_response main\">\n\t\t\t\t\t\t\t\t<span>{{c.create_date | date:'medium'}} </span>\n\t\t\t\t\t\t\t\t<!--<a title=\"Delete Note\" (click)=\"deleteComment(c.id,  'note')\" style=\"cursor: pointer\">-->\n\t\t\t\t\t\t\t\t<!--<i class=\"fa fa-trash\" aria-hidden=\"true\"></i>-->\n\t\t\t\t\t\t\t\t<!--</a>-->\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n        </div>\n        \n        <div (keydown)=\"comment_reply_keydown($event)\" [mentionConfig]= \"mentionConfig\" (click)=\"manage_reply_class()\" (keyup)=\"save_comment_key_up($event, 'reply')\" placeholder=\"Add comments here.\" contenteditable=\"true\" \n        class=\"mention-div-reply hidemouseaway reply-box form-control\" rows=\"4\" id=\"comment\"></div>\n\t</div>\n</div>"

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
        // this.mentionedList = []
        this.should_save = true;
    }
    CommentsComponent.prototype.get_data = function (input_data) {
        var obj_this = this;
        var on_comments_list = function (result) {
            try {
                // console.log(result);
                var read_notification_ids = result.read_notification_ids;
                result = result.comments;
                for (var i in result) {
                    var item = result[i];
                    if (item.subtype_id) {
                        if (item.subtype_id === 1) {
                            item.reply = false;
                            if (item.body && item.body.startsWith('<p>')) {
                                item.body = $(item.body)[0].innerHTML;
                            }
                            obj_this.add_item(item, obj_this.comments, 'read comment', 0);
                        }
                        else if (item.subtype_id === 2) {
                            if (item.body && item.body.startsWith('<p>')) {
                                item.body = $(item.body)[0].innerHTML;
                            }
                            obj_this.add_item(item, obj_this.notes, 'read note', 0);
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
        var args = {
            app: 'chat',
            model: 'Comment',
            method: 'get_comments',
        };
        input_data = {
            params: input_data,
            args: args
        };
        this.httpService.get(input_data, on_comments_list, null);
    };
    CommentsComponent.prototype.add_item = function (item, collection, add_type, at_start) {
        if (!item.user) {
            console.log('Bad item in ' + add_type);
            return;
        }
        else {
            if (at_start == 1) {
                collection.splice(0, 0, item);
            }
            else {
                collection.push(item);
            }
        }
    };
    CommentsComponent.prototype.showReplies = function (evt, com) {
        evt.preventDefault();
        com['showRep'] = !com['showRep'];
    };
    CommentsComponent.prototype.manage_comment = function () {
        $('.mention-div-reply').removeClass('active-mention');
        $('.mention-div-comment').addClass('active-mention');
    };
    CommentsComponent.prototype.manage_reply_class = function () {
        $('.mention-div-comment').removeClass('active-mention');
        $('.mention-div-reply').addClass('active-mention');
    };
    CommentsComponent.prototype.commentReply = function (evt, comment) {
        this.new_reply = '';
        if (this.active_comment)
            this.active_comment.active = false;
        comment.active = true;
        var mention_reply = $('.mention-div-reply:first');
        $(evt.target).closest('.CommentsWrapper').find('.comment:first').after(mention_reply);
        mention_reply.show();
        comment['showRep'] = true;
        this.active_comment = comment;
        //evt.preventDefault(); does not work
        setTimeout(function () {
            $('.reply-box:first').focus();
            $('.mention-div-reply').addClass('active-mention');
        }, 100);
        $('.mention-div-comment').removeClass('active-mention');
    };
    CommentsComponent.prototype.save_comment_key_up = function (e, parent) {
        var obj_this = this;
        // if (e.currentTarget.textContent.length)
        // {
        //     obj_this.post_btn_disable = true;
        // }
        if (obj_this.should_save) {
            if (e.keyCode == 13 && !e.shiftKey) {
                e.preventDefault();
                if (parent == 'reply') {
                    // console.log(e.target, $(e.target).prev()[0]);
                    var cid_1 = $(e.target).prev().find('input.comment_id').val();
                    var items = obj_this.comments.filter(function (item) {
                        return item.id == cid_1;
                    });
                    parent = items[0];
                    // console.log(cid, parent);
                }
                obj_this.save_comment(parent);
            }
        }
        else {
            obj_this.should_save = true;
        }
    };
    CommentsComponent.prototype.save_comment = function (parent_item) {
        var mention_list = [];
        $('.active-mention a.mention').each(function (i, el) {
            var mentioned_id = $(el).attr('mentioned_id');
            if (mention_list.indexOf(mentioned_id) == -1) {
                mention_list.push(parseInt(mentioned_id));
            }
        });
        var obj_this = this;
        obj_this.new_comment = $('.active-mention').html().replace('<div><br></div>', '');
        $('.active-mention').html('');
        obj_this.new_reply = obj_this.new_comment;
        obj_this.post_btn_disable = false;
        var item = {
            res_model: obj_this.res_model,
            res_id: obj_this.res_id,
            res_app: obj_this.res_app,
            subtype_id: obj_this.comment_subtype,
            create_date: new Date(),
            user: obj_this.socketService.user_data,
            mentioned_list: mention_list,
            user_id: obj_this.socketService.user_data.id
        };
        if (item.subtype_id == 2) {
            item['body'] = obj_this.new_comment;
            obj_this.add_item(item, obj_this.notes, 'created note', 1);
            this.new_comment = '';
        }
        else {
            if (parent_item) {
                item['parent_id'] = parent_item.id;
                item['body'] = obj_this.new_reply;
                if (!Array.isArray(parent_item.children))
                    parent_item.children = [item];
                else {
                    obj_this.add_item(item, parent_item.children, 'cr reply', 0);
                }
                this.new_reply = '';
                item['reply'] = 1;
            }
            else {
                item['body'] = obj_this.new_comment;
                obj_this.add_item(item, obj_this.comments, 'created comment', 1);
                this.new_comment = '';
                item['reply'] = false;
            }
        }
        // console.log(obj_this.comments);
        var input_data = {
            args: {
                app: 'chat',
                model: 'Comment',
                method: 'add'
            },
            no_loader: 1,
            params: item
        };
        this.httpService.post(input_data, function (data) {
            item['id'] = data.id;
        }, null);
    };
    CommentsComponent.prototype.deleteComment = function (id, type) {
        var obj_this = this;
        var args = {
            app: 'chat',
            model: 'message',
            method: 'unlink'
        };
        var input_data = {
            params: { id: id },
            args: args
        };
        var on_deleted = function (result) {
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
        };
        obj_this.httpService.post(input_data, on_deleted, null);
    };
    CommentsComponent.prototype.cancelComment = function () {
        this.new_comment = '';
    };
    CommentsComponent.prototype.comment_reply_keydown = function (e) {
        if (e.keyCode == 13 && !e.shiftKey) {
            e.preventDefault();
        }
    };
    CommentsComponent.prototype.ngOnInit = function () {
        var obj_this = this;
        var me_id = obj_this.socketService.user_data.id;
        obj_this.mention_list = obj_this.mention_list.filter(function (obj) {
            return obj.id != me_id;
        });
        if (obj_this.mention_list) {
            obj_this.mentionConfig = {
                items: obj_this.mention_list,
                insertHTML: true,
                triggerChar: "@",
                dropUp: true,
                labelKey: 'name',
                mentionSelect: function (val) {
                    obj_this.should_save = false;
                    var el = $('.active-mention');
                    // let in_list = obj_this.mentionedList.find(function(element) {
                    //     return element == val.id;
                    // });
                    // if (!in_list)
                    // {
                    //     obj_this.mentionedList.push(val.id)
                    // }
                    var tag = $('<a class="mention" mentioned_id="' + val.id + '" href="/#/' + val.group + '/' + val.id + '">' + val.name + '</a>');
                    el.append(tag);
                    el.html(el.html().replace('@', ''));
                    obj_this.placeCursorAtEnd();
                    // console.log(obj_this.mentionedList);
                    return '';
                }
            };
        }
        var input_data = {
            res_model: obj_this.res_model,
            res_id: obj_this.res_id,
            res_app: obj_this.res_app,
            subtype_id: obj_this.comment_subtype,
            no_loader: 1
        };
        obj_this.get_data(input_data);
        // console.log(3232);
        obj_this.socketService.server_events['comment_received'] = function (data) {
            // console.log(data, 76);
            var container = $('.comments.main-container');
            if (container.length < 1) {
                return;
            }
            if (obj_this.res_app != data.res_app || obj_this.res_id != data.res_id || obj_this.res_model != data.res_model) {
                return;
            }
            if (data.parent_id) {
                for (var i in obj_this.comments) {
                    if (obj_this.comments[i].id == data.parent_id) {
                        obj_this.add_item(data, obj_this.comments[i].children, 'rec reply', 0);
                        break;
                    }
                }
            }
            else {
                obj_this.add_item(data, obj_this.comments, 'rec comment', 1);
            }
        };
    };
    CommentsComponent.prototype.placeCursorAtEnd = function () {
        var contentEditableElement = $('.active-mention')[0];
        var range, selection;
        if (document.createRange) //Firefox, Chrome, Opera, Safari, IE 9+
         {
            range = document.createRange(); //Create a range (a range is a like the selection but invisible)
            range.selectNodeContents(contentEditableElement); //Select the entire contents of the element with the range
            range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
            selection = window.getSelection(); //get the selection object (allows you to change selection)
            selection.removeAllRanges(); //remove any selections already made
            selection.addRange(range); //make the range you have just created the visible selection
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], CommentsComponent.prototype, "res_app", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], CommentsComponent.prototype, "res_model", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], CommentsComponent.prototype, "res_id", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], CommentsComponent.prototype, "mention_list", void 0);
    CommentsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-comments',
            styles: [__webpack_require__(/*! ./comments.css */ "./src/components/comments/comments.css")],
            template: __webpack_require__(/*! ./comments.component.html */ "./src/components/comments/comments.component.html")
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"],
            _app_socket_service__WEBPACK_IMPORTED_MODULE_2__["SocketService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], CommentsComponent);
    return CommentsComponent;
}());



/***/ }),

/***/ "./src/components/comments/comments.css":
/*!**********************************************!*\
  !*** ./src/components/comments/comments.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".comments .note{\n\tborder: 1px solid gray;\n\tpadding: 1%;\n\tmargin: 1% 0;\n\tbackground: #f1f2f4;\n\tfont-size: 14px;\n\tfont-weight: 900;\n}\n\n.comments .active{\n\tbackground-color: #4B74B5 !important;\n    color: white;\n}\n\n.comments .btn-default{\n    background-color: #646464;\n    padding: 8px 0 8px 0;\n    color: #ffffff;\n}\n\n.comments .btn-default:nth-of-type(1){\n    border-top-left-radius: 40px;\n    border-bottom-left-radius: 40px;\n}\n\n.comments .btn-default:nth-of-type(2){\n    border-top-right-radius: 40px;\n    border-bottom-right-radius: 40px;\n}\n\n.comments .btn-default:focus {\n    outline: none;\n    box-shadow: none;\n}\n\n.comments .navbar{\n\tbackground-color: #eeeeee;\n}\n\n.comments .bordered{\n\tborder: 1px solid #808080;\n}\n\n.comments .modal-header, \n.comments .modal-footer\n{\n\tbackground-color: #eeeeee !important;\n}\n\n#addSlot>.modal-dialog>.modal-content{\n\tborder: 0px !important;\n\tbox-shadow: 1px 5px 20px 3px #808080;\n}\n\n.comments .add-slot\n{\n\tcursor: pointer;\n\tbackground-color: #54ab35;\n\theight: 50px;\n\twidth: 50px;\n\tcolor: white;\n\tfont-size: 32px;\n\tposition: fixed;\n\ttop: 68px;\n\tleft: 20px;\n\tborder: 0px !important;\n\tborder-radius: 50px;\n\tbox-shadow: 1px 2px 10px 1px #808080;\n}\n\n.comments .btn-info, \n.comments .btn-info>a, \n.comments .btn-secondary\n{\n\tbackground-color: white;\n\tborder-color: white;\n}\n\n.comments  .title-wrapper .modal-header{\n    margin:35px 0;\n    padding: 0 0 15px;\n    font-size: 30px;\n    font-weight: 400;\n    background: transparent !important;\n    color: #2B2B2B;\n}\n\n.comments button{\n\tmargin: 0 !important;\n}\n\ntextarea.form-control{\n\tmargin-bottom: 20px;\n    min-height: 120px;\n    border:1px solid #A2A2A2;\n    border-radius:0;\n}\n\ntextarea.form-control:focus,\ntextarea.form-control.focus {\n    outline: none;\n    box-shadow: none;\n}\n\n.comments .label\n{\n    padding-bottom: 20px;\n    cursor: pointer;\n    float: right;\n    background: gray;\n    padding: 0 5px;\n    color: white;    \n    border-radius: 25px;\n    font-weight: bolder;\n    margin-left: 5px;\n}\n\n.CommentsWrapper {\n    /* background: #F3F3F3; */\n    border: 1px solid #F0F0F0;\n    padding: 10px 10px 0 10px;\n    margin-bottom: 20px;\n}\n\n/* .comments .container.comments {\n\tpadding-bottom: 20px;\n}\n\n\n.comments .message.reply, .comments .mainthread {\n    background: #eeeeee;\n    border-radius: 4px;\n    padding: .5rem;\n    border: 1px solid #e6e6e6;\n}\n\n.comments .message.reply{\n\tbackground:#d6d6d6;\n    border: 1px solid #bdbdbd;\n} */\n\n/* .comments .comments-container {\n\tborder-right: 1px solid #eeeeee;\n\tborder-left: 1px solid #eeeeee;\n\tpadding: 0 6%;\n} */\n\n.comments .comment_response\n{\n\tfont-size: 12px;\n\tcolor: grey;\n\tpadding: 0 0 0 3%;\n\tmargin-bottom: 10px;\n\tmargin-top: 5px;\n}\n\n.comment_response a{\n    color: blue;\n    font-weight: bold;\n    margin-left: 10px;\n}\n\n.comments .label > div {\n\twidth: 35px;\n\ttext-align: center;\n}\n\n/*\n.comments .main.comment_response a \n{\n\tpadding: 0 5px 0 5px;\n}\n*/\n\n.comments .reply-input {\n    margin: 10px 0 0 20px;\n}\n\n/*\n.reply.message {\n    background: #ffffff;\n    border: 1px solid #E1E1E1;\n    padding: 10px 15px;\n    border-radius: 5px;\n}\n*/\n\n.comments .reply-body\n{\n\tword-wrap: break-word;\n\twidth: 80%;\n}\n\n.o_form_view .comments.oe_read_only\n{\n    margin: auto;\n}\n\n.o_form_view .comments.oe_read_only .btn-group button\n{\n    color: white;\n}\n\n.comments.oe_read_only .row pre\n{\n    margin-bottom: 0;\n    margin-top: 1px;\n}\n\n.o_form_view .comments.oe_read_only .row pre\n{\n    margin: -8px;\n    font-size: inherit;\n    background-color: transparent;\n    border: none;\n}\n\n.comments .comment-user\n{\n    float: left;\n    font-weight:bold;\n}\n\n.comments .comment-body\n{\n    color: #737373;\n    line-height: 22px;\n    font-size: 14px;\n    margin-top: -2px;\n}\n\n.comment {\n    display: flex;\n    align-items: flex-start;\n}\n\n.comments .comment{\n    border-bottom: 1px solid #f0f0f0;\n    margin-bottom: 10px;\n}\n\n.comments:last-child{\n    border-bottom: none;\n    margin-bottom: 0;\n}\n\n.oform{\n    display: flex;\n    align-items: flex-start;\n}\n\n.CommentsWrap{\n    flex: 1;\n    padding-left: 10px;\n}\n\n.CommentUserNameTimeWrap{\n    display: flex;\n    align-items: center;\n}\n\n.comment-user-pic, .commentreply-user-pic{\n    width: 30px;\n    height: 30px;\n    border-radius: 30px;\n    margin-right:10px;\n    overflow: hidden;\n}\n\n.comment-user-pic img{\n    width: 30px;\n    border-radius: 100%;\n}\n\n.commentreply-user-pic{\n    background: #737373;\n}\n\n.o_view_manager_content .comments-container, \n.o_view_manager_content .comments-container .container\n{\n    width: 100%;\n    margin: 0;\n}\n\n.o_view_manager_content .comments-container .row\n{\n    margin: 0 -16px 2px;\n    padding: .5rem;\n    display: block;\n    position: relative;\n}\n\n.o_view_manager_content .comments-container .row .row\n{\n    margin: 0 0px 2px;\n    padding: .5rem;\n    display: block;\n    position: relative;\n}\n\n.o_view_manager_content .comments .reply-input textarea {\n    line-height: 1;\n    padding: 10px;\n    margin-bottom: 10px;\n    font-size: 14px;\n    width: 92%;\n    margin: 0 auto 15px auto;\n}\n\n/*\n.replies-wrapper:first\n{\n    width: 96%;\n}\n.reply-input:first\n{\n    width: 90%;\n}\n\n.reply-textarea-conatiner\n{\n    width: 95%;\n    margin-left: 2.5%;\n}\n.o_view_manager_content .comments .reply-input\n{\n    width: 101%;\n    margin-left: 3%;\n}\n.o_view_manager_content .oform\n{\n    width: 97.5%;\n    margin-left: -2.5%;\n}\n.o_view_manager_content .reply.container\n{\n    width: 95%;\n}\n\n.o_view_manager_content .comments .label\n{\n    margin-right: 5%;\n}\n.o_view_manager_content .comments .message.reply{\t\n    width: 90%;\n}*/\n\n.comments.main-container{\n    padding-bottom: 40px;\n}\n\ndiv#comment{\n    margin-bottom: 20px;\n}\n\n.mention-div-reply\n{\n    font-size: 0.8rem;\n    display: none;\n}"

/***/ }),

/***/ "./src/components/committeedetails/committeedetails.component.html":
/*!*************************************************************************!*\
  !*** ./src/components/committeedetails/committeedetails.component.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-breadcrumb app=\"meetings\" model=\"committee\" \n*ngIf=\"committee\" rid=\"{{committee.id}}\" edit=\"1\" delete=\"1\" \nroutes='[{\"title\":\"Committees\", \"link\":\"/committees\"}]'\ntitle=\"{{committee.name}}\"></app-breadcrumb>\n<div class=\"router-outlet\">\n    <div  class=\"cards container\">\n        <div class=\"page-links\">\n            <span class=\"prev next-prev-link\" title=\"Privious\">\n                <i class=\"fa fa-angle-left\"></i>\n            </span>\n            <span class=\"next next-prev-link\" title=\"Next\">\n                <i class=\"fa fa-angle-right\"></i>\n            </span>\n        </div>\n\n        <div class=\"container\">\n            <div *ngIf=\"committee\" class=\"deatils-form\">\n\t\t\t\t<div class=\"row\">\n                    <div class=\"col-lg-12\">\n                        <div class=\"MainTitleHeadWrap\">\n                            <div class=\"HeadingWrap\">\n                                <img src=\"static/assets/images/committees.png\" alt=\"\" /> {{committee.name}}\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <!-- <div class=\"row\">\n                        <div class=\"col-sm-4\" style=\"border-right: 1px solid #cccccc;\">\n                            <label cl>\n                                <b>Charter</b>\n                            </label>\n                        </div>\n                        <div class=\"col-sm-9 UserProfileDiscription\">\n                                <span [innerHtml]=\"committee.description\"></span>\n                        </div>\n                </div> -->\n\n                <div  class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4\" *ngFor=\"let profile of committee.users\">\n                                <div class=\"kanban-card\">\n                                        <a routerLink=\"/{{profile.group}}/{{profile.id}}\" class=\"kanban-profiles-user-info-box\">\n                                            <div class=\"kanban-profiles-user-img\">\n                                                <img class=\"img-thumbnail-md\" alt='N/A' src=\"{{socketService.server_url}}{{profile.photo}}\">\n                                            </div>\n                                            <div class=\"kanban-profiles-user-info\">\n                                                <div class=\"kanban-profiles-user-InfoLIST\">\n                                                    {{profile.name}}\n                                                </div>\n                                                <div *ngIf=\"profile.company\" class=\"kanban-profiles-user-InfoLIST\">\n                                                    <i class=\"fas fa-users\"></i>\n                                                    <span >\n                                                        {{profile.company}}\n                                                    </span>\n                                                </div>\n                                                <div *ngIf=\"profile.mobile_phone\" class=\"kanban-profiles-user-InfoLIST\">\n                                                    <i class=\"fas fa-phone\"></i>\n                                                    <span >\n                                                        {{profile.mobile_phone}}\n                                                    </span>\n                                                </div>                                                                                \n                                                <div *ngIf=\"profile.committees && profile.committees.length > 0\">\n                                                    <label for=\"job-title\">\n                                                        <b>Committees</b>\n                                                    </label>\n                                                    <!-- <span *ngIf=\"profile.committees && profile.committees.length > 0\"> -->\n                                                    <span class=\"pill\" *ngFor=\"let com of profile.committees\">\n                                                        <span style=\"cursor: pointer\" routerLink=\"/committees/{{com['id']}}\">{{com['name']}}</span>\n                                                    </span>\n                                                    <!-- </span> -->\n                                                </div>\n                                                <div *ngIf=\"profile.response_by\">Response By: {{profile.response_by}}</div>\n                                                <div *ngIf=\"profile.state\" class=\"\">\n                                                    <b>Status : </b> {{profile.state}}\n                                                </div>\n                                                <div *ngIf=\"profile.email\" class=\"kanban-profiles-user-InfoLIST\">\n                                                    <i class=\"fas fa-envelope\"></i>\n                                                    <span>\n                                                        {{profile.email}}\n                                                    </span>\n                                                </div>\n                                            </div>\n                                        </a>\n                                    </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <!-- <span title=\"Next\" *ngIf=\"next\" style=\"font-size: 72px; color: black;\" routerLink=\"/committees/{{next}}\">\n            <i class=\"fa fa-angle-right\"></i>\n        </span> \n        <span title=\"Previous\" *ngIf=\"prev\" style=\"font-size: 72px; color: black;\" routerLink=\"/committees/{{prev}}\">\n            <i class=\"fa fa-angle-left\"></i>\n        </span> -->\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/components/committeedetails/committeedetails.component.ts":
/*!***********************************************************************!*\
  !*** ./src/components/committeedetails/committeedetails.component.ts ***!
  \***********************************************************************/
/*! exports provided: CommitteeDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommitteeDetailsComponent", function() { return CommitteeDetailsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_http_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../app/http.service */ "./src/app/http.service.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var src_app_socket_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/socket.service */ "./src/app/socket.service.ts");
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
    function CommitteeDetailsComponent(httpService, route, sanitizer, ss) {
        var _this = this;
        this.httpService = httpService;
        this.route = route;
        this.sanitizer = sanitizer;
        this.ss = ss;
        this.img = 'http://pngimg.com/uploads/folder/folder_PNG8773.png';
        this.next = '';
        this.prev = '';
        this.socketService = this.ss;
        var id = this.route.snapshot.params.id;
        this.route.params.subscribe(function (params) { return _this.get_data(id); });
    }
    CommitteeDetailsComponent.prototype.get_data = function (id) {
        var obj_this = this;
        var args = {
            app: 'meetings',
            model: 'Committee',
            method: 'get_detail'
        };
        var input_data = {
            params: { id: id },
            args: args
        };
        obj_this.httpService.get(input_data, function (result) {
            obj_this.committee = result.committee;
            obj_this.next = result.next;
            obj_this.prev = result.prev;
            obj_this.committee.description = obj_this.sanitizer.bypassSecurityTrustHtml(obj_this.committee.description);
            obj_this.committee.users.forEach(function (element) {
                element.group = element.group.toLowerCase();
            });
        }, false);
    };
    CommitteeDetailsComponent.prototype.ngOnInit = function () {
    };
    CommitteeDetailsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            styles: [__webpack_require__(/*! ./committeedetails.css */ "./src/components/committeedetails/committeedetails.css")],
            template: __webpack_require__(/*! ./committeedetails.component.html */ "./src/components/committeedetails/committeedetails.component.html")
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"],
            src_app_socket_service__WEBPACK_IMPORTED_MODULE_4__["SocketService"]])
    ], CommitteeDetailsComponent);
    return CommitteeDetailsComponent;
}());



/***/ }),

/***/ "./src/components/committeedetails/committeedetails.css":
/*!**************************************************************!*\
  !*** ./src/components/committeedetails/committeedetails.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h2.heading-title {\n    margin-bottom: 20px;    \n}\nh2.heading-title span {\n    position: relative;\n}\nh2.heading-title span:before {\n    border-top: 1px solid #dddddd;\n    content: \"\";\n    position: absolute;\n    bottom: -7px;\n    left: 0px;\n    width: 100%;\n}\n.modal-header, .modal-footer{\n    background-color: #eeeeee !important;\n}\n.bordered{\n    border: 1px solid #808080;\n}\n.kanban-committees-info-box{\n    display: flex;\n    background: #f3f3f3;\n    border-radius: 3px;\n    border: 1px solid #f1eeee;\n    padding: 10px 5px 7px;\n    align-items: flex-start;\n    flex-wrap: wrap;\n    margin-bottom:15px;\n}\n"

/***/ }),

/***/ "./src/components/committees/committees.component.html":
/*!*************************************************************!*\
  !*** ./src/components/committees/committees.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-breadcrumb app=\"meetings\" model=\"committee\" create=\"1\" title=\"Committees\"></app-breadcrumb>\n<div class=\"router-outlet\">\n    <div class=\"container\">\n            <div class=\"row\">\n                    <div class=\"col-lg-12\">\n                        <div class=\"MainTitleHeadWrap\">\n                            <div class=\"HeadingWrap\">\n                                <img src=\"static/assets/images/committees.png\" alt=\"\" /> Committees\n                            </div>\n                        </div>\n                    </div>\n                </div>\n        <div class=\"row\">\n            <div class=\"kanban-committees col-xs-12 col-sm-6 col-md-4\"\n                    *ngFor=\"let committee of committees\">\n                <a class=\"kanban-committees-info-box\" routerLink=\"/committees/{{committee.id}}\">\n                        <a class=\"kanban-committees-info-box-name\">\n                            {{committee.name}}\n                        </a>\n                    <div class=\"kanban-committees-info-box-img\">\n                        <a class=\"circle-imgwrap\"  *ngFor=\"let member of committee.users; let index = index\" routerLink=\"/profile/{{member.id}}\">\n                        <span *ngIf=\"index < 3\">\n                            <img title=\"{{member.username}}\" class=\"img-thumbnail-sm\" src=\"{{socketService.server_url}}{{member.image}}\">\n                        </span>\n                        <span *ngIf=\"index === 3\">\n                            <b>. . .</b>\n                        </span>\n                        </a>\n                    </div>\n                    \n                </a>\n            </div>\n        </div>\n    </div>\n        <div class=\"container\" *ngIf=\"no_committees\">\n            <div class=\"row\">\n                <div class=\"col-lg-12 \">\n                    <div class=\"jumbotron text-center\">\n                        <h1>There are no Committees to show for now!</h1>\n                        <hr>\n                    </div>\n                </div>\n            </div>\n        </div>\n</div>\n"

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
/* harmony import */ var src_app_socket_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/socket.service */ "./src/app/socket.service.ts");
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
    function CommitteesComponent(httpService, ss) {
        this.httpService = httpService;
        this.ss = ss;
        this.committees = [];
        this.no_committees = false;
        this.heading = 'Committees';
        this.bread_crumb = {
            items: [],
            title: ''
        };
        this.img = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png';
        var obj_this = this;
        this.socketService = this.ss;
        obj_this.httpService.fetch_paged_data = function (off_set, limit) {
            var args = {
                app: 'meetings',
                model: 'Committee',
                method: 'get_records'
            };
            var input_data = {
                paging: {
                    offset: off_set,
                    limit: limit
                },
                args: args
            };
            var success_cb = function (result) {
                obj_this.committees = result.records;
                obj_this.httpService.total_records = result.total;
                obj_this.committees.length > 0 ? obj_this.no_committees = false : obj_this.no_committees = true;
            };
            var failure_cb = false;
            obj_this.httpService.get(input_data, success_cb, failure_cb);
        };
    }
    CommitteesComponent.prototype.ngOnInit = function () {
        var req_url = '/ws/committees-json';
        var obj_this = this;
        var success_cb = function (result) {
            console.log(result);
            obj_this.committees = result.records;
            obj_this.httpService.total_records = result.total;
            obj_this.committees.length > 0 ? obj_this.no_committees = false : obj_this.no_committees = true;
        };
        var args = {
            app: 'meetings',
            model: 'Committee',
            method: 'get_records'
        };
        var input_data = {
            params: { paging: { offset: 0, limit: 20 } },
            args: args
        };
        this.httpService.get(input_data, success_cb, null);
        // make_bread_crumb(obj_this.heading);
        function make_bread_crumb(page_title) {
            if (page_title) {
                obj_this.bread_crumb.title = page_title;
            }
        }
    };
    CommitteesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            styles: [__webpack_require__(/*! ./committees.css */ "./src/components/committees/committees.css")],
            template: __webpack_require__(/*! ./committees.component.html */ "./src/components/committees/committees.component.html")
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"], src_app_socket_service__WEBPACK_IMPORTED_MODULE_2__["SocketService"]])
    ], CommitteesComponent);
    return CommitteesComponent;
}());



/***/ }),

/***/ "./src/components/committees/committees.css":
/*!**************************************************!*\
  !*** ./src/components/committees/committees.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".kanbancard{\n    cursor: pointer;\n    padding: 2%;\n    margin: 2%;\n    box-shadow: 1px 2px 10px #000000;\n    background: rgba(255,255,255,0.5);\n}\n\n.kanban-committees-info-box{\n    background: #F3F3F3;\n    border-radius: 0;\n    border-bottom: 3px solid #638FC9;\n    margin: 15px 0;\n    display: flex;\n    flex-direction: column;\n}\n\n.kanban-committees-info-box-img {\n    display: flex;\n    flex-wrap: wrap;\n    padding: 30px 15px;\n}\n\n.kanban-committees-info-box .kanban-committees-info-box-name{\n    display:block;\n    margin-bottom: 10px;\n    padding: 10px 15px;\n    background: #638FC9;\n    color: #ffffff;\n    font-size: 20px;\n    border-radius: 0%;\n}\n\n.kanban-committees a {\n    text-transform: capitalize;\n}\n\n.kanban-committees a i {\n    font-size: 24px;\n    color: #ffffff;\n    text-align: center;\n    border-radius: 3px;\n    background: #9c4784;\n    padding: 5px 8px;\n}"

/***/ }),

/***/ "./src/components/document/document.component.html":
/*!*********************************************************!*\
  !*** ./src/components/document/document.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-breadcrumb *ngIf=\"doc_data && breadcrumb\" app=\"documents\" model=\"file\" \nrid=\"doc_data.doc_name\"\nroutes=\"{{breadcrumb}}\"\ntitle=\"{{doc_data.doc_name}}\"></app-breadcrumb>\n\n    <div class=\"pdf-annotator\" id=\"annotated-doc-conatiner\" style=\"display:none;\">\n        <div class=\"ToolPdfViwerWrapper\">\n            <div id=\"comment-wrapper\">\n                <div class=\"header comment-header\">\n                    <span class=\"show-all-comments\">\n                        <i class=\"fa fa-times-circle\"></i>\n                    </span>\n                    <span class=\"title\">Comments</span>\n                </div>\n    \n                <div class=\"comment-list\">\n                    <div class=\"comment-list-container\">\n                        <div class=\"comment-list-item\">No comments</div>\n                    </div>\n                </div>\n                <form *ngIf=\"mention_list\" class=\"comment-list-form\">\n                    <div class=\"AddCommentTextWrap\"><div contenteditable=\"true\" [mentionConfig]=\"mentionConfig\" class=\"active-mention\" id=\"commentText\" (keyup)=\"save_comment_key_up\" Placeholder=\"Add a Comment\"></div>\n                        </div>\n                    <!-- <textarea id=\"commentText\"\n                    [mentionConfig] = \"mentionConfig\"\n                    placeholder=\"Add a Comment\"></textarea> -->\n                </form>\n            </div>\n    \n            <div id=\"viewer-wrapper\">\n                <div class=\"toolbar topbar\" style=\"display:none\">\n                <div class=\"ToolBarWrapper\">\n                    <div class=\"doc-manage-btn-wrap\">\n                        <a class=\"icon back\" (click)=\"go_back()\" title=\"Back\">\n                            <i class=\"fas fa-arrow-left\"></i>\n                        </a>\n                    </div>\n                    <div class=\"doc-manage-btn-wrap\">\n                        <div class=\"paginator\">\n                            <span (click)=\"changePage(page_num-1)\" class=\"pager prev page-prev-btn\" disabled=\"\"><i class=\"fa fa-arrow-up\"></i></span>\n                            <span (click)=\"changePage(page_num+1)\" class=\"pager next page-next-btn\" disabled=\"\"><i class=\"fa fa-arrow-down\"></i></span>\n    \n                            <input (change)=\"changePage(page_num)\" (blur)=\"changePage(page_num)\" (keyup.enter)=\"changePage(page_num)\" class=\"form-control\" [(ngModel)]=\"page_num\" type=\"number\" class=\"page-number\" value=\"1\">\n                            <span>of <span class=\"page-count\">1</span></span>\n                        </div>\n                    </div>\n                    <div class=\"doc-manage-btn-wrap\">\n                        <button class=\"strt_sign pdfjs btn-primary\" url='/meeting_point/save_signature_doc' style=\"display: none\">Sign</button>\n                    </div>\n                    <div class=\"doc-manage-btn-wrap\">\n                        <span style=\"display: none\" class=\"sign_completed pdfjs badge badge-success\">Signed</span>\n                    </div>\n                    <div class=\"doc-manage-btn-wrap\">\n                        <button class=\"cursor annotation_button\" type=\"button\" title=\"Cursor\" data-tooltype=\"cursor\">\n                            <div class=\"Icon\">\n                                <svg viewBox=\"0 0 24 24\" id=\"ic_select_black_24px\" width=\"100%\" height=\"100%\">\n                                    <g fill=\"none\" fill-rule=\"evenodd\">\n                                        <path d=\"M11.022 14.577l-2.92 1.047a1 1 0 0 1-1.33-1.036L7.817 3.465a1 1 0 0 1 1.701-.614l7.95 7.92a1 1 0 0 1-.37 1.651l-2.96 1.061 2.576 7.078a.996.996 0 0 1-.596 1.278l-1.23.448a.996.996 0 0 1-1.278-.596z\" fill=\"currentColor\"></path>\n                                        <path d=\"M0 0h24v24H0z\"></path>\n                                    </g>\n                                </svg>\n                            </div>\n                        </button>\n                    </div>\n                    <div class=\"doc-manage-btn-wrap\">\n                        <button class=\"pen annotation_button\" type=\"button\" title=\"Pen Tool\" data-tooltype=\"draw\">\n                            <div class=\"Icon\">\n                                <svg viewBox=\"0 0 24 24\" id=\"ic_annotation_freehand_black_24px\" width=\"100%\" height=\"100%\">\n                                    <g fill=\"none\" fill-rule=\"evenodd\">\n                                        <path d=\"M0 0h24v24H0z\"></path>\n                                        <path fill=\"currentColor\" d=\"M9.662 8.523l4.242-4.243 7.071 7.071-4.242 4.243a1 1 0 0 1-1.414 0L9.662 9.937a1 1 0 0 1 0-1.414zm-.707 2.121l5.656 5.657L9.6 18.807a1 1 0 0 1-1.154-.187l-1.81-1.81a1 1 0 0 1-.186-1.154zm-2.829 7.071l1.414 1.414c-1.32 1.037-2.144 1.39-2.474 1.06-.33-.33.023-1.154 1.06-2.474z\"></path>\n                                    </g>\n                                </svg>\n                            </div>\n                        </button>\n                    </div>\n                    <div class=\"doc-manage-btn-wrap\">\n                        <div class=\"PenSize pen-child annotation_button prop doc-manage-btn-wrap\">\n                            <select class=\"pen-size\">\n                                <option value=\"2\"> ▁▁▁▁▁▁▁▁ </option>\n                                <option value=\"4\"> ▂▂▂▂▂▂▂▂ </option>\n                                <option value=\"6\"> ▃▃▃▃▃▃▃▃ </option>\n                                <option value=\"7\"> ▄▄▄▄▄▄▄▄▄ </option>\n                                <option value=\"8\"> ▅▅▅▅▅▅▅▅ </option>\n                                <option value=\"9\"> ▆▆▆▆▆▆▆▆ </option>\n                                <option value=\"10\"> ▇▇▇▇▇▇▇▇ </option>\n                            </select>\n                        </div>\n                        <div class=\"pen-color annotation_button prop\"></div>\n                    </div>\n                    <div class=\"doc-manage-btn-wrap\">\n                        <button class=\"comment annotation_button\" style=\"padding-top: 0\" type=\"button\" title=\"Show all comments\">\n                            <span class=\"Icon\">\n                                <i class=\"fas fa-comments\"></i>\n                            </span>\n                        </button>\n                        <button data-tooltype=\"point\" class=\"add-point-button annotation_button comment\" title=\"Add new comment point\">\n                            <svg viewBox=\"0 0 24 24\" id=\"add-point\" width=\"100%\" height=\"100%\">\n                                <g fill=\"none\" fill-rule=\"evenodd\">\n                                    <path d=\"M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\" fill=\"white\" fill-rule=\"nonzero\"></path>\n                                    <path d=\"M0 0h24v24H0z\"></path>\n                                </g>\n                            </svg>\n                        </button>\n                    </div>\n                    <div class=\"doc-manage-btn-wrap\">\n                        <button class=\"personal comment annotation_button \" type=\"button\" title=\"Show all Personal Note\" >\n                            <div class=\"Icon\">\n                                <svg width=\"28\" height=\"25\" x=\"461\" y=\"185\" data-pdf-annotate-id=\"e8114a67-e5e3-4bf3-be35-d25aa831f0e2\" data-pdf-annotate-type=\"point\" aria-hidden=\"true\" transform=\"scale(1) rotate(0) translate(0, 0)\">\n                                    <rect width=\"25\" height=\"22\" x=\"1.962286\" y=\"1\" style=\"fill:white;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:1;stroke-opacity:1\"></rect>\n                                    <rect width=\"18.4\" height=\"1.5012145\" x=\"5.8\" y=\"5\" style=\"fill:#000000;fill-opacity:1;stroke:none\"></rect>\n                                    <rect width=\"18\" height=\"0.86\" x=\"6\" y=\"10\" style=\"fill:#000000;fill-opacity:1;stroke:none\"></rect>\n                                    <rect width=\"18.4\" height=\"0.86\" x=\"5.8\" y=\"14\" style=\"fill:#000000;fill-opacity:1;stroke:none\"></rect>\n                                    <rect width=\"18\" height=\"0.86\" x=\"6\" y=\"18\" style=\"fill:#000000;fill-opacity:1;stroke:none\"></rect>\n                                </svg>\n                            </div>\n                        </button>\n                        <button data-tooltype=\"point\" class=\"add-point-button annotation_button comment personal doc-manage-btn-wrap\" title=\"Add anew note\">\n                            <svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\">\n                                <g fill=\"none\" fill-rule=\"evenodd\">\n                                    <path d=\"M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\" fill=\"white\" fill-rule=\"nonzero\"></path>\n                                    <path d=\"M0 0h24v24H0z\"></path>\n                                </g>\n                            </svg>\n                        </button>\n                    </div>\n                    <div class=\"doc-manage-btn-wrap\">\n                        <button class=\"zoomout\">\n                            <i class=\"icon-zoom-out\"></i>\n                        </button>\n                        <div class=\"selectBox\">\n                            <select class=\"scale\" disabled>\n                                <option value=\"0.25\">25%</option>\n                                <option value=\"0.5\">50%</option>\n                                <option value=\"0.75\">75%</option>\n                                <option value=\"1\">100%</option>\n                                <option value=\"1.25\">125%</option>\n                                <option value=\"1.5\">150%</option>\n                                <option value=\"1.75\">175%</option>\n                                <option value=\"2\">200%</option>\n                                <option value=\"2.5\">250%</option>\n                                <option value=\"3\">300%</option>\n                                <option value=\"4\">400%</option>\n                                <option value=\"5\">500%</option>\n                            </select>\n                        </div>\n    \n                        <button class=\"zoomin\">\n                            <i class=\"icon-zoom-in\"></i>\n                        </button>\n                    </div>\n                    <div class=\"doc-manage-btn-wrap\">\n                        <a href=\"javascript://\" class=\"rotate-ccw doc-manage-btn-wrap\" title=\"Rotate Counter Clockwise\">\n                            <div class=\"Icon\">\n                                <svg viewBox=\"0 0 24 24\" id=\"ic_rotate_left_black_24px\" width=\"100%\" height=\"100%\">\n                                    <g fill=\"none\" fill-rule=\"evenodd\">\n                                        <path d=\"M7.11 8.53L5.7 7.11C4.8 8.27 4.24 9.61 4.07 11h2.02c.14-.87.49-1.72 1.02-2.47zM6.09 13H4.07c.17 1.39.72 2.73 1.62 3.89l1.41-1.42c-.52-.75-.87-1.59-1.01-2.47zm1.01 5.32c1.16.9 2.51 1.44 3.9 1.61V17.9c-.87-.15-1.71-.49-2.46-1.03zM13 4.07V1L8.45 5.55 13 10V6.09c2.84.48 5 2.94 5 5.91s-2.16 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93s-3.05-7.44-7-7.93z\" fill=\"currentColor\" fill-rule=\"nonzero\"></path>\n                                        <path d=\"M0 0h24v24H0z\"></path>\n                                    </g>\n                                </svg>\n                            </div>\n                        </a>\n                        <a href=\"javascript://\" class=\"rotate-cw doc-manage-btn-wrap\" title=\"Rotate Clockwise\">\n                            <div class=\"Icon\">\n                                <svg viewBox=\"0 0 24 24\" id=\"ic_rotate_right_black_24px\" width=\"100%\" height=\"100%\">\n                                    <g fill=\"none\" fill-rule=\"evenodd\">\n                                        <path d=\"M15.55 5.55L11 1v3.07C7.06 4.56 4 7.92 4 12s3.05 7.44 7 7.93v-2.02c-2.84-.48-5-2.94-5-5.91s2.16-5.43 5-5.91V10zM19.93 11a7.906 7.906 0 0 0-1.62-3.89l-1.42 1.42c.54.75.88 1.6 1.02 2.47zM13 17.9v2.02c1.39-.17 2.74-.71 3.9-1.61l-1.44-1.44c-.75.54-1.59.89-2.46 1.03zm3.89-2.42l1.42 1.41c.9-1.16 1.45-2.5 1.62-3.89h-2.02c-.14.87-.48 1.72-1.02 2.48z\" fill=\"currentColor\" fill-rule=\"nonzero\"></path>\n                                        <path d=\"M0 0h24v24H0z\"></path>\n                                    </g>\n                                </svg>\n                            </div>\n                        </a>\n                    </div>\n                    <div class=\"doc-manage-btn-wrap\">\n                        <a (click)=\"toggleAnnotations()\" class=\"annot-toggler doc-manage-btn-wrap\" title=\"Hide/Show all annotations\">\n                            <div class=\"Icon\">\n                                <i *ngIf=\"!annot_hidden\" class=\"fa fa-eye-slash\" aria-hidden=\"true\"></i>\n                                <i *ngIf=\"annot_hidden\" class=\"fa fa-eye\" aria-hidden=\"true\"></i>\n                            </div>\n                        </a>\n                    </div>\n    \n            </div>\n            </div>\n                <div id=\"content-wrapper\">\n                    <div class=\"PdfViewerWrapper\">\n                        <div id=\"viewer\" class=\"pdfViewer\"></div>\n                    </div>\n                </div>\n    \n                <!--<div id=\"notification-wrapper\">-->\n                <!--<div class=\"notification-list\">-->\n                <!--<div class=\"notification-list-container\">-->\n                <!--<div class=\"notification-list-item\">No Notifications</div>-->\n                <!--</div>-->\n                <!--</div>-->\n                <!--</div>-->\n            </div>\n    \n        </div>\n        <div class=\"toolbar annotation-options ContextMenuPopup\">\n            <div class=\"Button icon\">\n                <button class=\"underline\" type=\"button\" title=\"underline\" data-tooltype=\"underline\">\n                    <div class=\"Icon\">\n                        <svg viewBox=\"0 0 24 24\" id=\"ic_annotation_underline_black_24px\" width=\"100%\" height=\"100%\">\n                            <g fill=\"none\" fill-rule=\"evenodd\">\n                                <path fill=\"currentColor\" d=\"M14.308 14.321H9.684L8.804 17H6l4.765-13h2.444L18 17h-2.804zm-3.912-2.17h3.2l-1.61-4.865zM5 18.5h14v2H5z\"></path>\n                                <path d=\"M0 0h24v24H0z\"></path>\n                            </g>\n                        </svg>\n                    </div>\n                </button>\n            </div>\n            <div class=\"Button icon\">\n                <button class=\"strikeout\" type=\"button\" title=\"strikeout\" data-tooltype=\"strikeout\">\n                    <div class=\"Icon\">\n                        <svg viewBox=\"0 0 24 24\" id=\"ic_annotation_strikeout_black_24px\" width=\"100%\" height=\"100%\">\n                            <g fill=\"none\" fill-rule=\"evenodd\">\n                                <path fill=\"currentColor\" d=\"M9.521 16l-.717 3H6l1.021-3zm-1.139-4l2.383-7h2.444l2.395 7h-2.39l-1.227-3.714L10.772 12zm8.591 4L18 19h-2.804l-.725-3zM5 13h14v2H5z\"></path>\n                                <path d=\"M0 0h24v24H0z\"></path>\n                            </g>\n                        </svg>\n                    </div>\n                </button>\n            </div>\n            <div class=\"Button icon\">\n                <button class=\"highlight\" type=\"button\" title=\"Highlight\" data-tooltype=\"highlight\">\n                    <div class=\"Icon\">\n                        <svg viewBox=\"0 0 24 24\" id=\"ic_annotation_highlight_black_24px\" width=\"100%\" height=\"100%\">\n                            <g fill=\"none\" fill-rule=\"evenodd\">\n                                <path fill=\"currentColor\" d=\"M19 3c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2zm-4.947 12.341l.789 2.344h2.492L13.076 6.31h-2.172L6.67 17.685h2.492l.781-2.344zm-3.477-1.898l1.414-4.258 1.43 4.258z\"></path>\n                                <path d=\"M0 0h24v24H0z\"></path>\n                            </g>\n                        </svg>\n                    </div>\n                </button>\n            </div>\n    \n            <div class=\"Button icon\">\n                <button class=\"copy\" type=\"button\" title=\"Copy\" data-tooltype=\"copy\">\n                    <div class=\"Icon\">\n                        <svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 34.555 34.555\" style=\"enable-background:new 0 0 34.555 34.555;\" xml:space=\"preserve\">\n                            <g>\n                                <g>\n                                    <g>\n                                        <path d=\"M24.065,34.555H5.489c-1.379,0-2.5-1.122-2.5-2.5V7.864c0-1.378,1.121-2.5,2.5-2.5h2.364c0.276,0,0.5,0.224,0.5,0.5\n                                            s-0.224,0.5-0.5,0.5H5.489c-0.827,0-1.5,0.673-1.5,1.5v24.19c0,0.827,0.673,1.5,1.5,1.5h18.576c0.827,0,1.5-0.673,1.5-1.5v-2.365\n                                            c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5v2.365C26.565,33.433,25.444,34.555,24.065,34.555z\" />\n                                    </g>\n                                </g>\n                                <g>\n                                    <g>\n                                        <path d=\"M29.065,29.19H10.489c-1.379,0-2.5-1.122-2.5-2.5V2.5c0-1.378,1.121-2.5,2.5-2.5h13.604c0.276,0,0.5,0.224,0.5,0.5\n                                            S24.37,1,24.094,1H10.489c-0.827,0-1.5,0.673-1.5,1.5v24.19c0,0.827,0.673,1.5,1.5,1.5h18.576c0.827,0,1.5-0.673,1.5-1.5V7.661\n                                            c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5V26.69C31.565,28.069,30.444,29.19,29.065,29.19z\" />\n                                        <path d=\"M31.065,8.161h-6.972c-0.276,0-0.5-0.224-0.5-0.5V0.688c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5v6.473h6.472\n                                            c0.276,0,0.5,0.224,0.5,0.5S31.342,8.161,31.065,8.161z\" />\n                                        <path d=\"M31.065,8.161c-0.13,0-0.26-0.051-0.358-0.151l-6.972-7.161c-0.192-0.198-0.188-0.514,0.01-0.707\n                                            c0.197-0.191,0.516-0.187,0.707,0.01l6.972,7.161c0.192,0.198,0.188,0.514-0.01,0.707C31.317,8.114,31.191,8.161,31.065,8.161z\" />\n                                    </g>\n                                </g>\n                            </g>\n                        </svg>\n                    </div>\n                </button>\n            </div>\n    \n        </div>\n    \n        <div class=\"update-comment ContextMenuPopup\">\n            <div class=\"Button icon\">\n                <button class=\"edit\" type=\"button\">\n                    <div class=\"Icon\">\n                        Edit\n                    </div>\n                </button>\n            </div>\n            <div class=\"Button icon\">\n                <button class=\"delete\" type=\"button\">\n                    <div class=\"Icon\">\n                        Delete\n                    </div>\n                </button>\n            </div>\n        </div>\n    \n        <div class=\"Popup ColorPalettePopup hidemouseaway ContextMenuPopup colors\">\n            <div class=\"Popup StylePopup\">\n                <div class=\"row\">\n                    <div class=\"cell colored\" hex=\"#000000\" rgb=\"rgb(0,0,0)\" style=\"background-color: rgb(0,0,0);\">\n                        <div id=\"applied_color\" class=\"Icon check-mark dark\" viewBox=\"0 0 24 24\">\n                            <svg viewBox=\"0 0 24 24\" id=\"ic_check_black_24px\" width=\"100%\" height=\"100%\">\n                                <g fill=\"none\" fill-rule=\"evenodd\">\n                                    <path d=\"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z\" fill=\"currentColor\" fill-rule=\"nonzero\"></path>\n                                    <path d=\"M0 0h24v24H0z\"></path>\n                                </g>\n                            </svg>\n                        </div>\n                    </div>\n                    <div class=\"cell colored\" hex=\"#FFFFFF\" rgb=\"rgb(255,255,255)\" style=\"background-color: rgb(255,255,255);\"></div>\n                    <div class=\"cell colored\" hex=\"#FF0000\" rgb=\"rgb(255,0,0)\" style=\"background-color: rgb(255,0,0);\"></div>\n                    <div class=\"cell colored\" hex=\"#00FF00\" rgb=\"rgb(0,255,0)\" style=\"background-color: rgb(0,255,0)\"></div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"cell colored\" hex=\"#0000FF\" rgb=\"rgb(0,0,255)\" style=\"background-color: rgb(0,0,255);\"></div>\n                    <div class=\"cell colored\" hex=\"#FFFF00\" rgb=\"rgb(255,255,0)\" style=\"background-color: rgb(255,255,0);\"></div>\n                    <div class=\"cell colored\" hex=\"#00FFFF\" rgb=\"rgb(0,255,255)\" style=\"background-color: rgb(0,255,255);\"></div>\n                    <div class=\"cell colored\" hex=\"#FF00FF\" rgb=\"rgb(255,0,255)\" style=\"background-color: rgb(255,0,255);\"></div>\n    \n                </div>\n                <div class=\"row\">\n                    <div class=\"cell colored\" hex=\"#C0C0C0\" rgb=\"rgb(192,192,192)\" style=\"background-color: rgb(192,192,192);\"></div>\n                    <div class=\"cell colored\" hex=\"#808080\" rgb=\"rgb(128,128,128)\" style=\"background-color: rgb(128,128,128);\"></div>\n                    <div class=\"cell colored\" hex=\"#00cc63\" rgb=\"rgb(128,0,0)\" style=\"background-color: rgb(0, 204, 99);\"></div>\n                    <div class=\"cell colored\" hex=\"#808000\" rgb=\"rgb(128,128,0)\" style=\"background-color: rgb(128,128,0);\"></div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"cell colored\" hex=\"#008000\" rgb=\"rgb(0,128,0)\" style=\"background-color: rgb(0,128,0);\"></div>\n                    <div class=\"cell colored\" hex=\"#800080\" rgb=\"rgb(128,0,128)\" style=\"background-color: rgb(128,0,128);\"></div>\n                    <div class=\"cell colored\" hex=\"#008080\" rgb=\"rgb(0,128,128)\" style=\"background-color: rgb(0,128,121);\"></div>\n                    <div class=\"cell colored\" hex=\"#000080\" rgb=\"rgb(0,0,128)\" style=\"background-color: rgb(0,0,128);\"></div>\n                </div>\n            </div>\n        </div>    \n        <div class=\"excel_doc\"></div>\n    </div>"

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
/* harmony import */ var _app_socket_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../app/socket.service */ "./src/app/socket.service.ts");
/* harmony import */ var _app_http_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../app/http.service */ "./src/app/http.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
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
        this.mentionConfig = {};
        this.mention_list = [];
        this.should_save = false;
        this.doc_models = {};
        this.mention_list = [];
        window['should_save'] = true;
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
        $('#viewer-wrapper').scrollTop($('.pdfViewer .page:first').height() * (pageToMove - 1) + 50);
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
        if (parent_url.endsWith('login')) {
            parent_url = '/#/';
        }
        else if (parent_url) {
            obj_this.router.navigate([parent_url]);
        }
    };
    DocumentComponent.prototype.go_back = function () {
        this._location.back();
    };
    DocumentComponent.prototype.loadDoc = function () {
        console.log(Date(), new Date().getMilliseconds());
        var obj_this = this;
        window['show_annotation'] = false;
        window['functions'].showLoader('loaddocwaiter');
        obj_this.onLibsLoaded();
    };
    DocumentComponent.prototype.placeCursorAtEnd = function () {
        var contentEditableElement = $('.active-mention')[0];
        var range, selection;
        if (document.createRange) //Firefox, Chrome, Opera, Safari, IE 9+
         {
            range = document.createRange(); //Create a range (a range is a like the selection but invisible)
            range.selectNodeContents(contentEditableElement); //Select the entire contents of the element with the range
            range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
            selection = window.getSelection(); //get the selection object (allows you to change selection)
            selection.removeAllRanges(); //remove any selections already made
            selection.addRange(range); //make the range you have just created the visible selection
        }
    };
    DocumentComponent.prototype.onLibsLoaded = function () {
        console.log(Date(), new Date().getMilliseconds(), ' doc reached');
        var obj_this = this;
        var doc_type = obj_this.route.snapshot.params.doc_type;
        var doc_id = obj_this.route.snapshot.params.res_id;
        var point_id = undefined;
        var args = {
            app: 'documents',
            model: 'File',
            // method: 'get_binary'
            method: 'get_file_data'
        };
        if (window.location.toString().indexOf('4200') > -1) {
            args.method = 'get_binary';
        }
        var input_data = {
            args: args,
            params: { id: doc_id }
        };
        if (obj_this.route.toString().indexOf('discussion') > -1) {
            point_id = doc_id;
            input_data = {
                args: args,
                params: { id: doc_id }
            };
        }
        var renderDoc = function (data) {
            // console.log(Date(), data, new Date().getMilliseconds(),  'doc data downloaded');
            data.file_type = doc_type;
            obj_this.doc_data = data;
            if (data.breadcrumb) {
                obj_this.breadcrumb = JSON.stringify(data.breadcrumb);
            }
            if (data.mention_list) {
                obj_this.mention_list = data.mention_list.filter(function (obj) {
                    return obj.id != obj_this.socketService.user_data.id;
                });
                // console.log(obj_this.mention_list);
                obj_this.mentionConfig = {
                    items: obj_this.mention_list,
                    insertHTML: true,
                    triggerChar: "@",
                    dropUp: true,
                    labelKey: 'name',
                    mentionSelect: function (val) {
                        var el = $('.active-mention');
                        var tag = $('<a class="mention" mentioned_id="' + val.id + '" href="/#/' + val.group + '/' + val.id + '">' + val.name + '</a>');
                        el.append(tag);
                        el.html(el.html().replace('@', ''));
                        obj_this.placeCursorAtEnd();
                        window['should_save'] = false;
                        return '';
                    }
                };
            }
            var doc_data = {
                id: doc_id,
                first_time: 1,
                type: doc_type,
                attendees: data.attendees,
                doc_name: data.name,
                mp_signature_status: data.mp_signature_status
            };
            if (data.url) {
                doc_data['url'] = data.url;
            }
            else {
                doc_data['doc'] = data.doc;
            }
            if (data.excel) {
                $('app-document .excel_doc').append(data.doc).show();
                $('.loadingoverlay').hide();
            }
            else {
                console.log(Date(), new Date().getMilliseconds(), 'started rendering');
                window['pdf_js_module'].render(doc_data);
            }
        };
        if (!doc_type) {
            //console.log("No doc_type");
            return;
        }
        obj_this.httpService.get(input_data, renderDoc, function () {
            window['functions'].hideLoader('loaddocwaiter');
        });
    };
    DocumentComponent.prototype.ngOnInit = function () {
        var obj_this = this;
        window['init_doc_comments']();
        $('#viewer-wrapper').scroll(function () {
            var scroll = $(this).scrollTop();
            if (scroll == 0)
                scroll = 1;
            obj_this.page_num = Math.ceil(scroll / $('.pdfViewer .page:first').height());
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
            _app_socket_service__WEBPACK_IMPORTED_MODULE_2__["SocketService"],
            _app_http_service__WEBPACK_IMPORTED_MODULE_3__["HttpService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_common__WEBPACK_IMPORTED_MODULE_4__["Location"]])
    ], DocumentComponent);
    return DocumentComponent;
}());



/***/ }),

/***/ "./src/components/esigndocdetails/esigndocdetails.component.html":
/*!***********************************************************************!*\
  !*** ./src/components/esigndocdetails/esigndocdetails.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-breadcrumb app=\"meetings\" model=\"signdocument\" \n*ngIf=\"doc && !is_public\"\nrid=\"{{doc.id}}\" delete=\"1\" \nroutes='[{\"title\":\"Actions\", \"link\":\"/actions\"}, {\"title\":\"Esignature\", \"link\":\"/actions/signdocs\"}]'\ntitle=\"{{doc.doc_name}}\"></app-breadcrumb>\n<div class=\"router-outlet p-0\">\n\n    <div name=\"id\" class=\"e_sign_doc_id\" invisible=\"1\" ></div>\n\n    <div class=\"sign-position dev_only\" ></div>\n    <!--<div class=\"meetings_div col-md-6\">-->\n        <!--<strong>Attach to meeting(Optional):</strong>-->\n    <!--<select id=\"dropdown_meeting\" style=\"width:50%\"><option value=\"0\">Select Meeting</option></select>-->\n    <!--<br><strong class=\"check_box_send_all\" >Send to all attendees:</strong>-->\n    <!--<input  id=\"check_box_send_all\" class=\"check_box_send_all\" type=\"checkbox\"/>-->\n    <!--</div>-->\n    \n    <div id=\"holder\">\n        <div class=\"container-fluid\">\n            <div class=\"row doc-container\" [ngClass]=\"{admin: socketService.is_admin}\">\n                <div id=\"doc-side-scroll\">\n                    <div class=\"PdfButtonWrapper\">\n                        <div class=\"PdfVerticalButtonWrapper\">\n                            <div class=\"fields-title\">\n                                FIELDS\n                            </div>\n                            <div id=\"signature-position\" class=\"drag docselectbtn position_btns sign_psition\">\n                                <i class=\"icon-draw-pencil\"></i> Signature\n                            </div>\n                            <div id=\"initial-position\" class=\"drag docselectbtn position_btns initial_psition\">\n                                <i>Ds</i> Initials\n                            </div>\n                            <div id=\"date-position\" class=\"drag docselectbtn position_btns date_psition\">\n                                <i class=\"icon-calendar-empty\"></i> Date\n                            </div>\n                            <div id=\"text-position\" class=\"drag docselectbtn position_btns name_psition\">\n                                <i class=\"icon-user-single\"></i> Name\n                            </div>\n                            <div id=\"name-position\" class=\"drag docselectbtn position_btns email_psition\">\n                                <i class=\"fa fa-envelope\"></i>  Email\n                            </div>\n                            <div id=\"phone-position\" class=\"drag docselectbtn position_btns phone_psition\">\n                                <i class=\"icon-call-answer\"></i> Phone\n                            </div>\n                            <div id=\"company-position\" class=\"drag docselectbtn position_btns company_psition\">\n                                <i class=\"icon-hotel\"></i> Company\n                            </div>\n            \n                            <div class=\"meetings_div\">\n                                <span class=\"doc-subtitle\">Attach to meeting(Optional):</span>\n                                <select id=\"dropdown_meeting\"><option value=\"0\">Select Meeting</option></select>\n                                <div class=\"doc-subtitle\">\n                                    <input  id=\"check_box_send_all\" class=\"check_box_send_all\" type=\"checkbox\"/>\n                                    <strong class=\"check_box_send_all\" >Send to all attendees:</strong>\n                                </div>\n                            </div>\n            \n                            <button id=\"save-doc-data\" class=\"btn btn-primary save_doc_data\">\n                                Send\n                            </button>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"docWrapperContainer pr-0 pl-0\">\n                    <div class=\"top_btns\">\n                        <div class=\"PdfTopBtnsWrapper\">\n                            <div class=\"btn  btn-sm doc_btn fa fa-chevron-left\" id=\"prev\" ></div>\n                            <div class=\"btn  btn-sm doc_btn fa fa-chevron-right\" id=\"next\" ></div>\n                            <span class=\"pg_no\"> <span style=\"font-weight: bold;\" id=\"page_num\" ></span> / <span id=\"page_count\" ></span></span>\n                            <div class=\"btn btn-sm doc_btn icon-zoom-out\" id=\"zoomOut\" title=\"Zoom Out\" ></div>\n                            <div class=\"btn btn-sm doc_btn icon-zoom-in\" id=\"zoomIn\" title=\"Zoom In\" ></div>\n                            <span style=\"display: inline-block;\" id=\"scaleSelectContainer\">\n                                <select data-style=\"btn-primary\" id=\"scaleSelect\" title=\"Zoom\" tabindex=\"23\">\n                                    <option title=\"\" value=\"0.5\">50%</option>\n                                    <option title=\"\" value=\"0.75\">75%</option>\n                                    <option title=\"\" value=\"1\">100%</option>\n                                    <option title=\"\" value=\"1.25\">125%</option>\n                                    <option title=\"\" value=\"1.5\">150%</option>\n                                    <option title=\"\" value=\"2\">200%</option>\n                                    <option title=\"\" value=\"3\">300%</option>\n                                    <option title=\"\" value=\"4\">400%</option>\n                                </select>\n                            </span>\n                        </div>\n                    </div>\n                    <div id=\"viewer_container\" style=\"position:relative;\">\n                        <div id=\"nxxt_sign\">START\n                            SIGNING</div>\n\n                        <div id=\"page_container1\" style=\"position:relative;\">\n\n                            <div id=\"page_container\" style=\"text-align: initial;position:relative;display: inline-block;\">\n                                <canvas id=\"the-canvas\" ></canvas>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n</div>\n<div class=\"modal fade\" id=\"select_user_modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"SelectUserModal\" aria-hidden=\"true\">\n    <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n        <div class=\"modal-body\">\n            <div class=\"ng-select-user-list\">\n                <ng-select\n                [items]=\"users_list\"\n                [multiple]=\"false\"\n                [closeOnSelect]=\"true\"\n                [hideSelected]=\"false\"\n                [isOpen]=\"true\"\n                bindLabel=\"name\"\n                [searchable] = \"true\"\n                (change)=\"setUserSelection()\"\n                placeholder=\"Select User\"                \n                [(ngModel)]=\"selectedUser\"\n                >\n                </ng-select>\n            </div>\n        </div>\n    </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/components/esigndocdetails/esigndocdetails.component.ts":
/*!*********************************************************************!*\
  !*** ./src/components/esigndocdetails/esigndocdetails.component.ts ***!
  \*********************************************************************/
/*! exports provided: EsignDocDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EsignDocDetailsComponent", function() { return EsignDocDetailsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
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





var EsignDocDetailsComponent = /** @class */ (function () {
    function EsignDocDetailsComponent(httpService, route, ss, router) {
        this.httpService = httpService;
        this.route = route;
        this.ss = ss;
        this.router = router;
        this.is_public = false;
        this.users_list = [];
        this.prev_height = '';
        // this.route.params.subscribe(params => this.get_data());
        this.socketService = ss;
    }
    EsignDocDetailsComponent.prototype.get_data = function () {
    };
    EsignDocDetailsComponent.prototype.setUserSelection = function () {
        var obj_this = this;
        if (obj_this.selectedUser) {
            var sign = $('.active_signature');
            sign.attr("user", obj_this.selectedUser['id']);
            sign.find('.user_name').remove();
            sign.append("<div class='user_name'>" + obj_this.selectedUser['name'] + "</div>");
            sign.removeClass('active_signature');
        }
        $('#select_user_modal').modal('hide');
    };
    EsignDocDetailsComponent.prototype.ngOnInit = function () {
        var obj_this = this;
        var canvas, pdf_binary, users, doc_data, send_to_all, meeting_id, meetings, req_url, ctx, pdfDoc, scale, pageNum, ajax_options, token = $('.sign_token').val() || "", doc_id = $('.e_sign_doc_id').first().html(), isAdmin = obj_this.socketService.is_admin;
        if (!doc_id) {
            var route_token = obj_this.route.snapshot.params.token;
            doc_id = obj_this.route.snapshot.params.id;
            if (route_token) {
                token = obj_this.route.snapshot.params.token;
                obj_this.is_public = true;
            }
        }
        obj_this.doc = {
            "id": doc_id,
            "doc_name": ''
        };
        // console.log(obj_this.socketService.user_data, 444);
        $('#select_user_modal').on('shown.bs.modal', function () {
            var sign = $('.active_signature:first');
            var selected = sign.attr("user");
            // console.log(selected, 333);
            if (!selected) {
                obj_this.selectedUser = undefined;
                $('.ng-select-user-list .ng-input input').focus();
                return;
            }
            var user_index = 0;
            var offSet = 0;
            if (selected) {
                var user_name = sign.find('.user_name').text();
                obj_this.selectedUser = { id: parseInt(selected), name: user_name };
                user_index = obj_this.users_list.findIndex(function (x) { return x.id === parseInt(selected); });
                var selected_option = $('.ng-select-user-list .ng-option').eq(user_index);
                var num = obj_this.users_list.length;
                var totalHeight = $('.ng-select-user-list .scroll-host')[0].scrollHeight;
                offSet = user_index * totalHeight / num;
                $('.scroll-host').animate({
                    scrollTop: offSet
                }, 100);
                $('.ng-select-user-list .ng-input input').focus();
            }
        });
        $('#select_user_modal').on('hidden.bs.modal', function () {
            obj_this.selectedUser = undefined;
            $('.ng-select-user-list .ng-input input').focus();
            $('.active_signature').removeClass('active_signature');
        });
        function loadData() {
            $('#loaderContainerajax').show();
            $(".o_loading").show();
            var url = '';
            ajax_options = {
                data: {
                    args: {
                        app: 'meetings',
                        model: 'SignDocument',
                        method: 'get_detail'
                    },
                    params: {
                        document_id: doc_id,
                        token: token,
                    }
                },
                onSuccess: function (data) {
                    if (obj_this.is_public && data == 'done') {
                        $('#holder').hide();
                        $('body').prepend('<h1>You have Completed You Signatures</h1>');
                    }
                    doc_data = data.doc_data;
                    // console.log(doc_data, 11);
                    obj_this.users_list = users = data.users;
                    meetings = data.meetings;
                    meeting_id = data.meeting_id;
                    send_to_all = data.send_to_all;
                    pdf_binary = data.pdf_binary;
                    obj_this.doc.doc_name = data.doc_name;
                    //setTimeout(function(){ showPDF(pdf_binary); }, 3000);
                    renderPDF(pdf_binary);
                    if (meetings) {
                        $('#dropdown_meeting .meeting_options').remove();
                        $.each(meetings, function () {
                            $('#dropdown_meeting').append($("<option class='meeting_options'/>").val(this.id).text(this.name));
                        });
                    }
                    if (meeting_id) {
                        $('#dropdown_meeting').val(meeting_id);
                        $('.check_box_send_all').show();
                    }
                    if (send_to_all) {
                        $('#check_box_send_all').prop('checked', true);
                    }
                }
            };
            if (token) {
                ajax_options.url = '/rest/public';
            }
            window['dn_rpc_object'](ajax_options);
        }
        loadData();
        function toggleNextButton() {
            var d = $.grep(doc_data, function (v) {
                return !v.signed && v.my_record;
            });
            if (d.length > 0) {
                $("#nxxt_sign").show();
            }
        }
        $('#scaleSelect')[0].selectedIndex = 4;
        //$('.modal-footer:last').hide();
        function renderPDF(s) {
            $('#loaderContainerajax').show();
            $(".o_loading").show();
            var pdfData = atob(s);
            //     PDFJS.workerSrc = '/e_sign/static/js/pdf.worker.js';
            pdfDoc = null;
            scale = 1.5;
            canvas = document.getElementById('the-canvas');
            ctx = canvas.getContext('2d');
            window["PDFJS"].getDocument({
                data: pdfData
            }).then(function getPdf(_pdfDoc) {
                pdfDoc = _pdfDoc;
                if (!pageNum) {
                    pageNum = 1;
                }
                renderPage(pageNum);
                $('.docWrapperContainer').show();
                toggleNextButton();
            });
        }
        function base64ToUint8Array(base64) {
            var raw = atob(base64); //This is a native function that decodes a base64-encoded string.
            var uint8Array = new Uint8Array(new ArrayBuffer(raw.length));
            for (var i = 0; i < raw.length; i++) {
                uint8Array[i] = raw.charCodeAt(i);
            }
            return uint8Array;
        }
        function renderPage(num) {
            // Using promise to fetch the page
            pdfDoc.getPage(num).then(function (page) {
                var viewport = page.getViewport(scale);
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                // Render PDF page into canvas context
                var renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
                page.render(renderContext);
            });
            // Update page counters
            pageNum = num;
            document.getElementById('page_num').textContent = pageNum;
            document.getElementById('page_count').textContent = pdfDoc.numPages;
            $('.saved_sign').hide();
            $('.new_sign').hide();
            var selector = '.new_sign[page=' + pageNum + ']';
            $(selector).show();
            //  $("#nxxt_sign").css({top:$('#page_container1').scrollTop()});
            setTimeout(function () {
                loadSignatures({
                    "doc_data": doc_data
                });
            }, 200);
            $('#loaderContainerajax').hide();
            $(".o_loading").hide();
        }
        // Go to previous page
        $("#prev").on('click', function goPrevious() {
            if (pageNum <= 1)
                return;
            pageNum--;
            renderPage(pageNum);
        });
        // Go to next page
        $("#next").on('click', function goNext() {
            if (pageNum >= pdfDoc.numPages)
                return;
            pageNum++;
            renderPage(pageNum);
        });
        function zoom(newScale) {
            // Using promise to fetch the page
            pdfDoc.getPage(pageNum).then(function (page) {
                var viewport = page.getViewport(newScale);
                var pre_width = canvas.width;
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                var new_width = canvas.width;
                // Render PDF page into canvas context
                var renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
                page.render(renderContext);
                //  $('.saved_sign').hide();
                //  $("#nxxt_sign").css({top:$('#page_container1').scrollTop()});
                var saved_new_signs = $('.saved_sign:visible,.new_sign');
                $.each(saved_new_signs, function () {
                    var h, w, perc;
                    if (pre_width > canvas.width) {
                        perc = (canvas.width / pre_width);
                        w = parseFloat($(this)[0].style.width) * perc;
                        h = parseFloat($(this)[0].style.height) * perc;
                    }
                    if (pre_width < canvas.width) {
                        perc = (canvas.width / pre_width);
                        w = parseFloat($(this)[0].style.width) * perc;
                        h = parseFloat($(this)[0].style.height) * perc;
                    }
                    if (pre_width == canvas.width) {
                        w = parseFloat($(this)[0].style.width);
                        h = parseFloat($(this)[0].style.height);
                    }
                    $(this).css({
                        width: w,
                        height: h
                    });
                });
            });
        }
        $("#zoomIn").on('click', function zoomIn() {
            var scaleSelect = document.getElementById("scaleSelect");
            var last = scaleSelect.options.length - 1;
            if (scaleSelect.selectedIndex < last) {
                scale = scaleSelect.options[scaleSelect.selectedIndex + 1].value;
                scaleSelect.selectedIndex += 1;
                zoom(scale);
            }
        });
        $("#zoomOut").on('click', function zoomOut() {
            var scaleSelect = document.getElementById("scaleSelect");
            var last = scaleSelect.options.length - 1;
            if (scaleSelect.selectedIndex > 0) {
                scale = scaleSelect.options[scaleSelect.selectedIndex - 1].value;
                scaleSelect.selectedIndex -= 1;
                zoom(scale);
            }
        });
        $("#scaleSelect").on('click', function zoomSelect() {
            var scaleSelect = document.getElementById("scaleSelect");
            scale = scaleSelect.options[scaleSelect.selectedIndex].value;
            zoom(scale);
        });
        function loadSignatures(data) {
            doc_data = data.doc_data;
            var height = canvas.height;
            // console.log(doc_data);
            $.each(doc_data, function () {
                // console.log(this);
                var div = $('<div></div>', {
                    id: this.id,
                    signed: this.signed,
                    name: this.name,
                    my_record: this.my_record,
                    //zoom:this.zoom,
                    page: this.page,
                    field_name: this.field_name,
                    //w:this.width,
                    //h:this.height,
                    class: "saved_sign",
                });
                if (this.type == 'sign' && !this.signed) {
                    div.html("Signature:" + this.name);
                }
                if (this.type == 'initial' && !this.signed) {
                    div.html("Initials:" + this.name);
                }
                if (this.type == 'date' && !this.signed) {
                    div.html("Date:" + this.name);
                }
                if (this.type == 'text' && !this.signed) {
                    div.html(this.field_name + ":" + this.name);
                }
                if (this.type == 'sign') {
                    div.addClass("is_sign");
                }
                if (this.type == 'initial') {
                    div.addClass("is_initial");
                }
                if (this.type == 'date') {
                    div.addClass("is_date");
                }
                if (this.type == 'text') {
                    div.addClass("is_text");
                }
                var h, w, perc, diff;
                if (this.zoom > canvas.width) {
                    perc = (canvas.width / this.zoom);
                    w = this.width * perc;
                    h = this.height * perc;
                }
                if (this.zoom < canvas.width) {
                    perc = (canvas.width / this.zoom);
                    w = this.width * perc;
                    h = this.height * perc;
                }
                if (this.zoom == canvas.width) {
                    w = this.width;
                    h = this.height;
                }
                div.css({
                    top: this.top + "%",
                    left: this.left + "%",
                    position: 'absolute',
                    width: w,
                    height: h
                });
                if (!this.signed && this.my_record) {
                    div.css({
                        background: "rgba(230, 81, 81, 0.9)"
                    });
                }
                if (isAdmin) {
                    if (this.signed) {
                        div.html('<img src="' + window['site_config'].server_base_url + this.image + '" height="100%"/>');
                    }
                }
                else {
                    if (this.signed && this.my_record) {
                        div.html('<img src="' + window['site_config'].server_base_url + this.image + '" height="100%"/>');
                    }
                }
                if (this.page == pageNum) {
                    $('#page_container').append(div);
                }
            });
        }
        ///////////////////////DRAG AND DROOP//////////////////////////
        //Dragable Start
        $('.drag').draggable({
            //containment: "#page_container",
            //revert: "invalid",
            helper: "clone",
            scroll: true,
            start: function (event, ui) {
                //$(this).data("startingScrollTop", $(this).parent().scrollTop());
                $(ui.helper).css({
                    height: '50px',
                    width: '150px',
                    padding: 0,
                    background: 'rgba(255, 235, 235, 0.9)',
                    color: 'black'
                });
            },
            drag: function (event, ui) {
                //                var st = parseInt($(this).data("startingScrollTop"));
                //                ui.position.top -= $(this).parent().scrollTop() - st;
                var positionX = $("#signature-position").position().left;
                var positionY = $("#signature-position").position().top + $(this).parent().scrollTop();
                var percent_left = (positionX / canvas.width) * 100;
                var percent_top = (positionY / canvas.height) * 100;
                $('.pstion').html('Sign Here - Positions:' + percent_left + "X" + percent_top);
            },
            cursor: 'move'
        });
        $("#page_container").droppable({
            drop: handleDropEvent,
            accept: ".drag",
            tolerance: "touch",
        });
        function handleDropEvent(event, ui) {
            var new_signature = $(ui.helper).clone().removeClass('drag').addClass("new_sign").css({
                background: 'rgba(255, 235, 235, 0.9)',
                color: 'black'
            });
            new_signature.draggable({
                containment: "#page_container",
                scroll: true,
                start: function () {
                    //$(this).data("startingScrollTop", $(this).parent().parent().scrollTop());
                    // $("#signature-position").css({ background: 'green', color: 'white', cursor: 'move' });
                },
                drag: function (event, ui) {
                    //var st = parseInt($(this).data("startingScrollTop"));
                    //ui.position.top -= $(this).parent().parent().scrollTop() - st;
                    var positionX = $(this).position().left;
                    var positionY = $(this).position().top; //+$(this).parent().scrollTop();
                    var thresh = $(this).parent().parent().height() - 40;
                    if (positionY - $(this).parent().parent().scrollTop() > thresh) {
                        $('#page_container1').animate({
                            scrollTop: $(this).parent().parent().scrollTop() + 133
                        }, 7);
                    }
                    var percent_left = (positionX / canvas.width) * 100;
                    var percent_top = (positionY / canvas.height) * 100;
                    // $('.sign-position').html('Sign Here - Positions:' + positionX + "X" + ($(this).position().top-$(this).parent().parent().scrollTop())+"-----"+thresh);
                },
                cursor: 'move'
            });
            if (parseFloat(new_signature[0].style.top) - $(this).parent().position().top < 0) {
                return;
            }
            var left = parseFloat(new_signature[0].style.left) - $(this).offset().left + 65;
            var top = parseFloat(new_signature[0].style.top) - $(this).parent().parent().position().top + $(this).parent().scrollTop();
            var percent_left = (left / canvas.width) * 100;
            var percent_top = (top / canvas.height) * 100;
            new_signature.css({
                position: 'absolute',
                left: percent_left + "%",
                top: percent_top + "%",
                overflow: 'hidden'
            });
            // console.log(percent_left, percent_top);
            //new_signature.append('<i class="fa fa-pen  fa-lg  edit_sign" style="color:black;float:right;margin-right:10px;" aria-hidden="true"/>');
            if (new_signature.hasClass("text_psition")) {
                new_signature.html('<input style="display:inline;width:90%" type="text" placeholder="Field Name"/>');
            }
            new_signature.prepend('<i class="fa fa-pen  edit_sign" style="color:black;float:left" aria-hidden="true"/>');
            new_signature.prepend('<i class="fa fa-times  fa-lg del_sign" style="color:black;float:left" aria-hidden="true"/>');
            new_signature.attr({
                "page": pageNum
            }).resizable();
            new_signature.addClass('active_signature');
            $(this).append(new_signature);
            $('#select_user_modal').modal('show');
            $(".save_doc_data").removeAttr('disabled');
        }
        $("#page_container1").droppable({
            drop: function (event, ui) {
                var left = ui.position.left;
                var top = ui.position.top;
                var percent_left = (left / canvas.width) * 100;
                var percent_top = (top / canvas.height) * 100;
                $(ui.helper[0]).css({
                    left: percent_left + "%",
                    top: percent_top + "%"
                });
            },
            accept: ".new_sign",
            tolerance: "touch",
        });
        //End Dragable
        $(document).off("click", ".save_doc_data");
        $(document).on("click", ".save_doc_data", function (e) {
            var new_divs = $('.new_sign');
            var snd_to_all = $("#check_box_send_all").is(':checked');
            if (new_divs.length == 0 && !snd_to_all) {
                return;
            }
            window["doc_preview"].image("uuuu");
            var body = $('.youtubeVideoModal .modal-body:last');
            var content = $('.youtubeVideoModal .modal-content:last');
            var footer = $('<div class="modal-footer" style="text-align: left;"></div>');
            var input_email = $('<h3>Send by Email:</h3><input id="email" placeholder="Email" style="width:50%"/>');
            var input_name = $('<input id="email" placeholder="Name" style="width:50%"/>');
            var input_subject = $('<input id="subject" placeholder="Subject" style="width:50%"/>');
            var email_body = $('<textarea class="o_sign_message_textarea o_input" style="border-style: solid;width: 100%;"rows="4"></textarea>');
            var save_btn = $('<br><span class="btn btn-primary btn-sm DocsBtn">Send</span>');
            var cancel_btn = $('<span class="btn btn-primary btn-sm cancelBtn">cancel</span>');
            var _users = false;
            input_subject.val("Signature Request");
            var meeting_id = $('#dropdown_meeting').val();
            if (!meeting_id || meeting_id == 0) {
                meeting_id = false;
                snd_to_all = false;
            }
            body.append("<h3>Subject</h3>").append(input_subject);
            body.append("<h3>Message</h3>").append(email_body);
            body.append(save_btn);
            body.append(cancel_btn);
            cancel_btn.click(function (evt) {
                evt.preventDefault();
                $('.youtubeVideoModal').modal('hide');
            });
            save_btn.click(function (e) {
                var arr = [];
                var isEmpty = false;
                var subject = input_subject[0].value;
                var message = email_body[0].value;
                var email = input_email[1].value;
                var name = input_name[0].value;
                if (!snd_to_all) {
                    $.each(new_divs, function () {
                        var sign = $(this);
                        var left = sign.position().left;
                        var top = sign.position().top + sign.parent().scrollTop();
                        var percent_left = parseFloat(sign[0].style.left); //(left/canvas.width)*100;
                        var percent_top = parseFloat(sign[0].style.top); //(top/canvas.height)*100;
                        var h = sign[0].style.height;
                        h = parseFloat(h);
                        var w = sign[0].style.width;
                        w = parseFloat(w);
                        var pg = sign.attr("page");
                        var user = sign.attr("user");
                        if (user == 0 || !user) {
                            isEmpty = true;
                            return;
                        }
                        var type;
                        var field_name = "";
                        if (sign.hasClass("sign_psition")) {
                            type = "sign";
                        }
                        if (sign.hasClass("initial_psition")) {
                            type = "initial";
                        }
                        if (sign.hasClass("date_psition")) {
                            type = "date";
                        }
                        if (sign.hasClass("name_psition")) {
                            type = "text";
                            field_name = "Name";
                        }
                        if (sign.hasClass("email_psition")) {
                            type = "text";
                            field_name = "Email";
                        }
                        if (sign.hasClass("phone_psition")) {
                            type = "text";
                            field_name = "Phone";
                        }
                        if (sign.hasClass("company_psition")) {
                            type = "text";
                            field_name = "Company";
                        }
                        if (sign.hasClass("text_psition")) {
                            type = "text";
                            field_name = sign.find('input').val();
                            if (field_name == "") {
                                isEmpty = true;
                                return;
                            }
                        }
                        var obj = {
                            document_id: doc_id,
                            token: token,
                            user_id: user,
                            field_name: field_name,
                            email: email,
                            name: name,
                            left: percent_left,
                            top: percent_top,
                            page: pg,
                            height: h,
                            width: w,
                            zoom: canvas.width,
                            type: type
                        };
                        arr.push(obj);
                    });
                    if (isEmpty) {
                        alert("Select user for all fields!!!");
                        return;
                    }
                }
                var url = '';
                url = get_url('/esign/save_sign_data');
                if (arr.length != 0 || snd_to_all) {
                    window['dn_rpc_object']({
                        url: url,
                        data: {
                            args: {
                                app: "meetings",
                                model: "SignDocument"
                            },
                            params: {
                                document_id: doc_id,
                                token: token,
                                'data': JSON.stringify(arr),
                                url: url,
                                meeting_id: meeting_id,
                                subject: subject,
                                message: message,
                                send_to_all: snd_to_all
                            }
                        },
                        onSuccess: function (data) {
                            loadData();
                            $(".save_doc_data").attr('disabled', 'disabled');
                            new_divs.hide().removeClass("new_sign");
                            $('.youtubeVideoModal').modal('hide');
                            $("#nxxt_sign").click();
                        }
                    });
                }
            });
        });
        $(document).off("click", ".saved_sign.is_sign,.saved_sign.is_initial");
        $(document).on("click", ".saved_sign.is_sign,.saved_sign.is_initial", function () {
            var login = $(this).attr("login");
            var my_record = $(this).attr("my_record");
            if (my_record == "false" && !isAdmin) {
                return;
            }
            var signature_id = $(this).attr("id");
            var usr_name = $(this).attr("name");
            window["doc_preview"].image("uuuu");
            var body = $('.youtubeVideoModal .modal-body:last');
            var save_btn = $('<span class="btn btn-primary btn-sm DocsBtn">Save</span>');
            var cancel_btn = $('<span class="btn btn-primary btn-sm cancelBtn">Cancel</span>');
            var del_btn = $('<span style="float:right" class="btn btn-primary btn-sm DocsBtn">Remove</span>');
            var signature_editor = $('<div id="signature_editor_esign"></div>');
            var clear_btn = $('<span class="btn btn-danger btn-sm DocsBtn">Clear</span>');
            var draw_sign_btn = $('<span class="btn btn-primary btn-sm DocsBtn">Draw</span>');
            var upload_btn = $('<input accept=".jpg,.png,.jpeg" style="display:none" type="file"></input>');
            var auto_sign = $('<span class="btn btn-primary btn-sm DocsBtn">Auto</span>');
            var top_div = $('<div class="DocsButtonWrapper" style="font-size:14px; height:auto" />');
            var upload_clicker = $('<button class="btn btn-sm btn-primary o_select_file_button DocsBtn"title="Select" type="button">Upload</button>');
            upload_clicker = $(upload_clicker);
            upload_clicker.click(function () {
                upload_btn.click();
            });
            top_div.append(draw_sign_btn).append(upload_clicker).append(auto_sign).append(upload_btn);
            if (my_record == "true") {
                body.append(signature_editor);
                signature_editor.before(top_div);
                signature_editor.after(clear_btn);
                signature_editor.signature();
                body.append(save_btn);
                if (isAdmin) {
                    body.append(del_btn);
                }
                var myCanvas = signature_editor.find('canvas')[0];
                var canvas_context = myCanvas.getContext('2d');
                var img = new Image();
                img.onload = function () {
                    //                diffy = diffy/2;
                    //                var hidden_image_height = hidden_image.height();
                    //                var hidden_image_width = hidden_image.width();
                    //                var diffx = signature_editor.width() - hidden_image_width;
                    //                var diffy = signature_editor.height() - hidden_image_height;
                    //                diffx = diffx/2;
                    //                diffy = diffy/2;
                    //                canvas_context.drawImage(img, diffx, diffy,hidden_image_width,hidden_image_height);
                    //                myCanvas.height=hidden_image_height;
                    //                myCanvas.width=hidden_image_width;
                    canvas_context.drawImage(img, 0, 0, signature_editor.width(), signature_editor.height());
                };
                //            var hidden_image_container = '<div id="hidden_img_cont" ';
                //            var hic_style =' style="visibility:hidden;height:'+signature_editor.height()+'px;width:'+signature_editor.width()+'px"';
                //            hidden_image_container = $(hidden_image_container + hic_style + '/>');
                //            var hidden_image = $('<img style="max-height:100%;max-width:100%" />');
                //            body.append(hidden_image_container);
                //            hidden_image_container.html(hidden_image);
                ajax_options = {
                    data: {
                        args: {
                            app: "esign",
                            model: "SignatureDoc",
                            method: "get_signature"
                        },
                        params: {
                            signature_id: signature_id,
                            document_id: doc_id,
                            token: token
                        }
                    },
                    onSuccess: function (data) {
                        setTimeout(function () {
                            load_signature(data);
                        }, 200);
                    }
                };
                if (token) {
                    ajax_options.url = '/rest/public';
                }
                window['dn_rpc_object'](ajax_options);
                var dataURL = '';
                var auto_clicked = false;
                auto_sign.click(function (e) {
                    $('#loaderContainerajax').show();
                    auto_clicked = true;
                    var url = '';
                    url = get_url('/esign/save_signature');
                    window['dn_rpc_object']({
                        url: url,
                        data: {
                            args: {
                                app: "meetings",
                                model: "SignDocument"
                            },
                            params: {
                                signature_id: signature_id,
                                document_id: doc_id,
                                token: token,
                                binary_signature: "",
                                type: "auto",
                                url: url
                            }
                        },
                        onSuccess: function (data) {
                            load_signature(data);
                            $("#nxxt_sign").click();
                        }
                    });
                });
                signature_editor.mousedown(function () {
                    auto_clicked = false;
                });
                upload_btn.change(function () {
                    if (!this.files)
                        return;
                    if (this.files.length < 1)
                        return;
                    var reader = new FileReader();
                    auto_clicked = false;
                    var upload_file = this.files[0];
                    reader.readAsDataURL(upload_file);
                    reader.onload = function () {
                        var dataURL = reader.result;
                        //                    hidden_image.attr('src',dataURL);
                        canvas_context.clearRect(0, 0, myCanvas.width, myCanvas.height);
                        img.src = dataURL + "";
                    };
                });
                save_btn.click(function (e) {
                    $('#loaderContainerajax').show();
                    var type = "draw";
                    dataURL = myCanvas.toDataURL();
                    var empty_url = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXAAAADGCAYAAADL/dvjAAAGpUlEQVR4Xu3UgQkAMAwCwXb/oS10i4fLBHIG77YdR4AAAQI5gWvAc50JTIAAgS9gwD0CAQIEogIGPFqc2AQIEDDgfoAAAQJRAQMeLU5sAgQIGHA/QIAAgaiAAY8WJzYBAgQMuB8gQIBAVMCAR4sTmwABAgbcDxAgQCAqYMCjxYlNgAABA+4HCBAgEBUw4NHixCZAgIAB9wMECBCIChjwaHFiEyBAwID7AQIECEQFDHi0OLEJECBgwP0AAQIEogIGPFqc2AQIEDDgfoAAAQJRAQMeLU5sAgQIGHA/QIAAgaiAAY8WJzYBAgQMuB8gQIBAVMCAR4sTmwABAgbcDxAgQCAqYMCjxYlNgAABA+4HCBAgEBUw4NHixCZAgIAB9wMECBCIChjwaHFiEyBAwID7AQIECEQFDHi0OLEJECBgwP0AAQIEogIGPFqc2AQIEDDgfoAAAQJRAQMeLU5sAgQIGHA/QIAAgaiAAY8WJzYBAgQMuB8gQIBAVMCAR4sTmwABAgbcDxAgQCAqYMCjxYlNgAABA+4HCBAgEBUw4NHixCZAgIAB9wMECBCIChjwaHFiEyBAwID7AQIECEQFDHi0OLEJECBgwP0AAQIEogIGPFqc2AQIEDDgfoAAAQJRAQMeLU5sAgQIGHA/QIAAgaiAAY8WJzYBAgQMuB8gQIBAVMCAR4sTmwABAgbcDxAgQCAqYMCjxYlNgAABA+4HCBAgEBUw4NHixCZAgIAB9wMECBCIChjwaHFiEyBAwID7AQIECEQFDHi0OLEJECBgwP0AAQIEogIGPFqc2AQIEDDgfoAAAQJRAQMeLU5sAgQIGHA/QIAAgaiAAY8WJzYBAgQMuB8gQIBAVMCAR4sTmwABAgbcDxAgQCAqYMCjxYlNgAABA+4HCBAgEBUw4NHixCZAgIAB9wMECBCIChjwaHFiEyBAwID7AQIECEQFDHi0OLEJECBgwP0AAQIEogIGPFqc2AQIEDDgfoAAAQJRAQMeLU5sAgQIGHA/QIAAgaiAAY8WJzYBAgQMuB8gQIBAVMCAR4sTmwABAgbcDxAgQCAqYMCjxYlNgAABA+4HCBAgEBUw4NHixCZAgIAB9wMECBCIChjwaHFiEyBAwID7AQIECEQFDHi0OLEJECBgwP0AAQIEogIGPFqc2AQIEDDgfoAAAQJRAQMeLU5sAgQIGHA/QIAAgaiAAY8WJzYBAgQMuB8gQIBAVMCAR4sTmwABAgbcDxAgQCAqYMCjxYlNgAABA+4HCBAgEBUw4NHixCZAgIAB9wMECBCIChjwaHFiEyBAwID7AQIECEQFDHi0OLEJECBgwP0AAQIEogIGPFqc2AQIEDDgfoAAAQJRAQMeLU5sAgQIGHA/QIAAgaiAAY8WJzYBAgQMuB8gQIBAVMCAR4sTmwABAgbcDxAgQCAqYMCjxYlNgAABA+4HCBAgEBUw4NHixCZAgIAB9wMECBCIChjwaHFiEyBAwID7AQIECEQFDHi0OLEJECBgwP0AAQIEogIGPFqc2AQIEDDgfoAAAQJRAQMeLU5sAgQIGHA/QIAAgaiAAY8WJzYBAgQMuB8gQIBAVMCAR4sTmwABAgbcDxAgQCAqYMCjxYlNgAABA+4HCBAgEBUw4NHixCZAgIAB9wMECBCIChjwaHFiEyBAwID7AQIECEQFDHi0OLEJECBgwP0AAQIEogIGPFqc2AQIEDDgfoAAAQJRAQMeLU5sAgQIGHA/QIAAgaiAAY8WJzYBAgQMuB8gQIBAVMCAR4sTmwABAgbcDxAgQCAqYMCjxYlNgAABA+4HCBAgEBUw4NHixCZAgIAB9wMECBCIChjwaHFiEyBAwID7AQIECEQFDHi0OLEJECBgwP0AAQIEogIGPFqc2AQIEDDgfoAAAQJRAQMeLU5sAgQIGHA/QIAAgaiAAY8WJzYBAgQMuB8gQIBAVMCAR4sTmwABAgbcDxAgQCAqYMCjxYlNgAABA+4HCBAgEBUw4NHixCZAgIAB9wMECBCIChjwaHFiEyBAwID7AQIECEQFDHi0OLEJECBgwP0AAQIEogIGPFqc2AQIEDDgfoAAAQJRAQMeLU5sAgQIGHA/QIAAgaiAAY8WJzYBAgQMuB8gQIBAVMCAR4sTmwABAgbcDxAgQCAqYMCjxYlNgAABA+4HCBAgEBUw4NHixCZAgIAB9wMECBCIChjwaHFiEyBAwID7AQIECEQFDHi0OLEJECBgwP0AAQIEogIGPFqc2AQIEDDgfoAAAQJRAQMeLU5sAgQIPKoZFdyfj3q2AAAAAElFTkSuQmCC";
                    if (dataURL == empty_url) {
                        alert('Draw signature');
                        return;
                    }
                    dataURL = dataURL.replace('data:image/png;base64,', '');
                    if (auto_clicked) {
                        type = "auto";
                    }
                    var url = '';
                    url = get_url('/esign/save_signature');
                    window['dn_rpc_object']({
                        url: url,
                        data: {
                            args: {
                                app: "meetings",
                                model: "SignDocument"
                            },
                            params: {
                                signature_id: signature_id,
                                document_id: doc_id,
                                token: token,
                                binary_signature: dataURL,
                                type: type,
                                url: url
                            }
                        },
                        onSuccess: function (data) {
                            doc_data = data.doc_data;
                            // renderPDF(data.pdf_binary);
                            loadData();
                            $('.youtubeVideoModal').modal('hide');
                            $('#loaderContainerajax').hide();
                            $("#nxxt_sign").click();
                            // web_client.do_notify(_("Success"), "Signature saved");
                        }
                    });
                });
                cancel_btn.click(function (evt) {
                    evt.preventDefault();
                    $('.youtubeVideoModal').modal('hide');
                });
                clear_btn.click(function () {
                    signature_editor.signature('clear');
                });
                draw_sign_btn.click(function () {
                    signature_editor.signature('clear');
                });
            }
            else {
                body.append('<h3>Name:</h3>' + usr_name);
                if (isAdmin) {
                    body.append(del_btn);
                }
            }
            function load_signature(data) {
                signature_editor.signature();
                signature_editor.signature('clear');
                var signature_value = data.signature;
                if (signature_value && signature_value.length > 0) {
                    dataURL = 'data:image/png;base64,' + data.signature;
                    //                    hidden_image.attr('src',dataURL);
                    img.src = dataURL;
                }
                $('#loaderContainerajax').hide();
            }
            del_btn.click(function (e) {
                if (confirm('Delete it permanently?')) {
                    var url = '';
                    url = get_url('/esign/delete_signature');
                    window['dn_rpc_object']({
                        url: url,
                        data: {
                            args: {
                                app: "meetings",
                                model: "SignDocument"
                            },
                            params: {
                                signature_id: signature_id,
                                document_id: doc_id,
                                token: token,
                                url: url
                            }
                        },
                        onSuccess: function (data) {
                            loadData();
                            $("#nxxt_sign").click();
                            // web_client.do_notify(_("Success"), "Signature saved");
                        }
                    });
                    $('.youtubeVideoModal').modal('hide');
                }
            });
        });
        $(document).off("click", ".saved_sign.is_date");
        $(document).on("click", ".saved_sign.is_date", function (e) {
            var my_record = $(this).attr("my_record");
            if (my_record == "false" && !isAdmin) {
                return;
            }
            var signature_id = $(this).attr("id");
            var usr_name = $(this).attr("name");
            window["doc_preview"].image("uuuu");
            var body = $('.youtubeVideoModal .modal-body:last');
            var content = $('.youtubeVideoModal .modal-content:last');
            var footer = $('<div class="modal-footer" style="text-align: left;"></div>');
            var input_date = $('<input id="date" disabled placeholder="Date" style="width:50%"/>');
            var save_btn = $('<span class="btn btn-primary btn-sm DocsBtn">Save</span>');
            var del_btn = $('<span style="float:right" class="btn btn-primary btn-sm DocsBtn">Remove</span>');
            var cancel_btn = $('<span class="btn btn-primary btn-sm cancelBtn">Cancel</span>');
            input_date.val($.datepicker.formatDate('dd/mm/yy', new Date()));
            body.html("<h3>Name:</h3>" + usr_name + "<h3>Date:</h3>").append(input_date);
            if (my_record == "true") {
                body.append(save_btn);
            }
            if (isAdmin) {
                body.append(del_btn);
            }
            save_btn.click(function (e) {
                var date = input_date.val();
                var url = '';
                url = get_url('/esign/save_signature');
                window['dn_rpc_object']({
                    url: url,
                    data: {
                        args: {
                            app: "meetings",
                            model: "SignDocument"
                        },
                        params: {
                            signature_id: signature_id,
                            document_id: doc_id,
                            token: token,
                            date: date,
                            type: "date",
                            url: url
                        }
                    },
                    onSuccess: function (data) {
                        // doc_data = data.doc_data;
                        // renderPDF(data.pdf_binary);
                        loadData();
                        $("#nxxt_sign").click();
                    }
                });
                $('.youtubeVideoModal').modal('hide');
            });
            cancel_btn.click(function (evt) {
                evt.preventDefault();
                $('.youtubeVideoModal').modal('hide');
            });
            del_btn.click(function (e) {
                if (confirm('Delete it permanently?')) {
                    var url = '';
                    url = get_url('/esign/delete_signature');
                    window['dn_rpc_object']({
                        url: url,
                        data: {
                            args: {
                                app: "meetings",
                                model: "SignDocument"
                            },
                            params: {
                                signature_id: signature_id,
                                document_id: doc_id,
                                token: token,
                                url: url
                            }
                        },
                        onSuccess: function (data) {
                            // doc_data = data.doc_data;
                            // renderPDF(data.pdf_binary);
                            loadData();
                            $("#nxxt_sign").click();
                        }
                    });
                    $('.youtubeVideoModal').modal('hide');
                }
            });
        });
        $(document).off("click", ".saved_sign.is_text");
        $(document).on("click", ".saved_sign.is_text", function (e) {
            var my_record = $(this).attr("my_record");
            if (my_record == "false" && !isAdmin) {
                return;
            }
            var signature_id = $(this).attr("id");
            var usr_name = $(this).attr("name");
            var field_name = $(this).attr("field_name");
            window["doc_preview"].image("uuuu");
            var body = $('.youtubeVideoModal .modal-body:last');
            var content = $('.youtubeVideoModal .modal-content:last');
            var input_text = $("<input id=\"text\"  placeholder=" + field_name + " style=\"width:50%\"/>");
            var save_btn = $('<span class="btn btn-primary btn-sm DocsBtn">Save</span>');
            var del_btn = $('<span style="float:right" class="btn btn-primary btn-sm DocsBtn">Remove</span>');
            var cancel_btn = $('<span class="btn btn-primary btn-sm cancelBtn">Cancel</span>');
            body.html("<h3>Name:</h3>" + usr_name);
            if (my_record == "true") {
                body.append("<h3>" + field_name + ":</h3>").append(input_text);
                body.append(save_btn);
            }
            if (isAdmin) {
                body.append(del_btn);
            }
            save_btn.click(function (e) {
                var text = input_text.val();
                if (text == "") {
                    alert("Enter text");
                    return;
                }
                var url = '';
                url = get_url('/esign/save_signature');
                window['dn_rpc_object']({
                    url: url,
                    data: {
                        args: {
                            app: "meetings",
                            model: "SignDocument"
                        },
                        params: {
                            signature_id: signature_id,
                            document_id: doc_id,
                            token: token,
                            text: text,
                            type: "text",
                            url: url
                        }
                    },
                    onSuccess: function (data) {
                        // doc_data = data.doc_data;
                        // renderPDF(data.pdf_binary);
                        loadData();
                        $("#nxxt_sign").click();
                    }
                });
                $('.youtubeVideoModal').modal('hide');
            });
            cancel_btn.click(function (evt) {
                evt.preventDefault();
                $('.youtubeVideoModal').modal('hide');
            });
            del_btn.click(function (e) {
                if (confirm('Delete it permanently?')) {
                    var url = '';
                    url = get_url('/esign/delete_signature');
                    window['dn_rpc_object']({
                        url: url,
                        data: {
                            args: {
                                app: "meetings",
                                model: "SignDocument"
                            },
                            params: {
                                signature_id: signature_id,
                                document_id: doc_id,
                                token: token,
                                url: url
                            }
                        },
                        onSuccess: function (data) {
                            // doc_data = data.doc_data;
                            // renderPDF(data.pdf_binary);
                            loadData();
                            $("#nxxt_sign").click();
                        }
                    });
                    $('.youtubeVideoModal').modal('hide');
                }
            });
        });
        $(document).off("click", ".new_sign .del_sign");
        $(document).on("click", ".new_sign .del_sign", function (e) {
            var sign = $($(this)[0].parentElement);
            var new_divs = $('.new_sign:visible');
            if (new_divs.length == 1) {
                $(".save_doc_data").attr('disabled', 'disabled');
            }
            sign.fadeOut();
            sign.removeClass("new_sign");
        });
        $(document).off("click", ".new_sign");
        $(document).on("click", ".new_sign", function (e) {
            if ($(e.target).hasClass('del_sign')) {
                return;
            }
            var sign = $(this);
            $('.active_signature').removeClass('active_signature');
            sign.addClass('active_signature');
            $('#select_user_modal').modal('show');
        });
        $("#nxxt_sign").click(function () {
            var d = $.grep(doc_data, function (v) {
                return !v.signed && v.my_record;
            });
            if (d.length == 0) {
                $(this).hide();
                // if (obj_this.is_public)
                // {
                //     window.location.href = window['site_config'].server_base_url+'/response-sumbitted'
                // }
                return;
            }
            var sign = d[0];
            var top = canvas.height * (sign.top / 100);
            var left = canvas.width * (sign.left / 100);
            renderPage(sign.page);
            $('html, #page_container1').animate({
                scrollTop: top - 150,
                scrollLeft: left - 150,
            }, 500);
            $(this).html("NEXT>").animate({
                top: ($('#page_container1').height() / 2) + "px"
            }, 500);
            setTimeout(function () {
                $('#nxxt_sign').html("NEXT>").animate({
                    top: top - $('#page_container1').scrollTop() + "px"
                }, 1000);
                $(".saved_sign[id=" + sign.id + "]:visible").css({
                    border: "solid 3px yellow"
                });
            }, 600);
        });
        $('#check_box_send_all').change(function () {
            if ($("#check_box_send_all").is(':checked')) {
                $('.top_btns .position_btns').removeClass("drag").attr("disabled", true);
                $(".save_doc_data").attr("disabled", false);
                $('.new_sign').remove();
            }
            else {
                $('.top_btns .position_btns').addClass("drag").attr("disabled", false);
                $(".save_doc_data").attr("disabled", true);
                //$('.new_sign').show();
            }
        });
        $('#dropdown_meeting').change(function () {
            if ($('#dropdown_meeting').val() == 0) {
                $('.check_box_send_all').hide();
            }
            else {
                $('.check_box_send_all').show();
            }
        });
        if ($('#save-doc-data').hasClass("o_invisible_modifier")) {
            $('#page_container1')[0].style.height = "calc(100vh - 165px)";
        }
        // });
        // console.log(document.getElementById('the-canvas'))
        // document.writeln('<script src="static/assets/js/viewer.js"></script>');
        this.prev_height = $('.router-outlet').css('height');
        var new_height = parseFloat(this.prev_height) + 20;
        $('.router-outlet').css('height', new_height);
        // console.log(this.prev_height, new_height);
        function get_url(url) {
            if (obj_this.is_public) {
                return url + '_public';
            }
            return url;
        }
    };
    EsignDocDetailsComponent.prototype.ngOnDestroy = function () {
        $('.router-outlet').css('height', this.prev_height);
    };
    EsignDocDetailsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            styles: [__webpack_require__(/*! ./esigndocdetails.css */ "./src/components/esigndocdetails/esigndocdetails.css")],
            template: __webpack_require__(/*! ./esigndocdetails.component.html */ "./src/components/esigndocdetails/esigndocdetails.component.html")
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _app_socket_service__WEBPACK_IMPORTED_MODULE_3__["SocketService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], EsignDocDetailsComponent);
    return EsignDocDetailsComponent;
}());



/***/ }),

/***/ "./src/components/esigndocdetails/esigndocdetails.css":
/*!************************************************************!*\
  !*** ./src/components/esigndocdetails/esigndocdetails.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#holder{\n\tposition:relative;\n}\n\n.position_btns {\n    z-index: 1\n}\n\n.top_btns {\n\tpadding: 0;\n}\n\n.pg_no {\n    color: white;\n}\n\n.PdfTopBtnsWrapper {\n\tbackground: #4B74B5;\n\tpadding:7px;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n}\n\n.doc_btn {\n    color: white;\n    font-size: 16px;\n}\n\n.edit_sign:hover,\n.del_sign:hover {\n    background-color: white;\n    color: red!important\n}\n\n.new_sign i {\n    margin-left: 2px;\n}\n\n#scaleSelectContainer select#scaleSelect {\n    background: white;\n    margin-left: 3px;\n    border: navajowhite;\n    padding: 5px 10px;\n    font-size: 12px;\n    border-radius: 3px;\n    height: 29px;\n    min-width:65px;\n}\n\n.sign-box.fa-lg {\n    margin-left: 10px;\n}\n\n#signature_editor_esign {\n    width: 459px;\n    height: 198px;\n    margin-top: 5px;\n    margin-bottom: 5px;\n}\n\n.youtubeVideoModal .modal-dialog {\n    width: 495px;\n}\n\n.youtubeVideoModal {\n    z-index: 646 !important;\n}\n\n@media (max-width: 540px) {\n    .youtubeVideoModal .modal-dialog {\n        width: auto;\n    }\n    .youtubeVideoModal .modal-body {\n        padding: 6px;\n    }\n    #signature_editor_esign {\n        width: calc(100vw - 50px);\n        margin: 5px auto !important;\n    }\n    .youtubeVideoModal .modal-dialog .modal-body {\n        text-align: center;\n    }\n}\n\n.DocsButtonWrapper:nth-child(1) {\n    margin: 0;\n}\n\n/*#signature_editor_esign\n{\n    padding: 0px;\n    border: 1px solid #cccccc;\n    margin: 3px 10px;\n    width: 304px;\n    height: 198px;\n}*/\n\n#signature_editor_esign canvas {\n    border: 1px solid;\n}\n\n.DocsBtn {\n    min-width: 85px;\n    margin: 2px;\n    margin-top: 20px;\n}\n\n.DocsButtonWrapper .btn:first-child,\n.DocsBtn.DocsBtnfirst {\n    margin-left: 0px;\n}\n\n.DocsButtonWrapper {\n    font-size: 14px;\n    height: auto\n}\n\n.sign_embed {\n    height: auto;\n    padding: 20px;\n    border: 1px solid lightgray;\n}\n\n.embed-responsive {\n    height: 390px;\n}\n\n.sign_btn {\n    margin: 5px;\n}\n\n.sign_doc_form .o_inner_groupp,\n.o_cp_right {\n    display: none!important\n}\n\n#page_container1 {\t\n\ttext-align: center;\n\tbackground: #f7f7f7;\n\tpadding-top: 1px;\n}\n\n#the-canvas{\n    border:1px solid #dadada;\n}\n\n#doc-side-scroll{\n    height: calc(100vh - 112px);\n    overflow-y:auto;\n    width:22%;\n    display: flex;\n    margin:0;\n    flex-direction: column;\n    align-items: center;\n    border-right: 1px solid rgba(75, 116, 181, 0.33);\n}\n\n.PdfButtonWrapper{    \n    padding: 10px 20px;    \n}\n\n.PdfButtonWrapper .btn {\n    width: 100%;\n}\n\n#doc-side-scroll::-webkit-scrollbar, #page_container1::-webkit-scrollbar {\n    width: 6px;\n}\n\n#doc-side-scroll::-webkit-scrollbar-thumb, #page_container1::-webkit-scrollbar-thumb {\n    background: rgba(0, 0, 0, 0.2);\n}\n\n/*\n@media(min-width:548px){\n    #page_container1 {\n        height: calc(100vh - 306px);\n        text-align: center;\n        background: #f7f7f7;\n    }\n}\n@media(max-width:547px){\n    #page_container1 {\n        height: calc(100vh - 346px);\n\n    }\n}*/\n\n#nxxt_sign {\n    top: 5px;\n    display: none;\n    background: rgba(228, 21, 21, 0.9);\n    color: white;\n    position: absolute;\n    z-index: 2;\n    width: 140px;\n    padding: 10px;\n    cursor: pointer;\n    border-bottom-right-radius: 78px;\n    border-top-right-radius: 78px;\n}\n\n@media screen and (max-width: 600px) {\n    #nxxt_sign {\n        width: 90px!important;\n        height: 25px;\n        font-size: 0.8em;\n    }\n}\n\n.o_form_nosheet {\n    padding: 0!important;\n}\n\n.new_sign {\n    box-shadow: 0px 0px 3px 1px #A4498C;\n}\n\n.details_div {\n    display: flex;\n    padding: 5px;\n}\n\n.sign_ids {\n    height: 43px;\n}\n\n.sign_ids:hover {\n    height: auto;\n    overflow: auto;\n}\n\n.pending_signs {\n    width: 50%;\n}\n\n.o_control_panel > .breadcrumb > li {\n    display: none\n}\n\n.o_control_panel > .breadcrumb > li:last-child {\n    display: inline-block\n}\n\n.o_control_panel > .breadcrumb > li:first-child {\n    display: inline-block\n}\n\n.o_control_panel > .breadcrumb > li:nth-child(2) {\n    display: inline-block\n}\n\n.check_box_send_all{\n    display: none\n}\n\n/* .check_box_send_all, #doc-side-scroll{\n    display: none\n} */\n\n.o_cp_buttons, .o_cp_pager{\n    display:none !important;\n}\n\n.o_cp_left{\n    position: absolute;\n    right: 0;\n}\n\n.meetings_div{\n    color: #404040;\n    font-size: 12px;\n    border-top: 1px solid #E1E1E1;\n}\n\n.meetings_div strong{\n\tfont-weight: 500;\n\tpadding-bottom: 10px;\n}\n\n.doc-subtitle{\n\tfont-family: 'Roboto';\n\tfont-weight: 500;\n\tdisplay: block;\n\tmargin:7px 0px;\n}\n\n.doc-subtitle input{\n\tmargin-right:5px;\n\tposition: relative;\n    top: 2px;\n}\n\n.meetings_div select{\n    font-size: 16px;\n    width: 100%;\n    padding: 0px 15px;\n    border: 1px solid #A2A2A2;\n    border-radius: 5px;\n    height: 38px;\n    color: #6d6d6d;\n    cursor:pointer;\n}\n\n.PdfVerticalButtonWrapper{\n    display: block;\n}\n\n.fields-title{\n\tcolor:#404040;\n\tfont-size:20px;\n\tborder-bottom:1px solid #E1E1E1;\n\tmargin: 0 0 10px;\n\n}\n\n.PdfVerticalButtonWrapper .docselectbtn {\n    display: block;\n    font-size:16px;\n    color:#585757;\n    height: 30px;\n    line-height: 30px;\n    margin-bottom: 5px;\n    cursor:pointer;\n}\n\n.PdfVerticalButtonWrapper .docselectbtn i{\n    font-size: 15px;\n    display: inline-block;\n    width: 30px;\n    text-align: left;\n}\n\n.PdfVerticalButtonWrapper .docselectbtn:hover{\n\tcolor:#000000;\n}\n\n#save-doc-data {\n    width: 100%;\n    margin-top:10px;\n    text-transform: uppercase;\n}\n\n.docselectbtn{\n    cursor: pointer;\n}\n\n.doc-container #doc-side-scroll{\n    display: none;\n}\n\n.doc-container.admin #doc-side-scroll{\n    display: block;\n}\n\n.doc-container .docWrapperContainer{\n    width: 100%;\n}\n\n.doc-container.admin .docWrapperContainer{\n    width: 78%;\n}"

/***/ }),

/***/ "./src/components/esigndocs/esigndocs.component.html":
/*!***********************************************************!*\
  !*** ./src/components/esigndocs/esigndocs.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-breadcrumb  app=\"meetings\" model=\"signdocument\" \ncreate=\"1\"\nroutes='[{\"title\":\"Actions\", \"link\":\"/actions\"}]'\ntitle=\"e-Signature\"></app-breadcrumb>\n\n<div class=\"router-outlet\">\n        <div class=\"container\">\n                <div class=\"MainTitleHeadWrap\">\n                        <div class=\"HeadingWrap\">\n                            <img src=\"static/assets/images/meeting-icon.png\" alt=\"\" /> Esignature\n                        </div>\n                        <div class=\"MeetingBtnWrapper\">\n                            <div class=\"btn-group\">\n                                <a routerLink=\"/votings\" class=\"btn\">Resolutions</a>\n                                <a routerLink=\"/signdocs\" class=\"btn\">Esignature</a>\n                                <a routerLink=\"/surveys\" class=\"btn\">Surveys</a>\n                            </div>\n                        </div>\n                    </div>\n            </div>\n    <div class=\"cards container mt-4\">\n\t\t<div class=\"row docwrappercontainer\">\n\t\t\t<div class=\"col-sm-6 col-md-4 col-lg-2 mb-4\"  *ngFor=\"let doc of docs\">\n\t\t\t\t<a routerLink=\"/signdoc/{{doc.id}}\" class=\"\">\n\t\t\t\t\t<div class=\"DocumentWrapper\">\n\t\t\t\t\t\t<div class=\"DocIcon\">\n\t\t\t\t\t\t\t<span class=\"rounded-circle\">\n\t\t\t\t\t\t\t\t<i class=\"icon-doc-file\"></i>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"DocInfoVertical text-truncate\">\n\t\t\t\t\t\t\t{{doc.name}}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</a>\n\t\t\t</div>\n\t\t</div>\n    </div>\n    <div class=\"container\" *ngIf=\"!docs\">\n        <div class=\"row\">\n            <div class=\"col-lg-12 \">\n                <div class=\"jumbotron text-center\">\n                    <h1>There are no resources for now!</h1>\n                    <hr>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/components/esigndocs/esigndocs.component.ts":
/*!*********************************************************!*\
  !*** ./src/components/esigndocs/esigndocs.component.ts ***!
  \*********************************************************/
/*! exports provided: EsignDocsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EsignDocsComponent", function() { return EsignDocsComponent; });
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



var EsignDocsComponent = /** @class */ (function () {
    function EsignDocsComponent(httpService, router) {
        this.httpService = httpService;
        this.router = router;
        this.docs = [];
        this.get_data();
    }
    EsignDocsComponent.prototype.uploadClick = function () {
        console.log('yyyyyyyyyyyyyyyyyyyyy ');
        $('#esign_upload').click();
    };
    EsignDocsComponent.prototype.addFile = function (event) {
        var obj_this = this;
        var element = event.target;
        // console.log(element)
        var file = element.files[0];
        var fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = function () {
            console.log(fileReader);
            var final_input_data = {
                params: { name: file.name, file: fileReader.result },
                args: {
                    app: 'meetings',
                    model: 'SignDocument',
                    method: 'save_doc',
                    post: 1
                }
            };
            obj_this.httpService.post(final_input_data, function (result) {
                // obj_this.docs = result.records;
                obj_this.router.navigate(["/signdoc/" + result.id]);
            }, function (error) {
                //console.log(error);
            });
        };
        fileReader.onerror = function (error) {
            console.log('Error: ', error);
        };
    };
    EsignDocsComponent.prototype.get_data = function () {
        var obj_this = this;
        var args = {
            app: 'esign',
            model: 'SignatureDoc',
            method: 'get_records'
        };
        var final_input_data = {
            params: {},
            args: args
        };
        obj_this.httpService.get(final_input_data, function (result) {
            obj_this.docs = result.records;
            obj_this.httpService.count = result.count;
            obj_this.httpService.total_records = result.total;
        }, function (error) {
            //console.log(error);
            //alert(error);
        });
    };
    EsignDocsComponent.prototype.ngOnInit = function () {
        window['json_functions'].find_activate_link('.MeetingBtnWrapper');
    };
    EsignDocsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            styles: [__webpack_require__(/*! ./esigndocs.css */ "./src/components/esigndocs/esigndocs.css")],
            template: __webpack_require__(/*! ./esigndocs.component.html */ "./src/components/esigndocs/esigndocs.component.html")
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], EsignDocsComponent);
    return EsignDocsComponent;
}());



/***/ }),

/***/ "./src/components/esigndocs/esigndocs.css":
/*!************************************************!*\
  !*** ./src/components/esigndocs/esigndocs.css ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#esign_upload{\n    display: none;\n}"

/***/ }),

/***/ "./src/components/forgotpassword/forgotpassword.component.html":
/*!*********************************************************************!*\
  !*** ./src/components/forgotpassword/forgotpassword.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"router-outlet Login-form-wrapper\">\n    <link rel=\"stylesheet\" href=\"/static/assets/css/login.css\" />\n\t<div *ngIf=\"!sent\" class=\"login-form-div\">\n        <form>\n                <div class=\"form-group\">\n                        <input \n                            name=\"email\"\n                            id=\"username\"\n                            placeholder=\"Email\"\n                            type=\"email\"\n                            class=\"form-control\"\n                            [(ngModel)]=\"email\"\n                            (keyup)=\"email_validation()\"\n                            (blur)=\"email_validation()\"\n                            [ngClass]=\"{ 'is-invalid': !valid }\" />\n            \n                        <div *ngIf=\"!first && !valid\" class=\"invalid-feedback\">\n                            <div *ngIf=\"email == ''\">Email is required</div>\n                            <div *ngIf=\"email != ''\">Incorrect email</div>\n                        </div>\n                    </div>\n                    <div class=\"form-group text-left\">\n                        <button [disabled]=\"!valid\" class=\"login-btn\" (click)=\"onSubmit()\">Submit</button>\n                        <img *ngIf=\"loading\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\" />\n                        <a class=\"forgot\" routerLink=\"/login\">Back to login</a>\n                    </div>\n                    <div *ngIf=\"error\" class=\"alert alert-danger\">{{error}}</div>\n        </form>\n\t\t\n\t</div>\n</div>\n\n<div *ngIf=\"sent\" style=\"position: fixed;top: 20%;width: 100%;\" class=\"jumbotron\">\n\t<span>An email has been sent to <h3><b>{{email}}</b></h3><br>\n        Please check your email, Thanks!</span>\n        <a style=\"font-size: 14px;font-weight: bold;margin-left: 10px;\"\n        routerLink=\"/login\">Back to login</a>\t\n</div>\n"

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


var ForgotpasswordComponent = /** @class */ (function () {
    function ForgotpasswordComponent(httpService) {
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
                window['functions'].hideLoader('force');
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
        var success_cb = function (result) {
            obj_this.sent = true;
        };
        var failure_cb = function (error) {
            obj_this.error = error;
        };
        var args = {
            app: 'authsignup',
            model: 'AuthUser',
            method: 'reset_password'
        };
        var input_data = {
            params: { email: obj_this.email, },
            args: args,
        };
        this.httpService.post_public(input_data, success_cb, failure_cb);
    };
    ForgotpasswordComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-forgotpassword',
            template: __webpack_require__(/*! ./forgotpassword.component.html */ "./src/components/forgotpassword/forgotpassword.component.html")
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"]])
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

module.exports = "<div class=\"header-container\">\n    <div *ngIf=\"socketService.user_data\">        \n        <div class=\"header-fixed\">\n            <div class=\"main-nav-header\">\n                <a class=\"nav-icon-split app-sidebar__toggle\" data-toggle=\"sidebar\" \n                aria-label=\"Hide Sidebar\">\n                    <img src=\"static/assets/images/menu.png\" alt=\"\"></a>\n                <a routerLink=\"/\">\n                    <img class=\"logo\" src=\"static/assets/images/logo.svg\">\t\t\t\n                </a>\n            </div>\n            \n\t\t\t<div class=\"main-user-navbar\">\n\t\t\t\t<div class=\"automanage nav-icon\">\n                    <a  routerLink=\"/calendar\"><i class=\"icon-calendar\"></i></a>\n                </div>\n                <div class=\"searchheader-icon nav-icon\">\n                    <button id=\"search-btn\" (click)=\"search_results_visibility()\"><i class=\"icon-search\"></i></button>\n                </div>\n                <div class=\"nav-icon\" (click)=\"change_cursor()\">\n                    <span class=\"cursor_chooser\"><i class=\"icon-cursor\" id=\"cursor_chooser\"></i></span>\n                    <canvas id=\"cursor_canvas\" width=\"20\" height=\"20\" style=\"display:none\" ></canvas>\n                </div>\n                <div \n                    class=\"messageicon-container mobile-chatroom nav-icon dropdown\"                                \n                    data-placement=\"bottom\"\n                    (click)=\"show_messenger()\"\n                    >\n                    <button class=\"notification-icon\">\n                        <i class=\"icon-chat\"></i>\n                    </button>\n                    <span class=\"un-read-msg\" *ngIf=\"socketService.unseen_messages !=0 \">{{socketService.unseen_messages}}</span>\n                </div>\n                <!-- <div class=\"hidden\" id=\"messenger-icon-target\">\n                    <div>\n                        <span>Hun</span>\n                        <li (click)=\"show_messenger()\"></li>\n                    </div>                    \n                </div> -->\n\n                <app-chat></app-chat>\n                <div class=\"navbar-profile-menu dropdown\">\n                    <button class=\"profile-icon showmouseawaybutton\" (click)=\"show_profile_menu($event)\">\n                        <span class=\"header-user-name\">{{socketService.user_data.name}}</span>\n                        <img id=\"navbar-profile-img\" class=\"img-thumbnail-sm\" src=\"{{socketService.user_photo}}\">\n                    </button>\n                    <div class=\"profile-menu dropdown-menu hidemouseaway dropdown-menu-lg-right\">\n\t\t\t\t\t\t<div class=\"arrow\"></div>\n                        <a class=\"dropdown-item border-0\" routerLink=\"/my-profile\">\n                            <div class=\"drop-down-user\">\n                                <!-- <img class=\"img-thumbnail-sm\" src=\"{{socketService.user_photo}}\"> -->\n                                <h5>{{socketService.user_data.name}}</h5>\n                            </div>\n                        </a>\n\t\t\t\t\t\t<a class=\"dropdown-item\" routerLink=\"/my-profile\" href=\"\">Profile Settings</a>\n                        <a class=\"dropdown-item\" routerLink=\"/settings\">Change Password</a>\n                        <a class=\"dropdown-item\" routerLink=\"/support\">Support</a>\n                        <a id='logout_link' (click)=\"signout()\" class=\"dropdown-item\">Logout</a>\n                    </div>\n                </div>        \n            </div>\n            \n        </div>\n    \n        <div>\n            <div class=\"searchbar-full-width\" style=\"display: none;\">\n                <div class=\"lowerheader input-group\">\n                    <input id=\"search-box\" type=\"text\"\n                        pattern=\"[a-zA-Z ]*\"\n                        [(ngModel)]=\"search_key_word\"\n                        (focus)=\"on_search_focus()\"\n                        (keyup.enter)=\"search()\"\n                        placeholder=\"Search\"  aria-expanded=\"false\" class=\"form-control\" />\n    \n                    <div class=\"input-group-append\">\n                        <span class=\"input-group-text\">\n                            <input [(ngModel)]=\"is_content_search\" type=\"checkbox\" aria-label=\"Checkbox for following text input\">\n                            <span style=\"margin-left: 10px;\">In Files</span>\n                        </span>\n\n                        <span *ngIf=\"can_be_type_specific\" class=\"input-group-text\">\n                            <input (change)=\"search()\" [(ngModel)]=\"type_applied\" type=\"checkbox\" aria-label=\"Checkbox for following text input\">\n                            <span style=\"margin-left: 10px;\">in {{socketService.active_route_snapshot.data.model}}s only</span>\n                        </span>\n\n                        <span class=\"input-group-text\">\n                            <button (click)=\"search()\" class=\"btn btn-secondary\" type=\"button\">\n                                <i class=\"fa fa-search\"></i>\n                            </button>\n                        </span>\n                    </div>        \n                </div>\n                <div *ngIf=\"show_search_results && socketService.search_bar_shown\" class=\"show_search_results\">\n                <div *ngIf=\"no_search\" class=\"no-search\">\n                    <h1>No Result Found!</h1>\n                </div>\n                <div *ngIf=\"!no_search\" class=\"close-button\" (click)=\"hide_search()\">\n                    <i class=\"fa fa-times\"></i>\n                </div>\n                <div *ngIf=\"!no_search\" class=\"container\">\n                    <h3 *ngIf=\"is_content_search\" style=\"color: #696969\">Search Results Based on Content of Documents.</h3>\n                    <!-- <div *ngIf=\"!content_search\" class=\"row search-box-wrapper\">\n                        <div *ngIf=\"search_results.users.length\" class=\"col-sm\">\n                            <div class=\"result-box-info\">\n                                <h2>Moderators</h2>\n                                <h3 *ngFor=\"let item of search_results.users\">\n                                    <a (click)=\"show_search_results = false;\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                                </h3>\n                            </div>\n                        </div>\n                        <div *ngIf=\"search_results.meetings.length\" class=\"col-sm\">\n                            <div class=\"result-box-info\">\n                                <h2>Meetings</h2>\n                                <h3 *ngFor=\"let item of search_results.meetings\">\n                                    <a (click)=\"show_search_results = false;\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                                </h3>\n                            </div>\n                        </div>\n                        <div *ngIf=\"search_results.meeting_documents.length\" class=\"col-sm\">\n                            <div class=\"result-box-info\">\n                                <h2>Meeting Documents</h2>\n                                <h3 *ngFor=\"let item of search_results.meeting_documents\">\n                                    <a (click)=\"show_search_results = false;\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                                </h3>\n                            </div>\n                        </div>\n                        <div *ngIf=\"search_results.votings.length\" class=\"col-sm\">\n                            <div class=\"result-box-info\">\n                                <h2>Resolutions</h2>\n                                <h3 *ngFor=\"let item of search_results.votings\">\n                                    <a (click)=\"show_search_results = false;\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                                </h3>\n                            </div>\n                        </div>\n                        <div *ngIf=\"search_results.voting_documents.length\" class=\"col-sm\">\n                            <div class=\"result-box-info\">\n                                <h2>Resolution Documents</h2>\n                                <h3 *ngFor=\"let item of search_results.voting_documents\">\n                                    <a (click)=\"show_search_results = false;\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                                </h3>\n                            </div>\n                        </div>\n                        <div *ngIf=\"search_results.surveys.length\" class=\"col-sm\">\n                            <div class=\"result-box-info\">\n                                <h2>Surveys</h2>\n                                <h3 *ngFor=\"let item of search_results.surveys\">\n                                    <a (click)=\"show_search_results = false;\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                                </h3>\n                            </div>\n                        </div>\n                        <div *ngIf=\"search_results.committees.length\" class=\"col-sm\">\n                            <div class=\"result-box-info\">\n                                <h2>Committees</h2>\n                                <h3 *ngFor=\"let item of search_results.committees\">\n                                    <a (click)=\"show_search_results = false;\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                                </h3>\n                            </div>\n                        </div>\n                        <div *ngIf=\"search_results.resources.length\" class=\"col-sm\">\n                            <div class=\"result-box-info\">\n                                <h2>Resources</h2>\n                                <h3 *ngFor=\"let item of search_results.resources\">\n                                    <a (click)=\"show_search_results = false;\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                                </h3>\n                            </div>\n                        </div>\n                        <div *ngIf=\"search_results.resource_documents.length\" class=\"col-sm\">\n                            <div class=\"result-box-info\">\n                                <h2>Resource Documents</h2>\n                                <h3 *ngFor=\"let item of search_results.resource_documents\">\n                                    <a (click)=\"show_search_results = false;\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                                </h3>\n                            </div>\n                        </div>\n                        <div *ngIf=\"search_results.topics.length\" class=\"col-sm\">\n                            <div class=\"result-box-info\">\n                                <h2>Topics</h2>\n                                <h3 *ngFor=\"let item of search_results.topics\">\n                                    <a (click)=\"show_search_results = false;\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                                </h3>\n                            </div>\n                        </div>\n                        <div *ngIf=\"search_results.topic_documents.length\" class=\"col-sm\">\n                            <div class=\"result-box-info\">\n                                <h2>Topic Documents</h2>\n                                <h3 *ngFor=\"let item of search_results.topic_documents\">\n                                    <a (click)=\"show_search_results = false;\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                                </h3>\n                            </div>\n                        </div>\n                        <div *ngIf=\"search_results.documents.length\" class=\"col-sm\">\n                            <div class=\"result-box-info\">\n                                <h2>Documents</h2>\n                                <h3 *ngFor=\"let item of search_results.documents\">\n                                    <a (click)=\"show_search_results = false;\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                                </h3>\n                            </div>\n                        </div>\n                    </div> -->\n                    <div *ngIf=\"content_search\" class=\"row content_search\">\n                            <!-- <div class=\"close-button\" (click)=\"hide_search()\">\n                             <i class=\"fa fa-times\"></i>\n                            </div> -->\n                                    \n                        <div *ngFor=\"let doc_type of doc_types\">\n                            <div *ngIf=\"content_search_results[doc_type].length > 0\" class=\"col-sm\">\n                                <div class=\"result-box-info\">\n                                    <h2>{{doc_type | titlecase}} Documents</h2>\n                                    <h3 *ngFor=\"let item of content_search_results[doc_type]\">\n                                        <a (click)=\"hide_search()\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                                    </h3>\n                                </div>\n                            </div>\n                        </div>                        \n                    </div>\n                    <div *ngIf=\"search_results\" class=\"row\">\n                        <div class=\"col-lg-12\">\n                            <div class=\"row content_search\" *ngFor=\"let item_type of search_item_types\">\n                                <div *ngIf=\"search_results[item_type].length > 0\" class=\"col-sm-12\">\n                                    <h2 class=\"search-result-title\">{{item_type}} ({{search_results[item_type].length}})</h2>\n                                    <div class=\"result-box-info d-flex flex-wrap\">\n                                       \n                                        <h3 *ngFor=\"let item of search_results[item_type]\">\n                                            <a (click)=\"hide_search()\" routerLink=\"{{item.route}}\">{{item.name}}</a>\n                                        </h3>\n                                    </div>\n                                </div>\n                            </div>  \n                        </div>              \n                    </div>\n                </div>\n            </div>\n            </div>\n\n            \n        </div>\n    </div>\n</div>\n"

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
        this.router = router;
        this.sserv = sserv;
        this.route = route;
        this.httpService = httpService;
        this.search_bar = false;
        this.show_search_results = false;
        this.is_content_search = false;
        this.content_search = false;
        this.search_key_word = '';
        this.global_search = true;
        this.search_active = false;
        this.search_results = {};
        this.search_item_types = [];
        this.no_search = false;
        this.results_visibility = false;
        this.current_model = '';
        this.can_be_type_specific = false;
        this.type_applied = false;
        this.route_map = {
            'meetings.Event': '/meeting/',
            'meetings.Topic': '/topic/',
            'resources.Folder': '/resource/',
            'meetings.Committee': '/committees/',
            'survey.Survey': '/survey/',
            'meetings.NewsDocument': '/home/doc/',
            'meetings.Profile': '/profile/',
            'voting.Voting': '/voting/',
            'voting.VotingDocument': 'voting/doc/',
            'meetings.MeetingDocument': '/meeting/doc/',
            'resources.ResourceDocument': '/resource/doc/',
            'meetings.SignDocument': '/signdoc/',
            'meetings.AgendaDocument': '/topic/doc/',
        };
        this.doc_types = [];
        this.content_search_results = undefined;
        this.admin_url = '';
        this.socketService = sserv;
    }
    HeaderComponent.prototype.on_search_focus = function () {
        var obj_this = this;
        if (obj_this.socketService.active_route_snapshot.data.model) {
            obj_this.can_be_type_specific = true;
        }
        else {
            obj_this.can_be_type_specific = false;
            obj_this.type_applied = false;
        }
    };
    HeaderComponent.prototype.settingDocRoute = function (file_type) {
        var file_route = '';
        switch (file_type) {
            case 'meeting':
                file_route = '/meeting/doc/';
                break;
            case 'topic':
                file_route = '/topic/doc/';
                break;
            case 'voting':
                file_route = '/voting/doc/';
                break;
            case 'home':
                file_route = '/home/doc/';
                break;
            case 'signature':
                file_route = '/signature/doc/';
                break;
            case 'resource':
                file_route = '/resource/doc/';
                break;
        }
        return file_route;
    };
    HeaderComponent.prototype.search = function () {
        var obj_this = this;
        obj_this.content_search = obj_this.is_content_search;
        var url = window.location + '';
        obj_this.search_key_word = obj_this.search_key_word.replace(/[^a-zA-Z0-9 ]/g, '');
        if (obj_this.search_key_word.length < 1) {
            return;
        }
        else {
            var success_cb = function (result) {
                // $('.searchbar-full-width').hide();
                if (obj_this.content_search) {
                    obj_this.doc_types = [];
                    obj_this.content_search_results = {};
                    result.forEach(function (item) {
                        var file_route = obj_this.settingDocRoute(item.file_type);
                        item['route'] = file_route + item.id + '/' + obj_this.search_key_word;
                        if (obj_this.content_search_results[item.file_type]) {
                            obj_this.content_search_results[item.file_type].push(item);
                        }
                        else {
                            obj_this.doc_types.push(item.file_type);
                            obj_this.content_search_results[item.file_type] = [item];
                        }
                    });
                    // console.log(obj_this.content_search_results, obj_this.doc_types);
                }
                else {
                    obj_this.search_item_types = [];
                    obj_this.search_results = {};
                    result.forEach(function (item) {
                        item['route'] = obj_this.route_map[item.model];
                        if (item.model != 'meetings.News') {
                            item['route'] += item.id;
                        }
                        var item_type = item.model.split('.')[1] + 's';
                        if (item_type == 'Profiles') {
                            if (!item.name) {
                                if (item.first_name) {
                                    if (item.last_name) {
                                        item.name = item.first_name + ' ' + item.last_name;
                                    }
                                }
                                if (!item.last_name) {
                                    if (item.last_name) {
                                        item.name = item.last_name;
                                    }
                                }
                                if (!item.first_name && !item.last_name) {
                                    item.name = item.username;
                                }
                            }
                        }
                        if (obj_this.search_results[item_type]) {
                            obj_this.search_results[item_type].push(item);
                        }
                        else {
                            obj_this.search_item_types.push(item_type);
                            obj_this.search_results[item_type] = [item];
                        }
                    });
                    // console.log(obj_this.search_results, obj_this.search_item_types);
                }
                if (result.length < 1) {
                    obj_this.no_search = true;
                }
                else {
                    obj_this.no_search = false;
                }
                obj_this.show_search_results = true;
            };
            var failure_cb = function (error) {
            };
            var req_url = '/meeting_point/search-json';
            this.content_search ? req_url = '/meeting_point/search-docs' : null;
            var search_models = {};
            if (obj_this.type_applied) {
                var search_data = obj_this.socketService.active_route_snapshot.data;
                if (search_data.search_models) {
                    search_models = search_data.search_models;
                }
                else if (search_data.model) {
                    search_models[search_data.app] = [search_data.model];
                }
            }
            var input_data = {
                kw: obj_this.search_key_word,
                is_content_search: obj_this.is_content_search,
                search_models: search_models
            };
            var args = {
                app: 'meetings',
                model: 'Abstract',
                method: 'search'
            };
            if (obj_this.content_search) {
                args.method = 'search_contents';
            }
            var final_input_data = {
                args: args,
                params: input_data,
            };
            this.httpService.search(final_input_data, success_cb, failure_cb);
        }
    };
    HeaderComponent.prototype.signout = function () {
        var obj_this = this;
        window['functions'].go_to_login();
    };
    HeaderComponent.prototype.change_cursor = function () {
        //console.log(322);
        window['functions'].change_cursor();
    };
    HeaderComponent.prototype.show_profile_menu = function (e) {
        var togglerelated = window['functions'].togglerelated;
        togglerelated('.profile-menu.dropdown-menu');
    };
    HeaderComponent.prototype.search_results_visibility = function () {
        var obj_this = this;
        $('.searchbar-full-width').show();
        if (!obj_this.socketService.search_bar_shown) {
            $(".searchbar-full-width").show().find("input:first").focus();
            obj_this.socketService.search_bar_shown = true;
        }
        else {
            $(".searchbar-full-width")
                .hide();
            obj_this.socketService.search_bar_shown = false;
        }
        if (obj_this.search_results) {
            obj_this.show_search_results = true;
        }
    };
    HeaderComponent.prototype.hide_search = function () {
        var obj_this = this;
        obj_this.show_search_results = false;
        $(".searchbar-full-width").hide();
        obj_this.socketService.search_bar_shown = false;
    };
    HeaderComponent.prototype.show_messenger = function () {
        if ($('.messenger-container').length == 1) {
            $('.popup.messenger').show();
        }
    };
    HeaderComponent.prototype.ngOnInit = function () {
        // setTimeout(function(){
        //     $('.messageicon-container').popover({
        //         html:true,
        //         content: function() {
        //             // var content = $(this).attr("content");
        //             // console.log($(content)[0]);                    
        //             // return content; // $(content)[0].outerHTML;
        //             return $('#messenger-icon-target').html();
        //         }
        //     });
        // }, 200);
    };
    HeaderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-header',
            styles: [__webpack_require__(/*! ./header.css */ "./src/components/header/header.css")],
            template: __webpack_require__(/*! ./header.component.html */ "./src/components/header/header.component.html")
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _app_socket_service__WEBPACK_IMPORTED_MODULE_2__["SocketService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"]])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/components/header/header.css":
/*!******************************************!*\
  !*** ./src/components/header/header.css ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".header-container\n{\n    border-bottom: 1px solid gainsboro;\n}\n\n\n@media (max-width: 575px) {\n    button.showmouseawaybutton.notification-icon{\n        font-size: 10px;\n        width: 26px;\n        height: 26px;\n        margin: 0 3px;\n    }\n}"

/***/ }),

/***/ "./src/components/home/home.component.html":
/*!*************************************************!*\
  !*** ./src/components/home/home.component.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-breadcrumb title=\"Home\" edit=\"1\" app=\"meetings\" model=\"news\" rid=\"1\">        \n</app-breadcrumb>\n<div class=\"router-outlet home-container\" *ngIf=\"ng_init\">    \n    <div class=\"container\">\n\t\t<div class=\"todoitembtn\">\n\t\t\t<button *ngIf=\"home_data && to_do_count\" (click)=\"scroll_to_do()\">Todo Items: {{to_do_count}}</button>\n\t\t</div>\n\t</div>\n    <div id=\"welcome\" *ngIf=\"home_data\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-md-8 WelcomeContent\">\n                <h4 class=\"HomeTitle\">\n                    <span>{{home_data.news.name}}</span>\n                </h4>\n                <div class=\"HomePageDiscription\">\n                    <div *ngIf=\"home_data.description\" class=\"HomePageContentText\">\n                        <div class=\"HomePageContentImg\">                        \n                            <img width=\"100%\" src=\"{{socketService.server_url}}{{home_data.news.photo}}\">\n                        </div>\n                        <div id=\"home-content\" [innerHtml]=\"home_data.description\"></div>\n                    </div>\n                </div>\n                </div>\n                <div class=\"col-md-4\">\n                    <div class=\"HomeCalendarHead\">\n                        Calendar                        \n                    </div>\n                    <div class=\"home-calendarwrapper\">\n                        <div class=\"home-calendar\">\n                            <div class=\"month\">\n                                <ul>\n                                    <li class=\"prev\">&#10094;</li>\n                                    <li class=\"next\">&#10095;</li>\n                                    <li>\n                                    August<br>\n                                    <span style=\"font-size:18px\">2017</span>\n                                    </li>\n                                </ul>\n                            </div>\n                            <ul class=\"weekdays\">\n                                <li>Mo</li>\n                                <li>Tu</li>\n                                <li>We</li>\n                                <li>Th</li>\n                                <li>Fr</li>\n                                <li>Sa</li>\n                                <li>Su</li>\n                            </ul>\n                            <ul class=\"days\">\n                                <li>1</li>\n                                <li>2</li>\n                                <li>3</li>\n                                <li>4</li>\n                                <li>5</li>\n                                <li>6</li>\n                                <li>7</li>\n                                <li>8</li>\n                                <li>9</li>\n                                <li><span class=\"active\">10</span></li>\n                                <li>11</li>\n                                <li>12</li>\n                                <li>13</li>\n                                <li>14</li>\n                                <li>15</li>\n                                <li>16</li>\n                                <li>17</li>\n                                <li>18</li>\n                                <li>19</li>\n                                <li>20</li>\n                                <li>21</li>\n                                <li>22</li>\n                                <li>23</li>\n                                <li>24</li>\n                                <li>25</li>\n                                <li>26</li>\n                                <li>27</li>\n                                <li>28</li>\n                                <li>29</li>\n                                <li>30</li>\n                                <li>31</li>\n                            </ul>\n                        </div>\n                        <div class=\"full-calendar-btn\">\n                            <a routerLink=\"/calendar\">Full Calendar</a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <section *ngIf=\"home_data.doc_ids && home_data.doc_ids.length\" class=\"HomepageDocumentSection\">\n            <div class=\"container\">\n                <div class=\"row\">\n                <div class=\"col-sm-12\">\n                    <div class=\"main-heading\">\n\t\t\t\t\t\t<h1>\n                        \tDocuments\n                    \t</h1>\n\t\t\t\t\t</div>\n                </div>\n                <div class=\"col-sm-12\">\n                    <div class=\"row docwrappercontainer\">\n                        <a class=\"col-sm-6 col-md-4 col-lg-2\" routerLink=\"/home/doc/{{doc.id}}\" *ngFor=\"let doc of home_data.doc_ids\">\n                            <div class=\"DocumentWrapper\">\n\t\t\t\t\t\t\t\t<div class=\"DocIcon\">\n\t\t\t\t\t\t\t\t\t<span class=\"rounded-circle\">\n\t\t\t\t\t\t\t\t\t\t<i class=\"icon-doc-file\"></i>\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"DocInfoVertical text-truncate\">\n\t\t\t\t\t\t\t\t\t{{doc.name}}\n                           \t\t </div>\n                            </div>\n                        </a>\n                    </div>\n                </div>\n                </div>\n            </div>        \n            <div *ngIf=\"home_data.video_ids && home_data.video_ids.length\" class=\"container\">\n                <div class=\"row\">\n                    <div class=\"col-sm-12\">\n                    <div class=\"main-heading\">\n                            <h1>\n                                Videos\n                            </h1>\n                        </div>\n                    </div>\n                    <div class=\"col-sm-12\">\n                    <div class=\"row\">\n                        <div class=\"video thumbnail col-sm-6 col-md-4 col-lg-3\" *ngFor=\"let video of home_data.video_ids\">\n                            <h5 class=\"docname\">{{video.name}}</h5>\n                            <iframe class=\"docThumbnail\" frameborder=\"0\" [src]=\"video.url\"></iframe>\n                            <div class=\"videoOverLayWrapper\" (click)=\"view_video(video.name, video.original_url)\"></div>\n                        </div>\n                    </div>\n                    </div>\n                </div>\n            </div>            \n        </section>\n        <div id=\"to-do\">\n            <div *ngIf=\"home_data.to_do_items.pending_meetings && home_data.to_do_items.pending_meetings.length>0\" class=\"\">\n                <div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col-lg-12\">\n                            <div class=\"main-heading\">\n                                <h1>\n                                    Upcoming Meetings\n                                </h1>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4\" *ngFor=\"let meeting_object of home_data.to_do_items.pending_meetings\">\n                            <div class=\"kanban-card kanban-meeting-info\">\n                                <a class=\"kanban-upcoming-meeting\" routerLink=\"/meeting/{{meeting_object.id}}\">\n                                    <div class=\"CalendarDateWrapper\">\n                                        <span *ngIf=\"meeting_object.start\" class=\"CalendarDateWrap\">\n                                            <span class=\"kanban-upcoming-meeting-date\">\n                                                {{meeting_object.start_dt.day}}\n                                            </span>\n                                            <span>\n                                                {{meeting_object.start_dt.month_year}}\n                                            </span>\n                                            <span>\n                                                {{meeting_object.start_dt.time}}\n                                            </span>\n                                        </span>\n                                    </div>\n                                    <div class=\"Info\">\n                                        <p *ngIf=\"meeting_object.name\">\n                                            <b>{{meeting_object.name}}</b>\n                                        </p>\n                                        <span *ngIf=\"meeting_object.location\">{{meeting_object.location}}</span>\n                                    </div>\n                                </a>\n                                <app-meetingresponse meeting_id=\"{{meeting_object.id}}\" attendee_status=\"{{meeting_object.attendee_status}}\" ></app-meetingresponse>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n            <!--Surveys-->\n            <div *ngIf=\"home_data.to_do_items.pending_surveys && home_data.to_do_items.pending_surveys.length\" class=\"\">\n                <div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col-lg-12\">\n                            <div class=\" modal-header\">\n                                Surveys\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"kanban-card survey\" *ngFor=\"let sur of home_data.to_do_items.pending_surveys\">\n                            <div class=\"SurveysInfoBox\">\n                                <div class=\"SurveysInfoBoxTitle\">\n                                    <h5>\n                                        <b>{{sur.title}}</b>\n                                        <span *ngIf=\"sur.meeting_name\"> Meeting: {{sur.meeting_name}}</span>\n                                    </h5>\n                                </div>\n                                <div class=\"SurveysInfoBoxBtn  btn-flex-1\">\n                                    <button class=\"btn btn-meeting\" routerLink=\"/home/survey/{{sur.id}}\">\n                                    <span>Start</span>\n                                    </button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <!--Votings-->\n            <div *ngIf=\"home_data.to_do_items.pending_votings && home_data.to_do_items.pending_votings.length\" class=\"\">\n                <div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col-sm-12\">\n                            <div class=\"main-heading\">\n                                <h1>\n                                    Approval/Voting\n                                </h1>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-sm-6 col-md-4 mb-4\" *ngFor=\"let vote of home_data.to_do_items.pending_votings\">\n                            <div class=\"kanban-card voting\">\n                                <div class=\"VotingsInfoBox\">\n                                    <div class=\"VotingsInfoBoxTitle \">\n                                        <h5>\n                                            <b>{{vote.name}}</b>\n                                            <span *ngIf=\"vote.meeting_name\"> Meeting: {{vote.meeting_name}}</span>\n                                            <div><strong>Voting Type :</strong><span style=\"display:inline-block;\">{{vote.voting_type_name}}</span></div>\n                                        </h5>\n                                    </div>\n                                    <div class=\"bs-btnwrap\">\n                                        <button class=\"btn\" routerLink=\"/voting/{{vote.id}}\">\n                                        <span>Cast Vote</span>\n                                        </button>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <!--Documents-->\n            <div *ngIf=\"home_data.to_do_items.pending_documents && home_data.to_do_items.pending_documents.length\" class=\"DocumentsSignWrapper\">\n                <div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col-lg-12\">\n                            <div class=\" modal-header\">\n                                Documents To Sign\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"kanban-card\" *ngFor=\"let doc of home_data.to_do_items.pending_documents\">\n                            <a class=\"DocumentWrapper gray-bg\" routerLink=\"/signdoc/{{doc.id}}\">\n                                <div class=\"DocIcon\">\n                                    <span class=\"rounded-circle\">\n                                        <i class=\"icon-doc-file\"></i>\n                                    </span>\n                                </div>\n                                <div class=\"DocText\">\n                                    <div class=\"DocName\">\n                                        <h5>Title: {{doc.name}}</h5>\n                                    </div>\n                                    <div class=\"DocMeeting\">\n                                        Meeting: {{doc.meeting__name}}\n                                    </div>\n                                    <div class=\"SignatureText font-11\">\n                                        <span>My Signature: </span>\n                                        <span class=\"pending-status\">{{doc.mp_signature_status}}</span>\n                                    </div>\n                                </div>\n                            </a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div *ngIf=\"!to_do_count\">\n\n                <div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col-lg-12\">\n                            <h1 class=\"res-message\">Congratulations!<br>You have no task pending :)</h1>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\t</div>\n    <div class=\"modal fade video\" id=\"videoModal\" role=\"dialog\" aria-hidden=\"true\">\n        <div class=\"modal-dialog modal-lg modal-dialog-centered\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <span class=\"title\"></span>\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">×</span></button>\n                </div>\n                <div class=\"modal-body\">\n                    <div class=\"embed-responsive embed-responsive-16by9\">\n                    </div>\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n"

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
        this.date = Date.now();
        this.ng_init = false;
        $('#collapsibleNavbar').children().eq(0).addClass('active');
    }
    HomeComponent.prototype.navigate_meeting = function () {
        var obj_this = this;
        var id = document.getElementsByClassName('go_details')[0].id;
        obj_this.router.navigate(['/upcoming/meeting/' + id]);
    };
    HomeComponent.prototype.scroll_to_do = function () {
        if (!this.home_data) {
            return;
        }
        $('.router-outlet').animate({
            scrollTop: $('#to-do').position().top - 20
        }, 500);
    };
    HomeComponent.prototype.get_home_data = function () {
        var obj_this = this;
        var success_cb = function (home_data) {
            if (!home_data['to_do_items']) {
                console.log("invalid data", home_data);
                return;
            }
            // console.log(home_data);
            var result = home_data.to_do_items.pending_meetings;
            for (var i in result) {
                var start = result[i]['start'];
                start = window['functions'].meeting_time(start);
                result[i]['start_dt'] = start;
            }
            home_data.description = obj_this.sanitizer.bypassSecurityTrustHtml(home_data.news.description);
            var valid_videos = [];
            home_data.video_ids.forEach(function (element) {
                element.original_url = element.url;
                if (element.url.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
                    element.url = obj_this.sanitizer.bypassSecurityTrustResourceUrl(element.url);
                    valid_videos.push(element);
                }
                else {
                    console.log(element.url + ' is not a valid url for video ' + element.name);
                }
            });
            obj_this.home_data = home_data;
            home_data.video_ids = valid_videos;
            var to_do_items = home_data.to_do_items;
            obj_this.to_do_count = to_do_items.pending_documents.length + to_do_items.pending_meetings.length + to_do_items.pending_surveys.length + to_do_items.pending_votings.length;
        };
        var args = {
            app: 'meetings',
            model: 'News',
            method: 'get_data'
        };
        var input_data = {
            params: {},
            args: args
        };
        obj_this.httpService.get(input_data, success_cb, null);
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
            styles: [__webpack_require__(/*! ./home.css */ "./src/components/home/home.css")],
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

/***/ "./src/components/home/home.css":
/*!**************************************!*\
  !*** ./src/components/home/home.css ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*Homepage TabBar setting*/\n.home{\n\tbackground:#f1f4f2;\n    padding:0 10%;\n    padding:0;\n    position:relative;\t\n    margin-top: -20px;\n}\n.home #collapsibleNavbar .active{\n    background:#ffffff;\n  }\n.home div#collapsibleNavbar {\n    justify-content: center;\n    display:flex;\n}\n.home div#collapsibleNavbar button{\n    background: none;\n\tcolor:#777a7e;\n\tborder:none;\n\tflex-grow: 1;\n\tfont-size:18px;\n\t\n\tfont-weight:500;\n\tpadding:20px 0;\n\tposition:relative;\n}\n.HomePageDiscription{\n    display:flex;\n    justify-content: space-between;\n}\n#calenderModal\n{\n    min-height: calc(100vh - 5px);\n}\n.HomepageDocumentSection{\n    margin-bottom:1rem;\n}\n.WelcomeContent{\n    padding-bottom:30px;\n    flex:1 1 auto;\n}\n.WelcomeContent h4.HomeTitle{\n    margin-bottom:20px;\n}\n.WelcomeContent h4.HomeTitle span{\n    position:relative;\n}\n.WelcomeContent h4.HomeTitle span:before{\n    border-top:1px solid #dddddd;\n    content:\"\";\n    position:absolute;\n    bottom:-7px;\n    left:0px;\n    width:100%;\n}\n.HomePageContentText{\n  width: 100%;\n  text-align: justify;\n}\n.HomePageContentImg {\n    margin: 0px 20px 20px 0px;\n    flex-basis: 300px;\n    max-width: 300px;\n    float: left;\n}\n.HomePageContentImg img{\n\tmax-width:100%;\n\t}\n.fc-more-cell{\n\tbackground: darkgreen;\n\tcolor: white;\n\tborder-radius: 5px;\n}\n@media (max-width: 767px) { \n\n   .HomePageContentImg {\n        margin: 0px 0px 20px 0px;\n        flex-basis: 100%;\n        width: 100%;\n        float: none;\n    }\n\n    .HomePageContentText {\n        width: 100%;    \n    }\n    \n}\n#collapsibleNavbar>button::before\n{\n    width:1px;\n\theight:50%;\n\tbackground:#d8dce0;\n\tcontent:\"\";\n\tposition:absolute;\n    top:25%;\n    left:0px;\n}\n#collapsibleNavbar button:nth-child(3)::after{\t\n\tleft:0px;\n}\n#collapsibleNavbar button i{\n\tdisplay:block;\n\tfont-size:26px;\n\tmargin-bottom:5px;\n\t}\n#collapsibleNavbar button:focus {\n    outline: 0px dotted;\n    outline: 0px auto -webkit-focus-ring-color;\n}\n#collapsibleNavbar button.active\n{\n    background:white;\n}\nbtn.active{\n  background-color: #7c7bad;\n  color: white;\n  border-color: #7c7bad;\n}\n@-webkit-keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n@keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n@-webkit-keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n@keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n@-webkit-keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n@keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n@-webkit-keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n@keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n#to-do .modal-header {\n    margin:25px 0;\n    padding: 10px 0;\n    font-size: 20px;\n    font-weight: 500;\n}\n.ToDoDocumentsItem{\n   padding-top:25px;\n}\n.light-blue-bg{\n   background: #f2f6fb !important;\n}\n.DocToDoText{\n    color:#313030;\n\tfont-size:13px;\n\tfont-weight:600;\n\ttext-transform:capitalize;\n\t\n}\n.font-11{\n    font-size:11px;\n}\n.SignatureText{\nfont-weight:500;\n\n}\n.pending-status{\n     color:#db4437;\n}\n.DocName h5 {\n    font-size: 14px;\n    margin: 5px 0;\n    padding: 0;\n    font-weight: 700;\n}\n.DocMeetingDetails{\n    color:#66676f;\n    font-size:11px;\n    font-weight:400;\n}\n.SurveysInfoBoxTitle{\n    padding: 12px;\n}\n.SurveysInfoBox {\n    background: #F3F3F3;\n    min-height: 110px;\n}\n.SurveysInfoBoxTitle h5 b{\n    font-weight: 700;\n    line-height: 1.3;\n    color: #515365;\n}\n.SurveysInfoBoxBtn{\n    border-top: 1px solid #E9E9E9;\n    padding: 12px;\n    text-align: center;\n}\n.VotingsInfoBoxTitle h5 b{\n    font-weight: 700;\n    line-height: 1.3;\n    color: #515365;\n}\n.VotingsInfoBoxTitle h5 span{\n  display:block;\n  font-weight:400;\n  font-size:13px;\n}\n.SurveysInfoBoxTitle h5 span{\n  display:block;\n  font-weight:400;\n  font-size:13px;\n}\n.gray-bg{\n    background: #f3f3f3\n}\n.FormWrapper {\n    padding: 2%;\n    border-left: 5px solid #7c7bad;\n    background: #f3f3f3;\n}\n.FormWrapper textarea.form-control{\n    margin-bottom: 20px;\n    min-height: 150px;\n    resize: none;\n}\n.FormWrapper .form-control{\n    margin-bottom: 20px;\n}\n.cancelbtn, .signupbtn{\n    min-width: 130px;\n    font-size: 0.859em;\n    margin-right: 5px;\n}\n.home-survey-title .title{\n    font-size: 1.500em;\n    margin-bottom: 15px;\n}\na.fc-more{\n    background-color: blue !important;\n    color: white !important;\n}\n.to-do-alram\n{\n    position: relative;\n}\n.to-do-alram i{\n    width: 30px;\n    margin: 0 auto;\n    position: relative;\n}\nspan.to-do-count {\n    background: #dc3545;\n    color: white;\n    border-radius: 20px;\n    padding: 3px 6px 2px;\n    font-weight: bold;\n    font-size: 12px;\n    position: absolute;\n    top: -6px;\n    right: -11px;\n    border: 2px solid #ffffff;\n}\n.event-card label\n{\n    margin-bottom: 0;\n    font-weight: bold;\n}\n.event-card td {\n    padding-bottom: 10px;\n    padding-right: 20px;\n    font-size: 0.85rem;\n}\n.kanban-card.survey\n{\n    width: 240px;\n}\n.CalendarDateWrapper {\n    white-space: nowrap;\n    width: 90px;\n}\n.kanban-meeting-head p {\n    color: #4D4F5C;\n    padding: 0;\n    font-size: 16px;\n    margin: 0 0 5px;\n}\n@media (max-width: 575px) {\n\n\n.home div#collapsibleNavbar button {\n    font-size: 13px;\n    font-weight: 500;\n    padding: 10px 0;\n}\n\n.home div#collapsibleNavbar button i {\n    display: block;\n    font-size: 15px;\n}\n\nspan.to-do-count{\n    right: -6px;\n    font-size: 9px;\n    top: -8px;\n    padding:3px 5px 2px;\n}\n\n}\n@media (min-width: 576px) and (max-width: 767px) {\n    \n}\n.video.thumbnail\n{\n    position: relative;\n}\n.docThumbnail\n{\n    width: 100%;\n}\n.videoOverLayWrapper\n{\n    position: absolute;\n    top:0;\n    left: 0;\n    width: 100%;\n    height: 160px;\n    z-index: 3;\n    cursor: pointer;\n}\n/*\n#videoModal .modal-content{\n    height: 88vh;\n    width: 89vw;\n    left: -15vw;\n    top: 4vh;\n}\n\n#videoModal iframe\n{\n    height: 70vh;\n    width: 85vw;\n}*/\n#event-summary tr\n{\n    display: none;\n}\n.home-about{\n    margin-top:20px; \n}\n.homeabout-info{\n    background: #e6e6ea;\n    padding: 20px;\n    border-radius: 10px;\n}\n.homeabout-info p{\n    color: #757575;\n}\n.HomeCalendarHead{\n    font-size: 30px;\n    display: flex;\n    align-items: center;\n    margin-bottom:25px;\n    color: #2B2B2B; \n}\n.HomeCalendarHead img{\n    margin-right: 10px;\n}\n.home-calendarwrapper{\n    background: #F3F3F3;\n    padding: 25px;\n}\n.full-calendar-btn{\n    text-align: center;\n    padding: 25px 0 0;\n}\n.full-calendar-btn a{\n    display: inline-block;\n    padding: 10px 25px;\n    background: #4B74B5;\n    color: #ffffff;\n    border-radius: 25px;\n    font-size: 15px;\n    font-weight: 700;\n}\n.full-calendar-btn a:hover{\n    background: #2458AB;\n}\nul {list-style-type: none;}\n.month {\n  padding: 20px 25px;\n  width: 100%;\n  background: #E9E9F0;\n  text-align: center;\n}\n.month ul {\n  margin: 0;\n  padding: 0;\n}\n.month ul li {\n  color: #A3A6B4;\n  font-size: 20px;\n  text-transform: uppercase;\n  letter-spacing: 3px;\n}\n.month .prev {\n  float: left;\n  padding-top: 10px;\n}\n.month .next {\n  float: right;\n  padding-top: 10px;\n}\n.weekdays {\n  margin: 0;\n  padding: 10px 0;\n  background-color: #ddd;\n}\n.weekdays li {\n  display: inline-block;\n  width: 13.6%;\n  color: #666;\n  text-align: center;\n}\n.days {\n  padding: 10px 0;\n  background: #eee;\n  margin: 0;\n}\n.days li {\n  list-style-type: none;\n  display: inline-block;\n  width: 13.6%;\n  text-align: center;\n  margin-bottom: 5px;\n  font-size:12px;\n  color: #777;\n}\n.days li .active {\n  padding: 5px;\n  background: #1abc9c;\n  color: white !important\n}\n.todoitembtn{\n\tposition: relative;\n}\n.todoitembtn:before{\n\tdisplay: block;\n    content: \"\";\n    position: absolute;\n    top: 50%;\n    height: 1px;\n    left: 0;\n    right: 0;\n    background: #dddddd;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%);\n}\n.todoitembtn button{\n\twebkit-box-align: center;\n    align-items: center;\n    background-color: #638FC9;\n    bottom: 0;\n    color: #ffffff;\n    cursor: pointer;\n    display: flex;\n    font-size: 15px;\n    font-weight: 400;\n    justify-content: center;\n    padding: 7px 25px;\n    transition: background-color .1s linear,color .1s linear!important;\n    border: 0 solid;\n    flex: 0 auto;\n    margin: 15px auto;\n    border-radius: 20px;\n    position:relative;\n}\n.todoitembtn button:hover{\n\tbackground-color: #4b74b5;\n}\n/* Add media queries for smaller screens */\n@media screen and (max-width:720px) {\n  .weekdays li, .days li {width: 13.1%;}\n}\n@media screen and (max-width: 420px) {\n  .weekdays li, .days li {width: 12.5%;}\n  .days li .active {padding: 2px;}\n}\n@media screen and (max-width: 290px) {\n  .weekdays li, .days li {width: 12.2%;}\n}\n"

/***/ }),

/***/ "./src/components/login/login.component.html":
/*!***************************************************!*\
  !*** ./src/components/login/login.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"router-outlet Login-form-wrapper\" *ngIf=\"page_loaded\">\n        <link rel=\"stylesheet\" href=\"/static/assets/css/login.css\" />\n    <span class=\"loginshape01\"><img async class=\"img-fluid\" src=\"static/assets/images/loginshape-01.png\" /> </span>\n    <span class=\"loginshape02\"><img async class=\"img-fluid\" src=\"static/assets/images/loginshape-02.png\" /> </span>\n    <span class=\"loginshape03\"><img async class=\"img-fluid\" src=\"static/assets/images/loginshape-03.png\" /> </span>\n    <div class=\"container\">\n    <div class=\"row d-flex justify-content-center align-items-center\">\n        <div class=\"col-sm-10 col-md-5 col-xl-5\">\n            <div class=\"login-form-div\">\n                <form [formGroup]=\"loginForm\" (ngSubmit)=\"onSubmit()\">\n                    <a href=\"/#/\" class=\"login-logo\">\n                        <img async class=\"img-fluid\" src=\"/static/assets/images/login-logo.png\" />\n                    </a>\n                    <div class=\"member-login-box\">\n                        <img async src=\"static/assets/images/member-icon.png\" />\n                        <span>Member Login</span>\n                    </div>\n                    <div class=\"form-group input-label-icon\">\n                        <img async class=\"img-fluid user-icon\" src=\"static/assets/images/login-user.png\" />  \n                        <input id=\"username\" placeholder=\"Username\" type=\"text\" formControlName=\"username\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.username.errors }\" />\n                        <div *ngIf=\"submitted && f.username.errors\" class=\"invalid-feedback\">\n                            <div *ngIf=\"f.username.errors.required\">Username is required</div>\n                        </div>\n                    </div>\n                    <div class=\"form-group input-label-icon\">\n                        <img async class=\"img-fluid\" src=\"static/assets/images/lock-icon.png\" />  \n                        <input id=\"password\" placeholder=\"Password\" type=\"password\" formControlName=\"password\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.password.errors }\" />\n                        <div *ngIf=\"submitted && f.password.errors\" class=\"invalid-feedback\">\n                            <div *ngIf=\"f.password.errors.required\">Password is required</div>\n                        </div>\n                    </div>\n                    <div class=\"form-group text-center pl-5 pr-5 mb-2\">\n                        <button class=\"login-btn\">Login</button>\n                    </div>\n                    <div class=\"form-group text-center\">\n                        <a class=\"forgot\" routerLink=\"/forgot-password\">Forgot Password?</a>\n                    </div>\n                    <div *ngIf=\"error\" class=\"alert alert-danger\">{{error}}</div>\n                </form>\n        \n                \n            </div>\n        </div>\n        <div class=\"col-md-7 text-center d-none d-md-block d-lg-block\">\n            <img async class=\"img-key\" src=\"static/assets/images/login-vector.png\" />  \n        </div>\n    </div>\n</div>\n"

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
        $('body').show();
        this.socketService.user_data = undefined;
        $(document).ready(function () {
            setTimeout(function () {
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
        window['sign_loaded'] = undefined;
        window['voting_id'] = -1;
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
            if (typeof (error) != 'string') {
                error = 'Could not connect to server';
            }
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

module.exports = "<app-breadcrumb app=\"meetings\" model=\"event\" \n*ngIf=\"meeting_type == 'upcoming' || meeting_type == 'draft' || meeting_type == 'ongoing'\"\nrid=\"{{meeting_object.id}}\" edit=\"1\" delete=\"1\" \nroutes='[{\"title\":\"{{meeting_type}} Meetings\", \"link\":\"/meetings/{{meeting_type}}\"}]'\ntitle=\"{{meeting_object.name}}\"></app-breadcrumb>\n<app-breadcrumb app=\"meetings\" model=\"event\" \n*ngIf=\"meeting_type == 'archive' || meeting_type == 'completed'\"\nroutes='[{\"title\":\"{{meeting_type}} Meetings\", \"link\":\"/meetings/{{meeting_type}}\"}]'\ntitle=\"{{meeting_object.name}}\"></app-breadcrumb>\n\n<div class=\"router-outlet\">\n    <div class=\"page-links\">\n        <span class=\"prev next-prev-link\" title=\"Privious\">\n            <i class=\"fa fa-angle-left\"></i>\n        </span>\n        <span class=\"next next-prev-link\" title=\"Next\">\n            <i class=\"fa fa-angle-right\"></i>\n        </span>\n    </div>\n    <div class=\"container\" *ngIf=\"meeting_object\">            \n            <div class=\" form-details\">\n                <div class=\"meeting-details-form\">\n                    <div class=\"d-flex justify-content-between\">\n                        <div class=\"row note\" *ngIf=\"conference_not_active\">\n                            Meeting conference URL will be available 15 minutes before meeting start.\n                        </div>\n                        <div class=\"\" style=\"justify-content:flex-end;\">\n                            <span *ngIf=\"title === 'Completed'\" class=\"badge badge-success\">{{title}}</span>\n                            <span *ngIf=\"title === 'Archived'\" class=\"badge badge-danger\">{{title}}</span>\n                            <span *ngIf=\"title === 'Upcoming'\" class=\"badge badge-warning\">{{title}}</span>\n                        </div>\n                        <div *ngIf=\"meeting_type && meeting_type == 'upcoming' || meeting_type == 'draft'\">\n                            <div class=\"meet-elements\">\n                                <span>\n                                    Meeting Status\n                                </span>\n                                <span *ngIf=\"meeting_status == 'Published'\" class=\"badge badge-success\">{{meeting_status}}</span>\n                                <span *ngIf=\"meeting_status == 'Unpublished'\" class=\"badge badge-warning\">{{meeting_status}}</span>\n                            </div>\n                            <div class=\"publish_toggler\" (click)=\"on_publish_changed()\">\n                                <input type=\"checkbox\" class=\"toggle_cb\" checked\n                                data-toggle=\"toggle\" data-size=\"normal\">\n                            </div>\n                        </div>\n                        <div *ngIf=\"meeting_object && meeting_object.attendance_marked == true && meeting_type && meeting_type == 'completed'\">\n                            <button class=\"btn btn-meeting btn-archive\" (click)=\"move_to_archive(meeting_object.id)\">\n                                <span name=\"archive\">Move to Archive</span>\n                            </button>\n                        </div>\n                    </div>\n\n\n                <div class=\"MainTitleHeadWrap\">\n                    <div class=\"HeadingWrap\">\n                        <img src=\"static/assets/images/meeting-icon.png\" alt=\"\" /> {{meeting_object.name}}\n                    </div>\n                    <div class=\"MeetingBtnWrapper\" id=\"tdmrb{{meeting_object.id}}\">\n                        <div class=\"ChoseButtonHeadWrap\" *ngIf=\"me_as_respondant && meeting_type == 'upcoming'\">\n                            <app-meetingresponse class=\"meeting-detail\" meeting_id=\"{{meeting_object.id}}\" attendee_status=\"{{meeting_object.attendee_status}}\" ></app-meetingresponse>\n                        </div>\n                    </div>\n\t\t\t\t</div>\n\n                <div class=\"div1\">\n\n                    <div class=\"row\">\n                        <div *ngIf=\"me && me.state\" class=\"col-md-4\">\n                            <div class=\"meet-elements\">\n                                My Status\n                            </div>\n                            <label class=\"meet-elementsInfo\">\n                                {{me.state}}\n                            </label>\n                        </div>\n\n                        <!-- <div *ngIf=\"meeting_object.name\" class=\"col-md-6\">\n                                <div class=\"meet-elements\">\n                                    Meeting Subject\n                                </div>\n                                <label class=\"meet-elementsInfo\">\n                                    {{meeting_object.name}}\n                                </label>\n                            </div> -->\n                    </div>\n\n<div class=\"row\">\n                            <div *ngIf=\"meeting_object.start\" class=\"col-md-6\">\n                                    <div class=\"meet-elements\">\n                                        Start Date & Time\n                                    </div>\n                                    <label class=\"meet-elementsInfo\">\n                                        {{meeting_object.start | date:'medium' }}\n                                    </label>\n                                </div>\n\n                                <div *ngIf=\"meeting_object.stop\" class=\"col-md-6\">\n                                        <div class=\"meet-elements\">\n                                            End Date & Time\n                                        </div>\n                                        <label class=\"meet-elementsInfo\">\n                                            {{meeting_object.stop | date:'medium'}}\n                                        </label>\n                                    </div>\n                                    <div *ngIf=\"meeting_object.duration\" class=\"col-md-6\">\n                                            <div class=\"meet-elements\">\n                                                Duration\n                                            </div>\n                                            <label class=\"meet-elementsInfo\">\n                                                {{meeting_object.duration}}\n                                            </label>\n                                        </div>\n\n\n                    <!-- <div *ngIf=\"meeting_object.conference_status == 'active'\"> -->\n\n                            <div class=\"col-md-6\" *ngIf=\"meeting_object.video_call_link\">\n                                <div class=\"meet-elements\">\n                                    Video Call Link\n                                </div>\n                                <label class=\"meet-elementsInfo\">\n                                    <a href=\"{{meeting_object.video_call_link}}\">{{meeting_object.video_call_link}}</a>\n                                </label>\n                            </div>\n\n                            <div class=\"col-md-6\" *ngIf=\"meeting_object.conference_bridge_number\">\n                                <div class=\"meet-elements\">\n                                    Conference Bridge No.\n                                </div>\n                                <label class=\"meet-elementsInfo\">\n                                    {{meeting_object.conference_bridge_number}}\n                                </label>\n                            </div>\n\n                            <div class=\"col-md-6\" *ngIf=\"meeting_object.pin\">\n                                <div class=\"meet-elements\">\n                                    Meeting PIN\n                                </div>\n                                <label class=\"meet-elementsInfo\">\n                                    {{meeting_object.pin}}\n                                </label>\n                            </div>\n\n\n\n                            <div *ngIf=\"meeting_object.location\" class=\"col-md-6\">\n                                <div class=\"meet-elements\">\n                                    Location\n                                </div>\n                                <label class=\"meet-elementsInfo\">\n                                    {{meeting_object.location}}\n                                </label>\n                            </div>\n\n                            <div *ngIf=\"meeting_object.city\" class=\"col-md-6\">\n                                <div class=\"meet-elements\">\n                                    City\n                                </div>\n                                <label class=\"meet-elementsInfo\">\n                                    {{meeting_object.city}}\n                                </label>\n                            </div>\n\n\n\n                            <div *ngIf=\"meeting_object.state\" class=\"col-md-6\">\n                                <div class=\"meet-elements\">\n                                    State\n                                </div>\n                                <label class=\"meet-elementsInfo\">\n                                    {{meeting_object.state}}\n                                </label>\n                            </div>\n\n                            <div *ngIf=\"meeting_object.zip\" class=\"col-md-6\">\n                                <div class=\"meet-elements\">\n                                    Zip Code\n                                </div>\n                                <label class=\"meet-elementsInfo\">\n                                    {{meeting_object.zip}}\n                                </label>\n                            </div>\n\n                            <div *ngIf=\"meeting_object.country\" class=\"col-md-6\">\n                                <div class=\"meet-elements\">\n                                    Country\n                                </div>\n                                <label class=\"meet-elementsInfo\">\n                                    {{meeting_object.country}}\n                                </label>\n                            </div>\n\n\t\t\t\t\t\t\t<div  *ngIf=\"meeting_object.description\" class=\"col-md-12\">\n\t\t\t\t\t\t\t\t<div class=\"meet-elements\">\n\t\t\t\t\t\t\t\t\tDescription\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<label class=\"meet-elementsInfo\" [innerHtml]=\"meeting_object.description\"></label>\n\t\t\t\t\t\t\t</div>\n\n</div>\n\n\n\n\n\n\n\n                    <!-- </div> -->\n                </div>\n\n                <!-- <h2>Status {{meeting_object.conference_status}}</h2> -->\n\n            </div>\n        </div>\n\n        <div *ngIf=\"meeting_object.topics && meeting_object.topics.length\" class=\"title-wrapper\">\n            <div class=\"modal-header\">\n                Agenda Topics\n            </div>\n            <div class=\"row\">\n                <div class=\"col-sm-12\">\n                    <div class=\"table-responsive\">\n                        <table class=\"table table-bordered boardsheet-table\">\n                            <thead class=\"thead-light\">\n                            <tr>\n                                <th>Title</th>\n                                <th>Lead</th>\n                                <th>Duration</th>\n                                <th>Attachment</th>\n                            </tr>\n                            </thead>\n                            <tbody>\n                                <tr style=\"cursor:pointer\" routerLink=\"/topic/{{topic.id}}\" *ngFor=\"let topic of meeting_object.topics\">\n                                    <td>{{topic.name}}</td>\n                                    <td>{{topic.lead}}</td>\n                                    <td >{{topic.duration}}</td>\n                                    <td>\n                                        <div class=\"talbe-docs-wrapper\">\n                                            <div *ngIf=\"topic.docs && topic.docs.length && topic.docs.length > 0\">\n                                                <i class=\"fa fa-file\"></i>\n                                            </div>\n                                        </div>\n                                    </td>\n                                </tr>\n                            </tbody>\n                        </table>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div *ngIf=\"meeting_object.attendees && meeting_object.attendees.length\" class=\"meeting-details-roster title-wrapper\">\n            <div class=\"modal-header\">\n                Roster\n            </div>\n            <div class=\"row\">\n                <div class=\"col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4\" *ngFor=\"let profile of meeting_object.attendees\">\n                    <div class=\"kanban-card\">\n                        <a routerLink=\"/{{profile.group}}/{{profile.id}}\" class=\"kanban-profiles-user-info-box\">\n                            <div class=\"kanban-profiles-user-img\">\n                                <img class=\"img-thumbnail-md\" alt='N/A' src=\"{{socketService.server_url}}{{profile.photo}}\">\n                            </div>\n                            <div class=\"kanban-profiles-user-info\">\n                                <div class=\"kanban-profiles-user-InfoLIST\">\n                                    {{profile.name}}\n                                </div>\n                                <div *ngIf=\"profile.company\" class=\"kanban-profiles-user-InfoLIST\">\n                                    <i class=\"fas fa-users\"></i>\n                                    <span >\n                                        {{profile.company}}\n                                    </span>\n                                </div>\n                                <div *ngIf=\"profile.mobile_phone\" class=\"kanban-profiles-user-InfoLIST\">\n                                    <i class=\"fas fa-phone\"></i>\n                                    <span >\n                                        {{profile.mobile_phone}}\n                                    </span>\n                                </div>\n                                <div *ngIf=\"profile.committees && profile.committees.length > 0\">\n                                    <label for=\"job-title\">\n                                        <b>Committees</b>\n                                    </label>\n                                    <!-- <span *ngIf=\"profile.committees && profile.committees.length > 0\"> -->\n                                    <span class=\"pill\" *ngFor=\"let com of profile.committees\">\n                                        <span style=\"cursor: pointer\" routerLink=\"/committees/{{com['id']}}\">{{com['name']}}</span>\n                                    </span>\n                                    <!-- </span> -->\n                                </div>\n                                <div *ngIf=\"profile.response_by\">Response By: {{profile.response_by}}</div>\n                                <div *ngIf=\"profile.state\" class=\"\">\n                                    <b>Status : </b> {{profile.state}}\n                                </div>\n                                <div *ngIf=\"profile.email\" class=\"kanban-profiles-user-InfoLIST\">\n                                    <i class=\"fas fa-envelope\"></i>\n                                    <span>\n                                        {{profile.email}}\n                                    </span>\n                                </div>\n                            </div>\n                        </a>\n                        <div *ngIf=\"meeting_type == 'completed' || meeting_type == 'ongoing'\" id=\"tdmrb{{meeting_object.id}}\">\n                            <button (click)=\"mark_attendance('absent', meeting_object.id, 'attendance', profile.id)\" class=\"btn btn-primary\">\n                                <i *ngIf=\"profile.attendance == 'absent' || meeting_object.attendance == 'absent'\" class=\"fa fa-check fa-lg\" style=\"color:white\" modifiers=\"{}\"></i>\n                                <span name=\"absent\">Absent</span>\n                            </button>\n                            <button (click)=\"mark_attendance('inperson', meeting_object.id, 'attendance', profile.id)\" class=\"btn btn-primary\">\n                                <i *ngIf=\"profile.attendance == 'inperson' || meeting_object.attendance == 'inperson'\" class=\"fa fa-check fa-lg\" style=\"color:white\" modifiers=\"{}\"></i>\n                                <span name=\"inperson\">Inperson</span>\n                            </button>\n                            <button (click)=\"mark_attendance('online', meeting_object.id, 'attendance', profile.id)\" class=\"btn btn-primary\">\n                                <i *ngIf=\"profile.attendance == 'online' || meeting_object.attendance == 'online'\" class=\"fa fa-check fa-lg\" style=\"color:white\" modifiers=\"{}\"></i>\n                                <span name=\"online\">Online</span>\n                            </button>                            \n                        </div>\n                    </div>\n                </div>\n            </div>\n\n\n            <app-roster meeting_id=\"{{meeting_object.id}}\"></app-roster>\n\n        </div>\n\n        <div *ngIf=\"meeting_object.surveys && meeting_object.surveys.length\" class=\"title-wrapper\">\n            <!--Surveys-->\n            <div class=\"modal-header\">\n                Surveys\n            </div>\n            <div class=\"row\">\n                <div class=\"kanban-card survey\" *ngFor=\"let sur of meeting_object.surveys\">\n                    <div class=\"SurveysInfoBox d-flex flex-wrap justify-content-between align-items-center\">\n                        <div class=\"SurveysInfoBoxTitle\">\n                            <span class=\"container\">\n                                <h5>\n                                    <b>{{sur.name}}</b>\n                                </h5>\n                            </span>\n                        </div>\n                        <div class=\"\">\n                            <button class=\"btn btn-primary\" routerLink=\"/survey/{{sur.id}}\">\n                                <span *ngIf = \"sur.my_status == 'done'\">Results</span>\n                                <span *ngIf = \"sur.my_status == 'pending'\">Start</span>\n                            </button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div *ngIf=\"meeting_object.votings && meeting_object.votings.length\" class=\"title-wrapper\">\n            <!--Votings-->\n            <div class=\"row\">\n                <div class=\"col-sm-12\">\n                    <div class=\"main-heading\">\n\t\t\t\t\t\t<h1>Approval/Voting</h1>\n\t\t\t\t\t</div>\n                </div>\n\t\t\t</div>\n            <div class=\"row\">\n\t\t\t\t<div class=\"col-sm-6 col-md-4 mb-4\" *ngFor=\"let vote of meeting_object.votings\">\n\t\t\t\t\t<div class=\"kanban-card voting\">\n\t\t\t\t\t\t<div class=\"VotingsInfoBox\">\n\t\t\t\t\t\t\t<div class=\"VotingsInfoBoxTitle \">\n\t\t\t\t\t\t\t\t<h5>\n\t\t\t\t\t\t\t\t\t<b>{{vote.name}}</b>\n\t\t\t\t\t\t\t\t</h5>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"bs-btnwrap\">\n\t\t\t\t\t\t\t\t<button class=\"btn btn-primary\" routerLink=\"/voting/{{vote.id}}\">\n\t\t\t\t\t\t\t\t\t<span *ngIf = \"vote.my_status != 'pending'\">Results</span>\n\t\t\t\t\t\t\t\t\t<span *ngIf = \"vote.my_status == 'pending'\">Start</span>\n\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n            </div>\n        </div>\n\n        <div *ngIf=\"meeting_object.meeting_docs && meeting_object.meeting_docs.length\" class=\"title-wrapper\">\n            <div class=\"modal-header\">\n                Meeting Documents\n            </div>\n            <div class=\"row\">\n                <div class=\"col-sm-6 col-md-4 col-lg-2 mb-4\" routerLink=\"/meeting/doc/{{doc.id}}\" *ngFor=\"let doc of meeting_object.meeting_docs\">\n                    <div class=\"DocumentWrapper gray-bge\">\n                        <div class=\"DocIcon\">\n\t\t\t\t\t\t\t<span class=\"rounded-circle\">\n\t\t\t\t\t\t\t\t<i class=\"icon-doc-file\"></i>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</div>\n                        <div class=\"DocInfoVertical text-truncate\">\n                                {{doc.name}}\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n\n        <div *ngIf=\"attachments.length > 0\" class=\"chat-selectBox\" id=\"attach_modal\">\n            <div class=\"call_container \">\n                <form>\n                <div *ngFor=\"let doc of attachments; let i = index\" contenteditable=\"false\"\n                    class=\"doc-thumb\" style=\"display: flex;\">\n                    <span class=\"doc-thumb-icon\"><i class=\"fa fa-2x fa-file\"></i></span>\n                    <!-- <span class=\"file_name\">{{doc.name}}</span> -->\n                    <div>\n                        <input type=\"text\" name=\"attachment_name\"\n                        (click)=\"$event.target.select()\" value=\"{{doc.name}}\" (change)=\"doc_name_change(doc, $event)\"/>\n                    </div>\n                    <span class=\"doc-thumb-close\" (click)=\"remove_attachment($event)\">\n                        <i class=\"del fas fa-times-circle\"></i>\n                    </span>\n                </div>\n            </form>\n            </div>\n        </div>\n        <div *ngIf=\"meeting_type && meeting_type == 'completed'\" class=\"input-group\">\n            <div class=\"input-group-append\">\n                <label>\n                    Attach Meeting Documents\n                </label>\n                <form style=\"padding: 10px;border:1px solid\" \n                class=\"input-group-text attach_btn btn btn-meeting\" (click)=\"attach_btn_click($event)\">\n                    <input (change)=\"file_change($event)\" id=\"msg_file\" type=\"file\" \n                        accept=\".pdf,.doc,.docx,.ppt\" \n                        multiple\n                        style=\"display:none\"\n                    />\n                    <i class=\"fas fa-paperclip\"></i>\n                </form>\n            </div>\n            <button class=\"btn btn-meeting\" (click)=\"upload_doucments()\">\n                <span>Upload Documents</span>\n            </button>\n        </div>\n\n        <div *ngIf=\"meeting_object.sign_docs && meeting_object.sign_docs.length\" class=\"DocumentsSignWrapper title-wrapper\">\n            <div class=\"modal-header\">\n                Documents To Sign\n            </div>\n\t\t\t<div class=\"row docwrappercontainer\">\n\t\t\t\t<div class=\"col-sm-6 col-md-4 col-lg-2 mb-4\"   *ngFor=\"let doc of meeting_object.sign_docs\">\n\t\t\t\t\t<a routerLink=\"/signdoc/{{doc.id}}\" class=\"\">\n\t\t\t\t\t\t<div class=\"DocumentWrapper\">\n\t\t\t\t\t\t\t<div class=\"DocIcon\">\n\t\t\t\t\t\t\t\t<span class=\"rounded-circle\">\n\t\t\t\t\t\t\t\t\t<i class=\"icon-doc-file\"></i>\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"DocText\">\n\t\t\t\t\t\t\t\t<div class=\"DocName\">\n\t\t\t\t\t\t\t\t\t<h5>Title: {{doc.name}}</h5>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"SignatureText font-11\">\n\t\t\t\t\t\t\t\t\t<span>My Signature: </span>\n\t\t\t\t\t\t\t\t\t<span class=\"pending-status\">{{doc.mp_signature_status}}</span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</a>\n                </div>\n            </div>\n        </div>\n        <app-comments *ngIf=\"meetObjLoaded\" res_app=\"{{discussion_params.app}}\" res_model=\"{{discussion_params.model}}\" res_id=\"{{meeting_object.id}}\" [mention_list]=\"meeting_object.attendees\"></app-comments>\n    </div>\n</div>\n"

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
    function MeetingDetailsComponent(route, router, httpService, sanitizer, ss) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.httpService = httpService;
        this.sanitizer = sanitizer;
        this.ss = ss;
        this.meetObjLoaded = false;
        this.notes = [];
        this.new_reply = '';
        this.next = '';
        this.prev = '';
        this.title = '';
        this.flag = '';
        this.meeting_type = '';
        this.meeting_status = '';
        this.first_time = true;
        this.discussion_params = {
            model: 'Event',
            app: 'meetings'
        };
        this.conference_not_active = false;
        this.attachments = [];
        this.socketService = this.ss;
        this.route.params.subscribe(function (params) { return _this.get_data(); });
    }
    MeetingDetailsComponent.prototype.on_publish_changed = function () {
        var obj_this = this;
        var is_published = obj_this.meeting_object.publish;
        if (is_published) {
            obj_this.meeting_status = 'Unpublished';
            obj_this.meeting_type = 'draft';
            obj_this.title = 'Draft';
            $('li.breadcrumb-item a').last().html('Draft Meetings').attr('href', '/meetings/draft');
        }
        else {
            obj_this.meeting_status = 'Published';
            obj_this.meeting_type = 'upcoming';
            obj_this.title = 'Upcoming';
            $('li.breadcrumb-item a').last().html('Upcoming Meetings').attr('href', '/meetings/upcoming');
        }
        obj_this.meeting_object.publish = !is_published;
        var args = {
            app: 'meetings',
            model: 'Event',
            method: 'update_publish_status'
        };
        var input_data = {
            params: { meeting_id: obj_this.meeting_object.id, publish_status: obj_this.meeting_object.publish },
            args: args,
            no_loader: 1
        };
        obj_this.httpService.get(input_data, function () { }, function () {
            obj_this.meeting_object.publish = !obj_this.meeting_object.publish;
        });
    };
    MeetingDetailsComponent.prototype.get_data = function () {
        var obj_this = this;
        var page_url = window.location + '';
        var req_peram = (window.location + '').split('/');
        obj_this.flag = req_peram[req_peram.length - 3];
        if (['upcoming', 'completed', 'archived'].indexOf(obj_this.flag) === -1) {
            obj_this.flag = '';
        }
        var args = {
            app: 'meetings',
            model: 'Event',
            method: 'get_details'
        };
        var input_data = {
            params: { id: obj_this.route.snapshot.params.id, meeting_type: obj_this.flag },
            args: args
        };
        var on_data = function (result) {
            try {
                if (result.message) {
                    $('.router-outlet').html('<h2 style="text-align:center">' + result.message + '</h2>');
                    return;
                }
                var meeting_object = obj_this.meeting_object = result.meeting;
                setTimeout(function () {
                    $('.toggle_cb').bootstrapToggle({
                        off: 'Unpublish',
                        on: 'Publish'
                    });
                    if (obj_this.meeting_object.publish) {
                        $('.toggle_cb').prop('checked', false).change();
                        obj_this.meeting_status = 'Published';
                    }
                    else {
                        obj_this.meeting_status = 'Unpublished';
                    }
                }, 100);
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
                if (obj_this.meeting_type) {
                    obj_this.meeting_type === 'past' ? obj_this.meeting_type = 'archived' : obj_this.meeting_type;
                    obj_this.title = obj_this.meeting_type[0].toUpperCase() + obj_this.meeting_type.slice(1).toLowerCase();
                }
                obj_this.meeting_object.description = obj_this.meeting_object.description.trim();
                if (meeting_object.description)
                    meeting_object.description = obj_this.sanitizer.bypassSecurityTrustHtml(obj_this.meeting_object.description);
                var uid = window['current_user'].cookie.id;
                var pp = 0;
                var cur_user_object = undefined;
                var myindex = -1;
                var attendees = meeting_object.attendees;
                attendees.forEach(function (att) {
                    if (att.uid == uid) {
                        myindex = pp;
                        cur_user_object = att;
                    }
                    pp++;
                });
                if (!cur_user_object) {
                    console.log('Me not in attendees');
                    return;
                }
                attendees.splice(myindex, 1);
                attendees.splice(0, 0, cur_user_object);
                obj_this.me_as_respondant = attendees[0];
            }
            catch (er) {
                console.log(er);
            }
            obj_this.meetObjLoaded = true;
        };
        this.httpService.get(input_data, on_data, null);
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
    MeetingDetailsComponent.prototype.move_to_archive = function (meeting_id) {
        var obj_this = this;
        if (meeting_id) {
            var args = {
                app: 'meetings',
                model: 'Event',
                method: 'move_to_archive'
            };
            var input_data = {
                params: { meeting_id: meeting_id },
                args: args,
                no_loader: 1
            };
            if (obj_this.meeting_object.attendance_marked) {
                obj_this.httpService.get(input_data, function (data) {
                    var url = '/meeting/archived/' + meeting_id;
                    obj_this.router.navigate([url]);
                }, null);
            }
        }
    };
    MeetingDetailsComponent.prototype.doc_name_change = function (doc, e) {
        doc.name = e.target.value;
    };
    MeetingDetailsComponent.prototype.file_change = function (event) {
        var obj_this = this;
        var res = new Promise(function (resolve, reject) {
            window['functions'].get_file_binaries(event.target.files, resolve);
        }).then(function (data) {
            data.forEach(function (element) {
                var ar = element.name.split('.');
                element.ext = ar[ar.length - 1];
                element.name = element.name.replace('.' + element.ext, '');
                element.file_name = element.name;
            });
            obj_this.attachments = obj_this.attachments.concat(data);
        });
    };
    MeetingDetailsComponent.prototype.attach_btn_click = function (ev) {
        if (!$(ev.target).is('input')) {
            $(ev.target).closest('.attach_btn').find('input').click();
        }
    };
    MeetingDetailsComponent.prototype.remove_attachment = function (el) {
        var obj_this = this;
        var i = $(el.target).closest('#attach_modal .doc-thumb').index();
        obj_this.attachments.splice(i, 1);
    };
    MeetingDetailsComponent.prototype.upload_doucments = function () {
        var obj_this = this;
        obj_this.attachments.forEach(function (element) {
            element.file_name = element.name;
            element.name = element.name + '.' + element.ext;
        });
        if (obj_this.attachments.length && obj_this.meeting_object) {
            var args = {
                app: 'meetings',
                model: 'MeetingDocument',
                method: 'upload_meeting_documents',
                post: 1
            };
            var input_data = {
                params: {
                    meeting_id: obj_this.meeting_object.id,
                    attachments: obj_this.attachments
                },
                args: args,
                no_loader: 1
            };
            obj_this.httpService.get(input_data, function (data) {
                obj_this.meeting_object.meeting_docs = obj_this.meeting_object.meeting_docs.concat(data);
                obj_this.attachments = [];
            }, null);
        }
    };
    MeetingDetailsComponent.prototype.mark_attendance = function (response, meet_id, action, user_id) {
        var req_url = '/meeting/respond-invitation-json';
        var obj_this = this;
        var input_data = {
            meeting_id: meet_id,
        };
        input_data['attendance'] = response;
        input_data['user_id'] = user_id;
        var meeting_being_updated = obj_this.meeting_object;
        meeting_being_updated.user_id = user_id;
        if (response) {
            var args = {
                app: 'meetings',
                model: 'Event',
                method: 'respond_invitation'
            };
            var final_input_data = {
                params: input_data,
                args: args,
                no_loader: 1,
            };
            obj_this.httpService.get(final_input_data, function (data) {
                var attendee = meeting_being_updated.attendees.filter(function (attendee) {
                    return attendee.id == meeting_being_updated.user_id;
                });
                if (attendee.length > 0) {
                    attendee = attendee[0];
                    attendee.attendance = response;
                }
                meeting_being_updated.attendance_marked = data.attendance_marked;
            }, null);
        }
    };
    MeetingDetailsComponent.prototype.ngOnInit = function () {
        //[data-toggle="toggle"]
        // var obj_this = this;
        // setTimeout(function(){
        //     $('.toggle_cb').change(function() {
        //         if(!obj_this.first_check)
        //         {
        //             let publish_status = $(this).prop('checked');
        //             let args = {
        //                 app: 'meetings',
        //                 model: 'Event',
        //                 method: 'update_publish_status'
        //             }
        //             let input_data = {
        //                 params: {meeting_id: obj_this.meeting_object.id,publish_status: publish_status},
        //                 args: args,
        //                 no_loader: 1
        //             };
        //             obj_this.httpService.get(input_data, null, null)
        //         }                
        //     });
        // }, 200);
    };
    MeetingDetailsComponent.prototype.ngOnDestroy = function () {
    };
    MeetingDetailsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            styles: [__webpack_require__(/*! ./meetingdetails.css */ "./src/components/meetingdetails/meetingdetails.css")],
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

/***/ "./src/components/meetingdetails/meetingdetails.css":
/*!**********************************************************!*\
  !*** ./src/components/meetingdetails/meetingdetails.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".note{\n\tborder: 1px solid gray;\n\tpadding: 1%;\n\tmargin: 1% 0;\n\tbackground: #f1f2f4;\n\tfont-size: 14px;\n\tfont-weight: 900;\n}\n\nh5, .h5 {\n    font-size: 0.898rem;\n}\n\n.active{\n    background-color: #9c4784 !important;\n    color: white;\n}\n\n.btn-default{\n    background-color: silver;\n}\n\n.btn-default:focus {\n    outline: solid;\n}\n\n.navbar{\n    background-color: #eeeeee;\n}\n\n.home{\n    background-color: transparent !important;\n}\n\n.kanban-card.survey\n{\n    width: 240px;\n}\n\n.bordered{\n    border: 1px solid #808080;\n}\n\n.modal-header, .modal-footer{\n    background-color: #eeeeee !important;\n}\n\n#addSlot>.modal-dialog>.modal-content{\n    border: 0px !important;\n    box-shadow: 1px 5px 20px 3px #808080;\n}\n\n.add-slot{\n    cursor: pointer;\n    background-color: #54ab35;\n    height: 50px;\n    width: 50px;\n    color: white;\n    font-size: 32px;\n    position: fixed;\n    top: 68px;\n    left: 20px;\n    border: 0px !important;\n    border-radius: 50px;\n    box-shadow: 1px 2px 10px 1px #808080;\n}\n\n.btn-info, .btn-info>a, .btn-secondary{\n    background-color: white;\n    border-color: white;\n}\n\n/*Success Snackbar*/\n\n.snackbar-success {\n    visibility: hidden;\n    min-width: 250px;\n    margin-left: -125px;\n    background-color: #54C036;\n    color: #fff;\n    text-align: center;\n    border-radius: 2px;\n    padding: 16px;\n    position: fixed;\n    z-index: 1;\n    left: 50%;\n    bottom: 30px;\n    font-size: 17px;\n    z-index: 999;\n}\n\n.snackbar-success.show {\n    visibility: visible;\n    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;\n    animation: fadein 0.5s, fadeout 0.5s 2.5s;\n}\n\n@-webkit-keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n\n@keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n\n@-webkit-keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n\n@keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n\n/*ERROR SNACKBAR*/\n\n.snackbar-error {\n    visibility: hidden;\n    min-width: 250px;\n    margin-left: -125px;\n    background-color: #ff0033;\n    color: white;\n    text-align: center;\n    border-radius: 2px;\n    padding: 16px;\n    position: fixed;\n    z-index: 1;\n    left: 50%;\n    bottom: 30px;\n    font-size: 17px;\n    z-index: 999;\n}\n\n.snackbar-error.show {\n    visibility: visible;\n    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;\n    animation: fadein 0.5s, fadeout 0.5s 2.5s;\n}\n\n@-webkit-keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n\n@keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n\n@-webkit-keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n\n@keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n\n/* .meeting-details-form {\n    background: #f3f3f3;\n    border-left: 5px solid #7c7bad;\n    padding: 30px;\n    margin-bottom: 30px;\n} */\n\n.title-wrapper .modal-header{\n    margin:25px 0;\n    padding: 0 0 15px;\n    font-size: 30px;\n    font-weight: 400;\n    background: transparent !important;\n    color: #2B2B2B;\n}\n\n.boardsheet-table .thead-light th {\n    color: #3059C9;\n    background-color: transparent;\n    border-color: transparent;\n    font-size: 18px;\n    font-weight: 500;\n    border-bottom: 1px solid #dee2e6;\n}\n\n.SurveysInfoBox {\n    background: #f3f3f3;\n    min-height: 110px;\n    border-radius: 3px;\n    border: 1px solid #f1eeee;    \n    padding: 5px 15px;\n    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.27);\n}\n\n.SurveysInfoBoxTitle h5 b{\n    font-weight: 700;\n    line-height: 1.3;\n    color: #515365;\n}\n\n.SurveysInfoBoxTitle h5 span{\n  display:block;\n  font-weight:400;\n  font-size:13px;\n}\n\n.meeting-details-roster-info-img{\n    margin-right: 15px;\n}\n\n.comments button{\n    margin: 0 !important;\n}\n\n.comments textarea.form-control{\n    margin-bottom: 20px;\n    min-height: 150xp;\n}\n\n.reply.container .label\n{\n    padding-bottom: 20px;\n}\n\n.container.comments {\n    padding-bottom: 20px;\n}\n\n.message.reply, .mainthread{\n    background: #eeeeee;\n    border-radius: 13px;\n    padding: 1%;\n}\n\n.message.reply{\n    background: silver;\n}\n\n/* .comments-container {\n    border-right: 1px solid #eeeeee;\n    border-left: 1px solid #eeeeee;\n    padding: 0 6%;\n} */\n\n.label{\n    cursor: pointer;\n    float: right;\n    background: #eeeeee;\n    padding: 0 5px;\n    border-radius: 25px;\n    font-weight: bolder;\n}\n\n.comment_response{\n    font-size: 12px;\n    color: grey;\n    padding: 0 0 0 3%;\n    margin-bottom: 10px;\n    margin-top: 5px;\n}\n\n.label > div {\n    width: 35px;\n    text-align: center;\n}\n\n.main.comment_response a {\n    padding: 0 5px 0 5px;\n}\n\n.reply-input {\n    margin: 0 0 10px 0;\n}\n\n.reply-body{\n\tword-wrap: break-word;\n\twidth: 80%;\n}\n\n.anchor-mb{\n    margin-bottom: 0.5rem;\n}\n\n.attendee-card button{\n    font-size: 0.85rem;\n}"

/***/ }),

/***/ "./src/components/meetingresponse/meetingresponse.component.css":
/*!**********************************************************************!*\
  !*** ./src/components/meetingresponse/meetingresponse.component.css ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".upcomingButton button{\n\tmargin: .2rem;\n\tborder: 0;\n\tpadding: .5rem;\n\tbackground: #638FC9;\n\tcolor: #ffffff;\n\tborder-radius: 25px;\n}\n.upcomingButton button i {\n    font-size: 14px;\n    padding-right: 4px;\n}\n"

/***/ }),

/***/ "./src/components/meetingresponse/meetingresponse.component.html":
/*!***********************************************************************!*\
  !*** ./src/components/meetingresponse/meetingresponse.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"upcomingButton btn-flex-1\" id=\"tdmrb{{meeting_id}}\">\n    <button (click)=\"respond_invitation('accepted', meeting_id)\" class=\"\">\n        <i *ngIf=\"attendee_status == 'accepted'\" class=\"fa fa-check fa-lg\" style=\"color:white\" modifiers=\"{}\"></i>\n        <span name=\"accepted\">Accept</span>\n    </button>\n    <button (click)=\"respond_invitation('declined', meeting_id)\" class=\"\">\n        <i *ngIf=\"attendee_status == 'declined'\" class=\"fa fa-check fa-lg\" style=\"color:white\" modifiers=\"{}\"></i>\n        <span name=\"declined\">Decline</span>\n    </button>\n    <button (click)=\"respond_invitation('tentative', meeting_id)\" class=\"\">\n        <i *ngIf=\"attendee_status == 'tentative'\" class=\"fa fa-check fa-lg\" style=\"color:white\" modifiers=\"{}\"></i>\n        <span name=\"tentative\">Tentative</span>\n    </button>\n</div>"

/***/ }),

/***/ "./src/components/meetingresponse/meetingresponse.component.ts":
/*!*********************************************************************!*\
  !*** ./src/components/meetingresponse/meetingresponse.component.ts ***!
  \*********************************************************************/
/*! exports provided: MeetingresponseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MeetingresponseComponent", function() { return MeetingresponseComponent; });
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


var MeetingresponseComponent = /** @class */ (function () {
    function MeetingresponseComponent(http_ervice) {
        this.http_ervice = http_ervice;
        this.httpService = http_ervice;
    }
    MeetingresponseComponent.prototype.respond_invitation = function (response, meet_id) {
        var req_url = '/meeting/respond-invitation-json';
        var obj_this = this;
        var input_data = {
            meeting_id: meet_id,
            response: response
        };
        if (response) {
            var args = {
                app: 'meetings',
                model: 'Event',
                method: 'respond_invitation'
            };
            var final_input_data = {
                params: input_data,
                args: args,
                no_loader: 1,
            };
            obj_this.attendee_status = response;
            obj_this.httpService.get(final_input_data, function (data) {
            }, null);
        }
    };
    MeetingresponseComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], MeetingresponseComponent.prototype, "attendee_status", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], MeetingresponseComponent.prototype, "meeting_id", void 0);
    MeetingresponseComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-meetingresponse',
            template: __webpack_require__(/*! ./meetingresponse.component.html */ "./src/components/meetingresponse/meetingresponse.component.html"),
            styles: [__webpack_require__(/*! ./meetingresponse.component.css */ "./src/components/meetingresponse/meetingresponse.component.css")]
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"]])
    ], MeetingresponseComponent);
    return MeetingresponseComponent;
}());



/***/ }),

/***/ "./src/components/meetings/meetings.component.html":
/*!*********************************************************!*\
  !*** ./src/components/meetings/meetings.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-breadcrumb app=\"meetings\" model=\"event\" create=\"1\" title=\"{{meeting_type}}\"></app-breadcrumb>\n<div class=\"router-outlet\">\n\t<div class=\"container\">\n\t\t<div class=\"row\">\n\t\t\t<div class=\"col-lg-12\">\n\t\t\t\t<div class=\"MainTitleHeadWrap\">\n\t\t\t\t\t<div class=\"HeadingWrap\">\n\t\t\t\t\t\t<img src=\"static/assets/images/meeting-icon.png\" alt=\"\" /> Meetings\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"MeetingBtnWrapper\">\n\t\t\t\t\t\t<div class=\"btn-group\">\n\t\t\t\t\t\t\t<a routerLink=\"/meetings/upcoming\" class=\"btn\">Upcoming</a>\n\t\t\t\t\t\t\t<a routerLink=\"/meetings/completed\" class=\"btn\">Completed</a>\n\t\t\t\t\t\t\t<a routerLink=\"/meetings/archived\" class=\"btn\">Archived</a>\n\t\t\t\t\t\t\t<a routerLink=\"/meetings/draft\" class=\"btn\">Draft</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<div class=\"container\" *ngIf=\"no_meet\" >\n\t\t<div class=\"row\">\n\t\t\t<div class=\"col-lg-12 \">\n\t\t\t\t<div class=\"jumbotron text-center\">\n\t\t\t\t\t<h1>No Meetings</h1>\n\t\t\t\t\t<hr>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t\t\t<!--<div class=\"row\">-->\n\t\t\t<!--<div class=\"kanban-card\" *ngFor=\"let meeting_object of meeting_list\">-->\n\t\t\t\t<!--<div class=\"kanban-meeting-info\">-->\n\n\t<div class=\"container\">\n\t\t<div class=\"row\">\n\t\t\t<div class=\"col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4\" *ngFor=\"let meeting_object of meeting_list\">\n\t\t\t\t<div class=\"kanban-card kanban-meeting-info\">\n\t\t\t\t\t<a class=\"kanban-upcoming-meeting\" routerLink=\"/meeting/{{meeting_object.id}}\">\n\t\t\t\t\t\t<div class=\"CalendarDateWrapper\">\n\t\t\t\t\t\t\t<span *ngIf=\"meeting_object.start\" class=\"CalendarDateWrap\">\n\t\t\t\t\t\t\t\t<span class=\"kanban-upcoming-meeting-date\">\n\t\t\t\t\t\t\t\t\t{{meeting_object.start_dt.day}}\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t\t{{meeting_object.start_dt.month_year}}\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t\t{{meeting_object.start_dt.time}}\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"Info\">\n\t\t\t\t\t\t\t<p *ngIf=\"meeting_object.name\">\n\t\t\t\t\t\t\t\t<b>{{meeting_object.name}}</b>\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t<span *ngIf=\"meeting_object.location\">{{meeting_object.location}}</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</a>\n\t\t\t\t\t\n                    <app-meetingresponse *ngIf=\"meeting_type == 'upcoming'\" meeting_id=\"{{meeting_object.id}}\" attendee_status=\"{{meeting_object.attendee_status}}\" ></app-meetingresponse>\n\t\t\t\t\t\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n"

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
        this.bread_crumb = {
            items: [],
            title: ''
        };
        var obj_this = this;
        this.httpService.fetch_paged_data = function (off_set, limit) {
            var req_peram = (window.location + '').split('/');
            var flag = req_peram[req_peram.length - 1];
            var req_url = '/meeting/list-json';
            var input_data = { meeting_type: flag, paging: { offset: off_set, limit: limit } };
            var success_cb = function (result) {
                for (var i in result.records) {
                    var start = result.records[i]['start'];
                    start = window['functions'].meeting_time(start);
                    result.records[i]['start_dt'] = start;
                }
                obj_this.meeting_list = result.records;
                obj_this.httpService.total_records = result.total;
                obj_this.meeting_list.length > 0 ? obj_this.no_meet = false : obj_this.no_meet = true;
            };
            var args = {
                app: 'meetings',
                model: 'Event',
                method: 'get_records'
            };
            var final_input_data = {
                params: input_data,
                args: args
            };
            obj_this.httpService.get(final_input_data, success_cb, null);
        };
    }
    MeetingsComponent.prototype.ngOnInit = function () {
        var url_segments = this.route.snapshot.url;
        this.meeting_type = url_segments[url_segments.length - 1].path;
        var obj_this = this;
        var input_data = { meeting_type: obj_this.meeting_type, paging: { offset: 0, limit: 10 } };
        var success_cb = function (result) {
            for (var i in result.records) {
                var start = result.records[i]['start'];
                start = window['functions'].meeting_time(start);
                result.records[i]['start_dt'] = start;
            }
            obj_this.meeting_list = result.records;
            obj_this.httpService.total_records = result.total;
            obj_this.meeting_list.length > 0 ? obj_this.no_meet = false : obj_this.no_meet = true;
        };
        var failure_cb = function (error) {
        };
        var args = {
            app: 'meetings',
            model: 'Event',
            method: 'get_records'
        };
        var final_input_data = {
            params: input_data,
            args: args
        };
        window['json_functions'].find_activate_link('.MeetingBtnWrapper');
        this.httpService.get(final_input_data, success_cb, failure_cb);
    };
    MeetingsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            styles: [__webpack_require__(/*! ./meetings.css */ "./src/components/meetings/meetings.css")],
            template: __webpack_require__(/*! ./meetings.component.html */ "./src/components/meetings/meetings.component.html")
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], MeetingsComponent);
    return MeetingsComponent;
}());



/***/ }),

/***/ "./src/components/meetings/meetings.css":
/*!**********************************************!*\
  !*** ./src/components/meetings/meetings.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/components/messageicon/messageicon.component.html":
/*!***************************************************************!*\
  !*** ./src/components/messageicon/messageicon.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

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
            styles: [__webpack_require__(/*! ./messageicon.css */ "./src/components/messageicon/messageicon.css")],
            template: __webpack_require__(/*! ./messageicon.component.html */ "./src/components/messageicon/messageicon.component.html")
        }),
        __metadata("design:paramtypes", [_app_socket_service__WEBPACK_IMPORTED_MODULE_1__["SocketService"]])
    ], MessageiconComponent);
    return MessageiconComponent;
}());



/***/ }),

/***/ "./src/components/messageicon/messageicon.css":
/*!****************************************************!*\
  !*** ./src/components/messageicon/messageicon.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".nav-icon button{\n\tbackground: var(--header-icon-color);\n    border-radius: 50% !important;\n    padding: 0;\n    color: #ffffff;\n    outline: none;\n    font-size: 16px;\n    border: none;\n    opacity: 0.9;\n    width: 36px;\n    height: 36px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n\tcursor: pointer;\n\tposition: relative;\n\tmargin: 0 5px;\n}\n\n@media (max-width: 575px) {\n    button.showmouseawaybutton.notification-icon{\n        font-size: 10px;\n        width: 26px;\n        height: 26px;\n        margin: 0 3px;\n    }\n}"

/***/ }),

/***/ "./src/components/messenger/messenger.component.html":
/*!***********************************************************!*\
  !*** ./src/components/messenger/messenger.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"messenger-container\" *ngIf=\"user\">\n\n    <div class=\"chat-setup-container chat friends-chat-box\" *ngIf=\"chat_mode == 'none'\">\n        <div class=\"card-header MessengerSearchWrap\">\n            <div class=\"input-group\">\n                <div class=\"input-group-prepend\">\n                    <span class=\"chatgroup\">\n                        <button (click)=\"group_create_mode()\" class=\"create glyphicon glyphicon-plus\"></button>\n                        <span>New Group</span>\n                    </span>\n                    <span class=\"input-group-text search_btn\"><i class=\"fas fa-search\"></i></span>\n                </div>\n                <input [(ngModel)]=\"searchVal\" type=\"text\" placeholder=\"Search or start new chat\" name=\"\" class=\"form-control search\">\n            </div>\n        </div>\n\n        <hr/>\n\n        <div class=\"group-setup-container\">\n            <div *ngIf=\"group_mode == 'edit'\" class=\"row p-1 m-1 chat-group-setup\" style=\"border:1px solid\">\n                <div *ngIf=\"!selected_chat_group\">\n                    <input id=\"group_name\" [(ngModel)]=\"group_name\" class=\"group-name\" />\n                    <button (click)=\"create_chat_room()\" class=\"\" aria-label=\"Create group.\">\n                        Create\n                    </button>\n                </div>\n                <div *ngIf=\"selected_chat_group\">\n                    <input readonly [(ngModel)]=\"group_name\" class=\"group-name\" />\n                    <button (click)=\"update_chat_group_members()\" class=\"\" aria-label=\"Create group.\">\n                        Update\n                    </button>\n                </div>\n                \n                \n                <button (click)=\"close_group_setup()\" class=\"\" aria-label=\"Create group.\">\n                    Close\n                </button>\n                <ng-select\n                    [items]=\"people_list\"\n                    [multiple]=\"true\"\n                    [closeOnSelect]=\"false\"                    \n                    bindLabel=\"name\"\n                    (change)=\"clean_member_selection()\"\n                    placeholder=\"Select people\"\n                    [(ngModel)]=\"selectedPeople\">\n                </ng-select>\n            </div>\n\n            <div *ngIf=\"group_mode == 'view' && selected_chat_group\" class=\"chat-group-setup\">\n                <button (click)=\"close_group_setup()\" class=\"\" aria-label=\"Create group.\">\n                    Close\n                </button>\n                <span>{{selected_chat_group.name}}</span>\n                <ul class=\"contacts\">\n                    <li *ngFor=\"let member of selected_chat_group.members\">\n                        <div >\n                            <a class=\"contact-item d-flex align-items-center bd-highlight\">\n                                <div class=\"img_cont\">\n                                    <img src=\"{{socketService.server_url}}{{member.photo}}\" class=\"rounded-circle user_img\">                            \n                                </div>\n                                <div class=\"user_info\">\n                                    <span>{{ member.name }}</span>\n                                </div>\n                            </a>\n                        </div>\n                    </li>\n                </ul>\n            </div>\n        </div>\n        \n        \n        <div class=\"contacts-container card-body contacts_body\">\n            <ul class=\"chat-groups-container\">\n                <li *ngFor=\"let cg of socketService.chat_groups\" (click)=\"start_group_chat(cg, $event)\">\n                    <div *ngIf=\"cg.name.toLowerCase().indexOf(searchVal.toLowerCase()) > -1\">\n                        <a class=\"contact-item d-flex align-items-center bd-highlight\">\n                            <div class=\"img_cont\">\n                                <img src=\"static/assets/images/group.jpeg\" class=\"rounded-circle user_img\">                                        \n                            </div>\n                            <div class=\"user_info\">\n                                <span>{{ cg.name }}</span>\n                            </div>\n                            <span class=\"unseen\" *ngIf=\"cg.unseen\">\n                                {{cg.unseen}}\n                            </span>\n                            <span style=\"width:50px\"></span>\n                            <span class=\"setup\" (click)=\"show_group_members(cg, $event)\">\n                                Members\n                            </span>\n                        </a>\n                    </div>\n                </li>\n            </ul>\n            <hr/>\n            <ul class=\"contacts\">\n                <li *ngFor=\"let chat_user of socketService.chat_users\"\n                    (click)=\"select_chat_user(chat_user)\"\n                    [ngClass]=\"[active_chat_user && chat_user.id == active_chat_user.id ? 'active': '']\">                                \n                    <div *ngIf=\"chat_user.name.toLowerCase().indexOf(searchVal.toLowerCase()) > -1\">\n                        <a class=\"contact-item d-flex align-items-center bd-highlight\">\n                            <div class=\"img_cont\">\n                                <img src=\"{{socketService.server_url}}{{chat_user.photo}}\" class=\"rounded-circle user_img\">\n                                <span *ngIf=\"chat_user.online\" class=\"online_icon\"></span>\n                            </div>\n                            <div class=\"user_info\">\n                                <span>{{ chat_user.name }}</span>\n                                <p *ngIf=\"chat_user.online\">Online</p>\n                            </div>\n                            <span class=\"unseen\" *ngIf=\"chat_user.unseen\">\n                                {{chat_user.unseen}}\n                            </span>\n                        </a>\n                    </div>\n                </li>\n            </ul>\n        </div>\n\n    </div>\n\n    <div class=\"chat chat-container-wrppaer\" *ngIf=\"active_chat_user\">\n        <div class=\"chat-full-height\">\n            <div class=\"chat-user-title\">\n                <div class=\"MessengerTitle\">\n                    <span class=\"backchatlist\" (click)=\"set_chat_mode('none')\"><i class=\"fas fa-arrow-left\"></i></span>\n                    <span class=\"user-name\">{{active_chat_user.name}}</span>\n                    <span class=\"status\" *ngIf=\"active_chat_user.online\" class=\"userstat\">Online</span>\n                </div>\n                <div *ngIf=\"active_chat_user && !active_chat_user.is_group\" class=\"MessengerConnectWrap\">                    \n                    <div class=\"CallCircleIcon\" (click)=\"socketService.video_call.init(active_chat_user.id, 'audio_only')\">\n                        <span >\n                            <i class=\"fa fa-phone\"></i>\n                        </span>\n                    </div>\n                    <div class=\"CallCircleIcon\" (click)=\"socketService.video_call.init(active_chat_user.id)\">\n                        <span >\n                            <i class=\"fa fa-video\"></i>\n                        </span>\n                    </div>\n                </div>\n\n                <div *ngIf=\"active_chat_user && active_chat_user.is_group\" class=\"MessengerConnectWrap\">                    \n                    <button (click)=\"leave_group()\">Leave</button>\n                </div>\n                \n                <div *ngIf=\"active_chat_user\" class=\"active_chat_user_id\" style=\"display:none\">{{active_chat_user.id}}</div>\n            </div>\t\t\t\n            <div class=\"card-body msg_card_body meetVue-chat-body\">\n                <div class=\"messenger-body\" *ngFor=\"let msg of active_chat_user.messages\">\n                    <div *ngIf=\"msg.sender.id == user.id\"\n                            class=\"d-flex align-items-end justify-content-end mb-4\">\n                        <div class=\"msg_cotainer_send\">\n                            <div class=\"msg-send-box-wrapper\">\n                                <div  *ngIf=\"msg.body\" class=\"msg-send-box-text\" [innerHTML]=\"msg.body\"></div>\n                                <div class=\"attachment_container\">                                    \n                                    <div *ngFor=\"let doc of msg.attachments\">\n                                        <a *ngIf=\"doc.url\" contenteditable=\"false\"\n                                        href=\"{{socketService.server_url}}{{doc.url}}\"\n                                        target=\"__blank\"\n                                        class=\"download\" style=\"display: flex;\">\n                                            <span class=\"file_name\">\n                                                <i class=\"fa fa-download\"></i>{{doc.name}}\n                                            </span>\n                                        </a>\n                                    </div>\n                                </div>\n                            </div>\n                            <span class=\"msg_time_send\">{{msg.create_date | date:'medium'}}</span>\n                        </div>\n                    </div>\n                    \n                    <div *ngIf=\"msg.sender.id != user.id\"\n                            class=\"d-flex align-items-end justify-content-start mb-4\">\n                        <div class=\"img_cont_msg\">\n                            <img *ngIf=\"!msg.chat_group\" src=\"{{socketService.server_url}}{{msg.sender.photo}}\" class=\"rounded-circle user_img_msg\" />\n                            <span *ngIf=\"msg.chat_group\" class=\"rounded-circle user_img_msg\">{{msg.sender.name}}</span>\n                        </div>\n                        <div class=\"msg_cotainer\">\n                            <div class=\"msg-box-wrapper\">\n                                <div *ngIf=\"msg.body\" class=\"msg-box-text\" [innerHTML]=\"msg.body\"></div>\n                                <div class=\"attachment_container\">                                    \n                                    <a *ngFor=\"let doc of msg.attachments\" contenteditable=\"false\"\n                                    href=\"{{socketService.server_url}}{{doc.url}}\"\n                                    target=\"__blank\"\n                                    class=\"download\" style=\"display: flex;\">\n                                        <span class=\"file_name\">\n                                            <i class=\"fa fa-download\"></i>{{doc.name}}\n                                        </span>\n                                    </a>\n                                </div>\n                            </div>\n                            <span class=\"msg_time\">{{msg.create_date | date:'medium'}}</span>\n                        </div>\n                    </div>\n                </div>\n                \n            </div>\n            <div class=\"card-footer meetVue-chat-footer\">\n                <div *ngIf=\"attachments.length > 0\" class=\"chat-selectBox\" id=\"attach_modal\">\n                    <div class=\"call_container \">\n                        <div *ngFor=\"let doc of attachments\" contenteditable=\"false\"\n                            class=\"doc-thumb\" style=\"display: flex;\">\n                            <span class=\"doc-thumb-icon\"><i class=\"fa fa-2x fa-file\"></i></span>\n                            <span class=\"file_name\">{{doc.name}}</span>\n                            <span class=\"doc-thumb-close\" (click)=\"remove_attachment($event)\">\n                                <i class=\"del fas fa-times-circle\"></i>\n                            </span>\n                        </div>                                    \n                    </div>\n                </div>\n                <div class=\"input-group\">\n                    <input type=\"text\" id=\"message_input_box\" data-emojiable=\"true\"\n                            data-type=\"image\" class=\"form-control\" placeholder=\"Type your message here\" />                                \n                    <div class=\"input-group-append\">\n                        <form style=\"padding: 10px;border:1px solid\" class=\"input-group-text attach_btn\" (click)=\"attach_btn_click($event)\">\n                            <input (change)=\"file_change($event)\" id=\"msg_file\" type=\"file\" \n                                accept=\".pdf,.jpg,.jpeg,.png,.doc,.docx,.ppt\" \n                                multiple\n                                style=\"display:none\" \n                            />\n                            <i class=\"fas fa-paperclip\"></i>\n                        </form>\n                    </div>\n\n                    <div class=\"input-group-append\">\n                        <span id=\"send_btn\" class=\"input-group-text send_btn\"><i class=\"fas fa-location-arrow\"></i></span>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div *ngIf=\"!is_mobile_device && !active_chat_user\" class=\"card wellcomescreen\">\n            <h3>Welcome to BoardSheet</h3>\n        </div>\n    </div>\n\n</div>\n"

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
        this.is_minimize = true;
        this.chat_initilized = 0;
        this.searchVal = '';
        this.is_request_sent = true;
        this.group_name = '';
        this.group_mode = 'none';
        this.chat_mode = 'none';
        this.odoo_build = window['odoo'] ? 1 : undefined;
        this.is_mobile_device = false;
        this.ng_init = false;
        this.attachments = [];
        var obj_this = this;
        obj_this.socketService = ss;
        var socketService = ss;
        function registerChatEventListeners() {
            obj_this.user = socketService.user_data;
            socketService.server_events['chat_message_received'] = function (msg) {
                try {
                    // console.log(msg, 'chat_message_received');
                    obj_this.receiveMessage(msg, msg.sender.id);
                }
                catch (er) {
                    console.log(er);
                }
            };
            socketService.server_events['group_chat_message_received'] = function (msg) {
                try {
                    //console.log('redifen chat_message_received');
                    obj_this.receiveGroupMessage(msg, msg.sender.id);
                }
                catch (er) {
                    console.log(er);
                }
            };
            socketService.server_events['friend_joined'] = updateUserStatus;
            socketService.server_events['user_left'] = updateUserStatus;
            socketService.server_events['new_friend'] = function (friend) {
                socketService.chat_users.push(friend);
            };
            socketService.server_events['friend_removed'] = function (friend_id) {
                for (var i = 0; i < socketService.chat_users.length; i++) {
                    if (socketService.chat_users[i].id == friend_id) {
                        socketService.chat_users.splice(i, 1);
                        break;
                    }
                }
            };
            function updateUserStatus(user) {
                if (obj_this.user.id == user.id) {
                    console.log(user, "Should never happen now");
                    return;
                }
                var temp = socketService.chat_users.filter(function (item) {
                    return item.id == user.id;
                });
                if (temp.length == 0) {
                    console.log(user, " not found");
                    return;
                }
                var client = temp[0];
                client.online = user.online;
            }
            socketService.server_events['chat_group_members_updated'] = function (data) {
                var index = -1;
                var all_groups = obj_this.socketService.chat_groups;
                for (var i = 0; i < all_groups.length; i++) {
                    if (all_groups[i].id == data.id) {
                        index = i;
                        break;
                    }
                }
                if (index == -1) {
                    console.log('members added in valid group', data, obj_this.socketService.chat_groups);
                    obj_this.on_messge_from_new_group(data.id);
                    return;
                }
                var group = undefined;
                if (obj_this.active_chat_user.is_group && obj_this.active_chat_user.id == data.id) {
                    group = obj_this.active_chat_user;
                }
                else {
                    group = obj_this.socketService.chat_groups[index];
                }
                for (var j = 0; j < data.members.length; j++) {
                    group.members.push(data.members[i]);
                }
            };
            obj_this.people_list = new Array();
            for (var ind in obj_this.socketService.chat_users) {
                var obj_user = obj_this.socketService.chat_users[ind];
                obj_this.people_list.push(obj_user);
            }
            if (!obj_this.user) {
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
    MessengerComponent.prototype.scrollToEnd = function () {
        $('.msg_card_body').scrollTop($('.msg_card_body')[0].scrollHeight);
    };
    MessengerComponent.prototype.add_message = function (chat_client, message) {
        chat_client.messages.push(message);
        // console.log(345, chat_client.messages);
    };
    MessengerComponent.prototype.close_group_setup = function () {
        this.switch_group_mode('none');
    };
    MessengerComponent.prototype.leave_group = function () {
        var obj_this = this;
        var input_data = {
            args: {
                app: 'chat',
                model: 'ChatGroup',
                method: 'remove_member'
            },
            params: {
                group_id: obj_this.active_chat_user.id,
                member_id: obj_this.user.id
            }
        };
        obj_this.httpService.post(input_data, function (data) {
            var all_groups = obj_this.socketService.chat_groups;
            for (var i = 0; i < all_groups.length; i++) {
                if (all_groups[i].id == input_data.params.group_id) {
                    all_groups.splice(i, 1);
                    break;
                }
            }
            obj_this.set_chat_mode('none');
        }, function () {
            console.log('Group members not fetched');
        });
    };
    MessengerComponent.prototype.switch_group_mode = function (mode) {
        this.group_mode = mode;
        if (mode == 'none') {
            this.selected_chat_group = undefined;
        }
        this.selectedPeople = [];
        // console.log(this.group_mode, this.selected_chat_group);
    };
    MessengerComponent.prototype.create_chat_room = function () {
        var obj_this = this;
        if (!obj_this.group_name) {
            console.log('group name required');
            return;
        }
        var input_data = {
            args: {
                app: 'chat',
                model: 'ChatGroup',
                method: 'create'
            },
            params: {
                name: obj_this.group_name,
                members: obj_this.selectedPeople
            }
        };
        obj_this.httpService.post(input_data, function (created_chat_group) {
            obj_this.socketService.chat_groups.push(created_chat_group);
            created_chat_group.created_by = obj_this.user;
        }, function () {
        });
    };
    MessengerComponent.prototype.start_group_chat = function (selected_group, e) {
        var obj_this = this;
        if (e && e.target && $(e.target).hasClass('setup')) {
            return;
        }
        if (!selected_group.is_group) {
            selected_group.is_group = true;
        }
        obj_this.switch_group_mode('chat');
        obj_this.activate_chat_user(selected_group);
        // console.log(obj_this.active_chat_user, 155);
        var args = {
            app: 'chat',
            model: 'ChatGroup',
            method: 'get_messages'
        };
        var input_data = {
            params: { group_id: selected_group.id },
            args: args
        };
        var call_on_user_selected_event = function (data) {
            if (!Array.isArray(data)) {
                data = [];
            }
            obj_this.is_request_sent = false;
            obj_this.active_chat_user.messages = [];
            obj_this.onGroupSelected(data);
        };
        input_data['no_loader'] = 1;
        obj_this.httpService.get(input_data, call_on_user_selected_event, call_on_user_selected_event);
    };
    MessengerComponent.prototype.group_create_mode = function () {
        this.group_name = '';
        this.selected_chat_group = undefined;
        this.switch_group_mode('edit');
        setTimeout(function () {
            $('#group_name').focus();
        }, 100);
    };
    MessengerComponent.prototype.show_group_members = function (group) {
        var obj_this = this;
        var mode = obj_this.user.id !== group.created_by.id ? 'view' : 'edit';
        obj_this.switch_group_mode(mode);
        obj_this.group_name = group.name;
        var input_data = {
            args: {
                app: 'chat',
                model: 'ChatGroup',
                method: 'get_details'
            },
            params: {
                group_id: group.id
            }
        };
        obj_this.httpService.post(input_data, function (data) {
            obj_this.selected_chat_group = data;
            var all_chat_groups = obj_this.socketService.chat_groups;
            for (var n = 0; n < all_chat_groups.length; n++) {
                if (all_chat_groups[n].id == data.id) {
                    all_chat_groups[n] = data;
                    break;
                }
            }
            var my_id = obj_this.user.id;
            var ar = obj_this.selected_chat_group.members.filter(function (item) {
                return item.id != my_id;
            });
            // console.log(ar, 133);
            obj_this.selectedPeople = ar;
            if (mode == 'edit') {
                $('input[role="combobox"]:visible:first').focus();
            }
        }, function () {
            console.log('Group members not fetched');
        });
    };
    MessengerComponent.prototype.update_chat_group_members = function () {
        var obj_this = this;
        var input_data = {
            args: {
                app: 'chat',
                model: 'ChatGroup',
                method: 'update_members'
            },
            params: {
                group_id: obj_this.selected_chat_group.id,
                members: obj_this.selectedPeople
            }
        };
        obj_this.httpService.post(input_data, function () {
            var all_chat_groups = obj_this.socketService.chat_groups;
            for (var n = 0; n < all_chat_groups.length; n++) {
                if (all_chat_groups[n].id == input_data.params.group_id) {
                    all_chat_groups[n].members = obj_this.selectedPeople;
                    break;
                }
            }
            obj_this.switch_group_mode('none');
        }, function () {
        });
    };
    MessengerComponent.prototype.select_chat_user = function (target) {
        var obj_this = this;
        obj_this.attachments = [];
        obj_this.activate_chat_user(target);
        this.is_minimize = false;
        if (!obj_this.active_chat_user) {
            console.log("No user selected with " + target.id + ' from ', obj_this.socketService.chat_users);
            return;
        }
        // if(obj_this.active_chat_user.messages)
        // {
        //     //obj_this.active_chat_user needed for $( ".msg_card_body") in dom
        //     // but will take some time to make above dom ready, so wait 10 ms please
        //     setTimeout(function(){
        //         obj_this.onUserSelected(obj_this.active_chat_user.messages, 1);
        //     },10)            
        // }
        // else
        {
            var args = {
                app: 'chat',
                model: 'message',
                method: 'get_friend_messages'
            };
            var input_data = {
                params: { target_id: target.id },
                args: args
            };
            var call_on_user_selected_event = function (data) {
                if (!Array.isArray(data)) {
                    data = [];
                }
                obj_this.is_request_sent = false;
                obj_this.active_chat_user.messages = [];
                obj_this.onUserSelected(data);
            };
            input_data['no_loader'] = 1;
            obj_this.httpService.get(input_data, call_on_user_selected_event, call_on_user_selected_event);
        }
    };
    MessengerComponent.prototype.activate_chat_user = function (chat_client) {
        this.active_chat_user = chat_client;
        // console.log(chat_client, 1999);
        this.set_chat_mode('active');
    };
    MessengerComponent.prototype.set_chat_mode = function (mode) {
        this.chat_mode = mode;
        if (mode == 'none') {
            // console.log(mode, 19);
            this.active_chat_user = undefined;
            this.selected_chat_group = undefined;
        }
    };
    MessengerComponent.prototype.clean_member_selection = function () {
        $('input[role="combobox"]:visible:first').val('');
    };
    MessengerComponent.prototype.scroll_to_end = function (selector) {
        if ($(selector).length > 0) {
            $(selector).css('visibility', 'hidden');
            setTimeout(function () {
                $(selector).stop().animate({
                    scrollTop: $(selector)[0].scrollHeight
                }, 50, function () {
                    setTimeout(function () {
                        $(selector).css('visibility', 'visible');
                    }, 50);
                });
            }, 50);
        }
        else {
            console.log('Invalid selector ' + selector + ' to scroll');
        }
    };
    MessengerComponent.prototype.onGroupSelected = function (messages, already_fetched) {
        if (already_fetched === void 0) { already_fetched = 0; }
        var obj_this = this;
        $(".msg_card_body").unbind("scroll");
        $(".msg_card_body").scroll(function () {
            var scroll_top = $(".msg_card_body").scrollTop();
            if (!obj_this.active_chat_user) {
                console.log('Invalid chat user');
                return;
            }
            if (!obj_this.active_chat_user.messages) {
                // console.log('No chat user messages');
                obj_this.active_chat_user.messages = [];
            }
            if (scroll_top < 2) {
                get_group_old_messages();
            }
        });
        function get_group_old_messages() {
            if (obj_this.active_chat_user.messages.length < 5) {
                return;
            }
            obj_this.is_request_sent = false;
            if (obj_this.active_chat_user.read || obj_this.is_request_sent) {
                return;
            }
            obj_this.is_request_sent = true;
            var params = {
                target_id: obj_this.active_chat_user.id,
                offset: obj_this.active_chat_user.messages.length
            };
            var args = {
                app: 'chat',
                model: 'message',
                method: 'get_old_messages'
            };
            var input_data = {
                params: params,
                args: args
            };
            var on_success = function (data) {
                // console.log(params.offset, data);
                if (data.length > 0) {
                    obj_this.is_request_sent = false;
                    obj_this.update_emjoi_urls(data);
                    obj_this.active_chat_user.messages = data.concat(obj_this.active_chat_user.messages);
                    obj_this.scroll_to_end(".msg_card_body");
                }
                else {
                    obj_this.active_chat_user.read = true;
                }
            };
            input_data['no_loader'] = 1;
            obj_this.httpService.get(input_data, on_success, null);
        }
        //waiting because [data-emojiable=true] needs to render
        setTimeout(function () {
            var emoji_config = {
                emojiable_selector: "[data-emojiable=true]",
                assetsPath: "/static/assets/emoji/images",
                popupButtonClasses: "far fa-smile"
            };
            var emojiPicker = new window["EmojiPicker"](emoji_config);
            emojiPicker.discover();
            if (already_fetched != 1) {
                obj_this.update_emjoi_urls(messages);
                obj_this.active_chat_user.messages = messages;
            }
            obj_this.socketService.update_unseen_message_count("user-selected", obj_this.active_chat_user);
            var emoji_editor = $('.emoji-wysiwyg-editor');
            emoji_editor.unbind('keyup');
            emoji_editor.keyup(function (e) {
                if (e.keyCode == 13 && !e.shiftKey) {
                    obj_this.prepare_message();
                }
                $('.emoji-menu').hide();
            });
            $('#send_btn').unbind('click');
            $('#send_btn').click(function () {
                obj_this.prepare_message();
            });
            obj_this.scroll_to_end(".msg_card_body");
        }, 20);
    };
    MessengerComponent.prototype.onUserSelected = function (messages, already_fetched) {
        if (already_fetched === void 0) { already_fetched = 0; }
        var obj_this = this;
        $(".msg_card_body").unbind("scroll");
        $(".msg_card_body").scroll(function () {
            var scroll_top = $(".msg_card_body").scrollTop();
            if (!obj_this.active_chat_user) {
                console.log('Invalid chat user');
                return;
            }
            if (!obj_this.active_chat_user.messages) {
                // console.log('No chat user messages');
                obj_this.active_chat_user.messages = [];
            }
            if (scroll_top < 2) {
                get_user_old_messages();
            }
        });
        function get_user_old_messages() {
            if (obj_this.active_chat_user.messages.length < 5) {
                return;
            }
            obj_this.is_request_sent = false;
            if (obj_this.active_chat_user.read || obj_this.is_request_sent) {
                return;
            }
            obj_this.is_request_sent = true;
            var params = {
                target_id: obj_this.active_chat_user.id,
                offset: obj_this.active_chat_user.messages.length
            };
            var args = {
                app: 'chat',
                model: 'message',
                method: 'get_old_messages'
            };
            var input_data = {
                params: params,
                args: args
            };
            var on_success = function (data) {
                // console.log(params.offset, data);
                if (data.length > 0) {
                    obj_this.is_request_sent = false;
                    obj_this.update_emjoi_urls(data);
                    obj_this.active_chat_user.messages = data.concat(obj_this.active_chat_user.messages);
                    obj_this.scroll_to_end(".msg_card_body");
                }
                else {
                    obj_this.active_chat_user.read = true;
                }
            };
            input_data['no_loader'] = 1;
            obj_this.httpService.get(input_data, on_success, null);
        }
        //waiting because [data-emojiable=true] needs to render
        setTimeout(function () {
            var emoji_config = {
                emojiable_selector: "[data-emojiable=true]",
                assetsPath: "/static/assets/emoji/images",
                popupButtonClasses: "far fa-smile"
            };
            var emojiPicker = new window["EmojiPicker"](emoji_config);
            emojiPicker.discover();
            if (already_fetched != 1) {
                obj_this.update_emjoi_urls(messages);
                obj_this.active_chat_user.messages = messages;
            }
            obj_this.socketService.update_unseen_message_count("user-selected", obj_this.active_chat_user);
            var emoji_editor = $('.emoji-wysiwyg-editor');
            emoji_editor.unbind('keyup');
            emoji_editor.keyup(function (e) {
                if (e.keyCode == 13 && !e.shiftKey) {
                    obj_this.prepare_message();
                }
                $('.emoji-menu').hide();
            });
            $('#send_btn').unbind('click');
            $('#send_btn').click(function () {
                obj_this.prepare_message();
            });
            obj_this.scroll_to_end(".msg_card_body");
        }, 20);
    };
    MessengerComponent.prototype.send_message = function (input_data, force_post) {
        if (force_post === void 0) { force_post = false; }
        var obj_this = this;
        try {
            var args = {
                app: 'chat',
                model: 'message',
                method: 'send'
            };
            if (force_post) {
                args['post'] = 1;
            }
            if (obj_this.active_chat_user.is_group) {
                input_data.group_id = obj_this.active_chat_user.id;
                delete input_data['to'];
            }
            var on_success = input_data.on_success;
            input_data = {
                params: input_data,
                args: args
            };
            input_data['no_loader'] = 1;
            obj_this.httpService.post(input_data, function (data) {
                if (on_success) {
                    on_success(data);
                }
            }, null);
        }
        catch (er) {
            console.log(er, ' in sending message');
        }
    };
    MessengerComponent.prototype.file_change = function (event) {
        var obj_this = this;
        var res = new Promise(function (resolve, reject) {
            window['functions'].get_file_binaries(event.target.files, resolve);
        }).then(function (data) {
            obj_this.attachments = obj_this.attachments.concat(data);
        });
    };
    MessengerComponent.prototype.attach_btn_click = function (ev) {
        if (!$(ev.target).is('input')) {
            $(ev.target).closest('.attach_btn').find('input').click();
        }
    };
    MessengerComponent.prototype.prepare_message = function () {
        var obj_this = this;
        if (!obj_this.active_chat_user) {
            console.log('There must be some active user');
            return;
        }
        if (!obj_this.active_chat_user.messages) {
            console.log('Chat user must already have messages');
            obj_this.active_chat_user.messages = [];
        }
        var message_content = $('.emoji-wysiwyg-editor').html();
        if (message_content) {
            if (message_content.endsWith('<div><br></div>')) {
                message_content = message_content.slice(0, -15);
                if (message_content.endsWith('<div><br></div>')) {
                    message_content = message_content.slice(0, -15);
                }
            }
            if (message_content) {
                message_content = message_content.replace(/^(\s+<br( \/)?>)*|(<br( \/)?>\s)*$/gm, '');
            }
        }
        if (!message_content && obj_this.attachments.length == 0) {
            $('.emoji-wysiwyg-editor').html('');
            return;
        }
        var date = new Date();
        var components = [
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds()
        ];
        var timestamp = components.join("");
        var input_data = {
            body: message_content,
            uuid: timestamp,
            attachments: obj_this.attachments,
            to: obj_this.active_chat_user.id,
            create_date: new Date(),
            no_loader: 1,
        };
        var force_post = false;
        if (obj_this.attachments.length > 0) {
            force_post = true;
            input_data['on_success'] = function (data) {
                var that_message = obj_this.active_chat_user.messages.filter(function (obj) {
                    return obj.uuid == data.uuid;
                });
                if (that_message.length > 0) {
                    var recent_message = that_message[0];
                    recent_message.attachments = that_message[0].attachments;
                }
                else {
                    console.log('No.. cant lost the message');
                }
            };
        }
        obj_this.send_message(input_data, force_post);
        if (message_content) {
            message_content = obj_this.sanitizer.bypassSecurityTrustHtml(message_content);
        }
        input_data.body = message_content;
        var temp = {
            id: null,
            from: obj_this.active_chat_user,
            body: message_content,
            create_date: Date(),
            sender: obj_this.user,
            attachments: obj_this.attachments,
            uuid: input_data.uuid
        };
        var obj_message = temp;
        obj_this.add_message(obj_this.active_chat_user, obj_message);
        $('.emoji-wysiwyg-editor').html("");
        obj_this.attachments = [];
        obj_this.scroll_to_end(".msg_card_body");
    };
    MessengerComponent.prototype.receiveMessage = function (message, sender_id) {
        var obj_this = this;
        var sender = obj_this.socketService.get_user_by_id(sender_id);
        if (!sender) {
            console.log(obj_this.socketService.chat_users, ' Dev issue as ' + sender_id + ' not found');
            return;
        }
        if (message.body) {
            message.body = obj_this.sanitizer.bypassSecurityTrustHtml(message.body);
        }
        // var is_chat_open = obj_this.active_chat_user &&
        // 	obj_this.active_chat_user.id == sender_id &&
        // 	!this.is_minimize;
        var active_uid = parseInt($(".active_chat_user_id").html());
        var is_chat_open = $(".msg_card_body").length > 0 && active_uid == sender_id;
        if (!sender.messages) {
            sender.messages = [];
        }
        obj_this.add_message(sender, message);
        obj_this.socketService.update_unseen_message_count("receive-new-message", sender);
        if (is_chat_open) {
            var args = {
                app: 'chat',
                model: 'message',
                method: 'mark_read_message'
            };
            var input_data = {
                params: { message_id: message.id },
                args: args
            };
            input_data['no_loader'] = 1;
            obj_this.httpService.post(input_data, null, null);
            obj_this.socketService.update_unseen_message_count("read-new-message", sender);
            setTimeout(function () {
                obj_this.scrollToEnd();
            }, 200);
        }
    };
    MessengerComponent.prototype.on_messge_from_new_group = function (group_id) {
        var obj_this = this;
        var args = {
            app: 'chat',
            model: 'ChatGroup',
            method: 'get_details'
        };
        var input_data = {
            params: { group_id: group_id },
            args: args
        };
        input_data['no_loader'] = 1;
        obj_this.httpService.post(input_data, function (data) {
            obj_this.socketService.chat_groups.push(data);
        }, null);
    };
    MessengerComponent.prototype.receiveGroupMessage = function (message, sender_id) {
        try {
            var obj_this_1 = this;
            if (message.sender.id == obj_this_1.user.id) {
                return;
            }
            if (!message.chat_group.id) {
                console.log('Invalid group id in message');
                return;
            }
            var temp = obj_this_1.socketService.chat_groups.filter(function (item) {
                return item.id == message.chat_group.id;
            });
            if (temp.length == 0) {
                obj_this_1.on_messge_from_new_group(message.chat_group.id);
                return;
            }
            var group = temp[0];
            if (message.body) {
                message.body = obj_this_1.sanitizer.bypassSecurityTrustHtml(message.body);
            }
            // var is_chat_open = obj_this.active_chat_user &&
            // 	obj_this.active_chat_user.id == sender_id &&
            // 	!this.is_minimize;
            var active_gid = undefined;
            if (obj_this_1.active_chat_user && obj_this_1.active_chat_user.is_group) {
                active_gid = obj_this_1.active_chat_user.id;
            }
            var is_chat_open = $(".msg_card_body").length > 0 && active_gid == message.chat_group.id;
            if (!group.messages) {
                group.messages = [];
            }
            obj_this_1.add_message(group, message);
            obj_this_1.socketService.update_unseen_message_count("receive-new-message", group);
            if (is_chat_open) {
                var args = {
                    app: 'chat',
                    model: 'message',
                    method: 'mark_read_message'
                };
                var input_data = {
                    params: { message_id: message.id },
                    args: args
                };
                input_data['no_loader'] = 1;
                obj_this_1.httpService.post(input_data, null, null);
                obj_this_1.socketService.update_unseen_message_count("read-new-message", group);
                setTimeout(function () {
                    obj_this_1.scrollToEnd();
                }, 200);
            }
        }
        catch (er) {
            console.log(er);
        }
    };
    MessengerComponent.prototype.update_emjoi_urls = function (messages) {
        var obj_this = this;
        {
            messages.forEach(function (element) {
                if (element.body) {
                    element.body = obj_this.sanitizer.bypassSecurityTrustHtml(element.body);
                }
            });
        }
    };
    MessengerComponent.prototype.remove_attachment = function (el) {
        var obj_this = this;
        var i = $(el.target).closest('#attach_modal .doc-thumb').index();
        obj_this.attachments.splice(i, 1);
    };
    MessengerComponent.prototype.ngOnInit = function () {
        var obj_this = this;
        obj_this.is_mobile_device = true;
        $('.popup.messenger').hide();
    };
    MessengerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-messenger',
            styles: [__webpack_require__(/*! ./messenger.css */ "./src/components/messenger/messenger.css")],
            template: __webpack_require__(/*! ./messenger.component.html */ "./src/components/messenger/messenger.component.html")
        }),
        __metadata("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DomSanitizer"],
            _app_http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"],
            _app_socket_service__WEBPACK_IMPORTED_MODULE_3__["SocketService"]])
    ], MessengerComponent);
    return MessengerComponent;
}());



/***/ }),

/***/ "./src/components/messenger/messenger.css":
/*!************************************************!*\
  !*** ./src/components/messenger/messenger.css ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n.messenger-container{\n\theight: calc(100vh - 75px);\n}\n\n.messenger-container .container-fluid, .row{\n\theight: 100%;\n}\n\n/* .messenger-container .friends-chat-box{\n\twidth:280px;\n} */\n\n.chat-container-wrppaer{\t\n\tposition: relative;\n\tborder-left: 1px solid rgba(0, 0, 0, .20);\n    /* #mobi-active-chat{ */\n\twidth: 100%;\n\tbackground: #ffffff;\n\theight: 100%;\n}\n\n.messenger-container h3 {\n    padding-top: 10px;\n    text-align: center;\n}\n\n.messenger-container .msg_card_body{\n\toverflow-y: auto;\n}\n\n.messenger-container .container{\n\talign-content: center;\n}\n\n.messenger-container .search{\n\tborder-radius: 0px 5px 5px 0px !important;\n\tbackground-color: #f5f6f7;\n\tborder-style: none;\n\tbox-sizing: border-box;\n\tfont-size: 13px;\n\theight: 30px;\n\tline-height: 30px;\n\tpadding: 0 4px;\n}\n\n.messenger-container .search:focus{\n\tbox-shadow:none !important;\n\toutline:0px !important;\n}\n\n.messenger-container .type_msg{\n\tborder:0 !important;\n\tcolor:white !important;\n\theight: 60px !important;\n\toverflow-y: auto;\n}\n\n.messenger-container .type_msg:focus{\n\tbox-shadow:none !important;\n\toutline:0px !important;\n}\n\n.messenger-container .attach_btn{\n\tborder-radius: 5px 0 0 5px !important;\n    background-color: #ffffff;\n    color: #7c7bad !important;\n\tcursor: pointer;\n}\n\n.messenger-container .send_btn{\n\tborder-radius: 0 5px 5px 0 !important;\n    background-color: rgb(255, 255, 255) !important;\n    color: #7c7bad !important;\n\tcursor: pointer;\n}\n\n.messenger-container .search_btn{\n\tborder-radius:5px 0 0 5px !important;\n    border: 0 !important;\n    color: #bec3c9 !important;\n    cursor: pointer;\n\n    background-color: #f5f6f7;\n    border-style: none;\n    box-sizing: border-box;\n    font-size: 12px;\n    height: 30px;\n    line-height: 30px;\n}\n\n.messenger-container .contacts{\n\tlist-style: none;\n\tpadding: 0;\n}\n\n.messenger-container .contacts li a{\n\tdisplay: block;\n    margin: 0;\n    padding: 6px 10px;\n\tbackground-color: #ffffff;\n\tposition: relative;\n}\n\n.messenger-container .contacts li a:hover\n{\n    background: rgba(0, 0, 0, .05);\n}\n\n.messenger-container .contacts li.active a{\n    background-color: rgba(0, 0, 0, .05);\n}\n\n.messenger-container .user_img{\n\theight: 50px;\n\twidth: 50px;\n\tborder:1.5px solid #f5f6fa;\n\tposition: relative;\t\n}\n\n.messenger-container .user_img_msg{\n\theight: 40px;\n\twidth: 40px;\n\tborder:1.5px solid #f5f6fa;\n\tposition: relative;\n\n}\n\n.messenger-container .img_cont{\n\tposition: relative;\n\theight: 50px;\n\twidth: 50px;\n\toverflow:hidden;\n}\n\n.messenger-container .img_cont_msg{\n\theight: 40px;\n\twidth: 40px;\n}\n\n.messenger-container span.unseen {\n\tcolor: white;\n\tpadding: 2px 4px;\n\tbackground: #dc3545;\n\tborder-radius: 3px;\n\theight: 22px;\n\tposition: absolute;\n\tright: 10px;\n}\n\n.messenger-container .online_icon{\n\tposition: absolute;\n\theight: 15px;\n\twidth:15px;\n\tbackground-color: #4cd137;\n\tborder-radius: 50%;\n\tbottom: 0.2em;\n\tright: 0.4em;\n\tborder:1.5px solid white;\n}\n\n.messenger-container .offline{\n\tbackground-color: #c23616 !important;\n}\n\n.messenger-container .user_info{\n\tmargin-top: auto;\n    margin-bottom: auto;\n    margin-left: 5px;\n}\n\n.messenger-container .user_info span{\n\tcolor: rgba(0, 0, 0, 1);\n\tfont-size: 15px;\n\tfont-weight: 400;\n\tline-height: 1.4;\n\ttext-transform: capitalize;\n}\n\n.messenger-container .user_info p{\n\tcolor: rgba(153, 153, 153, 1);\n\tfont-size: 12px;\n\tfont-weight: 400;\n\tmargin: 0;\n\ttext-transform: capitalize;\n}\n\n.messenger-container .video_cam{\n\tmargin-left: 50px;\n\tmargin-top: 5px;\n}\n\n.messenger-container .video_cam span{\n\tcolor: white;\n\tfont-size: 20px;\n\tcursor: pointer;\n\tmargin-right: 20px;\n}\n\n.messenger-container .msg_cotainer{\n\tmargin-top: auto;\n\tmargin-bottom: auto;\n\tmargin-left: 10px;\n\tposition: relative;\n\tmin-width: 55px;\n\tmax-width: 400px;\n}\n\n.messenger-container .msg_cotainer_send{\n\tmargin-top: auto;\n\tmargin-bottom: auto;\n\tmargin-left: 10px;\n\tposition: relative;\n\tmin-width: 55px;\n\tmax-width: 400px;\n}\n\n.messenger-container .msg_time, \n.messenger-container .msg_time_send\n{\n\tdisplay: block;\n    font-size: 9px;\n\tfont-weight: 400;\n\tcolor: #888888;\n\tmargin-top: 7px;\n}\n\n.messenger-container .msg_time_send\n{\n     text-align: right; padding-right: 11px;\n}\n\n.messenger-container  .msg_head{\n\tposition: relative;\n}\n\n#action_menu_btn{\n\tposition: absolute;\n\tright: 10px;\n\ttop: 10px;\n\tcolor: white;\n\tcursor: pointer;\n\tfont-size: 20px;\n}\n\n.messenger-container  .action_menu{\t\n\tposition: absolute;\n\tpadding: 15px 0;\n\tbackground-color: rgba(0,0,0,0.5);\n\tcolor: white;\n\tborder-radius: 15px;\n\ttop: 30px;\n\tright: 15px;\n\tdisplay: none;\n}\n\n.messenger-container .action_menu ul{\n\tlist-style: none;\n\tpadding: 0;\n\tmargin: 0;\n}\n\n.messenger-container .action_menu ul li{\n\twidth: 100%;\n\tpadding: 10px 15px;\n\tmargin-bottom: 5px;\n}\n\n.messenger-container .action_menu ul li i{\n\tpadding-right: 10px;\n\n}\n\n.messenger-container .action_menu ul li:hover{\n\tcursor: pointer;\n\tbackground-color: rgba(0,0,0,0.2);\n}\n\n.messenger-container .msg-send-box-wrapper{\n\tmargin: auto 10px auto 0;\n\tposition: relative;\n\tmax-width: 440px;\n}\n\n.messenger-container .msg-box-wrapper{\n\tmargin: auto 10px auto 0;\n\tposition: relative;\n\tmax-width: 440px;\n}\n\n.messenger-container .msg-send-box-text{\n\tbackground-color: #09f;\n\tcolor: #ffffff;\n\tfloat: right;\n\tmargin-top: auto;\n    margin-bottom: auto;\n    border-radius:1.3em;\n    padding: 6px 12px 7px;\n    font-size: 12px;\n\tline-height: 16px;\n}\n\n.messenger-container .msg-box-text{\n\tbackground-color: #f1f0f0;\n\tcolor: rgba(0, 0, 0, 1);\n\tfloat: left;\n\tmargin-top: auto;\n    margin-bottom: auto;\n    border-radius: 1.3em;\n    padding: 6px 12px 7px;\n    font-size: 12px;\n\tline-height: 16px;\n}\n\n.messenger-container .msg-send-box-wrapper::before, \n.messenger-container .msg-send-box-wrapper::after, \n.messenger-container .msg-box-wrapper::before, \n.messenger-container .msg-box-wrapper:after\n{\n\tdisplay: block;\n\tclear: both;\n\tcontent: \"\";\n}\n\n.messenger-container .chat-full-height{\n\theight: 100%;\n    border-radius: 0%;\n    display: flex;\n    flex-direction: column;\n}\n\n.messenger-container .chat-full-height .form-control, \n.messenger-container .emoji-wysiwyg-editor.form-control\n{\n\theight: 40px !important;\n    line-height: 36px !important;\n    padding-top: 2px !important;\n    padding-bottom: 0px !important;\n\tfont-size: 13px;\n\tborder-left: 0;\n\tborder-right: 0;\n\tpadding-left: 15px;\n    border: none !important;\n}\n\n.messenger-container .chat-full-height .form-control:focus, \n.messenger-container .emoji-wysiwyg-editor.form-control:focus \n{\n    color: #495057;\n    background-color: #fff;\n    border-color:transparent;\n    outline: 0;\n    box-shadow: 0 transparent;\n}\n\n.messenger-container .meetVue-chat-body{\n flex: 1 1 0;\n    order: 1;\n    position: relative;\t\n\tpadding: 0;\n}\n\n.messenger-container .meetVue-chat-footer{\n\tmin-height: 32px;\n\torder: 2;\n\tposition: relative;\n\tflex: none;\n\twidth: 100%;\n\tbox-sizing: border-box;\t\n    background: #ffffff;\n    padding: 1px 17px 1px 1px;\n}\n\n.messenger-container .emoji-wysiwyg-editor.form-control{\n    line-height: 38px;\n    padding: 0 10px;\n    font-size: 12px;\n}\n\n.messenger-container .wellcomescreen {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\tright: 0;\n\tbottom: 0;    \n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n.messenger-container .wellcomescreen:after{\n\tfont-family: \"Font Awesome 5 Free\";\n    font-weight: 400;\n    content: \"\\f118\";\n    font-size: 50px;\n    color: #7c7bad;\n}\n\n.messenger-container .MessengerSearchWrap {\n    display: block;\n    padding: 12px 12px;\n    position: relative;\n    background: transparent;\n    border-style: none;\n}\n\n.messenger-container .MessengerWrap{\n\tborder-bottom: 1px solid rgba(0, 0, 0, .10);\n\tbox-sizing: border-box;\n\theight: 50px;\n\tjustify-content: space-between;\n\tpadding: 8px;\n\twidth: 100%;\n}\n\n.messenger-container .MessengerText {\n\tcolor: #1d2129;\n    flex-basis: 100%;\n    font-size: 16px;\n    font-weight: 400;\n    margin: 7px 0 0;\n    overflow: hidden;\n    text-align: center;\n}\n\n.messenger-container .chat-user-title{\n\tborder-bottom: 1px solid rgba(0, 0, 0, .10);\n\tbox-sizing: border-box;\n\theight: 50px;\n\tpadding: 8px 15px;\n\tposition: relative;\n\ttext-align: left;\n\tline-height: 1;\n}\n\n.messenger-container .chat-user-title h2{\n\tcolor: rgba(0, 0, 0, 1);\n\tfont-size: 17px;\n\tfont-weight: 600;\n\tmargin: 0;\n\ttext-transform: capitalize;\n}\n\n.messenger-container .userstat{\n\tcolor: rgba(0, 0, 0, .40);\n\tfont-size: 12px;\n\tfont-weight: normal;\n\tmargin-top: 2px;\n\tvertical-align: middle;\n\twhite-space: nowrap;\n\ttext-align: left;\n}\n\n.MessengerTitle {\n    flex: 1;\n}\n\n.MessengerTitle span{\n    margin-right: 5px;\n}\n\n.MessengerTitle span.user-name{\n    font-size: 1rem;\n    font-weight: bold;\n}\n\n.chat-user-title, .MessengerConnectWrap{\n\tdisplay: flex;\n\tjustify-content: space-between;\n\talign-items: center;\n\t}\n\n.CallCircleIcon{\n    width: 33px;\n    height: 33px;\n    background: #18af3b;\n    border-radius: 50%;\n    color: #ffffff;\n    font-size: 15px;\n    display: flex;\n    margin:0 0 0 7px;\n    justify-content: center;\n    align-items: center;\n    cursor:pointer;\n}\n\n.messenger-container .messenger-body{\n\tpadding:12px;\n}\n\n.messenger-container .meetVue-chat-footer .input-group-text{\n\tborder: 0 !important;\n\tpadding: 0 7px;\n}\n\n.messenger-container .meetVue-chat-footer .input-group-append{\n\tmargin: 0;\n}\n\n.messenger-container .meetVue-chat-footer .input-group{\n\talign-items: center;\n}\n\n/* .messenger-container .backchatlist{\t\n\tposition: absolute;\n    top: 50%;\n    transform: translateY(-50%);\n    font-size: 22px;\n    left: 20px;\n    color: #0099ff;\n} */\n\n/*!* Responsive *!*/\n\n.messenger-container .friends-chat-box{\n\t\theight: calc(100vh - 80px);\n\t}\n\n/* .messenger-container .backchatlist{ display: block;} */\n\n.messenger-container .chat-user-title{\n\t\tborder-bottom: 0;\n\t\tbox-shadow: 0px 2px 3px 0px rgba(142, 127, 127, 0.23);\n\t}\n\n/* @media (min-width: 768px) {\n\t.messenger-container {\n\t\tdisplay: flex;\n\t}\n\t.messenger-container .friends-chat-box {\n\t\tbackground-color: white;\n\t}\n\t.messenger-container .chat-container-wrppaer\n\t{\n\t\tflex: auto;\n\t}\n} */\n\n.messenger-container .nav-icon button{\n\tbackground: #63628a;\n    border-radius: 50% !important;\n    padding: 0;\n    color: #ffffff;\n    outline: none;\n    font-size: 16px;\n    border: none;\n    opacity: 0.9;\n    width: 36px;\n    height: 36px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n\tcursor: pointer;\n\tposition: relative;\n\tmargin: 0 5px;\n}\n\n.messenger-container .messenger-container .contact-item,\n.backchatlist\n{\n    cursor: pointer;\n}\n\n.backchatlist{\n    padding: 5px;\n    color: #0099ff;\n}\n\n.chat-selectBox{\n    border-bottom: 1px solid rgba(0,0,0,.125);\n    margin: 0 0 0 15px;\n}\n\n.chat-selectBox .call_container{\n    padding: 15px 0;\n    position: relative;\n    display: flex;\n    overflow-x: auto;\n}\n\n.chat-selectBox .call_container:after, .chat-selectBox .call_container:before{\n    display: block;\n    content: \"\";\n    clear: both;\n}\n\n.doc-thumb{\n\tborder-radius: 16px;\n\theight: 60px;\n    width: 250px;\n    background: #fff;\n    border: 1px solid rgba(0, 0, 0, .15);\n    position: relative;\n    justify-content: center;\n    align-items: center;\n    margin: 0 10px 0 0;\n    }\n\n.doc-thumb-icon{\n    background-color: rgb(0, 132, 255);\n    height: 60px;\n    width: 60px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    margin-right: 10px;\n    border-top-left-radius: 16px;\n    border-bottom-left-radius: 16px;\n}\n\n.doc-thumb-icon i{\n    color: #ffffff;\n}\n\n.doc-thumb-close{\n    position: absolute;\n    right: 7px;\n    top: 4px;\n    opacity: 0.5;    \n}\n\n.doc-thumb-close:hover{\n    opacity: 1;\n}\n\n.file_name{\n    color: #1d2129;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    margin: 0 10px 0 0;\n    flex: 1;\n}\n\n.fa-download{\n    color: blue;\n    padding-right: 5px;\n}\n\n.attachment_container a.download{\n    padding-top: 8px;\n    padding-left: 8px;\n}\n\n.popup-closer{\n    position: absolute;\n    top:0;\n    left:0;\n    z-index: 1;\n}\n\n.chatgroup\n{\n    margin-top:4px;\n}\n\n.yt1Zfc{\n    background-color: #0f9d58;\n    border-radius: 50%;\n    cursor: pointer;    \n    width: 36px;\n    height: 36px;\n    color: white;\n    position: absolute;\n    right: 16px;\n    border: 0;\n}\n\n.chatgroup .create{\n    height: 20px;\n    width: 20px;\n    border: 2px silver solid;\n    border-radius: 50%;\n    background:green;\n    color: white;\n}\n\n.group-details-container\n{\n    position: absolute;\n    left: 0;\n    top: 30px;\n    z-index: 9;\n    width: 100%;\n    height: calc(100% - 30px);\n    background: white;\n}\n\n.messenger-container .contacts_body {\n    padding: 0;\n    overflow-y: auto;\n    height: calc(100vh - 210px);\n}\n\n.messenger-container .contacts_body ul\n{\n    margin: 0;\n    padding: 0;\n}\n\nspan.setup {\n    margin-left: 5px;\n    border: 1px solid silver;\n    padding: 5px;\n}"

/***/ }),

/***/ "./src/components/paginator/paginator.component.html":
/*!***********************************************************!*\
  !*** ./src/components/paginator/paginator.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"odoo-navigation-page-size ng-star-inserted\">\n    <div class=\"odoo-navigation-page-size-label\">Items per page:</div>\n    <div class=\"odoo-navigation-page-size-select m\">\n        <div class=\"odoo-navigation-mat-form-field-flex\">\n            <select (change)=\"change_limit($event)\" [(ngModel)]=\"limit\" class=\"custom-select mb-2 mr-sm-2 mb-sm-0\" id=\"inlineFormCustomSelect\">\n                <option *ngFor=\"let opt of limit_options\">{{opt}}</option>\n            </select>\n        </div>\n    </div>\n    <div class=\"odoo-navigation-range-actions\">\n        <div class=\"odoo-navigation-range-label\">\n            \n        </div>\n        <button [disabled]=\"offset <= 0\"\n        (click)=\"change_page(-1)\"\n        class=\"odoo-navigation-navigation-previous\">\n            <i class=\"fa fa-chevron-left\"></i>\n        </button>\n        <span>{{page_number}}</span>\n        <button [disabled]=\"offset + limit >= total\"\n            (click)=\"change_page(1)\"\n            class=\"odoo-navigation-navigation-next\">\n            <i class=\"fa fa-chevron-right\"></i>\n        </button>\n    </div>\n</div>"

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
        this.changedOffset = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.changedLimit = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.limit = 2;
        this.limit_options = [
            2,
            10,
            50,
            100
        ];
        this.httpService = httpServ;
        this.offset = 0;
        this.page_number = 1;
    }
    PaginatorComponent.prototype.change_page = function (change) {
        console.log(change, this.offset, this.limit, this.total);
        if (change <= 1 && this.offset < 0) {
            this.offset = 0;
            return;
        }
        else if (change >= 1 && this.offset + this.limit >= this.total) {
            return;
        }
        else {
            var new_val = change * this.limit;
            this.offset = this.offset + new_val;
            this.page_number += change;
            this.changedOffset.emit(this.offset);
            console.log(this.offset, this.limit, this.total);
        }
    };
    PaginatorComponent.prototype.change_limit = function (e) {
        this.limit = $(e.target).val();
        this.changedLimit.emit(this.limit);
        console.log(this.limit, this.offset, 1411);
    };
    PaginatorComponent.prototype.ngOnInit = function () {
        this.total = Number(this.count);
        // console.log(this.count, 199);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], PaginatorComponent.prototype, "count", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], PaginatorComponent.prototype, "changedOffset", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], PaginatorComponent.prototype, "changedLimit", void 0);
    PaginatorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-paginator',
            styles: [__webpack_require__(/*! ./paginator.css */ "./src/components/paginator/paginator.css")],
            template: __webpack_require__(/*! ./paginator.component.html */ "./src/components/paginator/paginator.component.html")
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"]])
    ], PaginatorComponent);
    return PaginatorComponent;
}());



/***/ }),

/***/ "./src/components/paginator/paginator.css":
/*!************************************************!*\
  !*** ./src/components/paginator/paginator.css ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".odoo-navigation {\n    padding: 5px 0;\n}\n\n.odoo-navigation-container {\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: flex-end;\n\tmin-height: 56px;\n\tpadding: 0;\n\tflex-wrap: wrap-reverse;\n}\n\n.odoo-navigation-page-size {\n\tdisplay: flex;\n\talign-items: baseline;\n}\n\n.odoo-navigation, .odoo-navigation-page-size .mat-select-trigger {\n\tcolor: rgba(0,0,0,.54);\n}\n\n.odoo-navigation, .odoo-navigation-page-size .mat-select-trigger {\n\tfont-family: Roboto,\"Helvetica Neue\",sans-serif;\n\tfont-size: 12px;\n}\n\n.odoo-navigation-page-size-label {\n\tmargin: 0 4px;\n}\n\n.mat-form-field {\n\tdisplay: inline-block;\n\tposition: relative;\n\ttext-align: left;\n}\n\n.mat-form-field {\n\ttext-align: left;\n}\n\n.mat-form-field {\n\tfont-size: inherit;\n\tfont-weight: 400;\n\tline-height: 1.125;\n\tfont-family: Roboto,\"Helvetica Neue\",sans-serif;\n}\n\n.odoo-navigation-mat-form-field-flex {\n\tcursor: pointer;\n}\n\n.odoo-navigation-mat-form-field-flex {\n\tdisplay: inline-flex;\n\talign-items: baseline;\n\tbox-sizing: border-box;\n\twidth: 100%;\n}\n\n.odoo-navigation, .odoo-navigation-page-size .mat-select-trigger {\n\tcolor: rgba(0,0,0,.54);\n}\n\n.odoo-navigation-page-size-select {\n\tmargin: 6px 4px 0 4px;\n\twidth: auto;\n}\n\n.mat-form-field {\n\tfont-size: inherit;\n\tfont-weight: 400;\n\tline-height: 1.125;\n\tfont-family: Roboto,\"Helvetica Neue\",sans-serif;\n}\n\n.odoo-navigation-range-actions {\n\tdisplay: flex;\n\talign-items: center;\n\tmin-height: 48px;\n}\n\n.odoo-navigation-range-label {\n\tmargin: 0 32px 0 24px;\n}\n\n.odoo-navigation, .odoo-navigation-page-size .mat-select-trigger {\n\tcolor: rgba(0,0,0,.54);\n}\n\n.odoo-navigation-page-size-label, .odoo-navigation-range-label {\n\tfont-family: Roboto,\"Helvetica Neue\",sans-serif;\n\tfont-size: 12px;\n}\n\n.odoo-navigation-icon {\n\twidth: 28px;\n\tfill: currentColor;\n}\n\n.odoo-navigation-navigation-previous, .odoo-navigation-navigation-next {\n\tpadding: 0;\n\tmin-width: 0;\n\twidth: 40px;\n\theight: 40px;\n\tflex-shrink: 0;\n\tline-height: 40px;\n\tfont-size: 14px;\n    color: #757575;\n    display: flex;\n    justify-content: center;\n\talign-items: center;\n\tbackground: transparent;\n    border: none;\n}\n\n.odoo-navigation-navigation-previous:disabled, .odoo-navigation-navigation-next:disabled\n{\n    background-color: grey;\n}\n\n.custom-select {\n\tborder-radius: 0;\n\tborder-top: none;\n\tborder-right: none;\n    border-left: none;\n    height: auto;\n    padding: 0rem 1.75rem 0rem 0.75rem;\n    color: rgba(0,0,0,.70);\n}\n\n.custom-select:focus {\n\tborder-color: #ced4da;\n\toutline: 0;\n\tbox-shadow: inset 0 0px 0px rgba(0, 0, 0, 0.075), 0 0 5px rgba(128, 189, 255, 0);\n}\n"

/***/ }),

/***/ "./src/components/profiledetails/profiledetails.component.html":
/*!*********************************************************************!*\
  !*** ./src/components/profiledetails/profiledetails.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-breadcrumb app=\"meetings\" model=\"{{type}}\"\nrid=\"{{profile_data.id}}\" *ngIf=\"!my_profile && type_breadCrumb\" delete=\"1\"\nroutes='[{\"title\":\"{{type_breadCrumb}}\", \"link\":\"/profiles/{{type_breadCrumb}}\"}]'\ntitle=\"{{profile_data.name}}\"></app-breadcrumb>\n\n<app-breadcrumb app=\"meetings\" model=\"{{type}}\"\nrid=\"{{profile_data.id}}\" *ngIf=\"my_profile && type_breadCrumb\"\nroutes='[{\"title\":\"{{type_breadCrumb}}\", \"link\":\"/profiles/{{type_breadCrumb}}\"}]'\ntitle=\"{{profile_data.name}}\"></app-breadcrumb>\n\n<div class=\"router-outlet\">\n    <div class=\"container\">\n        <div class=\"page-links\">\n            <span class=\"prev next-prev-link\" title=\"Privious\">\n                <i class=\"fa fa-angle-left\"></i>\n            </span>\n            <span class=\"next next-prev-link\" title=\"Next\">\n                <i class=\"fa fa-angle-right\"></i>\n            </span>\n        </div>\n\n        <div class=\"row\">\n            <div class=\"col-lg-12\">\n                <div class=\"MainTitleHeadWrap\">\n                    <div class=\"HeadingWrap\">\n                        <img src=\"static/assets/images/face-scan.png\" alt=\"\" /> Profile\n                    </div>\n                    <!-- <div *ngIf=\"my_profile\" class=\"edit-buttons\">\n                        <a class=\"btn btn-primary\" routerLink=\"/my-profile/edit\">Edit</a>\n                    </div> -->\n                </div>\n            </div>\n        </div>\n        \n        <form class=\"details-card\">\n            <div class=\"container\">\n                <div class=\"row mb-3\">\n                    <div class=\"col-sm-12 col-md-3 col-lg-2\">\n                        <div class=\"ProfileUserNameJonbWrapper\">\n                            <div class=\"ProfileChangeSaveWrapper\">\n                                <img *ngIf=\"profile_data.image\" class=\"img-thumbnail-lg\" src=\"{{socketService.server_url}}{{profile_data.image}}\">\n                                <img *ngIf=\"!profile_data.image\" class=\"img-thumbnail-lg\" src=\"static/assets/images/no-profile.png\">\n                            </div>\n\n                            <div  class=\"row\" *ngIf=\"profile_data.name\">\n                                <div class=\"col-sm-12 UserProfileNameTittle\">\n                                    {{profile_data.name}}\n                                </div>\n                            </div>\n\n                            <div *ngIf=\"profile_data.job_title\" class=\"row\">\n                                <div class=\"col-sm-12 UserProfileDiscripTittle\">\n                                    {{profile_data.job_title}}\n                                </div>\n                            </div>\n                        </div>\n                        <div *ngIf=\"profile_data.last_login\">\n                            <div class=\"row last-login-details\">\n                                <div class=\"col-sm-12\">\n                                    <h3>Last Login Details</h3>\n                                    <span *ngIf=\"profile_data.login.last.login_time\">Login Time:\n                                        {{profile_data.last_login| date:'MMM dd,yyyy hh:mm:ss A'}}</span>\n                                    <!-- <span *ngIf=\"profile_data.login.last.platform\">OS:\n                                        {{profile_data.login['last'].platform}}</span>\n                                    <span *ngIf=\"profile_data.login.last.browser\">Browser:\n                                        {{profile_data.login['last'].browser}}</span>\n                                    <span *ngIf=\"profile_data.login.last.ip\">IP: {{profile_data.login['last'].ip}}</span>\n                                    <span *ngIf=\"profile_data.login.last.location\">Location:\n                                        {{profile_data.login['last'].location}}</span> -->\n                                </div>\n                            </div>\n                        </div>\n                        <div *ngIf=\"!(profile_data.last_login)\">\n                            <h3>No login data</h3>\n                        </div>\n\n                        <div *ngIf=\"profile_data.resume\"  class=\"row docwrappercontainer\">\n                            <div class=\"col-sm-12\">\n                                <h3>Resume</h3>\n                            </div>\n                            <div class=\"col-sm-12 mb-4\">\n                                <a routerLink=\"/resume/doc/{{profile_data.resume.id}}\">\n                                    <div class=\"DocumentWrapper\">\n                                        <div class=\"DocIcon\">\n                                            <span class=\"rounded-circle\">\n                                                <i class=\"icon-doc-file\"></i>\n                                            </span>\n                                        </div>\n                                        <div class=\"DocInfoVertical text-truncate\">\n                                            {{profile_data.resume.name}}\n                                        </div>\n                                    </div>\n                                </a>\n                                <!-- <div *ngIf=\"my_profile || socketService.is_admin\" class=\"resume-edit-control\">\n                                        <a class=\"edit link\" (click)=\"add_resume()\">\n                                            <i class=\"far fa-edit\"></i>\n                                        </a>\n                                        <input (change)=\"addFile($event, '')\" \n                                        type=\"file\" \n                                        name=\"add_resume\" \n                                        class='add_resume' style=\"display: none\"/>\n                                </div>                                 -->\n                            </div>\n                        </div>\n                        <!-- <div *ngIf=\"!profile_data.resume\"  class=\"row docwrappercontainer\">\n                            <div *ngIf=\"my_profile || socketService.is_admin\" class=\"resume-edit-control\">\n                                <a class=\"edit link\" (click)=\"add_resume()\">\n                                    <i class=\"far fa-edit\"></i>\n                                </a>\n                                <input (change)=\"addFile($event, '')\" \n                                type=\"file\" \n                                name=\"add_resume\" \n                                class='add_resume' style=\"display: none\"/>\n                            </div>\n                        </div> -->\n                    </div>\n                    <div class=\"col-sm-12 col-md-8 col-lg-9 offset-md-1 offset-lg-1 ProfileInfoTittleWrapper\">\n                        <div class=\"ProFileHeadWrap\">\n                            PERSONAL INFO\n                            <span *ngIf=\"my_profile || socketService.is_admin\" (click)=\"open('personal')\" style=\"cursor: pointer\" class=\"edit_personal_info\"><i class=\"far fa-edit\"></i></span>\n                        </div>\n                        <div *ngIf=\"profile_data.mobile_phone\" class=\"row mb-2\">\n                            <div class=\"col-sm-3\">\n                                <label for=\"mobile-phone\">\n                                    <b>Mobile Phone</b>\n                                </label>\n                            </div>\n                            <div class=\"col-sm-9 UserProfileDiscription\">\n                                {{profile_data.mobile_phone}}\n                            </div>\n                        </div>\n                        <div *ngIf=\"profile_data.email\" class=\"row mb-2\">\n                        <div class=\"col-sm-3\">\n                            <label for=\"email\">\n                                <b>Email</b>\n                            </label>\n                            </div>\n                            <div class=\"col-sm-9 UserProfileDiscription\">\n                                {{profile_data.email}}\n                            </div>\n                        </div>\n                        <div *ngIf=\"profile_data.birth_date\" class=\"row mb-2\">\n                            <div class=\"col-sm-3\">\n                                <label for=\"birth_date\">\n                                    <b>Birth Date</b>\n                                </label>\n                            </div>\n                            <div class=\"col-sm-9 UserProfileDiscription\">\n                                {{profile_data.birth_date}}\n                            </div>\n                        </div>\n                        <div *ngIf=\"profile_data.location\" class=\"row mb-2\">\n                            <div class=\"col-sm-3\">\n                                <label for=\"location\">\n                                    <b>Location</b>\n                                </label>\n                            </div>\n                            <div class=\"col-sm-9 UserProfileDiscription\">\n                                    {{profile_data.location}}\n                            </div>\n                        </div>\n                        <div *ngIf=\"my_profile && profile_data.two_factor_auth && profile_data.two_factor_auth.name\" class=\"row mb-2\">\n                            <div class=\"col-sm-3\">\n                                <label for=\"location\">\n                                    <b>Two Factor Authentication</b>\n                                </label>\n                            </div>\n                            <div class=\"col-sm-9 UserProfileDiscription\">\n                                    {{profile_data.two_factor_auth.name}}\n                            </div>\n                        </div>\n\n                        <div *ngIf=\"my_profile\" class=\"\">\n                            <!-- <div class=\"\">\n                                <a href=\"javascript:void(0);\" (click)='init_sign()' class=\"UpdateAddSignBtn\">\n                                    <i class=\"fa fa-pen\"></i>\n                                    <span  *ngIf=\"profile_data.signature_data\">Update </span>\n                                    <span  *ngIf=\"!profile_data.signature_data\">Add </span>\n                                    Signature\n                                </a>\n                            </div> -->\n                            <div class=\"col-sm-9\" style=\"display: flex;\">\n                                <div style=\"position:relative;cursor: pointer;\">\n                                    <img class=\"strt_sign profile \" style=\"width: 100%;\"\n                                        *ngIf=\"profile_data.signature_data\"\n                                        src=\"data:image/png;base64,{{profile_data.signature_data}}\"\n                                    />\n\n                                </div>\n                            </div>\n                        </div>\n\n\n                    </div>\n                </div>\n            </div>\n            <div class=\"BoderGrayTopWrap ProfileInfoTittleWrapper\">\n                <div class=\"container\">\n                    <!-- Bio -->\n                    <div class=\"row assistant\" *ngIf=\"admin_info\">\n                        <div class=\"col-sm-12\">\n                            <h3 class=\"clrBlue mb-5\">\n                                    Bio\n                                    <span *ngIf=\"my_profile || socketService.is_admin\" (click)=\"open('bio')\" style=\"cursor: pointer\" class=\"edit_diversity_info\"><i class=\"far fa-edit\"></i></span>\n                            </h3>\n                        </div>\n                        <div *ngIf=\"profile_data.bio\" class=\"row  mb-3\">\n                            <div class=\"col-sm-3\">\n                                <label for=\"website\">\n                                    <b>Bio</b>\n                                </label>\n                            </div>\n                            <div class=\"col-sm-9 UserProfileDiscription\" [innerHtml]=\"bio_html\"></div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"BoderGrayTopWrap ProfileInfoTittleWrapper\">\n                <div class=\"container\">\n                    <!-- Wrok Information -->\n                    <div class=\"row assistant\" *ngIf=\"admin_info\">\n                        <div class=\"col-sm-12\">\n                            <h3 class=\"clrBlue mb-5\">\n                                    WORK INFO\n                                    <span *ngIf=\"my_profile || socketService.is_admin\" (click)=\"open('work')\" style=\"cursor: pointer\" class=\"edit_diversity_info\"><i class=\"far fa-edit\"></i></span>\n                            </h3>\n                        </div>\n                        <div class=\"admin_info_after_name container\">\n                            <div *ngIf=\"profile_data.company\" class=\"row mb-2\">\n                                <div class=\"col-sm-3\">\n                                    <label for=\"company\">\n                                        <b>Company</b>\n                                    </label>\n                                </div>\n                                <div class=\"col-sm-9 UserProfileDiscription\">\n                                    {{profile_data.company}}\n                                </div>\n                            </div>\n                            <div *ngIf=\"profile_data.job_title\" class=\"row mb-2\">\n                                <div class=\"col-sm-3\">\n                                    <label for=\"job-title\">\n                                        <b>Job Title</b>\n                                    </label>\n                                </div>\n                                <div class=\"col-sm-9 UserProfileDiscription\">\n                                    {{profile_data.job_title}}\n                                </div>\n                            </div>\n                            <div *ngIf=\"profile_data.department\" class=\"row mb-2\">\n                                <div class=\"col-sm-3\">\n                                    <label for=\"department\">\n                                        <b>Department</b>\n                                    </label>\n                                </div>\n                                <div class=\"col-sm-9 UserProfileDiscription\">\n                                    {{profile_data.department}}\n                                </div>\n                            </div>\n                            <div *ngIf=\"profile_data.work_phone\" class=\"row mb-2\">\n                                <div class=\"col-sm-3\">\n                                    <label for=\"w-phone\">\n                                        <b>Work Phone</b>\n                                    </label>\n                                </div>\n                                <div class=\"col-sm-9 UserProfileDiscription\">\n                                    {{profile_data.work_phone}}\n                                </div>\n                            </div>\n                            <div *ngIf=\"profile_data.fax\" class=\"row mb-2\">\n                                <div class=\"col-sm-3\">\n                                    <label for=\"fax\">\n                                        <b>Fax</b>\n                                    </label>\n                                </div>\n                                <div class=\"col-sm-9 UserProfileDiscription\">\n                                    {{profile_data.fax}}\n                                </div>\n                            </div>\n                            <div *ngIf=\"profile_data.website\" class=\"row mb-2\">\n                                <div class=\"col-sm-3\">\n                                    <label for=\"website\">\n                                        <b>Website</b>\n                                    </label>\n                                </div>\n                                <div class=\"col-sm-9 UserProfileDiscription\">\n                                    {{profile_data.website}}\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"BoderGrayTopWrap ProfileInfoTittleWrapper\">\n                    <div class=\"container\">\n                        <!-- Wrok Information -->\n                        <div class=\"row assistant\" *ngIf=\"admin_info\">\n                            <div class=\"col-sm-12\">\n                                <h3 class=\"clrBlue mb-5\">\n                                    BOARD INFO\n                                    <span *ngIf=\"socketService.is_admin\" (click)=\"open('board')\" style=\"cursor: pointer\" class=\"edit_diversity_info\"><i class=\"far fa-edit\"></i></span>\n                                </h3>\n                            </div>\n                            <div class=\"admin_info_after_name container\">\n                                <div *ngIf=\"profile_data.committees && profile_data.committees.length > 0\" class=\"admin_info_after_name container\">\n                                        <div class=\"col-sm-3\">\n                                            <label for=\"job-title\">\n                                                <b>Committees</b>\n                                            </label>\n                                        </div>\n                                        <div class=\"col-sm-9 UserProfileDiscription\">\n                                            <span class=\"pill\" *ngFor=\"let com of profile_data.committees\">\n                                                <span style=\"cursor: pointer\" routerLink=\"/committees/{{com['id']}}\">{{com['name']}}</span>\n                                            </span>\n                                        </div>\n                                    </div>\n                                    <div *ngIf=\"profile_data.board_joining_date\" class=\"row mb-2\">\n                                        <div class=\"col-sm-3\">\n                                            <label for=\"website\">\n                                                <b>Board Joining Date</b>\n                                            </label>\n                                        </div>\n                                        <div class=\"col-sm-9 UserProfileDiscription\">\n                                            {{profile_data.board_joining_date}}\n                                        </div>\n                                    </div>\n                    \n                                    <div *ngIf=\"profile_data.term_start_date\" class=\"row mb-2\">\n                                        <div class=\"col-sm-3\">\n                                            <label for=\"website\">\n                                                <b>Term Start Date</b>\n                                            </label>\n                                        </div>\n                                        <div class=\"col-sm-9 UserProfileDiscription\">\n                                            {{profile_data.term_start_date}}\n                                        </div>\n                                    </div>\n                    \n                                    <div *ngIf=\"profile_data.term_end_date\" class=\"row mb-2\">\n                                        <div class=\"col-sm-3\">\n                                            <label for=\"website\">\n                                                <b>Term End Date</b>\n                                            </label>s\n                                        </div>\n                                        <div class=\"col-sm-9 UserProfileDiscription\">\n                                            {{profile_data.term_end_date}}\n                                        </div>\n                                    </div>\n                    \n                                    <div *ngIf=\"profile_data.board_joinig_date\" class=\"row mb-2\">\n                                        <div class=\"col-sm-3\">\n                                            <label for=\"website\">\n                                                <b>Board Joinig Date</b>\n                                            </label>\n                                        </div>\n                                        <div class=\"col-sm-9 UserProfileDiscription\">\n                                            {{profile_data.board_joinig_date | date:'MMM dd,yyyy'}}\n                                        </div>\n                                    </div>\n                            </div>\n                        </div>\n                    </div>\n            </div>\n            <div *ngIf=\"my_profile || socketService.is_admin\" class=\"BoderGrayTopWrap ProfileInfoTittleWrapper\">\n                <div class=\"container\">\n                    <!-- Diversity Information -->\n                    <div class=\"row assistant\" *ngIf=\"admin_info\">\n                        <div class=\"col-sm-12\">\n                            <h3 class=\"clrBlue mb-5\">\n                                DIVERSITY INFO\n                                <span *ngIf=\"my_profile || socketService.is_admin\" (click)=\"open('diversity')\" style=\"cursor: pointer\" class=\"edit_diversity_info\"><i class=\"far fa-edit\"></i></span>\n                            </h3>\n                        </div>\n                        <div class=\"admin_info_after_name container\">\n                            <div *ngIf=\"profile_data.ethnicity.name\" class=\"row\">\n                                <div class=\"col-sm-3\">\n                                    <label class=\"question-label\">\n                                        <b>Ethnicity</b>\n                                    </label>\n                                </div>\n                                <div class=\"col-sm-9 UserProfileDiscription\">\n                                    {{profile_data.ethnicity.name}}\n                                </div>\n                            </div>\n                            <div *ngIf=\"profile_data.gender.name\" class=\"row\">\n                                <div class=\"col-sm-3\">\n                                    <label class=\"question-label\">\n                                        <b>Gender</b>\n                                    </label>\n                                </div>\n                                <div class=\"col-sm-9 UserProfileDiscription\">\n                                    {{profile_data.gender.name}}\n                                </div>\n                            </div>\n                            <div *ngIf=\"profile_data.veteran.name\" class=\"row\">\n                                <div class=\"col-sm-3\">\n                                    <label class=\"question-label\">\n                                        <b>Veteran</b>\n                                    </label>\n                                </div>\n                                <div class=\"col-sm-9 UserProfileDiscription\">\n                                    {{profile_data.veteran.name}}\n                                </div>\n                            </div>\n\n\n                            <div *ngIf=\"profile_data.disability.name\" class=\"row\">\n                                <div class=\"col-sm-3\">\n                                    <label class=\"question-label\">\n                                        <b>Disability</b>\n                                    </label>\n                                </div>\n                                <div class=\"col-sm-9 UserProfileDiscription\">\n                                    {{profile_data.disability.name}}\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"BoderGrayTopWrap ProfileInfoTittleWrapper\">\n                <div class=\"container\">\n                    <!--Admin Details-->\n                    <div class=\"row assistant\" *ngIf=\"admin_info\">\n\n\n                        <div class=\"col-sm-12\">\n                            <h3 class=\"clrBlue mb-5\">\n                                ADMINISTRATIVE ASSISTANT\n                                <span *ngIf=\"my_profile || socketService.is_admin\" (click)=\"open('administrative')\" style=\"cursor: pointer\" class=\"edit_diversity_info\"><i class=\"far fa-edit\"></i></span>\n                            </h3>\n                        </div>\n\n                        <div class=\"col-sm-2\">\n                            <div class=\"ProfileUserNameJonbWrapper\">\n                                <div class=\"ProfileChangeSaveWrapper\">\n                                    <img *ngIf=\"profile_data.admin_image\" class=\"img-thumbnail-lg\" src=\"{{socketService.server_url}}{{profile_data.admin_image}}\">\n                                        <img *ngIf=\"!profile_data.admin_image\" class=\"img-thumbnail-lg\" src=\"static/assets/images/no-profile.png\">\n                                </div>\n\n                                <div  class=\"row\" *ngIf=\"profile_data.name\">\n                                    <div class=\"col-sm-12 UserProfileNameTittle\">\n                                        {{profile_data.admin_full_name}}\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    <div class=\"col-sm-12 col-md-8 col-lg-9 offset-md-1 offset-lg-1\">\n                        <div class=\"admin_info_after_name\">\n                            <!-- <div *ngIf=\"profile_data.admin_nick_name\" class=\"row\">\n                                <div class=\"col-sm-3\">\n                                    <label class=\"question-label\">\n                                        <b>Nick Name</b>\n                                    </label>\n                                </div>\n                                <div class=\"col-sm-9 UserProfileDiscription\">\n                                    {{profile_data.admin_nick_name}}\n                                </div>\n                            </div> -->\n\n                            <div *ngIf=\"profile_data.admin_email\" class=\"row\">\n                                <div class=\"col-sm-3\">\n                                    <label class=\"question-label\">\n                                        <b>Email</b>\n                                    </label>\n                                </div>\n                                <div class=\"col-sm-9 UserProfileDiscription\">\n                                    {{profile_data.admin_email}}\n                                </div>\n                            </div>\n                            <div *ngIf=\"profile_data.admin_cell_phone\" class=\"row\">\n                                <div class=\"col-sm-3\">\n                                    <label class=\"question-label\">\n                                        <b>Cell Phone</b>\n                                    </label>\n                                </div>\n                                <div class=\"col-sm-9 UserProfileDiscription\">\n                                    {{profile_data.admin_cell_phone}}\n                                </div>\n                            </div>\n                            <div *ngIf=\"profile_data.admin_fax\" class=\"row\">\n                                <div class=\"col-sm-3\">\n                                    <label class=\"question-label\">\n                                        <b>Fax</b>\n                                    </label>\n                                </div>\n                                <div class=\"col-sm-9 UserProfileDiscription\">\n                                    {{profile_data.admin_fax}}\n                                </div>\n                            </div>\n\n                            <div *ngIf=\"profile_data.admin_work_phone\" class=\"row\">\n                                <div class=\"col-sm-3\">\n                                    <label class=\"question-label\">\n                                        <b>Work Phone</b>\n                                    </label>\n                                </div>\n                                <div class=\"col-sm-9 UserProfileDiscription\">\n                                    {{profile_data.admin_work_phone}}\n                                </div>\n                            </div>\n                        </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </form>\n    </div>            \n</div>\n"

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
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var src_app_socket_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/socket.service */ "./src/app/socket.service.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _profileedit_profileedit_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../profileedit/profileedit.component */ "./src/components/profileedit/profileedit.component.ts");
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
    function ProfileDetailsComponent(httpService, formBuilder, route, sanitizer, ss, modalService) {
        var _this = this;
        this.httpService = httpService;
        this.formBuilder = formBuilder;
        this.route = route;
        this.sanitizer = sanitizer;
        this.ss = ss;
        this.modalService = modalService;
        this.edit_mode = false;
        this.my_profile = false;
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
        this.profile_data = undefined;
        this.choice_fields = {};
        this.modified_profile_data = {};
        this.submitted = false;
        this.admin_info = false;
        this.next = '';
        this.prev = '';
        this.base_url = '';
        this.type = '';
        this.type_breadCrumb = '';
        // add_resume(){
        // 	$('.add_resume').trigger('click');
        // }
        this.bio_html = undefined;
        this.edit_mode = false;
        this.profile_data = {};
        this.profile_data.login = this.last_login;
        this.socketService = this.ss;
        this.route.params.subscribe(function (params) { return _this.get_data(); });
    }
    ProfileDetailsComponent.prototype.on_file_drop = function (container, file_object) {
        var obj_this = this;
        var cls = $(container).attr('holdertype');
        if (obj_this.profile_data[cls]) {
            obj_this.profile_data[cls] = file_object.data;
            obj_this.modified_profile_data[cls] = file_object.data;
        }
    };
    ProfileDetailsComponent.prototype.open = function (section) {
        var obj_this = this;
        var modalRef = this.modalService.open(_profileedit_profileedit_component__WEBPACK_IMPORTED_MODULE_7__["ProfileeditComponent"]);
        modalRef.componentInstance.edit_info = {
            section: section,
            user_id: this.route.snapshot.params.id
        };
        function on_modal_opened(a) {
            if (a == 'saved') {
                obj_this.get_data();
            }
        }
        modalRef.result.then(on_modal_opened, function () { });
    };
    ProfileDetailsComponent.prototype.edit_personal_info = function () {
        var config = {
            on_load: function () {
                $(document).ready(function () {
                    $('#signModal .modal-body').html("\n\t\t\t\t\t\t<div class=\"row label-control-form\">\n\t\t\t\t\t\t\t<div class=\"container\">\n\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t<label for=\"name\">\n\t\t\t\t\t\t\t\t\t\t<b>First Name</b>\n\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t\t<input type=\"text\" placeholder=\"Enter First Name\" id=\"first_name\">\n\t\t\t\t\t\t\t\t\t\t<label for=\"name\">\n\t\t\t\t\t\t\t\t\t\t\t<b>Last Name</b>\n\t\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t\t<input type=\"text\" placeholder=\"Enter Last Name\" id=\"last_name\">\n\t\t\t\t\t\t\t\t\t<label for=\"c-phone\">\n\t\t\t\t\t\t\t\t\t\t<b>Cell Phone</b>\n\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t\t<input type=\"text\" placeholder=\"Enter Cell Phone\" id=\"c-phone\" required>\n\t\t\t\t\t\t\t\t\t<label for=\"email\">\n\t\t\t\t\t\t\t\t\t\t<b>Email</b>\n\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t\t<input type=\"text\" placeholder=\"Enter Email\" id=\"email\">\n\t\t\t\t\t\t\t\t\t<label for=\"location\">\n\t\t\t\t\t\t\t\t\t\t\t<b>Location</b>\n\t\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<input type=\"text\" placeholder=\"Enter Location\" id=\"location\">\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t");
                });
            },
            on_save: function () {
            }
        };
        window['init_popup'](config);
    };
    ProfileDetailsComponent.prototype.addFile = function (event, filter) {
        var obj_this = this;
        var element = event.target;
        // console.log(element)
        var file = element.files[0];
        var fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = function () {
            if (filter === 'profile') {
                obj_this.profile_data['image'] = fileReader.result;
                obj_this.modified_profile_data['image'] = fileReader.result;
            }
            else if (filter === 'admin') {
                obj_this.profile_data['admin_image'] = fileReader.result;
                obj_this.modified_profile_data['admin_image'] = fileReader.result;
            }
            else {
                obj_this.modified_profile_data['resume'] = fileReader.result;
            }
            obj_this.resumeUpload();
        };
        fileReader.onerror = function (error) {
            console.log('Error: ', error);
        };
    };
    ProfileDetailsComponent.prototype.resumeUpload = function () {
        this.submitted = true;
        var obj_this = this;
        var form_data = obj_this.modified_profile_data;
        var input_data = {};
        for (var key in form_data) {
            if (obj_this.modified_profile_data[key] != '')
                input_data[key] = obj_this.modified_profile_data[key];
        }
        input_data['user_id'] = obj_this.route.snapshot.params.id;
        var args = {
            app: 'meetings',
            model: 'Profile',
            method: 'update_profile',
            post: 1,
        };
        var final_input_data = {
            params: input_data,
            args: args
        };
        this.httpService.post(final_input_data, function (data) {
            obj_this.get_data();
        }, function (error) {
            var x = document.getElementById('slot-select-error');
            if (x) {
                x.className = 'snackbar-error show';
                setTimeout(function () {
                    x.className = x.className.replace('show', '');
                }, 3000);
            }
        });
    };
    ProfileDetailsComponent.prototype.get_data = function () {
        var obj_this = this;
        var id = this.route.snapshot.params.id;
        var input_data = undefined;
        if (id == obj_this.socketService.user_data.id || id == undefined) {
            obj_this.my_profile = true;
        }
        input_data =
            {
                id: id,
                type: this.type
            };
        var args = {
            app: 'meetings',
            model: 'Profile',
            method: 'get_details'
        };
        input_data = {
            params: input_data,
            args: args
        };
        var success_cb = function (result) {
            obj_this.base_url = window['site_config'].server_base_url;
            if (result.profile.admin_email || result.profile.admin_cell_phone
                || result.profile.admin_fax || result.profile.admin_work_phone
                || result.profile.admin_image || result.profile.admin_first_name
                || result.profile.admin_last_name || result.profile.admin_nick_name) {
                obj_this.admin_info = true;
            }
            // console.log(result);
            if (result.choice_fields) {
                obj_this.choice_fields = result.choice_fields;
            }
            obj_this.profile_data['resume'] = null;
            for (var key in result.profile) {
                obj_this.profile_data[key] = result.profile[key];
            }
            if (result.profile.image) {
                result.profile.image = obj_this.base_url + result.profile.image;
            }
            if (result.profile.bio) {
                obj_this.bio_html = obj_this.sanitizer.bypassSecurityTrustHtml(result.profile.bio);
            }
            if (!obj_this.type_breadCrumb) {
                obj_this.type = result.profile.group.toLowerCase();
                obj_this.type_breadCrumb = obj_this.type;
                if (obj_this.type_breadCrumb != 'staff') {
                    obj_this.type_breadCrumb = obj_this.type_breadCrumb + 's';
                }
            }
        };
        var failure_cb = function (error) {
        };
        this.httpService.get(input_data, success_cb, failure_cb);
    };
    ProfileDetailsComponent.prototype.init_sign = function () {
        var obj_this = this;
        var sign_config = {
            signature_data: obj_this.profile_data.signature_data,
            on_signed: function (signature_data) {
                obj_this.profile_data.signature_data = signature_data;
                obj_this.httpService.post({
                    args: {
                        app: 'meetings',
                        model: 'Profile',
                        method: 'save_signature',
                        post: 1,
                    },
                    params: {
                        signature_data: signature_data,
                        user_id: obj_this.route.snapshot.params.id
                    }
                }, null, function () {
                });
            }
        };
        window['init_sign'](sign_config);
    };
    ProfileDetailsComponent.prototype.ngOnInit = function () {
    };
    ProfileDetailsComponent.prototype.ngOnChanges = function () {
        console.log("ngOnChanges");
    };
    ProfileDetailsComponent.prototype.ngDoCheck = function () {
    };
    ProfileDetailsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            styles: [__webpack_require__(/*! ./profiledetails.css */ "./src/components/profiledetails/profiledetails.css")],
            template: __webpack_require__(/*! ./profiledetails.component.html */ "./src/components/profiledetails/profiledetails.component.html"),
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["DomSanitizer"],
            src_app_socket_service__WEBPACK_IMPORTED_MODULE_5__["SocketService"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModal"]])
    ], ProfileDetailsComponent);
    return ProfileDetailsComponent;
}());



/***/ }),

/***/ "./src/components/profiledetails/profiledetails.css":
/*!**********************************************************!*\
  !*** ./src/components/profiledetails/profiledetails.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".ProfileUserNameJonbWrapper{\n\ttext-align:center;\n}\n.UserProfileNameTittle{\n\tcolor:#3059C9;\n\tfont-size:25px;\n}\n.UserProfileDiscripTittle{\n\tcolor:#444444;\n\tfont-size:16px;\n}\n.details-card h3{\n    margin: 25px 0;\n    font-size: 1.7em;\n}\n.label-control-form label{\n    padding-top: 7px;\n}\ninput[type=text], input[type=password] {\n    width: 100%;\n    padding:0 10px;\n    margin: 5px 0 15px 0;\n    display: block;\n    border: 1px solid #dedee8;\n    height: 40px;\n    line-height: 40px;\n}\ninput[type=text]:focus, input[type=password]:focus {\n    background-color: #ddd;\n    outline: none;\n}\nhr {\n    border: 1px solid #f1f1f1;\n    margin: 25px 0 25px 0;\n}\n/* Set a style for all buttons */\nbutton {\n    background-color: #4CAF50;\n    color: white;\n    padding: 14px 20px;\n    margin: 8px 0;\n    border: none;\n    cursor: pointer;\n    width: 100%;\n    opacity: 0.9;\n}\nbutton:hover {\n    opacity:1;\n}\n/* Extra styles for the cancel button */\n.cancelbtn {\n    padding: 14px 20px;\n    background-color: #f44336;\n}\n/* Float cancel and signup buttons and add an equal width */\n.cancelbtn {\n    float: left;\n    width: 100%;\n}\n.signupbtn {\n    width: 100%;\n}\n/* Add padding to container elements */\n/* Clear floats */\n.clearfix::after {\n    content: \"\";\n    clear: both;\n    display: table;\n}\n/* Change styles for cancel button and signup button on extra small screens */\n@media screen and (max-width: 300px) {\n    .cancelbtn, .signupbtn {\n        width: 100%;\n    }\n}\n/*Success Snackbar*/\n.snackbar-success {\n    visibility: hidden;\n    min-width: 250px;\n    margin-left: -125px;\n    background-color: #54C036;\n    color: #fff;\n    text-align: center;\n    border-radius: 2px;\n    padding: 16px;\n    position: fixed;\n    z-index: 1;\n    left: 50%;\n    bottom: 30px;\n    font-size: 17px;\n    z-index: 999;\n}\n.snackbar-success.show {\n    visibility: visible;\n    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;\n    animation: fadein 0.5s, fadeout 0.5s 2.5s;\n}\n@-webkit-keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n@keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n@-webkit-keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n@keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n/*ERROR SNACKBAR*/\n.snackbar-error {\n    visibility: hidden;\n    min-width: 250px;\n    margin-left: -125px;\n    background-color: #ff0033;\n    color: white;\n    text-align: center;\n    border-radius: 2px;\n    padding: 16px;\n    position: fixed;\n    z-index: 1;\n    left: 50%;\n    bottom: 30px;\n    font-size: 17px;\n    z-index: 999;\n}\n.snackbar-error.show {\n    visibility: visible;\n    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;\n    animation: fadein 0.5s, fadeout 0.5s 2.5s;\n}\n@-webkit-keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n@keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n@-webkit-keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n@keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n/*=============================\nlast-login-details\n=============================*/\n.last-login-details {\n    background: #f8f8f8;\n    padding-bottom: 10px;\n    /* box-shadow: 1px 1px 119px #00000038; */\n}\n.last-login-details h3 {\n    margin: 10px 0;\n    padding: 0;\n    color: #313030;\n}\n.last-login-details span {\n    display: block;\n    color: #797979;\n}\n.docwrappercontainer .resume-edit-control\n{\n    text-align: center;    \n    position: absolute;\n    top: -9px;\n    font-size: 20px;\n    right: 11px;\n}\n"

/***/ }),

/***/ "./src/components/profileedit/profileedit.component.css":
/*!**************************************************************!*\
  !*** ./src/components/profileedit/profileedit.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".ProfileUserNameJonbWrapper{\n\ttext-align:center;\n}\n.UserProfileNameTittle{\n\tcolor:#3059C9;\n\tfont-size:25px;\n}\n.UserProfileDiscripTittle{\n\tcolor:#444444;\n\tfont-size:16px;\n}\n.details-card h3{\n    margin: 25px 0;\n    font-size: 1.7em;\n}\n.label-control-form label{\n    padding-top: 7px;\n}\ninput[type=text], input[type=password] {\n    width: 100%;\n    padding:0 10px;\n    margin: 5px 0 15px 0;\n    display: block;\n    border: 1px solid #dedee8;\n    height: 40px;\n    line-height: 40px;\n}\ninput[type=text]:focus, input[type=password]:focus {\n    background-color: #ddd;\n    outline: none;\n}\nhr {\n    border: 1px solid #f1f1f1;\n    margin: 25px 0 25px 0;\n}\n/* Set a style for all buttons */\nbutton {\n    background-color: #4CAF50;\n    color: white;\n    padding: 14px 20px;\n    margin: 8px 0;\n    border: none;\n    cursor: pointer;\n    width: 100%;\n    opacity: 0.9;\n}\nbutton:hover {\n    opacity:1;\n}\n/* Extra styles for the cancel button */\n.cancelbtn {\n    padding: 14px 20px;\n    background-color: #f44336;\n}\n/* Float cancel and signup buttons and add an equal width */\n.cancelbtn {\n    float: left;\n    width: 100%;\n}\n.signupbtn {\n    width: 100%;\n}\n/* Add padding to container elements */\n/* Clear floats */\n.clearfix::after {\n    content: \"\";\n    clear: both;\n    display: table;\n}\n/* Change styles for cancel button and signup button on extra small screens */\n@media screen and (max-width: 300px) {\n    .cancelbtn, .signupbtn {\n        width: 100%;\n    }\n}\n/*Success Snackbar*/\n.snackbar-success {\n    visibility: hidden;\n    min-width: 250px;\n    margin-left: -125px;\n    background-color: #54C036;\n    color: #fff;\n    text-align: center;\n    border-radius: 2px;\n    padding: 16px;\n    position: fixed;\n    z-index: 1;\n    left: 50%;\n    bottom: 30px;\n    font-size: 17px;\n    z-index: 999;\n}\n.snackbar-success.show {\n    visibility: visible;\n    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;\n    animation: fadein 0.5s, fadeout 0.5s 2.5s;\n}\n@-webkit-keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n@keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n@-webkit-keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n@keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n/*ERROR SNACKBAR*/\n.snackbar-error {\n    visibility: hidden;\n    min-width: 250px;\n    margin-left: -125px;\n    background-color: #ff0033;\n    color: white;\n    text-align: center;\n    border-radius: 2px;\n    padding: 16px;\n    position: fixed;\n    z-index: 1;\n    left: 50%;\n    bottom: 30px;\n    font-size: 17px;\n    z-index: 999;\n}\n.snackbar-error.show {\n    visibility: visible;\n    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;\n    animation: fadein 0.5s, fadeout 0.5s 2.5s;\n}\n@-webkit-keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n@keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n@-webkit-keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n@keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n/*=============================\nlast-login-details\n=============================*/\n.last-login-details {\n    background: #f8f8f8;\n    padding-bottom: 10px;\n    /* box-shadow: 1px 1px 119px #00000038; */\n}\n.last-login-details h3 {\n    margin: 10px 0;\n    padding: 0;\n    color: #313030;\n}\n.last-login-details span {\n    display: block;\n    color: #797979;\n}\n/* input[type=\"date\"]:before {\n    position: absolute;\n    top: 3px; left: 3px;\n    content: attr(data-date);\n    display: inline-block;\n    color: black;\n} */\n/* input[type=\"date\"] {\n    position: relative;\n    width: 150px; height: 20px;\n    color: white;\n}\n\n\ninput[type=\"date\"]::-webkit-datetime-edit, input::-webkit-inner-spin-button, input::-webkit-clear-button {\n    display: none;\n}\n\ninput[type=\"date\"]::-webkit-calendar-picker-indicator {\n    position: absolute;\n    top: 3px;\n    right: 0;\n    color: black;\n    opacity: 1;\n} */\ninput[type=\"date\"] {\n    position: relative;\n}\n/* create a new arrow, because we are going to mess up the native one\nsee \"List of symbols\" below if you want another, you could also try to add a font-awesome icon.. */\ninput[type=\"date\"]:after {\n    content: \"\\25BC\"; \n    color: #555;\n    padding: 0 5px;\n}\n/* change color of symbol on hover */\ninput[type=\"date\"]:hover:after {\n    color: #bf1400;\n}\n/* make the native arrow invisible and stretch it over the whole field so you can click anywhere in the input field to trigger the native datepicker*/\ninput[type=\"date\"]::-webkit-calendar-picker-indicator {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    width: auto;\n    height: auto;\n    color: transparent;\n    background: transparent;\n}\n/* adjust increase/decrease button */\ninput[type=\"date\"]::-webkit-inner-spin-button {\n    z-index: 1;\n}\n/* adjust clear button */\ninput[type=\"date\"]::-webkit-clear-button {\n    z-index: 1;\n}\n.date-overlay{\n    position: absolute;\n    border: 0px;\n    padding: 5px;\n    margin: 3px 0px 0px 5px;\n}\n.docwrappercontainer .resume-edit-control\n{\n    text-align: center;    \n    position: absolute;\n    top: -9px;\n    font-size: 20px;\n    right: 11px;\n}\n.modal-footer\n{\n    display: none;\n}\n.modal-body .router-outlet {\n    height: calc(100vh - 130px);\n    overflow: auto;\n    padding-top: 5px;\n    margin: -16px;\n    padding: 10px;\n}\n.edit-buttons.edit-mode {\n    justify-content: center;\n    position: absolute;\n    z-index: 14;\n    width: 100%;\n    left: 15px;\n    bottom: -31px;\n    border-radius: 5px;\n    background: #fff;\n    border: 1px solid #ccc;\n    padding: 0;\n}"

/***/ }),

/***/ "./src/components/profileedit/profileedit.component.html":
/*!***************************************************************!*\
  !*** ./src/components/profileedit/profileedit.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <app-breadcrumb app=\"meetings\" model=\"{{type}}\"\nrid=\"{{profile_data.id}}\" *ngIf=\"my_profile && type_breadCrumb\"\nroutes='[{\"title\":\"{{type_breadCrumb}}\", \"link\":\"/profiles/{{type_breadCrumb}}\"}]'\ntitle=\"{{profile_data.name}}\"></app-breadcrumb>\n-->\n\n<div class=\"modal-header\">\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"activeModal.dismiss('Cross click')\">\n        <span aria-hidden=\"true\">&times;</span>\n    </button>\n</div>\n<div class=\"modal-body\">\n\n\n<div class=\"router-outlet\">\n    <div class=\"container\">\n        <div class=\"details-card edit-mode\" *ngIf=\"edit_mode\">\n            <div class=\"row edit-buttons edit-mode\">\n                <a class=\"btn btn-primary cancel\" (click)=\"onCancel()\" type=\"button\">Cancel</a>\n                <a class=\"btn btn-primary save\" (click)=\"onSubmit()\" type=\"submit\">Save</a>\n            </div>\n            <div *ngIf=\"section=='personal'\" class=\"\">\n                <div class=\"ProFileHeadWrap\">\n                    PERSONAL INFO\n                </div>\n                <div class=\"row label-control-form\">\n                    <div class=\"container\">\n                        <div>\n                            <div class=\"row\">\n                                <div class=\"col-sm-2 UserProfileDiscription mb-4\">\n                                    <i class=\"far fa-edit\" (click)=\"update_image()\"></i>\n                                    <div *ngIf=\"modified_profile_data.image\">\n                                        <img class=\"img-thumbnail-lg\" src=\"{{modified_profile_data.image}}\">\n                                    </div>\n                                    <div *ngIf=\"!modified_profile_data.image\">\n                                        <img *ngIf=\"profile_data.image\" class=\"img-thumbnail-lg\" src=\"{{socketService.server_url}}{{profile_data.image}}\">\n                                        <img *ngIf=\"!profile_data.image\" class=\"img-thumbnail-lg\" src=\"static/assets/images/no-profile.png\">\n                                    </div>\n                                    <input class=\"pt-3 update_image\" style=\"display: none\" (change)=\"addFile($event, 'profile')\" type=\"file\" name=\"pic\" accept=\"image/*\">\n                                </div>\n                            </div>\n                            <div class=\"row\" *ngIf=\"last_login.login_time\">\n                                <div class=\"row last-login-details\">\n                                    <div class=\"col-sm-12\">\n                                        <h3>Last Login Details</h3>\n                                        <span *ngIf=\"last_login.login_time\">Login Time: {{last_login.login_time | date:'MMM dd,yyyy hh:mm:ss A'}}</span>\n                                        <span *ngIf=\"last_login.platform\">OS: {{last_login.platform}}</span>\n                                        <span *ngIf=\"last_login.browser\">Browser: {{last_login.browser}}</span>\n                                        <span *ngIf=\"last_login.ip\">IP: {{last_login.ip}}</span>\n                                        <span *ngIf=\"last_login.location\">Location: {{last_login.location}}</span>\n                                    </div>\n                                </div>\n                            </div>\n                                \n                            </div>\n                        <div class=\"row\">\n                            <label for=\"name\">\n                                <b>First Name</b>\n                            </label>\n                            <input value=\"{{profile_data.first_name}}\" (change)=\"modified_profile_data.first_name = $event.target.value\"\n                                type=\"text\" placeholder=\"Enter First Name\" id=\"first_name\">\n                                <label for=\"name\">\n                                    <b>Last Name</b>\n                                </label>\n                            <input value=\"{{profile_data.last_name}}\" (change)=\"modified_profile_data.last_name = $event.target.value\"\n                                type=\"text\" placeholder=\"Enter Last Name\" id=\"last_name\">\n                            <label for=\"c-phone\">\n                                <b>Cell Phone</b>\n                            </label>\n                            <input value=\"{{profile_data.mobile_phone}}\" (change)=\"mobile_phone_change($event.target.value)\"\n                                type=\"text\" placeholder=\"Enter Cell Phone\" id=\"c-phone\" required>\n                            <label for=\"email\">\n                                <b>Email</b>\n                            </label>\n                            <input value=\"{{profile_data.email}}\" [readonly]=\"true\" (change)=\"modified_profile_data.email = $event.target.value\"\n                                type=\"text\" placeholder=\"Enter Email\" id=\"email\">\n                            <label for=\"birth_date\">\n                                <b>Date of Birth</b>\n                            </label>\n                            <input value=\"{{profile_data.birth_date}}\" (change)=\"modified_profile_data.birth_date = $event.target.value\"\n                                class=\"form-control\" data-date-format=\"YYYY-MM-DD\" type=\"date\" placeholder=\"Enter Date of Birth\" id=\"birth_date\">\n                            <label for=\"location\">\n                                    <b>Location</b>\n                                </label>\n            \n                            <input value=\"{{profile_data.location}}\" (change)=\"modified_profile_data.location = $event.target.value\"\n                                type=\"text\" placeholder=\"Enter Location\" id=\"location\">\n                            <div *ngIf=\"my_profile && choice_fields.two_factor_auth\" class=\"row\">\n                                <div class=\"col-sm-8\">\n                                    <label for=\"ethnicity\">\n                                        <b>Two Factor Authentication</b>\n                                    </label>\n                                </div>\n                                <div class=\"col-sm-9 UserProfileDiscription\">\n                                    <!-- <select (change)=\"modified_profile_data.ethnicity = $event.target.value\" id='ethnicity' requeired>\n                                        <option *ngFor=\"let row of choice_fields.ethnicity\" value=\"{{row.id}}\" [selected]=\"row.id === profile_data.ethnicity.id\">{{row.name}}</option>\n                                    </select> -->\n\n                                    <ng-select\n                                    [items]=\"choice_fields.two_factor_auth\"\n                                    [multiple]=\"false\"\n                                    [closeOnSelect]=\"true\"\n                                    [hideSelected]=\"true\"\n                                    bindLabel=\"name\"\n                                    (change)=\"setTowFactorAuth()\"\n                                    placeholder=\"Select Authentication Type\"\n                                    [(ngModel)]=\"selectedTwoFactorAuth\"\n                                    >\n                                    </ng-select>\n\n                                </div>\n                            </div>\n                        </div>\n                        <div *ngIf=\"profile_data.resume\"  class=\"row docwrappercontainer\">\n                            <div class=\"col-sm-12\">\n                                <h3>Resume</h3>\n                            </div>\n                            <div class=\"col-sm-12 mb-4\">\n                                <div *ngIf=\"delete_confirm\">\n                                    <span>Do you really want to delete this resume?</span>\n                                    <button class=\"btn btn-primary\" (click)=\"delete_confirmed()\">Yes</button>\n                                    <button class=\"btn btn-primary\" (click)=\"delete_cancelled()\">No</button>\n                                </div>\n                                <a routerLink=\"/resume/doc/{{profile_data.resume.id}}\">\n                                    <div class=\"DocumentWrapper\">\n                                        <div class=\"DocIcon\">\n                                            <span class=\"rounded-circle\">\n                                                <i class=\"icon-doc-file\"></i>\n                                            </span>\n                                        </div>\n                                        <div class=\"DocInfoVertical text-truncate\">\n                                            {{profile_data.resume.name}}\n                                        </div>\n                                    </div>\n                                </a>\n                                <div class=\"resume-edit-control\">\n                                    <a class=\"edit link\" (click)=\"edit_resume($event.target)\">\n                                        <i style=\"margin-right: 10px\" class=\"far fa-trash-alt\"></i>\n                                        <i class=\"far fa-edit\"></i>\n                                    </a>\n                                    <input (change)=\"addFile($event, '')\" \n                                    type=\"file\" \n                                    name=\"edit_resume\" \n                                    class='edit_resume' style=\"display: none\"/>\n                                </div>\n                            </div>\n                        </div>\n                        <div *ngIf=\"!profile_data.resume\"  class=\"row docwrappercontainer\">\n                            <div>\n                                <a style=\"position: inherit !important\" class=\"edit link resume-edit-control\" (click)=\"add_resume()\">\n                                    <i class=\"far fa-edit\"></i>\n                                    Add Resume\n                                </a>\n                                <input (change)=\"addFile($event, '')\" \n                                type=\"file\" \n                                name=\"add_resume\" \n                                class='add_resume' style=\"display: none\"/>\n                            </div>\n                        </div>\n                        <div *ngIf=\"profile_data && my_profile\" class=\"\">\n                            <div class=\"\">\n                                <a href=\"javascript:void(0);\" (click)='init_sign()' class=\"UpdateAddSignBtn\">\n                                    <i class=\"fa fa-pen\"></i>\n                                    <span  *ngIf=\"profile_data && profile_data.signature_data\">Update </span>\n                                    <span  *ngIf=\"profile_data && !profile_data.signature_data\">Add </span>\n                                    Signature\n                                </a>\n                            </div>\n                            <div class=\"col-sm-9\" style=\"display: flex;\">\n                                <div style=\"position:relative;cursor: pointer;\">\n                                    <img class=\"strt_sign profile \" style=\"width: 100%;\"\n                                        *ngIf=\"profile_data.signature_data\"\n                                        src=\"data:image/png;base64,{{profile_data.signature_data}}\"\n                                    />\n        \n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div *ngIf=\"section=='bio'\" class=\"\">\n                <div class=\"ProFileHeadWrap\">\n                    Bio\n                </div>\n                <div class=\"row label-control-form\">\n                    <div class=\"container\">\n                        <div class=\"row\">\n                            <label for=\"bio\">\n                                <b>Bio</b>\n                            </label>\n                            <textarea value=\"{{profile_data.bio}}\" (change)=\"modified_profile_data.bio = $event.target.value\"\n                            class=\"form-control\" placeholder=\"Enter Bio\" id=\"bio\">\n\n                            </textarea>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div *ngIf=\"section=='work'\" class=\"\">\n                <div class=\"ProFileHeadWrap\">\n                    WORK INFO\n                </div>\n                <div class=\"row label-control-form\">\n                    <div class=\"container\">\n                        <div class=\"row\">\n                            <label for=\"company\">\n                                <b>Company</b>\n                            </label>\n                            <input value=\"{{profile_data.company}}\" (change)=\"modified_profile_data.company = $event.target.value\"\n                                type=\"text\" placeholder=\"Enter Company\" id=\"company\">\n                            <label for=\"job-title\">\n                                <b>Job Title</b>\n                            </label>\n                            <input value=\"{{profile_data.job_title}}\" (change)=\"modified_profile_data.job_title = $event.target.value\"\n                                type=\"text\" placeholder=\"Enter Job Title\" id=\"job_title\">\n                            <label for=\"department\">\n                                <b>Department</b>\n                            </label>\n                            <input value=\"{{profile_data.department}}\" (change)=\"modified_profile_data.department = $event.target.value\"\n                                type=\"text\" placeholder=\"Enter Department\" id=\"department\" required>\n                            <label for=\"work_phone\">\n                                <b>Work Phone</b>\n                            </label>\n                            <input value=\"{{profile_data.work_phone}}\" (change)=\"modified_profile_data.work_phone = $event.target.value\"\n                                type=\"text\" placeholder=\"Enter Work Phone\" id=\"work_phone\">\n                            <label for=\"fax\">\n                                    <b>Fax</b>\n                                </label>\n            \n                            <input value=\"{{profile_data.fax}}\" (change)=\"modified_profile_data.fax = $event.target.value\"\n                                type=\"text\" placeholder=\"Enter Fax\" id=\"fax\">\n                            <label for=\"website\">\n                                <b>Website</b>\n                            </label>\n        \n                            <input value=\"{{profile_data.website}}\" (change)=\"modified_profile_data.website = $event.target.value\"\n                                type=\"text\" placeholder=\"Enter Website\" id=\"website\">\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div *ngIf=\"profile_data && socketService.is_admin && section=='board'\" class=\"\">\n                <div class=\"ProFileHeadWrap\">\n                    BOARD INFO\n                </div>\n                <div class=\"label-control-form board-info-container\">\n                    <div class=\"UserProfileDiscription\">                                \n                        <ng-select\n                        [items]=\"choice_fields.committees\"\n                        [multiple]=\"true\"\n                        [closeOnSelect]=\"false\"\n                        [hideSelected]=\"true\"\n                        bindLabel=\"name\"\n                        [searchable] = \"true\"\n                        (change)=\"setCommittees()\"\n                        placeholder=\"Select Committees\"\n                        [(ngModel)]=\"selectedCommittees\"\n                        >\n                        </ng-select>\n                    </div>\n                    <div class=\"\">\n                        <label for=\"board_joining_date\">\n                            <b>Board Joining Date</b>\n                        </label>\n                        <input class=\"form-control\" value=\"{{profile_data.board_joining_date}}\" (change)=\"modified_profile_data.board_joining_date = $event.target.value\"\n                            type=\"date\" data-date-format=\"YYYY-MM-DD\" placeholder=\"Enter Board Joining Date\" id=\"board_joining_date\" required>\n                    <div class=\"\">\n                        <label for=\"term_start_date\">\n                            <b>Term Start Date</b>\n                        </label>\n                            <input value=\"{{profile_data.term_start_date}}\" (change)=\"modified_profile_data.term_start_date = $event.target.value\"\n                            class=\"form-control\" data-date-format=\"YYYY-MM-DD\"  type=\"date\" placeholder=\"Enter Term Start Date\" id=\"term_start_date\" required>\n                    </div>\n                    <div class=\"\">\n                        <label for=\"term_end_date\">\n                            <b>Term End Date</b>\n                        </label>\n                        <input value=\"{{profile_data.term_end_date}}\" (change)=\"modified_profile_data.term_end_date = $event.target.value\"\n                            class=\"form-control\" data-date-format=\"YYYY-MM-DD\" type=\"date\" placeholder=\"Enter End Start Date\" id=\"term_end_date\" required>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div *ngIf=\"(my_profile || socketService.is_admin) && section == 'diversity'\" class=\"\">\n                <div class=\"ProFileHeadWrap\">\n                    DIVERSITY INFO\n                </div>\n                <div>\n                    <div class=\"container\">\n                        <div>\n                            <div class=\"row\" *ngIf=\"choice_fields.ethnicity\">\n                                <div class=\"col-sm-3\">\n                                    <label for=\"ethnicity\">\n                                        <b>Ethnicity</b>\n                                    </label>\n                                </div>\n                                <div class=\"col-sm-9 UserProfileDiscription\">\n                                    <!-- <select (change)=\"modified_profile_data.ethnicity = $event.target.value\" id='ethnicity' requeired>\n                                        <option *ngFor=\"let row of choice_fields.ethnicity\" value=\"{{row.id}}\" [selected]=\"row.id === profile_data.ethnicity.id\">{{row.name}}</option>\n                                    </select> -->\n\n                                    <ng-select\n                                    [items]=\"choice_fields.ethnicity\"\n                                    [multiple]=\"false\"\n                                    [closeOnSelect]=\"true\"\n                                    [hideSelected]=\"true\"\n                                    bindLabel=\"name\"\n                                    (change)=\"setEthnicity()\"\n                                    placeholder=\"Select Ethnicity\"\n                                    [(ngModel)]=\"selectedEthnicity\"\n                                    >\n                                    </ng-select>\n\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-sm-3\">\n                                    <label for=\"gender\">\n                                        <b>Gender</b>\n                                    </label>\n                                </div>\n                                <div class=\"col-sm-9 UserProfileDiscription\">\n                                    <!-- <select (change)=\"modified_profile_data.gender = $event.target.value\" id='gender' requeired>\n                                        <option *ngFor=\"let row of choice_fields.gender\" value=\"{{row.id}}\" [selected]=\"row.id === profile_data.gender.id\">{{row.name}}</option>\n                                    </select> -->\n                                    <ng-select\n                                    [items]=\"choice_fields.gender\"\n                                    [multiple]=\"false\"\n                                    [closeOnSelect]=\"true\"\n                                    [hideSelected]=\"true\"\n                                    bindLabel=\"name\"\n                                    (change)=\"setGender()\"\n                                    placeholder=\"Select Gender\"\n                                    [(ngModel)]=\"selectedGender\"\n                                    >\n                                    </ng-select>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-sm-3\">\n                                    <label for=\"veteran\">\n                                        <b>Veteran</b>\n                                    </label>\n                                </div>\n                                <div class=\"col-sm-9 UserProfileDiscription\">\n                                    <!-- <select (change)=\"modified_profile_data.veteran = $event.target.value\" id='gender' requeired>\n                                        <option *ngFor=\"let row of choice_fields.veteran\" value=\"{{row.id}}\" [selected]=\"row.id === profile_data.veteran.id\">{{row.name}}</option>\n                                    </select> -->\n                                    <ng-select\n                                    [items]=\"choice_fields.veteran\"\n                                    [multiple]=\"false\"\n                                    [closeOnSelect]=\"true\"\n                                    [hideSelected]=\"true\"\n                                    bindLabel=\"name\"\n                                    (change)=\"setVeteran()\"\n                                    placeholder=\"Select Veteran\"\n                                    [(ngModel)]=\"selectedVeteran\"\n                                    >\n                                    </ng-select>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-sm-3\">\n                                    <label for=\"disability\">\n                                        <b>Disability</b>\n                                    </label>\n                                </div>\n                                <div class=\"col-sm-9 UserProfileDiscription\">\n                                    <!-- <select (change)=\"modified_profile_data.disability = $event.target.value\" id='disability' requeired>\n                                        <option *ngFor=\"let row of choice_fields.disability\" value=\"{{row.id}}\" [selected]=\"row.id === profile_data.disability.id\">{{row.name}}</option>\n                                    </select> -->\n                                    <ng-select\n                                    [items]=\"choice_fields.disability\"\n                                    [multiple]=\"false\"\n                                    [closeOnSelect]=\"true\"\n                                    [hideSelected]=\"true\"\n                                    bindLabel=\"name\"\n                                    (change)=\"setDisability()\"\n                                    placeholder=\"Select Disability\"\n                                    [(ngModel)]=\"selectedDisability\"\n                                    >\n                                    </ng-select>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div *ngIf=\"section == 'administrative'\" class=\"\">\n                <div class=\"ProFileHeadWrap\">\n                    ADMINISTRATIVE ASSISTANT\n                </div>\n                <div class=\"row label-control-form\">\n                    <div class=\"container\">\n                        <div class=\"row\">\n                            <div *ngIf=\"modified_profile_data.admin_image\" class=\"col-sm-2 mb-4\">\n                                <img *ngIf=\"modified_profile_data.admin_image\" class=\"img-thumbnail-lg\" src=\"{{modified_profile_data.admin_image}}\">\n                                <img *ngIf=\"!modified_profile_data.admin_image\" class=\"img-thumbnail-lg\" src=\"static/assets/images/no-profile.png\">\n                                <input class=\"pt-3\" (change)=\"addFile($event, 'admin')\" type=\"file\" name=\"pic\" accept=\"image/*\">\n                            </div>\n                            <div *ngIf=\"!modified_profile_data.admin_image\" class=\"col-sm-2 mb-4\">\n                                <img *ngIf=\"profile_data.admin_image\" class=\"img-thumbnail-lg\" src=\"{{socketService.server_url}}{{profile_data.admin_image}}\">\n                                <img *ngIf=\"!profile_data.admin_image\" class=\"img-thumbnail-lg\" src=\"static/assets/images/no-profile.png\">\n                                <input class=\"pt-3\" (change)=\"addFile($event, 'admin')\" type=\"file\" name=\"pic\" accept=\"image/*\">\n                            </div>\n                            <label for=\"admin-first-name\">\n                                <b>First Name</b>\n                            </label>\n                            <input value=\"{{profile_data.admin_first_name}}\" (change)=\"modified_profile_data.admin_first_name = $event.target.value\"\n                                type=\"text\" placeholder=\"First Name\" required>\n                            <label for=\"admin-last-name\">\n                                <b>Last Name</b>\n                            </label>\n                            <input value=\"{{profile_data.admin_last_name}}\" (change)=\"modified_profile_data.admin_last_name = $event.target.value\"\n                                type=\"text\" placeholder=\"Last Name\" required>\n                            <!-- <label for=\"admin-nick-name\">\n                                <b>Nick Name</b>\n                            </label>\n                            <input value=\"{{profile_data.admin_nick_name}}\" (change)=\"modified_profile_data.admin_nick_name = $event.target.value\"\n                                type=\"text\" placeholder=\"Nick Name\" required> -->\n                            <label for=\"admin-e-mail\">\n                                <b>E-mail</b>\n                            </label>\n                            <input value=\"{{profile_data.admin_email}}\" (change)=\"modified_profile_data.admin_email = $event.target.value\"\n                                type=\"text\" id=\"admin-e-mail\" placeholder=\"\" required>\n                            <label for=\"admin-cell\">\n                                <b>Mobile Phone</b>\n                            </label>\n                            <input value=\"{{profile_data.admin_cell_phone}}\" (change)=\"modified_profile_data.admin_cell_phone = $event.target.value\"\n                                type=\"text\" placeholder=\"\" id=\"admin-cell\" required>\n                            <label for=\"admin-fax\">\n                                <b>Fax</b>\n                            </label>\n                            <input value=\"{{profile_data.admin_fax}}\" (change)=\"modified_profile_data.admin_fax = $event.target.value\"\n                                type=\"text\" placeholder=\"\" id=\"admin-fax\" required>\n                            <label for=\"admin-work-phone\">\n                                <b>Work Phone</b>\n                            </label>\n                            <input value=\"{{profile_data.admin_work_phone}}\" (change)=\"modified_profile_data.admin_work_phone = $event.target.value\"\n                                type=\"text\" placeholder=\"\" id=\"admin-work-phone\" required>\n                            <label for=\"mail-to-assistant\">\n                                <b>Email To Assistant</b>\n                            </label>\n                            <input  checked=\"{{profile_data.mail_to_assistant}}\" (change)=\"mail_to_assistant_change($event.target.value)\"\n                                type=\"checkbox\" id=\"mail-to-assistant\" required>\n                            <!-- <label for=\"mail-to-assistant\">\n                                <b>Mail to Assistant</b>\n                            </label>\n                            <select (change)=\"modified_profile_data.mail_to_assistant = $event.target.value\" id='mail_to_assistant' requeired>\n                                <option ng-value=\"true\" [selected]=\"true == profile_data.mail_to_assistant\">Yes</option>\n                                <option ng-value=\"false\" [selected]=\"null == profile_data.mail_to_assistant\">No</option>\n                            </select> -->\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div id=\"slot-select-success\" class=\"snackbar-success\">Successfully Saved Your Profile.</div>\n<div id=\"slot-select-error\" class=\"snackbar-error\">Something went wrong, Try Again After Some Time.</div>\n\n</div>\n<div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"activeModal.close('Close click')\">Close</button>\n  </div>"

/***/ }),

/***/ "./src/components/profileedit/profileedit.component.ts":
/*!*************************************************************!*\
  !*** ./src/components/profileedit/profileedit.component.ts ***!
  \*************************************************************/
/*! exports provided: ProfileeditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileeditComponent", function() { return ProfileeditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_http_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../app/http.service */ "./src/app/http.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var src_app_socket_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/socket.service */ "./src/app/socket.service.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ProfileeditComponent = /** @class */ (function () {
    function ProfileeditComponent(httpService, formBuilder, route, sanitizer, router, ss, activeModal) {
        this.httpService = httpService;
        this.formBuilder = formBuilder;
        this.route = route;
        this.sanitizer = sanitizer;
        this.router = router;
        this.ss = ss;
        this.activeModal = activeModal;
        this.edit_mode = true;
        this.my_profile = false;
        this.selectedEthnicity = [];
        this.section = '';
        this.delete_confirm = false;
        this.mobile_verification_code = undefined;
        this.user_id = undefined;
        this.selectedGender = [];
        this.selectedVeteran = [];
        this.selectedDisability = [];
        this.selectedTwoFactorAuth = [];
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
        this.profile_data = undefined;
        this.choice_fields = {};
        this.modified_profile_data = {};
        this.submitted = false;
        this.admin_info = false;
        this.next = '';
        this.prev = '';
        this.base_url = '';
        this.type = '';
        this.type_breadCrumb = '';
        this.bio_html = undefined;
        this.profile_data = {};
        this.profile_data.login = this.last_login;
        this.socketService = this.ss;
        // this.route.params.subscribe(params => this.get_data());
    }
    ProfileeditComponent.prototype.on_file_drop = function (container, file_object) {
        var obj_this = this;
        var cls = $(container).attr('holdertype');
        if (obj_this.profile_data[cls]) {
            obj_this.profile_data[cls] = file_object.data;
            obj_this.modified_profile_data[cls] = file_object.data;
        }
    };
    ProfileeditComponent.prototype.input_date_format = function () {
        setTimeout(function () {
            $('input[type="date"]').each(function (i, el) {
                // console.log($(el).position().top, 334);
                $(el).parent().css('position', 'relative');
                var prev_val = el.value;
                var overlay_style = 'position: absolute;';
                overlay_style += 'border: 0px;padding: 5px;margin: 3px 0px 0px 5px;';
                var overlay = $('<input class="date-overlay" style="' + overlay_style + '" value="' + prev_val + '" />');
                overlay.css({ left: $(el).position().left, top: $(el).position().top });
                overlay.focus(function () {
                    $(el).focus();
                });
                overlay.blur(function (e) {
                    if (prev_val != overlay.val() && (overlay.val().length == 10 || overlay.val().length == 0)) {
                        prev_val = overlay.val();
                        el.value = prev_val;
                    }
                });
                $(el).parent().append(overlay);
                $(el).change(function () {
                    if (!el.value) {
                        overlay.val('');
                        return;
                    }
                    var st_date = window['dt_functions'].standardDate(el.value);
                    prev_val = st_date;
                    overlay.val(st_date);
                });
            });
        }, 100);
    };
    ProfileeditComponent.prototype.addFile = function (event, filter) {
        var obj_this = this;
        var element = event.target;
        // console.log(element)
        var file = element.files[0];
        var fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = function () {
            if (filter === 'profile') {
                obj_this.profile_data['image'] = fileReader.result;
                obj_this.modified_profile_data['image'] = fileReader.result;
            }
            else if (filter === 'admin') {
                obj_this.profile_data['admin_image'] = fileReader.result;
                obj_this.modified_profile_data['admin_image'] = fileReader.result;
            }
            else {
                obj_this.modified_profile_data['resume'] = fileReader.result;
                obj_this.profile_data['resume'] = fileReader.result;
            }
            obj_this.resumeUpload();
        };
        fileReader.onerror = function (error) {
            console.log('Error: ', error);
        };
    };
    ProfileeditComponent.prototype.get_data = function () {
        var obj_this = this;
        var id = obj_this.edit_info.user_id;
        var input_data = undefined;
        if (id == obj_this.socketService.user_data.id || id == undefined) {
            obj_this.my_profile = true;
        }
        input_data =
            {
                id: id,
                type: this.type
            };
        var args = {
            app: 'meetings',
            model: 'Profile',
            method: 'get_details'
        };
        input_data = {
            params: input_data,
            args: args
        };
        var success_cb = function (result) {
            obj_this.base_url = window['site_config'].server_base_url;
            if (result.profile.admin_email || result.profile.admin_cell_phone
                || result.profile.admin_fax || result.profile.admin_work_phone
                || result.profile.admin_image || result.profile.admin_first_name
                || result.profile.admin_last_name || result.profile.admin_nick_name) {
                obj_this.admin_info = true;
            }
            if (result.choice_fields) {
                obj_this.choice_fields = result.choice_fields;
            }
            for (var key in result.profile) {
                obj_this.profile_data[key] = result.profile[key];
            }
            if (result.profile.image) {
                result.profile.image = obj_this.base_url + result.profile.image;
            }
            if (result.profile.bio) {
                obj_this.bio_html = obj_this.sanitizer.bypassSecurityTrustHtml(result.profile.bio);
            }
            if (result.profile.ethnicity.id) {
                obj_this.selectedEthnicity = result.profile.ethnicity;
            }
            if (result.profile.veteran.id) {
                obj_this.selectedVeteran = result.profile.veteran;
            }
            if (result.profile.gender.id) {
                obj_this.selectedGender = result.profile.gender;
            }
            if (result.profile.disability.id) {
                obj_this.selectedDisability = result.profile.disability;
            }
            if (result.profile.committees) {
                obj_this.selectedCommittees = result.profile.committees;
            }
            if (result.profile.two_factor_auth.id) {
                obj_this.selectedTwoFactorAuth = result.profile.two_factor_auth;
            }
            if (result.profile.mail_to_assistant) {
                $('#mail-to-assistant').prop('checked', true);
            }
            else {
                $('#mail-to-assistant').prop('checked', false);
            }
            if (!obj_this.type_breadCrumb) {
                obj_this.type = result.profile.group.toLowerCase();
                obj_this.type_breadCrumb = obj_this.type;
                if (obj_this.type_breadCrumb != 'staff') {
                    obj_this.type_breadCrumb = obj_this.type_breadCrumb + 's';
                }
            }
            obj_this.input_date_format();
        };
        var failure_cb = function (error) {
        };
        this.httpService.get(input_data, success_cb, failure_cb);
    };
    ProfileeditComponent.prototype.mail_to_assistant_change = function (value) {
        var obj_this = this;
        var mail_to_assistant = $('#mail-to-assistant').prop('checked');
        obj_this.modified_profile_data['mail_to_assistant'] = mail_to_assistant;
    };
    ProfileeditComponent.prototype.update_image = function () {
        $('.update_image:first').click();
    };
    ProfileeditComponent.prototype.resumeUpload = function () {
        this.submitted = true;
        var obj_this = this;
        var form_data = obj_this.modified_profile_data;
        var input_data = {};
        for (var key in form_data) {
            if (obj_this.modified_profile_data[key] != '')
                input_data[key] = obj_this.modified_profile_data[key];
        }
        input_data['user_id'] = obj_this.route.snapshot.params.id;
        var args = {
            app: 'meetings',
            model: 'Profile',
            method: 'update_profile',
            post: 1,
        };
        var final_input_data = {
            params: input_data,
            args: args
        };
        this.httpService.post(final_input_data, function (data) {
            obj_this.get_data();
        }, function (error) {
            var x = document.getElementById('slot-select-error');
            if (x) {
                x.className = 'snackbar-error show';
                setTimeout(function () {
                    x.className = x.className.replace('show', '');
                }, 3000);
            }
        });
    };
    ProfileeditComponent.prototype.mobile_phone_change = function (val) {
        this.modified_profile_data['mobile_verified'] = false;
        this.modified_profile_data['mobile_phone'] = val;
        this.profile_data.mobile_phone = val;
        this.profile_data.mobile_verified = false;
    };
    ProfileeditComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        var obj_this = this;
        var form_data = obj_this.modified_profile_data;
        var input_data = {};
        for (var key in form_data) {
            if (obj_this.profile_data[key] || obj_this.modified_profile_data[key]) {
                input_data[key] = obj_this.modified_profile_data[key];
            }
        }
        if (input_data['resume'] == 'removed') {
            input_data['resume'] = null;
        }
        input_data['user_id'] = obj_this.user_id;
        var args = {
            app: 'meetings',
            model: 'Profile',
            method: 'update_profile',
            post: 1,
        };
        var final_input_data = {
            params: input_data,
            args: args
        };
        this.httpService.post(final_input_data, function (data) {
            var obj_this = _this;
            if (obj_this.my_profile) {
                var profile = data.profile_data;
                var user_cookie = localStorage.getItem('user');
                var cuser = undefined;
                if (user_cookie) {
                    cuser = JSON.parse(user_cookie);
                }
                if (cuser) {
                    profile.token = cuser.token;
                    var value = JSON.stringify(profile);
                    localStorage.setItem('user', value);
                    obj_this.socketService.user_data.groups = profile.groups;
                    obj_this.socketService.user_data.name = profile.name;
                    obj_this.socketService.user_data.photo = profile.photo;
                    obj_this.socketService.user_photo = obj_this.base_url + profile.photo;
                }
            }
            // obj_this.router.navigate(['/my-profile']);
            obj_this.activeModal.close('saved');
        }, function (error) {
            var x = document.getElementById('slot-select-error');
            if (x) {
                x.className = 'snackbar-error show';
                setTimeout(function () {
                    x.className = x.className.replace('show', '');
                }, 3000);
            }
        });
    };
    ProfileeditComponent.prototype.delete_confirmed = function () {
        this.modified_profile_data['resume'] = 'removed';
        this.profile_data['resume'] = null;
        this.delete_confirm = false;
    };
    ProfileeditComponent.prototype.delete_cancelled = function () {
        this.delete_confirm = false;
    };
    ProfileeditComponent.prototype.add_resume = function () {
        $('.add_resume').trigger('click');
    };
    ProfileeditComponent.prototype.edit_resume = function (e) {
        var obj_this = this;
        if ($(e).hasClass('fa-trash-alt')) {
            obj_this.delete_confirm = true;
            return;
        }
        $('.edit_resume').trigger('click');
    };
    ProfileeditComponent.prototype.onCancel = function () {
        this.activeModal.close('Close click');
    };
    ProfileeditComponent.prototype.init_sign = function () {
        var obj_this = this;
        var sign_config = {
            signature_data: obj_this.profile_data.signature_data,
            on_signed: function (signature_data) {
                obj_this.profile_data.signature_data = signature_data;
                obj_this.httpService.post({
                    args: {
                        app: 'meetings',
                        model: 'Profile',
                        method: 'save_signature',
                        post: 1,
                    },
                    params: {
                        signature_data: signature_data
                    }
                }, null, function () {
                });
            }
        };
        window['init_sign'](sign_config);
    };
    ProfileeditComponent.prototype.setEthnicity = function () {
        if (!this.selectedEthnicity) {
            this.modified_profile_data['ethnicity'] = null;
        }
        else {
            this.modified_profile_data['ethnicity'] = this.selectedEthnicity['id'];
        }
    };
    ProfileeditComponent.prototype.setGender = function () {
        if (!this.selectedGender) {
            this.modified_profile_data['gender'] = null;
        }
        else {
            this.modified_profile_data['gender'] = this.selectedGender['id'];
        }
    };
    ProfileeditComponent.prototype.setVeteran = function () {
        if (!this.selectedVeteran) {
            this.modified_profile_data['veteran'] = null;
        }
        else {
            this.modified_profile_data['veteran'] = this.selectedVeteran['id'];
        }
    };
    ProfileeditComponent.prototype.setDisability = function () {
        if (!this.selectedDisability) {
            this.modified_profile_data['disability'] = null;
        }
        else {
            this.modified_profile_data['disability'] = this.selectedDisability['id'];
        }
    };
    ProfileeditComponent.prototype.setCommittees = function () {
        if (this.selectedCommittees.length) {
            this.modified_profile_data['committees'] = this.selectedCommittees;
        }
        else {
            this.modified_profile_data['committees'] = 'removed_all';
        }
    };
    ProfileeditComponent.prototype.setting_two_factor_auth = function () {
        var obj_this = this;
        if (!obj_this.profile_data.mobile_phone && !obj_this.modified_profile_data['mobile_phone']) {
            $('#c-phone').focus();
            obj_this.selectedTwoFactorAuth = [];
            return;
        }
        var args = {
            app: 'authsignup',
            model: 'AuthUser',
            method: 'send_mobile_verfication_code'
        };
        var final_input_data = {
            params: { mobile_phone: obj_this.profile_data.mobile_phone },
            args: args
        };
        console.log(final_input_data);
        obj_this.httpService.get(final_input_data, function (data) {
            obj_this.verification_id = data.uuid;
            var config = {
                on_load: function () {
                    obj_this.load_verification_popup();
                },
                on_save: function () {
                    obj_this.mobile_verification_code = $('#verification_code').val();
                    if (!obj_this.mobile_verification_code) {
                        obj_this.selectedTwoFactorAuth = [];
                        $('#code-error').show();
                    }
                    else {
                        var input_data = {
                            uuid: obj_this.verification_id,
                            verification_code: obj_this.mobile_verification_code,
                        };
                        var args_1 = {
                            app: 'authsignup',
                            model: 'AuthUser',
                            method: 'authenticate_mobile'
                        };
                        var final_input_data_1 = {
                            params: input_data,
                            args: args_1
                        };
                        obj_this.httpService.get(final_input_data_1, function (data) {
                            $('#code-error').hide();
                            obj_this.modified_profile_data['two_factor_auth'] = obj_this.selectedTwoFactorAuth['id'];
                            obj_this.modified_profile_data['mobile_verified'] = true;
                            $('#signModal').modal('hide');
                        }, function (err) {
                            $('#code-error').show();
                            $('#code-error').text(err);
                        });
                    }
                },
                on_close: function () {
                    obj_this.selectedTwoFactorAuth = obj_this.profile_data.two_factor_auth;
                    obj_this.selectedTwoFactorAuth = [];
                }
            };
            window['init_popup'](config);
        }, null);
    };
    ProfileeditComponent.prototype.setTowFactorAuth = function () {
        var obj_this = this;
        if (obj_this.selectedTwoFactorAuth) {
            if (!obj_this.profile_data.mobile_verified && obj_this.selectedTwoFactorAuth['name'].toLowerCase() == 'phone') {
                obj_this.setting_two_factor_auth();
            }
            else {
                this.modified_profile_data['two_factor_auth'] = obj_this.selectedTwoFactorAuth['id'];
            }
        }
        else {
            this.modified_profile_data['two_factor_auth'] = null;
        }
    };
    ProfileeditComponent.prototype.load_verification_popup = function () {
        setTimeout(function () {
            $('#signModal .modal-body').html("\n                <input type=\"text\" name=\"verification_code\" id=\"verification_code\"\n                placeholder=\"Please Enter Mobile Verification Code\"\n                class=\"form-control verification-code\" required/>\n                <small style=\"display: none;\" id=\"code-error\" class=\"text-danger\">\n                    You can not select tow factor authentication type phone untill you verify your phone number\n                </small>\n            ");
            $('#verification_code').keyup(function (e) {
                if (e.keyCode == 13) {
                    $('#save-sig').click();
                }
                if (!$(this).val()) {
                    $('#code-error').show();
                    $('#code-error').text('Please Provide a verification code.');
                }
                else {
                    $('#code-error').hide();
                }
            });
        }, 100);
    };
    ProfileeditComponent.prototype.ngOnInit = function () {
        if (this.edit_info) {
            this.section = this.edit_info.section;
            this.user_id = this.edit_info.user_id;
            this.get_data();
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ProfileeditComponent.prototype, "edit_info", void 0);
    ProfileeditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-profileedit',
            template: __webpack_require__(/*! ./profileedit.component.html */ "./src/components/profileedit/profileedit.component.html"),
            styles: [__webpack_require__(/*! ./profileedit.component.css */ "./src/components/profileedit/profileedit.component.css")],
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["DomSanitizer"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            src_app_socket_service__WEBPACK_IMPORTED_MODULE_5__["SocketService"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbActiveModal"]])
    ], ProfileeditComponent);
    return ProfileeditComponent;
}());



/***/ }),

/***/ "./src/components/profiles/profiles.component.html":
/*!*********************************************************!*\
  !*** ./src/components/profiles/profiles.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-breadcrumb app=\"meetings\" model=\"{{type}}\" create=\"1\" title=\"Profiles ({{type}})\"></app-breadcrumb>\n<div class=\"router-outlet\">\n    <div  class=\"container\">\n\t\t<div class=\"row\">\n\t\t\t<div class=\"col-lg-12\">\n\t\t\t\t<div class=\"MainTitleHeadWrap\">\n\t\t\t\t\t<div class=\"HeadingWrap\">\n\t\t\t\t\t\t<i class=\"icon-profile\"></i> Profiles\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"MeetingBtnWrapper\">\n\t\t\t\t\t\t<div class=\"btn-group\">\n\t\t\t\t\t\t\t<a routerLink=\"/profiles/directors\" class=\"btn\">Directors</a>\n\t\t\t\t\t\t\t<a routerLink=\"/profiles/admins\" class=\"btn\">Admins</a>\n\t\t\t\t\t\t\t<a routerLink=\"/profiles/staff\" class=\"btn\">Staff</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n        <div class=\"row\">\n            <div class=\"col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4\" *ngFor=\"let profile of profiles_data\">\n                <div class=\"kanban-card\">\n                    <a routerLink=\"/{{profile.group}}/{{profile.id}}\" class=\"kanban-profiles-user-info-box\">\n                        <div class=\"kanban-profiles-user-img\">\n                            <img class=\"img-thumbnail-md\" alt='N/A' src=\"{{socketService.server_url}}{{profile.photo}}\">\n                        </div>\n                        <div class=\"kanban-profiles-user-info\">\n                            <div class=\"kanban-profiles-user-InfoLIST\">\n                                {{profile.name}}\n                            </div>\n                            <div *ngIf=\"profile.company\" class=\"kanban-profiles-user-InfoLIST\">\n                                <i class=\"fas fa-users\"></i>\n                                <span >\n                                    {{profile.company}}\n                                </span>\n                            </div>\n                            <div *ngIf=\"profile.mobile_phone\" class=\"kanban-profiles-user-InfoLIST\">\n                                <i class=\"fas fa-phone\"></i>\n                                <span >\n                                    {{profile.mobile_phone}}\n                                </span>\n                            </div>                                                                                \n                            <div *ngIf=\"profile.committees && profile.committees.length > 0\">\n                                <label for=\"job-title\">\n                                    <b>Committees</b>\n                                </label>\n                                <!-- <span *ngIf=\"profile.committees && profile.committees.length > 0\"> -->\n                                <span class=\"pill\" *ngFor=\"let com of profile.committees\">\n                                    <span style=\"cursor: pointer\" routerLink=\"/committees/{{com['id']}}\">{{com['name']}}</span>\n                                </span>\n                                <!-- </span> -->\n                            </div>\n                            <div *ngIf=\"profile.response_by\">Response By: {{profile.response_by}}</div>\n                            <div *ngIf=\"profile.state\" class=\"\">\n                                <b>Status : </b> {{profile.state}}\n                            </div>\n                            <div *ngIf=\"profile.email\" class=\"kanban-profiles-user-InfoLIST\">\n                                <i class=\"fas fa-envelope\"></i>\n                                <span>\n                                    {{profile.email}}\n                                </span>\n                            </div>\n                        </div>\n                    </a>\n                </div>\n            </div>\t\t\n        </div>\n    </div>\n\n    <div class=\"container\" *ngIf=\"no_prof\">\n\t\t<div class=\"row\">\n\t\t\t<div class=\"col-lg-12 \">\n\t\t\t\t<div class=\"jumbotron text-center\">\n                    <h1>There are no {{type + 's'}} to show for now!</h1>\n                    <hr>\n                </div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n"

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
/* harmony import */ var src_app_socket_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/socket.service */ "./src/app/socket.service.ts");
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
    function ProfilesComponent(httpService, ss) {
        this.httpService = httpService;
        this.ss = ss;
        this.no_prof = false;
        this.type = '';
        var obj_this = this;
        this.profiles_data = [];
        this.socketService = this.ss;
        this.get_data();
    }
    ProfilesComponent.prototype.get_data = function () {
        var obj_this = this;
        var url = window.location.href.split("/");
        var path = url[url.length - 1];
        obj_this.type = "director";
        if (path == "directors") {
            obj_this.type = "director";
        }
        if (path == "admins") {
            obj_this.type = "admin";
        }
        if (path == "staff") {
            obj_this.type = "staff";
        }
        var input_data = {
            type: obj_this.type
        };
        var args = {
            app: 'meetings',
            model: 'Profile',
            method: 'get_records'
        };
        var final_input_data = {
            params: input_data,
            args: args
        };
        obj_this.httpService.get(final_input_data, function (result) {
            obj_this.profiles_data = result.records;
            obj_this.httpService.total_records = result.total;
            obj_this.profiles_data && obj_this.profiles_data.length > 0 ? obj_this.no_prof = false : obj_this.no_prof = true;
        }, function (error) { });
    };
    ProfilesComponent.prototype.ngOnInit = function () {
        window['json_functions'].find_activate_link('.MeetingBtnWrapper');
    };
    ProfilesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            styles: [__webpack_require__(/*! ./profiles.css */ "./src/components/profiles/profiles.css")],
            template: __webpack_require__(/*! ./profiles.component.html */ "./src/components/profiles/profiles.component.html")
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"], src_app_socket_service__WEBPACK_IMPORTED_MODULE_2__["SocketService"]])
    ], ProfilesComponent);
    return ProfilesComponent;
}());



/***/ }),

/***/ "./src/components/profiles/profiles.css":
/*!**********************************************!*\
  !*** ./src/components/profiles/profiles.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n"

/***/ }),

/***/ "./src/components/profilesummary/profilesummary.component.css":
/*!********************************************************************!*\
  !*** ./src/components/profilesummary/profilesummary.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".close-btn{\n    background-color: #21375a !important;\n}"

/***/ }),

/***/ "./src/components/profilesummary/profilesummary.component.html":
/*!*********************************************************************!*\
  !*** ./src/components/profilesummary/profilesummary.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form *ngIf=\"profile_data\" class=\"details-card\">\n  <div class=\"container\">\n      <div class=\"row mb-3\">\n          <div class=\"col-sm-12 col-md-3 col-lg-2\">\n              <div class=\"ProfileUserNameJonbWrapper\">\n                  <div class=\"ProfileChangeSaveWrapper\">\n                      <img *ngIf=\"profile_data.photo\" class=\"img-thumbnail-lg\" src=\"{{socketService.server_url}}{{profile_data.photo}}\">\n                      <img *ngIf=\"!profile_data.photo\" class=\"img-thumbnail-lg\" src=\"static/assets/images/no-profile.png\">\n                  </div>\n\n                  <div  class=\"row\" *ngIf=\"profile_data.name\">\n                      <div class=\"col-sm-12 UserProfileNameTittle\">\n                          {{profile_data.name}}\n                      </div>\n                  </div>\n\n                  <div *ngIf=\"profile_data.job_title\" class=\"row\">\n                      <div class=\"col-sm-12 UserProfileDiscripTittle\">\n                          {{profile_data.job_title}}\n                      </div>\n                  </div>\n              </div>\n          </div>\n          <div class=\"col-sm-12 col-md-8 col-lg-9 offset-md-1 offset-lg-1 ProfileInfoTittleWrapper\">\n              <div class=\"ProFileHeadWrap\">\n                  PERSONAL INFO\n              </div>\n              <div *ngIf=\"profile_data.mobile_phone\" class=\"row mb-2\">\n                  <div class=\"col-sm-3\">\n                      <label for=\"mobile-phone\">\n                          <b>Mobile Phone</b>\n                      </label>\n                  </div>\n                  <div class=\"col-sm-9 UserProfileDiscription\">\n                      {{profile_data.mobile_phone}}\n                  </div>\n              </div>\n              <div *ngIf=\"profile_data.email\" class=\"row mb-2\">\n              <div class=\"col-sm-3\">\n                  <label for=\"email\">\n                      <b>Email</b>\n                  </label>\n                  </div>\n                  <div class=\"col-sm-9 UserProfileDiscription\">\n                      {{profile_data.email}}\n                  </div>\n              </div>\n              <div *ngIf=\"profile_data.birth_date\" class=\"row mb-2\">\n                  <div class=\"col-sm-3\">\n                      <label for=\"birth_date\">\n                          <b>Birth Date</b>\n                      </label>\n                  </div>\n                  <div class=\"col-sm-9 UserProfileDiscription\">\n                      {{profile_data.birth_date}}\n                  </div>\n              </div>\n              <div *ngIf=\"profile_data.location\" class=\"row mb-2\">\n                  <div class=\"col-sm-3\">\n                      <label for=\"location\">\n                          <b>Location</b>\n                      </label>\n                  </div>\n                  <div class=\"col-sm-9 UserProfileDiscription\">\n                          {{profile_data.location}}\n                  </div>\n              </div>\n          </div>\n      </div>\n  </div>\n</form>\n<button type=\"button\" class=\"btn btn-outline-dark close-btn\" (click)=\"activeModal.close('Close click')\">Close</button>"

/***/ }),

/***/ "./src/components/profilesummary/profilesummary.component.ts":
/*!*******************************************************************!*\
  !*** ./src/components/profilesummary/profilesummary.component.ts ***!
  \*******************************************************************/
/*! exports provided: ProfilesummaryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilesummaryComponent", function() { return ProfilesummaryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../app/http.service */ "./src/app/http.service.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var src_app_socket_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/socket.service */ "./src/app/socket.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProfilesummaryComponent = /** @class */ (function () {
    function ProfilesummaryComponent(httpService, activeModal, socketService) {
        this.httpService = httpService;
        this.activeModal = activeModal;
        this.socketService = socketService;
    }
    ProfilesummaryComponent.prototype.ngOnInit = function () {
        var obj_this = this;
        var input_data = {
            user_id: this.user_id
        };
        var args = {
            app: 'meetings',
            model: 'Profile',
            method: 'get_profile_summary'
        };
        var final_input_data = {
            params: input_data,
            args: args
        };
        obj_this.httpService.get(final_input_data, function (data) {
            obj_this.profile_data = data;
        }, null);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], ProfilesummaryComponent.prototype, "user_id", void 0);
    ProfilesummaryComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-profilesummary',
            template: __webpack_require__(/*! ./profilesummary.component.html */ "./src/components/profilesummary/profilesummary.component.html"),
            styles: [__webpack_require__(/*! ./profilesummary.component.css */ "./src/components/profilesummary/profilesummary.component.css"), __webpack_require__(/*! ../profiledetails/profiledetails.css */ "./src/components/profiledetails/profiledetails.css")]
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbActiveModal"],
            src_app_socket_service__WEBPACK_IMPORTED_MODULE_3__["SocketService"]])
    ], ProfilesummaryComponent);
    return ProfilesummaryComponent;
}());



/***/ }),

/***/ "./src/components/recorddetails/recorddetails.component.html":
/*!*******************************************************************!*\
  !*** ./src/components/recorddetails/recorddetails.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"breadcrumbSection\">\n    <div class=\"edit-buttons\">\n        <a class=\"btn btn-primary\" (click)=\"go_back()\">Cancel</a>\n    </div>\n</div>\n<div class=\"router-outlet\">\n    <iframe id=\"record_details_iframe\" [src]=\"url\"></iframe>\n</div>\n"

/***/ }),

/***/ "./src/components/recorddetails/recorddetails.component.ts":
/*!*****************************************************************!*\
  !*** ./src/components/recorddetails/recorddetails.component.ts ***!
  \*****************************************************************/
/*! exports provided: RecorddetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecorddetailsComponent", function() { return RecorddetailsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RecorddetailsComponent = /** @class */ (function () {
    function RecorddetailsComponent(route, sanitizer, _location) {
        this.route = route;
        this.sanitizer = sanitizer;
        this._location = _location;
        window['functions'].showLoader('jangoiframe');
    }
    RecorddetailsComponent.prototype.ngOnInit = function () {
        this.id = this.route.snapshot.params.id;
        this.model = this.route.snapshot.params.model;
        // let temp = window.location.hash.split("edit")[1]
        this.url = window['site_config'].server_base_url + "/" + this.model + "/" + this.id;
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
        // $('html').css('overflow', 'hidden');
        $('#record_details_iframe').load(function () {
            window['functions'].hideLoader('jangoiframe');
        });
    };
    RecorddetailsComponent.prototype.go_back = function () {
        this._location.back();
    };
    RecorddetailsComponent.prototype.ngOnDestroy = function () {
        $('html').css('overflow', 'auto');
    };
    RecorddetailsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-recorddetails',
            template: __webpack_require__(/*! ./recorddetails.component.html */ "./src/components/recorddetails/recorddetails.component.html"),
            styles: [__webpack_require__(/*! ./recorddetails.css */ "./src/components/recorddetails/recorddetails.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["Location"]])
    ], RecorddetailsComponent);
    return RecorddetailsComponent;
}());



/***/ }),

/***/ "./src/components/recorddetails/recorddetails.css":
/*!********************************************************!*\
  !*** ./src/components/recorddetails/recorddetails.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#record_details_iframe{\n\twidth:100%;\n\tborder: 0;\n\tmargin-top: -5px;\n    height: calc(100vh - 115px);\n}\n\n/* #container-main{\n\tmin-height:auto;\n    padding: 19px;\n    margin-bottom: 20px;\n    background-color: #ffffff;\n    border:0;\n    border-radius: 40;\n    box-shadow:none;\n} */\n"

/***/ }),

/***/ "./src/components/recordedit/recordedit.component.html":
/*!*************************************************************!*\
  !*** ./src/components/recordedit/recordedit.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"breadcrumbSection\">\n    <div class=\"edit-buttons\">\n        <a class=\"btn btn-primary\" (click)=\"go_back()\">Cancel</a>\n    </div>\n</div>\n<div class=\"router-outlet\">\n\t<iframe id=\"record_edit_iframe\" [src]=\"url\"></iframe>\n</div>\n"

/***/ }),

/***/ "./src/components/recordedit/recordedit.component.ts":
/*!***********************************************************!*\
  !*** ./src/components/recordedit/recordedit.component.ts ***!
  \***********************************************************/
/*! exports provided: RecordEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecordEditComponent", function() { return RecordEditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RecordEditComponent = /** @class */ (function () {
    function RecordEditComponent(route, sanitizer, _location) {
        this.route = route;
        this.sanitizer = sanitizer;
        this._location = _location;
        window['functions'].showLoader('jangoiframe');
    }
    RecordEditComponent.prototype.ngOnInit = function () {
        this.id = this.route.snapshot.params.id;
        var temp = window.location.hash.split("edit")[1];
        if (temp.indexOf('/admin/add') > -1) {
            this.url = window['site_config'].server_base_url + "/admin/meetings/profile/add/?group=admin&_popup";
        }
        else if (temp.indexOf('/staff/add') > -1) {
            this.url = window['site_config'].server_base_url + "/admin/meetings/profile/add/?group=staff&_popup";
        }
        else if (temp.indexOf('/director/add') > -1) {
            this.url = window['site_config'].server_base_url + "/admin/meetings/profile/add/?group=director&_popup";
        }
        else {
            this.url = window['site_config'].server_base_url + "/admin" + temp + "?_popup";
        }
        // console.log(temp, this.url);
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
        $('#record_edit_iframe').load(function () {
            window['functions'].hideLoader('jangoiframe');
        });
    };
    RecordEditComponent.prototype.go_back = function () {
        this._location.back();
    };
    RecordEditComponent.prototype.ngOnDestroy = function () {
    };
    RecordEditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            styles: [__webpack_require__(/*! ./recordedit.css */ "./src/components/recordedit/recordedit.css")],
            template: __webpack_require__(/*! ./recordedit.component.html */ "./src/components/recordedit/recordedit.component.html")
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["Location"]])
    ], RecordEditComponent);
    return RecordEditComponent;
}());



/***/ }),

/***/ "./src/components/recordedit/recordedit.css":
/*!**************************************************!*\
  !*** ./src/components/recordedit/recordedit.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#record_edit_iframe{\n\twidth:100%;\n\tborder: 0;\n    height: calc(100vh - 121px);\n}\n"

/***/ }),

/***/ "./src/components/resourcedetails/resourcedetails.component.html":
/*!***********************************************************************!*\
  !*** ./src/components/resourcedetails/resourcedetails.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\" breadcrumbSection\">\n    <div class=\"edit-buttons\" *ngIf=\"folder\">\n        <a class=\"btn btn-primary\" routerLink=\"/edit/resources/folder/{{folder.id}}/change\">Edit</a>\n        <a class=\"btn btn-danger\" routerLink=\"/edit/resources/folder/{{folder.id}}/delete\">Delete</a>\n    </div> \n    <ul class=\"breadcrumb\" *ngIf=\"folder && folder.parents\">\n        <li class=\"breadcrumb-item\">                                                \n            <a routerLink=\"/resources\">\n                Resources\n            </a>\n        </li>\n        <li class=\"breadcrumb-item\" *ngFor=\"let parent of folder.parents\">                                                \n            <a routerLink=\"/resource/{{parent.id}}\">\n                {{parent.name}}\n            </a>\n        </li>\n        <li class=\"breadcrumb-item active\">{{folder.name}}</li>\n    </ul>\n</div>\n\n<div class=\"router-outlet\">\n        \n\n    <!-- <link rel=\"stylesheet\" href=\"static/assets/css/components/resourcedetails.css\"> -->\n    <div *ngIf=\"folder\">\n       \n        <div class=\"cards container\">\n\t\t\t<div class=\"row\" *ngIf=\"!(no_files)\">\n\t\t\t\t<div class=\"col-lg-12\">\n\t\t\t\t\t<div class=\"MainTitleHeadWrap ResourcesHeadWrapper\">\n\t\t\t\t\t\t<div class=\"HeadingWrap\">\n\t\t\t\t\t\t\t<i class=\"icon-doc-file\"></i> Files\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n  \t\t\t <div class=\"row docwrappercontainer\">\n\t\t\t\t<div class=\"col-sm-6 col-md-4 col-lg-2 mb-4\"  *ngFor=\"let doc of folder.files\">\n\t\t\t\t\t<a routerLink=\"/resource/doc/{{doc.id}}\" class=\"\">\n\t\t\t\t\t\t<div class=\"DocumentWrapper\">\n\t\t\t\t\t\t\t<div class=\"DocIcon\">\n\t\t\t\t\t\t\t\t<span class=\"rounded-circle\">\n\t\t\t\t\t\t\t\t\t<i class=\"icon-doc-file\"></i>\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"DocInfoVertical text-truncate\">\n\t\t\t\t\t\t\t\t{{doc.name}}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</a>\n\t\t\t\t</div>\n        \t</div>\n\t\t\t<div class=\"row\" *ngIf=\"!(no_folders)\">\n\t\t\t\t<div class=\"col-lg-12\">\n\t\t\t\t\t<div class=\"MainTitleHeadWrap ResourcesHeadWrapper\">\n\t\t\t\t\t\t<div class=\"HeadingWrap \">\n\t\t\t\t\t\t\t<i class=\"icon-folder\"></i> Sub Folders\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n            <h6 ></h6>\n\t\t\t <div class=\"row docwrappercontainer docs-colr-them\">\n\t\t\t\t<div class=\"col-sm-6 col-md-4 col-lg-2 mb-4\" *ngFor=\"let folder of folder.sub_folders\">\n\t\t\t\t\t<a routerLink=\"/resource/{{folder.id}}\" class=\"\">\n\t\t\t\t\t\t<div class=\"DocumentWrapper\">\n\t\t\t\t\t\t\t<div class=\"DocIcon\">\n\t\t\t\t\t\t\t\t<span class=\"rounded-circle\">\n\t\t\t\t\t\t\t\t\t<i class=\"icon-folder\"></i>\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"DocInfoVertical text-truncate\">\n\t\t\t\t\t\t\t\t{{folder.name}}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\n        </div>\n    </div>\n</div>\n"

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
        var args = {
            app: 'resources',
            model: 'Folder',
            method: 'get_details'
        };
        var final_input_data = {
            params: input_data,
            args: args
        };
        obj_this.httpService.get(final_input_data, function (result) {
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
            styles: [__webpack_require__(/*! ./resourcedetails.css */ "./src/components/resourcedetails/resourcedetails.css")],
            template: __webpack_require__(/*! ./resourcedetails.component.html */ "./src/components/resourcedetails/resourcedetails.component.html")
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], ResourceDetailsComponent);
    return ResourceDetailsComponent;
}());



/***/ }),

/***/ "./src/components/resourcedetails/resourcedetails.css":
/*!************************************************************!*\
  !*** ./src/components/resourcedetails/resourcedetails.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".modal-header, .modal-footer{\n    background-color: #eeeeee !important;\n}\n\n.bordered{\n    border: 1px solid #808080;\n}\n\n"

/***/ }),

/***/ "./src/components/resources/resources.component.html":
/*!***********************************************************!*\
  !*** ./src/components/resources/resources.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-breadcrumb app=\"resources\" model=\"folder\" create=\"1\" title=\"Resources\"></app-breadcrumb>\n<div class=\"router-outlet  pt-0\">\n    <div class=\"container\">\n\t\t<div class=\"row\">\n\t\t\t<div class=\"col-lg-12\">\n\t\t\t\t<div class=\"MainTitleHeadWrap ResourcesHeadWrapper\">\n\t\t\t\t\t<div class=\"HeadingWrap\">\n\t\t\t\t\t\t<img src=\"static/assets/images/face-scan.png\" alt=\"\" /> Resources\n\t\t\t\t\t</div>\n\t\t\t\t\t<!-- <div class=\"ResourcesSearchCreateWrapper\">\n                        <div class=\"input-group\">\n                            <div class=\"input-group-prepend\">\n                                <span class=\"input-group-text\"><i class=\"fas fa-search\"></i></span>\n                            </div>\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Search here…\">\n                        </div>\n                        <div class=\"create-btnwrap\">\n                            <a href=\"javascript:void(0);\" class=\"btn btn-create\" data-toggle=\"modal\" data-target=\"#CreateFolder\">Create</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div> -->\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n    <div class=\"cards container mt-4\">\n        <div class=\"row docwrappercontainer\">\n            <div class=\"col-sm-6 col-md-4 col-lg-2 mb-4\" *ngFor=\"let folder of folders\">\n                <a routerLink=\"/resource/{{folder.id}}\" class=\"\">\n\t\t\t\t\t<div class=\"DocumentWrapper\">\n\t\t\t\t\t\t<div class=\"DocIcon\">\n\t\t\t\t\t\t\t<span class=\"rounded-circle\">\n\t\t\t\t\t\t\t\t<i class=\"icon-folder\"></i>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"DocInfoVertical text-truncate\">\n\t\t\t\t\t\t\t{{folder.name}}\n\t\t\t\t\t\t</div>\n                    </div>\n                </a>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"container\" *ngIf=\"no_resource\">\n        <div class=\"row\">\n            <div class=\"col-lg-12 \">\n                <div class=\"jumbotron text-center\">\n                    <h1>There are no resources for now!</h1>\n                    <hr>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<!-- Folder Modal -->\n<div class=\"modal fade\" id=\"CreateFolder\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"CreateFolder\" aria-hidden=\"true\">\n<div class=\"modal-dialog modal-dialog-centered modal-sm\" role=\"document\">\n    <div class=\"modal-content\">          \n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n            <i class=\"fas fa-times\" aria-hidden=\"true\"></i>\n        </button>\n    <div class=\"modal-body\">\n        <div class=\"pt-5 pb-3\">\n            <div class=\"modal-folder-icon\">\n                <img src=\"static/assets/images/modal-folder.png\" alt=\"modal-folder\" />\n            </div>\n        </div>\n        <div class=\"Modal-Folder-Box\">\n            <span>Create New Folder</span>\n            <input type=\"text\" class=\"form-control\" placeholder=\"Enter folder name\">\n            <div class=\"Modal-Folder-Option\">\n                <a href=\"javascript:void(0);\" class=\"btn btn-chose\" >Create</a>\n                <a href=\"javascript:void(0);\" class=\"btn btn-chose\" data-dismiss=\"modal\">Cancel</a>\n            </div>\n        </div>\n    </div>\n    </div>\n</div>\n</div>\n"

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
        this.heading = 'Resources';
        this.bread_crumb = {
            items: [],
            title: ''
        };
        this.get_data();
    }
    ResourcesComponent.prototype.get_data = function () {
        var obj_this = this;
        var args = {
            app: 'resources',
            model: 'Folder',
            method: 'get_records'
        };
        var final_input_data = {
            params: {},
            args: args
        };
        obj_this.httpService.get(final_input_data, function (result) {
            obj_this.folders = result.records;
            obj_this.httpService.count = result.count;
            obj_this.httpService.total_records = result.total;
            obj_this.folders && obj_this.folders.length > 0 ? obj_this.no_resource = false : obj_this.no_resource = true;
            // make_bread_crumb(obj_this.heading);
        }, function (error) {
            //console.log(error);
            //alert(error);
        });
        function make_bread_crumb(page_title) {
            if (page_title) {
                obj_this.bread_crumb.title = page_title;
            }
        }
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

/***/ "./src/components/roster/roster.component.css":
/*!****************************************************!*\
  !*** ./src/components/roster/roster.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".roster-images{\n    height: 100px;\n    width: 100px;\n}"

/***/ }),

/***/ "./src/components/roster/roster.component.html":
/*!*****************************************************!*\
  !*** ./src/components/roster/roster.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"router-outlet\">\n    <table class=\"roster\">\n        <thead>\n            <tr>\n                <th>Attendee</th>\n                <th>Absent</th>\n                <th>InPerson</th>\n                <th>Online</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr (click)=\"open(obj.id)\" *ngFor=\"let obj of attendees\">\n                <td>\n                    <img class=\"roster-images\" src=\"{{socketService.server_url}}{{obj.photo}}\" />\n                    {{obj.name}}                    \n                </td>                \n                <td>\n                    <input *ngIf=\"obj.attendance=='absent'\" checked type=\"radio\" name=\"{{obj.id}}\" />                    \n                    <input *ngIf=\"obj.attendance!='absent'\" type=\"radio\" name=\"{{obj.id}}\" />\n                    <input type=\"hidden\" value=\"absent\" />\n                    <input type=\"hidden\" value=\"{{obj.id}}\" />\n                </td>\n                <td>\n                    <input *ngIf=\"obj.attendance=='inperson'\" checked type=\"radio\" name=\"{{obj.id}}\" />\n                    <input *ngIf=\"obj.attendance!='inperson'\" type=\"radio\" name=\"{{obj.id}}\" />\n                    <input type=\"hidden\" value=\"inperson\" />\n                    <input type=\"hidden\" value=\"{{obj.id}}\" />\n                </td>\n                <td>\n                    <input *ngIf=\"obj.attendance=='online'\" checked type=\"radio\" name=\"{{obj.id}}\" />\n                    <input *ngIf=\"obj.attendance!='online'\" type=\"radio\" name=\"{{obj.id}}\" />\n                    <input type=\"hidden\" value=\"online\" />\n                    <input type=\"hidden\" value=\"{{obj.id}}\" />\n                </td>\n            </tr>\n        </tbody>\n    </table>\n    <h3>Total attendees: {{total_records}}</h3>\n    <button (click)=\"submit_attendance()\">Submit Attendance</button>\n    <style>\n        table.roster td, table.roster th{\n            border: 1px solid;\n        }\n    </style>    \n    <app-paginator *ngIf=\"attendees && attendees.length > 0\"\n        (changedLimit)=changedLimit($event)\n        (changedOffset)=\"changedOffset($event)\" count=\"{{total_records}}\"></app-paginator>    \n</div>"

/***/ }),

/***/ "./src/components/roster/roster.component.ts":
/*!***************************************************!*\
  !*** ./src/components/roster/roster.component.ts ***!
  \***************************************************/
/*! exports provided: RosterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RosterComponent", function() { return RosterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../app/http.service */ "./src/app/http.service.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var src_app_socket_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/socket.service */ "./src/app/socket.service.ts");
/* harmony import */ var _profilesummary_profilesummary_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../profilesummary/profilesummary.component */ "./src/components/profilesummary/profilesummary.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RosterComponent = /** @class */ (function () {
    function RosterComponent(httpService, modalService, socketService) {
        this.httpService = httpService;
        this.modalService = modalService;
        this.socketService = socketService;
        this.server_url = window['server_url'];
        this.offset = 0;
        this.limit = 2;
        this.total_records = 0;
    }
    RosterComponent.prototype.changedOffset = function (data) {
        this.offset = Number(data);
        // console.log(this.offset, 1008);
        this.get_data();
    };
    RosterComponent.prototype.changedLimit = function (data) {
        this.limit = Number(data);
        this.offset = 0;
        console.log(this.limit, this.offset, 144);
        this.get_data();
    };
    RosterComponent.prototype.open = function (user_id) {
        var obj_this = this;
        var modalRef = this.modalService.open(_profilesummary_profilesummary_component__WEBPACK_IMPORTED_MODULE_4__["ProfilesummaryComponent"]);
        modalRef.componentInstance.user_id = user_id;
    };
    RosterComponent.prototype.get_data = function () {
        var obj_this = this;
        var input_data = {
            meeting_id: obj_this.meeting_id,
            offset: obj_this.offset,
            limit: obj_this.limit
        };
        var args = {
            app: 'meetings',
            model: 'Event',
            method: 'get_roster_details'
        };
        var final_input = {
            params: input_data,
            args: args
        };
        obj_this.httpService.get(final_input, function (data) {
            obj_this.total_records = Number(data.total);
            obj_this.count = data.attendees.length;
            obj_this.attendees = data.attendees;
        }, null);
    };
    RosterComponent.prototype.submit_attendance = function () {
        var attendance_data = [];
        $('table.roster input:checked').each(function (i, el) {
            var obj = {
                id: $(el).next().next().val(),
                attendance: $(el).next().val()
            };
            attendance_data.push(obj);
        });
        var obj_this = this;
        var input_data = {
            meeting_id: obj_this.meeting_id,
            attendance_data: attendance_data,
        };
        var args = {
            app: 'meetings',
            model: 'Event',
            method: 'mark_attendance'
        };
        var final_input = {
            params: input_data,
            args: args
        };
        obj_this.httpService.post(final_input, function (data) {
            console.log(data);
        }, null);
    };
    RosterComponent.prototype.ngOnInit = function () {
        this.get_data();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], RosterComponent.prototype, "meeting_id", void 0);
    RosterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-roster',
            template: __webpack_require__(/*! ./roster.component.html */ "./src/components/roster/roster.component.html"),
            styles: [__webpack_require__(/*! ./roster.component.css */ "./src/components/roster/roster.component.css")]
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbModal"],
            src_app_socket_service__WEBPACK_IMPORTED_MODULE_3__["SocketService"]])
    ], RosterComponent);
    return RosterComponent;
}());



/***/ }),

/***/ "./src/components/rtc/rtc.component.css":
/*!**********************************************!*\
  !*** ./src/components/rtc/rtc.component.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/components/rtc/rtc.component.html":
/*!***********************************************!*\
  !*** ./src/components/rtc/rtc.component.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<link rel=\"stylesheet\" type=\"text/css\" href=\"/static/assets/rtc/getHTMLMediaElement.css\">\n<link rel=\"stylesheet\" type=\"text/css\" href=\"/static/assets/rtc/style.css\"/>\n\n<div id=\"rtc-container\" class=\"make-center\">\n        <h3>Chat Server Running</h3>\n    <p style=\"margin: 0; padding: 0; padding-bottom: 20px;\">\n    <input type=\"text\" id=\"room-id\" value=\"abcdef\" autocorrect=off autocapitalize=off size=20>\n    <button id=\"open-room\">Open Room</button>\n    <button id=\"join-room\">Join Room</button>\n    <button id=\"share-screen\" disabled>Share Your Screen</button>\n    <button id=\"leave-room\" disabled>Hangup (Leave)</button>\n    </p>            \n    <div id=\"videos-container\" style=\"margin: 20px 0;\"></div>                        \n</div>"

/***/ }),

/***/ "./src/components/rtc/rtc.component.ts":
/*!*********************************************!*\
  !*** ./src/components/rtc/rtc.component.ts ***!
  \*********************************************/
/*! exports provided: RtcComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RtcComponent", function() { return RtcComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var RtcComponent = /** @class */ (function () {
    function RtcComponent() {
    }
    RtcComponent.prototype.ngOnInit = function () {
        $('#rtc-container').append('<script src="static/assets/rtc/conference.js"></script>');
    };
    RtcComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-rtc',
            template: __webpack_require__(/*! ./rtc.component.html */ "./src/components/rtc/rtc.component.html"),
            styles: [__webpack_require__(/*! ./rtc.component.css */ "./src/components/rtc/rtc.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], RtcComponent);
    return RtcComponent;
}());



/***/ }),

/***/ "./src/components/setpassword/setpassword.component.html":
/*!***************************************************************!*\
  !*** ./src/components/setpassword/setpassword.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"router-outlet\">\n\t<div class=\"container\">\n\t\t<div class=\"row justify-content-center\">\n\t\t\t<div class=\"col-sm-10 col-md-6 col-lg-4\">\n\t\t\t\t<div class=\"password-box\">\n\t\t\t\t\t<label>New Password</label>\n\t\t\t\t\t<div class=\"form-group pass_show\">\n\t\t\t\t\t\t<input [(ngModel)]=\"new_password\" type=\"password\" class=\"form-control\" placeholder=\"New Password\">\n\t\t\t\t\t\t<span *ngIf=\"new_password\" class=\"ptxt\">Show</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<label>Confirm Password</label>\n\t\t\t\t\t<div class=\"form-group pass_show\">\n\t\t\t\t\t\t<input [(ngModel)]=\"confirm_new_password\" type=\"password\" class=\"form-control\" placeholder=\"Confirm Password\">\n\t\t\t\t\t\t<span *ngIf=\"confirm_new_password\" class=\"ptxt\">Show</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-12\">\t\t\t\t\t\t\t\n                            <span>\n                                Please set password according to the following\n                            </span>\n                            <ul class=\"pass_rules\">\n                                <li [ngClass]=\"{ 'valid-password': lower_regex.test(new_password) }\">At least one lower case letter</li>\n                                <li [ngClass]=\"{ 'valid-password': uper_regex.test(new_password) }\">At least one upper case letter</li>\n                                <li [ngClass]=\"{ 'valid-password': numeric_regex.test(new_password) }\">At least one numeric chracter</li>\n                                <li [ngClass]=\"{ 'valid-password': special_regex.test(new_password) }\">At least one special chracter</li>\n                                <li [ngClass]=\"{ 'valid-password': min_length_regex.test(new_password) }\">Minimume 8 chracters</li>\n                                <li [ngClass]=\"{ 'valid-password': (new_password != '' && new_password == confirm_new_password) }\">Password Does not Match</li>\n                            </ul>                        \n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t\t\t\t<button class=\"btn btn-primary\" (click)=\"submit_password()\">Submit</button>\n\t\t\t\t\t\t\t<a style=\"font-size: 14px;font-weight: bold;margin-left: 10px;\"\n\t\t\t\t\t\t\thref=\"/login\">Back to login</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n"

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
    function SetpasswordComponent(router, httpService, route) {
        this.router = router;
        this.httpService = httpService;
        this.route = route;
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
        var obj_this = this;
        var bootbox = window['bootbox'];
        if (!obj_this.all_regex.test(this.new_password) && this.new_password != this.confirm_new_password) {
            return;
        }
        obj_this.loading = true;
        var token = obj_this.route.snapshot.params.token;
        // var token = new URLSearchParams(window.location.search).get('token');
        // var db = new URLSearchParams(window.location.search).get('db');
        if (!token) {
            bootbox.alert('Invalid perameters in set password request. Please contact your admin.');
            return;
        }
        var input_data = {
            token: token,
            password: this.new_password,
        };
        var success_cb = function (result) {
            console.log(result);
            obj_this.loading = false;
            bootbox.alert('Password is successfully updated', function () {
                obj_this.router.navigate(['/login']);
            });
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
        var args = {
            app: 'authsignup',
            model: 'AuthUser',
            method: 'set_password'
        };
        var final_input_data = {
            params: input_data,
            args: args
        };
        obj_this.httpService.post_public(final_input_data, success_cb, failure_cb);
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
                window['functions'].hideLoader('force');
            }, 100);
        });
    };
    SetpasswordComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-setpassword',
            styles: [__webpack_require__(/*! ./setpassword.css */ "./src/components/setpassword/setpassword.css")],
            template: __webpack_require__(/*! ./setpassword.component.html */ "./src/components/setpassword/setpassword.component.html")
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], SetpasswordComponent);
    return SetpasswordComponent;
}());



/***/ }),

/***/ "./src/components/setpassword/setpassword.css":
/*!****************************************************!*\
  !*** ./src/components/setpassword/setpassword.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".password-box{\n\tbackground: #f9f9f9;\n\tborder: 1px solid #eaeaea;\n\tpadding: 15px;\n\tmargin-top: 80px;\n}\n\n.pass_show{position: relative}\n\n.pass_show .ptxt {\n\tposition: absolute;\n\ttop: 50%;\n\tright: 10px;\n\tz-index: 1;\n\tcolor: #f36c01;\n\tmargin-top: -10px;\n\tcursor: pointer;\n\ttransition: .3s ease all;\n}\n\n.pass_show .ptxt:hover{color: #333333;}\n\n.pass_rules li{\n\tcolor: red;\n\tfont-weight: 700;\n}\n\n.valid-password{\n\tcolor: Green !important;\n}\n"

/***/ }),

/***/ "./src/components/settings/settings.component.html":
/*!*********************************************************!*\
  !*** ./src/components/settings/settings.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"router-outlet\" style=\"padding-bottom: 0;\">\n\t<div class=\"container\">\n\t\t<div class=\"row justify-content-center\">\n\t\t\t<div class=\"col-sm-10 col-md-6 col-lg-4\">\n\t\t\t\t<div class=\"password-box\">\n\t\t\t\t\t<label>Current Password</label>\n\t\t\t\t\t<div class=\"form-group pass_show\">\n\t\t\t\t\t\t<input [(ngModel)]=\"old_password\" type=\"password\" class=\"form-control\" placeholder=\"Current Password\">\n\t\t\t\t\t\t<span *ngIf=\"old_password\" class=\"ptxt\">Show</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<label>New Password</label>\n\t\t\t\t\t<div class=\"form-group pass_show\">\n\t\t\t\t\t\t<input [(ngModel)]=\"new_password\" type=\"password\" class=\"form-control\" placeholder=\"New Password\">\n\t\t\t\t\t\t<span *ngIf=\"new_password\" class=\"ptxt\">Show</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<label>Confirm Password</label>\n\t\t\t\t\t<div class=\"form-group pass_show\">\n\t\t\t\t\t\t<input [(ngModel)]=\"confirm_new_password\" type=\"password\" class=\"form-control\" placeholder=\"Confirm Password\">\n\t\t\t\t\t\t<span *ngIf=\"confirm_new_password\" class=\"ptxt\">Show</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t\tPlease set password according to the following\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t<ul class=\"pass_rules\">\n\t\t\t\t\t\t\t\t\t<li [ngClass]=\"{ 'valid-password': lower_regex.test(new_password) }\">At least one lower case letter</li>\n\t\t\t\t\t\t\t\t\t<li [ngClass]=\"{ 'valid-password': uper_regex.test(new_password) }\">At least one upper case letter</li>\n\t\t\t\t\t\t\t\t\t<li [ngClass]=\"{ 'valid-password': numeric_regex.test(new_password) }\">At least one numeric chracter</li>\n\t\t\t\t\t\t\t\t\t<li [ngClass]=\"{ 'valid-password': special_regex.test(new_password) }\">At least one special chracter</li>\n\t\t\t\t\t\t\t\t\t<li [ngClass]=\"{ 'valid-password': min_length_regex.test(new_password) }\">Minimume 8 chracters</li>\n\t\t\t\t\t\t\t\t\t<li [ngClass]=\"{ 'valid-password': (new_password != '' && new_password == confirm_new_password) }\">Password\n\t\t\t\t\t\t\t\t\t\tDoes not Match</li>\n\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t\t\t\t<button class=\"btn btn-primary\" (click)=\"submit_password()\">Submit</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>"

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
        if (!window['site_config'].is_localhost) {
            if (!this.old_password) {
                bootbox.alert('Please provide your previous password.');
                return;
            }
            if (!this.all_regex.test(this.new_password) || this.new_password != this.confirm_new_password) {
                bootbox.alert('Please follow the rules to set your new password.');
                return;
            }
        }
        var obj_this = this;
        this.loading = true;
        var input_data = {
            args: {
                app: 'authsignup',
                model: 'AuthUser',
                method: 'change_password',
            },
            params: {
                old: this.old_password,
                new: this.new_password,
            }
        };
        var success_cb = function (result) {
            obj_this.loading = false;
            bootbox.alert('Password is successfully updated');
            window["functions"].go_to_login();
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
        this.httpService.post(input_data, success_cb, failure_cb);
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
            styles: [__webpack_require__(/*! ./settings.css */ "./src/components/settings/settings.css")],
            template: __webpack_require__(/*! ./settings.component.html */ "./src/components/settings/settings.component.html")
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"]])
    ], SettingsComponent);
    return SettingsComponent;
}());



/***/ }),

/***/ "./src/components/settings/settings.css":
/*!**********************************************!*\
  !*** ./src/components/settings/settings.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".password-box{\n    background: #f9f9f9;\n    border: 1px solid #eaeaea;\n    padding: 15px;\n    margin-top: 80px;\n}\n\n.pass_show{position: relative}\n\n.pass_show .ptxt { \n    position: absolute;\n    top: 50%;\n    right: 10px;\n    z-index: 1;\n    color: #f36c01;\n    margin-top: -10px;\n    cursor: pointer;\n    transition: .3s ease all;\n}\n\n.pass_show .ptxt:hover{color: #333333;}\n\n.pass_rules li{\n\tcolor: red;\n\tfont-weight: 700;\n}\n\n.valid-password{\n\tcolor: Green !important;\n}\n"

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
        var obj_this = this;
        var doc_id = obj_this.route.snapshot.params.res_id;
        $('body').addClass('overflow-hide');
        window['functions'].showLoader('dociframe');
        $('#signdocframe').load(function () {
            $(this).show();
            window['functions'].hideLoader('dociframe');
        });
        var args = {
            app: 'esign',
            model: 'SignDocument',
            method: 'get_token'
        };
        var final_input_data = {
            params: { doc_id: doc_id },
            args: args
        };
        obj_this.httpService.get(final_input_data, function (data) {
            obj_this.doc_name = data.doc_name;
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

/***/ "./src/components/support/support.component.css":
/*!******************************************************!*\
  !*** ./src/components/support/support.component.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/components/support/support.component.html":
/*!*******************************************************!*\
  !*** ./src/components/support/support.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2 style=\"text-align:center\">\n    support works!\n</h2>\n"

/***/ }),

/***/ "./src/components/support/support.component.ts":
/*!*****************************************************!*\
  !*** ./src/components/support/support.component.ts ***!
  \*****************************************************/
/*! exports provided: SupportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SupportComponent", function() { return SupportComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SupportComponent = /** @class */ (function () {
    function SupportComponent() {
    }
    SupportComponent.prototype.ngOnInit = function () {
    };
    SupportComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-support',
            template: __webpack_require__(/*! ./support.component.html */ "./src/components/support/support.component.html"),
            styles: [__webpack_require__(/*! ./support.component.css */ "./src/components/support/support.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], SupportComponent);
    return SupportComponent;
}());



/***/ }),

/***/ "./src/components/survey/survey.component.html":
/*!*****************************************************!*\
  !*** ./src/components/survey/survey.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-breadcrumb app=\"survey\" model=\"survey\" \n*ngIf=\"surveyDetails\"\nrid=\"{{surveyDetails.id}}\" edit=\"1\" delete=\"1\" \nroutes='[{\"title\":\"Actions\", \"link\":\"/actions\"}, {\"title\":\"Surveys\", \"link\":\"/actions/surveys\"}]'\ntitle=\"{{surveyDetails.name}}\"></app-breadcrumb>\n<div class=\"router-outlet\">\n\t<div class=\"container\" *ngIf=\"surveyDetails\">        \n\t\t<div class=\" form-details\">\n\t\t\t\t<div class=\"meeting-details-form\">\n\t\t\t\t\t<div class=\"row d-flex justify-content-between mb-3\" *ngIf=\"surveyDetails.is_published\">\n\t\t\t\t\t\t<div class=\"col\">\n\t\t\t\t\t\t\t<div class=\"survey-top-buttons\" id=\"tdmrb{{surveyDetails.id}}\">\n\t\t\t\t\t\t\t\t<a *ngIf=\"surveyDetails && surveyDetails.is_respondent\" id=\"{{surveyDetails.id}}\" class=\"btn btn-primary\" routerLink='/survey/survey/details/{{surveyDetails.id}}'>Start Survey</a>\n\t\t\t\t\t\t\t\t<a *ngIf=\"surveyDetails\" id=\"{{surveyDetails.id+surveyDetails.name}}\" class=\"btn btn-primary\" routerLink='/survey/{{surveyDetails.id}}/results'>Survey Results</a>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t\n\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t<div *ngIf=\"surveyDetails.name\" class=\"col-lg-12\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"meet-elements\">\n\t\t\t\t\t\t\t\t\t\t\t\tSubject\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<label class=\"meet-elementsInfo\">\n\t\t\t\t\t\t\t\t\t\t\t\t{{surveyDetails.name}}\n\t\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div *ngIf=\"surveyDetails.meeting && surveyDetails.meeting.name\" class=\"col-lg-12\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"meet-elements\">\n\t\t\t\t\t\t\t\t\t\t\t\tMeeting Subject\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<a class=\"col-sm-6 col-md-4 col-lg-4 anchor-mb\" routerLink=\"/home/meeting/{{voting_object.meeting.id}}\">{{voting_object.meeting.name}}</a>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div *ngIf=\"surveyDetails.topic && surveyDetails.topic.name\" class=\"col-lg-12\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"meet-elements\">\n\t\t\t\t\t\t\t\t\t\t\t\tTopic Subject\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<a class=\"col-sm-6 col-md-4 col-lg-4 anchor-mb\" routerLink=\"/topic/{{voting_object.topic.id}}\">{{voting_object.topic.name}}</a>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t</div>\n\n\n\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t<div *ngIf=\"surveyDetails.hasOwnProperty('description') && surveyDetails.description\" class=\"col-lg-12\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"meet-elements\">\n\t\t\t\t\t\t\t\t\t\t\t\tDescription\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<label class=\"meet-elementsInfo\" [innerHtml]=\"surveyDetails.description\"></label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t<div *ngIf=\"surveyDetails.questions && surveyDetails.questions.length\" class=\"col-lg-12\">\n\t\t\t\t\t\t\t\t\t<div class=\"meet-elements\">\n\t\t\t\t\t\t\t\t\t\t\tQuestions\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<!-- <div *ngFor=\"let question of surveyDetails.questions\">\n\t\t\t\t\t\t\t\t\t\t<label class=\"meet-elementsInfo\">\n\t\t\t\t\t\t\t\t\t\t\t{{question.text}}\n\t\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t\t</div> -->\n\t\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t\t<label class=\"meet-elementsInfo\" *ngFor=\"let question of surveyDetails.questions\">\n\t\t\t\t\t\t\t\t\t\t\t{{question.text}}\n\t\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t</div>\n\t\t</div>\n\t\t<app-comments *ngIf=\"voting_object && voting_object.enable_discussion\" res_app=\"{{discussion_params.res_app}}\" res_model=\"{{discussion_params.res_model}}\" res_id=\"{{discussion_params.res_id}}\"></app-comments>\n\t</div>\n</div>\n"

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
    function SurveyComponent(httpService, route, router) {
        this.httpService = httpService;
        this.route = route;
        this.router = router;
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
        var args = {
            app: 'survey',
            model: 'Survey',
            method: 'get_details'
        };
        var final_input_data = {
            params: { survey_id: obj_this.route.snapshot.params.id },
            args: args
        };
        obj_this.httpService.get(final_input_data, function (result) {
            obj_this.surveyDetails = result;
            window["functions"].hideLoader('survey-iframe');
            // if(obj_this.surveyDetails['url']){
            //     $('#survey-iframe').attr('src',obj_this.surveyDetails['url']);
            //     $('#survey-iframe').load(function(){
            //         window["functions"].hideLoader('survey-iframe');
            //     });
            // }
            _this.bread_crumb.title = obj_this.surveyDetails['name'];
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
            obj_this.router.navigate(['/surveys']);
        });
    };
    SurveyComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'survey',
            styles: [__webpack_require__(/*! ./survey.css */ "./src/components/survey/survey.css"), __webpack_require__(/*! ../votingdetails/meetingdetails.css */ "./src/components/votingdetails/meetingdetails.css")],
            template: __webpack_require__(/*! ./survey.component.html */ "./src/components/survey/survey.component.html")
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], SurveyComponent);
    return SurveyComponent;
}());



/***/ }),

/***/ "./src/components/survey/survey.css":
/*!******************************************!*\
  !*** ./src/components/survey/survey.css ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".survey-form-container textarea.form-control{\n    margin-bottom: 20px;\n    min-height: 150px;\n    resize: none;\n}\n.survey-form-container .form-control{\n    margin-bottom: 20px;\n}\n.cancelbtn, .signupbtn{\n    min-width: 130px;\n    font-size: 0.859em;\n    margin-right: 5px;\n}\n.home-survey-title .title{\n    font-size: 1.500em;\n    margin-bottom: 15px;\n}\na.fc-more{\n    background-color: blue !important;\n    color: white !important;\n}\n.radio-wrap{\n    margin-bottom:15px; \n}\n.row.submit\n{\n    padding-top: 30px;\n}\n.survey-top-buttons\n{\n    padding: 5px;\n    margin-left: -10px;\n    margin-top: 5px;\n    margin-bottom: 5px;\n}\n.survey-top-buttons a\n{\n    margin-right: 5px;\n    font-size: 0.8rem;\n    line-height: 1.1rem;\n}\n"

/***/ }),

/***/ "./src/components/surveyresults/surveyresults.component.html":
/*!*******************************************************************!*\
  !*** ./src/components/surveyresults/surveyresults.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-breadcrumb \n*ngIf=\"surveyDetails\"\nroutes='[{\"title\":\"Actions\", \"link\":\"/actions\"}, {\"title\":\"Surveys\", \"link\":\"/actions/surveys\"}, {\"title\":\"{{surveyDetails.name}}\", \"link\":\"/survey/{{surveyDetails.id}}\"}]'\ntitle=\"Results\"></app-breadcrumb>\n<div class=\"router-outlet\">\n<div class=\"row d-flex justify-content-between mb-3\">\n    <div class=\"col\">\n        <div class=\"survey-top-buttons\">\n            <a *ngIf=\"surveyDetails && surveyDetails.is_respondent && surveyDetails.is_open\" id=\"{{surveyDetails.id}}\" class=\"btn btn-primary\" routerLink='/survey/survey/details/{{surveyDetails.id}}'>Reattempt Survey</a>\n        </div>\n    </div>\n</div>\n\n  <div class=\"container\" *ngIf=\"surveyDetails\">\n\t  <div class=\"MainTitleHeadWrap\">\n\t\t\t<div class=\"HeadingWrap\">\n\t\t\t\t{{surveyDetails.name}}\n\t\t\t</div>\n\t\t</div>\n      <div class=\"row\">\n\n          <div class=\"col-sm-8 mr-b20\" *ngIf=\"surveyDetails.questions\">\n              <div *ngFor=\"let question of surveyDetails.questions\" class=\"row surveyDetailsquestions\">\n                  <div class=\"col-sm-12\">\n                      <label>\n                          Question\n                      </label>\n                  </div>\n                  <div class=\"col-sm-9 UserProfileDiscription\">\n                      <h4>{{question.name}}</h4>\n                      <div *ngIf=\"question.choices\" style=\"display: flex\">\n                          <div *ngFor=\"let choice of question.choices\">\n                            <label>\n                                {{choice}}&nbsp;&nbsp;\n                            </label>\n                          </div>\n                      </div>\n                      <div *ngIf=\"question.user_answers\">\n                          <div *ngFor=\"let answer of question.user_answers\" style=\"display: flex\">\n                            <div class=\"col-sm-4\" style=\"border-right: 1px solid #cccccc;\">\n                              <label>\n                                  {{answer.answers}}&nbsp;&nbsp;\n                              </label>\n                            </div>\n                            <div class=\"col-sm-4\">\n                                <label>\n                                    {{answer.user_name}}&nbsp;&nbsp;\n                                </label>\n                              </div>\n                          </div>\n                      </div>\n                      <div *ngIf=\"question.chart_data && question.chart_data.length\">\n                        <canvas id=\"chartData-{{question.id}}\"></canvas>\n                      </div>\n                  </div>\n              </div>\n              <!-- <div *ngIf=\"topic.lead\" class=\"row\">\n                  <div class=\"col-sm-3\">\n                      <label>\n                          Lead\n                      </label>\n                  </div>\n                  <div class=\"col-sm-9 UserProfileDiscription\">\n                      {{topic.lead}}\n                  </div>\n              </div>\n              <div *ngIf=\"topic.duration\" class=\"row\">\n                  <div class=\"col-sm-3\">\n                      <label>\n                          Duration\n                      </label>\n                  </div>\n                  <div class=\"col-sm-9 UserProfileDiscription\">\n                      {{topic.duration}}\n                  </div>\n              </div>\n              <div *ngIf=\"topic.content\" class=\"row\">\n                  <div class=\"col-sm-3\">\n                      <label>\n                          Content\n                      </label>\n                  </div>\n                  <div class=\"col-sm-9 UserProfileDiscription\">\n                      {{topic.content}}\n                  </div>\n              </div> -->\n\n              \n          </div>\n\t\t   <div class=\"col-sm-4\">\n\t\t\t\t<div class=\"sticky-top\">\n\t\t  \t\t\t<canvas id=\"progress-chart\"></canvas>\n\t  \t\t\t</div>\n\t\t\t</div>\n      </div>\n  </div>\n  <!-- <div class=\"container\">\n      <div *ngIf=\"topic.votings && topic.votings.length\" class=\"title-wrapper\">\n          <div class=\"modal-header\">\n              Approval/Voting\n          </div>\n          <div class=\"row\">\n              <div class=\"kanban-card survey\" *ngFor=\"let vote of topic.votings\">\n                  <div class=\"SurveysInfoBox d-flex flex-wrap justify-content-between align-items-center\">\n                      <div class=\"SurveysInfoBoxTitle\">\n                          <span class=\"container\">\n                              <h5>\n                                  {{vote.name}}\n                              </h5>\n                          </span>\n                      </div>\n                      <div class=\"\">\n                          <button class=\"btn btn-primary\" routerLink=\"/voting/{{vote.id}}\">\n                              <span *ngIf = \"vote.my_status != 'pending'\">Results</span>\n                              <span *ngIf = \"vote.my_status == 'pending'\">Start</span>\n                          </button>\n                      </div>\n                  </div>\n              </div>\n          </div>\n      </div>\n  </div>\n  <section *ngIf=\"topic.docs && topic.docs.length\" class=\"HomepageDocumentSection\">\n      <div class=\"container\">\n          <div class=\"row\">\n              <div class=\"col-sm-12\">\n                  <h4>\n                      Documents\n                  </h4>\n                  <br>\n              </div>\n              <div class=\"col-sm-12\">\n                  <div class=\"row\">\n                      <a class=\"col-sm-6 col-md-4 col-lg-3\" routerLink=\"/topic/doc/{{doc.id}}\" *ngFor=\"let doc of topic.docs\">\n                          <div class=\"DocumentWrapper\">\n                                  <div class=\"DocIcon\">\n                                  <i class=\"fa fa-file\"></i>\n                              </div>\n                              <div class=\"DocText\">{{doc.name}}</div>\n                          </div>\n                      </a>\n                  </div>\n              </div>\n          </div>\n      </div>\n  </section> -->\n</div>\n"

/***/ }),

/***/ "./src/components/surveyresults/surveyresults.component.ts":
/*!*****************************************************************!*\
  !*** ./src/components/surveyresults/surveyresults.component.ts ***!
  \*****************************************************************/
/*! exports provided: SurveyresultsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SurveyresultsComponent", function() { return SurveyresultsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../app/http.service */ "./src/app/http.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_socket_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/socket.service */ "./src/app/socket.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SurveyresultsComponent = /** @class */ (function () {
    function SurveyresultsComponent(httpService, route, ss, router) {
        this.httpService = httpService;
        this.route = route;
        this.ss = ss;
        this.router = router;
        this.data_loaded = false;
        this.socketService = this.ss;
    }
    SurveyresultsComponent.prototype.ngOnInit = function () {
        var obj_this = this;
        var input_data = { survey_id: obj_this.route.snapshot.params.id };
        var success_cb = function (result) {
            obj_this.surveyDetails = result;
            setTimeout(function () {
                for (var question in obj_this.surveyDetails.questions) {
                    if (obj_this.surveyDetails.questions[question].chart_data.length > 0) {
                        window['drawChart'](obj_this.surveyDetails.questions[question].chart_data, '#chartData-' + obj_this.surveyDetails.questions[question].id);
                    }
                }
                if (obj_this.surveyDetails.progress_data) {
                    window['drawChart'](obj_this.surveyDetails.progress_data, '#progress-chart');
                }
            }, 100);
        };
        var failure_cb = function (error) {
            obj_this.router.navigate(['/survey/' + obj_this.route.snapshot.params.id]);
        };
        var args = {
            app: 'survey',
            model: 'Survey',
            method: 'get_results'
        };
        var final_input_data = {
            params: input_data,
            args: args
        };
        obj_this.httpService.get(final_input_data, success_cb, failure_cb);
    };
    SurveyresultsComponent.prototype.ngDoCheck = function () {
        // console.log(667, this.data_loaded);
    };
    SurveyresultsComponent.prototype.ngAfterViewInit = function () {
        // console.log(5522, this.data_loaded);
    };
    SurveyresultsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-surveyresults',
            template: __webpack_require__(/*! ./surveyresults.component.html */ "./src/components/surveyresults/surveyresults.component.html"),
            styles: [__webpack_require__(/*! ./surveyresults.css */ "./src/components/surveyresults/surveyresults.css")]
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], src_app_socket_service__WEBPACK_IMPORTED_MODULE_3__["SocketService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], SurveyresultsComponent);
    return SurveyresultsComponent;
}());



/***/ }),

/***/ "./src/components/surveyresults/surveyresults.css":
/*!********************************************************!*\
  !*** ./src/components/surveyresults/surveyresults.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".surveyDetailsquestions label{\n\tcolor:#4B74B5;\n\tfont-size:18px;\n}\n\n.surveyDetailsquestions h4{\n\tcolor:#737373;\n\tfont-size:16px;\n\tline-height:19px;\n}\n"

/***/ }),

/***/ "./src/components/surveys/surveys.component.html":
/*!*******************************************************!*\
  !*** ./src/components/surveys/surveys.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-breadcrumb app=\"survey\" model=\"survey\" \ncreate=\"1\" \nroutes='[{\"title\":\"Actions\", \"link\":\"/actions\"}]'\ntitle=\"Surveys\"></app-breadcrumb>\n<div class=\"router-outlet\">\n\n    <div class=\"container\">\n        <div class=\"MainTitleHeadWrap\">\n            <div class=\"HeadingWrap\">\n                <img src=\"static/assets/images/meeting-icon.png\" alt=\"\" /> Surveys\n            </div>\n            <div class=\"row MeetingBtnWrapper\">\n                <div class=\"btn-group\">\n                    <a routerLink=\"/votings\" class=\"btn\">Resolutions</a>\n                    <a routerLink=\"/signdocs\" class=\"btn\">Esignature</a>\n                    <a routerLink=\"/surveys\" class=\"btn\">Surveys</a>\n                </div>\n            </div>\n        </div>\n    </div>\n\n\t<div class=\"container\" *ngIf=\"no_meet\" >\n\t\t<div class=\"row\">\n\t\t\t<div class=\"col-lg-12 \">\n\t\t\t\t<div class=\"jumbotron text-center\">\n\t\t\t\t\t<h1>No {{heading |titlecase}} for you :)</h1>\n\t\t\t\t\t<hr>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<div class=\"container\">\n\t\t<div class=\"row\">\n            <div class=\"col-sm-6 col-md-4 mb-4\" *ngFor=\"let survey of survey_data\">\n                <div class=\"kanban-card\">\n                    <div class=\"kanban-meeting-info\">\n                        <div class=\"kanban-upcoming-meeting\" routerLink=\"/survey/{{survey.id}}\">\n                            <div *ngIf=\"survey.open_date\" class=\"CalendarDateWrapper\">\n                                <span class=\"CalendarDateWrap\">\n                                    <span class=\"kanban-upcoming-meeting-date\">\n                                        {{survey.open_date.day}}\n                                    </span>\n                                        <span>\n                                        {{survey.open_date.month_year}}\n                                    </span>\n                                    <span>\n                                        {{survey.open_date.time}}\n                                    </span>\n                                </span>\n                            </div>\n                            <div class=\"Info\">\n                                <p class=\"text-truncate\" *ngIf=\"survey.name\">\n                                    <b>{{survey.name}}</b>\n                                </p>\n                                <span class=\" text-truncate\" *ngIf=\"survey.description\">\n                                    Description: {{survey.description}}\n                                </span>\n                                <span *ngIf=\"survey.meeting && survey.meeting.name\">\n                                    Meeting: {{survey.meeting.name}}\n                                </span>\n                            </div>\n                        </div>\n                        <div class=\"row d-flex justify-content-between\" *ngIf=\"survey.is_published\">\n                            <div class=\"col\">\n                                <div class=\"bs-btnwrap survey-top-buttons\" id=\"tdmrb{{survey.id}}\">\n                                    <a *ngIf=\"survey && survey.is_respondent && !survey.is_attempted\" id=\"{{survey.id}}\" class=\"btn\" routerLink='/survey/survey/details/{{survey.id}}'>Start Survey</a>\n                                    <a *ngIf=\"survey && survey.is_attempted\" id=\"{{survey.id+survey.name}}\" class=\"btn\" routerLink='/survey/{{survey.id}}/results'>Survey Results</a>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\t</div>\n</div>\n"

/***/ }),

/***/ "./src/components/surveys/surveys.component.ts":
/*!*****************************************************!*\
  !*** ./src/components/surveys/surveys.component.ts ***!
  \*****************************************************/
/*! exports provided: SurveysComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SurveysComponent", function() { return SurveysComponent; });
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



var SurveysComponent = /** @class */ (function () {
    function SurveysComponent(httpService, router, route) {
        this.httpService = httpService;
        this.router = router;
        this.route = route;
        this.no_meet = false;
        this.show = false;
        this.heading = 'Home';
        this.bread_crumb = {
            items: [],
            title: ''
        };
        var obj_this = this;
        this.httpService.fetch_paged_data = function (off_set, limit) {
            var req_peram = (window.location + '').split('/');
            var flag = req_peram[req_peram.length - 1];
            var req_url = '/meeting/list-json';
            var input_data = { meeting_type: flag, paging: { offset: off_set, limit: limit } };
            var success_cb = function (result) {
                // console.log(result)
                // for(var i in result.records)
                // {
                //     var open_date = result.records[i]['open_date'];
                //     open_date= window['functions'].meeting_time(open_date);
                //     result.records[i]['open_date'] = open_date;
                // }
                obj_this.survey_data = result.records;
                obj_this.httpService.total_records = result.total;
                obj_this.survey_data.length > 0 ? obj_this.no_meet = false : obj_this.no_meet = true;
            };
            var args = {
                app: 'survey',
                model: 'Survey',
                method: 'get_records'
            };
            var final_input_data = {
                params: input_data,
                args: args
            };
            obj_this.httpService.get(final_input_data, success_cb, null);
        };
    }
    SurveysComponent.prototype.ngOnInit = function () {
        window['json_functions'].find_activate_link('.MeetingBtnWrapper');
        var req_peram = (window.location + '').split('/');
        var flag = req_peram[req_peram.length - 1];
        this.meeting_type = flag;
        // console.log(flag)
        this.heading = flag;
        var obj_this = this;
        // let req_url = '/meeting/list-json';
        var input_data = { meeting_type: flag, paging: { offset: 0, limit: 10 } };
        var success_cb = function (result) {
            // console.log(result)
            for (var i in result.records) {
                var open_date = result.records[i]['open_date'];
                open_date = window['functions'].meeting_time(open_date);
                result.records[i]['open_date'] = open_date;
            }
            obj_this.survey_data = result.records;
            obj_this.httpService.total_records = result.total;
            obj_this.survey_data.length > 0 ? obj_this.no_meet = false : obj_this.no_meet = true;
            // make_bread_crumb(flag);
        };
        var failure_cb = function (error) {
        };
        var args = {
            app: 'survey',
            model: 'Survey',
            method: 'get_records'
        };
        var final_input_data = {
            params: input_data,
            args: args
        };
        this.httpService.get(final_input_data, success_cb, failure_cb);
        function make_bread_crumb(page_title) {
            var bread_crumb_items = obj_this.bread_crumb.items;
            if (page_title) {
                obj_this.bread_crumb.title = page_title;
            }
        }
    };
    SurveysComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-surveys',
            template: __webpack_require__(/*! ./surveys.component.html */ "./src/components/surveys/surveys.component.html"),
            styles: [__webpack_require__(/*! ./surveys.css */ "./src/components/surveys/surveys.css")]
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], SurveysComponent);
    return SurveysComponent;
}());



/***/ }),

/***/ "./src/components/surveys/surveys.css":
/*!********************************************!*\
  !*** ./src/components/surveys/surveys.css ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/components/topics/meetingdetails.css":
/*!**************************************************!*\
  !*** ./src/components/topics/meetingdetails.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".note{\n\tborder: 1px solid gray;\n\tpadding: 1%;\n\tmargin: 1% 0;\n\tbackground: #f1f2f4;\n\tfont-size: 14px;\n\tfont-weight: 900;\n}\n\nh5, .h5 {\n    font-size: 0.898rem;\n}\n\n.active{\n    background-color: #9c4784 !important;\n    color: white;\n}\n\n.btn-default{\n    background-color: silver;\n}\n\n.btn-default:focus {\n    outline: solid;\n}\n\n.navbar{\n    background-color: #eeeeee;\n}\n\n.home{\n    background-color: transparent !important;\n}\n\n.kanban-card.survey\n{\n    width: 240px;\n}\n\n.bordered{\n    border: 1px solid #808080;\n}\n\n.modal-header, .modal-footer{\n    background-color: #eeeeee !important;\n}\n\n#addSlot>.modal-dialog>.modal-content{\n    border: 0px !important;\n    box-shadow: 1px 5px 20px 3px #808080;\n}\n\n.add-slot{\n    cursor: pointer;\n    background-color: #54ab35;\n    height: 50px;\n    width: 50px;\n    color: white;\n    font-size: 32px;\n    position: fixed;\n    top: 68px;\n    left: 20px;\n    border: 0px !important;\n    border-radius: 50px;\n    box-shadow: 1px 2px 10px 1px #808080;\n}\n\n.btn-info, .btn-info>a, .btn-secondary{\n    background-color: white;\n    border-color: white;\n}\n\n/*Success Snackbar*/\n\n.snackbar-success {\n    visibility: hidden;\n    min-width: 250px;\n    margin-left: -125px;\n    background-color: #54C036;\n    color: #fff;\n    text-align: center;\n    border-radius: 2px;\n    padding: 16px;\n    position: fixed;\n    z-index: 1;\n    left: 50%;\n    bottom: 30px;\n    font-size: 17px;\n    z-index: 999;\n}\n\n.snackbar-success.show {\n    visibility: visible;\n    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;\n    animation: fadein 0.5s, fadeout 0.5s 2.5s;\n}\n\n@-webkit-keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n\n@keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n\n@-webkit-keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n\n@keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n\n/*ERROR SNACKBAR*/\n\n.snackbar-error {\n    visibility: hidden;\n    min-width: 250px;\n    margin-left: -125px;\n    background-color: #ff0033;\n    color: white;\n    text-align: center;\n    border-radius: 2px;\n    padding: 16px;\n    position: fixed;\n    z-index: 1;\n    left: 50%;\n    bottom: 30px;\n    font-size: 17px;\n    z-index: 999;\n}\n\n.snackbar-error.show {\n    visibility: visible;\n    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;\n    animation: fadein 0.5s, fadeout 0.5s 2.5s;\n}\n\n@-webkit-keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n\n@keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n\n@-webkit-keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n\n@keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n\n/* .meeting-details-form {\n    background: #f3f3f3;\n    border-left: 5px solid #7c7bad;\n    padding: 30px;\n    margin-bottom: 30px;\n} */\n\n.title-wrapper .modal-header{\n    margin: 0px 0 25px;\n    padding: 10px 0;\n    font-size: 30px;\n    font-weight: 400;\n    background: transparent !important;\n    color: #2B2B2B;\n}\n\n.SurveysInfoBox {\n    background: #f3f3f3;\n    min-height: 110px;\n    border-radius: 3px;\n    border: 1px solid #f1eeee;    \n    padding: 5px 15px;\n    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.27);\n}\n\n.SurveysInfoBoxTitle h5 b{\n    font-weight: 700;\n    line-height: 1.3;\n    color: #515365;\n}\n\n.SurveysInfoBoxTitle h5 span{\n  display:block;\n  font-weight:400;\n  font-size:13px;\n}\n\n.meeting-details-roster-info-img{\n    margin-right: 15px;\n}\n\n.comments button{\n    margin: 0 !important;\n}\n\n.comments textarea.form-control{\n    margin-bottom: 20px;\n    min-height: 150xp;\n}\n\n.reply.container .label\n{\n    padding-bottom: 20px;\n}\n\n.container.comments {\n    padding-bottom: 20px;\n}\n\n.message.reply, .mainthread{\n    background: #eeeeee;\n    border-radius: 13px;\n    padding: 1%;\n}\n\n.message.reply{\n    background: silver;\n}\n\n/* .comments-container {\n    border-right: 1px solid #eeeeee;\n    border-left: 1px solid #eeeeee;\n    padding: 0 6%;\n} */\n\n.label{\n    cursor: pointer;\n    float: right;\n    background: #eeeeee;\n    padding: 0 5px;\n    border-radius: 25px;\n    font-weight: bolder;\n}\n\n.comment_response{\n    font-size: 12px;\n    color: grey;\n    padding: 0 0 0 3%;\n    margin-bottom: 10px;\n    margin-top: 5px;\n}\n\n.label > div {\n    width: 35px;\n    text-align: center;\n}\n\n.main.comment_response a {\n    padding: 0 5px 0 5px;\n}\n\n.reply-input {\n    margin: 0 0 10px 0;\n}\n\n.reply-body{\n\tword-wrap: break-word;\n\twidth: 80%;\n}\n\n.anchor-mb{\n    margin-bottom: 0.5rem;\n}\n"

/***/ }),

/***/ "./src/components/topics/topics.component.html":
/*!*****************************************************!*\
  !*** ./src/components/topics/topics.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-breadcrumb app=\"meetings\" model=\"topic\" \n*ngIf=\"topic && meeting_type\"\nrid={{topic.id}}\nedit=\"1\"\ndelete=\"1\"\nroutes='[{\"title\":\"{{meeting_type}} Meetings\", \"link\":\"/meetings/{{meeting_type}}\"},\n{\"title\":\"{{meeting_name}}\", \"link\":\"/meeting/{{meeting_id}}\"}]'\ntitle=\"{{topic.name}}\"></app-breadcrumb>\n<div class=\"router-outlet\"><div class=\"container\">\n\n\t<div class=\"container\">\n\t\t<div class=\"row\">\n\t\t\t<div class=\"col-lg-12\">\n\t\t\t\t<div class=\"MainTitleHeadWrap\">\n\t\t\t\t\t<div class=\"HeadingWrap\">\n\t\t\t\t\t\t<i _ngcontent-c4=\"\" class=\"icon-profile\"></i> {{topic.name}}\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n        <div class=\"row\">\n\n            <div class=\"col-sm-12 mr-b20\">\n                <div  class=\"row\">\n\t\t\t\t\t<div *ngIf=\"topic.name\" class=\"col-md-6\">\n\t\t\t\t\t\t<div class=\"meet-elements\">Name</div>\n\t\t\t\t\t\t<label class=\"meet-elementsInfo\">{{topic.name}}</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div *ngIf=\"topic.lead\" class=\"col-md-6\">\n\t\t\t\t\t\t<div class=\"meet-elements\">Lead</div>\n\t\t\t\t\t\t<label class=\"meet-elementsInfo\">{{topic.name}}</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div *ngIf=\"topic.duration\" class=\"col-md-6\">\n\t\t\t\t\t\t<div class=\"meet-elements\">Duration</div>\n\t\t\t\t\t\t<label class=\"meet-elementsInfo\">{{topic.duration}}</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div *ngIf=\"topic.content\" class=\"col-md-6\">\n\t\t\t\t\t\t<div class=\"meet-elements\">Content</div>\n\t\t\t\t\t\t<label class=\"meet-elementsInfo\">{{topic.content}}</label>\n\t\t\t\t\t</div>\n\n                </div>\n\n            </div>\n        </div>\n    </div>\n    <div class=\"container\">\n        <div *ngIf=\"topic.votings && topic.votings.length\" class=\"title-wrapper\">\n            <!--Votings-->\n\t\t\t<div class=\"row\">\n                <div class=\"col-sm-12\">\n                    <div class=\"main-heading\">\n\t\t\t\t\t\t<h1>\n                        \tApproval/Voting\n                    \t</h1>\n\t\t\t\t\t</div>\n                </div>\n\t\t\t</div>\n\n            <div class=\"row\">\n\t\t\t\t<div class=\"col-sm-6 col-md-4 mb-4\" *ngFor=\"let vote of topic.votings\">\n\t\t\t\t\t<div class=\"kanban-card voting\">\n\t\t\t\t\t\t<div class=\"VotingsInfoBox\">\n\t\t\t\t\t\t\t<div class=\"VotingsInfoBoxTitle \">\n\t\t\t\t\t\t\t\t<h5>\n\t\t\t\t\t\t\t\t\t<b>{{vote.name}}</b>\n\t\t\t\t\t\t\t\t</h5>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"bs-btnwrap\">\n\t\t\t\t\t\t\t<button class=\"btn btn-primary\" routerLink=\"/voting/{{vote.id}}\">\n\t\t\t\t\t\t\t\t<span *ngIf = \"vote.my_status != 'pending'\">Results</span>\n\t\t\t\t\t\t\t\t<span *ngIf = \"vote.my_status == 'pending'\">Start</span>\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n            </div>\n        </div>\n    </div>\n    <section *ngIf=\"topic.docs && topic.docs.length\" class=\"HomepageDocumentSection\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-sm-12\">\n                    <div class=\"main-heading\">\n\t\t\t\t\t\t<h1>\n                        \tDocuments\n                    \t</h1>\n\t\t\t\t\t</div>\n                </div>\n                <div class=\"col-sm-12\">\n\t\t\t\t\t<div class=\"row docwrappercontainer\">\n                        <a class=\"col-sm-6 col-md-4 col-lg-2\" routerLink=\"/topic/doc/{{doc.id}}\" *ngFor=\"let doc of topic.docs\">\n                            <div class=\"DocumentWrapper\">\n\t\t\t\t\t\t\t\t<div class=\"DocIcon\">\n\t\t\t\t\t\t\t\t\t<span class=\"rounded-circle\">\n\t\t\t\t\t\t\t\t\t\t<i class=\"icon-doc-file\"></i>\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"DocInfoVertical text-truncate\">\n\t\t\t\t\t\t\t\t\t{{doc.name}}\n\t\t\t\t\t\t\t\t</div>\n                            </div>\n                        </a>\n                    </div>\n                </div>\n            </div>\n        </div>\n\t</section>\n\t<div *ngIf=\"attachments.length > 0\" class=\"chat-selectBox\" id=\"attach_modal\">\n            <div class=\"call_container \">\n                <form>\n                <div *ngFor=\"let doc of attachments; let i = index\" contenteditable=\"false\"\n                    class=\"doc-thumb\" style=\"display: flex;\">\n                    <span class=\"doc-thumb-icon\"><i class=\"fa fa-2x fa-file\"></i></span>\n                    <!-- <span class=\"file_name\">{{doc.name}}</span> -->\n                    <div>\n                        <input type=\"text\" name=\"attachment_name\"\n                        (click)=\"$event.target.select()\" (change)=\"doc_name_change(doc, $event)\" value=\"{{doc.name}}\"/>\n                    </div>\n                    <span class=\"doc-thumb-close\" (click)=\"remove_attachment($event)\">\n                        <i class=\"del fas fa-times-circle\"></i>\n                    </span>\n                </div>\n            </form>\n            </div>\n        </div>\n        <div *ngIf=\"meeting_type && meeting_type == 'completed'\" class=\"input-group\">\n            <div class=\"input-group-append\">\n                <label>\n                    Attach Agenda Documents\n                </label>\n                <form style=\"padding: 10px;border:1px solid\" \n                class=\"input-group-text attach_btn btn btn-meeting\" (click)=\"attach_btn_click($event)\">\n                    <input (change)=\"file_change($event)\" id=\"msg_file\" type=\"file\" \n                        accept=\".pdf,.doc,.docx,.ppt\" \n                        multiple\n                        style=\"display:none\"\n                    />\n                    <i class=\"fas fa-paperclip\"></i>\n                </form>\n            </div>\n            <button class=\"btn btn-meeting\" (click)=\"upload_doucments()\">\n                <span>Upload Documents</span>\n            </button>\n        </div>\n</div>\n"

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
            id: '',
            lead: '',
            content: '',
            duration: '00:00',
            name: '',
            docs: [],
            votings: [],
        };
        this.bread_crumb = {
            items: [],
            title: ''
        };
        this.meeting_type = '';
        this.meeting_name = '';
        this.meeting_id = '';
        this.attachments = [];
    }
    TopicsComponent.prototype.file_change = function (event) {
        var obj_this = this;
        var res = new Promise(function (resolve, reject) {
            window['functions'].get_file_binaries(event.target.files, resolve);
        }).then(function (data) {
            data.forEach(function (element) {
                var ar = element.name.split('.');
                element.ext = ar[ar.length - 1];
                element.name = element.name.replace('.' + element.ext, '');
                element.file_name = element.name;
            });
            obj_this.attachments = obj_this.attachments.concat(data);
            var a = 21;
        });
    };
    TopicsComponent.prototype.doc_name_change = function (doc, e) {
        doc.name = e.target.value;
    };
    TopicsComponent.prototype.attach_btn_click = function (ev) {
        if (!$(ev.target).is('input')) {
            $(ev.target).closest('.attach_btn').find('input').click();
        }
    };
    TopicsComponent.prototype.remove_attachment = function (el) {
        var obj_this = this;
        var i = $(el.target).closest('#attach_modal .doc-thumb').index();
        obj_this.attachments.splice(i, 1);
    };
    TopicsComponent.prototype.upload_doucments = function () {
        var obj_this = this;
        obj_this.attachments.forEach(function (element) {
            element.file_name = element.name;
            element.name = element.name + '.' + element.ext;
        });
        if (obj_this.attachments.length && obj_this.topic) {
            var args = {
                app: 'meetings',
                model: 'AgendaDocument',
                method: 'upload_agenda_documents',
                post: 1
            };
            var input_data = {
                params: {
                    topic_id: obj_this.topic.id,
                    attachments: obj_this.attachments
                },
                args: args,
                no_loader: 1
            };
            obj_this.httpService.get(input_data, function (data) {
                obj_this.topic.docs = obj_this.topic.docs.concat(data);
                obj_this.attachments = [];
            }, null);
        }
    };
    TopicsComponent.prototype.ngOnInit = function () {
        var obj_this = this;
        var req_url = '/topic/details-json';
        var input_data = { id: obj_this.route.snapshot.params.id };
        var success_cb = function (result) {
            if (!result.votings) {
                result.votings = [];
            }
            obj_this.topic = result;
            // obj_this.bread_crumb.title = obj_this.topic['name'];
            // obj_this.bread_crumb.items.push({
            //     title: obj_this.topic['meeting_name'],
            //     link: '/meeting/' + obj_this.topic['meeting_id']
            // });
            obj_this.meeting_type = obj_this.topic['meeting_type'];
            obj_this.meeting_name = obj_this.topic['event__name'];
            obj_this.meeting_id = obj_this.topic['event__id'];
            obj_this.meeting_type === 'ongoing' ? obj_this.meeting_type = 'upcoming' : obj_this.meeting_type;
            if (obj_this.meeting_type) {
                obj_this.meeting_type === 'past' ? obj_this.meeting_type = 'archived' : obj_this.meeting_type;
            }
        };
        var failure_cb = function (error) {
        };
        var args = {
            app: 'meetings',
            model: 'Topic',
            method: 'get_details'
        };
        var final_input_data = {
            params: input_data,
            args: args
        };
        obj_this.httpService.get(final_input_data, success_cb, failure_cb);
    };
    TopicsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-topics',
            styles: [__webpack_require__(/*! ./meetingdetails.css */ "./src/components/topics/meetingdetails.css")],
            template: __webpack_require__(/*! ./topics.component.html */ "./src/components/topics/topics.component.html")
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], TopicsComponent);
    return TopicsComponent;
}());



/***/ }),

/***/ "./src/components/votingdetails/meetingdetails.css":
/*!*********************************************************!*\
  !*** ./src/components/votingdetails/meetingdetails.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".note{\n\tborder: 1px solid gray;\n\tpadding: 1%;\n\tmargin: 1% 0;\n\tbackground: #f1f2f4;\n\tfont-size: 14px;\n\tfont-weight: 900;\n}\n\nh5, .h5 {\n    font-size: 0.898rem;\n}\n\n.active{\n    background-color: #9c4784 !important;\n    color: white;\n}\n\n.btn-default{\n    background-color: silver;\n}\n\n.btn-default:focus {\n    outline: solid;\n}\n\n.navbar{\n    background-color: #eeeeee;\n}\n\n.home{\n    background-color: transparent !important;\n}\n\n.kanban-card.survey\n{\n    width: 240px;\n}\n\n.bordered{\n    border: 1px solid #808080;\n}\n\n.modal-header, .modal-footer{\n    background-color: #eeeeee !important;\n}\n\n#addSlot>.modal-dialog>.modal-content{\n    border: 0px !important;\n    box-shadow: 1px 5px 20px 3px #808080;\n}\n\n.add-slot{\n    cursor: pointer;\n    background-color: #54ab35;\n    height: 50px;\n    width: 50px;\n    color: white;\n    font-size: 32px;\n    position: fixed;\n    top: 68px;\n    left: 20px;\n    border: 0px !important;\n    border-radius: 50px;\n    box-shadow: 1px 2px 10px 1px #808080;\n}\n\n.btn-info, .btn-info>a, .btn-secondary{\n    background-color: white;\n    border-color: white;\n}\n\n/*Success Snackbar*/\n\n.snackbar-success {\n    visibility: hidden;\n    min-width: 250px;\n    margin-left: -125px;\n    background-color: #54C036;\n    color: #fff;\n    text-align: center;\n    border-radius: 2px;\n    padding: 16px;\n    position: fixed;\n    z-index: 1;\n    left: 50%;\n    bottom: 30px;\n    font-size: 17px;\n    z-index: 999;\n}\n\n.snackbar-success.show {\n    visibility: visible;\n    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;\n    animation: fadein 0.5s, fadeout 0.5s 2.5s;\n}\n\n@-webkit-keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n\n@keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n\n@-webkit-keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n\n@keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n\n/*ERROR SNACKBAR*/\n\n.snackbar-error {\n    visibility: hidden;\n    min-width: 250px;\n    margin-left: -125px;\n    background-color: #ff0033;\n    color: white;\n    text-align: center;\n    border-radius: 2px;\n    padding: 16px;\n    position: fixed;\n    z-index: 1;\n    left: 50%;\n    bottom: 30px;\n    font-size: 17px;\n    z-index: 999;\n}\n\n.snackbar-error.show {\n    visibility: visible;\n    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;\n    animation: fadein 0.5s, fadeout 0.5s 2.5s;\n}\n\n@-webkit-keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n\n@keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n}\n\n@-webkit-keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n\n@keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n}\n\n/* .meeting-details-form {\n    background: #f3f3f3;\n    border-left: 5px solid #7c7bad;\n    padding: 30px;\n    margin-bottom: 30px;\n} */\n\n.title-wrapper .modal-header{\n    margin:35px 0;\n    padding: 0 0 15px;\n    font-size: 30px;\n    font-weight: 400;\n    background: transparent !important;\n    color: #2B2B2B;\n}\n\n.SurveysInfoBox {\n    background: #f3f3f3;\n    min-height: 110px;\n    border-radius: 3px;\n    border: 1px solid #f1eeee;    \n    padding: 5px 15px;\n    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.27);\n}\n\n.SurveysInfoBoxTitle h5 b{\n    font-weight: 700;\n    line-height: 1.3;\n    color: #515365;\n}\n\n.SurveysInfoBoxTitle h5 span{\n  display:block;\n  font-weight:400;\n  font-size:13px;\n}\n\n.meeting-details-roster-info-img{\n    margin-right: 15px;\n}\n\n.comments button{\n    margin: 0 !important;\n}\n\n.comments textarea.form-control{\n    margin-bottom: 20px;\n    min-height: 150xp;\n}\n\n.reply.container .label\n{\n    padding-bottom: 20px;\n}\n\n.container.comments {\n    padding-bottom: 20px;\n}\n\n.message.reply, .mainthread{\n    background: #eeeeee;\n    border-radius: 13px;\n    padding: 1%;\n}\n\n.message.reply{\n    background: silver;\n}\n\n/* .comments-container {\n    border-right: 1px solid #eeeeee;\n    border-left: 1px solid #eeeeee;\n    padding: 0 6%;\n} */\n\n.label{\n    cursor: pointer;\n    float: right;\n    background: #eeeeee;\n    padding: 0 5px;\n    border-radius: 25px;\n    font-weight: bolder;\n}\n\n.comment_response{\n    font-size: 12px;\n    color: grey;\n    padding: 0 0 0 3%;\n    margin-bottom: 10px;\n    margin-top: 5px;\n}\n\n.label > div {\n    width: 35px;\n    text-align: center;\n}\n\n.main.comment_response a {\n    padding: 0 5px 0 5px;\n}\n\n.reply-input {\n    margin: 0 0 10px 0;\n}\n\n.reply-body{\n\tword-wrap: break-word;\n\twidth: 80%;\n}\n\n.anchor-mb{\n    margin-bottom: 0.5rem;\n}\n"

/***/ }),

/***/ "./src/components/votingdetails/votingdetails.component.html":
/*!*******************************************************************!*\
  !*** ./src/components/votingdetails/votingdetails.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-breadcrumb *ngIf=\"voting_object\" app=\"voting\" model=\"voting\" \nrid=\"{{voting_object.id}}\" edit=\"1\" delete=\"1\" \nroutes='[{\"title\":\"Actions\", \"link\":\"/actions\"}, {\"title\":\"Resolutions\", \"link\":\"/actions/votings\"}]'\ntitle=\"{{voting_object.name}}\"></app-breadcrumb>\n<div class=\"router-outlet\">\n\t<div class=\"container\">\n\n\t</div>\n    <div class=\"container\" *ngIf=\"voting_object\">\n\t\t<div class=\"MainTitleHeadWrap\">\n\t\t\t<div class=\"HeadingWrap\">\n\t\t\t\tPersonal Info\n\t\t\t</div>\n\t\t\t<div class=\"MeetingBtnWrapper\">\n\t\t\t\t<div class=\"btn-group\" id=\"tdmrb{{voting_object.id}}\">\n\t\t\t\t\t<a href=\"javascript:void(0);\" (click)='respond_invitation(option.name, option.id, voting_object.id)' class=\"btn\" *ngFor=\"let option of voting_object.voting_options\">\n\t\t\t\t\t\t<i *ngIf=\"voting_object.my_status == option.name\" class=\"fa fa-check fa-lg\"  modifiers=\"{}\"></i>\n\t\t\t\t\t\t<span name=\"option.name\">{{option.name}}</span>\n\t\t\t\t\t</a>\n\t\t\t\t\t<a href=\"javascript:void(0);\" style=\"display: none\" *ngIf=\"voting_object && voting_object.signature_required == true\" id=\"{{voting_object.id}}\" class=\"fa fa-pen fa-lg strt_sign voting\" url='/voting/save_signature'></a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n        <div class=\" form-details\">\n            <div class=\"meeting-details-form\">\n                <div class=\"row\">\n                    <!-- <div *ngIf=\"voting_object.signature\">\n                        <img src=\"data:image/png;base64,{{voting_object.signature}}\" height=\"280\" width=\"466\" />\n                    </div> -->\n\t\t\t\t\t<div *ngIf=\"voting_object.my_status\" class=\"col-md-6 mb-2\">\n\t\t\t\t\t\t<div class=\"meet-elements\">\n\t\t\t\t\t\t\tMy Status\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<label class=\"meet-elementsInfo\">\n\t\t\t\t\t\t\t{{voting_object.my_status}}\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\n                    <div *ngIf=\"voting_object.name && voting_object.name\" class=\"col-md-6 mb-2\">\n                        <div class=\"meet-elements\">\n                            Subject\n                        </div>\n                        <label class=\"meet-elementsInfo\">\n                            {{voting_object.name}}\n                        </label>\n                    </div>\n\n                    <div *ngIf=\"voting_object.motion_first\" class=\"col-md-6 mb-2\">\n                        <div class=\"meet-elements\">\n                            Motion First\n                            <span class=\"fa fa-user motion-icon\"></span>\n                        </div>\n                        <a class=\"col-sm-6 col-md-4 col-lg-4 anchor-mb\" routerLink=\"/profile/{{voting_object.motion_first.id}}\">{{voting_object.motion_first.name}}</a>\n                    </div>\n\n                    <div *ngIf=\"voting_object.motion_second\" class=\"col-md-6 mb-2\">\n                        <div class=\"meet-elements\">\n                            Motion Second\n                            <span class=\"fa fa-user motion-icon\"></span>\n                        </div>\n                        <a class=\"col-sm-6 col-md-4 col-lg-4 anchor-mb\" routerLink=\"/profile/{{voting_object.motion_second.id}}\">{{voting_object.motion_second.name}}</a>\n                    </div>\n\n                    <div *ngIf=\"voting_object.meeting.name\" class=\"col-md-6 mb-2\">\n                        <div class=\"meet-elements\">\n                            Meeting Subject\n                        </div>\n                        <a class=\"col-sm-6 col-md-4 col-lg-4 anchor-mb\" routerLink=\"/home/meeting/{{voting_object.meeting.id}}\">{{voting_object.meeting.name}}</a>\n                    </div>\n\n                    <div *ngIf=\"voting_object.topic.name\" class=\"col-md-6 mb-2\">\n                        <div class=\"meet-elements\">\n                            Topic Subject\n                        </div>\n                        <a class=\"col-sm-6 col-md-4 col-lg-4 anchor-mb\" routerLink=\"/topic/{{voting_object.topic.id}}\">{{voting_object.topic.name}}</a>\n                    </div>\n\n                    <div *ngIf=\"voting_object.open_date && voting_object.open_date\" class=\"col-md-6 mb-2\">\n                        <div class=\"meet-elements\">\n                            Open Date\n                        </div>\n                        <label class=\"meet-elementsInfo\">\n                            {{voting_object.open_date | date:'medium' }}\n                        </label>\n                    </div>\n\n                    <div *ngIf=\"voting_object.close_date && voting_object.close_date\" class=\"col-md-6 mb-2\">\n                        <div class=\"meet-elements\">\n                            Close Date\n                        </div>\n                        <label class=\"meet-elementsInfo\">\n                            {{voting_object.close_date | date:'medium'}}\n                        </label>\n                    </div>\n\t\t\t\t\t<div *ngIf=\"voting_object.hasOwnProperty('description') && voting_object.description\" class=\"col-md-12 mb-2\">\n                        <div class=\"meet-elements\">\n                            Description\n                        </div>\n                        <label class=\"meet-elementsInfo\" [innerHtml]=\"voting_object.description\"></label>\n                    </div>\n\n                </div>\n\n                <div class=\"row\" *ngIf=\"voting_object.signature_data\">\n                    <div class=\"col-sm-8 \" style=\"display: flex;\">\n                        <div style=\"position:relative;cursor: pointer;\">\n                            <img class=\"strt_sign_voting \" style=\"width: 100%;\" *ngIf=\"voting_object.signature_data\" src=\"data:image/png;base64,{{voting_object.signature_data}}\">\n                        </div>\n                    </div>\n                </div>\n                <div style=\"display:none\" class=\"title-wrapper voting-chart\">\n                    <div class=\"modal-header\">\n                        Graphical View\n                    </div>\n                    <div class=\"row mt-5 mb-5 d-flex justify-content-center\">\n                        <div class=\"col-sm-12 col-md-7 col-lg-8\">\n\t\t\t\t\t\t\t<canvas id=\"myChart\"></canvas>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n                </div>\n\n                <div *ngIf=\"voting_object.voting_docs && voting_object.voting_docs.length\" class=\"title-wrapper\">\n                    <div class=\"modal-header\">\n                        Voting Documents\n                    </div>\n\t\t\t\t\t<div class=\"row docwrappercontainer\">\n\t\t\t\t\t\t<div class=\"col-sm-6 col-md-4 col-lg-2 mb-4\" *ngFor=\"let doc of voting_object.voting_docs\">\n\t\t\t\t\t\t\t<a routerLink=\"/voting/doc/{{doc.id}}\" class=\"\">\n\t\t\t\t\t\t\t\t<div class=\"DocumentWrapper\">\n\t\t\t\t\t\t\t\t\t<div class=\"DocIcon\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"rounded-circle\">\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"icon-doc-file\"></i>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"DocInfoVertical text-truncate\">\n\t\t\t\t\t\t\t\t\t\t{{doc.name}}\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n                </div>\n            </div>\n        </div>\n        <app-comments *ngIf=\"voting_object && voting_object.enable_discussion\" res_app=\"{{discussion_params.res_app}}\" res_model=\"{{discussion_params.res_model}}\" res_id=\"{{discussion_params.res_id}}\"></app-comments>\n    </div>\n</div>\n"

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




var VotingdetailsComponent = /** @class */ (function () {
    function VotingdetailsComponent(route, router, httpService, socketService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.httpService = httpService;
        this.socketService = socketService;
        this.notes = [];
        this.new_reply = '';
        this.bread_crumb = {
            items: [],
            title: ''
        };
        this.discussion_params = {
            res_app: 'voting',
            res_model: 'Voting',
            res_id: 0,
        };
        this.next = '';
        this.prev = '';
        this.title = '';
        this.flag = '';
        this.first_time = true;
        this.conference_not_active = false;
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
        var input_data = { id: this.route.snapshot.params.id };
        var on_data = function (result) {
            try {
                if (result.message) {
                    $('.router-outlet').html('<h2 style="text-align:center">' + result.message + '</h2>');
                    return;
                }
                obj_this.discussion_params.res_id = result.id;
                obj_this.voting_object = result;
                // make_bread_crumb(obj_this.voting_object.name);
                if (obj_this.voting_object.chart_data.length && obj_this.voting_object.public_visibility) {
                    setTimeout(function () {
                        window['drawChart'](obj_this.voting_object.chart_data, '#myChart');
                        $('.voting-chart:first').show();
                    }, 100);
                }
            }
            catch (er) {
                console.log(er);
            }
        };
        var args = {
            app: 'voting',
            model: 'Voting',
            method: 'get_details'
        };
        var final_input_data = {
            params: input_data,
            args: args
        };
        obj_this.httpService.get(final_input_data, on_data, null);
        function make_bread_crumb(page_title) {
            var bread_crumb_items = obj_this.bread_crumb.items;
            if (obj_this.voting_object.topic.name) {
                bread_crumb_items.push({ title: obj_this.voting_object.topic.name, link: '/topic/' + obj_this.voting_object.topic.id });
            }
            else if (obj_this.voting_object.meeting.name) {
                bread_crumb_items.push({ title: obj_this.voting_object.meeting.name, link: '/home/meeting/' + obj_this.voting_object.meeting.id });
            }
            if (page_title) {
                obj_this.bread_crumb.title = page_title;
            }
        }
    };
    VotingdetailsComponent.prototype.voting_closed = function (close_date) {
        var closed = false;
        var closingDate = new Date(close_date).getTime();
        var dateNow = new Date().getTime();
        if (closingDate < dateNow) {
            closed = true;
        }
        return closed;
    };
    VotingdetailsComponent.prototype.voting_opened = function (open_date) {
        var opened = false;
        var openingDate = new Date(open_date).getTime();
        var dateNow = new Date().getTime();
        if (openingDate > dateNow) {
            opened = true;
        }
        return opened;
    };
    VotingdetailsComponent.prototype.respond_invitation = function (option_name, response, voting_id) {
        var obj_this = this;
        var chek = $('.upcomingButton .fa-check:first');
        if (chek.length > 0) {
            var c_name = chek.parent().text();
            if (c_name == option_name) {
                return;
            }
        }
        var voting_response_data = {
            args: {
                app: 'voting',
                model: 'VotingAnswer',
                method: 'submit'
            },
            params: {
                voting_id: voting_id,
                voting_option_id: response
            }
        };
        function submit_response(voting_response_data) {
            obj_this.httpService.post(voting_response_data, function (update_results) {
                obj_this.voting_object.my_status = option_name;
                obj_this.voting_object.chart_data = update_results.chart_data;
                if (obj_this.voting_object.chart_data.length && obj_this.voting_object.public_visibility) {
                    window['drawChart'](obj_this.voting_object.chart_data, '#myChart');
                    $('.voting-chart:first').show();
                }
            }, null);
        }
        if (!obj_this.voting_opened(obj_this.voting_object.open_date)
            || obj_this.voting_closed(obj_this.voting_object.close_date)) {
            if (obj_this.voting_object.signature_required) {
                var sign_config = {
                    signature_data: obj_this.voting_object.signature_data,
                    on_signed: function (signature_data) {
                        obj_this.voting_object.signature_data = signature_data;
                        voting_response_data.params['signature_data'] = signature_data;
                        submit_response(voting_response_data);
                    }
                };
                window['init_sign'](sign_config);
            }
            else {
                submit_response(voting_response_data);
            }
        }
        else {
            window['bootbox'].alert('This Approval/Voting is Closed now.');
        }
    };
    VotingdetailsComponent.prototype.ngOnInit = function () {
    };
    VotingdetailsComponent.prototype.ngOnDestroy = function () {
        window['voting_id'] = -1;
    };
    VotingdetailsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-votingdetails',
            styles: [__webpack_require__(/*! ./meetingdetails.css */ "./src/components/votingdetails/meetingdetails.css"), __webpack_require__(/*! ./votingdetails.css */ "./src/components/votingdetails/votingdetails.css")],
            template: __webpack_require__(/*! ./votingdetails.component.html */ "./src/components/votingdetails/votingdetails.component.html")
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _app_http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"],
            _app_socket_service__WEBPACK_IMPORTED_MODULE_3__["SocketService"]])
    ], VotingdetailsComponent);
    return VotingdetailsComponent;
}());



/***/ }),

/***/ "./src/components/votingdetails/votingdetails.css":
/*!********************************************************!*\
  !*** ./src/components/votingdetails/votingdetails.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/components/votingresults/survey.css":
/*!*************************************************!*\
  !*** ./src/components/votingresults/survey.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n.survey-form-container textarea.form-control{\n    margin-bottom: 20px;\n    min-height: 150px;\n    resize: none;\n}\n.survey-form-container .form-control{\n    margin-bottom: 20px;\n}\n.cancelbtn, .signupbtn{\n    min-width: 130px;\n    font-size: 0.859em;\n    margin-right: 5px;\n}\n.home-survey-title .title{\n    font-size: 1.500em;\n    margin-bottom: 15px;\n}\na.fc-more{\n    background-color: blue !important;\n    color: white !important;\n}\n.radio-wrap{\n    margin-bottom:15px; \n}\n.row.submit\n{\n    padding-top: 30px;\n}\n"

/***/ }),

/***/ "./src/components/votingresults/votingresults.component.html":
/*!*******************************************************************!*\
  !*** ./src/components/votingresults/votingresults.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-breadcrumb *ngIf=\"surveyDetails\" app=\"voting\" model=\"voting\" \nrid=\"{{surveyDetails.id}}\" edit=\"1\" delete=\"1\" \nroutes='[{\"title\":\"Votings\", \"link\":\"/votings\"}, {\"title\":\"surveyDetails.name\", \"link\":\"/voting/surveyDetails.id\"}]'\ntitle=\"Voting Results\"></app-breadcrumb>\n\n<div class=\"router-outlet\">\n    <div class=\"dociframecontaine\"style=\"width: calc(100vw + 17px);\n    top: 94px;\n    margin-left: -15px;\n    position: fixed;\n    height: calc(100vh - 94px);\">\n        <iframe id='survey-iframe' style=\"width: 100%;height: 100%;\">\n        </iframe>\n    </div>\n</div>"

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
        var voting_url = window["site_config"].server_base_url + '/voting/graphical/a-' + voting_id + '/' + cookie.id + '/' + cookie.token + '/' + cookie.db;
        console.log(voting_url);
        $('#survey-iframe').attr('src', voting_url);
        $('#survey-iframe').load(function () {
            window["functions"].hideLoader('survey-iframe');
        });
        var args = {
            app: 'voting',
            model: 'Voting',
            method: 'get_details'
        };
        var final_input_data = {
            params: { id: voting_id },
            args: args
        };
        obj_this.httpService.get(final_input_data, function (result) {
            obj_this.surveyDetails = result;
            _this.bread_crumb.title = _this.surveyDetails['title'];
            // if (page_url.indexOf('home') !== -1) {
            //     this.bread_crumb.items.push({
            //         title: 'Home',
            //         link: '/'
            //     });
            // }
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
            styles: [__webpack_require__(/*! ./survey.css */ "./src/components/votingresults/survey.css")],
            template: __webpack_require__(/*! ./votingresults.component.html */ "./src/components/votingresults/votingresults.component.html"),
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], VotingresultsComponent);
    return VotingresultsComponent;
}());



/***/ }),

/***/ "./src/components/votings/votings.component.html":
/*!*******************************************************!*\
  !*** ./src/components/votings/votings.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-breadcrumb  app=\"voting\" model=\"voting\" \n*ngIf=\"voting_data\"\ncreate=\"1\"\ntitle=\"Resolutions\"></app-breadcrumb>\n\n<div class=\"router-outlet\">\n\t<div class=\"container\">\n\t\t<div class=\"MainTitleHeadWrap\">\n\t\t\t\t<div class=\"HeadingWrap\">\n\t\t\t\t\t<img src=\"static/assets/images/meeting-icon.png\" alt=\"\" /> Resolutions\n\t\t\t\t</div>\n\t\t\t\t<div class=\"MeetingBtnWrapper\">\n\t\t\t\t\t<div class=\"btn-group\">\n\t\t\t\t\t\t<a routerLink=\"/votings\" class=\"btn\">Resolutions</a>\n\t\t\t\t\t\t<a routerLink=\"/signdocs\" class=\"btn\">Esignature</a>\n\t\t\t\t\t\t<a routerLink=\"/surveys\" class=\"btn\">Surveys</a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t</div>\n\n\t<div class=\"container\" *ngIf=\"no_meet\" >\n\t\t<div class=\"row\">\n\t\t\t<div class=\"col-lg-12 \">\n\t\t\t\t<div class=\"jumbotron text-center\">\n\t\t\t\t\t<h1>No {{heading |titlecase}} for you :)</h1>\n\t\t\t\t\t<hr>\n                </div>\n            </div>\n        </div>\n\t</div>\n\t<div class=\"container\">\n\t\t<div class=\"row\">\n\t\t\t<div class=\"col-sm-6 col-md-4 mb-4\" *ngFor=\"let voting of voting_data\">\n\t\t\t\t<div class=\"kanban-card\">\n\t\t\t\t\t<div class=\"kanban-meeting-info\">\n\t\t\t\t\t\t<a class=\"kanban-upcoming-meeting\" routerLink=\"/voting/{{voting.id}}\">\n\t\t\t\t\t\t\t<div class=\"CalendarDateWrapper\">\n\t\t\t\t\t\t\t\t<span *ngIf=\"voting.open_date\" class=\"CalendarDateWrap\">\n\t\t\t\t\t\t\t\t\t<span class=\"kanban-upcoming-meeting-date\">\n\t\t\t\t\t\t\t\t\t{{voting.open_date.day}}\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t\t{{voting.open_date.month_year}}\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t\t{{voting.open_date.time}}\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"Info\">\n\t\t\t\t\t\t\t\t<p *ngIf=\"voting.name\">\n\t\t\t\t\t\t\t\t\t<b>{{voting.name}}</b>\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t<span *ngIf=\"voting.voting_type\">\n\t\t\t\t\t\t\t\t\t<strong>Voting Type: </strong>{{voting.voting_type}}\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n"

/***/ }),

/***/ "./src/components/votings/votings.component.ts":
/*!*****************************************************!*\
  !*** ./src/components/votings/votings.component.ts ***!
  \*****************************************************/
/*! exports provided: VotingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VotingsComponent", function() { return VotingsComponent; });
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



var VotingsComponent = /** @class */ (function () {
    function VotingsComponent(httpService, router, route) {
        this.httpService = httpService;
        this.router = router;
        this.route = route;
        this.no_meet = false;
        this.show = false;
        this.heading = 'Home';
        this.bread_crumb = {
            items: [],
            title: ''
        };
        var obj_this = this;
        this.httpService.fetch_paged_data = function (off_set, limit) {
            var req_peram = (window.location + '').split('/');
            var flag = req_peram[req_peram.length - 1];
            var req_url = '/meeting/list-json';
            var input_data = { meeting_type: flag, paging: { offset: off_set, limit: limit } };
            var success_cb = function (result) {
                // console.log(result)
                for (var i in result.records) {
                    var open_date = result.records[i]['open_date'];
                    open_date = window['functions'].meeting_time(open_date);
                    result.records[i]['open_date'] = open_date;
                }
                obj_this.voting_data = result.records;
                obj_this.httpService.total_records = result.total;
                obj_this.voting_data.length > 0 ? obj_this.no_meet = false : obj_this.no_meet = true;
            };
            var args = {
                app: 'Votings',
                model: 'Voting',
                method: 'get_records'
            };
            var final_input_data = {
                params: input_data,
                args: args
            };
            obj_this.httpService.get(final_input_data, success_cb, null);
        };
    }
    VotingsComponent.prototype.ngOnInit = function () {
        window['json_functions'].find_activate_link('.MeetingBtnWrapper');
        var req_peram = (window.location + '').split('/');
        var flag = req_peram[req_peram.length - 1];
        this.meeting_type = flag;
        // console.log(flag)
        this.heading = flag + ' Votings';
        var obj_this = this;
        // let req_url = '/meeting/list-json';
        var input_data = { meeting_type: flag, paging: { offset: 0, limit: 10 } };
        var success_cb = function (result) {
            // console.log(result)
            for (var i in result.records) {
                var open_date = result.records[i]['open_date'];
                open_date = window['functions'].meeting_time(open_date);
                result.records[i]['open_date'] = open_date;
            }
            obj_this.voting_data = result.records;
            obj_this.httpService.total_records = result.total;
            obj_this.voting_data.length > 0 ? obj_this.no_meet = false : obj_this.no_meet = true;
            // make_bread_crumb(flag);
        };
        var failure_cb = function (error) {
        };
        var args = {
            app: 'voting',
            model: 'Voting',
            method: 'get_records'
        };
        var final_input_data = {
            params: input_data,
            args: args
        };
        this.httpService.get(final_input_data, success_cb, failure_cb);
        function make_bread_crumb(page_title) {
            var bread_crumb_items = obj_this.bread_crumb.items;
            if (page_title) {
                obj_this.bread_crumb.title = page_title + ' Votings';
            }
        }
    };
    VotingsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-votings',
            template: __webpack_require__(/*! ./votings.component.html */ "./src/components/votings/votings.component.html"),
            styles: [__webpack_require__(/*! ./votings.css */ "./src/components/votings/votings.css")]
        }),
        __metadata("design:paramtypes", [_app_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], VotingsComponent);
    return VotingsComponent;
}());



/***/ }),

/***/ "./src/components/votings/votings.css":
/*!********************************************!*\
  !*** ./src/components/votings/votings.css ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

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

module.exports = __webpack_require__(/*! /home/sami/django/jangomeet/static/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map