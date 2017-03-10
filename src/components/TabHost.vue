<template>
	<div class="tab-host">
		<div class="tab-icon wechat"><img src="../assets/img/微信.png" alt="微信"><span>ZhuChat</span></div>
		<div class="tab-icon contacts"><img src="../assets/img/通讯录.png" alt="通讯录"><span>通讯录</span></div>
		<div class="tab-icon discovery"><img src="../assets/img/发现.png" alt="发现"><span>发现</span></div>
		<div class="tab-icon myself"><img src="../assets/img/我.png" alt="我"><span>我</span></div>
	</div>
</template>

<script>
	export default {
		name: 'TabHost'
	}
</script>

<style lang="scss">
	.tab-host {
		width: 100%;
		height: 50px;
		background: #f7f7f7;
		position: fixed;
		bottom: 0;
		left: 0;
		border-top: solid 1px #B2B2B2;
		.tab-icon {
			width: 25%;
			height: 50px;
			float: left;
			padding-top: 9px;
			text-align: center;
			img {
				display: block;
				height: 22px;
				margin: 0 auto;
			}
			span {
				position: relative;
				top: -2px;
				font-size: 0.7rem;
				color:  #949494;
			}
		}
	}
</style>