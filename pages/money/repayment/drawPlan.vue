<template>
	<view class="container">
		<view class="header">
			<!-- <image src="https://daihuan.oss-cn-beijing.aliyuncs.com/shiming/roleCheck-bg%402x.png" class="bg-title"></image> -->
			<view class="header-title-common">
				<p @click="back" />
				<b>制定计划</b>
			</view>
		</view>
		<view class="main-box">
			<view class="card-box">
				<image src="/static/images/card-bg1.png" class="card-bg"></image>
				<image :src="'../../../static/images/banklogo/BANK_'+ylhk_card.bankAcronym+'.png'" mode="widthFix" class="logo"></image>
				<h1>
						<b>
							{{ylhk_card.bankName}}（{{cardNo.substring(cardNo.length,cardNo.length-4)}}）
							
							<a  @click="gochangeplan">编辑</a>
						</b>
					<p>账单日 每月{{billDay}}日丨还款日每月{{repaymentDay}}日</p>
				</h1>
			</view>
			<view class="plan-part">
				<h2>
					{{vipLevel == 0 ? '您当前是普通用户：升级钻石1即可享受，还款金额万分之10的现金奖励。' :
					  vipLevel == 1 ? '您当前是钻石1：每还款一万，立返当前金额万分之10的现金。' :
				     vipLevel == 2 ? '您当前是钻石2：每还款一万，立返当前金额万分之17的现金。' :
				  	vipLevel == 3 ? '您当前是钻石3：每还款一万，立返当前金额万分之23的现金。' : ''
					
					}}
					
				</h2>
				<h1>
					<p>还款总金额(元)</p>
					<input @blur="budGetDay" type="number" v-model="amount" placeholder="还款总金额" />
					<image src="/static/images/edit@2x.png" mode="widthFix"></image>
				</h1>
				<h1>
					<p>卡余额(元)</p>
					<input @blur="budGetDay" type="number" v-model="reservedAmount" placeholder="信用卡可用余额" />
					<image src="/static/images/edit@2x.png" mode="widthFix"></image>
				</h1>

				<h2>
					注：卡余额为当前可用余额，卡余额越大，单笔还款金额越大,还款总次数
					越少，还款周期越短。
				</h2>
				<picker mode = "selector" @change="changeDayNumber" :range="numbers">
					<h3>
						<p>每日还款次数</p>
						<p>{{daynumber}}</p>
						<p />
					</h3>
				</picker>

				<view class="point-box">
					<h4>
						<p>是否去除小数点</p>
						<b>
							<a :class="selected1?'seled':''"  @click="(selected1=!selected1)" />
							是
							<a :class="!selected1?'seled':''"  @click="(selected1=!selected1)" />

							否
						</b>
					</h4>
					<b>注：去除小数点后，实际还款金额将略大于账单金额</b>
				</view>				
<!-- 				<pick-regions @getRegion="handleGetRegion">
					<h3>
						<p>消费地区</p>
						<p>{{area}}</p>
						<p />
					</h3>
				</pick-regions> -->
				<picker mode="selector"  @change="bindProvincesChange"  :range="arrayProvinces" :range-key="'name'">
					<h3>
						<p>选择省份</p>
						<p>{{provinces}}</p>
						<!-- <input type="text" placeholder="请输入卡号" /> -->
					</h3>
				</picker>
				<picker mode="selector"  @change="bindMarketChange"  :range="arrayMarket" :range-key="'name'">
					<h3>
						<p>选择市</p>
						<p>{{market}}</p>
						<!-- <input type="text" placeholder="请输入卡号" /> -->
					</h3>
				</picker>
				<h5>
					<a  :class="selected2?'seled':''" @click="(selected2=!selected2)" />
					默认日期顺序还款
					<a :class="!selected2?'seled':''" @click="(selected2=!selected2)"/>
					定制日期还款
				</h5>
				<h6  v-if="selected2" >
					<p>还款日期</p>
					
					<p >{{time1}}-{{yue}}/{{ylhk_card.repaymentDay}}</p>
				</h6>
				<h6 v-else @click="pickerTime = true">
					<p>还款日期</p>
					<p v-for="(item,index) in executeDate">{{item}}</p>
					
				</h6>



			</view>



		</view>
		<view class="btn" @click="planNewMake" style="margin-bottom: 50upx;">
			定制计划
		</view>
<!-- 		<view v-else class="btn"  style="margin-bottom: 50upx;">
			<text v-if="executeDate.length<last_days" style="font-size: 34upx;">最少选择日期不能低于{{last_days}}天</text>
			<text v-else style="font-size: 34upx;" @click="planNewMake">定制计划</text>
		</view> -->


