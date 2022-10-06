<template>
	<view class="container">
		<view class="header">
			<image src="https://daihuan.oss-cn-beijing.aliyuncs.com/shiming/roleCheck-bg%402x.png" class="bg-title"></image>
			<view class="header-title-common">
				<p @click="back" />
				<b>修改信息</b>
			</view>
		</view>
		<h1>
			修改信用卡基本信息
		</h1>
		
		<view class="form-box">
			
			<h2>
				<p>银行卡号</p>
				<p>{{cardNo}}</p>
				<!-- <input type="number" v-model="cardNo" placeholder="请输入银行卡号" /> -->
			</h2>
			<h2>
				<p>预留号码</p>
				<input type="number" :value="phone"    placeholder="请输入预留号码" />
			</h2>
			
				<h2>
					<p>有效期</p>
					<!-- <p>请选择有效期</p> -->
					<input type="number" :value="expiredTime"  placeholder="请输入有效期" />
				</h2>
		
			<h2>
				<p>安全码</p>
				<input type="number" :value="securityCode"  placeholder="请输入安全码" />
			</h2>
		
				<h2>
					<p>账单日</p>
					<!-- <p>请选择账单日</p> -->
					<input type="number" :value="billDay"  placeholder="请输入账单日" />
				</h2>
			
			
				<h2>
					<p>还款日</p>
					<!-- <p>请选择还款日</p> -->
					<input type="number" :value="repaymentDay"  placeholder="请输入还款日" />
				</h2>
			
		</view>
		<h4>
			<b>注：</b>
			<p>
				请确保您的账单日和还款日设置正确,否则设置还款计
				划时将会出现没有日期选择的情况
				
			</p>
			
		</h4>
		
		<view class="btn" @click="modifiesxyCard">
			确定修改
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				a:"",
				bankname:"",
				cardNo:"",
				phone:"",
				billDay:"",
				repaymentDay:"",
				bankIcon:"",
				securityCode:"",
				expiredTime:"",
				id:""
			};
		},
		onShow() {
			let xyCard = uni.getStorageSync("xyCard")
			this.securityCode = xyCard.securityCode
			this.bankname= xyCard.bankName
			this.cardNo= xyCard.cardNo
			this.billDay= xyCard.billDay
			this.repaymentDay= xyCard.repaymentDay
			this.bankIcon= xyCard.bankIcon
			this.expiredTime = xyCard.expiredTime
			this.phone = xyCard.phone
			this.id = xyCard.id
		},
		methods: {
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
						let card = uni.getStorageSync("xyCard")
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
