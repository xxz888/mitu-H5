(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-money-getMoneyOnline-selectPayWay"],{2316:function(t,a,e){"use strict";var n;e.d(a,"b",(function(){return i})),e.d(a,"c",(function(){return o})),e.d(a,"a",(function(){return n}));var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-uni-view",{staticClass:"container"},[e("v-uni-view",{staticClass:"header"},[e("v-uni-image",{staticClass:"bg-title",attrs:{src:""}}),e("v-uni-view",{staticClass:"header-title-common"},[e("p",{on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.back.apply(void 0,arguments)}}}),e("b",[t._v("选择刷卡通道")])])],1),e("h1",[e("p",[t._v("信用卡刷卡")]),e("p",[t._v(t._s(t.amount)+"元")])]),e("h2",[t._v("选择刷卡通道")]),e("ul",t._l(t.passageList,(function(a,n){return e("li",{key:n,on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.choose(a.id,a.needCity,a.needCode)}}},[e("h3",[e("v-uni-image",{attrs:{src:"/static/images/yl-icon@2x.png",mode:"widthFix"}}),e("b",[t._v(t._s(a.alias))])],1),e("h4",[e("p",[t._v("单笔限额："+t._s(a.limitMin)+"-"+t._s(a.limitMax)+"元")]),e("p",[t._v("单日限额："+t._s(a.dayMax)+"元")]),e("p",[t._v("交易时间："+t._s(a.startTime)+"-"+t._s(a.endTime))]),e("p",[t._v("交易费率："+t._s(a.costRate)+"+"+t._s(a.costFee))])]),e("h5",{on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.limits(a.id,a.alias)}}},[t._v("查看限额")])])})),0)],1)},o=[]},"2aa2":function(t,a,e){var n=e("93c0");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=e("4f06").default;i("f401d8d4",n,!0,{sourceMap:!1,shadowMode:!1})},"43f5":function(t,a,e){"use strict";e.r(a);var n=e("2316"),i=e("e9ac");for(var o in i)"default"!==o&&function(t){e.d(a,t,(function(){return i[t]}))}(o);e("5300");var d,s=e("f0c5"),c=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,"8af0bf0c",null,!1,n["a"],d);a["default"]=c.exports},5300:function(t,a,e){"use strict";var n=e("2aa2"),i=e.n(n);i.a},"93c0":function(t,a,e){var n=e("24fb");a=n(!1),a.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.bg-title[data-v-8af0bf0c]{width:100%;height:%?389?%;position:absolute;left:0;top:0;z-index:-1;background-color:#46c7a9}.header[data-v-8af0bf0c]{width:100%;position:relative;padding:%?30?%;padding-top:calc(0px + %?30?%);background-color:#46c7a9}.header .header-title-common[data-v-8af0bf0c]{display:flex;align-items:center;width:100%;justify-content:center;position:relative;margin-top:%?50?%}.header .header-title-common b[data-v-8af0bf0c]{font-size:%?48?%;font-family:PingFang SC;font-weight:700;color:#fff}.header .header-title-common p[data-v-8af0bf0c]:first-child{-webkit-transform:rotate(45deg);transform:rotate(45deg);border-bottom:%?5?% solid #fff;border-left:%?5?% solid #fff;width:%?20?%;height:%?20?%;position:absolute;left:0}.header .header-title-common p[data-v-8af0bf0c]:last-child{font-size:%?24?%;font-family:PingFang SC;font-weight:700;color:#fff;position:absolute;right:0}h1[data-v-8af0bf0c]{display:flex;align-items:center;justify-content:space-between;font-size:%?36?%;padding:%?50?% %?100?%;font-family:PingFang SC;font-weight:700;color:#fff}h2[data-v-8af0bf0c]{padding:%?80?% 0 %?30?% %?30?%;font-size:%?36?%;font-family:PingFang SC;font-weight:500;color:#333;margin-top:%?40?%}ul[data-v-8af0bf0c]{width:%?690?%;margin:0 auto}li[data-v-8af0bf0c]{margin-bottom:%?20?%;background:#fff;box-shadow:0 %?8?% %?22?% %?2?% rgba(67,67,67,.13);border-radius:%?20?%;padding:%?22?% %?28?%;overflow:hidden;position:relative}li h3[data-v-8af0bf0c]{display:flex;align-items:center;margin-bottom:%?10?%;font-size:%?24?%;font-family:PingFang SC;font-weight:500;color:#333}li h3 uni-image[data-v-8af0bf0c]{margin-right:%?30?%;width:%?60?%}li h4[data-v-8af0bf0c]{display:flex;flex-wrap:wrap;font-size:%?24?%;font-family:PingFang SC;font-weight:500;color:#555}li h4 p[data-v-8af0bf0c]{width:50%;margin-top:%?20?%}li h5[data-v-8af0bf0c]{width:%?133?%;height:%?56?%;background:#e3fff7;opacity:.5;border-radius:%?10?%;position:absolute;top:0;right:0;display:flex;align-items:center;justify-content:center;font-size:%?20?%;font-family:PingFang SC;font-weight:500;color:#46c7a9}',""]),t.exports=a},e9ac:function(t,a,e){"use strict";e.r(a);var n=e("f2d9"),i=e.n(n);for(var o in n)"default"!==o&&function(t){e.d(a,t,(function(){return n[t]}))}(o);a["default"]=i.a},f2d9:function(t,a,e){"use strict";(function(t){e("99af"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n={data:function(){return{passageList:[{id:2,name:"通道名称",bean_name:"通道在代码里对应的",type:0,start_time:"00:00",end_time:"23:00",cost_rate:"0.65%",cost_fee:"2",limit_min:"100",limit_max:"2万",day_max:"5万",need_city:"id",need_code:"id",enabled:"id",create_time:"id",update_time:"id"},{id:2,name:"通道名称",bean_name:"通道在代码里对应的",type:0,start_time:"00:00",end_time:"23:00",cost_rate:"0.65%",cost_fee:"2",limit_min:"100",limit_max:"2万",day_max:"5万",need_city:"id",need_code:"id",enabled:"id",create_time:"id",update_time:"id"}],amount:""}},onLoad:function(a){this.amount=a.amount,uni.setStorageSync("amount",a.amount),t.log("this.amount=",this.amount),this.showGetpassage(a.bankName,a.debitBankName,a.amount)},methods:{showGetpassage:function(a,e,n){var i=this,o={bankName:a,debitBankName:e,amount:n};this.$api.api_showGetpassage(o).then((function(a){t.log("api_showGetpassage成功",a),0==a.code?(i.passageList=a.data,t.log("=================",a.data[0].id)):uni.showToast({title:a.message,icon:"none"})})).catch((function(t){}))},choose:function(a,e,n){var i=uni.getStorageSync("xyCard"),o=uni.getStorageSync("cxCard"),d={channelId:a,loginPhone:uni.getStorageSync("users").username,bankName:i.bankName,bankCard:i.cardNo,bankPhone:i.phone,securityCode:i.securityCode,expiredTime:i.expiredTime,userName:i.fullname,idCard:i.idCard,debitBankName:o.bankName,debitBankCard:o.cardNo,debitPhone:o.phone};this.$api.api_fastApplys(d).then((function(i){t.log("api_fastApplys成功",i),0==i.code?uni.navigateTo({url:"confirmPay?id="+a+"&needCity="+e+"&needCode="+n}):3==i.code?uni.navigateTo({url:"bindCard?channelId=".concat(a,"&needCity=").concat(e,"&needCode=").concat(n)}):uni.showToast({title:i.message,icon:"none"})})).catch((function(a){t.log("api_fastApplys失败",a)}))},back:function(){uni.navigateBack()},limits:function(t,a){uni.navigateTo({url:"limitsDetail?id="+t+"&name="+a})},pay:function(){uni.navigateTo({url:"confirmPay"})}}};a.default=n}).call(this,e("5a52")["default"])}}]);