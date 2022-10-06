<template>
	<view class="container">
		<view class="header">
			<image src="https://daihuan.oss-cn-beijing.aliyuncs.com/shiming/roleCheck-bg%402x.png" class="bg-title"></image>
			<view class="header-title-common">
				<p @click="back" />
				<b>签约确认</b>
			</view>
		</view>
		<h1>
			信息加密处理，仅用于银行验证，请验证你本人的银行卡
		</h1>
		
		<view class="form-box">
			<h2>
				<p>持卡人</p>
				<p>{{fullname}}</p>
				<!-- <input type="number" v-model="cardNo" placeholder="请输入银行卡号" /> -->
			</h2>
			<h2>
				<p>卡号</p>
				<p>{{ylhk_card.cardNo}}</p>
				<!-- <input type="number" v-model="cardNo" placeholder="请输入银行卡号" /> -->
			</h2>
<!-- 			<h2>
				<p>有效期</p>
				<input type="number"     placeholder="请输入预留号码" />
			</h2> -->
			
		
			<h2>
				<p>安全码</p>
				<input type="number" :value="ylhk_card.securityCode"  placeholder="请输入安全码" />
			</h2>
		
		<h2 >
			<p>验证码</p>
			<input type="number" v-model="smsCode" maxlength="6" style="text-align: center;" placeholder="请输入验证码" />
			<view class="code">
				<b :class="preventClickCode?'prevent':''" @click="getCode">{{codeDesc}}</b>
			</view>
		</h2>
			
		</view>

		
		<view class="btn" @click="bindCardConfirm">
			确定签约
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				fullname:"",
				
				a:"123456",
				codes:"",
				bankname:"",
				cardNo:"",
				phone:"",
				billDay:"",
				repaymentDay:"",
				bankIcon:"",
				securityCode:"",
				expiredTime:"",
				id:"",
				codeDesc:"获取验证码",
				preventClickCode:false,
				idCard:"",
				card:"",
				smsCode:"",
				ylhk_card:[],
				sendnumber:""
			};
		},
		onShow() {
			this.api_getUser()
			this.ylhk_card = uni.getStorageSync("ylhk_card")
			console.log("ylhk_card ===",uni.getStorageSync("ylhk_card"))
		},
		methods: {
			api_getUser(){
				let t = this
				console.log("xxxxxxxxxxxxxxxxxxxxx",uni.getStorageSync("users").id)
				let body = {
					id:uni.getStorageSync("users").id
				}
				this.$meapi.api_getUser(body).then(res=>{
					console.log("api_getUser==============成功",res.data	)
					if(res.code==0){
					
								t.fullname = res.data.fullname	
								t.idCard = res.data.idcard
						}
		
				}).catch(err=>{
					console.log("api_changeAlipay失败",err)
			
				})
			},
			getCode(){
				let t = this
				let body = {
					cardNo: t.ylhk_card.cardNo
				}
				if(t.preventClickCode){
					return
				}
				console.log("点击了发送验证码")
				t.preventClickCode = true
				this.$api.api_orbindCard(body).then(res=>{
					console.log("点击了发送验证码",res)
					if(res.code==0&&res.message=="重复签约"){
							
							t.startNewPlan()
					}else
					if(res.code==0&&res.messages!="重复签约"){
						t.sendnumber= res.data
						console.log(" res.data===================", res.data)
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
							title:res.message,
							icon:"none"
						})
					}
					t.preventClickCode = false
				}).catch(err=>{
					t.preventClickCode = false
					console.log("api_sendCode失败",err)
						uni.showToast({
							title:"发送失败",
							icon:"none"
						})
				})
			
			},
			// 余额还款-启动计划 获取验证码
			startNewPlan(){
				let t = this
				uni.showLoading({
					title:"启动中...",
					mask:true
				})
				let body = {
					cardNo: t.ylhk_card.cardNo,			
				}
				this.$api.api_startNewPlan(body).then(res=>{
					uni.hideLoading()
					console.log("api_startNewPlan成功",res)
					if(res.code==0){
						uni.showToast({
							title:"启动成功"
						})
						let timer = setTimeout( () => {
						   uni.reLaunch({
						   	url:"/pages/money/repayment"
						   })
						}, 500)
			
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
					uni.hideLoading()
				}).catch(err=>{
					console.log("api_startNewPlan失败",err)
				
					uni.hideLoading()
				})
			},
			//余额还款确认绑卡 发送验证码 非json/api/credit/bind/card/confirm
			bindCardConfirm(){
				let t = this
				let body = {
					idCard:t.idCard,// 	身份证ylhk_card.cardNo
					cardNo:t.ylhk_card.cardNo,//	No	卡号
					smsCode:t.smsCode,//		短信码	
					bindId:t.sendnumber,
					// bindId:"7e87d241b2a1e86cc3711deda90972a7"
				}
				this.$api.api_bindCardConfirm(body).then(res=>{
					console.log("余额还款确认绑卡成功",res)
					if(res.code==0){
						t.startNewPlan()
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
			
				}).catch(err=>{
					console.log("余额还款确认绑卡失败",err)
				
				})
			},

			
			// 修改信息
			modifiesxyCard(){
				let t = this
				let body = {
					id:t.id,
					cardNo:t.cardNo,//		银行卡号
					phone:t.phone,//		手机号
					expiredTime:t.expiredTime,//	过期时间
					securityCode:t.securityCode,//	安全码
					billDay:t.billDay,//		账单日期
					repaymentDay:t.repaymentDay,//	还款日期
							
				}
				this.$api.api_modifiesxyCard(body).then(res=>{
					console.log("api_getBalancePlanList成功",res)
					if(res.code == 0){
						let card = t.uni.getStorageSync("xyCard")
						card.cardNo = t.cardNo,//		银行卡号
						card.phone = t.phone,//		手机号
						card.expiredTime = t.expiredTime,//	过期时间
						card.securityCode = t.securityCode,//	安全码
						card.billDay = t.billDay,//		账单日期
						card.repaymentDay = t.repaymentDay,//	还款日期
						uni.setStorageSync("xyCard",card)
						uni.navigateBack({
							
						})
					}
				}).catch(err=>{
					console.log("api_getBalancePlanList失败",err)
				
				})
			},
			
			back() {
				uni.navigateBack()
			},
			

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
		padding-top: calc(var(--status-bar-height) + 30upx);
		height: 207upx;
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
				color: #F7CF9E;
			}

			p:first-child {
				transform: rotate(45deg);
				border-bottom: 5upx solid #D4C09D;
				border-left: 5upx solid #D4C09D;
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
		height: 70upx;
		background: linear-gradient(269deg, #D79F65 0%, #FDD8AA 100%);
		display: flex;
		padding-left: 30upx;
		align-items: center;
	}

	.form-box {
		background: #FFFFFF;
		box-shadow: 0px 8upx 22upx 2upx rgba(67, 67, 67, 0.2);
		border-radius: 20upx;
		width: 690upx;
		margin: 60upx auto;
		padding: 0 30upx;

		h2 {
			display: flex;
			align-items: center;
			justify-content: space-between;

			input {
				text-align: right;
				font-size: 24upx;
			}

			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #666666;

			p:last-child {
				color: #888;
				font-size: 24upx;
			}

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
			color: #DF8E40;
		}

		.prevent {
			pointer-events: none;
			color: #999 !important;
		}
	}

	.btn {
		height: 86upx;
		width: 660upx;
		margin: 100upx auto;
		background: linear-gradient(269deg, #D79F65 0%, #FDD8AA 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
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
	h4{
		display: flex;
		justify-content: center;
		padding:0 40upx;
		b{
			font-size: 29upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #FF9426;
		}
		p{
			font-size: 20upx;
			font-family: PingFang SC;
			color: #888;
		}
		line-height: 36upx;
	}
</style>
