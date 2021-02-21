export function useIdCheck (id:string):boolean {
  if(/^\d{5,30}$/.test(id)){
    return true
  }
  return false
}

export function useNameCheck (name:string) {
  if(name === '') {
    return false
  }
  return true
}

export function usePasCheck (password:string) {
  if(/^.{3,30}$/.test(password)) {
    return true
  }
  return false
}


export function useDirCheck (direction:string) {
  if(direction === '') {
    return false
  }
  return true
}