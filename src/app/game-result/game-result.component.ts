
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
  public jodi_bidData = [];
  public panna_bidData = [];
  public pageData = '';
  public bid_table = false;
  public leaguetable = true;
  public leagueResult = true;
  public dipositFormData = {
    token: localStorage.getItem('token')
  }


  
  

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
        console.log('Ligue Data - ',this.leagueData);
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

    Swal.fire({
      title: 'Getting Results...',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });

    this.GameTimingsService.getMatkaResults(league).subscribe({
      next: (v) => {
        console.log(v);
        if(v.data.leaguesData.length>0){          
        this.leagueData=v.data.leaguesData
        Swal.close();
        console.log('Ligue Data - ',this.leagueData);
        }
        this.leagueResult = true;
        this.leaguetable = false;
        
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




