<template>
	<view class="container">
		<view class="header">
			<image src="https://daihuan.oss-cn-beijing.aliyuncs.com/shiming/roleCheck-bg%402x.png" class="bg-title"></image>
			<view class="header-title-common">
				<p @click="back" />
				<b>{{headname}}</b>
			</view>
		</view>
		<view class="main-box">
			<view class="card-part" >
				<view class="card-box">
					<!-- <image src="/static/images/card-bg1.png" class="card-bg"></image> -->
					<image @click="planStop" :src="'../../../static/images/banklogo/BANK_'+ylhk_card.bankAcronym+'.png'" mode="widthFix" class="logo"></image>
					<h1>
						<b>
							{{ylhk_card.bankName}}（{{ylhk_card.cardNo.substring(ylhk_card.cardNo.length,ylhk_card.cardNo.length-4)}}）
							
							<!-- <a @click="gochangeplan">编辑</a> -->
						</b>
						<p>账单日 每月{{ylhk_card.billDay}}日丨还款日每月{{ylhk_card.repaymentDay}}日</p>
					</h1>
				</view>
				<view class="card-detail" >
					<p>
						还款总次数：{{arrawayPay.taskCount}}次
					</p>
					<p>
						已还次数：{{arrawayPay.completedCount}}次
					</p>
					<p>
						还款总金额：{{arrawayPay.taskAmount}}元
					</p>
					<p>
						已还金额：{{arrawayPay.repaymentedAmount}}元
					</p>
					<p>
						预计手续费：{{arrawayPay.totalServiceCharge}}元
					</p>
					<p>
						已扣手续费：{{arrawayPay.usedServiceCharge}}元
					</p>
				</view>
			</view>
			<ul>
				<li>
					<b>
						时间
					</b>
					<b>
						类型
					</b>
					<b>
						金额
					</b>
					<b>
						状态
					</b>
				</li>
				<li v-for="(item,index) in arrawayPay.planItems" :key="index">
					<p  >{{item.executeTime}}</p>
					<p v-if="item.type==1" >消费</p>
					<p v-if="item.type==2" >还款</p>
					<p v-if="item.type==1">-{{item.amount}}</p>
					<p v-if="item.type==2">+{{item.amount}}</p>
					<p v-if="item.status==1" style="color: #F0AD4E;">未执行</p>
					<p v-if="item.status==2" style="color: ##F0AD4E;">执行中</p>
					<p v-if="item.status==3" style="color: #4CD964;">已成功</p>
					<p v-if="item.status==4" style="color: red;">已失败</p>
					<p v-if="item.status==5" style="color: red;">已取消</p>
					<!-- <p >{{item.status}}</p> -->
				<!-- 	<view v-if="showm.status==1" style="color: #F0AD4E;">状态：未执行</view>
					<view v-if="showm.status==2" style="color: ##F0AD4E;">状态：执行中</view>
					<view v-if="showm.status==3" style="color: #4CD964;">状态：已成功</view>
					<view v-if="showm.status==4" style="color: red;">状态：已失败</view>
					<view v-if="showm.status==5" style="color: red;">状态：已取消</view> -->
					
				</li>
			</ul>


		</view>
		<view v-if="arrawayPay.status==1"  class="btn" @click="planStop">
			启动计划
		</view>
		<view v-else-if="arrawayPay.status==3||arrawayPay.status==5||arrawayPay.status==6"  >
				
		</view>
		<view v-else class="btn" @click="planStop">
			终止计划
		</view>
	</view>
</template>

