<template>
	<view class="container">
<!-- 		<view class="header">
			<image src="https://daihuan.oss-cn-beijing.aliyuncs.com/shiming/roleCheck-bg%402x.png" class="bg-title"></image>
			
			<view class="header-title-common">
				<p @click="back" />
				<b>直推用户</b>
			</view>
		</view> -->
		
		<view class="head">
			<image src="../../static/gz.png" mode="widthFix"></image>
		</view>
		<view @click="bank" class="v1"></view>
		<!-- <view class="bocun">长按可以保存图片</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},

		methods:{
		bank(){
			uni.navigateBack({
				
			})
		}

		}
	}
</script>

<style lang="scss">

	.head{
		image{
			position: absolute;
			width: 750upx;
			height: 8390upx;
			// background-color: red;
			// padding: 0;
			z-index: -1;
		}
		
	}
	.v1{
		position: absolute;
		// width: 50upx;
		// height: 50upx;
		// background-color: red;
		transform: rotate(45deg);
		border-bottom: 5upx solid #D4C09D;
		border-left: 5upx solid #D4C09D;
		width: 30upx;
		height: 30upx;
		margin-top: 80upx;
		margin-left: 50upx;
		position: absolute;
		left: 0;
	}
	.bocun{
		z-index: 1;
	}
</style>
