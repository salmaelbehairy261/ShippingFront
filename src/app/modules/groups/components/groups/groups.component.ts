import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MyToastrService } from 'src/app/modules/shared/services/my-toastr.service';
import { catchError, of, tap } from 'rxjs';
import { GroupService } from 'src/app/modules/shared/services/group.service';
import { getAllGroups, groupResponse } from 'src/app/modules/shared/models/Group';
import { Params } from 'src/app/modules/shared/models/Params';
import { Router } from '@angular/router';
import { NavTitleService } from 'src/app/modules/shared/services/nav-title.service';
import { AuthService } from 'src/app/modules/shared/services/auth.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit{

  constructor(private groupsService:GroupService,
    private myToastrService:MyToastrService,
    private router: Router,
    private authService: AuthService,
    private navTitleService:NavTitleService) { }
  @ViewChild('search') searchTerms?: ElementRef;
  groups:getAllGroups[]=[];
  isDesc:boolean=false
  groupParams = new Params();
  totalCount = 0;

  ngOnInit(): void {
    this.navTitleService.title.next("المجموعات")
    this.loadGroups();
  }

  loadGroups() {
  this.groupsService.getAllGroups(this.groupParams)
  .subscribe((response:groupResponse) => {
    this.groups = response.data;
    this.groupParams.pageNumper = response.pageIndex;
    this.groupParams.pageSize = response.pageSize;
    this.totalCount=response.pageCount
  });
  }

  deleteGroup(id:number){
    this.groupsService.deleteGroup(id).pipe(
      tap((response:any) => {

        if (response['message'] === "Group Deleted Successfully") {

          this.toasterSuccess();
          this.loadGroups();
        }
        else if (response['message'] === "Delete Employee First") {

          this.toasterError();
        }
      }),
      catchError((error) => {

        console.error('API request error:', error);
        return of(null);
      })
    ).subscribe();

  }
  toasterSuccess(){
    this.myToastrService.success("تم حذف المجموعه بنجاح");
  }
  toasterError(){
    this.myToastrService.error("لا يمكن حذف مجموعه يوجد بها موظفين");
  }



  onPageChanged(event: any)
  {
    if (this.groupParams.pageNumper !== event.page)
    {
      this.groupParams.pageNumper = event.page;
      this.loadGroups();

      }
  }

  onSearch() {
    this.groupParams.search = this.searchTerms?.nativeElement.value;
    this.groupParams.pageNumper = 1;
    this.loadGroups();
  }
  onReset() {
    if (this.searchTerms)
      this.searchTerms.nativeElement.value = ""
    this.groupParams = new Params();
    this.loadGroups();
  }
  onSort(){
    this.isDesc=!this.isDesc;
    this.groupParams.sort=this.isDesc?'Desc':''
    this.loadGroups();
  }
  onPageSizeChange(event:any){
    const pageSize=parseInt(event.target.value)
    if (pageSize > 0 && pageSize < 50){
      this.groupParams.pageSize=pageSize
      this.loadGroups()
    }
  }

  addGroup() {
    this.router.navigate(['/employee/addGroups']);
}
updateGroup(id:number){
  this.router.navigate(["/employee/updateGroups",id]);
  }
  
 hasPermission(action: string)
  {
    return this.authService.hasPermission(9,action);
  }  

}


