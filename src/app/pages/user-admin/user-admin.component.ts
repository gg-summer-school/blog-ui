import {Component, OnInit} from '@angular/core';
import {AdminPagesService} from "../../services/admin-services/admin-pages.service";
import {Admin, roleDTO, RolePayload} from "../../model/admin";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss']
})
export class DashboardComponent implements OnInit {
  isBlocked = false;
  isSuspended = false;
  readers: Admin[] = []
  number!:number
  suspendUser: boolean = false;
  addRole!: RolePayload;
  reactivate: boolean = true;
  active: boolean = false;
  role: string = 'Role'

  constructor(private adminPagesService: AdminPagesService, public translate: TranslateService) {
    translate.addLangs(['en', 'fre']);
    translate.setDefaultLang('en');
  }

  switchLang(lang: string) {
    console.log(lang)
    this.translate.use(lang);
  }

  ngOnInit(): void {
    this.displayReaders()
  }

  displayReaders() {
    this.adminPagesService.getReaders()
      .subscribe( res=>
      {
        this.readers = res;
        this.number= this.readers.length;
      })
  }

  suspendPublisher(publisherId: string) {
    this.adminPagesService.suspendUser(publisherId, this.suspendUser).subscribe((res) => {
      this.displayReaders();
    })
  }

  addRoleToUser(user_id: string, event:any) {
    const role : roleDTO = {
      role : (<any>RolePayload)[event.target.value]
    }
    this.adminPagesService.appendRole(user_id, role).subscribe((res: any) => {
      console.log(res);
    }, (error: any) => {
      alert(error.error.message);
    })
  }

  removeRoleToUser(user_id: string, event:any) {
    const role : roleDTO = {
      role : (<any>RolePayload)[event.target.value]
    }
    this.adminPagesService.removeRole(user_id, role).subscribe((res: any) => {
      console.log(res);
    }, (error: any) => {
      alert(error.error.message);
    })
  }

  reactivateUser(user_id: string) {
    this.adminPagesService.reactivateUser(user_id, this.reactivate).subscribe((res) => {
      this.displayReaders();
    })
  }

}
