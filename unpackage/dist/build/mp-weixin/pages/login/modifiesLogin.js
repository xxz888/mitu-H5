(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/modifiesLogin"],{"0c08":function(e,n,t){"use strict";var o=t("0cd0"),a=t.n(o);a.a},"0cd0":function(e,n,t){},8954:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=s(t("a34a")),a=s(t("6f97"));function s(e){return e&&e.__esModule?e:{default:e}}function i(e,n,t,o,a,s,i){try{var c=e[s](i),r=c.value}catch(l){return void t(l)}c.done?n(r):Promise.resolve(r).then(o,a)}function c(e){return function(){var n=this,t=arguments;return new Promise((function(o,a){var s=e.apply(n,t);function c(e){i(s,o,a,c,r,"next",e)}function r(e){i(s,o,a,c,r,"throw",e)}c(void 0)}))}}var r={data:function(){return{title:"为确保您的资金安全，请验证身份重置密码",headTitle:"修改密码",phone:"",password1:"",password2:"",smsCord:"",modalShow:!1,validateCode:"",codeDesc:"发送验证码",preventClickCode:!1,area:"请选择地区"}},onShow:function(){this.api_getUser()},methods:{api_getUser:function(){var n=this,t=this,o={id:e.getStorageSync("users").id};this.$meapi.api_getUser(o).then((function(o){console.log("api_getUser成功",o),0==o.code?(void 0==o.data.fullname?t.fullname="未实名":(t.fullname=o.data.fullname,t.selfLevel=o.data.selfLevel,console.log("selfLevel===",o.data.selfLevel)),console.log("res.data.fullname",o.data.fullname),n.phone=o.data.username):5==o.code&&e.showModal({title:"未登录",content:"立即去登录",success:function(n){n.confirm&&e.reLaunch({url:"/pages/login/login"})}})})).catch((function(n){console.log("api_changeAlipay失败",n),e.showToast({title:"网络链接失败",icon:"none"})}))},updatePassword:function(){if(this.password1!=this.password2||this.password1.length<6||this.password2.length<6)e.showToast({title:"密码有误",icon:"none"});else{var n=this,t="HengchUang33@",o=n.password1+t,s=a.default.md5(o).toUpperCase(),i={brandId:getApp().globalData.brandId,username:n.phone,password:s,smsCode:n.smsCord};this.$meapi.api_updatePassword(i).then((function(n){if(console.log("重置密码",n),0==n.code){e.showToast({title:"修改成功"});setTimeout((function(){e.navigateTo({url:"/pages/login/login"})}),500)}else e.showToast({title:n.message,icon:"none"})})).catch((function(n){console.log("api_sendCode失败",n),e.showToast({title:"发送失败",icon:"none"})}))}},back:function(){e.navigateBack()},handleGetRegion:function(e){console.log(e),this.area="".concat(e[0].name).concat(e[1].name)},getCode:function(){var n=this;return c(o.default.mark((function t(){return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(11==n.phone.length){t.next=3;break}return e.showToast({title:"请输入手机号",icon:"none"}),t.abrupt("return",!1);case 3:n.sendcode();case 4:case"end":return t.stop()}}),t)})))()},sendcode:function(){var n=this,t={phone:n.phone,type:0};this.$api.api_sendCode(t).then((function(t){if(0==t.code){n.preventClickCode=!0,e.showToast({title:"验证码已发送"});var o=60,a=setInterval((function(){o>0?(o--,n.codeDesc="".concat(o,"s")):(n.codeDesc="发送验证码",n.preventClickCode=!1,clearInterval(a))}),1e3)}else e.showToast({title:"发送失败",icon:"none"})})).catch((function(n){console.log("api_sendCode失败",n),e.showToast({title:"发送失败",icon:"none"})}))}}};n.default=r}).call(this,t("543d")["default"])},b150:function(e,n,t){"use strict";t.r(n);var o=t("e839"),a=t("b79b");for(var s in a)"default"!==s&&function(e){t.d(n,e,(function(){return a[e]}))}(s);t("0c08");var i,c=t("f0c5"),r=Object(c["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);n["default"]=r.exports},b79b:function(e,n,t){"use strict";t.r(n);var o=t("8954"),a=t.n(o);for(var s in o)"default"!==s&&function(e){t.d(n,e,(function(){return o[e]}))}(s);n["default"]=a.a},c5d0:function(e,n,t){"use strict";(function(e){t("3335");o(t("66fd"));var n=o(t("b150"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},e839:function(e,n,t){"use strict";var o;t.d(n,"b",(function(){return a})),t.d(n,"c",(function(){return s})),t.d(n,"a",(function(){return o}));var a=function(){var e=this,n=e.$createElement;e._self._c},s=[]}},[["c5d0","common/runtime","common/vendor"]]]);