<template>
	<view class="container">
		<view class="header">
			<!-- <image src="https://daihuan.oss-cn-beijing.aliyuncs.com/shiming/roleCheck-bg%402x.png" class="bg-title"></image> -->
			<view class="header-title-common">
				<p @click="back" />
				<b>添加信用卡</b>
			</view>
		</view>
		<h1>信息加密处理，仅用于银行验证，请验证您本人的银行卡</h1>
		<view class="form-1">
			<h2>
				<p>持卡人</p>
				<input type="text" :value="fullName" disabled />
			</h2>
			<h2>
				<p>卡号</p>
				<input type="number" placeholder="请输入信用卡卡号" v-model="bankcard"  />
				<view class="photo-box" @click="onSinngle">
					<image src="../../static/images/pho.png" mode=""></image>
					拍照识别
				</view>
			</h2>
			<h2>
				<p>预留手机号</p>
				<input type="number" v-model="phone" maxlength="11"  placeholder="请输入信用卡银行预留手机号" />
			</h2>
	<!-- 	</view>
		<view class="form-1"> -->
			<h2>
				<p>有效期</p>
				<input type="number" v-model="expiredTime" maxlength="4"  placeholder="请输入有效期(如09/22输入0922)" />
			</h2>

			<h2>
				<p>安全码</p>
				<input type="number" v-model="securityCode" maxlength="3"   placeholder="请输入安全码" />
			</h2>
			<h2>
				<p>账单日</p>
				<input type="number" v-model="billDay"  maxlength="2"  placeholder="请输入账单日" />
			</h2>
			<h2>
				<p>还款日</p>
				<input type="number" v-model="repaymentDay" maxlength="2"  placeholder="请输入还款日" />
			</h2>
		</view>
		<view class="tips">
			<p>注：</p>
			<p>1.同一张卡每天只能绑定五次，如有失败请第二天尝试 2.暂不支持借贷合—卡制定还款计划 </p>
		</view>
		<view class="btn" @click="bindCard">
			确定添加
		</view>
		 <w-compress ref='wCompress' />
<view class="showBox" v-if="showhb" @click="goback">
    <view class="center">
        <view class="showBoxContent">
            <image class="bookmark" mode="widthFix" src="https://daihuan.oss-cn-beijing.aliyuncs.com/tanchuang/hb.png"></image>
        </view>
