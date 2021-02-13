import Mock from 'mockjs'


interface getCount {
    courseId?: string
}

interface sendEmail {
    adminId?: string,
    courseId?: string,
    userIdList?: string,
    title: string,
    text: string
}
Mock.mock('/admin', 'post', function (options: getCount) {
    
    return Mock.mock({
        font: 23,
        end: 43,
        py: 33,
    })
})

Mock.mock('/admin/sendDailyMail', 'post', function (options: sendEmail) {
    console.log(options)
    return Mock.mock({
        "error_code": 200,
        "message": "一共发送通知给2个邮箱,通知推送成功的有2个",
        "data": []
    })
})

Mock.mock('/admin/queryUsersInfo','get',function(options:any){
    console.log(options)
    return Mock.mock({
        "total": 4,
        "currentPage": 1,
        "totalPage": 1,
        "rows": 10,
        "items": [
            {
                "userId": "2019211290",
                "userName": "喜喜",
                "mail": "1114550440@qq.com",
                "major": "信管",
                "image": null,
                "grade": null
            },
            {
                "userId": "2019666",
                "userName": "验证邮箱",
                "mail": "2534232295@qq.com",
                "major": "电子商务",
                "image": "/image/picture5-2019666.jpg",
                "grade": null
            },
            {
                "userId": "2019777",
                "userName": "kkk",
                "mail": "wangjiahui20011014@163.com",
                "major": "信管",
                "image": null,
                "grade": null
            },
            {
                "userId": "201922222",
                "userName": "come",
                "mail": "wangjiahui20011014@163.com",
                "major": "电商",
                "image": null,
                "grade": "2021"
            }
        ]
      })
})