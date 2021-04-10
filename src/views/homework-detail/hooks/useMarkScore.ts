import { ElMessageBox, ElMessage } from 'element-plus'
import { markScore } from '../../../api/index'
import { DetailInfo, File, Person } from '../../../store/modules/admin/state'

interface MarkScore {
    handleMarkScore:(taskId:number, props:any) => void,
    handleMarkScoreConfirm: (taskId:number, score?:number) => void
}

export default function useMarkScore ():MarkScore {
    // 点击打分按钮
    function handleMarkScore(taskId:number,props:DetailInfo<Person, File>) {
        ElMessageBox.prompt('请输入分数', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPlaceholder:'分数为1-10之间的数字',
          inputPattern: /^(10|[1-9])$/,
          inputErrorMessage: '分数格式不正确'
        }).then(async({ value }) => {
            // 如果确认打分
            const score = Number.parseInt(value) as number
            const result = await handleMarkScoreConfirm(taskId,score)
            // 如果打分成功
            if(result.status === 200){
              // 修改当前用户分数
              props.score = score
              ElMessage({
                type:'success',
                message:`${result.data.message}`
              })
            }else{
              ElMessage({
                type:'error',
                message:`${result.data.message}`
              })
            }
        })
      }
      // 打分
      async function handleMarkScoreConfirm (taskId:number, score?:number) {
        console.log(score)
        const result = await markScore(taskId, score)
        return result
      }
      return {
          handleMarkScore,
          handleMarkScoreConfirm
      }
}