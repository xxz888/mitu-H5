<template>
	<view class="container">
		<view class="header">
			<image src="https://daihuan.oss-cn-beijing.aliyuncs.com/shiming/roleCheck-bg%402x.png" class="bg-title"></image>
			<view class="header-title-common">
				<p @click="back" />
				<b>{{choose}}支付宝</b>
			</view>
		</view>
<!-- 		<h1>
			修改信用卡基本信息
		</h1> -->
		<view class="form-box">
			<block v-if="choose=='添加'">
				<h2>
					<p>姓名</p>
					<input type="text" disabled v-model="fullname" placeholder="请输入姓名" />
				</h2>
				<h2>
					<p>支付宝账号</p>
					<input type="text" v-model="payId" placeholder="请输入支付宝账号" />
				</h2>
			</block>
			<block v-else>
				<h2>
					<p>姓名</p>
					<input type="text" v-model="fullname" disabled="" placeholder="请输入姓名" />
				</h2>
				<h2>
					<p>支付宝账号</p>
					<input type="text" v-model="newAccount" :placeholder="oldAccount" />
				</h2>
			</block>

		</view>
<!-- 		<h4>
			<b>注：</b>
			<p>
				请确保您的账单日和还款日设置正确,否则设置还款计
				划时将会出现没有日期选择的情况
				
			</p>
			
		</h4> -->
		
		<view class="btn" v-if="choose=='添加'" @click="getAlipayAdd">
			确定{{choose}}
		</view>
		<view v-else class="btn" @click="changeAlipay">
			确定{{choose}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				choose:"添加",
				payId:"",
				fullname:"",
				oldAccount:"",
				newAccount:"",
			};
		},
		onLoad(e) {
			console.log("type===========",e.type)
			if(e.type == 1){
				this.choose ="修改"
				this.getAlipayLst()
			}else{
				this.choose ="添加"
				this.api_getUser()
			}
		},

		methods: {
			// 获取个人信息
			api_getUser(){
				let t = this
				let body = {
					id:uni.getStorageSync("users").id
				}
				this.$meapi.api_getUser(body).then(res=>{
					console.log("api_getUser成功",res)
					if(res.code==0){
						if(res.data.fullname==undefined){
							uni.showToast({
								title:"未实名",
								icon:"none"
							})
						}
							t.fullname = res.data.fullname
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
				
				}).catch(err=>{
					console.log("api_changeAlipay失败",err)
				
				})
			},
			//修改支付宝 非jsonapi/user/alipay/change
			changeAlipay(){
				
				let t = this
				if(t.newAccount.length<5){
					uni.showToast({
						title:"请输入新支付宝账号",
						icon:"none"
					})
					return
				}
				let body = {
					oldAccount:t.oldAccount,//	支付宝账号
					newAccount:t.newAccount	,//用户姓名
				}
				this.$meapi.api_changeAlipay(body).then(res=>{
					console.log("api_changeAlipay成功",res)
					if(res.code==0){
						uni.navigateBack({
							
						})
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
				
				}).catch(err=>{
					console.log("api_changeAlipay失败",err)
			
				})
			},
			//添加用户支付宝api/user/alipay/add
			getAlipayAdd(){
				let t = this
				if(t.payId==""||t.fullname==""){
					uni.showToast({
						title:"请完善信息",
						icon:"none"
					})
					return
				}
				
				let body = {
					fullname:t.fullname,	//用户姓名
					payId:t.payId//	支付宝账号
				
				}
				this.$meapi.api_getAlipayAdd(body).then(res=>{
					console.log("api_txMoney成功",res)
					if(res.code==0){
						uni.navigateBack({
							
						})
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
				
				}).catch(err=>{
					console.log("api_txMoney失败",err)
				
				})
			},
			back() {
				uni.navigateBack()
			},
			//查询支付宝列表	api/user/alipay/list
			getAlipayLst(){
				let t = this
				let body = {}
				this.$meapi.api_getAlipayLst(body).then(res=>{
					console.log("支付宝列表获取成功",res.data)
					
					if(res.code==0){
					
								
								t.fullname = res.data[0].fullname
								t.oldAccount = res.data[0].payId
							
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
				
				}).catch(err=>{
					console.log("api_txMoney失败",err)
		
				})
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
			// #ifdef H5
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
		// box-shadow: 0px 8upx 22upx 2upx rgba(67, 67, 67, 0.2);
		// border-radius: 20upx;
		width: 700upx;
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
			// color: #666666;

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
