import { ElMessage } from "_element-plus@1.0.2-beta.40@element-plus";

type UsePbulishTask = (taskName:string, closeTime:Date) => boolean

const usePbulishTask:UsePbulishTask = (taskName:string, closeTiem:Date)=>{
    console.log(closeTiem)
    if(!taskName || !closeTiem){
        ElMessage({
            type:'error',
            message:'请检查信息是否填写完整！'
        })
        return false
    }
    return true
}

export default usePbulishTask