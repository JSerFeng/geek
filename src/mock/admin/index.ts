// import Mock from 'mockjs'


// interface getCount {
//     courseId?: string
// }


// interface sendEmail {
//     adminId?: string,
//     courseId?: string,
//     userIdList?: string,
//     title: string,
//     text: string
// }
// Mock.mock('/admin', 'post', function (options: getCount) {
    
//     return Mock.mock({
//         font: 23,
//         end: 43,
//         py: 33,
//     })
// })

// Mock.mock('/admin/sendDailyMail', 'post', function (options: sendEmail) {
//     console.log(options)
//     return Mock.mock({
//         "error_code": 200,
//         "message": "一共发送通知给2个邮箱,通知推送成功的有2个",
//         "data": []
//     })
// })

// Mock.mock('/admin/queryUsersInfo','get',function(options:any){
//     console.log(options)
//     return Mock.mock({
//         "total": 4,
//         "currentPage": 1,
//         "totalPage": 1,
//         "rows": 10,
//         "items": [
//             {
//                 "userId": "2019211290",
//                 "userName": "喜喜",
//                 "mail": "1114550440@qq.com",
//                 "major": "信管",
//                 "image": null,
//                 "grade": null
//             },
//             {
//                 "userId": "2019666",
//                 "userName": "验证邮箱",
//                 "mail": "2534232295@qq.com",
//                 "major": "电子商务",
//                 "image": "/image/picture5-2019666.jpg",
//                 "grade": null
//             },
//             {
//                 "userId": "2019777",
//                 "userName": "kkk",
//                 "mail": "wangjiahui20011014@163.com",
//                 "major": "信管",
//                 "image": null,
//                 "grade": null
//             },
//             {
//                 "userId": "201922222",
//                 "userName": "come",
//                 "mail": "wangjiahui20011014@163.com",
//                 "major": "电商",
//                 "image": null,
//                 "grade": "2021"
//             }
//         ]
//       })
// })

// Mock.mock('/admin/queryUsersInfo', 'get', function(options:any){
//     console.log(options)
//     return Mock.mock({
//         "error_code": 200,
//         "message": "success",
//         "data": {
//             "total": 4,
//             "currentPage": 1,
//             "totalPage": 1,
//             "rows": 10,
//             "items": [
                
