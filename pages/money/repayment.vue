<template>
	<view class="container">
		<view class="header">
			<!-- <image src="https://daihuan.oss-cn-beijing.aliyuncs.com/shiming/roleCheck-bg%402x.png" class="bg-title"></image> -->
			<view class="header-title-common">
				<p @click="back" />
				<b>余额还款</b>
			</view>
		</view>
		<!-- <view class="tips-part">
			<p>费率：0.80%（每一万元80元手续费）+{{heads.fee}}元/次</p>
			<p>{{b}}</p>
		</view> -->
<scroll-view style="height: 75vh ;margin-top: 20upx" scroll-y="true">
		<ul>
			<li v-for="(item,index) in creditcardList" :key="index">
				<image src="/static/images/card-bg1.png" mode="widthFix" class="bg"></image>
				<view class="card-top-part">
					<image :src="'../../static/images/banklogo/BANK_'+item.bankAcronym+'.png'" mode="widthFix" class="logo-icon"></image>
					<h1>{{item.bankName}}({{item.cardNo.substring(item.cardNo.length,item.cardNo.length-4)}})</h1>
					<h2>账单日 每月{{item.billDay}}日丨还款日 每月{{item.repaymentDay}}日</h2>
					<image src="../../static/images/yl-icon@2x.png" mode="widthFix" class="logo"></image>
					<h3 @click="goHistory(item.cardNo,index)">历史账单</h3>
					
<!-- 					<image src="../../static/images/del-btn.png" @click="deleteXyCard(item.id)" mode="widthFix" class="del"></image>
				 -->
				</view>
				<view class="card-btm-part">
					<p v-if="item.balancePlan">计划执行中，已还款{{item.balancePlan.repaymentedAmount}}</p>
					<p v-else>请及时设置本月还款计划</p>
<!-- 					
						<cmd-circle v-if="item.balancePlan" gap-position="right" style="zoom:0.4;margin-left: auto;margin-right: 20upx;"font-size="22" font-color="#F7CF9E" stroke-color="#F7CF9E" stroke-background="#dcdcdc" cid="circle10" type="circle" :percent="((item.balancePlan.repaymentedAmount/item.balancePlan.taskAmount*100))"></cmd-circle>
					 -->
					<p v-if="item.balancePlan" @click="showplan(item.cardNo,index)">计划详情</p>
					<p v-else @click="plan(item.id,index)">制定计划</p>
				</view>
			</li>

		</ul>
		</scroll-view>
			
		<view class="btn" @click="add">
			<!-- <image src="../../static/images/+@2x.png" mode=""></image> -->
			<p>添加信用卡</p>
		</view>
	</view>
</template>

