export enum DIALOG_TYPE {
  INFO = "info",
  ERROR = "error",
  WARNING = "warning",
  SUCCESS = "success", // 新增成功类型
}
// 消息code 
export enum DATA_CODE {
  OK = 200,
  ERROR = 500,
}
// rtc消息on
export enum SOCKET_ON_RTC {
  // rtc 建立连接回调
  CANDIDATE = "candidate",
  // 发起者发送offer
  OFFER = "offer",
  // 接收者发送answer
  ANSWER = "answer",
}
// 系统消息on
export enum SOCKET_ON_SYS {
  // 连接socket
  CONNECTION = "connection",
  // 断开socket
  DISCONNECT = "disconnect",
  // 用户列表
  USER_LIST = "user_list",
  // 错误显示
  SYS_ERROR = "sys_error",
}
export enum SOCKET_EMIT {
  SYS_USER_LIST = "user_list",
}
