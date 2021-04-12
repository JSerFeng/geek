import { apiQueryArticles, Articles } from "../../api//article"
import { Response } from '../../api'
import { Ref } from 'vue'
import { Flags, useRequest } from "../../utils/shared"

export const req = useRequest(apiQueryArticles)

export const useFetchArticles = (
  currentPage: number,
  rows: number,
  others: {
    adminName: string | null,
    courseName: string | null,
    userId: string | null
  }
): [Ref<Response<Articles> | null>, Ref<Flags>, (page: number) => void] => {
  const [res, flag] = req(currentPage, rows, others)

  const onChange = (page: number) => {
    console.log(page);
  }

  return [res, flag, onChange]
}
