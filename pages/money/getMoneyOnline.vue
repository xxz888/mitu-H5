<template>
	<view class="container">
		<view class="header" >
			<image src="" class="bg-title"></image>
			<view class="header-title-common">
				<p @click="back" />
				<b>在线收款</b>
				
				<!-- <p  @click="goHistory">历史记录</p> -->
				<!-- #ifdef MP -->
				<p style="padding-top: 150upx;" @click="goHistory">历史记录</p>
				<!-- #endif -->
			</view>
		</view>
		<view class="shadow-box">
			<h1>
				<image src="/static/images/yl-icon@2x.png" mode="widthFix"></image>
				请输入金额（元）
			</h1>
			<view class="money-box">
				<h2>
					<p>￥</p>
					<input type="text" @focus="keyboardShow = true" v-model="amount" placeholder="请输入金额（元）" />
				</h2>
				<view class="money-tips">
					<h3>
						<p>限额</p>
						<p>2万元/笔</p>
					</h3>
					<h3>
						<p>费率</p>
						<p>0.60%+3元/笔</p>
					</h3>
					<h3>
						<p>结算</p>
						<p>10秒到账</p>
					</h3>
				</view>
			</view>
			<h4>
				<b>支付信用卡：</b>
				<image :src="'../../static/images/banklogo/BANK_'+xyCard.bankAcronym+'.png'" mode="widthFix"></image>
			
				<p >{{xyCard.bankName}}({{xyCard.cardNo.substring(xyCard.cardNo.length,xyCard.cardNo.length-4)}})</p>
				
				<p @click="select(0)">更换</p>
				<a @click="select(0)"/>
			</h4>
			<h4>
				<b>到账储蓄卡：</b>
				<image :src="'../../static/images/banklogo/BANK_'+cxCard.bankAcronym+'.png'" mode="widthFix"></image>
				<p >{{cxCard.bankName}}({{cxCard.cardNo.substring(cxCard.cardNo.length,cxCard.cardNo.length-4)}})</p>
				
				<p @click="select(1)">更换</p>
				<a  @click="select(1)"/>
			</h4>
		</view>
<!-- 		<view class="btn" @click="sel">
			立即收款
		</view> -->
		
		<view class="keyboard" v-if="keyboardShow">
			<p v-for="(item,index) in 10" :key="index" @click="number(index)">
				{{index}}
			</p>
			<b @click="keyboardShow = false">收起</b>
			<a @click="addPoint">·</a>
			<view class="del" @click="del">
				删除
			</view>
			<view class="btn" @click="sel">
				立即
				<br />
				收款
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				xyCard:{cardNo:"",bankName:"未绑定信用卡"},
				cxCard:{cardNo:"",bankName:"未绑定储蓄卡"},
				amount:"",
				keyboardShow: true,
			}
		},
		onShow() {
			this.getMrXyCard()
			this.getMrCxCard()
		},
		onLoad() {
			// this.getMrXyCard()
			// this.getMrCxCard()
		},
		mounted() {
		this.colseTime = setInterval(function(){
				uni.hideKeyboard()
			},10)
		},
		onHide(){
			clearInterval(this.colseTime)
			console.log("页面卸载onHide")
		}, 
		
		onUnload(){
			clearInterval(this.colseTime)
			console.log("页面卸载onHide")
		}, 
		methods: {
			number(index) {
				this.amount = `${ this.amount }${ index }`
			},
			addPoint() {
				
				this.amount = `${ this.amount }.`
			},
			del() {
				this.amount = this.amount.substring(0, this.amount.length - 1)
			},
			back() {
				uni.navigateBack()
			},
			
			// 获取默认信用卡
			getMrXyCard(){
				let t = this
				let body = {}
				this.$api.api_getMrXyCard(body).then(res=>{
					console.log("获取默认信用卡成功",res)
					if(res.code==0){
						t.xyCard = res.data
						
						uni.setStorageSync("xyCard",res.data)||[]
						console.log("")
					}else if(res.code==5){
						uni.navigateBack({
							
						})
					}
					
				}).catch(err=>{
					console.log("api_getMrXyCard失败",err)
				
				})
			},
			// 获取默认储蓄卡
			getMrCxCard(){
				let t = this
				let body = {}
				this.$api.api_getMrCxCard(body).then(res=>{
					console.log("api_getMrCxCard成功",res.data.id)
					if(res.code==0&&res.data.id){
						t.cxCard = res.data
						
						uni.setStorageSync("cxCard",res.data)||[]
					}else {
						uni.showModal({
							title:"未绑定储蓄卡",
							content:"立即去绑定",
							success(res) {
								if(res.confirm){
									uni.navigateTo({
										url:"/pages/card/debit_add"
									})
								}else{
									uni.navigateBack({
										
									})
								}
							}
						})
					}
				}).catch(err=>{
					console.log("api_getMrCxCard失败",err)
				
				})
			},
			
			// 更换跳转
			select(e) {
				if(e){
					uni.navigateTo({
						url: 'getMoneyOnline/depositCard'
					})
				}else{
					uni.navigateTo({
						url: 'getMoneyOnline/creditCardList'
					})
				}

			},
			// 历史记录
			goHistory() {
				uni.navigateTo({
					url: 'getMoneyOnline/tradeHistoryList'
				})
			},
			sel(type){
					if(this.amount<100){
						uni.showToast({
							title:"请输入金额",
							icon:"none"
						})
						return
					}	
					if(this.xyCard.bankName=="未绑定信用卡"){
						uni.showToast({
							title:"未绑定信用卡",
							icon:"none"
						})
						return
					}
					if(this.xyCard.bankName=="未绑定储蓄卡"){
						uni.showToast({
							title:"未绑定储蓄卡",
							icon:"none"
						})
						return
					}
					uni.navigateTo({
						url: '/pages/money/getMoneyOnline/selectPayWay?bankName='+this.xyCard.bankName+"&debitBankName="+this.cxCard.bankName+"&amount="+this.amount
					})
				
			}
		}
	}
