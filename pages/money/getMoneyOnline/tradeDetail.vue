<template>
	<view class="container">
		<view class="header">
			<!-- <image src="https://daihuan.oss-cn-beijing.aliyuncs.com/shiming/roleCheck-bg%402x.png" class="bg-title"></image> -->
			<view class="header-title-common">
				<p @click="back" />
				<b>交易记录</b>
			</view>
		</view>
		<view class="modal-content">
			<view class="modal-text">
				<image src="/static/images/payCard@2x.png" class="card-icon" mode="widthFix"></image>
				<a v-if="pays.orderStatus==0" style="color: yellow;">交易中</a>
				<a v-if="pays.orderStatus==1" style="color: #46c7a9;">已成功</a>
				<a v-if="pays.orderStatus==2" style="color: red;">已失败</a>
				<p>￥{{pays.amount}}</p>
			</view>
			<image src="../../../static/images/txxq.png" class="m-bg"></image>
		</view>
		<ul>
			<li>
				<h1>
					<p>信用卡</p>
					<image :src="'../../../static/images/banklogo/BANK_'+pays.bankAcronym+'.png'" mode="widthFix"></image>
					<p>{{pays.bankName}}({{pays.bankCard}})</p>
				</h1>
				<h1>
					<p>储蓄卡</p>
					<image :src="'../../../static/images/banklogo/BANK_'+pays.bankAcronym+'.png'" mode="widthFix"></image>
					<p>{{pays.debitBankName}}({{pays.debitBankCard}})</p>
				</h1>
			</li>
			<li>
				<h1>
					<p>交易通道</p>
					<a>极速收款</a>
				</h1>
				<h1>
					<p>交易时间</p>
					<a>{{pays.createTime}}</a>
				</h1>

			</li>
			<li>
				<h1>
					<p>手续费</p>
					<a>{{pays.charge}}元</a>
				</h1>
				<h1>
					<p>服务费</p>
					<a>{{pays.fee}}元</a>
				</h1>
				<h1>
					<p>合计</p>
					<a>{{pays.totalCost}}元</a>
				</h1>

			</li>
			<li>
				<h1>
					<p>到账金额</p>
					<a>{{pays.realAmount}}元</a>
				</h1>
				<h1>
					<p>订单号</p>
					<a>{{pays.orderCode}}</a>
				</h1>

			</li>

		</ul>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				pays:[]
			};
		},
		onLoad(e) {
			console.log("id",e.id)
			this.getpaylist(e.id)
			 // this.getpaylist(164)
		},
		methods: {
			//获取详细交易记录
			getpaylist(id){
				let t = this
				let body = {
					id:id
				}
				this.$api.api_quickOrder(body).then(res=>{
					console.log("api_quickOrder成功",res)
					if(res.code==0){
						t.pays = res.data
						console.log(res.data.orderCode)
					}
				}).catch(err=>{
					console.log("api_quickOrder失败",err)
			
				})
			},
			
			back(){
			 uni.navigateBack()	
			},
			goDetail() {
				uni.navigateTo({
					url: 'tradeDetail'
				})
			}
		}
	}
</script>

<style lang="scss">
	.bg-title {
		width: 100%;
		height: 300upx;
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
		background-color: #46c7a9;
		.header-title-common {
			display: flex;
			align-items: center;
			width: 100%;
			justify-content: center;
			position: relative;
			// #ifdef H5
			margin-top: 50upx;
			// #endif
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

	.modal-content {
		width: 690upx;
		margin: 30upx auto;
		border-radius: 20upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		overflow: hidden;
		padding: 20upx 0;
		border: 5upx solid #FFFFFF;
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
			color: #46c7a9;
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

	ul {
		padding: 20upx 50upx;

		li {
			border-bottom: 1upx solid #e1e1e1;
			padding: 20upx 0;

			h1 {
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				display: flex;
				align-items: center;
				padding: 10upx 0;
			}

			image {
				width: 30upx;
				height: 30upx;
				margin-left: auto;
				margin-right: 20upx;
			}

			a {
				margin-left: auto;
			}
		}
	}
</style>
