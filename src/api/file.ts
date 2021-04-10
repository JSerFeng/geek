import request, { ErrorCode } from "./request";
import { Response } from '.'

/*------------------上传文件----------------------- */
const uploadFile = <T extends (File | File[]) = File>(key: string, url: string, keyFile = "file") => async (id: string, file: T) => {
  if (Array.isArray(file)) {
    const res = await Promise.all(file.map(_file => {
      const fd = new FormData
      fd.set(key, id)
      fd.set(keyFile, _file)
      return request.post(url, fd) as Promise<Response>
    }))
    const allPass = res.every(item => item.error_code === ErrorCode.Success)
    return {
      error_code: allPass ? ErrorCode.Success : ErrorCode.Connect_Fail,
      message: "ok",
      data: null
    } as Response
  } else {
    const fd = new FormData
    fd.set(key, id)
    fd.set(keyFile, file)
    return request.post(url, fd) as Promise<Response>
  }
}

/**上传头像 */
export const apiUploadAvatar = uploadFile("userId", "/file/imageUpload")
/**上传文章 */
export const apiUploadArticle = uploadFile("articleId", "/articleFileUpload")
/**上传多个文章 */
// export const apiUploadMultipleArticle = uploadFile("articleId", "/file/articleFilesUpload")
export const apiUploadMultipleArticle = uploadFile<File[]>("articleId", "/articleFileUpload")
/**管理员上传作业文件 */
export const apiAdminHomework = uploadFile("taskId", "/file/taskFileUpload")
/**管理员上传多个作业文件 */
// export const apiAdminMultipleHomework = uploadFile("taskId", "/file/taskFilesUpload")
export const apiAdminMultipleHomework = uploadFile<File[]>("taskId", "/file/taskFileUpload")


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


/********大文件上传**********/
export const apiBigFileUpload = (
  chunk: ArrayBuffer,
  shardIndex: number,
  shardTotal: number,
  fileSize: number,
  courseId: number,
  hash: string
): Promise<Response> => {
  const fd = new FormData()
  fd.set("file", new Blob([chunk]))
  fd.set("shardIndex", shardIndex.toString())
  fd.set("shardTotal", shardTotal.toString())
  fd.set("fileSize", fileSize.toString())
  fd.set("courseId", courseId.toString())
  fd.set("fileKey", hash.toString())

  return request.post("/announce/announceUpload", fd)
}

export const apiBigFileCheck = (
  hash: string,
  shardSize: number
): Promise<Response<number | null>> => request.post("/announce/check", {
  fileKey: hash,
  shardSize
})

export const apiBigFileMerge = (
  hash: string,
  id: number
): Promise<Response> => request.post("/announce/merge", {
  fileKey: hash,
  id
})
