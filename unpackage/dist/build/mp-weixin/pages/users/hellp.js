(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/users/hellp"],{"2f7d":function(t,n,e){"use strict";e.r(n);var o=e("e511"),a=e.n(o);for(var i in o)"default"!==i&&function(t){e.d(n,t,(function(){return o[t]}))}(i);n["default"]=a.a},"8aba":function(t,n,e){"use strict";(function(t){e("3335");o(e("66fd"));var n=o(e("9166"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},9166:function(t,n,e){"use strict";e.r(n);var o=e("98d1"),a=e("2f7d");for(var i in a)"default"!==i&&function(t){e.d(n,t,(function(){return a[t]}))}(i);e("c129");var c,u=e("f0c5"),l=Object(u["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],c);n["default"]=l.exports},"98d1":function(t,n,e){"use strict";var o;e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return o}));var a=function(){var t=this,n=t.$createElement;t._self._c},i=[]},c129:function(t,n,e){"use strict";var o=e("c74b"),a=e.n(o);a.a},c74b:function(t,n,e){},e511:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{url:"",tetleList:[]}},onLoad:function(t){this.titlelist()},onShow:function(){},methods:{titlelist:function(){var n=this,e={brandId:getApp().globalData.brandId};this.$api.api_gettitles(e).then((function(e){console.log("获取操作视频列表成功",e),0==e.code?n.tetleList=e.data:t.showToast({title:e.message,icon:"none"})})).catch((function(n){t.showToast({title:"网络链接失败",icon:"none"})}))},back:function(){t.navigateBack({})},govideo:function(n){var e={id:n};this.$api.api_gettitlesId(e).then((function(n){console.log("获取操作视频列表成功",n),0==n.code?t.navigateTo({url:"hellpVideo?url="+n.data}):t.showToast({title:n.message,icon:"none"})})).catch((function(n){t.showToast({title:"网络链接失败",icon:"none"})}))}}};n.default=e}).call(this,e("543d")["default"])}},[["8aba","common/runtime","common/vendor"]]]);