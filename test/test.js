_superframeJSLoader(function(e, o) {
    o.Bdbox,
    o.define,
    o.require;
    !function(e, o, n) {
        function t(e, o) {
            return l.cleanObj.toString.call(e).slice(8, -1) === o
        }
        function i(e) {
            var o = u[e];
            if (o)
                return o.exports;
            throw "module " + e + " is undefined"
        }
        function r(e, o) {
            for (var n, t, r = e.split(":"), a = r.pop().split("/"), s = l; n = a.shift(); )
                "bdbox" !== n && (t = n,
                a.length && (s = s[n] = s[n] || {}));
            var c = u[e] = {
                exports: {}
            }
              , d = l.isFunction(o) ? o.apply(c, [i, c.exports, c, l]) : o;
            d && (c.exports = d),
            s[t] = c.exports
        }
        function a() {
            var e, o, n = "__OPENBOX_CHECK_LOCALSTORE__", t = {
                name: "openbox",
                content: "check_localStorage"
            };
            try {
                localStorage.setItem(n, JSON.stringify(t)),
                o = localStorage.getItem(n),
                o = JSON.parse(o),
                o.name && o.content ? (e = !0,
                localStorage.removeItem(n)) : e = !1
            } catch (i) {
                e = !1
            }
            return e
        }
        function s() {
            function e(e) {
                return "100" === e || "200" === e ? "main" : "101" === e || "202" === e ? "lite" : "102" === e ? "info" : "203" === e ? "pro" : "main"
            }
            var o = "__OPENBOX_IDM_DATA__";
            try {
                if (x = JSON.parse(localStorage.getItem(o)),
                x.timeout > Date.now())
                    return
            } catch (t) {}
            if (a()) {
                var r = i("common:bdbox/io/loadJS");
                r({
                    url: "https://ext.baidu.com/rest/id-mapping/cuid?callback=?",
                    success: function(t) {
                        if ("0" === t.errno) {
                            var i, r, a, s, c, d = t.data || {}, p = d.status, l = d.list || [];
                            if ("0" === p)
                                s = "lite",
                                c = "main";
                            else {
                                for (l = l.sort(function(e, o) {
                                    return parseInt(o.lasttime) - parseInt(e.lasttime)
                                }),
                                l = l.filter(function(e) {
                                    return "0" !== e.lasttime && e.lasttime
                                }),
                                a = l.length,
                                i = 0; a > i && (r = l[i],
                                !s || !c); i++)
                                    s ? c || (c = e(r.app_id),
                                    c === s && (c = n)) : s = e(r.app_id);
                                s || (s = "main"),
                                c || (c = "main" === s ? "lite" : "main"),
                                "main" !== c && "main" !== s && (c = "main")
                            }
                            x = {
                                firstOpen: s,
                                secondOpen: c,
                                status: p,
                                timeout: Date.now() + 864e5
                            };
                            try {
                                localStorage.setItem(o, JSON.stringify(x))
                            } catch (u) {}
                        }
                    },
                    error: function(e) {
                        console.log("error:" + e)
                    }
                })
            }
        }
        var c = +new Date
          , d = (c + "").slice(-3)
          , p = navigator.userAgent
          , l = {
            isBoxApp: function(e) {
                return e = e || "",
                / baiduboxapp\//i.test(p) === !1 ? !1 : p.indexOf(e + " baiduboxapp") < 0 ? !1 : !0
            },
            isBox: / baiduboxapp\//i.test(p) && !/ (lite|info) baiduboxapp/.test(p),
            $isBox: function() {
                var o = e.navigator || {}
                  , n = o.userAgent;
                return / baiduboxapp\//i.test(n) && !/ (lite|info) baiduboxapp/.test(n)
            },
            isLiteBox: / (lite|info) baiduboxapp\//i.test(p),
            $isLiteBox: function() {
                var o = e.navigator || {}
                  , n = o.userAgent;
                return / (lite|info) baiduboxapp\//i.test(n)
            },
            isInfoBox: / info baiduboxapp\//i.test(p),
            $isInfoBox: function() {
                var o = e.navigator || {}
                  , n = o.userAgent;
                return / info baiduboxapp\//i.test(n)
            },
            isProBox: / pro baiduboxapp\//i.test(p),
            $isProBox: function() {
                var o = e.navigator || {}
                  , n = o.userAgent;
                return / pro baiduboxapp\//i.test(n)
            },
            isIOS: /(iPhone|iPod|iPad)/.test(p),
            $isIOS: function() {
                var o = e.navigator || {};
                return /(iPhone|iPod|iPad)/.test(o.userAgent)
            },
            isAndroid: /(Android);?[\s\/]+([\d.]+)?/.test(p),
            $isAndroid: function() {
                var o = e.navigator || {};
                return /(Android);?[\s\/]+([\d.]+)?/.test(o.userAgent)
            },
            getId: function() {
                return d++
            },
            emptyArr: [],
            emptyFn: function() {},
            cleanObj: {},
            byId: function(e) {
                return l.isString(e) ? o.getElementById(e) : e
            },
            toArray: function(e) {
                return l.emptyArr.slice.call(e)
            },
            $: function(e, n) {
                return n = n && 1 === n.nodeType ? n : o,
                l.toArray(n.querySelectorAll(e))
            }
        };
        "Function,String,Array,Number,RegExp".replace(/[^, ]+/g, function(e) {
            l["is" + e] = function(o) {
                return t(o, e)
            }
        }),
        l.isBoolean = function(e) {
            return e === !0 || e === !1
        }
        ,
        l.isObject = function(e) {
            return "object" == typeof e
        }
        ,
        l.isUndefined = function(e) {
            return void 0 === e
        }
        ,
        l.isWindow = function(e) {
            return null != e && e == e.window
        }
        ,
        l.isPlainObject = function(e) {
            return l.isObject(e) && !l.isWindow(e) && Object.getPrototypeOf(e) == Object.prototype
        }
        ;
        var u = {};
        l.define = r;
        var m = l;
        r("common:bdbox/utils/version_compare", function(e, o, n) {
            var t = function(e, o) {
                o += "",
                e += "";
                for (var n = e.split("."), t = o.split("."), i = 0, r = Math.max(n.length, t.length); r > i; i++) {
                    if (n[i] && !t[i] && parseInt(n[i]) > 0 || parseInt(n[i]) > parseInt(t[i]))
                        return 1;
                    if (t[i] && !n[i] && parseInt(t[i]) > 0 || parseInt(n[i]) < parseInt(t[i]))
                        return -1
                }
                return 0
            };
            n.exports = t
        }),
        r("common:bdbox/utils/queryToJson", function(e, o, n) {
            n.exports = function(e) {
                var o = e.split("?")
                  , n = o[1] ? o[1] : o[0]
                  , t = n.split("&")
                  , i = {};
                return t.forEach(function(e) {
                    if (e = e.split("="),
                    e[0].length > 0) {
                        var o = "";
                        try {
                            o = decodeURIComponent(e[1]) || ""
                        } catch (n) {}
                        i[e[0]] = o
                    }
                }),
                i
            }
        }),
        r("common:bdbox/utils/jsonToQuery", function(e, o, n, t) {
            n.exports = function(e) {
                if (t.isString(e))
                    return e;
                var o = [];
                for (var n in e)
                    o.push(n + "=" + e[n]);
                return o.join("&")
            }
        }),
        r("common:bdbox/utils/ready", function(e, n, t) {
            function i() {
                a.forEach(function(e) {
                    e()
                }),
                a.length = 0,
                s = !0
            }
            function r(e) {
                "function" == typeof e && (s ? e() : a.push(e))
            }
            var a = []
              , s = !1;
            "complete,loaded,interactive".indexOf(o.readyState) > -1 && o.body ? i() : o.addEventListener("DOMContentLoaded", i, !1),
            t.exports = r
        }),
        r("common:bdbox/io/loadJS", function(n, t, i, r) {
            function a(n, t, i) {
                var a, p, l, u = o.createElement("script");
                r.isString(n) ? (a = n,
                r.isFunction(t) && (i = t,
                t = null)) : (a = n.url,
                t = n.data,
                i = n.success,
                p = n.error || r.emptyFn,
                l = n.timeout),
                r.isObject(t) && (t = c(t)),
                t && (a += (-1 === a.indexOf("?") ? "?" : "&") + t),
                a = a.replace(/[&?]{1,2}/, "?");
                var m;
                /=\?/.test(a) && (m = "_box_jsonp" + r.getId(),
                a = a.replace(/=\?/, "=" + m));
                var b = s();
                l = l || 2e4,
                u.type = "text/javascript",
                u.src = a;
                var f, x = !0, h = function(o) {
                    m && (o ? e[m] = d : delete e[m]),
                    f && clearTimeout(f),
                    u.onload = u.onreadystatechange = u.onerror = null,
                    u = null
                }, v = function() {
                    !u || u.readyState && !/loaded|complete/.test(u.readyState) || (h(),
                    x && r.isFunction(i) && i.apply(null, r.toArray(arguments)),
                    x = !1)
                }, g = function(e) {
                    h(),
                    x && p(e),
                    x = !1
                };
                m && (e[m] = v),
                f = setTimeout(function() {
                    h(!0),
                    x && p("timeout"),
                    x = !1
                }, l),
                u.onload = u.onreadystatechange = u.onerror = v,
                u.onerror = g,
                b.appendChild(u)
            }
            function s() {
                return o.head || o.getElementsByTagName("head")[0] || o.documentElement
            }
            var c = n("common:bdbox/utils/jsonToQuery")
              , d = r.emptyFn;
            i.exports = a
        }),
        r("common:bdbox/utils/addStyle", function(e, n, t) {
            t.exports = function(e) {
                if (/.+\.css$/.test(e)) {
                    var n = o.createElement("link");
                    n.type = "text/css",
                    n.rel = "stylesheet",
                    n.href = e,
                    (o.getElementsByTagName("head")[0] || o.getElementsByTagName("body")[0]).appendChild(n)
                } else {
                    var n = o.createElement("style");
                    n.type = "text/css",
                    (o.getElementsByTagName("head")[0] || o.getElementsByTagName("body")[0]).appendChild(n),
                    n.innerHTML = e
                }
            }
        }),
        r("common:bdbox/utils/detect", function(o, n, t, i) {
            function r(o) {
                var n = {
                    name: "unknown",
                    version: 0
                };
                this === e || this.os || (this.os = n),
                o = o || navigator.userAgent;
                var t = {
                    Weibo: /weibo/i,
                    Wechat: /micromessenger\//i,
                    QQ: /QQ\//
                };
                for (var i in t)
                    t.hasOwnProperty(i) && (n["is" + i] = t[i].test(o));
                n.isUC = o.match(/UC/) || e.ucweb || e.ucbrowser;
                var r = o.match(/Windows Phone ([\d.]+)/);
                if (r)
                    return n.win10 = !0,
                    n.version = r[1],
                    n.name = "win10",
                    n;
                var a = o.match(/(Android);?\s+([\d.]+)?/);
                if (a)
                    return n.android = !0,
                    n.version = a[2],
                    n.name = "android",
                    n;
                var s = o.match(/(iPad).*OS\s([\d_]+)/)
                  , c = o.match(/(iPod)(.*OS\s([\d_]+))?/)
                  , d = !s && o.match(/(iPhone\sOS)\s([\d_]+)/);
                return d && !c ? (n.ios = n.iphone = !0,
                n.version = d[2].replace(/_/g, "."),
                n.name = "ios",
                n) : s ? (n.ios = n.ipad = !0,
                n.name = "ios",
                n.version = s[2].replace(/_/g, "."),
                n) : c ? (n.name = "ios",
                n.ios = n.ipod = !0,
                n.version = c[3] ? c[3].replace(/_/g, ".") : null,
                n) : n
            }
            r.apply(i),
            t.exports = r
        }),
        r("common:bdbox/extend", function(e, o, n, t) {
            function i(e, o, n) {
                for (var t in o)
                    n && (r(o[t]) || a(o[t])) ? (r(o[t]) && !r(e[t]) && (e[t] = {}),
                    a(o[t]) && !a(e[t]) && (e[t] = []),
                    i(e[t], o[t], n)) : c(o[t]) || (e[t] = o[t])
            }
            var r = t.isPlainObject
              , a = t.isArray
              , s = t.isBoolean
              , c = t.isUndefined;
            n.exports = function(e) {
                var o, n = t.emptyArr.slice.call(arguments, 1);
                return s(e) && (o = e,
                e = n.shift()),
                n.forEach(function(n) {
                    i(e, n, o)
                }),
                e
            }
        }),
        r("common:bdbox/clone", function(e, o, n) {
            var t = Object.prototype.toString
              , i = function(e, o, n) {
                var t = 0;
                for (var i in e)
                    if (e.hasOwnProperty(i))
                        if (n)
                            o[i] = e[i];
                        else if (o(i, e[i], t++))
                            break
            }
              , r = function(e) {
                var o;
                switch (t.call(e)) {
                case "[object Object]":
                    o = {},
                    i(e, function(e, n) {
                        o[e] = r(n)
                    });
                    break;
                case "[object Array]":
                    o = [],
                    e.forEach(function(e) {
                        o.push(r(e))
                    });
                    break;
                default:
                    o = e
                }
                return o
            };
            n.exports = r
        }),
        r("common:bdbox/utils/queryToJson", function(e, o, n) {
            n.exports = function(e) {
                var o = e.split("?")
                  , n = o[1] ? o[1] : o[0]
                  , t = n.split("&")
                  , i = {};
                return t.forEach(function(e) {
                    if (e = e.split("="),
                    e[0].length > 0) {
                        var o = "";
                        try {
                            o = decodeURIComponent(e[1]) || ""
                        } catch (n) {}
                        i[e[0]] = o
                    }
                }),
                i
            }
        }),
        r("common:bdbox/utils/getVersion", function(o, n, t, i) {
            var r = function() {
                var o = 0;
                if (e.baiduboxapp_version)
                    o = e.baiduboxapp_version;
                else if (i.$isBox()) {
                    var n, t = navigator.userAgent;
                    (n = /([\d+.]+)_(?:diordna|enohpi)_/.exec(t)) ? (n = n[1].split("."),
                    o = n.reverse().join(".")) : (n = /baiduboxapp\/([\d+.]+)/.exec(t)) && (o = n[1])
                }
                return r = function() {
                    return o
                }
                ,
                o
            };
            t.exports = r
        }),
        r("common:bdbox/monitor", function(o, n, t, i) {
            var r = encodeURIComponent
              , a = function(e, o) {
                e += e.indexOf("?") < 0 ? "?" : "&",
                this.url = e,
                this.options = o
            };
            a.prototype.report = function(o, n) {
                var t = !1;
                o = o || "";
                var a = new Image(1,1)
                  , s = [];
                if (i.isObject(o)) {
                    for (var c in o)
                        s.push(c + "=" + r(String(o[c])));
                    o = s.join("&")
                }
                var d = "_box_mt" + i.getId();
                e[d] = a,
                a.onload = a.onerror = a.onabort = function() {
                    n && "function" == typeof n && !t && (t = !0,
                    n()),
                    a.onload = a.onerror = a.onabort = null,
                    e[d] = a = null
                }
                ;
                var p = this.url + o;
                return i.isFunction(this.options.customHandler) && (p = this.options.customHandler(p)),
                a.src = p + "&_rnd=" + Math.floor(2147483648 * Math.random()),
                setTimeout(function() {
                    n && "function" == typeof n && !t && (t = !0,
                    n())
                }, 100),
                this
            }
            ,
            a.prototype.main = function(e, o) {
                return e && i.isFunction(this[e]) && this[e].apply(this, i.toArray(o || [])),
                this
            }
            ,
            t.exports = function(e, o) {
                return new a(e,o)
            }
        }),
        r("common:bdbox/monitor/pblog", function(o, n, t, i) {
            var r = o("common:bdbox/monitor")
              , a = o("common:bdbox/extend")
              , s = o("common:bdbox/utils/queryToJson")
              , c = o("common:bdbox/utils/getVersion")
              , d = o("common:bdbox/clone")
              , p = s(location.search)
              , l = navigator.userAgent
              , u = e.location.protocol;
            "http:" !== u && (u = "https:");
            var m = u + "//m.baidu.com/tcbox"
              , b = {
                service: "bdbox",
                action: "pblog",
                ctv: 2,
                cen: "uid_ua_ut",
                data: {
                    appid: "1",
                    dataid: "2",
                    actiontype: "1",
                    actionid: "2",
                    actiondata: {
                        ref: p.ref || "",
                        gmv: p.vmgdb || "",
                        source: p.from || p.ref || "",
                        boxVersion: c(),
                        boxPlatform: l.match(/(iPad|iPhone|iPod)/gim) ? "ios" : "android"
                    }
                }
            }
              , f = encodeURIComponent;
            p.uid && p.osname && ["osname", "ua", "ut", "from", "cfrom", "uid", "pkgname"].forEach(function(e) {
                p[e] && (b[e] = p[e])
            });
            var x, h = r(m, {
                customHandler: function(e) {
                    var o = [];
                    if (x)
                        for (var n in x)
                            if (x.hasOwnProperty(n)) {
                                var t = x[n];
                                i.isPlainObject(t) && (t = JSON.stringify(t)),
                                o.push(n + "=" + f(t))
                            }
                    return o.length && (e += o.join("&")),
                    e
                }
            });
            h.init = function(e, o) {
                i.isPlainObject(o) && (b = a(b, o)),
                b.data.cateid = e
            }
            ,
            h.pv = function(e, o) {
                x = d(b);
                var n = x.data;
                n.actionid = "1";
                var t = {};
                return t.url = e || location.href,
                o && (t.u = o),
                n.actiondata = a(n.actiondata, t),
                h.report()
            }
            ,
            h.event = function(e, o, n, t, r) {
                if (!e)
                    throw "monitor.tc.event need a evtName";
                if (i.isPlainObject(o) && !n) {
                    var s = {
                        evtName: e
                    };
                    for (var c in o)
                        s[c] = o[c]
                } else
                    var s = {
                        evtName: e,
                        evtType: o || "",
                        evtTag: n || ""
                    };
                x = d(b);
                var p = x.data;
                return p.actionid = "2",
                t && (x.data.cateid = t),
                p.actiondata = a(p.actiondata, s),
                h.report(null, r)
            }
            ,
            h.newEvent = function(e, o, n) {
                x = d(b);
                var t = x.data;
                return t.actionid = "2",
                o && (x.data.cateid = o),
                t.actiondata = a(t.actiondata, e),
                h.report(null, n)
            }
            ,
            t.exports = function() {
                h.main.apply(h, arguments)
            }
        }),
        r("common:bdbox/invoke/openBox", function(n, t, i, r) {
            function a(n, t, i, r, a) {
                if (k.ios && B(k.version, "9.0") >= 0)
                    e.location.href = n;
                else if (k.android && "chrome" === O && d() > 55 && navigator.userAgent.indexOf("haokan") < 0)
                    e.location.href = n;
                else {
                    var s = o.createElement("iframe");
                    s.style.display = "none",
                    s.src = n;
                    var c = o.body || o.getElementsByTagName("body")[0];
                    c.appendChild(s),
                    setTimeout(function() {
                        c.removeChild(s),
                        s = null
                    }, 0)
                }
                var p = +Date.now();
                setTimeout(function() {
                    Date.now() - p < i + 200 && (w.isFunction(t) ? t(n) : (t.indexOf(h) >= 0 && (t = t.indexOf("?from") > 0 ? t + "&scheme=" + encodeURIComponent(n) : t + "?scheme=" + encodeURIComponent(n),
                    t = l(t, "source", r),
                    t = l(t, "tokenData", encodeURIComponent(JSON.stringify(a)))),
                    e.location.href = t))
                }, i)
            }
            function s() {
                m || (u = o.getElementsByTagName("html")[0],
                n("common:bdbox/utils/addStyle")(b),
                m = o.createElement("div")),
                m.setAttribute("class", "openBox-weixinTip"),
                m.innerHTML = '<section class="main"><div class="tips"></div><dl class="options"><dt><span class="num">1</span> <span class="case">若您已安装百度App</span></dt><dd class="bb"><div class="wizard"><div class="arr"></div><div class="img"></div><p>第1步 点击该页右上角的“更多”</p><p>第2步 选择在浏览器中打开</p></div></dd><dt><span class="num">2</span><span class="case">若您尚未安装百度App</span></dt><dd><a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.baidu.searchbox" class="btn">去Appstore下载</a></dd></dl></section><footer><div class="logo"><strong>百度App</strong><p>百度一下 你就得到</p></div><div class="copy">Copyright © 2016 BAIDU Corporation. All rights reserved.</div></footer>',
                o.body.appendChild(m);
                var e = u && u.style.overflow;
                u && (u.style.overflow = "hidden"),
                m.addEventListener("click", function(n) {
                    "A" !== n.target.tagName && (u && (u.style.overflow = e),
                    o.body.removeChild(m))
                })
            }
            function c(e) {
                var o = {};
                k.ios ? o = g : k.android && (o = y);
                var n;
                for (n in v)
                    o[n] = v[n];
                for (var t in o)
                    if (o.hasOwnProperty(t) && o[t].test(e) && (k.ios || "safari" != t))
                        return t;
                if (k.ios) {
                    if (/\bsafari\/\d{3}\.\d$/i.test(e) && /\bAppleWebKit\/\d{3}\.\d\.\d/i.test(e))
                        return "safari";
                    if (/\bsafari\/\d{4}\.\d{2}$/i.test(e))
                        return "liebaobrowser"
                } else if (k.android && /\bChrome\//i.test(e))
                    return "chrome";
                return "other"
            }
            function d() {
                var e = navigator.userAgent.split("Chrome/")[1];
                if (!e)
                    return 0;
                var o = e.split(".")[0]
                  , n = parseInt(o, 10);
                return n
            }
            function p(e) {
                var o;
                for (o in e)
                    return !1;
                return !0
            }
            function l(e, o, n) {
                var t = e.split("#")
                  , i = t[0]
                  , r = t[1] || "";
                return i = i.indexOf("?") > 0 ? i + "&" + o + "=" + n : i + "?" + o + "=" + n,
                r && (i = i + "#" + r),
                i
            }
            var u, m, b = ".openBox-weixinTip .options .link {overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}.openBox-weixinTip *,.openBox-weixinTip *:before,.openBox-weixinTip *:after {-webkit-box-sizing: inherit;box-sizing: inherit;}.openBox-weixinTip {-webkit-box-sizing: border-box;box-sizing: border-box;position: fixed;top: 0;width: 100%;z-index: 999999;display: -webkit-box;-webkit-box-orient: vertical;box-orient: vertical;min-height: 100%;background-color: #FFFFFF;}.openBox-weixinTip .main {-webkit-box-flex: 1;box-flex: 1;padding: 0 35px;}.openBox-weixinTip .tips {padding-top: 38px;font-size: 15px;color: #aaa;}.openBox-weixinTip .options dt {padding: 13px 0px 9px;}.openBox-weixinTip .options dt .num {float: left;-webkit-border-radius: 100%;border-radius: 100%;width: 16px;height: 16px;line-height: 16px;font-size: 13px;text-align: center;color: #fff;background-color: #5d646f;}.openBox-weixinTip .options dt .case {font-size: 17px;padding-left: 6px;}.openBox-weixinTip .options dd {padding-bottom: 24px;margin-bottom: 8px;line-height: 22.5px;}.openBox-weixinTip .options dd.bb {border-bottom: 1px solid #efefef;}.openBox-weixinTip .options .wizard {position: relative;}.openBox-weixinTip .options .wizard .arr {position: absolute;right: -10px;top: -50px;width: 40px;height: 40px;background: url(//s.bdstatic.com/common/openjs/openBox/wechatPop-arrow.png) no-repeat;-webkit-background-size: cover;background-size: cover;}.openBox-weixinTip .options .wizard .img {padding-top: 18.033%;width: 100%;background: url(//s.bdstatic.com/common/openjs/openBox/wechatPop-wizard.png) no-repeat;-webkit-background-size: cover;background-size: cover;}.openBox-weixinTip .options .wizard p {display: none;}.openBox-weixinTip .options .text {font-size: 17px;color: #777;}.openBox-weixinTip .options .link {display: block;text-decoration: underline;font-size: 17px;width: 100%;color: #3c76ff;}.openBox-weixinTip .options .btn {display: block;border: 1px solid #ccc;-webkit-border-radius: 6px;border-radius: 6px;height: 40px;line-height: 40px;font-size: 16px;text-align: center;color: #000;background-color: #fff;}.openBox-weixinTip .options .btn:active {background-color: rgba(0, 0, 0, 0.1);}.openBox-weixinTip footer {height: 115px;}.openBox-weixinTip footer .logo {overflow: hidden;margin: 0 auto;width: 216px;height: 63px;text-indent: -9999px;background: url(//s.bdstatic.com/common/openjs/openBox/wechatPop-logo.png) no-repeat;-webkit-background-size: cover;background-size: cover;}.openBox-weixinTip footer .copy {margin-top: 15px;text-align: center;font-size: 10px;color: #999;};", f = "http://a.app.qq.com/o/simple.jsp", x = "https://boxer.baidu.com/scheme?scheme=", h = "https://mo.baidu.com/boxandroid", v = {
                sinaweibo: /\bweibo\b/i,
                weixin: /micromessenger\//i,
                qq: /\bQQ\//,
                qzone: /Qzone\//,
                qqbrowser: /MQQBrowser\//i,
                uc: /UCBrowser\//i,
                baidubrowser: /baidubrowser\//,
                sougoubrowser: /\bSogouMobileBrowser\//i,
                search360: /\bmso_app\b/i,
                sougousearch: /\bSogousearch\//i,
                quark: /\bQuark\//i,
                b2345: /\bMb2345Browser\//i
            }, g = {
                chrome: /\bCriOS\/([\d.]+)/,
                firefox: /\bFxiOS\//i,
                maxthon: /\bMXiOS\//i
            }, y = {
                firefox: /\bFirefox\//i,
                opera: /\bOPR\//i,
                dolphinbrowser: /\bDolphinBrowserCN\//i,
                liebaobrowser: /\bliebao/i,
                ebrowser: /\bebrowser\//i,
                lebrowser: /\blebrowser\//i,
                huohoubrowser: /\bHuohouBrowser\//i,
                vivobrowser: /\bVivoBrowser\//i,
                oppobrowser: /\bOppoBrowser\//i,
                miuibrowser: /MiuiBrowser\//i,
                samsungbrowser: /\bSamsungBrowser\//i,
                jinlibrowser: /\bGNBR\//i,
                letvbrowser: /\bEUI\sBrowser/i,
                meizubrowser: /\bMZBrowser/i
            }, w = r, k = n("common:bdbox/utils/detect")(), B = n("common:bdbox/utils/version_compare"), E = n("common:bdbox/utils/queryToJson"), C = E(e.location.href), O = c(e.navigator.userAgent), S = n("common:bdbox/monitor/pblog");
            S("init", [14]),
            i.exports = function(n, t) {
                function i() {
                    c || !k.isWechat && !k.isQQ ? a(D, R, u, d, _) : (f = l(f, "pkgname", r),
                    U && (f = l(f, "ckey", U)),
                    f = l(f, "android_scheme", encodeURIComponent(D)),
                    e.location.href = f)
                }
                if (!w.$isBox() && w.isObject(n)) {
                    var r, c = 1 == n.overwrite ? 1 : 0, d = n.from || n.sfrom || "other", u = n.waitTime || 100, m = n.failUrl || "", b = n.failUrlWidthScheme || "", v = n.failUrlParams || "", g = n.token || "", y = n.ts || "", E = n.appid || "", I = n.idmData || {}, T = n.matrix || "", A = {
                        source: d,
                        from: "openbox",
                        page: O,
                        type: C && 1 == C.isBdboxShare ? "share" : "",
                        value: "",
                        channel: n.channel || "",
                        extlog: n.extLog || ""
                    }, _ = n.copyTokenData || {}, P = n.yybData || {}, N = parseInt(P.pkg);
                    switch (N) {
                    case 1:
                        r = "com.baidu.searchbox";
                        break;
                    case 2:
                        r = "com.baidu.searchbox.lite";
                        break;
                    default:
                        r = "com.baidu.searchbox"
                    }
                    var U = P.ckey
                      , j = o.cookie || ""
                      , z = /baiduid=(.+?);/i
                      , F = j.match(z);
                    F && F.length && (A.baiduId = F[1] || "");
                    var R;
                    if (R = w.isFunction(n.failCallback) ? n.failCallback : n.channel ? h + "?from=" + n.channel : h,
                    k.android && n.androidCommand) {
                        var D;
                        if (w.isObject(n.androidCommand)) {
                            var M = "7.4";
                            (n.androidCommand.minver || "lite" === n.matrix) && (M = n.androidCommand.minver || "3.3",
                            delete n.androidCommand.minver);
                            var H = "";
                            H = n.backQuery ? '{"intent":"intent:#Intent;action=com.baidu.searchbox.action.SEARCH;S.key_value=' + n.backQuery : '{"intent":"intent:#Intent;action=com.baidu.searchbox.action.HOME',
                            n.packageName && (H += ";package=" + n.packageName),
                            p(n.androidCommand) ? H += ';end"}' : H = H + ";S.targetCommand=" + encodeURIComponent(JSON.stringify(n.androidCommand)) + ';end"}',
                            D = (n.protocolHeader || "baiduboxapp") + "://utils?action=sendIntent&minver=" + M + "&params=" + encodeURIComponent(H)
                        } else
                            D = n.androidCommand;
                        A.app_now = O + "_" + Date.now() + "_" + (Math.random() + "").slice(-10),
                        A.yyb_pkg = r,
                        A.idmData = I,
                        A.matrix = T,
                        D = D + "&needlog=1&logargs=" + encodeURIComponent(JSON.stringify(A)),
                        t ? i() : S("event", ["openBox", d, A, null, i])
                    } else if (k.ios && n.iosScheme) {
                        A.app_now = O + "_" + Date.now() + "_" + (Math.random() + "").slice(-10);
                        var Q = n.iosScheme + "&needlog=1&logargs=" + encodeURIComponent(JSON.stringify(A));
                        if (A.isUL = B(k.version, "9.0") >= 0 && !c ? 1 : 0,
                        S("event", ["openBox", d, A]),
                        B(k.version, "9.0") < 0 || c || n.iosForceScheme)
                            !c && k.isWechat ? s() : a(Q, R, u, d, _);
                        else {
                            var J = x + encodeURIComponent(Q);
                            J = l(J, "source", d),
                            J = l(J, "channel", n.channel),
                            v && (J = l(J, "failurlparams", encodeURIComponent(v))),
                            "" != m && (b && (m = l(m, "scheme", encodeURIComponent(Q))),
                            J += "&target=" + encodeURIComponent(m),
                            J += "&token=" + encodeURIComponent(g),
                            J += "&ts=" + encodeURIComponent(y),
                            J += "&appid=" + encodeURIComponent(E)),
                            J = l(J, "tokenData", encodeURIComponent(JSON.stringify(_))),
                            e.location.href = J
                        }
                    } else
                        w.isFunction(R) ? R() : e.location.href = R
                }
            }
        });
        var b = i("common:bdbox/utils/detect")();
        r("common:bdbox/clone", function(e, o, n) {
            var t = Object.prototype.toString
              , i = function(e, o, n) {
                var t = 0;
                for (var i in e)
                    if (e.hasOwnProperty(i))
                        if (n)
                            o[i] = e[i];
                        else if (o(i, e[i], t++))
                            break
            }
              , r = function(e) {
                var o;
                switch (t.call(e)) {
                case "[object Object]":
                    o = {},
                    i(e, function(e, n) {
                        o[e] = r(n)
                    });
                    break;
                case "[object Array]":
                    o = [],
                    e.forEach(function(e) {
                        o.push(r(e))
                    });
                    break;
                default:
                    o = e
                }
                return o
            };
            n.exports = r
        }),
        r("common:bdbox/utils/each", function(e, o, n, t) {
            n.exports = function(e, o, n) {
                if (t.isArray(e)) {
                    for (var i = 0; i < e.length; i++)
                        if (o.call(n || e[i], e[i], i) === !1)
                            return e
                } else
                    for (var r in e)
                        if (o.call(n || e[r], e[r], r) === !1)
                            return e;
                return e
            }
        }),
        r("common:bdbox/event/delegate", function(e, o, n, t) {
            function i(e) {
                return e._bid || (e._bid = t.getId())
            }
            function r(e) {
                var o, n = {
                    originalEvent: e
                };
                for (o in e)
                    O.test(o) || void 0 === e[o] || (n[o] = e[o]);
                return v(S, function(o, t) {
                    n[t] = function() {
                        return this[o] = E,
                        e[t].apply(e, arguments)
                    }
                    ,
                    n[o] = C
                }),
                n
            }
            function a(e) {
                var o = ("" + e).split(".");
                return {
                    e: o[0],
                    ns: o.slice(1).sort().join(" ")
                }
            }
            function s(e, o, n, t, r, s) {
                var l = i(e)
                  , u = B[l] || (B[l] = []);
                p(o, n, function(o, n) {
                    var i = a(o);
                    i.fn = n,
                    i.sel = t,
                    i.e in k && (n = function(e) {
                        var o = e.relatedTarget;
                        return !o || o !== this && !h(this, o) ? i.fn.apply(this, arguments) : void 0
                    }
                    ),
                    i.del = r && r(n, o);
                    var p = i.del || n;
                    i.proxy = function(o) {
                        var n = p.apply(e, [o].concat(o.data));
                        return n === !1 && (o.preventDefault(),
                        o.stopPropagation()),
                        n
                    }
                    ,
                    i.i = u.length,
                    u.push(i),
                    "addEventListener"in e && e.addEventListener(c(i.e), i.proxy, d(i, s))
                })
            }
            function c(e) {
                return k[e] || e
            }
            function d(e, o) {
                return e.del && ("focus" == e.e || "blur" == e.e) || !!o
            }
            function p(e, o, n) {
                e.split(/\s/).forEach(function(e) {
                    n(e, o)
                })
            }
            function l(e, o, n, t, r) {
                var a = i(e);
                p(o || "", n, function(o, n) {
                    u(e, o, n, t).forEach(function(o) {
                        delete B[a][o.i],
                        "removeEventListener"in e && e.removeEventListener(c(o.e), o.proxy, d(o, r))
                    })
                })
            }
            function u(e, o, n, t) {
                if (o = a(o),
                o.ns)
                    var r = f(o.ns);
                return (B[i(e)] || []).filter(function(e) {
                    return !(!e || o.e && e.e != o.e || o.ns && !r.test(e.ns) || n && i(e.fn) !== i(n) || t && e.sel != t)
                })
            }
            function m(e, o, n) {
                for (var t = !1; e && !(t ? t.indexOf(e) >= 0 : x(e, o)); )
                    e = e !== n && !b(e) && e.parentNode;
                return e
            }
            function b(e) {
                return null != e && e.nodeType == e.DOCUMENT_NODE
            }
            function f(e) {
                return new RegExp("(?:^| )" + e.replace(" ", " .* ?") + "(?: |$)")
            }
            function x(e, o) {
                if (!e || 1 !== e.nodeType)
                    return !1;
                var n = e.webkitMatchesSelector || e.matchesSelector;
                if (n)
                    return n.call(e, o);
                var t, i = e.parentNode, r = !i;
                return r && (i = tempParent).appendChild(e),
                t = ~T(i, o).indexOf(e),
                r && tempParent.removeChild(e),
                t
            }
            function h(e, o) {
                return e !== o && e.contains(o)
            }
            var v = e("common:bdbox/utils/each")
              , g = /^\.([\w-]+)$/
              , y = /^#([\w-]*)$/
              , w = /^[\w-]+$/
              , k = {
                mouseenter: "mouseover",
                mouseleave: "mouseout"
            }
              , B = {}
              , E = function() {
                return !0
            }
              , C = function() {
                return !1
            }
              , O = /^([A-Z]|layer[XY]$)/
              , S = {
                preventDefault: "isDefaultPrevented",
                stopImmediatePropagation: "isImmediatePropagationStopped",
                stopPropagation: "isPropagationStopped"
            }
              , I = {
                on: function(e, o, n, t) {
                    return s(e, n, t, o, function(n) {
                        return function(t) {
                            var i, a = m(t.target, o, e);
                            return a ? (i = r(t),
                            i.currentTarget = a,
                            i.liveFired = e,
                            n.apply(a, [i].concat([].slice.call(arguments, 1)))) : void 0
                        }
                    })
                },
                off: function(e, o, n, t) {
                    return l(e, n, t, o)
                }
            };
            n.exports = I;
            var T = function(e, o) {
                var n;
                return b(e) && y.test(o) ? (n = e.getElementById(RegExp.$1)) ? [n] : [] : 1 !== e.nodeType && 9 !== e.nodeType ? [] : slice.call(g.test(o) ? e.getElementsByClassName(RegExp.$1) : w.test(o) ? e.getElementsByTagName(o) : e.querySelectorAll(o))
            }
        });
        var f = ".openBox-shareEntry *,.openBox-shareEntry *:before,.openBox-shareEntry *:after{    margin: 0;    padding: 0;}.openBox-shareEntry {    margin: 0;    padding: 0;    position: relative;    width: 100%;    height: 60px;}.openBox-shareEntry div {  /* UC下被屏蔽 */    display: block !important;}.openBox-shareEntry .shareEntry-blank {    box-sizing: border-box;    width: 100%;    height: 60px;    padding: 0px 18px;    position: fixed;    left: 0;    bottom: 0;    z-index: 9999;    display: -webkit-box !important;    display: box !important;    -webkit-box-align: center;    box-align: center;    background-color: rgba(0, 0, 0, 0.7);}.openBox-shareEntry .shareEntry-box {    -webkit-box-flex: 1;    box-flex: 1;    display: -webkit-box !important;    display: box !important;    box-sizing: border-box;    -webkit-box-align: center;    box-align: center;}.openBox-shareEntry .shareEntry-box .shareEntry-icon {    height: 40px;    width: 40px;    background: url(//s.bdstatic.com/common/openjs/openBox/shareEntry-logo.png) no-repeat;    background-size: 40px 40px;    border-radius: 4px;    overflow: hidden;    margin-right: 12px;}.openBox-shareEntry .shareEntry-box .shareEntry-text {    -webkit-box-flex: 1;    box-flex: 1;}.openBox-shareEntry .shareEntry-box .shareEntry-title {    text-align: left;    line-height: 1;    font-weight: bold;    color: #FFFFFF;    font-size: 17px;}@media only screen and (max-width: 320px) {    .openBox-shareEntry .shareEntry-box .shareEntry-title {        font-size: 15px;    }}.openBox-shareEntry .shareEntry-box .shareEntry-cont {    text-align: left;    white-space: nowrap;    overflow: hidden;    color: #999999;    margin-top: 4px;    line-height: 1.2;    -webkit-text-size-adjust: none;    font-size: 13px;}@media only screen and (max-width: 320px) {    .openBox-shareEntry .shareEntry-box .shareEntry-cont {        font-size: 10px;    }}.openBox-shareEntry .shareEntry-app {    width: 75px;    box-sizing: border-box;    margin-left: 12px;}.openBox-shareEntry .shareEntry-app .shareEntry-btn {    display: block;    width: 75px;    height: 30px;    line-height: 30px;    text-align: center;    color: #ffffff;    font-size: 15px;    border-radius: 4px;    background-color: #3c76ff;}"
          , x = {
            firstOpen: "main",
            secondOpen: "lite",
            status: "-1"
        };
        s(),
        e.OpenBox = function(t) {
            function r(e) {
                w ? e() : y.push(e)
            }
            function a() {
                w || (w = !0,
                y.forEach(function(e) {
                    e()
                }),
                y.length = 0)
            }
            function s(e, o) {
                e = e || {},
                o === n && (o = !0),
                e.matrix || k.matrix || (e.matrix = "main"),
                !e.matrix && k.matrix && (e.matrix = k.matrix);
                var t = {
                    main: {
                        protocolHeader: "baiduboxapp",
                        packageName: "com.baidu.searchbox"
                    },
                    lite: {
                        protocolHeader: "baiduboxlite",
                        packageName: "com.baidu.searchbox.lite"
                    },
                    info: {
                        protocolHeader: "baiduinfoapp",
                        packageName: "com.baidu.searchbox.info"
                    },
                    pro: {
                        protocolHeader: "baiduboxpro",
                        packageName: "com.baidu.BaiduMobilePlus"
                    }
                };
                return e.protocolHeader = t[e.matrix || "main"].protocolHeader || t.main.protocolHeader,
                e.packageName = t[e.matrix || "main"].packageName || t.main.packageName,
                o ? (v(!0, k, e),
                !0) : e
            }
            function c() {
                i("common:bdbox/utils/addStyle")(f);
                var e = o.createElement("div");
                e.setAttribute("class", "openBox-shareEntry"),
                e.innerHTML = '<div class="shareEntry-blank"><div class="shareEntry-box"><div class="shareEntry-icon"></div><div class="shareEntry-text"><p class="shareEntry-title">' + k.tipTexts.title + '</p><p class="shareEntry-cont">' + k.tipTexts.subtitle + '</p></div></div><div class="shareEntry-app"><a class="shareEntry-btn">' + k.tipTexts.button + "</a></div></div>",
                o.body.appendChild(e);
                var n = e.querySelectorAll(".shareEntry-btn")[0];
                n.addEventListener("click", function() {
                    p()
                })
            }
            function d(e, o) {
                if (e) {
                    var n = S(k);
                    return v(!0, n, s(e, !1)),
                    void E(l(n), o)
                }
                return w ? void E(l(k), o) : void console.log("_openBoxInfo not ready!")
            }
            function p(e) {
                e = e || {},
                t = t || {},
                e.matrix || t.matrix || (e.matrix = "main");
                var o = e.copyTokenData || t.copyTokenData || {};
                if (null == e.failCallback && null == t.failCallback && b.android && (e.failCallback = function() {
                    var n = e.channel || t.channel || "757b"
                      , i = e.from || t.from || "";
                    h(n, i, o)
                }
                ,
                /\bliebao/i.test(navigator.userAgent) && (e.failCallback = n),
                /\(.*Android.*(SAMSUNG|SM-).*\)/.test(navigator.userAgent) && (/MQQBrowser\//i.test(navigator.userAgent) || /UCBrowser\//i.test(navigator.userAgent)) && (e.failCallback = n)),
                !x || !b.android || /micromessenger\//i.test(navigator.userAgent) || /\bQQ\//.test(navigator.userAgent))
                    return void d(e);
                if (e.notUseIdm || t.notUseIdm)
                    return void d(e);
                var i = e.from || t.from || "";
                if (["neibu_shouye_yuyinsousuo", "neibu_sousuojieguoye_yuyinsousuo", "1019696a"].indexOf(i) >= 0)
                    return void d(e);
                var r = x.firstOpen
                  , a = e;
                a.idmData = x;
                var s = S(a)
                  , c = x.secondOpen;
                a.failCallback = function() {
                    s.matrix = c,
                    d(s, !0)
                }
                ,
                a.matrix = r,
                d(a)
            }
            function l(o) {
                var n = S(o);
                return b.ios && !n.iosScheme ? n.iosScheme = n.url ? u(n.url).iosScheme : u(e.location.href).iosScheme : b.android && !n.androidCommand && (n.androidCommand = n.url ? u(n.url).androidCommand : u(e.location.href).androidCommand),
                1 == n.overwrite && (n.failCallback = m.isFunction(n.failCallback) ? n.failCallback : function() {}
                ),
                n
            }
            function u(e) {
                var o = {}
                  , n = encodeURIComponent(e);
                return o.iosScheme = k.protocolHeader + "://easybrowse?opentype=1&openurl=" + n + "&isla=0&newbrowser=1",
                o.androidCommand = {
                    mode: "0",
                    intent: "intent:#Intent;B.bdsb_append_param=true;S.bdsb_light_start_url=" + n + ";package=" + k.packageName + ";end",
                    "class": "com.baidu.searchbox.xsearch.UserSubscribeCenterActivity",
                    min_v: "16787968"
                },
                o
            }
            function h(n, t, i) {
                function r(n) {
                    var t = o.createElement("iframe");
                    t.src = n,
                    t.style.display = "none",
                    o.body.appendChild(t),
                    e.setTimeout(function() {
                        o.body.removeChild(t)
                    }, 300)
                }
                var a, s, c = {
                    xiaomi: {
                        reg: /\(.*Android.*(MI|Mi|Redmi).*\)/,
                        scheme: "mimarket://details?id=com.baidu.searchbox&back=true"
                    },
                    samsung: {
                        reg: /\(.*Android.*(SAMSUNG|SM-).*\)/,
                        scheme: "samsungapps://ProductDetail/com.baidu.searchbox"
                    },
                    huawei: {
                        reg: /\(.*Android.*(HUAWEI|HONOR).*\)/i,
                        scheme: "appmarket://details?id=com.baidu.searchbox"
                    },
                    oppo: {
                        reg: /\(.*Android.*OPPO.*\)/,
                        scheme: "oppomarket://details?packagename=com.baidu.searchbox",
                        downloadFirst: !0
                    },
                    vivo: {
                        reg: /\(.*Android.*(vivo|VIVO).*\)/,
                        scheme: "vivomarket://details?id=com.baidu.searchbox"
                    }
                };
                for (a in c) {
                    if (!c.hasOwnProperty(a))
                        return;
                    s = c[a],
                    s.reg.test(navigator.userAgent) && r(s.scheme)
                }
                setTimeout(function() {
                    var e = "https://mo.baidu.com/boxandroid?from=" + n + "&source=" + t;
                    e += "&tokenData=" + encodeURIComponent(JSON.stringify(i)),
                    location.href = e
                }, 300)
            }
            var v = i("common:bdbox/extend");
            if (m.isBox) {
                var g = function() {
                    console.log("OpenBox只支持在手百外使用")
                };
                return {
                    ready: g,
                    open: g
                }
            }
            var y = []
              , w = !1
              , k = {
                tipTexts: {
                    title: "百度",
                    subtitle: "打开百度App，遇见更多精彩。",
                    button: "立刻打开"
                }
            };
            if (s(t),
            t && b.ios && t.iosScheme)
                k.iosScheme = t.iosScheme,
                a();
            else if (t && b.android && t.androidCommand)
                k.androidCommand = t.androidCommand,
                a();
            else if (t && t.serverSchemeInfo) {
                var B = i("common:bdbox/io/loadJS");
                B({
                    url: "//m.baidu.com/searchbox?action=cmd&nomust=searchbox&service=bdbox&cb=?",
                    data: t.serverSchemeInfo,
                    success: function(e) {
                        try {
                            0 == e.errno && e.data && (b.ios ? (k.iosScheme = e.data.cmd.url,
                            a()) : b.android && (k.androidCommand = e.data.cmd,
                            a()))
                        } catch (o) {}
                    },
                    error: function(e) {
                        console.log("error:" + e)
                    }
                })
            } else
                a();
            t && t.showTip && r(c);
            var E = i("common:bdbox/invoke/openBox")
              , C = "openBox"
              , O = i("common:bdbox/event/delegate")
              , S = i("common:bdbox/clone");
            return O.on(o.body || o.documentElement, "[data-box]", "click", function() {
                if (~this.dataset.box.indexOf(C)) {
                    var e = S(k);
                    if (1 == this.dataset.boxCustom ? (e.androidCommand = this.dataset.boxAndroidcommand,
                    e.iosScheme = this.dataset.boxIosscheme) : (e.androidCommand = null,
                    e.iosScheme = null,
                    e.url = this.dataset.boxUrl || this.href),
                    this.dataset.boxFailurl && (e.failUrl = this.dataset.boxFailurl),
                    this.dataset.boxFrom && (e.from = this.dataset.boxFrom),
                    this.dataset.boxChannel && (e.channel = this.dataset.boxChannel),
                    this.dataset.boxOverwrite && (e.overwrite = this.dataset.boxOverwrite),
                    k.failCallback && m.isFunction(k.failCallback)) {
                        var o = this;
                        e.failCallback = function() {
                            k.failCallback(o)
                        }
                    } else
                        1 == e.overwrite && (e.failCallback = function() {}
                        );
                    if (p(e),
                    1 != e.overwrite)
                        return !1
                }
            }),
            {
                ready: r,
                open: p,
                version: 20170811
            }
        }
        ,
        e.OpenBox.getIdmData = function() {
            return x || {}
        }
    }(window, document)
});
_superframeJSLoader(function(t, e) {
    {
        var n = (e.Bdbox,
        e.define);
        e.require
    }
    !function(t, e) {
        "function" == typeof n && n.amd ? n(function() {
            return e(t)
        }) : e(t)
    }(this, function(t) {
        var n = function() {
            function e(t) {
                return null == t ? String(t) : W[Y.call(t)] || "object"
            }
            function n(t) {
                return "function" == e(t)
            }
            function r(t) {
                return null != t && t == t.window
            }
            function i(t) {
                return null != t && t.nodeType == t.DOCUMENT_NODE
            }
            function o(t) {
                return "object" == e(t)
            }
            function a(t) {
                return o(t) && !r(t) && Object.getPrototypeOf(t) == Object.prototype
            }
            function s(t) {
                var e = !!t && "length"in t && t.length
                  , n = w.type(t);
                return "function" != n && !r(t) && ("array" == n || 0 === e || "number" == typeof e && e > 0 && e - 1 in t)
            }
            function u(t) {
                return D.call(t, function(t) {
                    return null != t
                })
            }
            function c(t) {
                return t.length > 0 ? w.fn.concat.apply([], t) : t
            }
            function l(t) {
                return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
            }
            function f(t) {
                return t in k ? k[t] : k[t] = new RegExp("(^|\\s)" + t + "(\\s|$)")
            }
            function h(t, e) {
                return "number" != typeof e || M[l(t)] ? e : e + "px"
            }
            function p(t) {
                var e, n;
                return F[t] || (e = $.createElement(t),
                $.body.appendChild(e),
                n = getComputedStyle(e, "").getPropertyValue("display"),
                e.parentNode.removeChild(e),
                "none" == n && (n = "block"),
                F[t] = n),
                F[t]
            }
            function d(t) {
                return "children"in t ? L.call(t.children) : w.map(t.childNodes, function(t) {
                    return 1 == t.nodeType ? t : void 0
                })
            }
            function m(t, e) {
                var n, r = t ? t.length : 0;
                for (n = 0; r > n; n++)
                    this[n] = t[n];
                this.length = r,
                this.selector = e || ""
            }
            function g(t, e, n) {
                for (S in e)
                    n && (a(e[S]) || te(e[S])) ? (a(e[S]) && !a(t[S]) && (t[S] = {}),
                    te(e[S]) && !te(t[S]) && (t[S] = []),
                    g(t[S], e[S], n)) : e[S] !== T && (t[S] = e[S])
            }
            function v(t, e) {
                return null == e ? w(t) : w(t).filter(e)
            }
            function y(t, e, r, i) {
                return n(e) ? e.call(t, r, i) : e
            }
            function x(t, e, n) {
                null == n ? t.removeAttribute(e) : t.setAttribute(e, n)
            }
            function b(t, e) {
                var n = t.className || ""
                  , r = n && n.baseVal !== T;
                return e === T ? r ? n.baseVal : n : void (r ? n.baseVal = e : t.className = e)
            }
            function E(t) {
                try {
                    return t ? "true" == t || ("false" == t ? !1 : "null" == t ? null : +t + "" == t ? +t : /^[\[\{]/.test(t) ? w.parseJSON(t) : t) : t
                } catch (e) {
                    return t
                }
            }
            function j(t, e) {
                e(t);
                for (var n = 0, r = t.childNodes.length; r > n; n++)
                    j(t.childNodes[n], e)
            }
            var T, S, w, C, N, O, P = [], A = P.concat, D = P.filter, L = P.slice, $ = t.document, F = {}, k = {}, M = {
                "column-count": 1,
                columns: 1,
                "font-weight": 1,
                "line-height": 1,
                opacity: 1,
                "z-index": 1,
                zoom: 1
            }, R = /^\s*<(\w+|!)[^>]*>/, Z = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, z = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, q = /^(?:body|html)$/i, H = /([A-Z])/g, _ = ["val", "css", "html", "text", "data", "width", "height", "offset"], B = ["after", "prepend", "before", "append"], I = $.createElement("table"), V = $.createElement("tr"), J = {
                tr: $.createElement("tbody"),
                tbody: I,
                thead: I,
                tfoot: I,
                td: V,
                th: V,
                "*": $.createElement("div")
            }, U = /complete|loaded|interactive/, X = /^[\w-]*$/, W = {}, Y = W.toString, G = {}, K = $.createElement("div"), Q = {
                tabindex: "tabIndex",
                readonly: "readOnly",
                "for": "htmlFor",
                "class": "className",
                maxlength: "maxLength",
                cellspacing: "cellSpacing",
                cellpadding: "cellPadding",
                rowspan: "rowSpan",
                colspan: "colSpan",
                usemap: "useMap",
                frameborder: "frameBorder",
                contenteditable: "contentEditable"
            }, te = Array.isArray || function(t) {
                return t instanceof Array
            }
            ;
            return G.matches = function(t, e) {
                if (!e || !t || 1 !== t.nodeType)
                    return !1;
                var n = t.matches || t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
                if (n)
                    return n.call(t, e);
                var r, i = t.parentNode, o = !i;
                return o && (i = K).appendChild(t),
                r = ~G.qsa(i, e).indexOf(t),
                o && K.removeChild(t),
                r
            }
            ,
            N = function(t) {
                return t.replace(/-+(.)?/g, function(t, e) {
                    return e ? e.toUpperCase() : ""
                })
            }
            ,
            O = function(t) {
                return D.call(t, function(e, n) {
                    return t.indexOf(e) == n
                })
            }
            ,
            G.fragment = function(t, e, n) {
                var r, i, o;
                return Z.test(t) && (r = w($.createElement(RegExp.$1))),
                r || (t.replace && (t = t.replace(z, "<$1></$2>")),
                e === T && (e = R.test(t) && RegExp.$1),
                e in J || (e = "*"),
                o = J[e],
                o.innerHTML = "" + t,
                r = w.each(L.call(o.childNodes), function() {
                    o.removeChild(this)
                })),
                a(n) && (i = w(r),
                w.each(n, function(t, e) {
                    _.indexOf(t) > -1 ? i[t](e) : i.attr(t, e)
                })),
                r
            }
            ,
            G.Z = function(t, e) {
                return new m(t,e)
            }
            ,
            G.isZ = function(t) {
                return t instanceof G.Z
            }
            ,
            G.init = function(t, e) {
                var r;
                if (!t)
                    return G.Z();
                if ("string" == typeof t)
                    if (t = t.trim(),
                    "<" == t[0] && R.test(t))
                        r = G.fragment(t, RegExp.$1, e),
                        t = null;
                    else {
                        if (e !== T)
                            return w(e).find(t);
                        r = G.qsa($, t)
                    }
                else {
                    if (n(t))
                        return w($).ready(t);
                    if (G.isZ(t))
                        return t;
                    if (te(t))
                        r = u(t);
                    else if (o(t))
                        r = [t],
                        t = null;
                    else if (R.test(t))
                        r = G.fragment(t.trim(), RegExp.$1, e),
                        t = null;
                    else {
                        if (e !== T)
                            return w(e).find(t);
                        r = G.qsa($, t)
                    }
                }
                return G.Z(r, t)
            }
            ,
            w = function(t, e) {
                return G.init(t, e)
            }
            ,
            w.extend = function(t) {
                var e, n = L.call(arguments, 1);
                return "boolean" == typeof t && (e = t,
                t = n.shift()),
                n.forEach(function(n) {
                    g(t, n, e)
                }),
                t
            }
            ,
            G.qsa = function(t, e) {
                var n, r = "#" == e[0], i = !r && "." == e[0], o = r || i ? e.slice(1) : e, a = X.test(o);
                return t.getElementById && a && r ? (n = t.getElementById(o)) ? [n] : [] : 1 !== t.nodeType && 9 !== t.nodeType && 11 !== t.nodeType ? [] : L.call(a && !r && t.getElementsByClassName ? i ? t.getElementsByClassName(o) : t.getElementsByTagName(e) : t.querySelectorAll(e))
            }
            ,
            w.contains = $.documentElement.contains ? function(t, e) {
                return t !== e && t.contains(e)
            }
            : function(t, e) {
                for (; e && (e = e.parentNode); )
                    if (e === t)
                        return !0;
                return !1
            }
            ,
            w.type = e,
            w.isFunction = n,
            w.isWindow = r,
            w.isArray = te,
            w.isPlainObject = a,
            w.isEmptyObject = function(t) {
                var e;
                for (e in t)
                    return !1;
                return !0
            }
            ,
            w.isNumeric = function(t) {
                var e = Number(t)
                  , n = typeof t;
                return null != t && "boolean" != n && ("string" != n || t.length) && !isNaN(e) && isFinite(e) || !1
            }
            ,
            w.inArray = function(t, e, n) {
                return P.indexOf.call(e, t, n)
            }
            ,
            w.camelCase = N,
            w.trim = function(t) {
                return null == t ? "" : String.prototype.trim.call(t)
            }
            ,
            w.uuid = 0,
            w.support = {},
            w.expr = {},
            w.noop = function() {}
            ,
            w.map = function(t, e) {
                var n, r, i, o = [];
                if (s(t))
                    for (r = 0; r < t.length; r++)
                        n = e(t[r], r),
                        null != n && o.push(n);
                else
                    for (i in t)
                        n = e(t[i], i),
                        null != n && o.push(n);
                return c(o)
            }
            ,
            w.each = function(t, e) {
                var n, r;
                if (s(t)) {
                    for (n = 0; n < t.length; n++)
                        if (e.call(t[n], n, t[n]) === !1)
                            return t
                } else
                    for (r in t)
                        if (e.call(t[r], r, t[r]) === !1)
                            return t;
                return t
            }
            ,
            w.grep = function(t, e) {
                return D.call(t, e)
            }
            ,
            t.JSON && (w.parseJSON = JSON.parse),
            w.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
                W["[object " + e + "]"] = e.toLowerCase()
            }),
            w.fn = {
                constructor: G.Z,
                length: 0,
                forEach: P.forEach,
                reduce: P.reduce,
                push: P.push,
                sort: P.sort,
                splice: P.splice,
                indexOf: P.indexOf,
                concat: function() {
                    var t, e, n = [];
                    for (t = 0; t < arguments.length; t++)
                        e = arguments[t],
                        n[t] = G.isZ(e) ? e.toArray() : e;
                    return A.apply(G.isZ(this) ? this.toArray() : this, n)
                },
                map: function(t) {
                    return w(w.map(this, function(e, n) {
                        return t.call(e, n, e)
                    }))
                },
                slice: function() {
                    return w(L.apply(this, arguments))
                },
                ready: function(t) {
                    return U.test($.readyState) && $.body ? t(w) : $.addEventListener("DOMContentLoaded", function() {
                        t(w)
                    }, !1),
                    this
                },
                get: function(t) {
                    return t === T ? L.call(this) : this[t >= 0 ? t : t + this.length]
                },
                toArray: function() {
                    return this.get()
                },
                size: function() {
                    return this.length
                },
                remove: function() {
                    return this.each(function() {
                        null != this.parentNode && this.parentNode.removeChild(this)
                    })
                },
                each: function(t) {
                    return P.every.call(this, function(e, n) {
                        return t.call(e, n, e) !== !1
                    }),
                    this
                },
                filter: function(t) {
                    return n(t) ? this.not(this.not(t)) : w(D.call(this, function(e) {
                        return G.matches(e, t)
                    }))
                },
                add: function(t, e) {
                    return w(O(this.concat(w(t, e))))
                },
                is: function(t) {
                    return this.length > 0 && G.matches(this[0], t)
                },
                not: function(t) {
                    var e = [];
                    if (n(t) && t.call !== T)
                        this.each(function(n) {
                            t.call(this, n) || e.push(this)
                        });
                    else {
                        var r = "string" == typeof t ? this.filter(t) : s(t) && n(t.item) ? L.call(t) : w(t);
                        this.forEach(function(t) {
                            r.indexOf(t) < 0 && e.push(t)
                        })
                    }
                    return w(e)
                },
                has: function(t) {
                    return this.filter(function() {
                        return o(t) ? w.contains(this, t) : w(this).find(t).size()
                    })
                },
                eq: function(t) {
                    return -1 === t ? this.slice(t) : this.slice(t, +t + 1)
                },
                first: function() {
                    var t = this[0];
                    return t && !o(t) ? t : w(t)
                },
                last: function() {
                    var t = this[this.length - 1];
                    return t && !o(t) ? t : w(t)
                },
                find: function(t) {
                    var e, n = this;
                    return e = t ? "object" == typeof t ? w(t).filter(function() {
                        var t = this;
                        return P.some.call(n, function(e) {
                            return w.contains(e, t)
                        })
                    }) : 1 == this.length ? w(G.qsa(this[0], t)) : this.map(function() {
                        return G.qsa(this, t)
                    }) : w()
                },
                closest: function(t, e) {
                    var n = []
                      , r = "object" == typeof t && w(t);
                    return this.each(function(o, a) {
                        for (; a && !(r ? r.indexOf(a) >= 0 : G.matches(a, t)); )
                            a = a !== e && !i(a) && a.parentNode;
                        a && n.indexOf(a) < 0 && n.push(a)
                    }),
                    w(n)
                },
                parents: function(t) {
                    for (var e = [], n = this; n.length > 0; )
                        n = w.map(n, function(t) {
                            return (t = t.parentNode) && !i(t) && e.indexOf(t) < 0 ? (e.push(t),
                            t) : void 0
                        });
                    return v(e, t)
                },
                parent: function(t) {
                    return v(O(this.pluck("parentNode")), t)
                },
                children: function(t) {
                    return v(this.map(function() {
                        return d(this)
                    }), t)
                },
                contents: function() {
                    return this.map(function() {
                        return this.contentDocument || L.call(this.childNodes)
                    })
                },
                siblings: function(t) {
                    return v(this.map(function(t, e) {
                        return D.call(d(e.parentNode), function(t) {
                            return t !== e
                        })
                    }), t)
                },
                empty: function() {
                    return this.each(function() {
                        this.innerHTML = ""
                    })
                },
                pluck: function(t) {
                    return w.map(this, function(e) {
                        return e[t]
                    })
                },
                show: function() {
                    return this.each(function() {
                        "none" == this.style.display && (this.style.display = ""),
                        "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = p(this.nodeName))
                    })
                },
                replaceWith: function(t) {
                    return this.before(t).remove()
                },
                wrap: function(t) {
                    var e = n(t);
                    if (this[0] && !e)
                        var r = w(t).get(0)
                          , i = r.parentNode || this.length > 1;
                    return this.each(function(n) {
                        w(this).wrapAll(e ? t.call(this, n) : i ? r.cloneNode(!0) : r)
                    })
                },
                wrapAll: function(t) {
                    if (this[0]) {
                        w(this[0]).before(t = w(t));
                        for (var e; (e = t.children()).length; )
                            t = e.first();
                        w(t).append(this)
                    }
                    return this
                },
                wrapInner: function(t) {
                    var e = n(t);
                    return this.each(function(n) {
                        var r = w(this)
                          , i = r.contents()
                          , o = e ? t.call(this, n) : t;
                        i.length ? i.wrapAll(o) : r.append(o)
                    })
                },
                unwrap: function() {
                    return this.parent().each(function() {
                        w(this).replaceWith(w(this).children())
                    }),
                    this
                },
                clone: function() {
                    return this.map(function() {
                        return this.cloneNode(!0)
                    })
                },
                hide: function() {
                    return this.css("display", "none")
                },
                toggle: function(t) {
                    return this.each(function() {
                        var e = w(this);
                        (t === T ? "none" == e.css("display") : t) ? e.show() : e.hide()
                    })
                },
                prev: function(t) {
                    return w(this.pluck("previousElementSibling")).filter(t || "*")
                },
                next: function(t) {
                    return w(this.pluck("nextElementSibling")).filter(t || "*")
                },
                html: function(t) {
                    return 0 in arguments ? this.each(function(e) {
                        var n = this.innerHTML;
                        w(this).empty().append(y(this, t, e, n))
                    }) : 0 in this ? this[0].innerHTML : null
                },
                text: function(t) {
                    return 0 in arguments ? this.each(function(e) {
                        var n = y(this, t, e, this.textContent);
                        this.textContent = null == n ? "" : "" + n
                    }) : 0 in this ? this.pluck("textContent").join("") : null
                },
                attr: function(t, e) {
                    var n;
                    return "string" != typeof t || 1 in arguments ? this.each(function(n) {
                        if (1 === this.nodeType)
                            if (o(t))
                                for (S in t)
                                    x(this, S, t[S]);
                            else
                                x(this, t, y(this, e, n, this.getAttribute(t)))
                    }) : 0 in this && 1 == this[0].nodeType && null != (n = this[0].getAttribute(t)) ? n : T
                },
                removeAttr: function(t) {
                    return this.each(function() {
                        1 === this.nodeType && t.split(" ").forEach(function(t) {
                            x(this, t)
                        }, this)
                    })
                },
                prop: function(t, e) {
                    return t = Q[t] || t,
                    1 in arguments ? this.each(function(n) {
                        this[t] = y(this, e, n, this[t])
                    }) : this[0] && this[0][t]
                },
                removeProp: function(t) {
                    return t = Q[t] || t,
                    this.each(function() {
                        delete this[t]
                    })
                },
                data: function(t, e) {
                    var n = "data-" + t.replace(H, "-$1").toLowerCase()
                      , r = 1 in arguments ? this.attr(n, e) : this.attr(n);
                    return null !== r ? E(r) : T
                },
                val: function(t) {
                    return 0 in arguments ? (null == t && (t = ""),
                    this.each(function(e) {
                        this.value = y(this, t, e, this.value)
                    })) : this[0] && (this[0].multiple ? w(this[0]).find("option").filter(function() {
                        return this.selected
                    }).pluck("value") : this[0].value)
                },
                offset: function(e) {
                    if (e)
                        return this.each(function(t) {
                            var n = w(this)
                              , r = y(this, e, t, n.offset())
                              , i = n.offsetParent().offset()
                              , o = {
                                top: r.top - i.top,
                                left: r.left - i.left
                            };
                            "static" == n.css("position") && (o.position = "relative"),
                            n.css(o)
                        });
                    if (!this.length)
                        return null;
                    if ($.documentElement !== this[0] && !w.contains($.documentElement, this[0]))
                        return {
                            top: 0,
                            left: 0
                        };
                    var n = this[0].getBoundingClientRect();
                    return {
                        left: n.left + t.pageXOffset,
                        top: n.top + t.pageYOffset,
                        width: Math.round(n.width),
                        height: Math.round(n.height)
                    }
                },
                css: function(t, n) {
                    if (arguments.length < 2) {
                        var r = this[0];
                        if ("string" == typeof t) {
                            if (!r)
                                return;
                            return r.style[N(t)] || getComputedStyle(r, "").getPropertyValue(t)
                        }
                        if (te(t)) {
                            if (!r)
                                return;
                            var i = {}
                              , o = getComputedStyle(r, "");
                            return w.each(t, function(t, e) {
                                i[e] = r.style[N(e)] || o.getPropertyValue(e)
                            }),
                            i
                        }
                    }
                    var a = "";
                    if ("string" == e(t))
                        n || 0 === n ? a = l(t) + ":" + h(t, n) : this.each(function() {
                            this.style.removeProperty(l(t))
                        });
                    else
                        for (S in t)
                            t[S] || 0 === t[S] ? a += l(S) + ":" + h(S, t[S]) + ";" : this.each(function() {
                                this.style.removeProperty(l(S))
                            });
                    return this.each(function() {
                        this.style.cssText += ";" + a
                    })
                },
                index: function(t) {
                    return t ? this.indexOf(w(t)[0]) : this.parent().children().indexOf(this[0])
                },
                hasClass: function(t) {
                    return t ? P.some.call(this, function(t) {
                        return this.test(b(t))
                    }, f(t)) : !1
                },
                addClass: function(t) {
                    return t ? this.each(function(e) {
                        if ("className"in this) {
                            C = [];
                            var n = b(this)
                              , r = y(this, t, e, n);
                            r.split(/\s+/g).forEach(function(t) {
                                w(this).hasClass(t) || C.push(t)
                            }, this),
                            C.length && b(this, n + (n ? " " : "") + C.join(" "))
                        }
                    }) : this
                },
                removeClass: function(t) {
                    return this.each(function(e) {
                        if ("className"in this) {
                            if (t === T)
                                return b(this, "");
                            C = b(this),
                            y(this, t, e, C).split(/\s+/g).forEach(function(t) {
                                C = C.replace(f(t), " ")
                            }),
                            b(this, C.trim())
                        }
                    })
                },
                toggleClass: function(t, e) {
                    return t ? this.each(function(n) {
                        var r = w(this)
                          , i = y(this, t, n, b(this));
                        i.split(/\s+/g).forEach(function(t) {
                            (e === T ? !r.hasClass(t) : e) ? r.addClass(t) : r.removeClass(t)
                        })
                    }) : this
                },
                scrollTop: function(t) {
                    if (this.length) {
                        var e = "scrollTop"in this[0];
                        return t === T ? e ? this[0].scrollTop : this[0].pageYOffset : this.each(e ? function() {
                            this.scrollTop = t
                        }
                        : function() {
                            this.scrollTo(this.scrollX, t)
                        }
                        )
                    }
                },
                scrollLeft: function(t) {
                    if (this.length) {
                        var e = "scrollLeft"in this[0];
                        return t === T ? e ? this[0].scrollLeft : this[0].pageXOffset : this.each(e ? function() {
                            this.scrollLeft = t
                        }
                        : function() {
                            this.scrollTo(t, this.scrollY)
                        }
                        )
                    }
                },
                position: function() {
                    if (this.length) {
                        var t = this[0]
                          , e = this.offsetParent()
                          , n = this.offset()
                          , r = q.test(e[0].nodeName) ? {
                            top: 0,
                            left: 0
                        } : e.offset();
                        return n.top -= parseFloat(w(t).css("margin-top")) || 0,
                        n.left -= parseFloat(w(t).css("margin-left")) || 0,
                        r.top += parseFloat(w(e[0]).css("border-top-width")) || 0,
                        r.left += parseFloat(w(e[0]).css("border-left-width")) || 0,
                        {
                            top: n.top - r.top,
                            left: n.left - r.left
                        }
                    }
                },
                offsetParent: function() {
                    return this.map(function() {
                        for (var t = this.offsetParent || $.body; t && !q.test(t.nodeName) && "static" == w(t).css("position"); )
                            t = t.offsetParent;
                        return t
                    })
                }
            },
            w.fn.detach = w.fn.remove,
            ["width", "height"].forEach(function(t) {
                var e = t.replace(/./, function(t) {
                    return t[0].toUpperCase()
                });
                w.fn[t] = function(n) {
                    var o, a = this[0];
                    return n === T ? r(a) ? a["inner" + e] : i(a) ? a.documentElement["scroll" + e] : (o = this.offset()) && o[t] : this.each(function(e) {
                        a = w(this),
                        a.css(t, y(this, n, e, a[t]()))
                    })
                }
            }),
            B.forEach(function(n, r) {
                var i = r % 2;
                w.fn[n] = function() {
                    var n, o, a = w.map(arguments, function(t) {
                        var r = [];
                        return n = e(t),
                        "array" == n ? (t.forEach(function(t) {
                            return t.nodeType !== T ? r.push(t) : w.zepto.isZ(t) ? r = r.concat(t.get()) : void (r = r.concat(G.fragment(t)))
                        }),
                        r) : "object" == n || null == t ? t : G.fragment(t)
                    }), s = this.length > 1;
                    return a.length < 1 ? this : this.each(function(e, n) {
                        o = i ? n : n.parentNode,
                        n = 0 == r ? n.nextSibling : 1 == r ? n.firstChild : 2 == r ? n : null;
                        var u = w.contains($.documentElement, o);
                        a.forEach(function(e) {
                            if (s)
                                e = e.cloneNode(!0);
                            else if (!o)
                                return w(e).remove();
                            o.insertBefore(e, n),
                            u && j(e, function(e) {
                                if (!(null == e.nodeName || "SCRIPT" !== e.nodeName.toUpperCase() || e.type && "text/javascript" !== e.type || e.src)) {
                                    var n = e.ownerDocument ? e.ownerDocument.defaultView : t;
                                    n.eval.call(n, e.innerHTML)
                                }
                            })
                        })
                    })
                }
                ,
                w.fn[i ? n + "To" : "insert" + (r ? "Before" : "After")] = function(t) {
                    return w(t)[n](this),
                    this
                }
            }),
            G.Z.prototype = m.prototype = w.fn,
            G.uniq = O,
            G.deserializeValue = E,
            w.zepto = G,
            w
        }();
        return e.Zepto = n,
        void 0 === e.$ && (e.$ = n),
        function(e) {
            function n(t) {
                return t._zid || (t._zid = p++)
            }
            function r(t, e, r, a) {
                if (e = i(e),
                e.ns)
                    var s = o(e.ns);
                return (v[n(t)] || []).filter(function(t) {
                    return !(!t || e.e && t.e != e.e || e.ns && !s.test(t.ns) || r && n(t.fn) !== n(r) || a && t.sel != a)
                })
            }
            function i(t) {
                var e = ("" + t).split(".");
                return {
                    e: e[0],
                    ns: e.slice(1).sort().join(" ")
                }
            }
            function o(t) {
                return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)")
            }
            function a(t, e) {
                return t.del && !x && t.e in b || !!e
            }
            function s(t) {
                return E[t] || x && b[t] || t
            }
            function u(t, r, o, u, c, f, p) {
                var d = n(t)
                  , m = v[d] || (v[d] = []);
                r.split(/\s/).forEach(function(n) {
                    if ("ready" == n)
                        return e(document).ready(o);
                    var r = i(n);
                    r.fn = o,
                    r.sel = c,
                    r.e in E && (o = function(t) {
                        var n = t.relatedTarget;
                        return !n || n !== this && !e.contains(this, n) ? r.fn.apply(this, arguments) : void 0
                    }
                    ),
                    r.del = f;
                    var d = f || o;
                    r.proxy = function(e) {
                        if (e = l(e),
                        !e.isImmediatePropagationStopped()) {
                            e.data = u;
                            var n = d.apply(t, e._args == h ? [e] : [e].concat(e._args));
                            return n === !1 && (e.preventDefault(),
                            e.stopPropagation()),
                            n
                        }
                    }
                    ,
                    r.i = m.length,
                    m.push(r),
                    "addEventListener"in t && t.addEventListener(s(r.e), r.proxy, a(r, p))
                })
            }
            function c(t, e, i, o, u) {
                var c = n(t);
                (e || "").split(/\s/).forEach(function(e) {
                    r(t, e, i, o).forEach(function(e) {
                        delete v[c][e.i],
                        "removeEventListener"in t && t.removeEventListener(s(e.e), e.proxy, a(e, u))
                    })
                })
            }
            function l(t, n) {
                return (n || !t.isDefaultPrevented) && (n || (n = t),
                e.each(w, function(e, r) {
                    var i = n[e];
                    t[e] = function() {
                        return this[r] = j,
                        i && i.apply(n, arguments)
                    }
                    ,
                    t[r] = T
                }),
                t.timeStamp || (t.timeStamp = Date.now()),
                (n.defaultPrevented !== h ? n.defaultPrevented : "returnValue"in n ? n.returnValue === !1 : n.getPreventDefault && n.getPreventDefault()) && (t.isDefaultPrevented = j)),
                t
            }
            function f(t) {
                var e, n = {
                    originalEvent: t
                };
                for (e in t)
                    S.test(e) || t[e] === h || (n[e] = t[e]);
                return l(n, t)
            }
            var h, p = 1, d = Array.prototype.slice, m = e.isFunction, g = function(t) {
                return "string" == typeof t
            }, v = {}, y = {}, x = "onfocusin"in t, b = {
                focus: "focusin",
                blur: "focusout"
            }, E = {
                mouseenter: "mouseover",
                mouseleave: "mouseout"
            };
            y.click = y.mousedown = y.mouseup = y.mousemove = "MouseEvents",
            e.event = {
                add: u,
                remove: c
            },
            e.proxy = function(t, r) {
                var i = 2 in arguments && d.call(arguments, 2);
                if (m(t)) {
                    var o = function() {
                        return t.apply(r, i ? i.concat(d.call(arguments)) : arguments)
                    };
                    return o._zid = n(t),
                    o
                }
                if (g(r))
                    return i ? (i.unshift(t[r], t),
                    e.proxy.apply(null, i)) : e.proxy(t[r], t);
                throw new TypeError("expected function")
            }
            ,
            e.fn.bind = function(t, e, n) {
                return this.on(t, e, n)
            }
            ,
            e.fn.unbind = function(t, e) {
                return this.off(t, e)
            }
            ,
            e.fn.one = function(t, e, n, r) {
                return this.on(t, e, n, r, 1)
            }
            ;
            var j = function() {
                return !0
            }
              , T = function() {
                return !1
            }
              , S = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/
              , w = {
                preventDefault: "isDefaultPrevented",
                stopImmediatePropagation: "isImmediatePropagationStopped",
                stopPropagation: "isPropagationStopped"
            };
            e.fn.delegate = function(t, e, n) {
                return this.on(e, t, n)
            }
            ,
            e.fn.undelegate = function(t, e, n) {
                return this.off(e, t, n)
            }
            ,
            e.fn.live = function(t, n) {
                return e(document.body).delegate(this.selector, t, n),
                this
            }
            ,
            e.fn.die = function(t, n) {
                return e(document.body).undelegate(this.selector, t, n),
                this
            }
            ,
            e.fn.on = function(t, n, r, i, o) {
                var a, s, l = this;
                return t && !g(t) ? (e.each(t, function(t, e) {
                    l.on(t, n, r, e, o)
                }),
                l) : (g(n) || m(i) || i === !1 || (i = r,
                r = n,
                n = h),
                (i === h || r === !1) && (i = r,
                r = h),
                i === !1 && (i = T),
                l.each(function(l, h) {
                    o && (a = function(t) {
                        return c(h, t.type, i),
                        i.apply(this, arguments)
                    }
                    ),
                    n && (s = function(t) {
                        var r, o = e(t.target).closest(n, h).get(0);
                        return o && o !== h ? (r = e.extend(f(t), {
                            currentTarget: o,
                            liveFired: h
                        }),
                        (a || i).apply(o, [r].concat(d.call(arguments, 1)))) : void 0
                    }
                    ),
                    u(h, t, i, r, n, s || a)
                }))
            }
            ,
            e.fn.off = function(t, n, r) {
                var i = this;
                return t && !g(t) ? (e.each(t, function(t, e) {
                    i.off(t, n, e)
                }),
                i) : (g(n) || m(r) || r === !1 || (r = n,
                n = h),
                r === !1 && (r = T),
                i.each(function() {
                    c(this, t, r, n)
                }))
            }
            ,
            e.fn.trigger = function(t, n) {
                return t = g(t) || e.isPlainObject(t) ? e.Event(t) : l(t),
                t._args = n,
                this.each(function() {
                    t.type in b && "function" == typeof this[t.type] ? this[t.type]() : "dispatchEvent"in this ? this.dispatchEvent(t) : e(this).triggerHandler(t, n)
                })
            }
            ,
            e.fn.triggerHandler = function(t, n) {
                var i, o;
                return this.each(function(a, s) {
                    i = f(g(t) ? e.Event(t) : t),
                    i._args = n,
                    i.target = s,
                    e.each(r(s, t.type || t), function(t, e) {
                        return o = e.proxy(i),
                        i.isImmediatePropagationStopped() ? !1 : void 0
                    })
                }),
                o
            }
            ,
            "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(t) {
                e.fn[t] = function(e) {
                    return 0 in arguments ? this.bind(t, e) : this.trigger(t)
                }
            }),
            e.Event = function(t, e) {
                g(t) || (e = t,
                t = e.type);
                var n = document.createEvent(y[t] || "Events")
                  , r = !0;
                if (e)
                    for (var i in e)
                        "bubbles" == i ? r = !!e[i] : n[i] = e[i];
                return n.initEvent(t, r, !0),
                l(n)
            }
        }(n),
        function(e) {
            function n(t, n, r) {
                var i = e.Event(n);
                return e(t).trigger(i, r),
                !i.isDefaultPrevented()
            }
            function r(t, e, r, i) {
                return t.global ? n(e || b, r, i) : void 0
            }
            function i(t) {
                t.global && 0 === e.active++ && r(t, null, "ajaxStart")
            }
            function o(t) {
                t.global && !--e.active && r(t, null, "ajaxStop")
            }
            function a(t, e) {
                var n = e.context;
                return e.beforeSend.call(n, t, e) === !1 || r(e, n, "ajaxBeforeSend", [t, e]) === !1 ? !1 : void r(e, n, "ajaxSend", [t, e])
            }
            function s(t, e, n, i) {
                var o = n.context
                  , a = "success";
                n.success.call(o, t, a, e),
                i && i.resolveWith(o, [t, a, e]),
                r(n, o, "ajaxSuccess", [e, n, t]),
                c(a, e, n)
            }
            function u(t, e, n, i, o) {
                var a = i.context;
                i.error.call(a, n, e, t),
                o && o.rejectWith(a, [n, e, t]),
                r(i, a, "ajaxError", [n, i, t || e]),
                c(e, n, i)
            }
            function c(t, e, n) {
                var i = n.context;
                n.complete.call(i, e, t),
                r(n, i, "ajaxComplete", [e, n]),
                o(n)
            }
            function l(t, e, n) {
                if (n.dataFilter == f)
                    return t;
                var r = n.context;
                return n.dataFilter.call(r, t, e)
            }
            function f() {}
            function h(t) {
                return t && (t = t.split(";", 2)[0]),
                t && (t == w ? "html" : t == S ? "json" : j.test(t) ? "script" : T.test(t) && "xml") || "text"
            }
            function p(t, e) {
                return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?")
            }
            function d(t) {
                t.processData && t.data && "string" != e.type(t.data) && (t.data = e.param(t.data, t.traditional)),
                !t.data || t.type && "GET" != t.type.toUpperCase() && "jsonp" != t.dataType || (t.url = p(t.url, t.data),
                t.data = void 0)
            }
            function m(t, n, r, i) {
                return e.isFunction(n) && (i = r,
                r = n,
                n = void 0),
                e.isFunction(r) || (i = r,
                r = void 0),
                {
                    url: t,
                    data: n,
                    success: r,
                    dataType: i
                }
            }
            function g(t, n, r, i) {
                var o, a = e.isArray(n), s = e.isPlainObject(n);
                e.each(n, function(n, u) {
                    o = e.type(u),
                    i && (n = r ? i : i + "[" + (s || "object" == o || "array" == o ? n : "") + "]"),
                    !i && a ? t.add(u.name, u.value) : "array" == o || !r && "object" == o ? g(t, u, r, n) : t.add(n, u)
                })
            }
            var v, y, x = +new Date, b = t.document, E = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, j = /^(?:text|application)\/javascript/i, T = /^(?:text|application)\/xml/i, S = "application/json", w = "text/html", C = /^\s*$/, N = b.createElement("a");
            N.href = t.location.href,
            e.active = 0,
            e.ajaxJSONP = function(n, r) {
                if (!("type"in n))
                    return e.ajax(n);
                var i, o, c = n.jsonpCallback, l = (e.isFunction(c) ? c() : c) || "Zepto" + x++, f = b.createElement("script"), h = t[l], p = function(t) {
                    e(f).triggerHandler("error", t || "abort")
                }, d = {
                    abort: p
                };
                return r && r.promise(d),
                e(f).on("load error", function(a, c) {
                    clearTimeout(o),
                    e(f).off().remove(),
                    "error" != a.type && i ? s(i[0], d, n, r) : u(null, c || "error", d, n, r),
                    t[l] = h,
                    i && e.isFunction(h) && h(i[0]),
                    h = i = void 0
                }),
                a(d, n) === !1 ? (p("abort"),
                d) : (t[l] = function() {
                    i = arguments
                }
                ,
                f.src = n.url.replace(/\?(.+)=\?/, "?$1=" + l),
                b.head.appendChild(f),
                n.timeout > 0 && (o = setTimeout(function() {
                    p("timeout")
                }, n.timeout)),
                d)
            }
            ,
            e.ajaxSettings = {
                type: "GET",
                beforeSend: f,
                success: f,
                error: f,
                complete: f,
                context: null,
                global: !0,
                xhr: function() {
                    return new t.XMLHttpRequest
                },
                accepts: {
                    script: "text/javascript, application/javascript, application/x-javascript",
                    json: S,
                    xml: "application/xml, text/xml",
                    html: w,
                    text: "text/plain"
                },
                crossDomain: !1,
                timeout: 0,
                processData: !0,
                cache: !0,
                dataFilter: f
            },
            e.ajax = function(n) {
                var r, o, c = e.extend({}, n || {}), m = e.Deferred && e.Deferred();
                for (v in e.ajaxSettings)
                    void 0 === c[v] && (c[v] = e.ajaxSettings[v]);
                i(c),
                c.crossDomain || (r = b.createElement("a"),
                r.href = c.url,
                r.href = r.href,
                c.crossDomain = N.protocol + "//" + N.host != r.protocol + "//" + r.host),
                c.url || (c.url = t.location.toString()),
                (o = c.url.indexOf("#")) > -1 && (c.url = c.url.slice(0, o)),
                d(c);
                var g = c.dataType
                  , x = /\?.+=\?/.test(c.url);
                if (x && (g = "jsonp"),
                c.cache !== !1 && (n && n.cache === !0 || "script" != g && "jsonp" != g) || (c.url = p(c.url, "_=" + Date.now())),
                "jsonp" == g)
                    return x || (c.url = p(c.url, c.jsonp ? c.jsonp + "=?" : c.jsonp === !1 ? "" : "callback=?")),
                    e.ajaxJSONP(c, m);
                var E, j = c.accepts[g], T = {}, S = function(t, e) {
                    T[t.toLowerCase()] = [t, e]
                }, w = /^([\w-]+:)\/\//.test(c.url) ? RegExp.$1 : t.location.protocol, O = c.xhr(), P = O.setRequestHeader;
                if (m && m.promise(O),
                c.crossDomain || S("X-Requested-With", "XMLHttpRequest"),
                S("Accept", j || "*/*"),
                (j = c.mimeType || j) && (j.indexOf(",") > -1 && (j = j.split(",", 2)[0]),
                O.overrideMimeType && O.overrideMimeType(j)),
                (c.contentType || c.contentType !== !1 && c.data && "GET" != c.type.toUpperCase()) && S("Content-Type", c.contentType || "application/x-www-form-urlencoded"),
                c.headers)
                    for (y in c.headers)
                        S(y, c.headers[y]);
                if (O.setRequestHeader = S,
                O.onreadystatechange = function() {
                    if (4 == O.readyState) {
                        O.onreadystatechange = f,
                        clearTimeout(E);
                        var t, n = !1;
                        if (O.status >= 200 && O.status < 300 || 304 == O.status || 0 == O.status && "file:" == w) {
                            if (g = g || h(c.mimeType || O.getResponseHeader("content-type")),
                            "arraybuffer" == O.responseType || "blob" == O.responseType)
                                t = O.response;
                            else {
                                t = O.responseText;
                                try {
                                    t = l(t, g, c),
                                    "script" == g ? (1,
                                    eval)(t) : "xml" == g ? t = O.responseXML : "json" == g && (t = C.test(t) ? null : e.parseJSON(t))
                                } catch (r) {
                                    n = r
                                }
                                if (n)
                                    return u(n, "parsererror", O, c, m)
                            }
                            s(t, O, c, m)
                        } else
                            u(O.statusText || null, O.status ? "error" : "abort", O, c, m)
                    }
                }
                ,
                a(O, c) === !1)
                    return O.abort(),
                    u(null, "abort", O, c, m),
                    O;
                var A = "async"in c ? c.async : !0;
                if (O.open(c.type, c.url, A, c.username, c.password),
                c.xhrFields)
                    for (y in c.xhrFields)
                        O[y] = c.xhrFields[y];
                for (y in T)
                    P.apply(O, T[y]);
                return c.timeout > 0 && (E = setTimeout(function() {
                    O.onreadystatechange = f,
                    O.abort(),
                    u(null, "timeout", O, c, m)
                }, c.timeout)),
                O.send(c.data ? c.data : null),
                O
            }
            ,
            e.get = function() {
                return e.ajax(m.apply(null, arguments))
            }
            ,
            e.post = function() {
                var t = m.apply(null, arguments);
                return t.type = "POST",
                e.ajax(t)
            }
            ,
            e.getJSON = function() {
                var t = m.apply(null, arguments);
                return t.dataType = "json",
                e.ajax(t)
            }
            ,
            e.fn.load = function(t, n, r) {
                if (!this.length)
                    return this;
                var i, o = this, a = t.split(/\s/), s = m(t, n, r), u = s.success;
                return a.length > 1 && (s.url = a[0],
                i = a[1]),
                s.success = function(t) {
                    o.html(i ? e("<div>").html(t.replace(E, "")).find(i) : t),
                    u && u.apply(o, arguments)
                }
                ,
                e.ajax(s),
                this
            }
            ;
            var O = encodeURIComponent;
            e.param = function(t, n) {
                var r = [];
                return r.add = function(t, n) {
                    e.isFunction(n) && (n = n()),
                    null == n && (n = ""),
                    this.push(O(t) + "=" + O(n))
                }
                ,
                g(r, t, n),
                r.join("&").replace(/%20/g, "+")
            }
        }(n),
        function(t) {
            t.fn.serializeArray = function() {
                var e, n, r = [], i = function(t) {
                    return t.forEach ? t.forEach(i) : void r.push({
                        name: e,
                        value: t
                    })
                };
                return this[0] && t.each(this[0].elements, function(r, o) {
                    n = o.type,
                    e = o.name,
                    e && "fieldset" != o.nodeName.toLowerCase() && !o.disabled && "submit" != n && "reset" != n && "button" != n && "file" != n && ("radio" != n && "checkbox" != n || o.checked) && i(t(o).val())
                }),
                r
            }
            ,
            t.fn.serialize = function() {
                var t = [];
                return this.serializeArray().forEach(function(e) {
                    t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value))
                }),
                t.join("&")
            }
            ,
            t.fn.submit = function(e) {
                if (0 in arguments)
                    this.bind("submit", e);
                else if (this.length) {
                    var n = t.Event("submit");
                    this.eq(0).trigger(n),
                    n.isDefaultPrevented() || this.get(0).submit()
                }
                return this
            }
        }(n),
        function() {
            try {
                getComputedStyle(void 0)
            } catch (e) {
                var n = getComputedStyle;
                t.getComputedStyle = function(t, e) {
                    try {
                        return n(t, e)
                    } catch (r) {
                        return null
                    }
                }
            }
        }(),
        n
    })
});
;_superframeJSLoader(function(t, n) {
    function i(t, n) {
        return d.cleanObj.toString.call(t).slice(8, -1) === n
    }
    function e(t) {
        var n = r[t];
        if (n)
            return n.exports;
        throw "module " + t + " is undefined"
    }
    function o(t, n) {
        for (var i, o, u = t.split(":"), a = u.pop().split("/"), s = d; i = a.shift(); )
            "bdbox" !== i && (o = i,
            a.length && (s = s[i] = s[i] || {}));
        var c = r[t] = {
            exports: {}
        }
          , p = d.isFunction(n) ? n.apply(c, [e, c.exports, c, d]) : n;
        p && (c.exports = p),
        s[o] = c.exports
    }
    var r = {}
      , u = +new Date
      , a = (u + "").slice(-3)
      , s = navigator.userAgent
      , d = {
        isBox: / baiduboxapp\//i.test(s) && !/ (lite|info) baiduboxapp/.test(s),
        $isBox: function() {
            var t = window.navigator || {}
              , n = t.userAgent;
            return / baiduboxapp\//i.test(n) && !/ (lite|info) baiduboxapp/.test(n)
        },
        isLiteBox: / lite baiduboxapp\//i.test(s),
        $isLiteBox: function() {
            var t = window.navigator || {}
              , n = t.userAgent;
            return / lite baiduboxapp\//i.test(n)
        },
        isInfoBox: / info baiduboxapp\//i.test(s),
        $isInfoBox: function() {
            var t = window.navigator || {}
              , n = t.userAgent;
            return / info baiduboxapp\//i.test(n)
        },
        isIOS: /(iPhone|iPod|iPad)/.test(s),
        $isIOS: function() {
            var t = window.navigator || {};
            return /(iPhone|iPod|iPad)/.test(t.userAgent)
        },
        isAndroid: /(Android);?[\s\/]+([\d.]+)?/.test(s),
        $isAndroid: function() {
            var t = window.navigator || {};
            return /(Android);?[\s\/]+([\d.]+)?/.test(t.userAgent)
        },
        getId: function() {
            return a++
        },
        emptyArr: [],
        emptyFn: function() {},
        cleanObj: {},
        byId: function(t) {
            return d.isString(t) ? document.getElementById(t) : t
        },
        toArray: function(t) {
            return d.emptyArr.slice.call(t)
        },
        $: function(t, n) {
            return n = n && 1 === n.nodeType ? n : document,
            d.toArray(n.querySelectorAll(t))
        }
    };
    "Function,String,Array,Number,RegExp".replace(/[^, ]+/g, function(t) {
        d["is" + t] = function(n) {
            return i(n, t)
        }
    }),
    d.isBoolean = function(t) {
        return t === !0 || t === !1
    }
    ,
    d.isObject = function(t) {
        return "object" == typeof t
    }
    ,
    d.isUndefined = function(t) {
        return void 0 === t
    }
    ,
    d.isWindow = function(t) {
        return null != t && t == t.window
    }
    ,
    d.isPlainObject = function(t) {
        return d.isObject(t) && !d.isWindow(t) && Object.getPrototypeOf(t) == Object.prototype
    }
    ,
    n.Bdbox = d,
    n.require = e,
    d.define = n.define = o
});
;_superframeJSLoader(function(o, n) {
    {
        var t = n.Bdbox;
        n.define,
        n.require
    }
    t.define("novel:bdbox/monitor", function(o, n, t, r) {
        var i = encodeURIComponent
          , e = function(o, n) {
            o += o.indexOf("?") < 0 ? "?" : "&",
            this.url = o,
            this.options = n
        };
        e.prototype.report = function(o) {
            o = o || "";
            var n = new Image(1,1)
              , t = [];
            if (r.isObject(o)) {
                for (var e in o)
                    t.push(e + "=" + i(String(o[e])));
                o = t.join("&")
            }
            var s = "_box_mt" + r.getId();
            window[s] = n,
            n.onload = n.onerror = n.onabort = function() {
                n.onload = n.onerror = n.onabort = null,
                n = null,
                delete window[s]
            }
            ;
            var a = this.url + o;
            return r.isFunction(this.options.customHandler) && (a = this.options.customHandler(a)),
            n.src = a + "&_rnd=" + Math.floor(2147483648 * Math.random()),
            this
        }
        ,
        e.prototype.main = function(o, n) {
            return o && r.isFunction(this[o]) && this[o].apply(this, r.toArray(n || [])),
            this
        }
        ,
        t.exports = function(o, n) {
            return new e(o,n)
        }
    }, "e0b099f")
});
;_superframeJSLoader(function(e, n) {
    {
        var r = n.Bdbox;
        n.define,
        n.require
    }
    r.define("novel:bdbox/extend", function(e, n, r, i) {
        function o(e, n, r) {
            for (var i in n)
                r && (f(n[i]) || a(n[i])) ? (f(n[i]) && !f(e[i]) && (e[i] = {}),
                a(n[i]) && !a(e[i]) && (e[i] = []),
                o(e[i], n[i], r)) : c(n[i]) || (e[i] = n[i])
        }
        var f = i.isPlainObject
          , a = i.isArray
          , t = i.isBoolean
          , c = i.isUndefined;
        r.exports = function(e) {
            var n, r = i.emptyArr.slice.call(arguments, 1);
            return t(e) && (n = e,
            e = r.shift()),
            r.forEach(function(r) {
                o(e, r, n)
            }),
            e
        }
    }, "3e0bfc3")
});
;_superframeJSLoader(function(e, r) {
    {
        var n = r.Bdbox;
        r.define,
        r.require
    }
    n.define("novel:bdbox/clone", function(e, r, n) {
        var o = Object.prototype.toString
          , t = function(e, r, n) {
            var o = 0;
            for (var t in e)
                if (e.hasOwnProperty(t))
                    if (n)
                        r[t] = e[t];
                    else if (r(t, e[t], o++))
                        break
        }
          , a = function(e) {
            var r;
            switch (o.call(e)) {
            case "[object Object]":
                r = {},
                t(e, function(e, n) {
                    r[e] = a(n)
                });
                break;
            case "[object Array]":
                r = [],
                e.forEach(function(e) {
                    r.push(a(e))
                });
                break;
            default:
                r = e
            }
            return r
        };
        n.exports = a
    }, "b77ce95")
});
;_superframeJSLoader(function(e, n) {
    {
        var o = n.Bdbox;
        n.define,
        n.require
    }
    o.define("novel:bdbox/utils/queryToJson", function(e, n, o) {
        o.exports = function(e) {
            var n = e.split("?")
              , o = n[1] ? n[1] : n[0]
              , r = o.split("&")
              , t = {};
            return r.forEach(function(e) {
                if (e = e.split("="),
                e[0].length > 0) {
                    var n = "";
                    try {
                        n = decodeURIComponent(e[1]) || ""
                    } catch (o) {}
                    t[e[0]] = n
                }
            }),
            t
        }
    }, "0f07018")
});
;_superframeJSLoader(function(e, r) {
    {
        var n = r.Bdbox;
        r.define,
        r.require
    }
    n.define("novel:bdbox/utils/jsonToQuery", function(e, r, n, i) {
        n.exports = function(e) {
            if (i.isString(e))
                return e;
            var r = [];
            for (var n in e)
                r.push(n + "=" + e[n]);
            return r.join("&")
        }
    }, "e1c1e55")
});
;_superframeJSLoader(function(e, t) {
    {
        var n = t.Bdbox;
        t.define,
        t.require
    }
    n.define("novel:bdbox/io/loadJS", function(e, t, n, o) {
        function r(e, t, n) {
            var r, d, i, c = document.createElement("script");
            o.isString(e) ? (r = e,
            o.isFunction(t) && (n = t,
            t = null)) : (r = e.url,
            t = e.data,
            n = e.success,
            d = e.error || o.emptyFn,
            i = e.timeout),
            o.isObject(t) && (t = u(t)),
            t && (r += (-1 === r.indexOf("?") ? "?" : "&") + t),
            r = r.replace(/[&?]{1,2}/, "?");
            var l;
            /=\?/.test(r) && (l = "_box_jsonp" + o.getId(),
            r = r.replace(/=\?/, "=" + l));
            var s = a();
            i = i || 2e4,
            c.type = "text/javascript",
            c.src = r;
            var m, p = !0, f = function() {
                l && delete window[l],
                m && clearTimeout(m),
                c.onload = c.onreadystatechange = c.onerror = null,
                c = null
            }, y = function() {
                !c || c.readyState && !/loaded|complete/.test(c.readyState) || (f(),
                p && o.isFunction(n) && n.apply(null, o.toArray(arguments)),
                p = !1)
            }, v = function(e) {
                f(),
                p && d(e),
                p = !1
            };
            l && (window[l] = y),
            m = setTimeout(function() {
                f(),
                p && d("timeout"),
                p = !1
            }, i),
            c.onload = c.onreadystatechange = c.onerror = y,
            c.onerror = v,
            s.appendChild(c)
        }
        function a() {
            return document.head || document.getElementsByTagName("head")[0] || document.documentElement
        }
        {
            var u = e("novel:bdbox/utils/jsonToQuery");
            o.emptyFn
        }
        n.exports = r
    }, "67642c7")
});
;_superframeJSLoader(function(r, e) {
    {
        var n = e.Bdbox;
        e.define,
        e.require
    }
    n.define("novel:bdbox/utils/each", function(r, e, n, i) {
        n.exports = function(r, e, n) {
            if (i.isArray(r)) {
                for (var a = 0; a < r.length; a++)
                    if (e.call(n || r[a], r[a], a) === !1)
                        return r
            } else
                for (var f in r)
                    if (e.call(n || r[f], r[f], f) === !1)
                        return r;
            return r
        }
    }, "7a15a03")
});
;_superframeJSLoader(function(e, n) {
    {
        var i = n.Bdbox;
        n.define,
        n.require
    }
    i.define("novel:bdbox/utils/getVersion", function(e, n, i) {
        var r = function() {
            var e = 0;
            if (window.baiduboxapp_version)
                e = window.baiduboxapp_version;
            else {
                var n, i = navigator.userAgent;
                (n = /([\d+.]+)_(?:diordna|enohpi)_/.exec(i)) ? (n = n[1].split("."),
                e = n.reverse().join(".")) : (n = /baiduboxapp\/([\d+.]+)/.exec(i)) && (e = n[1])
            }
            return r = function() {
                return e
            }
            ,
            e
        };
        i.exports = r
    }, "a854eb7")
});
;_superframeJSLoader(function(e, r) {
    {
        var n = r.Bdbox;
        r.define,
        r.require
    }
    n.define("novel:bdbox/utils/getLiteVersion", function(e, r, n, i) {
        var o = function() {
            var e = 0;
            if (i.$isLiteBox()) {
                var r, n = navigator.userAgent;
                (r = /baiduboxapp\/([\d+.]+)/.exec(n)) && (e = r[1])
            }
            return o = function() {
                return e
            }
            ,
            e
        };
        n.exports = o
    }, "d3f59df")
});
;_superframeJSLoader(function(e, r) {
    {
        var n = r.Bdbox;
        r.define,
        r.require
    }
    n.define("novel:bdbox/utils/version_compare", function(e, r, n) {
        var t = function(e, r) {
            r += "",
            e += "";
            for (var n = e.split("."), t = r.split("."), a = 0, i = Math.max(n.length, t.length); i > a; a++) {
                if (n[a] && !t[a] && parseInt(n[a]) > 0 || parseInt(n[a]) > parseInt(t[a]))
                    return 1;
                if (t[a] && !n[a] && parseInt(t[a]) > 0 || parseInt(n[a]) < parseInt(t[a]))
                    return -1
            }
            return 0
        };
        n.exports = t
    }, "6d13079")
});
;_superframeJSLoader(function(e, i) {
    {
        var n = i.Bdbox;
        i.define,
        i.require
    }
    n.define("novel:bdbox/utils/detect", function(e, i, n, o) {
        function r(e) {
            var i = {
                name: "unknown",
                version: 0
            };
            this === window || this.os || (this.os = i),
            e = e || navigator.userAgent;
            var n = {
                Weibo: /weibo/i,
                Wechat: /micromessenger\//i,
                QQ: /QQ\//
            };
            for (var o in n)
                n.hasOwnProperty(o) && (i["is" + o] = n[o].test(e));
            i.isUC = e.match(/UC/) || window.ucweb || window.ucbrowser;
            var r = e.match(/Windows Phone ([\d.]+)/);
            if (r)
                return i.win10 = !0,
                i.version = r[1],
                i.name = "win10",
                i;
            var a = e.match(/(Android);?\s+([\d.]+)?/);
            if (a)
                return i.android = !0,
                i.version = a[2],
                i.name = "android",
                i;
            var s = e.match(/(iPad).*OS\s([\d_]+)/)
              , d = e.match(/(iPod)(.*OS\s([\d_]+))?/)
              , t = !s && e.match(/(iPhone\sOS)\s([\d_]+)/);
            return t && !d ? (i.ios = i.iphone = !0,
            i.version = t[2].replace(/_/g, "."),
            i.name = "ios",
            i) : s ? (i.ios = i.ipad = !0,
            i.name = "ios",
            i.version = s[2].replace(/_/g, "."),
            i) : d ? (i.name = "ios",
            i.ios = i.ipod = !0,
            i.version = d[3] ? d[3].replace(/_/g, ".") : null,
            i) : i
        }
        r.apply(o),
        n.exports = r
    }, "684a745")
});
;_superframeJSLoader(function(e, n) {
    {
        var t = n.Bdbox;
        n.define,
        n.require
    }
    t.define("novel:bdbox/utils/ready", function(e, n, t) {
        function o() {
            i.forEach(function(e) {
                e()
            }),
            i.length = 0,
            a = !0
        }
        function d(e) {
            "function" == typeof e && (a ? e() : i.push(e))
        }
        var i = []
          , a = !1;
        "complete,loaded,interactive".indexOf(document.readyState) > -1 && document.body ? o() : document.addEventListener("DOMContentLoaded", o, !1),
        t.exports = d
    }, "a6d6874")
});
;_superframeJSLoader(function(a, o) {
    {
        var t = o.Bdbox;
        o.define,
        o.require
    }
    t.define("novel:bdbox/monitor/pblog", function(a, o, t, e) {
        function n(a) {
            if (i)
                return i;
            var o = c(location.search);
            if (o.data)
                try {
                    i = JSON.parse(decodeURIComponent(o.data)).fromaction
                } catch (t) {}
            else
                o.from && (i = o.from);
            return i || a || "wise"
        }
        var i, r = a("novel:bdbox/monitor"), d = a("novel:bdbox/extend"), c = a("novel:bdbox/utils/queryToJson"), u = a("novel:bdbox/utils/getVersion"), f = a("novel:bdbox/clone"), v = c(location.search), m = navigator.userAgent, s = "https://m.baidu.com/tcbox", b = {
            service: "bdbox",
            action: "pblog",
            ctv: 2,
            cen: "uid_ua_ut",
            data: {
                appid: "1",
                dataid: "2",
                actiontype: "1",
                actionid: "2",
                actiondata: {
                    ref: v.ref || "",
                    gmv: v.vmgdb || "",
                    source: v.from || v.ref || "",
                    value: n(),
                    boxVersion: u(),
                    boxPlatform: m.match(/(iPad|iPhone|iPod)/gim) ? "ios" : "android"
                }
            }
        }, l = encodeURIComponent;
        if (v.uid && v.osname) {
            ["osname", "ua", "ut", "from", "cfrom", "uid", "pkgname"].forEach(function(a) {
                v[a] && (b[a] = v[a])
            })
        }
        var p, g = r(s, {
            customHandler: function(a) {
                var o = [];
                if (p)
                    for (var t in p)
                        if (p.hasOwnProperty(t)) {
                            var n = p[t];
                            e.isPlainObject(n) && (n = JSON.stringify(n)),
                            o.push(t + "=" + l(n))
                        }
                return o.length && (a += o.join("&")),
                a
            }
        });
        g.init = function(a, o) {
            e.isPlainObject(o) && (b = d(b, o)),
            b.data.cateid = a
        }
        ,
        g.pv = function(a, o) {
            p = f(b);
            var t = p.data;
            t.actionid = "1";
            var e = {};
            return e.url = a || location.href,
            o && (e.u = o),
            t.actiondata = d(t.actiondata, e),
            g.report()
        }
        ,
        g.event = function(a, o, t, n) {
            if (!a)
                throw "monitor.tc.event need a evtName";
            if (e.isPlainObject(o) && !t) {
                var i = {
                    evtName: a
                };
                for (var r in o)
                    i[r] = o[r]
            } else
                var i = {
                    evtName: a,
                    evtType: o || "",
                    evtTag: t || ""
                };
            p = f(b);
            var c = p.data;
            return c.actionid = "2",
            n && (p.data.cateid = n),
            c.actiondata = d(c.actiondata, i),
            g.report()
        }
        ,
        t.exports = function() {
            g.main.apply(g, arguments)
        }
    }, "41db924")
});
;_superframeJSLoader(function(e, n) {
    {
        var r = n.Bdbox;
        n.define,
        n.require
    }
    r.define("novel:bdbox/monitor/hm", function(e, n, r) {
        var o = e("novel:bdbox/monitor")
          , t = "https://hm.baidu.com/hm.gif"
          , i = ""
          , u = function(e) {
            return e.replace ? e.replace(/'/g, "'0").replace(/\*/g, "'1").replace(/!/g, "'2") : e
        }
          , p = encodeURIComponent
          , a = o(t, {
            customHandler: function(e) {
                return e + "&si=" + i + "&nv=0&st=4&v=pixel-1.0"
            }
        });
        a.init = function(e) {
            return i = e,
            a.pv()
        }
        ,
        a.pv = function(e, n) {
            var r = ["u=" + p(e || location.href), "et=0"];
            return n && r.push("su=" + p(n)),
            a.report(r.join("&"))
        }
        ,
        a.event = function(e, n, r, o) {
            var t = [u(e), u(n)];
            return r && t.push(u(r)),
            o && t.push(u(o)),
            a.report("ep=" + p(t.join("*")) + "&et=4")
        }
        ,
        r.exports = function() {
            a.main.apply(a, arguments)
        }
    }, "5f85519")
});
;_superframeJSLoader(function(e, t) {
    {
        var n = t.Bdbox;
        t.define,
        t.require
    }
    n.define("novel:bdbox/schema", function(e, t, n, o) {
        function i(e, t) {
            if (!e)
                return void t(!0);
            if (t = t || o.emptyFn,
            !o.isBox && o.isIOS && r(l.version, "9.0") >= 0)
                return void d(function() {
                    s(e, t)
                });
            var n = Date.now()
              , i = document.createElement("IFRAME");
            i.src = e,
            i.style.position = "absolute",
            i.style.left = "-2000px",
            i.style.top = "-1000px",
            i.style.width = "1px",
            i.style.height = "1px",
            i.style.webkitTransition = "all 0.9s",
            i.style.transition = "all 0.9s",
            document.body.appendChild(i);
            var a = function() {
                document.body.removeChild(i),
                t(Date.now() - n < 1500 ? !0 : !1)
            };
            i.addEventListener("webkitTransitionEnd", a, !1),
            i.addEventListener("transitionEnd", a, !1),
            setTimeout(function() {
                i.style.left = "-1000px"
            }, 20)
        }
        function s(e, t) {
            location.href = e,
            a && clearTimeout(a),
            a = setTimeout(function() {
                t(!0)
            }, 3e3)
        }
        var l = e("novel:bdbox/utils/detect")()
          , r = e("novel:bdbox/utils/version_compare")
          , d = e("novel:bdbox/utils/ready")
          , a = null;
        n.exports = i
    }, "8328b8f")
});
;_superframeJSLoader(function(t, e) {
    {
        var n = e.Bdbox;
        e.define,
        e.require
    }
    n.define("novel:bdbox/moplus", function(t, e, n, i) {
        var r = (t("novel:bdbox/utils/jsonToQuery"),
        t("novel:bdbox/io/loadJS"),
        t("novel:bdbox/utils/version_compare"),
        t("novel:bdbox/monitor/pblog"))
          , o = t("novel:bdbox/schema")
          , s = "com.baidu.searchbox"
          , u = "http://127.0.0.1:6259/"
          , c = "http://127.0.0.1:40310/"
          , a = "inapp_boxserver"
          , h = "https:" === location.protocol
          , f = {
            isSendPv: !1,
            isHit: !1,
            parseUA: function() {
                var t, e, n = navigator.userAgent, i = {
                    uc: /UCBrowser\/(\S*) \S*/g,
                    bd: /baidubrowser\/(\S*) \(Baidu/g,
                    qq: /MQQBrowser\/(\S*) Mobile/g,
                    chr: /Chrome\/(\S*) Mobile/g,
                    qh: /360 Aphone Browser \((\S*)\)/g,
                    sg: /SogouMobileBrowser\/(\S*)/g,
                    mi: /MiuiBrowser\/(\S*)/g
                };
                for (var r in i) {
                    var o = i[r].exec(n);
                    if (o) {
                        t = r,
                        e = o[1];
                        break
                    }
                }
                return t = t ? t : "other",
                e = e ? e : "0",
                {
                    t: t,
                    v: e
                }
            },
            parseHost: function() {
                return m.curHost === c ? 1 : 0
            },
            sendEvt: function(t, e, n, i) {
                this.isHit && this.send(t, e, n, i)
            },
            send: function(t, e, n, i) {
                var o = this.parseUA()
                  , s = o.t
                  , u = o.v
                  , c = h ? 0 : 1
                  , a = this.parseHost();
                r("event", [t, {
                    evtType: e || "",
                    brName: s,
                    brVer: u,
                    isHttp: c,
                    isNew: a,
                    source: n || "",
                    intent: i || ""
                }])
            },
            init: function() {
                this.isHit = Date.now() % 100 === 1,
                r("init", [2])
            }
        }
          , m = function(t, e, n) {
            this.version = "2.0",
            this.isHttps = h,
            this.curHost = n || "",
            this.newHost = c,
            this.oldHost = this.isHttps ? c : u,
            this.MCMDF = e || a,
            this._infoFuncs = [],
            this._verFuncs = [],
            this.minVersion = t ? t : 0,
            this.pkgName = s,
            f.init()
        };
        m.prototype = {
            constructor: m,
            setMcmdf: function(t) {
                return this.MCMDF = t,
                this
            },
            setHost: function() {
                return this
            },
            getHost: function() {},
            api: function(t, e, n) {
                return n({
                    error: 233
                }),
                this
            },
            getInfo: function(t) {
                return t({
                    error: 233
                }),
                this
            },
            getHVersion: function(t) {
                return t({
                    error: 233
                }),
                this
            },
            parseInfo: function() {
                return !1
            },
            schema: function(t, e) {
                if (!t.intent)
                    throw "schema intent is empty";
                t.mcmdf || (t.mcmdf = this.MCMDF);
                var n = function() {
                    f.sendEvt("schema", "success", t.source, t.intent),
                    i.isFunction(e) && e({
                        error: 0,
                        from: "schema"
                    })
                }
                  , r = function() {
                    f.sendEvt("schema", "fail", t.source, t.intent),
                    i.isFunction(e) && e({
                        error: 20,
                        from: "schema"
                    })
                }
                  , u = t.schema || "";
                if (t.intent && !t.schema) {
                    var c = t.intent;
                    -1 == c.indexOf(s) && (f.sendEvt("defaultPKGName", "fail", t.source || "", t.intent),
                    t.minver = t.minver ? t.minver : "6.9.1")
                }
                u || (u = "baiduboxapp://utils?action=sendIntent&params=" + encodeURIComponent(JSON.stringify(t)) + "&minver=" + (t.minver ? t.minver : "6.9")),
                o(u, function(t) {
                    t ? r() : n()
                })
            },
            sendIntent: function(t, e) {
                return e({
                    error: 233
                }),
                this
            },
            request: function(t, e) {
                return e({
                    error: 233
                }),
                this
            }
        },
        n.exports = function(t, e) {
            return new m(t,e)
        }
        ,
        n.exports.Moplus = m
    }, "19d2ee7")
});
;_superframeJSLoader(function(r, e) {
    {
        var o = e.Bdbox;
        e.define,
        e.require
    }
    o.define("novel:bdbox/android/invokeApp", function(r, e, o, n) {
        function i(r, e, o) {
            if (o && !n.isArray(o) && (o = Array.prototype.slice.call(arguments, 0).slice(2)),
            window[r] && window[r][e]) {
                var i = window[r][e].apply(window[r], o);
                return {
                    error: 0,
                    result: i,
                    __from: "js"
                }
            }
            var p = u();
            if (a(p, 4.8) >= 0) {
                var s = t(r, e, o);
                return s = s ? JSON.parse(s) : {},
                s.__from = "app",
                s
            }
            if ("4.7.1" === p || "4.7" == p) {
                var d = t(r, e, o);
                return {
                    error: 0,
                    result: d,
                    __from: "app4.7"
                }
            }
            return {
                error: 200
            }
        }
        function t(r, e, o) {
            if (!n.isBox)
                return {
                    error: 201
                };
            if (!n.isAndroid)
                return {
                    error: 202
                };
            var i = {
                obj: r,
                func: e,
                args: o ? o : []
            };
            try {
                return window.prompt("BdboxApp:" + JSON.stringify(i))
            } catch (t) {
                return {
                    error: 201
                }
            }
        }
        var a = r("novel:bdbox/utils/version_compare")
          , u = r("novel:bdbox/utils/getVersion");
        o.exports = i
    }, "289b65e")
});
;_superframeJSLoader(function(n, e) {
    {
        var d = e.Bdbox;
        e.define,
        e.require
    }
    d.define("novel:bdbox/android/command", function(n, e, d) {
        function o(n, e, d, o) {
            var r = {
                mode: n,
                intent: e
            };
            "undefined" != typeof d && (r["class"] = d),
            "undefined" != typeof o && (r.min_v = o);
            var a = i("Bdbox_android_utils", "command", [JSON.stringify(r)]);
            return a
        }
        var i = n("novel:bdbox/android/invokeApp");
        d.exports = o
    }, "17a77ab")
});
;_superframeJSLoader(function(e, n) {
    {
        var o = n.Bdbox;
        n.define,
        n.require
    }
    o.define("novel:bdbox/ios/invokeApp", function(e, n, o, i) {
        o.exports = function(e, n, o) {
            if (e && (i.isBox || i.$isLiteBox())) {
                var s = [];
                if (i.isFunction(n))
                    o = n;
                else
                    for (var t in n)
                        s.push(t + "=" + n[t]);
                if (i.isFunction(o)) {
                    var u = "_bdbox_js_" + i.getId();
                    window[u] = function() {
                        o.apply(window, [].slice.call(arguments, 0))
                    }
                    ,
                    s.push("func=" + u)
                } else
                    o && s.push("func=" + o);
                s = "baiduboxapp://" + e + "?" + s.join("&"),
                console.log(s);
                var a = document.createElement("iframe");
                a.style.display = "none",
                a.src = s;
                var d = document.body || document.getElementsByTagName("body")[0];
                d.appendChild(a),
                setTimeout(function() {
                    d.removeChild(a),
                    a = null
                }, 0)
            }
        }
    }, "e96c66f")
});
;_superframeJSLoader(function(e, r) {
    {
        var n = r.Bdbox;
        r.define,
        r.require
    }
    n.define("novel:bdbox/event/broadcast", function(e, r, n, t) {
        var a = {}
          , l = {
            fire: function(e, r) {
                var n = a[e]
                  , l = 0;
                if (!t.isUndefined(n)) {
                    var c = t.emptyArr.slice.call(arguments, 0);
                    c = c.length > 2 ? c.splice(2, c.length - 1) : [],
                    c = [r].concat(c),
                    l = n.length;
                    for (var i = 0; l > i; i++) {
                        var s = n[i];
                        s && s.callback && (c = c.concat(s.args),
                        s.callback.apply(s.scope, c))
                    }
                }
                return this
            },
            on: function(e, r, n) {
                e = e || [];
                var l = [].slice.call(arguments);
                t.isString(e) && (e = e.split(","));
                var c = e.length;
                if (0 === c)
                    return this;
                l = l.length > 3 ? l.splice(3, l.length - 1) : [];
                for (var i = 0; c > i; i++) {
                    var s = e[i];
                    a[s] = a[s] || [],
                    a[s].push({
                        callback: r,
                        scope: n,
                        args: l
                    })
                }
                return this
            },
            off: function(e, r, n) {
                var t = a[e];
                if (!t)
                    return this;
                if (r) {
                    for (var l = t.length, c = [], i = 0; l > i; i++) {
                        var s = t[i];
                        s.callback === r && s.scope === n || c.push(s)
                    }
                    t = c
                } else
                    t.length = 0;
                return this
            },
            removeAll: function() {
                return a = {},
                this
            }
        };
        n.exports = l
    }, "8bc31ae")
});
;_superframeJSLoader(function(t, e) {
    {
        var n = e.Bdbox;
        e.define,
        e.require
    }
    n.define("novel:bdbox/event/fastclick", function(t, e, n) {
        function i(t) {
            "use strict";
            var e, n = this;
            if (this.trackingClick = !1,
            this.trackingClickStart = 0,
            this.targetElement = null,
            this.touchStartX = 0,
            this.touchStartY = 0,
            this.lastTouchIdentifier = 0,
            this.touchBoundary = 10,
            this.layer = t,
            !t || !t.nodeType)
                throw new TypeError("Layer must be a document node");
            this.onClick = function() {
                return i.prototype.onClick.apply(n, arguments)
            }
            ,
            this.onMouse = function() {
                return i.prototype.onMouse.apply(n, arguments)
            }
            ,
            this.onTouchStart = function() {
                return i.prototype.onTouchStart.apply(n, arguments)
            }
            ,
            this.onTouchMove = function() {
                return i.prototype.onTouchMove.apply(n, arguments)
            }
            ,
            this.onTouchEnd = function() {
                return i.prototype.onTouchEnd.apply(n, arguments)
            }
            ,
            this.onTouchCancel = function() {
                return i.prototype.onTouchCancel.apply(n, arguments)
            }
            ,
            i.notNeeded(t) || (this.deviceIsAndroid && (t.addEventListener("mouseover", this.onMouse, !0),
            t.addEventListener("mousedown", this.onMouse, !0),
            t.addEventListener("mouseup", this.onMouse, !0)),
            t.addEventListener("click", this.onClick, !0),
            t.addEventListener("touchstart", this.onTouchStart, !1),
            t.addEventListener("touchmove", this.onTouchMove, !1),
            t.addEventListener("touchend", this.onTouchEnd, !1),
            t.addEventListener("touchcancel", this.onTouchCancel, !1),
            Event.prototype.stopImmediatePropagation || (t.removeEventListener = function(e, n, i) {
                var o = Node.prototype.removeEventListener;
                "click" === e ? o.call(t, e, n.hijacked || n, i) : o.call(t, e, n, i)
            }
            ,
            t.addEventListener = function(e, n, i) {
                var o = Node.prototype.addEventListener;
                "click" === e ? o.call(t, e, n.hijacked || (n.hijacked = function(t) {
                    t.propagationStopped || n(t)
                }
                ), i) : o.call(t, e, n, i)
            }
            ),
            "function" == typeof t.onclick && (e = t.onclick,
            t.addEventListener("click", function(t) {
                e(t)
            }, !1),
            t.onclick = null))
        }
        i.prototype.deviceIsAndroid = navigator.userAgent.indexOf("Android") > 0,
        i.prototype.deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent),
        i.prototype.deviceIsIOS4 = i.prototype.deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent),
        i.prototype.deviceIsIOSWithBadTarget = i.prototype.deviceIsIOS && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent),
        i.prototype.needsClick = function(t) {
            "use strict";
            switch (t.nodeName.toLowerCase()) {
            case "button":
            case "select":
            case "textarea":
                if (t.disabled)
                    return !0;
                break;
            case "input":
                if (this.deviceIsIOS && "file" === t.type || t.disabled)
                    return !0;
                break;
            case "label":
            case "video":
                return !0
            }
            return /\bneedsclick\b/.test(t.className)
        }
        ,
        i.prototype.needsFocus = function(t) {
            "use strict";
            switch (t.nodeName.toLowerCase()) {
            case "textarea":
                return !0;
            case "select":
                return !this.deviceIsAndroid;
            case "input":
                switch (t.type) {
                case "button":
                case "checkbox":
                case "file":
                case "image":
                case "radio":
                case "submit":
                    return !1
                }
                return !t.disabled && !t.readOnly;
            default:
                return /\bneedsfocus\b/.test(t.className)
            }
        }
        ,
        i.prototype.sendClick = function(t, e) {
            "use strict";
            var n, i;
            document.activeElement && document.activeElement !== t && document.activeElement.blur(),
            i = e.changedTouches[0],
            n = document.createEvent("MouseEvents"),
            n.initMouseEvent(this.determineEventType(t), !0, !0, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null),
            n.forwardedTouchEvent = !0,
            t.dispatchEvent(n)
        }
        ,
        i.prototype.determineEventType = function(t) {
            "use strict";
            return this.deviceIsAndroid && "select" === t.tagName.toLowerCase() ? "mousedown" : "click"
        }
        ,
        i.prototype.focus = function(t) {
            "use strict";
            var e;
            this.deviceIsIOS && t.setSelectionRange && 0 !== t.type.indexOf("date") && "time" !== t.type ? (e = t.value.length,
            t.setSelectionRange(e, e)) : t.focus()
        }
        ,
        i.prototype.updateScrollParent = function(t) {
            "use strict";
            var e, n;
            if (e = t.fastClickScrollParent,
            !e || !e.contains(t)) {
                n = t;
                do {
                    if (n.scrollHeight > n.offsetHeight) {
                        e = n,
                        t.fastClickScrollParent = n;
                        break
                    }
                    n = n.parentElement
                } while (n)
            }
            e && (e.fastClickLastScrollTop = e.scrollTop)
        }
        ,
        i.prototype.getTargetElementFromEventTarget = function(t) {
            "use strict";
            return t.nodeType === Node.TEXT_NODE ? t.parentNode : t
        }
        ,
        i.prototype.onTouchStart = function(t) {
            "use strict";
            var e, n, i;
            if (t.targetTouches.length > 1)
                return !0;
            if (e = this.getTargetElementFromEventTarget(t.target),
            n = t.targetTouches[0],
            this.deviceIsIOS) {
                if (i = window.getSelection(),
                i.rangeCount && !i.isCollapsed)
                    return !0;
                if (!this.deviceIsIOS4) {
                    if (n.identifier === this.lastTouchIdentifier)
                        return t.preventDefault(),
                        !1;
                    this.lastTouchIdentifier = n.identifier,
                    this.updateScrollParent(e)
                }
            }
            return this.trackingClick = !0,
            this.trackingClickStart = t.timeStamp,
            this.targetElement = e,
            this.touchStartX = n.pageX,
            this.touchStartY = n.pageY,
            t.timeStamp - this.lastClickTime < 200 && t.preventDefault(),
            !0
        }
        ,
        i.prototype.touchHasMoved = function(t) {
            "use strict";
            var e = t.changedTouches[0]
              , n = this.touchBoundary;
            return Math.abs(e.pageX - this.touchStartX) > n || Math.abs(e.pageY - this.touchStartY) > n ? !0 : !1
        }
        ,
        i.prototype.onTouchMove = function(t) {
            "use strict";
            return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(t.target) || this.touchHasMoved(t)) && (this.trackingClick = !1,
            this.targetElement = null),
            !0) : !0
        }
        ,
        i.prototype.findControl = function(t) {
            "use strict";
            return void 0 !== t.control ? t.control : t.htmlFor ? document.getElementById(t.htmlFor) : t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
        }
        ,
        i.prototype.onTouchEnd = function(t) {
            "use strict";
            var e, n, i, o, r, s = this.targetElement;
            if (!this.trackingClick)
                return !0;
            if (t.timeStamp - this.lastClickTime < 200)
                return this.cancelNextClick = !0,
                !0;
            if (this.cancelNextClick = !1,
            this.lastClickTime = t.timeStamp,
            n = this.trackingClickStart,
            this.trackingClick = !1,
            this.trackingClickStart = 0,
            this.deviceIsIOSWithBadTarget && (r = t.changedTouches[0],
            s = document.elementFromPoint(r.pageX - window.pageXOffset, r.pageY - window.pageYOffset) || s,
            s.fastClickScrollParent = this.targetElement.fastClickScrollParent),
            i = s.tagName.toLowerCase(),
            "label" === i) {
                if (e = this.findControl(s)) {
                    if (this.focus(s),
                    this.deviceIsAndroid)
                        return !1;
                    s = e
                }
            } else if (this.needsFocus(s))
                return t.timeStamp - n > 100 || this.deviceIsIOS && window.top !== window && "input" === i ? (this.targetElement = null,
                !1) : (this.focus(s),
                this.deviceIsIOS4 && "select" === i || (this.targetElement = null,
                t.preventDefault()),
                !1);
            return this.deviceIsIOS && !this.deviceIsIOS4 && (o = s.fastClickScrollParent,
            o && o.fastClickLastScrollTop !== o.scrollTop) ? !0 : (this.needsClick(s) || (t.preventDefault(),
            this.sendClick(s, t)),
            !1)
        }
        ,
        i.prototype.onTouchCancel = function() {
            "use strict";
            this.trackingClick = !1,
            this.targetElement = null
        }
        ,
        i.prototype.onMouse = function(t) {
            "use strict";
            return this.targetElement ? t.forwardedTouchEvent ? !0 : t.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (t.stopImmediatePropagation ? t.stopImmediatePropagation() : t.propagationStopped = !0,
            t.stopPropagation(),
            t.preventDefault(),
            !1) : !0 : !0
        }
        ,
        i.prototype.onClick = function(t) {
            "use strict";
            var e;
            return this.trackingClick ? (this.targetElement = null,
            this.trackingClick = !1,
            !0) : "submit" === t.target.type && 0 === t.detail ? !0 : (e = this.onMouse(t),
            e || (this.targetElement = null),
            e)
        }
        ,
        i.prototype.destroy = function() {
            "use strict";
            var t = this.layer;
            this.deviceIsAndroid && (t.removeEventListener("mouseover", this.onMouse, !0),
            t.removeEventListener("mousedown", this.onMouse, !0),
            t.removeEventListener("mouseup", this.onMouse, !0)),
            t.removeEventListener("click", this.onClick, !0),
            t.removeEventListener("touchstart", this.onTouchStart, !1),
            t.removeEventListener("touchmove", this.onTouchMove, !1),
            t.removeEventListener("touchend", this.onTouchEnd, !1),
            t.removeEventListener("touchcancel", this.onTouchCancel, !1)
        }
        ,
        i.notNeeded = function(t) {
            "use strict";
            var e, n;
            if ("undefined" == typeof window.ontouchstart)
                return !0;
            if (n = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
                if (!i.prototype.deviceIsAndroid)
                    return !0;
                if (e = document.querySelector("meta[name=viewport]")) {
                    if (-1 !== e.content.indexOf("user-scalable=no"))
                        return !0;
                    if (n > 31 && window.innerWidth <= window.screen.width)
                        return !0
                }
            }
            return "none" === t.style.msTouchAction ? !0 : !1
        }
        ,
        i.attach = function(t) {
            "use strict";
            return new i(t)
        }
        ,
        n.exports = i.attach,
        n.exports.FastClick = i
    }, "a2ed83d")
});
;_superframeJSLoader(function(t, e) {
    {
        var r = e.Bdbox;
        e.define,
        e.require
    }
    r.define("novel:bdbox/app/store", function(t, e, r) {
        var i = {};
        "local session".replace(/\S+/g, function(t) {
            try {
                var e = t + "Storage"in window && null !== window[t + "Storage"]
                  , r = {
                    k: "box test",
                    v: "it's great"
                };
                if (e) {
                    var n = window[t + "Storage"];
                    n.setItem(r.k, r.v),
                    e = r.v === n.getItem(r.k),
                    n.removeItem(r.k)
                }
                i[t] = e ? !0 : !1
            } catch (s) {
                i[t] = !1
            }
        });
        var n = {
            data: {},
            setItem: function(t, e) {
                n.data[t] = e
            },
            getItem: function(t) {
                return n.data[t]
            },
            removeItem: function(t) {
                delete n.data[t]
            }
        }
          , s = Date.now ? Date.now : function() {
            return +new Date
        }
          , o = function(t, e, r) {
            this.prefix = t || "",
            this.expire = e || 0,
            this.type = r || "session",
            this.type.length > 7 && (this.type = this.type.slice(0, -7)),
            this.storage = i[this.type] ? window[this.type + "Storage"] : n,
            this.clearExpire()
        };
        o.prototype = {
            construstor: o,
            clearExpire: function() {
                var t = this.getKeys()
                  , e = this;
                return t.forEach(function(t) {
                    e.get(t)
                }),
                this
            },
            set: function(t, e, r) {
                r = 0 | (r || this.expire);
                var i = {
                    data: e
                };
                return 0 !== r && (i.expire = s() + r),
                t = this.prefix + t,
                this.storage.setItem(t, JSON.stringify(i)),
                this
            },
            get: function(t) {
                var e = null;
                t = this.prefix + t;
                var r = this;
                try {
                    e = JSON.parse(r.storage.getItem(t));
                    var i = s();
                    "expire"in e && e.expire <= i ? (e = null,
                    r.storage.removeItem(t)) : e = e.data
                } catch (n) {
                    e = null
                }
                return e
            },
            clear: function() {
                var t = this.getKeys()
                  , e = this;
                return t.forEach(function(t) {
                    e.remove(t)
                }),
                this
            },
            remove: function(t) {
                return this.storage.removeItem(this.prefix + t),
                this
            },
            getKeys: function() {
                var t = []
                  , e = this.storage
                  , r = new RegExp("^" + this.prefix);
                for (var i in e)
                    e.hasOwnProperty(i) && r.test(i) && t.push(i);
                return t
            },
            getAll: function() {
                var t, e = {}, r = this.storage, i = new RegExp("^" + this.prefix);
                for (var n in r)
                    r.hasOwnProperty(n) && i.test(n) && (t = this.get(n),
                    t && (e[n] = t));
                return t
            }
        },
        r.exports = function(t, e, r) {
            return new o(t,e,r)
        }
    }, "2e59863")
});
;_superframeJSLoader(function(o, n) {
    {
        var e = n.Bdbox;
        n.define,
        n.require
    }
    e.define("novel:bdbox/client/login", function(o, n, e, i) {
        var l = o("novel:bdbox/utils/getVersion")
          , a = o("novel:bdbox/utils/version_compare")
          , r = "Bdbox_android_account"
          , t = o("novel:bdbox/ios/invokeApp")
          , c = o("novel:bdbox/android/invokeApp")
          , p = function(o) {
            var n, e = {
                callback: "",
                url: location.href,
                tpl: "",
                login_type: "",
                third_login: "0"
            };
            for (n in e)
                o.hasOwnProperty(n) || (o[n] = e[n]);
            if (a(l(), "5.5") >= 0)
                i.isIOS ? (o.func = o.callback,
                delete o.callback,
                o = JSON.stringify(o),
                t("account", {
                    action: "logindialog",
                    params: encodeURIComponent(o),
                    minver: "5.5.0.0"
                })) : c(r, "loginDialog", [JSON.stringify(o), o.callback]);
            else {
                var p = "http://wappass.baidu.com/?adapter=1&regLink=1";
                "sms" === o.login_type && (p += "&sms=1"),
                o.subpro && (p += "&subpro=" + o.subpro),
                "" != o.tpl && (p += "&tpl=" + o.tpl),
                window.location.href = p + "&u=" + encodeURIComponent(o.url)
            }
        };
        e.exports = p
    }, "fd81080")
});
;_superframeJSLoader(function(e, o) {
    {
        var i = o.Bdbox;
        o.define,
        o.require
    }
    i.define("novel:bdbox/client/getNewCuid", function(e, o, n, r) {
        var t = e("novel:bdbox/utils/getVersion")
          , d = e("novel:bdbox/utils/version_compare")
          , u = "Bdbox_android_utils"
          , s = e("novel:bdbox/android/invokeApp")
          , a = function(e) {
            if (!r.isIOS) {
                if (d(t(), "6.5") >= 0)
                    return s(u, "getcuid").result;
                var o = document.cookie.match(/BAIDUCUID=(.+?);/);
                return o ? o[1] : ""
            }
            i.ios.invokeApp("utils", {
                action: "getCUID"
            }, e)
        };
        n.exports = a
    }, "1735d06")
});
;_superframeJSLoader(function(vw, page) {
    var Bdbox = page.Bdbox
      , define = page.define
      , require = page.require;
    !function(root, virtualWindow) {
        function loadJs(e, t, n) {
            if (t && loadedRes[e])
                return void (n && n());
            if (t && loadingRes[e])
                return void loadingRes[e].push(n);
            loadingRes[e] = loadingRes[e] || [];
            var a = d.createElement("script")
              , i = !1
              , o = function() {
                if (!i) {
                    if (i = !0,
                    loadedRes[e] = !0,
                    t) {
                        for (var a = 0; a < loadingRes[e].length; a++)
                            loadingRes[e][a] && loadingRes[e][a]();
                        loadingRes[e] = null
                    }
                    n && n()
                }
            };
            a.setAttribute("src", e),
            a.setAttribute("type", "text/javascript"),
            a.onload = a.onerror = o,
            a.onreadystatechange = function() {
                /loaded|complete/.test(a.readyState) && o()
            }
            ,
            vw.head.appendChild(a)
        }
        function loadCss(e, t, n) {
            function a() {
                if (loadedRes[e] = !0,
                t) {
                    for (var a = 0; a < loadingRes[e].length; a++)
                        loadingRes[e][a] && loadingRes[e][a]();
                    loadingRes[e] = null
                }
                n()
            }
            if (t && loadedRes[e])
                return void (n && n());
            if (t && loadingRes[e])
                return void loadingRes[e].push(n);
            loadingRes[e] = loadingRes[e] || [];
            var i = d.createElement("link");
            i.type = "text/css",
            i.rel = "stylesheet",
            i.href = e,
            "msie" === browser ? i.onreadystatechange = function() {
                /loaded|complete/.test(i.readyState) && a()
            }
            : "opera" === browser ? i.onload = a : !function() {
                try {
                    i.sheet.cssRule
                } catch (e) {
                    return void setTimeout(arguments.callee, 20)
                }
                a()
            }(),
            vw.head.appendChild(i)
        }
        function globalEval(code) {
            var script;
            code && (code = code.replace(/^\s+/, "").replace(/\s+$/, ""),
            1 === code.indexOf("use strict") ? (script = document.createElement("script"),
            script.text = code,
            vw.head.appendChild(script).parentNode.removeChild(script)) : eval(code))
        }
        function saveLoadedRes() {
            function e(e) {
                e && (loadedRes[e] = !0,
                0 === e.indexOf(t) && (loadedRes[e.replace(t, "")] = !0))
            }
            for (var t = window.location.protocol + "//" + window.location.host, n = vw.head.getElementsByTagName("script"), a = vw.head.getElementsByTagName("link"), i = 0; i < n.length; i++)
                e(n[i].src);
            for (var o = 0; o < a.length; o++)
                e(a[o].href)
        }
        function appendStyle(e) {
            var t = document.createElement("style");
            t.innerHTML = e,
            vw.head.appendChild(t)
        }
        function ajax(e, t, n) {
            var a = new (window.XMLHttpRequest || ActiveXObject)("Microsoft.XMLHTTP");
            a.onreadystatechange = function() {
                4 === this.readyState && (200 !== this.status ? t(this.responseText) : t(null, this.responseText))
            }
            ,
            a.open(n ? "POST" : "GET", e + "&t=" + (new Date).getTime(), !0),
            n && a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
            a.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
            a.send(n)
        }
        function mixin(e, t) {
            if (e && t)
                for (var n in t)
                    t.hasOwnProperty(n) && (e[n] = t[n]);
            return e
        }
        var d = document
          , loadedRes = {}
          , loadingRes = {};
        virtualWindow.on("detach", function() {
            loadingRes = {},
            loadedRes = {}
        });
        var browser = function() {
            var e = navigator.userAgent.toLowerCase()
              , t = /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || !/compatible/.test(e) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(e) || [];
            return t[1]
        }()
          , Util = {
            loadJs: loadJs,
            loadCss: loadCss,
            appendStyle: appendStyle,
            globalEval: globalEval,
            saveLoadedRes: saveLoadedRes,
            ajax: ajax,
            mixin: mixin
        };
        root.BigPipeUtil = Util
    }(page, vw),
    function(e) {
        function t(e, t, a) {
            var i = [];
            return n(e, function(e) {
                !e || t && e.e !== t || a && e.cb !== a && e.cb._cb !== a || i.push(e)
            }),
            i
        }
        function n(e, t) {
            for (var n, a = 0, i = e.length; i > a; a++)
                n = e[a],
                t.call(n, n, a)
        }
        function a(e, t) {
            for (var n, a = -1, i = e.length; ++a < i && (n = e[a],
            n.cb.apply(n.ctx, t) !== !1); )
                ;
        }
        var i, o = e.BigPipeUtil, r = [].slice;
        i = {
            on: function(e, t) {
                var n;
                return n = this._events || (this._events = []),
                n.push({
                    e: e,
                    cb: t,
                    id: n.length,
                    ctx: this
                }),
                this
            },
            once: function(e, t) {
                var n, a = this;
                return n = function() {
                    return a.off(e, n),
                    t.apply(a, arguments)
                }
                ,
                n._cb = t,
                a.on(e, n)
            },
            off: function(e, a) {
                var i = this._events;
                return e || a ? (n(t(i, e, a), function(e) {
                    delete i[e.id]
                }),
                this) : (this._events = [],
                this)
            },
            trigger: function(e) {
                var n, i;
                return this._events && e ? (n = r.call(arguments, 1),
                i = t(this._events, e),
                a(i, n)) : this
            }
        },
        e.BigPipeEvent = o.mixin({
            mixto: function(e) {
                return o.mixin(e, i)
            }
        }, i)
    }(page),
    function(e) {
        var t = e.BigPipeUtil
          , n = e.BigPipeEvent
          , a = function() {
            function e(e, i) {
                function o() {
                    var n, a, o, r;
                    if (e.styles && e.styles.length)
                        for (n = 0,
                        a = e.styles.length; a > n; n++)
                            t.appendStyle(e.styles[n]);
                    if (o = e.container && "string" == typeof e.container ? document.getElementById(e.container) : e.container || document.getElementById(e.id),
                    e.extend)
                        for (r = document.createElement("div"),
                        r.innerHTML = e.html; r.firstChild; )
                            o.appendChild(r.firstChild);
                    else
                        o.innerHTML = e.html;
                    setTimeout(function() {
                        i(e)
                    }, 0)
                }
                var r = 0
                  , s = {
                    cssLoaded: !1,
                    finish: function() {
                        o(e)
                    }
                }
                  , l = function() {
                    if (n.push(s),
                    e.css && e.css.length) {
                        r = e.css.length;
                        for (var i = 0, o = r; o > i; i++)
                            t.loadCss(e.css[i], a.ignoreDuplicate, function() {
                                --r,
                                0 === r && (s.cssLoaded = !0,
                                c())
                            })
                    } else
                        s.cssLoaded = !0,
                        c()
                }
                  , c = function() {
                    for (var e = n[0]; e && e.cssLoaded; )
                        n.shift(),
                        e.finish(),
                        e = n[0]
                }
                  , d = function(n) {
                    var i, o = e.js && e.js.length, r = o, s = function() {
                        var a, i;
                        if (e.scripts && e.scripts.length)
                            for (a = 0,
                            i = e.scripts.length; i > a; a++)
                                t.globalEval(e.scripts[a]);
                        n && n(e)
                    };
                    if (!o)
                        return void (s && s());
                    for (i = 0; o > i; i++)
                        e.js[i],
                        t.loadJs(e.js[i], a.ignoreDuplicate, s && function() {
                            --r || s()
                        }
                        )
                };
                return {
                    loadCss: l,
                    loadJs: d
                }
            }
            var n = []
              , i = 0
              , o = []
              , r = null
              , s = !1
              , l = {}
              , c = 0;
            return {
                onPageletArrive: function(n) {
                    s || (t.saveLoadedRes(),
                    s = !0),
                    r = n.reqID,
                    this.trigger("pageletarrive", n);
                    var l = new e(n,function() {
                        var e;
                        if (i--,
                        0 === i)
                            for (; e = o.shift(); )
                                a.trigger("pageletinsert", l, e.pageletData),
                                e.loadJs(function(e) {
                                    a.trigger("pageletdone", l, e.pageletData)
                                }(e))
                    }
                    );
                    l.pageletData = n,
                    o.push(l),
                    i++,
                    l.loadCss()
                },
                load: function(e) {
                    function n(e) {
                        if (void 0 === e.reqID || null === e.reqID || e.reqID === h) {
                            var t = e.id;
                            v++,
                            g[t] && (e.container = g[t]),
                            e.extend = i.extend
                        }
                    }
                    var i, o, s, d, u, f = [], p = location.href, g = {}, h = c++, v = 0;
                    for (e instanceof Array ? i = {
                        pagelets: e
                    } : (i = "string" == typeof e ? {
                        pagelets: e
                    } : e,
                    e = i.pagelet || i.pagelets,
                    "string" == typeof e && (e = e.split(/\s*,\s*/))),
                    o = e.length - 1; o >= 0; o--)
                        s = e[o],
                        f.push("pagelets[]=" + s),
                        u = i.container && i.container[s] || i.container,
                        g[s] = u;
                    if (f.push("reqID=" + h),
                    a.on("pageletarrive", n),
                    i.search && f.push(i.search),
                    i.param && f.push(i.param),
                    d = i.url ? i.url + (-1 === i.url.indexOf("?") ? "?" : "&") + f.join("&") : i.search ? "?" + f.join("&") : (location.search ? location.search + "&" : "?") + f.join("&"),
                    a.on("pageletdone", function(e, t) {
                        (void 0 === t.reqID || t.reqID === h) && (v--,
                        0 === v && (a.off("pageletdone", arguments.callee),
                        a.off("pageletarrive", n),
                        i.cb && i.cb()))
                    }),
                    l[i.cacheID]) {
                        var m = l[i.cacheID];
                        h = m.reqID,
                        t.globalEval(m.content)
                    } else
                        t.ajax(d, function(e, n) {
                            return e ? i.cb && i.cb(e) : void (p === location.href && (t.globalEval(n),
                            i.cacheID && (l[i.cacheID] = {
                                content: n,
                                reqID: r
                            })))
                        })
                }
            }
        }();
        n.mixto(a),
        a.ignoreDuplicate = !0,
        window.BigPipe = page.BigPipe = a
    }(page)
});
;_superframeJSLoader(function(o, t) {
    var i = t.Bdbox
      , n = (t.define,
    t.require,
    $("#dialog"))
      , e = n.find(".message")
      , h = n.find(".confirm")
      , c = n.find(".toast")
      , s = $(".dialog-mask")
      , d = e.find(".message-content")
      , a = n.find(".dialog-title")
      , l = n.find(".dialog-content")
      , m = n.find(".btn-confirm")
      , f = n.find(".btn-cancel")
      , u = function() {};
    $.extend(u.prototype, {
        timeout: null,
        showLoading: function(o) {
            var t = document.documentElement.scrollTop || document.body.scrollTop
              , i = $(window).height();
            this.timeout = setTimeout(function() {
                var h = Math.max(i, $(document).height());
                s.height(h + "px").show(),
                o && d.html(o),
                n.show(),
                e.css("top", t + i + "px").show()
            }, 100)
        },
        hideLoading: function() {
            s.hide(),
            n.hide(),
            e.hide();
            var o = this;
            this.timeout && clearTimeout(o.timeout)
        },
        showConfirm: function(o) {
            var t = document.documentElement.scrollTop || document.body.scrollTop
              , e = $(window).height()
              , c = this
              , d = Math.max(e, $(document).height());
            s.height(d + "px").show(),
            a.html(o.title),
            l.html(o.content),
            n.show(),
            h.css("top", t + e / 2 + "px").show(),
            m.one("click", function() {
                var t = o.callback;
                i.isFunction(t) && t.call(c, !0),
                c.hideConfirm()
            }),
            f.one("click", function() {
                var t = o.callback;
                i.isFunction(t) && t.call(c, !1),
                c.hideConfirm()
            })
        },
        hideConfirm: function() {
            s.hide(),
            n.hide(),
            h.hide()
        },
        toast: function(o) {
            var t = this;
            if (!this.showToasting) {
                n.show(),
                this.showToasting = !0;
                var i = o.bottom || 10
                  , e = o.left || 0;
                c.css({
                    bottom: i + "px",
                    left: e + "px"
                }).show().find("p").html(o.content),
                setTimeout(function() {
                    t.showToasting = !1,
                    n.hide(),
                    c.hide()
                }, 1e3)
            }
        }
    }),
    t.Dialog = u
});
;_superframeJSLoader(function(t, e) {
    function o() {
        if (!c[location.href])
            return console.log("state not pushed by pagelet"),
            void (e.isSF !== !1 ? console.log("popstate handover to SF") : (console.log("SF not loaded, reloading current url"),
            location.reload()));
        var t = location.href
          , o = n.utils.queryToJson(location.href).cid
          , t = n.utils.queryToJson(location.href).url;
        return o || t ? void n.event.broadcast.fire("pagelet.content.popstate", {
            cid: o,
            url: t
        }) : void n.event.broadcast.fire("pagelet.detail.popstate")
    }
    var n = e.Bdbox
      , i = (e.define,
    e.require,
    e.Dialog)
      , a = new i
      , r = !!window.history.pushState
      , s = (location.href,
    n.monitor.pblog)
      , c = {};
    s("init", [21]),
    r && (t.on("attach", function() {
        c[location.href] = !0,
        window.addEventListener("popstate", o)
    }),
    t.on("detach", function() {
        c = {},
        window.removeEventListener("popstate", o)
    }));
    var l = function(t, e, o) {
        this.name = t,
        this.$c = e,
        this.events = o;
        var i = n.event.broadcast;
        this.dialog = a,
        this.canPush = r,
        this.bindEvent();
        var s = this;
        this.fire = function() {
            var t = Array.prototype.slice.call(arguments)
              , e = t[0];
            t[0] = s.name + "." + e,
            i.fire.apply(i, t)
        }
        ,
        n.utils.each(["on", "off"], function(t) {
            s[t] = function() {
                var e = Array.prototype.slice.call(arguments);
                i[t].apply(i, e)
            }
        })
    }
      , u = l.prototype;
    u.init = function() {}
    ,
    u.pushState = function(t) {
        var e = {
            time: (new Date).getTime(),
            disableServiceDispatch: !0
        };
        r ? (c[t] = !0,
        history.pushState(e, document.title, t)) : location.href = t
    }
    ,
    u.bindEvent = function() {
        var t = this;
        t.$c.on("touchstart", ".invoke", function() {
            var t = $(this);
            t.addClass("novel-active"),
            setTimeout(function() {
                t.removeClass("novel-active")
            }, 50)
        }),
        t.$c.on("click", ".invoke", function(e) {
            var o = $(this)
              , i = $(this).data("function");
            o.removeClass("novel-active");
            var a = t.events[i];
            n.isFunction(a) && a.call(t, o, e)
        })
    }
    ,
    u.log = function(t, e) {
        var o = this.name;
        s("event", [o, t, e])
    }
    ,
    u.pv = function() {
        var t = this.name
          , e = n.utils.queryToJson(location.search).from;
        s("pv", [t, e || ""])
    }
    ,
    u.store = new n.app.store("wisenovel",0,"local"),
    e.Pagelet = l
});
;_superframeJSLoader(function(t, e) {
    e.Bdbox,
    e.define,
    e.require;
    !function(t) {
        function e(r) {
            if (n[r])
                return n[r].exports;
            var o = n[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return t[r].call(o.exports, o, o.exports, e),
            o.l = !0,
            o.exports
        }
        var n = {};
        e.m = t,
        e.c = n,
        e.d = function(t, n, r) {
            e.o(t, n) || Object.defineProperty(t, n, {
                configurable: !1,
                enumerable: !0,
                get: r
            })
        }
        ,
        e.n = function(t) {
            var n = t && t.__esModule ? function() {
                return t.default
            }
            : function() {
                return t
            }
            ;
            return e.d(n, "a", n),
            n
        }
        ,
        e.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }
        ,
        e.p = "",
        e(e.s = 23)
    }([, function(t, e, n) {
        "use strict";
        (function(t) {
            function r(t, e, n) {
                var r;
                return r = n && n.useObject ? t + "|||" + JSON.stringify(e) : t + "|||" + String(e),
                n && !1 === n.caseSensitive && (r = r.toLowerCase()),
                r
            }
            function o(t, e, n) {
                return function() {
                    for (var o = [], i = 0; i < arguments.length; i++)
                        o[i] = arguments[i];
                    var a = r(t, o[0], n);
                    return T.hasOwnProperty(a) ? T[a] : T[a] = e.apply(null, o)
                }
            }
            function i(t) {
                return void 0 === t && (t = navigator.userAgent),
                / baiduboxapp\//i.test(t) && !/ (lite|info|mission) baiduboxapp/.test(t)
            }
            function a(t) {
                return void 0 === t && (t = navigator.userAgent),
                / (lite|info) baiduboxapp\//i.test(t)
            }
            function u(t) {
                void 0 === t && (t = navigator.userAgent);
                var e = M();
                return / mission baiduboxapp\//i.test(t) ? I.MISSION : "bdboxnovelsdk" === e.osname ? "lite" === e.hpkg ? I.LITE : I.SDK : / info baiduboxapp\//i.test(t) ? I.INFO : / pro baiduboxapp\//i.test(t) ? I.PRO : / lite baiduboxapp\//i.test(t) ? I.LITE : / baiduboxapp\//i.test(t) ? I.MAIN : I.OTHER
            }
            function c(t) {
                return void 0 === t && (t = navigator.userAgent),
                /(iPhone|iPod|iPad)/.test(t)
            }
            function s(t) {
                return void 0 === t && (t = navigator.userAgent),
                /(Android);?[\s\/]+([\d.]+)?/.test(t)
            }
            function f() {
                return D() ? "android" : E() ? "ios" : "other"
            }
            function l(t) {
                void 0 === t && (t = location.search);
                var e = t.split("?")
                  , n = e[1] ? e[1] : e[0];
                n.indexOf("#") > 0 && (n = n.split("#")[0]);
                for (var r = n.split("&"), o = {}, i = 0; i < r.length; i++) {
                    var a = r[i]
                      , u = a.split("=");
                    if (u[0].length > 0) {
                        var c = "";
                        try {
                            c = decodeURIComponent(u[1])
                        } catch (t) {
                            c = u[1]
                        }
                        o[u[0]] = c
                    }
                }
                return o
            }
            function d(t) {
                var e = [];
                for (var n in t)
                    if (t.hasOwnProperty(n)) {
                        var r = void 0;
                        r = "object" == typeof t[n] ? JSON.stringify(t[n]) : String(t[n]),
                        e.push(n + "=" + encodeURIComponent(r))
                    }
                return e.join("&")
            }
            function p(t) {
                void 0 === t && (t = "");
                var e;
                try {
                    !t && B.urlDataParam && (t = B.urlDataParam);
                    var n = t ? decodeURIComponent(t) : M().data;
                    e = JSON.parse(n)
                } catch (t) {
                    e = {}
                }
                return e
            }
            function v() {
                var t = {
                    main: "a1",
                    lite: "a2",
                    info: "a3",
                    pro: "i4",
                    sdk: "sdk_a0",
                    other: ""
                }
                  , e = C();
                return "mission" === e ? D() ? "a5" : "i5" : t[e] ? t[e] : ""
            }
            function b() {
                var t = document.cookie.match(/BAIDUCUID=(.+?);/);
                return t ? t[1] : ""
            }
            function g() {
                if (window.baiduboxapp_version)
                    return window.baiduboxapp_version;
                var t = C();
                if ("lite" === t || "sdk" === t) {
                    var e = M();
                    if (e.hver)
                        return e.hver;
                    if (F())
                        return "3.0.0.0"
                }
                var n = "0.0.0.0"
                  , r = navigator.userAgent
                  , o = /baiduboxapp\/([\d+.]+)/.exec(r);
                return o && (n = o[1]),
                n
            }
            function m(t, e) {
                var n = e ? e + "" : U();
                t += "";
                for (var r = t.split("."), o = n.split("."), i = 0; 3 >= i; i++) {
                    var a = parseInt(r[i] || "0", 10)
                      , u = parseInt(o[i] || "0", 10);
                    if (isNaN(a) && (a = 0),
                    isNaN(u) && (u = 0),
                    a > u)
                        return 1;
                    if (u > a)
                        return -1
                }
                return 0
            }
            function h() {
                var t = M();
                if (t && t.data)
                    try {
                        var e = JSON.parse(t.data);
                        if (e && e.env && "lite_feedtab_degrade" === e.env)
                            return !0
                    } catch (t) {
                        return !1
                    }
                return !1
            }
            function x(t) {
                return /^baidubox(app|lite):\/\/swan/.test(t)
            }
            function y(t) {
                return Object.prototype.toString.call(t)
            }
            function w(t) {
                return "[object Array]" === y(t)
            }
            function O(t) {
                return "[object Function]" === y(t)
            }
            function j(t) {
                return "object" == typeof t && "[object Object]" === y(t)
            }
            function S(t) {
                var e = "_invokeApp_" + V++;
                return window[e] = function() {
                    for (var e = [], n = 0; n < arguments.length; n++)
                        e[n] = arguments[n];
                    t.apply(window, e)
                }
                ,
                e
            }
            function _(t) {
                var e = document.createElement("iframe");
                e.style.display = "none",
                e.src = t;
                var n = document.body || document.getElementsByTagName("body")[0];
                n.appendChild(e),
                setTimeout(function() {
                    n.removeChild(e),
                    e = null
                }, 0)
            }
            function k(t, e, n) {
                var r = {
                    obj: t,
                    func: e,
                    args: n || []
                };
                try {
                    return window.prompt("BdboxApp:" + JSON.stringify(r))
                } catch (t) {
                    return {
                        error: 201
                    }
                }
            }
            function N(t, e, n) {
                if (!L() && !a() && !/bdboxnovelsdk\/[\d.]+\/lite\//.test(navigator.userAgent))
                    return {
                        error: 403,
                        result: null,
                        __from: "js"
                    };
                if (n && !w(n) && (n = Array.prototype.slice.call(arguments, 0).slice(2)),
                window[t] && window[t][e])
                    return {
                        error: 0,
                        result: window[t][e].apply(window[t], n),
                        __from: "js"
                    };
                var r = U();
                if (m("4.8") <= 0) {
                    var o = k(t, e, n);
                    return o = o ? JSON.parse(o) : {},
                    o.__from = "app",
                    console.log("invokeAndroid: name=" + t + ", funcName=" + e + ", returnVal=", o),
                    o
                }
                return "4.7.1" === r || "4.7" === r ? {
                    error: 0,
                    result: k(t, e, n),
                    __from: "app4.7"
                } : {
                    error: 200
                }
            }
            function A(t, e, n) {
                if (t) {
                    if (n && O(n)) {
                        var r = "_iosInvokeApp_" + V++;
                        window[r] = function() {
                            for (var t = [], e = 0; e < arguments.length; e++)
                                t[e] = arguments[e];
                            n.apply(window, t)
                        }
                        ,
                        e.func = r
                    } else
                        n && (e.func = n);
                    var o = "baiduboxapp://" + t + "?" + d(e);
                    console.log("IOS Invoke APP:", o);
                    var i = document.createElement("iframe");
                    i.style.display = "none",
                    i.src = o;
                    var a = document.body || document.getElementsByTagName("body")[0];
                    a.appendChild(i),
                    setTimeout(function() {
                        a.removeChild(i),
                        i = null
                    }, 0)
                }
            }
            function P() {
                return new Promise(function(t) {
                    if (!L())
                        return t("");
                    var e = function(e) {
                        for (var n = [], r = 0; r < e.length; r++)
                            n.push(e[r].join("_"));
                        t(n.join("-"))
                    };
                    D() ? N("Bdbox_android_utils", "getABTestSidList", [S(function(t) {
                        e(t.data)
                    })]) : A("utils", {
                        action: "getABTestSidList",
                        minver: "7.3.0"
                    }, function(t) {
                        var n = JSON.parse(t);
                        0 === n.result && e(n.data)
                    })
                }
                )
            }
            n.d(e, "a", function() {
                return H
            }),
            n.d(e, "h", function() {
                return L
            }),
            n.d(e, "j", function() {
                return a
            }),
            n.d(e, "i", function() {
                return E
            }),
            n.d(e, "g", function() {
                return D
            }),
            n.d(e, "n", function() {
                return M
            }),
            n.d(e, "l", function() {
                return d
            }),
            n.d(e, "b", function() {
                return R
            }),
            n.d(e, "c", function() {
                return U
            }),
            n.d(e, "o", function() {
                return m
            }),
            n.d(e, "k", function() {
                return x
            }),
            n.d(e, "d", function() {
                return N
            }),
            n.d(e, "e", function() {
                return A
            }),
            n.d(e, "f", function() {
                return _
            }),
            n.d(e, "m", function() {
                return S
            });
            var I, T = {}, J = "undefined" != typeof window ? window : void 0 !== t ? t : "undefined" != typeof self ? self : {}, B = "object" == typeof self && self.self === self && self || "object" == typeof J && J.global === J && J || J, L = o("_isBox", i);
            !function(t) {
                t.SDK = "sdk",
                t.INFO = "info",
                t.PRO = "pro",
                t.MISSION = "mission",
                t.MAIN = "main",
                t.LITE = "lite",
                t.OTHER = "other"
            }(I || (I = {}));
            var C = o("_getBoxName", u)
              , E = o("_isIOS", c)
              , D = o("_isAndroid", s)
              , M = o("_queryToJson", l)
              , R = o("_getUrlDataParam", p)
              , U = o("_getVersion", g)
              , F = o("_isLiteDegrade", h)
              , V = 0
              , $ = {
                info: "10002",
                lite: "10001",
                sdk: "10005",
                mission: "10006",
                main: "1",
                pro: "-1",
                other: "-1"
            }
              , q = [{
                name: "我的关注",
                reg: /^我的关注_/
            }, {
                name: "third_push",
                reg: /push$/
            }, {
                name: "aladdin_trans",
                reg: /_novel_trans$/
            }, {
                name: "aladdin",
                reg: /^aladdin/
            }, {
                name: "厂商渠道",
                reg: /^\d{3,4}[a-z]$/
            }]
              , H = function() {
                function t(t) {
                    var e = t.id
                      , n = t.from
                      , r = t.extType
                      , o = void 0 === r ? "array" : r
                      , i = this;
                    this.id = e,
                    this.index = 0,
                    this.extType = o,
                    this.callbacks = {};
                    var a = U()
                      , u = a.split(".")
                      , c = u[0] + "." + u[1]
                      , s = M();
                    this.mainBody = JSON.stringify({
                        data: {
                            appid: $[C()],
                            cateid: "99",
                            actiontype: "0",
                            actiondata: {
                                id: "" + e,
                                type: "0",
                                content: {
                                    boxVersion: a,
                                    boxV: c,
                                    platform: f(),
                                    cuid: b(),
                                    from: n
                                }
                            }
                        },
                        service: "bdbox",
                        action: "pblog",
                        osbranch: v(),
                        sid: s.sid,
                        uid: s.uid,
                        cen: s.cen && s.cen.indexOf("uid") >= 0 ? "uid" : void 0,
                        ctv: s.ctv
                    }),
                    this.sid = s.sid,
                    this.sid || P().then(function(t) {
                        return i.sid = t
                    })
                }
                return t.getShortSource = function(t) {
                    var e;
                    e = t || R().fromaction || "",
                    e = e.trim();
                    for (var n = 0; n < q.length; n++)
                        if (q[n].reg.test(e))
                            return {
                                "short": q[n].name,
                                full: e
                            };
                    return {
                        "short": e,
                        full: e
                    }
                }
                ,
                t.prototype.event = function(e) {
                    if (void 0 === e.passive && (e.passive = !0),
                    e.ext && w(e.ext))
                        for (var n = 0; n < e.ext.length; n++)
                            if (j(e.ext[n]))
                                for (var r in e.ext[n])
                                    e.ext[n].hasOwnProperty(r) && "object" != typeof e.ext[n][r] && (e.ext[n][r] = String(e.ext[n][r]));
                            else
                                console.warn("PBLOG: ext param is not a plain object"),
                                e.ext[n] = {};
                    else
                        e.ext = [{}];
                    var o = t.getShortSource(e.value);
                    e.value = o.short;
                    for (var n = 0; n < e.ext.length; n++)
                        e.ext[n].fullSource = o.full;
                    var i = JSON.parse(this.mainBody);
                    e.passive || (i.data.actiontype = "1"),
                    i.data.actiondata.timestamp = (new Date).getTime();
                    var a = i.data.actiondata.content;
                    if (a.type = e.type,
                    a.page = e.page,
                    a.source = e.source,
                    a.value = e.value,
                    e.id && (i.data.actiondata.id = "" + e.id),
                    i.sid = this.sid,
                    "array" === this.extType)
                        a.ext = JSON.stringify(e.ext),
                        this.upload(i, e.callback);
                    else
                        for (var u = e.ext, n = 0; n < u.length; n++)
                            a.ext = JSON.stringify(u[n]),
                            this.upload(i, e.callback)
                }
                ,
                t.prototype.upload = function(t, e) {
                    var n = this
                      , r = new Image(1,1)
                      , o = d(t)
                      , i = "_box_mt" + this.index++;
                    window[i] = r,
                    this.callbacks[i] = !0,
                    r.onload = r.onerror = r.onabort = function() {
                        r.onload = r.onerror = r.onabort = function() {
                            return 0
                        }
                        ,
                        window[i] = null,
                        n.callbacks[i] && e && e(),
                        delete n.callbacks[i]
                    }
                    ,
                    setTimeout(function() {
                        n.callbacks[i] && e && (delete n.callbacks[i],
                        e())
                    }, 200);
                    var a = "https://m.baidu.com/tcbox?" + o;
                    r.src = a + "&_rnd=" + Math.floor(2147483648 * Math.random())
                }
                ,
                t
            }()
        }
        ).call(e, n(8))
    }
    , , , , , , , function(t) {
        var e;
        e = function() {
            return this
        }();
        try {
            e = e || Function("return this")() || (0,
            eval)("this")
        } catch (t) {
            "object" == typeof window && (e = window)
        }
        t.exports = e
    }
    , , , , , function(t, e, n) {
        var r = n(26)
          , o = r.Symbol;
        t.exports = o
    }
    , , , , , , , , , , function(t, n, r) {
        "use strict";
        function o(t) {
            var e = t.ext || {};
            c.pageName = t.pageName,
            c.from = t.from,
            c.ext = e || {},
            u.event({
                passive: !0,
                page: t.pageName,
                type: "show",
                source: "page",
                value: t.from,
                ext: [e]
            })
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = r(1)
          , a = r(24)
          , u = new i.a({
            id: 10053,
            from: "novel"
        })
          , c = {
            pageName: "",
            from: "",
            ext: {}
        }
          , s = {
            sending: !1,
            callbacks: []
        }
          , f = {
            pageView: function(t) {
                var e, n = Object(i.n)().data;
                if (n)
                    try {
                        e = JSON.parse(decodeURIComponent(n)).fromaction
                    } catch (t) {}
                setTimeout(function() {
                    var n;
                    n = t && t.ext ? t.ext : {},
                    o({
                        pageName: t.pageName,
                        from: e || t && t.from || "",
                        ext: n
                    })
                }, 100)
            },
            logClick: function(t) {
                document.body.addEventListener("click", function(e) {
                    var n = e.target;
                    do {
                        if (n.getAttribute && n.getAttribute(t.selector))
                            break;
                        n = n.parentNode
                    } while (n);if (n) {
                        var r = n.getAttribute(t.selector)
                          , o = n.getAttribute(t.extField) || {};
                        if (o)
                            try {
                                o = JSON.parse(o),
                                a(o) || (o = {})
                            } catch (e) {
                                o = {}
                            }
                        s.sending = !0,
                        o.callback = function() {
                            s.sending = !1;
                            for (var t = 0; t < s.callbacks.length; t++)
                                s.callbacks[t]()
                        }
                        ,
                        f.click(r, o)
                    }
                }, !0)
            },
            onLogSent: function(t) {
                s.sending ? s.callbacks.push(t) : t()
            },
            show: function(t, e) {
                var n = {};
                for (var r in c.ext)
                    c.ext.hasOwnProperty(r) && (n[r] = c.ext[r]);
                if (e)
                    for (var r in e)
                        e.hasOwnProperty(r) && "callback" !== r && (n[r] = e[r]);
                u.event({
                    passive: !0,
                    page: c.pageName,
                    type: "show",
                    source: t,
                    value: c.from,
                    ext: [n]
                })
            },
            click: function(t, e) {
                var n = {};
                for (var r in c.ext)
                    c.ext.hasOwnProperty(r) && (n[r] = c.ext[r]);
                if (e)
                    for (var r in e)
                        e.hasOwnProperty(r) && "callback" !== r && (n[r] = e[r]);
                u.event({
                    passive: !1,
                    page: c.pageName,
                    type: "click",
                    source: t,
                    value: c.from,
                    ext: [n],
                    callback: function() {
                        e && e.callback && e.callback()
                    }
                })
            }
        };
        window.page.Logger = e.Logger = f
    }
    , function(t, e, n) {
        function r(t) {
            if (!a(t) || o(t) != u)
                return !1;
            var e = i(t);
            if (null === e)
                return !0;
            var n = l.call(e, "constructor") && e.constructor;
            return "function" == typeof n && n instanceof n && f.call(n) == d
        }
        var o = n(25)
          , i = n(30)
          , a = n(32)
          , u = "[object Object]"
          , c = Function.prototype
          , s = Object.prototype
          , f = c.toString
          , l = s.hasOwnProperty
          , d = f.call(Object);
        t.exports = r
    }
    , function(t, e, n) {
        function r(t) {
            return null == t ? void 0 === t ? c : u : s && s in Object(t) ? i(t) : a(t)
        }
        var o = n(13)
          , i = n(28)
          , a = n(29)
          , u = "[object Null]"
          , c = "[object Undefined]"
          , s = o ? o.toStringTag : void 0;
        t.exports = r
    }
    , function(t, e, n) {
        var r = n(27)
          , o = "object" == typeof self && self && self.Object === Object && self
          , i = r || o || Function("return this")();
        t.exports = i
    }
    , function(t, e, n) {
        (function(e) {
            var n = "object" == typeof e && e && e.Object === Object && e;
            t.exports = n
        }
        ).call(e, n(8))
    }
    , function(t, e, n) {
        function r(t) {
            var e = a.call(t, c)
              , n = t[c];
            try {
                t[c] = void 0;
                var r = !0
            } catch (t) {}
            var o = u.call(t);
            return r && (e ? t[c] = n : delete t[c]),
            o
        }
        var o = n(13)
          , i = Object.prototype
          , a = i.hasOwnProperty
          , u = i.toString
          , c = o ? o.toStringTag : void 0;
        t.exports = r
    }
    , function(t) {
        function e(t) {
            return r.call(t)
        }
        var n = Object.prototype
          , r = n.toString;
        t.exports = e
    }
    , function(t, e, n) {
        var r = n(31)
          , o = r(Object.getPrototypeOf, Object);
        t.exports = o
    }
    , function(t) {
        function e(t, e) {
            return function(n) {
                return t(e(n))
            }
        }
        t.exports = e
    }
    , function(t) {
        function e(t) {
            return null != t && "object" == typeof t
        }
        t.exports = e
    }
    ])
});
_superframeJSLoader(function(e, n) {
    {
        var o = n.Bdbox;
        n.define,
        n.require
    }
    o.define("novel:bdbox/utils/cookie", function(e, n, o, i) {
        o.exports = {
            set: function(e, n, o, t) {
                return i.isObject(o) && (t = o,
                o = document.domain),
                o = o || document.domain,
                i.isUndefined(t) && (t = new Date),
                document.cookie = e + "=" + encodeURIComponent(n) + ";domain=" + o + ";path=/;expires=" + t.toGMTString() + ";",
                this
            },
            get: function(e) {
                var n = "";
                if (e)
                    for (var o = document.cookie.split("; "), i = /\+/g, t = 0, r = o.length; r > t; t++) {
                        var d = o[t].split("=")
                          , c = d[0];
                        d.shift();
                        var a = d.join("=");
                        if (e === c) {
                            n = decodeURIComponent(a.replace(i, " "));
                            break
                        }
                    }
                return n
            }
        }
    }, "5e6a08c")
});
_superframeJSLoader(function(e, o) {
    {
        var n = o.Bdbox;
        o.define,
        o.require
    }
    n.define("novel:js/utils", function(e, n, t, r) {
        var a, i = o.Bdbox, r = o.Zepto;
        o.detailUtils = {
            openNaReader: function(e) {
                var n = {
                    cid: e.cid,
                    index: e.index
                };
                o.detailInfo.isGenuine || (n.url = encodeURIComponent(e.href));
                var t, r, a = i.utils.queryToJson(location.href);
                try {
                    var l = JSON.parse(a.data);
                    t = l.fromaction,
                    r = l.query
                } catch (c) {
                    t = "",
                    r = ""
                }
                var d = {
                    from: t,
                    query: r,
                    cpsrc: o.detailUtils.getContentUrl(n),
                    cid: e.cid,
                    free: "0",
                    image: o.bookInfo.img.replace(/&amp;/g, "&"),
                    author: o.bookInfo.author,
                    name: o.bookInfo.bookName,
                    gid: o.bookInfo.bookId
                };
                i.ios.invokeApp("novel/openWiseToNAReader", {
                    param: encodeURIComponent(JSON.stringify(d)),
                    minver: "5.4"
                })
            },
            getContentUrl: function(e) {
                var o = "/tcx?"
                  , n = i.utils.queryToJson(location.href);
                n.data = encodeURIComponent(n.data),
                r.extend(n, e),
                i.$isIOS() && (n.sourceurl = encodeURIComponent(decodeURIComponent(n.sourceurl)),
                n.cid = encodeURIComponent(decodeURIComponent(n.cid)));
                var t = i.utils.jsonToQuery(n);
                return o += t,
                location.protocol + "//" + location.host + o
            },
            jumpToContent: function(e) {
                var o = "/tcx?"
                  , n = i.utils.queryToJson(location.href);
                r.extend(n, e),
                i.$isIOS() && (n.sourceurl = encodeURIComponent(decodeURIComponent(n.sourceurl)),
                n.cid = encodeURIComponent(decodeURIComponent(n.cid)));
                var t = i.utils.jsonToQuery(n);
                o += t,
                setTimeout(function() {
                    var e = location.protocol + "//" + location.host + o;
                    location.href = e
                }, 200)
            },
            openUrlWithSubPage: function(e) {
                var o = {
                    title: e.title || document.title,
                    url: e.url,
                    method: e.method || "get",
                    needParams: e.needParams,
                    pagetype: e.pagetype,
                    args: e.args || "data={}"
                };
                i.isIOS ? i.ios.invokeApp("novel", {
                    action: "openSubPage",
                    param: encodeURIComponent(JSON.stringify(o)),
                    minver: "5.4"
                }) : i.isAndroid && i.android.invokeApp("Bdbox_android_novel", "openSubPage", [JSON.stringify(o)])
            },
            openDetail: function(e) {
                var n = {
                    title: "小说详情",
                    url: "https://boxnovel.baidu.com/boxnovel/detail?action=novel&type=detail",
                    method: "post",
                    needParams: "1",
                    pagetype: 1,
                    args: "data=" + JSON.stringify({
                        gid: e.gid,
                        fromaction: o.detailUtils.getFromAction("wise_recommend_content")
                    })
                }
                  , t = "baiduboxapp://novel?action=openSubPage&param=" + encodeURIComponent(JSON.stringify(n)) + "&prev=" + encodeURIComponent("baiduboxapp://v1/browser/search?query=") + "&minver=5.4.5.0"
                  , r = {
                    mode: "0",
                    intent: "intent:#Intent;action=com.baidu.searchbox.action.NOVELDETAIL;S.key_request_method=post;S.key_request_url=" + encodeURIComponent(n.url) + ";B.key_need_params=true;S.key_request_postdata=" + encodeURIComponent(n.args) + ";S.key_novel_title=" + encodeURIComponent(n.title) + ";end",
                    min_v: "25165824"
                };
                if (i.isBox)
                    i.isIOS ? i.ios.invokeApp("novel", {
                        action: "openSubPage",
                        param: encodeURIComponent(JSON.stringify(n)),
                        minver: "5.4"
                    }) : i.isAndroid && i.android.invokeApp("Bdbox_android_novel", "openSubPage", [JSON.stringify(n)]);
                else {
                    var a = e.from
                      , l = e.channel;
                    openBox = o.OpenBox(i.isIOS ? {
                        iosScheme: t,
                        androidCommand: r,
                        from: a,
                        channel: l,
                        failUrl: e.failUrl,
                        failCallback: function() {
                            window.location.href = e.failUrl
                        }
                    } : {
                        iosScheme: t,
                        androidCommand: r,
                        from: a,
                        channel: l,
                        failCallback: function() {
                            window.location.href = e.failUrl
                        },
                        overwrite: 1
                    }),
                    openBox.open()
                }
            },
            getApiUrl: function(e) {
                var o = "/tcx?"
                  , n = i.utils.queryToJson(location.href);
                return r.extend(n, e),
                o += i.utils.jsonToQuery(n)
            },
            isSupportFlex: function() {
                var e = document.createElement("div");
                return e.style.display = "flex",
                "flex" === e.style.display
            },
            storage: {
                get: function(e) {
                    var o = localStorage.getItem("BDNodeNovelStorage_" + e);
                    if (o)
                        try {
                            return o = JSON.parse(o),
                            o.expires && o.expires < Number(new Date) ? (console.log("缓存过期：", "BDNodeNovelStorage_" + e),
                            localStorage.removeItem("BDNodeNovelStorage_" + e),
                            !1) : o.val
                        } catch (n) {
                            return !1
                        }
                    return !1
                },
                set: function(e, o, n) {
                    var t = "BDNodeNovelStorage_" + e
                      , r = {
                        val: o
                    };
                    n && n.maxAge && (r.expires = Number(new Date) + 1e3 * n.maxAge);
                    try {
                        localStorage.setItem(t, JSON.stringify(r))
                    } catch (a) {}
                }
            },
            getConfigFromPo: function(e, o) {
                var n = "https://m.baidu.com/po/api/configure/show.jsonp"
                  , t = "po_config_" + e
                  , a = this
                  , i = this.storage.get(t);
                return i ? o(i) : void r.getJSON(n + "?id=" + e + "&callback=?", function(e) {
                    e && a.storage.set(t, e, {
                        maxAge: 300
                    }),
                    o(e)
                })
            },
            openBoxForUrl: function(e) {
                var n = e.from
                  , t = e.channel || n
                  , r = {
                    source: n,
                    from: "openbox",
                    page: "other",
                    type: "",
                    value: "url",
                    channel: t
                }
                  , a = e.url || window.location.href
                  , i = "baiduboxapp://utils?action=sendIntent&minver=7.4&params=%7B%22intent%22%3A%22intent%3A%23Intent%3Baction%3Dcom.baidu.searchbox.action.HOME%3BS.targetCommand%3D%257B%2522mode%2522%253A%25220%2522%252C%2522intent%2522%253A%2522intent%253A%2523Intent%253BB.bdsb_append_param%253Dtrue%253BS.bdsb_light_start_url%253D" + encodeURIComponent(encodeURIComponent(a)) + "%253Bend%2522%252C%2522class%2522%253A%2522com.baidu.searchbox.xsearch.UserSubscribeCenterActivity%2522%252C%2522min_v%2522%253A%252216787968%2522%257D%3Bend%22%7D&needlog=1&logargs=" + JSON.stringify(r)
                  , l = "baiduboxapp://easybrowse?opentype=1&openurl=" + encodeURIComponent(a) + "&isla=0&needlog=1&logargs=" + JSON.stringify(r)
                  , c = {
                    from: n,
                    channel: t,
                    iosScheme: l,
                    androidCommand: i
                };
                e.failUrl && (c.failUrl = e.failUrl,
                c.failCallback = function() {
                    window.location.href = e.failUrl
                }
                );
                var d = o.OpenBox(c);
                d.open()
            },
            getFromAction: function(e) {
                if (a)
                    return a;
                var o = i.utils.queryToJson(location.search);
                if (o.data)
                    try {
                        a = JSON.parse(decodeURIComponent(o.data)).fromaction
                    } catch (n) {}
                else
                    o.from && (a = o.from);
                return a || e || "wise"
            },
            getLitePkgUrl: function(e) {
                return "https://boxnovel.baidu.com/boxnovel/downpkg?pos=" + e.pos + "&source=" + e.source + "&type=lite&channel=" + e.channel
            }
        }
    }, "7b192af")
});
// sfr loader: novel:js/afd
_superframeJSLoader(function(vw, page) {
    var Bdbox = page.Bdbox;
    var define = page.define;
    var require = page.require;
    // commonjs file: novel:js/afd
    Bdbox.define('novel:js/afd', function(require, exports, module, $) {
        /**
 * afd广告接入公共库
 * @file afd.js
 * @author lirenhai@baidu.com
 */
        var $ = page.Zepto;
        var Bdbox = page.Bdbox;
        var CkObj;
        // 由于afd的广告加载同时受限于分gid屏蔽广告和初始化操作，两个又都是异步的，所以必须等待两个都ready后，才开始加载
        var loadMat = {
            allowed: 1,
            prepared: 0
        };

        (function() {
            /*
    * Date：2017-10-13
    * Author: shangfei@baidu.com
    * 百度App rain广告组件和wise广告通用ck域
    * 支持单广告详情页面和多广告列表页
    */
            var CONST = {
                TYPE: {
                    NORMAL: 'normal',
                    RAIN: 'rain'
                }
            };
            function Ck(config) {
                this.inited = false;
                this.useType = CONST.TYPE.RAIN;
                this.config = config || {};

                // 广告节点data-*属性集合
                this.configDataProps = this.config.DataProps || {
                    imTimeSign: 'data-imtimesign'
                };
                // 广告节点选择器
                this.selector = this.config.selector || '[data-type="ec_ad"]';
                // 全局imTimeSign
                this.imTimeSign = this.config.imTimeSign || null;
                // 点击a标签时计算得出的imTimeSign
                this.currentImTimeSign = this.config.imTimeSign || 0;

                // 记录touch行为数据
                this.touch = {
                    X: 0,
                    Y: 0,

                    startTime: 0,
                    endTime: 0,

                    pressTime: 0
                }

                // 记录scroll行为数据
                this.scroll = {
                    boundary: 10,
                    isStart: false,

                    validDirection: 'none',
                    direction: 'none',

                    num: 0,
                    totalChange: 0,

                    lastY: 0,
                    startY: 0,

                    startTime: 0,
                    lastTime: 0,
                    totalTime: 0
                }
            }

            // 辅助函数
            Ck.prototype.getCkValue = function(url, currentImTimeSign) {
                if (typeof url !== 'string') {
                    return false;
                }

                var ckValue = false;
                var checkCode = this.getCheckCode(url, currentImTimeSign);

                if (checkCode !== false) {
                    this.config.debug && console.log('checkCode:' + checkCode, '\ntouch.pressTime:' + this.touch.pressTime, '\ntouch.X:' + this.touch.X, '\ntouch.Y:' + this.touch.Y, '\nscroll.num:' + this.scroll.num, '\nscroll.totalTime:' + this.scroll.totalTime);

                    ckValue = [checkCode,
                    this.touch.pressTime, this.touch.X, this.touch.Y,
                    this.scroll.num, this.scroll.totalTime].join('.');

                    this.clearCount();
                }

                return ckValue;
            }

            Ck.prototype.getCheckCode = function(url, currentImTimeSign) {
                currentImTimeSign = currentImTimeSign || this.currentImTimeSign;
                var num;
                var checkCode = 0;
                var urlReg = new RegExp('\\?url\\=([^\\.]+)\\.');

                var urlSearch = urlReg.exec(url);

                this.config.debug && console.log('currentImTimeSign:' + currentImTimeSign, ';touch.pressTime:' + this.touch.pressTime, ';touch.X:' + this.touch.X);

                if (urlSearch) {
                    num = (((this.touch.pressTime * currentImTimeSign) % 99) + 9);
                    for (var x = 0; x < num; ++x) {
                        checkCode += urlSearch[1].charCodeAt((this.touch.X * x) % urlSearch[1].length);
                    }
                    return checkCode;
                }

                return false;
            }

            Ck.prototype.getEventTime = function(event) {
                return event.timeStamp !== 0 ? event.timeStamp : new Date().getTime();
            }

            Ck.prototype.getScrollDirection = function(startY, nowY) {
                return startY < nowY ? 'up' : (startY > nowY ? 'down' : false);
            }

            Ck.prototype.clearCount = function() {
                this.scroll.num = 0;
                this.scroll.totalTime = 0;
            }

            Ck.prototype.scrollCount = function() {
                this.scroll.num++;
                this.scroll.totalTime += this.scroll.lastTime - this.scroll.startTime;
                this.scroll.validDirection = 'none';
            }

            Ck.prototype.isValidScroll = function(scrollValue, nowDirection) {
                if (this.scroll.direction === 'none') {
                    this.scroll.direction = nowDirection;
                }

                if (nowDirection !== this.scroll.direction) {
                    this.scroll.direction = nowDirection;
                    this.scroll.totalChange = 0;
                } else {
                    this.scroll.totalChange += scrollValue;
                }

                return this.scroll.totalChange > this.scroll.boundary;
            }

            Ck.prototype.addCkOnUrl = function(url, currentImTimeSign) {
                var ckReg = new RegExp('&ck=[\\w.]*');

                var ckValue = this.getCkValue(url, currentImTimeSign);
                if (ckValue === false) {
                    return url;
                }

                if (url.indexOf('&ck=') === -1) {
                    url += '&ck=' + ckValue;
                } else {
                    url = url.replace(ckReg, '&ck=' + ckValue);
                }

                return url;
            }

            // 监听函数
            Ck.prototype.handlerOnTouchStart = function(event) {
                var touch = event.touches.item(0);

                this.touch.X = parseInt(touch.pageX, 10);
                this.touch.Y = parseInt(touch.pageY, 10);

                this.config.debug && console.warn('isStartScroll:' + this.scroll.isStart);
                this.config.debug && console.warn('validDirection:' + this.scroll.validDirection);

                if (this.scroll.isStart && this.scroll.validDirection !== 'none') {
                    this.scrollCount();

                    this.scroll.totalChange = 0;
                    this.scroll.isStart = false;
                    this.scroll.direction = 'none';
                }

                this.touch.startTime = this.getEventTime(event);
            }

            Ck.prototype.handlerOnTouchEnd = function(event) {
                this.touch.endTime = this.getEventTime(event);
                this.touch.pressTime = Math.round(this.touch.endTime - this.touch.startTime);
            }

            Ck.prototype.handlerOnTouchMove = function(event) {
                this.handlerOnScroll(event);
            }

            Ck.prototype.handlerOnScroll = function(event) {
                // scrollTop & scrollY
                if (!this.scroll.isStart) {
                    this.scroll.isStart = true;
                    this.scroll.startY = this.useType === CONST.TYPE.RAIN ? this.viewport.scrollTop() : (window.scrollY || document.body.scrollTop);
                }

                var nowScrollY = this.useType === CONST.TYPE.RAIN ? this.viewport.scrollTop() : (window.scrollY || document.body.scrollTop);
                var eventTime = this.getEventTime(event);

                this.config.debug && console.log('nowScrollY:' + nowScrollY);

                var scrollValue = Math.abs(nowScrollY - this.scroll.lastY);
                var nowDirection = this.getScrollDirection(this.scroll.lastY, nowScrollY) || this.scroll.direction;

                if (this.isValidScroll(scrollValue, nowDirection)) {
                    if (eventTime > this.scroll.lastTime) {
                        this.scroll.lastTime = eventTime;
                    }

                    if (this.scroll.validDirection === 'none') {
                        this.scroll.validDirection = this.scroll.direction;
                        this.scroll.startTime = eventTime;
                    }

                    if (this.scroll.validDirection !== this.scroll.direction) {
                        this.scrollCount();
                        this.scroll.validDirection = this.scroll.direction;
                        this.scroll.startTime = eventTime;
                    }
                }

                this.scroll.lastY = nowScrollY;
            }

            // 默认绑定监听：用于普通wise
            Ck.prototype.defaultInit = function() {
                this.init();
                this.useType = CONST.TYPE.NORMAL;
            }
            ;

            // 百度App绑定监听：用于百度App rain组件中
            // 在百度App rain组件BdrainrwAdsconfig中实例化一次，export实例对象供landing组件调用
            // 百度App中阻止了a标签的默认事件，跳转动作需要dipatch固定的action
            Ck.prototype.init = function(doc, viewport) {
                this.inited = true;

                // 百度App @李俊雄 负责提供doc和viewport
                // viewport：iframe里面，给百度App封装body对象；iframe外面，给百度App封装的window对象
                // body对象包括：ref属性(提供原生body)、height方法、width方法、scrollTop方法
                // window对象包括：ref属性(提供原生window)、height方法、width方法、scrollTop方法
                this.doc = doc || document;
                this.viewport = viewport || {};

                this.listeners = {};

                var self = this;
                var view = this.viewport && this.viewport.ref ? this.viewport.ref : window;

                this.doc.addEventListener('touchstart', this.listeners.touchstart = function(e) {
                    self.handlerOnTouchStart(e);
                }
                , true);
                this.doc.addEventListener('touchend', this.listeners.touchend = function(e) {
                    self.handlerOnTouchEnd(e);
                }
                , true);
                this.doc.addEventListener('touchmove', this.listeners.touchmove = function(e) {
                    self.handlerOnTouchMove(e);
                }
                , true);

                view.addEventListener('scroll', this.listeners.scroll = function(e) {
                    self.handlerOnScroll(e);
                }
                , true);
            }

            Ck.prototype.destory = function() {
                this.doc.removeEventListener('touchstart', this.listeners.touchstart);
                this.doc.removeEventListener('touchend', this.listeners.touchend);
                this.doc.removeEventListener('touchmove', this.listeners.touchmove);
                this.doc.removeEventListener('scroll', this.listeners.scroll);
            }

            // 监听click：
            // 在一般的wise中需要依赖$挂起click的监听
            // 当然也可以由业务方自己实现在跳转时拼接ck域的逻辑
            Ck.prototype.monitor = function() {
                var self = this;

                $('body').delegate(this.selector, 'click', function(event) {
                    self.config.debug && event.preventDefault()

                    var adNode = $(this);
                    var target = $(event.target);

                    while (target !== null && target[0].tagName.toLowerCase() !== 'a' && target !== adNode) {
                        target = target.parent();
                    }

                    if (target === null) {
                        return false;
                    }

                    var href = target.attr('href');
                    var imTimeSign = target.attr(self.configDataProps.imTimeSign);

                    // a标签上的imTimeSign优先级高
                    if (new RegExp('\\d+').test(imTimeSign)) {
                        self.currentImTimeSign = parseInt(imTimeSign, 10);
                    }// ck实例化时配置的imTimeSign优先级低
                    else if (self.imTimeSign !== null) {
                        self.currentImTimeSign = self.imTimeSign;
                    } else {
                        throw new Error('imTimeSign not found!');
                    }

                    if (target[0].tagName.toLowerCase() === 'a' && href && href.length) {
                        self.config.debug ? console.log(self.addCkOnUrl(href)) : target.attr('href', self.addCkOnUrl(href));
                    }
                });
            }

            CkObj = Ck;
        }
        )();

        // 线上地址
        // eslint-disable-next-line
        var afdLog = new Bdbox.monitor('https://als.baidu.com/clog/clog',{});

        // 线下联调地址
        // eslint-disable-next-line
        // var afdLog = new Bdbox.monitor('http://feedsystemtest.als.nativeads-afd.otp.baidu.com/clog/clog', {});

        var callbacks = [];
        var loadResult;
        var preparedData;
        var stopLogging;
        // 判断当前的系统
        var os;
        if (Bdbox.$isAndroid()) {
            os = 2;
        } else if (Bdbox.$isIOS()) {
            os = 1;
        } else {
            os = 0;
        }
        // 打点中，不同类型的事件对应的id
        var types = {
            'SHOW': 3,
            'CLICK': 2,
            'EMPTY': 3,
            'CLOSE': 7,
            'ABANDON': 5
        };

        page.AFD = {
            onReady: function onReady(fn) {
                if (loadResult) {
                    fn();
                }
                callbacks.push(fn);
            },
            loadFinished: function loadFinished(result) {
                if (!loadResult) {
                    loadResult = result;
                    for (var i = 0; i < callbacks.length; i++) {
                        callbacks[i](result);
                    }
                } else {
                    console.warn('afd: loadResult set twice');
                }
            },
            sendLogReuqest: function(url) {
                var rnd = Math.floor(Math.random() * 0x80000000);

                var img = new Image(1,1);
                var imgName = '_box_mt' + rnd;
                window[imgName] = img;
                img.onload = img.onerror = img.onabort = function() {
                    // 设置为空函数
                    img.onload = img.onerror = img.onabort = null;
                    window[imgName] = null;
                }
                ;
                img.src = url + '&_rnd=' + rnd;
            },
            handleMonitorUrl: function handleMonitorUrl(urlList) {
                if (urlList && urlList.length) {
                    for (var i = 0; i < urlList.length; i++) {
                        this.sendLogReuqest(urlList[0].show_url);
                    }
                }
            },
            _getExtraParams: function getExtraParams(data) {
                if (data && data.length) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].k === 'extraParam') {
                            return data[i].v;
                        }
                    }
                }
                return '';
            },
            stopLogging: function() {
                stopLogging = true;
            },
            // 打点Wiki：http://wiki.baidu.com/pages/viewpage.action?pageId=273683972
            sendLog: function _sendLog(params) {
                // 抛弃打点只打一次
                if (stopLogging) {
                    return;
                }
                var extraInfo = typeof params.extInfo === 'function' ? params.extInfo() : params.extInfo;
                var ad = [];
                /* eslint-disable fecs-camelcase */
                var adParam = [{
                    da_type: types[params.eventType],
                    da_page: params.page,
                    da_page_num: 1,
                    da_locate: 1,
                    origin_time: Number(new Date()),
                    extra_param: this._getExtraParams(extraInfo)
                }];
                if (params.eventType === 'CLICK') {
                    adParam[0].da_area = params.area;
                }
                ad = JSON.stringify(adParam);
                var reportData = {
                    productId: 8,
                    _client_type: 1,
                    _os_type: os,
                    baiduId: Bdbox.utils.cookie.get('BAIDUID'),
                    ad
                }
                /* eslint-enable fecs-camelcase */
                console.log(reportData);
                afdLog.report(reportData)

            },
            // 禁止AFD广告加载，必须在广告加载前调用
            disAllow: function() {
                loadMat.allowed = false;
            },
            allow: function allow() {
                loadMat.allowed = true;
            },
            prepare: function prepared(options) {
                loadMat.prepared = true;
                preparedData = options;
            },
            init: function init() {
                if (loadMat.prepared && loadMat.allowed) {
                    var options = preparedData;
                    var $container = $(options.container);
                    // 为点击广告的行为添加ck字段，用于反作弊
                    var ck = new CkObj({
                        selector: options.selector,
                        DataProps: {
                            imTimeSign: 'data-im'
                        }
                    });
                    ck.defaultInit();

                    $container.on('click', function(e) {
                        if (e.target.className === 'close') {
                            options.onClose(e);
                            $container.hide();
                        } else {
                            var afdNode = $container.find('.afdNode');
                            var href = afdNode.data('href');
                            var imTimeSign = afdNode.attr(ck.configDataProps.imTimeSign);
                            var targetHref = ck.addCkOnUrl(href, parseInt(imTimeSign, 10));
                            var handlerResult = options.onClick(e);
                            if (handlerResult) {
                                setTimeout(function() {
                                    location.href = targetHref;
                                }, 200);
                            }
                            e.preventDefault();
                        }
                    });
                    $container.show();
                    if (!this.sentShowEvent) {
                        this.sentShowEvent = true;
                        options.onShow();
                    }
                    this.loadFinished({
                        result: 'success'
                    });
                    try {
                        this.handleMonitorUrl(options.rawData.data[0].monitor_url);
                    } catch (e) {
                        console.log('monitor url request error');
                    }
                }
            }
        }

    }, '50379e8');
});
_superframeJSLoader(function(o, e) {
    {
        var n = e.Bdbox;
        e.define,
        e.require
    }
    n.define("novel:js/detail", function(o, i, t, a) {
        function r(o) {
            var e = "hidden"
              , n = function() {
                "visible" === document.visibilityState && (o(),
                document.removeEventListener("visibilitychange", n))
            };
            e in document ? document.addEventListener("visibilitychange", n) : (e = "webkitHidden")in document && document.addEventListener("webkitvisibilitychange", n)
        }
        function d() {
            var o = {
                title: "详情页",
                url: "http://boxnovel.baidu.com/boxnovel/detail?action=novel&type=detail",
                method: "post",
                needParams: "1",
                pagetype: 1,
                args: "data=" + JSON.stringify({
                    gid: e.detailInfo.bookId,
                    fromaction: e.detailUtils.getFromAction("wise自动调起")
                }),
                toolbaricons: JSON.stringify({
                    toolids: ["3"]
                })
            };
            if (n.isBox && n.utils.version_compare(n.utils.getVersion(), "8.4") < 0 && (o.url = "https://mbd.baidu.com/searchbox?action=novel&type=detail"),
            e.Bdbox.isIOS)
                n.ios.invokeApp("novel", {
                    action: "openSubPage",
                    param: encodeURIComponent(JSON.stringify(o)),
                    minver: "5.4"
                });
            else if (e.Bdbox.isAndroid) {
                var i = "intent:#Intent;action=com.baidu.searchbox.action.NOVELDETAIL;S.key_request_method=post;S.key_request_url=" + encodeURIComponent(o.url) + ";B.key_need_params=true;S.key_request_postdata=" + encodeURIComponent(o.args) + ";S.key_novel_title=" + encodeURIComponent(o.title) + ';S.toolbaricons={"toolids":["3"]};end'
                  , t = "0"
                  , a = n.isLiteBox ? "19464192" : "25165824";
                n.isLiteBox ? n.android.invokeApp("Bdbox_android_novel", "startNovelCommand", [JSON.stringify({
                    mode: t,
                    "class": "com.baidu.searchbox.discovery.novel.DiscoveryNovelDetailActivity",
                    min_v: a,
                    intent: i,
                    type: "command"
                })]) : n.android.command(t, i, void 0, a)
            }
            (e.Bdbox.$isBox() || n.isLiteBox) && e.detailInfo.isGenuine && r(function() {
                function o() {
                    i++,
                    n.ios.invokeApp("apppage", {
                        action: "closeSearchFrame",
                        param: "",
                        minver: "8.2.0.0"
                    }),
                    n.ios.invokeApp("apppage", {
                        action: "openPage",
                        param: '{"pageid":"homepage"}',
                        minver: "8.2.0.0"
                    }),
                    10 > i && setTimeout(o, 30)
                }
                if (window.history && 1 !== window.history.length)
                    return void window.history.go(-1);
                if (e.Bdbox.isIOS) {
                    var i = 0;
                    setTimeout(o, 30)
                } else
                    e.Bdbox.isAndroid && n.android.invokeApp("Bdbox_android_utils", "closeWindow", [])
            })
        }
        var a = e.Zepto
          , l = e.Pagelet
          , s = e.detailInfo
          , c = a("#detail")
          , p = (a("#J-novelHolder"),
        a("#J-origin"))
          , f = function() {
            for (var o = location.search.substr(1), e = {}, n = o.length ? o.split("&") : [], i = null, t = n.length, a = 0; t > a; a++) {
                i = n[a].split("=");
                var r = i[0]
                  , d = i[1];
                r && (e[r] = d)
            }
            return e
        }
          , u = {
            testClick: function(o) {
                var e = "http://tg.ewan.cn/downapp.jsp?aid=10437&pid=102217&plat=1"
                  , n = o.attr("class")
                  , i = new Image;
                i.src = "//m.baidu.com/tcbox?service=bdbox&action=pblog&ctv=2&cen=uid_ua_ut&data=%7B%22appid%22%3A%221%22%2C%22dataid%22%3A%222%22%2C%22actiontype%22%3A%221%22%2C%22actionid%22%3A%222%22%2C%22actiondata%22%3A%7B%22evtType%22%3A%22" + n + "%22%7D%2C%22cateid%22%3A8%7D&_rnd=" + Date.now(),
                setTimeout(function() {
                    location.href = e
                }, 200)
            }
        }
          , m = new l("detail",c,u);
        a.extend(m, {
            init: function(o) {
                e.detailInfo = this.detailInfo = o;
                var i = n.utils.queryToJson(location.search);
                e.detailInfo.isGenuine && (n.isLiteBox ? d() : n.isBox && (n.utils.version_compare(n.utils.getVersion(), "10.4.0.0") >= 0 ? (window.screenLockCallback = function(o) {
                    var e = !1;
                    try {
                        var n = JSON.parse(o);
                        "0" === n.status && n.data && n.data.ScreenLocked && (e = !0)
                    } catch (i) {}
                    e || d()
                }
                ,
                n.ios.invokeApp("v22/utils/hasScreenLocked", {
                    callback: "screenLockCallback"
                })) : d())),
                e.detailUtils.isSupportFlex() || document.body.classList.add("noFlex"),
                "http:" === location.protocol ? (this.tokenUrl = "http://novelapi.m.baidu.com/cpbookmark/token?uid=",
                this.bookmarkUrl = "http://novelapi.m.baidu.com/cpbookmark/get?novel_id=") : (this.tokenUrl = "https://gsp0.baidu.com/8rkUaTKpBA63nBGko9WTAnF6hhy/cpbookmark/token?uid=",
                this.bookmarkUrl = "https://gsp0.baidu.com/8rkUaTKpBA63nBGko9WTAnF6hhy/cpbookmark/get?novel_id="),
                p.attr("href", o.dir_url);
                var t = this;
                if (!n.utils.cookie.get(o.uid)) {
                    var a = new Date;
                    a.setDate(a.getDate() + 1),
                    a.setTime(a.getTime() + 1),
                    a.setHours(0),
                    a.setMinutes(0),
                    a.setSeconds(0),
                    n.utils.cookie.set(o.uid, !0, a),
                    +f().from_feed ? t.log("uv", {
                        gid: o.bookId,
                        isGenuine: o.isGenuine,
                        uid: o.uid,
                        from_feed: !0
                    }) : t.log("uv", {
                        gid: o.bookId,
                        isGenuine: o.isGenuine,
                        uid: o.uid
                    })
                }
                +f().from_feed ? t.log("totalPV", {
                    gid: o.bookId,
                    isGenuine: o.isGenuine,
                    uid: o.uid,
                    from_feed: !0
                }) : t.log("totalPV", {
                    gid: o.bookId,
                    isGenuine: o.isGenuine,
                    uid: o.uid
                }),
                this.processLegalIds(o);
                var r = i.cid ? "content" : "detail";
                e.Logger && e.Logger.pageView({
                    pageName: r,
                    from: i.from,
                    ext: {
                        gid: i.gid,
                        cid: i.cid,
                        isGenuine: o.isGenuine,
                        saveContent: "1" === o.saveContent,
                        traceLog: o.traceLog
                    }
                }),
                e.Logger && e.Logger.logClick({
                    selector: "data-log",
                    extField: "data-ext-param"
                })
            },
            processLegalIds: function(o) {
                var e = o.lgids || [];
                if (n.isIOS && n.isBox) {
                    if (n.utils.version_compare(n.utils.getVersion(), "8.0") > 0) {
                        for (var i = e.length, t = 0; i > t; t++)
                            if (e[t].public_platform.indexOf("1.9") >= 0) {
                                this.detailInfo.lgid = e[t].book_id;
                                break
                            }
                    } else
                        for (var i = e.length, t = 0; i > t; t++)
                            if (e[t].public_platform.indexOf("1.1") >= 0) {
                                this.detailInfo.lgid = e[t].book_id;
                                break
                            }
                } else if (n.isIOS && !n.isBox) {
                    for (var i = e.length, t = 0; i > t; t++)
                        if (e[t].public_platform.indexOf("1.1") >= 0) {
                            this.detailInfo.lgid = e[t].book_id;
                            break
                        }
                    if (!this.detailInfo.lgid)
                        for (var i = e.length, t = 0; i > t; t++)
                            if (e[t].public_platform.indexOf("1.9") >= 0) {
                                this.detailInfo.lgid = e[t].book_id;
                                break
                            }
                } else if (n.isAndroid)
                    for (var i = e.length, t = 0; i > t; t++)
                        if (e[t].public_platform.indexOf("2.1") >= 0) {
                            this.detailInfo.lgid = e[t].book_id;
                            break
                        }
                this.detailInfo.lgid || (n.isBox ? (a(".rest-view  .invoke.global-btn.btn-offline").hide(),
                a('.toolbar-action a[data-function="offline"]').hide(),
                a(".toolbar-action a").css("width", "50%")) : (a(".rest-view  .invoke.global-btn.btn-offline").text("获取书架,持续畅读!"),
                a('.toolbar-action a[data-function="offline"]').text("私人书架")))
            },
            getToken: function() {
                var o = this;
                if (s.uid) {
                    var e = o.tokenUrl + o.detailInfo.uid + "&novel_id=" + o.detailInfo.bookId + "&cp_id=" + o.detailInfo.cpId;
                    a.ajax({
                        type: "get",
                        url: e,
                        crossDomain: !0,
                        dataType: "json",
                        xhrFields: {
                            withCredentials: !0
                        },
                        success: function(e) {
                            o.token = e.token,
                            o.getBookmark()
                        }
                    })
                }
            },
            getBookmark: function() {
                var o = this
                  , e = o.bookmarkUrl + o.detailInfo.bookId + "&uid=" + o.detailInfo.uid;
                a.ajax({
                    type: "get",
                    url: e,
                    crossDomain: !0,
                    dataType: "json",
                    xhrFields: {
                        withCredentials: !0
                    },
                    success: function(e) {
                        e.token = o.token,
                        o.fire("getBookmark", e)
                    }
                })
            },
            startOffline: function() {
                var o = this
                  , e = {
                    gid: this.detailInfo.bookId,
                    cpsrc: encodeURIComponent(this.detailInfo.dirUrl)
                };
                o.log("offlineBtnClick"),
                n.monitor.hm("event", ["offlineBtnClick", "click", n.os.name]);
                var i = {
                    title: "书籍详情",
                    url: location.protocol + "//m.baidu.com/searchbox?action=novel&type=detail&src=" + encodeURIComponent(this.detailInfo.dirUrl),
                    method: "post",
                    needParams: "1",
                    pagetype: 1,
                    args: "data=" + JSON.stringify(e)
                };
                n.isBox ? (n.isIOS && this.openIosDetail(i),
                n.isAndroid && this.openAndroidDetail(i)) : n.isIOS ? this.openOutBoxIosDetail(i) : this.openOutBoxAndroidDetail(i)
            },
            openIosDetail: function(o) {
                var e = this;
                n.ios.invokeApp("novel", {
                    action: "openSubPage",
                    param: encodeURIComponent(JSON.stringify(o)),
                    minver: "5.4.5"
                }, function(o) {
                    o && e.startDownloadApp()
                })
            },
            openAndroidDetail: function(o) {
                try {
                    n.android.invokeApp("Bdbox_android_novel", "openSubPage", [JSON.stringify(o)])
                } catch (e) {
                    this.startDownloadApp()
                }
            },
            openOutBoxIosDetail: function(o) {
                var e = this
                  , i = "baiduboxapp://novel?action=openSubPage&param=" + encodeURIComponent(JSON.stringify(o)) + "&minver=5.4.5.0";
                n.schema(i, function(o) {
                    o && e.startDownloadApp()
                })
            },
            openOutBoxAndroidDetail: function(o) {
                var e = this
                  , i = "#Intent;action=com.baidu.searchbox.action.NOVELDETAIL;S.key_request_method=post;S.key_request_url=" + encodeURIComponent(o.url) + ";B.key_need_params=true;S.key_request_postdata=" + encodeURIComponent(o.args) + ";S.key_novel_title=" + encodeURIComponent(o.title) + ";end"
                  , t = new n.moplus(5.3);
                t.sendIntent(i, function(o) {
                    "object" == typeof o && (20 === +o.error || 33 === +o.error || 233 === +o.error,
                    e.startDownloadApp())
                }, {
                    needlog: 0,
                    source: "wise_novel",
                    minver: 6.9
                })
            },
            startDownloadApp: function() {
                var o = this;
                pblog("init", [21]),
                o.log("startDownloadApp"),
                n.monitor.hm("event", ["startDownloadApp", "show", n.os.name]),
                this.dialog.showConfirm({
                    title: "离线整本小说",
                    content: "使用最新版百度App，未安装请下载",
                    callback: function(e) {
                        e ? o.downloadApp() : (o.log("cancelDownloadApp"),
                        n.monitor.hm("event", ["cancelDownloadApp", "click", n.os.name]))
                    }
                })
            },
            downloadApp: function() {
                this.log("downloadApp"),
                n.monitor.hm("event", ["downloadApp", "click", n.os.name]);
                var o = n.isIOS ? "https://itunes.apple.com/cn/app/id382201985?mt=8" : "http://dl.ops.baidu.com/baidusearch_AndroidPhone_1010750b.apk";
                setTimeout(function() {
                    location.href = o
                }, 300)
            },
            openNovel: function() {
                var o = this.detailInfo.lgid
                  , i = e.detailUtils.getLitePkgUrl({
                    pos: "wise_content_offline",
                    from: "1020155w",
                    channel: "1021345t"
                });
                if (o) {
                    var t = {
                        gid: o,
                        cpsrc: encodeURIComponent(this.detailInfo.dirUrl),
                        offline: 1
                    }
                      , a = {
                        title: "书籍详情",
                        url: "https://boxnovel.baidu.com/boxnovel/detail?action=novel&type=detail&src=" + t.cpsrc,
                        method: "post",
                        needParams: "1",
                        pagetype: 1,
                        args: "data=" + JSON.stringify(t)
                    }
                      , r = "baiduboxapp://novel?action=openSubPage&param=" + encodeURIComponent(JSON.stringify(a)) + "&minver=5.4.5.0"
                      , d = {
                        mode: "0",
                        intent: "intent:#Intent;action=com.baidu.searchbox.action.NOVELDETAIL;S.key_request_method=post;S.key_request_url=" + encodeURIComponent(a.url) + ";B.key_need_params=true;S.key_request_postdata=" + encodeURIComponent(a.args) + ";S.key_novel_title=" + encodeURIComponent(a.title) + ";end",
                        min_v: "25165824"
                    };
                    if (n.isBox)
                        n.isIOS ? n.ios.invokeApp("novel", {
                            action: "openSubPage",
                            param: encodeURIComponent(JSON.stringify(a)),
                            minver: "5.4"
                        }) : n.android.invokeApp("Bdbox_android_novel", "openSubPage", [JSON.stringify(a)]);
                    else {
                        var l = {
                            iosScheme: r,
                            androidCommand: d,
                            from: "1020155w",
                            channel: "1020155z",
                            failUrl: i,
                            failCallback: function() {
                                window.location.href = i
                            }
                        };
                        n.isAndroid && (l.failUrl = i,
                        l.failCallback = function() {
                            window.location.href = i
                        }
                        );
                        var s = window.OpenBox();
                        s.open()
                    }
                } else if (!n.isBox) {
                    var c = {
                        url: location.href,
                        from: "1020155w",
                        channel: "1020155z"
                    };
                    n.isAndroid && (c.failUrl = i,
                    c.failCallback = function() {
                        location.href = i
                    }
                    );
                    var s = window.OpenBox({
                        url: location.href,
                        from: "1020155w",
                        channel: "1020155z",
                        failUrl: i,
                        failCallback: function() {
                            location.href = i
                        }
                    });
                    s.open()
                }
            }
        }),
        m.on("chapterContent.init", function() {
            m.showChapterContent()
        }),
        m.on("chapterInfo.init", function(o) {
            m.fire("getFirstChapter", o)
        }),
        m.on("chapterInfo.getToken", function() {}),
        m.on("bookInfo.getChapterContent", function(o) {
            m.fire("getChapterContent", o)
        }),
        m.on("chapterInfo.getChapterContent", function(o) {
            m.fire("getChapterContent", o)
        }),
        m.on("toolbar.startOffline", function() {
            m.openNovel()
        }),
        m.on("bookInfo.startOffline", function() {
            m.openNovel()
        }),
        m.on("contentInfo.showDetailInfo", function() {
            m.fire("showDetailInfo")
        }),
        m.on("contentInfo.showResource", function() {
            m.fire("showResource")
        }),
        m.on("toolbar.showDetailInfo", function() {
            m.fire("hideChapterContent"),
            m.fire("showDetailInfo")
        }),
        m.on("chapterContent.showDetailInfo", function() {
            m.fire("showDetailInfo")
        }),
        m.on("toolbar.changeSource", function(o) {
            m.fire("changeSource", o)
        }),
        m.on("contentInfo.setStyle", function() {
            m.fire("setStyle")
        }),
        t.exports = m
    }, "b8358bd")
});
