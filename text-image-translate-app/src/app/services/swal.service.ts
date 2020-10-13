import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  
  constructor() { }

  showConfirmButton(title: string, message: string): Promise<SweetAlertResult> {
    return Swal.fire({
      title,
      text: message,
      icon: 'success',
      showConfirmButton: true
    });
  }

  showError(message: string) {
    Swal.fire({
      title: 'Error',
      text: message ,
      icon: 'error'
    });
  }

  close() {
    Swal.close();
  }

  showUnknownError() {
    Swal.fire({
      title: 'Error',
      text: 'Ha ocurrido un error desconocido' ,
      icon: 'error'
    });
  }

  showSuccess(title: string, message: string) {
    Swal.fire({
      title,
      text: message,
      icon: 'success'
    });
  }
  
  showLoading(message: string) {
    Swal.fire({
      title: 'Espere',
      text: message,
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();
  } 
}
