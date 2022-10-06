<template>
	<view class="container" >
		<view class="header">
			<!-- <image src="https://daihuan.oss-cn-beijing.aliyuncs.com/shiming/role-bg.png" class="bg-title"></image> -->
			<view class="userInfo-box">
				<image src="../../static/head.jpg" />
				<view class="right-box">
					<!-- <h1>{{fullname}}<a>V1</a></h1> -->
					<h1>{{fullname}}<a v-if="vipLevel==0">普通</a><a v-else-if="vipLevel > 0 && vipLevel<=3">钻石{{vipLevel}}</a><a v-else>钻石3</a></h1>
					<h2>{{phone}}</h2>
					<h3>{{id}}</h3>
				</view>
				<h4 @click="gousershow">
					<p>个人资料</p>
					<p></p>
				</h4>
			</view>
			<ul>
				<li @click="golist(0)">
					<image src="/static/images/mine/sygz@2x.png" mode="widthFix"></image>
					<p>收益规则</p>
				</li>
				<li @click="golist(1)">
					<image src="/static/images/mine/symx@2x.png" mode="widthFix"></image>
					<p>收益明细</p>
				</li>
				<li @click="golist(2)">
					<image src="/static/images/mine/scgl@2x.png" mode="widthFix"></image>
					<p>素材管理</p>
				</li>
				<li @click="golist(3)">
					<image src="/static/images/mine/wdtd@2x.png" mode="widthFix"></image>
					<p>我的团队</p>
				</li>
			</ul>
		</view>
		<view class="fn-box">
			<view class="fn-item"@click="goshare">
				<image src="../../static/images/mine/jkzh@2x.png" mode="widthFix"></image>
				<p>邀请好友</p>
				<p></p>
			</view>
			<view class="fn-item" @click="gohellp">
				<image src="../../static/images/mine/sybz@2x.png" mode="widthFix"></image>
				<p>使用帮助</p>
				<p></p>
			</view>

			<view class="fn-item" @click="gokf">
				<image src="../../static/images/mine/kfzx@2x.png" mode="widthFix"></image>
				<p>客服中心</p>
				<p></p>
			</view>
			<view class="fn-item" @click="goguanyuwm">
				<image src="../../static/images/mine/gywm@2x.png" mode="widthFix"></image>
				<p>关于我们</p>
				<p></p>
			</view>
			<view class="fn-item" @click="gomeset">
				<image src="../../static/images/mine/xtsz@2x.png" mode="widthFix"></image>
				<p>系统设置</p>
				<p></p>
			</view>
			
			<view class="fn-item" @click="show_zj = true">
				<image src="../../static/images/mine/zj.png" mode="widthFix"></image>
				<p v-if="empower">关闭上级授权</p>
				<p v-else>开启上级授权</p>
				<p></p>
			</view>
		</view>
		
		<!-- 显示详情 -->
		<view class="modal-box" v-if="show_zj" >
			<view class="modal-content">
				<image src="/static/images/tanc/bg.png" class="bg" mode="widthFix" />
				<h4>温馨提示</h4>
				<view class="confirm-box" style="height: 400upx;">
					<a>{{titles}}</a>
					<h3>
						<p@click="show_zj = false">取消</p>
						<p  @click="switchEmpower">确定</p>
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
				fullname:"未登录",
				phone:"",
				id:"",
				selfLevel:0,  //实名状态
				vipLevel:0,		//vip等级
				show_zj:false,
				status:0,
				empower:false,
				titles:"开启上级授权后，您的推荐人可以帮助您进行还款操作"
			};
		},
		onShow() {
			this.api_getUser()
		},
		methods:{
			goguanyuwm(){
				uni.navigateTo({
					url:"/pages/users/guyuwm"
				})
			},
			gohellp(){
				uni.navigateTo({
					url:"/pages/users/hellp"
				})
			},
			gousershow(){
				uni.navigateTo({
					url:"/pages/users/usershow"
				})
			},
			goshare(){
				console.log("点击邀请好友")
				uni.navigateTo({
					url:"/pages/users/share"
				})
			},
			gomeset(){
				if(this.fullname == "未登录"){
						uni.showModal({
							title:"登录已过期",
							content:"立即去登录",
							success(res) {
								if(res.confirm){
									uni.navigateTo({
										url:"/pages/login/login"
									})
								}
							}
						})
						return
				}
				
				uni.navigateTo({
					url:"/pages/login/meset"
				})
			},
			golist(index){
				if(this.selfLevel == 0){
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
					console.log("index=",index)
					let url = ""
					if(index == 0){
						url = "/pages/users/revenueRule"
					}
					else if(index == 1){
						 url = "/pages/users/earningslist"
					}else if(index == 2){
						 url = "/pages/users/mysource/source"
					}
					else if(index == 3){
						 url = "/pages/users/myTeam"
					}else{
						uni.showToast({
							title:"暂未开放",
							icon:"none"
						})
						return
					}
					console.log(url)
					uni.navigateTo({
						url:url
					})
			},
			gokf(){
				uni.navigateTo({
					url:"/pages/users/kef"
				})
			},
			// 开启或则关闭中介授权
			switchEmpower(){
				let t = this,status=1
				if(t.empower){
					status = 0
				}
				let body = {
					status:status
				}
				this.$medapi.api_switchEmpower(body).then(res=>{
					console.log("开启或则关闭中介授权成功",res)
					if(res.code==0){
			
						t.show_zj = false
						t.api_getUser()
						uni.showToast({
							title:"授权成功"
						})
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
				
				}).catch(err=>{
					
				
				})
			},
			//获取个人资料
				api_getUser(){
					let t = this
					let body = {
						id:uni.getStorageSync("users").id
					}
					this.$meapi.api_getUser(body).then(res=>{
						console.log("个人中心获取个人资料成功",res.data.fullname,res.data.id,res.data)
						if(res.code==0){
								t.empower = res.data.empower
								console.log("empower=============================",res.data.empower)
								if(res.data.empower){
									t.titles = "关闭上级授权后，您的推荐人不可以帮助您进行还款操作"
								}else{
									t.titles = "开启上级授权后，您的推荐人可以帮助您进行还款操作"
								}
							if(res.data.selfLevel==0){
								t.fullname = "未实名"
							}else if(res.data.nick==""||res.data.nick==undefined){
							
								t.fullname = res.data.fullname
							}else {
									t.fullname = res.data.nick
							}
								t.vipLevel = res.data.vipLevel
								let phone = res.data.username
								t.selfLevel = res.data.selfLevel
								this.phone = phone.substring(0,3)+"****"+phone.substring(7,11)
						}else if(res.code == 5){
							uni.showModal({
								title:"未登录",
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
		height: 360upx;
		position: absolute;
		left: 0;
		top: 0;
		z-index: -1;
	}


	.header {
		width: 100%;
		height: 400upx;
		position: relative;
		padding: 30upx;
		padding-top: calc(var(--status-bar-height) + 30upx);
		min-height: 100upx;
		color: white;
		background-color: #46c7a9;
		margin-bottom: 180upx;
		.userInfo-box {
			h1 {
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: white;
			}

			h2 {
				font-size: 22upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: white;
			}

			h3 {
				font-size: 22upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: white;
			}

			image {
				width: 120upx;
				height: 120upx;
				border-radius: 50%;
				margin-right: 20upx;
			}

			display: flex;
			align-items: center;

			.right-box {}
			h1{
				display: flex;
				image{
					width: 30upx;
					height: 30upx;
					justify-content: center;
					align-items: center;
					margin-left: 10upx;
				}
				a{
					// width: 30upx;
					height: 40upx;
					justify-content: center;
					align-items: center;
					margin-left: 10upx;
					background-color: white;
					border-radius: 20upx;
					// font-size: 12upx;
					// color: #FFFFFF;
					 color: #46c7a9;
					padding-left: 10upx;
					padding-top: 5upx;
					padding-right: 10upx;
					padding-bottom: 10upx;
					// margin-top: 6upx;
				}
			}
			h4 {
				margin-left: auto;
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: white;
				display: flex;
				align-items: center;

				p:last-child {
					transform: rotate(45deg);
					border-right: 5upx solid white;
					border-top: 5upx solid white;
					width: 15upx;
					height: 15upx;
					
				}
			}

		}
	}

ul{
	// margin: 30upx auto;
	position: absolute;
	left: 30upx;
	bottom: -115upx;
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 690upx;
	height: 230upx;
	background: #FFFFFF;
	box-shadow: 0px 4upx 9upx 1upx rgba(31, 31, 31, 0.15);
	border-radius: 10upx;
	image{
		width: 57upx;
	}
	li{
		display: flex;
		flex-direction: column;
		align-items: center;
		p{
			margin-top: 10upx;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 800;
			color: #333333;
		}
	}
}
.fn-box{
	
	width: 690upx;
	margin: 0 auto;
	margin-top: 40upx;
	background: #FFFFFF;
	box-shadow: 0px 4upx 9upx 1upx rgba(31, 31, 31, 0.15);
	border-radius: 10upx;
	.fn-item{
		display: flex;
		align-items: center;
		padding: 20upx;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		line-height: 46upx;
		image{
			width: 30upx;
			margin-right: 20upx;
		}
		p:last-child {
			transform: rotate(45deg);
			border-right: 5upx solid #333;
			border-top: 5upx solid #333;
			width: 15upx;
			height: 15upx;
			margin-left: auto;
		}
	}
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
				// background: #FFFFFF;
				// box-shadow: 0px 8upx 22upx 2px rgba(67, 67, 67, 0.2);
				// border-radius: 20upx;
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
						// padding-top: 30upx;
						align-items: center;
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
						background-color: #46c7a9;
						margin-left: 50upx;
						
					}
				}
			}
		}
	}
</style>
