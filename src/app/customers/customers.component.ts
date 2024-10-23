import {Component, OnInit} from '@angular/core';
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {CustomerService} from "../services/customer.service";
import {HttpClientModule} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {customer} from "../model/customer.model";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [HttpClientModule, NgIf, NgForOf, JsonPipe, AsyncPipe, ReactiveFormsModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {

  customers!: Observable<Array<customer>>;
  errorMessage!: object;
  searchFormGroup: FormGroup | undefined;

  constructor(private customerService: CustomerService, private formBuilder: FormBuilder) {}
  ngOnInit() {
    this.searchFormGroup = this.formBuilder.group({
      keyword: this.formBuilder.control("")
    });
    this.handleSearchCustomers();
  }

  handleSearchCustomers() {
    let kw = this.searchFormGroup!.value.keyword;
    this.customers=this.customerService.searchCustomers(kw).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  handleDeleteCustomer(c: customer) {
    let conf = confirm("Are you sure ?");
    if(!conf) return;
    this.customerService.deleteCustomer(c.id).subscribe({
      next: resp =>{
        this.customers = this.customers.pipe(
          map(data => {
            let index = data.indexOf(c);
            data.slice(index,1);
            return data;
          })
        )
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
