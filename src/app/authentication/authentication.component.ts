import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router'; 
import { AuthenticationService } from '../services/authentication.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
public loginHtml=true;
public otpSent=false;
public isname=false;
public isemail=false;
public isconfpassword=false;
public ispassword=false;
public mismatchpassword=false;
public isotp=false;
public registerHtml=false;
  public adminlogin=true;
  public userlogin=false;
  public error_msg = false;
  public errorMsg = '';

  public loginformdata = {
    email: '',
    password: '',
    is_remember: ''
  }

  public otpformdata = {
    email: '',
    name: '',
  }

  public regiterformdata = {
    email: '',
    password: '',
    c_password: '',
    name:'',
    otp:''
  }


  
  constructor(private router: Router, private route: ActivatedRoute, private AuthGuardService: AuthenticationService) { }

  ngOnInit(): void {
    if(this.route.snapshot.url.length!=0){
      if(this.route.snapshot.url[0].path=='login'){
        this.adminlogin=false;
        this.loginHtml=true;

      }
    }
  }

  showRegister(){
    this.loginHtml = false;
    this.registerHtml = true;
  }

  showLogin(){
    this.loginHtml = true;
    this.registerHtml = false;
  }
  login(){
    console.log(this.loginformdata);

    //var output=this.AuthGuardService.login(this.loginformdata.email,this.loginformdata.password);

    this.AuthGuardService.login(this.loginformdata).subscribe({
      next: (v) => {
        console.log(v.success);
        if(v.success){
          localStorage.setItem('email',this.loginformdata.email);
          //localStorage.setItem('email',v.);
          localStorage.setItem('isAuthenticate','true');
          localStorage.setItem('token',v.success.tokenid);
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
  sendOTP(){
console.log(this.otpformdata);
this.isname=false;
this.isemail=false;

if(!this.otpformdata.name){
  this.isname=true;
  return;
  }
  if(!this.otpformdata.email){
    this.isemail=true;
    return;
    }
  
this.AuthGuardService.sendOtp(this.otpformdata).subscribe({
  next: (v) => {
    console.log(v.success);
    if(v.success){
      this.otpSent=true;
      
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


  createAccount(){
    this.isotp=false;
    this.ispassword=false;
    this.isconfpassword=false;
    this.mismatchpassword=false;
    console.log(this.regiterformdata);
this.regiterformdata.email = this.otpformdata.email;
this.regiterformdata.name = this.otpformdata.name;
if(!this.regiterformdata.otp){
this.isotp=true;
return;
}
if(!this.regiterformdata.password){
this.ispassword=true;
return;
}
if(!this.regiterformdata.c_password){  
this.isconfpassword=true;
return;
}
if(this.regiterformdata.c_password != this.regiterformdata.password){  
  this.mismatchpassword=true;
  return;
  }


    this.AuthGuardService.register(this.regiterformdata).subscribe({
  next: (v) => {
    console.log(v.success);
    if(v.success){
      this.otpSent=true;
      this.router.navigate(['/login']);
      
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
