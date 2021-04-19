export interface Student {
    avgScore: number
    grade: string
    image: string
    mail: string
    major: string
    submitCount: number
    userId: string
    userName: string
}

export function computedStatistics(data: number[]):number[] {
    // 计算方差
    function calculateVariance(arr: number[]) {
        const average = calculateAverage(arr)
        let sum = 0
        arr.forEach(num => {
            sum += Math.pow(num - average, 2)
        })
        return parseFloat((sum / arr.length).toFixed(2))
    }

    // 计算均值
    function calculateAverage(arr: number[]): number {
        return arr.length ? arr.reduce((total: number, current: number) => {
            return total += current
        }) / arr.length : 0
    }

    // 计算极差
    function calculateRange(arr: number[]) {
        return arr[arr.length - 1] - arr[0]
    }

    // 计算中位数
    function calculateMiddle(arr: number[]) {
        if (arr.length % 2 === 0) {
            return (arr[arr.length / 2] + arr[arr.length / 2 - 1]) / 2
        } else {
            return arr[Math.floor(arr.length / 2)]
        }
    }

    // 计算四分位差
    function calculateQuartile(arr: number[]) {
        const down = (arr.length) / 4
        const up = arr.length - 1 - ((arr.length) / 4)
        const downQuartile = (arr[Math.ceil(down)] - arr[Math.floor(down)])
            * (down - Math.floor(down))
            + arr[Math.floor(down)]
        const upQuartile = (arr[Math.ceil(up)] - arr[Math.floor(up)])
            * (up - Math.floor(up))
            + arr[Math.floor(up)]
        return arr.length >= 2 ? (upQuartile - downQuartile) : 0
    }
    // 快速排序代码
    function quickSort(arr: number[]): Array<number> {
        if (arr.length <= 1) {
            return arr;
        }
        const pivotIndex = Math.floor(arr.length / 2);
        const pivot = arr.splice(pivotIndex, 1)[0];
        const left = [];
        const right = [];

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] < pivot) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
        return quickSort(left).concat([pivot], quickSort(right));
    };

    const sortArr = quickSort(data)
    // 计算中位数
    const middle = calculateMiddle(sortArr)
    // 计算均值
    const average = parseFloat(calculateAverage(sortArr).toFixed(2))
    // 计算极差
    const range = calculateRange(sortArr)
    // 计算四分位差
    const quartile = calculateQuartile(sortArr)
    // 计算方差
    const variance = calculateVariance(sortArr)
    // 计算标准差
    const deviation = parseFloat(Math.pow(variance, 0.5).toFixed(2))
    // 返回结果
    return data.length ? [middle, average, range, quartile, variance, deviation] : [0, 0, 0, 0, 0, 0]
}

// 从数组中提取平均成绩
export function calculateAverageScore(arr: Student[]):Array<number> {
    const averageScore:number[] = []
    arr.forEach(item=>{
        averageScore.push(item.avgScore)
    })
    return averageScore
}