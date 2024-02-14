import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router'; 
import { AuthenticationService } from '../services/authentication.service';
import { DashboardService } from '../services/dashboard.service';
import { UpdateAccountService } from '../services/update-account.service';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private AuthGuardService: AuthenticationService, private UpdateAccountService: UpdateAccountService) { }
  public req_balance=true;
  public qr_code = false;
  public transfer_mode: string = "My value 1";
  public addAccountFormData = {
    current_password: '',
    new_password: '',
    confirm_password: '',
    token: localStorage.getItem('token')
  }
  public error_msg = false;
  public errorMsg = '';
  ngOnInit(): void {
    //this.getAccountDetails();
  }

  reqbal(){
    this.qr_code = false;
    this.req_balance = true;
  }

  addMoney(){
    this.qr_code = true;
    this.req_balance = false;
  }
  getAccountDetails(){
    
    this.UpdateAccountService.getAccountDetails(this.addAccountFormData).subscribe({
      next: (v) => {
        console.log(v.data);
        this.addAccountFormData = v.data.accountDetails;
        this.addAccountFormData.token= localStorage.getItem('token')
        
        
      },
      error: (e) => {
        console.log(e.status);
        Swal.fire({
          title: "Oops..."+e.status,
          text: ' Something Went wrong',
          icon: "error"
        });
      },
      complete: () => console.info('complete'),
      
  });


  }

  sendMoneyWidthdrawalRequest(){
    console.log(this.addAccountFormData);
    if(!this.addAccountFormData.current_password){
      Swal.fire({
        title: "Oops..",
        text: 'Please enter current password',
        icon: "error"
      });
      return;

    }

    if(!this.addAccountFormData.new_password){
      Swal.fire({
        title: "Oops..",
        text: 'Please enter new password',
        icon: "error"
      });
      return;

    }

    if(!this.addAccountFormData.confirm_password){
      Swal.fire({
        title: "Oops..",
        text: 'Please enter confirm password',
        icon: "error"
      });
      return;

    }
    if(this.addAccountFormData.confirm_password !==this.addAccountFormData.new_password){
      Swal.fire({
        title: "Oops..",
        text: 'New password and confirm password did not matched',
        icon: "error"
      });
      return;

    }

   
    this.UpdateAccountService.updatePasswordDetails(this.addAccountFormData).subscribe({
      next: (v) => {
        console.log(v.data.insertedData);
        if(v.data.insertedData){
          console.log(v.success);
          Swal.fire({
            title: "Success",
            text: v.data.msg,
            icon: "success"
          });
          this.router.navigate(['/update-account']);
        }else{
          Swal.fire({
            title: "Oops...",
            text: v.data.msg,
            icon: "error"
          });
          this.router.navigate(['/update-account']);
        }
        
      },
      error: (e) => {
        console.log(e.status);
        Swal.fire({
          title: "Oops..."+e.status,
          text: ' Something Went wrong',
          icon: "error"
        });
      },
      complete: () => console.info('complete'),
      
  });
  }

  

}
