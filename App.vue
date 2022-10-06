<script>
	export default {
		globalData:{
			brandId:12,
			mediumToken:"",
			xjToken:""
		}

		
	}
</script>

<style>
/*每个页面公共css */
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	ul,
	ol,
	li,
	view,
	page,
	text,
	swiper,
	swiper-item,
	image,
	navigator,
	textarea,
	input {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		font-weight: normal;
		font-size: 28upx;
	}
	
	
	ul {
		list-style: none;
		/*清除列表默认样式*/
	}
	
	
	image {
		display: flex;
		flex-shrink: 0;
		width: 50upx;
		height: 50upx;
	}
	
	.container {
		min-height: 100vh;
	}
	
	// 超过文字省略号
	.text-overflow-1 {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}
	
	.text-overflow-2 {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	
	.text-overflow-3 {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}
</style>
