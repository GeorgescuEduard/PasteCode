import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  versionData: VersionModel[];

  constructor(
    private service: UserService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  
  ) {}

  ngOnInit() {
    console.log('Component initialized');
    this.route.data.subscribe(
      (data: { file: VersionModel[] }) => {
          this.versionData = data.file as VersionModel[];
          this.service.VersionList = this.versionData;
          console.log(this.versionData);
        });
    }

  populateForm(version: VersionModel) {
    window.location.href = this.service.local + 'view-selected-version/' + version.Id;
  }
}