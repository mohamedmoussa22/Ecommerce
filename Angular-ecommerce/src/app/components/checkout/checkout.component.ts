import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Luv2ShopFormService } from '../../services/luv2-shop-form.service';
import { Country } from '../../common/country';
import { CommonModule } from '@angular/common';
import { State } from '../../common/state';

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

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(private luv2ShopService: Luv2ShopFormService) {}

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

    // populate credit card months

    const startMonth: number = new Date().getMonth() + 1;
    console.log('startMonth: ' + startMonth);

    this.luv2ShopService.getCreditCardMonths(startMonth).subscribe((date) => {
      console.log('Months: ' + JSON.stringify(date));
      this.creditCardMonths = date;
    });

    // populate credit card years
    this.luv2ShopService.getCreditCardYears().subscribe((data) => {
      console.log('Years: ' + JSON.stringify(data));
      this.creditCardYears = data;
    });

    this.luv2ShopService.getCountries().subscribe((data) => {
      console.log('Reterived Countries: ' + JSON.stringify(data));
      this.countries = data;
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
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingAddressStates = [];
    }
  }

  handleMonthsBasedOnYear($event: Event) {
    const selectedYear = Number((<HTMLInputElement>$event.target).value);
    const currentYear: number = new Date().getFullYear();
    let startDate: number;
    if (selectedYear > currentYear) {
      startDate = 1;
    } else {
      startDate = new Date().getMonth() + 1;
    }
    this.luv2ShopService.getCreditCardMonths(startDate).subscribe((data) => {
      console.log('Months: ' + JSON.stringify(data));
      this.creditCardMonths = data;
    });
  }

  getStates(formGroupName: string) {
    console.log('retrieving states from country code: ' + formGroupName);
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;
    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.luv2ShopService.getStates(countryCode).subscribe((data) => {
      if (formGroupName === 'shippingAddress') {
        this.shippingAddressStates = data;
      } else {
        this.billingAddressStates = data;
      }
      formGroup?.get('state')?.setValue(data[0]);
    });


  }
}
