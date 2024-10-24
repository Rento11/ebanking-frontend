import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {customer} from "../model/customer.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  public getCustomers():Observable<Array<customer>>{
    return this.http.get<Array<customer>>(/*environment.backendHost+*/"http://localhost:8085/customers")
  }
  public searchCustomers(keyword:string):Observable<Array<customer>>{
    return this.http.get<Array<customer>>(/*environment.backendHost+*/"http://localhost:8085/customers/search?keyword="+keyword)
  }
  public saveCustomer(customer:customer):Observable<customer>{
    return this.http.post<customer>(/*environment.backendHost+*/"http://localhost:8085/customers",customer)
  }
  public deleteCustomer(id:number){
    return this.http.delete(/*environment.backendHost+*/"http://localhost:8085/customers/"+id);
  }
}
