(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/card/modifiesxy_card"],{"5c12":function(e,t,a){"use strict";(function(e){a("3335");n(a("66fd"));var t=n(a("5dfe"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,a("543d")["createPage"])},"5dfe":function(e,t,a){"use strict";a.r(t);var n=a("781d"),o=a("f607");for(var i in o)"default"!==i&&function(e){a.d(t,e,(function(){return o[e]}))}(i);a("6042");var c,r=a("f0c5"),d=Object(r["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],c);t["default"]=d.exports},"5f79":function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={data:function(){return{bankName:"",fullname:"",cardNo:"",phone:"",expiredTime:"",securityCode:"",billDay:"",repaymentDay:"",id:""}},onShow:function(){},onLoad:function(e){this.id=e.id,console.log("e.id================================",e.id),this.api_getUser(),this.getcard(e.id)},methods:{api_getUser:function(){var t=this,a={id:e.getStorageSync("users").id};this.$meapi.api_getUser(a).then((function(e){console.log("首页获取个人信息成功成功",e.data.fullname),0==e.code&&(t.fullname=e.data.fullname)})).catch((function(t){console.log("api_changeAlipay失败",t),e.showToast({title:"网络链接失败",icon:"none"})}))},getcard:function(t){var a={id:t},n=this;this.$api.api_xyCard(a).then((function(e){console.log("api_xyCard成功",e),0==e.code&&(n.cardNo=e.data.cardNo,n.phone=e.data.phone,n.expiredTime=e.data.expiredTime,n.securityCode=e.data.securityCode,n.billDay=e.data.billDay,n.repaymentDay=e.data.repaymentDay)})).catch((function(t){console.log("api_xyCard失败",t),e.showToast({title:"网络链接失败",icon:"none"})}))},modifiesbindCard:function(){var t=this,a={id:t.id,cardNo:t.cardNo,phone:t.phone,expiredTime:t.expiredTime,securityCode:t.securityCode,billDay:t.billDay,repaymentDay:t.repaymentDay};this.$api.api_modifiesxyCard(a).then((function(t){if(console.log("api_modifiesxyCard成功",t),0==t.code){e.showToast({title:"修改成功"});setTimeout((function(){e.navigateBack({})}),1e3)}else e.showToast({title:t.message,icon:"none"})})).catch((function(t){console.log("api_modifiesxyCard失败",t),e.showToast({title:"网络链接失败",icon:"none"})}))},openCamera:function(){var t=this,a=this;console.log("上传图片"),e.chooseImage({count:1,success:function(n){console.log("res.tempFilePaths[0]",n.tempFilePaths[0]),t.camera=n.tempFilePaths[0];var o={filePath:n.tempFilePaths[0]};a.$api.api_ocrUploadBankcard(o).then((function(t){console.log("api_ocrUploadA",t.data);var n=JSON.parse(t.data);0==n.code?a.cardNo=n.data.card_number:e.showToast({title:"识别失败",icon:"none"})})).catch((function(t){e.showToast({title:"网络链接失败",icon:"none"})}))}})},back:function(){e.navigateBack({})}}};t.default=a}).call(this,a("543d")["default"])},6042:function(e,t,a){"use strict";var n=a("cd1d"),o=a.n(n);o.a},"781d":function(e,t,a){"use strict";var n;a.d(t,"b",(function(){return o})),a.d(t,"c",(function(){return i})),a.d(t,"a",(function(){return n}));var o=function(){var e=this,t=e.$createElement,a=(e._self._c,e.cardNo.substring(0,5)),n=e.cardNo.substring(e.cardNo.length,e.cardNo.length-4),o=e.phone.substring(0,3),i=e.phone.substring(7,11);e.$mp.data=Object.assign({},{$root:{g0:a,g1:n,g2:o,g3:i}})},i=[]},cd1d:function(e,t,a){},f607:function(e,t,a){"use strict";a.r(t);var n=a("5f79"),o=a.n(n);for(var i in n)"default"!==i&&function(e){a.d(t,e,(function(){return n[e]}))}(i);t["default"]=o.a}},[["5c12","common/runtime","common/vendor"]]]);