! function(e, t) {
    "object" == typeof exports
     && "object" == typeof module ? 
        module.exports = t() : "function" == typeof define
     && define.amd ?
        define([], t) : "object" == typeof exports ? 
            exports.JitsiMeetExternalAPI = t() : e.JitsiMeetExternalAPI = t()
}("undefined" != typeof self ? self : this, function() {
    return function(e) {
        function t(r) {
            if (n[r]) return n[r].exports;
            var i = n[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return e[r].call(i.exports, i, i.exports, t), i.l = !0, i.exports
        }
        var n = {};
        return t.m = e, t.c = n, t.d = function(e, n, r) {
            t.o(e, n) || Object.defineProperty(e, n, {
                configurable: !1,
                enumerable: !0,
                get: r
            })
        }, t.n = function(e) {
            var n = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return t.d(n, "a", n), n
        }, t.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, t.p = "/libs/", t(t.s = 3)
    }([function(e, t, n) {
        var r = n(2),
            i = n(6),
            o = {},
            s = [],
            a = r.levels.TRACE;
        e.exports = {
            addGlobalTransport: function(e) {
                r.addGlobalTransport(e)
            },
            removeGlobalTransport: function(e) {
                r.removeGlobalTransport(e)
            },
            getLogger: function(e, t, n) {
                var i = new r(a, e, t, n);
                return e ? (o[e] = o[e] || [], o[e].push(i)) : s.push(i), i
            },
            setLogLevelById: function(e, t) {
                for (var n = t ? o[t] || [] : s, r = 0; r < n.length; r++) n[r].setLevel(e)
            },
            setLogLevel: function(e) {
                a = e;
                for (var t = 0; t < s.length; t++) s[t].setLevel(e);
                for (var n in o) {
                    var r = o[n] || [];
                    for (t = 0; t < r.length; t++) r[t].setLevel(e)
                }
            },
            levels: r.levels,
            LogCollector: i
        }
    }, function(e, t, n) {
        "use strict";
        (function(e) {
            function r(e) {
                var t = new RegExp("^".concat(f, "+"), "gi"),
                    n = t.exec(e);
                if (n) {
                    var r = n[n.length - 1].toLowerCase();
                    "http:" !== r && "https:" !== r && (r = "https:"), (e = e.substring(t.lastIndex)).startsWith("//") && (e = r + e)
                }
                return e
            }

            function i() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = [];
                for (var n in e) try {
                    t.push("".concat(n, "=").concat(encodeURIComponent(JSON.stringify(e[n]))))
                } catch (e) {
                    c.warn("Error encoding ".concat(n, ": ").concat(e))
                }
                return t
            }

            function o(e) {
                var t, n, r, i = {
                    toString: s
                };
                if (e = e.replace(/\s/g, ""), (n = (t = new RegExp("^".concat(f), "gi")).exec(e)) && (i.protocol = n[1].toLowerCase(), e = e.substring(t.lastIndex)), n = (t = new RegExp("^".concat(u), "gi")).exec(e)) {
                    var o = n[1].substring(2);
                    e = e.substring(t.lastIndex);
                    var a = o.indexOf("@"); - 1 !== a && (o = o.substring(a + 1)), i.host = o;
                    var c = o.lastIndexOf(":"); - 1 !== c && (i.port = o.substring(c + 1), o = o.substring(0, c)), i.hostname = o
                }
                if ((n = (t = new RegExp("^".concat(h), "gi")).exec(e)) && (r = n[1], e = e.substring(t.lastIndex)), r ? r.startsWith("/") || (r = "/".concat(r)) : r = "/", i.pathname = r, e.startsWith("?")) {
                    var l = e.indexOf("#", 1); - 1 === l && (l = e.length), i.search = e.substring(0, l), e = e.substring(l)
                } else i.search = "";
                return i.hash = e.startsWith("#") ? e : "", i
            }

            function s(e) {
                var t = e || this,
                    n = t.hash,
                    r = t.host,
                    i = t.pathname,
                    o = t.protocol,
                    s = t.search,
                    a = "";
                return o && (a += o), r && (a += "//".concat(r)), a += i || "/", s && (a += s), n && (a += n), a
            }

            function a(e) {
                var t = o(r(e.url || ""));
                if (!t.protocol) {
                    var n = e.protocol || e.scheme;
                    n && (n.endsWith(":") || (n += ":"), t.protocol = n)
                }
                var s = t.pathname;
                if (!t.host) {
                    var a = e.domain || e.host || e.hostname;
                    if (a) {
                        var c = o(r("".concat(l, "//").concat(a))),
                            u = c.host,
                            h = c.hostname,
                            f = c.pathname,
                            p = c.port;
                        u && (t.host = u, t.hostname = h, t.port = p), "/" === s && "/" !== f && (s = f)
                    }
                }
                var d = e.roomName || e.room;
                !d || !t.pathname.endsWith("/") && t.pathname.endsWith("/".concat(d)) || (s.endsWith("/") || (s += "/"), s += d), t.pathname = s;
                var v = e.jwt;
                if (v) {
                    var g = t.search; - 1 === g.indexOf("?jwt=") && -1 === g.indexOf("&jwt=") && (g.startsWith("?") || (g = "?".concat(g)), 1 === g.length || (g += "&"), g += "jwt=".concat(v), t.search = g)
                }
                for (var m = t.hash, y = ["config", "interfaceConfig"], _ = 0; _ < y.length; _++) {
                    var b = y[_],
                        w = i(e["".concat(b, "Overwrite")] || e[b] || e["".concat(b, "Override")]);
                    if (w.length) {
                        var L = "".concat(b, ".").concat(w.join("&".concat(b, ".")));
                        m.length ? L = "&".concat(L) : m = "#", m += L
                    }
                }
                return t.hash = m, t.toString() || void 0
            }
            t.a = a;
            var c = n(0).getLogger(e),
                l = "org.jitsi.meet:",
                u = "(//[^/?#]+)",
                h = "([^?#]*)",
                f = "([a-z][a-z0-9\\.\\+-]*:)"
        }).call(t, "react/features/base/util/uri.js")
    }, function(e, t) {
        function n() {
            var e = arguments[0],
                t = arguments[1],
                n = Array.prototype.slice.call(arguments, 2);
            if (!(i[t] < e.level))
                for (var r = function() {
                        var e = {
                                methodName: "",
                                fileLocation: "",
                                line: null,
                                column: null
                            },
                            t = new Error,
                            n = t.stack ? t.stack.split("\n") : [];
                        if (!n || n.length < 1) return e;
                        var r = null;
                        return n[3] && (r = n[3].match(/\s*at\s*(.+?)\s*\((\S*)\s*:(\d*)\s*:(\d*)\)/)), !r || r.length <= 4 ? (0 === n[2].indexOf("log@") ? e.methodName = n[3].substr(0, n[3].indexOf("@")) : e.methodName = n[2].substr(0, n[2].indexOf("@")), e) : (e.methodName = r[1], e.fileLocation = r[2], e.line = r[3], e.column = r[4], e)
                    }(), s = o.concat(e.transports), a = 0; a < s.length; a++) {
                    var c = s[a],
                        l = c[t];
                    l && "function" == typeof l && l.bind(c, e.id ? "[" + e.id + "]" : "", "<" + r.methodName + ">: ").apply(c, n)
                }
        }

        function r(e, t, r, o) {
            this.id = t, this.format = o, this.transports = r, this.transports || (this.transports = []), this.level = i[e];
            for (var s = Object.keys(i), a = 0; a < s.length; a++) this[s[a]] = n.bind(null, this, s[a])
        }
        var i = {
            trace: 0,
            debug: 1,
            info: 2,
            log: 3,
            warn: 4,
            error: 5
        };
        r.consoleTransport = console;
        var o = [r.consoleTransport];
        r.addGlobalTransport = function(e) {
            -1 === o.indexOf(e) && o.push(e)
        }, r.removeGlobalTransport = function(e) {
            var t = o.indexOf(e); - 1 !== t && o.splice(t, 1)
        }, r.prototype.setLevel = function(e) {
            this.level = i[e]
        }, e.exports = r, r.levels = {
            TRACE: "trace",
            DEBUG: "debug",
            INFO: "info",
            LOG: "log",
            WARN: "warn",
            ERROR: "error"
        }
    }, function(e, t, n) {
        e.exports = n(4).default
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            function(e) {
                function r(e, t) {
                    if (null == e) return {};
                    var n, r, i = function(e, t) {
                        if (null == e) return {};
                        var n, r, i = {},
                            o = Object.keys(e);
                        for (r = 0; r < o.length; r++) n = o[r], t.indexOf(n) >= 0 || (i[n] = e[n]);
                        return i
                    }(e, t);
                    if (Object.getOwnPropertySymbols) {
                        var o = Object.getOwnPropertySymbols(e);
                        for (r = 0; r < o.length; r++) n = o[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (i[n] = e[n])
                    }
                    return i
                }

                function i(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }

                function o(e, t) {
                    return !t || "object" !== l(t) && "function" != typeof t ? function(e) {
                        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return e
                    }(e) : t
                }

                function s(e) {
                    return (s = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                        return e.__proto__ || Object.getPrototypeOf(e)
                    })(e)
                }

                function a(e, t) {
                    return (a = Object.setPrototypeOf || function(e, t) {
                        return e.__proto__ = t, e
                    })(e, t)
                }

                function c(e, t) {
                    return function(e) {
                        if (Array.isArray(e)) return e
                    }(e) || function(e, t) {
                        var n = [],
                            r = !0,
                            i = !1,
                            o = void 0;
                        try {
                            for (var s, a = e[Symbol.iterator](); !(r = (s = a.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            i = !0, o = e
                        } finally {
                            try {
                                r || null == a.return || a.return()
                            } finally {
                                if (i) throw o
                            }
                        }
                        return n
                    }(e, t) || function() {
                        throw new TypeError("Invalid attempt to destructure non-iterable instance")
                    }()
                }

                function l(e) {
                    return (l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    })(e)
                }

                function u(e, t, n) {
                    return t in e ? Object.defineProperty(e, t, {
                        value: n,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : e[t] = n, e
                }

                function h(e, t) {
                    e._numberOfParticipants += t
                }

                function f(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return Object(g.a)(function(e) {
                        for (var t = 1; t < arguments.length; t++) {
                            var n = null != arguments[t] ? arguments[t] : {},
                                r = Object.keys(n);
                            "function" == typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(e) {
                                return Object.getOwnPropertyDescriptor(n, e).enumerable
                            }))), r.forEach(function(t) {
                                u(e, t, n[t])
                            })
                        }
                        return e
                    }({}, t, {
                        url: "".concat(t.noSSL ? "http" : "https", "://").concat(e, "/#jitsi_meet_external_api_id=").concat(O)
                    }))
                }

                function p(e) {
                    var t;
                    return "string" == typeof e && null !== String(e).match(/([0-9]*\.?[0-9]+)(em|pt|px|%)$/) ? t = e : "number" == typeof e && (t = "".concat(e, "px")), t
                }
                n.d(t, "default", function() {
                    return j
                });
                var d = n(5),
                    v = n.n(d),
                    g = n(1),
                    m = n(7),
                    y = n(11),
                    _ = n.n(y),
                    b = n(0).getLogger(e),
                    w = ["css/all.css", "libs/alwaysontop.min.js"],
                    L = {
                        avatarUrl: "avatar-url",
                        displayName: "display-name",
                        email: "email",
                        hangup: "video-hangup",
                        submitFeedback: "submit-feedback",
                        toggleAudio: "toggle-audio",
                        toggleChat: "toggle-chat",
                        toggleFilmStrip: "toggle-film-strip",
                        toggleShareScreen: "toggle-share-screen",
                        toggleVideo: "toggle-video"
                    },
                    k = {
                        "avatar-changed": "avatarChanged",
                        "audio-availability-changed": "audioAvailabilityChanged",
                        "audio-mute-status-changed": "audioMuteStatusChanged",
                        "display-name-change": "displayNameChange",
                        "email-change": "emailChange",
                        "feedback-submitted": "feedbackSubmitted",
                        "incoming-message": "incomingMessage",
                        "outgoing-message": "outgoingMessage",
                        "participant-joined": "participantJoined",
                        "participant-left": "participantLeft",
                        "video-ready-to-close": "readyToClose",
                        "video-conference-joined": "videoConferenceJoined",
                        "video-conference-left": "videoConferenceLeft",
                        "video-availability-changed": "videoAvailabilityChanged",
                        "video-mute-status-changed": "videoMuteStatusChanged",
                        "screen-sharing-status-changed": "screenSharingStatusChanged"
                    },
                    O = 0,
                    j = function(e) {
                        function t(e) {
                            var n;
                            ! function(e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, t), n = o(this, s(t).call(this));
                            for (var r = arguments.length, i = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++) i[a - 1] = arguments[a];
                            var u = function(e) {
                                    if (!e.length) return {};
                                    switch (l(e[0])) {
                                        case "string":
                                        case void 0:
                                            var t = c(e, 9);
                                            return {
                                                roomName: t[0],
                                                width: t[1],
                                                height: t[2],
                                                parentNode: t[3],
                                                configOverwrite: t[4],
                                                interfaceConfigOverwrite: t[5],
                                                noSSL: t[6],
                                                jwt: t[7],
                                                onload: t[8]
                                            };
                                        case "object":
                                            return e[0];
                                        default:
                                            throw new Error("Can't parse the arguments!")
                                    }
                                }(i),
                                h = u.roomName,
                                p = void 0 === h ? "" : h,
                                d = u.width,
                                v = void 0 === d ? "100%" : d,
                                g = u.height,
                                y = void 0 === g ? "100%" : g,
                                _ = u.parentNode,
                                b = void 0 === _ ? document.body : _,
                                w = u.configOverwrite,
                                L = void 0 === w ? {} : w,
                                k = u.interfaceConfigOverwrite,
                                j = void 0 === k ? {} : k,
                                x = u.noSSL,
                                E = void 0 !== x && x,
                                S = u.jwt,
                                C = void 0 === S ? void 0 : S,
                                I = u.onload,
                                P = void 0 === I ? void 0 : I,
                                A = u.invitees;
                            return n._parentNode = b, n._url = f(e, {
                                configOverwrite: L,
                                interfaceConfigOverwrite: j,
                                jwt: C,
                                noSSL: E,
                                roomName: p
                            }), n._createIFrame(y, v, P), n._transport = new m.b({
                                backend: new m.a({
                                    postisOptions: {
                                        scope: "jitsi_meet_external_api_".concat(O),
                                        window: n._frame.contentWindow
                                    }
                                })
                            }), Array.isArray(A) && A.length > 0 && n.invite(A), n._isLargeVideoVisible = !0, n._numberOfParticipants = 0, n._participants = {}, n._myUserID = void 0, n._onStageParticipant = void 0, n._setupListeners(), O++, n
                        }
                        var n, u;
                        return function(e, t) {
                            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                            e.prototype = Object.create(t && t.prototype, {
                                constructor: {
                                    value: e,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), t && a(e, t)
                        }(t, v.a), n = t, (u = [{
                            key: "_createIFrame",
                            value: function(e, t, n) {
                                var r = "jitsiConferenceFrame".concat(O);
                                this._frame = document.createElement("iframe"), this._frame.allow = "camera; microphone", this._frame.src = this._url, this._frame.name = r, this._frame.id = r, this._setSize(e, t), this._frame.setAttribute("allowFullScreen", "true"), this._frame.style.border = 0, n && (this._frame.onload = n), this._frame = this._parentNode.appendChild(this._frame)
                            }
                        }, {
                            key: "_getAlwaysOnTopResources",
                            value: function() {
                                var e = this._frame.contentWindow,
                                    t = "",
                                    n = e.document.querySelector("base");
                                if (n && n.href) t = n.href;
                                else {
                                    var r = e.location,
                                        i = r.protocol,
                                        o = r.host;
                                    t = "".concat(i, "//").concat(o)
                                }
                                return w.map(function(e) {
                                    return new URL(e, t).href
                                })
                            }
                        }, {
                            key: "_getOnStageParticipant",
                            value: function() {
                                return this._onStageParticipant
                            }
                        }, {
                            key: "_getLargeVideo",
                            value: function() {
                                var e = this.getIFrame();
                                if (this._isLargeVideoVisible && e && e.contentWindow && e.contentWindow.document) return e.contentWindow.document.getElementById("largeVideo")
                            }
                        }, {
                            key: "_setSize",
                            value: function(e, t) {
                                var n = p(e),
                                    r = p(t);
                                void 0 !== n && (this._frame.style.height = n), void 0 !== r && (this._frame.style.width = r)
                            }
                        }, {
                            key: "_setupListeners",
                            value: function() {
                                var e = this;
                                this._transport.on("event", function(t) {
                                    var n = t.name,
                                        i = r(t, ["name"]),
                                        o = i.id;
                                    switch (n) {
                                        case "video-conference-joined":
                                            e._myUserID = o, e._participants[o] = {
                                                avatarURL: i.avatarURL
                                            };
                                        case "participant-joined":
                                            e._participants[o] = e._participants[o] || {}, e._participants[o].displayName = i.displayName, e._participants[o].formattedDisplayName = i.formattedDisplayName, h(e, 1);
                                            break;
                                        case "participant-left":
                                            h(e, -1), delete e._participants[o];
                                            break;
                                        case "display-name-change":
                                            var s = e._participants[o];
                                            s && (s.displayName = i.displayname, s.formattedDisplayName = i.formattedDisplayName);
                                            break;
                                        case "email-change":
                                            var a = e._participants[o];
                                            a && (a.email = i.email);
                                            break;
                                        case "avatar-changed":
                                            var c = e._participants[o];
                                            c && (c.avatarURL = i.avatarURL);
                                            break;
                                        case "on-stage-participant-changed":
                                            e._onStageParticipant = o, e.emit("largeVideoChanged");
                                            break;
                                        case "large-video-visibility-changed":
                                            e._isLargeVideoVisible = i.isVisible, e.emit("largeVideoChanged");
                                            break;
                                        case "video-conference-left":
                                            h(e, -1), delete e._participants[e._myUserID]
                                    }
                                    var l = k[n];
                                    return !!l && (e.emit(l, i), !0)
                                })
                            }
                        }, {
                            key: "addEventListener",
                            value: function(e, t) {
                                this.on(e, t)
                            }
                        }, {
                            key: "addEventListeners",
                            value: function(e) {
                                for (var t in e) this.addEventListener(t, e[t])
                            }
                        }, {
                            key: "dispose",
                            value: function() {
                                this._transport.dispose(), this.removeAllListeners(), this._frame && this._frame.parentNode.removeChild(this._frame)
                            }
                        }, {
                            key: "executeCommand",
                            value: function(e) {
                                for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
                                e in L ? this._transport.sendEvent({
                                    data: n,
                                    name: L[e]
                                }) : b.error("Not supported command name.")
                            }
                        }, {
                            key: "executeCommands",
                            value: function(e) {
                                for (var t in e) this.executeCommand(t, e[t])
                            }
                        }, {
                            key: "isAudioAvailable",
                            value: function() {
                                return this._transport.sendRequest({
                                    name: "is-audio-available"
                                })
                            }
                        }, {
                            key: "invite",
                            value: function(e) {
                                return Array.isArray(e) && 0 !== e.length ? this._transport.sendRequest({
                                    name: "invite",
                                    invitees: e
                                }) : Promise.reject(new TypeError("Invalid Argument"))
                            }
                        }, {
                            key: "isAudioMuted",
                            value: function() {
                                return this._transport.sendRequest({
                                    name: "is-audio-muted"
                                })
                            }
                        }, {
                            key: "getAvatarURL",
                            value: function(e) {
                                return (this._participants[e] || {}).avatarURL
                            }
                        }, {
                            key: "getDisplayName",
                            value: function(e) {
                                return (this._participants[e] || {}).displayName
                            }
                        }, {
                            key: "getEmail",
                            value: function(e) {
                                return (this._participants[e] || {}).email
                            }
                        }, {
                            key: "_getFormattedDisplayName",
                            value: function(e) {
                                return (this._participants[e] || {}).formattedDisplayName
                            }
                        }, {
                            key: "getIFrame",
                            value: function() {
                                return this._frame
                            }
                        }, {
                            key: "getNumberOfParticipants",
                            value: function() {
                                return this._numberOfParticipants
                            }
                        }, {
                            key: "isVideoAvailable",
                            value: function() {
                                return this._transport.sendRequest({
                                    name: "is-video-available"
                                })
                            }
                        }, {
                            key: "isVideoMuted",
                            value: function() {
                                return this._transport.sendRequest({
                                    name: "is-video-muted"
                                })
                            }
                        }, {
                            key: "removeEventListener",
                            value: function(e) {
                                this.removeAllListeners(e)
                            }
                        }, {
                            key: "removeEventListeners",
                            value: function(e) {
                                var t = this;
                                e.forEach(function(e) {
                                    return t.removeEventListener(e)
                                })
                            }
                        }, {
                            key: "_getElectronPopupsConfig",
                            value: function() {
                                return Promise.resolve(_.a)
                            }
                        }]) && i(n.prototype, u), t
                    }()
            }.call(t, "modules/API/external/external_api.js")
    }, function(e, t) {
        function n() {
            this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
        }

        function r(e) {
            return "function" == typeof e
        }

        function i(e) {
            return "object" == typeof e && null !== e
        }

        function o(e) {
            return void 0 === e
        }
        e.exports = n, n.EventEmitter = n, n.prototype._events = void 0, n.prototype._maxListeners = void 0, n.defaultMaxListeners = 10, n.prototype.setMaxListeners = function(e) {
            if ("number" != typeof e || e < 0 || isNaN(e)) throw TypeError("n must be a positive number");
            return this._maxListeners = e, this
        }, n.prototype.emit = function(e) {
            var t, n, s, a, c, l;
            if (this._events || (this._events = {}), "error" === e && (!this._events.error || i(this._events.error) && !this._events.error.length)) {
                if ((t = arguments[1]) instanceof Error) throw t;
                var u = new Error('Uncaught, unspecified "error" event. (' + t + ")");
                throw u.context = t, u
            }
            if (o(n = this._events[e])) return !1;
            if (r(n)) switch (arguments.length) {
                case 1:
                    n.call(this);
                    break;
                case 2:
                    n.call(this, arguments[1]);
                    break;
                case 3:
                    n.call(this, arguments[1], arguments[2]);
                    break;
                default:
                    a = Array.prototype.slice.call(arguments, 1), n.apply(this, a)
            } else if (i(n))
                for (a = Array.prototype.slice.call(arguments, 1), s = (l = n.slice()).length, c = 0; c < s; c++) l[c].apply(this, a);
            return !0
        }, n.prototype.addListener = function(e, t) {
            var s;
            if (!r(t)) throw TypeError("listener must be a function");
            return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, r(t.listener) ? t.listener : t), this._events[e] ? i(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, i(this._events[e]) && !this._events[e].warned && (s = o(this._maxListeners) ? n.defaultMaxListeners : this._maxListeners) && s > 0 && this._events[e].length > s && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace()), this
        }, n.prototype.on = n.prototype.addListener, n.prototype.once = function(e, t) {
            function n() {
                this.removeListener(e, n), i || (i = !0, t.apply(this, arguments))
            }
            if (!r(t)) throw TypeError("listener must be a function");
            var i = !1;
            return n.listener = t, this.on(e, n), this
        }, n.prototype.removeListener = function(e, t) {
            var n, o, s, a;
            if (!r(t)) throw TypeError("listener must be a function");
            if (!this._events || !this._events[e]) return this;
            if (s = (n = this._events[e]).length, o = -1, n === t || r(n.listener) && n.listener === t) delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t);
            else if (i(n)) {
                for (a = s; a-- > 0;)
                    if (n[a] === t || n[a].listener && n[a].listener === t) {
                        o = a;
                        break
                    } if (o < 0) return this;
                1 === n.length ? (n.length = 0, delete this._events[e]) : n.splice(o, 1), this._events.removeListener && this.emit("removeListener", e, t)
            }
            return this
        }, n.prototype.removeAllListeners = function(e) {
            var t, n;
            if (!this._events) return this;
            if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;
            if (0 === arguments.length) {
                for (t in this._events) "removeListener" !== t && this.removeAllListeners(t);
                return this.removeAllListeners("removeListener"), this._events = {}, this
            }
            if (r(n = this._events[e])) this.removeListener(e, n);
            else if (n)
                for (; n.length;) this.removeListener(e, n[n.length - 1]);
            return delete this._events[e], this
        }, n.prototype.listeners = function(e) {
            return this._events && this._events[e] ? r(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
        }, n.prototype.listenerCount = function(e) {
            if (this._events) {
                var t = this._events[e];
                if (r(t)) return 1;
                if (t) return t.length
            }
            return 0
        }, n.listenerCount = function(e, t) {
            return e.listenerCount(t)
        }
    }, function(e, t, n) {
        function r(e, t) {
            this.logStorage = e, this.stringifyObjects = !(!t || !t.stringifyObjects) && t.stringifyObjects, this.storeInterval = t && t.storeInterval ? t.storeInterval : 3e4, this.maxEntryLength = t && t.maxEntryLength ? t.maxEntryLength : 1e4, Object.keys(i.levels).forEach(function(e) {
                this[i.levels[e]] = function(e) {
                    this._log.apply(this, arguments)
                }.bind(this, e)
            }.bind(this)), this.storeLogsIntervalID = null, this.queue = [], this.totalLen = 0, this.outputCache = []
        }
        var i = n(2);
        r.prototype.stringify = function(e) {
            try {
                return JSON.stringify(e)
            } catch (e) {
                return "[object with circular refs?]"
            }
        }, r.prototype.formatLogMessage = function(e) {
            for (var t = "", n = 1, r = arguments.length; n < r; n++) {
                var o = arguments[n];
                !this.stringifyObjects && e !== i.levels.ERROR || "object" != typeof o || (o = this.stringify(o)), t += o, n != r - 1 && (t += " ")
            }
            return t.length ? t : null
        }, r.prototype._log = function() {
            var e = this.formatLogMessage.apply(this, arguments);
            if (e) {
                var t = this.queue.length ? this.queue[this.queue.length - 1] : void 0;
                ("object" == typeof t ? t.text : t) == e ? "object" == typeof t ? t.count += 1 : this.queue[this.queue.length - 1] = {
                    text: e,
                    count: 2
                } : (this.queue.push(e), this.totalLen += e.length)
            }
            this.totalLen >= this.maxEntryLength && this._flush(!0, !0)
        }, r.prototype.start = function() {
            this._reschedulePublishInterval()
        }, r.prototype._reschedulePublishInterval = function() {
            this.storeLogsIntervalID && (window.clearTimeout(this.storeLogsIntervalID), this.storeLogsIntervalID = null), this.storeLogsIntervalID = window.setTimeout(this._flush.bind(this, !1, !0), this.storeInterval)
        }, r.prototype.flush = function() {
            this._flush(!1, !0)
        }, r.prototype._flush = function(e, t) {
            this.totalLen > 0 && (this.logStorage.isReady() || e) && (this.logStorage.isReady() ? (this.outputCache.length && (this.outputCache.forEach(function(e) {
                this.logStorage.storeLogs(e)
            }.bind(this)), this.outputCache = []), this.logStorage.storeLogs(this.queue)) : this.outputCache.push(this.queue), this.queue = [], this.totalLen = 0), t && this._reschedulePublishInterval()
        }, r.prototype.stop = function() {
            this._flush(!1, !1)
        }, e.exports = r
    }, function(e, t, n) {
        "use strict";

        function r(e, t) {
            if (null == e) return {};
            var n, r, i = function(e, t) {
                if (null == e) return {};
                var n, r, i = {},
                    o = Object.keys(e);
                for (r = 0; r < o.length; r++) n = o[r], t.indexOf(n) >= 0 || (i[n] = e[n]);
                return i
            }(e, t);
            if (Object.getOwnPropertySymbols) {
                var o = Object.getOwnPropertySymbols(e);
                for (r = 0; r < o.length; r++) n = o[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (i[n] = e[n])
            }
            return i
        }

        function i(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        function o(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }

        function s(e) {
            return function(e) {
                if (Array.isArray(e)) {
                    for (var t = 0, n = new Array(e.length); t < e.length; t++) n[t] = e[t];
                    return n
                }
            }(e) || function(e) {
                if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e)
            }(e) || function() {
                throw new TypeError("Invalid attempt to spread non-iterable instance")
            }()
        }

        function a(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }
        var c = n(8);
        n(9), n(1);
        var l = function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                    n = "search" === (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "hash") ? e.search : e.hash,
                    r = {};
                return n && n.substr(1).split("&").forEach(function(e) {
                    var n = e.split("="),
                        i = n[0];
                    if (i) {
                        var o;
                        try {
                            o = n[1], t || (o = JSON.parse(decodeURIComponent(o).replace(/\\&/, "&")))
                        } catch (e) {
                            return void Object(c.b)(e, "Failed to parse URL parameter value: ".concat(String(o)))
                        }
                        r[i] = o
                    }
                }), r
            }(window.location).jitsi_meet_external_api_id,
            u = n(10),
            h = n.n(u),
            f = {
                window: window.opener || window.parent
            },
            p = ["avatar-url", "display-name", "email", "toggle-audio", "toggle-chat", "toggle-film-strip", "toggle-share-screen", "toggle-video", "video-hangup"],
            d = ["display-name-change", "incoming-message", "outgoing-message", "participant-joined", "participant-left", "video-conference-joined", "video-conference-left", "video-ready-to-close"],
            v = "message",
            g = function() {
                function e() {
                    var t = this,
                        n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        r = n.enableLegacyFormat,
                        o = n.postisOptions;
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this.postis = h()(function(e) {
                        for (var t = 1; t < arguments.length; t++) {
                            var n = null != arguments[t] ? arguments[t] : {},
                                r = Object.keys(n);
                            "function" == typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(e) {
                                return Object.getOwnPropertyDescriptor(n, e).enumerable
                            }))), r.forEach(function(t) {
                                i(e, t, n[t])
                            })
                        }
                        return e
                    }({}, f, o)), this._enableLegacyFormat = r, this._enableLegacyFormat && p.forEach(function(e) {
                        return t.postis.listen(e, function(n) {
                            return t._legacyMessageReceivedCallback(e, n)
                        })
                    }), this._receiveCallback = function() {}, this.postis.listen(v, function(e) {
                        return t._receiveCallback(e)
                    })
                }
                var t, n;
                return t = e, (n = [{
                    key: "_legacyMessageReceivedCallback",
                    value: function(e) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        this._receiveCallback({
                            data: {
                                name: e,
                                data: t
                            }
                        })
                    }
                }, {
                    key: "_sendLegacyMessage",
                    value: function(e) {
                        var t = e.name,
                            n = r(e, ["name"]);
                        t && -1 !== d.indexOf(t) && this.postis.send({
                            method: t,
                            params: n
                        })
                    }
                }, {
                    key: "dispose",
                    value: function() {
                        this.postis.destroy()
                    }
                }, {
                    key: "send",
                    value: function(e) {
                        this.postis.send({
                            method: v,
                            params: e
                        }), this._enableLegacyFormat && this._sendLegacyMessage(e.data || {})
                    }
                }, {
                    key: "setReceiveCallback",
                    value: function(e) {
                        this._receiveCallback = e
                    }
                }]) && o(t.prototype, n), e
            }(),
            m = function() {
                function e() {
                    var t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).backend;
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this._listeners = new Map, this._requestID = 0, this._responseHandlers = new Map, this._unprocessedMessages = new Set, this.addListener = this.on, t && this.setBackend(t)
                }
                var t, n;
                return t = e, (n = [{
                    key: "_disposeBackend",
                    value: function() {
                        this._backend && (this._backend.dispose(), this._backend = null)
                    }
                }, {
                    key: "_onMessageReceived",
                    value: function(e) {
                        var t = this;
                        if ("response" === e.type) {
                            var n = this._responseHandlers.get(e.id);
                            n && (n(e), this._responseHandlers.delete(e.id))
                        } else "request" === e.type ? this.emit("request", e.data, function(n, r) {
                            t._backend.send({
                                type: "response",
                                error: r,
                                id: e.id,
                                result: n
                            })
                        }) : this.emit("event", e.data)
                    }
                }, {
                    key: "dispose",
                    value: function() {
                        this._responseHandlers.clear(), this._unprocessedMessages.clear(), this.removeAllListeners(), this._disposeBackend()
                    }
                }, {
                    key: "emit",
                    value: function(e) {
                        for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
                        var i = this._listeners.get(e),
                            o = !1;
                        return i && i.size && i.forEach(function(e) {
                            o = e.apply(void 0, n) || o
                        }), o || this._unprocessedMessages.add(n), o
                    }
                }, {
                    key: "on",
                    value: function(e, t) {
                        var n = this,
                            r = this._listeners.get(e);
                        return r || (r = new Set, this._listeners.set(e, r)), r.add(t), this._unprocessedMessages.forEach(function(e) {
                            t.apply(void 0, s(e)) && n._unprocessedMessages.delete(e)
                        }), this
                    }
                }, {
                    key: "removeAllListeners",
                    value: function(e) {
                        return e ? this._listeners.delete(e) : this._listeners.clear(), this
                    }
                }, {
                    key: "removeListener",
                    value: function(e, t) {
                        var n = this._listeners.get(e);
                        return n && n.delete(t), this
                    }
                }, {
                    key: "sendEvent",
                    value: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        this._backend && this._backend.send({
                            type: "event",
                            data: e
                        })
                    }
                }, {
                    key: "sendRequest",
                    value: function(e) {
                        var t = this;
                        if (!this._backend) return Promise.reject(new Error("No transport backend defined!"));
                        this._requestID++;
                        var n = this._requestID;
                        return new Promise(function(r, i) {
                            t._responseHandlers.set(n, function(e) {
                                var t = e.error,
                                    n = e.result;
                                void 0 !== n ? r(n) : i(void 0 !== t ? t : new Error("Unexpected response format!"))
                            }), t._backend.send({
                                type: "request",
                                data: e,
                                id: n
                            })
                        })
                    }
                }, {
                    key: "setBackend",
                    value: function(e) {
                        this._disposeBackend(), this._backend = e, this._backend.setReceiveCallback(this._onMessageReceived.bind(this))
                    }
                }]) && a(t.prototype, n), e
            }();
        n.d(t, "a", function() {
            return g
        }), n.d(t, "b", function() {
            return m
        });
        var y, _ = {};
        "number" == typeof l && (_.scope = "jitsi_meet_external_api_".concat(l)), Object(c.a)().setExternalTransportBackend = function(e) {
            return y.setBackend(e)
        }
    }, function(e, t, n) {
        "use strict";
        (function(e) {
            t.a = function() {
                return window.JitsiMeetJS || (window.JitsiMeetJS = {}), window.JitsiMeetJS.app || (window.JitsiMeetJS.app = {}), window.JitsiMeetJS.app
            }, t.b = function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
                r.error(t, e), window.onerror && window.onerror(t, null, null, null, e)
            };
            var r = n(0).getLogger(e)
        }).call(t, "react/features/base/util/helpers.js")
    }, function(e, t, n) {
        "use strict";
        (function(e) {
            n(0).getLogger(e)
        }).call(t, "react/features/base/util/httpUtils.js")
    }, function(e, t) {
        e.exports = function(e) {
            var t, n = e.scope,
                r = e.window,
                i = e.windowForEventListening || window,
                o = {},
                s = [],
                a = {},
                c = !1,
                l = function(e) {
                    var t;
                    try {
                        t = JSON.parse(e.data)
                    } catch (e) {
                        return
                    }
                    if (t.postis && t.scope === n) {
                        var r = o[t.method];
                        if (r)
                            for (var i = 0; i < r.length; i++) r[i].call(null, t.params);
                        else a[t.method] = a[t.method] || [], a[t.method].push(t.params)
                    }
                };
            i.addEventListener("message", l, !1);
            var u = {
                    listen: function(e, t) {
                        o[e] = o[e] || [], o[e].push(t);
                        var n = a[e];
                        if (n)
                            for (var r = o[e], i = 0; i < r.length; i++)
                                for (var s = 0; s < n.length; s++) r[i].call(null, n[s]);
                        delete a[e]
                    },
                    send: function(e) {
                        var t = e.method;
                        (c || "__ready__" === e.method) && r && "function" == typeof r.postMessage ? r.postMessage(JSON.stringify({
                            postis: !0,
                            scope: n,
                            method: t,
                            params: e.params
                        }), "*") : s.push(e)
                    },
                    ready: function(e) {
                        c ? e() : setTimeout(function() {
                            u.ready(e)
                        }, 50)
                    },
                    destroy: function(e) {
                        clearInterval(t), c = !1, i && "function" == typeof i.removeEventListener && i.removeEventListener("message", l), e && e()
                    }
                },
                h = +new Date + Math.random() + "";
            return t = setInterval(function() {
                u.send({
                    method: "__ready__",
                    params: h
                })
            }, 50), u.listen("__ready__", function(e) {
                if (e === h) {
                    clearInterval(t), c = !0;
                    for (var n = 0; n < s.length; n++) u.send(s[n]);
                    s = []
                } else u.send({
                    method: "__ready__",
                    params: e
                })
            }), u
        }
    }, function(e, t) {
        e.exports = {
            "google-auth": {
                matchPatterns: {
                    url: "accounts.google.com"
                },
                target: "electron"
            }
        }
    }]);
});

//window['JitsiAPI'] = JitsiMeetExternalAPI;
//# sourceMappingURL=external_api.min.map