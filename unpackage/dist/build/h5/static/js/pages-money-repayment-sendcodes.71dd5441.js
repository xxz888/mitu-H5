(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-money-repayment-sendcodes"],{2636:function(e,t,a){var n=a("5f72");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var i=a("4f06").default;i("5f899eb8",n,!0,{sourceMap:!1,shadowMode:!1})},5884:function(e,t,a){"use strict";var n;a.d(t,"b",(function(){return i})),a.d(t,"c",(function(){return o})),a.d(t,"a",(function(){return n}));var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"container"},[a("v-uni-view",{staticClass:"header"},[a("v-uni-image",{staticClass:"bg-title",attrs:{src:"https://daihuan.oss-cn-beijing.aliyuncs.com/shiming/roleCheck-bg%402x.png"}}),a("v-uni-view",{staticClass:"header-title-common"},[a("p",{on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.back.apply(void 0,arguments)}}}),a("b",[e._v("签约确认")])])],1),a("h1",[e._v("信息加密处理，仅用于银行验证，请验证你本人的银行卡")]),a("v-uni-view",{staticClass:"form-box"},[a("h2",[a("p",[e._v("持卡人")]),a("p",[e._v(e._s(e.fullname))])]),a("h2",[a("p",[e._v("卡号")]),a("p",[e._v(e._s(e.ylhk_card.cardNo))])]),a("h2",[a("p",[e._v("安全码")]),a("v-uni-input",{attrs:{type:"number",value:e.ylhk_card.securityCode,placeholder:"请输入安全码"}})],1),a("h2",[a("p",[e._v("验证码")]),a("v-uni-input",{staticStyle:{"text-align":"center"},attrs:{type:"number",maxlength:"6",placeholder:"请输入验证码"},model:{value:e.smsCode,callback:function(t){e.smsCode=t},expression:"smsCode"}}),a("v-uni-view",{staticClass:"code"},[a("b",{class:e.preventClickCode?"prevent":"",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.getCode.apply(void 0,arguments)}}},[e._v(e._s(e.codeDesc))])])],1)]),a("v-uni-view",{staticClass:"btn",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.bindCardConfirm.apply(void 0,arguments)}}},[e._v("确定签约")])],1)},o=[]},"5f72":function(e,t,a){var n=a("24fb");t=n(!1),t.push([e.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.bg-title[data-v-bc6c7af8]{width:100%;height:100%;position:absolute;left:0;top:0;z-index:-1}.header[data-v-bc6c7af8]{width:100%;position:relative;padding:%?30?%;padding-top:calc(0px + %?30?%);height:%?207?%}.header .header-title-common[data-v-bc6c7af8]{display:flex;align-items:center;width:100%;justify-content:center;position:relative;margin-top:%?50?%}.header .header-title-common b[data-v-bc6c7af8]{font-size:%?48?%;font-family:PingFang SC;font-weight:700;color:#f7cf9e}.header .header-title-common p[data-v-bc6c7af8]:first-child{-webkit-transform:rotate(45deg);transform:rotate(45deg);border-bottom:%?5?% solid #d4c09d;border-left:%?5?% solid #d4c09d;width:%?20?%;height:%?20?%;position:absolute;left:0}.header .header-title-common p[data-v-bc6c7af8]:last-child{font-size:%?24?%;font-family:PingFang SC;font-weight:700;color:#f7cf9e;position:absolute;right:0}h1[data-v-bc6c7af8]{font-size:%?23?%;font-family:PingFang SC;font-weight:500;color:#333;height:%?70?%;background:linear-gradient(269deg,#d79f65,#fdd8aa);display:flex;padding-left:%?30?%;align-items:center}.form-box[data-v-bc6c7af8]{background:#fff;box-shadow:0 %?8?% %?22?% %?2?% rgba(67,67,67,.2);border-radius:%?20?%;width:%?690?%;margin:%?60?% auto;padding:0 %?30?%}.form-box h2[data-v-bc6c7af8]{display:flex;align-items:center;justify-content:space-between;font-size:%?24?%;font-family:PingFang SC;font-weight:500;color:#666;padding:%?30?% 0;border-bottom:%?1?% solid #e1e1e1}.form-box h2 uni-input[data-v-bc6c7af8]{text-align:right;font-size:%?24?%}.form-box h2 p[data-v-bc6c7af8]:last-child{color:#888;font-size:%?24?%}.code b[data-v-bc6c7af8]{margin-left:auto;width:%?180?%;line-height:100%;display:flex;font-size:%?24?%;align-items:center;justify-content:center;height:100%;text-align:center;font-weight:400;color:#df8e40}.code .prevent[data-v-bc6c7af8]{pointer-events:none;color:#999!important}.btn[data-v-bc6c7af8]{height:%?86?%;width:%?660?%;margin:%?100?% auto;background:linear-gradient(269deg,#d79f65,#fdd8aa);display:flex;align-items:center;justify-content:center;font-size:%?30?%;font-family:PingFang SC;font-weight:700;color:#333;border-radius:%?20?%}.modal[data-v-bc6c7af8]{position:fixed;top:0;left:0;right:0;bottom:0;display:flex;justify-content:center;align-items:center;background:rgba(0,0,0,.5);z-index:9}.modal .modal-content[data-v-bc6c7af8]{width:%?690?%;border-radius:%?20?%;display:flex;flex-direction:column;align-items:center;position:relative;overflow:hidden;padding:%?40?% 0}.modal .modal-content .modal-text[data-v-bc6c7af8]{position:relative;z-index:19;display:flex;flex-direction:column;align-items:center}.modal .modal-content .m-bg[data-v-bc6c7af8]{position:absolute;z-index:10;top:0;left:0;width:100%;height:100%}.modal .modal-content .card-icon[data-v-bc6c7af8]{width:%?110?%;margin-bottom:%?10?%}.modal .modal-content a[data-v-bc6c7af8]{font-size:%?36?%;font-family:PingFang SC;font-weight:700;color:#f4ca99;display:flex;margin-bottom:%?10?%}.modal .modal-content p[data-v-bc6c7af8]{font-size:%?50?%;font-family:DIN;font-weight:700;color:#f4ca99;display:flex;margin-bottom:%?20?%}.modal .modal-content b[data-v-bc6c7af8]{display:flex;align-items:center;justify-content:center;padding:%?5?% %?30?%;border-radius:%?5?%;background:#f4ca99;font-size:%?20?%;font-family:PingFang SC;font-weight:700;color:#252527}h4[data-v-bc6c7af8]{display:flex;justify-content:center;padding:0 %?40?%;line-height:%?36?%}h4 b[data-v-bc6c7af8]{font-size:%?29?%;font-family:PingFang SC;font-weight:700;color:#ff9426}h4 p[data-v-bc6c7af8]{font-size:%?20?%;font-family:PingFang SC;color:#888}',""]),e.exports=t},"686d":function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={data:function(){return{fullname:"",a:"123456",codes:"",bankname:"",cardNo:"",phone:"",billDay:"",repaymentDay:"",bankIcon:"",securityCode:"",expiredTime:"",id:"",codeDesc:"获取验证码",preventClickCode:!1,idCard:"",card:"",smsCode:"",ylhk_card:[],sendnumber:""}},onShow:function(){this.api_getUser(),this.ylhk_card=uni.getStorageSync("ylhk_card"),e.log("ylhk_card ===",uni.getStorageSync("ylhk_card"))},methods:{api_getUser:function(){var t=this;e.log("xxxxxxxxxxxxxxxxxxxxx",uni.getStorageSync("users").id);var a={id:uni.getStorageSync("users").id};this.$meapi.api_getUser(a).then((function(a){e.log("api_getUser==============成功",a.data),0==a.code&&(t.fullname=a.data.fullname,t.idCard=a.data.idcard)})).catch((function(t){e.log("api_changeAlipay失败",t)}))},getCode:function(){var t=this,a={cardNo:t.ylhk_card.cardNo};t.preventClickCode||(e.log("点击了发送验证码"),t.preventClickCode=!0,this.$api.api_orbindCard(a).then((function(a){if(e.log("点击了发送验证码",a),0==a.code&&"重复签约"==a.message)t.startNewPlan();else if(0==a.code&&"重复签约"!=a.messages){t.sendnumber=a.data,e.log(" res.data===================",a.data),uni.showToast({title:"验证码已发送"});var n=60,i=setInterval((function(){n>0?(n--,t.codeDesc="".concat(n,"s")):(t.codeDesc="发送验证码",t.preventClickCode=!1,clearInterval(i))}),1e3)}else uni.showToast({title:a.message,icon:"none"});t.preventClickCode=!1})).catch((function(a){t.preventClickCode=!1,e.log("api_sendCode失败",a),uni.showToast({title:"发送失败",icon:"none"})})))},startNewPlan:function(){var t=this;uni.showLoading({title:"启动中...",mask:!0});var a={cardNo:t.ylhk_card.cardNo};this.$api.api_startNewPlan(a).then((function(t){if(uni.hideLoading(),e.log("api_startNewPlan成功",t),0==t.code){uni.showToast({title:"启动成功"});setTimeout((function(){uni.reLaunch({url:"/pages/money/repayment"})}),500)}else uni.showToast({title:t.message,icon:"none"});uni.hideLoading()})).catch((function(t){e.log("api_startNewPlan失败",t),uni.hideLoading()}))},bindCardConfirm:function(){var t=this,a={idCard:t.idCard,cardNo:t.ylhk_card.cardNo,smsCode:t.smsCode,bindId:t.sendnumber};this.$api.api_bindCardConfirm(a).then((function(a){e.log("余额还款确认绑卡成功",a),0==a.code?t.startNewPlan():uni.showToast({title:a.message,icon:"none"})})).catch((function(t){e.log("余额还款确认绑卡失败",t)}))},modifiesxyCard:function(){var t=this,a={id:t.id,cardNo:t.cardNo,phone:t.phone,expiredTime:t.expiredTime,securityCode:t.securityCode,billDay:t.billDay,repaymentDay:t.repaymentDay};this.$api.api_modifiesxyCard(a).then((function(a){if(e.log("api_getBalancePlanList成功",a),0==a.code){var n=t.uni.getStorageSync("xyCard");n.cardNo=t.cardNo,n.phone=t.phone,n.expiredTime=t.expiredTime,n.securityCode=t.securityCode,n.billDay=t.billDay,n.repaymentDay=t.repaymentDay,uni.setStorageSync("xyCard",n),uni.navigateBack({})}})).catch((function(t){e.log("api_getBalancePlanList失败",t)}))},back:function(){uni.navigateBack()}}};t.default=a}).call(this,a("5a52")["default"])},"774d":function(e,t,a){"use strict";var n=a("2636"),i=a.n(n);i.a},"7ed2":function(e,t,a){"use strict";a.r(t);var n=a("686d"),i=a.n(n);for(var o in n)"default"!==o&&function(e){a.d(t,e,(function(){return n[e]}))}(o);t["default"]=i.a},"9b6b":function(e,t,a){"use strict";a.r(t);var n=a("5884"),i=a("7ed2");for(var o in i)"default"!==o&&function(e){a.d(t,e,(function(){return i[e]}))}(o);a("774d");var c,d=a("f0c5"),r=Object(d["a"])(i["default"],n["b"],n["c"],!1,null,"bc6c7af8",null,!1,n["a"],c);t["default"]=r.exports}}]);