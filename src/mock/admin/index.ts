import Mock from 'mockjs'

Mock.mock('/admin','post',function(options:any) {
    return Mock.mock({
        font:23,
        end:23,
        py:33,
        design:24,
        mobile:12
    })
})