<template>
	<view class="container">
		<view class="header">
			<!-- <image src="https://daihuan.oss-cn-beijing.aliyuncs.com/shiming/roleCheck-bg%402x.png" class="bg-title"></image> -->
			<view class="header-title-common">
				<p @click="back" />
				<b>{{headname}}</b>
			</view>
		</view>
		<view class="main-box">
			<view class="card-part" >
				<view class="card-box">
					<image src="/static/images/card-bg1.png" class="card-bg"></image>
					<image @click="planStop" :src="'/static/images/banklogo/BANK_'+ylhk_card.bankAcronym+'.png'" mode="widthFix" class="logo"></image>
					<h1>
						<b>
							{{ylhk_card.bankName}}（{{cardNo.substring(cardNo.length,cardNo.length-4)}}）
							
							<!-- <a @click="gochangeplan">编辑</a> -->
						</b>
						<p>账单日 每月{{billDay}}日丨还款日每月{{repaymentDay}}日</p>
					</h1>
				</view>
				<view class="card-detail"  >
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
				<li v-for="(item,index) in arrawayPay.planItems" :key="index" @click="showmall(index)">
					<p>{{item.executeTime}}</p>
					<p v-if="item.type==1">消费</p>
					<p v-if="item.type==2">还款</p>
					<p v-if="item.type==1">-{{item.amount}}</p>
					<p v-if="item.type==2">+{{item.amount}}</p>
					<p v-if="item.status==1">未执行</p>
					<p v-if="item.status==2">执行中</p>
					<p v-if="item.status==3" style="color: #4CD964;">已成功</p>
					<p v-if="item.status==4" style="color: red;">已失败</p>
					<p v-if="item.status==5"  style="color: red;">已取消</p>
				</li>
			</ul>


		</view>
		<view v-if="pay==1" class="btn"@click="orTureCard" >
			启动计划
		</view>
		<view v-else class="btn" @click="planStop" >
			终止计划
		</view>
<!-- 		<view v-if="headname=='计划详情'" class="btn" @click="planStop">
			终止还款
		</view> -->




		<!-- 显示详情 -->
		<view class="modal-box" v-if="modalShow2" @click="modalShow2 = false">
			<view class="modal-content">
				<image src="/static/images/tanc/bg.png" class="bg" mode="widthFix" />
				<h4>消费明细</h4>
				<view class="confirm-box" style="height: 400upx;">
					<a>
						<p style="margin-top: 40upx;">订单号: {{showm.orderCode}}</p>
						<p>
							<view>
								计划金额: {{showm.amount}}
							</view>
							<view>
								<!-- 消费金额: {{showm.amount}} -->
							</view>
						</p>
						
						<p>
							<view v-if="showm.type==1">
								计划手续费: {{(showm.amount*0.008).toFixed(2)}}
							</view>
							<view v-else>
								计划手续费: 1
							</view>
							<view>
								计划费率: 0.80%
							</view>
						</p>
						<p>
							<view v-if="showm.type==1">
								计划类型: 消费
							</view>
							<view v-if="showm.type==2">
								计划类型: 还款
							</view>
							<view v-if="showm.status==1" style="color: #F0AD4E;">状态：未执行</view>
							<view v-if="showm.status==2" style="color: ##F0AD4E;">状态：执行中</view>
							<view v-if="showm.status==3" style="color: #4CD964;">状态：已成功</view>
							<view v-if="showm.status==4" style="color: red;">状态：已失败</view>
							<view v-if="showm.status==5" style="color: red;">状态：已取消</view>
					
						</p>
						<p v-if="showm.type==1">
								计划描述: 消费计划
						</p>
						<p v-else>
								计划描述: 还款计划
						</p>
						<p>执行时间: {{showm.executeTime}}</p>
						<p v-if="showm.status==4">失败原因: {{showm.message}}</p>
					</a>
		<!-- 			<h3>
						<p @click.stop>取消</p>
						<p  @click.stop>确定</p>
					</h3> -->
				</view>
			</view>
		</view>

	</view>
</template>

