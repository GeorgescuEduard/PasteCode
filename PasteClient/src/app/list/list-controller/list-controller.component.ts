import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-controller',
  templateUrl: './list-controller.component.html',
  styles: []
})
export class ListControllerComponent implements OnInit {

  token:string;

  constructor(
    private service: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
  }

  navigateToNew(){
    this.router.navigate(['/new']);
  }
  navigateToTest(){
    this.router.navigate(['/share']);
  }
  navigateToHome() {
    this.router.navigate(['home']);
}
}