<view class="btm-box" v-if="pickerTime" >
	<reserve-date
		@changeDay='changeDay' 
		@changeMonth='changeMonth' 
		:startDate='startDate' 
		:isNowDate='isNowDate'
		:disableBefore='disableBefore' 
		:endDate='endDate' 
		:singleElection='singleElection' 
		:pickerTime.sync='pickerTime'
		:date='date'
		
	/>
</view>

	</view>
</template>

<script>
	import pickRegions from '@/components/pick-regions/pick-regions.vue'
	import reserveDate from '@/components/reserve-date/reserve-date.vue'
	export default {
		data() {
			return {
				ylhk_card:[],
				pickerTime:false,
				area: "请选择消费地区",
				selected1: true,
				selected2: true,
				date: '',
				provinces:"请选择省份",
				market:"请选择市",
				cityCode:"",
				arrayProvinces:[],
				arrayMarket:[],
				price: {
					type: true,
					data: []
				},
				isNowDate: true,
				disableBefore: false ,
				endDate: '',
				startDate: '2021-12-13',
				singleElection: false,				
				userId:"",//	用户id
				amount:"",//			还款金额
				reservedAmount:"",//		卡余额
				executeDate:["选择日期"],//		执行日期数组格式yyyy-mm-dd
				tureExecuteDate:"",
				dayRepaymentCount:1,//		每日还款次数
				provinceCode:"",//			省编码
				cityCode:"",//		城市编码	
				
				area: "请选择地区",
				numbers:["1次","2次","3次","4次"],
				daynumber:"1次",
				time1:"",
				time2:"",
				days:10,
				yue:0,
				cardId:"",
				billDay:"",
				repaymentDay:"",
				cardNo:"",
				last_days:0,
				vipLevel:0
			};
		},
		components: {
			pickRegions,
			reserveDate
		},
		onShow() {				
			this.ylhk_card = uni.getStorageSync("ylhk_card")
			this.time1 = this.$dataTime.dateTimeStr('m/d',0)
			let r = this.$dataTime.dateTimeStr('d',0)
			
			if(r>this.ylhk_card.repaymentDay){
				this.yue = this.$dataTime.dateTimeStr('m',30)
			}else{
				this.yue = this.$dataTime.dateTimeStr('m',0)
			}
			
			
			this.date = this.$dataTime.dateTimeStr('y-m-d',0)
			// console.log(this.$dataTime.dateTimeStr('m/d',10))
			if(this.cardId!=''){
				this.getcard(this.cardId);
			}

		},
		onLoad(e) {
			let t = this
			this.getcard(e.id)
			this.cardId = e.id
			this.getProvinces()//获取省份
			//this.orCard()//检查是否需要绑卡
			this.api_getUser();

		},
		methods: {

			getcard(id){
				let body ={
					id:id,
					empowerToken:getApp().globalData.xjToken
				},t=this
				this.$api.api_xyCard(body).then(res=>{
					console.log("api_xyCard成功",res.data)
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
			// 余额还款-制定计划/api/credit/create/plan/new
			planNewMake(){
				let t = this
				console.log(t.provinceCode,getApp().globalData.brandId,uni.getStorageSync("users").id)
				console.log(t.cityCode,t.dayRepaymentCount,t.ylhk_card.cardNo)
				if(t.amount==""||t.reservedAmount==""||t.provinceCode==""||t.cityCode==""){
					uni.showToast({
						title:"请先完善信息",
						icon:"none"
					})
					return
				}
				uni.showLoading({
					title:"定制中...",
					mask: true
				})
				let body=[]
				if(t.selected2){
					 body = {
						userId:uni.getStorageSync("users").id,//	用户id
						creditCardNumber:t.ylhk_card.cardNo,//	信用卡号
						amount:t.amount,//		还款金额
						reservedAmount:t.reservedAmount,//卡余额
						brandId:getApp().globalData.brandId,//	品牌商id
						 
						notPoint:t.selected1,//	是否去除小数点
						dayRepaymentCount:t.dayRepaymentCount,//每日还款次数
						provinceCode:t.cityCode,//	省编码
						cityCode:t.provinceCode,//城市编码	
						
					}
				}else{
					 body = {
						userId:uni.getStorageSync("users").id,//	用户id
						creditCardNumber:t.ylhk_card.cardNo,//	信用卡号
						amount:t.amount,//		还款金额
						reservedAmount:t.reservedAmount,//卡余额
						brandId:getApp().globalData.brandId,//	品牌商id
						executeDate:t.tureExecuteDate,//	执行日期数组格式yyyy-mm-dd
						notPoint:t.selected1,//	是否去除小数点
						dayRepaymentCount:t.dayRepaymentCount,//每日还款次数
						provinceCode:t.cityCode,//	省编码
						cityCode:t.provinceCode,//城市编码	
						
					}
				}

				// console.log("executeDate======================",executeDate)
				// return

				this.$api.api_planNewMake(body).then(res=>{
					uni.hideLoading()
					console.log("api_planNewMake成功",res)
					if(res.code == 0){
						uni.setStorageSync("newPlans",res.data)
						uni.navigateTo({
							url:"newPlan?type=goNewPlan"
						})
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
					
				}).catch(err=>{
					uni.hideLoading()
					console.log("api_planNewMake失败",err)
			
				})
			},
			// 获取省份
			getProvinces(){
				let t = this
				let body = {}
				this.$api.api_getProvinces(body).then(res=>{
					console.log("api_getProvinces成功",res)
					if(res.code==0){
						t.arrayProvinces = res.data
					}
				}).catch(err=>{
					console.log("api_getProvinces失败",err)
				
				})
			},
			// 选择省份
			bindProvincesChange(e){
				
				this.provinces =this.arrayProvinces[e.detail.value].name 
				let parent = this.arrayProvinces[e.detail.value].id
				this.getMarket(parent)
			},
			// 获取市
			getMarket(parent){
				let t = this
				console.log("parent=",parent)
				
				let body = {
					parent:parent,	//父级省份id
					// channelId:t.id	//选填参数，通道id
				}
				this.$api.api_getMarket(body).then(res=>{
					console.log("api_getMarket成功",res)
					if(res.code == 0){
						t.arrayMarket = res.data
					}
				}).catch(err=>{
					console.log("api_getMarket失败",err)
				
				})
			},
			// 选择市
			bindMarketChange(e){
				this.market =this.arrayMarket[e.detail.value].name 
				this.cityCode =this.arrayMarket[e.detail.value].parent 
				this.provinceCode = this.arrayMarket[e.detail.value].id //城市编码
			},
			changeDay(e){
				
				console.log("e=================",e[0].date)
				
				let executeDate = []
				let tureExecuteDate = []
				for(let i=0;i<e.length;i++){
					let day = e[i].date.split('-')
					let a = day[1]+"/"+day[2]
					executeDate.push(a)
					tureExecuteDate.push(e[i].date)
				}
				this.executeDate = executeDate
				console.log("executeDate============",executeDate)
				this.tureExecuteDate = tureExecuteDate
			},
			changeMonth(e){
				console.log(e)
			},			
			

			
			// 查询计划所需最少天数/api/credit/budget/day
			budGetDay(){
				let t = this
				let body = {
					 creditCardNumber:t.ylhk_card.cardNo,//	信用卡号
					//creditCardNumber:"6226020034824113",
					amount:t.amount,//		还款金额
					reservedAmount:t.reservedAmount,//卡余额
					 dayRepaymentCount:t.dayRepaymentCount,//每日还款次数	
					//dayRepaymentCount:t.day,//每日还款次数	
				}
				this.$api.api_budGetDay(body).then(res=>{
					console.log("api_budGetDay成功",res)
					if(res.code==0){
						t.last_days = res.data
						uni.setStorageSync("last_day",res.data)
						// t.time2 = this.$dataTime.dateTimeStr('m/d',res.data)
					}
				}).catch(err=>{
					console.log("api_budGetDay失败",err)
				
				})
			},
			// 检验是否绑卡
			orCard(){
				let t = this
				let body = {
					cardNo:"6226020034804113"
				}
				this.$api.api_orCard(body).then(res=>{
					console.log("api_orCard成功",res)
				}).catch(err=>{
					console.log("api_orCard失败",err)
			
				})
			},
			gochangeplan(){
				let t = this
				uni.navigateTo({
					url:"/pages/card/modifiesxy_card?id="+this.cardId
				})
			},
			goNewPlan(){
				uni.navigateTo({
					url:"newPlan?type=goNewPlan"
				})
			},
			
			back() {
				uni.navigateBack()
			},
			changeDayNumber(e){
				
				this.daynumber = this.numbers[e.target.value]
				console.log("选择每日还款次数",this.numbers[e.target.value])
				this.dayRepaymentCount = e.target.value+1
				console.log("选择每日还款次数",e.target.value+1)
				this.budGetDay()
			},
			// 获取选择的地区
			handleGetRegion(area) {
				console.log(area)
				this.area = `${area[0].name}${area[1].name}`
			},
			api_getUser(){
						let t = this
						let body = {
							id:uni.getStorageSync("users").id
						}
						this.$meapi.api_getUser(body).then(res=>{
							console.log("个人中心获取个人资料成功",res.data.fullname,res.data.id,res.data)
							if(res.code==0){
									t.vipLevel = res.data.vipLevel
							}
						
						}).catch(err=>{
							console.log("api_changeAlipay失败",err)
						})
					},
			
		}
	}
</script>

<style lang="scss">
	.btm-box{
		position: fixed;
		bottom: 0;
		width: 100%;
		left: 0;
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
				font-size: 28upx;
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

		.card-box {
			display: flex;
			position: relative;
			height: 159upx;
			box-shadow: 0px 8upx 22upx 2upx rgba(67, 67, 67, 0.13);
			border-radius: 20upx;
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
				color: white;
				b {
					display: flex;
					justify-content: space-between;
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: bold;
					// color: #F7CF9E;

					a {
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						// color: #F7CF9E;
					}

					margin-bottom: 20upx;
				}

				p {
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 500;
					// color: #F7CF9E;
				}
			}
		}
	}

	.plan-part {
		width: 690upx;
		margin: 0 auto;
		background: #FFFFFF;
		margin-top: 30upx;
		padding: 0 20upx;
		box-shadow: 0px 8upx 22upx 2upx rgba(67, 67, 67, 0.13);
		border-radius: 20upx;
		padding-bottom: 30upx;

		input {
			font-size: 27upx;
			font-family: PingFang SC;
			font-weight: 500;
		}

		h1 {
			font-size: 27upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			display: flex;
			padding: 20upx 0;
			border-bottom: 1upx solid #e1e1e1;

			input {
				text-align: right;
				flex: 1;
				margin-left: 80upx;
				margin-left: auto;
			}

			image {
				width: 20upx;
				margin-left: 20upx;
			}
		}

		h2 {
			background: #e3fff7;
			border-radius: 10upx;
			font-size: 22upx;
			font-family: PingFang SC;
			font-weight: 500;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 10upx;
			color: #666666;
			margin: 20upx 0;
			line-height: 30upx;
		}

		h3 {
			font-size: 25upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999999;
			display: flex;
			padding: 25upx 0;
			align-items: center;
			border-bottom: 1upx solid #e1e1e1;

			p:nth-child(2) {
				margin-left: auto;
			}

			p:last-child {
				// transform: rotate(45deg);
				// border-top: 5upx solid #dcdcdc;
				// border-right: 5upx solid #dcdcdc;
				// width: 15upx;
				// height: 15upx;
			}
		}

		.point-box {
			padding: 20upx 0;
			border-bottom: 1upx solid #e1e1e1;

			h4 {
				font-size: 25upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				display: flex;
				align-items: center;
				justify-content: space-between;

				b {
					display: flex;
					margin-left: auto;
					margin: 0;
					padding: 0;
					align-items: center;

					a {
						box-sizing: border-box;
						width: 25upx;
						height: 25upx;
						border-radius: 50upx;
						border: 5upx solid #999;
						background-color: none;

						margin-left: 40upx;
						margin-right: 20upx;
					}

					.seled {
						background-color: #46c7a9;
						border: 5upx solid #41b99d;
					}
				}


			}

			b {
				font-size: 22upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #666666;
				margin-top: 20upx;
				display: block;
			}

		}



		h5 {

			display: flex;
			align-items: center;
			padding: 20upx 0;
			color: #888;
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #666666;
			a {
				box-sizing: border-box;
				width: 25upx;
				height: 25upx;
				border-radius: 50upx;
				border: 5upx solid #999;
				background-color: none;
				margin-right: 20upx;
				margin-left: auto;
			}
			a:first-child{
				margin-left: 0;
			}
			

			.seled {
				background-color: #46c7a9;
				border: 5upx solid #2d816d;
			}
		}

		h6 {
			background: #e3fff7;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20upx;
			font-size: 22upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #666666;
			margin-bottom: 20upx;
			border-radius: 10upx;

		}
	}

	.btn {
		height: 86upx;
		width: 660upx;
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
		border-radius: 20upx;
		text{
			font-size: 34upx;
			font-family: PingFang SC;
			font-weight: bold;
		}
	}
</style>