<!--        <view class="btnLine">
            <button  class="buttonfix">确定</button>
        </view> -->
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
				showhb:0,
				bankName:"",// 	银行卡名称
				fullName:"",//		姓名
				bankcard:"",//		银行卡号
				phone:"",//		预留手机号
				expiredTime:"",//	有效期
				securityCode:"",//	安全码
				billDay:"",//		账单日
				repaymentDay:"",// 还款日
			};
		},
		onShow() {

		},
		onLoad(e) {
			this.api_getUser()
		},
		methods: {
			onSinngle() {
				// this.chooseimgs = index
			    uni.chooseImage({
			        count: 1,
			        success: res => {
			           
			            this.$refs.wCompress.start(res.tempFilePaths[0], {
							pixels: 100000,  // 最大分辨率，默认二百万
							quality: 0.8,     // 压缩质量，默认0.8
							type: 'png',      // 图片类型，默认jpg
							base64: false,     // 是否返回base64，默认false，非H5有效
						  })
			                .then(res => {
			                    // console.log(res)
			                    this.single = res
								this.savePicture(res)
			                    
			                })
			                .catch(e => {
			                    console.log(e)
			                    
			                })
			        }
			    })
			},
			
			  //把base64图片转为本地图片
				// 1构建为base64图片字符串
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
					console.log("url===",url)
					let t = this
						t.camera = url
						let body ={
							filePath:url
						}
						
						t.$api.api_ocrUploadBankcard(body).then(res=>{
							let r =  JSON.parse(res.data)
								console.log("r.code",r)
								if(r.code==0){
									// t.banknum = r.data.card_number
									// t.bankName = r.data.bank_name
									// t.bankcard = r.data.card_number
									// t.bank_name = r.data.bank_name
									t.bankcard = r.data.card_number
									t.bankName = r.data.bank_name
								}else{
									uni.showToast({
										title:"解析失败",
										icon:"none"
									})
								}
						}).catch(err=>{
						
						})
				
				},
			goback(){
				this.showhb = 0
				uni.navigateBack({
					
				})
			},
			//获取个人资料
				api_getUser(){
					let t = this
					let body = {
						id:uni.getStorageSync("users").id
					}
					this.$meapi.api_getUser(body).then(res=>{
						console.log("首页获取个人信息成功成功",res.data.selfLevel)
						if(res.code==0){
							
							t.fullName = res.data.fullname
						}
					
					}).catch(err=>{
						console.log("api_changeAlipay失败",err)
					
					})
				},
		// 拍摄银行卡
			photo(){
				let t = this
				console.log('上传图片'),
				uni.chooseImage({   //上传图片的内置方法
					count:1, //在h5浏览器限制不住
					success:res=>{
						// console.log(this)
						console.log("res.tempFilePaths[0]",res.tempFilePaths[0])
						let body ={
							filePath:res.tempFilePaths[0]
						}
						t.$api.api_ocrUploadBankcard(body).then(res=>{
							let bank = JSON.parse(res.data)
							console.log("bankcard",JSON.parse(res.data))
							this.bankcard = bank.data.card_number
							this.bankName = bank.data.bank_name
						}).catch(err=>{
						
						})
					}
				})
			},	
			// 绑定信用卡
			bindCard(){
				let t = this
				if(t.bankcard.length<10||t.phone.length!=11||t.expiredTime.length!=4||t.securityCode.length!=3||t.billDay.length==0||t.repaymentDay.length==0){
				console.log(t.bankcard.length,t.phone.length,t.expiredTime.length,t.securityCode.length,t.billDay.length,t.repaymentDay.length)
					uni.showToast({
						title:"请先完善资料",
						icon:"none"
					})
					return
				}
				let body = {
					 bankName:t.bankName,// 	银行卡名称
					fullname:t.fullName,//		姓名
					 bankcard:t.bankcard,//		银行卡号
					phone:t.phone,//		预留手机
					expiredTime:t.expiredTime,//	有效期
					securityCode:t.securityCode,//	安全码
					billDay:t.billDay,//		账单日
					repaymentDay:t.repaymentDay,// 还款日
				}
				this.$api.api_bindCard(body).then(res=>{
					console.log("api_bindCard成功",res)
					if(res.code==0){

						if(res.message=="first"){
							this.showhb=1
						}else{
							uni.showToast({
								title:"添加成功"
							})
							let timer = setTimeout( () => {
							   uni.navigateBack({
							   	
							   })		
							}, 500)
						}
	
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
				}).catch(err=>{
					console.log("api_bindCard失败",err)
				
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

	.header {
		width: 100%;
		position: relative;
		padding: 30upx;
		height: 207upx;
		padding-top: calc(var(--status-bar-height) + 30upx);
		min-height: 100upx;
		background-color: #46c7a9;
		.header-title-common {
			display: flex;
			align-items: center;
			width: 100%;
			justify-content: center;
			position: relative;
			// #ifdef H5
			padding-top: 50upx;
			// #endif
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

	h1 {
		background: #e3fff7;
		display: flex;
		align-items: center;
		padding: 30upx 50upx;
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
	}

	.form-1 {
		width: 690upx;
		background: #FFFFFF;
		box-shadow: 0px 8upx 22upx 2upx rgba(67, 67, 67, 0.13);
		border-radius: 20upx;
		padding: 0 16upx;
		margin: 0 auto;
		margin-top: 30upx;

		h2 {
			display: flex;
			align-items: center;
			border-bottom: 1upx solid #e1e1e1;
			padding: 20upx 0;
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;

			input {
				flex: 1;
				font-size: 24upx;
			}

			p {
				width: 170upx;
			}

			.photo-box {
				display: flex;
				align-items: center;
				flex-direction: column;
				font-size: 20upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;

				image {
					width: 43upx;
					height: 34upx;
					margin-bottom: 10upx;
				}
			}
		}


	}

	.tips {
		display: flex;
		padding: 60upx;

		p:first-child {
			width: 40upx;
			font-size: 26upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #46c7a9;
		}

		p:last-child {
			font-size: 26upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999999;
		}
	}

	.btn {
		height: 86upx;
		width: 660upx;
		margin: 0 auto;
		// background: linear-gradient(269deg, #D79F65 0%, #FDD8AA 100%);
		background-color: #46c7a9;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 34upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: white;
		border-radius: 20upx;
	}
	
	
	
	
	.showBox {
		    display: flex;
		    width: 100%;
		    height: 100%;
		    justify-content: center;
		    align-items: center;
		    background: rgba(0,0,0,0.5);
		    position: fixed;
		    top: 0;
		    left: 0;
		    z-index: 20;
		}
		
		.showBox .inner {
		    display: flex;
		    width: 80%;
		    flex-direction: column;
		    background: #fff;
		    border-radius: 20rpx;
		    overflow: hidden;
		}
		
		.showBox .inner {
		    display: flex;
		    width: 80%;
		    flex-direction: column;
		    background: #fff;
		    border-radius: 20rpx;
		    overflow: hidden;
		}
		
		.showBox .center {
		    display: flex;
		    width: 60%;
		    flex-direction: column;
		    background: #fff;
		    border-radius: 20rpx;
		    overflow: hidden;
		}
		
		.showBox .center .showBoxContent {
		    display: flex;
		    width: 100%;
		    flex-direction: column;
		}
		
		.showBox .center .showBoxContent .bookmark {
		    width: 100%;
		}
		
		.showBox .center .btnLine {
		    display: flex;
		    width: 100%;
		    border-top: 1px solid #eee;
		}
		
		.showBox .center .btnLine button {
		    display: flex;
		    width: 100%;
		    height: 80rpx;
		    justify-content: center;
		    align-items: center;
		    color: #4390EA;
		    font-size: 32rpx;
		}
</style>
