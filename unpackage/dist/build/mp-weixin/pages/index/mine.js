(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/mine"],{2810:function(e,n,t){"use strict";var o;t.d(n,"b",(function(){return a})),t.d(n,"c",(function(){return s})),t.d(n,"a",(function(){return o}));var a=function(){var e=this,n=e.$createElement;e._self._c;e._isMounted||(e.e0=function(n){e.show_zj=!0},e.e1=function(n){e.show_zj=!1})},s=[]},b1d9:function(e,n,t){"use strict";var o=t("bd08"),a=t.n(o);a.a},b43f:function(e,n,t){"use strict";(function(e){t("3335");o(t("66fd"));var n=o(t("d9c0"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},bd08:function(e,n,t){},d9c0:function(e,n,t){"use strict";t.r(n);var o=t("2810"),a=t("e9e2");for(var s in a)"default"!==s&&function(e){t.d(n,e,(function(){return a[e]}))}(s);t("b1d9");var i,u=t("f0c5"),l=Object(u["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);n["default"]=l.exports},e51e:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t={data:function(){return{fullname:"未登录",phone:"",id:"",selfLevel:0,vipLevel:0,show_zj:!1,status:0,empower:!1,titles:"开启上级授权后，您的推荐人可以帮助您进行还款操作"}},onShow:function(){this.api_getUser()},methods:{goguanyuwm:function(){e.navigateTo({url:"/pages/users/guyuwm"})},gohellp:function(){e.navigateTo({url:"/pages/users/hellp"})},gousershow:function(){e.navigateTo({url:"/pages/users/usershow"})},goshare:function(){console.log("点击邀请好友"),e.navigateTo({url:"/pages/users/share"})},gomeset:function(){"未登录"!=this.fullname?e.navigateTo({url:"/pages/login/meset"}):e.showModal({title:"登录已过期",content:"立即去登录",success:function(n){n.confirm&&e.navigateTo({url:"/pages/login/login"})}})},golist:function(n){if(0!=this.selfLevel){console.log("index=",n);var t="";if(0==n)t="/pages/users/revenueRule";else if(1==n)t="/pages/users/earningslist";else{if(3!=n)return void e.showToast({title:"暂未开放",icon:"none"});t="/pages/users/myTeam"}console.log(t),e.navigateTo({url:t})}else e.showModal({title:"未实名",content:"立即去实名",success:function(n){n.confirm&&e.navigateTo({url:"/pages/authentication/authentication"})}})},gokf:function(){e.navigateTo({url:"/pages/users/kef"})},switchEmpower:function(){var n=this,t=1;n.empower&&(t=0);var o={status:t};this.$medapi.api_switchEmpower(o).then((function(t){console.log("开启或则关闭中介授权成功",t),0==t.code?(n.show_zj=!1,n.api_getUser(),e.showToast({title:"授权成功"})):e.showToast({title:t.message,icon:"none"})})).catch((function(n){e.showToast({title:"网络链接失败",icon:"none"})}))},api_getUser:function(){var n=this,t=this,o={id:e.getStorageSync("users").id};this.$meapi.api_getUser(o).then((function(o){if(console.log("个人中心获取个人资料成功",o.data.fullname,o.data.id,o.data),0==o.code){t.empower=o.data.empower,console.log("empower=============================",o.data.empower),o.data.empower?t.titles="关闭上级授权后，您的推荐人不可以帮助您进行还款操作":t.titles="开启上级授权后，您的推荐人可以帮助您进行还款操作",0==o.data.selfLevel?t.fullname="未实名":""==o.data.nick||void 0==o.data.nick?t.fullname=o.data.fullname:t.fullname=o.data.nick,t.vipLevel=o.data.vipLevel;var a=o.data.username;t.selfLevel=o.data.selfLevel,n.phone=a.substring(0,3)+"****"+a.substring(7,11)}else 5==o.code&&e.showModal({title:"未登录",content:"立即去登录",success:function(n){n.confirm&&e.reLaunch({url:"/pages/login/login"})}})})).catch((function(n){console.log("api_changeAlipay失败",n),e.showToast({title:"网络链接失败",icon:"none"})}))}}};n.default=t}).call(this,t("543d")["default"])},e9e2:function(e,n,t){"use strict";t.r(n);var o=t("e51e"),a=t.n(o);for(var s in o)"default"!==s&&function(e){t.d(n,e,(function(){return o[e]}))}(s);n["default"]=a.a}},[["b43f","common/runtime","common/vendor"]]]);