(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-users-huodong"],{"345c":function(t,a,i){"use strict";i.r(a);var e=i("58bd"),n=i.n(e);for(var o in e)"default"!==o&&function(t){i.d(a,t,(function(){return e[t]}))}(o);a["default"]=n.a},"58bd":function(t,a,i){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i={data:function(){return{centre:[]}},onShow:function(){this.getcentre()},methods:{back:function(){uni.navigateBack({})},getcentre:function(a){var i,e=this;i={},this.$meapi.api_getCentre(i).then((function(a){t.log("获取我的团队成功",a),0==a.code&&(e.centre=a.data)})).catch((function(a){t.log("api_changeAlipay失败",a)}))}}};a.default=i}).call(this,i("5a52")["default"])},9618:function(t,a,i){t.exports=i.p+"static/img/huodong.e7b2e837.png"},a57e:function(t,a,i){"use strict";i.r(a);var e=i("ad8e"),n=i("345c");for(var o in n)"default"!==o&&function(t){i.d(a,t,(function(){return n[t]}))}(o);i("e4c0");var r,d=i("f0c5"),s=Object(d["a"])(n["default"],e["b"],e["c"],!1,null,"2722a569",null,!1,e["a"],r);a["default"]=s.exports},ad8e:function(t,a,i){"use strict";var e;i.d(a,"b",(function(){return n})),i.d(a,"c",(function(){return o})),i.d(a,"a",(function(){return e}));var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-uni-view",{staticClass:"container"},[e("v-uni-view",{staticClass:"header"},[e("v-uni-image",{staticClass:"bg-title",attrs:{src:"https://daihuan.oss-cn-beijing.aliyuncs.com/shiming/roleCheck-bg%402x.png"}}),e("v-uni-view",{staticClass:"header-title-common"},[e("p",{on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.back.apply(void 0,arguments)}}}),e("b",[t._v("活动中心")])])],1),e("v-uni-image",{staticClass:"lbt",attrs:{src:i("9618")}}),e("v-uni-view",{staticClass:"foot"},[e("p",{staticClass:"p1"},[t._v("-------- 直推抵扣 --------")]),e("h6",[e("v-uni-view",{staticStyle:{width:"690upx",height:"30upx"}}),e("v-uni-view",[e("a",[t._v("累计交易量-")]),e("a",[t._v("--------")]),e("a",[t._v(t._s(t.centre.totalAmount)+"万")])]),e("v-uni-view",[e("a",[t._v("转化人数-")]),e("a",[t._v("--------")]),e("a",[t._v(t._s(t.centre.personCount))])]),3==t.centre.vipLevel?e("v-uni-view",[e("a",{staticStyle:{width:"600upx"}},[t._v("您当前已是最高钻石vip等级")])]):e("v-uni-view",[e("a",[t._v("钻石V"+t._s(t.centre.vipLevel+1))]),e("a",[t._v("--------")]),e("a",[t._v("差"+t._s(t.centre.howUpdate)+"万")])]),e("h3",{staticClass:"shuom"},[e("p",[t._v("注：普通用户还款30万自动晋升LV1，")]),e("p",[t._v("LV1升级LV2，本账号下每产生20万交易量等同于直推钻石用户一名，")]),e("p",[t._v("LV2升级LV3，本账号下每产生20万交易量等同于直推钻石用户一名。")])])],1)])],1)},o=[]},cc5a:function(t,a,i){var e=i("f173");e.__esModule&&(e=e.default),"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var n=i("4f06").default;n("dcfd835a",e,!0,{sourceMap:!1,shadowMode:!1})},e4c0:function(t,a,i){"use strict";var e=i("cc5a"),n=i.n(e);n.a},f173:function(t,a,i){var e=i("24fb");a=e(!1),a.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.bg-title[data-v-2722a569]{width:100%;height:100%;position:absolute;left:0;top:0;z-index:-1}.foot[data-v-2722a569]{width:%?690?%;height:%?690?%;background:-webkit-gradient(linear,left top,left bottom,color-stop(0,#0b111d),color-stop(100%,#575c66));margin-left:%?29?%;margin-top:%?29?%;border-radius:%?20?%}.foot .p1[data-v-2722a569]{display:flex;justify-content:center;font-size:%?36?%;color:#fff;padding-top:%?50?%}.foot h6[data-v-2722a569]{width:%?600?%;height:%?497?%;background-color:#fff;margin-left:%?44?%;margin-top:%?50?%;border-radius:%?20?%}.foot h6 uni-view[data-v-2722a569]{width:90%;height:%?80?%;display:flex;margin-left:5%}.foot h6 uni-view a[data-v-2722a569]{width:%?200?%;padding-left:%?40?%;padding-top:%?30?%;font-size:%?24?%;color:#ff8100;border-bottom:%?1?% solid silver}.foot h6 .shuom[data-v-2722a569]{width:95%;margin-top:%?28?%;font-size:%?26?%;color:red;padding-left:%?20?%}.header[data-v-2722a569]{width:100%;position:relative;padding:%?30?%;padding-top:calc(0px + %?30?%);min-height:%?100?%;height:%?204?%}.header .header-title-common[data-v-2722a569]{display:flex;align-items:center;width:100%;justify-content:center;position:relative;margin-top:%?50?%}.header .header-title-common b[data-v-2722a569]{font-size:%?48?%;font-family:PingFang SC;font-weight:700;color:#f7cf9e}.header .header-title-common p[data-v-2722a569]{-webkit-transform:rotate(45deg);transform:rotate(45deg);border-bottom:%?5?% solid #d4c09d;border-left:%?5?% solid #d4c09d;width:%?20?%;height:%?20?%;position:absolute;left:0}.lbt[data-v-2722a569]{width:%?690?%;margin-top:%?42?%;margin-left:%?29?%;height:%?247?%;border-radius:%?20?%}.main-box[data-v-2722a569]{padding:%?30?%}.main-box .search-content[data-v-2722a569]{display:flex;align-items:center;margin-bottom:%?20?%}.main-box .search-content .search-box[data-v-2722a569]{height:%?60?%;flex:1;background:#fff;box-shadow:0 %?4?% %?6?% %?0?% rgba(28,28,28,.2);border-radius:%?10?%;display:flex;align-items:center}.main-box .search-content .search-box uni-image[data-v-2722a569]{width:%?27?%;margin:0 %?20?%}.main-box .search-content .search-box uni-input[data-v-2722a569]{font-size:%?24?%;flex:1}.main-box .search-content .search-box p[data-v-2722a569]{font-size:%?24?%;font-family:PingFang SC;font-weight:500;color:#ff9426;padding-right:%?30?%}.main-box .search-content .select-box[data-v-2722a569]{padding:0 %?40?%;margin-left:%?20?%;height:%?60?%;background:#fff;box-shadow:0 %?4?% %?6?% %?0?% rgba(28,28,28,.2);border-radius:%?10?%;display:flex;align-items:center;font-size:%?24?%;font-family:PingFang SC;font-weight:500;color:#999}.main-box .search-content .select-box uni-image[data-v-2722a569]{width:%?27?%;margin-left:%?10?%}.main-box ul li[data-v-2722a569]{background:#fff;box-shadow:0 %?4?% %?6?% 0 rgba(28,28,28,.3);border-radius:%?10?%;margin-bottom:%?20?%;padding:%?30?% %?10?%}.main-box ul li .data-box[data-v-2722a569]{display:flex;background:#f9f9f9;border-radius:10px;flex-wrap:wrap;padding:0 %?20?% %?20?% %?20?%;margin-top:%?20?%}.main-box ul li .data-box p[data-v-2722a569]{font-size:%?24?%;font-family:PingFang SC;font-weight:500;color:#333;margin-top:%?20?%;width:50%}.main-box ul li .data-box p uni-text[data-v-2722a569]{font-size:%?24?%;color:#ff9426}.main-box ul li .user-box[data-v-2722a569]{display:flex;align-items:center}.main-box ul li .user-box uni-image[data-v-2722a569]{width:%?80?%;height:%?80?%;border-radius:50%;margin-right:%?20?%}.main-box ul li .user-box .right-box[data-v-2722a569]{flex:1;height:%?80?%;display:flex;flex-direction:column;justify-content:space-between;font-size:%?24?%;font-family:PingFang SC;font-weight:500;color:#333}.main-box ul li .user-box .right-box uni-image[data-v-2722a569]{width:%?40?%;margin-right:%?0?%;margin-left:%?10?%}.main-box ul li .user-box .right-box h1[data-v-2722a569]{display:flex;justify-content:space-between}.main-box ul li .user-box .right-box h1 p[data-v-2722a569]{display:flex;align-items:center}.main-box ul li .user-box .right-box h1 p uni-text[data-v-2722a569]{background:#eee;border-radius:%?10?%;display:flex;font-size:%?24?%;padding:0 %?20?%;margin-left:%?10?%}.main-box ul li .user-box .right-box h1 a[data-v-2722a569]{font-size:%?20?%;font-family:PingFang SC;font-weight:500;color:#666}.empty[data-v-2722a569]{position:absolute;z-index:-1;width:100%;height:100vh;padding-top:%?600?%;margin-left:%?275?%;top:0;left:0;align-items:center;justify-content:center}.empty uni-image[data-v-2722a569]{width:%?200?%}.empty .tits[data-v-2722a569]{width:%?200?%;color:silver;display:flex;justify-content:center}',""]),t.exports=a}}]);