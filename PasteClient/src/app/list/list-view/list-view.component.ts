import { FileModel } from '../../shared/file-model.model';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import hljs from 'highlight.js';
import { NgxPaginationModule } from 'ngx-pagination';
import * as $ from "jquery";


@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styles: []
})
export class ListViewComponent implements OnInit {
  config: any;
  formData: FileModel;

  fileId: number
  constructor(
    private service: UserService,
    private http: HttpClient,
    private router: Router,

  ) {}

  ngOnInit() {
    this.service.getUserId();
    this.service.getPaginationCount();
    this.service.refreshList();
    $("#sidebarCollapse").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }

  populateForm(file: FileModel) {
    this.service.formData = Object.assign({}, file);
    console.log(this.service.formData);
  }
  
  pageChanged(event) {
    this.service.config.currentPage = event;
    this.service.curentPage = event;
    this.service.getPaginationCount();
    this.service.refreshList();
  }

  fileView(file: FileModel) {
    this.formData = Object.assign({}, file);
    window.location.href = this.service.local + 'view/' + this.formData.FileId;
  }

  selectSyntax(file: FileModel) {
    this.service.formData = Object.assign({}, file);
    const encodedSyntax = encodeURIComponent(this.service.formData.Syntax);
    return this.http.get(this.service.BaseURL + '/File/FindBySyntax?Syntax=' + encodedSyntax)
      .toPromise()
      .then(res => this.service.list = res as FileModel[]);
  }
}