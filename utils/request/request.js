
import Vue from 'vue'
// 不需要登录的接口
// const noToken = [
// 	'api/user/pass/login/password',
// 	"api/user/pass/login/vericode",
// 	"api/user/pass/register"
// ];

const request = (params) => {
	// if (!(noToken.indexOf(params.url) >= 0)) {
	// 	if(res.data.code!=0){
	// 		uni.reLaunch({
	// 			url:"/pages/login/login"
	// 		})
	// 		return
	// 	}
	// 	uni.request({
	// 		url:baseUrl + "api/user/get/"+uni.getStorageSync("users").id,
	// 		success(res) {
	// 			if(res.data.code!=0){
	// 				uni.reLaunch({
	// 					url:"/pages/login/login"
	// 				})
	// 			}
	// 		}
	// 	})
	// }

	// 显示加载数据的提示
	// uni.showLoading({
	// 	title: 'loading...',
	// 	mask: true
	// })
	return new Promise(function(resolve, reject) {
		const baseUrl=  Vue.prototype.$baseUrl;
		
		let token_value = uni.getStorageSync('token')||[];
		
		console.log("params.data=",params.data)
		
		 uni.request({
			method: params.method,
			data: params.data,
			url:baseUrl + params.url,
			// url:"http://api.zhifu168.com/api/user/ocr/idcard/update",
			header: {
				'token' :  token_value,
				"platform":"h5"
				// "Access-Control-Allow-Origin":"*"
				// "Content-Type":''
			},
			success(res) {
					resolve(res.data)
			},
			fail(err) {
				reject(err)
				
			},
			complete() {
					// uni.hideLoading()
			}
		})
	})
}
export default request;