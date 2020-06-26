import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/shared/user.service';
import { FileModel } from 'src/app/shared/file-model.model';

@Component({
  selector: 'app-raw',
  templateUrl: './raw.component.html',
  styles: []
})
export class RawComponent implements OnInit {

  formData: FileModel;

  constructor(
    private service: UserService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    console.log('Component initialized');
    this.route.data.subscribe((data: { file: any }) => {
      this.formData = data.file as FileModel;
      this.service.rawContent = this.formData.Content;
    });
  }

}