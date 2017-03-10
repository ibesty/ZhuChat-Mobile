import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	userInfo: {
		nickname: '',
		userID: '',
		userAvatar: 'avatar1',
		currentChat: false
	},
	userList: {},
	messageList: {},
	currentContact: {}
}

const mutations = {
	SET_USER_INFO(state, userInfo) {
		state.userInfo = userInfo
	},
	UPDATE_NICKNAME(state, nickname) {
		state.userInfo.nickname = nickname
	}, //仅仅用来同步nickname
	UPDATE_USER_LIST(state, userList) {
		state.userList = userList
	},
	INIT_MESSAGE_LIST(state, contactUserID) {
		if (typeof state.messageList[parseInt(contactUserID)] == 'undefined') {
			state.messageList[parseInt(contactUserID)] = new Array()
			console.log(state.messageList[parseInt(contactUserID)])
		}
	},
	UPDATE_MESSAGE_LIST(state, msgData) {
		let tempMsgList = state.messageList
		state.messageList = null //不置空无法触发computed
		if (msgData.msgType === 1) {
			if (typeof tempMsgList[parseInt(msgData.targetID)] == 'undefined') {
				tempMsgList[parseInt(msgData.targetID)] = new Array()
			}
			tempMsgList[parseInt(msgData.targetID)].push(msgData)
		} else if (msgData.msgType === 2) {
			if (typeof tempMsgList[parseInt(msgData.sourceID)] == 'undefined') {
				tempMsgList[parseInt(msgData.sourceID)] = new Array()
			}
			tempMsgList[parseInt(msgData.sourceID)].push(msgData)
		}
		state.messageList = tempMsgList
	},
	UPDATE_CURRENT_CONTACT(state, contactInfo) {
		state.currentContact = contactInfo
	}
}

const actions = {
	setUserInfo: function ({
		commit
	}, userInfo) {
		commit('SET_USER_INFO', userInfo)
	},
	updateUserList: function ({
		commit
	}, userList) {
		commit('UPDATE_USER_LIST', userList)
	},
	initMessageList: function ({
		commit
	}, contactUserID) {
		commit('INIT_MESSAGE_LIST', contactUserID)
	},
	updateMessageList: function ({
		commit
	}, msgData) {
		commit('UPDATE_MESSAGE_LIST', msgData)
	},
	updateCurrentContact: function ({
		commit
	}, contactInfo) {
		commit('UPDATE_CURRENT_CONTACT', contactInfo)
	}
}

export default new Vuex.Store({
	state,
	mutations,
	actions
})