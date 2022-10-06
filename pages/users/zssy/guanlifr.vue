<template>
	<view class="container">

		<view class="header">
			<!-- <image src="https://daihuan.oss-cn-beijing.aliyuncs.com/shiming/roleCheck-bg%402x.png" class="bg-title"></image> -->
			<view class="header-title-common">
				<p @click="back" />
				<b>{{titleName}}</b>
			</view>
			

<!-- 			<view class="income-options" v-if="type == 1">
				<h4 >
					<p style="color:#F7CF9E;font-size: 32upx;">当日收益(元)</p>
					<p style="color:#F7CF9E;">{{todayQuickTota}}</p>
				</h4>
				<h4>
					<p style="color:#F7CF9E;font-size: 32upx;">当月收益(元)</p>
					<p style="color:#F7CF9E">{{curMonthQuickTotal}}</p>
				</h4>

			</view> -->
			
			<view class="income-options" style="display: flex;;justify-content: center;">
				<h4 style="color: #FF8100">
					<p style="color:#fff;font-size: 32upx;font-size: 40upx;">累计金额(元）</p>
					<p style="color:#fff;font-size: 40upx;">{{selfTotalProfitAmount}}</p>
				</h4>

			
			</view>
		</view>
	<block v-if="type == 0" >
		<view class="hedcolor">
			<h1>
				<p>日期</p>
				<p>姓名</p>
				<p>等级</p>
				<p>还款(元)</p>
				<p>分润(元)</p>
			</h1>
		</view>
		<ul>
			<li v-for="(item,index) in allIist" :key="index">
				<b>
					<view>{{item.orderTime.substring(0,10)}}</view>
					<view>{{item.orderTime.substring(10,item.orderTime.length)}}</view>
				</b>
				<b>
					{{item.fullname.substring(0,1)+'*'+item.fullname.substring(2,item.fullname.length)}}
				</b>
				
				<b v-if="item.vipLevel == 0" > 普通</b>
				<b v-else-if="item.vipLevel > 0 && item.vipLevel <= 3">钻石{{item.vipLevel}}</b>
				<b  v-else>钻石3</b>
				
				<b style="color: #46c7a9;" v-if="item.balanceSameAmount==undefined">
					0.00
				</b>
				<b style="color: #46c7a9;" v-else>
					{{item.balanceSameAmount}}
				</b>
				<b style="color: #46c7a9;">
					{{item.profitAmount }}
				</b>
			</li>
		</ul>
	</block>
	<block v-else>
		<view class="hedcolor" >
			<h1>
				<p>日期</p>
				<p>类型</p>
				<p>金额(元)</p>
			</h1>
		</view>
		<ul>
			<li v-for="(item,index) in allIist" :key="index">

				<b>
				
					<view >{{item.orderTime}}</view>
				</b>
				<b >
				
					<view style="color: #46c7a9;">{{item.profitRemark}}</view>
				</b>
				<b >
					<view style="color: #46c7a9;">{{item.profitAmount}}</view>	
				</b>
			</li>
		</ul>
	</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:1,
				pageSize:15,
				todayQuickTota:0,
				curMonthQuickTotal:0,
				selfTotalProfitAmount:0,
				titleName:"刷卡分润",
				allIist:[]
			};
		},
		onLoad(e) {
			// console.log(this.allIist[0].orderTime.length)
			this.titleName = e.titleName
			this.type = e.type
			let t = this
			console.log("onload",e.titleName,e.type)
			if(e.type == 0){
				t.selfProfitList()
			}else if(e.type == 1){
				 t.otherProfitList()
			}
		},
		onShow() {
			// this.selfProfitList(1)
			//this.otherProfitList(1)
		//	this.profitList(1)
		},
		// 上拉加载
		onReachBottom() {
			var that = this
			console.log("上拉加载")
			if(this.allIist.length<this.pageSize){
					uni.showToast({
						title:"没有更多了",
						icon:"none"
					})
				return
			}
			
			this.pageSize = this.pageSize+10
			if(that.type == 0){
				that.selfProfitList()
			}else if(that.type == 1){
				 that.otherProfitList()
			}
		
		},
		methods: {
			
			//api_managefitList获取管理分润
			selfProfitList(){
				let t = this
				let body = {
					currentPage:1,	//当前页
					pageSize:t.pageSize,//每页条数
				}
				this.$meapi.api_managefitList(body).then(res=>{
					console.log("获取管理分润成功",res)
					if(res.code==0){
						t.selfTotalProfitAmount= res.data.manageTotalProfitAmount //累计金额
						t.allIist = res.data.list
					}else if(res.code==5){
							uni.showModal({
								title:"登录已过期",
								content:"立即去登录",
								success(res) {
									if(res.confirm){
										uni.navigateTo({
											url:"/pages/login/login"
										})
									}else{
										uni.navigateBack({
											
										})
									}
								}
							})
					}
				
				}).catch(err=>{
					console.log("selfProfitList失败",err)
				
				})
			},
			
			// 获取其他收入api/user/get/quick/profit/list
			otherProfitList(){
				let t = this
				let body = {}
				this.$meapi.api_otherProfitList(body).then(res=>{
					console.log("获取其他收入成功",res)
					if(res.code==0){
						t.selfTotalProfitAmount= res.data.otherTotalProfitAmount //累计金额
						t.allIist = res.data.list
					}else if(res.code==5){
							uni.showModal({
								title:"登录已过期",
								content:"立即去登录",
								success(res) {
									if(res.confirm){
										uni.navigateTo({
											url:"/pages/login/login"
										})
									}else{
										uni.navigateBack({
											
										})
									}
								}
							})
					}
				
				}).catch(err=>{
				
				})
			},
			
			
			// 获取刷卡分润api/user/get/quick/profit/list
			profitList(currentPage){
				let t = this
				let body = {
					currentPage:currentPage,	//当前页
					pageSize:t.pageSize//每页条数
				}
				this.$meapi.api_profitList(body).then(res=>{
					console.log("api_profitList成功",res)
					if(res.code==0){
						t.todayQuickTota =	res.data.curMonthBalanceTotal //当日刷卡收益
						t.curMonthQuickTotal=res.data.curMonthQuickTotal	//当月刷卡收益
						t.allIist = res.data.list
						console.log("todayQuickTota=",res.data.curMonthBalanceTotal )
						console.log("curMonthQuickTotal=",res.data.curMonthQuickTotal )
					}else if(res.code==5){
							uni.showModal({
								title:"登录已过期",
								content:"立即去登录",
								success(res) {
									if(res.confirm){
										uni.navigateTo({
											url:"/pages/login/login"
										})
									}else{
										uni.navigateBack({
											
										})
									}
								}
							})
					}
				
				}).catch(err=>{
					console.log("api_profitList失败",err)
				
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
		min-height: 100upx;
		height: 334upx;
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
			// font-family: PingFang SC;
			// font-weight: bold;
			color: #F7CF9E;
			height: 150upx;
			width: 80%;
			// background-color: red;
			padding-top: 30upx;
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



	.hedcolor{
		width: 700upx;
		margin-left: 25upx;
		margin-top: 10upx;
		color: #1C1C1C;
		// background: linear-gradient(269deg, #D79F65 0%, #FDD8AA 100%);
		background-color: #FFFFFF;
		// border-bottom: 3upx solid #C0C0C0;
		box-shadow: 0px 8upx 22upx 2upx rgba(67, 67, 67, 0.2);
	}
	h1{
		height: 91upx;
		// background: linear-gradient(269deg, #D79F65 0%, #FDD8AA 100%);
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 90%;
		margin-left: 5%;
		p{
			flex: 1;
			display: flex;
			justify-content: center;
		}
		
	}
	ul{
		li{
			padding: 20upx 0;
			display: flex;
			align-items: center;
			margin-left: 5%;
			border-bottom: 1upx solid #E5E5E5;
			width: 90%;
			 
			b{
				// background-color: red;
				flex: 1;
				padding-left: 10upx;
				// display: flex;
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #666666;
				justify-content: center;
				view{
					// background-color: red;
					width: 180upx;
					display: flex;
					height: 80upx;
					font-size: 24upx;
					align-items: center;
					justify-content: center;
				}
			}
			
		}
		
		
	}


</style>
