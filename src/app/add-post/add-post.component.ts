import { Component, AfterContentChecked, ElementRef, ViewChild } from '@angular/core';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})

export class AddPostComponent implements AfterContentChecked {
  public title!: string;
  public message!: string;
  public postName: string = 'Post';
  public postWinName: string = 'Add Post';
  private e_mode = false;
  @ViewChild('clBut') clBut!: ElementRef;

  constructor(public ServUser: BlogService) { }

  ngAfterContentChecked(): void {
    if (this.ServUser.emode) {
      this.title = this.ServUser.getMesforEdit().title;
      this.message = this.ServUser.getMesforEdit().message;
      this.postName = 'Edit Post';
      this.postWinName = 'Editing post...'
      this.ServUser.emode = false;
      this.e_mode = true;
    }
  }


  AddPost(tit: string, mess: string): void {
    if (!tit || !mess) alert('Заповніть всі поля !!')
    else {
      if (this.e_mode) {
        this.ServUser.editMess(this.ServUser.curMessID, tit, mess);
        this.e_mode = false;
        this.postName = 'Post';
        this.postWinName = 'Add Post';
      }
      else { this.ServUser.addMess(this.title, this.message); }

      this.title = '';
      this.message = '';
      this.clBut.nativeElement.click();
    }
  }
  closeModal(): void {
    this.e_mode = false;
    this.postName = 'Post';
    this.postWinName = 'Add Post';
    this.title = '';
    this.message = '';
  }

}


