<template>
	<view class="container">
		<view class="header">
			<!-- <image src="https://daihuan.oss-cn-beijing.aliyuncs.com/shiming/roleCheck-bg%402x.png" class="bg-title"></image> -->
			<view class="header-title-common">
				<p @click="back" />
				<b>修改储蓄卡</b>
			</view>
		</view>
		<h1>修改储蓄卡基本信息</h1>
		<view class="form-1">
			<h2>
				<p>名字</p>
				<input type="text"  :placeholder="fullname" disabled />
			</h2>
			<h2>
				<p>身份证</p>
				<input type="number" :placeholder="idCard.substring(0,6)+'********'+idCard.substring(14,18)" disabled />
			</h2>
			<h2>
				<p>银行卡号</p>
				<input type="number" placeholder="请输入卡号" v-model="cardNo" />
			</h2>
			
			<h2>
				<p>手机号</p>
				<input type="number" v-model="phone"  placeholder="请输入信用卡银行预留手机号" />
			</h2>
		</view>
		<view class="form-1">
<!-- 			<h2>
				<p>有效期</p>
				<input type="number" v-model="expiredTime"   placeholder="请输入有效期(如09/22输入0922)" />
			</h2> -->

<!-- 			<h2>
				<p>安全码</p>
				<input type="number" v-model="securityCode"   placeholder="请输入安全码" />
			</h2>
			<h2>
				<p>账单日</p>
				<input type="number" v-model="billDay"   placeholder="请输入账单日" />
			</h2>
			<h2>
				<p>还款日</p>
				<input type="number" v-model="repaymentDay"   placeholder="请输入还款日" />
			</h2> -->
		</view>
		<view class="tips">
<!-- 			<p>注：</p>
			<p>1.同一张卡每天只能绑定五次，如有失败请第二天尝试 2.暂不支持借贷合—卡制定还款计划 </p>
		 -->
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
				id:"",
				fullname:"",//		用户姓名
				idCard:"",//		身份信息
				cardNo:"",//		 卡号
				phone:"",//		 手机号	
			};
		},
		onShow() {
		//	this.getbindCard()
		},
		onLoad(e) {
			this.id = e.id
			this.getcard(e.id)
		},
		methods: {
			// 预修改储蓄卡
			getcard(id){
				let body ={
					id:id
				},t=this
				this.$api.api_getcard(body).then(res=>{
					console.log("api_getcard成功",res)
					if(res.code==0){
						t.fullname = res.data.fullname
						t.cardNo = res.data.cardNo
						t.phone = res.data.phone
						t.idCard =res.data.idCard
					}
				}).catch(err=>{
					console.log("api_getcard失败",err)
				
				})
			},

			// 修改储蓄卡
			modifiesbindCard(){
				let t = this
				let body = {
					id:t.id,//		信息id
					cardNo:t.cardNo,// 卡号
					phone:t.phone,//手机号
				}
				this.$api.api_turegetcard(body).then(res=>{
					console.log("api_turegetcard成功",res)
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
							title:"修改失败",
							icon:"none"
						})
					}
				}).catch(err=>{
					console.log("api_turegetcard失败",err)
				
				})
			},
			// 拍摄银行卡
				photo(){
					let t = this
					console.log('上传图片'),
					uni.chooseImage({   //上传图片的内置方法
						count:1, //在h5浏览器限制不住
						success:res=>{
							// console.log(this)
							console.log("res.tempFilePaths[0]",res.tempFilePaths[0])
							let body ={
								filePath:res.tempFilePaths[0]
							}
							t.$api.api_ocrUploadBankcard(body).then(res=>{
								console.log("api_ocrUploadA",res.data)
								
								t.bankcard = "330106198912014010"
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
				color: white;
			}

			p {
				transform: rotate(45deg);
				border-bottom: 5upx solid white;
				border-left: 5upx solid white;
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
			color: #D79F65;
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
		color: white;
		border-radius: 20upx;
	}
</style>
