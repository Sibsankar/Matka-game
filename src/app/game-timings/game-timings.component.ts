



import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router'; 
import {Location} from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { GameTimingsService } from '../services/game-timings.service';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-game-timings',
  templateUrl: './game-timings.component.html',
  styleUrls: ['./game-timings.component.css']
})
export class GameTimingsComponent implements OnInit {


  constructor(private _location: Location, private router: Router, private route: ActivatedRoute, private AuthGuardService: AuthenticationService, private GameTimingsService: GameTimingsService) { }
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
      title: 'Getting Game Timings...',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });

    this.GameTimingsService.getGames(this.dipositFormData).subscribe({
      next: (v) => {
        console.log(v);
        if(v.data.gamesData.length>0){          
        this.gameData=v.data.gamesData
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



