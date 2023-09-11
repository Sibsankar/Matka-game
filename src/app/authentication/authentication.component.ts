import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
public loginHtml=true;
public registerHtml=false;
  public adminlogin=true;
  public userlogin=false;
  public error_msg = false;
  public errorMsg = '';
  public loginformdata = {
    username: '',
    password: '',
    is_remember: ''
  }

  public schloginformdata = {
    username: '',
    password: '',
    is_remember: ''
  }
  constructor() { }

  ngOnInit(): void {
  }

  showRegister(){
    this.loginHtml = false;
    this.registerHtml = true;
  }

  showLogin(){
    this.loginHtml = true;
    this.registerHtml = false;
  }

}
