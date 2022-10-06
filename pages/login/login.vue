<template>
	<view class="container">
		<view class="head">
			<image src="../../static/images/login-bg.png" class="login-bg" mode="widthFix"></image>
			<image src="../../static/12.png" class="login-logo"></image>
		</view>
		<view class="login-part">
			<view class="tab-box">
				<h1 :class="type=='passwordLogin'?'active':''" @click="type = 'passwordLogin'">密码登录</h1>
				<h1 :class="type=='codeLogin'?'active':''" @click="type = 'codeLogin'">验证码登录</h1>
			</view>
			<view class="login-box">
				<view class="input-box">
					<image src="../../static/ico/shouji.png" mode="widthFix"></image>
					<input placeholder-class="pl" type="number" maxlength="11" v-model="phone" placeholder="请输入手机号" />
				</view>
				<view class="input-box password-box" v-if="type=='passwordLogin'">
					<image src="../../static/ico/password.png" mode="widthFix"></image>
					<input placeholder-class="pl" type="password" maxlength="20" v-model="password" placeholder="请输入密码" />
				</view>
				<view class="input-box code-box" v-else>
					<image src="../../static/ico/yanz.png" mode="widthFix"></image>
					<input placeholder-class="pl" type="number" maxlength="6" v-model="validateCode" placeholder="请输入验证码" />
					<view class="code">
						<b :class="preventClickCode?'prevent':''" @click="getCode">{{codeDesc}}</b>
					</view>
				</view>
			</view>
			
			
			<h5 v-if="type=='passwordLogin'"  @click="gogaimima">设置/忘记密码</h5>

			<view class="btn" @click="login">
				登录
			</view>
			<view class="register" @click="register">
				注册
			</view>

		</view>



		<view class="tips">
			登录/注册即表示您同意米兔 <text>《用户协议》</text>
		</view>

	</view>
</template>

<script>
	import md5Libs from "../../utils/MD5.js"
	export default {
		data() {
			return {
				type: 'passwordLogin',
				// phone: "19937200933",
				// password: "123456",
				phone: "",
				password: "",
				validateCode: '',
				codeDesc: "发送验证码",
				preventClickCode: false
				
			};
		},

		methods: {
			gogaimima(){
				uni.navigateTo({
					url:"modifiesLogin"
				})
			},
			register(){
			   uni.navigateTo({
			   	url:'register'
			   })	
			},
			
			 login(){
				 let t = this
				if(t.phone.length!=11){
					uni.showToast({
						title:"请输入手机号",
						icon:"none"
					})
					return
				}
				if(t.type=="passwordLogin"&&t.password.length<6){
					uni.showToast({
						title:"密码格式有误",
						icon:"none"
					})
					return
				}
				if(t.type=="codeLogin"&&t.validateCode.length!=6){
					uni.showToast({
						title:"验证码错误",
						icon:"none"
					})
					return
				}
				this.senlogin()
			},
			
			async senlogin(){
				let t = this
				let p = "HengchUang33@"
				let password = t.password +p
				var sign = md5Libs.md5(password).toUpperCase()
				let body = {
	
				}
				console.log("t.type=",t.type)
				if(t.type=="passwordLogin"){
					body={
						brandId: 12,
						username: t.phone,
						password: sign,
					}
					
					await this.$api.api_loginpasswordLogin(body).then(res=>{
						  console.log("api_login成功",res)
							if(res.code==0){
								uni.setStorageSync("token",res.data.token)
								uni.setStorageSync("users",res.data)||[]
								uni.switchTab({
									url:"/pages/index/index"
								})
							}else{
								uni.showToast({
									title:res.message,
									icon:"none"
								})
							}
						}).catch(err=>{
							console.log("api_login失败",err)
						
						})
					
				}else{
					console.log("t.vericode,=",t.vericode,)
					body={
						brandId: 12,
						username: t.phone,
						vericode: t.validateCode,
					}
					await this.$api.api_login(body).then(res=>{
						  console.log("api_login成功",res)
							if(res.code==0){
								uni.setStorageSync("token",res.data.token)
								uni.setStorageSync("users",res.data)||[]
								uni.switchTab({
									url:"/pages/index/index"
								})
							}else{
								uni.showToast({
									title:res.message,
									icon:"none"
								})
							}
						}).catch(err=>{
							console.log("api_login失败",err)
						
						})
				}


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
				uni.showLoading({
					title:"发送中...",
					mask:true
				})
				let body = {
					brandId:12,
					phone:t.phone,
					type:0
				}
				this.$api.api_sendCode(body).then(res=>{
					uni.hideLoading()
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
					uni.hideLoading()
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
	.container {
		.head{
			position: relative;
			.login-bg {
				width: 100%;
			}
			.login-logo{
				position: absolute;
				width: 249upx;
				height: 249upx;
				top: 80upx;
				left: 50%;
				margin-left: -124.5upx;
				z-index: 1;
			}
		}
		
	}

	.tab-box {
		font-size: 36upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #999999;
		display: flex;
		align-items: center;
		font-weight: bolder;

		h1 {
			margin-right: 20upx;
			padding: 10upx 0;
		}

		.active {
			color: #46c7a9;
			border-bottom: 5upx solid #46c7a9;
		}
	}

	.login-part {
		width: 600upx;
		margin: 76upx auto;

		.input-box {
			height: 75upx;
			align-items: center;
			background: #FFFFFF;
			box-shadow: 0px 8upx 12upx 1upx rgba(61, 46, 35, 0.1);
			border-radius: 10upx;
			display: flex;
			margin-top: 50upx;

			image {
				width: 25upx;
				margin: 0 22upx;
			}

			input {
				font-size: 26upx;
			}
		}

	}

	.pl {
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: normal;
		color: #999999;

	}

	.code {
		b {
			margin-left: auto;
			width: 220upx;
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

	h5 {
		margin: 24upx 0 39upx 0;
		font-size: 24upx;
		display: flex;
		justify-content: flex-end;
		font-family: PingFang SC;
		color: #46c7a9;
	}

	.code-box {
		margin-bottom: 90upx;
	}

	.btn {
		height: 73upx;
		// background: linear-gradient(90deg, #F7CF9E 0%, #D79C64 100%);
		background-color: #46c7a9;
		border-radius: 10upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 34upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: white;
	}

	.register {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 30upx;
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #46c7a9;
		line-height: 24upx;
	}
	.tips{
		display: flex;
		align-items: center;
	
		// position: absolute;
		width: 100%;
		justify-content: center;
		bottom: 66upx;
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #666666;
		text{
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #46c7a9;
		}
	}
</style>
