
import Vue from 'vue'
import WCompress from '@/components/w-compress/w-compress.vue'
const request = (params) => {
	
	

	
	// 显示加载数据的提示
	uni.showLoading({
		title: '上传中...',
		mask: true
	})
	
	
	console.log("上传的地址",params.data.filePath)
	return new Promise(function(resolve, reject) {
		const baseUrl = Vue.prototype.$baseUrl;
		let token_value ;
		try {
			token_value = uni.getStorageSync('token');
			if (token_value) {
				token_value = 'Bearer' + token_value;
			}
		} catch (e) {
			// error
		}
		console.log("params.data.empowerToken=",params.data.empowerToken)
		uni.uploadFile({
			method: params.method,
			//data: params.data,
			url:baseUrl + params.url,
			filePath: params.data.filePath,
			formData:{
				empowerToken:params.data.empowerToken
			},
			name: 'file',
			// fileType:"image",
			header: {
				'token': uni.getStorageSync('token'),
				"platform":"h5"
			},
			success(res) {
					resolve(res)	
			},
			fail(err) {
				reject(err)
			},
			complete() {
					uni.hideLoading()
				
			}
		})
	})
}
export default request;