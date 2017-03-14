<template>
	<div class="search-bar">
		<input id="search-text" class="search-input" type="search" placeholder="搜索">
	</div>
</template>

<script>
	export  default {
		name: 'SearchBar'
	}
</script>

<style lang="scss">
	.search-bar {
		position:  absolute;
		left: 0;
		top: 45px;
		width: 100%;
		height: 45px;
		padding: 10px;
		background: #EFEFF4;
		border-bottom: 1px solid #D6D7DC;
		.search-input {
			width: 100%;
			height: 26px;
			background: url('../assets/img/search.png') no-repeat 43% center/15px 15px #FFF;
			color: #8E8E93;
			border: 1px solid #EEFEF3;
			border-radius: 4px;
			&::placeholder {
				text-align: center;
			}
		}
	}
</style>