export interface File {
    addTime: string;
    fileName: string;
    filePath: string;
}

export interface HomeworkStatusPerson {
    "userId": string,
    "userName": string,
    "mail": string,
    "major": string,
    "image": string | null,
    "grade": string,
    "submitCount": number,
    "avgScore": number
}

export interface Person {
    "userId": string,
    "userName": string,
    "mail": string,
    "major": string,
    "image": null | string,
    "grade": null | string,
    "avgScore": number
}

export interface DetailInfo<T, F> {
    "id": number,
    "taskId": number,
    "courseId": number,
    "userId": string,
    "userName": string,
    "userVO": T,
    "addTime": string,
    "score": number,
    "weight": null | number,
    "filePath": null | string,
    "workFileVOList": F[]
}

export interface rootState {
    currentFiles: File[]
}

export const State: rootState = {
    currentFiles: []
}