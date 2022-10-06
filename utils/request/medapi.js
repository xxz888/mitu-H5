import request from "./request.js"
import uploadFile from "./uploadFileMedium.js"
import Vue from 'vue'
export default {
	
	// 获取中介还款用户api/credit/empower/list
	api_getMyUsers:function(params){
		return request({
			method: "POST",
			// url: "api/credit/empower/list",
			url: "api/credit/empower/list?page="+params.page+"&size="+params.size,
			data: params
		});
	},
	
	// 1.上级代注册接口api/user/pre/register
	api_addMyUsers:function(params){
		return request({
			method: "POST",
			 // url: "api/user/pre/register",
			url: "api/user/pre/register?phone="+params.phone,
			data: params
		});
	},
	//3.获取中介token
	api_getMyToken:function(params){
		return request({
			method: "POST",
			 // url: "api/user/pre/register",
			url: "api/user/empower/token?userId="+params.userId,
			data: params
		});
	},
	//4.4.删除中介下级api/user/empower/close
	api_closeEmpower:function(params){
		return request({
			method: "POST",
			 // url: "api/user/empower/close",
			url: "api/user/empower/close?userId="+params.userId,
			data: params
		});
	},
	//5.5.开户/关闭  中介授权api/user/empower/switch
	api_switchEmpower:function(params){
		return request({
			method: "POST",
			 // url: "api/user/empower/close",
			url: "api/user/empower/switch?status="+params.status,
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


}