//                 {
//                     "userId": "2019211290",
//                     "userName": "喜喜",
//                     "mail": "1114550440@qq.com",
//                     "major": "信管",
//                     "image": null,
//                     "grade": null
//                 },
//                 {
//                     "userId": "2019666",
//                     "userName": "验证邮箱",
//                     "mail": "2534232295@qq.com",
//                     "major": "电子商务",
//                     "image": "/image/picture5-2019666.jpg",
//                     "grade": null
//                 },
//                 {
//                     "userId": "2019777",
//                     "userName": "kkk",
//                     "mail": "wangjiahui20011014@163.com",
//                     "major": "信管",
//                     "image": null,
//                     "grade": null
//                 },
//                 {
//                     "userId": "201922222",
//                     "userName": "come",
//                     "mail": "wangjiahui20011014@163.com",
//                     "major": "电商",
//                     "image": null,
//                     "grade": "2021"
//                 },
//                 {
//                     "userId": "2019211290",
//                     "userName": "喜喜",
//                     "mail": "1114550440@qq.com",
//                     "major": "信管",
//                     "image": null,
//                     "grade": null
//                 },
//                 {
//                     "userId": "2019666",
//                     "userName": "验证邮箱",
//                     "mail": "2534232295@qq.com",
//                     "major": "电子商务",
//                     "image": "/image/picture5-2019666.jpg",
//                     "grade": null
//                 },
//                 {
//                     "userId": "2019777",
//                     "userName": "kkk",
//                     "mail": "wangjiahui20011014@163.com",
//                     "major": "信管",
//                     "image": null,
//                     "grade": null
//                 },
//                 {
//                     "userId": "201922222",
//                     "userName": "come",
//                     "mail": "wangjiahui20011014@163.com",
//                     "major": "电商",
//                     "image": null,
//                     "grade": "2021"
//                 },
//                 {
//                     "userId": "2019211290",
//                     "userName": "喜喜",
//                     "mail": "1114550440@qq.com",
//                     "major": "信管",
//                     "image": null,
//                     "grade": null
//                 },
//                 {
//                     "userId": "2019666",
//                     "userName": "验证邮箱",
//                     "mail": "2534232295@qq.com",
//                     "major": "电子商务",
//                     "image": "/image/picture5-2019666.jpg",
//                     "grade": null
//                 },
//                 {
//                     "userId": "2019777",
//                     "userName": "kkk",
//                     "mail": "wangjiahui20011014@163.com",
//                     "major": "信管",
//                     "image": null,
//                     "grade": null
//                 },
//                 {
//                     "userId": "201922222",
//                     "userName": "come",
//                     "mail": "wangjiahui20011014@163.com",
//                     "major": "电商",
//                     "image": null,
//                     "grade": "2021"
//                 },
//                 {
//                     "userId": "2019211290",
//                     "userName": "喜喜",
//                     "mail": "1114550440@qq.com",
//                     "major": "信管",
//                     "image": null,
//                     "grade": null
//                 },
//                 {
//                     "userId": "2019666",
//                     "userName": "验证邮箱",
//                     "mail": "2534232295@qq.com",
//                     "major": "电子商务",
//                     "image": "/image/picture5-2019666.jpg",
//                     "grade": null
//                 },
//                 {
//                     "userId": "2019777",
//                     "userName": "kkk",
//                     "mail": "wangjiahui20011014@163.com",
//                     "major": "信管",
//                     "image": null,
//                     "grade": null
//                 },
//                 {
//                     "userId": "201922222",
//                     "userName": "come",
//                     "mail": "wangjiahui20011014@163.com",
//                     "major": "电商",
//                     "image": null,
//                     "grade": "2021"
//                 },
//                 {
//                     "userId": "2019211290",
//                     "userName": "喜喜",
//                     "mail": "1114550440@qq.com",
//                     "major": "信管",
//                     "image": null,
//                     "grade": null
//                 },
//                 {
//                     "userId": "2019666",
//                     "userName": "验证邮箱",
//                     "mail": "2534232295@qq.com",
//                     "major": "电子商务",
//                     "image": "/image/picture5-2019666.jpg",
//                     "grade": null
//                 },
//                 {
//                     "userId": "2019777",
//                     "userName": "kkk",
//                     "mail": "wangjiahui20011014@163.com",
//                     "major": "信管",
//                     "image": null,
//                     "grade": null
//                 },
//                 {
//                     "userId": "201922222",
//                     "userName": "come",
//                     "mail": "wangjiahui20011014@163.com",
//                     "major": "电商",
//                     "image": null,
//                     "grade": "2021"
//                 },
//                 {
//                     "userId": "2019211290",
//                     "userName": "喜喜",
//                     "mail": "1114550440@qq.com",
//                     "major": "信管",
//                     "image": null,
//                     "grade": null
//                 },
//                 {
//                     "userId": "2019666",
//                     "userName": "验证邮箱",
//                     "mail": "2534232295@qq.com",
//                     "major": "电子商务",
//                     "image": "/image/picture5-2019666.jpg",
//                     "grade": null
//                 },
//                 {
//                     "userId": "2019777",
//                     "userName": "kkk",
//                     "mail": "wangjiahui20011014@163.com",
//                     "major": "信管",
//                     "image": null,
//                     "grade": null
//                 },
//                 {
//                     "userId": "201922222",
//                     "userName": "come",
//                     "mail": "wangjiahui20011014@163.com",
//                     "major": "电商",
//                     "image": null,
//                     "grade": "2021"
//                 },
               
//             ]
//         }
//     })
// })

