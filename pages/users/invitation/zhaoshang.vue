<template>
	<view class="container">
		<view class="header">
			<!-- <image src="https://daihuan.oss-cn-beijing.aliyuncs.com/shoyi/sy-bg.png" class="bg-title"></image> -->
			<view class="header-title-common">
				<p @click="back" />
				<b>{{titleName}}</b>
			</view>
			
				<view class="z-all-money">招商总收益(元）</view>
				<view  class="z-all-m">{{(allzs.totalBalance).toFixed(2)}}</view>
			<view class="income-options" >
				<h4 >
					<p style="color:#fff;font-size: 32upx;">今日收益(元)</p>
					<p style="color:#fff;">{{(allzs.todayTotal).toFixed(2)}}</p>
				</h4>
				<h4>
					<p style="color:#fff;font-size: 32upx;">当月收益(元</p>
					<p style="color:#fff">{{(allzs.curMonthTotal).toFixed(2)}}</p>
				</h4>

			</view>
			
		</view>
		
		<view class="m-1" @click="gopeople">
			<view class="m-1-v1">
				<view>当日注册(人）：{{(allzs.todayRegisterCount)}}</view>
				<view class="gd"></view>
				<view>当日激活(人）：{{(allzs.todayActivationCount)}}</view>
			</view>
			<view class="m-1-v2">
				<view>当月注册(人）：{{(allzs.curMonthRegisterCount)}}</view>
				<view  class="gd"></view>
				<view>当月激活(人）：{{(allzs.curMonthActivationCount)}}</view>
			</view>
			<view class="m-1-v3"></view>
		</view>
		
		<view class="m-2">
			<view class="m-2-v1">
				<view>已注册<text>{{(allzs.firstCount)+(allzs.secondCount)}}人</text></view>
				<view class="gd"></view>
				<view>已实名<text>{{(allzs.firstRealnameCount)+(allzs.secondRealnameCount)}}人</text></view>
			</view>
			<view class="m-2-v1">
				<view>已激活<text>{{(allzs.firstActivationCount)+(allzs.secondActivationCount)}}人</text></view>
				<view  class="gd"></view>
				<view>未激活<text>{{(allzs.firstCount)+(allzs.secondCount)-((allzs.firstActivationCount)+(allzs.secondActivationCount))}}人</text></view>
			</view>
			<view class="m-2-v1">
				<view>直推激活<text>{{(allzs.firstActivationCount)}}人</text></view>
				<view  class="gd"></view>
				<view>间推激活<text>{{(allzs.secondActivationCount)}}人</text></view>
			</view>
		</view>
		
		<view class="m-3">
			<view class="m-3-v" style=" background:rgba(0,0,0,0.2);">
				<view class="m-3-v-v1">等级</view>
				<view class="m-3-v-v2">招商激活奖励</view>
			</view>
			<view class="m-3-v" >
				<view class="m-3-v-v1">钻石1</view>
				<view class="m-3-v-v2">30/元</view>
			</view>
			<view class="m-3-v" >
				<view class="m-3-v-v1">钻石2</view>
				<view class="m-3-v-v2">50/元</view>
			</view>
			<view class="m-3-v" >
				<view class="m-3-v-v1">钻石3</view>
				<view class="m-3-v-v2">60/元</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titleName:"招商收益",
				allzs:[]
			};
		},
		onLoad(e) {
			this.profitList()
		},		
		methods: {
			gopeople(){
				uni.navigateTo({
					url:"zs-classification"
				})
			},

			
			// 获取刷卡分润api/user/get/quick/profit/list
			profitList(){
				let t = this
				let body = {
				}
				this.$meapi.api_getZsMoney(body).then(res=>{
					console.log("api_profitList成功",res)
					if(res.code==0){
						t.allzs = res.data
					}
				}).catch(err=>{
					console.log("api_getZsMoney失败",err)
				
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
	.m-3{
		width: 689upx;
		height: 317upx;
		// background-color: red;
		margin-left: 30upx;
		margin-top: 20upx;
		background-image: url(../../../static/images/mine/z-b2.png);
		background-size: 100% 100%;/*图片显示大小*/
		background-repeat:no-repeat;/*是否重复多个*/
		background-position: center;/*图片位置*/	
		color: #46c7a9;
		font-size: 24upx;
		.m-3-v{
			width: 100%;
			height: 80upx;
			display: flex;
			justify-content: center;
			align-items: center;
			.m-3-v-v1{
				width: 100upx;
				
			}
			.m-3-v-v2{
				width: 170upx;
				margin-left: 300upx;
			}
			view{
				display: flex;
				justify-content: center;
			}
		}
	}
	.m-2{
		width: 690upx;
		height: 140upx;
		// background-color: red;
		margin-left: 30upx;
		margin-top: 10upx;
		border-radius: 20upx;
		display: flex;
		align-items: center;
		box-shadow: 0px 4upx 6upx 0upx rgba(28, 28, 28, 0.2);
		font-size: 24upx;
		.m-2-v1{
			width: 230upx;
			view{
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.gd{
				height: 20upx;
				width: 200upx;
			}
			text{
				color: #46c7a9;
			}
		}
	}
	.m-1{
		width: 690upx;
		height: 140upx;
		// background-color: red;
		margin-left: 30upx;
		margin-top: 10upx;
		border-radius: 20upx;
		background-image: url(../../../static/images/mine/z-b1.png);
	    background-size: 100% 100%;/*图片显示大小*/
	    background-repeat:no-repeat;/*是否重复多个*/
	    background-position: center;/*图片位置*/	
		display: flex;
						align-items: center;
		view{
			color: #46c7a9;
			font-size: 24upx;
		}
		.m-1-v1 ,.m-1-v2{
			width: 250upx;
			view{
				display: flex;

			}
			.gd{
				height: 20upx;
				width: 200upx;
			}
			margin-left: 30upx;
		}
		.m-1-v3{
			transform: rotate(45deg);
			border-top: 5upx solid #46c7a9;
			border-right: 5upx solid #46c7a9;
			width: 20upx;
			height: 20upx;
			margin-left: 50upx;
		}
	}
	.z-all-money{
		color: #fff;
		font-size: 36upx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 30upx;
	}
	.z-all-m{
		color: #fff;
		font-size: 36upx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 10upx;
	}
	.header {
		width: 100%;
		position: relative;
		padding: 30upx;
		padding-top: calc(var(--status-bar-height) + 30upx);
		min-height: 100upx;
		height: 434upx;
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



		.income-options {
			display: flex;
			margin-top: 20upx;
			margin-left: 10%;
			justify-content: space-between;
			// font-family: PingFang SC;
			// font-weight: bold;
			color: #F7CF9E;
			height: 150upx;
			width: 80%;
			// background-color: red;
			// padding-top: 30upx;
			h4 {
				display: flex;
				flex-direction: column;
				align-items: center;

				p {
					margin-top: 10upx;
					position: relative;
					display: flex;
					justify-content: center;
				}

				text {
					position: absolute;
					top: -25upx;
					width: 70upx;
					text-align: center;
					background: #F4BD84;
					border-radius: 5upx;
					font-size: 20upx;
					// transform: scale(0.7);
					// font-family: PingFang SC;
					// font-weight: bold;
					color: #F7CF9E;
				}
			}
		}
	}




</style>
