<template>
	<view class="container">
		<view class="header">
			<!-- <image src="https://daihuan.oss-cn-beijing.aliyuncs.com/img/index-bg%403x.png" class="bg-title"></image> -->
			<!-- <view class="logo-box">
				<image src="https://daihuan.oss-cn-beijing.aliyuncs.com/img/logo.png" mode="widthFix" class="logo"></image>
				<p>恒创智能社区</p>
				<p>有你更精彩</p>
				
			</view> -->
			首页
		</view>
		
		<view class="nav">
			<image src="../../static/ico/in_nav/bg.png" class="nav_bg"></image>
			<ul>
				<li v-for="(item,index) in moudlesList" @click="goDetail(index)" :key="index">
					<image :src="item.icon" mode="widthFix" />
					<h2>{{item.title}}</h2>
				</li>
			</ul>
		</view>
		
		<view class="notice-box">
			<image src="../../static/images/index-gg@3x.png" mode="widthFix"></image>
			<!-- <image src="../../static/images/index-ggTxt@3x.png" mode="widthFix"></image> -->
			<p class="text-overflow-1"></p>
			<b>l 更多</b>
		</view>
		
		<h1>
			<image src="/static/images/index-line@3x.png" />
			<p>便捷服务</p>
		</h1>
		
		<view class="center">
			<view class="xk">
				<view class="up">
					<image src="../../static/images/index/xins.png"></image>
					<view class="text" @click="goPage(1)">
						<p>新手指南</p>
						<b>轻松学习</b>
					</view>
				</view>
				<view class="up" @click="goPage(2)">
					<image src="../../static/images/index/kef.png"></image>
					<view class="text">
						<p>客服中心</p>
						<b>欢迎咨询</b>
					</view>
				</view>
			</view>
			<view class="xk">
				<view class="up" @click="goPage(3)">
					<image src="../../static/images/index/yaoq.png" style="width: 410upx;"></image>
					<view class="text">
						<p>邀请好友</p>
						<b>二维码分享</b>
					</view>
				</view>
				<view class="up" @click="goPage(4)">
					<image src="../../static/images/index/shangx.png" style="width: 287upx;left: 47upx;"></image>
					<view class="text" style="padding-left: 90upx;">
						<p>商学院</p>
						<b>分享文案</b>
					</view>
				</view>
			</view>
		</view>
		
		<view>
			
		</view>
		
		<!-- <view class="fn-box">
			<view>
				<image  @click="yehuank"  src="https://daihuan.oss-cn-beijing.aliyuncs.com/img/index-bjfw1%403x.png" mode="widthFix"></image>
				<image @click="goweb" src="https://daihuan.oss-cn-beijing.aliyuncs.com/img/index-bjfw2%403x.png" mode="widthFix"></image>
			</view>
			<image @click="gohuodong" src="https://daihuan.oss-cn-beijing.aliyuncs.com/img/index-bjfw3%403x.png" mode="widthFix"></image>
		</view> -->
		<swiper class="carousel"  autoplay="true" interval="5000" duration="500" indicator-dots="ture" indicator-color="#c0c0c0" indicator-active-color="#fff">
			<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item">
				<image :src="item.imgUrl" mode="aspectFill" />
			</swiper-item>
		</swiper>
		<drag-button  text="客服"  existTabBar @btnClick="btnClick" />
		
		<!-- 弹窗 -->
		<view class="modal-box" v-if="show" >
			<view class="modal-content">
				<image src="/static/images/tanc/bg.png" class="bg" mode="widthFix" />
				<h4>温馨提示</h4>
				<view class="confirm-box" style="height: 400upx;">
					<a>因最近风控太严，请联系客服微信</a>
					<h3>
						<!-- <p@click="show = false">取消</p> -->
						<p  @click="show = false">确定</p>
					</h3>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import dragButton from "@/components/drag-button.vue";
	export default {
		components: {
			dragButton
		},
		data() {
			return {
				selfLevel:"",//
				show:false,
				carouselList: [{
						imgUrl: '/static/images/index-banner@3x.png'
					},
					// {
					// 	imgUrl: '/static/images/index-bjfw3@3x.png'
					// },
				],
				moudlesList: [{
						icon: require('@/static/ico/in_nav/1.png'),
						title: '在线收款'
					},
					{
						icon: require('@/static/ico/in_nav/2.png'),
						title: '余额还款'
					},
					{
						icon: require('@/static/ico/in_nav/3.png'),
						title: '中介还款'
					},
					{
						icon: require('@/static/ico/in_nav/4.png'),
						title: '空卡还款'
					},
					{
						icon: require('@/static/ico/in_nav/5.png'),
						title: '在线办卡'
					},
					{
						icon: require('@/static/ico/in_nav/6.png'),
						title: '花呗白条'
					},
					{
						icon: require('@/static/ico/in_nav/7.png'),
						title: '停息挂账'
					},
					{
						icon: require('@/static/ico/in_nav/8.png'),
						title: '会员中心'
					},
				]
			};
		},
		onShow() {
			// 获取个人信息确认是否实名
			this.api_getUser()
		
			
		},
		onLoad() {
			// this.getbanner()
		},
		methods: {
			// 获取首页轮播图
			getbanner(){
				let t = this
				let body = {
					title:"首页轮播图"
				}

				this.$meapi.api_getbanner(body).then(res=>{
					console.log("首页轮播图成功成功==========",res)
					
					// t.selfLevel =res.data.selfLevel
					t.carouselList = res.data
				
				}).catch(err=>{
					console.log("首页轮播图成功失败",err)
				
				})
			},
			
			yehuank(){
				uni.showToast({
					title:"暂未开放",
					icon:"none"
				})
			},
			gohuodong(){
				uni.navigateTo({
					url:"/pages/users/huodong"
				})
			},
			goPage(num){
				if(num == 1){
					uni.navigateTo({
						url:"/pages/users/hellp"
					})
				}else if(num == 2){
					uni.navigateTo({
						url:"/pages/users/kef"
					})
				}else if(num == 3){
					uni.navigateTo({
						url:"/pages/users/share"
					})
				}else{
					uni.showToast({
						title:"暂未开放",
						icon:"none"
					})
				}
				
			},
			goweb(){
				let url = "http://h5.bjyoushengkj.com/wechat/pages/wailian/wailian.html?merCode=aa9db42d3372495897ee5a4f8a117a16"
				uni.navigateTo({
					url:"/pages/index/veb?url="+url+"&title="+"在线办卡"
				})
			},
			btnClick() {
				uni.navigateTo({
					url:"/pages/users/kef"
				})
			},
			goDetail(index){
				let link = (url)=>{
					uni.navigateTo({
						url:url
					})
				}
				
				if(this.selfLevel==0){
						uni.showModal({
							title:"未实名",
							content:"立即去实名",
							success(res) {
								if(res.confirm){
									uni.navigateTo({
										url:"/pages/authentication/authentication"
									})
								}
							}
						})
					return
				}
				if(index == 0){
					link('/pages/money/getMoneyOnline')
				}
				else if(index == 1){
					link('/pages/money/repayment')
				}
				else if(index == 2){
					link('/pages/medium/index')	
				}
				else if(index == 4){
					let url = "http://h5.bjyoushengkj.com/wechat/pages/wailian/wailian.html?merCode=aa9db42d3372495897ee5a4f8a117a16"
					uni.navigateTo({
						url:"/pages/index/veb?url="+url+"&title="+"在线办卡"
					})
				}
				else if(index == 5){
					this.show = true
				}
				else if(index == 6){
					// link('/pages/users/stopPayment/stopPayment')	
					uni.showToast({
						title:"暂未开放",
						icon:"none"
					})
				}
				else if(index == 7){
					link('/pages/vipKet/vip')
				}
				// else if(index == 5){
				// 	link('/pages/users/hellp')
				// }
				else{
					uni.showToast({
						title:"暂未开放",
						icon:"none"
					})
				}
			},
			
			//获取个人资料
				api_getUser(){
					let t = this
					let body = {
						id:uni.getStorageSync("users").id
					}
					this.$meapi.api_getUser(body).then(res=>{
						console.log("首页获取个人信息成功成功",res)
						if(res.code ==0){
							t.selfLevel =res.data.selfLevel
							if(res.data.selfLevel==0){
								uni.showModal({
									title:"未实名",
									content:"立即去实名",
									success(res) {
										if(res.confirm){
											uni.navigateTo({
												url:"/pages/authentication/authentication"
											})
										}
									}
								})
							}
						}
						if(res.code==5){
							uni.showModal({
								title:"温馨提示",
								content:"登录已过期请重新登录",
								success() {
									uni.navigateTo({
										url:"/pages/login/login"
									})
								}
							})
						}
						

					
					}).catch(err=>{
						console.log("首页获取个人信息成功失败",err)
					
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
			// background-color: #fff;
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
				margin: 55px 0 10px;
				align-items: center;
				justify-content: center;
				text-shadow: 0px 3px 3px rgba(46, 46, 46, 0.48);
			}
	
			.confirm-box {
				position: relative;
				z-index: 1;
				display: flex;
				width: 500upx;
				height: 350upx;
				margin: 10upx auto;
				display: flex;
				flex-direction: column;
				align-items: center;
				
				a{
					width: 80%;
					height: 280upx;
					font-size: 36upx;
					padding-top: 20upx;
					p{
						display: flex;
						justify-content: center;
						align-items: center;
						view{
							display: flex;
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
						background-color: #f7f7f7;
						color: #F0AD4E;
						width: 140upx;
						height: 70upx;
						margin: 120upx auto 90upx;
						font-size: 18upx;
					}
					input{
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
						background-color: #46c7a9;
						margin-left: 50upx;
						
					}
				}
			}
		}
	

	.header {
		width: 100%;
		height: 130upx;
		background-color: #46c7a9;
		text-align: center;
		color: white;
		font-size: 40upx;
		padding-top: 60upx;
		margin-bottom: 30upx;
	}

	.carousel {
		width: 100%;
		height: 230upx;

		.carousel-item {
			width: 100%;
			height: 100%;
			overflow: hidden;
			padding: 20upx;
		}

		image {
			width: 100%;
			height: 100%;
			border-radius: 10upx;
		}
	}

	.notice-box {
		display: flex;
		width: 690upx;
		height: 71upx;
		align-items: center;
		background: #FFFFFF;
		box-shadow: 0px 4upx 9upx 1upx rgba(58, 58, 58, 0.05);
		border-radius: 10upx;
		margin: -30upx auto 0;

		padding: 0 27upx;

		image {
			width: 40upx;
		}

		image:first-child {
			width: 30upx;
			margin-right: 10upx;
		}

		p {
			font-size: 27upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
			margin-left: 50upx;
			width: 400upx;
		}

		b {
			font-size: 27upx;
			font-family: PingFang SC;
			font-weight: normal;
			color: #999;
			margin-left: auto;
		}
		.text-overflow-1{
			color: #999;
			font-size: 25upx;
		}
	}

	.center{
		width: 680upx;
		margin: 20upx auto;
		.xk{
			display: flex;
			justify-content: space-between;
			width: 100%;
			margin-bottom: 20upx;
			.up{
				width: 334upx;
				height: 160upx;
				position: relative;
				image{
					width: 100%;
					height: 160upx;
					position: absolute;
					z-index: -1;
				}
				.text{
					color: white;
					padding: 30upx 22upx;
					p{
						font-size: 28upx;
					}
					b{
						font-size: 18upx;
					}
				}
			}
		}
	}

	.nav{
		position: relative;
		padding: 40upx 0;
		width: 680upx;
		margin: 0 auto;
		.nav_bg{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 300upx;
			z-index: -1;
		}
	}

	ul {
		margin: 0 auto;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		justify-content: space-around;

		li {
			display: flex;
			align-items: center;
			flex-direction: column;
			width: 160upx;
			margin-bottom: 40upx;

			h2 {
				margin-top: 10upx;
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
			}

			image {
				width: 64upx;
			}
		}

	}
    
	.nav_color{
		color: white;
	}
	
	h1 {
		display: flex;
		align-items: center;
		padding: 20upx 40upx;

		p {
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
			margin-left: 10upx;
		}

		image {
			width: 6upx;
			height: 30upx;
		}
	}

	.fn-box {
		padding: 0 30upx 100upx 30upx;

		image {
			width: 98%;
		}

		display: flex;
		flex-direction: column;
		align-items: center;

		view {
			width: 100%;
			display: flex;
			align-items: center;

			image {
				flex: 1;
			}
		}
	}
</style>
