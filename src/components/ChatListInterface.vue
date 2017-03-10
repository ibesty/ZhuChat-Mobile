<template>
  <div class="chat-list-interface">
    <search-bar></search-bar>
    <chat-list></chat-list>
    <tab-host></tab-host>
  </div>
</template>
<script>
  
  import SearchBar from './SearchBar.vue'
  import TabHost from './TabHost.vue'
  import ChatList from './ChatList.vue'

  export default {
    name: 'ChatListInterface',
    components: {
      'search-bar': SearchBar,
      'tab-host': TabHost,
      'chat-list': ChatList
    }
  }
</script>