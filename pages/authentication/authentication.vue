<template>
	<view class="container">
		<view class="header">
			<!-- <image src="https://daihuan.oss-cn-beijing.aliyuncs.com/shiming/roleCheck-bg%402x.png" class="bg-title"></image> -->
			<view class="header-title-common">
				<p @click="back" />
				<b>{{title}}</b>
			</view>
			<ul class="process-box">
				<li :class="step == 1?'active':''">
					<b />
					<p>添加身份证</p>
				</li>
				<li :class="step == 2?'active line':'line'">
					<b />
					<p>人脸识别</p>
				</li>
				<li :class="step == 3?'active':''">
					<b />
					<p>绑定结算卡</p>
				</li>
			</ul>
		</view>
		<view class="step-box">
			<step1 v-if="step == 1" :step.sync="step" />
			<step2 v-else-if="step == 2"  :step.sync="step" />
			<step3 v-else  :step.sync="step" />
		</view>

	</view>
</template>

<script>
	import step1 from '@/components/step1.vue'
	import step2 from '@/components/step2.vue'
	import step3 from '@/components/step3.vue'
	export default {
		components: {
			step1,
			step2,
			step3
		},
		data() {
			return {
				title: '添加身份证',
				step: 1
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
	.bg-title{
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
	}
	.header {
		width: 100%;
		position: relative;
		padding: 30upx;
		padding-top: 80upx;
		height: 322upx;
		background-color: #46c7a9;
		//padding-top: calc(var(--status-bar-height) + 30upx);

		.header-title-common {
			display: flex;
			align-items: center;
			width: 100%;
			justify-content: center;
			position: relative;

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

		.process-box {
			width: 630upx;
			margin: 0 auto;
			margin-top: 64upx;
			display: flex;

			li {
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;

				b {
					width: 40upx;
					height: 40upx;
					border-radius: 50%;
					background-color: #fff;
					box-sizing: border-box;
					border: 10upx solid RGBA(94, 88, 78, 1);
				}

				p {
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					margin-top: 10upx;
				}

				position: relative;
			}

			.line::after {
				content: '';
				width: 140upx;
				height: 2upx;
				background-color: #fff;
				right: 140upx;
				position: absolute;
				top: 20upx;
			}

			.line::before {
				content: '';
				width: 140upx;
				height: 2upx;
				background-color: #fff;
				left: 140upx;
				position: absolute;
				top: 20upx;
			}
		}
	}

	.active {
		p {
			color: #308a74 !important;
		}

		b {
			box-sizing: border-box;
			background-color: #46c7a9 !important;
			border: 10upx solid RGBA(100, 90, 82, 1);
		}
	}
	.step-box{
		padding:0 30upx;
		position: relative;
	}
</style>
