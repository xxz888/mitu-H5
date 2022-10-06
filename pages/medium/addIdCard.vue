<template>
	<view class="container">
		<view class="header">
			<!-- <image src="https://daihuan.oss-cn-beijing.aliyuncs.com/shiming/roleCheck-bg%402x.png" class="bg-title"></image> -->
			<view class="header-title-common">
				<p @click="back" />
				<b>客户信息</b>
			</view>
		</view>
		<view class="step-box">
			<view class="step1-container">
				<h1>请拍摄并上传你的身份证照片</h1>
				<view class="img-box">
					<image :src="zm" mode="" @click="onSinngle(1)" ></image>
					<image :src="fm" mode="" @click="onSinngle(2)"></image>
				</view>
				<view class="id-box" >
					<h2>
						<p>姓名</p>
						<input  type="text" :value="name" placeholder="未获取到真实姓名" />
					</h2>
					<h2>
						<p>身份证号</p>
						<input type="text" maxlength="18" v-model="cardnumber" placeholder="请扫描身份证或者输入身份证号" />
					
					</h2>
					<h3>
						<pick-regions @getRegion="handleGetRegion" >

							<view class="hhh">
									<p>储蓄卡开户行</p>
									<view>{{provinceCity}}</view>			
							</view>
					
						</pick-regions>
				

					<w-compress ref='wCompress' />
					</h3>
					<h2>
						<p>储蓄卡账号</p>
						<input type="number" maxlength="19"  v-model="bankcard" placeholder="请输入储蓄卡账号" />
					
					</h2>
					<h2>
						<p>预留手机号码</p>
						<input type="number" maxlength="11" v-model="phone" placeholder="请输入预留手机号码" />
					</h2>
				</view>
				<view class="btn" @click="addname">
					确定添加
				</view>
				
			</view>

					
		</view>

	</view>
</template>

