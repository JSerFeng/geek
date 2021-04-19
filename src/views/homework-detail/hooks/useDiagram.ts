import * as echarts from "echarts";
import { getHomeworkSubmitStatus } from '../../../api/index'
// 负责处理echart部分的逻辑数据
export default async function useDiagram(taskId: number) {
    const submitStatus = await getHomeworkSubmitStatus(taskId)
    const chartDom = document.getElementById("diagram") as HTMLDivElement;
    const myChart = echarts.init(chartDom);
    const option = {
        title: {
            text: "提交情况",
            subtext: "该作业的提交百分比",
            left: "center",
        },
        tooltip: {
            trigger: "item",
        },
        legend: {
            orient: "vertical",
            left: "left",
        },
        series: [
            {
                type: "pie",
                radius: "50%",
                data: [
                    { value: submitStatus.data.submitPeople, name: "已提交" },
                    { value: submitStatus.data.unSubmitPeople, name: "未提交" },
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                    },
                },
            },
        ],
    }

    option && myChart.setOption(option);
}