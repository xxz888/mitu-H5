<template>
	<view class="container">
		<view class="header">
			<!-- <image src="https://daihuan.oss-cn-beijing.aliyuncs.com/shiming/roleCheck-bg%402x.png" class="bg-title"></image> -->
			<view class="header-title-common">
				<p @click="back" />
				<b>{{headTitle}}</b>
			</view>
		</view>
		<h1>
			{{title}}
		</h1>
		<view class="form-box">
			<h2>
				<p>手机</p>
				<input type="number" maxlength="11"  v-model="phone" placeholder="请输入手机" />
			</h2>
			<h2>
				<p>新密码</p>
				<input type="password" v-model="password1" placeholder="请输入密码" />
			</h2>

			<h2>
				<p>确认密码</p>
				<input type="password" v-model="password2" placeholder="请再次输入密码" />
			</h2>

			<h2>
				<p>验证码</p>
				<input type="number" maxlength="6" v-model="smsCord" placeholder="请输入验证码" />
				<view class="code">
					<b :class="preventClickCode?'prevent':''" @click="getCode">{{codeDesc}}</b>
				</view>
			</h2>

		</view>
		<view class="sm"><text></text>请勿设置与其他APP相似密码</view>
		<view class="btn" @click="updatePassword" >
			确认
		</view>
	</view>
</template>

