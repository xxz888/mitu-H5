(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-card-modifiesxy_card"],{"723e":function(e,t,a){"use strict";a.r(t);var i=a("f847"),n=a("f31a");for(var o in n)"default"!==o&&function(e){a.d(t,e,(function(){return n[e]}))}(o);a("be99");var d,r=a("f0c5"),l=Object(r["a"])(n["default"],i["b"],i["c"],!1,null,"d515a64e",null,!1,i["a"],d);t["default"]=l.exports},"8cfd":function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={data:function(){return{bankName:"",fullname:"",cardNo:"",phone:"",expiredTime:"",securityCode:"",billDay:"",repaymentDay:"",id:""}},onShow:function(){},onLoad:function(t){this.id=t.id,e.log("e.id================================",t.id),this.api_getUser(),this.getcard(t.id)},methods:{api_getUser:function(){var t=this,a={id:uni.getStorageSync("users").id};this.$meapi.api_getUser(a).then((function(a){e.log("首页获取个人信息成功成功",a.data.fullname),0==a.code&&(t.fullname=a.data.fullname)})).catch((function(t){e.log("api_changeAlipay失败",t)}))},getcard:function(t){var a={id:t},i=this;this.$api.api_xyCard(a).then((function(t){e.log("api_xyCard成功",t),0==t.code&&(i.cardNo=t.data.cardNo,i.phone=t.data.phone,i.expiredTime=t.data.expiredTime,i.securityCode=t.data.securityCode,i.billDay=t.data.billDay,i.repaymentDay=t.data.repaymentDay)})).catch((function(t){e.log("api_xyCard失败",t)}))},modifiesbindCard:function(){var t=this,a={id:t.id,cardNo:t.cardNo,phone:t.phone,expiredTime:t.expiredTime,securityCode:t.securityCode,billDay:t.billDay,repaymentDay:t.repaymentDay};this.$api.api_modifiesxyCard(a).then((function(t){if(e.log("api_modifiesxyCard成功",t),0==t.code){uni.showToast({title:"修改成功"});setTimeout((function(){uni.navigateBack({})}),1e3)}else uni.showToast({title:t.message,icon:"none"})})).catch((function(t){e.log("api_modifiesxyCard失败",t)}))},openCamera:function(){var t=this,a=this;e.log("上传图片"),uni.chooseImage({count:1,success:function(i){e.log("res.tempFilePaths[0]",i.tempFilePaths[0]),t.camera=i.tempFilePaths[0];var n={filePath:i.tempFilePaths[0]};a.$api.api_ocrUploadBankcard(n).then((function(t){e.log("api_ocrUploadA",t.data);var i=JSON.parse(t.data);0==i.code?a.cardNo=i.data.card_number:uni.showToast({title:"识别失败",icon:"none"})})).catch((function(e){}))}})},back:function(){uni.navigateBack({})}}};t.default=a}).call(this,a("5a52")["default"])},"91bc":function(e,t,a){var i=a("b4a2");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var n=a("4f06").default;n("2353c142",i,!0,{sourceMap:!1,shadowMode:!1})},b4a2:function(e,t,a){var i=a("24fb");t=i(!1),t.push([e.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.bg-title[data-v-d515a64e]{width:100%;height:100%;position:absolute;left:0;top:0;z-index:-1}.header[data-v-d515a64e]{width:100%;position:relative;padding:%?30?%;height:%?207?%;padding-top:calc(0px + %?30?%);min-height:%?100?%;background-color:#46c7a9}.header .header-title-common[data-v-d515a64e]{display:flex;align-items:center;width:100%;justify-content:center;position:relative;padding-top:%?50?%}.header .header-title-common b[data-v-d515a64e]{font-size:%?48?%;font-family:PingFang SC;font-weight:700;color:#fff}.header .header-title-common p[data-v-d515a64e]{-webkit-transform:rotate(45deg);transform:rotate(45deg);border-bottom:%?5?% solid #fff;border-left:%?5?% solid #fff;width:%?20?%;height:%?20?%;position:absolute;left:0}h1[data-v-d515a64e]{background:#e3fff7;display:flex;align-items:center;padding:%?30?% %?50?%;font-size:%?22?%;font-family:PingFang SC;font-weight:500;color:#333}.form-1[data-v-d515a64e]{width:%?690?%;background:#fff;box-shadow:0 %?8?% %?22?% %?2?% rgba(67,67,67,.13);border-radius:%?20?%;padding:0 %?16?%;margin:0 auto;margin-top:%?30?%}.form-1 h2[data-v-d515a64e]{display:flex;align-items:center;border-bottom:%?1?% solid #e1e1e1;padding:%?20?% 0;font-size:%?24?%;font-family:PingFang SC;font-weight:500;color:#333}.form-1 h2 uni-input[data-v-d515a64e]{flex:1;font-size:%?20?%}.form-1 h2 p[data-v-d515a64e]{width:%?170?%}.form-1 h2 .photo-box[data-v-d515a64e]{display:flex;align-items:center;flex-direction:column;font-size:%?18?%;font-family:PingFang SC;font-weight:500;color:#999}.form-1 h2 .photo-box uni-image[data-v-d515a64e]{width:%?43?%;height:%?34?%;margin-bottom:%?10?%}.tips[data-v-d515a64e]{display:flex;padding:%?60?%}.tips p[data-v-d515a64e]:first-child{width:%?40?%;font-size:%?22?%;font-family:PingFang SC;font-weight:700;color:#46c7a9}.tips p[data-v-d515a64e]:last-child{font-size:%?22?%;font-family:PingFang SC;font-weight:400;color:#999}.btn[data-v-d515a64e]{height:%?86?%;width:%?660?%;margin:0 auto;background-color:#46c7a9;display:flex;align-items:center;justify-content:center;font-size:%?30?%;font-family:PingFang SC;font-weight:700;color:#fff;border-radius:%?20?%}.showBox[data-v-d515a64e]{display:flex;width:100%;height:100%;justify-content:center;align-items:center;background:rgba(0,0,0,.5);position:fixed;top:0;left:0;z-index:20}.showBox .inner[data-v-d515a64e]{display:flex;width:80%;flex-direction:column;background:#fff;border-radius:%?20?%;overflow:hidden}.showBox .inner[data-v-d515a64e]{display:flex;width:80%;flex-direction:column;background:#fff;border-radius:%?20?%;overflow:hidden}.showBox .center[data-v-d515a64e]{display:flex;width:60%;flex-direction:column;background:#fff;border-radius:%?20?%;overflow:hidden}.showBox .center .showBoxContent[data-v-d515a64e]{display:flex;width:100%;flex-direction:column}.showBox .center .showBoxContent .bookmark[data-v-d515a64e]{width:100%}.showBox .center .btnLine[data-v-d515a64e]{display:flex;width:100%;border-top:1px solid #eee}.showBox .center .btnLine uni-button[data-v-d515a64e]{display:flex;width:100%;height:%?80?%;justify-content:center;align-items:center;color:#4390ea;font-size:%?28?%}.showBox[data-v-d515a64e]{display:flex;width:100%;height:100%;justify-content:center;align-items:center;background:rgba(0,0,0,.5);position:fixed;top:0;left:0;z-index:20}.showBox .inner[data-v-d515a64e]{display:flex;width:80%;flex-direction:column;background:#fff;border-radius:%?20?%;overflow:hidden}.showBox .inner[data-v-d515a64e]{display:flex;width:80%;flex-direction:column;background:#fff;border-radius:%?20?%;overflow:hidden}.showBox .center[data-v-d515a64e]{display:flex;width:60%;flex-direction:column;background:#fff;border-radius:%?20?%;overflow:hidden}.showBox .center .showBoxContent[data-v-d515a64e]{display:flex;width:100%;flex-direction:column}.showBox .center .showBoxContent .bookmark[data-v-d515a64e]{width:100%}.showBox .center .btnLine[data-v-d515a64e]{display:flex;width:100%;border-top:1px solid #eee}.showBox .center .btnLine uni-button[data-v-d515a64e]{display:flex;width:100%;height:%?80?%;justify-content:center;align-items:center;color:#4390ea;font-size:%?28?%}',""]),e.exports=t},be99:function(e,t,a){"use strict";var i=a("91bc"),n=a.n(i);n.a},f31a:function(e,t,a){"use strict";a.r(t);var i=a("8cfd"),n=a.n(i);for(var o in i)"default"!==o&&function(e){a.d(t,e,(function(){return i[e]}))}(o);t["default"]=n.a},f847:function(e,t,a){"use strict";var i;a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return o})),a.d(t,"a",(function(){return i}));var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"container"},[a("v-uni-view",{staticClass:"header"},[a("v-uni-view",{staticClass:"header-title-common"},[a("p",{on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.back.apply(void 0,arguments)}}}),a("b",[e._v("修改信用卡")])])],1),a("h1",[e._v("修改信用卡基本信息")]),a("v-uni-view",{staticClass:"form-1"},[a("h2",[a("p",[e._v("银行卡号")]),a("v-uni-input",{attrs:{type:"number",disabled:!0,placeholder:e.cardNo.substring(0,5)+"******"+e.cardNo.substring(e.cardNo.length,e.cardNo.length-4)}})],1),a("h2",[a("p",[e._v("预留号码")]),a("v-uni-input",{attrs:{type:"number",placeholder:e.phone.substring(0,3)+"****"+e.phone.substring(7,11)}})],1),a("h2",[a("p",[e._v("有效期")]),a("v-uni-input",{attrs:{type:"number",maxlength:"4",placeholder:"请输入有效期(如09/22输入0922)"},model:{value:e.expiredTime,callback:function(t){e.expiredTime=t},expression:"expiredTime"}})],1),a("h2",[a("p",[e._v("安全码")]),a("v-uni-input",{attrs:{type:"number",maxlength:"3",placeholder:"请输入安全码"},model:{value:e.securityCode,callback:function(t){e.securityCode=t},expression:"securityCode"}})],1),a("h2",[a("p",[e._v("账单日")]),a("v-uni-input",{attrs:{type:"number",maxlength:"2",placeholder:"请输入账单日"},model:{value:e.billDay,callback:function(t){e.billDay=t},expression:"billDay"}})],1),a("h2",[a("p",[e._v("还款日")]),a("v-uni-input",{attrs:{type:"number",maxlength:"2",placeholder:"请输入还款日"},model:{value:e.repaymentDay,callback:function(t){e.repaymentDay=t},expression:"repaymentDay"}})],1)]),a("v-uni-view",{staticClass:"tips"},[a("p",[e._v("注：")]),a("p",[e._v("1.同一张卡每天只能绑定五次，如有失败请第二天尝试 2.暂不支持借贷合—卡制定还款计划")])]),a("v-uni-view",{staticClass:"btn",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.modifiesbindCard.apply(void 0,arguments)}}},[e._v("确定修改")])],1)},o=[]}}]);