

export const runMock = () => {

}
function doSomething(callback?: () => void) {
    // Error: Object is possibly 'undefined'.
    if(typeof callback == 'function'){
        callback()
    }
  }