<template>
    <div class="homework-management">
        <ul>
            <li></li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { getAdminHomework } from '../../../api/index'
export default defineComponent({
    props:{

    },
    setup(props) {
        onMounted(async()=>{
            const adminHomework = await getAdminHomework()
        })
    },
})
</script>
<style lang="scss">
    
</style>