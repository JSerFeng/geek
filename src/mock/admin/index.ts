import Mock from 'mockjs'

Mock.mock('/admin','post',function(options:any) {
    return Mock.mock({
        font:23,
        end:43,
        py:33,
    })
})