
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router'; 
import {Location} from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { WithdrawHistoryService } from '../services/withdraw-history.service';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-withdraw-history',
  templateUrl: './withdraw-history.component.html',
  styleUrls: ['./withdraw-history.component.css']
})
export class WithdrawHistoryComponent implements OnInit {

  constructor(private _location: Location, private router: Router, private route: ActivatedRoute, private AuthGuardService: AuthenticationService, private WithdrawHistoryService: WithdrawHistoryService) { }
  public error_msg = false;
  public errorMsg = '';
  public withdrawData = [];
  public single_bidData = [];
  public jodi_bidData = [];
  public panna_bidData = [];
  public pageData = '';
  public bid_table = false;
  public leaguetable = true;
  public dipositFormData = {
    token: localStorage.getItem('token')
  }
  

  ngOnInit(): void {
    this.getWithdrawHistory();
    
  }
 

  getWithdrawHistory(){
    Swal.fire({
      title: 'Getting withdraw history...',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });

    this.WithdrawHistoryService.getWithdrawHistory(this.dipositFormData).subscribe({
      next: (v) => {
        console.log(v);
        if(v.data.withdraw_history.length>0){          
        this.withdrawData=v.data.withdraw_history
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




}



