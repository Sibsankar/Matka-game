import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router'; 
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-inheader',
  templateUrl: './inheader.component.html',
  styleUrls: ['./inheader.component.css']
})
export class InheaderComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private AuthGuardService: AuthenticationService) { }
  public error_msg = false;
  public errorMsg = '';
  public userName='';
  public wallet_money='';
  public userToken = {
    token: localStorage.getItem('token') 
  }
  ngOnInit(): void {
    this.getUserdetails();
  }
  showBal(){
    this.getUserdetails();
  }
  getUserdetails(){
    console.log('token',this.userToken);
    
    this.AuthGuardService.getUserDetails(this.userToken).subscribe({
      next: (v) => {
        console.log(v.success);
        if(v.success){
         this.userName=v.success.userDetails.name;
         this.wallet_money=v.success.userDetails.wallet_money;
         console.log('Login UserName - ',this.userName);
          //this.router.navigate(['/calcutta-matka']);
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