</script>

<style lang="scss">
	.bg-title {
		width: 100%;
		height: 300upx;
		position: absolute;
		left: 0;
		top: 0;
		z-index: -1;
		background-color: #46c7a9;
	}

	.header {
		width: 100%;
		position: relative;
		padding: 30upx;
		padding-top: calc(var(--status-bar-height) + 30upx);
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

	.shadow-box {
		margin: 50upx auto;
		width: 690upx;
		height: 484upx;
		background: #FFFFFF;
		box-shadow: 0px 8upx 22upx 2upx rgba(67, 67, 67, 0.13);
		border-radius: 20upx;
		padding: 21upx 36upx;

		h1 {
			display: flex;
			align-items: center;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #666666;

			image {
				width: 60upx;
				margin-right: 20upx;
			}
		}

		.money-box {
			background: #F6F6F4;
			border-radius: 11upx;
			padding: 16upx;
			margin: 20upx 0;
			border-radius: 10upx;

			h2 {
				display: flex;
				align-items: center;
				border-bottom: 1upx solid #e1e1e1;
				padding-bottom: 16upx;

				p {
					font-size: 60upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
					margin-right: 20upx;
				}

				input {
					flex: 1;
					font-size: 45upx;
					font-family: PingFang SC;
					font-weight: 500;
				}
			}
		}
	}

	.money-tips {
		display: flex;
		align-items: center;
		justify-content: space-around;

		h3 {
			flex: 1;
			text-align: center;
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #46c7a9;
			margin-top: 16upx;
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: center;
			position: relative;
		}

		h3:nth-child(2)::after {
			content: '';
			width: 1upx;
			height: 20upx;
			background: #BFBFBF;
			position: absolute;
			left: 0;
		}

		h3:nth-child(2)::before {
			content: '';
			width: 1upx;
			height: 20upx;
			background: #BFBFBF;
			position: absolute;
			right: 0;
		}

	}

	h4 {
		display: flex;
		align-items: center;
		padding: 20upx 0;

		b {
			font-size: 27upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #666666;
		}

		image {
			width: 40upx;
			margin: 0 20upx;
		}

		p {
			font-size: 26upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
		}

		p:nth-child(4) {
			margin-left: auto;
			font-size: 23upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999999;
		}

		a {
			transform: rotate(45deg);
			border-top: 5upx solid #999999;
			border-right: 5upx solid #999999;
			width: 13upx;
			height: 13upx;
		}
	}

	// .btn {
	// 	height: 86upx;
	// 	width: 660upx;
	// 	margin: 160upx auto;
	// 	background: linear-gradient(269deg, #D79F65 0%, #FDD8AA 100%);
	// 	display: flex;
	// 	align-items: center;
	// 	justify-content: center;
	// 	font-size: 30upx;
	// 	font-family: PingFang SC;
	// 	font-weight: bold;
	// 	color: #333333;
	// 	border-radius: 20upx;
	// }
	
	
	
	.keyboard {
		width: 100%;
		height: 467upx;
		position: fixed;
		bottom: 0;
		left: 0;
		border-top: 1upx solid #E5E5E5;
	
		p,
		b,
		a,
		.del,
		.btn {
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
		}
	
		p,
		b,
		a {
			width: 185upx;
			height: 119upx;
			border-right: 1upx solid #E5E5E5;
			border-bottom: 1upx solid #E5E5E5;
			font-size: 48upx;
			font-family: DIN;
			font-weight: bold;
			color: #333333;
		}
	
		p:nth-child(1) {
			bottom: 0;
			left: 184upx;
		}
	
		p:nth-child(2) {
			top: 0;
			left: 0;
		}
	
		p:nth-child(3) {
			top: 0;
			left: 184upx;
		}
	
		p:nth-child(4) {
			top: 0;
			left: calc(184upx * 2);
		}
	
		p:nth-child(5) {
			top: 119upx;
			left: 0;
		}
	
		p:nth-child(6) {
			top: 119upx;
			left: 184upx;
		}
	
		p:nth-child(7) {
			top: 119upx;
			left: calc(184upx * 2);
		}
	
		p:nth-child(8) {
			top: calc(119upx * 2);
			left: 0;
		}
	
		p:nth-child(9) {
			top: calc(119upx * 2);
			left: 184upx;
		}
	
		p:nth-child(10) {
			top: calc(119upx * 2);
			left: calc(184upx * 2);
		}
	
		b {
			font-size: 30upx !important;
			font-family: PingFang SC;
			font-weight: 500;
			color: #666666;
			bottom: 0;
		}
	
		a {
	
			left: calc(184upx * 2);
			bottom: 0;
		}
	
		.del {
			width: 199upx;
			right: 0;
			top: 0;
			height: 120upx;
			border-bottom: 1upx solid #e5e5e5;
		}
	
		.btn {
			right: 0;
			bottom: 0;
			height: 347upx;
			background: linear-gradient(225deg, #46c7a9 0%, #e3fff7 100%);
			font-size: 30upx;
			width: 199upx;
			font-weight: bold;
		}
	}
</style>
