<template>
    <ul class="homework-wrap">
        <li>{{item.taskName}}</li>
        <li>{{comCourse(item.courseId)}}</li>
        <li>{{startTime}}</li>
        <li>{{closeTime}}</li>
    </ul>
</template>
<script lang="ts">
import { computed, defineComponent, toRaw } from 'vue'
import { computedCourse } from '../../../utils/shared'
export default defineComponent({
    props:['item'],
    setup(props) {
        const startTime = computed(() => {
            const arr = props.item.addTime
            return arr[5] + arr[6] + '-' + arr[8] + arr[9]
        })
        const closeTime = computed(() => {
            const arr = props.item.closeTime
            return arr[5] + arr[6] + '-' + arr[8] + arr[9]
        })
        const comCourse = computedCourse
        return {
            comCourse,
            startTime,
            closeTime
        }
    },
})
</script>
<style lang="scss">
    .homework-wrap{
        cursor: pointer;
        font-size: 17px;
        &:hover{
            color: #CECECE;
            font-size: 19px;
            }
        display: flex;
        li{
            width: 20%;
            
        }
    }
</style>