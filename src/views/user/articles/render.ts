import marked from "marked"
import hljs from "highlight.js"

marked.setOptions({
  highlight(code) {
    return hljs.highlightAuto(code).value
  },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})
export const render = (text: string) => {
  return marked(text)
}