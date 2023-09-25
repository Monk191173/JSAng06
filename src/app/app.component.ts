import { AfterContentChecked, Component } from '@angular/core';
import { BlogService } from './blog.service';
import { IcurUser } from './shared/interfaces/faces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentChecked {
  title = 'blog';
  public logined!: boolean;
  public curUserID!: number;
  public masUsers!: IcurUser[];
  constructor(private ServUser: BlogService) { }

  ngAfterContentChecked(): void {
    this.logined = this.ServUser.getLog();
    this.curUserID = this.ServUser.curUserID;
    this.masUsers = this.ServUser.masUsers;
  }
  logOut(): void {
    this.ServUser.logined = false;
    this.ServUser.curUserID = -1;
  }
}
