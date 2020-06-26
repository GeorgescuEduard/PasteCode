import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import hljs from 'highlight.js';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { VersionModel } from '../../shared/version-model';

@Component({
  selector: 'app-version-view',
  templateUrl: './version-view.component.html',
  styles: []
})
export class VersionViewComponent implements OnInit {
  config: any;

  constructor(
    private service: UserService,
    private http: HttpClient,
    private router: Router
  
  ) {}

  ngOnInit() {
    hljs.initHighlightingOnLoad();
  }

  populateForm(version: VersionModel) {
    this.service.Version = Object.assign({}, version);
    this.router.navigate(["/view-selected-version"]);
  }
}