<template>
	<view class="container">
		<view class="header">
			<!-- <image src="https://daihuan.oss-cn-beijing.aliyuncs.com/shiming/roleCheck-bg%402x.png" class="bg-title"></image> -->
			<view class="header-title-common">
				<p @click="back" />
				<b>{{titleName}}</b>
			</view>
			<view class="income-options" >
				<picker mode="selector"  @change="bindarrayYear"  :range="arrayYear" >
					<h4 >
						<p style="color:#fff;font-size: 32upx;">{{year}}年</p>
						<!-- <view></view> -->
					</h4>
				</picker>
				<picker mode="selector"  @change="bindarrayM"  :range="arrayM" >
					<h4>
						<p style="color:#fff;font-size: 32upx;">{{am}}月</p>
						<!-- <view></view> -->
					</h4>
				</picker>
			</view>
			
		</view>
		
		<view class="tui-v" @click="gourlz">
			<view class="tui-v1">直推</view>
			<view class="tui-v2">
				<view>{{profitList.firstCount}}人<text>已注册</text></view>
				<view>{{profitList.firstActivationCount}}人<text>已激活</text></view>
			</view>
			<view class="tui-v2">
				<view>{{profitList.firstRealnameCount}}人<text>已实名</text></view>
				<view>{{(profitList.curMonthFirstAmount).toFixed(2)}}<text>招商收益</text></view>
			</view>
			<view class="tui-v3"></view>
		</view>
		<view class="tui-v"  @click="gourlj">
			<view class="tui-v1">间推</view>
			<view class="tui-v2">
				<view>{{profitList.secondCount}}人<text>已注册</text></view>
				<view>{{profitList.secondActivationCount}}人<text>已激活</text></view>
			</view>
			<view class="tui-v2">
				<view>{{profitList.secondRealnameCount}}人<text>已实名</text></view>
				<view>{{(profitList.curMonthSecondAmount).toFixed(2) }}<text>招商收益</text></view>
			</view>
			<view class="tui-v3"></view>
		</view>
		<view class="tui-v">
			<view class="tui-v1">总计</view>
			<view class="tui-v2">
				<view>{{(profitList.firstCount)+(profitList.secondCount)}}人<text>已注册</text></view>
				<view>{{(profitList.firstActivationCount)+(profitList.secondActivationCount)}}人<text>已激活</text></view>
			</view>
			<view class="tui-v2">
				<view>{{(profitList.firstRealnameCount)+(profitList.secondRealnameCount)}}人<text>已实名</text></view>
				<view>{{((profitList.curMonthSecondAmount)+(profitList.curMonthFirstAmount)).toFixed(2) }}<text>招商收益</text></view>
			</view>
			<!-- <view class="tui-v3"></view> -->
		</view>
	</view>
</template>
		
	<script>
		import time from "../../../utils/time.js"
		export default {
			data() {
				return {
					titleName:"招商收益",
					allzs:[],
					arrayYear:["2021","2022","2023","2024"],
					year:"2022",
					arrayM:["01","02","03","04","05","06","07","08","09","10","11","12"],
					am:"1",
					profitList:[]
				};
			},
			onLoad(e) {
			this.am = time.dateTimeStr("m",0)
			this.profitLists(this.yuer,time.dateTimeStr("m",0))
			},		
			methods: {
				gourlz(){
					uni.navigateTo({
						url:"zs-people"
					})
				},
				gourlj(){
					uni.navigateTo({
						url:"zs-people-j"
					})
				},
				bindarrayYear(e){
					console.log(e)
					this.year =this.arrayYear[e.detail.value]
					this.profitLists(this.arrayYear[e.detail.value],this.am)
				},
				bindarrayM(e){
					console.log(e)
					this.am =this.arrayM[e.detail.value]
					this.profitLists(this.yuer,this.arrayM[e.detail.value])
				},
	
				
				// 招商收益详细按月查找 非json  api/user/get/attract/profit/time/list
				profitLists(){
					let t = this
					let body = {
						year:t.year,
						month:t.am
					}
					this.$meapi.api_profitTime(body).then(res=>{
						console.log("api_profitTime成功",res)
						if(res.code==0){
							t.profitList = res.data
						}
					}).catch(err=>{
						console.log("api_profitTime失败",err)
				
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
	.tui-v{
		width: 690upx;
		height: 115upx;
		box-shadow: 0px 4upx 6upx 0upx rgba(28, 28, 28, 0.2);
		margin-top: 30upx;
		margin-left: 30upx;
		display: flex;
		font-size: 24upx;
		// justify-content: center;
		align-items: center;
		.tui-v1{
			width: 150upx;
			height: 115upx;
			font-size: 30upx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.tui-v2{
			width: 220upx;
			view{
				display: flex;
				// justify-content: center;
				align-items: center;
			}
			text{
				color: #46c7a9;
			}
		}
		.tui-v3{
			transform: rotate(45deg);
			border-top: 5upx solid #46c7a9;
			border-right: 5upx solid #46c7a9;
			width: 20upx;
			height: 20upx;
			margin-left: 30upx;
		}
	}
	.header {
		width: 100%;
		position: relative;
		padding: 30upx;
		padding-top: calc(var(--status-bar-height) + 30upx);
		min-height: 100upx;
		height: 277upx;
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
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #F7CF9E;
				position: absolute;
				right: 0;
			}
		}
	
	
	
		.income-options {
			display: flex;
			margin-top: 10upx;
			margin-left: 10%;
			justify-content: space-between;
			color: #46c7a9;
			height: 150upx;
			width: 80%;
			picker{
				margin-top: 40upx;
			}
			h4 {
				display: flex;
				// flex-direction: column;
				align-items: center;
				// background-color: red;
				// width: 150upx;
				p {
					margin-top: 10upx;
					// position: relative;
					display: flex;
					justify-content: center;
					width: 110upx;
				}
				view{
					// transform: rotate(45deg);
					// border-bottom: 5upx solid #fff;
					// border-right: 5upx solid #fff;
					width: 20upx;
					height: 20upx;
					margin-left: 10upx;
					display: flex;
					justify-content: center;
				}
			}
		}
	}
	
	
</style>
