import request, { ErrorCode } from "./request";
import { Response } from '.'
import axios from "axios";

const plainCb = () => { }

/*------------------上传文件----------------------- */
const uploadFile = <T extends (File | File[]) = File>(key: string, url: string, keyFile = "file") => async (id: string, file: T, onUpload?: (e: ProgressEvent) => void) => {
  if (Array.isArray(file)) {
    const res = await Promise.all(file.map(_file => {
      const fd = new FormData
      fd.set(key, id)
      fd.set(keyFile, _file)
      return request.post(url, fd, {
        onUploadProgress: onUpload
      }) as Promise<Response>
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
    return request.post(url, fd, {
      onUploadProgress: onUpload
    }) as Promise<Response>
  }
}

/**上传头像 */
export const apiUploadAvatar = uploadFile("userId", "/file/imageUpload")
/**上传文章 */
export const apiUploadArticle = uploadFile("articleId", "/articleFileUpload")
/**上传作业文件 */
export const apiUploadHomework = uploadFile("workId", "/file/workFileUpload")
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
export const apiDelHomeworkFile = deleteFile("userId", "/file/delWorkFile")
/**删除一篇发布的文章 */
export const apiDelArticle = deleteFile("userId", "/article/deleteArticle")


/********大文件上传**********/
export const apiBigFileUpload = (
  chunk: Blob,
  shardIndex: number,
  shardTotal: number,
  shardSize: number,
  fileSize: number,
  courseId: number,
  hash: string,
  onUploadProgress?: (e: ProgressEvent) => void
): Promise<Response> => {
  const fd = new FormData()
  fd.set("file", chunk)
  fd.set("shardIndex", (shardIndex + 1).toString())
  fd.set("shardTotal", shardTotal.toString())
  fd.set("shardSize", shardSize.toString())
  fd.set("fileSize", fileSize.toString())
  fd.set("courseId", courseId.toString())
  fd.set("fileKey", hash.toString())

  /**@TODO */
  /**192.168.43.88 */
  return request.post("http://120.79.138.134/announce/announceUpload", fd, {
    onUploadProgress
  })
}

export const apiBigFileCheck = (
  hash: string,
  shardSize: number
): Promise<Response<number | null>> => request.post("http://120.79.138.134/announce/check", {
  fileKey: hash,
  shardSize
})

export const apiBigFileMerge = (
  fileName: string,
  hash: string,
  id: number
): Promise<Response> => request.post("http://120.79.138.134/announce/merge", {
  fileKey: hash,
  id,
  fileName
})

const inst = axios.create()

export const download = async (url: string, name?: string) => {
  const res = await inst.post(url)
  const blobUrl = URL.createObjectURL(res)
  const aTag = document.createElement("a")
  aTag.setAttribute("href", blobUrl)
  aTag.setAttribute("download", name || "")
  document.body.appendChild(aTag)
  aTag.click()
  document.body.removeChild(aTag)
  URL.revokeObjectURL(blobUrl)
}

