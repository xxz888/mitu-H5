<template>
	<view class="container">
		<view class="header">
			<view class="header-title-common">
				<p @click="back" />
				<b>扫码邀请好友</b>
			</view>
		</view>
		<canvas class="canvas" canvas-id="canvas" :style="{width:canvasWidth +'px',height:canvasHeight +'px'}" />

<!-- 		<image v-if="canvasImg !=''" :src="canvasImg" :style="{width:canvasWidth +'px',height:canvasHeight +'px'}">
		 -->
		<image  :src="canvasImg" :style="{width:canvasWidth +'px',height:canvasHeight +'px'}">
		
		</image>

		<view class="btn-box" v-if="showBtn">
			<!-- #ifdef H5 -->
			<a class="blink">
				<view>
					长按可保存图片
				</view>
				<view>
					微信内长按可发送好友
				</view>
			</a>

			<!-- #endif -->
			
			<p @click="saveImg">立即保存</p>
			
			<!-- <p @click="saveImg">立即保存</p> -->
		</view>

		<yz-qr style="position: absolute;left: 9999px;" v-if="text !=''" ref="qrPath" :text="text" :size="size"
			:colorDark="colorDark" :colorLight="colorLight">
		</yz-qr>
	</view>
</template>

<script>
	import yzQr from '@/components/yz-qr/yz-qr.vue'
	import topImg from '@/static/p2.png'
	import btmImg from '@/static/p1.png'
	export default {
		components: {
			yzQr
		},
		data() {
			return {
				showBtn: false,
				canvasWidth: '',
				canvasHeight: '',
				modalShow: false,
				complete: false,
				canvasQrPath: '',
				text: '',
				size: 200,
				colorDark: '#46c7a9',
				colorLight: '#ffffff',
				canvasImg: "",
				
				url:"",
				id:"",
				brandId:""
			}
		},
		onLoad() {
			uni.showLoading({
				title: '二维码生成中……'
			})
			this.canvasWidth = uni.getSystemInfoSync().screenWidth * 0.9
			this.canvasHeight = this.canvasWidth * 1.4

			// this.getCode()
			this.api_getUser()
		},
		methods: {
			// 
			back(){
				uni.navigateBack()
			},
			//获取个人资料
				api_getUser(){
					let t = this
					let body = {
						id:uni.getStorageSync("users").id
					}
					this.$meapi.api_getUser(body).then(res=>{
						console.log("api_getUser成功",res)
						if(res.code==0){
							t.brandId = res.data.brandId
								t.id = res.data.id
								t.api_getUserid()
								// t.getCode()
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
				},
				
				api_getUserid(){
					let t = this
					let body = {
						
					}
					this.$meapi.api_brandId(body).then(res=>{
						console.log("glianjie",res)
						if(res.code==0){
							t.url = res.data.shareUrl+"?brandId="+t.brandId+"&userId="+t.id
							 t.getCode()
						}
				
					
					}).catch(err=>{
						console.log("api_changeAlipay失败",err)
					
					})
				},
							
			
			getCode() {
				this.modalShow = true
				this.text = this.url
				setTimeout(() => {
					this.canvasQrPath = this.$refs.qrPath.canvasQrPath;
					 //this.canvasQrPath = "https://cn.bing.com";
					console.log("this.canvasQrPath=========",this.canvasQrPath)
					this.drawImg()
				}, 1000)
			},
			drawImg() {
				let canvasWidth = this.canvasWidth
				let ctx = uni.createCanvasContext("canvas", this)
				ctx.setFillStyle('#AC883D');
				ctx.fillRect(0, 0, canvasWidth, this.canvasHeight);
				ctx.setFillStyle('#1C1E1F');
				ctx.fillRect(2, 2, canvasWidth-4, this.canvasHeight-4);
				// 上图比例 找客户要宽高10:7的图
				//ctx.drawImage(topImg, canvasWidth * 0.1, canvasWidth * 0.1, canvasWidth * 0.8, canvasWidth * 0.8 * 0.7)
				// 绘制二维码白色背景

				let ur = "../../static/share_bg.png"
				ctx.drawImage(ur,2,2,this.canvasWidth-4,this.canvasHeight-4)
				ctx.setFillStyle('#FFFFFF');
				ctx.fillRect(canvasWidth * 0.3, canvasWidth * 0.8, canvasWidth * 0.4, canvasWidth * 0.4);
							
				// 绘制二维码
				ctx.drawImage(this.canvasQrPath, canvasWidth * 0.35, canvasWidth * 0.85, canvasWidth * 0.3, canvasWidth *
					0.3)
				
				//actx.drawImage(btmImg, canvasWidth * 0.1, canvasWidth * 1.3, canvasWidth * 0.8, canvasWidth * 0.8 * 0.3)
				setTimeout(() => {
					ctx.stroke();
					ctx.draw()
					this.toImg()
				}, 200)
			},
			toImg() {
				setTimeout(() => {
					uni.canvasToTempFilePath({
						x: 0,
						y: 0,
						canvasId: 'canvas',
						success: res => {
							console.log(res)
							this.canvasImg = res.tempFilePath
							uni.hideLoading()
							this.showBtn = true
						}
					})
				}, 2000)
			},

			saveImg() {
				uni.getImageInfo({
					src: this.canvasImg,
					success: (res) => {
						let path = res.path;
						wx.saveImageToPhotosAlbum({
							filePath: path,
							success: (res) => {
								console.log(res);
								wx.showToast({
									title: '已保存到相册',
								})
							},
							fail: (res) => {
								console.log(res);
			 			}
						})
					},
			 	fail: (res) => {
						console.log(res);
					}
				})
			}


		}
	}
</script>

<style lang="scss">
	.canvas {
		position: absolute;
		left: 99999px;
	}

	view {
		box-sizing: border-box;
	}

	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 5vw;
		overflow: hidden;
		min-height: 100vh;
		background-color: #46c7a9;
	}
	
	.header {
		width: 100%;
		position: relative;
		height: 140upx;
		background-color: #46c7a9;
		.header-title-common {
			display: flex;
			align-items: center;
			width: 100%;
			justify-content: center;
			position: relative;
			margin-top: 50upx;
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
		}
	}
	
	image {
		display: flex;
		flex-shrink: 0;
		
		
		// border: 5upx solid #007AFF;
	}

	.btn-box {
		display: flex;
		align-items: center;
		justify-content: center;
		// background-color: #1C1E1F;
		height: 150upx;
		color: #46c7a9;

		p {
			//background: linear-gradient(269deg, #D79F65 0%, #FDD8AA 100%);
			background-color: white;
			width: 600upx;
			height: 100upx;
			line-height: 100upx;
			text-align: center;
			border-radius: 20upx;
			font-size: 42upx;
			color: #222;
		}
	}

	@keyframes blink {
		0% {
			opacity: 1;
		}

		50% {
			opacity: 0.5;
		}

		50.01% {
			opacity: 0;
		}

		100% {
			opacity: 0;
		}
	}

	/* 添加兼容性前缀 */

	@-webkit-keyframes blink {
		0% {
			opacity: 1;
		}

		50% {
			opacity: 0.5;
		}

		50.01% {
			opacity: 0;
		}

		100% {
			opacity: 0;
		}
	}

	@-moz-keyframes blink {
		0% {
			opacity: 1;
		}

		50% {
			opacity: 0.5;
		}

		50.01% {
			opacity: 0;
		}

		100% {
			opacity: 0;
		}
	}

	@-ms-keyframes blink {
		0% {
			opacity: 1;
		}

		50% {
			opacity: 0.5;
		}

		50.01% {
			opacity: 0;
		}

		100% {
			opacity: 0;
		}
	}

	@-o-keyframes blink {
		0% {
			opacity: 1;
		}

		50% {
			opacity: 0.5;
		}

		50.01% {
			opacity: 0;
		}

		100% {
			opacity: 0;
		}
	}

	/* 定义blink类*/
	.blink {
		animation: blink 1s linear infinite;
		/* 其它浏览器兼容性前缀 */
		-webkit-animation: blink 1s linear infinite;
		-moz-animation: blink 1s linear infinite;
		-ms-animation: blink 1s linear infinite;
		-o-animation: blink 1s linear infinite;
		color: #fff;
		text-align: center;
	}
</style>
