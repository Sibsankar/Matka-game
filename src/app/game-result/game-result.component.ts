
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router'; 
import {Location} from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { GameTimingsService } from '../services/game-timings.service';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2';
import { MyBidService } from '../services/my-bid.service';


@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.css']
})
export class GameResultComponent implements OnInit {


  constructor(private _location: Location, private router: Router, private route: ActivatedRoute, private AuthGuardService: AuthenticationService, private GameTimingsService: GameTimingsService, private MyBidService: MyBidService) { }
  public error_msg = false;
  public errorMsg = '';
  public gameData = [];
  public single_bidData = [];
  public leagueData = [];
  public resultData :any;
  public gameDate :any;
  public jodi_bidData = [];
  public panna_bidData = [];
  public pageData = '';
  public bid_table = false;
  public leaguetable = true;
  public leagueResult = true;
  public gameFormData = {
    token: localStorage.getItem('token'),
    startDate:'',
    endDate:'',
    leagueId:0,
    leagueName:''
  };

  public results = {
    data: {},
    date:'',
    
  };


  
  

  ngOnInit(): void {
    this.getLigues();
    
    
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
        console.log('Ligue Data - ',typeof this.leagueData);
        }
        this.leagueResult = false;
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
  backClicked() {
    this.getLigues();
    
  }
  getGameResult(league: any){
this.gameFormData.leagueId = league.id;
//console.log(league);
this.gameFormData.leagueName = league.title;
    Swal.fire({
      title: 'Getting Results...',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });



   

    this.GameTimingsService.getMatkaResults(this.gameFormData).subscribe({
      next: (v) => {
        
        
        if(v.status){          
          
          //Object.keys(v.data.gameData);
        this.resultData= v.data.gameData
        this.gameDate = v.data.gameDate;
        this.gameDate = this.gameDate.reverse();
        console.log('Result Data ---------',this.gameDate);
        this.leagueResult = true;
        this.leaguetable = false;
        Swal.close();
        
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

  getGameresultbyDate()
  {
   console.log(this.gameFormData); 
   Swal.fire({
    title: 'Getting Results...',
    html: 'Please wait...',
    allowEscapeKey: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
    }
  });
   this.GameTimingsService.getMatkaResultsByDate(this.gameFormData).subscribe({
    next: (v) => {
      
      
      if(v.status){          
        
        //Object.keys(v.data.gameData);
      this.resultData= v.data.gameData
      this.gameDate = v.data.gameDate;
      this.gameDate = this.gameDate.reverse();
      console.log('Result Data ---------',this.gameDate);
      this.leagueResult = true;
      this.leaguetable = false;
      Swal.close();
      
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
reset(){

  this.gameFormData.endDate = '';
  this.gameFormData.startDate = '';
  Swal.fire({
    title: 'Getting Results...',
    html: 'Please wait...',
    allowEscapeKey: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
    }
  });

  this.GameTimingsService.getMatkaResults(this.gameFormData).subscribe({
    next: (v) => {
      
      
      if(v.status){          
        
        //Object.keys(v.data.gameData);
      this.resultData= v.data.gameData
      this.gameDate = v.data.gameDate;
      this.gameDate = this.gameDate.reverse();
      console.log('Result Data ---------',this.gameDate);
      this.leagueResult = true;
      this.leaguetable = false;
      Swal.close();
      
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





}




