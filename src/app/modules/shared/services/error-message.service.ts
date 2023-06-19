import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
        case 404: {
            return 'غير موجود'
        }
        case 403: {
            return 'تم الرفض';
        }
        default: {
            return 'حدث خطأ في النظام من فضلك حاول مرة اخرى';
        }
      }
    }
}
