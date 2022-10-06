// import { POST } from "./request.js"
// let base = 'http://localhost:8888';
//微信登录
// module export const WXlogin = params => { return POST('POST',`${base}/tokens`,params).then(res => res.data); }; 
// //通过openid获取用户的信息
// module export const OpenidGetUser = (openId,params) => { return POST('GET',`${base}/User/openid/${openId}`,params).then(res => res.data); }; 

// module.exports = {
// 	hc : function(params){
// 		return POST('POST',`${base}/tokens`,params);
// 	}
// }


import request from "./request.js"
import uploadFile from "./uploadFile.js"
import Vue from 'vue'
export default {
	
	//添加实名api/user/ocr/idcard/update
	api_addmynames: function(params){
		return request({
			method: "POST",
			url: "api/user/idcard/update",
			data: params
		});
	},
	//获取使用帮助视频列表api/user/guide/title/list
	api_gettitles: function(params){
		return request({
			method: "POST",
			url: "api/user/guide/title/list?brandId="+params.brandId,
			data: params
		});
	},
	//获取操作视频api/user/guide/get/{id}
	api_gettitlesId: function(params){
		return request({
			method: "POST",
			url: "api/user/guide/get/"+params.id,
			data: params
		});
	},
	// 获取省
	api_getProvinces:function(params){
		return request({
			method: "POST",
			url: "api/payment/province/list",
			data: params
		});
	},
	//获取市aapi/payment/city/list
	api_getMarket:function(params){
		return request({
			method: "POST",
			url: "api/payment/city/list?parent="+params.parent,
			data: params
		});
	},
	// 注册
	
	api_register:function(params){
		return request({
			method: "POST",
			url: "api/user/pass/register",
			data: params
		});
	},
	
	// 发送验证码api_sendCode
	 api_sendCode:function(params){
		return request({
			method: "POST",
			url: "api/notice/pass/dm/sms/send",
			data: params
		});
	},
	
	// 密码登录和验证码登录
		api_login:  function(params){
		// let url = "api/user/pass/login/password"
		// console.log("api_login-arams",params)
		// if(params.type==="codeLogin"){
		// 	url = "api/user/pass/login/vericode"
		// }
		// console.log("url=",url)
		return  request({
			method: "POST",
			url: "api/user/pass/login/vericode",
			data: params
		});
	},
	api_loginpasswordLogin:function(params){
		return  request({
			method: "POST",
			url: "api/user/pass/login/password",
			data: params
		});
	},
	// 上传身份证正面
	api_ocrUploadA: function(params){
		return uploadFile({
			method: "POST",
			url: "api/user/ocr/front/upload",
			data: params
		});
	},
	
	// 上传身份证国徽面
	api_ocrUploadB: function(params){
		return uploadFile({
			method: "POST",
			url: "api/user/ocr/back/upload",
			data: params
		});
	},
	// 调取实名认证人脸识别认证api/user/face/upload

	api_brandIdfan:function(params){
		return uploadFile({
			method: "POST",
			url: "api/user/face/upload",
			data: params
		});
	},
	// 实名后添加身份证信息api/user/ocr/idcard/update
	// api_addname:function(params){
	// 	return request({
	// 		method: "POST",
	// 		url: "api/user/ocr/idcard/update",
	// 		data: params
	// 	});
	// },
	
	// 上传银行卡
	api_ocrUploadBankcard: function(params){
		return uploadFile({
			method: "POST",
			url: "api/user/ocr/bankcard",
			data: params
		});
	},
	

	// 绑定信用卡api/user/bind/crebit/card
	api_bindCard:function(params){
		return request({
			method: "POST",
			url: "api/user/bind/credit/card",
			data: params
		});
	},
	// 预修改信用卡api/user/credit/card/get
	api_xyCard:function(params){
		return request({
			method: "POST",
			url: "api/user/credit/card/get/"+params.id,
			data: params
		});
	},
	api_xyCard1:function(params){
		return request({
			method: "POST",
			url: "api/user/credit/card/get/"+params.id+"?empowerToken="+params.empowerToken,
			data: params
		});
	},
	// 修改信用卡api/user/credit /card/update
	api_modifiesxyCard:function(params){
		return request({
			method: "POST",
			url: "api/user/credit/card/update",
			data: params
		});
	},
	// 删除信用卡
	api_deletexyCard:function(params){
		return request({
			method: "POST",
			url: "api/user/credit/card/delete/"+params.id,
			data: params
		});
	},
	// // 获取信用卡lieb
	// api_creditCard:function(params){
	// 	return request({
	// 		method: "POST",
	// 		url: "api/user/credit/card/list",
	// 		data: params
	// 	});
	// },
	// 设置默认信用卡api/user/credit/card/change/def
	api_changexyCard:function(params){
		return request({
			method: "POST",
			url: "api/user/credit/card/change/def/"+params.id,
			data: params
		});
	},
	// 获取信用卡lieb
	api_creditCard:function(params){
		return request({
			method: "POST",
			url: "api/user/credit/card/list",
			data: params
		});
	},
	// 获取默认信用卡api/user/credit/card/def
	api_getMrXyCard:function(params){
		return request({
			method: "POST",
			url: "api/user/credit/card/def",
			data: params
		});
	},
	
	// 获取储蓄卡
	api_debitCard:function(params){
		return request({
			method: "POST",
			url: "api/user/debit/card/list",
			data: params
		});
	},
	// api/user/debit/list
	api_debitCard1:function(params){
		return request({
			method: "POST",
			url: "api/user/debit/list?empowerToken="+params.empowerToken,
			data: params
		});
	},
	
	// 绑定储蓄银行卡api/user/bind/debit/card
	api_bindBankcard:function(params){
		return request({
			method: "POST",
			url: "api/user/bind/debit/card",
			data: params
		});
	},
	// 删除储蓄卡api/user/debit/card/delete/{id}
	api_deletecxCard:function(params){
		return request({
			method: "POST",
			url: "api/user/debit/card/delete/"+params.id,
			data: params
		});
	},
	// 设置默认储蓄卡
	api_setDefaultCard:function(params){
		return request({
			method: "POST",
			url: "api/user/debit/card/change/def/"+params.id,
			data: params
		});
	},
	// 获取默认储蓄卡
	api_getMrCxCard:function(params){
		return request({
			method: "POST",
			url: "api/user/debit/card/def",
			data: params
		});
	},
	
	// 预修改储蓄卡getcard
	api_getcard:function(params){
		return request({
			method: "POST",
			url: "api/user/debit/card/get/"+params.id,
			data: params
		});
	},
	api_getcard1:function(params){
		return request({
			method: "POST",
			url: "api/user/debit/card/get/"+params.id+"?empowerToken="+params.empowerToken,
			data: params
		});
	},
	// 修改储蓄卡
	api_turegetcard:function(params){
		return request({
			method: "POST",
			url: "api/user/debit/card/update",
			data: params
		});
	},
	
	
	
	// 查看可刷卡通道
	api_showGetpassage:function(params){
		return request({
			method: "POST",
			url: "api/payment/quick/choose/channel",
			data: params
		});
	},
	
	// 查看通道银行限额api/payment/quick/channel/bank/list/{id}
	api_showBankQuota:function(params){
		return request({
			method: "POST",
			url: "api/payment/quick/channel/bank/list/"+params.id,
			data: params
		});
	},
	
	
	
	// 选择通道/api/payment/fast/verify/bindcard
	api_fastApplys:function(params){
		return request({
			method: "POST",
			url: "api/payment/fast/verify/bindcard",
			data: params
		});
	},
	//刷卡
	api_fastApply:function(params){
		return request({
			method: "POST",
			url: "api/payment/fast/apply",
			data: params
		});
	},
	// 确认刷卡
	api_tureApply:function(params){
		return request({
			method: "POST",
			url: "api/payment/fast/confirm",
			data: params
		});
	},
	// 刷卡订单列表api/payment/quick/order/lis
		api_quickOrderList:function(params){
		return request({
			method: "POST",
			url: "api/payment/quick/order/list",
			data: params
		});
	},
	// 刷卡订单详情/api/payment/quick/order/{id}
		api_quickOrder:function(params){
		return request({
			method: "POST",
			url: "api/payment/quick/order/"+params.id,
			data: params
		});
	},
	//---------------------------------------------------余额还款api----------------------------
	
	//余额还款 查看所有信用还款计划状态
	api_getBalancePlanList:function(params){
		return request({
			method: "POST",
			url: "api/credit/get/balance/plan/list",
			data: params
		});
	},
	api_getBalancePlanList1:function(params){
		return request({
			method: "POST",
			url: "api/credit/get/balance/plan/list?empowerToken="+params.empowerToken,
			data: params
		});
	},
	// 获取余额还款头顶
	api_getBalancePlanListfee:function(params){
		return request({
			method: "POST",
			url: "api/user/get/balance/fee",
			data: params
		});
	},
	
	
	// getHistoryList余额还款-历史记录
	api_getHistoryList:function(params){
		return request({
			method: "POST",
			url: "api/credit/get/all/plan?cardNo="+params.cardNo,
			data:params
		});
	},
	api_getHistoryList1:function(params){
		return request({
			method: "POST",
			url: "api/credit/get/all/plan?cardNo="+params.cardNo+"&empowerToken="+params.empowerToken,
			data:params
		});
	},
	//余额还款-历史记录-计划详情/api/credit/get/plan/has/item
	api_getPlanHhasItem:function(params){
		return request({
			method: "POST",
			url: "api/credit/get/plan/has/item?id="+params.id,
			data: params
		});
	},
	api_getPlanHhasItem1:function(params){
		return request({
			method: "POST",
			url: "api/credit/get/plan/has/item?id="+params.id+"&empowerToken="+params.empowerToken,
			data: params
		});
	},
	
	// 余额还款-制定计划
	api_planNewMake:function(params){
		return request({
			method: "POST",
			url: "api/credit/create/plan/new",
			data: params
		});
	},
	
	// startNewPlan启动计划 非jsonapi/credit/save/new/plan
	//api/credit/bind/card/confirm
	api_startNewPlan:function(params){
		return request({
			method: "POST",
			url: "api/credit/save/new/plan?cardNo="+params.cardNo,
			data: params
		});
	},
	api_startNewPlan1:function(params){
		return request({
			method: "POST",
			url: "api/credit/save/new/plan?cardNo="+params.cardNo+"&empowerToken="+params.empowerToken,
			data: params
		});
	},
	// 查询计划所需最少天数
	api_budGetDay:function(params){
		return request({
			method: "POST",
			url: "api/credit/budget/day",
			data: params
		});
	},
	// 检验是否绑卡	非json	启动计划前调用
	api_orCard:function(params){
		return request({
			method: "POST",
			url: "api/credit/verify/band/card?cardNo="+params.cardNo,
			data: params
		});
	},
	
	// 预绑卡	非json获取验证码时调用
	api_orbindCard:function(params){
		return request({
			method: "POST",
			url: "api/credit/bind/card?cardNo="+params.cardNo,
			data: params
		});
	},
	//余额还款确认绑卡 非json/api/credit/bind/card/confirmapi_bindCardConfirm
	api_bindCardConfirm:function(params){
		return request({
			method: "POST",
			url: "api/credit/bind/card/confirm?idCard ="+params.idCard +"&cardNo="+params.cardNo+"&smsCode="+params.smsCode+"&bindId="+params.bindId,
			data: params
		});
	},
	// channelId:t.id,orderCode:t.orderCode,
					
	api_showtureApply:function(params){
		return request({
			method: "POST",
			url: "api/payment/fast/query?channelId="+params.channelId+"&orderCode="+params.orderCode,
			data: params
		});
	},
	// 余额还款历史记录-终止计划api/credit/plan/stop
	api_planStop:function(params){
		return request({
			method: "POST",
			url: "api/credit/plan/stop?id="+params.id,
			data: params
		});
	},
	
	api_planStop1:function(params){
		return request({
			method: "POST",
			url: "api/credit/plan/stop?id="+params.id+"&empowerToken="+params.empowerToken,
			data: params
		});
	},
	
	//获取app版本
	api_getUpdateApp: function(params) {
		console.log("进入api_getUpdateApp")
		return request({
			method: "POST",
			url: "tokens",
			data: params
		});
	},
	///获取首页的功能列表
	api_getFunList:function(params) {
		return request({
			method:"POST",
			url:"api/app_fun/getFunList",
			data:params
		})
	},
	// 获取交易记录
	api_getallMoneyList:function(params){
		return request({
			method:"POST",
			url:"api/app_fun/getFunList",
			data:params
		})
	},
	
	 // 获取交易状态api/payment/fast/query
	 api_getalLfastQuery:function(params){
	 	return request({
	 		method:"POST",
	 		url:"api/payment/fast/query",
	 		data:params
	 	})
	 },
	 
	 // 调级列表
	 api_tiaojiList:function(params){
	 	return request({
	 		method:"POST",
	 		url:"api/user/change/direct/vip/level?subUserId="+params.id,
	 		data:params
	 	})
	 },
	 // 调级
	 api_confirmLevel:function(params){
	 	return request({
	 		method:"POST",
	 		url:"api/user/change/direct/vip/level/confirm?subUserId="+params.subUserId + '&vipLevel='+params.vipLevel,
	 		data:params
	 	})
	 },
	 // 客服
	 api_serviceUrl:function(params){
	 	return request({
	 		method:"POST",
	 		url:"api/user/app/config/service/url",
	 		data:params
	 	})
	 },
}