<script>
	import cmdCircle from "@/components/cmd-circle/cmd-circle.vue"
	export default {
		// components: {
		// 	cmdCircle
		// },
		data() {
			return {
				heads:[],
				b:"",
				creditcardList: [],

			};
		},
		onShow() {
			this.getBalancePlanList()
			this.getheadmoney()
		},
		methods: {
			
			// 获取费率
			getheadmoney(){
				let t = this
				
				let body = {}
				this.$api.api_getBalancePlanListfee(body).then(res=>{
				//	console.log("查看所有信用还款计划状态成功",res.data[0].balancePlan.taskAmount)
					if(res.code==0){
						t.heads = res.data
						let a = res.data.settle
						console.log("a =",res.data.settle)
					
					 console.log((0.0080-a*1))
					  let b = 	((0.0080-a*1)*10000)
					  
					  console.log("b=========================", parseInt(b))
					  if(b==0){
						  t.b="升级V1即可享受，还款金额万分之8的现金"
					  }else{
						  b = Math.ceil(b)
						  // 每还款一笔，立返当前金额千分之一的现金
						  t.b="每还款一笔，立返当前金额万分之"+b+"的现金"
					  }
					 
							
					}
				}).catch(err=>{
				
				})
			},
			
			// 余额还款 查看所有信用还款计划状态/get/balance/plan/list
			getBalancePlanList(){
				let t = this
				let body = {}
				this.$api.api_getBalancePlanList(body).then(res=>{
					console.log("查看所有信用还款计划状态成功",res.data)
					if(res.code==0){
						// ((item.balancePlan.repaymentedAmount/item.balancePlan.taskAmount*100))
						let a = res.data
						// for(let i=0;i<res.data.length;i++){
						// 	let
						// 		bfz : parseInt(res.data[i].balancePlan.repaymentedAmount/res.data[i].balancePlan.taskAmount*100)
							
						// 	a[i].bfz = bfz
						// }
						
						t.creditcardList = res.data
						// console.log("repaymentedAmount",)
						// console.log("taskAmount",res.data[1].taskAmount)
					}
				}).catch(err=>{
					console.log("api_getBalancePlanList失败",err)
				
				})
			},
			
			// 去历史账单
			goHistory(cardNo,index){
				uni.setStorageSync("ylhk_card",this.creditcardList[index])
				console.log("去历史账单",cardNo)
				  uni.navigateTo({
					url:'./repayment/historyList?cardNo='+cardNo
				  })	
			},
			
			// 去制定计划
			plan(id,index){
				uni.setStorageSync("ylhk_card",this.creditcardList[index])
				uni.navigateTo({
					 url:'repayment/drawPlan?id='+id
			  })	
			},
			// 计划详情
			showplan(cardNo,index){
				uni.setStorageSync("ylhk_card",this.creditcardList[index])
				uni.navigateTo({
					url:'repayment/newPlan?planId='+this.creditcardList[index].balancePlan.id+"&type=showplan"
				})	
			},
			// 删除信用卡
			deleteXyCard(e){
				let t = this
				let body = {
						id: e,
				}
				this.$api.api_deletexyCard(body).then(res=>{
					console.log("api_deletexyCard成功",res)
					if(res.code==0){
						t.getxinyongcard()
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
				}).catch(err=>{
					console.log("api_deletexyCard失败",err)
				
				})
			},
			change(val) {
				this.type = val
			},
			add() {
				uni.navigateTo({
					url: '../card/card_add'
				})
			},
			back(){
				uni.navigateBack()
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
			//#ifdef H5
			margin-top: 58upx;
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
	}

	.tips-part {
		width: 690upx;
		background: #FFFFFF;
		box-shadow: 0px 8upx 22upx 2upx rgba(67, 67, 67, 0.13);
		border-radius: 20upx;
		margin: 30upx auto;
		padding: 30upx;
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;

		p {
			margin-top: 10upx;
			display: flex;
			align-items: center;
		}

		p::before {
			content: '';
			width: 10upx;
			height: 10upx;
			display: inline-block;
			margin-right: 10upx;
			border-radius: 50%;
			background-color: #F4CA99;
	
	}
}


	li {
		box-sizing: border-box;
		width: 690upx;
		height: 285upx;
		position: relative;
		margin: 0 auto;
		margin-top: 20upx;
		padding: 0 40upx;

		.bg {
			width: 100%;
			height: 100%;
			position: absolute;
			z-index: -1;
			left: 0;
			top: 0;
		}

		.card-btm-part {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: white;
			height: 85upx;
		}

		.card-top-part {
			position: relative;
			height: 190upx;
			width: 100%;
			z-index: 4;
			color: white;
			border-bottom: 1upx solid white;

			.del {
				position: absolute;
				left: -20upx;
				width: 30upx;
				top: 30upx;
			}

			.logo {
				width: 40upx;
				position: absolute;
				top: 20upx;
				right: 0;
			}

			h1 {
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: bold;
				position: absolute;
				left: 156upx;
				top: 50upx;
			}

			h2 {
				font-size: 22upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: white;
				position: absolute;
				left: 156upx;
				top: 120upx;
				display: flex;
				align-items: center;

				text {
					display: block;
					font-size: 22upx;
					padding-left: 30upx;
				}
			}

			h3 {
				position: absolute;
				top: 50upx;
				font-size: 20upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: white;
				right: -10upx;
				border: 1upx solid white;
				padding: 3upx 10upx;
				font-size: 20upx;
				border-radius: 6upx;
			}

			.logo-icon {
				width: 55upx;
				height: 55upx;
				position: absolute;
				top: 50upx;
				left: 50upx;
			}




		}

	}

	.btn {
		height: 86upx;
		// background: linear-gradient(269deg, #D79F65 0%, #FDD8AA 100%);
		background-color: #46c7a9;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: white;
		position: fixed;
		bottom: var(--window-bottom);
		width: 100%;
		left: 0;

		image {
			margin-right: 20upx;
			width: 30upx;
			height: 30upx;
		}
	}
</style>
