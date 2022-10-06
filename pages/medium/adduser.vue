<template>
	<view class="container">
		<view class="header">
			<!-- <image src="https://daihuan.oss-cn-beijing.aliyuncs.com/shiming/roleCheck-bg%402x.png" class="bg-title"></image> -->
			<view class="header-title-common">
				<p @click="back" />
				<b>增加客户</b>
			</view>
		</view>
		<view class="titles">
			<view>客户手机号</view>
			<input v-model="phone" maxlength="11" placeholder="输入手机号"/>
		</view>
		<view class="geduan"></view>
		<view style="color: #46c7a9;font-size: 18upx;margin-top: 20upx;width: 700upx;margin-left: 25upx;">注：添加的中介客户可以正常登录和使用米兔app，该手机号为客户注册手机号，可以与其银行卡预留手机号不一致</view>
	
		<view class="btn" @click="addMyUsers">
			<!-- <image src="/static/images/+@2x.png" mode=""></image> -->
			<p>下一步</p>
		</view>
		
	</view>
</template>

<script>
	
	export default {

		data() {
			return {
				phone:""

			};
		},
		

		methods: {
			addpeople(){
				console.log("滚动到底部触发",this.zjs)
				this.zjs = true
			},
			
			// 1.上级代注册接口
			addMyUsers(){
				// uni.navigateTo({
				// 	url:"addIdCard"
				// })
				// return
				let t = this
				if(t.phone.length!=11){
					uni.showToast({
						title:"请输入正确的手机号",
						icon:"none"
					})
					return
				}
				let body = {
					phone:t.phone
				}
				this.$medapi.api_addMyUsers(body).then(res=>{
					console.log("上级代注册接口成功",res)
					if(res.code==0){
						getApp().globalData.mediumToken = res.data
						let timer = setTimeout( () => {
						    uni.navigateTo({
						    	url:"addIdCard"
						    })	
						}, 100)
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
				}).catch(err=>{
					console.log("api_getBalancePlanList失败",err)
				
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

	.titles{
		// background-color: red;
		display: flex;
		margin-top: 100upx;
		font-size: 30upx;
		view{
			margin-left: 30upx;
		}
		input{
			margin-left: 64upx;
		}
	}
	.geduan{
		width: 700upx;
		height: 2upx;
		margin-left: 25upx;
		background-color: #DCDCDC;
		margin-top: 10upx;
	}
	
	.btn {
		height: 91upx;
		width: 693upx;
		margin-left: 28upx;
		margin-top: 50upx;
		// background: linear-gradient(269deg, #D79F65 0%, #FDD8AA 100%);
		background-color: #46c7a9;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 36upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: white;
		// position: fixed;
		// bottom: var(--window-bottom);
		// width: 100%;
		// left: 0;
	
		image {
			margin-right: 20upx;
			width: 30upx;
			height: 30upx;
		}
	}
</style>
