<template>
	<view class="container">
		<view class="header">
			<image src="/static/images/sy-bg@2x.png" class="bg-title"></image>
			<view class="header-title-common">
				<p @click="back" />
				<b>历史详情</b>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
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

		.header-title-common {
			display: flex;
			align-items: center;
			width: 100%;
			justify-content: center;
			position: relative;

			b {
				font-size: 35upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #F7CF9E;
			}

			p:first-child {
				transform: rotate(45deg);
				border-bottom: 5upx solid #D4C09D;
				border-left: 5upx solid #D4C09D;
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
</style>
