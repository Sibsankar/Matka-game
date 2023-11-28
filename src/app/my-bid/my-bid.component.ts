
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router'; 
import {Location} from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { MyBidService } from '../services/my-bid.service';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-my-bid',
  templateUrl: './my-bid.component.html',
  styleUrls: ['./my-bid.component.css']
})
export class MyBidComponent implements OnInit {

  constructor(private _location: Location, private router: Router, private route: ActivatedRoute, private AuthGuardService: AuthenticationService, private MyBidService: MyBidService) { }
  public error_msg = false;
  public errorMsg = '';
  public leagueData = [];
  public single_bidData = [];
  public jodi_bidData = [];
  public panna_bidData = [];
  public pageData = '';
  public bid_table = false;
  public leaguetable = true;
  public bidFormData = {
    leagueId: '',
    token: localStorage.getItem('token')
  }
  

  ngOnInit(): void {
    this.getLigues();
    this.getPageText();
  }
  backClicked() {
    this.getLigues();
    
  }
  getBids(leagueId: any){
    console.log('leagueId-----',leagueId);
    Swal.fire({
      title: 'Getting bids...',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });
    this.bidFormData.leagueId = leagueId;

    this.MyBidService.getMybidsByLeague(this.bidFormData).subscribe({
      next: (v) => {
        console.log('pageData Data - ',v.data);
        if(v.status){
              this.single_bidData = v.data.single_bids;
              this.jodi_bidData = v.data.jodi_bids;
              this.panna_bidData = v.data.panna_bids;
        }
        
      },
      error: (e) => {        
          if(e.status==400){
            this.error_msg = true;
            this.errorMsg = "Not Found";
          }
          if(e.status==401){
            localStorage.clear();
            this.error_msg = true;
            this.errorMsg = "Not authorised";
          }
      },
      complete: () => console.info('complete'),
      
    });
    this.bid_table = true;
    this.leaguetable = false;
    Swal.close();

  }
  getPageText(){
    this.MyBidService.getpageText().subscribe({
      next: (v) => {
        console.log('pageData Data - ',v.data.pageData);
        if(v.data.pageData){          
        this.pageData=v.data.pageData.home_slider_text;
        console.log('pageData Data - ',this.pageData);
        }
        
      },
      error: (e) => {        
          if(e.status==400){
            this.error_msg = true;
            this.errorMsg = "Not Found";
          }
          if(e.status==401){
            localStorage.clear();
            this.error_msg = true;
            this.errorMsg = "Not authorised";
          }
      },
      complete: () => console.info('complete'),
      
    });

  }
  getLigues(){
    Swal.fire({
      title: 'Getting leagues...',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });

    this.MyBidService.getMatkaLigues().subscribe({
      next: (v) => {
        console.log(v);
        if(v.data.leaguesData.length>0){          
        this.leagueData=v.data.leaguesData
        Swal.close();
        console.log('Ligue Data - ',this.leagueData);
        }
        this.bid_table = false;
    this.leaguetable = true;
        
      },
      error: (e) => {        
          if(e.status==400){
            this.error_msg = true;
            this.errorMsg = "Not Found";
          }
          if(e.status==401){
            localStorage.clear();
            this.error_msg = true;
            this.errorMsg = "Not authorised";
          }
      },
      complete: () => console.info('complete'),
      
    });



  }

}

