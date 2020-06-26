import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ShareModel } from '../shared/share-model.model';
import hljs from 'highlight.js';

@Component({
  selector: 'app-viewshare',
  templateUrl: './viewshare.component.html',
  styles: []
})
export class ViewShareComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: UserService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    hljs.initHighlightingOnLoad();
  }


}