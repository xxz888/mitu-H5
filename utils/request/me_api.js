import request from "./request.js"
import uploadFile from "./uploadFile.js"
import Vue from 'vue'
export default {
	// 素材管理/api/user/material/get/list
	api_getmateriallist:function(params){
		return request({
			method: "POST",
			url: "api/user/material/get/list",
			data: params
		});
	},
	
	// 获取招商收益api/user/get/attract/profit/list
	api_getZsMoney:function(params){
		return request({
			method: "POST",
			url: "api/user/get/attract/profit/list",
			data: params
		});
	},
	// 招商收益详细按月查找 非json /api/user/get/attract/profit/time/list
	api_profitTime:function(params){
		return request({
			method: "POST",
			url: "api/user/get/attract/profit/time/list?year="+params.year+"&month="+params.month,
			data: params
		});
	},
	// 获取首页轮播图
	
	api_getbanner:function(params){
		return request({
			method: "POST",
			url: "api/user/advert/get?title="+params.title,
			
			data: params
		});
	},
	// 获取总收益
	api_getallMoney:function(params){
		return request({
			method: "POST",
			url: "api/user/get/account",
			data: params
		});
	},
	// 获取体现记录
	api_getTxMoney:function(params){
		return request({
			method: "POST",
			url: "api/user/turnover/get/withdraw",
			data: params
		});
	},
	// // 获取收益记录
	api_getaddMoney:function(params){
		return request({
			method: "POST",
			url: "api/user/turnover/get/profit",
			data: params
		});
	},
	
	// 提现api/payment/withdraw
	api_txMoney:function(params){
		return request({
			method: "POST",
			url: "api/payment/withdraw?amount="+params.amount+"&payId="+params.payId+"&type="+params.type,
			data: params
		});
	},
	// getAlipayLst查询支付宝列表	/api/user/alipay/list

	api_getAlipayLst:function(params){
		return request({
			method: "POST",
			url: "api/user/alipay/list",
			data: params
		});
	},
	
	//添加用户支付宝api/user/alipay/add   api/user/alipay/add
	api_getAlipayAdd:function(params){
		return request({
			method: "POST",
			url: "api/user/alipay/add",
			data: params
		});
	},
	//修改支付宝 非jsonapi/user/alipay/change changeAlipay
	api_changeAlipay:function(params){
		return request({
			method: "POST",
		//url: "api/user/alipay/change?oldAccount="+params.oldAccount+"&newAccount"+params.newAccount,
		url: "api/user/alipay/change?newAccount="+params.newAccount+"&oldAccount"+params.oldAccount,
			data: params
		});
	},
	// api_changeAlipay:function(params){
	// 	return request({
	// 		method: "POST",
	// 		url: "api/user/alipay/change",
	// 		data: params
	// 	});
	// },
	
	//个人中心/api/user/get/{id}
	api_getUser:function(params){
		return request({
			method: "POST",
			url: "api/user/get/"+params.id,
			data: params
		});
	},
	
	// -----------------------------------------------------------个人中心---------------------------------
	// 获取刷卡分润api/user/get/quick/profit/list
	api_profitList:function(params){
		return request({
			method: "POST",
			url: "api/user/get/quick/profit/list",
			data: params
		});
	},
	//获取下级还款分润api/user/get/balance/profit/list
	api_balanceProfitList:function(params){
		return request({
			method: "POST",
			url: "api/user/get/balance/profit/list",
			data: params
		});
	},
	
	//自用返现api/user/get/self/profit/list
	api_selfProfitList:function(params){
		return request({
			method: "POST",
			url: "api/user/get/self/profit/list",
			data: params
		});
	},
	//管理分润api/user/get/manage/profit/list
	api_managefitList:function(params){
		return request({
			method: "POST",
			url: "api/user/get/manage/profit/list",
			data: params
		});
	},
	
	//其他收益/api/user/get/other/profit/list
	api_otherProfitList:function(params){
		return request({
			method: "POST",
			url: "api/user/get/other/profit/list",
			data: params
		});
	},
	
	// --------------------------------信息修改-----------------------------
	//重置密码
	api_updatePassword:function(params){
		return request({
			method: "POST",
			url: "api/user/update/pwd",
			data: params
		});
	},
	//修改手机号api/user/update/username
	api_updatePhone:function(params){
		return request({
			method: "POST",
			url: "api/user/update/username",
			data: params
		});
	},
	//设置交易密码/api/user/change/pay/pwd
	api_updatePaypwd:function(params){
		return request({
			method: "POST",
			url: "api/user/change/pay/pwd",
			data: params
		});
	},
	//更改昵称  api/user/update/nick
	api_updatNick:function(params){
		return request({
			method: "POST",
			url: "api/user/update/nick?nick="+params.nick,
			data: params
		});
	},
	// ------------------------------------我的团队----------------------
	// 获取直推用户列表/api/user/get/direct/list
	api_getDirectList:function(params){
		return request({
			method: "POST",
			url: "api/user/get/direct/list",
			data: params
		});
	},
	
	// 获取间接推用户列表/api/user/get/indirect/list
	api_getIndirectList:function(params){
		return request({
			method: "POST",
			url: "api/user/get/indirect/list",
			data: params
		});
	},
	
	
	// -------------------------------------------激活码管理------------
	

	
	// 获取未使用的激活码/api/user/key/get/unused

	api_userKeyunused:function(params){
		return request({
			method: "POST",
			url: "api/user/key/get/unused",
			data: params
		});
	},
	
	
	// 获取已使用的激活码/api/user/key/used
	api_userKey:function(params){
		return request({
			method: "POST",
			url: "api/user/key/get/used",
			data: params
		});
	},
	
//	获取激活码购买记录/api/user/key/get
	
	api_userKeGget:function(params){
		return request({
			method: "POST",
			url: "api/user/key/get",
			data: params
		});
	},
	
	//获取激活码数量/api/user/key/get/count
	//获取激活码/api/user/key/get/count
	api_keyGetCount:function(params){
		return request({
			method: "POST",
			url: "api/user/key/get/count",
			data: params
		});
	},
	
	 // 活动中心获取数据api/user/get/centre
	 api_getCentre:function(params){
	 	return request({
	 		method: "POST",
	 		url: "api/user/get/centre",
	 		data: params
	 	});
	 },
	 
	 // 使用激活码/api/user/key/use   非jsonapi/user/key/use

	 api_vipuserKey:function(params){
	 	return request({
	 		method: "POST",
	 		url: "api/user/key/use?key="+params.key,
	 		data: params
	 	});
	 },
	 
	 // 获取二维码链接
	 api_brandId:function(params){
	 	return request({
	 		method: "POST",
	 		url: "api/user/app/config/get",
	 		data: params
	 	});
	 },
	 

}