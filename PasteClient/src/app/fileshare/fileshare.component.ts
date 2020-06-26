import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from 'src/app/shared/user.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ShareModel } from '../shared/share-model.model';
import hljs from 'highlight.js';

@Component({
  selector: 'app-fileshare',
  templateUrl: './fileshare.component.html',
  styles: []
})
export class FileShareComponent implements OnInit {

formData: ShareModel;
language: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: UserService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    hljs.initHighlightingOnLoad();
    console.log('Component initialized');
    this.route.data.subscribe((data: { shared: any }) => {
      this.formData = data.shared as ShareModel;
      this.service.rawContent = this.formData.Content;
      this.language = this.formData.Syntax;
      hljs.initHighlightingOnLoad();
      hljs.configure({languages: [this.language]});
    });
  }

  rawShare() {
    window.location.href = this.service.local + 'rawshare/' + this.formData.IdentityString;
    
}
}