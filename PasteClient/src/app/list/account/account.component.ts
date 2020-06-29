import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {
  userDetails;

  constructor(
    private router: Router,
    public service: UserService,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.service.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
      },
      err => {
        console.log(err);
      }
    );
  }
  onSubmitUpdate() {
    this.service.updateDetails().subscribe(
      (res: any) => {
        if (res.Succeeded) {
          //this.service.updateModel.reset();
          this.toastr.success('User details have been updated!', 'Update successful.');
        } else {
          res.Errors.forEach(element => {
            switch (element.Code) {
              case 'DuplicateUserName':
                this.toastr.error('Username is already taken','Update failed.');
                break;
              
              case 'DuplicateEmail':
                this.toastr.error('Email is already taken','Registration failed.');
                break;

              default:
              this.toastr.error(element.description,'Update failed.');
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  
  onSubmitUpdatePassword(){
    this.service.updatePassword().subscribe(
      (res: any) => {
        if (res.Succeeded) {
          //this.service.formModel.reset();
          this.toastr.success('User password have been updated!', 'Update successful.');
        } else {
          res.Errors.forEach(element => {
            switch (element.Code) {
              case 'DuplicateUserName':
                this.toastr.error('Username is already taken','Registration failed.');
                break;
              
              case 'DuplicateEmail':
                this.toastr.error('Email is already taken','Registration failed.');
                break;

              default:
              this.toastr.error(element.description,'Update failed.');
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
