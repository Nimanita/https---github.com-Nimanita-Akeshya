!function(e) {
    var t = {};
    function n(r) {
        if (t[r])
            return t[r].exports;
        var a = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(a.exports, a, a.exports, n),
        a.l = !0,
        a.exports
    }
    n.m = e,
    n.c = t,
    n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        })
    }
    ,
    n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    n.t = function(e, t) {
        if (1 & t && (e = n(e)),
        8 & t)
            return e;
        if (4 & t && "object" == typeof e && e && e.__esModule)
            return e;
        var r = Object.create(null);
        if (n.r(r),
        Object.defineProperty(r, "default", {
            enumerable: !0,
            value: e
        }),
        2 & t && "string" != typeof e)
            for (var a in e)
                n.d(r, a, function(t) {
                    return e[t]
                }
                .bind(null, a));
        return r
    }
    ,
    n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return n.d(t, "a", t),
        t
    }
    ,
    n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    n.p = "/",
    n(n.s = 2)
}([, , function(e, t, n) {
    e.exports = n(3)
}
, function(e, t, n) {
    "use strict";
    function r(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1,
            r.configurable = !0,
            "value"in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r)
        }
    }
    n.r(t);
    new (function() {
        function e() {
            !function(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }(this, e),
            this.registerEventListeners()
        }
        var t, n, a;
        return t = e,
        (n = [{
            key: "registerEventListeners",
            value: function() {
                var e = this
                  , t = document.querySelectorAll(".purecounter");
                if (this.intersectionListenerSupported())
                    for (var n = new IntersectionObserver(this.animateElements.bind(this),{
                        root: null,
                        rootMargin: "20px",
                        threshold: .5
                    }), r = 0; r < t.length; r++)
                        n.observe(t[r]);
                else
                    window.addEventListener && (this.animateLegacy(t),
                    window.addEventListener("scroll", function(n) {
                        e.animateLegacy(t)
                    }, {
                        passive: !0
                    }))
            }
        }, {
            key: "animateLegacy",
            value: function(e) {
                for (var t = 0; t < e.length; t++) {
                    !0 === this.parseConfig(e[t]).legacy && this.elementIsInView(e[t]) && this.animateElements([e[t]])
                }
            }
        }, {
            key: "animateElements",
            value: function(e, t) {
                var n = this;
                e.forEach(function(e) {
                    var r = void 0 !== e.target ? n.parseConfig(e.target) : n.parseConfig(e);
                    return r.duration <= 0 ? e.innerHTML = r.end.toFixed(r.decimals) : !t && !n.elementIsInView(e) || t && e.intersectionRatio < .5 ? e.target.innerHTML = r.start > r.end ? r.end : r.start : void setTimeout(function() {
                        return void 0 !== e.target ? n.startCounter(e.target, r) : n.startCounter(e, r)
                    }, r.delay)
                })
            }
        }, {
            key: "startCounter",
            value: function(e, t) {
                var n = this
                  , r = (t.end - t.start) / (t.duration / t.delay)
                  , a = "inc";
                t.start > t.end && (a = "dec",
                r *= -1),
                r < 1 && t.decimals <= 0 && (r = 1);
                var i = t.decimals <= 0 ? parseInt(t.start) : parseFloat(t.start).toFixed(t.decimals);
                e.innerHTML = i,
                !0 === t.once && e.setAttribute("data-purecounter-duration", 0);
                var o = setInterval(function() {
                    var s = n.nextNumber(i, r, t, a);
                    e.innerHTML = n.formatNumber(s, t),
                    ((i = s) >= t.end && "inc" == a || i <= t.end && "dec" == a) && (clearInterval(o),
                    i != t.end && (e.innerHTML = t.decimals <= 0 ? parseInt(t.end) : parseFloat(t.end).toFixed(t.decimals)))
                }, t.delay)
            }
        }, {
            key: "parseConfig",
            value: function(e) {
                for (var t = [].filter.call(e.attributes, function(e) {
                    return /^data-purecounter-/.test(e.name)
                }), n = {
                    start: 0,
                    end: 9001,
                    duration: 2e3,
                    delay: 10,
                    once: !0,
                    decimals: 0,
                    legacy: !0
                }, r = 0; r < t.length; r++) {
                    var a = t[r].name.replace("data-purecounter-", "");
                    n[a.toLowerCase()] = "duration" == a.toLowerCase() ? parseInt(1e3 * this.castDataType(t[r].value)) : this.castDataType(t[r].value)
                }
                return n
            }
        }, {
            key: "nextNumber",
            value: function(e, t, n, r) {
                return r || (r = "inc"),
                "inc" === r ? n.decimals <= 0 ? parseInt(e) + parseInt(t) : parseFloat(e) + parseFloat(t) : n.decimals <= 0 ? parseInt(e) - parseInt(t) : parseFloat(e) - parseFloat(t)
            }
        }, {
            key: "formatNumber",
            value: function(e, t) {
                return t.decimals <= 0 ? parseInt(e) : e.toLocaleString(void 0, {
                    minimumFractionDigits: t.decimals,
                    maximumFractionDigits: t.decimals
                })
            }
        }, {
            key: "castDataType",
            value: function(e) {
                return /^[0-9]+\.[0-9]+$/.test(e) ? parseFloat(e) : /^[0-9]+$/.test(e) ? parseInt(e) : e
            }
        }, {
            key: "elementIsInView",
            value: function(e) {
                for (var t = e.offsetTop, n = e.offsetLeft, r = e.offsetWidth, a = e.offsetHeight; e.offsetParent; )
                    t += (e = e.offsetParent).offsetTop,
                    n += e.offsetLeft;
                return t >= window.pageYOffset && n >= window.pageXOffset && t + a <= window.pageYOffset + window.innerHeight && n + r <= window.pageXOffset + window.innerWidth
            }
        }, {
            key: "intersectionListenerSupported",
            value: function() {
                return "IntersectionObserver"in window && "IntersectionObserverEntry"in window && "intersectionRatio"in window.IntersectionObserverEntry.prototype
            }
        }]) && r(t.prototype, n),
        a && r(t, a),
        e
    }())
}
]);
