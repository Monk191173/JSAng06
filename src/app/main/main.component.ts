import { Component } from '@angular/core';
import { BlogService } from '../blog.service';
import { IcurMessage } from '../shared/interfaces/faces';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  public CurMess = this.ServUser.curMess;

  constructor(private ServUser: BlogService) { }


  testUserRole(mes: IcurMessage): boolean {
    return this.ServUser.testUser(mes)
  }

  delMess(mes: number): void {
    this.ServUser.deleteMessage(mes)
  }

  editMess(mes: number): void {
    this.ServUser.setEmode(true);
    this.ServUser.curMessID = mes;
  }

  getUserNameByID(ind: number): string {
    return this.ServUser.getUserLoginByID(ind)
  }
}
