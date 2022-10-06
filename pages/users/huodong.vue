<template>
	<view class="container">
		<view class="header">
			<image src="https://daihuan.oss-cn-beijing.aliyuncs.com/shiming/roleCheck-bg%402x.png" class="bg-title"></image>
			<view class="header-title-common">
				<p @click="back" />
				<b>活动中心</b>
			</view>
		</view>
		<image class="lbt" src="../../static/images/huodong/huodong.png"></image>
		
		<view class="foot">
			 <p class="p1">-------- 直推抵扣 --------</p>
			 <h6>
				 <view style="width: 690upx;height: 30upx;"></view>
				 <view >
					 <a>累计交易量-</a>
					 <a>--------</a>
					 <a>{{centre.totalAmount}}万</a>
				</view>
				<view>
					 <a>转化人数-</a>
					 <a>--------</a>
					 <a>{{centre.personCount}}</a>
				</view>
	
				<view v-if="centre.vipLevel==3">
						<a style="width: 600upx;">您当前已是最高钻石vip等级</a>	
				</view>
				<view v-else>
					 <a>钻石V{{centre.vipLevel+1}}</a>
					 <a>--------</a>
					 <a>差{{centre.howUpdate}}万</a>
				</view>
				<h3 class="shuom">
					<p>注：普通用户还款30万自动晋升LV1，</p>
					<p>LV1升级LV2，本账号下每产生20万交易量等同于直推钻石用户一名，</p>
					<p>LV2升级LV3，本账号下每产生20万交易量等同于直推钻石用户一名。</p>
				</h3>

						
			 </h6>
			 
			
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				centre:[]
			};
		},
		onShow() {
			this.getcentre()
		},
		methods: {
			// 
			back(){
				uni.navigateBack({
					
				})
			},
			
			// 获取数据api/user/get/centre
			getcentre(index){
				let t = this,body
				 body = {
				}
				this.$meapi.api_getCentre(body).then(res=>{
					console.log("获取我的团队成功",res)
					if(res.code==0){
						// t.fullname = res.data.fullname
						t.centre = res.data
					}
				
				}).catch(err=>{
					console.log("api_changeAlipay失败",err)
				
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

	.foot{
		width: 690upx;
		height: 690upx;
		// background-color: red;
		// background-image: url('http://app.maidiyun.com/images/dtjq/dtjw_bg1.png');
		
		// background: linear-gradient(270deg, , rgba(255, 96, 96, 1));
		 background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#0B111D), color-stop(100%,#575C66))  ;
		margin-left: 29upx;
		margin-top: 29upx;
		border-radius: 20upx;
		.p1{
			display: flex;
			justify-content: center;
			font-size: 36upx;
			color: #FFFFFF;
			padding-top: 50upx;
			// color: #3F536E;
		}
		h6{
			width: 600upx;
			height: 497upx;
			background-color: #FFFFFF;
			margin-left: 44upx;
			margin-top: 50upx;
			border-radius: 20upx;
			
			view{
				
				width: 90%;
				height: 80upx;
				display: flex;
				margin-left: 5%;
				
				a{
					width: 200upx;
					padding-left: 40upx;
					padding-top: 30upx;
					font-size: 24upx;
					color: #FF8100;
					border-bottom: 1upx solid #C0C0C0;
				}
				
			}
			.shuom{
				width: 95%;
				// background-color: red;
				margin-top: 28upx;
				font-size: 26upx;
				color: #FF0000;
				padding-left: 20upx;
			}
		}
	}

	.header {
		width: 100%;
		position: relative;
		padding: 30upx;
		padding-top: calc(var(--status-bar-height) + 30upx);
		min-height: 100upx;
		height: 204upx;
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

			p {
				transform: rotate(45deg);
				border-bottom: 5upx solid #D4C09D;
				border-left: 5upx solid #D4C09D;
				width: 20upx;
				height: 20upx;
				position: absolute;
				left: 0;
			}
		}
	}
	
	.lbt{
		width: 690upx;
		margin-top: 42upx;
		margin-left: 29upx;
		height: 247upx;
		border-radius: 20upx;
	}
	
	.main-box {
		padding: 30upx;

		.search-content {
			display: flex;
			align-items: center;
			margin-bottom: 20upx;

			.search-box {
				height: 60upx;
				flex: 1;
				background: #FFFFFF;
				box-shadow: 0px 4upx 6upx 0upx rgba(28, 28, 28, 0.2);
				border-radius: 10upx;
				display: flex;
				align-items: center;

				image {
					width: 27upx;
					margin: 0 20upx;
				}

				input {
					font-size: 24upx;
					flex: 1;
				}

				p {
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FF9426;
					padding-right: 30upx;
				}
			}

			.select-box {
				padding: 0 40upx;
				margin-left: 20upx;
				height: 60upx;
				background: #FFFFFF;
				box-shadow: 0px 4upx 6upx 0upx rgba(28, 28, 28, 0.2);
				border-radius: 10upx;
				display: flex;
				align-items: center;
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;

				image {
					width: 27upx;
					margin-left: 10upx;
				}
			}
		}

		ul {

			li {
				background: #FFFFFF;
				box-shadow: 0px 4upx 6upx 0px rgba(28, 28, 28, 0.3);
				border-radius: 10upx;
				margin-bottom: 20upx;
				padding: 30upx 10upx;

				.data-box {
					display: flex;
					background: #F9F9F9;
					border-radius: 10px;
					flex-wrap: wrap;
					padding: 0 20upx 20upx 20upx;
					margin-top: 20upx;

					p {
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
						margin-top: 20upx;
						width: 50%;

						text {
							font-size: 24upx;
							color: #FF9426;
						}
					}

				}

				.user-box {
					display: flex;
					align-items: center;

					image {
						width: 80upx;
						height: 80upx;
						border-radius: 50%;
						margin-right: 20upx;
					}

					.right-box {
						flex: 1;
						height: 80upx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;

						image {
							width: 40upx;
							margin-right: 0upx;
							margin-left: 10upx;
						}

						h1 {
							display: flex;
							justify-content: space-between;

							p {
								display: flex;
								align-items: center;
								text{
									background: #EEEEEE;
									border-radius: 10upx;
									display: flex;
									font-size: 24upx;
									padding: 0 20upx;
									margin-left: 10upx;
								}
							}

							a {
								font-size: 20upx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #666666;
							}
						}
					}

				}
			}
		}

	}
	
	.empty{
		position: absolute;
		z-index: -1;
		width: 100%;
		height: 100vh;
		// display: flex;
		padding-top: 600upx;
		margin-left: 275upx;
		top: 0;
		left: 0;
		align-items: center;
		justify-content: center;
		image{
			width: 200upx;
		}
		.tits{
			width: 200upx;
			color: #C0C0C0;
			display: flex;
			justify-content: center;
		}
	}
</style>
