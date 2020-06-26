import { FileModel } from '../../shared/file-model.model';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import hljs from 'highlight.js';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: []
})
export class EditComponent implements OnInit {
  config: any;

  constructor(
    private service: UserService,
    private http: HttpClient,
  
  ) {}

  ngOnInit() {
    hljs.initHighlightingOnLoad();
   /* this.service.getVersionCount().subscribe(
      res => {
          this.service.VersionTag = 'Version ' + (res + 1).toString();
      }
  );*/
  }

}