import { Component } from '@angular/core';
import { PaymentDetailService } from '../../shared/payment-detail.service';
import { ToastrService, } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { PaymentDetail } from '../../shared/payment-detail.model';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { LoggerService } from '../../shared/logger.service';

@Component({
  selector: 'app-payment-detail-forms',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  providers: [LoggerService],
  templateUrl: './payment-detail-forms.component.html',
  styles: ``
})

export class PaymentDetailFormsComponent {
  constructor(public service: PaymentDetailService, private logger: LoggerService, private toastr: ToastrService) {
  }

  onSubmit(form: NgForm) {
    this.service.formSubmitted = true
    if (form.valid) {
      if (this.service.formData.paymentDetailId == 0)
        this.insertRecord(form)
      else
        this.updateRecord(form)
    }
  }

  insertRecord(form: NgForm) {
    this.service.postPaymentDetail()
      .subscribe({
        next: res => {
          this.service.list = Array.isArray(res) ? (res as PaymentDetail[]) : [res as PaymentDetail];
          this.service.resetForm(form)
          this.toastr.success('Inserted successfully', 'Payment Detail Register')
        },
        error: err => { console.log(err) }
      })
  }

  log() {
    return this.logger.log()
  }

  updateRecord(form: NgForm) {
    this.service.putPaymentDetail()
      .subscribe({
        next: res => {
          this.service.list = res as PaymentDetail[]
          this.service.resetForm(form)
          this.toastr.info('Updated successfully', 'Payment Detail Register')
        },
        error: err => { console.log(err) }
      })
   }
}