// Mock.mock('/admin/queryMyTasks','get', function (options:any){
//     return Mock.mock({
//         "error_code": 200,
//         "message": "查询作业成功",
//         "data": {
//             "total": 5,
//             "taskPOList": [
//                 {
//                     "id": 1,
//                     "courseId": 2,
//                     "adminId": "2019133111",
//                     "taskName": "第二次作业",
//                     "addTime": "2021-02-08:23-23-29",
//                     "closeTime": "2022-05-29:11-22-19",
//                     "commitLate": 0,
//                     "isClosed": 0,
//                     "weight": 5,
//                     "taskFileVOList": [
//                         {
//                             "fileName": "符号引用和直接引用.md",
//                             "filePath": "http://localhost:8080/source/task/1/1/符号引用和直接引用.md",
//                             "addTime": "2021-02-10:22-01-33"
//                         },
//                         {
//                             "fileName": "反射概述.md",
//                             "filePath": "http://localhost:8080/source/task/2/1/反射概述.md",
//                             "addTime": "2021-02-13:13-10-47"
//                         }
//                     ],
//                     "filePath": null
//                 },
//                 {
//                     "id": 6,
//                     "courseId": 1,
//                     "adminId": "2019133111",
//                     "taskName": "第一次作业",
//                     "addTime": "2021-02-08:23-45-56",
//                     "closeTime": "2021-02-10:13-19-20",
//                     "commitLate": 0,
//                     "isClosed": 1,
//                     "weight": 2,
//                     "taskFileVOList": [
//                         {
//                             "fileName": "valid与lombok.md",
//                             "filePath": "http://localhost:8080/source/task/1/6/valid与lombok.md",
//                             "addTime": "2021-02-09:22-00-41"
//                         },
//                         {
//                             "fileName": "符号引用和直接引用.md",
//                             "filePath": "http://localhost:8080/source/task/1/6/符号引用和直接引用.md",
//                             "addTime": "2021-02-09:22-00-41"
//                         }
//                     ],
//                     "filePath": null
//                 },
//                 {
//                     "id": 12,
//                     "courseId": 1,
//                     "adminId": "2019133111",
//                     "taskName": "第一次作业",
//                     "addTime": "2021-02-10:21-56-45",
//                     "closeTime": "2021-02-20:12-15-29",
//                     "commitLate": 0,
//                     "isClosed": 0,
//                     "weight": 2,
//                     "taskFileVOList": [
//                         {
//                             "fileName": "反射概述.md",
//                             "filePath": "http://localhost:8080/source/task/1/12/反射概述.md",
//                             "addTime": "2021-02-10:22-00-50"
//                         }
//                     ],
//                     "filePath": null
//                 },
//                 {
//                     "id": 17,
//                     "courseId": 1,
//                     "adminId": "2019133111",
//                     "taskName": "第四次作业",
//                     "addTime": "2021-02-13:13-12-23",
//                     "closeTime": "2021-02-20:12-15-29",
//                     "commitLate": 0,
//                     "isClosed": 0,
//                     "weight": 2,
//                     "taskFileVOList": [
//                         {
//                             "fileName": "常量池的分类.md",
//                             "filePath": "http://localhost:8080/source/task/1/17/常量池的分类.md",
//                             "addTime": "2021-02-13:13-13-41"
//                         },
//                         {
//                             "fileName": "数据结构.md",
//                             "filePath": "http://localhost:8080/source/task/1/17/数据结构.md",
//                             "addTime": "2021-02-13:13-13-47"
//                         },
//                         {
//                             "fileName": "redis笔记.md",
//                             "filePath": "http://localhost:8080/source/task/1/17/redis笔记.md",
//                             "addTime": "2021-02-16:13-26-40"
//                         }
//                     ],
//                     "filePath": null
//                 },
//                 {
//                     "id": 19,
//                     "courseId": 1,
//                     "adminId": "2019133111",
//                     "taskName": "第四次作业",
//                     "addTime": "2021-02-16:11-15-25",
//                     "closeTime": "2021-02-10:12-15-29",
//                     "commitLate": 0,
//                     "isClosed": 1,
//                     "weight": 2,
//                     "taskFileVOList": [],
//                     "filePath": null
//                 },
//                 {
//                     "id": 1,
//                     "courseId": 2,
//                     "adminId": "2019133111",
//                     "taskName": "第二次作业",
//                     "addTime": "2021-02-08:23-23-29",
//                     "closeTime": "2022-05-29:11-22-19",
//                     "commitLate": 0,
//                     "isClosed": 0,
//                     "weight": 5,
//                     "taskFileVOList": [
//                         {
//                             "fileName": "符号引用和直接引用.md",
//                             "filePath": "http://localhost:8080/source/task/1/1/符号引用和直接引用.md",
//                             "addTime": "2021-02-10:22-01-33"
//                         },
//                         {
//                             "fileName": "反射概述.md",
//                             "filePath": "http://localhost:8080/source/task/2/1/反射概述.md",
//                             "addTime": "2021-02-13:13-10-47"
//                         }
//                     ],
//                     "filePath": null
//                 },
//                 {
//                     "id": 6,
//                     "courseId": 1,
//                     "adminId": "2019133111",
//                     "taskName": "第一次作业",
//                     "addTime": "2021-02-08:23-45-56",
//                     "closeTime": "2021-02-10:13-19-20",
//                     "commitLate": 0,
//                     "isClosed": 1,
//                     "weight": 2,
//                     "taskFileVOList": [
//                         {
//                             "fileName": "valid与lombok.md",
//                             "filePath": "http://localhost:8080/source/task/1/6/valid与lombok.md",
//                             "addTime": "2021-02-09:22-00-41"
//                         },
//                         {
//                             "fileName": "符号引用和直接引用.md",
//                             "filePath": "http://localhost:8080/source/task/1/6/符号引用和直接引用.md",
//                             "addTime": "2021-02-09:22-00-41"
//                         }
//                     ],
//                     "filePath": null
//                 },
//                 {
//                     "id": 12,
//                     "courseId": 1,
//                     "adminId": "2019133111",
//                     "taskName": "第一次作业",
//                     "addTime": "2021-02-10:21-56-45",
//                     "closeTime": "2021-02-20:12-15-29",
//                     "commitLate": 0,
//                     "isClosed": 0,
//                     "weight": 2,
//                     "taskFileVOList": [
//                         {
//                             "fileName": "反射概述.md",
//                             "filePath": "http://localhost:8080/source/task/1/12/反射概述.md",
//                             "addTime": "2021-02-10:22-00-50"
//                         }
//                     ],
//                     "filePath": null
//                 },
//                 {
//                     "id": 17,
//                     "courseId": 1,
//                     "adminId": "2019133111",
//                     "taskName": "第四次作业",
//                     "addTime": "2021-02-13:13-12-23",
//                     "closeTime": "2021-02-20:12-15-29",
//                     "commitLate": 0,
//                     "isClosed": 0,
//                     "weight": 2,
//                     "taskFileVOList": [
//                         {
//                             "fileName": "常量池的分类.md",
//                             "filePath": "http://localhost:8080/source/task/1/17/常量池的分类.md",
//                             "addTime": "2021-02-13:13-13-41"
//                         },
//                         {
//                             "fileName": "数据结构.md",
//                             "filePath": "http://localhost:8080/source/task/1/17/数据结构.md",
//                             "addTime": "2021-02-13:13-13-47"
//                         },
//                         {
//                             "fileName": "redis笔记.md",
//                             "filePath": "http://localhost:8080/source/task/1/17/redis笔记.md",
//                             "addTime": "2021-02-16:13-26-40"
//                         }
//                     ],
//                     "filePath": null
//                 },
//                 {
//                     "id": 19,
//                     "courseId": 1,
//                     "adminId": "2019133111",
//                     "taskName": "第四次作业",
//                     "addTime": "2021-02-16:11-15-25",
//                     "closeTime": "2021-02-10:12-15-29",
//                     "commitLate": 0,
//                     "isClosed": 1,
//                     "weight": 2,
//                     "taskFileVOList": [],
//                     "filePath": null
//                 },
//                 {
//                     "id": 1,
//                     "courseId": 2,
//                     "adminId": "2019133111",
//                     "taskName": "第二次作业",
//                     "addTime": "2021-02-08:23-23-29",
//                     "closeTime": "2022-05-29:11-22-19",
//                     "commitLate": 0,
//                     "isClosed": 0,
//                     "weight": 5,
//                     "taskFileVOList": [
//                         {
//                             "fileName": "符号引用和直接引用.md",
//                             "filePath": "http://localhost:8080/source/task/1/1/符号引用和直接引用.md",
//                             "addTime": "2021-02-10:22-01-33"
//                         },
//                         {
//                             "fileName": "反射概述.md",
//                             "filePath": "http://localhost:8080/source/task/2/1/反射概述.md",
//                             "addTime": "2021-02-13:13-10-47"
//                         }
//                     ],
//                     "filePath": null
//                 },
//                 {
//                     "id": 6,
//                     "courseId": 1,
//                     "adminId": "2019133111",
//                     "taskName": "第一次作业",
//                     "addTime": "2021-02-08:23-45-56",
//                     "closeTime": "2021-02-10:13-19-20",
//                     "commitLate": 0,
//                     "isClosed": 1,
//                     "weight": 2,
//                     "taskFileVOList": [
//                         {
//                             "fileName": "valid与lombok.md",
//                             "filePath": "http://localhost:8080/source/task/1/6/valid与lombok.md",
//                             "addTime": "2021-02-09:22-00-41"
//                         },
//                         {
//                             "fileName": "符号引用和直接引用.md",
//                             "filePath": "http://localhost:8080/source/task/1/6/符号引用和直接引用.md",
//                             "addTime": "2021-02-09:22-00-41"
//                         }
//                     ],
//                     "filePath": null
//                 },
//                 {
//                     "id": 12,
//                     "courseId": 1,
//                     "adminId": "2019133111",
//                     "taskName": "第一次作业",
//                     "addTime": "2021-02-10:21-56-45",
//                     "closeTime": "2021-02-20:12-15-29",
//                     "commitLate": 0,
//                     "isClosed": 0,
//                     "weight": 2,
//                     "taskFileVOList": [
//                         {
//                             "fileName": "反射概述.md",
//                             "filePath": "http://localhost:8080/source/task/1/12/反射概述.md",
//                             "addTime": "2021-02-10:22-00-50"
//                         }
//                     ],
//                     "filePath": null
//                 },
//                 {
//                     "id": 17,
//                     "courseId": 1,
//                     "adminId": "2019133111",
//                     "taskName": "第四次作业",
//                     "addTime": "2021-02-13:13-12-23",
//                     "closeTime": "2021-02-20:12-15-29",
//                     "commitLate": 0,
//                     "isClosed": 0,
//                     "weight": 2,
//                     "taskFileVOList": [
//                         {
//                             "fileName": "常量池的分类.md",
//                             "filePath": "http://localhost:8080/source/task/1/17/常量池的分类.md",
//                             "addTime": "2021-02-13:13-13-41"
//                         },
//                         {
//                             "fileName": "数据结构.md",
//                             "filePath": "http://localhost:8080/source/task/1/17/数据结构.md",
//                             "addTime": "2021-02-13:13-13-47"
//                         },
//                         {
//                             "fileName": "redis笔记.md",
//                             "filePath": "http://localhost:8080/source/task/1/17/redis笔记.md",
//                             "addTime": "2021-02-16:13-26-40"
//                         }
//                     ],
//                     "filePath": null
//                 },
//                 {
//                     "id": 19,
//                     "courseId": 1,
//                     "adminId": "2019133111",
//                     "taskName": "第四次作业",
//                     "addTime": "2021-02-16:11-15-25",
//                     "closeTime": "2021-02-10:12-15-29",
//                     "commitLate": 0,
//                     "isClosed": 1,
//                     "weight": 2,
//                     "taskFileVOList": [],
//                     "filePath": null
//                 },
//             ]
//         }
//     })
// })

