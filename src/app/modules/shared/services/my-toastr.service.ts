import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MyToastrService {
  toastrConfig: { timeOut: number; positionClass: string; closeButton: boolean; tapToDismiss: boolean; progressBar: boolean; enableHtml: boolean; iconClasses: { error: string; info: string; success: string; warning: string; }; };
  constructor(private toastr: ToastrService) {
    this.toastrConfig = {
      timeOut: 5000,
      positionClass: 'toast-custom-position',
      closeButton: true,
      tapToDismiss: false,
      progressBar: true,
      enableHtml: true,
      iconClasses: {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning',
      },
    };
  }

  success(message: string, title?: string): void {
    this.toastr.success(message, title,this.toastrConfig);
  }

  error(message: string, title?: string): void {
    this.toastr.error(message, title,this.toastrConfig);
  }

  warning(message: string, title?: string): void {
    this.toastr.warning(message, title,this.toastrConfig);
  }

  info(message: string, title?: string): void {
    this.toastr.info(message, title,this.toastrConfig);
  }
}
