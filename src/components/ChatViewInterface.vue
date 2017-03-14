<template>
	<div class="chat-view" @keyup.enter="sendMessage">
		<div id="message-area" class="message-area">
			<div v-for="message in messageList[parseInt(this.$route.params.userID)]" class="message-item">
				<div class="clearfix" :class="{'system_msg' : message.msgType == 0,'self_msg': message.msgType == 1,'other_msg': message.msgType == 2}">
					<img v-if="message.msgType !== 0" :src="message.msgType === 1 ? userInfo.userAvatar :currentContact.userAvatar" class="img">
					<div class="msg_text">
						<span class="text_content">
                                    {{message.msgText}}
                        </span>
					</div>
				</div>
			</div>
		</div>
		<div class="tool-area">
			<img src="../assets/img/voice.png" alt="voice" class="voice-icon">
			<img src="../assets/img/emoji.png" alt="emoji" class="emoji-icon">
			<div class="input-area">
				<input v-model="messageText" type="search" class="message-input">
			</div>
			<div @click="sendMessage" class="send-btn">发送</div>
		</div>
	</div>
</template>

<script>
	import Bus from '../bus.js'
	export default {
		name: 'ChatViewInterface',
		created() {
			if (typeof this.currentContact == 'undefined') {
				this.$router.replace({
					path: '/list'
				})
			}
			//this.$store.dispatch('initMessageList', this.$route.params.userID)
			//console.log('Chat to '+ this.currentContact.nickname)
		},
		data() {
			return {
				messageText: ''
			}
		},
		computed: {
			userInfo: function () {
				return this.$store.state.userInfo
			},
			userList: function () {
				return this.$store.state.userList
			},
			messageList: function () {
				return this.$store.state.messageList
			},
			currentContact: function () {
				return this.userList[parseInt(this.$route.params.userID)]
			}
		},
		watch: {
			messageList: function () {
				this.$nextTick(function () {
					document.querySelector('#message-area').scrollTop = document.querySelector('#message-area').scrollHeight
				})
			}
		},
		methods: {
			sendMessage: function () {
				if (this.messageText.trim() === '') {
					alert('不能发送空白消息')
				} else {
					let msgData = {
						sourceID: this.$store.state.userInfo.userID,
						targetID: this.currentContact.userID,
						msgText: this.messageText,
						msgType: 1
					}
					this.$store.dispatch('updateMessageList', msgData)
					this.$socket.emit('message', msgData)
					this.messageText = ''
					console.log('发送成功' + msgData.targetID)
					console.log(this.$store.state.messageList)
					console.log(parseInt(this.$route.params.userID))
				}
			}
		}
	}
</script>

<style lang="scss">
	.chat-view {
		position: absolute;
		left: 0;
		top: 45px;
		bottom: 0;
		width: 100%;
		background: #EBEBEB;
		.message-area {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 50px;
			width: 100%;
			padding: 0 10px;
			overflow: auto;
			.message-item {
				width: 100%;
				min-height: 42px;
				margin: 15px 5px;
				.msg_text {
					position: relative;
					word-wrap: break-word;
					word-break: break-all;
					max-width: 250px;
					min-height: 40px;
					margin: 0 10px;
					padding: 9px 10px;
					font-size: 1rem;
					background: #A0E75A;
					border-radius: 5px;
				}
				.img {
					width: 40px;
					height: 40px;
				}
				.self_msg {
					.msg_text,
					.img {
						float: right;
					}
					.msg_text {
						&:after {
							content: "";
							position: absolute;
							left: 99%;
							top: 14px;
							border: 6px solid transparent;
							border-left-color: #B2E281
						}
					}
				}
				.other_msg {
					.msg_text,
					.img {
						float: left;
					}
					.msg_text {
						background: #CCC;
						&:before {
							content: "";
							position: absolute;
							right: 99%;
							top: 14px;
							border: 6px solid transparent;
							border-right-color: #CCC;
						}
					}
				}
			}
		}
		.tool-area {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 50px;
			background: #F5F5F6;
			border-top: 1px solid #D7D7D9;
			.voice-icon {
				position: absolute;
				left: 5px;
				bottom: 11px;
				height: 28px;
				width: 28px;
			}
			.emoji-icon {
				position: absolute;
				right: 48px;
				bottom: 11px;
				height: 28px;
				width: 28px;
			}
			.send-btn {
				position: absolute;
				right: 5px;
				bottom: 11px;
				width: 40px;
				height: 28px;
				line-height: 28px;
				font-size: 0.9rem;
				text-align: center;
				color: #FFF;
				background: #18AF12;
				border: 1px solid darken(#18AF12, 10%);
				border-radius: 4px;
				cursor: pointer;
			}
			.input-area {
				position: absolute;
				left: 42px;
				bottom: 7.5px;
				right: 80px;
				height: 35px;
				.message-input {
					width: 100%;
					height: 100%;
					border: 1px solid #DDDDDD;
					border-radius: 4px;
					font-size: 1rem;
				}
			}
		}
	}
	
	.clearfix:after {
		content: ".";
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}
</style>