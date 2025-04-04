import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  ngOnInit(): void {
    this.checkoutFormGroup = new FormGroup({
      customer: new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        email: new FormControl(''),
      }),
      shippingAddress: new FormGroup({
        country: new FormControl(''),
        street: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl(''),
        zipCode: new FormControl(''),
      }),
      billingAddress: new FormGroup({
        country: new FormControl(''),
        street: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl(''),
        zipCode: new FormControl(''),
      }),
      creditCard: new FormGroup({
        cardType: new FormControl(''),
        nameOnCard: new FormControl(''),
        cardNumber: new FormControl(''),
        securityCode: new FormControl(''),
        expirationMonth: new FormControl(''),
        expirationYear: new FormControl(''),
      }),
    });
  }

  onSubmit() {
    console.log('Handling the submit button');
    console.log(this.checkoutFormGroup.get('customer')?.value);
  }

  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value
      );
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }
}
