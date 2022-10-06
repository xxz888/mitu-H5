<template>
	<view class="container">
		<view class="header">
			<!-- <image src="https://daihuan.oss-cn-beijing.aliyuncs.com/shiming/roleCheck-bg%402x.png" class="bg-title"></image> -->
			<view class="header-title-common">
				<p @click="back" />
				<b>中介还款</b>
			</view>
		</view>
		<view class="tips-part">
			<image src="/static/images/medium/sousuo.png"></image>
			<input placeholder="可输入名字，手机号进行查询"/>
			<view>搜索</view>
		</view>
		<scroll-view class="users" scroll-y="true" @scrolltolower="addpeople">
			<view class="vv" v-for="(item ,index) in empower" :key="index">
				<image src="/static/head.jpg"  @click="goxyCard(item.id,item.fullname)"></image>
				<view class="vv2"  @click="goxyCard(item.id,item.fullname)">
					<view class="name" v-if="item.fullname==''||item.fullname==undefined">未实名<text style="font-size: 24upx;">{{item.username.substring(0,3)+"****"+item.username.substring(7,11)}}</text></view>
					<view class="name" v-else>{{item.fullname.substring(0,1)+" * "+item.fullname.substring(item.fullname.length-1,item.fullname.length)}}<text style="font-size: 24upx;">{{item.username.substring(0,3)+"****"+item.username.substring(item.username.length-4,item.username.length)}}</text></view>
					
					<view>执行中的计划：{{item.runAll}}</view>
				</view>
				<view class="vv2" style="margin-left: 80upx;"  @click="goxyCard(item.id,item.fullname)">
					<view class="name1">客户管理</view>
					<view>异常计划：{{item.failAll}}</view>
				</view>
				<image class="shanchu" src="/static/images/medium/sc.png" @click="delepeople(item.id)"></image>
			</view>
			<view v-if="zjs" class="jiazai">加载中...</view>
		</scroll-view>	
		
		<view class="btn" @click="add">
			<image src="/static/images/+@2x.png" mode=""></image>
			<p>添加用户</p>
		</view>
	</view>
</template>

<script>
	
	export default {

		data() {
			return {
				zjs:false,
				sizes:10,
				empower:[],
				name:""
				
			};
		},
		
		onShow() {
			this.getMyUsers()
			//this.getMyToken()
		},
		methods: {
			// 获取中介token
			getMyToken(userId){
				let t = this
				console.log("userId",userId)
				let body={
					userId:userId
					
				}
				t.$medapi.api_getMyToken(body).then(res=>{
					console.log("获取中介token",res)
					if(res.code==0){
						getApp().globalData.mediumToken=res.data
						uni.navigateTo({
							url:"addIdCard"
						})
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
				}).catch(err=>{
			
				})
			},
			// 删除中介用户
			delepeople(userId){
				let t = this
				console.log("userId=",userId)
				let body={
					userId:userId
					
				}
				uni.showModal({
					title:"温馨提示",
					content:"是否确认删除用户",
					success(res) {
						if(res.confirm){
							t.$medapi.api_closeEmpower(body).then(res=>{
								console.log("删除中介用户",res)
								if(res.code==0){
									t.getMyUsers()
								}else{
									uni.showToast({
										title:res.message,
										icon:"none"
									})
								}
							}).catch(err=>{
							
							})
						}
					}
				})

				

			},
			addpeople(){
				console.log("滚动到底部触发",this.zjs)
				this.zjs = true
				
				if(this.empower.length<this.sizes){
					return
				}
				this.sizes  = this.sizes+10
				this.getMyUsers()
			},
			
			// 获取中介还款用户
			getMyUsers(){
				let t = this
				let body = {
					page:1,
					size:t.sizes
				}
				this.$medapi.api_getMyUsers(body).then(res=>{
					console.log("获取中介还款用户成功",res.data)
					if(res.code==0){
						t.empower = res.data
						t.zjs = false
					}
				}).catch(err=>{
					console.log("api_getBalancePlanList失败",err)
				
				})
			},
			

			
			goxyCard(id,name){
				let t = this
				console.log("id=-===============",id)
				
				if(name==""||name==undefined){
					t.getMyToken(id)

					return
				}
				uni.navigateTo({
					url:"xyCard?id="+id+"&name="+name
				})
			},
			add(){
				uni.navigateTo({
					url:"adduser"
				})
			},

			back(){
				uni.navigateBack()
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
		padding-top: calc(var(--status-bar-height) + 30upx);
		height: 207upx;
		background-color: #46c7a9;
		.header-title-common {
			display: flex;
			align-items: center;
			width: 100%;
			justify-content: center;
			position: relative;
			//#ifdef H5
			margin-top: 58upx;
			//#endif
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

			p:last-child {
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #F7CF9E;
				position: absolute;
				right: 0;
			}
		}
	}

	.tips-part {
		width: 690upx;
		height: 69upx;
		background: #FFFFFF;
		box-shadow: 0px 8upx 22upx 2upx rgba(67, 67, 67, 0.13);
		border-radius: 10upx;
		margin: 30upx auto;
		display: flex;
		align-items: center;
			image{
				width: 35upx;
				height: 35upx;
				// padding-left: 20upx;
				margin-left: 20upx;
			}
			input{
				// background-color: red;
				width: 500upx;
				margin-left: 20upx;
				font-size: 24upx;
			}
			view{
				margin-left: 20upx;
				color: #46c7a9;
			}

}
	
	
	.users{
		// background-color: red;
		width: 750upx;
		height: 65vh;
		margin-top: 50upx;
		display: flex;
		
		.jiazai{
			color: #999999;
			display: flex;
			justify-content: center;
		}
		.vv{
			box-shadow: 0px 8upx 22upx 2upx rgba(67, 67, 67, 0.13);
			display: flex;
			height: 135upx;
			width: 691upx;
			margin-left: 30upx;
			align-items: center;
			image{
				width: 62upx;
				height: 62upx;
				margin-left: 29upx;
			}
			.vv2{
				font-size: 24upx;
				margin-left: 30upx;
				view{
					margin-top: 10upx;
				}
				.name{
					font-size: 30upx;
				}
				.name1{
					color: white;
					background-color: #46c7a9;
					height: 34upx;
					width: 128upx;
					display: flex;
					justify-content: center;
					border-radius: 10upx;
					align-items: center;
				}

				
			}
			.shanchu{
				width: 32upx;
				height: 32upx;
				margin-left: 50upx;
			}
		}
	}

	
	.btn {
		height: 86upx;
		// background: linear-gradient(269deg, #D79F65 0%, #FDD8AA 100%);
		background-color: #46c7a9;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: white;
		position: fixed;
		bottom: var(--window-bottom);
		width: 100%;
		left: 0;

		image {
			margin-right: 20upx;
			width: 30upx;
			height: 30upx;
		}
	}
</style>
