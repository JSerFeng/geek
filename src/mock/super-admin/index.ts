import Mock from 'mockjs'

Mock.mock('/superAdmin/queryAdmins','post',function (params:any) {
    return Mock.mock({
        "error_code": 200,
        "message": "success",
        "data": {
            "total": 21,
            "currentPage": 1,
            "totalPage": 3,
            "rows": 10,
            "items": [
                {
                    "id": 5,
                    "adminId": "2019133111",
                    "adminName": "来了",
                    "password": null,
                    "courseName": "后端JAVA",
                    "image": null,
                    "registerTime": null,
                    "type": "admin"
                },
                {
                    "id": 6,
                    "adminId": "2019133112",
                    "adminName": "来了哦",
                    "password": null,
                    "courseName": "后端JAVA",
                    "image": null,
                    "registerTime": null,
                    "type": "admin"
                },
                {
                    "id": 7,
                    "adminId": "2019133142",
                    "adminName": "来了哦",
                    "password": null,
                    "courseName": "后端JAVA",
                    "image": null,
                    "registerTime": null,
                    "type": "admin"
                },
                {
                    "id": 8,
                    "adminId": "2019113142",
                    "adminName": "不是我",
                    "password": null,
                    "courseName": "后端JAVA",
                    "image": null,
                    "registerTime": null,
                    "type": "admin"
                },
                {
                    "id": 9,
                    "adminId": "2019112142",
                    "adminName": "不是我",
                    "password": null,
                    "courseName": "后端PYTHON",
                    "image": null,
                    "registerTime": null,
                    "type": "admin"
                },
                {
                    "id": 10,
                    "adminId": "2019912142",
                    "adminName": "不是我",
                    "password": null,
                    "courseName": "前端",
                    "image": null,
                    "registerTime": null,
                    "type": "admin"
                },
                {
                    "id": 11,
                    "adminId": "2018912142",
                    "adminName": "不是我",
                    "password": null,
                    "courseName": "前端",
                    "image": null,
                    "registerTime": null,
                    "type": "admin"
                },
                {
                    "id": 12,
                    "adminId": "2018112142",
                    "adminName": "不是我",
                    "password": null,
                    "courseName": "PHP",
                    "image": null,
                    "registerTime": null,
                    "type": "admin"
                },
                {
                    "id": 16,
                    "adminId": "2019133121",
                    "adminName": "部了",
                    "password": null,
                    "courseName": "后端JAVA",
                    "image": null,
                    "registerTime": null,
                    "type": "admin"
                },
                {
                    "id": 17,
                    "adminId": "2019133921",
                    "adminName": "部了",
                    "password": null,
                    "courseName": "后端JAVA",
                    "image": null,
                    "registerTime": null,
                    "type": "admin"
                }
            ]
        }
    })
})