<template>
  <div id="app">
    <modal v-if="modal_show">
      <h3 class="modal-title" slot="header">请输入一个名字</h3>
      <input class="input-nickname" slot="body" type="text" name="username" value="" maxlength="10" autofocus v-model="nickname">
      <div class="confirm-btn" slot="footer" @click="close(),login()">确定</div>
    </modal>
    <top-bar></top-bar>
    <router-view></router-view>
  </div>
</template>

<script>
  import TopBar from './components/TopBar.vue'
  import Modal from './components/Modal.vue'
  import blockies from './assets/js/blockies.min.js'

  const avatar1 = require('./assets/img/avatar.jpg')
  const avatar2 = require('./assets/img/contact-avatar.jpg')

  export default {
    name: 'app',
    components: {
      'top-bar': TopBar,
      'modal': Modal
    },
    created() {
      let userInfo = {}

      userInfo.nickname = localStorage.getItem('nickname') || ''
      userInfo.userID = localStorage.getItem('userID') || this.rand()
      userInfo.userAvatar = localStorage.getItem('userAvatar') || this.createAvatar()
      userInfo.currentChat = false

      this.setUserInfo(userInfo)
      if (this.nickname != '') {
        this.modal_show = false
        this.login()
      }
    },
    data() {
      return {
        currentContact: {},
        modal_show: true
      }
    },
    computed: {
      userInfo: function(){
        return this.$store.state.userInfo
      },
      userList: function(){
        return this.$store.state.userList
      },
      messageList: function () {
				return this.$store.state.messageList
			},
      currentContact: function(){
				return this.userList[parseInt(this.$route.params.userID)]
      },
      nickname: {
        get () {
          return this.$store.state.userInfo.nickname
        },
        set (nickname) {
          this.$store.commit('UPDATE_NICKNAME',nickname)
        }
      }
    },
    methods: {
      setUserInfo: function(userInfo){
        this.$store.dispatch('setUserInfo',userInfo)
      },
      close: function () {
        this.userInfo.nickname.trim() === '' ? alert('请输入一个名字') : this.modal_show = false
      },
      rand: function rand() {
        return Math.floor((Math.random() * (10 - 1) + 1) * 10000000)
      },
      login: function () {
        localStorage.setItem('userID', this.userInfo.userID)
        localStorage.setItem('nickname', this.userInfo.nickname)
        localStorage.setItem('userAvatar',this.userInfo.userAvatar)
        this.$socket.emit('login', this.userInfo)
      },
      createAvatar: function() {
        let avatar = window.blockies.create({
          size: 10,
          scale: 4
          })
        let src = avatar.toDataURL("image/png")
        //console.log(src)
        return src
      }
    },
    sockets: {
      connect: function () {
        console.log('socket connected')
        //this.login()
      },
      login: function (data) {
        let userInfo = data.userInfo
        this.$store.dispatch('updateUserList',data.userList)
        console.log(userInfo)
        console.log(Object.keys(data.userList))
        console.log(this.userList)
        //this.userList.push(userInfo)
        console.log(userInfo.nickname + '已登陆')
        for (var item in this.userList) {
          console.log('昵称: ' + this.userList[item].nickname + ' | ID: ' + this.userList[item].userID)
        }
      },
      message: function (msgData) {
        // if (typeof this.messageList[parseInt(msgData.sourceID)] == 'undefined') {
        //   //this.messageList[parseInt(msgData.sourceID)] = new Array()
        //   console.log(msgData)
        // }
        //this.messageList[parseInt(msgData.sourceID)] = new Array
        //this.messageList[parseInt(msgData.sourceID)].push(msgData)
        this.$store.dispatch('updateMessageList',msgData)
        document.querySelector('#message-area').scrollTop = document.querySelector('#message-area').scrollHeight
        console.log('收到了 ' + msgData.sourceID + ' 发来的消息: ' + msgData.msgText)
        console.log(this.$store.state.messageList)
        //console.log(this.messageList[parseInt(msgData.sourceID)])
      }
    }
  }
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
  }
  
  html {
    font-size: 16px;
    overflow: hidden;
  }
  
  #app {
    font-family: 'Microsoft Yahei', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    .modal-title {
      color: #18AF12
    }

    .input-nickname {
      width: 60%;
			height: 26px;
			color: #8E8E93;
			border: 1px solid #AAAAAA;
			border-radius: 4px;
			&::placeholder {
				text-align: center;
			}
    }

    .confirm-btn {
        width: 40px;
				height: 28px;
				line-height: 28px;
				font-size: 0.9rem;
				text-align: center;
				color: #FFF;
        margin: 0 auto;
				background: #18AF12;
				border: 1px solid darken(#18AF12, 10%);
				border-radius: 4px;
				cursor: pointer;
    }
  }

</style>