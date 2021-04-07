import request from "./request";
import { Response } from '.'

/*------------------上传文件----------------------- */
const uploadFile = <T = any>(key: string, url: string, keyFile = "file") => (id, file: FormData) => request.post(url, {
  [key]: id,
  [keyFile]: file
}) as Promise<Response<T>>

/**上传头像 */
export const apiUploadAvatar = uploadFile("userId", "/file/imageUpload")
/**上传文章 */
export const apiUploadArticle = uploadFile("articleId", "/articleFileUpload")
/**上传多个文章 */
export const apiUploadMultipleArticle = uploadFile("articleId", "/file/articleFilesUpload")
/**管理员上传作业文件 */
export const apiAdminHomework = uploadFile("taskId", "/file/taskFileUpload")
/**管理员上传多个作业文件 */
export const apiAdminMultipleHomework = uploadFile("taskId", "/file/taskFilesUpload")


/*------------------删除文件----------------------- */
export const deleteFile = <T = any>(UserKey: string, url: string, idKey = "id") => (id: string, userId: string) => request.post(url, {
  [UserKey]: userId,
  [idKey]: id,
}) as Promise<Response<T>>

/**管理员删除上传作业的一个文件（仅task记录所对应的taskfile的一个记录）。发布者和超管可调用 */
export const apiDelAdminTask = deleteFile("adminId", "/file/delTaskFile")
/**学生删除上传作业的一个文件（撤回一个作业文件）仅作业上传本人可调用 */
export const apiDelHomework = deleteFile("userId", "/file/delWorkFile")
/**删除一篇发布的文章 */
export const apiDelArticle = deleteFile("userId", "/article/deleteArticle")