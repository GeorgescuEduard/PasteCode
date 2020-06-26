import { FileModel } from '../../shared/file-model.model';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from 'src/app/shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import hljs from 'highlight.js';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styles: []
})
export class ViewComponent implements OnInit {

  formData: FileModel;
  language: string;

  constructor(
    private service: UserService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    hljs.initHighlightingOnLoad();
    console.log('Component initialized');
    this.route.data.subscribe((data: { file: any }) => {
      this.formData = data.file as FileModel;
      this.service.formData = this.formData;
      console.log(this.service.formData);
      this.language = this.formData.Syntax;
      hljs.configure({ languages: [this.language] });
      this.service.revision();
    });
  }

  raw() {
    window.location.href = this.service.local + 'raw/' + this.formData.FileId;
  }

  
}