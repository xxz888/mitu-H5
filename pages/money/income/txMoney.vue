<template>
	<view class="container">
		<view class="header">
			<!-- <image src="https://daihuan.oss-cn-beijing.aliyuncs.com/shiming/roleCheck-bg%402x.png" class="bg-title"></image> -->
			<view class="header-title-common">
				<p @click="back" />
				<b>余额提现</b>
				<!-- <p @click="goHistory">历史记录</p> -->
			</view>
		</view>
		
		<view class="form-box" >
			<h1>
				<h2>
					<h3 class="hh" @click="sChoose(2)">
						<image v-if="txchoose==2" src="../../../static/images/r-h@2x.png"/>
						<image v-if="txchoose==1" src="../../../static/images/nochoose.png"/>
						<a>支付宝</a>
						<p v-if="payIdName=='请添加支付宝'" @click="gozfb(2)"><image src="../../../static/images/xg-card@2x.png"></image>添加</p>
						<p v-else @click="gozfb(1)"><image src="../../../static/images/edit@2x.png"></image>修改</p>
					</h3>
					<h3>
						<a class="aa">{{payIdName}}({{payId}})</a>
						<!-- <p @click="gozfb(2)"><image src="../../../static/images/edit@2x.png"></image>添加</p> -->
					</h3>
				</h2>
				<h2>
					<h3 class="hh" @click="sChoose(1)">
					<!-- 	<image v-if="txchoose==1" src="../../../static/images/nochoose.png"/>
						 -->
						<image v-if="txchoose==1" src="../../../static/images/r-h@2x.png"/>
						<image v-if="txchoose==2" src="../../../static/images/nochoose.png"/>
						<a>银行卡</a>
						<image class="image1" src="../../../static/images/yl-icon@2x.png"></image>
					</h3>
					<h3 @click="gocxCard">
						{{bankName}}{{cardNo}}
					</h3>

				</h2>
			</h1>
			
			<h4>
				提现金额 (元)
			</h4>
			<h5>
				<view>￥<input v-model="amount" placeholder="请输入金额"/></view>
				
			</h5>
			<view class="banner">可提余额<text style="color: #46c7a9;"> {{allMoney.currentBalance}} </text>元</view>
			
			
		</view>
		
		<view class="shuom">
			<view class="t">温馨提示：</view>
			<view>提现时间: 工作日09:00:00 - 18:00:00 </view>
			<view>提现规则: 需大于100元，2元/笔 支付宝秒到</view>
			<view>到账时间: 储蓄卡第二个工作日12:00前到账</view>
		</view>

		<view class="btn" @click="txMoney">
			确定提现
		</view>
		
		
		

		
		<view class="modal-box"  v-if="showhb" >
			<view class="modal-content">
				<image  src="/static/images/tanc/bg.png" class="bg" mode="widthFix" />
				<h1>提现成功</h1>
				<view class="confirm-box">
					<image class="modalimage" src="/static/images/tanc/sct.png" mode="widthFix"></image>
					<view>
						<!-- <input type="number" maxlength="6" v-model="smsCode" placeholder="请输入验证码" /> -->
						<view style="font-size: 56upx;">{{amount}}</view>
					</view>
		
					<h3>
						<p @click="showhb=!showhb">取消</p>
						<p @click="showhb=!showhb" >确定</p>
					</h3>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				txchoose:2,
				fullname:"落红",
				type:2,
				payId:"",
				allMoney:[],
				amount:"",
				oldAccount:"",
				payIdName:"",
				bankName:"立即绑卡",
				cardNo:"",
				sendPayId:"",
				sendCardNo:"",
				showhb:false
			};
		},
		onShow() {
			this.getAlipayLst()  //查询支付宝列表
			this.getMrCxCard()//获取默认信用卡
		},
		onLoad() {
			this.api_getUser()
			
			this.getallMoney()  //查询余额
		},


		methods:{
			truechongse(){
				this.showhb  = !this.showhb
				this.getallMoney()
			},
			sChoose(index){
				console.log("123")
				this.txchoose=index
			},
			back(){
				uni.navigateBack({
					
				})
			},
			gozfb(type){
				if(this.oldAccount=="oldAccount"){
					type = 2
				}
				uni.navigateTo({
					url:"zfbadd?type="+type
				})
			},
			noChoose(){
				uni.showToast({
					title:"暂不支持",
					icon:"none"
				})
			},
			gocxCard(){
				uni.navigateTo({
					url:"/pages/money/getMoneyOnline/depositCard"
				})
			},
			// 获取个人信息
			api_getUser(){
				let t = this
				let body = {
					id:uni.getStorageSync("users").id
				}
				this.$meapi.api_getUser(body).then(res=>{
					console.log("api_getUser成功",res)
					if(res.code==0){
						
							t.fullname = res.data.fullname
						
					
							
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
				
				}).catch(err=>{
					console.log("api_changeAlipay失败",err)
				
				})
			},
			//查询支付宝列表	api/user/alipay/list
			getAlipayLst(){
				let t = this
				let body = {}
				this.$meapi.api_getAlipayLst(body).then(res=>{
					console.log("支付宝列表获取成功",res)
					
					if(res.code==0){
							if(res.data.length==0){
								console.log("res.data.length",res.data.length)
								t.payIdName = "请添加支付宝"
								t.payId = ""
							}else{
								console.log("payIdName=======",res.data[0].fullname.substring(0,1)+"*")
								t.payIdName = res.data[0].fullname.substring(0,1)+"*"
								t.payId = res.data[0].payId.substring(0,3)+"****"+res.data[0].payId.substring(res.data[0].payId.length,res.data[0].payId.length-4)
								t.sendPayId = res.data[0].payId
							}
					}
				
				}).catch(err=>{
					console.log("获取支付宝失败",err)
				
				})
			},
			// 点击确认提现
			txMoney(){
				let t = this
				
				
				if(t.amount==''){
					uni.showToast({
						title:"请输入提现金额",
						icon:"none"
					})
					return
				}
				if(t.payId==''&&t.txchoose==2){
					uni.showToast({
						title:"未添加支付宝账号",
						icon:"none"
					})
					return
				}
				if(t.amount<100){
					uni.showToast({
						title:"最低提现金额为100元",
						icon:"none"
					})
					return
				}
				if(t.amount>t.allMoney.todayBalanceTotal||t.amount==''){
					uni.showToast({
						title:"余额不足",
						icon:"none"
					})
					return
				}
				

					let sendPayId = ""
					
				if(t.txchoose == 2){
					sendPayId = t.sendPayId
				}else{
					sendPayId = t.sendCardNo
				}
				console.log("payId===",sendPayId,t.sendPayId,t.sendCardNo)
				let body = {
					payId:sendPayId,//	账号，银行卡或支付宝
					amount:t.amount,//	提现金额
					type:t.txchoose,//		银行卡提现1	支付宝2		
				}
				this.$meapi.api_txMoney(body).then(res=>{
					console.log("api_txMoney成功",res)
					if(res.code==0){
						t.allMoney = res.data
						t.showhb = true
						// uni.showToast({
						// 	title:"提现成功"
						// })
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}

				}).catch(err=>{
					console.log("api_txMoney失败",err)
			
				})
			},
			// 获取余额
			getallMoney(){
				let t = this
				let body = {}
				this.$meapi.api_getallMoney(body).then(res=>{
					console.log("api_getallMoney成功",res)
					if(res.code==0){
						t.allMoney = res.data
						
					}else{
						uni.navigateTo({
							url:"/pages/login/login"
						})
					}
				}).catch(err=>{
					console.log("api_getallMoney失败",err)
			
				})
			},
			
			// 获取默认储蓄卡
			getMrCxCard(){
				let t = this
				let body = {}
				this.$api.api_getMrCxCard(body).then(res=>{
					console.log("api_getMrCxCard成功",res)
					if(res.code==0){
						t.sendCardNo = res.data.cardNo
						t.bankName = res.data.bankName.substring(0,1)+"**"+res.data.bankName.substring(res.data.bankName.length,res.data.bankName.length-1)
						t.cardNo = res.data.cardNo.substring(res.data.cardNo.length,res.data.cardNo.length-4)
					}else{
						t.bankName = "立即绑卡"
						t.cardNo = ""
					}
					
				}).catch(err=>{
					console.log("api_getMrCxCard失败",err)
				
				})
			},
			
			go(){
	
				uni.reLaunch({
					url:'/pages/index/index'
				})
			}
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
		height: 204upx;
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

	.form-box {
		// background: red;
		box-shadow: 0px 8upx 22upx 2upx rgba(67, 67, 67, 0.2);
		border-radius: 20upx;
		width: 690upx;
		margin: 20upx auto;
		// padding: 0 30upx;
		// height: 500upx;
		padding-bottom: 20upx;
		h1{
			
			width: 100%;
			height: 140upx;
			display: flex;
			color: white;
			h2{
				border-radius: 20upx;
				width: 325upx;
				margin: auto;
				height: 140upx;
				background-color: #46c7a9;
				font-size: 30upx;
				.hh{
					padding-top: 20upx;
					.image1{
						width: 49upx;
						height: 30upx;
					}
				}
				h3{
			
					
					// background-color: red;
					image{
						width: 36upx;
						height: 36upx;
						margin-right: 10upx;
					}
					width: 323upx;
					height: 65upx;
					
					display: flex;
					align-items: center;
					justify-content: center;
					p{
						display: flex;
						justify-content: center;
						align-items: center;
						
						image{
							width: 24upx;
							height: 21upx;
							margin-right: 10upx;
							margin-left: 10upx;
						}
						border: 3rpx solid white;
						font-size: 24upx;
						padding-right: 10upx;
					}
					a{
						font-size: 30upx;
						margin-left: 10upx;
						margin-right: 20upx;
						
						width: 110upx;
						
					}
					.aa{
						display: flex;
						margin-left:56upx ;
						font-size: 20upx;
						justify-content: center;
						// background-color: red;
						width: 300upx;
					}
					
				}
			}
		}
		
		h4{
			font-size: 28upx;
			margin-top: 30upx;
			margin-left: 42upx;
			padding-bottom: 10upx;
		}
		
		h5{
			border-top: 1rpx solid #E5E5E5;
			width: 100%;
			// height: 120upx;
			// background-color: red;
			view{
				// background-color: red;
				margin-left: 40upx;
				margin-top: 20upx;
				display: flex;
				// height: 120upx;
				font-size: 48upx;
				input{
					font-size: 40upx;
					margin-left: 10upx;
				}
			}
		}
		.banner{
			margin-top: 5upx;
			margin-left: 80upx;
			color: #999999;
			font-size: 28upx;
		}

	}

	
	.shuom{
		margin-left: 44upx;
		font-size: 24upx;
		margin-top: 40upx;
		color: #666666;
		view{
			margin-top: 10upx;
		}
		.t{
			color: white;
			font-size: 24upx;
		}
		margin-bottom: 40upx;
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
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: white;
		border-radius: 20upx;
	}
	
	
	
	
	
	.showBox {
		    display: flex;
		    width: 100%;
		    height: 100%;
		    justify-content: center;
		    align-items: center;
		    background: rgba(0,0,0,0.5);
		    position: fixed;
		    top: 0;
		    left: 0;
		    z-index: 20;
		}
		
		.showBox .inner {
		    display: flex;
		    width: 80%;
		    flex-direction: column;
		    background: #fff;
		    border-radius: 20rpx;
		    overflow: hidden;
		}
		
		.showBox .inner {
		    display: flex;
		    width: 80%;
		    flex-direction: column;
		    background: #fff;
		    border-radius: 20rpx;
		    overflow: hidden;
		}
		
		.showBox .center {
		    display: flex;
		    width: 60%;
		    flex-direction: column;
		    background: #fff;
		    border-radius: 20rpx;
		    overflow: hidden;
		}
		
		.showBox .center .showBoxContent {
		    display: flex;
		    width: 100%;
		    flex-direction: column;
		}
		
		.showBox .center .showBoxContent .bookmark {
		    width: 100%;
		}
		
		.showBox .center .btnLine {
		    display: flex;
		    width: 100%;
		    border-top: 1px solid #eee;
		}
		
		.showBox .center .btnLine button {
		    display: flex;
		    width: 100%;
		    height: 80rpx;
		    justify-content: center;
		    align-items: center;
		    color: #4390EA;
		    font-size: 28rpx;
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
