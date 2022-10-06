<template>
	<view class="container">
		<view class="header">
			<!-- <image src="https://daihuan.oss-cn-beijing.aliyuncs.com/shiming/roleCheck-bg%402x.png" class="bg-title"></image> -->
			<view class="header-title-common">
				<p @click="back" />
				<b>修改信用卡</b>
			</view>
		</view>
		<h1>修改信用卡基本信息</h1>
		<view class="form-1">
<!-- 			<h2>
				<p>持卡人</p>
				<input type="text"   :placeholder="fullname" disabled />
			</h2> -->
			<h2>
				<p>银行卡号</p>
				<input type="number" disabled :placeholder="cardNo.substring(0,5)+'******'+cardNo.substring(cardNo.length,cardNo.length-4)" />
	<!-- 			<view class="photo-box" @click="openCamera">
					<image src="../../static/images/pho.png" mode=""></image>
					拍照识别
				</view> -->
			</h2>
			<h2>
				<p>预留号码</p>
				<input type="number"   :placeholder="phone.substring(0,3)+'****'+phone.substring(7,11)" disabled/>
			</h2>
	<!-- 	</view> -->
		<!-- <view class="form-1"> -->
			<h2>
				<p>有效期</p>
				<input type="number" v-model="expiredTime" maxlength="4"  placeholder="请输入有效期(如09/22输入0922)" />
			</h2>

			<h2>
				<p>安全码</p>
				<input type="number" v-model="securityCode" maxlength="3"   placeholder="请输入安全码" />
			</h2>
			<h2>
				<p>账单日</p>
				<input type="number" v-model="billDay" maxlength="2"  placeholder="请输入账单日" />
			</h2>
			<h2>
				<p>还款日</p>
				<input type="number" v-model="repaymentDay" maxlength="2"  placeholder="请输入还款日" />
			</h2>
		</view>
		<view class="tips">
			<p>注：</p>
			<p>1.同一张卡每天只能绑定五次，如有失败请第二天尝试 2.暂不支持借贷合—卡制定还款计划 </p>
		</view>
		<view class="btn" @click="modifiesbindCard">
			确定修改
		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				bankName:"",// 	银行卡名称
				fullname:"",//		姓名
				cardNo:"",//		银行卡号
				phone:"",//		预留手机号
				expiredTime:"",//	有效期
				securityCode:"",//	安全码
				billDay:"",//		账单日
				repaymentDay:"",// 还款日
				id:""
			};
		},
		onShow() {
		//	this.getbindCard()
		},
		onLoad(e) {
			this.id = e.id
			console.log("e.id================================",e.id)
			//this.api_getUser()
			this.getcard(e.id)
		},
		methods: {
			//获取个人资料
				api_getUser(){
					let t = this
					let body = {
						id:uni.getStorageSync("users").id
					}
					this.$meapi.api_getUser(body).then(res=>{
						console.log("首页获取个人信息成功成功",res.data.fullname)
						if(res.code==0){
							t.fullname = res.data.fullname
						}
					
					}).catch(err=>{
						console.log("api_changeAlipay失败",err)
					
					})
				},
			// 预修改储蓄卡
		getcard(id){
			let body ={
				id:id,
				
				empowerToken:getApp().globalData.xjToken
			},t=this
			this.$api.api_xyCard1(body).then(res=>{
				console.log("api_xyCard成功============================",res)
				if(res.code==0){
						t.fullname = res.data.fullname,
						t.cardNo = res.data.cardNo,
						t.phone = res.data.phone,
						t.expiredTime= res.data.expiredTime,//	有效期
						t.securityCode= res.data.securityCode,//	安全码
						t.billDay= res.data.billDay,//		账单日
						t.repaymentDay= res.data.repaymentDay// 还款日
				}
			}).catch(err=>{
				console.log("api_xyCard失败",err)
			
			})
		},


			// 修改信用卡
			modifiesbindCard(){
				let t = this
				let body = {
					id:t.id,
					cardNo:t.cardNo,//		银行卡号
					phone:t.phone,//		预留手机号
					expiredTime:t.expiredTime,//	有效期
					securityCode:t.securityCode,//	安全码
					billDay:t.billDay,//		账单日
					repaymentDay:t.repaymentDay,// 还款日
					empowerToken:getApp().globalData.xjToken
				}
				this.$api.api_modifiesxyCard(body).then(res=>{
					console.log("api_modifiesxyCard成功",res)
					if(res.code==0){
						uni.showToast({
							title:"修改成功"
						})
						let timer = setTimeout( () => {
							uni.navigateBack({
								
							})
						}, 1000)
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
				}).catch(err=>{
					console.log("api_modifiesxyCard失败",err)
				
				})
			},
			// 拍摄银行卡
				openCamera(){
					let t = this
					console.log('上传图片'),
					uni.chooseImage({   //上传图片的内置方法
						count:1, //在h5浏览器限制不住
						success:res=>{
							// console.log(this)
							console.log("res.tempFilePaths[0]",res.tempFilePaths[0])
							this.camera=res.tempFilePaths[0]
							let body ={
								filePath:res.tempFilePaths[0]
							}
							t.$api.api_ocrUploadBankcard(body).then(res=>{
								console.log("api_ocrUploadA",res.data)
								let r = JSON.parse(res.data)
								if(r.code==0){
									t.cardNo = r.data.card_number
								}else{
									uni.showToast({
										title:"识别失败",
										icon:"none"
									})
								}
								
							}).catch(err=>{
							
							})
						}
					})
				},
			
			
			back(){
				
				uni.navigateBack({
					
				})
			}
		}
	}
