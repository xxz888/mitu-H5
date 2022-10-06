<template>
	<view class="container">
		<view class="header">
			<!-- <image src="https://daihuan.oss-cn-beijing.aliyuncs.com/shiming/roleCheck-bg%402x.png" class="bg-title"></image> -->
			<view class="header-title-common">
				<p @click="back" />
				<b>设置</b>
			</view>
		</view>
<!-- 		<h1>
			{{title}}
		</h1> -->
		<view class="form-box" @click="gourl(0)">


<!-- 			<h2>
				<p>版本更新</p>
				<a></a>
			</h2> -->
<!-- 			<h2>
				<p>清理缓存({{cache}})</p>
				<a></a>
			</h2> -->

<!-- 			<h2 @click="gourl('modifiesPay?type=2')">
				<p>设置交易密码</p>
				<a></a>
			</h2> -->

			<h2 @click="gourl('modifiesLogin')">
				<p>设置登录密码</p>
				<a></a>
			</h2>
			<h2 @click="gourl('modifiesPay?type=1')">
				<p>更改手机号码</p>
				<a></a>
			</h2>

		</view>
		<!-- <view class="sm"><text></text>请勿设置与其他APP相似密码</view> -->
		<view class="btn" @click="quitLogin" >
			退出登录
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cache:""
			};
		},
		onShow() {
			
		},
		methods: {
			back(){
				uni.navigateBack({
					
				})
			},
			gourl(url){
				uni.navigateTo({
					url:url
				})
			},
			quitLogin(){
				uni.removeStorage({
					key:'users',
					success:function(res){
					        console.log('删除users成功了')
					}
				})
				uni.removeStorage({
					key:'token',
					
					success:function(res){
						console.log('删除token成功了')
					        uni.navigateTo({
					        	url:"login"
					        })
					}
				})
			}

					// 获取缓存
						// formatSize() {
						// 	let that = this;
						// 	plus.cache.calculate(function(size) {
						// 		let sizeCache = parseInt(size);
						// 		if (sizeCache == 0) {
						// 			that.fileSizeString = "0B";
						// 		} else if (sizeCache < 1024) {
						// 			that.fileSizeString = sizeCache + "B";
						// 		} else if (sizeCache < 1048576) {
						// 			that.fileSizeString = (sizeCache / 1024).toFixed(2) + "KB";
						// 		} else if (sizeCache < 1073741824) {
						// 			that.fileSizeString = (sizeCache / 1048576).toFixed(2) + "MB";
						// 		} else {
						// 			that.fileSizeString = (sizeCache / 1073741824).toFixed(2) + "GB";
						// 		}
						// 	});
						// },


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
	.sm{
		display: flex;
		// background-color: red;
		font-size: 20upx;
		color: #999999;
		// margin-top: 10upx;
		width: 690upx;
		margin: 10upx auto;
		align-items: center;
		
		text{
			width: 20upx;
			background-color: #F0AD4E;
			height: 20upx;
			margin-right: 10upx;
			border-radius: 10upx;
			margin-left: 10upx;
		}
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
		height: 80upx;
		background: linear-gradient(269deg, #D79F65 0%, #FDD8AA 100%);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.form-box {
		background: #FFFFFF;
		// box-shadow: 0px 8upx 22upx 2upx rgba(67, 67, 67, 0.2);
		border-radius: 20upx;
		width: 690upx;
		margin: 20upx auto;
		padding: 0 30upx;
		margin-bottom: 10upx;
		h2 {
			display: flex;
			align-items: center;
			// justify-content: space-between;
			input {
				// text-align: right;
				font-size: 30upx;
			}
			a{
				width: 20upx;
				height: 20upx;
				transform: rotate(45deg);
				border-top: 5upx solid #999999;
				border-right: 5upx solid #999999;
			}
			p{
				width: 600upx;
				// background-color: red;
				padding-left: 30upx;
			}
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #666666;

			// p:last-child {
			// 	color: #888;
			// 	font-size: 24upx;
			// }

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
		margin: 80upx auto;
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
</style>