<script>
	import pickRegions from '@/components/pick-regions/pick-regions.vue'
	export default {
		data() {
			return {
				ylhk_card:[],
				headname:"",
				arrawayPay:{
					id:"id",//	信息id
					taskCount:"10",//			还款总次数
					taskAmount:"1000",//			还款的总金额
					totalServiceCharge:"8",//	还款总手续费
					repaymentedAmount:"500",//	已还款的金额
					completedCount:"6",//		已还款次数
					usedServiceCharge:"4",//	已扣手续费
					planItems:[{//
					excute_time:"2021-12-12 18:00:22",//	执行时间
					firstExecuteTime:"id",//		首次执行时间
					last_execute_time:"id",//		最后一次执行时间
					type:"2",//		类型1-消费2-还款
					amount:"50",//:"id",//	操作金额
					status:1,//	执行状态：1-未执行、2-执行中、3-执行成功、4-执行失败
					orderCode:"123456789",//	订单号
					serviceCharge:"1",//	手续费
					description:"id",//	计划描述
					message:"id",//		执行信息（失败原因）
					}],
				},
	

			};
		},
		components: {
			pickRegions
		},
		onLoad(e) {
				
			if(e.status=="执行中"){
				this.headname = "计划详情"
				
			}else{
				this.headname = "历史详情"
			}
			 this.getPlanHhasItem(e.id)
		//	this.getPlanHhasItem(2)
			//this.planStop()
		},
		onShow() {
			this.ylhk_card = uni.getStorageSync("ylhk_card")
		},
		methods: {
			// 余额还款-历史记录-计划详情api/credit/get/plan/has/item
			// getPlanHhasItem(id){
			// 	let t = this
			// 	let body = {
			// 		// id:id,
			// 		// empowerToken:getApp().globalData.xjToken
			// 		id:889,
			// 		empowerToken:"b40dcc905622a75d07bbfb0e011fe91d"
			// 	}
			// 	this.$api.api_getPlanHhasItem(body).then(res=>{
			// 		console.log("api_getPlanHhasItem成功",res)
			// 		if(res.code==0){
			// 			// this.arrawayPay = res.data
			// 		}
			// 	}).catch(err=>{
			// 		console.log("api_getPlanHhasItem失败",err)
			// 		uni.showToast({
			// 			title:"",
			// 			icon:"none"
			// 		})
			// 	})
			// },
			//余额还款-历史记录-计划详情通过ID查询
			getPlanHhasItem(planId){
				let t = this
				let body = {
					id: planId,			
					empowerToken:getApp().globalData.xjToken	
							// id:889,
							// empowerToken:"b40dcc905622a75d07bbfb0e011fe91d"
				}
				this.$api.api_getPlanHhasItem1(body).then(res=>{
					console.log("getPlanHhasItem成功==================",res)
					if(res.code==0){
						t.arrawayPay = res.data
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
				}).catch(err=>{
				
				})
			},
			// api_planStop余额还款历史记录-终止计划
			planStop(){
				
				let t = this
				let body = {
					id: 1,			
				}
				this.$api.api_planStop(body).then(res=>{
					console.log("api_planStop成功",res)
				}).catch(err=>{
				
				})
			},
			back() {
				uni.navigateBack()
			},
			gochangeplan(){
				uni.navigateTo({
					url:"changePlan"
				})
			},
			// 获取选择的地区
			handleGetRegion(area) {
				console.log(area)
				this.area = `${area[0].name}${area[1].name}`
			},
			start(){
				uni.navigateTo({
					url:'changePlan'
				})
			}
		}
	}
</script>

<style lang="scss">
	radio {
		zoom: 0.6;
		margin-left: 20upx;
		color: #888;
	}

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
				font-size: 32upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #F7CF9E;
				position: absolute;
				right: 0;
			}
		}
	}

	.main-box {
		padding: 30upx;

		.card-part {
			box-shadow: 0px 8upx 22upx 2upx rgba(67, 67, 67, 0.13);
			border-radius: 20upx;
		}

		.card-detail {
			padding: 20upx;
			display: flex;
			flex-wrap: wrap;

			p {
				width: 50%;
				margin-top: 20upx;
				font-size: 31upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}
		}


		.card-box {
			display: flex;
			position: relative;
			height: 159upx;
			align-items: center;
			padding: 20upx 40upx;
			background-color: #46c7a9;
			border-radius: 20upx 20upx 0 0;

			.card-bg {
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				top: 0;
				z-index: -1;
			}

			.logo {
				width: 60upx;
				height: 60upx;
				margin-right: 33upx;
			}

			h1 {
				flex: 1;

				b {
					display: flex;
					justify-content: space-between;
					font-size: 36upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: white;

					a {
						font-size: 32upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: white;
					}

					margin-bottom: 20upx;
				}

				p {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: white;
				}
			}
		}
	}

	.btn {
		height: 86upx;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		margin: 0 auto;
		// background: linear-gradient(269deg, #D79F65 0%, #FDD8AA 100%);
		background-color: #46c7a9;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 34upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: white;
	}

	ul {
		box-shadow: 0px 8upx 22upx 2upx rgba(67, 67, 67, 0.13);
		border-radius: 20upx;
		margin-top: 20upx;
		padding: 30upx 0;
		height: 600upx;
		overflow-y: scroll;
		li:first-child{
			margin-bottom: 40upx;
		}
		li {
			margin-bottom: 20upx;
			display: flex;

			b {
				font-size: 37upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				text-align: center;
			}

			b:nth-child(1) {
				flex: 4;
			}

			b:nth-child(2) {
				flex: 1;
			}

			b:nth-child(3) {
				flex: 2;
			}

			b:nth-child(4) {
				flex: 2;
			}
			
			p {
				font-size: 28upx;
				font-family: PingFang SC;
				color: #888;
				text-align: center;
			}
			
			p:nth-child(1) {
				flex: 4;
			}
			
			p:nth-child(2) {
				flex: 1;
			}
			
			p:nth-child(3) {
				flex: 2;
			}
			
			p:nth-child(4) {
				flex: 2;
				color: #F9CB32;
			}
		}
	}
</style>
