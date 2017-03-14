<template>
	<div class="chat-list">
		<div class="scroll-content">
			<div v-for="chatContact in this.noSelfContact" @click="selectContact(chatContact)" class="chat-item">
				<div class="contact-border">
					<div class="avatar">
						<img :src="chatContact.userAvatar" class="img">
					</div>

					<h3 class="nickname">
						<span class="nickname_text">{{chatContact.nickname}}</span>
					</h3>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Bus from '../bus.js'
	export default {
		name: 'ChatList',
		created() {
		},
		data() {
			return {
			}
		},
		computed: {
			userInfo: function(){
				return this.$store.state.userInfo
			},
			userList: function(){
				return this.$store.state.userList
			},
			noSelfContact: function () {
				let temp = []
				for (let contact in this.userList) {
					console.log(contact)
					if (contact != this.userInfo.userID) {
						temp.push(this.userList[contact])
					}
				}
				console.log(temp)
				return temp;
			}
		},
		methods: {
			selectContact: function (chatContact) {
				this.$store.dispatch('updateCurrentContact',chatContact)
				this.$router.push({
					name: 'ChatViewInterface',
					params: {
						userID: chatContact.userID
					}
				})
				console.log('selectContact')
			}
		}
	}
</script>

<style lang="scss">

	/*自定义滚动条样式*/
	
	::-webkit-scrollbar-track-piece {
		background-color: #EBEBEB;
	}
	
	 ::-webkit-scrollbar {
		width: 5px;
	}
	
	 ::-webkit-scrollbar-thumb {
		background: #999;
	}
	
	.chat-list {
		position: absolute;
		top: 90px;
		left: 0;
		bottom: 50px;
		overflow: auto;
		z-index: -1;
		width: 100%;
		.chat-item {
			width: 100%;
			height: 68px;
			cursor: pointer;
			&:active {
				background: #D9D9D9;
			}
			&:last-child {
				border-bottom: 1px solid #D9D9D9;
			}
			.contact-border {
				height: 100%;
				margin: 0 10px;
				border-top: 1px solid #D9D9D9;
				.avatar {
					float: left;
					margin-right: 10px;
					margin-top: 9px;
					.img {
						display: block;
						width: 50px;
						height: 50px;
						border-radius: 5px;
					}
				}
				.nickname {
					margin-top: 10px;
					font-weight: 400;
					font-size: 1rem;
					color: #000;
				}
			}
		}
	}
</style>