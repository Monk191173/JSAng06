import { Injectable } from '@angular/core';
import { IcurUser, IcurMessage } from './shared/interfaces/faces';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor() { }
  public logined = false;
  public curUserID: number = -1;
  public emode = false;
  public curMessID: number = -1;
  public masUsers: IcurUser[] = [
    {
      login: 'admin',
      password: 'admin',
      email: 'admin@gmail.com'
    }
  ];

  public curMess: IcurMessage[] = [
    {
      userID: 0,
      dateTime: new Date(),
      title: 'First post',
      message: 'Sign up to create your account and start to use Angular Blog'
    }
  ];

  focus(reg: RegExp, val: string): { style: string[], col: string } {
    let style: string[];
    let col: string;
    col = 'rgb(159,198,242)';
    style = ['tool', 'mestool'];
    if (reg.test(val) && val != null) {

      col = 'green';
      style = ['toolok'];
    }
    else {
      col = 'red';
      style = ['toolx', 'mestool'];
    }
    return { style: style, col: col }
  }

  input(reg: RegExp, val: string): { style: string[], col: string } {
    let style: string[];
    let col: string;
    if (reg.test(val)) {
      col = 'green';
      style = ['toolok'];
    }
    else {
      col = 'red';
      style = ['toolx', 'mestool'];
    }
    return { style: style, col: col }
  }

  getLog(): boolean {
    return this.logined
  }
  setLog(stat: boolean): void {
    this.logined = stat;
  }
  setEmode(st: boolean): void {
    this.emode = st;
  }
  getEmode(): boolean {
    return this.emode
  }
  getMess(): IcurMessage[] {
    return this.curMess
  }
  /*---------------------------------------------Main */
  testUser(mes: IcurMessage): boolean {
    if (mes.userID == this.curUserID || this.curUserID == 0) return true
    else return false
  }
  deleteMessage(mesID: number): void {
    this.curMess.splice(mesID, 1);
  }
  getUserLoginByID(ID: number): string {
    return this.masUsers[this.curMess[ID].userID].login
  }
  /*---------------------------------------------Add-post */
  getMesforEdit(): IcurMessage {
    if (this.emode)
      return this.curMess[this.curMessID]
    else return { userID: this.curUserID, title: '', message: '', dateTime: new Date() }
  }

  editMess(ID: number, title: string, mes: string) {
    this.curMess[ID].title = title;
    this.curMess[ID].message = mes;
    this.curMess[ID].dateTime = new Date();
  }

  addMess(title: string, mes: string) {
    this.curMess.push(
      {
        userID: this.curUserID,
        dateTime: new Date(),
        title: title,
        message: mes
      }
    )
  }
  /*-----------------------------------------------Sign In */
  passUser(email: string, password: string): boolean {
    let res = false;
    this.masUsers.forEach((val, ind) => {
      if (val.email == email && val.password == password) {
        this.curUserID = ind;
        this.logined = true;
        res = true;
      }
    })
    return res
  }
  /*-------------------------------------------Sign Up */
  addUser(log: string, pass: string, email: string): boolean {
    for (let val of this.masUsers)
      if (val.login == log || val.email==email) return true;

    this.masUsers.push({ login: log, password: pass, email: email });
    this.setLog(true);
    this.curUserID = this.masUsers.length - 1;
    return false
  }
  /*-------------------------------------------------------- */

}
