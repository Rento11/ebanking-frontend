import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {customer} from "../model/customer.model";
import {CustomerService} from "../services/customer.service";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-customer',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})
export class NewCustomerComponent implements OnInit{
  newCustomerFormGroup! :FormGroup;
  constructor(private formBuilder : FormBuilder, private customerService: CustomerService, private router: Router) {
  }
  ngOnInit(){
    this.newCustomerFormGroup=this.formBuilder.group({
      name : this.formBuilder.control(null, [Validators.required, Validators.minLength(4)]),
      email : this.formBuilder.control(null, [Validators.required, Validators.email])
    })
  }

  handleSaveCustomer() {
    let customer: customer = this.newCustomerFormGroup.value;
    this.customerService.saveCustomer(customer).subscribe({
      next : data => {
        alert("Customer has been successfully saved!");
        this.router.navigateByUrl("/customers");
      },
      error : err => {
        console.log(err);
      }
    });
  }
}
