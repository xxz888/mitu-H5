(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/medium/havePlan"],{1704:function(e,t,a){"use strict";a.r(t);var n=a("435a"),o=a.n(n);for(var i in n)"default"!==i&&function(e){a.d(t,e,(function(){return n[e]}))}(i);t["default"]=o.a},"3f73":function(e,t,a){"use strict";(function(e){a("3335");n(a("66fd"));var t=n(a("adff"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,a("543d")["createPage"])},"41d8":function(e,t,a){"use strict";var n=a("729f"),o=a.n(n);o.a},"435a":function(e,t,a){"use strict";(function(e){function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=function(){Promise.all([a.e("common/vendor"),a.e("components/pick-regions/pick-regions")]).then(function(){return resolve(a("dcad"))}.bind(null,a)).catch(a.oe)},i=function(){a.e("components/reserve-date/reserve-date").then(function(){return resolve(a("451f"))}.bind(null,a)).catch(a.oe)},r={data:function(){var e;return e={addRate:0,addfeilu:"",ylhk_card:[],pickerTime:!1,area:"请选择消费地区",selected1:!0,selected2:!0,date:"",provinces:"请选择省份",market:"请选择市",cityCode:"",arrayProvinces:[],arrayMarket:[],price:{type:!0,data:[]},isNowDate:!0,disableBefore:!1,endDate:"",startDate:"2021-12-13",singleElection:!1,userId:"",amount:"",reservedAmount:"",executeDate:["选择日期"],tureExecuteDate:"",dayRepaymentCount:1,provinceCode:""},n(e,"cityCode",""),n(e,"area","请选择地区"),n(e,"numbers",["1次","2次","3次","4次"]),n(e,"daynumber","1次"),n(e,"time1",""),n(e,"time2",""),n(e,"days",10),n(e,"yue",0),n(e,"cardId",""),n(e,"billDay",""),n(e,"repaymentDay",""),n(e,"cardNo",""),n(e,"last_days",0),n(e,"phone",""),n(e,"expiredTime",""),n(e,"securityCode",""),e},components:{pickRegions:o,reserveDate:i},onShow:function(){this.ylhk_card=e.getStorageSync("ylhk_card"),this.time1=this.$dataTime.dateTimeStr("m/d",0);var t=this.$dataTime.dateTimeStr("d",0);t>this.ylhk_card.repaymentDay?this.yue=this.$dataTime.dateTimeStr("m",30):this.yue=this.$dataTime.dateTimeStr("m",0),this.date=this.$dataTime.dateTimeStr("y-m-d",0),""!=this.cardId&&this.getcard(this.cardId)},onLoad:function(e){this.getcard(e.id),console.log("e.id================",e.id),this.cardId=e.id,this.getProvinces()},methods:{getcard:function(t){var a={id:t,empowerToken:getApp().globalData.xjToken},n=this;this.$api.api_xyCard1(a).then((function(e){console.log("api_xyCard成功============================",e),0==e.code&&(n.cardNo=e.data.cardNo,n.phone=e.data.phone,n.expiredTime=e.data.expiredTime,n.securityCode=e.data.securityCode,n.billDay=e.data.billDay,n.repaymentDay=e.data.repaymentDay)})).catch((function(t){console.log("api_xyCard失败",t),e.showToast({title:"getcard网络链接失败",icon:"none"})}))},planNewMake:function(){var t=this;if(console.log(t.provinceCode,getApp().globalData.brandId,e.getStorageSync("users").id),console.log(t.cityCode,t.dayRepaymentCount,t.ylhk_card.cardNo),""!=t.amount&&""!=t.reservedAmount&&""!=t.provinceCode&&""!=t.cityCode)if(t.addRate>70||t.addRate<0)e.showToast({title:"执行费率请输入0-70",icon:"none"});else{e.showLoading({title:"定制中...",mask:!0});var a=[];a=t.selected2?{userId:e.getStorageSync("users").id,creditCardNumber:t.ylhk_card.cardNo,amount:t.amount,reservedAmount:t.reservedAmount,brandId:getApp().globalData.brandId,notPoint:t.selected1,dayRepaymentCount:t.dayRepaymentCount,provinceCode:t.cityCode,cityCode:t.provinceCode,empowerToken:getApp().globalData.xjToken,addRate:t.addRate}:{userId:e.getStorageSync("users").id,creditCardNumber:t.ylhk_card.cardNo,amount:t.amount,reservedAmount:t.reservedAmount,brandId:getApp().globalData.brandId,executeDate:t.tureExecuteDate,notPoint:t.selected1,dayRepaymentCount:t.dayRepaymentCount,provinceCode:t.cityCode,cityCode:t.provinceCode,empowerToken:getApp().globalData.xjToken,addRate:t.addRate},this.$api.api_planNewMake(a).then((function(a){e.hideLoading(),console.log("api_planNewMake成功",a),0==a.code?(e.setStorageSync("newPlans",a.data),e.navigateTo({url:"showNewPlan?type=goNewPlan&cardId="+t.cardId})):e.showToast({title:a.message,icon:"none"})})).catch((function(t){e.hideLoading(),console.log("api_planNewMake失败",t),e.showToast({title:"网络链接失败",icon:"none"})}))}else e.showToast({title:"请先完善信息",icon:"none"})},getProvinces:function(){var t=this,a={};this.$api.api_getProvinces(a).then((function(e){console.log("api_getProvinces成功",e),0==e.code&&(t.arrayProvinces=e.data)})).catch((function(t){console.log("api_getProvinces失败",t),e.showToast({title:"网络链接失败",icon:"none"})}))},bindProvincesChange:function(e){this.provinces=this.arrayProvinces[e.detail.value].name;var t=this.arrayProvinces[e.detail.value].id;this.getMarket(t)},getMarket:function(t){var a=this;console.log("parent=",t);var n={parent:t};this.$api.api_getMarket(n).then((function(e){console.log("api_getMarket成功",e),0==e.code&&(a.arrayMarket=e.data)})).catch((function(t){console.log("api_getMarket失败",t),e.showToast({title:"网络链接失败",icon:"none"})}))},bindMarketChange:function(e){this.market=this.arrayMarket[e.detail.value].name,this.cityCode=this.arrayMarket[e.detail.value].parent,this.provinceCode=this.arrayMarket[e.detail.value].id},changeDay:function(e){console.log("e=================",e[0].date);for(var t=[],a=[],n=0;n<e.length;n++){var o=e[n].date.split("-"),i=o[1]+"/"+o[2];t.push(i),a.push(e[n].date)}this.executeDate=t,console.log("executeDate============",t),this.tureExecuteDate=a},changeMonth:function(e){console.log(e)},budGetDay:function(){var t=this,a={creditCardNumber:t.ylhk_card.cardNo,amount:t.amount,reservedAmount:t.reservedAmount,dayRepaymentCount:t.dayRepaymentCount};this.$api.api_budGetDay(a).then((function(a){console.log("api_budGetDay成功",a),0==a.code&&(t.last_days=a.data,e.setStorageSync("last_day",a.data))})).catch((function(t){console.log("api_budGetDay失败",t),e.showToast({title:"网络链接失败",icon:"none"})}))},orCard:function(){var t={cardNo:"6226020034804113"};this.$api.api_orCard(t).then((function(e){console.log("api_orCard成功",e)})).catch((function(t){console.log("api_orCard失败",t),e.showToast({title:"网络链接失败",icon:"none"})}))},gochangeplan:function(){e.navigateTo({url:"changeCard?id="+this.cardId})},goNewPlan:function(){e.navigateTo({url:"newPlan?type=goNewPlan"})},back:function(){e.navigateBack()},changeDayNumber:function(e){this.daynumber=this.numbers[e.target.value],console.log("选择每日还款次数",this.numbers[e.target.value]),this.dayRepaymentCount=1*e.target.value+1,console.log("选择每日还款次数",1*e.target.value+1),this.budGetDay()},handleGetRegion:function(e){console.log(e),this.area="".concat(e[0].name).concat(e[1].name)}}};t.default=r}).call(this,a("543d")["default"])},"729f":function(e,t,a){},adff:function(e,t,a){"use strict";a.r(t);var n=a("fed0"),o=a("1704");for(var i in o)"default"!==i&&function(e){a.d(t,e,(function(){return o[e]}))}(i);a("41d8");var r,d=a("f0c5"),c=Object(d["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],r);t["default"]=c.exports},fed0:function(e,t,a){"use strict";a.d(t,"b",(function(){return o})),a.d(t,"c",(function(){return i})),a.d(t,"a",(function(){return n}));var n={reserveDate:function(){return a.e("components/reserve-date/reserve-date").then(a.bind(null,"451f"))}},o=function(){var e=this,t=e.$createElement,a=(e._self._c,e.cardNo.substring(e.cardNo.length,e.cardNo.length-4));e._isMounted||(e.e0=function(t){e.selected1=!e.selected1},e.e1=function(t){e.selected1=!e.selected1},e.e2=function(t){e.selected2=!e.selected2},e.e3=function(t){e.selected2=!e.selected2},e.e4=function(t){e.pickerTime=!0}),e.$mp.data=Object.assign({},{$root:{g0:a}})},i=[]}},[["3f73","common/runtime","common/vendor"]]]);