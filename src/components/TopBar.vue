<template>
    <div class="top">
        <div class="status-bar"></div>
        <div class="top-bar">
            <span class="top-bar-text">{{topbarText}}</span>
        </div>

    </div>
</template>
<script>
    export default {
        name: 'TopBar',
        data() {
            return {
            }
        },
        computed: {
            currentContact:function(){
                return this.$store.state.currentContact
            },
            topbarText: function(){
                return this.$route.name === 'ChatListInterface' ? 'ZhuChat' : this.currentContact.nickname
            }
        }
    }
</script>
<style lang='scss'>
    .top {
        width: 100%;
        position: fixed;
        left: 0;
        top: 0;
        /*status bar 高度为20px,但是不显示*/
        .status-bar {
            display: none;
            width: 100%;
            height: 20px;
            background: #39383e;
        }
        .top-bar {
            width: 100%;
            height: 45px;
            background: #39383e;
            text-align: center;
            .top-bar-text {
                color: #fff;
                font-size: 1rem;
                line-height: 45px;
            }
        }
    }
</style>