





import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router'; 
import {Location} from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { RulesRegulationService } from '../services/rules-regulation.service';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-rules-regulation',
  templateUrl: './rules-regulation.component.html',
  styleUrls: ['./rules-regulation.component.css']
})
export class RulesRegulationComponent implements OnInit {


  constructor(private _location: Location, private router: Router, private route: ActivatedRoute, private AuthGuardService: AuthenticationService, private RulesRegulationService: RulesRegulationService) { }
  public error_msg = false;
  public errorMsg = '';
  public gameData = [];
  public single_bidData = [];
  public jodi_bidData = [];
  public panna_bidData = [];
  public pageData = '';
  public bid_table = false;
  public leaguetable = true;
  public dipositFormData = {
    token: localStorage.getItem('token')
  }

  public pageSize = 10;
public currentPage = 0;
public totalSize = 0;
  
  

  ngOnInit(): void {
    this.getDiposits();
    
  }
 

  getDiposits(){
    Swal.fire({
      title: 'Getting Rules...',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });

    this.RulesRegulationService.getRules().subscribe({
      next: (v) => {
        console.log(v);
        if(v.data.pageData){          
        this.pageData=v.data.pageData.content
        
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




