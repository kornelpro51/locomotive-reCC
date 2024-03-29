/*Copyright (c), 2011 Sanford, L.P. All Rights Reserved.*/
(function () {
    function i(a) {
        throw a;
    }

    var l = true, m = null, n = false;

    function aa(a) {
        return function () {
            return this[a]
        }
    }

    var p, q = this;

    function s(a, b, c) {
        a = a.split(".");
        c = c || q;
        !(a[0]in c) && c.execScript && c.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift());)if (!a.length && b !== undefined)c[d] = b; else c = c[d] ? c[d] : c[d] = {}
    }

    function ba(a, b) {
        for (var c = a.split("."), d = b || q, e; e = c.shift();)if (d[e])d = d[e]; else return m;
        return d
    }

    function ca() {
    }

    function da(a) {
        var b = typeof a;
        if (b == "object")if (a) {
            if (a instanceof Array || !(a instanceof Object) && Object.prototype.toString.call(a) == "[object Array]" || typeof a.length == "number" && typeof a.splice != "undefined" && typeof a.propertyIsEnumerable != "undefined" && !a.propertyIsEnumerable("splice"))return"array";
            if (!(a instanceof Object) && (Object.prototype.toString.call(a) == "[object Function]" || typeof a.call != "undefined" && typeof a.propertyIsEnumerable != "undefined" && !a.propertyIsEnumerable("call")))return"function"
        } else return"null";
        else if (b == "function" && typeof a.call == "undefined")return"object";
        return b
    }

    function u(a) {
        return da(a) == "array"
    }

    function v(a) {
        var b = da(a);
        return b == "array" || b == "object" && typeof a.length == "number"
    }

    function w(a) {
        return typeof a == "string"
    }

    function x(a) {
        return da(a) == "function"
    }

    function ea(a) {
        a = da(a);
        return a == "object" || a == "array" || a == "function"
    }

    function y(a) {
        return a[fa] || (a[fa] = ++ga)
    }

    var fa = "closure_uid_" + Math.floor(Math.random() * 2147483648).toString(36), ga = 0;

    function ha(a, b) {
        var c = b || q;
        if (arguments.length > 2) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function () {
                var e = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(e, d);
                return a.apply(c, e)
            }
        } else return function () {
            return a.apply(c, arguments)
        }
    }

    var ia = Date.now || function () {
        return+new Date
    };

    function z(a, b) {
        function c() {
        }

        c.prototype = b.prototype;
        a.V = b.prototype;
        a.prototype = new c
    };
    function ja(a) {
        this.stack = Error().stack || "";
        if (a)this.message = String(a)
    }

    z(ja, Error);
    ja.prototype.name = "CustomError";
    function ka(a) {
        for (var b = 1; b < arguments.length; b++) {
            var c = String(arguments[b]).replace(/\$/g, "$$$$");
            a = a.replace(/\%s/, c)
        }
        return a
    }

    var la = /^[a-zA-Z0-9\-_.!~*'()]*$/;

    function ma(a) {
        a = String(a);
        if (!la.test(a))return encodeURIComponent(a);
        return a
    }

    function na(a, b) {
        if (b)return a.replace(oa, "&amp;").replace(pa, "&lt;").replace(qa, "&gt;").replace(ra, "&quot;"); else {
            if (!sa.test(a))return a;
            if (a.indexOf("&") != -1)a = a.replace(oa, "&amp;");
            if (a.indexOf("<") != -1)a = a.replace(pa, "&lt;");
            if (a.indexOf(">") != -1)a = a.replace(qa, "&gt;");
            if (a.indexOf('"') != -1)a = a.replace(ra, "&quot;");
            return a
        }
    }

    var oa = /&/g, pa = /</g, qa = />/g, ra = /\"/g, sa = /[&<>\"]/;

    function ta() {
        return Array.prototype.join.call(arguments, "")
    }

    function ua(a, b) {
        for (var c = 0, d = String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), e = String(b).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), f = Math.max(d.length, e.length), g = 0; c == 0 && g < f; g++) {
            var h = d[g] || "", j = e[g] || "", k = RegExp("(\\d*)(\\D*)", "g"), o = RegExp("(\\d*)(\\D*)", "g");
            do {
                var r = k.exec(h) || ["", "", ""], t = o.exec(j) || ["", "", ""];
                if (r[0].length == 0 && t[0].length == 0)break;
                c = va(r[1].length == 0 ? 0 : parseInt(r[1], 10), t[1].length == 0 ? 0 : parseInt(t[1], 10)) || va(r[2].length == 0, t[2].length == 0) || va(r[2], t[2])
            } while (c ==
                0)
        }
        return c
    }

    function va(a, b) {
        if (a < b)return-1; else if (a > b)return 1;
        return 0
    };
    function wa(a, b) {
        b.unshift(a);
        ja.call(this, ka.apply(m, b));
        b.shift();
        this.nc = a
    }

    z(wa, ja);
    wa.prototype.name = "AssertionError";
    function xa(a, b) {
        if (!a) {
            var c = Array.prototype.slice.call(arguments, 2), d = "Assertion failed";
            if (b) {
                d += ": " + b;
                var e = c
            }
            i(new wa("" + d, e || []))
        }
        return a
    }

    function ya(a) {
        i(new wa("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1)))
    };
    function za(a, b, c) {
        for (var d in a)b.call(c, a[d], d, a)
    }

    function Aa(a) {
        var b = [], c = 0, d;
        for (d in a)b[c++] = a[d];
        return b
    }

    function Ba(a) {
        var b = [], c = 0, d;
        for (d in a)b[c++] = d;
        return b
    }

    var Ca = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];

    function Da(a) {
        for (var b, c, d = 1; d < arguments.length; d++) {
            c = arguments[d];
            for (b in c)a[b] = c[b];
            for (var e = 0; e < Ca.length; e++) {
                b = Ca[e];
                if (Object.prototype.hasOwnProperty.call(c, b))a[b] = c[b]
            }
        }
    };
    var A = Array.prototype, Ea = A.indexOf ? function (a, b, c) {
        xa(a.length != m);
        return A.indexOf.call(a, b, c)
    } : function (a, b, c) {
        c = c == m ? 0 : c < 0 ? Math.max(0, a.length + c) : c;
        if (w(a)) {
            if (!w(b) || b.length != 1)return-1;
            return a.indexOf(b, c)
        }
        for (c = c; c < a.length; c++)if (c in a && a[c] === b)return c;
        return-1
    }, Fa = A.forEach ? function (a, b, c) {
        xa(a.length != m);
        A.forEach.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e = w(a) ? a.split("") : a, f = 0; f < d; f++)f in e && b.call(c, e[f], f, a)
    };

    function Ga(a, b, c, d) {
        if (a.reduce)return d ? a.reduce(ha(b, d), c) : a.reduce(b, c);
        var e = c;
        Fa(a, function (f, g) {
            e = b.call(d, e, f, g, a)
        });
        return e
    }

    function Ha(a, b) {
        xa(a.length != m);
        return A.splice.call(a, b, 1).length == 1
    }

    function Ia() {
        return A.concat.apply(A, arguments)
    }

    function Ja(a) {
        if (u(a))return Ia(a); else {
            for (var b = [], c = 0, d = a.length; c < d; c++)b[c] = a[c];
            return b
        }
    }

    function Ka(a) {
        for (var b = 1; b < arguments.length; b++) {
            var c = arguments[b], d;
            if (u(c) || (d = v(c)) && c.hasOwnProperty("callee"))a.push.apply(a, c); else if (d)for (var e = a.length, f = c.length, g = 0; g < f; g++)a[e + g] = c[g]; else a.push(c)
        }
    }

    function La(a, b, c) {
        xa(a.length != m);
        return arguments.length <= 2 ? A.slice.call(a, b) : A.slice.call(a, b, c)
    };
    function Ma() {
    }

    Ma.prototype.Va = n;
    Ma.prototype.D = function () {
        if (!this.Va) {
            this.Va = l;
            this.n()
        }
    };
    Ma.prototype.n = function () {
    };
    function Na(a) {
        if (typeof a.M == "function")return a.M();
        if (w(a))return a.split("");
        if (v(a)) {
            for (var b = [], c = a.length, d = 0; d < c; d++)b.push(a[d]);
            return b
        }
        return Aa(a)
    }

    function Oa(a, b, c) {
        if (typeof a.forEach == "function")a.forEach(b, c); else if (v(a) || w(a))Fa(a, b, c); else {
            var d;
            if (typeof a.G == "function")d = a.G(); else if (typeof a.M != "function")if (v(a) || w(a)) {
                d = [];
                for (var e = a.length, f = 0; f < e; f++)d.push(f);
                d = d
            } else d = Ba(a); else d = void 0;
            e = Na(a);
            f = e.length;
            for (var g = 0; g < f; g++)b.call(c, e[g], d && d[g], a)
        }
    };
    var Pa = "StopIteration"in q ? q.StopIteration : Error("StopIteration");

    function Qa() {
    }

    Qa.prototype.next = function () {
        i(Pa)
    };
    Qa.prototype.ra = function () {
        return this
    };
    function Ra(a) {
        if (a instanceof Qa)return a;
        if (typeof a.ra == "function")return a.ra(n);
        if (v(a)) {
            var b = 0, c = new Qa;
            c.next = function () {
                for (; ;) {
                    if (b >= a.length)i(Pa);
                    if (b in a)return a[b++]; else b++
                }
            };
            return c
        }
        i(Error("Not implemented"))
    }

    function Sa(a, b, c) {
        if (v(a))try {
            Fa(a, b, c)
        } catch (d) {
            if (d !== Pa)i(d)
        } else {
            a = Ra(a);
            try {
                for (; ;)b.call(c, a.next(), undefined, a)
            } catch (e) {
                if (e !== Pa)i(e)
            }
        }
    };
    function Ta(a) {
        this.p = {};
        this.i = [];
        var b = arguments.length;
        if (b > 1) {
            if (b % 2)i(Error("Uneven number of arguments"));
            for (var c = 0; c < b; c += 2)this.w(arguments[c], arguments[c + 1])
        } else if (a) {
            if (a instanceof Ta) {
                b = a.G();
                c = a.M()
            } else {
                b = Ba(a);
                c = Aa(a)
            }
            for (var d = 0; d < b.length; d++)this.w(b[d], c[d])
        }
    }

    p = Ta.prototype;
    p.c = 0;
    p.ha = 0;
    p.bb = aa("c");
    p.M = function () {
        Ua(this);
        for (var a = [], b = 0; b < this.i.length; b++)a.push(this.p[this.i[b]]);
        return a
    };
    p.G = function () {
        Ua(this);
        return this.i.concat()
    };
    p.C = function (a) {
        return Va(this.p, a)
    };
    p.clear = function () {
        this.p = {};
        this.ha = this.c = this.i.length = 0
    };
    p.remove = function (a) {
        if (Va(this.p, a)) {
            delete this.p[a];
            this.c--;
            this.ha++;
            this.i.length > 2 * this.c && Ua(this);
            return l
        }
        return n
    };
    function Ua(a) {
        if (a.c != a.i.length) {
            for (var b = 0, c = 0; b < a.i.length;) {
                var d = a.i[b];
                if (Va(a.p, d))a.i[c++] = d;
                b++
            }
            a.i.length = c
        }
        if (a.c != a.i.length) {
            var e = {};
            for (c = b = 0; b < a.i.length;) {
                d = a.i[b];
                if (!Va(e, d)) {
                    a.i[c++] = d;
                    e[d] = 1
                }
                b++
            }
            a.i.length = c
        }
    }

    p.o = function (a, b) {
        if (Va(this.p, a))return this.p[a];
        return b
    };
    p.w = function (a, b) {
        if (!Va(this.p, a)) {
            this.c++;
            this.i.push(a);
            this.ha++
        }
        this.p[a] = b
    };
    p.A = function () {
        return new Ta(this)
    };
    p.ra = function (a) {
        Ua(this);
        var b = 0, c = this.i, d = this.p, e = this.ha, f = this, g = new Qa;
        g.next = function () {
            for (; ;) {
                if (e != f.ha)i(Error("The map has changed since the iterator was created"));
                if (b >= c.length)i(Pa);
                var h = c[b++];
                return a ? h : d[h]
            }
        };
        return g
    };
    function Va(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    };
    function C(a, b) {
        this.gb = b;
        this.L = [];
        if (a > this.gb)i(Error("[goog.structs.SimplePool] Initial cannot be greater than max"));
        for (var c = 0; c < a; c++)this.L.push(this.X())
    }

    z(C, Ma);
    p = C.prototype;
    p.J = m;
    p.Ua = m;
    function Wa(a) {
        if (a.L.length)return a.L.pop();
        return a.X()
    }

    function D(a, b) {
        a.L.length < a.gb ? a.L.push(b) : a.xa(b)
    }

    p.X = function () {
        return this.J ? this.J() : {}
    };
    p.xa = function (a) {
        if (this.Ua)this.Ua(a); else if (ea(a))if (x(a.D))a.D(); else for (var b in a)delete a[b]
    };
    p.n = function () {
        C.V.n.call(this);
        for (var a = this.L; a.length;)this.xa(a.pop());
        delete this.L
    };
    function Xa(a, b) {
        try {
            var c, d = ba("window.location.href");
            c = typeof a == "string" ? {message: a, name: "Unknown error", lineNumber: "Not available", fileName: d, stack: "Not available"} : !a.lineNumber || !a.fileName || !a.stack ? {message: a.message, name: a.name, lineNumber: a.lineNumber || a.lc || "Not available", fileName: a.fileName || a.filename || a.sourceURL || d, stack: a.stack || "Not available"} : a;
            return"Message: " + na(c.message) + '\nUrl: <a href="view-source:' + c.fileName + '" target="_new">' + c.fileName + "</a>\nLine: " + c.lineNumber + "\n\nBrowser stack:\n" +
                na(c.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + na(Ya(b) + "-> ")
        } catch (e) {
            return"Exception trying to expose exception! You win, we lose. " + e
        }
    }

    function Ya(a) {
        return Za(a || arguments.callee.caller, [])
    }

    function Za(a, b) {
        var c = [];
        if (Ea(b, a) >= 0)c.push("[...circular reference...]"); else if (a && b.length < 50) {
            c.push($a(a) + "(");
            for (var d = a.arguments, e = 0; e < d.length; e++) {
                e > 0 && c.push(", ");
                var f;
                f = d[e];
                switch (typeof f) {
                    case "object":
                        f = f ? "object" : "null";
                        break;
                    case "string":
                        f = f;
                        break;
                    case "number":
                        f = String(f);
                        break;
                    case "boolean":
                        f = f ? "true" : "false";
                        break;
                    case "function":
                        f = (f = $a(f)) ? f : "[fn]";
                        break;
                    default:
                        f = typeof f
                }
                if (f.length > 40)f = f.substr(0, 40) + "...";
                c.push(f)
            }
            b.push(a);
            c.push(")\n");
            try {
                c.push(Za(a.caller,
                    b))
            } catch (g) {
                c.push("[exception trying to get caller]\n")
            }
        } else a ? c.push("[...long stack...]") : c.push("[end]");
        return c.join("")
    }

    function $a(a) {
        a = String(a);
        if (!ab[a]) {
            var b = /function ([^\(]+)/.exec(a);
            ab[a] = b ? b[1] : "[Anonymous]"
        }
        return ab[a]
    }

    var ab = {};
    var bb = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([\\w\\d\\-\\u0100-\\uffff.%]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$");

    function cb(a, b) {
        if (a.indexOf("#") >= 0 || a.indexOf("?") >= 0)i(Error("goog.uri.utils: Fragment or query identifiers are not supported: [" + a + "]"));
        var c = a.length - 1;
        if (c >= 0 && a.indexOf("/", c) == c)a = a.substr(0, a.length - 1);
        if (b.lastIndexOf("/", 0) == 0)b = b.substr(1);
        return ta(a, "/", b)
    };
    function E(a, b) {
        var c;
        if (a instanceof E) {
            this.U(b == m ? a.u : b);
            db(this, a.v);
            eb(this, a.O);
            fb(this, a.t);
            gb(this, a.I);
            hb(this, a.q);
            ib(this, a.k.A());
            jb(this, a.K)
        } else if (a && (c = String(a).match(bb))) {
            this.U(!!b);
            db(this, c[1] || "", l);
            eb(this, c[2] || "", l);
            fb(this, c[3] || "", l);
            gb(this, c[4]);
            hb(this, c[5] || "", l);
            ib(this, c[6] || "", l);
            jb(this, c[7] || "", l)
        } else {
            this.U(!!b);
            this.k = new kb(m, this, this.u)
        }
    }

    p = E.prototype;
    p.v = "";
    p.O = "";
    p.t = "";
    p.I = m;
    p.q = "";
    p.K = "";
    p.Sb = n;
    p.u = n;
    p.toString = function () {
        if (this.m)return this.m;
        var a = [];
        this.v && a.push(lb(this.v, mb), ":");
        if (this.t) {
            a.push("//");
            this.O && a.push(lb(this.O, mb), "@");
            var b;
            b = this.t;
            b = w(b) ? encodeURIComponent(b) : m;
            a.push(b);
            this.I != m && a.push(":", String(this.I))
        }
        if (this.q) {
            this.t && this.q.charAt(0) != "/" && a.push("/");
            a.push(lb(this.q, nb))
        }
        (b = String(this.k)) && a.push("?", b);
        this.K && a.push("#", lb(this.K, ob));
        return this.m = a.join("")
    };
    p.A = function () {
        var a = this.v, b = this.O, c = this.t, d = this.I, e = this.q, f = this.k.A(), g = this.K, h = new E(m, this.u);
        a && db(h, a);
        b && eb(h, b);
        c && fb(h, c);
        d && gb(h, d);
        e && hb(h, e);
        f && ib(h, f);
        g && jb(h, g);
        return h
    };
    function db(a, b, c) {
        F(a);
        delete a.m;
        a.v = c ? pb(b) : b;
        if (a.v)a.v = a.v.replace(/:$/, "");
        return a
    }

    function eb(a, b, c) {
        F(a);
        delete a.m;
        a.O = c ? pb(b) : b;
        return a
    }

    function fb(a, b, c) {
        F(a);
        delete a.m;
        a.t = c ? pb(b) : b;
        return a
    }

    function gb(a, b) {
        F(a);
        delete a.m;
        if (b) {
            b = Number(b);
            if (isNaN(b) || b < 0)i(Error("Bad port number " + b));
            a.I = b
        } else a.I = m;
        return a
    }

    function hb(a, b, c) {
        F(a);
        delete a.m;
        a.q = c ? pb(b) : b;
        return a
    }

    function ib(a, b, c) {
        F(a);
        delete a.m;
        if (b instanceof kb) {
            a.k = b;
            a.k.ga = a;
            a.k.U(a.u)
        } else {
            c || (b = lb(b, qb));
            a.k = new kb(b, a, a.u)
        }
        return a
    }

    function rb(a, b, c) {
        F(a);
        delete a.m;
        u(c) || (c = [String(c)]);
        var d = a.k;
        b = b;
        c = c;
        G(d);
        sb(d);
        b = H(d, b);
        if (d.C(b)) {
            var e = d.d.o(b);
            if (u(e))d.c -= e.length; else d.c--
        }
        if (c.length > 0) {
            d.d.w(b, c);
            d.c += c.length
        }
        return a
    }

    function jb(a, b, c) {
        F(a);
        delete a.m;
        a.K = c ? pb(b) : b;
        return a
    }

    function F(a) {
        if (a.Sb)i(Error("Tried to modify a read-only Uri"))
    }

    p.U = function (a) {
        this.u = a;
        this.k && this.k.U(a)
    };
    function tb(a, b) {
        a instanceof E || (a = a instanceof E ? a.A() : new E(a, void 0));
        b instanceof E || (b = b instanceof E ? b.A() : new E(b, void 0));
        var c = a, d = b, e = c.A(), f = !!d.v;
        if (f)db(e, d.v); else f = !!d.O;
        if (f)eb(e, d.O); else f = !!d.t;
        if (f)fb(e, d.t); else f = d.I != m;
        var g = d.q;
        if (f)gb(e, d.I); else if (f = !!d.q) {
            if (g.charAt(0) != "/")if (c.t && !c.q)g = "/" + g; else {
                c = e.q.lastIndexOf("/");
                if (c != -1)g = e.q.substr(0, c + 1) + g
            }
            if (g == ".." || g == ".")g = ""; else if (!(g.indexOf("./") == -1 && g.indexOf("/.") == -1)) {
                c = g.lastIndexOf("/", 0) == 0;
                g = g.split("/");
                for (var h = [], j = 0; j < g.length;) {
                    var k = g[j++];
                    if (k == ".")c && j == g.length && h.push(""); else if (k == "..") {
                        if (h.length > 1 || h.length == 1 && h[0] != "")h.pop();
                        c && j == g.length && h.push("")
                    } else {
                        h.push(k);
                        c = l
                    }
                }
                g = h.join("/")
            }
        }
        if (f)hb(e, g); else f = d.k.toString() !== "";
        if (f) {
            c = d.k;
            if (!c.P)c.P = pb(c.toString());
            ib(e, c.P, void 0)
        } else f = !!d.K;
        f && jb(e, d.K);
        return e
    }

    function pb(a) {
        return a ? decodeURIComponent(a) : ""
    }

    var ub = /^[a-zA-Z0-9\-_.!~*'():\/;?]*$/;

    function lb(a, b) {
        var c = m;
        if (w(a)) {
            c = a;
            ub.test(c) || (c = encodeURI(a));
            if (c.search(b) >= 0)c = c.replace(b, vb)
        }
        return c
    }

    function vb(a) {
        a = a.charCodeAt(0);
        return"%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
    }

    var mb = /[#\/\?@]/g, nb = /[\#\?]/g, qb = /[\#\?@]/g, ob = /#/g;

    function kb(a, b, c) {
        this.B = a || m;
        this.ga = b || m;
        this.u = !!c
    }

    function G(a) {
        if (!a.d) {
            a.d = new Ta;
            if (a.B)for (var b = a.B.split("&"), c = 0; c < b.length; c++) {
                var d = b[c].indexOf("="), e = m, f = m;
                if (d >= 0) {
                    e = b[c].substring(0, d);
                    f = b[c].substring(d + 1)
                } else e = b[c];
                e = decodeURIComponent(e.replace(/\+/g, " "));
                e = H(a, e);
                a.add(e, f ? decodeURIComponent(f.replace(/\+/g, " ")) : "")
            }
        }
    }

    p = kb.prototype;
    p.d = m;
    p.c = m;
    p.bb = function () {
        G(this);
        return this.c
    };
    p.add = function (a, b) {
        G(this);
        sb(this);
        a = H(this, a);
        if (this.C(a)) {
            var c = this.d.o(a);
            u(c) ? c.push(b) : this.d.w(a, [c, b])
        } else this.d.w(a, b);
        this.c++;
        return this
    };
    p.remove = function (a) {
        G(this);
        a = H(this, a);
        if (this.d.C(a)) {
            sb(this);
            var b = this.d.o(a);
            if (u(b))this.c -= b.length; else this.c--;
            return this.d.remove(a)
        }
        return n
    };
    p.clear = function () {
        sb(this);
        this.d && this.d.clear();
        this.c = 0
    };
    p.C = function (a) {
        G(this);
        a = H(this, a);
        return this.d.C(a)
    };
    p.G = function () {
        G(this);
        for (var a = this.d.M(), b = this.d.G(), c = [], d = 0; d < b.length; d++) {
            var e = a[d];
            if (u(e))for (var f = 0; f < e.length; f++)c.push(b[d]); else c.push(b[d])
        }
        return c
    };
    p.M = function (a) {
        G(this);
        if (a) {
            a = H(this, a);
            if (this.C(a)) {
                var b = this.d.o(a);
                if (u(b))return b; else {
                    a = [];
                    a.push(b)
                }
            } else a = []
        } else {
            b = this.d.M();
            a = [];
            for (var c = 0; c < b.length; c++) {
                var d = b[c];
                u(d) ? Ka(a, d) : a.push(d)
            }
        }
        return a
    };
    p.w = function (a, b) {
        G(this);
        sb(this);
        a = H(this, a);
        if (this.C(a)) {
            var c = this.d.o(a);
            if (u(c))this.c -= c.length; else this.c--
        }
        this.d.w(a, b);
        this.c++;
        return this
    };
    p.o = function (a, b) {
        G(this);
        a = H(this, a);
        if (this.C(a)) {
            var c = this.d.o(a);
            return u(c) ? c[0] : c
        } else return b
    };
    p.toString = function () {
        if (this.B)return this.B;
        if (!this.d)return"";
        for (var a = [], b = 0, c = this.d.G(), d = 0; d < c.length; d++) {
            var e = c[d], f = ma(e);
            e = this.d.o(e);
            if (u(e))for (var g = 0; g < e.length; g++) {
                b > 0 && a.push("&");
                a.push(f);
                e[g] !== "" && a.push("=", ma(e[g]));
                b++
            } else {
                b > 0 && a.push("&");
                a.push(f);
                e !== "" && a.push("=", ma(e));
                b++
            }
        }
        return this.B = a.join("")
    };
    function sb(a) {
        delete a.P;
        delete a.B;
        a.ga && delete a.ga.m
    }

    p.A = function () {
        var a = new kb;
        if (this.P)a.P = this.P;
        if (this.B)a.B = this.B;
        if (this.d)a.d = this.d.A();
        return a
    };
    function H(a, b) {
        var c = String(b);
        if (a.u)c = c.toLowerCase();
        return c
    }

    p.U = function (a) {
        if (a && !this.u) {
            G(this);
            sb(this);
            Oa(this.d, function (b, c) {
                var d = c.toLowerCase();
                if (c != d) {
                    this.remove(c);
                    this.add(d, b)
                }
            }, this)
        }
        this.u = a
    };
    function wb(a) {
        var b;
        b = (b = a.className) && typeof b.split == "function" ? b.split(/\s+/) : [];
        var c;
        c = La(arguments, 1);
        for (var d = 0, e = 0; e < c.length; e++)if (!(Ea(b, c[e]) >= 0)) {
            b.push(c[e]);
            d++
        }
        c = d == c.length;
        a.className = b.join(" ");
        return c
    };
    var xb, yb, zb, Ab;

    function Bb() {
        return q.navigator ? q.navigator.userAgent : m
    }

    Ab = zb = yb = xb = n;
    var Cb;
    if (Cb = Bb()) {
        var Db = q.navigator;
        xb = Cb.indexOf("Opera") == 0;
        yb = !xb && Cb.indexOf("MSIE") != -1;
        zb = !xb && Cb.indexOf("WebKit") != -1;
        Ab = !xb && !zb && Db.product == "Gecko"
    }
    var Eb = xb, I = yb, Fb = Ab, Gb = zb, Hb = q.navigator, Ib = (Hb && Hb.platform || "").indexOf("Mac") != -1, Jb;
    a:{
        var Kb = "", Lb;
        if (Eb && q.opera) {
            var Mb = q.opera.version;
            Kb = typeof Mb == "function" ? Mb() : Mb
        } else {
            if (Fb)Lb = /rv\:([^\);]+)(\)|;)/; else if (I)Lb = /MSIE\s+([^\);]+)(\)|;)/; else if (Gb)Lb = /WebKit\/(\S+)/;
            if (Lb) {
                var Nb = Lb.exec(Bb());
                Kb = Nb ? Nb[1] : ""
            }
        }
        if (I) {
            var Ob, Pb = q.document;
            Ob = Pb ? Pb.documentMode : undefined;
            if (Ob > parseFloat(Kb)) {
                Jb = String(Ob);
                break a
            }
        }
        Jb = Kb
    }
    var Qb = {};

    function Rb(a) {
        return Qb[a] || (Qb[a] = ua(Jb, a) >= 0)
    };
    var Sb = !I || Rb("9"), Tb = I && !Rb("9");

    function Ub(a, b) {
        za(b, function (c, d) {
            if (d == "style")a.style.cssText = c; else if (d == "class")a.className = c; else if (d == "for")a.htmlFor = c; else if (d in Vb)a.setAttribute(Vb[d], c); else a[d] = c
        })
    }

    var Vb = {cellpadding: "cellPadding", cellspacing: "cellSpacing", colspan: "colSpan", rowspan: "rowSpan", valign: "vAlign", height: "height", width: "width", usemap: "useMap", frameborder: "frameBorder", type: "type"};

    function Wb() {
        var a = arguments, b = a[0], c = a[1];
        if (!Sb && c && (c.name || c.type)) {
            b = ["<", b];
            c.name && b.push(' name="', na(c.name), '"');
            if (c.type) {
                b.push(' type="', na(c.type), '"');
                var d = {};
                Da(d, c);
                c = d;
                delete c.type
            }
            b.push(">");
            b = b.join("")
        }
        b = document.createElement(b);
        if (c)if (w(c))b.className = c; else u(c) ? wb.apply(m, [b].concat(c)) : Ub(b, c);
        a.length > 2 && Xb(document, b, a, 2);
        return b
    }

    function Xb(a, b, c, d) {
        function e(g) {
            if (g)b.appendChild(w(g) ? a.createTextNode(g) : g)
        }

        for (d = d; d < c.length; d++) {
            var f = c[d];
            v(f) && !(ea(f) && f.nodeType > 0) ? Fa(Yb(f) ? Ja(f) : f, e) : e(f)
        }
    }

    function Zb(a) {
        for (var b; b = a.firstChild;)a.removeChild(b)
    }

    function $b(a) {
        return Gb ? a.document || a.contentWindow.document : a.contentDocument || a.contentWindow.document
    }

    function ac(a, b) {
        var c = [];
        bc(a, b, c, n);
        return c
    }

    function bc(a, b, c, d) {
        if (a != m)for (var e = 0, f; f = a.childNodes[e]; e++) {
            if (b(f)) {
                c.push(f);
                if (d)return l
            }
            if (bc(f, b, c, d))return l
        }
        return n
    }

    var cc = {SCRIPT: 1, STYLE: 1, HEAD: 1, IFRAME: 1, OBJECT: 1}, dc = {IMG: " ", BR: "\n"};

    function ec(a, b, c) {
        if (!(a.nodeName in cc))if (a.nodeType == 3)c ? b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : b.push(a.nodeValue); else if (a.nodeName in dc)b.push(dc[a.nodeName]); else for (a = a.firstChild; a;) {
            ec(a, b, c);
            a = a.nextSibling
        }
    }

    function Yb(a) {
        if (a && typeof a.length == "number")if (ea(a))return typeof a.item == "function" || typeof a.item == "string"; else if (x(a))return typeof a.item == "function";
        return n
    };
    function J(a) {
        if (typeof DOMParser != "undefined")return(new DOMParser).parseFromString(a, "application/xml"); else if (typeof ActiveXObject != "undefined") {
            var b = new ActiveXObject("MSXML2.DOMDocument");
            if (b) {
                b.resolveExternals = n;
                b.validateOnParse = n;
                try {
                    b.setProperty("ProhibitDTD", l);
                    b.setProperty("MaxXMLSize", 2048);
                    b.setProperty("MaxElementDepth", 256)
                } catch (c) {
                }
            }
            b.loadXML(a);
            return b
        }
        i(Error("Your browser does not support loading xml documents"))
    }

    function fc(a) {
        if (typeof XMLSerializer != "undefined")return(new XMLSerializer).serializeToString(a);
        if (a = a.xml)return a;
        i(Error("Your browser does not support serializing XML documents"))
    };
    function gc(a, b) {
        this.ga = new E(a);
        this.Eb = b ? b : "callback";
        this.Oa = 5E3
    }

    var hc = 0;
    gc.prototype.send = function (a, b, c, d) {
        if (!document.documentElement.firstChild) {
            c && c(a);
            return m
        }
        d = d || "_" + (hc++).toString(36) + ia().toString(36);
        q._callbacks_ || (q._callbacks_ = {});
        var e = document.createElement("script"), f = m;
        if (this.Oa > 0)f = q.setTimeout(ic(d, e, a, c), this.Oa);
        c = this.ga.A();
        for (var g in a)if (!a.hasOwnProperty || a.hasOwnProperty(g))rb(c, g, a[g]);
        if (b) {
            q._callbacks_[d] = jc(d, e, b, f);
            rb(c, this.Eb, "_callbacks_." + d)
        }
        Ub(e, {type: "text/javascript", id: d, charset: "UTF-8", src: c.toString()});
        document.getElementsByTagName("head")[0].appendChild(e);
        return{R: d, Oa: f}
    };
    function ic(a, b, c, d) {
        return function () {
            kc(a, b, n);
            d && d(c)
        }
    }

    function jc(a, b, c, d) {
        return function () {
            q.clearTimeout(d);
            kc(a, b, l);
            c.apply(undefined, arguments)
        }
    }

    function kc(a, b, c) {
        q.setTimeout(function () {
            b && b.parentNode && b.parentNode.removeChild(b)
        }, 0);
        if (q._callbacks_[a])if (c)delete q._callbacks_[a]; else q._callbacks_[a] = ca
    };
    function lc(a, b, c, d, e) {
        this.reset(a, b, c, d, e)
    }

    lc.prototype.cc = 0;
    lc.prototype.$a = m;
    lc.prototype.Za = m;
    var mc = 0;
    lc.prototype.reset = function (a, b, c, d, e) {
        this.cc = typeof e == "number" ? e : mc++;
        this.qc = d || ia();
        this.ba = a;
        this.oc = b;
        this.mc = c;
        delete this.$a;
        delete this.Za
    };
    lc.prototype.kb = function (a) {
        this.ba = a
    };
    function K(a) {
        this.da = a
    }

    K.prototype.na = m;
    K.prototype.ba = m;
    K.prototype.ta = m;
    K.prototype.db = m;
    function nc(a, b) {
        this.name = a;
        this.value = b
    }

    nc.prototype.toString = aa("name");
    var oc = new nc("SEVERE", 1E3), pc = new nc("INFO", 800), qc = new nc("CONFIG", 700), L = new nc("FINE", 500), rc = new nc("FINER", 400), sc = new nc("FINEST", 300);
    K.prototype.kb = function (a) {
        this.ba = a
    };
    function tc(a) {
        if (a.ba)return a.ba;
        if (a.na)return tc(a.na);
        ya("Root logger has no level set.");
        return m
    }

    K.prototype.log = function (a, b, c) {
        if (a.value >= tc(this).value) {
            a = this.Nb(a, b, c);
            for (b = this; b;) {
                c = b;
                var d = a;
                if (c.db)for (var e = 0, f = void 0; f = c.db[e]; e++)f(d);
                b = b.na
            }
        }
    };
    K.prototype.Nb = function (a, b, c) {
        var d = new lc(a, String(b), this.da);
        if (c) {
            d.$a = c;
            var e = Xa(c, arguments.callee.caller);
            d.Za = e
        }
        return d
    };
    K.prototype.info = function (a, b) {
        this.log(pc, a, b)
    };
    var uc = {}, vc = m;

    function M(a) {
        if (!vc) {
            vc = new K("");
            uc[""] = vc;
            vc.kb(qc)
        }
        var b;
        if (!(b = uc[a])) {
            b = new K(a);
            var c = a.lastIndexOf("."), d = a.substr(c + 1);
            c = M(a.substr(0, c));
            if (!c.ta)c.ta = {};
            c.ta[d] = b;
            b.na = c;
            b = uc[a] = b
        }
        return b
    };
    function wc() {
        this.Y = [];
        this.La = new Ta;
        this.rb = this.sb = this.tb = this.mb = 0;
        this.fa = new Ta;
        this.Sa = this.qb = 0;
        this.Vb = 1;
        this.Aa = new C(0, 4E3);
        this.Aa.X = function () {
            return new xc
        };
        this.nb = new C(0, 50);
        this.nb.X = function () {
            return new yc
        };
        var a = this;
        this.Fa = new C(0, 2E3);
        this.Fa.X = function () {
            return String(a.Vb++)
        };
        this.Fa.xa = function () {
        };
        this.Hb = 3
    }

    wc.prototype.e = M("goog.debug.Trace");
    function yc() {
        this.Pa = this.pb = this.va = 0
    }

    yc.prototype.toString = function () {
        var a = [];
        a.push(this.type, " ", this.va, " (", Math.round(this.pb * 10) / 10, " ms)");
        this.Pa && a.push(" [VarAlloc = ", this.Pa, "]");
        return a.join("")
    };
    function xc() {
    }

    function zc(a, b, c, d) {
        var e = [];
        c == -1 ? e.push("    ") : e.push(Ac(a.Xa - c));
        e.push(" ", Bc(a.Xa - b));
        if (a.Ba == 0)e.push(" Start        "); else if (a.Ba == 1) {
            e.push(" Done ");
            e.push(Ac(a.pc - a.startTime), " ms ")
        } else e.push(" Comment      ");
        e.push(d, a);
        a.jc > 0 && e.push("[VarAlloc ", a.jc, "] ");
        return e.join("")
    }

    xc.prototype.toString = function () {
        return this.type == m ? this.Gb : "[" + this.type + "] " + this.Gb
    };
    wc.prototype.reset = function (a) {
        this.Hb = a;
        for (a = 0; a < this.Y.length; a++) {
            var b = this.Aa.id;
            b && D(this.Fa, b);
            D(this.Aa, this.Y[a])
        }
        this.Y.length = 0;
        this.La.clear();
        this.mb = ia();
        this.Sa = this.qb = this.rb = this.sb = this.tb = 0;
        b = this.fa.G();
        for (a = 0; a < b.length; a++) {
            var c = this.fa.o(b[a]);
            c.va = 0;
            c.pb = 0;
            c.Pa = 0;
            D(this.nb, c)
        }
        this.fa.clear()
    };
    wc.prototype.toString = function () {
        for (var a = [], b = -1, c = [], d = 0; d < this.Y.length; d++) {
            var e = this.Y[d];
            e.Ba == 1 && c.pop();
            a.push(" ", zc(e, this.mb, b, c.join("")));
            b = e.Xa;
            a.push("\n");
            e.Ba == 0 && c.push("|  ")
        }
        if (this.La.bb() != 0) {
            var f = ia();
            a.push(" Unstopped timers:\n");
            Sa(this.La, function (g) {
                a.push("  ", g, " (", f - g.startTime, " ms, started at ", Bc(g.startTime), ")\n")
            })
        }
        b = this.fa.G();
        for (d = 0; d < b.length; d++) {
            c = this.fa.o(b[d]);
            c.va > 1 && a.push(" TOTAL ", c, "\n")
        }
        a.push("Total tracers created ", this.qb, "\n", "Total comments created ",
            this.Sa, "\n", "Overhead start: ", this.tb, " ms\n", "Overhead end: ", this.sb, " ms\n", "Overhead comment: ", this.rb, " ms\n");
        return a.join("")
    };
    function Ac(a) {
        a = Math.round(a);
        var b = "";
        if (a < 1E3)b = " ";
        if (a < 100)b = "  ";
        if (a < 10)b = "   ";
        return b + a
    }

    function Bc(a) {
        a = Math.round(a);
        return String(100 + a / 1E3 % 60).substring(1, 3) + "." + String(1E3 + a % 1E3).substring(1, 4)
    }

    new wc;
    function Cc() {
        this.jb = ia()
    }

    new Cc;
    Cc.prototype.w = function (a) {
        this.jb = a
    };
    Cc.prototype.reset = function () {
        this.w(ia())
    };
    Cc.prototype.o = aa("jb");
    var Dc;

    function N(a, b) {
        this.type = a;
        this.currentTarget = this.target = b
    }

    z(N, Ma);
    N.prototype.n = function () {
        delete this.type;
        delete this.target;
        delete this.currentTarget
    };
    N.prototype.S = n;
    N.prototype.oa = l;
    !I || Rb("9");
    I && Rb("8");
    function Ec(a, b) {
        a && this.ka(a, b)
    }

    z(Ec, N);
    p = Ec.prototype;
    p.target = m;
    p.relatedTarget = m;
    p.offsetX = 0;
    p.offsetY = 0;
    p.clientX = 0;
    p.clientY = 0;
    p.screenX = 0;
    p.screenY = 0;
    p.button = 0;
    p.keyCode = 0;
    p.charCode = 0;
    p.ctrlKey = n;
    p.altKey = n;
    p.shiftKey = n;
    p.metaKey = n;
    p.Xb = n;
    p.Ya = m;
    p.ka = function (a, b) {
        var c = this.type = a.type;
        this.target = a.target || a.srcElement;
        this.currentTarget = b;
        var d = a.relatedTarget;
        if (d) {
            if (Fb)try {
                d = d.nodeName && d
            } catch (e) {
                d = m
            }
        } else if (c == "mouseover")d = a.fromElement; else if (c == "mouseout")d = a.toElement;
        this.relatedTarget = d;
        this.offsetX = a.offsetX !== undefined ? a.offsetX : a.layerX;
        this.offsetY = a.offsetY !== undefined ? a.offsetY : a.layerY;
        this.clientX = a.clientX !== undefined ? a.clientX : a.pageX;
        this.clientY = a.clientY !== undefined ? a.clientY : a.pageY;
        this.screenX = a.screenX || 0;
        this.screenY = a.screenY || 0;
        this.button = a.button;
        this.keyCode = a.keyCode || 0;
        this.charCode = a.charCode || (c == "keypress" ? a.keyCode : 0);
        this.ctrlKey = a.ctrlKey;
        this.altKey = a.altKey;
        this.shiftKey = a.shiftKey;
        this.metaKey = a.metaKey;
        this.Xb = Ib ? a.metaKey : a.ctrlKey;
        this.state = a.state;
        this.Ya = a;
        delete this.oa;
        delete this.S
    };
    p.n = function () {
        Ec.V.n.call(this);
        this.relatedTarget = this.currentTarget = this.target = this.Ya = m
    };
    function Fc() {
    }

    var Gc = 0;
    p = Fc.prototype;
    p.key = 0;
    p.T = n;
    p.Ra = n;
    p.ka = function (a, b, c, d, e, f) {
        if (x(a))this.fb = l; else if (a && a.handleEvent && x(a.handleEvent))this.fb = n; else i(Error("Invalid listener argument"));
        this.ca = a;
        this.ib = b;
        this.src = c;
        this.type = d;
        this.capture = !!e;
        this.Ea = f;
        this.Ra = n;
        this.key = ++Gc;
        this.T = n
    };
    p.handleEvent = function (a) {
        if (this.fb)return this.ca.call(this.Ea || this.src, a);
        return this.ca.handleEvent.call(this.ca, a)
    };
    var Hc;
    var Ic = (Hc = "ScriptEngine"in q && q.ScriptEngine() == "JScript") ? q.ScriptEngineMajorVersion() + "." + q.ScriptEngineMinorVersion() + "." + q.ScriptEngineBuildVersion() : "0";
    var Jc, Kc, Lc, Mc, Nc, Oc, Pc, Qc, Rc, Sc, Tc;
    (function () {
        function a() {
            return{c: 0, s: 0}
        }

        function b() {
            return[]
        }

        function c() {
            function t(B) {
                return g.call(t.src, t.key, B)
            }

            return t
        }

        function d() {
            return new Fc
        }

        function e() {
            return new Ec
        }

        var f = Hc && !(ua(Ic, "5.7") >= 0), g;
        Oc = function (t) {
            g = t
        };
        if (f) {
            Jc = function () {
                return Wa(h)
            };
            Kc = function (t) {
                D(h, t)
            };
            Lc = function () {
                return Wa(j)
            };
            Mc = function (t) {
                D(j, t)
            };
            Nc = function () {
                return Wa(k)
            };
            Pc = function () {
                D(k, c())
            };
            Qc = function () {
                return Wa(o)
            };
            Rc = function (t) {
                D(o, t)
            };
            Sc = function () {
                return Wa(r)
            };
            Tc = function (t) {
                D(r, t)
            };
            var h =
                new C(0, 600);
            h.J = a;
            var j = new C(0, 600);
            j.J = b;
            var k = new C(0, 600);
            k.J = c;
            var o = new C(0, 600);
            o.J = d;
            var r = new C(0, 600);
            r.J = e
        } else {
            Jc = a;
            Kc = ca;
            Lc = b;
            Mc = ca;
            Nc = c;
            Pc = ca;
            Qc = d;
            Rc = ca;
            Sc = e;
            Tc = ca
        }
    })();
    var Uc = {}, O = {}, P = {}, Vc = {};

    function Wc(a, b, c, d, e) {
        if (b)if (u(b)) {
            for (var f = 0; f < b.length; f++)Wc(a, b[f], c, d, e);
            return m
        } else {
            d = !!d;
            var g = O;
            b in g || (g[b] = Jc());
            g = g[b];
            if (!(d in g)) {
                g[d] = Jc();
                g.c++
            }
            g = g[d];
            var h = y(a), j;
            g.s++;
            if (g[h]) {
                j = g[h];
                for (f = 0; f < j.length; f++) {
                    g = j[f];
                    if (g.ca == c && g.Ea == e) {
                        if (g.T)break;
                        return j[f].key
                    }
                }
            } else {
                j = g[h] = Lc();
                g.c++
            }
            f = Nc();
            f.src = a;
            g = Qc();
            g.ka(c, f, a, b, d, e);
            c = g.key;
            f.key = c;
            j.push(g);
            Uc[c] = g;
            P[h] || (P[h] = Lc());
            P[h].push(g);
            if (a.addEventListener) {
                if (a == q || !a.Ta)a.addEventListener(b, f, d)
            } else a.attachEvent(Xc(b),
                f);
            return c
        } else i(Error("Invalid event type"))
    }

    function Yc(a, b, c, d, e) {
        if (u(b)) {
            for (var f = 0; f < b.length; f++)Yc(a, b[f], c, d, e);
            return m
        }
        d = !!d;
        a:{
            f = O;
            if (b in f) {
                f = f[b];
                if (d in f) {
                    f = f[d];
                    a = y(a);
                    if (f[a]) {
                        a = f[a];
                        break a
                    }
                }
            }
            a = m
        }
        if (!a)return n;
        for (f = 0; f < a.length; f++)if (a[f].ca == c && a[f].capture == d && a[f].Ea == e)return Zc(a[f].key);
        return n
    }

    function Zc(a) {
        if (!Uc[a])return n;
        var b = Uc[a];
        if (b.T)return n;
        var c = b.src, d = b.type, e = b.ib, f = b.capture;
        if (c.removeEventListener) {
            if (c == q || !c.Ta)c.removeEventListener(d, e, f)
        } else c.detachEvent && c.detachEvent(Xc(d), e);
        c = y(c);
        e = O[d][f][c];
        if (P[c]) {
            var g = P[c], h = Ea(g, b);
            h >= 0 && Ha(g, h);
            g.length == 0 && delete P[c]
        }
        b.T = l;
        e.hb = l;
        $c(d, f, c, e);
        delete Uc[a];
        return l
    }

    function $c(a, b, c, d) {
        if (!d.ma)if (d.hb) {
            for (var e = 0, f = 0; e < d.length; e++)if (d[e].T) {
                var g = d[e].ib;
                g.src = m;
                Pc(g);
                Rc(d[e])
            } else {
                if (e != f)d[f] = d[e];
                f++
            }
            d.length = f;
            d.hb = n;
            if (f == 0) {
                Mc(d);
                delete O[a][b][c];
                O[a][b].c--;
                if (O[a][b].c == 0) {
                    Kc(O[a][b]);
                    delete O[a][b];
                    O[a].c--
                }
                if (O[a].c == 0) {
                    Kc(O[a]);
                    delete O[a]
                }
            }
        }
    }

    function ad(a, b, c) {
        var d = 0, e = b == m, f = c == m;
        c = !!c;
        if (a == m)za(P, function (j) {
            for (var k = j.length - 1; k >= 0; k--) {
                var o = j[k];
                if ((e || b == o.type) && (f || c == o.capture)) {
                    Zc(o.key);
                    d++
                }
            }
        }); else {
            a = y(a);
            if (P[a]) {
                a = P[a];
                for (var g = a.length - 1; g >= 0; g--) {
                    var h = a[g];
                    if ((e || b == h.type) && (f || c == h.capture)) {
                        Zc(h.key);
                        d++
                    }
                }
            }
        }
        return d
    }

    function Xc(a) {
        if (a in Vc)return Vc[a];
        return Vc[a] = "on" + a
    }

    function bd(a, b, c, d, e) {
        var f = 1;
        b = y(b);
        if (a[b]) {
            a.s--;
            a = a[b];
            if (a.ma)a.ma++; else a.ma = 1;
            try {
                for (var g = a.length, h = 0; h < g; h++) {
                    var j = a[h];
                    if (j && !j.T)f &= cd(j, e) !== n
                }
            } finally {
                a.ma--;
                $c(c, d, b, a)
            }
        }
        return Boolean(f)
    }

    function cd(a, b) {
        var c = a.handleEvent(b);
        a.Ra && Zc(a.key);
        return c
    }

    Oc(function (a, b) {
        if (!Uc[a])return l;
        var c = Uc[a], d = c.type, e = O;
        if (!(d in e))return l;
        e = e[d];
        var f, g;
        if (Dc === undefined)Dc = I && !q.addEventListener;
        if (Dc) {
            f = b || ba("window.event");
            var h = l in e, j = n in e;
            if (h) {
                if (f.keyCode < 0 || f.returnValue != undefined)return l;
                a:{
                    var k = n;
                    if (f.keyCode == 0)try {
                        f.keyCode = -1;
                        break a
                    } catch (o) {
                        k = l
                    }
                    if (k || f.returnValue == undefined)f.returnValue = l
                }
            }
            k = Sc();
            k.ka(f, this);
            f = l;
            try {
                if (h) {
                    for (var r = Lc(), t = k.currentTarget; t; t = t.parentNode)r.push(t);
                    g = e[l];
                    g.s = g.c;
                    for (var B = r.length - 1; !k.S && B >=
                        0 && g.s; B--) {
                        k.currentTarget = r[B];
                        f &= bd(g, r[B], d, l, k)
                    }
                    if (j) {
                        g = e[n];
                        g.s = g.c;
                        for (B = 0; !k.S && B < r.length && g.s; B++) {
                            k.currentTarget = r[B];
                            f &= bd(g, r[B], d, n, k)
                        }
                    }
                } else f = cd(c, k)
            } finally {
                if (r) {
                    r.length = 0;
                    Mc(r)
                }
                k.D();
                Tc(k)
            }
            return f
        }
        d = new Ec(b, this);
        try {
            f = cd(c, d)
        } finally {
            d.D()
        }
        return f
    });
    function dd() {
    }

    z(dd, Ma);
    p = dd.prototype;
    p.Ta = l;
    p.Ma = m;
    p.addEventListener = function (a, b, c, d) {
        Wc(this, a, b, c, d)
    };
    p.removeEventListener = function (a, b, c, d) {
        Yc(this, a, b, c, d)
    };
    p.dispatchEvent = function (a) {
        a = a;
        if (w(a))a = new N(a, this); else if (a instanceof N)a.target = a.target || this; else {
            var b = a;
            a = new N(a.type, this);
            Da(a, b)
        }
        b = 1;
        var c, d = a.type, e = O;
        if (d in e) {
            e = e[d];
            d = l in e;
            var f;
            if (d) {
                c = [];
                for (f = this; f; f = f.Ma)c.push(f);
                f = e[l];
                f.s = f.c;
                for (var g = c.length - 1; !a.S && g >= 0 && f.s; g--) {
                    a.currentTarget = c[g];
                    b &= bd(f, c[g], a.type, l, a) && a.oa != n
                }
            }
            if (n in e) {
                f = e[n];
                f.s = f.c;
                if (d)for (g = 0; !a.S && g < c.length && f.s; g++) {
                    a.currentTarget = c[g];
                    b &= bd(f, c[g], a.type, n, a) && a.oa != n
                } else for (c = this; !a.S && c &&
                    f.s; c = c.Ma) {
                    a.currentTarget = c;
                    b &= bd(f, c, a.type, n, a) && a.oa != n
                }
            }
            a = Boolean(b)
        } else a = l;
        return a
    };
    p.n = function () {
        dd.V.n.call(this);
        ad(this);
        this.Ma = m
    };
    var ed = q.window;

    function fd(a, b, c) {
        if (x(a)) {
            if (c)a = ha(a, c)
        } else if (a && typeof a.handleEvent == "function")a = ha(a.handleEvent, a); else i(Error("Invalid listener argument"));
        return b > 2147483647 ? -1 : ed.setTimeout(a, b || 0)
    };
    function gd(a, b, c) {
        this.Ia = a;
        this.Rb = b || 0;
        this.cb = c;
        this.Fb = ha(this.Ib, this)
    }

    z(gd, Ma);
    p = gd.prototype;
    p.R = 0;
    p.n = function () {
        gd.V.n.call(this);
        this.stop();
        delete this.Ia;
        delete this.cb
    };
    p.start = function (a) {
        this.stop();
        this.R = fd(this.Fb, a !== undefined ? a : this.Rb)
    };
    p.stop = function () {
        this.eb() && ed.clearTimeout(this.R);
        this.R = 0
    };
    p.eb = function () {
        return this.R != 0
    };
    p.Ib = function () {
        this.R = 0;
        this.Ia && this.Ia.call(this.cb)
    };
    function hd() {
        if (Fb) {
            this.ua = {};
            this.ub = {};
            this.lb = []
        }
    }

    hd.prototype.e = M("goog.net.xhrMonitor");
    hd.prototype.ya = Fb;
    function id(a, b) {
        if (a.ya) {
            var c = w(b) ? b : ea(b) ? y(b) : "";
            a.e.log(sc, "Pushing context: " + b + " (" + c + ")", void 0);
            a.lb.push(c)
        }
    }

    function jd(a) {
        if (a.ya) {
            var b = a.lb.pop();
            a.e.log(sc, "Popping context: " + b, void 0);
            kd(a, b)
        }
    }

    function kd(a, b) {
        var c = a.ub[b], d = a.ua[b];
        if (c && d) {
            a.e.log(sc, "Updating dependent contexts", void 0);
            Fa(c, function (e) {
                Fa(d, function (f) {
                    var g = this.ua;
                    g[e] || (g[e] = []);
                    Ea(g[e], f) >= 0 || g[e].push(f);
                    g = this.ub;
                    g[f] || (g[f] = []);
                    Ea(g[f], e) >= 0 || g[f].push(e)
                }, this)
            }, a)
        }
    }

    var ld = new hd;

    function md() {
    }

    function nd(a, b) {
        var c = [];
        od(a, b, c);
        return c.join("")
    }

    function od(a, b, c) {
        switch (typeof b) {
            case "string":
                pd(a, b, c);
                break;
            case "number":
                c.push(isFinite(b) && !isNaN(b) ? b : "null");
                break;
            case "boolean":
                c.push(b);
                break;
            case "undefined":
                c.push("null");
                break;
            case "object":
                if (b == m) {
                    c.push("null");
                    break
                }
                if (u(b)) {
                    var d = b.length;
                    c.push("[");
                    for (var e = "", f = 0; f < d; f++) {
                        c.push(e);
                        od(a, b[f], c);
                        e = ","
                    }
                    c.push("]");
                    break
                }
                c.push("{");
                d = "";
                for (e in b)if (b.hasOwnProperty(e)) {
                    f = b[e];
                    if (typeof f != "function") {
                        c.push(d);
                        pd(a, e, c);
                        c.push(":");
                        od(a, f, c);
                        d = ","
                    }
                }
                c.push("}");
                break;
            case "function":
                break;
            default:
                i(Error("Unknown type: " + typeof b))
        }
    }

    var qd = {'"': '\\"', "\\": "\\\\", "/": "\\/", "\u0008": "\\b", "\u000c": "\\f", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\u000b": "\\u000b"}, rd = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;

    function pd(a, b, c) {
        c.push('"', b.replace(rd, function (d) {
            if (d in qd)return qd[d];
            var e = d.charCodeAt(0), f = "\\u";
            if (e < 16)f += "000"; else if (e < 256)f += "00"; else if (e < 4096)f += "0";
            return qd[d] = f + e.toString(16)
        }), '"')
    };
    function sd() {
        this.da = "closure_frame" + td++;
        this.Z = [];
        ud[this.da] = this
    }

    var vd;
    z(sd, dd);
    var ud = {}, td = 0;

    function wd(a, b, c, d, e) {
        var f = new sd;
        Wc(f, "ready", f.D, n, f);
        b && Wc(f, "complete", b);
        f.send(a, c, d, e)
    }

    function xd(a, b) {
        Oa(b, function (c, d) {
            var e = Wb("input", {type: "hidden", name: d, value: c});
            a.appendChild(e)
        })
    }

    p = sd.prototype;
    p.e = M("goog.net.IframeIo");
    p.h = m;
    p.f = m;
    p.N = m;
    p.Wb = 0;
    p.z = n;
    p.ja = n;
    p.Na = n;
    p.Ha = m;
    p.Ga = m;
    p.aa = 0;
    p.ab = m;
    p.H = m;
    p.send = function (a, b, c, d) {
        if (this.z)i(Error("[goog.net.IframeIo] Unable to send, already active."));
        this.Ha = a = new E(a);
        b = b ? b.toUpperCase() : "GET";
        if (c) {
            F(a);
            c = Math.floor(Math.random() * 2147483648).toString(36) + (Math.floor(Math.random() * 2147483648) ^ ia()).toString(36);
            F(a);
            delete a.m;
            a.k.w("zx", c)
        }
        this.e.info("Sending iframe request: " + a + " [" + b + "]");
        if (!vd) {
            vd = Wb("form");
            vd.acceptCharset = "utf-8";
            c = vd.style;
            c.position = "absolute";
            c.visibility = "hidden";
            c.top = c.left = "-10px";
            c.width = c.height = "10px";
            c.overflow =
                "hidden";
            document.body.appendChild(vd)
        }
        this.h = vd;
        Zb(this.h);
        b == "GET" && xd(this.h, a.k);
        d && xd(this.h, d);
        this.h.action = a.toString();
        this.h.method = b;
        this.z = l;
        this.ja = n;
        this.aa = 0;
        this.e.log(L, "Creating iframe", void 0);
        this.N = this.da + "_" + (this.Wb++).toString(36);
        d = {name: this.N, id: this.N};
        if (I && Jb < 7)d.src = 'javascript:""';
        this.f = Wb("iframe", d);
        d = this.f.style;
        d.visibility = "hidden";
        d.width = d.height = "10px";
        if (Gb)d.marginTop = d.marginLeft = "-10px"; else {
            d.position = "absolute";
            d.top = d.left = "-10px"
        }
        if (I) {
            this.h.target =
                this.N || "";
            document.body.appendChild(this.f);
            Wc(this.f, "readystatechange", this.Ja, n, this);
            try {
                this.za = n;
                this.h.submit()
            } catch (e) {
                Yc(this.f, "readystatechange", this.Ja, n, this);
                yd(this, 1)
            }
        } else {
            this.e.log(L, "Setting up iframes and cloning form", void 0);
            document.body.appendChild(this.f);
            d = this.N + "_inner";
            a = $b(this.f);
            c = "<body><iframe id=" + d + " name=" + d + "></iframe>";
            if (Eb)a.documentElement.innerHTML = c; else a.write(c);
            Wc(a.getElementById(d), "load", this.Ka, n, this);
            var f = this.h.getElementsByTagName("textarea");
            c = 0;
            for (b = f.length; c < b; c++) {
                var g = f[c], h = void 0;
                if (Tb && "innerText"in g)h = g.innerText.replace(/(\r\n|\r|\n)/g, "\n"); else {
                    h = [];
                    ec(g, h, l);
                    h = h.join("")
                }
                h = h.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
                I || (h = h.replace(/ +/g, " "));
                if (h != " ")h = h.replace(/^\s*/, "");
                if (h != f[c].value) {
                    g = f[c];
                    h = f[c].value;
                    if ("textContent"in g)g.textContent = h; else if (g.firstChild && g.firstChild.nodeType == 3) {
                        for (; g.lastChild != g.firstChild;)g.removeChild(g.lastChild);
                        g.firstChild.data = h
                    } else {
                        Zb(g);
                        g.appendChild((g.nodeType == 9 ? g : g.ownerDocument ||
                            g.document).createTextNode(h))
                    }
                }
            }
            f = a.importNode(this.h, l);
            f.target = d;
            a.body.appendChild(f);
            g = this.h.getElementsByTagName("select");
            h = f.getElementsByTagName("select");
            c = 0;
            for (b = g.length; c < b; c++)h[c].selectedIndex = g[c].selectedIndex;
            g = this.h.getElementsByTagName("input");
            h = f.getElementsByTagName("input");
            c = 0;
            for (b = g.length; c < b; c++)if (g[c].type == "file")if (g[c].value != h[c].value) {
                this.e.log(L, "File input value not cloned properly.  Will submit using original form.", void 0);
                this.h.target = d;
                f = this.h;
                break
            }
            this.e.log(L,
                "Submitting form", void 0);
            try {
                this.za = n;
                f.submit();
                a.close();
                if (Fb)this.ab = fd(this.ob, 250, this)
            } catch (j) {
                c = "Error when submitting form: " + Xa(j);
                this.e.log(oc, c, void 0);
                Yc(a.getElementById(d), "load", this.Ka, n, this);
                a.close();
                yd(this, 2)
            }
        }
    };
    p.abort = function (a) {
        if (this.z) {
            this.e.info("Request aborted");
            ad(zd(this));
            this.Na = this.z = this.ja = n;
            this.aa = a || 7;
            this.dispatchEvent("abort");
            Ad(this)
        }
    };
    p.n = function () {
        this.e.log(L, "Disposing iframeIo instance", void 0);
        if (this.z) {
            this.e.log(L, "Aborting active request", void 0);
            this.abort()
        }
        sd.V.n.call(this);
        this.f && Bd(this);
        Cd(this);
        delete this.Wa;
        this.Ha = this.Ub = this.Ga = this.Tb = this.h = m;
        this.aa = 0;
        delete ud[this.da]
    };
    p.eb = aa("z");
    p.dispatchEvent = function (a) {
        this.f && id(ld, this.f);
        try {
            return sd.V.dispatchEvent.call(this, a)
        } finally {
            this.f && jd(ld);
            return l
        }
    };
    p.Ja = function () {
        if (this.f.readyState == "complete") {
            Yc(this.f, "readystatechange", this.Ja, n, this);
            var a;
            try {
                a = $b(this.f);
                if (I && a.location == "about:blank" && !navigator.onLine) {
                    yd(this, 9);
                    return
                }
            } catch (b) {
                yd(this, 1);
                return
            }
            Dd(this, a)
        }
    };
    p.Ka = function () {
        if (!(Eb && Ed(this).location == "about:blank")) {
            Yc(zd(this), "load", this.Ka, n, this);
            Dd(this, Ed(this))
        }
    };
    function Dd(a, b) {
        a.e.log(L, "Iframe loaded", void 0);
        a.ja = l;
        a.z = n;
        var c;
        try {
            var d = b.body;
            a.Ga = d.textContent || d.innerText;
            a.Tb = d.innerHTML
        } catch (e) {
            c = 1
        }
        var f;
        if (!c && typeof a.Wa == "function")if (f = a.Wa(b))c = 4;
        a.e.log(rc, "Last content: " + a.Ga, void 0);
        a.e.log(rc, "Last uri: " + a.Ha, void 0);
        if (c) {
            a.e.log(L, "Load event occurred but failed", void 0);
            yd(a, c, f)
        } else {
            a.e.log(L, "Load succeeded", void 0);
            a.Na = l;
            a.aa = 0;
            a.dispatchEvent("complete");
            a.dispatchEvent("success");
            Ad(a)
        }
    }

    function yd(a, b, c) {
        if (!a.za) {
            a.Na = n;
            a.z = n;
            a.ja = l;
            a.aa = b;
            if (b == 4)a.Ub = c;
            a.dispatchEvent("complete");
            a.dispatchEvent("error");
            Ad(a);
            a.za = l
        }
    }

    function Ad(a) {
        a.e.info("Ready for new requests");
        var b = a.f;
        Bd(a);
        Cd(a);
        id(ld, b);
        try {
            a.dispatchEvent("ready")
        } finally {
            jd(ld)
        }
    }

    function Bd(a) {
        var b = a.f;
        if (b) {
            b.onreadystatechange = m;
            b.onload = m;
            b.onerror = m;
            a.Z.push(b)
        }
        if (a.H) {
            ed.clearTimeout(a.H);
            a.H = m
        }
        if (Fb || Eb)a.H = fd(a.wa, 2E3, a); else a.wa();
        a.f = m;
        a.N = m
    }

    p.wa = function () {
        if (this.H) {
            ed.clearTimeout(this.H);
            this.H = m
        }
        for (var a = 0; a < this.Z.length;) {
            var b = this.Z[a], c;
            c = ld;
            var d = b;
            if (c.ya) {
                var e = c.ua[w(d) ? d : ea(d) ? y(d) : ""];
                c.e.log(L, "Context is safe : " + d + " - " + e, void 0);
                c = !e
            } else c = l;
            if (c) {
                this.e.info("Disposing iframe");
                Ha(this.Z, a);
                b && b.parentNode && b.parentNode.removeChild(b)
            } else a++
        }
        if (this.Z.length != 0) {
            this.e.info("Requests outstanding, waiting to dispose");
            this.H = fd(this.wa, 2E3, this)
        }
    };
    function Cd(a) {
        a.h && a.h == vd && Zb(a.h);
        a.h = m
    }

    function Ed(a) {
        if (a.f)return $b(zd(a));
        return m
    }

    function zd(a) {
        if (a.f)return I ? a.f : $b(a.f).getElementById(a.N + "_inner");
        return m
    }

    p.ob = function () {
        if (this.z)this.ab = fd(this.ob, 250, this)
    };
    function Fd() {
    }

    (function () {
        function a(h) {
            var j = e;
            return j[h[0]] + j[h[1]] + j[h[2]] + j[h[3]] + "-" + j[h[4]] + j[h[5]] + "-" + j[h[6]] + j[h[7]] + "-" + j[h[8]] + j[h[9]] + "-" + j[h[10]] + j[h[11]] + j[h[12]] + j[h[13]] + j[h[14]] + j[h[15]]
        }

        function b(h, j, k) {
            var o = h != "binary" ? d : j ? j : new c(16);
            j = j && k || 0;
            k = Math.random() * 4294967296;
            o[j++] = k & 255;
            o[j++] = (k >>>= 8) & 255;
            o[j++] = (k >>>= 8) & 255;
            o[j++] = k >>> 8 & 255;
            k = Math.random() * 4294967296;
            o[j++] = k & 255;
            o[j++] = (k >>>= 8) & 255;
            o[j++] = (k >>>= 8) & 15 | 64;
            o[j++] = k >>> 8 & 255;
            k = Math.random() * 4294967296;
            o[j++] = k & 63 | 128;
            o[j++] = (k >>>=
                8) & 255;
            o[j++] = (k >>>= 8) & 255;
            o[j++] = k >>> 8 & 255;
            k = Math.random() * 4294967296;
            o[j++] = k & 255;
            o[j++] = (k >>>= 8) & 255;
            o[j++] = (k >>>= 8) & 255;
            o[j++] = k >>> 8 & 255;
            return h === undefined ? a(o) : o
        }

        for (var c = Array, d = new c(16), e = [], f = {}, g = 0; g < 256; g++) {
            e[g] = (g + 256).toString(16).substr(1).toUpperCase();
            f[e[g]] = g
        }
        b.parse = function (h) {
            var j = new c(16), k = 0;
            h.toUpperCase().replace(/[0-9A-F][0-9A-F]/g, function (o) {
                j[k++] = f[o]
            });
            return j
        };
        b.rc = a;
        b.kc = c;
        Fd = b
    })();
    var Gd = {};
    s("dymo.label.framework.FlowDirection", Gd, void 0);
    Gd.LeftToRight = "LeftToRight";
    Gd.RightToLeft = "RightToLeft";
    var Hd = {};
    s("dymo.label.framework.LabelWriterPrintQuality", Hd, void 0);
    Hd.Auto = "Auto";
    Hd.Text = "Text";
    Hd.BarcodeAndGraphics = "BarcodeAndGraphics";
    var Id = {};
    s("dymo.label.framework.TwinTurboRoll", Id, void 0);
    Id.Auto = "Auto";
    Id.Left = "Left";
    Id.Right = "Right";
    var Jd = {};
    s("dymo.label.framework.TapeAlignment", Jd, void 0);
    Jd.Center = "Center";
    Jd.Left = "Left";
    Jd.Right = "Right";
    var Kd = {};
    s("dymo.label.framework.TapeCutMode", Kd, void 0);
    Kd.AutoCut = "AutoCut";
    Kd.ChainMarks = "ChainMarks";
    var Ld = {};
    s("dymo.label.framework.AddressBarcodePosition", Ld, void 0);
    Ld.AboveAddress = "AboveAddress";
    Ld.BelowAddress = "BelowAddress";
    Ld.Suppress = "Suppress";
    var Q = {};
    s("dymo.label.framework.PrintJobStatus", Q, void 0);
    Q.qa = 0;
    Q.Unknown = Q.qa;
    Q.Cb = 1;
    Q.Printing = Q.Cb;
    Q.wb = 2;
    Q.Finished = Q.wb;
    Q.vb = 3;
    Q.Error = Q.vb;
    Q.Ab = 4;
    Q.PaperOut = Q.Ab;
    Q.xb = 5;
    Q.InQueue = Q.xb;
    Q.pa = -1;
    Q.ProcessingError = Q.pa;
    Q.Bb = -2;
    Q.PrinterBusy = Q.Bb;
    Q.yb = -3;
    Q.InvalidJobId = Q.yb;
    Q.zb = -4;
    Q.NotSpooled = Q.zb;
    function R(a, b, c, d) {
        b = a.ownerDocument.createElement(b);
        c && b.appendChild(a.ownerDocument.createTextNode(c));
        if (d)for (var e in d)b.setAttribute(e, d[e]);
        a.appendChild(b);
        return b
    }

    function S(a) {
        if (!a)return"";
        var b = [];
        ec(a, b, n);
        return b.join("")
    }

    function T(a, b) {
        var c = a.getElementsByTagName(b);
        if (c.length > 0)return c[0]
    }

    function U(a, b) {
        for (; a.firstChild;)a.removeChild(a.firstChild);
        a.appendChild(a.ownerDocument.createTextNode(b))
    };
    function Md(a, b, c, d) {
        this.printerName = a;
        this.jobId = b;
        this.status = c;
        this.statusMessage = d
    }

    function Nd(a) {
        var b = {};
        a = a.split(" ");
        if (a.length >= 1)b.status = parseInt(a[0], 10);
        b.statusMessage = a.slice(1).join(" ");
        return b
    }

    function Od(a) {
        for (var b = 0; b < navigator.plugins.length; ++b)for (var c = navigator.plugins[b], d = 0; d < c.length; ++d)if (c[d].type == a)return l;
        return n
    }

    function Pd() {
        if (!document.getElementById("_DymoLabelFrameworkJslSafariPlugin")) {
            var a = document.createElement("embed");
            a.type = "application/x-dymolabel";
            a.id = "_DymoLabelFrameworkJslSafariPlugin";
            a.width = 1;
            a.height = 1;
            a.hidden = l;
            document.body.appendChild(a)
        }
        return window._DymoLabelFrameworkJslSafariPlugin
    }

    function Qd(a) {
        if (!document.getElementById("_DymoLabelFrameworkJslPlugin")) {
            var b = document.createElement("embed");
            b.type = "application/x-dymolabel";
            b.id = "_DymoLabelFrameworkJslPlugin";
            if (a) {
                b.width = 1;
                b.height = 1;
                b.hidden = l
            } else {
                b.width = 0;
                b.height = 0;
                b.hidden = n
            }
            document.body.appendChild(b)
        }
        return document.getElementById("_DymoLabelFrameworkJslPlugin")
    }

    function Rd() {
        var a = Qd(l);
        if (!a.getPrinters) {
            document.body.removeChild(a);
            a = Qd(n)
        }
        return a
    }

    function Sd(a) {
        if (!document.getElementById("_DymoLabelFrameworkJslPlugin")) {
            var b = document.createElement("embed");
            b.type = "application/x-npapi-dymolabel";
            b.id = "_DymoLabelFrameworkJslPlugin";
            if (a) {
                b.width = 1;
                b.height = 1;
                b.hidden = l
            } else {
                b.width = 0;
                b.height = 0;
                b.hidden = n
            }
            document.body.appendChild(b);
            if (!b.getPrinters) {
                b.width = 1;
                b.height = 1;
                b.hidden = n
            }
        }
        return document.getElementById("_DymoLabelFrameworkJslPlugin")
    }

    function Td() {
        var a = Sd(l);
        if (!a.getPrinters) {
            document.body.removeChild(a);
            a = Sd(n)
        }
        return a
    }

    function Ud() {
        var a = new ActiveXObject("DYMOLabelFrameworkIEPlugin.Plugin");
        if (typeof a != "object")i(Error("createFramework(): unable to create DYMO.Label.Framework object. Check DYMO Label Framework is installed"));
        return a
    }

    var V;

    function W() {
        if (!V) {
            var a = Vd();
            if (a.errorDetails != "")i(Error(a.errorDetails));
            if (typeof ActiveXObject != "undefined") {
                V = {};
                var b = Ud();
                V.getPrinters = function () {
                    return b.GetPrinters()
                };
                V.openLabelFile = function (e) {
                    return b.OpenLabelFile(e)
                };
                V.printLabel = function (e, f, g, h) {
                    b.PrintLabel(e, f, g, h)
                };
                V.renderLabel = function (e, f, g) {
                    return b.RenderLabel(e, f, g)
                };
                V.loadImageAsPngBase64 = function (e) {
                    return b.LoadImageAsPngBase64(e)
                };
                V.printLabel2 = function (e, f, g, h) {
                    return b.PrintLabel2(e, f, g, h).toString()
                };
                V.getJobStatus =
                    function (e, f) {
                        var g = Nd(b.GetJobStatus(e, parseInt(f, 10)));
                        return new Md(e, f, g.status, g.statusMessage)
                    }
            } else if (navigator.platform.indexOf("Win") != -1) {
                var c = Rd();
                if (c) {
                    V = {};
                    V.getPrinters = function () {
                        return c.getPrinters()
                    };
                    V.openLabelFile = function (e) {
                        return c.openLabelFile(e)
                    };
                    V.printLabel = function (e, f, g, h) {
                        c.printLabel(e, f, g, h)
                    };
                    V.renderLabel = function (e, f, g) {
                        return c.renderLabel(e, f, g)
                    };
                    V.loadImageAsPngBase64 = function (e) {
                        return c.loadImageAsPngBase64(e)
                    };
                    V.printLabel2 = function (e, f, g, h) {
                        if (x(c.printLabel2))return c.printLabel2(e,
                            f, g, h).toString();
                        c.printLabel(e, f, g, h)
                    };
                    V.getJobStatus = function (e, f) {
                        var g;
                        g = x(c.getJobStatus) ? Nd(c.getJobStatus(e, parseInt(f, 10))) : {status: Q.qa, statusMessage: "not implemented"};
                        return new Md(e, f, g.status, g.statusMessage)
                    }
                } else i(Error("DYMO Label Framework is not installed"))
            } else {
                var d;
                if (d = Od("application/x-dymolabel") ? Pd() : Td()) {
                    V = {};
                    V.getPrinters = function () {
                        return d.getPrinters()
                    };
                    V.openLabelFile = function (e) {
                        var f = d.openLabelFile(e);
                        if (!f)i(Error("Unable to open label file '" + e + "'"));
                        return f
                    };
                    V.printLabel = function (e, f, g, h) {
                        d.printLabel(g, e, f, h)
                    };
                    V.renderLabel = function (e, f, g) {
                        return d.renderLabel(e, f, g)
                    };
                    V.loadImageAsPngBase64 = function (e) {
                        var f = d.loadImageAsPngBase64(e);
                        if (!f)i(Error("Unable to load image from uri '" + e + "'"));
                        return f
                    };
                    V.printLabel2 = function (e, f, g, h) {
                        if (x(d.printLabel2))return d.printLabel2(g, e, f, h).toString();
                        d.printLabel(g, e, f, h)
                    };
                    V.getJobStatus = function (e, f) {
                        var g;
                        g = x(d.getJobStatus) ? Nd(d.getJobStatus(e, parseInt(f, 10))) : {status: Q.qa, statusMessage: "not implemented"};
                        return new Md(e,
                            f, g.status, g.statusMessage)
                    }
                } else i(Error("DYMO Label Framework is not installed"))
            }
        }
        return V
    };
    function Wd(a, b, c, d, e) {
        this.printerType = a;
        this.name = b;
        this.modelName = c;
        this.isConnected = d;
        this.isLocal = e;
        this.ea = this.l = ""
    }

    function Xd(a, b, c, d, e) {
        Wd.call(this, "LabelWriterPrinter", a, b, c, d);
        this.isTwinTurbo = e
    }

    z(Xd, Wd);
    function Yd(a, b, c, d, e) {
        Wd.call(this, "TapePrinter", a, b, c, d);
        this.isAutoCutSupported = e
    }

    z(Yd, Wd);
    function X(a, b) {
        this.W = a;
        this.ia = b
    }

    X.prototype.Ca = function () {
        return this.W.name
    };
    X.prototype.getPrinterName = X.prototype.Ca;
    X.prototype.Mb = aa("ia");
    X.prototype.getJobId = X.prototype.Mb;
    X.prototype.Da = function (a) {
        if (this.W.l != "")Zd(this, a); else {
            var b;
            try {
                b = W().getJobStatus(this.W.name, this.ia)
            } catch (c) {
                b = new Md(this.Ca(), this.ia, Q.pa, c.message || c)
            }
            a(b)
        }
    };
    X.prototype.getStatus = X.prototype.Da;
    function Zd(a, b) {
        var c = a.Ca(), d = a.ia, e = a.W.l;
        (new gc(tb(e, "getPrintJobStatus"), "callback")).send({jobId: d, printerName: a.W.ea}, function (f) {
            b(new Md(c, d, f.status, f.statusMessage))
        }, function () {
            b(new Md(c, d, Q.pa, 'Error processing getPrintJobStatus(): Unable to contact "' + e + '"'))
        })
    };
    function Y() {
        this.sa = []
    }

    s("dymo.label.framework.LabelSetBuilder", Y, void 0);
    Y.prototype.Qb = aa("sa");
    Y.prototype.getRecords = Y.prototype.Qb;
    Y.prototype.Db = function () {
        var a = new Z;
        this.sa.push(a);
        return a
    };
    Y.prototype.addRecord = Y.prototype.Db;
    function $d(a) {
        for (var b = J("<LabelSet/>"), c = b.documentElement, d = 0; d < a.length; d++) {
            var e = a[d], f = b.createElement("LabelRecord"), g;
            for (g in e) {
                var h = e[g];
                if (typeof h != "function") {
                    h = h.toString();
                    var j = b.createElement("ObjectData");
                    j.setAttribute("Name", g);
                    if (h.indexOf("<TextMarkup>") == 0) {
                        h = J(h);
                        j.appendChild(h.documentElement.cloneNode(l))
                    } else j.appendChild(b.createTextNode(h));
                    f.appendChild(j)
                }
            }
            c.appendChild(f)
        }
        return fc(b)
    }

    Y.toXml = $d;
    Y.prototype.toString = function () {
        return $d(this.sa)
    };
    function Z() {
    }

    Z.prototype.ic = function (a, b) {
        b = b.toString();
        if (b.indexOf("<TextMarkup>") != 0)b = "<TextMarkup>" + b + "</TextMarkup>";
        this[a] = b;
        return this
    };
    Z.prototype.setTextMarkup = Z.prototype.ic;
    Z.prototype.hc = function (a, b) {
        this[a] = b;
        return this
    };
    Z.prototype.setText = Z.prototype.hc;
    Z.prototype.fc = function (a, b) {
        this[a] = b;
        return this
    };
    Z.prototype.setBase64Image = Z.prototype.fc;
    function $(a) {
        this.Qa = J(a)
    }

    $.prototype.Q = function () {
        return fc(this.Qa)
    };
    $.prototype.getLabelXml = $.prototype.Q;
    $.prototype.bc = function (a, b) {
        return ae(this.Q(), a, b)
    };
    $.prototype.render = $.prototype.bc;
    $.prototype.print = function (a, b, c) {
        be(a, b, this.Q(), c)
    };
    $.prototype.print = $.prototype.print;
    $.prototype.Yb = function (a, b, c) {
        return ce(a, b, this.Q(), c)
    };
    $.prototype.print2 = $.prototype.Yb;
    $.prototype.Zb = function (a, b, c, d, e) {
        return de(a, b, this.Q(), c, d, e)
    };
    $.prototype.printAndPollStatus = $.prototype.Zb;
    var ee = ["AddressObject", "TextObject", "BarcodeObject", "ShapeObject", "CounterObject", "ImageObject", "CircularTextObject", "DateTimeObject"];

    function fe(a, b) {
        var c = b || ee;
        return ac(a.Qa.documentElement, function (d) {
            return d.nodeType == 1 && Ea(c, d.tagName) >= 0
        })
    }

    $.prototype.Ob = function () {
        for (var a = fe(this), b = [], c = 0; c < a.length; c++)b.push(S(T(a[c], "Name")));
        return b
    };
    $.prototype.getObjectNames = $.prototype.Ob;
    function ge(a) {
        return fe(a, ["AddressObject"])
    }

    $.prototype.Kb = function () {
        return ge(this).length
    };
    $.prototype.getAddressObjectCount = $.prototype.Kb;
    $.prototype.Jb = function (a) {
        return S(T(ge(this)[a], "BarcodePosition"))
    };
    $.prototype.getAddressBarcodePosition = $.prototype.Jb;
    $.prototype.dc = function (a, b) {
        if (!(b == "AboveAddress" || b == "BelowAddress" || b == "Suppress"))i(Error("verifyAddressBarcodePosition(): barcode position '" + b + "' is invalid value"));
        U(T(ge(this)[a], "BarcodePosition"), b);
        return this
    };
    $.prototype.setAddressBarcodePosition = $.prototype.dc;
    $.prototype.Lb = function (a) {
        return he(this, ge(this)[a])
    };
    $.prototype.getAddressText = $.prototype.Lb;
    $.prototype.ec = function (a, b) {
        return ie(this, ge(this)[a], b)
    };
    $.prototype.setAddressText = $.prototype.ec;
    function je(a, b) {
        for (var c = fe(a), d = 0; d < c.length; d++) {
            var e = c[d];
            if (S(T(e, "Name")) == b)return e
        }
        i(Error("getObjectByNameElement(): no object with name '" + b + "' was found"))
    }

    function he(a, b) {
        return Ga(T(b, "StyledText").getElementsByTagName("String"), function (c, d) {
            return c + S(d)
        }, "")
    }

    $.prototype.Pb = function (a) {
        a = je(this, a);
        switch (a.tagName) {
            case "AddressObject":
            case "TextObject":
                return he(this, a);
            case "BarcodeObject":
                return S(T(a, "Text"));
            case "ImageObject":
                if (a = T(a, "Image"))return S(a); else break;
            case "CircularTextObject":
                return S(T(a, "Text"))
        }
        return""
    };
    $.prototype.getObjectText = $.prototype.Pb;
    function ie(a, b, c) {
        for (var d = T(b, "StyledText"), e = [], f = d.getElementsByTagName("Element"), g = l, h = 0; h < f.length; h++) {
            var j = f[h], k = S(T(j, "String"));
            if (k && k.length) {
                k = k.split("\n");
                var o = k.length;
                if (!(o == 1 && !g)) {
                    var r = 0;
                    g || (r = 1);
                    for (g = T(j, "Attributes"); r < o - 1; r++)e.push(g);
                    if (k[o - 1].length > 0) {
                        e.push(g);
                        g = n
                    } else g = l
                }
            }
        }
        f = T(b, "LineFonts");
        b = [];
        if (f)b = f.getElementsByTagName("Font");
        var t;
        if (b.length == 0)t = J('<Font Family="Arial" Size="12" Bold="False" Italic="False" Underline="False" Strikeout="False" />').documentElement;
        for (f = J('<ForeColor Alpha="255" Red="0" Green="0" Blue="0" />').documentElement; d.firstChild;)d.removeChild(d.firstChild);
        c = c.split("\n");
        for (h = 0; h < c.length; h++) {
            r = c[h].replace("\r", "");
            if (h < c.length - 1)r += "\n";
            g = t;
            if (b.length > 0)g = h < b.length ? b[h] : b[b.length - 1]; else if (e.length > 0)g = h < e.length ? T(e[h], "Font") : T(e[e.length - 1], "Font");
            j = f;
            if (h < e.length)j = T(e[h], "ForeColor");
            k = d.ownerDocument.createElement("Element");
            o = d.ownerDocument.createElement("String");
            U(o, r);
            r = d.ownerDocument.createElement("Attributes");
            r.appendChild(g.cloneNode(l));
            r.appendChild(j.cloneNode(l));
            k.appendChild(o);
            k.appendChild(r);
            d.appendChild(k)
        }
        return a
    }

    $.prototype.gc = function (a, b) {
        var c = je(this, a);
        switch (c.tagName) {
            case "AddressObject":
                ie(this, c, b);
                break;
            case "TextObject":
                ie(this, c, b);
                break;
            case "BarcodeObject":
                U(T(c, "Text"), b);
                break;
            case "ImageObject":
                var d = T(c, "Image");
                if (d)U(d, b); else {
                    var e = T(c, "ImageLocation");
                    if (!e)i(Error("setObjectText(): <ImageLocation> is expected but not found: " + fc(d)));
                    d = e.ownerDocument.createElement("Image");
                    U(d, b);
                    c.replaceChild(d, e)
                }
                break;
            case "CircularTextObject":
                U(T(c, "Text"), b);
                break;
            case "DateTimeObject":
                U(T(c,
                    "PreText"), b);
                break;
            case "CounterObject":
                U(T(c, "PreText"), b)
        }
        return this
    };
    $.prototype.setObjectText = $.prototype.gc;
    $.prototype.toString = function () {
        return this.Q()
    };
    s("dymo.label.framework.VERSION", "1.2.4", void 0);
    function ke(a, b, c) {
        this.isBrowserSupported = a;
        this.isFrameworkInstalled = b;
        this.errorDetails = c
    }

    function Vd() {
        var a = {la: n, $: n, F: ""}, b = window.navigator.platform;
        if (b.indexOf("Win") != -1)if (typeof ActiveXObject != "undefined") {
            a.la = l;
            try {
                if (typeof new ActiveXObject("DYMOLabelFrameworkIEPlugin.Plugin") != "object")a.F = "Unable to create DYMO.Label.Framework ActiveX object. Check that DYMO.Label.Framework is installed"; else a.$ = l
            } catch (c) {
                a.F = "Unable to create DYMO.Label.Framework ActiveX object. Check that DYMO.Label.Framework is installed. Exception details: " + c
            }
        } else {
            a.la = l;
            if (Od("application/x-dymolabel"))a.$ =
                l; else a.F = "DYMO Label Framework Plugin is not installed"
        } else if (b.indexOf("Mac") != -1) {
            a.la = l;
            if (Od("application/x-dymolabel")) {
                b = Pd();
                if (b.GetAPIVersion() >= "2.0")a.$ = l; else a.F = "DYMO Label Safari Plugin is installed but outdated. Install the latest version."
            } else if (Od("application/x-npapi-dymolabel")) {
                b = Td();
                if (!b || !b.getPrinters)a.F = 'DYMO NSAPI plugin is loaded but no callable functions found. If running Safari, then run it in 64-bit mode (MacOS X >= 10.7) or set "Open using Rosetta" option';
                else a.$ = l
            } else a.F = "DYMO Label Plugin is not installed."
        } else a.F = "The operating system is not supported.";
        return new ke(a.la, a.$, a.F)
    }

    s("dymo.label.framework.checkEnvironment", Vd, void 0);
    var le = {};

    function me(a, b, c) {
        this.l = a;
        this.$b = b;
        this.ac = c
    }

    me.prototype.getPrinters = function () {
        var a = ne(this.ac), b = new E(this.l), c = this.$b;
        if (c == "")c = b.t;
        for (b = 0; b < a.length; ++b) {
            var d = a[b], e = d.name;
            d.name = e + " @ " + c;
            d.l = this.l;
            d.location = c;
            d.ea = e;
            d.printerUri = d.l;
            d.location = d.location;
            d.localName = d.ea
        }
        return a
    };
    s("dymo.label.framework.addPrinterUri", function (a, b, c, d) {
        var e = b || "";
        w(e) || (e = e.toString());
        b = m;
        if (d)b = function () {
            d(a)
        };
        var f = cb(a, "getPrinters");
        (new gc(f, "callback")).send(m, function (g) {
            le[a] = new me(a, e, g);
            c && c(a)
        }, b)
    }, void 0);
    s("dymo.label.framework.removePrinterUri", function (a) {
        delete le[a]
    }, void 0);
    s("dymo.label.framework.removeAllPrinterUri", function () {
        le = {}
    }, void 0);
    function ne(a) {
        var b = J(a);
        a = [];
        var c = T(b, "Printers");
        b = c.getElementsByTagName("LabelWriterPrinter");
        for (var d = 0; d < b.length; d++) {
            var e = S(T(b[d], "Name")), f = S(T(b[d], "ModelName")), g = S(T(b[d], "IsConnected")) == "True", h = S(T(b[d], "IsLocal")) == "True", j = S(T(b[d], "IsTwinTurbo")) == "True";
            e = new Xd(e, f, g, h, j);
            a[d] = e;
            a[e.name] = e
        }
        c = c.getElementsByTagName("TapePrinter");
        for (d = 0; d < c.length; d++) {
            e = S(T(c[d], "Name"));
            f = S(T(c[d], "ModelName"));
            g = S(T(c[d], "IsConnected")) == "True";
            h = S(T(c[d], "IsLocal")) == "True";
            j = S(T(c[d],
                "IsAutoCutSupported")) == "True";
            e = new Yd(e, f, g, h, j);
            a[d + b.length] = e;
            a[e.name] = e
        }
        return a
    }

    function oe() {
        var a = [];
        try {
            var b = W().getPrinters();
            a = ne(b)
        } catch (c) {
        }
        for (var d in le) {
            b = le[d].getPrinters();
            for (var e = 0; e < b.length; ++e) {
                var f = b[e];
                a.push(f);
                a[f.name] = f
            }
        }
        return a
    }

    s("dymo.label.framework.getPrinters", oe, void 0);
    function pe(a) {
        for (var b = [], c = oe(), d = 0; d < c.length; d++) {
            var e = c[d];
            e.printerType == a && b.push(e)
        }
        return b
    }

    s("dymo.label.framework.getLabelWriterPrinters", function () {
        return pe("LabelWriterPrinter")
    }, void 0);
    s("dymo.label.framework.getTapePrinters", function () {
        return pe("TapePrinter")
    }, void 0);
    s("dymo.label.framework.openLabelFile", function (a) {
        return new $(W().openLabelFile(a))
    }, void 0);
    s("dymo.label.framework.openLabelXml", function (a) {
        M("dymo.label.framework").info(a);
        return new $(a)
    }, void 0);
    function be(a, b, c, d) {
        b = b || "";
        d = d || "";
        if (typeof d != "string")d = d.toString();
        if (typeof c == "undefined")i(Error("printLabel(): labelXml parameter should be specified"));
        if (typeof c != "string")c = c.toString();
        var e = oe()[a];
        if (e != m)e.l != "" ? qe(e, b, c, d) : W().printLabel(e.name, b, c, d); else i(Error("printLabel(): unknown printer '" + a + "'"))
    }

    s("dymo.label.framework.printLabel", be, void 0);
    function ce(a, b, c, d) {
        b = b || "";
        d = d || "";
        if (typeof d != "string")d = d.toString();
        if (typeof c == "undefined")i(Error("printLabel2(): labelXml parameter should be specified"));
        if (typeof c != "string")c = c.toString();
        var e = oe()[a];
        if (e != m)return e.l != "" ? qe(e, b, c, d) : new X(e, W().printLabel2(a, b, c, d)); else i(Error("printLabel(): unknown printer '" + a + "'"))
    }

    s("dymo.label.framework.printLabel2", ce, void 0);
    function qe(a, b, c, d) {
        function e(j, k) {
            var o = j * 4E3, r = "";
            if (o >= h.length)j = -1; else r = h.substr(o, 4E3);
            (new gc(g, "c")).send({j: f, cid: j, pl: r}, function (t) {
                var B = t.status;
                if (B == 0)j != -1 ? e(++j, 0) : M("dymo.label.framework").info("Finished sending job payload for " + f); else if (B == -5)k < 10 ? e(++t.lastAckChunkId, ++k) : M("dymo.label.framework").error('Unable to send print job data for "' + f + '": STATUS_INVALID_CHUNK_ID: Max retry count reached'); else k < 10 ? e(j, ++k) : M("dymo.label.framework").error('Unable to send print job data for "' +
                    f + '": Max retry count reached')
            }, function () {
                k < 10 ? e(j, ++k) : M("dymo.label.framework").error('Unable to send print job data for "' + f + '": error: Max retry count reached')
            })
        }

        var f = Fd();
        b = {printerName: a.ea, labelXml: c, printParamsXml: b, labelSetXml: d};
        var g = tb(a.l, "pl"), h = nd(new md, b);
        e(0, 0);
        return new X(a, f)
    }

    function de(a, b, c, d, e, f) {
        function g(j) {
            if (e(h, j)) {
                var k = new gd(function () {
                    h.Da(g);
                    k.D()
                }, f);
                k.start()
            }
        }

        var h = ce(a, b, c, d);
        h.Da(g);
        return h
    }

    s("dymo.label.framework.printLabelAndPollStatus", de, void 0);
    function ae(a, b, c) {
        if (typeof a == "undefined")i(Error("renderLabel(): labelXml parameter should be specified"));
        if (typeof a != "string")a = a.toString();
        return W().renderLabel(a, b || "", c || "")
    }

    s("dymo.label.framework.renderLabel", ae, void 0);
    function re(a, b, c, d) {
        var e = {};
        e.requestId = a;
        e.imageData = d;
        e.statusId = b;
        e.statusMessage = c;
        return e
    }

    s("dymo.label.framework.renderLabelAsync", function (a, b, c, d) {
        if (typeof a == "undefined")i(Error("renderLabelAsync(): labelXml parameter should be specified"));
        if (!b)i(Error("renderLabelAsync(): callback parameter should be specified"));
        if (typeof a != "string")a = a.toString();
        c = c || "";
        d = d || "";
        var e = oe()[d];
        if (d == m || e != m && e.l == "") {
            var f;
            try {
                var g = W().renderLabel(a, c, d);
                f = re("", "Ready", "", g)
            } catch (h) {
                f = re("", "Error", h.message || h, "")
            }
            b(f)
        } else {
            if (e == m)i(Error("printLabel(): unknown printer '" + d + "'"));
            var j =
                Fd();
            wd(tb(e.l, "renderLabel"), m, "POST", l, {requestId: j, printerName: e.ea, labelXml: a, renderParamsXml: c});
            var k, o = (new Date).getTime();
            k = new gd(function () {
                if ((new Date).getTime() - o > 3E4) {
                    k.D();
                    k = m;
                    b(re(j, "Timeout", "", ""))
                } else(new gc(tb(e.l, "getRenderLabelStatus"), "callback")).send({requestId: j}, function (r) {
                    var t = r.statusId;
                    if (t == "NotStarted" || t == "Processing") {
                        k.stop();
                        k.start(1E3)
                    } else {
                        k.D();
                        k = m;
                        b(r)
                    }
                }, function () {
                    k.start(1E3)
                })
            }, 500);
            k.start()
        }
    }, void 0);
    s("dymo.label.framework.loadImageAsPngBase64", function (a) {
        return W().loadImageAsPngBase64(a)
    }, void 0);
    s("dymo.label.framework.createLabelWriterPrintParamsXml", function (a) {
        if (!a)return"";
        var b = J("<LabelWriterPrintParams/>"), c = b.documentElement;
        a.copies && R(c, "Copies", a.copies.toString());
        a.jobTitle && R(c, "JobTitle", a.jobTitle);
        a.flowDirection && R(c, "FlowDirection", a.flowDirection);
        a.printQuality && R(c, "PrintQuality", a.printQuality);
        a.twinTurboRoll && R(c, "TwinTurboRoll", a.twinTurboRoll);
        return fc(b)
    }, void 0);
    s("dymo.label.framework.createTapePrintParamsXml", function (a) {
        if (!a)return"";
        var b = J("<TapePrintParams/>"), c = b.documentElement;
        a.copies && R(c, "Copies", a.copies.toString());
        a.jobTitle && R(c, "JobTitle", a.jobTitle);
        a.flowDirection && R(c, "FlowDirection", a.flowDirection);
        a.alignment && R(c, "Alignment", a.alignment);
        a.cutMode && R(c, "CutMode", a.cutMode);
        return fc(b)
    }, void 0);
    s("dymo.label.framework.createLabelRenderParamsXml", function (a) {
        function b(e, f) {
            R(d, e, undefined, {Alpha: f.a || f.alpha || 255, Red: f.r || f.red || 0, Green: f.g || f.green || 0, Blue: f.b || f.blue || 0})
        }

        if (!a)return"";
        var c = J("<LabelRenderParams/>"), d = c.documentElement;
        a.labelColor && b("LabelColor", a.labelColor);
        a.shadowColor && b("ShadowColor", a.shadowColor);
        typeof a.shadowDepth != "undefined" && R(d, "ShadowDepth", a.shadowDepth.toString());
        a.flowDirection && R(d, "FlowDirection", a.flowDirection);
        if (typeof a.pngUseDisplayResolution !=
            "undefined")R(d, "PngUseDisplayResolution", a.pngUseDisplayResolution ? "True" : "False");
        return fc(c)
    }, void 0);
})();