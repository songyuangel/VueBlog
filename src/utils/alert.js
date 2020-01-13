export function alertMessage (msg, title, showClose) {
  this.$message({
    type: msg,
    message: title,
    showClose: showClose
  })
}
export default alertMessage
