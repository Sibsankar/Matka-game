import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router'; 
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-leftmenu',
  templateUrl: './leftmenu.component.html',
  styleUrls: ['./leftmenu.component.css']
})
export class LeftmenuComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private AuthGuardService: AuthenticationService) { }
  public token = localStorage.getItem('token'); 
  public error_msg = false;
  public errorMsg = '';
  public userName='';
  public userToken = {
    token: localStorage.getItem('token') 
  }
  ngOnInit(): void {
      
    this.getUserdetails();
  }

  getUserdetails(){
    console.log('token',this.userToken);
    
    this.AuthGuardService.getUserDetails(this.userToken).subscribe({
      next: (v) => {
        console.log(v.success);
        if(v.success){
         this.userName=v.success.userDetails.name;
         console.log('Login UserName - ',this.userName);
          this.router.navigate(['/calcutta-matka']);
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
