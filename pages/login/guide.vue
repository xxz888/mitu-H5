<template>
	<view class="container" @click="go">
		<image src="../../static/images/gud.png" mode=""></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		onShow() {
			let t = this
			let body = {
				id:uni.getStorageSync("users").id
			}
			 this.$meapi.api_getUser(body).then(res=>{
				  console.log("api_getUser成功",res)
				  let timer = setTimeout( () => {
				     if(res.code==0){
				     	uni.switchTab({
				     		url:"/pages/index/index"
				     	})
				     }else{
				     	uni.reLaunch({
				     		url:'/pages/login/login'
				     	})
				     }
				  }, 2000)

				}).catch(err=>{
					uni.reLaunch({
						url:'/pages/login/login'
					})
				})
			
			// let timer = setTimeout( () => {
			//     this.go()	
			// }, 3000)
		},
		methods:{
		
			
			go(){


			}
		}
	}
</script>

<style lang="scss">
	.container{
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}
image{
	width: 100%;
	height: 100%;
}
</style>
