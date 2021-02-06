export const storage = {
  get(key: string) {
    return localStorage.getItem(key)
  },
  set(key: string, val: string | number | Record<any, any>) {
    if (typeof val === 'object') {
      val = JSON.stringify(val)
    } else if (typeof val === 'number') {
      val = val + ""
    }
    return localStorage.setItem(key, val)
  },
  clear() {
    return localStorage.clear()
  }
}