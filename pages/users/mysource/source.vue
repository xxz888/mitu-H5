<template>
	<view class="container">
		<view class="header">
			<!-- <image src="https://daihuan.oss-cn-beijing.aliyuncs.com/shiming/roleCheck-bg%402x.png" class="bg-title"></image> -->
			<view class="header-title-common">
				<p @click="back" />
				<b>素材空间</b>
			</view>
		</view>
		
		<view class="title-head">
			图片中的二维码都是您本人的专属二维码，保存图片，复制文字即可分享至朋友圈，坚持每天分享朋友圈素材，才有利于快速吸引潜在用户。
		</view>
		

		
		<view class="source">
			<scroll-view scroll-y="true" >
				<view  v-for="(item,index) in childrens" :key="index" class="moreShow">
						<textarea v-if="indexs==index" class="textareas" placeholder-style="color:#F76260" :value="item.content" auto-height/>
						<textarea v-else class="textareas" placeholder-style="color:#F76260" :value="item.content.substring(0,30)" auto-height/>
						<view class="showmore">
							
							<view  v-if="indexs==index" class="showmore-v2"></view>
							<view class="showmore-v1" v-else></view>
							
							<view v-if="indexs==index" @click="indexs=40000">收起</view>
							<view  v-else @click="indexs=index">展示</view>
						</view>
						<view class="showImg" >
							<image @click="showImages(item.children,idx)" :src="itm.content" v-for="(itm,idx) in item.children" mode="scaleToFill"></image>
						</view>

						<view class="downImg">
							<view class="downImg-v1">{{item.createTime}}</view>
							<view  class="downImg-v2" @click="fuzi(item.content)">复制文案</view>
							<view  class="downImg-v2" @click="showImages(item.children,0)">下载图片</view>
						</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indexs:"",
				url:"",
				childrens:[],
				tetleList:[],
				title:"奥黑狗而后搞好少见多怪阿桑的歌氨基酸的工卡就是个爱睡觉的噶啥快递给安静的噶可是结果氨基酸的工卡就是大蒜的价格"
			};
		},
		onLoad(e) {
			this.titlelist()
		},
		onShow() {
			
			
		},
		
		methods: {
			fuzi(info){
											let textarea = document.createElement("textarea")
												textarea.value = info
												textarea.readOnly = "readOnly"
												document.body.appendChild(textarea)
												textarea.select() // 选中文本内容
												textarea.setSelectionRange(0, info.length) 
												uni.showToast({//提示
													title:'复制成功' 
												})
												let result = document.execCommand("copy") 
												textarea.remove()   
					
			},
			showImages(url,index){
				let imageUrls = []
				console.log("点击了查看图片",url)
				for(let i = 0;i<url.length;i++){
					console.log("xxx",url)
					imageUrls.push(url[i].content)
				}
				console.log("点击了查看图片",index,imageUrls)
				uni.previewImage({
					current: imageUrls[index],     //当前图片地址
					urls: imageUrls, 
					 success: function (res) {
						 console.log("res=",res)
					 },
					fail: function (res) { 
						console.log("err=",res)
					}
				
				})
			},
			// 素材管理
			titlelist(){
				let t = this
				let body = {
					currentPage:1,
					pageSize:20,		
					brandId:12		
				}
				this.$meapi.api_getmateriallist(body).then(res=>{
					console.log("素材管理",res)
					if(res.code==0){
						t.childrens = res.data
						
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
	.moreShow{
		margin-top: 20upx;
		border-top: 1upx solid #808080;
		.showImg{
			display: flex;
		}
		image{
			width: 200upx;
			height: 200upx;
			margin-right: 20upx;
		}
	}
	.downImg{
		display: flex;
		.downImg-v1{
			display: flex;
			width: 320upx;
			height: 60upx;
			align-items: center;
		}
		.downImg-v2{
			width: 150upx;
			margin-left: 20upx;
			display: flex;
			justify-content: center;
			border-radius: 20upx;
			border: 1upx solid #F7CF9E;
			height: 60upx;
			align-items: center;
		}
	}
	.showmore{
		display: flex;
		align-items: center;
		margin-left: 580upx;
		.showmore-v1{
			transform: rotate(45deg);
			border-bottom: 5upx solid #909090;
			border-right: 5upx solid #909090;
			width: 20upx;
			height: 20upx;
			margin-right: 10upx;
			margin-bottom: 10upx;
		}
		.showmore-v2{
			transform: rotate(45deg);
			border-top: 5upx solid #909090;
			border-left: 5upx solid #909090;
			width: 20upx;
			height: 20upx;
			margin-right: 10upx;
			margin-top: 10upx;
		}
	}
	.textareas{
		display: flex;
		justify-content: center;
		width: 690upx;
		padding: 20upx;
		font-size: 24upx;
	}
	
	.source{
		scroll-view{
			// border-top: 1upx solid #808080 ;
			height: 70vh;
			width: 690upx;
			margin-left: 30upx;
		}
		margin-bottom: 20upx;
	}
	.title-head{
		width: 750upx;
		height: 160upx;
		font-size: 24upx;
		// display: flex;
		padding: 20upx;
		z-index: 1;
		background-color: #FFFFFF;
	}
	.header {
		width: 100%;
		position: relative;
		padding: 30upx;
		padding-top: calc(var(--status-bar-height) + 30upx);
		min-height: 100upx;
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
	
			p {
				transform: rotate(45deg);
				border-bottom: 5upx solid white;
				border-left: 5upx solid white;
				width: 20upx;
				height: 20upx;
				position: absolute;
				left: 0;
			}
		}
	}
	
</style>
