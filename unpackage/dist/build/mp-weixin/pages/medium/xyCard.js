(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/medium/xyCard"],{"26ce":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={name:"cmd-circle",props:{cid:{type:String,default:"defaultCanvas"},type:{type:String,validator:function(t){return["circle","dashboard"].includes(t)},default:"circle"},percent:{type:Number,validator:function(t){return t>=0&&t<=100},default:0},showInfo:{type:Boolean,default:!0},fontColor:{type:String,default:"#595959"},fontSize:{type:Number,default:14},status:{type:String,validator:function(t){return["normal","success","exception"].includes(t)},default:"normal"},strokeWidth:{type:Number,default:6},strokeColor:{type:String,default:""},strokeBackground:{type:String,default:"#eeeeee"},strokeShape:{type:String,validator:function(t){return["round","square"].includes(t)},default:"round"},width:{type:Number,default:80},gapDegree:{type:Number,validator:function(t){return t>=0&&t<=360},default:360},gapPosition:{type:String,validator:function(t){return["top","bottom","left","right"].includes(t)},default:"top"}},data:function(){return{ctx:{},width2px:""}},computed:{calCircleStyle:function(){return"width: ".concat(this.width,"px;\n\t\t\t\theight: ").concat(this.width,"px;")},calStatus:function(){var t={};switch(this.status){case"normal":t={color:"#1890ff",value:1};break;case"success":t={color:"#52c41a",value:2};break;case"exception":t={color:"#f5222d",value:3};break}return t},calGapDegree:function(){return this.gapDegree<=0?360:this.gapDegree},calGapPosition:function(){var t=0;switch(this.gapPosition){case"bottom":t=90;break;case"left":t=180;break;case"top":t=270;break;case"right":t=360;break}return t}},watch:{percent:function(t){this.drawStroke(t)}},mounted:function(){var e=this;this.ctx=t.createCanvasContext(this.cid,this),this.width2px=t.upx2px(this.width),this.$nextTick((function(){e.drawStroke(e.percent)}))},methods:{drawStroke:function(t){t=t>=100?100:t<0?0:t;var e=this.strokeColor||this.calStatus.color;if(this.showInfo)switch(this.calStatus.value){case 1:t>=100?(this.drawSuccess(),t=100,e="#52c41a"):this.drawText(t);break;case 2:this.drawSuccess(),t=100,e="#52c41a";break;case 3:this.drawException(),t=0,e="#f5222d";break;default:break}var i=this.calGapPosition,n=this.calGapDegree;"dashboard"===this.type&&(i=135,n=270),this.ctx.setLineCap(this.strokeShape),this.ctx.setLineWidth(this.strokeWidth),this.ctx.translate(this.width2px,this.width2px),this.ctx.rotate(i*Math.PI/180),this.ctx.beginPath(),this.ctx.arc(0,0,this.width2px-this.strokeWidth,0,n*Math.PI/180),this.ctx.setStrokeStyle(this.strokeBackground),this.ctx.stroke(),this.ctx.beginPath(),this.ctx.arc(0,0,this.width2px-this.strokeWidth,0,t*n*Math.PI/18e3),this.ctx.setStrokeStyle(e),this.ctx.stroke(),this.ctx.draw()},drawText:function(t){this.ctx.beginPath(),this.ctx.setFontSize(this.fontSize),this.ctx.setFillStyle(this.fontColor),this.ctx.setTextAlign("center"),this.ctx.fillText("".concat(t,"%"),this.width2px,this.width2px+this.fontSize/2),this.ctx.stroke()},drawSuccess:function(){var t=this.width2px-this.fontSize/2,e=this.width2px+this.fontSize/2;this.ctx.beginPath(),this.ctx.setLineCap("round"),this.ctx.setLineWidth(this.fontSize/4),this.ctx.moveTo(this.width2px,e),this.ctx.lineTo(e,t),this.ctx.moveTo(this.width2px,e),this.ctx.lineTo(t,this.width2px),this.ctx.setStrokeStyle("#52c41a"),this.ctx.stroke()},drawException:function(){var t=this.width2px-this.fontSize/2,e=this.width2px+this.fontSize/2;this.ctx.beginPath(),this.ctx.setLineCap("round"),this.ctx.setLineWidth(this.fontSize/4),this.ctx.moveTo(t,t),this.ctx.lineTo(e,e),this.ctx.moveTo(e,t),this.ctx.lineTo(t,e),this.ctx.setStrokeStyle("#f5222d"),this.ctx.stroke()}}};e.default=i}).call(this,i("543d")["default"])},"2a4f":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;n(i("423d"));function n(t){return t&&t.__esModule?t:{default:t}}function a(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var o={data:function(){return a({heads:[],b:"",creditcardList:[],name:"name",id:"",myToken:""},"name","")},onLoad:function(t){this.getMediumToken(t.id),this.name=t.name,this.id=t.id},onShow:function(){""!=this.id&&this.getMediumToken(this.id)},methods:{getMediumToken:function(e){console.log("进入token");var i=this,n={userId:e};this.$medapi.api_getMyToken(n).then((function(t){console.log("获取中介token==========成功",t),0==t.code&&(i.myToken=t.data,getApp().globalData.xjToken=t.data,i.getBalancePlanList())})).catch((function(e){console.log("获取中介失败",e),t.showToast({title:"网络链接失败",icon:"none"})}))},getBalancePlanList:function(){var e=this,i={empowerToken:e.myToken};this.$api.api_getBalancePlanList1(i).then((function(t){if(console.log("查看所有信用还款计划状态成功",t),0==t.code){t.data;e.creditcardList=t.data}})).catch((function(e){console.log("api_getBalancePlanList失败",e),t.showToast({title:"网络链接失败",icon:"none"})}))},goHistory:function(e,i){t.setStorageSync("ylhk_card",this.creditcardList[i]),console.log("去历史账单",e);var n=this;t.navigateTo({url:"historyList?cardNo="+e+"&userId="+n.id})},plan:function(e,i){t.setStorageSync("ylhk_card",this.creditcardList[i]),t.navigateTo({url:"havePlan?id="+e})},showplan:function(e,i,n,a){t.setStorageSync("ylhk_card",this.creditcardList[a]),t.navigateTo({url:"showNewPlan?planId="+n+"&type=showplan&cardId="+i})},deleteXyCard:function(e){var i=this,n={id:e};t.showModal({title:"温馨提示",content:"是否确认删除信用卡",success:function(e){e.confirm&&i.$api.api_deletexyCard(n).then((function(e){console.log("api_deletexyCard成功",e),0==e.code?(t.showToast({title:"删除成功"}),i.getBalancePlanList()):t.showToast({title:e.message,icon:"none"})})).catch((function(e){console.log("api_deletexyCard失败",e),t.showToast({title:"网络链接失败",icon:"none"})}))}})},change:function(t){this.type=t},add:function(){var e=this;t.navigateTo({url:"addXyCard?name="+e.name})},showuser:function(){t.navigateTo({url:"usershow?id="+this.id})},back:function(){t.navigateBack()}}};e.default=o}).call(this,i("543d")["default"])},"2c4d":function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var a=function(){var t=this,e=t.$createElement;t._self._c},o=[]},"423d":function(t,e,i){"use strict";i.r(e);var n=i("2c4d"),a=i("da9a");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("785b");var c,s=i("f0c5"),r=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],c);e["default"]=r.exports},"4d7b":function(t,e,i){"use strict";var n=i("5be6"),a=i.n(n);a.a},"5be6":function(t,e,i){},"785b":function(t,e,i){"use strict";var n=i("97bd"),a=i.n(n);a.a},"7b9a":function(t,e,i){"use strict";i.r(e);var n=i("d386"),a=i("e570");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("4d7b");var c,s=i("f0c5"),r=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],c);e["default"]=r.exports},"97bd":function(t,e,i){},cf13:function(t,e,i){"use strict";(function(t){i("3335");n(i("66fd"));var e=n(i("7b9a"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},d386:function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var a=function(){var t=this,e=t.$createElement,i=(t._self._c,t.name.substring(0,1)),n=t.name.substring(t.name.length-1,t.name.length),a=t.__map(t.creditcardList,(function(e,i){var n=t.__get_orig(e),a=e.cardNo.substring(e.cardNo.length,e.cardNo.length-4);return{$orig:n,g2:a}}));t.$mp.data=Object.assign({},{$root:{g0:i,g1:n,l0:a}})},o=[]},da9a:function(t,e,i){"use strict";i.r(e);var n=i("26ce"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},e570:function(t,e,i){"use strict";i.r(e);var n=i("2a4f"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a}},[["cf13","common/runtime","common/vendor"]]]);