<script>
import WCompress from '@/components/w-compress/w-compress.vue'
	
	export default {

		components: {
		    WCompress
		},
		data() {
			return {
				bankcard:"",
				array:[
					'南京人民银行支行',
					'北京建设银行朝阳路支行'
				],
				provinceCity:'请选择开户行地点',
				phone:"",
				users:[],
				name:"",
				cardnumber:"",
				zm:require('@/static/images/medium/zm.png'),
				fm:require('@/static/images/medium/fm.png'),
				i:[],
				chooseimgs:"",
				zmTure:0,
				fmTure:0,
				icCardnumber:"",
				bankName:"建设银行",
				
			};
		},
		onShow() {
			
		},
		methods:{
			// 绑定储蓄卡
			bindDebitCard(){
				let t = this
				// if(t.phone.length!=11){
				// 	uni.showToast({
				// 		title:"请先完善信息",
				// 		icon:"none"
				// 	})
				// 	return
				// }
				uni.showLoading({
					title:"添加中...",
					mask:true
				})
				let body={
					fullname:t.name,//		用户名
					bankName:t.bankName,// 	银行卡名称
					bankcard:t.bankcard,// 		银行卡号
					provinceCity:t.provinceCity,// 	开户地 x省-x市
					phone:t.phone,// 		预留手机号
					empowerToken:getApp().globalData.mediumToken
				}
				
				t.$api.api_bindBankcard(body).then(res=>{
					uni.hideLoading()
					console.log("添加银行卡成功",res)
					if(res.code==0){
						uni.navigateTo({
							url:"/pages/medium/index"
						})
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
				}).catch(err=>{
					uni.hideLoading()
					console.log("err=",err)
				
				})
			},
			// 添加姓名
			addname(){
				let t = this
				let body ={
						fullname:t.name	,//姓名
						idcard:	t.cardnumber,//	身份证号
						empowerToken:getApp().globalData.mediumToken
					}
					t.$api.api_addmynames(body).then(res=>{
						console.log("添加姓名成功",res)
						if(res.code==0){
							t.bindDebitCard()
						}
						
					}).catch(err=>{
				
				})
			},
			
			// ---------------------------------1选择图片-------------------
			onSinngle(index) {
				this.chooseimgs = index
			    uni.chooseImage({
			        count: 1,
			        success: res => {
			            // uni.showLoading({ title: '图片压缩中...', mask: true })
			            this.$refs.wCompress.start(res.tempFilePaths[0], {
			    pixels: 500000,  // 最大分辨率，默认二百万
			    quality: 0.5,     // 压缩质量，默认0.8
			    type: 'png',      // 图片类型，默认jpg
			    base64: false,     // 是否返回base64，默认false，非H5有效
			  })
			                .then(res => {
			                    // console.log(res)
			                    this.single = res
								this.savePicture(res)
			                    // uni.hideLoading()
			                })
			                .catch(e => {
			                    console.log(e)
			                    // uni.hideLoading()
			                })
			        }
			    })
			},
			
				// -------------------------------2构建为base64图片字符串-----------------------
				 savePicture(base64) {
					var arr = base64.split(',');
					var bytes = atob(arr[1]);
					let ab = new ArrayBuffer(bytes.length);
					let ia = new Uint8Array(ab);
					for (let i = 0; i < bytes.length; i++) {
						ia[i] = bytes.charCodeAt(i);
					}
					var blob = new Blob([ab], { type: 'application/octet-stream' });
					var url = URL.createObjectURL(blob);
					console.log("ugetApp().globalData.mediumToken",getApp().globalData.mediumToken)
					let t = this
					if(this.chooseimgs == 1){
						t.zm = url
						let body ={
							filePath:url,
							empowerToken:getApp().globalData.mediumToken
						}
						
						t.$medapi.api_ocrUploadA(body).then(res=>{
							//console.log("api_ocrUploadA",JSON.parse(res.data))
							let r =  JSON.parse(res.data)
							console.log("r.code",r)
							if(r.code==0){
								t.name = r.data.name
								t.cardnumber = r.data.number
								uni.setStorageSync("cardName",r.data.name)
								uni.setStorageSync("addIdCard",r.data.number)
								t.zmTure = 1
							}else{
								uni.showToast({
									title:"解析失败",
									icon:"none"
								})
							}
						}).catch(err=>{
						
						})
					}else{
						let body ={
							filePath:url,
							empowerToken:getApp().globalData.mediumToken
						}
						t.fm = url
						t.$medapi.api_ocrUploadB(body).then(res=>{
							//console.log("api_ocrUploadA",JSON.parse(res.data))
							let r =  JSON.parse(res.data)
							console.log("r.code",r)
							if(r.code==0){
								t.fmTure = 1
							}else{
								uni.showToast({
									title:"解析失败",
									icon:"none"
								})
							}
						}).catch(err=>{
						
						})
					}
				},
			
			// 获取选择的地区
			handleGetRegion(area) {
				console.log(area)
				this.provinceCity =`${area[0].name}${area[1].name}`
			},

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
		height: 207upx;
		//padding-top: calc(var(--status-bar-height) + 30upx);
		background-color: #46c7a9;
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
			color: #F7CF9E !important;
		}

		b {
			box-sizing: border-box;
			background-color: rgb(247, 207, 158) !important;
			border: 10upx solid RGBA(100, 90, 82, 1);
		}
	}
	.step-box{
		padding:0 30upx;
		position: relative;
	}
	
	.step3-container {
		padding-top: 115upx;
	
		.warning-box {
			width: 750upx;
			height: 85upx;
			background: #FEDEB5;
			position: absolute;
			top: 0;
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #666666;
			left: 0;
			display: flex;
			align-items: center;
			padding: 0 40upx;
		}
	
		.tips {
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #D7A066;
		}
	
		.photo-box {
			display: flex;
			justify-content: center;
			padding: 30upx;
	
			image {
				width: 434upx;
				height: 261upx;
			}
		}
	
		.input-box {
			border-bottom: 1upx solid #dcdcdc;
			display: flex;
			align-items: center;
			padding: 20upx 0;
	
			p {
				width: 180upx;
			}
			p:last-child{
					transform: rotate(45deg);
					border-top: 5upx solid #dcdcdc;
					border-right: 5upx solid #dcdcdc;
					width: 15upx;
					height: 15upx;
					margin-left: auto;
					margin-right: 50upx;
			}
	
		}
	
		.card-box {
			flex-direction: column;
	
			h1 {
				display: flex;
				align-items: center;
				width: 100%;
				margin-top: 10upx;
			}
	
			b {
				width: 100%;
				font-size: 17upx !important;
				font-family: PingFang SC;
				font-weight: 500;
				color: #D8A167;
				margin-top: 10upx;
			}
		}
	
		.btn {
			height: 91upx;
			width: 666upx;
			display: flex;
			align-items: center;
			justify-content: center;
			// background: linear-gradient(269deg, #D79F65 0%, #FDD8AA 100%);
			background-color: #46c7a9;
			border-radius: 16upx;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: white;
			margin-top: 50upx;
			margin-bottom: 100upx;
		}
	}
	
	
	
	.step1-container{
		padding-top: 55upx;
		h1{
			font-size: 27upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			margin-bottom: 34upx;
		}
		.img-box{
			display: flex;
			justify-content: space-between;
			image{
				width: 324upx;
				height: 279upx;
			}
			margin-bottom: 90upx;
		}
		.id-box{
			margin-bottom: 58upx;
			h2{
				display: flex;
				align-items: center;
				border-bottom: 1upx solid #dcdcdc;
				padding: 25upx 0;
				p{
					width: 200upx;
				}
				input{
					flex: 1;
				}

			}
			h3{
				display: flex;
				border-bottom: 1upx solid #dcdcdc;
				padding: 25upx 0;
				p{
					width: 200upx;
				}
				.hhh{
					// background-color: red;
					width: 700upx;
					display: flex;
				}

			}
		}
		.btn{
			height: 91upx;
			display: flex;
			align-items: center;
			justify-content: center;
			// background: linear-gradient(269deg, #D79F65 0%, #FDD8AA 100%);
			background-color: #46c7a9;
			border-radius: 20upx;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: white;
		}
	}
</style>
