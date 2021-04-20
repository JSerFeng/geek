import request, { ErrorCode } from "./request"
import axios, { AxiosResponse } from "axios";
// import '../mock/admin/index'
// import '../mock/super-admin/index'
import { ElNotification } from "element-plus";
import { State } from '../store/modules/user/state'
// @ts-ignore
import { PublishHomework } from '../views/check-homework/CheckHomework.vue'
import { EditHomework } from '../views/check-homework/components/HomeworkItem.vue'
import { storage } from '../utils/shared'
export interface Response<T = any> {
  error_code: ErrorCode,
  message: string,
  data: T
}

export const getWeather = async (cityName = "重庆") => {
  try {
    const res = await axios.get("http://wthrcdn.etouch.cn/weather_mini?city=" + cityName)
    return res
  } catch ({ message }) {
    ElNotification({ message })
  }
}

export const login = (userId: string, password: string) => request.post("/user/login", { userId, password }) as Promise<Response<{ user: State['userInfo'] }>>

export const checkEmail = async (mail: string) => request.post("/user/checkEmail", { mail }) as Promise<Response>

export const checkUserId = async (userId: string) => request.post("/user/checkUserId", { userId }) as Promise<Response>

export const sendActiveMail = (type: number) => (userId: string, mail: string) => request.post("/user/sendActiveMail", {
  userId,
  mail,
  codeType: type
}) as Promise<Response>

export const register = (
  userId: string,
  userName: string,
  password: string,
  mail: string,
  major: string,
  activeCode: string
) => request.post("/user/register", { userId, userName, password, mail, major, activeCode })

export const getPersonCount = async (courseId?: number) => {
  const result = await request.get('/admin/countAllUser', { params: { courseId } }) as any as Promise<Response>
  return result
}

export const getSignListList = (
  page?: number,
  rows?: number,
  courseId?: 1 | 2 | 3 | 4
) => {
  const params = { page, rows, courseId }
  console.log(params)
  // 测试的时候把params加进去
  return request.get('/admin/queryUsersInfo', { params }) as Promise<Response>
}

export const getAdminHomework = (adminId: string) => request.get('/admin/queryMyTasks', { params: { adminId } }) as Promise<Response>

export const getDetailHomeworkInfo = (taskId: number, page?: number, rows?: number) => {
  console.log(taskId, page, rows)
  return request.get('/admin/queryOneTask', { params: { taskId, page, rows } }) as Promise<Response>
}

export const markScore = (taskId: number, score?: number) => {
  // console.log(taskId, score)
  return request.post('/admin/giveScore', { id:taskId, score }) as Promise<Response>
}

export const downloadAllStudentsFiles = (taskId: number) => {
  return request.post('/admin/downloadWorks', { taskId })
}

export const getHomeworkStatus = (courseId?: number) => {
  return request.get('/admin/queryScores', { params: { courseId } })
}
// 这里要传入taskId
export const getHomeworkSubmitStatus = (taskId: number) => {
  return request.get('/admin/countStudent', { params: { taskId } })
}
// 后面把params传进去
export const publishHomework = (params?: PublishHomework): Promise<AxiosResponse<any>> => {
  console.log(params)
  return request.post('/task/addTask', params)
}

// 编辑作业 后面把params传进去
export const updateHomeworkk = (params?: EditHomework): Promise<Response> => {
  console.log(params)
  return request.post('/task/updateTask', params)
}

// 手动关闭作业提交通道 后面把params传进去
export const closeHomeworkSubmit = (params?: any) => {
  console.log(params)
  return request.post('/task/closeTask', params)
}

// 删除作业  后面把params传进去
export const deleteHomework = (params?: { id: number, adminId: string }) => {
  console.log(params)
  return request.post('/task/deleteTask', params)
}
export const reqAdminSendEmail = (
  title: string,
  text: string,
  adminId?: string,
  courseId?: string | number,
  userIdList?: string[],
) => request.post('/admin/sendDailyMail', { adminId, courseId, userIdList, title, text }) as Promise<Response>

export const getUserInfoList = (
  params?: {
    page?: number,
    rows?: number,
    courseId?: number
  }
) => request.get('/admin/queryUsersInfo', { params }) as any as Response

// 上传作业文件
export const adminTaskFileUpload = (taskId: number, file: Blob) => {
  // 测试接口的时候把参数传进去
  console.log(file, taskId)
  const params = new FormData()
  params.append('taskId', taskId.toString())
  params.append('file', file)
  return request.post('/file/taskFileUpload', params) as Promise<Response>
}

export const adminDeleteTaskById = (taskId: any, adminId: string) => {
  adminId = adminId.toString()
  const id = parseInt(taskId)
  
  return request.post('/file/delTaskFile', { id, adminId }) as Promise<Response>
}

// 分页查看自己发布的文章
export const getMyPublishedArticle = (page?: number, rows?: number, userId?: string) => {
  const params = { page, rows, userId }
  return request.get('/article/queryMyArticles', { params })
}

// 管理员发布文章
export const publishArticle = (
  userId: number,
  articleType: string,
  title: string,
  courseId?: 1 | 2 | 3 | 4,
  content?: string
) => {
  const payload = {userId, articleType, title, courseId, content}
  return request.post('/article/addArticle',payload) as Promise<Response>
}

// 管理员删除自己的文章
export const deleteMyArticle = (id:number, userId:string)=>{
  return request.post('/article/deleteArticle', {id, userId}) as Promise<Response>
}

export const getAdminInfoList = (
  page?: number,
  rows?: number,
  courseName?: string,
  adminName?: string,
  adminId?: string
) => {
  // 等测试接口把参数传进去
  const params = { page, rows, courseName, adminName, adminId }
  return request.get('/superAdmin/queryAdmins')
}

interface AddAdmin {
  adminId: string,
  password: string | null,
  adminName: string,
  courseName: string,
  id?: string | number
}

export const addAdmin = (
  { adminId,
    password,
    adminName,
    courseName }: AddAdmin
) => request.post('/superAdmin/addAdmin', { adminId, password, adminName, courseName }) as Promise<Response>

export const editAdmin = ({
  adminId,
  password,
  adminName,
  courseName,
  id
}: AddAdmin
) => request.post('/superAdmin/updateAdmin', { adminId, password, adminName, courseName, id }) as Promise<Response>

export const deleteAdmin = (adminId: string) => request.post('/superAdmin/delAdmin', { adminId }) as Promise<Response>

export const deleleAdmins = (adminList: string[]) => request.post('/superAdmin/delAdmins', { adminList }) as Promise<Response>
