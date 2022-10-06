<template>
	<view>
		<view class="qrcode">
			<canvas :style="{width:size+ 'px', height:size+ 'px', background:bgc}" canvas-id="couponQrcode"></canvas>
		</view>
	</view>
</template>

<script>
	const qrCode = require('./weapp-qrcode.js')
	export default {
		data() {
			return {
				bgc: 'rgba(200, 200, 200, 0.1)', //测试画布是否与内容相同大小
				canvasQrPath: '', //
			}
		},

		props: {
			text: {
				type: String,
				default: 'hello'
			},
			size: {
				type: Number,
				default: 340
			},
			colorDark: {
				type: String,
				default: '#46c7a9'
			},
			colorLight: {
				type: String,
				default: '#ffffff'
			},
		},
		// 在实例创建完成后被立即调用
		created() {
			setTimeout(() => {
				this.couponQrCode()
			}, 50)
		},
		methods: {
			// 二维码生成工具
			couponQrCode() {
				var that = this;
				new qrCode('couponQrcode', {
					text: this.text,
					width: this.size,
					height: this.size,
					showLoading: true, // 是否显示loading
					loadingText: '二维码生成中', // loading文字
					colorDark: this.colorDark, //二维码暗部颜色
					colorLight: this.colorLight, //二维码亮部颜色
					correctLevel: qrCode.CorrectLevel.H, //二维码质量L/M/Q/H
					usingIn: this //在自定义组件下，第二个参数传入组件实例this
				})
				// 把当前画布指定区域的内容导出生成图片，并返回文件路径。
				uni.canvasToTempFilePath({
					canvasId: 'couponQrcode',
					success: function(res) {
						// 在H5平台下，tempFilePath 为 base64
						// console.log('yz-qr图片路径:',res.tempFilePath)
						that.canvasQrPath = res.tempFilePath
					}
				}, this)
				this.$emit('update:canvasQrPath', that.canvasQrPath)
			}
		}
	}
</script>

<style>
	.qrcode {
		/* padding: 24rpx;
		display: flex;
		align-items: center;
		justify-content: center; */
	}

</style>
