<template>
	<view class="container">
		<!-- <image src="https://daihuan.oss-cn-beijing.aliyuncs.com/loginImg/login-bg.png" class="login-bg" mode="widthFix"></image> -->
		<view class="head">
			<image src="../../static/images/login-bg.png" class="login-bg" mode="widthFix"></image>
			<image src="../../static/images/logo.png" class="login-logo"></image>
		</view>
		<view class="login-part">
			<view class="tab-box">
				<h1>注册账号</h1>
			</view>
			<view class="login-box">
				<view class="input-box">
					<image src="../../static/ico/shouji.png" mode="widthFix"></image>
					<input placeholder-class="pl" type="number" maxlength="11" v-model="phone" placeholder="请输入手机号" />
				</view>
				<view class="input-box password-box" mode="widthFix">
					<image src="../../static/ico/password.png" mode="widthFix"></image>
					<input placeholder-class="pl" type="password" maxlength="11" v-model="password" placeholder="请输入密码" />
				</view>
				<view class="input-box">
					<image src="../../static/ico/yanz.png" mode="widthFix"></image>
					<input placeholder-class="pl" type="number" maxlength="11" v-model="validateCode"
						placeholder="请输入验证码" />
					<view class="code">
						<b :class="preventClickCode?'prevent':''" @click="getCode">{{codeDesc}}</b>
					</view>
				</view>
				<view class="input-box last" mode="widthFix">
					<image src="../../static/ico/yaoq.png" mode="widthFix"></image>
					<input placeholder-class="pl" type="number" maxlength="11" v-model="prePhone" placeholder="请输入邀请人电话" />
				</view>
			</view>

			<view class="btn" @click="sendRegister">
				注册
			</view>
			<view class="register" @click="gologin">
				登录
			</view>

		</view>



		<view class="tips">
			登录/注册即表示您同意米兔 <text>《用户协议》</text>
		</view>

	</view>
</template>

<script>
	// 19937200933  邀请注册手机
	import md5Libs from "../../utils/MD5.js"
	export default {
		data() {
			return {
				type: 'passwordLogin',
				phone: "",
				password: "",
				validateCode: '',
				codeDesc: "发送验证码",
				preventClickCode: false,
				prePhone:""

			};
		},
		methods: {
			
			sendRegister(){
				let t = this
				if(t.phone.length!=11||t.password.length<6||t.validateCode.length!=6){
					uni.showToast({
						title:"请完善信息",
						icon:"none"
					})
					return
				}
				let p = "HengchUang33@"
				let password = t.password +p
				var sign = md5Libs.md5(password).toUpperCase()
				let body = {
					brandId: 12, // 品牌id，固定为1
					username: t.phone, // 手机号
					password: sign,// 密码
					smsCode: t.validateCode, // 验证码
					prePhone: t.prePhone, // 推荐人手机号	
				}
				
				this.$api.api_register(body).then(res=>{
					console.log("api_register成功",res)
					if(res.code==0){
						uni.reLaunch({
							url:"login"
						})
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
				}).catch(err=>{
					console.log("api_register失败",err)
				
				})
			},
			
			async getCode() {
				if (this.phone.length < 11) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return false
				}
				this.sendcode()
			},
			gologin(){
				uni.navigateTo({
					url:"./login"
				})
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
							title: '验证码已经发送'
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
		color: #46c7a9;
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
		margin: 66upx auto;

		.input-box {
			height: 75upx;
			align-items: center;
			background: #FFFFFF;
			box-shadow: 0px 8upx 12upx 1upx rgba(61, 46, 35, 0.1);
			border-radius: 10upx;
			display: flex;
			margin-top: 40upx;

			image {
				width: 25upx;
				margin: 0 22upx;
			}

			input {
				font-size: 26upx;
				flex: 1;
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

	h5 {
		margin: 24upx 0 39upx 0;
		font-size: 24upx;
		display: flex;
		justify-content: flex-end;
		font-family: PingFang SC;
		color: #46c7a9;
	}

	.code-box {}

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

	.tips {
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

		text {
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #46c7a9;
		}
	}

	.last {
		margin-bottom: 60upx;
		image{
			width: 30upx !important;
		}
	}
</style>
