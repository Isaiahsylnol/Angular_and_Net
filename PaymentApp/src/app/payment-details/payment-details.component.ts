import { Component, inject } from '@angular/core';
import { PaymentDetailFormsComponent } from "./payment-detail-forms/payment-detail-forms.component";
import { PaymentDetailService } from '../shared/payment-detail.service';
import { CommonModule } from '@angular/common';
import { PaymentDetail } from '../shared/payment-detail.model';
import { ToastrModule, ToastrService, } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-payment-details',
  standalone: true,
  imports: [CommonModule, PaymentDetailFormsComponent],
  templateUrl: './payment-details.component.html',
})
export class PaymentDetailsComponent {
  constructor(public service: PaymentDetailService,) {
  }
  toastr = inject(ToastrService);
  populateForm(selectedRecord: PaymentDetail) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?'))
      this.service.deletePaymentDetail(id)
        .subscribe({
          next: res => {
            this.service.list = res as PaymentDetail[]
            this.toastr.error('Deleted successfully', 'Payment Detail Register')
          },
          error: err => { console.log(err) }
        })
  }

  ngOnInit(): void {
    this.service.refreshList();
  }
}
