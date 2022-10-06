<template>
	<view class="step1-container">
		<h1>请拍摄并上传你的身份证照片</h1>
		<view class="img-box">
			<image :src="zm" mode="" @click="onSinngle(1)" ></image>
			<image :src="fm" mode="" @click="onSinngle(2)"></image>
		</view>
		<view class="id-box" @click="previewImage">
			<h2>
				<p>姓名</p>
				<input type="text"  v-model="name" placeholder="未获取到真实姓名" />
			</h2>
			<h2>
				<p>身份证号</p>
				<input type="text" maxlength="18"  v-model="cardnumber" placeholder="请扫描身份证或者输入身份证号" />
			</h2>
		</view>
		<view class="btn" @click="next">
			人脸认证
		</view>
		 <w-compress ref='wCompress' />
	</view>
	
</template>

<script>
	import WCompress from '@/components/w-compress/w-compress.vue'
	export default{
		    components: {
		        WCompress
		    },
		data(){
			return{
				name:"",
				cardnumber:"",
				zm:require('@/static/images/zm.png'),
				fm:require('@/static/images/fm.png'),
				i:[],
				chooseimgs:"",
				zmTure:0,
				fmTure:0
			}
		},
		
		methods:{
			
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
					console.log("url===",url)
					let t = this
					if(this.chooseimgs == 1){
						t.zm = url
						let body ={
							filePath:url
						}
						
						t.$api.api_ocrUploadA(body).then(res=>{
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
							filePath:url
						}
						t.fm = url
						t.$api.api_ocrUploadB(body).then(res=>{
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
			
				//预览轮播图
				previewImage:function(){
					var i = [] //获取当前页面的轮播图数据
					i.push(this.zm)
					//uniapp预览轮播图
					console.log("i=",i)
					uni.previewImage({
						current:1, //预览图片的下标
						urls:i //预览图片的地址，必须要数组形式，如果不是数组形式就转换成数组形式就可以
					})
				},	
						
				next(){
					let t = this
					if(t.name==''||t.cardnumber==''){
						uni.showToast({
							title:"请上传身份证",
							icon:"none"
						})
						return
					}
					let body ={
							fullname:t.name	,//姓名
							idcard:	t.cardnumber,//	身份证号
						// fullname:"罗鸿"	,//姓名
						// idcard:	"500222199206151217",//	身份证号
						}
						t.$api.api_addmynames(body).then(res=>{
							console.log("e====================================",res.code)
							if(res.code==0){
								this.$emit('update:step',2)
							}else{
								uni.showModal({
									title:"温馨提示",
									content:res.data
								})
							}
							
						}).catch(err=>{
					
					})
					
				}		
			// next(){
				
			// 	if(this.zmTure == 1&this.fmTure==1){
			// 		this.$emit('update:step',2)
			// 	}else{
			// 		uni.showToast({
			// 			title:"请先完善信息",
			// 			icon:"none"
			// 		})
			// 	}
				
			// }
		}
	}
</script>

<style lang="scss">
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
					width: 150upx;
				}
				input{
					flex: 1;
				}
			}
		}
		.btn{
			height: 91upx;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #46c7a9;
			border-radius: 20upx;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
		}
	}
</style>
