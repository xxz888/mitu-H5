<template>
	<view class="container">
		<view class="header">
			<!-- <image src="https://daihuan.oss-cn-beijing.aliyuncs.com/shiming/roleCheck-bg%402x.png" class="bg-title"></image> -->
			<view class="header-title-common">
				<p @click="back" />
				<b>支付确认</b>
			</view>
		</view>
		<h1>
			信息加密处理，仅用于银行卡验证，请验证您本人的银行卡
		</h1>
		<view class="form-box">
			<h2>
				<p>持卡人</p>
				<p>{{userName}}</p>
			</h2>
			<h2>
				<p>卡号</p>
				<input type="number" :value="bankCard" disabled placeholder="请输入卡号" />
			</h2>
			<!-- <picker mode="date"> -->
				<h2>
					<p>有效期</p>
					<!-- <p>请选择有效期</p> -->
					<input type="number" :value="expiredTime" disabled  placeholder="请输入有效期" />
				</h2>
			<!-- </picker> -->
			<h2>
				<p>安全码</p>
				<input  type="number" :value="securityCode" disabled  placeholder="请输入安全码" />
			</h2>
			
			<picker v-if="needCity" mode="selector"  @change="bindProvincesChange"  :range="arrayProvinces" :range-key="'name'">
				<h2>
					<p>选择省份</p>
					<p>{{provinces}}</p>
					<!-- <input type="text" placeholder="请输入卡号" /> -->
				</h2>
			</picker>
			<picker v-if="needCity" mode="selector"  @change="bindMarketChange"  :range="arrayMarket" :range-key="'name'">
				<h2>
					<p>选择市</p>
					<p>{{market}}</p>
					<!-- <input type="text" placeholder="请输入卡号" /> -->
				</h2>
			</picker>

			<h2 v-if="needCode">
				<p>验证码</p>
				<input type="number" v-model="codes" maxlength="6" style="text-align: center;" placeholder="请输入验证码" />
				<view class="code">
					<b :class="preventClickCode?'prevent':''" @click="sendcode">{{codeDesc}}</b>
				</view>
			</h2>

		</view>
		<view class="btn" @click="tureApply">
			确定支付
		</view>


		<view class="modal" v-if="modalShow" >
			<view class="modal-content" >
				<view class="modal-text">
					<image src="../../../static/images/payCard@2x.png" class="card-icon" mode="widthFix"></image>
				<!-- 	<a v-if="s==0">交易成功</a>
					<a v-if="s==1">交易失败</a>
					<a v-if="s==2">交易中</a> -->
					<a>{{shownamestatus}}</a>
					<p>￥{{showmoney}}</p>
					<b @click="goIndex">确定</b>
				</view>
				<image src="https://daihuan.oss-cn-beijing.aliyuncs.com/loginImg/paySbg%402x.png" class="m-bg"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shownamestatus:"",
				// userName:uni.getStorageSync("users").fullName,
				bankCard:"",
				bankPhone:"",
				securityCode:"",
				expiredTime:"",
				userName:"",
				idCard:"",
				bankName:"",
				id:"",
				s:"",
				codes:"",
				payStatus:"交易中",
				modalShow: false,
				provinces:"请选择省份",
				market:"请选择市",
				cityCode:"",
				arrayProvinces:[{
						"id": 110000,
						"level": 1,
						"name": "北京",
						"parent": 100000
					}],
				arrayMarket:[{
					id:"id",//			城市编码
					parent:"parent",//			省份编码
					name:"温州市",//			名称
					level:"level",//				等级
					}],
				validateCode: '',
				codeDesc: "获取验证码",
				preventClickCode: false,
				area: "请选择地区",
				needCity:false,
				needCode:false,
				orderCode:"",
				showmoney:"",
				cxCard:""
			};
		},
		onShow() {
			let xyCard = uni.getStorageSync("xyCard")			
			this.bankCard=xyCard.cardNo//	信用卡卡号
			this.bankPhone=xyCard.phone//	信用卡手机号
			this.securityCode=xyCard.securityCode//	安全码
			this.expiredTime=xyCard.expiredTime//	过期时间 例0101
			this.userName=xyCard.fullname,//	用户姓名
			this.idCard=xyCard.idCard,//	身份证号
			this.bankName = xyCard.bankName
			this.getProvinces()
			this.getMrCxCard()
		},
		onLoad(e) {
			this.id =e.id
			this.needCity = e.needCity	
			this.needCode= e.needCode
			// this.getalLfastQuery("2","123456")
			this.showmoney =uni.getStorageSync("amount")
		},
		methods: {
			// 获取交易状态api/payment/fast/query
			getalLfastQuery(channelId,orderCode){
				let t = this
				let body = {
					channelId:t.id,
					orderCode:t.orderCode
					// channelId:2,
					// orderCode:"20211202110335755726"
				}
				this.$api.api_getalLfastQuery(body).then(res=>{
					console.log("获取交易状态成功",res)
					if(res.code==0){
						//t.arrayProvinces = res.data
						t.s = res.data.code
					}
				}).catch(err=>{
					console.log("api_getProvinces失败",err)
				
				})
			},
			
			// 获取省份
			getProvinces(){
				let t = this
				let body = {
					id:t.id
				}
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
				this.parent = this.arrayProvinces[e.detail.value].id
				this.getMarket()
			},
			// 获取省份
			getMarket(){
				let t = this
				console.log("parent=",t.parent)
				console.log("id=",t.id)
				let body = {
					parent:t.parent,	//父级省份id
					channelId:t.id	//选填参数，通道id
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
				console.log("market=====id=",this.arrayMarket[e.detail.value].id)
				console.log("market====parent==",this.arrayMarket[e.detail.value].parent)
				this.cityCode =this.arrayMarket[e.detail.value].parent 
				this.provinceCode = this.arrayMarket[e.detail.value].id //城市编码
			},
			
			//获取默认储蓄卡信息
			// 获取默认储蓄卡
			getMrCxCard(){
				let t = this
				let body = {}
				this.$api.api_getMrCxCard(body).then(res=>{
					console.log("api_getMrCxCard成功",res)
					if(res.code==0){
						t.cxCard = res.data
						console.log("res.data ---------",res.data)
					}
				}).catch(err=>{
					console.log("api_getMrCxCard失败",err)
				
				})
			},
			
			
			// 刷卡 /api/payment/fast/apply
			fastApply(){
				let t = this
				uni.showLoading({
					title:"发送中...",
					mask:true
				})
				if(t.preventClickCode){
						return
				}
				t.preventClickCode = true
				let body = {
					channelId:t.id,//	通道id
					amount:uni.getStorageSync("amount"),//		刷卡金额，单位元
					loginPhone:uni.getStorageSync("users").username,//	登录手机号
					bankName:t.bankName,//	信用卡名称
					bankCard:t.bankCard,//	信用卡卡号
					bankPhone:t.bankPhone,//	信用卡手机号
					securityCode:t.securityCode,//	安全码
					expiredTime:t.expiredTime,//	有效期
					userName:t.userName,//	用户姓名
					idCard:t.idCard,//		身份证号
					// cityCode:t.cityCode,//		城市编码	
					provinceCode:t.provinceCode,
					cityCode:t.provinceCode,//		城市编码
					provinceCode:t.cityCode,
					debitBankName: t.cxCard.bankName,
					debitBankCard: t.cxCard.cardNo,
					debitPhone: t.cxCard.phone,
				}
				
				this.$api.api_fastApply(body).then(res=>{
					uni.hideLoading()
					console.log("api_fastApply成功",res)
					if(res.code==0){
						t.orderCode = res.data 
						
						uni.showToast({
							title: '验证码已经发送'
						})
						let time = 60
						let timer = setInterval(() => {
							if (time > 0) {
								time--
								t.codeDesc = `${time}s`
							} else {
								t.codeDesc = `获取验证码`
								t.preventClickCode = false
								clearInterval(timer)
							}
						}, 1000)
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
				}).catch(err=>{
					console.log("api_fastApply失败",err)
				
				})
			},
			// 调用成功后调用查询
			getstats(){
				console.log("刷卡成功后调用，====")
				let t = this
				let body={
					channelId:t.id,
					orderCode:t.orderCode,
				}
				this.$api.api_showtureApply(body).then(res=>{
					console.log("刷卡成功后调用===================成功",res)
						if(res.code==0){
							t.shownamestatus="交易成功"
						}else if(res.code==1){
							t.shownamestatus="交易失败"
						}else{
							t.shownamestatus="处理中"
						}
						t.modalShow=true
					
				}).catch(err=>{
					console.log("api_tureApply失败",err)
				
				})
			},
			// 确认刷卡
			tureApply(){
				let t = this
				let body = {
					orderCode:t.orderCode,
					channelId:t.id,//	通道id
					idCard:t.idCard,//		身份证号
					smsCode:t.codes
				}
				this.$api.api_tureApply(body).then(res=>{
					console.log("确认刷卡成功=====================================",res)
					// if(res.code==0){
						
						t.getstats()
					// }
				}).catch(err=>{
					console.log("api_tureApply失败",err)
				
				})
			},
			back() {
				uni.navigateBack()
			},
			
			showpayloading(){
				this.modalShow = true
				this.payStatus = `交易中`
				// this.fastApply()
			},
			goIndex(){
				console.log("点击跳转")
				uni.reLaunch({
					url:"/pages/money/getMoneyOnline"
				})
			},
			sendcode(){
				let t = this
				t.fastApply()
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
				color: #fff;
				position: absolute;
				right: 0;
			}
		}
	}

	h1 {
		font-size: 23upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		height: 80upx;
		// background: linear-gradient(269deg, #D79F65 0%, #FDD8AA 100%);
		background-color: #e3fff7;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.form-box {
		background: #FFFFFF;
		box-shadow: 0px 8upx 22upx 2upx rgba(67, 67, 67, 0.2);
		border-radius: 20upx;
		width: 690upx;
		margin: 60upx auto;
		padding: 0 30upx;

		h2 {
			display: flex;
			align-items: center;
			justify-content: space-between;

			input {
				text-align: right;
				font-size: 24upx;
			}

			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #666666;

			p:last-child {
				color: #888;
				font-size: 24upx;
			}

			padding: 30upx 0;
			border-bottom: 1upx solid #e1e1e1;
		}
	}

	.code {
		b {
			margin-left: auto;
			width: 180upx;
			line-height: 100%;
			display: flex;
			font-size: 24upx;
			align-items: center;
			justify-content: center;
			height: 100%;
			text-align: center;
			font-weight: normal;
			color: #46c7a9;
		}

		.prevent {
			pointer-events: none;
			color: #999 !important;
		}
	}

	.btn {
		height: 86upx;
		width: 660upx;
		margin: 100upx auto;
		// background: linear-gradient(269deg, #D79F65 0%, #FDD8AA 100%);
		background-color: #46c7a9;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #fff;
		border-radius: 20upx;
	}


	.modal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(0, 0, 0, 0.5);
		z-index: 9;
		border: 10upx solid #F1F1F1;
		


		.modal-content {
			width: 690upx;
			border-radius: 20upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;
			overflow: hidden;
			padding: 40upx 0;
			border: 10upx solid #F1F1F1;
			.modal-text {
				position: relative;
				z-index: 19;
				display: flex;
				flex-direction: column;
				align-items: center;
			}

			.m-bg {
				position: absolute;
				z-index: 10;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}

			.card-icon {
				width: 110upx;
				margin-bottom: 10upx;
			}

			a {
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #F4CA99;
				display: flex;
				margin-bottom: 10upx;
			}

			p {
				font-size: 50upx;
				font-family: DIN;
				font-weight: bold;
				color: #F4CA99;
				display: flex;
				margin-bottom: 20upx;
			}

			b {
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 5upx 30upx;
				border-radius: 5upx;
				background: #F4CA99;
				font-size: 20upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #252527;
			}

		}
	}
</style>
