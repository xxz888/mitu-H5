<template>
	<view class="step3-container">
		<view class="warning-box">
			请添加本人储蓄卡作为结算卡，该卡作为后续刷卡、提现资金的结算账号，户名必须与实名认证姓名一致
		</view>
		<view class="tips">
			*建议:工商、农业、交通、招商、民生、华夏、平安等一类卡(不支持二类卡及地方性银行)
		</view>
		<view class="photo-box" @click="onSinngle">
			<image :src="camera"></image>
		</view>
		<view class="input-box">
			<p>账户姓名</p>
			<input type="text" :value="name" disabled=""/>
		</view>
		<view class="input-box card-box">
			<h1>
				<p>银行卡号</p>
				<input type="number" style="width: 400upx;" maxlength="32" v-model="banknum" placeholder="请扫描银行卡或输入卡号" />
			</h1>
			<b>请核对卡号信息是否正确，若有误，请手动修改</b>
		</view>
		
		<pick-regions @getRegion="handleGetRegion">
			<view class="input-box" style="padding: 30upx 0;border: none;">
				<p>开户行地点</p>
				<a>{{bankAddress}}</a>
				<p/>
			</view>
		</pick-regions>
		
		<view class="input-box" style="border: none;">
			<p>手机号</p>
			<input type="number" maxlength="11" v-model="phone"  placeholder="请输入银行预留手机号" />
		</view>
		<view class="btn" @click="bindDebitCard">
			确定绑卡
		</view>
		 <w-compress ref='wCompress' />
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
				camera: require('@/static/upcard.png'),
				name: uni.getStorageSync("cardName"),
				banknum:"",
				array:[
					'南京人民银行支行',
					'北京建设银行朝阳路支行'
				],
				bankAddress:'请选择开户行地点',
				phone:"",
				bankName:""
			}
		},

		methods: {
			
			onSinngle() {
				// this.chooseimgs = index
			    uni.chooseImage({
			        count: 1,
			        success: res => {
			           
			            this.$refs.wCompress.start(res.tempFilePaths[0], {
							pixels: 100000,  // 最大分辨率，默认二百万
							quality: 0.5,     // 压缩质量，默认0.8
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
									t.banknum = r.data.card_number
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
	

			// 获取选择的地区
			handleGetRegion(area) {
				console.log(area)
				this.bankAddress =`${area[0].name}${area[1].name}`
			},
			// 绑定储蓄卡
			bindDebitCard(){
				let t = this
				if(t.phone.length!=11){
					uni.showToast({
						title:"请先完善信息",
						icon:"none"
					})
					return
				}
				let body={
					fullname:uni.getStorageSync("cardName"),//		用户名
					bankName:t.bankName,// 	银行卡名称
					bankcard:t.banknum,// 		银行卡号
					provinceCity:t.bankAddress,// 	开户地 x省-x市
					phone:t.phone,// 		预留手机号
				}
				
				t.$api.api_bindBankcard(body).then(res=>{
					if(res.code==0){
						uni.switchTab({
							url:"/pages/index/index"
						})
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
				}).catch(err=>{
					console.log("err=",err)
				
				})
			},
			
		}

	}
</script>

<style lang="scss">
	.step3-container {
		padding-top: 115upx;

		.warning-box {
			width: 750upx;
			height: 85upx;
			background: #e3fff7;
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
			color: #46c7a9;
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
				width: 200upx;
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
				color: #46c7a9;
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
</style>
