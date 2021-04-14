import request, { ErrorCode } from "./request"
import axios, { AxiosResponse } from "axios";
import '../mock/admin/index'
import '../mock/super-admin/index'
import { ElNotification } from "element-plus";
import { State } from '../store/modules/user/state'
// @ts-ignore
import { PublishHomework } from '../views/check-homework/CheckHomework.vue'
import { EditHomework } from '../views/check-homework/components/HomeworkItem.vue'
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

export const getPersonCount = (courseId?: string) => axios.post('/admin', { courseId }) as Promise<Response>

export const getSignListList = () => axios.get('/admin/queryUsersInfo') as Promise<Response>

export const getAdminHomework = () => axios.get('/admin/queryMyTasks') as Promise<Response>

export const getDetailHomeworkInfo = (taskId: number, page?: number, rows?: number) => {
  console.log(taskId, page, rows)
  return axios.get('/admin/queryOneTask',) as Promise<Response>
}

export const markScore = (taskId: number, score?: number) => {
  // console.log(taskId, score)
  return axios.post('/admin/giveScore', { taskId, score })
}

export const downloadAllStudentsFiles = (taskId: number) => {
  return axios.post('/admin/downloadWorks', { taskId })
}

export const getHomeworkStatus = (courseId?: number) => {
  return axios.get('/admin/queryScores', { params: { courseId } })
}
// 这里要传入taskId
export const getHomeworkSubmitStatus = (taskId: number) => {
  return axios.get('/admin/countStudent')
}
// 后面把params传进去
export const publishHomework = (params?: PublishHomework): Promise<AxiosResponse<any>> => {
  console.log(params)
  return axios.post('/task/addTask')
}

// 编辑作业 后面把params传进去
export const updateHomeworkk = (params?:EditHomework):Promise<AxiosResponse<any>>=>{
  console.log(params)
  return axios.post('/task/updateTask')
}

// 手动关闭作业提交通道 后面把params传进去
export const closeHomeworkSubmit = (params?:any) =>{
  console.log(params)
  return axios.post('/task/closeTask')
}

// 删除作业  后面把params传进去
export const deleteHomework = (params?:{id:number, adminId:string}) => {
  console.log(params)
  return axios.post('/task/deleteTask')
}
export const reqAdminSendEmail = (
  title: string,
  text: string,
  adminId?: string,
  courseId?: string,
  userIdList?: Set<string>,
) => axios.post('/admin/sendDailyMail', { adminId, courseId, userIdList, title, text }) as Promise<Response>

export const getUserInfoList = (
  params?: {
    page?: number,
    rows?: number,
    courseId?: number
  }
) => axios.get('/admin/queryUsersInfo', { params }) as any as Response

export const getAdminInfoList = (
  page?: number,
  rows?: number,
  courseName?: string,
  adminName?: string,
  adminId?: string
) => axios.post('/superAdmin/queryAdmins', { page, rows, courseName, adminName, adminId }) as any as Response

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
) => axios.post('/superAdmin/addAdmin', { adminId, password, adminName, courseName }) as Promise<Response>

export const editAdmin = ({
  adminId,
  password,
  adminName,
  courseName,
  id
}: AddAdmin
) => axios.post('/superAdmin/updateAdmin', { adminId, password, adminName, courseName, id }) as Promise<Response>

export const deleteAdmin = (adminId: string) => axios.post('/superAdmin/delAdmin', { adminId }) as Promise<Response>

export const deleleAdmins = (adminList: string[]) => axios.post('/superAdmin/delAdmins', { adminList }) as Promise<Response>
