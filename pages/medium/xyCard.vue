<template>
	<view class="container">
		<view class="header">
			<!-- <image src="https://daihuan.oss-cn-beijing.aliyuncs.com/shiming/roleCheck-bg%402x.png" class="bg-title"></image> -->
			<view class="header-title-common">
				<p @click="back" />
				<b>{{name.substring(0,1)+"*"+name.substring(name.length-1,name.length)}}的卡包</b>
				<p @click="showuser">客户信息</p>
			</view>
			
		</view>

<scroll-view style="height: 70vh ;margin-top: 20upx" scroll-y="true">
		<ul>
			<li v-for="(item,index) in creditcardList" :key="index">
				<image src="/static/images/card-bg1.png" mode="widthFix" class="bg"></image>
				<view class="card-top-part">
					<image :src="'../../static/images/banklogo/BANK_'+item.bankAcronym+'.png'" mode="widthFix" class="logo-icon"></image>
					<h1>{{item.bankName}}({{item.cardNo.substring(item.cardNo.length,item.cardNo.length-4)}})</h1>
					<h2>账单日 每月{{item.billDay}}日丨还款日 每月{{item.repaymentDay}}日</h2>
					<image src="../../static/images/yl-icon@2x.png" mode="widthFix" class="logo"></image>
					<h3 @click="goHistory(item.cardNo,index)">历史账单</h3>
					
					<image src="/static/images/del-btn.png" @click="deleteXyCard(item.id)" mode="widthFix" class="del"></image>
				
				</view>
				<view class="card-btm-part">
					<p v-if="item.balancePlan">计划执行中，已还款{{item.balancePlan.repaymentedAmount}}</p>
					<p v-else>请及时设置本月还款计划</p>
<!-- 					
						<cmd-circle v-if="item.balancePlan" gap-position="right" style="zoom:0.4;margin-left: auto;margin-right: 20upx;"font-size="22" font-color="#F7CF9E" stroke-color="#F7CF9E" stroke-background="#dcdcdc" cid="circle10" type="circle" :percent="((item.balancePlan.repaymentedAmount/item.balancePlan.taskAmount*100))"></cmd-circle>
					 -->
					<p v-if="item.balancePlan" @click="showplan(item.cardNo,item.id,item.balancePlan.id,index)">计划详情</p>
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
				name:"name",
				id:"",
				myToken:"",
				name:"",
				

			};
		},

		onLoad(e) {
			
			this.getMediumToken(e.id)
			this.name = e.name
			this.id = e.id
		},
		onShow() {
			// this.getBalancePlanList()
			if(this.id!=""){
				this.getMediumToken(this.id)
			}
			
		},
		methods: {
			
			// 获取中介token
			getMediumToken(userId){
				console.log("进入token")
				let t = this
				let body = {
					userId:userId
					// userId:'236324106'
				}
				this.$medapi.api_getMyToken(body).then(res=>{
					console.log("获取中介token==========成功",res)
					if(res.code==0){
						t.myToken = res.data
						getApp().globalData.xjToken = res.data
						t.getBalancePlanList()
					}
				}).catch(err=>{
					console.log("获取中介失败",err)
				
				})
			},
			
			// 余额还款 查看所有信用还款计划状态/get/balance/plan/list
			getBalancePlanList(){
				let t = this
				let body = {
					empowerToken:t.myToken
				}
				this.$api.api_getBalancePlanList1(body).then(res=>{
					console.log("查看所有信用还款计划状态成功",res)
					if(res.code==0){
						let a = res.data
						t.creditcardList = res.data
					}
				}).catch(err=>{
				
				})
			},
			
			// 去历史账单
			goHistory(cardNo,index){
				uni.setStorageSync("ylhk_card",this.creditcardList[index])
				console.log("去历史账单",cardNo)
				let t = this
				  uni.navigateTo({
					url:'historyList?cardNo='+cardNo+"&userId="+t.id
				  })	
			},
			
			// 去制定计划
			plan(id,index){
				uni.setStorageSync("ylhk_card",this.creditcardList[index])
				uni.navigateTo({
					 url:'havePlan?id='+id
			  })	
			},
			// 计划详情
			showplan(cardNo,index,id,i){
				// console.log("进入计划详情",cardNo,index,id)
				// return
				uni.setStorageSync("ylhk_card",this.creditcardList[i])
				uni.navigateTo({
					url:'showNewPlan?planId='+id+"&type=showplan&cardId="+index
				})	
			},
			// 删除信用卡

			deleteXyCard(e){
				let t = this
				let body = {
						id: e,
				}
				uni.showModal({
					title:"温馨提示",
					content:"是否确认删除信用卡",
					success(res) {
						if(res.confirm){
							t.$api.api_deletexyCard(body).then(res=>{
								console.log("api_deletexyCard成功",res)
								if(res.code==0){
									uni.showToast({
										title:"删除成功"
									})
									t.getBalancePlanList()
								}else{
									uni.showToast({
										title:res.message,
										icon:"none"
									})
								}
							}).catch(err=>{
								console.log("api_deletexyCard失败",err)
							
							})
						}
					}
				})

			},
			change(val) {
				this.type = val
			},
			add() {
				let t = this
				uni.navigateTo({
					url: 'addXyCard?name='+t.name
				})
			},
			showuser(){
				uni.navigateTo({
					url:"usershow?id="+this.id
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
			background-color: #fff;
	
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
			color: #fff;
			height: 85upx;
		}

		.card-top-part {
			position: relative;
			height: 190upx;
			width: 100%;
			z-index: 4;
			color: #fff;
			border-bottom: 1upx solid fff;

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
				color: #fff;
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
				color: #fff;
				right: -10upx;
				border: 1upx solid #fff;
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
		color: #fff;
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
