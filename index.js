import './shim.js'

/*
 Coinjs 0.01 beta by OutCast3k{at}gmail.com
 A bitcoin framework.

 http://github.com/OutCast3k/coinjs or http://coinb.in/coinjs
*/

module.exports = function() {
    ! function() {
        function t(t) {
            throw t
        }
        var e = null;

        function r(t, e) {
            this.a = t, this.b = e
        }

        function i(t, e) {
            var r, i = [],
                n = (1 << e) - 1,
                s = t.length * e;
            for (r = 0; r < s; r += e) i[r >>> 5] |= (t.charCodeAt(r / e) & n) << 32 - e - r % 32;
            return {
                value: i,
                binLen: s
            }
        }

        function n(e) {
            var r, i, n = [],
                s = e.length;
            for (0 != s % 2 && t("String of HEX type must be in byte increments"), r = 0; r < s; r += 2) i = parseInt(e.substr(r, 2), 16), isNaN(i) && t("String of HEX type contains invalid characters"), n[r >>> 3] |= i << 24 - r % 8 * 4;
            return {
                value: n,
                binLen: 4 * s
            }
        }

        function s(e) {
            var r, i, n, s, o, u = [],
                a = 0;
            for (-1 === e.search(/^[a-zA-Z0-9=+\/]+$/) && t("Invalid character in base-64 string"), r = e.indexOf("="), e = e.replace(/\=/g, ""), -1 !== r && r < e.length && t("Invalid '=' found in base-64 string"), i = 0; i < e.length; i += 4) {
                for (o = e.substr(i, 4), n = s = 0; n < o.length; n += 1) r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(o[n]), s |= r << 18 - 6 * n;
                for (n = 0; n < o.length - 1; n += 1) u[a >> 2] |= (s >>> 16 - 8 * n & 255) << 24 - a % 4 * 8, a += 1
            }
            return {
                value: u,
                binLen: 8 * a
            }
        }

        function o(t, e) {
            var r, i, n = "",
                s = 4 * t.length;
            for (r = 0; r < s; r += 1) i = t[r >>> 2] >>> 8 * (3 - r % 4), n += "0123456789abcdef".charAt(i >>> 4 & 15) + "0123456789abcdef".charAt(15 & i);
            return e.outputUpper ? n.toUpperCase() : n
        }

        function u(t, e) {
            var r, i, n, s = "",
                o = 4 * t.length;
            for (r = 0; r < o; r += 3)
                for (n = (t[r >>> 2] >>> 8 * (3 - r % 4) & 255) << 16 | (t[r + 1 >>> 2] >>> 8 * (3 - (r + 1) % 4) & 255) << 8 | t[r + 2 >>> 2] >>> 8 * (3 - (r + 2) % 4) & 255, i = 0; 4 > i; i += 1) s = 8 * r + 6 * i <= 32 * t.length ? s + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(n >>> 6 * (3 - i) & 63) : s + e.b64Pad;
            return s
        }

        function a(e) {
            var r = {
                outputUpper: !1,
                b64Pad: "="
            };
            try {
                e.hasOwnProperty("outputUpper") && (r.outputUpper = e.outputUpper), e.hasOwnProperty("b64Pad") && (r.b64Pad = e.b64Pad)
            } catch (t) {}
            return "boolean" != typeof r.outputUpper && t("Invalid outputUpper formatting option"), "string" != typeof r.b64Pad && t("Invalid b64Pad formatting option"), r
        }

        function h(t, i) {
            var n = e;
            n = new r(t.a, t.b);
            return 32 >= i ? new r(n.a >>> i | n.b << 32 - i & 4294967295, n.b >>> i | n.a << 32 - i & 4294967295) : new r(n.b >>> i - 32 | n.a << 64 - i & 4294967295, n.a >>> i - 32 | n.b << 64 - i & 4294967295)
        }

        function c(t, e) {
            return 32 >= e ? new r(t.a >>> e, t.b >>> e | t.a << 32 - e & 4294967295) : new r(0, t.a >>> e - 32)
        }

        function p(t, e, i) {
            return new r(t.a & e.a ^ ~t.a & i.a, t.b & e.b ^ ~t.b & i.b)
        }

        function f(t, e, i) {
            return new r(t.a & e.a ^ t.a & i.a ^ e.a & i.a, t.b & e.b ^ t.b & i.b ^ e.b & i.b)
        }

        function l(t) {
            var e = h(t, 28),
                i = h(t, 34);
            return t = h(t, 39), new r(e.a ^ i.a ^ t.a, e.b ^ i.b ^ t.b)
        }

        function y(t) {
            var e = h(t, 14),
                i = h(t, 18);
            return t = h(t, 41), new r(e.a ^ i.a ^ t.a, e.b ^ i.b ^ t.b)
        }

        function d(t) {
            var e = h(t, 1),
                i = h(t, 8);
            return t = c(t, 7), new r(e.a ^ i.a ^ t.a, e.b ^ i.b ^ t.b)
        }

        function v(t) {
            var e = h(t, 19),
                i = h(t, 61);
            return t = c(t, 6), new r(e.a ^ i.a ^ t.a, e.b ^ i.b ^ t.b)
        }

        function g(t, e) {
            var i, n, s;
            return i = (65535 & t.b) + (65535 & e.b), s = (65535 & (n = (t.b >>> 16) + (e.b >>> 16) + (i >>> 16))) << 16 | 65535 & i, i = (65535 & t.a) + (65535 & e.a) + (n >>> 16), new r((65535 & (n = (t.a >>> 16) + (e.a >>> 16) + (i >>> 16))) << 16 | 65535 & i, s)
        }

        function m(t, e, i, n) {
            var s, o, u;
            return s = (65535 & t.b) + (65535 & e.b) + (65535 & i.b) + (65535 & n.b), u = (65535 & (o = (t.b >>> 16) + (e.b >>> 16) + (i.b >>> 16) + (n.b >>> 16) + (s >>> 16))) << 16 | 65535 & s, s = (65535 & t.a) + (65535 & e.a) + (65535 & i.a) + (65535 & n.a) + (o >>> 16), new r((65535 & (o = (t.a >>> 16) + (e.a >>> 16) + (i.a >>> 16) + (n.a >>> 16) + (s >>> 16))) << 16 | 65535 & s, u)
        }

        function b(t, e, i, n, s) {
            var o, u, a;
            return o = (65535 & t.b) + (65535 & e.b) + (65535 & i.b) + (65535 & n.b) + (65535 & s.b), a = (65535 & (u = (t.b >>> 16) + (e.b >>> 16) + (i.b >>> 16) + (n.b >>> 16) + (s.b >>> 16) + (o >>> 16))) << 16 | 65535 & o, o = (65535 & t.a) + (65535 & e.a) + (65535 & i.a) + (65535 & n.a) + (65535 & s.a) + (u >>> 16), new r((65535 & (u = (t.a >>> 16) + (e.a >>> 16) + (i.a >>> 16) + (n.a >>> 16) + (s.a >>> 16) + (o >>> 16))) << 16 | 65535 & o, a)
        }

        function w(e, i, n) {
            var s, o, u, a, h, c, w, B, T, C, F, k, x, S, A, E, H, I, q, O, D, P, M, _, R, N, L, z, U = [];
            for ("SHA-384" === n || "SHA-512" === n ? (F = 80, s = 31 + (i + 128 >>> 10 << 5), S = 32, A = 2, E = g, H = m, I = b, q = d, O = v, D = l, P = y, _ = f, M = p, N = [new(R = r)(1116352408, 3609767458), new R(1899447441, 602891725), new R(3049323471, 3964484399), new R(3921009573, 2173295548), new R(961987163, 4081628472), new R(1508970993, 3053834265), new R(2453635748, 2937671579), new R(2870763221, 3664609560), new R(3624381080, 2734883394), new R(310598401, 1164996542), new R(607225278, 1323610764), new R(1426881987, 3590304994), new R(1925078388, 4068182383), new R(2162078206, 991336113), new R(2614888103, 633803317), new R(3248222580, 3479774868), new R(3835390401, 2666613458), new R(4022224774, 944711139), new R(264347078, 2341262773), new R(604807628, 2007800933), new R(770255983, 1495990901), new R(1249150122, 1856431235), new R(1555081692, 3175218132), new R(1996064986, 2198950837), new R(2554220882, 3999719339), new R(2821834349, 766784016), new R(2952996808, 2566594879), new R(3210313671, 3203337956), new R(3336571891, 1034457026), new R(3584528711, 2466948901), new R(113926993, 3758326383), new R(338241895, 168717936), new R(666307205, 1188179964), new R(773529912, 1546045734), new R(1294757372, 1522805485), new R(1396182291, 2643833823), new R(1695183700, 2343527390), new R(1986661051, 1014477480), new R(2177026350, 1206759142), new R(2456956037, 344077627), new R(2730485921, 1290863460), new R(2820302411, 3158454273), new R(3259730800, 3505952657), new R(3345764771, 106217008), new R(3516065817, 3606008344), new R(3600352804, 1432725776), new R(4094571909, 1467031594), new R(275423344, 851169720), new R(430227734, 3100823752), new R(506948616, 1363258195), new R(659060556, 3750685593), new R(883997877, 3785050280), new R(958139571, 3318307427), new R(1322822218, 3812723403), new R(1537002063, 2003034995), new R(1747873779, 3602036899), new R(1955562222, 1575990012), new R(2024104815, 1125592928), new R(2227730452, 2716904306), new R(2361852424, 442776044), new R(2428436474, 593698344), new R(2756734187, 3733110249), new R(3204031479, 2999351573), new R(3329325298, 3815920427), new R(3391569614, 3928383900), new R(3515267271, 566280711), new R(3940187606, 3454069534), new R(4118630271, 4000239992), new R(116418474, 1914138554), new R(174292421, 2731055270), new R(289380356, 3203993006), new R(460393269, 320620315), new R(685471733, 587496836), new R(852142971, 1086792851), new R(1017036298, 365543100), new R(1126000580, 2618297676), new R(1288033470, 3409855158), new R(1501505948, 4234509866), new R(1607167915, 987167468), new R(1816402316, 1246189591)], C = "SHA-384" === n ? [new R(3418070365, 3238371032), new R(1654270250, 914150663), new R(2438529370, 812702999), new R(355462360, 4144912697), new R(1731405415, 4290775857), new R(41048885895, 1750603025), new R(3675008525, 1694076839), new R(1203062813, 3204075428)] : [new R(1779033703, 4089235720), new R(3144134277, 2227873595), new R(1013904242, 4271175723), new R(2773480762, 1595750129), new R(1359893119, 2917565137), new R(2600822924, 725511199), new R(528734635, 4215389547), new R(1541459225, 327033209)]) : t("Unexpected error in SHA-2 implementation"), e[i >>> 5] |= 128 << 24 - i % 32, e[s] = i, L = e.length, k = 0; k < L; k += S) {
                for (i = C[0], s = C[1], o = C[2], u = C[3], a = C[4], h = C[5], c = C[6], w = C[7], x = 0; x < F; x += 1) U[x] = 16 > x ? new R(e[x * A + k], e[x * A + k + 1]) : H(O(U[x - 2]), U[x - 7], q(U[x - 15]), U[x - 16]), B = I(w, P(a), M(a, h, c), N[x], U[x]), T = E(D(i), _(i, s, o)), w = c, c = h, h = a, a = E(u, B), u = o, o = s, s = i, i = E(B, T);
                C[0] = E(i, C[0]), C[1] = E(s, C[1]), C[2] = E(o, C[2]), C[3] = E(u, C[3]), C[4] = E(a, C[4]), C[5] = E(h, C[5]), C[6] = E(c, C[6]), C[7] = E(w, C[7])
            }
            return "SHA-384" === n ? z = [C[0].a, C[0].b, C[1].a, C[1].b, C[2].a, C[2].b, C[3].a, C[3].b, C[4].a, C[4].b, C[5].a, C[5].b] : "SHA-512" === n ? z = [C[0].a, C[0].b, C[1].a, C[1].b, C[2].a, C[2].b, C[3].a, C[3].b, C[4].a, C[4].b, C[5].a, C[5].b, C[6].a, C[6].b, C[7].a, C[7].b] : t("Unexpected error in SHA-2 implementation"), z
        }
        window.jsSHA = function(r, h, c) {
            var p = e,
                f = e,
                l = 0,
                y = [0],
                d = 0,
                v = e;
            8 === (d = void 0 !== c ? c : 8) || 16 === d || t("charSize must be 8 or 16"), "HEX" === h ? (0 != r.length % 2 && t("srcString of HEX type must be in byte increments"), v = n(r), l = v.binLen, y = v.value) : "ASCII" === h || "TEXT" === h ? (v = i(r, d), l = v.binLen, y = v.value) : "B64" === h ? (v = s(r), l = v.binLen, y = v.value) : t("inputFormat must be HEX, TEXT, ASCII, or B64"), this.getHash = function(r, i, n) {
                var s = e,
                    h = y.slice(),
                    c = "";
                switch (i) {
                    case "HEX":
                        s = o;
                        break;
                    case "B64":
                        s = u;
                        break;
                    default:
                        t("format must be HEX or B64")
                }
                return "SHA-384" === r ? (e === p && (p = w(h, l, r)), c = s(p, a(n))) : "SHA-512" === r ? (e === f && (f = w(h, l, r)), c = s(f, a(n))) : t("Chosen SHA variant is not supported"), c
            }, this.getHMAC = function(r, h, c, p, f) {
                var v, g, m, b, B, T = [],
                    C = [],
                    F = e;
                switch (p) {
                    case "HEX":
                        v = o;
                        break;
                    case "B64":
                        v = u;
                        break;
                    default:
                        t("outputFormat must be HEX or B64")
                }
                for ("SHA-384" === c ? (m = 128, B = 384) : "SHA-512" === c ? (m = 128, B = 512) : t("Chosen SHA variant is not supported"), "HEX" === h ? (b = (F = n(r)).binLen, g = F.value) : "ASCII" === h || "TEXT" === h ? (b = (F = i(r, d)).binLen, g = F.value) : "B64" === h ? (b = (F = s(r)).binLen, g = F.value) : t("inputFormat must be HEX, TEXT, ASCII, or B64"), r = 8 * m, h = m / 4 - 1, m < b / 8 ? (g = w(g, b, c))[h] &= 4294967040 : m > b / 8 && (g[h] &= 4294967040), m = 0; m <= h; m += 1) T[m] = 909522486 ^ g[m], C[m] = 1549556828 ^ g[m];
                return v(c = w(C.concat(w(T.concat(y), r + l, c)), r + B, c), a(f))
            }
        }
    }();
    var t, e, r = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13],
        n = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11],
        s = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6],
        u = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11],
        a = [0, 1518500249, 1859775393, 2400959708, 2840853838],
        h = [1352829926, 1548603684, 1836072691, 2053994217, 0],
        c = function(t) {
            for (var e = [], r = 0, i = 0; r < t.length; r++, i += 8) e[i >>> 5] |= t[r] << 24 - i % 32;
            return e
        },
        p = function(t) {
            for (var e = [], r = 0; r < 32 * t.length; r += 8) e.push(t[r >>> 5] >>> 24 - r % 32 & 255);
            return e
        },
        f = function(t, e, i) {
            for (var o = 0; o < 16; o++) {
                var c = i + o,
                    p = e[c];
                e[c] = 16711935 & (p << 8 | p >>> 24) | 4278255360 & (p << 24 | p >>> 8)
            }
            var f, y, v, B, T, C, F, k, x, S, A;
            C = f = t[0], F = y = t[1], k = v = t[2], x = B = t[3], S = T = t[4];
            for (o = 0; o < 80; o += 1) A = f + e[i + r[o]] | 0, A += o < 16 ? l(y, v, B) + a[0] : o < 32 ? d(y, v, B) + a[1] : o < 48 ? g(y, v, B) + a[2] : o < 64 ? m(y, v, B) + a[3] : b(y, v, B) + a[4], A = (A = w(A |= 0, s[o])) + T | 0, f = T, T = B, B = w(v, 10), v = y, y = A, A = C + e[i + n[o]] | 0, A += o < 16 ? b(F, k, x) + h[0] : o < 32 ? m(F, k, x) + h[1] : o < 48 ? g(F, k, x) + h[2] : o < 64 ? d(F, k, x) + h[3] : l(F, k, x) + h[4], A = (A = w(A |= 0, u[o])) + S | 0, C = S, S = x, x = w(k, 10), k = F, F = A;
            A = t[1] + v + x | 0, t[1] = t[2] + B + S | 0, t[2] = t[3] + T + C | 0, t[3] = t[4] + f + F | 0, t[4] = t[0] + y + k | 0, t[0] = A
        };

    function l(t, e, r) {
        return t ^ e ^ r
    }

    function d(t, e, r) {
        return t & e | ~t & r
    }

    function g(t, e, r) {
        return (t | ~e) ^ r
    }

    function m(t, e, r) {
        return t & r | e & ~r
    }

    function b(t, e, r) {
        return t ^ (e | ~r)
    }

    function w(t, e) {
        return t << e | t >>> 32 - e
    }

    function B(t) {
        var e = [1732584193, 4023233417, 2562383102, 271733878, 3285377520],
            r = c(t),
            i = 8 * t.length,
            n = 8 * t.length;
        r[i >>> 5] |= 128 << 24 - i % 32, r[14 + (i + 64 >>> 9 << 4)] = 16711935 & (n << 8 | n >>> 24) | 4278255360 & (n << 24 | n >>> 8);
        for (var s = 0; s < r.length; s += 16) f(e, r, s);
        for (s = 0; s < 5; s++) {
            var o = e[s];
            e[s] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8)
        }
        return p(e)
    }(t = window.EllipticCurve = function() {}).FieldElementFp = function(t, e) {
        this.x = e, this.q = t
    }, t.FieldElementFp.prototype.equals = function(t) {
        return t == this || this.q.equals(t.q) && this.x.equals(t.x)
    }, t.FieldElementFp.prototype.toBigInteger = function() {
        return this.x
    }, t.FieldElementFp.prototype.negate = function() {
        return new t.FieldElementFp(this.q, this.x.negate().mod(this.q))
    }, t.FieldElementFp.prototype.add = function(e) {
        return new t.FieldElementFp(this.q, this.x.add(e.toBigInteger()).mod(this.q))
    }, t.FieldElementFp.prototype.subtract = function(e) {
        return new t.FieldElementFp(this.q, this.x.subtract(e.toBigInteger()).mod(this.q))
    }, t.FieldElementFp.prototype.multiply = function(e) {
        return new t.FieldElementFp(this.q, this.x.multiply(e.toBigInteger()).mod(this.q))
    }, t.FieldElementFp.prototype.square = function() {
        return new t.FieldElementFp(this.q, this.x.square().mod(this.q))
    }, t.FieldElementFp.prototype.divide = function(e) {
        return new t.FieldElementFp(this.q, this.x.multiply(e.toBigInteger().modInverse(this.q)).mod(this.q))
    }, t.FieldElementFp.prototype.getByteLength = function() {
        return Math.floor((this.toBigInteger().bitLength() + 7) / 8)
    }, t.FieldElementFp.prototype.sqrt = function() {
        if (!this.q.testBit(0)) throw new Error("even value of q");
        if (this.q.testBit(1)) {
            var e = new t.FieldElementFp(this.q, this.x.modPow(this.q.shiftRight(2).add(T.ONE), this.q));
            return e.square().equals(this) ? e : null
        }
        var r = this.q.subtract(T.ONE),
            i = r.shiftRight(1);
        if (!this.x.modPow(i, this.q).equals(T.ONE)) return null;
        var n, s, o = r.shiftRight(2).shiftLeft(1).add(T.ONE),
            u = this.x,
            a = u.shiftLeft(2).mod(this.q);
        do {
            var h, c = new SecureRandom;
            do {
                h = new T(this.q.bitLength(), c)
            } while (h.compareTo(this.q) >= 0 || !h.multiply(h).subtract(a).modPow(i, this.q).equals(r));
            var p = t.FieldElementFp.fastLucasSequence(this.q, h, u, o);
            if (n = p[0], (s = p[1]).multiply(s).mod(this.q).equals(a)) return s.testBit(0) && (s = s.add(this.q)), s = s.shiftRight(1), new t.FieldElementFp(this.q, s)
        } while (n.equals(T.ONE) || n.equals(r));
        return null
    }, t.FieldElementFp.fastLucasSequence = function(t, e, r, i) {
        for (var n = i.bitLength(), s = i.getLowestSetBit(), o = T.ONE, u = T.TWO, a = e, h = T.ONE, c = T.ONE, p = n - 1; p >= s + 1; --p) h = h.multiply(c).mod(t), i.testBit(p) ? (c = h.multiply(r).mod(t), o = o.multiply(a).mod(t), u = a.multiply(u).subtract(e.multiply(h)).mod(t), a = a.multiply(a).subtract(c.shiftLeft(1)).mod(t)) : (c = h, o = o.multiply(u).subtract(h).mod(t), a = a.multiply(u).subtract(e.multiply(h)).mod(t), u = u.multiply(u).subtract(h.shiftLeft(1)).mod(t));
        for (c = (h = h.multiply(c).mod(t)).multiply(r).mod(t), o = o.multiply(u).subtract(h).mod(t), u = a.multiply(u).subtract(e.multiply(h)).mod(t), h = h.multiply(c).mod(t), p = 1; p <= s; ++p) o = o.multiply(u).mod(t), u = u.multiply(u).subtract(h.shiftLeft(1)).mod(t), h = h.multiply(h).mod(t);
        return [o, u]
    }, t.PointFp = function(t, e, r, i, n) {
        this.curve = t, this.x = e, this.y = r, this.z = null == i ? T.ONE : i, this.zinv = null, this.compressed = !!n
    }, t.PointFp.prototype.getX = function() {
        null == this.zinv && (this.zinv = this.z.modInverse(this.curve.q));
        var t = this.x.toBigInteger().multiply(this.zinv);
        return this.curve.reduce(t), this.curve.fromBigInteger(t)
    }, t.PointFp.prototype.getY = function() {
        null == this.zinv && (this.zinv = this.z.modInverse(this.curve.q));
        var t = this.y.toBigInteger().multiply(this.zinv);
        return this.curve.reduce(t), this.curve.fromBigInteger(t)
    }, t.PointFp.prototype.equals = function(t) {
        return t == this || (this.isInfinity() ? t.isInfinity() : t.isInfinity() ? this.isInfinity() : !!t.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(t.z)).mod(this.curve.q).equals(T.ZERO) && t.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(t.z)).mod(this.curve.q).equals(T.ZERO))
    }, t.PointFp.prototype.isInfinity = function() {
        return null == this.x && null == this.y || this.z.equals(T.ZERO) && !this.y.toBigInteger().equals(T.ZERO)
    }, t.PointFp.prototype.negate = function() {
        return new t.PointFp(this.curve, this.x, this.y.negate(), this.z)
    }, t.PointFp.prototype.add = function(e) {
        if (this.isInfinity()) return e;
        if (e.isInfinity()) return this;
        var r = e.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(e.z)).mod(this.curve.q),
            i = e.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(e.z)).mod(this.curve.q);
        if (T.ZERO.equals(i)) return T.ZERO.equals(r) ? this.twice() : this.curve.getInfinity();
        var n = new T("3"),
            s = this.x.toBigInteger(),
            o = this.y.toBigInteger(),
            u = (e.x.toBigInteger(), e.y.toBigInteger(), i.square()),
            a = u.multiply(i),
            h = s.multiply(u),
            c = r.square().multiply(this.z),
            p = c.subtract(h.shiftLeft(1)).multiply(e.z).subtract(a).multiply(i).mod(this.curve.q),
            f = h.multiply(n).multiply(r).subtract(o.multiply(a)).subtract(c.multiply(r)).multiply(e.z).add(r.multiply(a)).mod(this.curve.q),
            l = a.multiply(this.z).multiply(e.z).mod(this.curve.q);
        return new t.PointFp(this.curve, this.curve.fromBigInteger(p), this.curve.fromBigInteger(f), l)
    }, t.PointFp.prototype.twice = function() {
        if (this.isInfinity()) return this;
        if (0 == this.y.toBigInteger().signum()) return this.curve.getInfinity();
        var e = new T("3"),
            r = this.x.toBigInteger(),
            i = this.y.toBigInteger(),
            n = i.multiply(this.z),
            s = n.multiply(i).mod(this.curve.q),
            o = this.curve.a.toBigInteger(),
            u = r.square().multiply(e);
        T.ZERO.equals(o) || (u = u.add(this.z.square().multiply(o)));
        var a = (u = u.mod(this.curve.q)).square().subtract(r.shiftLeft(3).multiply(s)).shiftLeft(1).multiply(n).mod(this.curve.q),
            h = u.multiply(e).multiply(r).subtract(s.shiftLeft(1)).shiftLeft(2).multiply(s).subtract(u.square().multiply(u)).mod(this.curve.q),
            c = n.square().multiply(n).shiftLeft(3).mod(this.curve.q);
        return new t.PointFp(this.curve, this.curve.fromBigInteger(a), this.curve.fromBigInteger(h), c)
    }, t.PointFp.prototype.multiply = function(t) {
        if (this.isInfinity()) return this;
        if (0 == t.signum()) return this.curve.getInfinity();
        var e, r = t,
            i = r.multiply(new T("3")),
            n = this.negate(),
            s = this;
        for (e = i.bitLength() - 2; e > 0; --e) {
            s = s.twice();
            var o = i.testBit(e);
            o != r.testBit(e) && (s = s.add(o ? this : n))
        }
        return s
    }, t.PointFp.prototype.multiplyTwo = function(t, e, r) {
        var i;
        i = t.bitLength() > r.bitLength() ? t.bitLength() - 1 : r.bitLength() - 1;
        for (var n = this.curve.getInfinity(), s = this.add(e); i >= 0;) n = n.twice(), t.testBit(i) ? n = r.testBit(i) ? n.add(s) : n.add(this) : r.testBit(i) && (n = n.add(e)), --i;
        return n
    }, t.PointFp.prototype.getEncoded = function(e) {
        var r = this.getX().toBigInteger(),
            i = this.getY().toBigInteger(),
            n = t.integerToBytes(r, 32);
        return e ? i.isEven() ? n.unshift(2) : n.unshift(3) : (n.unshift(4), n = n.concat(t.integerToBytes(i, 32))), n
    }, t.PointFp.decodeFrom = function(e, r) {
        r[0];
        var i = r.length - 1,
            n = r.slice(1, 1 + i / 2),
            s = r.slice(1 + i / 2, 1 + i);
        n.unshift(0), s.unshift(0);
        var o = new T(n),
            u = new T(s);
        return new t.PointFp(e, e.fromBigInteger(o), e.fromBigInteger(u))
    }, t.PointFp.prototype.add2D = function(e) {
        if (this.isInfinity()) return e;
        if (e.isInfinity()) return this;
        if (this.x.equals(e.x)) return this.y.equals(e.y) ? this.twice() : this.curve.getInfinity();
        var r = e.x.subtract(this.x),
            i = e.y.subtract(this.y).divide(r),
            n = i.square().subtract(this.x).subtract(e.x),
            s = i.multiply(this.x.subtract(n)).subtract(this.y);
        return new t.PointFp(this.curve, n, s)
    }, t.PointFp.prototype.twice2D = function() {
        if (this.isInfinity()) return this;
        if (0 == this.y.toBigInteger().signum()) return this.curve.getInfinity();
        var e = this.curve.fromBigInteger(T.valueOf(2)),
            r = this.curve.fromBigInteger(T.valueOf(3)),
            i = this.x.square().multiply(r).add(this.curve.a).divide(this.y.multiply(e)),
            n = i.square().subtract(this.x.multiply(e)),
            s = i.multiply(this.x.subtract(n)).subtract(this.y);
        return new t.PointFp(this.curve, n, s)
    }, t.PointFp.prototype.multiply2D = function(t) {
        if (this.isInfinity()) return this;
        if (0 == t.signum()) return this.curve.getInfinity();
        var e, r = t,
            i = r.multiply(new T("3")),
            n = this.negate(),
            s = this;
        for (e = i.bitLength() - 2; e > 0; --e) {
            s = s.twice();
            var o = i.testBit(e);
            o != r.testBit(e) && (s = s.add2D(o ? this : n))
        }
        return s
    }, t.PointFp.prototype.isOnCurve = function() {
        var t = this.getX().toBigInteger(),
            e = this.getY().toBigInteger(),
            r = this.curve.getA().toBigInteger(),
            i = this.curve.getB().toBigInteger(),
            n = this.curve.getQ(),
            s = e.multiply(e).mod(n),
            o = t.multiply(t).multiply(t).add(r.multiply(t)).add(i).mod(n);
        return s.equals(o)
    }, t.PointFp.prototype.toString = function() {
        return "(" + this.getX().toBigInteger().toString() + "," + this.getY().toBigInteger().toString() + ")"
    }, t.PointFp.prototype.validate = function() {
        var t = this.curve.getQ();
        if (this.isInfinity()) throw new Error("Point is at infinity.");
        var e = this.getX().toBigInteger(),
            r = this.getY().toBigInteger();
        if (e.compareTo(T.ONE) < 0 || e.compareTo(t.subtract(T.ONE)) > 0) throw new Error("x coordinate out of bounds");
        if (r.compareTo(T.ONE) < 0 || r.compareTo(t.subtract(T.ONE)) > 0) throw new Error("y coordinate out of bounds");
        if (!this.isOnCurve()) throw new Error("Point is not on the curve.");
        if (this.multiply(t).isInfinity()) throw new Error("Point is not a scalar multiple of G.");
        return !0
    }, t.CurveFp = function(e, r, i) {
        this.q = e, this.a = this.fromBigInteger(r), this.b = this.fromBigInteger(i), this.infinity = new t.PointFp(this, null, null), this.reducer = new pt(this.q)
    }, t.CurveFp.prototype.getQ = function() {
        return this.q
    }, t.CurveFp.prototype.getA = function() {
        return this.a
    }, t.CurveFp.prototype.getB = function() {
        return this.b
    }, t.CurveFp.prototype.equals = function(t) {
        return t == this || this.q.equals(t.q) && this.a.equals(t.a) && this.b.equals(t.b)
    }, t.CurveFp.prototype.getInfinity = function() {
        return this.infinity
    }, t.CurveFp.prototype.fromBigInteger = function(e) {
        return new t.FieldElementFp(this.q, e)
    }, t.CurveFp.prototype.reduce = function(t) {
        this.reducer.reduce(t)
    }, t.CurveFp.prototype.decodePointHex = function(e) {
        var r = parseInt(e.substr(0, 2), 16);
        switch (r) {
            case 0:
                return this.infinity;
            case 2:
            case 3:
                var i = 1 & r,
                    n = new T(o = e.substr(2, e.length - 2), 16);
                return this.decompressPoint(i, n);
            case 4:
            case 6:
            case 7:
                var s = (e.length - 2) / 2,
                    o = e.substr(2, s),
                    u = e.substr(s + 2, s);
                return new t.PointFp(this, this.fromBigInteger(new T(o, 16)), this.fromBigInteger(new T(u, 16)));
            default:
                return null
        }
    }, t.CurveFp.prototype.encodePointHex = function(t) {
        if (t.isInfinity()) return "00";
        var e = t.getX().toBigInteger().toString(16),
            r = t.getY().toBigInteger().toString(16),
            i = this.getQ().toString(16).length;
        for (i % 2 != 0 && i++; e.length < i;) e = "0" + e;
        for (; r.length < i;) r = "0" + r;
        return "04" + e + r
    }, t.CurveFp.prototype.decompressPoint = function(e, r) {
        var i = this.fromBigInteger(r),
            n = i.multiply(i.square().add(this.getA())).add(this.getB()).sqrt();
        if (null == n) throw new Error("Invalid point compression");
        var s = n.toBigInteger();
        return (s.testBit(0) ? 1 : 0) != e && (n = this.fromBigInteger(this.getQ().subtract(s))), new t.PointFp(this, i, n, null, !0)
    }, t.fromHex = function(t) {
        return new T(t, 16)
    }, t.integerToBytes = function(t, e) {
        var r = t.toByteArrayUnsigned();
        if (e < r.length) r = r.slice(r.length - e);
        else
            for (; e > r.length;) r.unshift(0);
        return r
    }, t.X9Parameters = function(t, e, r, i) {
        this.curve = t, this.g = e, this.n = r, this.h = i
    }, t.X9Parameters.prototype.getCurve = function() {
        return this.curve
    }, t.X9Parameters.prototype.getG = function() {
        return this.g
    }, t.X9Parameters.prototype.getN = function() {
        return this.n
    }, t.X9Parameters.prototype.getH = function() {
        return this.h
    }, t.secNamedCurves = {
        secp256k1: function() {
            var e = t.fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F"),
                r = T.ZERO,
                i = t.fromHex("7"),
                n = t.fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141"),
                s = T.ONE,
                o = new t.CurveFp(e, r, i),
                u = o.decodePointHex("0479BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8");
            return new t.X9Parameters(o, u, n, s)
        }
    }, t.getSECCurveByName = function(e) {
        return void 0 == t.secNamedCurves[e] ? null : t.secNamedCurves[e]()
    };

    function T(t, e, r) {
        if (!(this instanceof T)) return new T(t, e, r);
        null != t && ("number" == typeof t ? this.fromNumber(t, e, r) : null == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e))
    }
    var C = T.prototype;

    function F() {
        return new T(null)
    }
    T.prototype.am = function(t, e, r, i, n, s) {
        for (; --s >= 0;) {
            var o = e * this[t++] + r[i] + n;
            n = Math.floor(o / 67108864), r[i++] = 67108863 & o
        }
        return n
    }, e = 26, T.prototype.DB = e, T.prototype.DM = 67108863;
    var k = T.prototype.DV = 1 << e;
    T.prototype.FV = Math.pow(2, 52), T.prototype.F1 = 26, T.prototype.F2 = 0;
    var S, A, E, H, I, O, D, P, M, _, R, N, L, z, U, X, V, Z, j, G, Y, K = "0123456789abcdefghijklmnopqrstuvwxyz",
        W = new Array;
    for (S = "0".charCodeAt(0), A = 0; A <= 9; ++A) W[S++] = A;
    for (S = "a".charCodeAt(0), A = 10; A < 36; ++A) W[S++] = A;
    for (S = "A".charCodeAt(0), A = 10; A < 36; ++A) W[S++] = A;

    function Q(t) {
        return K.charAt(t)
    }

    function J(t, e) {
        var r = W[t.charCodeAt(e)];
        return null == r ? -1 : r
    }

    function $(t) {
        var e = F();
        return e.fromInt(t), e
    }

    function tt(t) {
        var e, r = 1;
        return 0 != (e = t >>> 16) && (t = e, r += 16), 0 != (e = t >> 8) && (t = e, r += 8), 0 != (e = t >> 4) && (t = e, r += 4), 0 != (e = t >> 2) && (t = e, r += 2), 0 != (e = t >> 1) && (t = e, r += 1), r
    }

    function et(t) {
        this.m = t
    }

    function rt(t) {
        this.m = t, this.mp = t.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, this.um = (1 << t.DB - 15) - 1, this.mt2 = 2 * t.t
    }

    function F() {
        return new T(null)
    }

    function it(t, e) {
        return t & e
    }

    function nt(t, e) {
        return t | e
    }

    function st(t, e) {
        return t ^ e
    }

    function ot(t, e) {
        return t & ~e
    }

    function ut(t) {
        if (0 == t) return -1;
        var e = 0;
        return 0 == (65535 & t) && (t >>= 16, e += 16), 0 == (255 & t) && (t >>= 8, e += 8), 0 == (15 & t) && (t >>= 4, e += 4), 0 == (3 & t) && (t >>= 2, e += 2), 0 == (1 & t) && ++e, e
    }

    function at(t) {
        for (var e = 0; 0 != t;) t &= t - 1, ++e;
        return e
    }

    function ht() {}

    function ct(t) {
        return t
    }

    function pt(t) {
        this.r2 = F(), this.q3 = F(), T.ONE.dlShiftTo(2 * t.t, this.r2), this.mu = this.r2.divide(t), this.m = t
    }
    et.prototype.convert = function(t) {
            return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
        }, et.prototype.revert = function(t) {
            return t
        }, et.prototype.reduce = function(t) {
            t.divRemTo(this.m, null, t)
        }, et.prototype.mulTo = function(t, e, r) {
            t.multiplyTo(e, r), this.reduce(r)
        }, et.prototype.sqrTo = function(t, e) {
            t.squareTo(e), this.reduce(e)
        }, rt.prototype.convert = function(t) {
            var e = F();
            return t.abs().dlShiftTo(this.m.t, e), e.divRemTo(this.m, null, e), t.s < 0 && e.compareTo(T.ZERO) > 0 && this.m.subTo(e, e), e
        }, rt.prototype.revert = function(t) {
            var e = F();
            return t.copyTo(e), this.reduce(e), e
        }, rt.prototype.reduce = function(t) {
            for (; t.t <= this.mt2;) t[t.t++] = 0;
            for (var e = 0; e < this.m.t; ++e) {
                var r = 32767 & t[e],
                    i = r * this.mpl + ((r * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
                for (t[r = e + this.m.t] += this.m.am(0, i, t, e, 0, this.m.t); t[r] >= t.DV;) t[r] -= t.DV, t[++r]++
            }
            t.clamp(), t.drShiftTo(this.m.t, t), t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
        }, rt.prototype.mulTo = function(t, e, r) {
            t.multiplyTo(e, r), this.reduce(r)
        }, rt.prototype.sqrTo = function(t, e) {
            t.squareTo(e), this.reduce(e)
        }, C.copyTo = function(t) {
            for (var e = this.t - 1; e >= 0; --e) t[e] = this[e];
            t.t = this.t, t.s = this.s
        }, C.fromInt = function(t) {
            this.t = 1, this.s = t < 0 ? -1 : 0, t > 0 ? this[0] = t : t < -1 ? this[0] = t + k : this.t = 0
        }, C.fromString = function(t, e) {
            var r, i = this;
            if (16 == e) r = 4;
            else if (8 == e) r = 3;
            else if (256 == e) r = 8;
            else if (2 == e) r = 1;
            else if (32 == e) r = 5;
            else {
                if (4 != e) return void i.fromRadix(t, e);
                r = 2
            }
            i.t = 0, i.s = 0;
            for (var n = t.length, s = !1, o = 0; --n >= 0;) {
                var u = 8 == r ? 255 & t[n] : J(t, n);
                u < 0 ? "-" == t.charAt(n) && (s = !0) : (s = !1, 0 == o ? i[i.t++] = u : o + r > i.DB ? (i[i.t - 1] |= (u & (1 << i.DB - o) - 1) << o, i[i.t++] = u >> i.DB - o) : i[i.t - 1] |= u << o, (o += r) >= i.DB && (o -= i.DB))
            }
            8 == r && 0 != (128 & t[0]) && (i.s = -1, o > 0 && (i[i.t - 1] |= (1 << i.DB - o) - 1 << o)), i.clamp(), s && T.ZERO.subTo(i, i)
        }, C.clamp = function() {
            for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t;) --this.t
        }, C.dlShiftTo = function(t, e) {
            var r;
            for (r = this.t - 1; r >= 0; --r) e[r + t] = this[r];
            for (r = t - 1; r >= 0; --r) e[r] = 0;
            e.t = this.t + t, e.s = this.s
        }, C.drShiftTo = function(t, e) {
            for (var r = t; r < this.t; ++r) e[r - t] = this[r];
            e.t = Math.max(this.t - t, 0), e.s = this.s
        }, C.lShiftTo = function(t, e) {
            var r, i = this,
                n = t % i.DB,
                s = i.DB - n,
                o = (1 << s) - 1,
                u = Math.floor(t / i.DB),
                a = i.s << n & i.DM;
            for (r = i.t - 1; r >= 0; --r) e[r + u + 1] = i[r] >> s | a, a = (i[r] & o) << n;
            for (r = u - 1; r >= 0; --r) e[r] = 0;
            e[u] = a, e.t = i.t + u + 1, e.s = i.s, e.clamp()
        }, C.rShiftTo = function(t, e) {
            var r = this;
            e.s = r.s;
            var i = Math.floor(t / r.DB);
            if (i >= r.t) e.t = 0;
            else {
                var n = t % r.DB,
                    s = r.DB - n,
                    o = (1 << n) - 1;
                e[0] = r[i] >> n;
                for (var u = i + 1; u < r.t; ++u) e[u - i - 1] |= (r[u] & o) << s, e[u - i] = r[u] >> n;
                n > 0 && (e[r.t - i - 1] |= (r.s & o) << s), e.t = r.t - i, e.clamp()
            }
        }, C.subTo = function(t, e) {
            for (var r = this, i = 0, n = 0, s = Math.min(t.t, r.t); i < s;) n += r[i] - t[i], e[i++] = n & r.DM, n >>= r.DB;
            if (t.t < r.t) {
                for (n -= t.s; i < r.t;) n += r[i], e[i++] = n & r.DM, n >>= r.DB;
                n += r.s
            } else {
                for (n += r.s; i < t.t;) n -= t[i], e[i++] = n & r.DM, n >>= r.DB;
                n -= t.s
            }
            e.s = n < 0 ? -1 : 0, n < -1 ? e[i++] = r.DV + n : n > 0 && (e[i++] = n), e.t = i, e.clamp()
        }, C.multiplyTo = function(t, e) {
            var r = this.abs(),
                i = t.abs(),
                n = r.t;
            for (e.t = n + i.t; --n >= 0;) e[n] = 0;
            for (n = 0; n < i.t; ++n) e[n + r.t] = r.am(0, i[n], e, n, 0, r.t);
            e.s = 0, e.clamp(), this.s != t.s && T.ZERO.subTo(e, e)
        }, C.squareTo = function(t) {
            for (var e = this.abs(), r = t.t = 2 * e.t; --r >= 0;) t[r] = 0;
            for (r = 0; r < e.t - 1; ++r) {
                var i = e.am(r, e[r], t, 2 * r, 0, 1);
                (t[r + e.t] += e.am(r + 1, 2 * e[r], t, 2 * r + 1, i, e.t - r - 1)) >= e.DV && (t[r + e.t] -= e.DV, t[r + e.t + 1] = 1)
            }
            t.t > 0 && (t[t.t - 1] += e.am(r, e[r], t, 2 * r, 0, 1)), t.s = 0, t.clamp()
        }, C.divRemTo = function(t, e, r) {
            var i = this,
                n = t.abs();
            if (!(n.t <= 0)) {
                var s = i.abs();
                if (s.t < n.t) return null != e && e.fromInt(0), void(null != r && i.copyTo(r));
                null == r && (r = F());
                var o = F(),
                    u = i.s,
                    a = t.s,
                    h = i.DB - tt(n[n.t - 1]);
                h > 0 ? (n.lShiftTo(h, o), s.lShiftTo(h, r)) : (n.copyTo(o), s.copyTo(r));
                var c = o.t,
                    p = o[c - 1];
                if (0 != p) {
                    var f = p * (1 << i.F1) + (c > 1 ? o[c - 2] >> i.F2 : 0),
                        l = i.FV / f,
                        y = (1 << i.F1) / f,
                        d = 1 << i.F2,
                        v = r.t,
                        g = v - c,
                        m = null == e ? F() : e;
                    for (o.dlShiftTo(g, m), r.compareTo(m) >= 0 && (r[r.t++] = 1, r.subTo(m, r)), T.ONE.dlShiftTo(c, m), m.subTo(o, o); o.t < c;) o[o.t++] = 0;
                    for (; --g >= 0;) {
                        var b = r[--v] == p ? i.DM : Math.floor(r[v] * l + (r[v - 1] + d) * y);
                        if ((r[v] += o.am(0, b, r, g, 0, c)) < b)
                            for (o.dlShiftTo(g, m), r.subTo(m, r); r[v] < --b;) r.subTo(m, r)
                    }
                    null != e && (r.drShiftTo(c, e), u != a && T.ZERO.subTo(e, e)), r.t = c, r.clamp(), h > 0 && r.rShiftTo(h, r), u < 0 && T.ZERO.subTo(r, r)
                }
            }
        }, C.invDigit = function() {
            if (this.t < 1) return 0;
            var t = this[0];
            if (0 == (1 & t)) return 0;
            var e = 3 & t;
            return (e = (e = (e = (e = e * (2 - (15 & t) * e) & 15) * (2 - (255 & t) * e) & 255) * (2 - ((65535 & t) * e & 65535)) & 65535) * (2 - t * e % this.DV) % this.DV) > 0 ? this.DV - e : -e
        }, C.isEven = function() {
            return 0 == (this.t > 0 ? 1 & this[0] : this.s)
        }, C.exp = function(t, e) {
            if (t > 4294967295 || t < 1) return T.ONE;
            var r = F(),
                i = F(),
                n = e.convert(this),
                s = tt(t) - 1;
            for (n.copyTo(r); --s >= 0;)
                if (e.sqrTo(r, i), (t & 1 << s) > 0) e.mulTo(i, n, r);
                else {
                    var o = r;
                    r = i, i = o
                }
            return e.revert(r)
        }, C.toString = function(t) {
            var e, r = this;
            if (r.s < 0) return "-" + r.negate().toString(t);
            if (16 == t) e = 4;
            else if (8 == t) e = 3;
            else if (2 == t) e = 1;
            else if (32 == t) e = 5;
            else {
                if (4 != t) return r.toRadix(t);
                e = 2
            }
            var i, n = (1 << e) - 1,
                s = !1,
                o = "",
                u = r.t,
                a = r.DB - u * r.DB % e;
            if (u-- > 0)
                for (a < r.DB && (i = r[u] >> a) > 0 && (s = !0, o = Q(i)); u >= 0;) a < e ? (i = (r[u] & (1 << a) - 1) << e - a, i |= r[--u] >> (a += r.DB - e)) : (i = r[u] >> (a -= e) & n, a <= 0 && (a += r.DB, --u)), i > 0 && (s = !0), s && (o += Q(i));
            return s ? o : "0"
        }, C.negate = function() {
            var t = F();
            return T.ZERO.subTo(this, t), t
        }, C.abs = function() {
            return this.s < 0 ? this.negate() : this
        }, C.compareTo = function(t) {
            var e = this.s - t.s;
            if (0 != e) return e;
            var r = this.t;
            if (0 != (e = r - t.t)) return this.s < 0 ? -e : e;
            for (; --r >= 0;)
                if (0 != (e = this[r] - t[r])) return e;
            return 0
        }, C.bitLength = function() {
            return this.t <= 0 ? 0 : this.DB * (this.t - 1) + tt(this[this.t - 1] ^ this.s & this.DM)
        }, C.mod = function(t) {
            var e = F();
            return this.abs().divRemTo(t, null, e), this.s < 0 && e.compareTo(T.ZERO) > 0 && t.subTo(e, e), e
        }, C.modPowInt = function(t, e) {
            var r;
            return r = t < 256 || e.isEven() ? new et(e) : new rt(e), this.exp(t, r)
        }, ht.prototype.convert = ct, ht.prototype.revert = ct, ht.prototype.mulTo = function(t, e, r) {
            t.multiplyTo(e, r)
        }, ht.prototype.sqrTo = function(t, e) {
            t.squareTo(e)
        }, pt.prototype.convert = function(t) {
            if (t.s < 0 || t.t > 2 * this.m.t) return t.mod(this.m);
            if (t.compareTo(this.m) < 0) return t;
            var e = F();
            return t.copyTo(e), this.reduce(e), e
        }, pt.prototype.revert = function(t) {
            return t
        }, pt.prototype.reduce = function(t) {
            var e = this;
            for (t.drShiftTo(e.m.t - 1, e.r2), t.t > e.m.t + 1 && (t.t = e.m.t + 1, t.clamp()), e.mu.multiplyUpperTo(e.r2, e.m.t + 1, e.q3), e.m.multiplyLowerTo(e.q3, e.m.t + 1, e.r2); t.compareTo(e.r2) < 0;) t.dAddOffset(1, e.m.t + 1);
            for (t.subTo(e.r2, t); t.compareTo(e.m) >= 0;) t.subTo(e.m, t)
        }, pt.prototype.mulTo = function(t, e, r) {
            t.multiplyTo(e, r), this.reduce(r)
        }, pt.prototype.sqrTo = function(t, e) {
            t.squareTo(e), this.reduce(e)
        }, C.chunkSize = function(t) {
            return Math.floor(Math.LN2 * this.DB / Math.log(t))
        }, C.toRadix = function(t) {
            if (null == t && (t = 10), 0 == this.signum() || t < 2 || t > 36) return "0";
            var e = this.chunkSize(t),
                r = Math.pow(t, e),
                i = $(r),
                n = F(),
                s = F(),
                o = "";
            for (this.divRemTo(i, n, s); n.signum() > 0;) o = (r + s.intValue()).toString(t).substr(1) + o, n.divRemTo(i, n, s);
            return s.intValue().toString(t) + o
        }, C.fromRadix = function(t, e) {
            var r = this;
            r.fromInt(0), null == e && (e = 10);
            for (var i = r.chunkSize(e), n = Math.pow(e, i), s = !1, o = 0, u = 0, a = 0; a < t.length; ++a) {
                var h = J(t, a);
                h < 0 ? "-" == t.charAt(a) && 0 == r.signum() && (s = !0) : (u = e * u + h, ++o >= i && (r.dMultiply(n), r.dAddOffset(u, 0), o = 0, u = 0))
            }
            o > 0 && (r.dMultiply(Math.pow(e, o)), r.dAddOffset(u, 0)), s && T.ZERO.subTo(r, r)
        }, C.fromNumber = function(t, e, r) {
            var i = this;
            if ("number" == typeof e)
                if (t < 2) i.fromInt(1);
                else
                    for (i.fromNumber(t, r), i.testBit(t - 1) || i.bitwiseTo(T.ONE.shiftLeft(t - 1), nt, i), i.isEven() && i.dAddOffset(1, 0); !i.isProbablePrime(e);) i.dAddOffset(2, 0), i.bitLength() > t && i.subTo(T.ONE.shiftLeft(t - 1), i);
            else {
                var n = new Array,
                    s = 7 & t;
                n.length = 1 + (t >> 3), e.nextBytes(n), s > 0 ? n[0] &= (1 << s) - 1 : n[0] = 0, i.fromString(n, 256)
            }
        }, C.bitwiseTo = function(t, e, r) {
            var i, n, s = this,
                o = Math.min(t.t, s.t);
            for (i = 0; i < o; ++i) r[i] = e(s[i], t[i]);
            if (t.t < s.t) {
                for (n = t.s & s.DM, i = o; i < s.t; ++i) r[i] = e(s[i], n);
                r.t = s.t
            } else {
                for (n = s.s & s.DM, i = o; i < t.t; ++i) r[i] = e(n, t[i]);
                r.t = t.t
            }
            r.s = e(s.s, t.s), r.clamp()
        }, C.changeBit = function(t, e) {
            var r = T.ONE.shiftLeft(t);
            return this.bitwiseTo(r, e, r), r
        }, C.addTo = function(t, e) {
            for (var r = this, i = 0, n = 0, s = Math.min(t.t, r.t); i < s;) n += r[i] + t[i], e[i++] = n & r.DM, n >>= r.DB;
            if (t.t < r.t) {
                for (n += t.s; i < r.t;) n += r[i], e[i++] = n & r.DM, n >>= r.DB;
                n += r.s
            } else {
                for (n += r.s; i < t.t;) n += t[i], e[i++] = n & r.DM, n >>= r.DB;
                n += t.s
            }
            e.s = n < 0 ? -1 : 0, n > 0 ? e[i++] = n : n < -1 && (e[i++] = r.DV + n), e.t = i, e.clamp()
        }, C.dMultiply = function(t) {
            this[this.t] = this.am(0, t - 1, this, 0, 0, this.t), ++this.t, this.clamp()
        }, C.dAddOffset = function(t, e) {
            if (0 != t) {
                for (; this.t <= e;) this[this.t++] = 0;
                for (this[e] += t; this[e] >= this.DV;) this[e] -= this.DV, ++e >= this.t && (this[this.t++] = 0), ++this[e]
            }
        }, C.multiplyLowerTo = function(t, e, r) {
            var i, n = Math.min(this.t + t.t, e);
            for (r.s = 0, r.t = n; n > 0;) r[--n] = 0;
            for (i = r.t - this.t; n < i; ++n) r[n + this.t] = this.am(0, t[n], r, n, 0, this.t);
            for (i = Math.min(t.t, e); n < i; ++n) this.am(0, t[n], r, n, 0, e - n);
            r.clamp()
        }, C.multiplyUpperTo = function(t, e, r) {
            --e;
            var i = r.t = this.t + t.t - e;
            for (r.s = 0; --i >= 0;) r[i] = 0;
            for (i = Math.max(e - this.t, 0); i < t.t; ++i) r[this.t + i - e] = this.am(e - i, t[i], r, 0, 0, this.t + i - e);
            r.clamp(), r.drShiftTo(1, r)
        }, C.modInt = function(t) {
            if (t <= 0) return 0;
            var e = this.DV % t,
                r = this.s < 0 ? t - 1 : 0;
            if (this.t > 0)
                if (0 == e) r = this[0] % t;
                else
                    for (var i = this.t - 1; i >= 0; --i) r = (e * r + this[i]) % t;
            return r
        }, C.clone = function() {
            var t = F();
            return this.copyTo(t), t
        }, C.intValue = function() {
            if (this.s < 0) {
                if (1 == this.t) return this[0] - this.DV;
                if (0 == this.t) return -1
            } else {
                if (1 == this.t) return this[0];
                if (0 == this.t) return 0
            }
            return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
        }, C.byteValue = function() {
            return 0 == this.t ? this.s : this[0] << 24 >> 24
        }, C.shortValue = function() {
            return 0 == this.t ? this.s : this[0] << 16 >> 16
        }, C.signum = function() {
            return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
        }, C.toByteArray = function() {
            var t = this,
                e = t.t,
                r = new Array;
            r[0] = t.s;
            var i, n = t.DB - e * t.DB % 8,
                s = 0;
            if (e-- > 0)
                for (n < t.DB && (i = t[e] >> n) != (t.s & t.DM) >> n && (r[s++] = i | t.s << t.DB - n); e >= 0;) n < 8 ? (i = (t[e] & (1 << n) - 1) << 8 - n, i |= t[--e] >> (n += t.DB - 8)) : (i = t[e] >> (n -= 8) & 255, n <= 0 && (n += t.DB, --e)), 0 != (128 & i) && (i |= -256), 0 === s && (128 & t.s) != (128 & i) && ++s, (s > 0 || i != t.s) && (r[s++] = i);
            return r
        }, C.equals = function(t) {
            return 0 == this.compareTo(t)
        }, C.min = function(t) {
            return this.compareTo(t) < 0 ? this : t
        }, C.max = function(t) {
            return this.compareTo(t) > 0 ? this : t
        }, C.and = function(t) {
            var e = F();
            return this.bitwiseTo(t, it, e), e
        }, C.or = function(t) {
            var e = F();
            return this.bitwiseTo(t, nt, e), e
        }, C.xor = function(t) {
            var e = F();
            return this.bitwiseTo(t, st, e), e
        }, C.andNot = function(t) {
            var e = F();
            return this.bitwiseTo(t, ot, e), e
        }, C.not = function() {
            for (var t = F(), e = 0; e < this.t; ++e) t[e] = this.DM & ~this[e];
            return t.t = this.t, t.s = ~this.s, t
        }, C.shiftLeft = function(t) {
            var e = F();
            return t < 0 ? this.rShiftTo(-t, e) : this.lShiftTo(t, e), e
        }, C.shiftRight = function(t) {
            var e = F();
            return t < 0 ? this.lShiftTo(-t, e) : this.rShiftTo(t, e), e
        }, C.getLowestSetBit = function() {
            for (var t = 0; t < this.t; ++t)
                if (0 != this[t]) return t * this.DB + ut(this[t]);
            return this.s < 0 ? this.t * this.DB : -1
        }, C.bitCount = function() {
            for (var t = 0, e = this.s & this.DM, r = 0; r < this.t; ++r) t += at(this[r] ^ e);
            return t
        }, C.testBit = function(t) {
            var e = Math.floor(t / this.DB);
            return e >= this.t ? 0 != this.s : 0 != (this[e] & 1 << t % this.DB)
        }, C.setBit = function(t) {
            return this.changeBit(t, nt)
        }, C.clearBit = function(t) {
            return this.changeBit(t, ot)
        }, C.flipBit = function(t) {
            return this.changeBit(t, st)
        }, C.add = function(t) {
            var e = F();
            return this.addTo(t, e), e
        }, C.subtract = function(t) {
            var e = F();
            return this.subTo(t, e), e
        }, C.multiply = function(t) {
            var e = F();
            return this.multiplyTo(t, e), e
        }, C.divide = function(t) {
            var e = F();
            return this.divRemTo(t, e, null), e
        }, C.remainder = function(t) {
            var e = F();
            return this.divRemTo(t, null, e), e
        }, C.divideAndRemainder = function(t) {
            var e = F(),
                r = F();
            return this.divRemTo(t, e, r), new Array(e, r)
        }, C.modPow = function(t, e) {
            var r, i, n = t.bitLength(),
                s = $(1);
            if (n <= 0) return s;
            r = n < 18 ? 1 : n < 48 ? 3 : n < 144 ? 4 : n < 768 ? 5 : 6, i = n < 8 ? new et(e) : e.isEven() ? new pt(e) : new rt(e);
            var o = new Array,
                u = 3,
                a = r - 1,
                h = (1 << r) - 1;
            if (o[1] = i.convert(this), r > 1) {
                var c = F();
                for (i.sqrTo(o[1], c); u <= h;) o[u] = F(), i.mulTo(c, o[u - 2], o[u]), u += 2
            }
            var p, f, l = t.t - 1,
                y = !0,
                d = F();
            for (n = tt(t[l]) - 1; l >= 0;) {
                for (n >= a ? p = t[l] >> n - a & h : (p = (t[l] & (1 << n + 1) - 1) << a - n, l > 0 && (p |= t[l - 1] >> this.DB + n - a)), u = r; 0 == (1 & p);) p >>= 1, --u;
                if ((n -= u) < 0 && (n += this.DB, --l), y) o[p].copyTo(s), y = !1;
                else {
                    for (; u > 1;) i.sqrTo(s, d), i.sqrTo(d, s), u -= 2;
                    u > 0 ? i.sqrTo(s, d) : (f = s, s = d, d = f), i.mulTo(d, o[p], s)
                }
                for (; l >= 0 && 0 == (t[l] & 1 << n);) i.sqrTo(s, d), f = s, s = d, d = f, --n < 0 && (n = this.DB - 1, --l)
            }
            return i.revert(s)
        }, C.modInverse = function(t) {
            var e = t.isEven();
            if (this.isEven() && e || 0 == t.signum()) return T.ZERO;
            for (var r = t.clone(), i = this.clone(), n = $(1), s = $(0), o = $(0), u = $(1); 0 != r.signum();) {
                for (; r.isEven();) r.rShiftTo(1, r), e ? (n.isEven() && s.isEven() || (n.addTo(this, n), s.subTo(t, s)), n.rShiftTo(1, n)) : s.isEven() || s.subTo(t, s), s.rShiftTo(1, s);
                for (; i.isEven();) i.rShiftTo(1, i), e ? (o.isEven() && u.isEven() || (o.addTo(this, o), u.subTo(t, u)), o.rShiftTo(1, o)) : u.isEven() || u.subTo(t, u), u.rShiftTo(1, u);
                r.compareTo(i) >= 0 ? (r.subTo(i, r), e && n.subTo(o, n), s.subTo(u, s)) : (i.subTo(r, i), e && o.subTo(n, o), u.subTo(s, u))
            }
            return 0 != i.compareTo(T.ONE) ? T.ZERO : u.compareTo(t) >= 0 ? u.subtract(t) : u.signum() < 0 ? (u.addTo(t, u), u.signum() < 0 ? u.add(t) : u) : u
        }, C.pow = function(t) {
            return this.exp(t, new ht)
        }, C.gcd = function(t) {
            var e = this.s < 0 ? this.negate() : this.clone(),
                r = t.s < 0 ? t.negate() : t.clone();
            if (e.compareTo(r) < 0) {
                var i = e;
                e = r, r = i
            }
            var n = e.getLowestSetBit(),
                s = r.getLowestSetBit();
            if (s < 0) return e;
            for (n < s && (s = n), s > 0 && (e.rShiftTo(s, e), r.rShiftTo(s, r)); e.signum() > 0;)(n = e.getLowestSetBit()) > 0 && e.rShiftTo(n, e), (n = r.getLowestSetBit()) > 0 && r.rShiftTo(n, r), e.compareTo(r) >= 0 ? (e.subTo(r, e), e.rShiftTo(1, e)) : (r.subTo(e, r), r.rShiftTo(1, r));
            return s > 0 && r.lShiftTo(s, r), r
        }, C.square = function() {
            var t = F();
            return this.squareTo(t), t
        }, T.ZERO = $(0), T.ONE = $(1), T.valueOf = $, T.fromByteArrayUnsigned = function(t) {
            return t.length ? 128 & t[0] ? new T([0].concat(t)) : new T(t) : new T.valueOf(0)
        }, T.fromByteArraySigned = function(t) {
            return 128 & t[0] ? (t[0] &= 127, T.fromByteArrayUnsigned(t).negate()) : T.fromByteArrayUnsigned(t)
        }, T.prototype.toByteArrayUnsigned = function() {
            var t = this.abs().toByteArray();
            if (!t.length) return t;
            0 === t[0] && (t = t.slice(1));
            for (var e = 0; e < t.length; ++e) t[e] = t[e] < 0 ? t[e] + 256 : t[e];
            return t
        }, T.prototype.toByteArraySigned = function() {
            var t = this.toByteArrayUnsigned(),
                e = this.s < 0;
            return 128 & t[0] ? t.unshift(e ? 128 : 0) : e && (t[0] |= 128), t
        },
        function() {
            var t, e = (t = window.Crypto = {}).util = {
                rotl: function(t, e) {
                    return t << e | t >>> 32 - e
                },
                rotr: function(t, e) {
                    return t << 32 - e | t >>> e
                },
                endian: function(t) {
                    if (t.constructor == Number) return 16711935 & e.rotl(t, 8) | 4278255360 & e.rotl(t, 24);
                    for (var r = 0; r < t.length; r++) t[r] = e.endian(t[r]);
                    return t
                },
                randomBytes: function(t) {
                    for (var e = []; t > 0; t--) e.push(Math.floor(256 * Math.random()));
                    return e
                },
                bytesToWords: function(t) {
                    for (var e = [], r = 0, i = 0; r < t.length; r++, i += 8) e[i >>> 5] |= (255 & t[r]) << 24 - i % 32;
                    return e
                },
                wordsToBytes: function(t) {
                    for (var e = [], r = 0; r < 32 * t.length; r += 8) e.push(t[r >>> 5] >>> 24 - r % 32 & 255);
                    return e
                },
                bytesToHex: function(t) {
                    for (var e = [], r = 0; r < t.length; r++) e.push((t[r] >>> 4).toString(16)), e.push((15 & t[r]).toString(16));
                    return e.join("")
                },
                hexToBytes: function(t) {
                    for (var e = [], r = 0; r < t.length; r += 2) e.push(parseInt(t.substr(r, 2), 16));
                    return e
                },
                bytesToBase64: function(t) {
                    for (var e = [], r = 0; r < t.length; r += 3)
                        for (var i = t[r] << 16 | t[r + 1] << 8 | t[r + 2], n = 0; n < 4; n++) 8 * r + 6 * n <= 8 * t.length ? e.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(i >>> 6 * (3 - n) & 63)) : e.push("=");
                    return e.join("")
                },
                base64ToBytes: function(t) {
                    t = t.replace(/[^A-Z0-9+\/]/gi, "");
                    for (var e = [], r = 0, i = 0; r < t.length; i = ++r % 4) 0 != i && e.push(("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(t.charAt(r - 1)) & Math.pow(2, -2 * i + 8) - 1) << 2 * i | "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(t.charAt(r)) >>> 6 - 2 * i);
                    return e
                }
            };
            (t = t.charenc = {}).UTF8 = {
                stringToBytes: function(t) {
                    return r.stringToBytes(unescape(encodeURIComponent(t)))
                },
                bytesToString: function(t) {
                    return decodeURIComponent(escape(r.bytesToString(t)))
                }
            };
            var r = t.Binary = {
                stringToBytes: function(t) {
                    for (var e = [], r = 0; r < t.length; r++) e.push(255 & t.charCodeAt(r));
                    return e
                },
                bytesToString: function(t) {
                    for (var e = [], r = 0; r < t.length; r++) e.push(String.fromCharCode(t[r]));
                    return e.join("")
                }
            }
        }(), E = Crypto, H = E.util, I = E.charenc, O = I.UTF8, D = I.Binary, P = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298], (M = E.SHA256 = function(t, e) {
            var r = H.wordsToBytes(M._sha256(t));
            return e && e.asBytes ? r : e && e.asString ? D.bytesToString(r) : H.bytesToHex(r)
        })._sha256 = function(t) {
            t.constructor == String && (t = O.stringToBytes(t));
            var e, r, i, n, s, o, u, a, h, c, p, f = H.bytesToWords(t),
                l = 8 * t.length,
                y = (t = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], []);
            for (f[l >> 5] |= 128 << 24 - l % 32, f[15 + (l + 64 >> 9 << 4)] = l, a = 0; a < f.length; a += 16) {
                for (l = t[0], e = t[1], r = t[2], i = t[3], n = t[4], s = t[5], o = t[6], u = t[7], h = 0; h < 64; h++) {
                    h < 16 ? y[h] = f[h + a] : (c = y[h - 15], p = y[h - 2], y[h] = ((c << 25 | c >>> 7) ^ (c << 14 | c >>> 18) ^ c >>> 3) + (y[h - 7] >>> 0) + ((p << 15 | p >>> 17) ^ (p << 13 | p >>> 19) ^ p >>> 10) + (y[h - 16] >>> 0)), p = l & e ^ l & r ^ e & r;
                    var d = (l << 30 | l >>> 2) ^ (l << 19 | l >>> 13) ^ (l << 10 | l >>> 22);
                    c = (u >>> 0) + ((n << 26 | n >>> 6) ^ (n << 21 | n >>> 11) ^ (n << 7 | n >>> 25)) + (n & s ^ ~n & o) + P[h] + (y[h] >>> 0), u = o, o = s, s = n, n = i + c >>> 0, i = r, r = e, e = l, l = c + (p = d + p) >>> 0
                }
                t[0] += l, t[1] += e, t[2] += r, t[3] += i, t[4] += n, t[5] += s, t[6] += o, t[7] += u
            }
            return t
        }, M._blocksize = 16, M._digestsize = 32, ("undefined" == typeof Crypto || !Crypto.util) && function() {
            var t, e = (t = window.Crypto = {}).util = {
                rotl: function(t, e) {
                    return t << e | t >>> 32 - e
                },
                rotr: function(t, e) {
                    return t << 32 - e | t >>> e
                },
                endian: function(t) {
                    if (t.constructor == Number) return 16711935 & e.rotl(t, 8) | 4278255360 & e.rotl(t, 24);
                    for (var r = 0; r < t.length; r++) t[r] = e.endian(t[r]);
                    return t
                },
                randomBytes: function(t) {
                    for (var e = []; t > 0; t--) e.push(Math.floor(256 * Math.random()));
                    return e
                },
                bytesToWords: function(t) {
                    for (var e = [], r = 0, i = 0; r < t.length; r++, i += 8) e[i >>> 5] |= (255 & t[r]) << 24 - i % 32;
                    return e
                },
                wordsToBytes: function(t) {
                    for (var e = [], r = 0; r < 32 * t.length; r += 8) e.push(t[r >>> 5] >>> 24 - r % 32 & 255);
                    return e
                },
                bytesToHex: function(t) {
                    for (var e = [], r = 0; r < t.length; r++) e.push((t[r] >>> 4).toString(16)), e.push((15 & t[r]).toString(16));
                    return e.join("")
                },
                hexToBytes: function(t) {
                    for (var e = [], r = 0; r < t.length; r += 2) e.push(parseInt(t.substr(r, 2), 16));
                    return e
                },
                bytesToBase64: function(t) {
                    for (var e = [], r = 0; r < t.length; r += 3)
                        for (var i = t[r] << 16 | t[r + 1] << 8 | t[r + 2], n = 0; n < 4; n++) 8 * r + 6 * n <= 8 * t.length ? e.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(i >>> 6 * (3 - n) & 63)) : e.push("=");
                    return e.join("")
                },
                base64ToBytes: function(t) {
                    t = t.replace(/[^A-Z0-9+\/]/gi, "");
                    for (var e = [], r = 0, i = 0; r < t.length; i = ++r % 4) 0 != i && e.push(("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(t.charAt(r - 1)) & Math.pow(2, -2 * i + 8) - 1) << 2 * i | "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(t.charAt(r)) >>> 6 - 2 * i);
                    return e
                }
            };
            (t = t.charenc = {}).UTF8 = {
                stringToBytes: function(t) {
                    return r.stringToBytes(unescape(encodeURIComponent(t)))
                },
                bytesToString: function(t) {
                    return decodeURIComponent(escape(r.bytesToString(t)))
                }
            };
            var r = t.Binary = {
                stringToBytes: function(t) {
                    for (var e = [], r = 0; r < t.length; r++) e.push(255 & t.charCodeAt(r));
                    return e
                },
                bytesToString: function(t) {
                    for (var e = [], r = 0; r < t.length; r++) e.push(String.fromCharCode(t[r]));
                    return e.join("")
                }
            }
        }(), _ = Crypto, R = _.util, N = _.charenc, L = N.UTF8, z = N.Binary, U = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298], (X = _.SHA256 = function(t, e) {
            var r = R.wordsToBytes(X._sha256(t));
            return e && e.asBytes ? r : e && e.asString ? z.bytesToString(r) : R.bytesToHex(r)
        })._sha256 = function(t) {
            t.constructor == String && (t = L.stringToBytes(t));
            var e, r, i, n, s, o, u, a, h, c, p, f = R.bytesToWords(t),
                l = 8 * t.length,
                y = (t = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], []);
            for (f[l >> 5] |= 128 << 24 - l % 32, f[15 + (l + 64 >> 9 << 4)] = l, a = 0; a < f.length; a += 16) {
                for (l = t[0], e = t[1], r = t[2], i = t[3], n = t[4], s = t[5], o = t[6], u = t[7], h = 0; h < 64; h++) {
                    h < 16 ? y[h] = f[h + a] : (c = y[h - 15], p = y[h - 2], y[h] = ((c << 25 | c >>> 7) ^ (c << 14 | c >>> 18) ^ c >>> 3) + (y[h - 7] >>> 0) + ((p << 15 | p >>> 17) ^ (p << 13 | p >>> 19) ^ p >>> 10) + (y[h - 16] >>> 0)), p = l & e ^ l & r ^ e & r;
                    var d = (l << 30 | l >>> 2) ^ (l << 19 | l >>> 13) ^ (l << 10 | l >>> 22);
                    c = (u >>> 0) + ((n << 26 | n >>> 6) ^ (n << 21 | n >>> 11) ^ (n << 7 | n >>> 25)) + (n & s ^ ~n & o) + U[h] + (y[h] >>> 0), u = o, o = s, s = n, n = i + c >>> 0, i = r, r = e, e = l, l = c + (p = d + p) >>> 0
                }
                t[0] += l, t[1] += e, t[2] += r, t[3] += i, t[4] += n, t[5] += s, t[6] += o, t[7] += u
            }
            return t
        }, X._blocksize = 16, X._digestsize = 32, V = Crypto, Z = V.util, j = V.charenc, G = j.UTF8, Y = j.Binary, V.HMAC = function(t, e, r, i) {
            e.constructor == String && (e = G.stringToBytes(e)), r.constructor == String && (r = G.stringToBytes(r)), r.length > 4 * t._blocksize && (r = t(r, {
                asBytes: !0
            }));
            for (var n = r.slice(0), s = (r = r.slice(0), 0); s < 4 * t._blocksize; s++) n[s] ^= 92, r[s] ^= 54;
            return t = t(n.concat(t(r.concat(e), {
                asBytes: !0
            })), {
                asBytes: !0
            }), i && i.asBytes ? t : i && i.asString ? Y.bytesToString(t) : Z.bytesToHex(t)
        };
    var ft = window.coinjs = function() {}; var forkid;
    return ft.priv = 128, ft.pub = 23, ft.multisig = 51, ft.hdkey = {
        prv: 76066276,
        pub: 76067358
    }, ft.bech32 = {
        charset: "qpzry9x8gf2tvdw0s3jn54khce6mua7l",
        version: 0,
        hrp: "bc"
    }, forkid = 96, ft.compressed = !0, ft.host = "https://volbil.com/mbc/api/", ft.uid = "1", ft.key = "12345678901234567890123456789012", ft.newKeys = function(t) {
        var e = t ? Crypto.SHA256(t) : this.newPrivkey(),
            r = this.newPubkey(e);
        return {
            privkey: e,
            pubkey: r,
            address: this.pubkey2address(r),
            wif: this.privkey2wif(e),
            compressed: this.compressed
        }
    }, ft.newPrivkey = function() {
        var t = window.location;
        t += window.screen.height * window.screen.width * window.screen.colorDepth, t += ft.random(64), t += window.screen.availHeight * window.screen.availWidth * window.screen.pixelDepth, t += navigator.language, t += window.history.length, t += ft.random(64), t += navigator.userAgent, t += "coinb.in", t += Crypto.util.randomBytes(64).join(""), t += t.length, t += (new Date).getTimezoneOffset(), t += ft.random(64), t += document.getElementById("entropybucket") ? document.getElementById("entropybucket").innerHTML : "";
        var e = t += t + "" + t;
        for (i = 0; i < t.length / 25; i++) e = Crypto.SHA256(e.concat(t));
        for (var r = new T(e), n = new T("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"); r.compareTo(n) >= 0 || r.equals(T.ZERO) || r.equals(T.ONE);) r = new T(e = Crypto.SHA256(e.concat(t)));
        return e
    }, ft.newPubkey = function(t) {
        var e = T.fromByteArrayUnsigned(Crypto.util.hexToBytes(t)),
            r = EllipticCurve.getSECCurveByName("secp256k1").getG().multiply(e),
            i = r.getX().toBigInteger(),
            n = r.getY().toBigInteger(),
            s = EllipticCurve.integerToBytes(i, 32);
        if ((s = s.concat(EllipticCurve.integerToBytes(n, 32))).unshift(4), 1 == ft.compressed) {
            var o = EllipticCurve.integerToBytes(i, 32);
            return n.isEven() ? o.unshift(2) : o.unshift(3), Crypto.util.bytesToHex(o)
        }
        return Crypto.util.bytesToHex(s)
    }, ft.pubkey2address = function(t, e) {
        var r = B(Crypto.SHA256(Crypto.util.hexToBytes(t), {
            asBytes: !0
        }));
        r.unshift(e || ft.pub);
        var i = Crypto.SHA256(Crypto.SHA256(r, {
            asBytes: !0
        }), {
            asBytes: !0
        }).slice(0, 4);
        return ft.base58encode(r.concat(i))
    }, ft.scripthash2address = function(t) {
        var e = Crypto.util.hexToBytes(t);
        e.unshift(ft.pub);
        var r = e,
            i = (r = Crypto.SHA256(Crypto.SHA256(r, {
                asBytes: !0
            }), {
                asBytes: !0
            })).slice(0, 4);
        return ft.base58encode(e.concat(i))
    }, ft.pubkeys2MultisigAddress = function(t, e) {
        var r = ft.script();
        r.writeOp(81 + 1 * e - 1);
        for (var i = 0; i < t.length; ++i) r.writeBytes(Crypto.util.hexToBytes(t[i]));
        r.writeOp(81 + t.length - 1), r.writeOp(174);
        var n = B(Crypto.SHA256(r.buffer, {
            asBytes: !0
        }));
        n.unshift(ft.multisig);
        var s = n,
            o = (s = Crypto.SHA256(Crypto.SHA256(s, {
                asBytes: !0
            }), {
                asBytes: !0
            })).slice(0, 4),
            u = Crypto.util.bytesToHex(r.buffer),
            a = ft.base58encode(n.concat(o));
        return r.buffer.length > 520 && (a = "invalid", u = "invalid"), {
            address: a,
            redeemScript: u,
            size: r.buffer.length
        }
    }, ft.simpleHodlAddress = function(t, e) {
        if (e < 0) throw "Parameter for OP_CHECKLOCKTIMEVERIFY is negative.";
        var r = ft.script();
        r.writeBytes(ft.numToByteArray(e)), r.writeOp(177), r.writeOp(117), r.writeBytes(Crypto.util.hexToBytes(t)), r.writeOp(172);
        var i = B(Crypto.SHA256(r.buffer, {
            asBytes: !0
        }));
        i.unshift(ft.multisig);
        var n = i,
            s = (n = Crypto.SHA256(Crypto.SHA256(n, {
                asBytes: !0
            }), {
                asBytes: !0
            })).slice(0, 4),
            o = Crypto.util.bytesToHex(r.buffer);
        return {
            address: ft.base58encode(i.concat(s)),
            redeemScript: o
        }
    }, ft.segwitAddress = function(t) {
        var e = [0, 20].concat(B(Crypto.SHA256(Crypto.util.hexToBytes(t), {
                asBytes: !0
            }))),
            r = B(Crypto.SHA256(e, {
                asBytes: !0
            }));
        r.unshift(ft.multisig);
        var i = r,
            n = (i = Crypto.SHA256(Crypto.SHA256(i, {
                asBytes: !0
            }), {
                asBytes: !0
            })).slice(0, 4);
        return {
            address: ft.base58encode(r.concat(n)),
            type: "segwit",
            redeemscript: Crypto.util.bytesToHex(e)
        }
    }, ft.bech32Address = function(t) {
        var e = B(Crypto.SHA256(Crypto.util.hexToBytes(t), {
            asBytes: !0
        }));
        return {
            address: ft.bech32_encode(ft.bech32.hrp, [ft.bech32.version].concat(ft.bech32_convert(e, 8, 5, !0))),
            type: "bech32",
            redeemscript: Crypto.util.bytesToHex(e)
        }
    }, ft.bech32redeemscript = function(t) {
        var e = ft.bech32_decode(t);
        return !!e && (e.data.shift(), Crypto.util.bytesToHex(ft.bech32_convert(e.data, 5, 8, !0)))
    }, ft.privkey2wif = function(t) {
        var e = Crypto.util.hexToBytes(t);
        1 == ft.compressed && e.push(1), e.unshift(ft.priv);
        var r = Crypto.SHA256(Crypto.SHA256(e, {
            asBytes: !0
        }), {
            asBytes: !0
        }).slice(0, 4);
        return ft.base58encode(e.concat(r))
    }, ft.wif2privkey = function(t) {
        var e = !1,
            r = ft.base58decode(t),
            i = r.slice(0, r.length - 4);
        return (i = i.slice(1, i.length)).length >= 33 && 1 == i[i.length - 1] && (i = i.slice(0, i.length - 1), e = !0), {
            privkey: Crypto.util.bytesToHex(i),
            compressed: e
        }
    }, ft.wif2pubkey = function(t) {
        var e = ft.compressed,
            r = ft.wif2privkey(t);
        ft.compressed = r.compressed;
        var i = ft.newPubkey(r.privkey);
        return ft.compressed = e, {
            pubkey: i,
            compressed: r.compressed
        }
    }, ft.wif2address = function(t) {
        var e = ft.wif2pubkey(t);
        return {
            address: ft.pubkey2address(e.pubkey),
            compressed: e.compressed
        }
    }, ft.addressDecode = function(t) {
        try {
            var e = ft.base58decode(t),
                r = e.slice(0, e.length - 4),
                i = e.slice(e.length - 4);
            if (Crypto.SHA256(Crypto.SHA256(r, {
                    asBytes: !0
                }), {
                    asBytes: !0
                }).slice(0, 4) + "" == i + "") {
                var n = {};
                if (n.bytes = r.slice(1), n.version = r[0], n.version == ft.pub) n.type = "standard";
                else if (n.version == ft.multisig) n.type = "multisig";
                else if (n.version == ft.priv) n.type = "wifkey";
                else if (42 == n.version) {
                    if (n.type = "stealth", n.option = r[1], 0 != n.option) return alert("Stealth Address option other than 0 is currently not supported!"), !1;
                    if (n.scankey = Crypto.util.bytesToHex(r.slice(2, 35)), n.n = r[35], n.n > 1) return alert("Stealth Multisig is currently not supported!"), !1;
                    if (n.spendkey = Crypto.util.bytesToHex(r.slice(36, 69)), n.m = r[69], n.prefixlen = r[70], n.prefixlen > 0) return alert("Stealth Address Prefixes are currently not supported!"), !1;
                    n.prefix = r.slice(71)
                } else n.type = "other";
                return n
            }
            return !1
        } catch (e) {
            return bech32rs = ft.bech32redeemscript(t), !!bech32rs && {
                type: "bech32",
                redeemscript: bech32rs
            }
        }
    }, ft.addressBalance = function(t, e) {
        ft.ajax(ft.host + "?method=blockchain.address.get_balance&params[]=" + t, e, "GET")
    }, ft.pubkeydecompress = function(t) {
        if ("string" == typeof t && t.match(/^[a-f0-9]+$/i)) {
            var e = EllipticCurve.getSECCurveByName("secp256k1");
            try {
                var r = e.curve.decodePointHex(t),
                    i = r.getX().toBigInteger(),
                    n = r.getY().toBigInteger(),
                    s = EllipticCurve.integerToBytes(i, 32);
                return (s = s.concat(EllipticCurve.integerToBytes(n, 32))).unshift(4), Crypto.util.bytesToHex(s)
            } catch (t) {
                return !1
            }
        }
        return !1
    }, ft.bech32_polymod = function(t) {
        for (var e = 1, r = [996825010, 642813549, 513874426, 1027748829, 705979059], i = 0; i < t.length; ++i) {
            var n = e >> 25;
            e = (33554431 & e) << 5 ^ t[i];
            for (var s = 0; s < 5; ++s) n >> s & 1 && (e ^= r[s])
        }
        return e
    }, ft.bech32_hrpExpand = function(t) {
        var e, r = [];
        for (e = 0; e < t.length; ++e) r.push(t.charCodeAt(e) >> 5);
        for (r.push(0), e = 0; e < t.length; ++e) r.push(31 & t.charCodeAt(e));
        return r
    }, ft.bech32_verifyChecksum = function(t, e) {
        return 1 === ft.bech32_polymod(ft.bech32_hrpExpand(t).concat(e))
    }, ft.bech32_createChecksum = function(t, e) {
        for (var r = ft.bech32_hrpExpand(t).concat(e).concat([0, 0, 0, 0, 0, 0]), i = 1 ^ ft.bech32_polymod(r), n = [], s = 0; s < 6; ++s) n.push(i >> 5 * (5 - s) & 31);
        return n
    }, ft.bech32_encode = function(t, e) {
        for (var r = e.concat(ft.bech32_createChecksum(t, e)), i = t + "1", n = 0; n < r.length; ++n) i += ft.bech32.charset.charAt(r[n]);
        return i
    }, ft.bech32_decode = function(t) {
        var e, r = !1,
            i = !1;
        for (e = 0; e < t.length; ++e) {
            if (t.charCodeAt(e) < 33 || t.charCodeAt(e) > 126) return null;
            t.charCodeAt(e) >= 97 && t.charCodeAt(e) <= 122 && (r = !0), t.charCodeAt(e) >= 65 && t.charCodeAt(e) <= 90 && (i = !0)
        }
        if (r && i) return null;
        var n = (t = t.toLowerCase()).lastIndexOf("1");
        if (n < 1 || n + 7 > t.length || t.length > 90) return null;
        var s = t.substring(0, n),
            o = [];
        for (e = n + 1; e < t.length; ++e) {
            var u = ft.bech32.charset.indexOf(t.charAt(e));
            if (-1 === u) return null;
            o.push(u)
        }
        return ft.bech32_verifyChecksum(s, o) ? {
            hrp: s,
            data: o.slice(0, o.length - 6)
        } : null
    }, ft.bech32_convert = function(t, e, r, i) {
        for (var n = 0, s = 0, o = (1 << r) - 1, u = [], a = 0; a < t.length; ++a)
            for (n = n << e | t[a], s += e; s >= r;) s -= r, u.push(n >> s & o);
        if (i) s > 0 && u.push(n << r - s & o);
        else {
            if (s >= e) throw new Error("Excess padding");
            if (n << r - s & o) throw new Error("Non-zero padding")
        }
        return u
    }, ft.hd = function(t) {
        var e = {
            parse: function() {
                var r = [];
                if ("string" == typeof t) {
                    var i = ft.base58decode(t);
                    if (82 == i.length) {
                        var n = i.slice(78, 82),
                            s = Crypto.SHA256(Crypto.SHA256(i.slice(0, 78), {
                                asBytes: !0
                            }), {
                                asBytes: !0
                            });
                        n[0] == s[0] && n[1] == s[1] && n[2] == s[2] && n[3] == s[3] && (r = i.slice(0, 78))
                    }
                }
                if (r && r.length > 0) {
                    e.version = ft.uint(r.slice(0, 4), 4), e.depth = ft.uint(r.slice(4, 5), 1), e.parent_fingerprint = r.slice(5, 9), e.child_index = ft.uint(r.slice(9, 13), 4), e.chain_code = r.slice(13, 45), e.key_bytes = r.slice(45, 78);
                    var o = ft.compressed;
                    if (ft.compressed = !0, 0 == e.key_bytes[0]) {
                        e.type = "private";
                        var u = e.key_bytes.slice(1, 33),
                            a = Crypto.util.bytesToHex(u),
                            h = ft.newPubkey(a);
                        e.keys = {
                            privkey: a,
                            pubkey: h,
                            address: ft.pubkey2address(h),
                            wif: ft.privkey2wif(a)
                        }
                    } else if (2 == e.key_bytes[0] || 3 == e.key_bytes[0]) {
                        e.type = "public";
                        var c = Crypto.util.bytesToHex(e.key_bytes);
                        e.keys = {
                            pubkey: c,
                            address: ft.pubkey2address(c)
                        }
                    } else e.type = "invalid";
                    e.keys_extended = e.extend(), ft.compressed = o
                }
            },
            extend: function() {
                return ft.hd().make({
                    depth: 1 * this.depth + 1,
                    parent_fingerprint: this.parent_fingerprint,
                    child_index: this.child_index,
                    chain_code: this.chain_code,
                    privkey: this.keys.privkey,
                    pubkey: this.keys.pubkey
                })
            },
            derive: function(t) {
                t = t || 0;
                var r, i, n, s, o = Crypto.util.hexToBytes(this.keys.pubkey).concat(ft.numToBytes(t, 4).reverse()),
                    u = new jsSHA(Crypto.util.bytesToHex(o), "HEX").getHMAC(Crypto.util.bytesToHex(e.chain_code), "HEX", "SHA-512", "HEX"),
                    a = new T(u.slice(0, 64), 16),
                    h = Crypto.util.hexToBytes(u.slice(64, 128)),
                    c = EllipticCurve.getSECCurveByName("secp256k1");
                c.getCurve();
                if ((s = ft.clone(this)).chain_code = h, s.child_index = t, "private" == this.type) r = a.add(new T([0].concat(Crypto.util.hexToBytes(this.keys.privkey)))).mod(c.getN()), i = Crypto.util.bytesToHex(r.toByteArrayUnsigned()), n = ft.newPubkey(i), s.keys = {
                    privkey: i,
                    pubkey: n,
                    wif: ft.privkey2wif(i),
                    address: ft.pubkey2address(n)
                };
                else if ("public" == this.type) {
                    q = c.curve.decodePointHex(this.keys.pubkey);
                    var p = c.getG().multiply(a).add(q),
                        f = p.getX().toBigInteger(),
                        l = p.getY().toBigInteger(),
                        y = EllipticCurve.integerToBytes(f, 32);
                    l.isEven() ? y.unshift(2) : y.unshift(3), n = Crypto.util.bytesToHex(y), s.keys = {
                        pubkey: n,
                        address: ft.pubkey2address(n)
                    }
                }
                return s.parent_fingerprint = B(Crypto.SHA256(Crypto.util.hexToBytes(e.keys.pubkey), {
                    asBytes: !0
                })).slice(0, 4), s.keys_extended = s.extend(), s
            },
            master: function(t) {
                var e = t ? Crypto.SHA256(t) : ft.newPrivkey(),
                    r = new jsSHA(e, "HEX").getHMAC("Bitcoin seed", "TEXT", "SHA-512", "HEX"),
                    i = (Crypto.util.hexToBytes(r.slice(0, 64)), Crypto.util.hexToBytes(r.slice(64, 128)));
                return ft.hd().make({
                    depth: 0,
                    parent_fingerprint: [0, 0, 0, 0],
                    child_index: 0,
                    chain_code: i,
                    privkey: r.slice(0, 64),
                    pubkey: ft.newPubkey(r.slice(0, 64))
                })
            },
            make: function(t) {
                var e = [];
                e.push(1 * t.depth), e = (e = (e = e.concat(t.parent_fingerprint)).concat(ft.numToBytes(t.child_index, 4).reverse())).concat(t.chain_code);
                var r = {};
                if (t.privkey) {
                    var i = ft.numToBytes(ft.hdkey.prv, 4).reverse();
                    (i = i.concat(e)).push(0), i = i.concat(Crypto.util.hexToBytes(t.privkey));
                    var n = Crypto.SHA256(Crypto.SHA256(i, {
                            asBytes: !0
                        }), {
                            asBytes: !0
                        }).slice(0, 4),
                        s = i.concat(n);
                    r.privkey = ft.base58encode(s)
                }
                if (t.pubkey) {
                    var o = ft.numToBytes(ft.hdkey.pub, 4).reverse();
                    o = (o = o.concat(e)).concat(Crypto.util.hexToBytes(t.pubkey));
                    n = Crypto.SHA256(Crypto.SHA256(o, {
                        asBytes: !0
                    }), {
                        asBytes: !0
                    }).slice(0, 4), s = o.concat(n);
                    r.pubkey = ft.base58encode(s)
                }
                return r
            }
        };
        return e.parse(), e
    }, ft.script = function(t) {
        var e = {};
        return t ? "string" == typeof t ? e.buffer = Crypto.util.hexToBytes(t) : ft.isArray(t) ? e.buffer = t : t instanceof ft.script ? e.buffer = t.buffer : e.buffer = t : e.buffer = [], e.parse = function() {
            var t = this;
            e.chunks = [];
            var r = 0;

            function i(e) {
                t.chunks.push(t.buffer.slice(r, r + e)), r += e
            }
            for (; r < this.buffer.length;) {
                var n = this.buffer[r++];
                if (n >= 240 && (n = n << 8 | this.buffer[r++]), n > 0 && n < 76 ? i(n) : 76 == n ? i(this.buffer[r++]) : 77 == n ? i(this.buffer[r++] << 8 | this.buffer[r++]) : 78 == n ? i(this.buffer[r++] << 24 | this.buffer[r++] << 16 | this.buffer[r++] << 8 | this.buffer[r++]) : this.chunks.push(n), r < 0) break
            }
            return !0
        }, e.decodeRedeemScript = function(t) {
            var e = !1;
            try {
                var r = ft.script(Crypto.util.hexToBytes(t));
                if (r.chunks.length >= 3 && 174 == r.chunks[r.chunks.length - 1]) {
                    (e = {}).signaturesRequired = r.chunks[0] - 80;
                    for (var i = [], n = 1; n < r.chunks.length - 2; n++) i.push(Crypto.util.bytesToHex(r.chunks[n]));
                    e.pubkeys = i;
                    var s = ft.pubkeys2MultisigAddress(i, e.signaturesRequired);
                    e.address = s.address, e.type = "multisig__"
                } else if (2 == r.chunks.length && 0 == r.buffer[0] && 20 == r.buffer[1]) {
                    (e = {}).type = "segwit__";
                    var o = Crypto.util.bytesToHex(r.buffer);
                    e.address = ft.pubkey2address(o, ft.multisig), e.redeemscript = o
                } else 5 == r.chunks.length && 177 == r.chunks[1] && 117 == r.chunks[2] && 172 == r.chunks[4] && ((e = {}).pubkey = Crypto.util.bytesToHex(r.chunks[3]), e.checklocktimeverify = ft.bytesToNum(r.chunks[0].slice()), e.address = ft.simpleHodlAddress(e.pubkey, e.checklocktimeverify).address, e.type = "hodl__")
            } catch (t) {
                e = !1
            }
            return e
        }, e.spendToScript = function(t, time) {
            var addr = ft.addressDecode(t);
            var s = ft.script();
            if(addr.type == "bech32"){
             s.writeOp(0);
             s.writeBytes(Crypto.util.hexToBytes(addr.redeemscript));
            } else if(addr.version==ft.multisig){ // multisig address
             s.writeOp(169); //OP_HASH160
             s.writeBytes(addr.bytes);
             s.writeOp(135); //OP_EQUAL
            } else if(time) {

             s.writeBytes(ft.numToByteArray(time)); //time
             s.writeOp(177); //OP_CHECKLOCKTIMEVERIFY
             s.writeOp(117); //OP_DROP
             s.writeOp(118); //OP_DUP
             s.writeOp(169); //OP_HASH160
             s.writeBytes(addr.bytes);
             s.writeOp(136); //OP_EQUALVERIFY
             s.writeOp(172); //OP_CHECKSIG
            } else { // regular address
             s.writeOp(118); //OP_DUP
             s.writeOp(169); //OP_HASH160
             s.writeBytes(addr.bytes);
             s.writeOp(136); //OP_EQUALVERIFY
             s.writeOp(172); //OP_CHECKSIG
            }
            return s;
        }, e.pubkeyHash = function(t) {
            var e = ft.addressDecode(t),
                r = ft.script();
            return r.writeOp(118), r.writeOp(169), r.writeBytes(e.bytes), r.writeOp(136), r.writeOp(172), r
        }, e.writeOp = function(t) {
            return this.buffer.push(t), this.chunks.push(t), !0
        }, e.writeBytes = function(t) {
            return t.length < 76 ? this.buffer.push(t.length) : t.length <= 255 ? (this.buffer.push(76), this.buffer.push(t.length)) : t.length <= 65535 ? (this.buffer.push(77), this.buffer.push(255 & t.length), this.buffer.push(t.length >>> 8 & 255)) : (this.buffer.push(78), this.buffer.push(255 & t.length), this.buffer.push(t.length >>> 8 & 255), this.buffer.push(t.length >>> 16 & 255), this.buffer.push(t.length >>> 24 & 255)), this.buffer = this.buffer.concat(t), this.chunks.push(t), !0
        }, e.parse(), e
    }, ft.transaction = function() {
        var t = {
            version: 1,
            lock_time: 0,
            ins: [],
            outs: [],
            witness: !1,
            timestamp: Date.now() / 1000,
            block: null,
            addinput: function(e, r, i, n) {
                var s = {};
                return s.outpoint = {
                    hash: e,
                    index: r
                }, s.script = ft.script(i || []), s.sequence = n || (0 == t.lock_time ? 4294967295 : 0), this.ins.push(s)
            },
            addoutput: function(address, value, time) {
                var o = {};
                o.value = new T('' + Math.round((value*1) * 1e8), 10);
                var s = ft.script();
                if(time) {
                   o.script = s.spendToScript(address, time);
                } else {
                   o.script = s.spendToScript(address);
                }

                return this.outs.push(o);
            },
            addstealth: function(t, e) {
                var r = T.fromByteArrayUnsigned(Crypto.util.hexToBytes(ft.newPrivkey())),
                    i = EllipticCurve.getSECCurveByName("secp256k1"),
                    n = EllipticCurve.fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F"),
                    s = T.ZERO,
                    o = EllipticCurve.fromHex("7"),
                    u = new EllipticCurve.CurveFp(n, s, o),
                    a = i.getG().multiply(r),
                    h = u.decodePointHex(t.scankey).multiply(r),
                    c = T.fromByteArrayUnsigned(Crypto.SHA256(h.getEncoded(!0), {
                        asBytes: !0
                    })),
                    p = i.getG().multiply(c),
                    f = u.decodePointHex(t.spendkey).add(p),
                    l = ft.pubkey2address(Crypto.util.bytesToHex(f.getEncoded(!0))),
                    y = [6].concat(Crypto.util.randomBytes(4)).concat(a.getEncoded(!0)),
                    d = ft.script();
                d.writeOp(106), d.writeBytes(y), v = {}, v.value = 0, v.script = d, this.outs.push(v);
                var g = {};
                g.value = new T("" + Math.round(1 * e * 1e4), 10);
                var m = ft.script();
                return g.script = m.spendToScript(l), this.outs.push(g)
            },
            adddata: function(t) {
                if (t.match(/^[a-f0-9]+$/gi) && t.length < 160 && t.length % 2 == 0) {
                    var e = ft.script();
                    return e.writeOp(106), e.writeBytes(Crypto.util.hexToBytes(t)), o = {}, o.value = 0, o.script = e, this.outs.push(o)
                }
                return !1
            },
            listUnspent: function(t, e, r) {
                ft.ajax(ft.host + "?method=blockchain.address.get_utxo_amount&params[]=" + t + "&params[]=" + e, r, "GET")
            },
            addUnspent: function(t, e, r, n, s, o) {
                var u = this;
                this.listUnspent(t, e, function(t) {
                    var e = ft.script(),
                        a = 0,
                        h = 0,
                        c = {},
                        p = (t = JSON.parse(t)).result;
                    for (i = 0; i < p.length; i++) {
                        var f = p[i],
                            l = f.tx_hash,
                            y = f.tx_pos,
                            d = n || f.script;
                        s && ((e = ft.script()).writeBytes(Crypto.util.hexToBytes(n)), e.writeOp(0), e.writeBytes(ft.numToBytes(1 * f.value, 8)), d = Crypto.util.bytesToHex(e.buffer));
                        var v = o || !1;
                        u.addinput(l, y, d, v), a += 1 * f.value, h++, console.log(f.value)
                    }
                    return c.unspent = p, c.value = a, c.total = h, r(c)
                })
            },
            addUnspentAndSign: function(t, e, r) {
                var i = this,
                    n = ft.wif2address(t);
                i.addUnspent(n.address, e, function(e) {
                    return i.sign(t), r(e)
                })
            },
            broadcast: function(t, e) {
                console.log(e);
                var r = e || this.serialize();
                ft.ajax(ft.host + "?uid=" + ft.uid + "&key=" + ft.key + "&setmodule=bitcoin&request=sendrawtransaction&rawtx=" + r + "&r=" + Math.random(), t, "GET")
            },
            transactionHash: function(t, e) {
                for (var r = ft.clone(this), i = e || 1, n = 0; n < r.ins.length; n++) t != n && (r.ins[n].script = ft.script());
                var s = this.extractScriptKey(t);
                if (r.ins[t].script = ft.script(s.script), r.ins && r.ins[t]) {
                    if (1 == i);
                    else if (2 == i) {
                        r.outs = [];
                        for (n = 0; n < r.ins.length; n++) t != n && (r.ins[n].sequence = 0)
                    } else if (3 == i) {
                        r.outs.length = t + 1;
                        for (n = 0; n < t; n++) r.outs[n].value = -1, r.outs[n].script.buffer = [];
                        for (n = 0; n < r.ins.length; n++) t != n && (r.ins[n].sequence = 0)
                    } else if (i >= 128)
                        if (r.ins = [r.ins[t]], 129 == i);
                        else if (130 == i) r.outs = [];
                    else if (131 == i) {
                        r.outs.length = t + 1;
                        for (n = 0; n < t; n++) r.outs[n].value = -1, r.outs[n].script.buffer = []
                    }
                    var o = Crypto.util.hexToBytes(r.serialize());
                    o = o.concat(ft.numToBytes(parseInt(i), 4));
                    var u = Crypto.SHA256(o, {
                        asBytes: !0
                    });
                    return Crypto.util.bytesToHex(Crypto.SHA256(u, {
                        asBytes: !0
                    }))
                }
                return !1
            },
            transactionHashSegWitV0: function(t, e) {
                var r = this.extractScriptKey(t);
                if ("segwit" != r.type) return {
                    result: 0,
                    fail: "redeemscript",
                    response: "redeemscript missing or not valid for segwit"
                };
                if (-1 == r.value) return {
                    result: 0,
                    fail: "value",
                    response: "unable to generate a valid segwit hash without a value"
                };
                var i = Crypto.util.hexToBytes(r.script);
                20 == i.length && (i = [0, 20].concat(i)), 22 == i.length && ((i = i.slice(1)).unshift(25, 118, 169), i.push(136, 172));
                var n = ft.numToBytes(r.value, 8),
                    s = ft.numToBytes(0, 32),
                    o = ft.numToBytes(parseInt(this.version), 4),
                    u = [];
                if (!(e >= 80))
                    for (var a = 0; a < this.ins.length; a++) u = (u = u.concat(Crypto.util.hexToBytes(this.ins[a].outpoint.hash).reverse())).concat(ft.numToBytes(this.ins[a].outpoint.index, 4));
                var h = u.length >= 1 ? Crypto.SHA256(Crypto.SHA256(u, {
                    asBytes: !0
                }), {
                    asBytes: !0
                }) : s;
                u = [];
                if (!(e >= 80) && 2 != e && 3 != e)
                    for (a = 0; a < this.ins.length; a++) u = u.concat(ft.numToBytes(this.ins[a].sequence, 4));
                var c = u.length >= 1 ? Crypto.SHA256(Crypto.SHA256(u, {
                        asBytes: !0
                    }), {
                        asBytes: !0
                    }) : s,
                    p = Crypto.util.hexToBytes(this.ins[t].outpoint.hash).reverse();
                p = p.concat(ft.numToBytes(this.ins[t].outpoint.index, 4));
                var f = ft.numToBytes(this.ins[t].sequence, 4),
                    l = s;
                u = [];
                if (2 != e && 3 != e) {
                    for (a = 0; a < this.outs.length; a++) u = (u = (u = u.concat(ft.numToBytes(this.outs[a].value, 8))).concat(ft.numToVarInt(this.outs[a].script.buffer.length))).concat(this.outs[a].script.buffer);
                    l = Crypto.SHA256(Crypto.SHA256(u, {
                        asBytes: !0
                    }), {
                        asBytes: !0
                    })
                } else 2 == e && t < this.outs.length && (u = (u = (u = u.concat(ft.numToBytes(this.outs[t].value, 8))).concat(ft.numToVarInt(this.outs[a].script.buffer.length))).concat(this.outs[t].script.buffer), l = Crypto.SHA256(Crypto.SHA256(u, {
                    asBytes: !0
                }), {
                    asBytes: !0
                }));
                var y = ft.numToBytes(this.lock_time, 4);
                // e |= forkid;
                var d = ft.numToBytes(e, 4),
                    v = [];
                v = (v = (v = (v = (v = (v = (v = (v = (v = (v = v.concat(o)).concat(h)).concat(c)).concat(p)).concat(i)).concat(n)).concat(f)).concat(l)).concat(y)).concat(d);
                var g = Crypto.SHA256(v, {
                    asBytes: !0
                });
                return {
                    result: 1,
                    hash: Crypto.util.bytesToHex(Crypto.SHA256(g, {
                        asBytes: !0
                    })),
                    response: "hash generated"
                }
            },
            extractScriptKey: function(t) {
                if (this.ins[t]) {
                    if (5 == this.ins[t].script.chunks.length && 172 == this.ins[t].script.chunks[4] && ft.isArray(this.ins[t].script.chunks[2])) return {
                        type: "scriptpubkey",
                        signed: "false",
                        signatures: 0,
                        script: Crypto.util.bytesToHex(this.ins[t].script.buffer)
                    };
                    if (2 == this.ins[t].script.chunks.length && 48 == this.ins[t].script.chunks[0][0] && 5 == this.ins[t].script.chunks[1].length && 177 == this.ins[t].script.chunks[1][1]) return {
                        type: "hodl",
                        signed: "true",
                        signatures: 1,
                        script: Crypto.util.bytesToHex(this.ins[t].script.buffer)
                    };
                    if (2 == this.ins[t].script.chunks.length && 48 == this.ins[t].script.chunks[0][0]) return {
                        type: "scriptpubkey",
                        signed: "true",
                        signatures: 1,
                        script: Crypto.util.bytesToHex(this.ins[t].script.buffer)
                    };
                    if (5 == this.ins[t].script.chunks.length && 177 == this.ins[t].script.chunks[1]) return {
                        type: "hodl",
                        signed: "false",
                        signatures: 0,
                        script: Crypto.util.bytesToHex(this.ins[t].script.buffer)
                    };
                    if (this.ins[t].script.chunks.length <= 3 && this.ins[t].script.chunks.length > 0 && (22 == this.ins[t].script.chunks[0].length && 0 == this.ins[t].script.chunks[0][0] || 20 == this.ins[t].script.chunks[0].length && 0 == this.ins[t].script.chunks[1])) {
                        var e = this.witness[t] && 2 == this.witness[t].length ? "true" : "false",
                            r = "true" == e ? 1 : 0,
                            i = -1;
                        return this.ins[t].script.chunks[2] && 8 == this.ins[t].script.chunks[2].length && (i = ft.bytesToNum(this.ins[t].script.chunks[2])), {
                            type: "segwit",
                            signed: e,
                            signatures: r,
                            script: Crypto.util.bytesToHex(this.ins[t].script.chunks[0]),
                            value: i
                        }
                    }
                    return 0 == this.ins[t].script.chunks[0] && 174 == this.ins[t].script.chunks[this.ins[t].script.chunks.length - 1][this.ins[t].script.chunks[this.ins[t].script.chunks.length - 1].length - 1] ? {
                        type: "multisig",
                        signed: "true",
                        signatures: this.ins[t].script.chunks.length - 2,
                        script: Crypto.util.bytesToHex(this.ins[t].script.chunks[this.ins[t].script.chunks.length - 1])
                    } : this.ins[t].script.chunks[0] >= 80 && 174 == this.ins[t].script.chunks[this.ins[t].script.chunks.length - 1] ? {
                        type: "multisig",
                        signed: "false",
                        signatures: 0,
                        script: Crypto.util.bytesToHex(this.ins[t].script.buffer)
                    } : 0 == this.ins[t].script.chunks.length ? {
                        type: "empty",
                        signed: "false",
                        signatures: 0,
                        script: ""
                    } : {
                        type: "unknown",
                        signed: "false",
                        signatures: 0,
                        script: Crypto.util.bytesToHex(this.ins[t].script.buffer)
                    }
                }
                return !1
            },
            transactionSig: function(t, e, r, i) {
                var n = r || 1;
                // n |= forkid;
                var s, o, u, a, h = i || Crypto.util.hexToBytes(this.transactionHash(t, n));
                if (h) {
                    var c = EllipticCurve.getSECCurveByName("secp256k1"),
                        p = ft.wif2privkey(e),
                        f = T.fromByteArrayUnsigned(Crypto.util.hexToBytes(p.privkey)),
                        l = c.getN(),
                        y = T.fromByteArrayUnsigned(h),
                        d = 0;
                    do {
                        var v = this.deterministicK(e, h, d),
                            g = c.getG().multiply(v).getX().toBigInteger().mod(l),
                            m = v.modInverse(l).multiply(y.add(f.multiply(g))).mod(l);
                        d++
                    } while (g.compareTo(T.ZERO) <= 0 || m.compareTo(T.ZERO) <= 0);
                    var b = l.shiftRight(1);
                    m.compareTo(b) > 0 && (m = l.subtract(m));
                    var w = (s = m, o = g.toByteArraySigned(), u = s.toByteArraySigned(), (a = []).push(2), a.push(o.length), (a = a.concat(o)).push(2), a.push(u.length), (a = a.concat(u)).unshift(a.length), a.unshift(48), a);
                    return w.push(parseInt(n, 10)), Crypto.util.bytesToHex(w)
                }
                return !1
            },
            deterministicK: function(t, e, r) {
                r = r || 0;
                var i = ft.wif2privkey(t),
                    n = Crypto.util.hexToBytes(i.privkey),
                    s = EllipticCurve.getSECCurveByName("secp256k1").getN(),
                    o = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    u = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                u = Crypto.HMAC(Crypto.SHA256, o.concat([0]).concat(n).concat(e), u, {
                    asBytes: !0
                }), o = Crypto.HMAC(Crypto.SHA256, o, u, {
                    asBytes: !0
                }), u = Crypto.HMAC(Crypto.SHA256, o.concat([1]).concat(n).concat(e), u, {
                    asBytes: !0
                }), o = Crypto.HMAC(Crypto.SHA256, o, u, {
                    asBytes: !0
                });
                var a = [];
                a = o = Crypto.HMAC(Crypto.SHA256, o, u, {
                    asBytes: !0
                });
                for (var h = T.fromByteArrayUnsigned(a), c = 0; h.compareTo(s) >= 0 || h.compareTo(T.ZERO) <= 0 || c < r;) u = Crypto.HMAC(Crypto.SHA256, o.concat([0]), u, {
                    asBytes: !0
                }), o = Crypto.HMAC(Crypto.SHA256, o, u, {
                    asBytes: !0
                }), a = o = Crypto.HMAC(Crypto.SHA256, o, u, {
                    asBytes: !0
                }), h = T.fromByteArrayUnsigned(a), c++;
                return h
            },
            signinput: function(t, e, r) {
                var i = ft.wif2pubkey(e),
                    n = r || 1,
                    s = this.transactionSig(t, e, n),
                    o = ft.script();
                return o.writeBytes(Crypto.util.hexToBytes(s)), o.writeBytes(Crypto.util.hexToBytes(i.pubkey)), this.ins[t].script = o, !0
            },
            signhodl: function(t, e, r) {
                var i = r || 1,
                    n = this.transactionSig(t, e, i),
                    s = this.ins[t].script.buffer,
                    o = ft.script();
                return o.writeBytes(Crypto.util.hexToBytes(n)), o.writeBytes(s), this.ins[t].script = o, !0
            },
            signmultisig: function(t, e, r) {
                var i = 174 == this.ins[t].script.chunks[this.ins[t].script.chunks.length - 1] ? this.ins[t].script.buffer : this.ins[t].script.chunks[this.ins[t].script.chunks.length - 1],
                    n = function(t) {
                        for (var e = {}, r = 1; r < t.chunks.length - 2; r++) e[r] = Crypto.util.hexToBytes(ft.pubkeydecompress(Crypto.util.bytesToHex(t.chunks[r])));
                        return e
                    }(ft.script(i)),
                    s = function(t) {
                        var e = {},
                            r = 0;
                        if (0 == t.chunks[0] && 174 == t.chunks[t.chunks.length - 1][t.chunks[t.chunks.length - 1].length - 1])
                            for (var i = 1; i < t.chunks.length - 1; i++) 0 != t.chunks[i] && (e[++r] = t.chunks[i]);
                        return e
                    }(this.ins[t].script),
                    o = r || 1,
                    u = Crypto.util.hexToBytes(this.transactionHash(t, o)),
                    a = Crypto.util.hexToBytes(this.transactionSig(t, e, o));
                s[ft.countObject(s) + 1] = a;
                var h = ft.script();
                h.writeOp(0);
                for (x in n)
                    for (y in s) this.ins[t].script.buffer = i, u = Crypto.util.hexToBytes(this.transactionHash(t, 1 * s[y].slice(-1)[0])), ft.verifySignature(u, s[y], n[x]) && h.writeBytes(s[y]);
                return h.writeBytes(i), this.ins[t].script = h, !0
            },
            signsegwit: function(t, e, r) {
                var i = r || 1,
                    n = ft.wif2pubkey(e),
                    s = ft.segwitAddress(n.pubkey),
                    o = ft.bech32Address(n.pubkey);
                if (s.redeemscript == Crypto.util.bytesToHex(this.ins[t].script.chunks[0]) || o.redeemscript == Crypto.util.bytesToHex(this.ins[t].script.chunks[0])) {
                    var u = this.transactionHashSegWitV0(t, i);
                    if (1 == u.result) {
                        var a = Crypto.util.hexToBytes(u.hash),
                            h = this.transactionSig(t, e, i, a),
                            c = ft.script();
                        c.writeBytes(this.ins[t].script.chunks[0]), this.ins[t].script = c, ft.isArray(this.witness) || (this.witness = []), this.witness.push([h, n.pubkey]);
                        for (var p = [], f = [], l = 0; l < this.ins.length; l++)
                            for (var y = 0; y < this.witness.length; y++)
                                if (!f.includes(y)) {
                                    var d = ft.segwitAddress(this.witness[y][1]),
                                        v = ft.bech32Address(this.witness[y][1]),
                                        g = "";
                                    if (this.ins[l].script.chunks.length >= 1 ? g = Crypto.util.bytesToHex(this.ins[l].script.chunks[0]) : 0 == this.ins[l].script.chunks.length && (g = v.redeemscript), d.redeemscript == g || v.redeemscript == g) {
                                        p.push(this.witness[y]), f.push(y), v.redeemscript == g && (this.ins[t].script = ft.script());
                                        break
                                    }
                                }
                        this.witness = p
                    }
                }
                return !0
            },
            sign: function(t, e) {
                for (var r = e || 1, i = 0; i < this.ins.length; i++) {
                    var n = this.extractScriptKey(i),
                        s = ft.wif2address(t),
                        o = ft.script().pubkeyHash(s.address);
                    ("scriptpubkey" == n.type && n.script == Crypto.util.bytesToHex(o.buffer) || "empty" == n.type) && "false" == n.signed ? this.signinput(i, t, r) : "hodl" == n.type && "false" == n.signed ? this.signhodl(i, t, r) : "multisig" == n.type ? this.signmultisig(i, t, r) : "segwit" == n.type && this.signsegwit(i, t, r)
                }
                return this.serialize()
            },
            serialize: function() {
                var t = [];
                t = t.concat(ft.numToBytes(parseInt(this.version), 4)), t = t.concat(ft.numToBytes(parseInt(this.timestamp), 4)), ft.isArray(this.witness) && (t = t.concat([0, 1])), t = t.concat(ft.numToVarInt(this.ins.length));
                for (var e = 0; e < this.ins.length; e++) {
                    var r = this.ins[e];
                    t = (t = t.concat(Crypto.util.hexToBytes(r.outpoint.hash).reverse())).concat(ft.numToBytes(parseInt(r.outpoint.index), 4));
                    var i = r.script.buffer;
                    t = (t = (t = t.concat(ft.numToVarInt(i.length))).concat(i)).concat(ft.numToBytes(parseInt(r.sequence), 4))
                }
                t = t.concat(ft.numToVarInt(this.outs.length));
                for (e = 0; e < this.outs.length; e++) {
                    var n = this.outs[e];
                    t = t.concat(ft.numToBytes(n.value, 8));
                    i = n.script.buffer;
                    t = (t = t.concat(ft.numToVarInt(i.length))).concat(i)
                }
                if (ft.isArray(this.witness) && this.witness.length >= 1)
                    for (e = 0; e < this.witness.length; e++) {
                        t = t.concat(ft.numToVarInt(this.witness[e].length));
                        for (var s = 0; s < this.witness[e].length; s++) t = (t = t.concat(ft.numToVarInt(Crypto.util.hexToBytes(this.witness[e][s]).length))).concat(Crypto.util.hexToBytes(this.witness[e][s]))
                    }
                return t = t.concat(ft.numToBytes(parseInt(this.lock_time), 4)), Crypto.util.bytesToHex(t)
            },
            deserialize: function(t) {
                "string" == typeof t && (t = Crypto.util.hexToBytes(t));
                var e = 0,
                    r = !1,
                    i = function(r) {
                        return 0 == r ? 0 : t[++e - 1] + 256 * i(r - 1)
                    },
                    n = function() {
                        return t[++e - 1] < 253 ? t[e - 1] : i(t[e - 1] - 251)
                    },
                    s = function(r) {
                        return e += r, t.slice(e - r, e)
                    },
                    o = function() {
                        var t = n();
                        return s(t)
                    },
                    u = new ft.transaction;
                u.version = i(4), u.timestamp = i(4), 0 == t[e] && 1 == t[e + 1] && (r = !0, u.witness = [], e += 2);
                for (var a = n(), h = 0; h < a; h++) u.ins.push({
                    outpoint: {
                        hash: Crypto.util.bytesToHex(s(32).reverse()),
                        index: i(4)
                    },
                    script: ft.script(o()),
                    sequence: i(4)
                });
                var c = n();
                for (h = 0; h < c; h++) u.outs.push({
                    value: ft.bytesToNum(s(8)),
                    script: ft.script(o())
                });
                if (1 == r)
                    for (h = 0; h < a; ++h)
                        for (var p = n(), f = 0; f < p; f++) {
                            var l = n();
                            e += l, ft.isArray(u.witness[h]) || (u.witness[h] = []), u.witness[h].push(Crypto.util.bytesToHex(t.slice(e - l, e)))
                        }
                return u.lock_time = i(4), u
            },
            size: function() {
                return (this.serialize().length / 2).toFixed(0)
            }
        };
        return t
    }, ft.verifySignature = function(t, e, r) {
        var i, n, s;
        if (ft.isArray(e)) {
            var o = function(t) {
                var e;
                if (48 != t[0]) throw new Error("Signature not a valid DERSequence");
                if (2 != t[e = 2]) throw new Error("First element in signature must be a DERInteger");
                var r = t.slice(e + 2, e + 2 + t[e + 1]);
                if (2 != t[e += 2 + t[e + 1]]) throw new Error("Second element in signature must be a DERInteger");
                var i = t.slice(e + 2, e + 2 + t[e + 1]);
                return e += 2 + t[e + 1], {
                    r: T.fromByteArrayUnsigned(r),
                    s: T.fromByteArrayUnsigned(i)
                }
            }(e);
            i = o.r, n = o.s
        } else {
            if ("object" != typeof e || !e.r || !e.s) throw "Invalid value for signature";
            i = e.r, n = e.s
        }
        if (!ft.isArray(r)) throw "Invalid format for pubkey value, must be byte array";
        var u = EllipticCurve.getSECCurveByName("secp256k1");
        s = EllipticCurve.PointFp.decodeFrom(u.getCurve(), r);
        var a = T.fromByteArrayUnsigned(t);
        return ft.verifySignatureRaw(a, i, n, s)
    }, ft.verifySignatureRaw = function(t, e, r, i) {
        var n = EllipticCurve.getSECCurveByName("secp256k1"),
            s = n.getN(),
            o = n.getG();
        if (e.compareTo(T.ONE) < 0 || e.compareTo(s) >= 0) return !1;
        if (r.compareTo(T.ONE) < 0 || r.compareTo(s) >= 0) return !1;
        var u = r.modInverse(s),
            a = t.multiply(u).mod(s),
            h = e.multiply(u).mod(s);
        return o.multiply(a).add(i.multiply(h)).getX().toBigInteger().mod(s).equals(e)
    }, ft.base58encode = function(t) {
        for (var e = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", r = T.valueOf(58), i = T.fromByteArrayUnsigned(t), n = []; i.compareTo(r) >= 0;) {
            var s = i.mod(r);
            n.unshift(e[s.intValue()]), i = i.subtract(s).divide(r)
        }
        n.unshift(e[i.intValue()]);
        for (var o = 0; o < t.length && 0 == t[o]; o++) n.unshift(e[0]);
        return n.join("")
    }, ft.base58decode = function(t) {
        for (var e = T.valueOf(58), r = T.valueOf(0), i = 0, n = t.length - 1; n >= 0; n--) {
            var s = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz".indexOf(t[n]);
            if (s < 0) throw "Invalid character";
            r = r.add(T.valueOf(s).multiply(e.pow(t.length - 1 - n))), "1" == t[n] ? i++ : i = 0
        }
        for (var o = r.toByteArrayUnsigned(); i-- > 0;) o.unshift(0);
        return o
    }, ft.ajax = function(t, e, r, i) {
        var n = !1;
        try {
            n = new ActiveXObject("Msxml2.XMLHTTP")
        } catch (t) {
            try {
                n = new ActiveXObject("Microsoft.XMLHTTP")
            } catch (t) {
                n = new XMLHttpRequest
            }
        }
        if (0 == n) return !1;
        n.open(r, t, !0), n.onreadystatechange = function() {
            4 == n.readyState && e && e(n.responseText)
        }, "POST" == r && n.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), n.send(i)
    }, ft.clone = function(t) {
        if (null == t || "object" != typeof t) return t;
        var e = new t.constructor;
        for (var r in t) t.hasOwnProperty(r) && (e[r] = ft.clone(t[r]));
        return e
    }, ft.numToBytes = function(t, e) {
        return void 0 === e && (e = 8), 0 == e ? [] : -1 == t ? Crypto.util.hexToBytes("ffffffffffffffff") : [t % 256].concat(ft.numToBytes(Math.floor(t / 256), e - 1))
    }, ft.numToByteArray = function(t) {
        return t <= 256 ? [t] : [t % 256].concat(ft.numToByteArray(Math.floor(t / 256)))
    }, ft.numToVarInt = function(t) {
        return t < 253 ? [t] : t < 65536 ? [253].concat(ft.numToBytes(t, 2)) : t < 4294967296 ? [254].concat(ft.numToBytes(t, 4)) : [255].concat(ft.numToBytes(t, 8))
    }, ft.bytesToNum = function(t) {
        return 0 == t.length ? 0 : t[0] + 256 * ft.bytesToNum(t.slice(1))
    }, ft.uint = function(t, e) {
        if (t.length < e) throw new Error("not enough data");
        for (var r = 0, i = 0; i < e; i++) r *= 256, r += t[i];
        return r
    }, ft.isArray = function(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }, ft.countObject = function(t) {
        var e, r = 0;
        for (e in t) t.hasOwnProperty(e) && r++;
        return r
    }, ft.random = function(t) {
        var e = "",
            r = t || 25;
        for (x = 0; x < r; x++) e += "!$%^&*()_+{}:@~?><|./;'#][=-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".charAt(Math.floor(62 * Math.random()));
        return e
    }, ft
}();
