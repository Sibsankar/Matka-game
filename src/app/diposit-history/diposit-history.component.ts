


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router'; 
import {Location} from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { DipositHistoryService } from '../services/diposit-history.service';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-diposit-history',
  templateUrl: './diposit-history.component.html',
  styleUrls: ['./diposit-history.component.css']
})
export class DipositHistoryComponent implements OnInit {


  constructor(private _location: Location, private router: Router, private route: ActivatedRoute, private AuthGuardService: AuthenticationService, private DipositHistoryService: DipositHistoryService) { }
  public error_msg = false;
  public errorMsg = '';
  public dipositData = [];
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
    this.getDiposits();
    
  }
 

  getDiposits(){
    Swal.fire({
      title: 'Getting deposit list...',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });

    this.DipositHistoryService.getDiposits(this.dipositFormData).subscribe({
      next: (v) => {
        console.log(v);
        if(v.data.deposite_history.length>0){          
        this.dipositData=v.data.deposite_history
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


