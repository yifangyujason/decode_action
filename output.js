//1721230033333
const $ = new Env("批量店铺签到（活动查询）");
const common = require("./utils/Rebels_jdCommon"),
  {
    H5st,
    jsTk
  } = require("./utils/Rebels_H");
let tokensList = (process.env.jd_dpqd_tokens || "").split(/[,@&|\n]+/g).filter(Boolean);
const printEnvValue = process.env.jd_dpqd_print_env === "true";
let TokensMap = new Map();
const CacheFile = __dirname + "/rs_dpqd_tokens.json";
!(async () => {
  await Main();
})().catch(_0x252e00 => $.logErr(_0x252e00)).finally(() => $.done());
async function Main() {
  try {
    console.log("==========" + $.name + "变量开启状态==========");
    console.log("代理开关: [" + common.getProxyStatus() + "]");
    console.log("==========" + $.name + "变量状态结束==========");
    console.log("");
    if (tokensList.length > 0) {
      tokensList = [...new Set(tokensList.filter(_0x5ab0fd => _0x5ab0fd !== ""))];
    }
    if (tokensList.length <= 0) {
      console.log("⚠ 请先定义必要的环境变量后再运行脚本！");
      return;
    }
    const _0x58bd77 = [];
    console.log("");
    $.UA = common.genUA("9Rebels");
    ({
      jsToken: $.jsToken
    } = await jsTk($.UA, "https://h5.m.jd.com/babelDiy/Zeus/2PAAf74aG3D61qvfKUM5dxUssJQ9/index.html", {
      bizId: "SJHT-DPQDH5",
      v: "3.2.1.0",
      qs: "token=" + tokensList[0]
    }));
    for (let [_0x497b10, _0x1c8eff] of tokensList.entries()) {
      let _0x407801 = true;
      const _0x354c81 = _0x497b10 + 1;
      _0x1c8eff.includes(":") && _0x1c8eff.split(":").length === 3 && (_0x1c8eff = _0x1c8eff.split(":")[0]);
      if (_0x1c8eff.length !== 32 || !/^[A-Z0-9]*$/.test(_0x1c8eff)) {
        console.log("❌ 第" + _0x354c81 + "个令牌格式错误");
        continue;
      }
      $.token = _0x1c8eff;
      TokensMap.set(_0x1c8eff, {
        index: null,
        venderId: "",
        shopName: "",
        activityId: "",
        startTime: "",
        endTime: "",
        isValid: true,
        rules: [],
        minLevel: null,
        maxLevel: null
      });
      let _0x49177e = 0;
      $.getActivityInfo = "";
      $.invalidAct = false;
      const _0x431071 = 10;
      while (!$.getActivityInfo && _0x49177e < _0x431071 && !$.invalidAct) {
        $.getActivityInfo = "";
        await sendRequest("getActivityInfo");
        await $.wait(1000);
        _0x49177e++;
        _0x49177e === _0x431071 && (console.log($.errMsg || "❌ 获取活动信息失败"), $.errMsg = "");
      }
      if (!$.getActivityInfo) {
        continue;
      }
      const _0x5e217c = $.getActivityInfo.venderId,
        _0x5715da = $.getActivityInfo.id,
        _0x11d9d6 = $.getActivityInfo.activityStatus,
        _0x3b7bb9 = $.getActivityInfo.continuePrizeRuleList || [],
        _0x502e50 = $.getActivityInfo.prizeRuleList || [],
        _0x255baf = $.getActivityInfo.startTime,
        _0x355d9a = $.getActivityInfo.endTime,
        _0x194600 = $.time("yyyy-MM-dd HH:mm", _0x255baf),
        _0xc80922 = $.time("yyyy-MM-dd HH:mm", _0x355d9a);
      let _0x58e48d = false;
      const _0x5356f8 = [],
        _0x38c450 = [..._0x502e50, ..._0x3b7bb9];
      for (const _0xa4077e of _0x38c450) {
        const _0x1e7a96 = _0xa4077e.level,
          _0x5b1521 = _0xa4077e.prizeList || [],
          _0x28853a = [];
        for (const _0x34c07f of _0x5b1521) {
          let _0x55c126 = "";
          const _0x463ab2 = _0x34c07f.discount,
            _0x4ecb2d = _0x34c07f.type,
            _0x585ff0 = _0x34c07f.number,
            _0x375b70 = _0x34c07f.status,
            _0x2f7fdd = _0x375b70 === 5;
          switch (_0x4ecb2d) {
            case 1:
              _0x55c126 = "优惠券";
              break;
            case 4:
              _0x55c126 = _0x463ab2 + "京豆";
              break;
            case 6:
              _0x55c126 = _0x463ab2 + "店铺积分";
              break;
            case 9:
              _0x55c126 = "" + _0x34c07f?.["interactPrizeSkuList"][0]?.["skuName"];
              break;
            case 10:
              _0x55c126 = _0x463ab2 + "元E卡";
              break;
            case 14:
              _0x55c126 = _0x463ab2 / 100 + "元红包";
              break;
            default:
              _0x55c126 = "未知奖品（" + _0x4ecb2d + "）";
          }
          if (![1, 6].includes(_0x4ecb2d) && !_0x2f7fdd) {
            _0x58e48d = true;
          }
          _0x28853a.push(_0x55c126 + "（共" + _0x585ff0 + "份" + (_0x2f7fdd ? "，已发完" : "") + "）");
        }
        _0x5356f8.push({
          days: _0x1e7a96,
          prize: _0x28853a,
          havePrize: _0x58e48d
        });
      }
      const _0x55cbff = await common.getShopName({
        venderId: _0x5e217c
      });
      console.log("【" + _0x1c8eff + "】\n" + (_0x55cbff ? "店铺名称：#" + _0x55cbff + "\n" : "") + "开始时间：" + _0x194600 + "\n结束时间：" + _0xc80922);
      _0x5356f8.length > 0 && console.log(_0x5356f8.map(_0x562c9a => (_0x562c9a.days === 0 ? "每日签到" : "连续" + (_0x562c9a.days < 10 ? " " : "") + _0x562c9a.days + "天") + "：" + _0x562c9a.prize.join("，")).join("\n"));
      console.log("");
      const _0x5b29eb = Date.now();
      _0x255baf && _0x5b29eb < _0x255baf && (console.log("活动将在 " + _0x194600 + " 开始，晚点再来吧~\n"), _0x58bd77.push(_0x1c8eff), _0x407801 = false);
      if (_0x355d9a && _0x5b29eb > _0x355d9a) {
        console.log("活动已于 " + _0xc80922 + " 结束，下次早点来吧~\n");
        _0x58bd77.push(_0x1c8eff);
        _0x407801 = false;
      } else {
        _0x11d9d6 === 3 && (console.log("活动已结束\n"), _0x58bd77.push(_0x1c8eff), _0x407801 = false);
      }
      !_0x58e48d && (_0x58bd77.push(_0x1c8eff), _0x407801 = false);
      const _0x341052 = TokensMap.get(_0x1c8eff);
      _0x341052.index = _0x354c81;
      _0x341052.venderId = _0x5e217c;
      _0x341052.shopName = _0x55cbff;
      _0x341052.activityId = _0x5715da;
      _0x341052.startTime = _0x255baf;
      _0x341052.endTime = _0x355d9a;
      _0x341052.isValid = _0x407801;
      _0x341052.rules = _0x5356f8;
      _0x5356f8.length > 0 && (_0x341052.minLevel = _0x5356f8[0].days, _0x341052.maxLevel = _0x5356f8[_0x5356f8.length - 1].days);
      TokensMap.set(_0x1c8eff, _0x341052);
    }
    if (_0x58bd77.length > 0) {
      console.log("\n建议移除的活动：");
      for (const _0x1dae1f of _0x58bd77) {
        console.log(_0x1dae1f);
      }
    }
    const _0x4dc07f = Object.fromEntries(TokensMap),
      _0x492e7f = require("fs");
    _0x492e7f.writeFileSync(CacheFile, JSON.stringify(_0x4dc07f, null, 2));
    console.log("缓存写入完毕，所在目录：");
    console.log(CacheFile);
    if (printEnvValue) {
      console.log("\n环境变量：");
      let _0x24a9ca = [];
      for (const [_0x276650, _0x101aa1] of TokensMap) {
        _0x101aa1.activityId && _0x101aa1.venderId && _0x24a9ca.push(_0x276650 + ":" + _0x101aa1.activityId + ":" + _0x101aa1.venderId);
      }
      console.log(_0x24a9ca.join(","));
    }
  } catch (_0x15339f) {
    console.log("❌ 脚本运行遇到了错误\n" + _0x15339f);
  }
}
async function handleResponse(_0x328264, _0x40ba6b) {
  try {
    switch (_0x328264) {
      case "getActivityInfo":
        if (_0x40ba6b.code === 200 && _0x40ba6b.success === true && _0x40ba6b.data) {
          $.getActivityInfo = _0x40ba6b.data;
        } else {
          _0x40ba6b.msg ? (console.log("🚫 查询活动信息失败 ➜ " + _0x40ba6b.msg), $.invalidAct = true) : (console.log("❓" + _0x328264 + " " + JSON.stringify(_0x40ba6b)), $.invalidAct = true);
        }
        break;
    }
  } catch (_0x30368a) {
    console.log("❌ 未能正确处理 " + _0x328264 + " 请求响应 " + (_0x30368a.message || _0x30368a));
  }
}
async function sendRequest(_0x205fb2) {
  if ($.runEnd) {
    return;
  }
  let _0x2e7a8b = "",
    _0x5a1032 = null,
    _0x4c6e46 = null,
    _0x358f8c = "GET",
    _0x7c9007 = {},
    _0x1892b4 = {};
  switch (_0x205fb2) {
    case "getActivityInfo":
      _0x1892b4 = {
        appId: "4da33",
        functionId: "interact_center_shopSign_getActivityInfo",
        appid: "interCenter_shopSign",
        body: {
          token: $.token,
          venderId: parseInt($.venderId) || ""
        },
        version: "4.7",
        ua: $.UA
      };
      _0x7c9007 = await H5st.getH5st(_0x1892b4);
      _0x2e7a8b = "https://api.m.jd.com/api";
      _0x4c6e46 = Object.assign({}, _0x7c9007.paramsData, {
        jsonp: "jsonp1003"
      });
      break;
    default:
      console.log("❌ 未知请求 " + _0x205fb2);
      return;
  }
  const _0x25333e = {
    t: Math.floor(Date.now() / 1000) + "000",
    loginType: "2",
    "x-api-eid-token": $.jsToken
  };
  _0x5a1032 && Object.assign(_0x5a1032, _0x25333e);
  _0x4c6e46 && Object.assign(_0x4c6e46, _0x25333e);
  const _0x25f7ae = {
    url: _0x2e7a8b,
    method: _0x358f8c,
    headers: {
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      Connection: "keep-alive",
      "Content-Type": "text/plain",
      Host: "api.m.jd.com",
      Referer: "https://h5.m.jd.com/",
      "Sec-Fetch-Dest": "script",
      "Sec-Fetch-Mode": "no-cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent": $.UA
    },
    params: _0x4c6e46,
    data: _0x5a1032,
    timeout: 30000,
    httpsTlsOptions: common.useAppTls()
  };
  _0x358f8c === "GET" && (delete _0x25f7ae.data, delete _0x25f7ae.headers["Content-Type"]);
  const _0x1876a9 = 1;
  let _0x2332cd = 0,
    _0x5b1428 = null,
    _0x5d27f7 = null;
  while (_0x2332cd < _0x1876a9) {
    _0x2332cd > 0 && (await $.wait(2000));
    const _0x1ad67b = await common.request(_0x25f7ae);
    if (!_0x1ad67b.success) {
      _0x5d27f7 = _0x1ad67b.status;
      _0x5b1428 = "🚫 " + _0x205fb2 + " 请求失败 ➜ " + _0x1ad67b.error;
      _0x2332cd++;
      continue;
    }
    if (!_0x1ad67b.data) {
      _0x5b1428 = "🚫 " + _0x205fb2 + " 请求失败 ➜ 无响应数据";
      _0x2332cd++;
      continue;
    }
    await handleResponse(_0x205fb2, _0x1ad67b.data);
    ipBlack = false;
    break;
  }
  _0x2332cd >= _0x1876a9 && ($.errMsg = _0x5b1428, _0x5d27f7 !== 403 && console.log(_0x5b1428));
}
function Env(t, e) {
  "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
  class s {
    constructor(t) {
      this.env = t;
    }
    send(t, e = "GET") {
      t = "string" == typeof t ? {
        url: t
      } : t;
      let s = this.get;
      "POST" === e && (s = this.post);
      return new Promise((e, i) => {
        s.call(this, t, (t, s, r) => {
          t ? i(t) : e(s);
        });
      });
    }
    get(t) {
      return this.send.call(this.env, t);
    }
    post(t) {
      return this.send.call(this.env, t, "POST");
    }
  }
  return new class {
    constructor(t, e) {
      this.name = t;
      this.http = new s(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = !1;
      this.isNeedRewrite = !1;
      this.logSeparator = "\n";
      this.startTime = new Date().getTime();
      Object.assign(this, e);
      this.log("", `🔔${this.name}, 开始!`);
    }
    isNode() {
      return "undefined" != typeof module && !!module.exports;
    }
    isQuanX() {
      return "undefined" != typeof $task;
    }
    isSurge() {
      return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
    }
    isLoon() {
      return "undefined" != typeof $loon;
    }
    toObj(t, e = null) {
      try {
        return JSON.parse(t);
      } catch {
        return e;
      }
    }
    toStr(t, e = null) {
      try {
        return JSON.stringify(t);
      } catch {
        return e;
      }
    }
    getjson(t, e) {
      let s = e;
      const i = this.getdata(t);
      if (i) {
        try {
          s = JSON.parse(this.getdata(t));
        } catch {}
      }
      return s;
    }
    setjson(t, e) {
      try {
        return this.setdata(JSON.stringify(t), e);
      } catch {
        return !1;
      }
    }
    getScript(t) {
      return new Promise(e => {
        this.get({
          url: t
        }, (t, s, i) => e(i));
      });
    }
    runScript(t, e) {
      return new Promise(s => {
        let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        i = i ? i.replace(/\n/g, "").trim() : i;
        let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        r = r ? 1 * r : 20;
        r = e && e.timeout ? e.timeout : r;
        const [o, h] = i.split("@"),
          n = {
            url: `http://${h}/v1/scripting/evaluate`,
            body: {
              script_text: t,
              mock_type: "cron",
              timeout: r
            },
            headers: {
              "X-Key": o,
              Accept: "*/*"
            }
          };
        this.post(n, (t, e, i) => s(i));
      }).catch(t => this.logErr(t));
    }
    loaddata() {
      if (!this.isNode()) {
        return {};
      }
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e);
        if (!s && !i) {
          return {};
        }
        {
          const i = s ? t : e;
          try {
            return JSON.parse(this.fs.readFileSync(i));
          } catch (t) {
            return {};
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e),
          r = JSON.stringify(this.data);
        s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r);
      }
    }
    lodash_get(t, e, s) {
      const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
      let r = t;
      for (const t of i) if (r = Object(r)[t], void 0 === r) {
        return s;
      }
      return r;
    }
    lodash_set(t, e, s) {
      return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t);
    }
    getdata(t) {
      let e = this.getval(t);
      if (/^@/.test(t)) {
        const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
          r = s ? this.getval(s) : "";
        if (r) {
          try {
            const t = JSON.parse(r);
            e = t ? this.lodash_get(t, i, "") : e;
          } catch (t) {
            e = "";
          }
        }
      }
      return e;
    }
    setdata(t, e) {
      let s = !1;
      if (/^@/.test(e)) {
        const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e),
          o = this.getval(i),
          h = i ? "null" === o ? null : o || "{}" : "{}";
        try {
          const e = JSON.parse(h);
          this.lodash_set(e, r, t);
          s = this.setval(JSON.stringify(e), i);
        } catch (e) {
          const o = {};
          this.lodash_set(o, r, t);
          s = this.setval(JSON.stringify(o), i);
        }
      } else {
        s = this.setval(t, e);
      }
      return s;
    }
    getval(t) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null;
    }
    setval(t, e) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null;
    }
    initGotEnv(t) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar));
    }
    get(t, e = () => {}) {
      t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]);
      this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.get(t, (t, s, i) => {
        !t && s && (s.body = i, s.statusCode = s.status);
        e(t, s, i);
      })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
        hints: !1
      })), $task.fetch(t).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o);
      }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
        try {
          if (t.headers["set-cookie"]) {
            const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
            s && this.ckjar.setCookieSync(s, null);
            e.cookieJar = this.ckjar;
          }
        } catch (t) {
          this.logErr(t);
        }
      }).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o);
      }, t => {
        const {
          message: s,
          response: i
        } = t;
        e(s, i, i && i.body);
      }));
    }
    post(t, e = () => {}) {
      if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) {
        this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
          "X-Surge-Skip-Scripting": !1
        }));
        $httpClient.post(t, (t, s, i) => {
          !t && s && (s.body = i, s.statusCode = s.status);
          e(t, s, i);
        });
      } else {
        if (this.isQuanX()) {
          t.method = "POST";
          this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
            hints: !1
          }));
          $task.fetch(t).then(t => {
            const {
              statusCode: s,
              statusCode: i,
              headers: r,
              body: o
            } = t;
            e(null, {
              status: s,
              statusCode: i,
              headers: r,
              body: o
            }, o);
          }, t => e(t));
        } else {
          if (this.isNode()) {
            this.initGotEnv(t);
            const {
              url: s,
              ...i
            } = t;
            this.got.post(s, i).then(t => {
              const {
                statusCode: s,
                statusCode: i,
                headers: r,
                body: o
              } = t;
              e(null, {
                status: s,
                statusCode: i,
                headers: r,
                body: o
              }, o);
            }, t => {
              const {
                message: s,
                response: i
              } = t;
              e(s, i, i && i.body);
            });
          }
        }
      }
    }
    time(t, e = null) {
      const s = e ? new Date(e) : new Date();
      let i = {
        "M+": s.getMonth() + 1,
        "d+": s.getDate(),
        "H+": s.getHours(),
        "m+": s.getMinutes(),
        "s+": s.getSeconds(),
        "q+": Math.floor((s.getMonth() + 3) / 3),
        S: s.getMilliseconds()
      };
      /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
      return t;
    }
    msg(e = t, s = "", i = "", r) {
      const o = t => {
        if (!t) {
          return t;
        }
        if ("string" == typeof t) {
          return this.isLoon() ? t : this.isQuanX() ? {
            "open-url": t
          } : this.isSurge() ? {
            url: t
          } : void 0;
        }
        if ("object" == typeof t) {
          if (this.isLoon()) {
            let e = t.openUrl || t.url || t["open-url"],
              s = t.mediaUrl || t["media-url"];
            return {
              openUrl: e,
              mediaUrl: s
            };
          }
          if (this.isQuanX()) {
            let e = t["open-url"] || t.url || t.openUrl,
              s = t["media-url"] || t.mediaUrl;
            return {
              "open-url": e,
              "media-url": s
            };
          }
          if (this.isSurge()) {
            let e = t.url || t.openUrl || t["open-url"];
            return {
              url: e
            };
          }
        }
      };
      if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
        let t = ["", "==============📣系统通知📣=============="];
        t.push(e);
        s && t.push(s);
        i && t.push(i);
        console.log(t.join("\n"));
        this.logs = this.logs.concat(t);
      }
    }
    log(...t) {
      t.length > 0 && (this.logs = [...this.logs, ...t]);
      console.log(t.join(this.logSeparator));
    }
    logErr(t, e) {
      const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t);
    }
    wait(t) {
      return new Promise(e => setTimeout(e, t));
    }
    done(t = {}) {
      const e = new Date().getTime(),
        s = (e - this.startTime) / 1000;
      this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`);
      this.log();
      (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t);
    }
  }(t, e);
}