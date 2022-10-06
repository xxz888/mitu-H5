<template>
	<view class="step2-container">
		<h1>拿起手机，拍摄正面人脸照片</h1>
		<view class="video-box">
			<image :src="img" mode=""></image>
		</view>
		<h2>确认{{fullname}}本人操作</h2>
		<h2>保持正脸在取景框中根据屏幕指示完成</h2>
		<view class="tips-box">
			<view class="img-box">
				<h3>
					<image src="../static/images/sj@2x.png" class="sj" mode="widthFix"></image>
				</h3>
				<p>正对手机</p>
			</view>
			<view class="img-box">
				<h3>
					<image src="../static/images/gxcz@2x.png" mode="widthFix"></image>
				</h3>
				<p>光线充足</p>
			</view>
			<view class="img-box">
				<h3>
					<image src="../static/images/lwzd@2x.png" mode="widthFix"></image>
				</h3>
				<p>脸无遮挡</p>
			</view>

		</view>
		<view class="btn" @click="onSinngle">
			立即拍摄
		</view>
		 <w-compress ref='wCompress' />
	</view>
</template>

<script>
	import WCompress from '@/components/w-compress/w-compress.vue'
	export default{
		components: {
		    WCompress
		},
		data(){
			return{
				fullname:uni.getStorageSync("users").fullname,
				img:"/static/images/rl@2x.png"
			}
		},

		methods:{

			
		
			next(){
				
				this.$emit('update:step',3)
			},
			onSinngle() {
				// this.chooseimgs = index
			    uni.chooseImage({
			        count: 1,
					sourceType: ['camera'],
			        success: res => {
			           
			            this.$refs.wCompress.start(res.tempFilePaths[0], {
			    pixels: 100000,  // 最大分辨率，默认二百万
			    quality: 0.5,     // 压缩质量，默认0.8
			    type: 'png',      // 图片类型，默认jpg
			    base64: false,     // 是否返回base64，默认false，非H5有效
			  })
			                .then(res => {
			                    // console.log(res)
			                    this.single = res
								this.savePicture(res)
			                   
			                })
			                .catch(e => {
			                    console.log(e)
			                   
			                })
			        }
			    })
			},
			
				// 1构建为base64图片字符串
				 savePicture(base64) {
					var arr = base64.split(',');
					var bytes = atob(arr[1]);
					let ab = new ArrayBuffer(bytes.length);
					let ia = new Uint8Array(ab);
					for (let i = 0; i < bytes.length; i++) {
						ia[i] = bytes.charCodeAt(i);
					}
					var blob = new Blob([ab], { type: 'application/octet-stream' });
					var url = URL.createObjectURL(blob);
					console.log("url===",url)
					let t = this
						t.img = url
						let body ={
							filePath:url
						}
						
						t.$api.api_brandIdfan(body).then(res=>{
							console.log("api_ocrUploadA",JSON.parse(res.data))
							let a = JSON.parse(res.data)
							if(a.code == 0){
								t.next()
							}else{
								uni.showToast({
									title:"人脸识别失败",
									icon:"none"
								})
							}
								
						}).catch(err=>{
						
						})
				
				},
				
				// 添加身份信息/api/user/ocr/idcard/update
				// api_AddUser(){
				// 	console.log("添加用户信息")
				// 	let t = this
				// 	let body = {	
				// 		fullname:uni.getStorageSync("cardName"),//		姓名
				// 		idcard:uni.getStorageSync("addIdCard")//		身份证号
				// 	}
				// 	this.$api.api_addname(body).then(res=>{
				// 		console.log("api_getUser成功",res)
				// 		if(res.code==0){
				// 			t.next()
				// 		}else{
				// 			uni.showToast({
				// 				title:"实名失败",
				// 				icon:"none"
				// 			})
				// 		}
					
				// 	}).catch(err=>{
				// 		console.log("api_changeAlipay失败",err)
				// 		uni.showToast({
				// 			title:"",
				// 			icon:"none"
				// 		})
				// 	})
				// },

			
		}
	}
</script>

<style lang="scss">
	.step2-container {
		padding-top: 50upx;
		display: flex;
		flex-direction: column;
		align-items: center;

		h1 {
			padding-bottom: 36upx;
			font-size: 29upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
		}

		.video-box {
			width: 360upx;
			height: 360upx;
			margin: 30upx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		h2{
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #9E9E9E;
			margin-bottom: 16upx;
		}
		.tips-box{
			display: flex;
			justify-content: space-between;
			width: 400upx;
			margin-top: 40upx;
			margin-bottom: 100upx;
			.img-box{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				h3{
					width: 81upx;
					height: 81upx;
					background-color: #e3fff7;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 50%;
				}
				image{
					width: 45upx;
					height: 45upx;
				}
				.sj{
					width: 30upx;
				}
				p{
					margin-top: 10upx;
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: normal;
					color: #535353;
				}
			}
		}
		
	}






	.btn {
		height: 91upx;
		width: 666upx;
		display: flex;
		align-items: center;
		justify-content: center;
		// background: linear-gradient(269deg, #D79F65 0%, #FDD8AA 100%);
		background-color: #46c7a9;
		border-radius: 16upx;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: white;
	}
</style>
