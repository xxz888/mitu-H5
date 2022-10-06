<template>
	<view class="container">
<!-- 		<view class="header">
			<image src="https://daihuan.oss-cn-beijing.aliyuncs.com/shiming/roleCheck-bg%402x.png" class="bg-title"></image>
			<view class="header-title-common">
				<p @click="back" />
				<b>{{title}}</b>
			</view>
		</view> -->
		<web-view style="margin-top: 10upx;" :src="url" ></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:"https://www.so.com",
				title:""
			};
		},
		onLoad(e) {
			this.url = e.url
			this.title = e.title
			console.log(e.url)
			uni.setNavigationBarTitle({
			title:e.title
			})
		},
		methods:{
			back(){
				uni.navigateBack({
					
				})
			}
		}
	}
</script>

<style lang="scss">
	// .bg-title {
	// 	width: 100%;
	// 	height: 100%;
	// 	position: absolute;
	// 	left: 0;
	// 	top: 0;
	// 	z-index: -1;
	// }

	// .header {
	// 	width: 100%;
	// 	position: relative;
	// 	padding: 30upx;
	// 	padding-top: calc(var(--status-bar-height) + 30upx);
	// 	height: 100upx;
	// 	.header-title-common {
	// 		display: flex;
	// 		align-items: center;
	// 		width: 100%;
	// 		justify-content: center;
	// 		position: relative;
	// 		//#ifdef H5
	// 		margin-top: 20upx;
	// 		//#endif
	// 		b {
	// 			font-size: 48upx;
	// 			font-family: PingFang SC;
	// 			font-weight: bold;
	// 			color: #F7CF9E;
	// 		}

	// 		p:first-child {
	// 			transform: rotate(45deg);
	// 			border-bottom: 5upx solid #D4C09D;
	// 			border-left: 5upx solid #D4C09D;
	// 			width: 20upx;
	// 			height: 20upx;
	// 			position: absolute;
	// 			left: 0;
	// 		}

	// 		p:last-child {
	// 			font-size: 24upx;
	// 			font-family: PingFang SC;
	// 			font-weight: bold;
	// 			color: #F7CF9E;
	// 			position: absolute;
	// 			right: 0;
	// 		}
	// 	}
	// }

	// h1 {
	// 	font-size: 23upx;
	// 	font-family: PingFang SC;
	// 	font-weight: 500;
	// 	color: #333333;
	// 	height: 70upx;
	// 	background: linear-gradient(269deg, #D79F65 0%, #FDD8AA 100%);
	// 	display: flex;
	// 	padding-left: 30upx;
	// 	align-items: center;
	// }

	// .form-box {
	// 	background: #FFFFFF;
	// 	// box-shadow: 0px 8upx 22upx 2upx rgba(67, 67, 67, 0.2);
	// 	// border-radius: 20upx;
	// 	width: 700upx;
	// 	margin: 60upx auto;
	// 	padding: 0 30upx;

	// 	h2 {
	// 		display: flex;
	// 		align-items: center;
	// 		justify-content: space-between;

	// 		input {
	// 			text-align: right;
	// 			font-size: 24upx;
	// 		}

	// 		font-size: 24upx;
	// 		font-family: PingFang SC;
	// 		font-weight: 500;
	// 		// color: #666666;

	// 		p:last-child {
	// 			color: #888;
	// 			font-size: 24upx;
	// 		}

	// 		padding: 30upx 0;
	// 		border-bottom: 1upx solid #e1e1e1;
	// 	}
	// }

	// .code {
	// 	b {
	// 		margin-left: auto;
	// 		width: 180upx;
	// 		line-height: 100%;
	// 		display: flex;
	// 		font-size: 24upx;
	// 		align-items: center;
	// 		justify-content: center;
	// 		height: 100%;
	// 		text-align: center;
	// 		font-weight: normal;
	// 		color: #DF8E40;
	// 	}

	// 	.prevent {
	// 		pointer-events: none;
	// 		color: #999 !important;
	// 	}
	// }

	// .btn {
	// 	height: 86upx;
	// 	width: 660upx;
	// 	margin: 100upx auto;
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


	// .modal {
	// 	position: fixed;
	// 	top: 0;
	// 	left: 0;
	// 	right: 0;
	// 	bottom: 0;
	// 	display: flex;
	// 	justify-content: center;
	// 	align-items: center;
	// 	background: rgba(0, 0, 0, 0.5);
	// 	z-index: 9;


	// 	.modal-content {
	// 		width: 690upx;
	// 		border-radius: 20upx;
	// 		display: flex;
	// 		flex-direction: column;
	// 		align-items: center;
	// 		position: relative;
	// 		overflow: hidden;
	// 		padding: 40upx 0;

	// 		.modal-text {
	// 			position: relative;
	// 			z-index: 19;
	// 			display: flex;
	// 			flex-direction: column;
	// 			align-items: center;
	// 		}

	// 		.m-bg {
	// 			position: absolute;
	// 			z-index: 10;
	// 			top: 0;
	// 			left: 0;
	// 			width: 100%;
	// 			height: 100%;
	// 		}

	// 		.card-icon {
	// 			width: 110upx;
	// 			margin-bottom: 10upx;
	// 		}

	// 		a {
	// 			font-size: 36upx;
	// 			font-family: PingFang SC;
	// 			font-weight: bold;
	// 			color: #F4CA99;
	// 			display: flex;
	// 			margin-bottom: 10upx;
	// 		}

	// 		p {
	// 			font-size: 50upx;
	// 			font-family: DIN;
	// 			font-weight: bold;
	// 			color: #F4CA99;
	// 			display: flex;
	// 			margin-bottom: 20upx;
	// 		}

	// 		b {
	// 			display: flex;
	// 			align-items: center;
	// 			justify-content: center;
	// 			padding: 5upx 30upx;
	// 			border-radius: 5upx;
	// 			background: #F4CA99;
	// 			font-size: 20upx;
	// 			font-family: PingFang SC;
	// 			font-weight: bold;
	// 			color: #252527;
	// 		}

	// 	}
	// }
	// h4{
	// 	display: flex;
	// 	justify-content: center;
	// 	padding:0 40upx;
	// 	b{
	// 		font-size: 29upx;
	// 		font-family: PingFang SC;
	// 		font-weight: bold;
	// 		color: #FF9426;
	// 	}
	// 	p{
	// 		font-size: 20upx;
	// 		font-family: PingFang SC;
	// 		color: #888;
	// 	}
	// 	line-height: 36upx;
	// }
</style>