// Mock.mock('/admin/queryOneTask','get',{
//     "error_code": 200,
//     "message": "success",
//     "data": {
//         "total": 3,
//         "currentPage": 1,
//         "totalPage": 1,
//         "rows": 10,
//         "items": [
//             {
//                 "id": 13,
//                 "taskId": 17,
//                 "courseId": 1,
//                 "userId": "778899",
//                 "userVO": {
//                     "userId": "778899",
//                     "userName": "come",
//                     "mail": "wangjiahui20011014@163.com",
//                     "major": "电商",
//                     "image": "/image/picture5-778899.jpg",
//                     "grade": "2021",
//                     "avgScore": 0.0
//                 },
//                 "addTime": "2021-02-13:13-16-44",
//                 "score": 6,
//                 "weight": null,
//                 "filePath": null,
//                 "workFileVOList": [
//                     {
//                         "fileName": "xml笔记.md",
//                         "filePath": "http://localhost:8080/source/work/1/17/778899/xml笔记.md",
//                         "addTime": "2021-02-15:11-16-00"
//                     },
//                     {
//                         "fileName": "Tomcat&Servlet笔记.md",
//                         "filePath": "http://localhost:8080/source/work/1/17/778899/Tomcat&Servlet笔记.md",
//                         "addTime": "2021-02-15:11-16-17"
//                     },
//                     {
//                         "fileName": "EL&JSTL笔记.md",
//                         "filePath": "http://localhost:8080/source/work/1/17/778899/EL&JSTL笔记.md",
//                         "addTime": "2021-02-15:11-16-25"
//                     }
//                 ]
//             },
//             {
//                 "id": 14,
//                 "taskId": 17,
//                 "courseId": 1,
//                 "userId": "12345677",
//                 "userVO": {
//                     "userId": "12345677",
//                     "userName": "come",
//                     "mail": "wangjiahui20011014@163.com",
//                     "major": "电商",
//                     "image": null,
//                     "grade": "2021",
//                     "avgScore": 0.0
//                 },
//                 "addTime": "2021-02-15:11-17-21",
//                 "score": 5,
//                 "weight": null,
//                 "filePath": null,
//                 "workFileVOList": [
//                     {
//                         "fileName": "Cookie&Session笔记.md",
//                         "filePath": "http://localhost:8080/source/work/1/17/12345677/Cookie&Session笔记.md",
//                         "addTime": "2021-02-15:11-17-37"
//                     },
//                     {
//                         "fileName": "redis笔记.md",
//                         "filePath": "http://localhost:8080/source/work/1/17/12345677/redis笔记.md",
//                         "addTime": "2021-02-15:11-17-41"
//                     }
//                 ]
//             },
//             {
//                 "id": 12,
//                 "taskId": 17,
//                 "courseId": 1,
//                 "userId": "2019211290",
//                 "userVO": {
//                     "userId": "2019211290",
//                     "userName": "喜喜",
//                     "mail": "1114550440@qq.com",
//                     "major": "信管",
//                     "image": null,
//                     "grade": null,
//                     "avgScore": 0.0
//                 },
//                 "addTime": "2021-02-13:13-16-44",
//                 "score": 4,
//                 "weight": null,
//                 "filePath": null,
//                 "workFileVOList": [
//                     {
//                         "fileName": "valid与lombok.md",
//                         "filePath": "http://localhost:8080/source/work/1/17/2019211290/valid与lombok.md",
//                         "addTime": "2021-02-16:16-04-05"
//                     },
//                     {
//                         "fileName": "分库分表和读写分离.md",
//                         "filePath": "http://localhost:8080/source/work/1/17/2019211290/分库分表和读写分离.md",
//                         "addTime": "2021-02-16:16-00-27"
//                     }
//                 ]
//             },
//             {
//                 "id": 13,
//                 "taskId": 17,
//                 "courseId": 1,
//                 "userId": "778899",
//                 "userVO": {
//                     "userId": "778899",
//                     "userName": "come",
//                     "mail": "wangjiahui20011014@163.com",
//                     "major": "电商",
//                     "image": "/image/picture5-778899.jpg",
//                     "grade": "2021",
//                     "avgScore": 0.0
//                 },
//                 "addTime": "2021-02-13:13-16-44",
//                 "score": 6,
//                 "weight": null,
//                 "filePath": null,
//                 "workFileVOList": [
//                     {
//                         "fileName": "xml笔记.md",
//                         "filePath": "http://localhost:8080/source/work/1/17/778899/xml笔记.md",
//                         "addTime": "2021-02-15:11-16-00"
//                     },
//                     {
//                         "fileName": "Tomcat&Servlet笔记.md",
//                         "filePath": "http://localhost:8080/source/work/1/17/778899/Tomcat&Servlet笔记.md",
//                         "addTime": "2021-02-15:11-16-17"
//                     },
//                     {
//                         "fileName": "EL&JSTL笔记.md",
//                         "filePath": "http://localhost:8080/source/work/1/17/778899/EL&JSTL笔记.md",
//                         "addTime": "2021-02-15:11-16-25"
//                     }
//                 ]
//             },
//             {
//                 "id": 14,
//                 "taskId": 17,
//                 "courseId": 1,
//                 "userId": "12345677",
//                 "userVO": {
//                     "userId": "12345677",
//                     "userName": "come",
//                     "mail": "wangjiahui20011014@163.com",
//                     "major": "电商",
//                     "image": null,
//                     "grade": "2021",
//                     "avgScore": 0.0
//                 },
//                 "addTime": "2021-02-15:11-17-21",
//                 "score": 5,
//                 "weight": null,
//                 "filePath": null,
//                 "workFileVOList": [
//                     {
//                         "fileName": "Cookie&Session笔记.md",
//                         "filePath": "http://localhost:8080/source/work/1/17/12345677/Cookie&Session笔记.md",
//                         "addTime": "2021-02-15:11-17-37"
//                     },
//                     {
//                         "fileName": "redis笔记.md",
//                         "filePath": "http://localhost:8080/source/work/1/17/12345677/redis笔记.md",
//                         "addTime": "2021-02-15:11-17-41"
//                     }
//                 ]
//             },
//         ]
//     }
// }
// )

