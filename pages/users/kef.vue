<template>
	<view class="container">
		<view class="header">
			<!-- <image src="https://daihuan.oss-cn-beijing.aliyuncs.com/shiming/roleCheck-bg%402x.png" class="bg-title"></image> -->
			<view class="header-title-common">
				<p @click="back" />
				<b>客服中心</b>
			</view>
		</view>
		<view class="safe-box" >
			<image class="bg"></image>
			<view class="user-box">
				<image src="/static/head.jpg" ></image>
				<p>{{fullname}}</p>
				<view style="background-color: #46c7a9;color: #FFFFFF;margin-left: 10upx;border-radius: 50%;">
					<a v-if="v==0" >普通</a>
					<a v-else-if="v > 0 && v <= 3">钻石{{v}}</a>
					<a v-else>钻石3</a>
				</view>
				<!-- <a v-if="v==0">普通</a> -->
				
				<p>推荐码<text style="margin-left: 20upx;">{{username}}</text></p>
			</view>
		</view>
		<ul>
			<li @click="zxKf" >
				<image src="/static/images/kef/zxkf@2x.png" mode="widthFix"></image>
				<h1>在线客服</h1>
				<p>售前售后客服</p>
				<p>时间：09:00-21:00</p>
			</li>
			<li @click="liuYan" >
				<image src="/static/images/kef/wx@2x.png" mode="widthFix" style="width: 84upx;height: 68upx;"></image>
				<h1>微信客服</h1>
				<p>493838049</p>
				<p> 时间：09:00-21:00</p>
			</li>
			<li @click="call" >
				<image src="/static/images/kef/tuijianr@2x.png" mode="widthFix"></image>
				<h1>推荐人</h1>
				<p>手机号：{{showPhone}}</p>
			</li>
			<li @click="goKfQq">
				<image src="/static/images/kef/QQ@2x.png" mode="widthFix"></image>
				<h1>官方QQ</h1>
				<p>20386515</p>
				<p>时间：09:00-21:00</p>
			</li>
		</ul>
		
		<view class="tips">
			温馨提示: <br />
			为了更快速的解答您的问题,建议优先点击“在线客服”，同时把您的注册手机号姓名和相关问题及时发送，谢谢。
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				rphone:"",
				fullname:"",
				showPhone:"",
				phone:"",
				username:"",
				qq:"493883049",
				v:""
			};
		},
		onLoad() {
			this.api_getUser()
			console.log("users=",uni.getStorageSync("users"))
			let phone =uni.getStorageSync("users").preUserPhone
			this.showPhone = phone.substring(0,3)+"****"+phone.substring(7,11)
			this.rphone = phone
			
		},
		methods: {
			// 打开在线客服
			zxKf(){
				//https://api.fenxbangong.com/api/user/app/config/service/url
				// let url = "https://tb.53kf.com/code/client/fc25d13606aea048aad115359d019b9f5/1"
				// let url = "https://kf.xiangmubaba.com/index/index/home?theme=05202d&visiter_id=&visiter_name=&avatar=&business_id=9&groupid=0"
			
			
			this.$api.api_serviceUrl({}).then(res => {
				if(res.code == 0){
					let url = res.data;
				uni.navigateTo({
					url:"/pages/index/veb?url="+url+"&title=在线客服"
				})
				}
			})
			
				
			},
			// 打开客服QQ
			goKfQq(){
				console.log("打开QQ")
				plus.runtime.openURL('mqq://im/chat?chat_type=wpa&uin=' + this.qq + '&version=1&src_type=web ');

			},
			// 拨打推荐人电话
			call(){
					// let t = this
					//   uni.makePhoneCall({
					// 	phoneNumber:t.rphone,
					// 	success:function(){
					// 		console.log('拨打电话成功');
					// 	},
					// 	fail() {
					// 		console.log('打电话失败了');
					// 	}
					// })
			},
			liuYan(){
				uni.showToast({
					title:"暂未开通",
					icon:"none"
				})
			},
			back(){
				uni.navigateBack({
					
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
								if(res.data.fullname==undefined){
									t.fullname = "未实名"
								}else{
									t.fullname = res.data.fullname	
								}
								console.log("res.data.fullname",res.data.fullname)
								
								// t.id = res.data.id
								let phone = res.data.username
								this.v =res.data.vipLevel
								this.username = res.data.username
						}else if(res.code == 5){
							uni.showModal({
								title:"登录已过期",
								content:"立即去登录",
								success(res) {
									if(res.confirm){
										uni.reLaunch({
											url:"/pages/login/login"
										})
									}
								}
							})
						}
					
					}).catch(err=>{
						console.log("api_changeAlipay失败",err)
					
					})
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
		min-height: 100upx;
		height: 150upx;
		background-color: #46c7a9;
		.header-title-common {
			display: flex;
			align-items: center;
			width: 100%;
			justify-content: center;
			position: relative;
			//#ifdef H5
			margin-top: 30upx;
			//#endif
			b {
				font-size: 48upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: white;
			}

			p {
				transform: rotate(45deg);
				border-bottom: 5upx solid white;
				border-left: 5upx solid white;
				width: 20upx;
				height: 20upx;
				position: absolute;
				left: 0;
			}
		}
	}
	.safe-box{
		position: relative;
		height: 231upx;
		margin-bottom: 100upx;
		.bg{
			width: 100%;
			height: 100%;
			background-color: #46c7a9;
		}
		.user-box{
			display: flex;
			height: 140upx;
			align-items: center;
			padding: 0 24upx;
			position: absolute;
			width: 690upx;
			bottom: -70upx;
			left: 30upx;
			background: #FFFFFF;
			box-shadow: 0px 8upx 10upx 0px rgba(51, 51, 51, 0.3);
			border-radius: 20upx;
			font-size: 36upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #46c7a9;
			a{
				// width: 45upx;
				// height: 45upx;
				padding: 4upx 10upx;
				background: #46c7a9;
				border-radius: 20upx;
				display: flex;
				justify-content: center;
				align-items: center;
				// margin-left: 10upx;
				font-size: 20upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #FEFEFE;
			}
			image{
				width: 88upx;
				height: 88upx;
			    margin-right: 26upx;
				border-radius: 50%;
			}
			p:last-child{
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 500;
				margin-left: auto;
			}
		}
	}
	ul{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 30upx;
		li{
			width: 49%;
			margin-bottom: 30upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			background: #FFFFFF;
			box-shadow: 0px 8upx 10upx 0px rgba(51, 51, 51, 0.3);
			border-radius: 10upx;
			padding-top: 33upx;
			padding-bottom: 20upx;
			image{
				width: 58upx;
				margin-bottom: 12upx;
			}
			h1{
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				margin-bottom: 10upx;
			}
			p{
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;
				margin-bottom: 10upx;
			}
		}
	}
	.tips{
		width: 676upx;
		display: block;
		margin: 50upx auto;
		font-size: 20upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #666666;
		
	}
	

</style>
