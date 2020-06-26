import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileModel } from './file-model.model';
import { Router, ActivatedRoute, RouterStateSnapshot, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { VersionModel } from './version-model';
import { ShareModel } from './share-model.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Observable } from 'rxjs/internal/Observable';
import { tap, take } from 'rxjs/operators';
import { NgxPaginationModule } from 'ngx-pagination';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    config: any;
    formData: FileModel;
    readonly BaseURL = 'http://localhost:53357/api';
    list: FileModel[];
    sharedList: ShareModel[];
    VersionList: VersionModel[];

    userIdString: string;
    userName: string;
    Email: string;

    rawContent: string;
    codec: string;

    count: number;
    Pages: number;
    curentPage = 1;
    countPerPage = 10;

    min = 60000;
    delay = 180;

    forceHighlight: string;

    ShareFileCount: boolean;

    VersionTag:string;

    FileId: number;
    FileInfo: FileModel;
    FileCount: boolean;
    ShareCount: boolean;
    ExpDate: string;

    local = 'http://localhost:4200/';

    UpdateContentVerificator: FileModel;
    sharedFormData: ShareModel;
    Version: VersionModel;

    Auth: string;

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private router: Router,
        private toastr: ToastrService,

    ) {
        ;
        this.config = {
            itemsPerPage: 10,
            currentPage: 1,
            totalItems: 0
        }
    }
    force() {
        this.forceHighlight = this.formData.Content;
    }

    getFileId() {
        this.FileId = this.formData.FileId;
    }

    //REGISTER
    formModel = this.fb.group({
        FirstName: ['', [Validators.required, Validators.minLength(2)]],
        LastName: ['', [Validators.required, Validators.minLength(2)]],
        UserName: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^[a-zA-Z][a-zA-Z0-9._]*[a-zA-Z0-9]$")]],
        Email: ['', [Validators.email, Validators.required, Validators.pattern("^[a-zA-Z0-9._@]*$")]],
        PhoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]*$"), Validators.maxLength(14)]],
        Passwords: this.fb.group({
            Password: ['', [Validators.required, Validators.minLength(6)]],
            ConfirmPassword: ['', Validators.required]
        }, { validator: this.comparePasswords })


    });

    getDateTime() {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;

        return dateTime;
    }

    dateAdd() {

        var date = new Date();
        var min = 60000;
        var delay = 180;

        date.setFullYear(date.getFullYear());
        date.getMonth() + 1;
        date.getDate();
        date.getTime();
        date.getMinutes()
        date.getSeconds();

        var ret = new Date(date);
        ret.setTime(ret.getTime() + (delay * min));
        var checkRollover = function () { if (ret.getDate() != date.getDate()) ret.setDate(0); };
        switch (String(this.ExpDate).toLowerCase()) {
            case '': ret = undefined; break;
            case 'never': ret = undefined; break;
            case '1year': ret.setFullYear(ret.getFullYear() + 1); checkRollover(); break;
            case '6months': ret.setMonth(ret.getMonth() + 6); checkRollover(); break;
            case '1month': ret.setMonth(ret.getMonth() + 1); checkRollover(); break;
            case '2weeks': ret.setDate(ret.getDate() + 14); break;
            case '1week': ret.setDate(ret.getDate() + 7); break;
            case '3days': ret.setDate(ret.getDate() + 3); break;
            case '1day': ret.setDate(ret.getDate() + 1); break;
            case '6hours': ret.setTime(ret.getTime() + (360 * min)); break;
            case '30min': ret.setTime(ret.getTime() + (30 * min)); break;
            default: ret = undefined; break;
        }
        return ret;
    }

    resetForm() {
        this.formData = {
            FileId: 0,
            Name: '',
            Description: '',
            Syntax: '',
            ExpirationDate: new Date(),
            LastModified: this.getDateTime(),
            Content: ''
            // UserId: this.getTokenUserId()
        }
    }

    comparePasswords(fb: FormGroup) {
        let confirmPasswordControl = fb.get('ConfirmPassword');

        if (confirmPasswordControl.errors == null || 'passwordMismatch' in confirmPasswordControl.errors) {
            if (fb.get('Password').value != confirmPasswordControl.value)
                confirmPasswordControl.setErrors({ passwordMismatch: true });
            else
                confirmPasswordControl.setErrors(null);

        }
    }

    register() {
        var body = {

            FirstName: this.formModel.value.FirstName,
            LastName: this.formModel.value.LastName,
            UserName: this.formModel.value.UserName,
            Email: this.formModel.value.Email,
            PhoneNumber: this.formModel.value.PhoneNumber,
            Password: this.formModel.value.Passwords.Password

        };
        return this.http.post(this.BaseURL + '/ApplicationUser/Register', body);
    }

    login(form) {
        return this.http.post(this.BaseURL + '/ApplicationUser/Login', form);
    }
    getUserProfile() {
        return this.http.get(this.BaseURL + '/UserProfile');
    }

    getUserId() {
        var token = localStorage.getItem('token');
        var decoded = jwt_decode(token);
        this.userIdString = decoded['UserID'];

    }

    getTokenUserId() {
        var token = localStorage.getItem('token');
        var decoded = jwt_decode(token);

        return decoded['UserID'];
    }

    postFile() {
        return this.http.post(this.BaseURL + '/File', this.formData);
    }

    putFile() {
        this.formData.LastModified = this.getDateTime();
        return this.http.put(this.BaseURL + '/File/' + this.formData.FileId, this.formData);
    }

    deleteFile(id) {
        return this.http.delete(this.BaseURL + '/File/' + id);
    }

    refreshList() {
        this.http.get(this.BaseURL + '/File?skip=' + ((this.curentPage - 1) * this.countPerPage) + '&take=' + this.countPerPage)
            .toPromise()
            .then(res => this.list = res as FileModel[]);
        this.getPaginationCount();
    }

    refreshVersionList() {
        this.http.get(this.BaseURL + "/Version?FileId=" + this.formData.FileId)
            .toPromise()
            .then(res => this.VersionList = res as VersionModel[]);
    }

    getPaginationCount() {
        this.http.get<number>(this.BaseURL + '/Count').subscribe(result => {
            this.config.totalItems = result;
        });
    }

    getFileCount() {
        return this.http.get<boolean>(this.BaseURL + '/Count/File?Name=' + this.formData.Name);
    }

    getSharedCount() {
        return this.http.get<boolean>(this.BaseURL + '/Count/Share?IdentityString=' + this.formData.FileId);
    }

    getSharedFileCount() {
        return this.http.get<boolean>(this.BaseURL + '/Share/ShareCount?id=' + this.formData.FileId);
    }

    getVersionCount() {
        return this.http.get<number>(this.BaseURL + '/Count/CountVersion?fileid=' + this.formData.FileId);
    }

    sharePut() {
        this.getSharedFileCount().subscribe(result => {
            this.ShareFileCount = result;
            if (this.ShareFileCount == true) {
                this.sharedFormData = {
                    Id: 0,
                    Name: this.formData.Name,
                    Description: this.formData.Description,
                    Syntax: this.formData.Syntax,
                    IdentityString: this.createSharedIdentityString(),
                    LastModified: this.formData.LastModified,
                    Content: this.formData.Content,
                    FileId: this.formData.FileId
                }
                this.http.put(this.BaseURL + '/Share/' + this.formData.FileId, this.sharedFormData).subscribe(
                    res => {
                        this.toastr.success('Submitted successfully', 'File Link Generated');
                        console.log(this.local + "shared/" + this.sharedFormData.IdentityString)
                    },
                    (err) => {
                        console.log(err);
                    }
                );
            }
        });
    }

    //CONDITION
    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    onLogout() {
        localStorage.removeItem('token');
        this.router.navigate(['/user/login']);
    }

    insertRecord(form: NgForm) {
        this.formData.ExpirationDate = this.dateAdd();
        if (this.userIdString != this.getTokenUserId()) {
            localStorage.removeItem('token');
            this.router.navigate(['/user/login']);
            document.querySelector(".modal-backdrop.fade.show").remove();
        }
        else {
            this.getFileCount().subscribe(result => {
                this.FileCount = result;
                if (this.FileCount == true) {
                    this.toastr.warning('Submitted failed', 'There is another file with the name: "' + this.formData.Name + '"');
                }
                else {
                    console.log(this.formData);
                    this.postFile().subscribe(
                        res => {
                            this.toastr.success('Submitted successfully', 'File Creation Complete');
                            this.refreshList();
                        },
                        (err) => {
                            console.log(err);
                        }
                    );
                }
            });
        }
    }
    updateRecord() {
        this.formData.ExpirationDate = this.dateAdd();
        /*if (this.userIdString != this.getTokenUserId()) {
            localStorage.removeItem('token');
            this.router.navigate(['/user/login']);
            document.querySelector(".modal-backdrop.fade.show").remove();
        }
        else {*/
        if (this.UpdateContentVerificator.Content != this.formData.Content) {
            this.putFile().subscribe(
                res => {
                    this.toastr.info('File Update Completed', 'Versions Has Been Updated');
                    this.revision();
                    this.refreshList();
                },
                err => {
                    console.log(err);
                }
            );
            this.getVersionCount().subscribe(
                res => {
                    this.VersionTag = 'Version ' + (res + 1).toString();
                    this.insertVersion();
                }
            );
            
            //TO REPAIR
            this.sharePut();

        }
        else {
            this.putFile().subscribe(
                res => {
                    this.toastr.info('File Update Completed');
                    this.refreshList();
                    //TO REPAIR
                    this.sharePut();
                },
                err => {
                    console.log(err);
                }
            );


        }
        //}
    }

    toClipboard(){
        const selBox = document.createElement('textarea');
                    selBox.style.position = 'fixed';
                    selBox.style.left = '0';
                    selBox.style.top = '0';
                    selBox.style.opacity = '0';
                    selBox.value = this.local + "shared/" + this.sharedFormData.IdentityString;
                    document.body.appendChild(selBox);
                    selBox.focus();
                    selBox.select();
                    document.execCommand('copy');
                    document.body.removeChild(selBox);
    }

    createShareLink() {
        this.sharedFormData = {
            Id: 0,
            Name: this.formData.Name,
            Description: this.formData.Description,
            Syntax: this.formData.Syntax,
            IdentityString: this.createSharedIdentityString(),
            LastModified: this.formData.LastModified,
            Content: this.formData.Content,
            FileId: this.formData.FileId
        }
        this.getSharedCount().subscribe(result => {
            this.ShareCount = result;
            if (this.ShareCount == true) {
                this.toastr.success('Link copied to clipboard', 'Submitted successfully');
                console.log(this.local + "shared/" + this.createSharedIdentityString())
                this.toClipboard();
            }
            else {

                this.http.post(this.BaseURL + '/Share/', this.sharedFormData).subscribe(res => {
                    this.toastr.success('Link copied to clipboard', 'Submitted successfully');
                    console.log(this.local + "shared/" + this.sharedFormData.IdentityString)
                    this.toClipboard();
                });


            }
        });
    }


    revision() {
        this.UpdateContentVerificator = {
            FileId: this.formData.FileId,
            Name: this.formData.Name,
            Description: this.formData.Description,
            Syntax: this.formData.Syntax,
            ExpirationDate: this.formData.ExpirationDate,
            LastModified: this.formData.LastModified,
            Content: this.formData.Content
        }
    }

    init() {
        this.sharedFormData = {
            Id: 1,
            Name: '',
            Description: '',
            Syntax: '',
            IdentityString: '',
            LastModified: '',
            Content: '',
            FileId: 1
        }
    }

    createSharedIdentityString() {

        var res = this.formData.FileId + this.formData.Name;

        var replacerd = btoa(res);
        var replacer = replacerd.replace(/=/g, '');

        return replacer;
    }

    insertVersion() {
        this.Version = {
            Id: 0,
            Name: this.UpdateContentVerificator.Name,
            Description: this.UpdateContentVerificator.Description,
            Syntax: this.UpdateContentVerificator.Syntax,
            Date: this.UpdateContentVerificator.LastModified,
            Content: this.UpdateContentVerificator.Content,
            VersionTag: this.VersionTag,
            FileId: this.UpdateContentVerificator.FileId
        }
        return this.http.post(this.BaseURL + '/Version/', this.Version).subscribe(
            res => {
                this.refreshVersionList();
            },
            (err) => {
                console.log(err);
            }
        );
    }

    onRedirect() {
        this.router.navigate(['/edit']);
    }

    onLoginRedirect() {
        this.router.navigate(['user/login']);
    }

    onRegisterRedirect() {
        this.router.navigate(['user/registration']);
    }

    
    getVersions(file) {
        this.http.get(this.BaseURL + "/Version?FileId=" + file).toPromise()
            .then(res => this.VersionList = res as VersionModel[]);
        this.router.navigate(['/version-view']);
    }

    onDelete(FileId) {
        if (this.userIdString != this.getTokenUserId()) {
            localStorage.removeItem('token');
            this.router.navigate(['/user/login']);
            document.querySelector(".modal-backdrop.fade.show").remove();
        }
        else {
            if (confirm('Are you sure to delete this record ?')) {
                this.deleteFile(FileId)
                    .subscribe(res => {
                        this.refreshList();
                        this.toastr.warning('Submitted successfully', 'File Delete Complete');
                    },
                        err => {
                            console.log(err);
                        });
                /*this.http.delete(this.BaseURL + "/Version/" + FileId)
                    .subscribe(res => {
                        this.refreshList();
                    },
                        err => {
                            console.log(err);
                        });*/
            }
        }
    }

    restoreVersion(version: VersionModel) {
        this.formData = {
            FileId: this.Version.FileId,
            Name: this.formData.Name,
            Description: this.Version.Description,
            Syntax: this.Version.Syntax,
            ExpirationDate: this.formData.ExpirationDate,
            LastModified: this.Version.Date,
            Content: this.Version.Content
        }
        this.updateRecord();
    }
}
