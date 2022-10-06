<template>
	<view class="container" >
		<view class="header" >
			<!-- <image src="https://daihuan.oss-cn-beijing.aliyuncs.com/shoyi/sy-bg.png" class="bg-title"></image> -->
			<!-- <h1></h1> -->
			<h2 style="padding-left: 70upx;">
				<p>总收益（元）</p>
				<image @click="showNo" src="../../static/images/eye@2x.png" mode="widthFix"></image>
			</h2>
			<h3 v-if="showNos" style= "padding-left: 30upx;">
				{{(allMoney.totalBalance).toFixed(2)}}
			</h3>
			<h3 v-else>
				****
			</h3>
			<view class="income-options">
				<h4>
					<p>今日收益</p>
					<p>{{(allMoney.todayTotal).toFixed(2)}}</p>
				</h4>
				<h4>
					<p>昨日收益</p>
					<p>{{(allMoney.yesterdayTotal).toFixed(2)}}</p>
				</h4>
				<h4 @click="gotxs">
					<p >可提现
						<text>提现</text>
					</p>
					<p>{{(allMoney.currentBalance).toFixed(2)}}</p>
				</h4>
			</view>
		</view>
		
<!-- 		<view class="tab-box">
			<h1 :class="type=='1'?'active':''"  @click="choose(type = '1')">每日收益</h1>
			<h1 :class="type=='2'?'active':''" @click="choose(type = '2')">提现记录</h1>
		</view> -->
		<view class="tab-box">
			<h1 :class="type=='1'?'active':''" @click="choose(1)">每日收益</h1>
			<h1 :class="type=='2'?'active':''"  @click="choose(2)">提现记录</h1>
		</view>
		<scroll-view scroll-y="true">
			<ul>
				<li v-for="(item,index) in txMoneyc" :key="index">
					<h5>
						<p v-if="type==1">收益（元）</p>
						<p v-if="type==2"  >提现金额（元）</p>
						<p style="padding-right: 50upx;">+{{(item.amount).toFixed(2)}}</p>
					</h5>
					<h6>
						<p>时间</p>
						<p>{{item.createTime}}{{index}}</p>
					</h6>
				</li>
			</ul>
		</scroll-view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				gotx:0,
				allMoney:{
					todayTotal:0,
					yesterdayTotal:0,
					currentBalance:0,
					totalBalance:0
				},
				txMoneyc:[],
				type: 1,
				txindex:1,
				addindex:1,
				number:20,
				indexunmber:1,
				lading:0,
				showNos:true,
				pageSize:15
			};
		},
		onShow() {
			this.getallMoney()
			if(this.type==1){
				this.getaddMoney()
			}else if(this.type==2){
				this.getTxMoney()
			}
		},
				// 下拉刷新
				onPullDownRefresh() {
					this.getallMoney()
					
					let timer = setTimeout( () => {
					    // 这里添加您的逻辑	
						uni.stopPullDownRefresh()
					}, 1000)
					
				},
				
				// 上拉加载
				onReachBottom() {
					var that = this
					console.log("上拉加载")
					
					this.pageSize = this.pageSize+10
					
					
					
					if(this.type==2){
						this.getTxMoney()
					}else{
						this.getaddMoney()
					}
				
				},
		methods: {
			// 隐藏总收益
			showNo(){
				this.showNos = !this.showNos
				
			},
			choose(type){
				this.type = type
				if(this.type==1){
					this.getaddMoney()
				}else if(this.type==2){
					this.getTxMoney()
				}
			},
			// 获取提现记录
			getTxMoney(){

				let t = this
				let body = {
					pageSize:t.pageSize,
					currentPage:1
				}
				this.$meapi.api_getTxMoney(body).then(res=>{
					console.log("获取提现记录成功",res)
					if(res.code==0){				
							t.txMoneyc = res.data
					}
				}).catch(err=>{
					console.log("api_getTxMoney失败",err)
				
				})
			},
			// 获取收益记录
			getaddMoney(){

				let t = this
				let body = {
					pageSize:t.pageSize,
					currentPage:1
				}
				this.$meapi.api_getaddMoney(body).then(res=>{
					console.log("获取收益记录成功",res)
					if(res.code==0){
						t.txMoneyc = res.data
					}
				}).catch(err=>{
					console.log("api_getallMoney失败",err)
				
				})
			},
			gotxs(){
				if(this.gotx==1){
					uni.navigateTo({
						url:"/pages/money/income/txMoney"
					})
				}else{
					uni.navigateTo({
						url:"/pages/login/login"
					})
				}
			},
			// 获取收益中心总收益
			getallMoney(){
				let t = this
				let body = {}
				this.$meapi.api_getallMoney(body).then(res=>{
					console.log("获取收益中心总收益成功",res)
					if(res.code==0){
						t.allMoney = res.data
						t.gotx = 1
					}else{
						t.gotx = 0
					}
				}).catch(err=>{
					console.log("api_getallMoney失败",err)
				
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
		min-height: 100upx;
		height: 409upx;
		background-color: #46c7a9;
		h1 {
			padding-top: 10upx;
			font-size: 48upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: white;
		}

		h2 {
			font-size: 38upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: white;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 50upx;
			image {
				width: 25upx;
			}
		}

		h3 {
			font-size: 50upx;
			font-family: DIN;
			font-weight: 500;
			color: white;
			display: flex;
			justify-content: center;
			margin: 30upx 0;
		}

		.income-options {
			display: flex;
			justify-content: space-between;
			font-size: 38upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #FFFFFF;

			h4 {
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 36upx;
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
					background: white;
					border-radius: 5upx;
					font-size: 28upx;
					transform: scale(0.7);
					font-family: PingFang SC;
					font-weight: bold;
					color: #46c7a9;
					padding-top: 5upx;
					
				}
			}
		}
	}

	.tab-box {
		display: flex;
		align-items: center;
		padding: 38upx 38upx 0;

		h1 {
			margin-right: 30upx;
			padding-bottom: 5upx;
		}

		.active {
			border-bottom: 3upx solid #46c7a9;
		}

	}

	ul {
		// background-color: red;
		height: 620upx;
		li {
			padding: 20upx 35upx;
			display: flex;
			justify-content: space-between;
			border-bottom: 1upx solid #e1e1e1;

			p {
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #666666;
			}

			h5 {
				p:last-child {
					font-size: 30upx;
					font-family: DIN;
					font-weight: 500;
					color: #46c7a9;
					margin-top: 10upx;
				}

				display: flex;
				flex-direction: column;
				align-items: center;
			}

			h6 {
				p:last-child {
					font-size: 24upx;
					font-family: DIN;
					font-weight: 500;
					color: #333333;
					margin-top: 10upx;
				}

				display: flex;
				flex-direction: column;
				align-items: center;
			}
		}
	}
</style>