<script>
import pickRegions from '@/components/pick-regions/pick-regions.vue'
	export default {
		data() {
			return {
				codeDesc:"获取验证码",
				modalShow:false,
				ylhk_card:[],
				newPlans:[],
				headname:"计划详情",
				arrawayPay:[],
				preventClickCode:false,
				idCard:"",//身份证号码
				smsCode:"",//验证码
				modalShow2:false,
				showm:[],
				pay:1,
				planId:"",
				
				
				cardNo:"",
				phone:"",
				expiredTime:"",
				securityCode:"",
				billDay:"",
				repaymentDay:"",
				cardIds:""
				
				
				
			};
		},
		components: {
			pickRegions
		},
		onLoad(e) {
			console.log("cardId========",e.cardId)
			this.getcard(e.cardId)
			this.cardIds = e.cardId
			if(e.type=="goNewPlan"){
				this.arrawayPay = uni.getStorageSync("newPlans") //获取存入的定制的计划
				this.pay = 1
				
			}else{
				this.pay = 2
				this.planId = e.planId
				console.log("e.planId===============================================",e.planId)
				this.getPlanHhasItem(e.planId)
				
			}
			
		},
		onShow() {
			
			this.ylhk_card = uni.getStorageSync("ylhk_card")
			
			this.api_getUser()
		},
		methods: {
			getcard(id){
				let body ={
					id:id,
					empowerToken:getApp().globalData.xjToken
				},t=this
				this.$api.api_xyCard1(body).then(res=>{
					console.log("api_xyCard成功===========",res.data)
					if(res.code==0){
							t.cardNo = res.data.cardNo,
							t.phone = res.data.phone,
							t.expiredTime= res.data.expiredTime,//	有效期
							t.securityCode= res.data.securityCode,//	安全码
							t.billDay= res.data.billDay,//		账单日
							t.repaymentDay= res.data.repaymentDay// 还款日
					}
				}).catch(err=>{
					console.log("api_xyCard失败",err)
					
				})
			},
		//获取个人资料
				api_getUser(){
					let t = this
					let body = {
						id:uni.getStorageSync("users").id
					}
					this.$meapi.api_getUser(body).then(res=>{
						console.log("获取个人身份证成功",res.data.idcard)
						if(res.code==0){
							t.idcard = res.data.idcard
						}
					
					}).catch(err=>{
						console.log("api_changeAlipay失败",err)
					
					})
				},
			
			showmall(index){
				console.log(index)
				
				this.showm = this.arrawayPay.planItems[index]
				
				this.modalShow2=true
			},
			//余额还款-历史记录-计划详情通过ID查询
			getPlanHhasItem(planId){
				let t = this
				let body = {
					id: planId,			
					empowerToken:getApp().globalData.xjToken	
					
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
			//检验是否绑卡	非json	启动计划前调用
			orTureCard(){
				let t = this
				let body = {
					cardNo: t.arrawayPay.creditCardNumber,			
				}
				this.$api.api_orCard(body).then(res=>{
					console.log("api_orCard成功",res)
					if(res.code==0){
						t.startNewPlan()
					}else if(res.code==3){
						// t.modalShow=true
						uni.navigateTo({
							url:"sendcodes?id="+t.cardIds
						})
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
				}).catch(err=>{
					console.log("api_orCard失败",err)
				
				})
			},
		

			
	
	
			// 余额还款-启动计划-api/credit/save/new/plan
			startNewPlan(){
				let t = this
				uni.showLoading({
					title:"启动中...",
					mask:true
				})
				let body = {
					cardNo: t.arrawayPay.creditCardNumber,	
					empowerToken:getApp().globalData.xjToken
				}
				this.$api.api_startNewPlan1(body).then(res=>{
					uni.hideLoading()
					console.log("api_startNewPlan成功",res)
					if(res.code==0){
						uni.showToast({
							title:"启动成功"
						})
						let timer = setTimeout( () => {
						   // uni.reLaunch({
						   // 	url:"/pages/medium/index"
						   // })
						   uni.navigateBack({
						   	delta:2
						   })
						}, 500)

					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
					uni.hideLoading()
				}).catch(err=>{
					console.log("api_startNewPlan失败",err)
					uni.showToast({
						title:"",
						icon:"none"
					})
					uni.hideLoading()
				})
			},
			// api_planStop余额还款历史记录-终止计划api/credit/plan/stop
			planStop(){
				
				let t = this
				let body = {
					id: t.planId,		
					empowerToken:getApp().globalData.xjToken
				}
				this.$api.api_planStop1(body).then(res=>{
					console.log("api_planStop成功",res)
					if(res.code ==0){
							uni.showToast({
						    	title:"终止成功"
						    })	
						let timer = setTimeout( () => {
							uni.navigateBack({
								
							})
						}, 500)
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
				}).catch(err=>{
					console.log("api_planStop失败",err)
					
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
			closesendCode(){
				this.modalShow = !this.modalShow
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
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #fff;
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
				font-size: 27upx;
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
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #fff;

					a {
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #fff;
					}

					margin-bottom: 20upx;
				}

				p {
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #fff;
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
		color: #fff;
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
				font-size: 33upx;
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
				font-size: 24upx;
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
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	.container {
		.modalimage {
			width: 50upx;
			height: 50upx;
		}
	
		.modal-box {
			position: fixed;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0, 0, 0, 0.1);
			display: flex;
			align-items: center;
			justify-content: center;
		}
	
		.modal-content {
			background-color: #fff;
			width: 600upx;
			height: 600upx;
			border-radius: 10upx;
			position: relative;
	
			.bg {
				width: 100%;
				position: absolute;
				left: 0;
				top: 0;
				z-index: 0;
			}
	
			h1 {
				position: relative;
				z-index: 1;
				font-size: 43upx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #FDFAF9;
				height: 200upx;
				display: flex;
				align-items: center;
				justify-content: center;
				text-shadow: 0px 3px 3px rgba(46, 46, 46, 0.48);
			}
			h4{
				position: relative;
				z-index: 1;
				font-size: 43upx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #FDFAF9;
				height: 100upx;
				display: flex;
				align-items: center;
				justify-content: center;
				text-shadow: 0px 3px 3px rgba(46, 46, 46, 0.48);
			}
	
			.confirm-box {
				position: relative;
				z-index: 1;
				display: flex;
				background: #FFFFFF;
				box-shadow: 0px 8upx 22upx 2px rgba(67, 67, 67, 0.2);
				border-radius: 20upx;
				width: 500upx;
				height: 350upx;
				margin: 10upx auto;
				display: flex;
				flex-direction: column;
				align-items: center;
				
				a{
					width: 100%;
					height: 350upx;
					font-size: 20upx;
					p{
						display: flex;
						// justify-content: center;
						padding-top: 10upx;
						padding-left: 30upx;
						view{
							display: flex;
							// justify-content: center;
							width: 50%;
							
						};
					}
				}
				
				
				image {
					position: absolute;
					width: 100upx;
					height: 100upx;
					top: -30upx;
				}
	
				h2 {
					color: #666666;
					margin: 120upx auto 90upx;
					font-size: 36upx;
					font-weight: normal;
				}
				view{
					display: flex;
					
					view{
						display: flex;
						align-items: center;
						justify-content: center;
						// background-color: #F0AD4E;
						background-color: #f7f7f7;
						color: #F0AD4E;
						width: 140upx;
						// padding:0 20upx;
						height: 70upx;
						margin: 120upx auto 90upx;
						font-size: 18upx;
						// box-shadow: 0px 8upx 22upx 2px rgba(67, 67, 67, 0.2);
					}
					input{
						// box-shadow: 0px 8upx 22upx 2px rgba(67, 67, 67, 0.2);
						color: #666666;
						margin: 120upx auto 90upx;
						font-size: 30upx;
						font-weight: normal;
						width: 250upx;
						padding:0 20upx;
						height: 70upx;
						box-sizing: border-box;
						background-color: #f7f7f7;
					}
				}	

				// input{
					
				// 	color: #666666;
				// 	margin: 120upx auto 90upx;
				// 	font-size: 30upx;
				// 	font-weight: normal;
				// 	width: 250upx;
				// 	padding:0 20upx;
				// 	height: 70upx;
				// 	box-sizing: border-box;
				// 	// background-color: #f7f7f7;
				// }
	
				h3 {
					display: flex;
					align-items: center;
					justify-content: center;
	
					p {
						font-size: 27upx;
						color: #333;
						background: #F5F3F3;
						width: 200upx;
						border-radius: 5upx;
						text-align: center;
						line-height: 60upx;
					}
					p:last-child{
						background-color: #FAD6A8;
						margin-left: 50upx;
						
					}
				}
			}
		}
	}
</style>
