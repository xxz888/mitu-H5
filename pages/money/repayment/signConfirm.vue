<template>
	<view class="container">
		<view class="header">
			<image src="/static/images/sy-bg@2x.png" class="bg-title"></image>
			<view class="header-title-common">
				<p @click="back" />
				<b>签约确认</b>
			</view>
		</view>
		<h1>
			信息加密处理，仅用于银行卡验证，请验证您本人的银行卡
		</h1>
		<view class="form-box">
			<h2>
				<p>持卡人</p>
				<p>张帅</p>
			</h2>
			<h2>
				<p>卡号</p>
				<input type="text" placeholder="请输入卡号" />
			</h2>
			<picker mode="date">
				<h2>
					<p>有效期</p>
					<p>请选择有效期</p>
				</h2>
			</picker>
			<h2>
				<p>安全码</p>
				<input type="text" placeholder="请输入安全码" />
			</h2>
			<pick-regions @getRegion="handleGetRegion">
				<h2>
					<p>选择省市</p>
					<p>{{area}}</p>
				</h2>
			</pick-regions>
			<h2>
				<p>验证码</p>
				<input type="text" style="text-align: center;" placeholder="请输入验证码" />
				<view class="code">
					<b :class="preventClickCode?'prevent':''" @click="getCode">{{codeDesc}}</b>
				</view>
			</h2>

		</view>
		<view class="btn" @click="modalShow = true">
			确认签约
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalShow: false,
				validateCode: '',
				codeDesc: "发送验证码",
				preventClickCode: false,
				area: "请选择地区"
			};
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			// 获取选择的地区
			handleGetRegion(area) {
				console.log(area)
				this.area =`${area[0].name}${area[1].name}`
			},
			async getCode() {

				this.preventClickCode = true

				let time = 60
				let timer = setInterval(() => {
					if (time > 0) {
						time--
						this.codeDesc = `${time}s`
					} else {
						this.codeDesc = `发送验证码`
						this.preventClickCode = false
						clearInterval(timer)
					}
				}, 1000)
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

		.header-title-common {
			display: flex;
			align-items: center;
			width: 100%;
			justify-content: center;
			position: relative;

			b {
				font-size: 35upx;
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
		height: 80upx;
		background: linear-gradient(269deg, #D79F65 0%, #FDD8AA 100%);
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
</style>
