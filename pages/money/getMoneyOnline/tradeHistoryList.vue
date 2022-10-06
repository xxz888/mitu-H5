<template>
	<view class="container" >
		<view class="header">
			<!-- <image src="https://daihuan.oss-cn-beijing.aliyuncs.com/shiming/roleCheck-bg%402x.png" class="bg-title"></image> -->
			<view class="header-title-common">
				<p @click="back" />
				<b>交易记录</b>
			</view>
		</view>

		<ul>
			<li v-for="(item,index) in arraways" :key="index" @click="goDetail(item.id)">
				<image :src="'../../../static/images/banklogo/BANK_'+item.bankAcronym+'.png'" mode="widthFix"></image>
				<view class="right-box">
					<h1 style="margin-bottom: 10upx;">
						<p>{{item.bankName}}({{item.bankCard.substring(item.bankCard.length,item.bankCard.length-4)}})</p>
						<p>{{item.realAmount}}</p>
					</h1>
					<h1>
						<b>费率<text >{{item.rate*100}}%</text></b>
						
						<a v-if="item.orderStatus==0">交易中</a>
						<a v-if="item.orderStatus==1">已成功</a>
						<a v-if="item.orderStatus==2">已失败</a>
						
					</h1>
				</view>
			</li>
		</ul>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				arraways:[],
				pageSize:10,
			};
		},
		onShow() {
			this.getallMoneyList()
		},
		// 上拉加载
		onReachBottom() {
			var that = this
			console.log("上拉加载")
			if(this.arraways.length<this.pageSize){
					uni.showToast({
						title:"没有更多了",
						icon:"none"
					})
				return
			}
			
			this.pageSize = this.pageSize+10
			this.getallMoneyList()
		
		},
		methods: {
			
			// 获取交易记录刷卡订单列表
			getallMoneyList(){
				let t = this
				let body = {
					currentPage:1,//		当前页
					pageSize:t.pageSize,			//每页记录数
				}
				this.$api.api_quickOrderList(body).then(res=>{
					console.log("api_quickOrderList成功",res)
					if(res.code==0){
						t.arraways = res.data
						console.log("xxxxxxxxxxxxxxxxxxxxxxx",res.data[0].id)
					}
				}).catch(err=>{
					console.log("api_quickOrderList失败",err)
				
				})
			},
			back() {
				uni.navigateBack()
			},
			goDetail(id) {
				uni.navigateTo({
					url: 'tradeDetail?id='+id
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
		padding-top: calc(var(--status-bar-height) + 30upx);
		height: 207upx;
		background-color: #46c7a9;
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
				color: #fff;
			}

			p:first-child {
				transform: rotate(45deg);
				border-bottom: 5upx solid #fff;
				border-left: 5upx solid #fff;
				width: 20upx;
				height: 20upx;
				position: absolute;
				left: 0;
			}

			p:last-child {
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #fff;
				position: absolute;
				right: 0;
			}
		}
	}

	ul {
		padding: 30upx;

		li {
			display: flex;
			align-items: center;
			margin-bottom: 30upx;
			background: #FFFFFF;
			box-shadow: 0px 8upx 22upx 2upx rgba(67, 67, 67, 0.13);
			border-radius: 20upx;
			padding: 30upx 30upx 30upx 50upx;

			image {
				width: 55upx;
				margin-right: 30upx;
			}

			.right-box {
				flex: 1;

				h1 {
					display: flex;
					justify-content: space-between;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;

					b {
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
						font-size: 24upx;

						text {
							color: #46c7a9;
						}
					}

					a {
						font-size: 24upx;
						color: rgba(2, 167, 21, 1);
					}
				}
			}
		}
	}
</style>
