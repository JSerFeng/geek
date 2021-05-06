import { ElMessage } from "_element-plus@1.0.2-beta.41@element-plus"

type UsePbulishTask = (taskName:string, closeTime:Date) => boolean

const usePbulishTask:UsePbulishTask = (taskName:string, closeTiem:Date)=>{
    if(!taskName || !closeTiem){
        ElMessage({
            type:'error',
            message:'请检查信息是否填写完整！'
        })
        return false
    }else{
        if(closeTiem.getTime() < Date.now()){
            ElMessage({
                type:'error',
                message:'日期不能选择以前的！'
            })
            return false
        }
        return true
    }
}

export default usePbulishTask