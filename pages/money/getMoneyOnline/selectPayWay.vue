<template>
	<view class="container">
		<view class="header">
			<image src="" class="bg-title"></image>
			<view class="header-title-common">
				<p @click="back" />
				<b>选择刷卡通道</b>
			</view>
		</view>
		<h1>
			<p >信用卡刷卡</p>
			<p>{{amount}}元</p>
		</h1>
		<h2>
			选择刷卡通道
		</h2>
		<ul>
			<li v-for="(item,index) in passageList" :key="index"  @click="choose(item.id,item.needCity,item.needCode)">
				<h3>
					<image src="/static/images/yl-icon@2x.png" mode="widthFix"></image>
					<b>{{item.alias}}</b>
				</h3>
				<h4>
					<p>单笔限额：{{item.limitMin}}-{{item.limitMax}}元</p>
					<p>单日限额：{{item.dayMax}}元</p>
					<p>交易时间：{{item.startTime}}-{{item.endTime}}</p>
					<p>交易费率：{{item.costRate}}+{{item.costFee}}</p>
				</h4>
				<h5  @click.stop="limits(item.id,item.alias)">查看限额</h5>
			</li>
		</ul>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				passageList:[{
					id:2,//		通道id
					name:"通道名称",//		通道名称
					bean_name:"通道在代码里对应的",//		通道在代码里对应的bean类名
					type:0,//				类型:0-大额，1-小额
					start_time:"00:00",//		每天的交易开始时间
					end_time:"23:00",//			每天的交易结束时间
					cost_rate:"0.65%",//			成本费率
					cost_fee:"2",//			成本笔数费
					limit_min:"100",//			最低限额
					limit_max:"2万",//		最大限额
					day_max:"5万",//			日限额
					need_city:"id",//		刷卡是否需要选择市
					need_code:"id",//		刷卡是否需要验证
					enabled:"id",//			是否启动
					create_time:"id",//			创建时间
					update_time:"id",//			修改时间	
					},{
					id:2,//		通道id
					name:"通道名称",//		通道名称
					bean_name:"通道在代码里对应的",//		通道在代码里对应的bean类名
					type:0,//				类型:0-大额，1-小额
					start_time:"00:00",//		每天的交易开始时间
					end_time:"23:00",//			每天的交易结束时间
					cost_rate:"0.65%",//			成本费率
					cost_fee:"2",//			成本笔数费
					limit_min:"100",//			最低限额
					limit_max:"2万",//		最大限额
					day_max:"5万",//			日限额
					need_city:"id",//		刷卡是否需要选择市
					need_code:"id",//		刷卡是否需要验证
					enabled:"id",//			是否启动
					create_time:"id",//			创建时间
					update_time:"id",//			修改时间	
					
				}],
				amount:""
			};
		},
		onLoad(e) {
			this.amount = e.amount
			uni.setStorageSync("amount",e.amount)||[]
			console.log("this.amount=",this.amount)
			this.showGetpassage(e.bankName,e.debitBankName,e.amount)
			
		},
		
		methods:{
			// 查看可刷卡通道
			showGetpassage(bankName,debitBankName,amount){
				let t = this
				let body = {
					bankName:bankName,//	信用卡银行名称
					debitBankName:debitBankName,//	储蓄卡银行名称
					amount:amount,//			刷卡金额
				}
				this.$api.api_showGetpassage(body).then(res=>{
					console.log("api_showGetpassage成功",res)
					if(res.code==0){
						t.passageList = res.data
						console.log("=================",res.data[0].id)
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
				}).catch(err=>{
				
				})
			},
			
			
			// 选择刷卡通道
			choose(id,needCity,needCode){
				// console.log("xyCard===",uni.getStorageSync("xyCard"))
				// console.log("cxCard===",uni.getStorageSync("cxCard"))
				let xyCard = uni.getStorageSync("xyCard")
				let cxCard = uni.getStorageSync("cxCard")

				let body={
						channelId:id,//	通道id
						loginPhone:uni.getStorageSync("users").username,//	登录手机号
						bankName:xyCard.bankName,//	信用卡名称
						bankCard:xyCard.cardNo,//	信用卡卡号
						bankPhone:xyCard.phone,//	信用卡手机号
						securityCode:xyCard.securityCode,//	安全码
						expiredTime:xyCard.expiredTime,//	过期时间 例0101
						userName:xyCard.fullname,//	用户姓名
						idCard:xyCard.idCard,//	身份证号
						debitBankName:cxCard.bankName,//	储蓄卡银行名称
						debitBankCard:cxCard.cardNo,//	储蓄卡卡号
						debitPhone:cxCard.phone,// 储蓄卡手机号
				}
				this.$api.api_fastApplys(body).then(res=>{
					console.log("api_fastApplys成功",res)
					if(res.code==0){
						uni.navigateTo({
							url:"confirmPay?id="+id+"&needCity="+needCity+"&needCode="+needCode
						})
					}else if(res.code==3){
						uni.navigateTo({
							url:`bindCard?channelId=${id}&needCity=${needCity}&needCode=${needCode}`
						})
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
				}).catch(err=>{
					console.log("api_fastApplys失败",err)
			
				})
			},
			
			
			back(){
				uni.navigateBack()
			},
			
			limits(id,name){
				uni.navigateTo({
					url:'limitsDetail?id='+id+"&name="+name
				})
			},
			pay(){
				uni.navigateTo({
					url:'confirmPay'
				})
			}
		}
	}
</script>

<style lang="scss">
	.bg-title {
		width: 100%;
		height: 389upx;
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
h1{
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 36upx;
	padding: 50upx 100upx;
	font-family: PingFang SC;
	font-weight: bold;
	color: #fff;
}
h2{
	padding:80upx  0 30upx 30upx;
	font-size: 36upx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #333333;
	margin-top: 40upx;
}
ul{
	width: 690upx;
	margin: 0 auto;
}
li{
	margin-bottom: 20upx;
	background: #FFFFFF;
	box-shadow: 0px 8upx 22upx 2upx rgba(67, 67, 67, 0.13);
	border-radius: 20upx;
	padding: 22upx 28upx;
	overflow: hidden;
	position: relative;
	h3{
		display: flex;
		align-items: center;
		margin-bottom: 10upx;
		image{
			margin-right: 30upx;
			width: 60upx;
		}
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
	}
	h4{
		display: flex;
		flex-wrap: wrap;
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #555;
		p{
			width: 50%;
			margin-top: 20upx;
		}
	}
	h5{
		width: 133upx;
		height: 56upx;
		background: #e3fff7;
		opacity: 0.5;
		border-radius: 10upx;
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		// background: rgba(255, 242, 225,1);
		font-size: 20upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #46c7a9;
	}
}

</style>
