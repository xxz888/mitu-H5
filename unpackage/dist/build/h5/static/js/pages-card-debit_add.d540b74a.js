(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-card-debit_add"],{"2a06":function(t,e,a){"use strict";(function(t){var n=a("4ea4");a("99af"),a("c19f"),a("ace4"),a("d3b7"),a("ac1f"),a("3ca3"),a("1276"),a("5cc6"),a("9a8c"),a("a975"),a("735e"),a("c1ac"),a("d139"),a("3a7b"),a("d5d6"),a("82f8"),a("e91f"),a("60bd"),a("5f96"),a("3280"),a("3fcc"),a("ca91"),a("25a1"),a("cd26"),a("2954"),a("649e"),a("219c"),a("b39a"),a("72f7"),a("ddb0"),a("2b3d"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n(a("97f5")),o={components:{WCompress:i.default},data:function(){return{title:"绑定结算卡",step:3,camera:a("94ca6"),fullname:"",bankcard:"",bank_name:"",array:["南京人民银行支行","北京建设银行朝阳路支行"],provinceCity:"请选择开户行地点",phone:"",users:[]}},onShow:function(){this.api_getUser()},methods:{onSinngle:function(){var e=this;uni.chooseImage({count:1,success:function(a){e.$refs.wCompress.start(a.tempFilePaths[0],{pixels:1e5,quality:.5,type:"png",base64:!1}).then((function(t){e.single=t,e.savePicture(t)})).catch((function(e){t.log(e)}))}})},savePicture:function(e){for(var a=e.split(","),n=atob(a[1]),i=new ArrayBuffer(n.length),o=new Uint8Array(i),c=0;c<n.length;c++)o[c]=n.charCodeAt(c);var d=new Blob([i],{type:"application/octet-stream"}),r=URL.createObjectURL(d);t.log("url===",r);var s=this;s.camera=r;var l={filePath:r};s.$api.api_ocrUploadBankcard(l).then((function(e){var a=JSON.parse(e.data);t.log("r.code",a),0==a.code?(s.bankcard=a.data.card_number,s.bank_name=a.data.bank_name):uni.showToast({title:"解析失败",icon:"none"})})).catch((function(t){}))},api_getUser:function(){var e=this,a={id:uni.getStorageSync("users").id};this.$meapi.api_getUser(a).then((function(a){t.log("首页获取个人信息成功成功",a.data.selfLevel),0==a.code&&(e.fullname=a.data.fullname)})).catch((function(e){t.log("api_changeAlipay失败",e)}))},openCamera:function(){var e=this,a=this;t.log("上传图片"),uni.chooseImage({count:1,success:function(n){t.log("res.tempFilePaths[0]",n.tempFilePaths[0]),e.camera=n.tempFilePaths[0];var i={filePath:n.tempFilePaths[0]};a.$api.api_ocrUploadBankcard(i).then((function(e){t.log("api_ocrUploadA",e.data);var n=JSON.parse(e.data);0==n.code&&"借记卡"==n.data.card_type?(a.bankcard=n.data.card_number,a.bank_name=n.data.bank_name):"借记卡"!=n.data.card_type?uni.showToast({title:"请识别借记卡",icon:"none"}):uni.showToast({title:"识别失败",icon:"none"})})).catch((function(t){}))}})},handleGetRegion:function(e){t.log(e),this.provinceCity="".concat(e[0].name).concat(e[1].name)},bindDebitCard:function(){t.log("123456");var e=this;if(t.log(uni.getStorageSync("users")),t.log(e.bankcard),t.log(e.provinceCity),t.log(e.phone),e.bankcard.length<6||e.provinceCity.length<2||11!=e.phone.length)uni.showToast({title:"请先完善信息",icon:"none"});else{var a={fullname:uni.getStorageSync("users").fullname,bankName:e.bank_name,bankcard:e.bankcard,provinceCity:e.provinceCity,phone:e.phone};e.$api.api_bindBankcard(a).then((function(e){t.log("api_bindBankcard",e),0==e.code?uni.navigateBack({}):uni.showToast({title:e.message,icon:"none"})})).catch((function(e){t.log("err=",e)}))}},tuerbandcard:function(){uni.reLaunch({url:"/pages/index/index"})},back:function(){uni.navigateBack()}}};e.default=o}).call(this,a("5a52")["default"])},4804:function(t,e,a){"use strict";a.r(e);var n=a("ae20"),i=a("cb3c");for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("a938");var c,d=a("f0c5"),r=Object(d["a"])(i["default"],n["b"],n["c"],!1,null,"dd26cedc",null,!1,n["a"],c);e["default"]=r.exports},"5cab":function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.bg-title[data-v-dd26cedc]{width:100%;height:100%;position:absolute;left:0;top:0}.header[data-v-dd26cedc]{width:100%;position:relative;padding:%?30?%;padding-top:%?80?%;height:%?207?%;background-color:#46c7a9}.header .header-title-common[data-v-dd26cedc]{display:flex;align-items:center;width:100%;justify-content:center;position:relative}.header .header-title-common b[data-v-dd26cedc]{font-size:%?48?%;font-family:PingFang SC;font-weight:700;color:#fff}.header .header-title-common p[data-v-dd26cedc]{-webkit-transform:rotate(45deg);transform:rotate(45deg);border-bottom:%?5?% solid #fff;border-left:%?5?% solid #fff;width:%?20?%;height:%?20?%;position:absolute;left:0}.header .process-box[data-v-dd26cedc]{width:%?630?%;margin:0 auto;margin-top:%?64?%;display:flex}.header .process-box li[data-v-dd26cedc]{flex:1;display:flex;flex-direction:column;align-items:center;position:relative}.header .process-box li b[data-v-dd26cedc]{width:%?40?%;height:%?40?%;border-radius:50%;background-color:#fff;box-sizing:border-box;border:%?10?% solid #5e584e}.header .process-box li p[data-v-dd26cedc]{font-size:%?24?%;font-family:PingFang SC;font-weight:500;color:#fff;margin-top:%?10?%}.header .process-box .line[data-v-dd26cedc]::after{content:"";width:%?140?%;height:%?2?%;background-color:#fff;right:%?140?%;position:absolute;top:%?20?%}.header .process-box .line[data-v-dd26cedc]::before{content:"";width:%?140?%;height:%?2?%;background-color:#fff;left:%?140?%;position:absolute;top:%?20?%}.active p[data-v-dd26cedc]{color:#f7cf9e!important}.active b[data-v-dd26cedc]{box-sizing:border-box;background-color:#f7cf9e!important;border:%?10?% solid #645a52}.step-box[data-v-dd26cedc]{padding:0 %?30?%;position:relative}.step3-container[data-v-dd26cedc]{padding-top:%?115?%}.step3-container .warning-box[data-v-dd26cedc]{width:%?750?%;height:%?85?%;background:#e3fff7;position:absolute;top:0;font-size:%?24?%;font-family:PingFang SC;font-weight:500;color:#666;left:0;display:flex;align-items:center;padding:0 %?40?%}.step3-container .tips[data-v-dd26cedc]{font-size:%?24?%;font-family:PingFang SC;font-weight:500;color:#46c7a9}.step3-container .photo-box[data-v-dd26cedc]{display:flex;justify-content:center;padding:%?30?%}.step3-container .photo-box uni-image[data-v-dd26cedc]{width:%?434?%;height:%?261?%}.step3-container .input-box[data-v-dd26cedc]{border-bottom:%?1?% solid #dcdcdc;display:flex;align-items:center;padding:%?20?% 0}.step3-container .input-box p[data-v-dd26cedc]{width:%?180?%}.step3-container .input-box p[data-v-dd26cedc]:last-child{-webkit-transform:rotate(45deg);transform:rotate(45deg);border-top:%?5?% solid #dcdcdc;border-right:%?5?% solid #dcdcdc;width:%?15?%;height:%?15?%;margin-left:auto;margin-right:%?50?%}.step3-container .card-box[data-v-dd26cedc]{flex-direction:column}.step3-container .card-box h1[data-v-dd26cedc]{display:flex;align-items:center;width:100%;margin-top:%?10?%}.step3-container .card-box b[data-v-dd26cedc]{width:100%;font-size:%?17?%!important;font-family:PingFang SC;font-weight:500;color:#46c7a9;margin-top:%?10?%}.step3-container .btn[data-v-dd26cedc]{height:%?91?%;width:%?666?%;display:flex;align-items:center;justify-content:center;background-color:#46c7a9;border-radius:%?16?%;font-size:%?30?%;font-family:PingFang SC;font-weight:500;color:#fff;margin-top:%?50?%;margin-bottom:%?100?%}',""]),t.exports=e},"94ca6":function(t,e,a){t.exports=a.p+"static/img/upcard.0381073e.png"},a938:function(t,e,a){"use strict";var n=a("eeb5"),i=a.n(n);i.a},ae20:function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return n}));var n={pickRegions:a("7201").default,wCompress:a("97f5").default},i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"container"},[a("v-uni-view",{staticClass:"header"},[a("v-uni-view",{staticClass:"header-title-common"},[a("p",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.back.apply(void 0,arguments)}}}),a("b",[t._v(t._s(t.title))])])],1),a("v-uni-view",{staticClass:"step-box"},[a("v-uni-view",{staticClass:"step3-container"},[a("v-uni-view",{staticClass:"warning-box"},[t._v("请添加本人储蓄卡作为结算卡，该卡作为后续刷卡、提现资金的结算账号，户名必须与实名认证姓名一致")]),a("v-uni-view",{staticClass:"tips"},[t._v("*建议:工商、农业、交通、招商、民生、华夏、平安等一类卡(不支持二类卡及地方性银行)")]),a("v-uni-view",{staticClass:"photo-box",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onSinngle.apply(void 0,arguments)}}},[a("v-uni-image",{attrs:{src:t.camera}})],1),a("v-uni-view",{staticClass:"input-box"},[a("p",[t._v("账户姓名")]),a("v-uni-input",{attrs:{type:"text",value:t.fullname,disabled:!0}})],1),a("v-uni-view",{staticClass:"input-box card-box"},[a("h1",[a("p",[t._v("银行卡号")]),a("v-uni-input",{staticStyle:{width:"400upx"},attrs:{type:"number",placeholder:"请扫描银行卡或输入卡号"},model:{value:t.bankcard,callback:function(e){t.bankcard=e},expression:"bankcard"}})],1),a("b",[t._v("请核对卡号信息是否正确，若有误，请手动修改")])]),a("pick-regions",{on:{getRegion:function(e){arguments[0]=e=t.$handleEvent(e),t.handleGetRegion.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"input-box",staticStyle:{padding:"30upx 0",border:"none"}},[a("p",[t._v("开户行地点")]),a("a",[t._v(t._s(t.provinceCity))]),a("p")])],1),a("v-uni-view",{staticClass:"input-box",staticStyle:{border:"none"}},[a("p",[t._v("手机号")]),a("v-uni-input",{attrs:{type:"number",maxlength:"11",placeholder:"请输入银行预留手机号"},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}})],1),a("v-uni-view",{staticClass:"btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.bindDebitCard.apply(void 0,arguments)}}},[t._v("确定绑卡")]),a("w-compress",{ref:"wCompress"})],1)],1)],1)},o=[]},cb3c:function(t,e,a){"use strict";a.r(e);var n=a("2a06"),i=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},eeb5:function(t,e,a){var n=a("5cab");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=a("4f06").default;i("929a3f68",n,!0,{sourceMap:!1,shadowMode:!1})}}]);