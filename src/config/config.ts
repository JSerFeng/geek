export const EmailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
export const NotNullRegex = /.+/
export const UserIdLocalRegex = /\d\d\d\d\d\d\d\d\d\d/

export enum EmailType {
  Activate = 1,
  Password = 2
}

export const logoMap: { [k: string]: string } = {
  "前端": "#icon-js",
  "后端_JAVA": "#icon-java",
  "后端_PYTHON": "#icon-python"
}