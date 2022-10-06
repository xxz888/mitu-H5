<template>

	<view class="container">
		<view class="header">
			<!-- <image src="https://daihuan.oss-cn-beijing.aliyuncs.com/shiming/roleCheck-bg%402x.png" class="bg-title"></image> -->
			<view class="header-title-common">
				<p @click="back" />
				<b>使用帮助</b>
			</view>
		</view>
<!-- 		<h1>
			修改信用卡基本信息
		</h1> -->
		<view class="form-box" >
			
				<h2 @click="govideo(item.id)" v-for="(item,index) in tetleList">
					<p>{{item.title}}</p>
					<view class="vvs"></view>
				</h2>
<!-- 				<h2 @click="govideo(2)">
					<p>刷卡操作视频</p>
					<view  class="vvs"></view>
				</h2>
				<h2 @click="govideo(3)">
					<p>空卡还款视频</p>
					<view  class="vvs"></view>
				</h2>
				<h2 @click="govideo(4)">
					<p>中介还款视频</p>
					<view  class="vvs"> </view>
				</h2>
				<h2 @click="govideo(5)">
					<p>余额还款视频</p>
					<view  class="vvs"></view>
				</h2> -->
			


		</view>



	</view>

</template>

<script>
	export default {
		data() {
			return {
				url:"",
				tetleList:[],
			
			};
		},
		onLoad(e) {
				this.titlelist()
		},
		onShow() {
			
			
		},
		
		methods: {
			// 获取操作视频列表api/user/guide/title/list
			titlelist(){
				let t = this
				let body = {
					brandId :getApp().globalData.brandId
				}
				this.$api.api_gettitles(body).then(res=>{
					console.log("获取操作视频列表成功",res)
					if(res.code==0){
					
						t.tetleList=res.data
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
				
				}).catch(err=>{
					
				
				})
			},
			back(){
				uni.navigateBack({
					
				})
			},
			govideo(index){
				let t = this
				let body = {
					id :index
				}
				this.$api.api_gettitlesId(body).then(res=>{
					console.log("获取操作视频列表成功",res)
					if(res.code==0){
					
						uni.navigateTo({
							url:"hellpVideo?url="+res.data
						})
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
				
				}).catch(err=>{
					
					
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

	.form-box {
		background: #FFFFFF;
		// box-shadow: 0px 8upx 22upx 2upx rgba(67, 67, 67, 0.2);
		// border-radius: 20upx;
		width: 700upx;
		margin: 60upx auto;
		padding: 0 30upx;

		h2 {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.vvs{
				transform: rotate(45deg);
				border-right: 5upx solid #F0AD4E;
				border-top: 5upx solid #F0AD4E;
				width: 15upx;
				height: 15upx;
				margin-left: auto;
				
			}
			input {
				text-align: right;
				font-size: 24upx;
			}

			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 500;
			// color: #666666;

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
			color: #DF8E40;
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
		background: linear-gradient(269deg, #D79F65 0%, #FDD8AA 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
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


		.modal-content {
			width: 690upx;
			border-radius: 20upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;
			overflow: hidden;
			padding: 40upx 0;

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
	h4{
		display: flex;
		justify-content: center;
		padding:0 40upx;
		b{
			font-size: 29upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #FF9426;
		}
		p{
			font-size: 20upx;
			font-family: PingFang SC;
			color: #888;
		}
		line-height: 36upx;
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
	
</style>
