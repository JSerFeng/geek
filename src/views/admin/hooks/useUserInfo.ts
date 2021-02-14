import { getUserInfoList } from "../../../api/index";
import { onMounted, reactive, toRaw } from 'vue'
import { MutationTypes } from '../../../store/modules/userInfoList/mutations'
import { useStore } from "../../../store/index";
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
interface UserInfoObj<T> {
  total: number;
  currentPage: number;
  totalPage: number;
  rows: number;
  items: T[];
};

export function useGetUserInfo() {
  const Store = useStore()
  const paramsObj = reactive({
    courseId: 1,
    page: 1,
  })
  const userInfo = reactive<{ data: Response<UserInfoObj<UserInfoItem>> } | { data: { data: {} } }>({
    data: { data: {} }
  });
  onMounted(() => {
    getUserInfo()
  })
  async function handleTabsClick(tab: any) {
    paramsObj.courseId = Number.parseInt(tab.props.name)
    // 等到正式测试接口的时候取消注释
    // userInfo.data = ((await getUserInfoList(paramsObj)) as any) as Response<UserInfoObj>;
  }
  async function handlePaginationClick(page: number) {
    paramsObj.page = page
    // 等到正式测试接口的时候取消注释
    // userInfo.data = ((await getUserInfoList(paramsObj)) as any) as Response<UserInfoObj>;
  }
  async function getUserInfo() {
    userInfo.data = ((await getUserInfoList()) as any) as Response<UserInfoObj<UserInfoItem>>;
    Store.commit(`${MutationTypes.SetUserList}`, toRaw(userInfo))
  }
  return {
    getUserInfo,
    handleTabsClick,
    handlePaginationClick,
    userInfo,
    paramsObj,
  }
}