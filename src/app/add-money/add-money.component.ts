import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router'; 
import { AuthenticationService } from '../services/authentication.service';
import { DashboardService } from '../services/dashboard.service';
import { AddMoneyService } from '../services/add-money.service';
import { RulesRegulationService } from '../services/rules-regulation.service';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2'
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.css']
})
export class AddMoneyComponent implements OnInit {

  constructor(private clipboard: Clipboard,private router: Router, private route: ActivatedRoute,private RulesRegulationService: RulesRegulationService, private AuthGuardService: AuthenticationService, private AddMoneyService: AddMoneyService) { }
  public req_balance=false;
  public settingsData:any;
  public qr_code = true;
  public transfer_mode: string = "My value 1";
  public addMoneyFormData = {
    amount: '',
    txn_number: '',
    transfer_mode: '',
    token: localStorage.getItem('token')
  }

  public upiDaata = {
    upi_2_phone: '',
    upi_1_phone: '',
    
  }
  public error_msg = false;
  public errorMsg = '';
  ngOnInit(): void {
    this.getPageData();
  }

  reqbal(){
    this.qr_code = false;
    this.req_balance = true;
  }
 
  addMoney(){
    this.qr_code = true;
    this.req_balance = false;
  }

  copytoClipboardupi1(){
    //console.log('upi phone-----------',this.upiDaata.upi_1_phone);
    this.clipboard.copy(this.upiDaata.upi_1_phone);
  }

  copytoClipboardupi2(){
    //console.log('upi phone-----------',this.upiDaata.upi_2_phone);
    this.clipboard.copy(this.upiDaata.upi_2_phone);
  }


  getPageData(){
    this.RulesRegulationService.getRules().subscribe({
      next: (v) => {
        console.log(v);
        if(v.data.pageData){          
        this.settingsData=v.data.pageData
        this.upiDaata.upi_1_phone = this.settingsData.upi_1_phone
        this.upiDaata.upi_2_phone = this.settingsData.upi_2_phone
        
        Swal.close();
        
        }
        
        
      },
      error: (e) => {        
        Swal.fire({
          title: "Oops..."+e.status,
          text: ' Something Went wrong',
          icon: "error"
        });
      },
      complete: () => console.info('complete'),
      
    });
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
          this.router.navigate(['/dashboard']);
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
