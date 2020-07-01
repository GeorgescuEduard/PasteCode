import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, RouterStateSnapshot, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap, take } from 'rxjs/operators';
import { FileModel } from '../file-model.model';
import hljs from 'highlight.js';
import { VersionModel } from '../version-model';

@Injectable({
    providedIn: 'root'
})
export class VersionListResolver implements Resolve<any> {
    readonly BaseURL = 'http://localhost:53357/api';

    local = 'http://localhost:4200/';
    versionData: VersionModel[];
    language:string;

    constructor(
        private http: HttpClient,
    ) {}
    resolve(route: ActivatedRouteSnapshot) {
        return this.http.get(this.BaseURL + '/Version/' + route.params['file']).pipe(tap(res => { this.versionData = res as VersionModel[];
            console.log(this.versionData)}
            ));
        };
    }
