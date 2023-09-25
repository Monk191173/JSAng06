export interface IcurUser {
  login: string,
  password: string,
  email: string
}

export interface IcurMessage {
  userID: number,
  dateTime: Date,
  title: string,
  message: string
}