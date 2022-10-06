## 功能描述
根据内容生成二维码，并返回图片地址

## 平台兼容性
兼容APP、H5及微信小程序。其他平台未测试

## 安装方式
安装到components文件夹，支持[easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)组件模式。

## 使用方式
**<font color=#FF0000 >可根据属性自定义二维码</font>**
``` javascript
<yz-qr></yz-qr>
```

## 属性说明
|属性名		|类型	|默认值		|说明		|
|--			|--		|--			|--			|
|text		|String	|'hello'	|二维码内容	|
|size		|Number	|340		|单位是px	|
|colorDark	|String	|'#000000'	|黑色二维码	|
|colorLight	|String	|'#ffffff'	|白色背景	|

## 示例代码
``` javascript
	<template>
		<view class="content">
			<!-- 通过 ref 为子组件赋予一个 ID 引用,访问子组件实例 -->
			<yz-qr ref="qrPath" :text="text" :size="size" :colorDark="colorDark" :colorLight="colorLight"></yz-qr>
	
			<view class="text">
				二维码内容:<text>{{text}}</text>
			</view>
			<view class="text">
				图片地址:<text>{{canvasQrPath}}</text>
			</view>
		</view>
	</template>
	
	<script>
		export default {
			data() {
				return {
					canvasQrPath: '',
					text: 'hello',
					size: 200,
					colorDark: '#ff0000',
					colorLight: '#ffffff'
				}
			},
			onLoad() {
				this.getQrPath()
			},
			methods: {
				getQrPath() {
					var that = this;
					setTimeout(function() {
						that.canvasQrPath = that.$refs.qrPath.canvasQrPath;
						console.log('获取二维码地址:', that.canvasQrPath)
					}, 1000)
				}
			}
		}
	</script>
	
	<style>
		.text {
			background-color: #f3f3f3;
			margin: 24rpx;
			padding: 24rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	
		.text text {
			font-weight: 700;
			margin-left: 16rpx;
		}
	</style>
	
	
```
## <font color=#FF0000 >canvas踩坑</font>
1. uni-app中的canvas的width、height的值依赖于父元素的宽高。canvas的父级如果被隐藏。canvas的width、height则都为0。
2. 当父元素出现，canvas的高度也就有了。但是canvas并不会绘制显示。解决方法：可以将绘制方法写在异步方法中，同时要注意组件的生命周期，确保实例挂载成功之后再执行。