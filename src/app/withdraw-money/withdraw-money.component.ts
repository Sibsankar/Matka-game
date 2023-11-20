import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router'; 
import { AuthenticationService } from '../services/authentication.service';
import { DashboardService } from '../services/dashboard.service';
import { WithdrawMoneyService } from '../services/withdraw-money.service';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-withdraw-money',
  templateUrl: './withdraw-money.component.html',
  styleUrls: ['./withdraw-money.component.css']
})
export class WithdrawMoneyComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private AuthGuardService: AuthenticationService, private WithdrawMoneyService: WithdrawMoneyService) { }
  public req_balance=true;
  public qr_code = false;
  public transfer_mode: string = "My value 1";
  public addMoneyFormData = {
    amount: '',
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


  sendMoneyWidthdrawalRequest(){
    console.log(this.addMoneyFormData);
    if(!this.addMoneyFormData.amount){
      Swal.fire({
        title: "Oops..",
        text: 'Please enter amount',
        icon: "error"
      });
      return;

    }
    if(!this.addMoneyFormData.transfer_mode){
      Swal.fire({
        title: "Oops..",
        text: 'Please enter withdrawal mode',
        icon: "error"
      });
      return;

    }
    
    this.WithdrawMoneyService.sendMoneyWidthdrawalRequest(this.addMoneyFormData).subscribe({
      next: (v) => {
        console.log(v.data.insertedData);
        if(v.data.status){
          console.log(v.success);
          Swal.fire({
            title: "Success",
            text: v.data.msg,
            icon: "success"
          });
          this.router.navigate(['/withdraw-money']);
        }else{
          Swal.fire({
            title: "Oops...",
            text: v.data.msg,
            icon: "error"
          });
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