<script>
	import md5Libs from "../../utils/MD5.js"
	export default {
		data() {
			return {
				title:"为确保您的资金安全，请验证身份重置密码",
				headTitle:"修改密码",
				phone:"",
				password1:"",
				password2:"",
				smsCord:"",
				modalShow: false,
				validateCode: '',
				codeDesc: "发送验证码",
				preventClickCode: false,
				area: "请选择地区"
			};
		},
		onShow() {
			this.api_getUser()
		},
		methods: {
			//获取个人资料
				api_getUser(){
					let t = this
					let body = {
						id:uni.getStorageSync("users").id
					}
					this.$meapi.api_getUser(body).then(res=>{
						console.log("api_getUser成功",res)
						if(res.code==0){
								if(res.data.fullname==undefined){
									t.fullname = "未实名"
								}else{
									t.fullname = res.data.fullname	
									t.selfLevel = res.data.selfLevel
									console.log("selfLevel===",res.data.selfLevel)
								}
								console.log("res.data.fullname",res.data.fullname)
								
								// t.id = res.data.id
								this.phone = res.data.username
								//this.phone = phone.substring(0,3)+"****"+phone.substring(7,11)
						}else if(res.code == 5){
							uni.showModal({
								title:"未登录",
								content:"立即去登录",
								success(res) {
									if(res.confirm){
										uni.reLaunch({
											url:"/pages/login/login"
										})
									}
								}
							})
						}
					
					}).catch(err=>{
						console.log("api_changeAlipay失败",err)
					
					})
				},
			// 重置登录密码api/user/update/pwd
			updatePassword(){
				if(this.password1!=this.password2||this.password1.length<6||this.password2.length<6){
					uni.showToast({
						title:"密码有误",
						icon:"none"
					})
					return
				}
				let t = this
				let p = "HengchUang33@"
				let password = t.password1 +p
				var sign = md5Libs.md5(password).toUpperCase()
				let body = {
					brandId:getApp().globalData.brandId,//品牌id
					username:t.phone,//	手机号
					password:sign,//	密码
					smsCode:t.smsCord,//		短信码	
				}
				this.$meapi.api_updatePassword(body).then(res=>{
					console.log("重置密码",res)
					if(res.code==0){
						uni.showToast({
							title:"修改成功"
						})
						let timer = setTimeout( () => {
							uni.navigateTo({
								url:"/pages/login/login"
							})
						}, 500)
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
				}).catch(err=>{
					console.log("api_sendCode失败",err)
						uni.showToast({
							title:"发送失败",
							icon:"none"
						})
				})
			},

			
			
			back() {
				uni.navigateBack()
			},
			// 获取选择的地区
			handleGetRegion(area) {
				console.log(area)
				this.area =`${area[0].name}${area[1].name}`
			},
			async getCode() {
				if (this.phone.length != 11) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return false
				}
				this.sendcode()
	
			},
			
			sendcode(){
				let t = this
				let body = {
					phone:t.phone,
					type:0
				}
				this.$api.api_sendCode(body).then(res=>{
					if(res.code==0){
						t.preventClickCode = true
						uni.showToast({
							title: '验证码已发送'
						})
						let time = 60
						let timer = setInterval(() => {
							if (time > 0) {
								time--
								t.codeDesc = `${time}s`
								
							} else {
								t.codeDesc = `发送验证码`
								t.preventClickCode = false
								clearInterval(timer)
							}
						}, 1000)
					}else{
						uni.showToast({
							title:"发送失败",
							icon:"none"
						})
					}
				}).catch(err=>{
					console.log("api_sendCode失败",err)
						uni.showToast({
							title:"发送失败",
							icon:"none"
						})
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
	.sm{
		display: flex;
		// background-color: red;
		font-size: 20upx;
		color: #999999;
		// margin-top: 10upx;
		width: 690upx;
		margin: 10upx auto;
		align-items: center;
		
		text{
			width: 20upx;
			background-color: #46c7a9;
			height: 20upx;
			margin-right: 10upx;
			border-radius: 10upx;
			margin-left: 10upx;
		}
	}
	.header {
		width: 100%;
		position: relative;
		padding: 30upx;
		padding-top: calc(var(--status-bar-height) + 30upx);
		height: 204upx;
		background-color: #46c7a9;
		.header-title-common {
			display: flex;
			align-items: center;
			width: 100%;
			justify-content: center;
			position: relative;
			//#ifdef H5
			margin-top: 50upx;
			//#endif
			b {
				font-size: 48upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: white;
			}

			p:first-child {
				transform: rotate(45deg);
				border-bottom: 5upx solid white;
				border-left: 5upx solid white;
				width: 20upx;
				height: 20upx;
				position: absolute;
				left: 0;
			}

			p:last-child {
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #F7CF9E;
				position: absolute;
				right: 0;
			}
		}
	}

	h1 {
		font-size: 23upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		height: 80upx;
		// background: linear-gradient(269deg, #D79F65 0%, #FDD8AA 100%);
		background-color: #e3fff7;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.form-box {
		background: #FFFFFF;
		box-shadow: 0px 8upx 22upx 2upx rgba(67, 67, 67, 0.2);
		border-radius: 20upx;
		width: 690upx;
		margin: 60upx auto;
		padding: 0 30upx;
		margin-bottom: 10upx;
		h2 {
			display: flex;
			align-items: center;
			// justify-content: space-between;
			input {
				// text-align: right;
				font-size: 24upx;
			}
			p{
				width: 150upx;
			}
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #666666;

			// p:last-child {
			// 	color: #888;
			// 	font-size: 24upx;
			// }

			padding: 30upx 0;
			border-bottom: 1upx solid #e1e1e1;
		}
	}

	.code {
		b {
			margin-left: auto;
			width: 180upx;
			line-height: 100%;
			display: flex;
			font-size: 24upx;
			align-items: center;
			justify-content: center;
			height: 100%;
			text-align: center;
			font-weight: normal;
			color: #46c7a9;
		}

		.prevent {
			pointer-events: none;
			color: #999 !important;
		}
	}

	.btn {
		height: 86upx;
		width: 660upx;
		margin: 80upx auto;
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


	.modal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(0, 0, 0, 0.5);
		z-index: 9;


		.modal-content {
			width: 690upx;
			border-radius: 20upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;
			overflow: hidden;
			padding: 40upx 0;

			.modal-text {
				position: relative;
				z-index: 19;
				display: flex;
				flex-direction: column;
				align-items: center;
			}

			.m-bg {
				position: absolute;
				z-index: 10;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}

			.card-icon {
				width: 110upx;
				margin-bottom: 10upx;
			}

			a {
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #F4CA99;
				display: flex;
				margin-bottom: 10upx;
			}

			p {
				font-size: 50upx;
				font-family: DIN;
				font-weight: bold;
				color: #F4CA99;
				display: flex;
				margin-bottom: 20upx;
			}

			b {
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 5upx 30upx;
				border-radius: 5upx;
				background: #F4CA99;
				font-size: 20upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #252527;
			}

		}
	}
</style>