// Mock.mock('/admin/downloadWorks','post',{
//     "error_code": 200,
//     "message": "success",
//     "data": "http://localhost:8080/source/zip/1/17/第四次作业.zip"
// })

// Mock.mock('/admin/giveScore','post',{
//     "error_code": 200,
//     "message": "打分成功",
//     "data": null
// })

// Mock.mock('/admin/queryScores','get',{
//     "error_code": 200,
//     "message": "success",
//     "data": {
//         "total": 10,
//         "users": [
//             {
//                 "userId": "778899",
//                 "userName": "come",
//                 "mail": "wangjiahui20011014@163.com",
//                 "major": "电商",
//                 "image": "/image/picture5-778899.jpg",
//                 "grade": "2021",
//                 "submitCount": 5,
//                 "avgScore": 2.87
//             },
//             {
//                 "userId": "2019211290",
//                 "userName": "喜喜",
//                 "mail": "1114550440@qq.com",
//                 "major": "信管",
//                 "image": null,
//                 "grade": null,
//                 "submitCount": 1,
//                 "avgScore": 0.35
//             },
//             {
//                 "userId": "201922222",
//                 "userName": "come",
//                 "mail": "wangjiahui20011014@163.com",
//                 "major": "电商",
//                 "image": null,
//                 "grade": "2021",
//                 "submitCount": 0,
//                 "avgScore": 0.0
//             },
//             {
//                 "userId": "2019211300",
//                 "userName": "小王子",
//                 "mail": "859642403@qq.com",
//                 "major": "电子商务",
//                 "image": null,
//                 "grade": null,
//                 "submitCount": 0,
//                 "avgScore": 0.0
//             },
//             {
//                 "userId": "778899",
//                 "userName": "come",
//                 "mail": "wangjiahui20011014@163.com",
//                 "major": "电商",
//                 "image": "/image/picture5-778899.jpg",
//                 "grade": "2021",
//                 "submitCount": 5,
//                 "avgScore": 2.87
//             },
//             {
//                 "userId": "2019211290",
//                 "userName": "喜喜",
//                 "mail": "1114550440@qq.com",
//                 "major": "信管",
//                 "image": null,
//                 "grade": null,
//                 "submitCount": 1,
//                 "avgScore": 0.35
//             },
//             {
//                 "userId": "201922222",
//                 "userName": "come",
//                 "mail": "wangjiahui20011014@163.com",
//                 "major": "电商",
//                 "image": null,
//                 "grade": "2021",
//                 "submitCount": 0,
//                 "avgScore": 0.0
//             },
//             {
//                 "userId": "2019211300",
//                 "userName": "小王子",
//                 "mail": "859642403@qq.com",
//                 "major": "电子商务",
//                 "image": null,
//                 "grade": null,
//                 "submitCount": 0,
//                 "avgScore": 0.0
//             },
//             {
//                 "userId": "778899",
//                 "userName": "come",
//                 "mail": "wangjiahui20011014@163.com",
//                 "major": "电商",
//                 "image": "/image/picture5-778899.jpg",
//                 "grade": "2021",
//                 "submitCount": 5,
//                 "avgScore": 2.87
//             },
//             {
//                 "userId": "2019211290",
//                 "userName": "喜喜",
//                 "mail": "1114550440@qq.com",
//                 "major": "信管",
//                 "image": null,
//                 "grade": null,
//                 "submitCount": 1,
//                 "avgScore": 0.35
//             },
//             {
//                 "userId": "201922222",
//                 "userName": "come",
//                 "mail": "wangjiahui20011014@163.com",
//                 "major": "电商",
//                 "image": null,
//                 "grade": "2021",
//                 "submitCount": 0,
//                 "avgScore": 0.0
//             },
//             {
//                 "userId": "2019211300",
//                 "userName": "小王子",
//                 "mail": "859642403@qq.com",
//                 "major": "电子商务",
//                 "image": null,
//                 "grade": null,
//                 "submitCount": 0,
//                 "avgScore": 0.0
//             },
//             {
//                 "userId": "778899",
//                 "userName": "come",
//                 "mail": "wangjiahui20011014@163.com",
//                 "major": "电商",
//                 "image": "/image/picture5-778899.jpg",
//                 "grade": "2021",
//                 "submitCount": 5,
//                 "avgScore": 2.87
//             },
//             {
//                 "userId": "2019211290",
//                 "userName": "喜喜",
//                 "mail": "1114550440@qq.com",
//                 "major": "信管",
//                 "image": null,
//                 "grade": null,
//                 "submitCount": 1,
//                 "avgScore": 0.35
//             },
//             {
//                 "userId": "201922222",
//                 "userName": "come",
//                 "mail": "wangjiahui20011014@163.com",
//                 "major": "电商",
//                 "image": null,
//                 "grade": "2021",
//                 "submitCount": 0,
//                 "avgScore": 0.0
//             },
//             {
//                 "userId": "2019211300",
//                 "userName": "小王子",
//                 "mail": "859642403@qq.com",
//                 "major": "电子商务",
//                 "image": null,
//                 "grade": null,
//                 "submitCount": 0,
//                 "avgScore": 0.0
//             },
//         ]
//     }
// })

// Mock.mock('/admin/countStudent','get',{
//     "error_code": 200,
//     "message": "查询人数成功",
//     "data": {
//         "unSubmitPeople": 1,
//         "submitPeople": 3
//     }
// })