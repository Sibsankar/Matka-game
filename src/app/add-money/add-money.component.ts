import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router'; 
import { AuthenticationService } from '../services/authentication.service';
import { DashboardService } from '../services/dashboard.service';
import { AddMoneyService } from '../services/add-money.service';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.css']
})
export class AddMoneyComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private AuthGuardService: AuthenticationService, private AddMoneyService: AddMoneyService) { }
  public req_balance=false;
  public qr_code = true;
  public transfer_mode: string = "My value 1";
  public addMoneyFormData = {
    amount: '',
    txn_number: '',
    transfer_mode: '',
    token: localStorage.getItem('token')
  }
  public error_msg = false;
  public errorMsg = '';
  ngOnInit(): void {
  }

  reqbal(){
    this.qr_code = false;
    this.req_balance = true;
  }

  addMoney(){
    this.qr_code = true;
    this.req_balance = false;
  }


  addMoneyToWallet(){
    console.log(this.addMoneyFormData);
    
    this.AddMoneyService.addMoneyToWallet(this.addMoneyFormData).subscribe({
      next: (v) => {
        console.log(v.data.insertedData);
        if(v.data.insertedData){
          console.log(v.success);
          Swal.fire({
            title: "Success",
            text: v.data.msg,
            icon: "success"
          });
          this.router.navigate(['/add-money']);
        }
        
      },
      error: (e) => {
        console.log(e.status);
        console.log(e.status);
          if(e.status==400){
            this.error_msg = true;
            this.errorMsg = "Please enter Registered Email id and Password";
          }
          if(e.status==401){
            localStorage.clear();
            this.error_msg = true;
            this.errorMsg = "Please enter valid Registered Email id and Password";
          }
      },
      complete: () => console.info('complete'),
      
  });
  }

  

}
