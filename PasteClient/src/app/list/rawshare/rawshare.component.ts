import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/shared/user.service';
import { ShareModel } from 'src/app/shared/share-model.model';

@Component({
  selector: 'app-rawshare',
  templateUrl: './rawshare.component.html',
  styles: []
})
export class RawShareComponent implements OnInit {

    formData: ShareModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: UserService,
    private http: HttpClient
  ) {}
  ngOnInit() {
    console.log('Component initialized');
    this.route.data.subscribe((data: { shared: any }) => {
      this.formData = data.shared as ShareModel;
      this.service.rawContent = this.formData.Content;
    });
  }
}