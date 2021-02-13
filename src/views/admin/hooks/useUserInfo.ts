import { getUserInfoList } from "../../../api/index";
import { reactive,toRaw } from 'vue'

interface Response<T = any> {
    error_code: string;
    message: string;
    data: T;
  }
  interface UserInfoItem {
    userId: string;
    userName: string;
    mail: string;
    major: string;
    image: null | string;
    grade: null | string;
  }
  type UserInfoObj = {
    total: number;
    currentPage: number;
    totalPage: number;
    rows: number;
    items: UserInfoItem[];
  };
  
export function useGetUserInfo () {
    const userInfo = reactive<{ data: UserInfoObj } | { data: {} }>({
        data: {},
      });
    async function getUserInfo() {
        userInfo.data = ((await getUserInfoList()) as any) as Response<UserInfoObj>;
      }

      return {
          getUserInfo,
          userInfo
      }
}