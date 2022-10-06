<template>
	<view class="container">
		<view class="header">
			<!-- <image src="https://daihuan.oss-cn-beijing.aliyuncs.com/shiming/roleCheck-bg%402x.png" class="bg-title"></image> -->
			<view class="header-title-common">
				<p @click="back" />
				<b>收益明细</b>
			</view>
		</view>
<!-- 		<h1>
			修改信用卡基本信息
		</h1> -->
		<view class="h2">
			<image class="h2image" src="../../static/images/m_icon/head.png" ></image>
			<p>收益类型</p>
		</view>
		<ul>
			<li v-for="(item,index) in moudlesList" @click="goDetail(index)" :key="index">
				<image :src="item.icon" mode="widthFix" />
				<h2>{{item.title}}</h2>
			</li>
		</ul>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				moudlesList: [{
						icon: '../../static/images/m_icon/zssy.png',
						title: '招商收益'
					},
					{
						icon: '../../static/images/m_icon/skfr.png',
						title: '刷卡分润'
					},
					{
						icon: '../../static/images/m_icon/hkfr.png',
						title: '还款分润'
					},
					{
						icon: '../../static/images/m_icon/kkfr.png',
						title: '空卡分润'
					},
					{
						icon: '../../static/images/m_icon/zjfr.png',
						title: '中介分润'
					},
					{
						icon: '../../static/images/m_icon/glfr.png',
						title: '管理分润'
					},
					{
						icon: '../../static/images/m_icon/zyfx.png',
						title: '自用返现'
					},
					{
						icon: '../../static/images/m_icon/qtsr.png',
						title: '其他收入'
					},
				],
				nick:"nick",//		昵称
				fullname:"fullname",//	真实姓名
				username:"username",//	手机号	
				id :"",//编号暂无
				createTime:"createTime",//	注册时间
				selfLevel:"selfLevel",// 		0-已注册、1-已实名、2-消费过、3-已激活
			};
		},
		onLoad(e) {

		},
		onShow() {
		
			//this.api_getUser()
		},
		methods: {
			// 获取个人信息
			api_getUser(){
				let t = this
				let body = {
					id:uni.getStorageSync("users").id
				}
				this.$meapi.api_getUser(body).then(res=>{
				
						if(res.code==5){
							uni.showModal({
								title:"未登录",
								content:"立即去登录",
								success(res) {
									if(res.confirm){
										uni.navigateTo({
											url:"/pages/login/login"
										})
									}else{
										uni.navigateBack({
											
										})
									}
								}
							})
					}
				
				}).catch(err=>{
					console.log("api_changeAlipay失败",err)
					
				})
			},

			back() {
				uni.navigateBack()
			},
			goDetail(index){
				let link = (url)=>{
					uni.navigateTo({
						url:url
					})
				}
				console.log("xxxxxxxxx",index)
				let titleName = "",type = 1
				if(index == 0){
					link('/pages/users/invitation/zhaoshang')
					return
				}else if(index == 1){
					titleName = "刷卡分润"
				}else if(index == 2){
					titleName = "还款分润"
				}else if(index == 5){
					titleName = "管理分润"
					type  = 0
					link('/pages/users/zssy/guanlifr?type='+type+"&titleName="+titleName)
					return
				}
				else if(index == 6){
					titleName = "自用返现"
					type  = 0
				}else if(index == 7){
					titleName = "其他收入"
					type  = 1
					link('/pages/users/zssy/guanlifr?type='+type+"&titleName="+titleName)
					return
				}
				else{
					uni.showToast({
						title:"暂未开通",
						icon:"none"
					})
					return
				}
				
				link('/pages/users/zssy/zssy?type='+type+"&titleName="+titleName)
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

	.h2{
		margin-top: 60upx;
		display: flex;
		font-size: 36upx;
		align-items: center;
		
		.h2image{
			width: 46upx;
			height: 40upx;
			margin-left: 45upx;
			margin-right: 10upx;
		}
	}

	ul {
		margin: 0 auto;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		justify-content: space-around;
		
		margin-top: 20upx;
		li {
			// background-color: red;
			display: flex;
			align-items: center;
			flex-direction: column;
			width: 160upx;
			margin-bottom: 30upx;

			h2 {
				margin-top: 10upx;
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
			}

			image {
				width: 90upx;
			}
		}

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
			// #ifdef H5
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

	h1 {
		font-size: 23upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		height: 70upx;
		background: linear-gradient(269deg, #D79F65 0%, #FDD8AA 100%);
		display: flex;
		padding-left: 30upx;
		align-items: center;
	}

	
</style>
