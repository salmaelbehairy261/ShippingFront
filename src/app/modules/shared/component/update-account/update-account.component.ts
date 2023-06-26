import { updatePassword } from './../../models/Employee';
import { RepresentativeService } from 'src/app/modules/shared/services/representative.service';
import { MerchantService } from './../../services/merchant.service';
import { EmployeeService } from 'src/app/modules/shared/services/employee.service';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MyToastrService } from '../../services/my-toastr.service';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent {
  constructor(private activeModal: NgbActiveModal,
    private authService:AuthService,
    private employeeService:EmployeeService,
    private merchantService:MerchantService,
    private representativeService:RepresentativeService,
    private toastr:MyToastrService
    ){}
  showPassword=false
  showConfirmPassword=false
  isIdentical=true
  updateForm=new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?]).{8,}$')]),
    passwordConfirm:new FormControl('',[Validators.required])
  })
  Submit(){
    if(this.updateForm.value.password==this.updateForm.value.passwordConfirm){
      console.log(this.isIdentical)
      const updatePassword:updatePassword={
        id:this.authService.getUserId(),
        email:this.authService.getUserEmail(),
        password:this.updateForm.value.password!
      }
      const role=this.authService.getUserRole()
      if(role=='Merchant'){
        this.merchantService.UpdateMerchantPassword(updatePassword,this.authService.getUserId()).subscribe(res=>{
          this.activeModal.close()
          this.toastr.success("تم تحديث كلمة المرور بنجاح")
        })
      }
      else if(role=='Representative'){
        this.representativeService.UpdateRepresentativePassword(updatePassword,this.authService.getUserId()).subscribe(res=>{
          this.activeModal.close()
          this.toastr.success("تم تحديث كلمة المرور بنجاح")
        })
      }
      else{
        this.employeeService.UpdateEmployeePassword(updatePassword,this.authService.getUserId()).subscribe(res=>{
          this.activeModal.close()
          this.toastr.success("تم تحديث كلمة المرور بنجاح")
        })
      }
    }
    else{
      this.isIdentical=false
      console.log(this.isIdentical)
    }
  }
}