</script>

<style lang="scss">
	.bg-title {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: -1;
	}

	.header {
		width: 100%;
		position: relative;
		padding: 30upx;
		height: 207upx;
		padding-top: calc(var(--status-bar-height) + 30upx);
		min-height: 100upx;
		background-color: #46c7a9;
		.header-title-common {
			display: flex;
			align-items: center;
			width: 100%;
			justify-content: center;
			position: relative;
			// #ifdef H5
			padding-top: 50upx;
			// #endif
			b {
				font-size: 48upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #fff;
			}

			p {
				transform: rotate(45deg);
				border-bottom: 5upx solid #fff;
				border-left: 5upx solid #fff;
				width: 20upx;
				height: 20upx;
				position: absolute;
				left: 0;
			}
		}
	}

	h1 {
		background: #e3fff7;
		display: flex;
		align-items: center;
		padding: 30upx 50upx;
		font-size: 22upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
	}

	.form-1 {
		width: 690upx;
		background: #FFFFFF;
		box-shadow: 0px 8upx 22upx 2upx rgba(67, 67, 67, 0.13);
		border-radius: 20upx;
		padding: 0 16upx;
		margin: 0 auto;
		margin-top: 30upx;

		h2 {
			display: flex;
			align-items: center;
			border-bottom: 1upx solid #e1e1e1;
			padding: 20upx 0;
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;

			input {
				flex: 1;
				font-size: 20upx;
			}

			p {
				width: 170upx;
			}

			.photo-box {
				display: flex;
				align-items: center;
				flex-direction: column;
				font-size: 18upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;

				image {
					width: 43upx;
					height: 34upx;
					margin-bottom: 10upx;
				}
			}
		}


	}

	.tips {
		display: flex;
		padding: 60upx;

		p:first-child {
			width: 40upx;
			font-size: 22upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #46c7a9;
		}

		p:last-child {
			font-size: 22upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999999;
		}
	}

	.btn {
		height: 86upx;
		width: 660upx;
		margin: 0 auto;
		// background: linear-gradient(269deg, #D79F65 0%, #FDD8AA 100%);
		background-color: #46c7a9;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #fff;
		border-radius: 20upx;
	}
	
	
	.showBox {
	    display: flex;
	    width: 100%;
	    height: 100%;
	    justify-content: center;
	    align-items: center;
	    background: rgba(0,0,0,0.5);
	    position: fixed;
	    top: 0;
	    left: 0;
	    z-index: 20;
	}
	
	.showBox .inner {
	    display: flex;
	    width: 80%;
	    flex-direction: column;
	    background: #fff;
	    border-radius: 20rpx;
	    overflow: hidden;
	}
	
	.showBox .inner {
	    display: flex;
	    width: 80%;
	    flex-direction: column;
	    background: #fff;
	    border-radius: 20rpx;
	    overflow: hidden;
	}
	
	.showBox .center {
	    display: flex;
	    width: 60%;
	    flex-direction: column;
	    background: #fff;
	    border-radius: 20rpx;
	    overflow: hidden;
	}
	
	.showBox .center .showBoxContent {
	    display: flex;
	    width: 100%;
	    flex-direction: column;
	}
	
	.showBox .center .showBoxContent .bookmark {
	    width: 100%;
	}
	
	.showBox .center .btnLine {
	    display: flex;
	    width: 100%;
	    border-top: 1px solid #eee;
	}
	
	.showBox .center .btnLine button {
	    display: flex;
	    width: 100%;
	    height: 80rpx;
	    justify-content: center;
	    align-items: center;
	    color: #4390EA;
	    font-size: 28rpx;
	}
	
	
	
	
	
	
	
	
	.showBox {
	    display: flex;
	    width: 100%;
	    height: 100%;
	    justify-content: center;
	    align-items: center;
	    background: rgba(0,0,0,0.5);
	    position: fixed;
	    top: 0;
	    left: 0;
	    z-index: 20;
	}
	
	.showBox .inner {
	    display: flex;
	    width: 80%;
	    flex-direction: column;
	    background: #fff;
	    border-radius: 20rpx;
	    overflow: hidden;
	}
	
	.showBox .inner {
	    display: flex;
	    width: 80%;
	    flex-direction: column;
	    background: #fff;
	    border-radius: 20rpx;
	    overflow: hidden;
	}
	
	.showBox .center {
	    display: flex;
	    width: 60%;
	    flex-direction: column;
	    background: #fff;
	    border-radius: 20rpx;
	    overflow: hidden;
	}
	
	.showBox .center .showBoxContent {
	    display: flex;
	    width: 100%;
	    flex-direction: column;
	}
	
	.showBox .center .showBoxContent .bookmark {
	    width: 100%;
	}
	
	.showBox .center .btnLine {
	    display: flex;
	    width: 100%;
	    border-top: 1px solid #eee;
	}
	
	.showBox .center .btnLine button {
	    display: flex;
	    width: 100%;
	    height: 80rpx;
	    justify-content: center;
	    align-items: center;
	    color: #4390EA;
	    font-size: 28rpx;
	}
</style>
