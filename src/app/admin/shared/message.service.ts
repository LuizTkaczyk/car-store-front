import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private toastr: ToastrService ) { }

    show(message: string, type: string, options?: any) {
        if (!options) {
            options = {
                timeOut: 5000,
                positionClass: 'toast-top-right',
                preventDuplicates: true,
                tapToDismiss: true,
                countDuplicates : true
            };
        }

        switch (type) {
            case 'success':
                this.toastr.success(message, 'Successo', options);
                break;
            case 'warning':
                this.toastr.warning(message, 'Atenção', options);
                break;
            case 'error':
                this.toastr.error(message, 'Erro', options);
                break;
            default:
                this.toastr.info(message, 'Informação', options);
        }
    }
}
