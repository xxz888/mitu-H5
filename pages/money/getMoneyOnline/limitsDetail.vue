<template>
	<view class="container">
		<view class="header">
			<!-- <image src="https://daihuan.oss-cn-beijing.aliyuncs.com/shiming/roleCheck-bg%402x.png" class="bg-title"></image> -->
			<view class="header-title-common">
				<p @click="back" />
				<b>{{name}}</b>
			</view>
		</view>
		<view class="hedcolor">
			<h1>
				<p>银行名称</p>
				<p>单卡单笔</p>
				<p>单卡当日</p>
			</h1>
		</view>
		<ul>
			<li v-for="(item,index) in bankQuotaList" :key="index">
				<b>
					{{item.bankName.substring(0,4)}}
				</b>
				<b>
					{{item.limitMin}}-{{item.limitMax}}
				</b>
				<b>
					{{item.dayMax}}
				</b>
			</li>
		</ul>
		

	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:"",
				id:2,
				bankQuotaList:[{
					bankName:"银行名称",//	银行名称
					imitMin:"100",//		最小限额
					limitMax:"2万",//		最大限额
					dayMax:"50000",//		日限额	
				},{
					bankName:"银行名称",//	银行名称
					imitMin:"100",//		最小限额
					limitMax:"2万",//		最大限额
					dayMax:"50000",//		日限额	
				},{
					bankName:"银行名称",//	银行名称
					imitMin:"100",//		最小限额
					limitMax:"2万",//		最大限额
					dayMax:"50000",//		日限额	
				},]
			};
		},
		onLoad(e) {
			console.log("id=",e.id,e.name)
			this.name = e.name
			this.showBankQuota()
		},
		methods:{
			
			//查看通道银行限额api/payment/quick/channel/bank/list/{id}
			showBankQuota(){
				let t = this
				let body = {
					id:t.id
				}
				this.$api.api_showBankQuota(body).then(res=>{
					console.log("api_showBankQuota成功",res)
					if(res.code == 0){
						t.bankQuotaList = res.data
					}
				}).catch(err=>{
					console.log("api_showBankQuota失败",err)
			
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
		height: 208upx;
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
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #F7CF9E;
				position: absolute;
				right: 0;
			}
		}
	}
	.hedcolor{
		width: 750upx;
		// background: linear-gradient(269deg, #D79F65 0%, #FDD8AA 100%);
		background-color: #defff7;
	}
	h1{
		height: 91upx;
		// background: linear-gradient(269deg, #D79F65 0%, #FDD8AA 100%);
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 90%;
		margin-left: 5%;
		p{
			flex: 1;
			display: flex;
			justify-content: center;
		}
		
	}
	ul{
		li{
			padding: 20upx 0;
			display: flex;
			align-items: center;
			margin-left: 5%;
			border-bottom: 1upx solid #E5E5E5;
			width: 90%;
			 
			b{
				// background-color: red;
				flex: 1;
				display: flex;
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #666666;
				justify-content: center;
			}
			
		}
		
		
	}

</style>
