<template >
    <div class="ad-my-collect">
        <div class="collect-title">我的收藏</div>
        <MyCollectArticle :myFavorites="true"/>   
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import MyCollectArticle from '../articles/Articles.vue'
export default defineComponent({
    components:{
        MyCollectArticle
    },
    setup() {
        
    },
})
</script>
<style lang="scss">
    .ad-my-collect{
        .collect-title{
            width: 100%;
            height: 50px;
            background-color: white;
            margin-top: 2vh;
            text-align: center;
            line-height: 50px;
            font-size: 25px;
        }
    }
</style>