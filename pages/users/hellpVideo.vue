<template>

	<view>
		<video :src="url"></video>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				url:"https://hcvideo11.oss-cn-chengdu.aliyuncs.com/助力还款.mp4",
				
			};
		},
		onLoad(e) {
			this.url = e.url
			console.log("url=",e.url)
		},
		onShow() {
			
			
		},
		
		methods: {
	
		}
	}
</script>

<style>
	video{
		width: 750upx;
		height: 100vh;
	}
</style>
