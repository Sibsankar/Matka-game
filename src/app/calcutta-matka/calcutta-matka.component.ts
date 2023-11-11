import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router'; 
import { MatkaGameService } from '../services/matka-game.service';
import { AuthenticationService } from '../services/authentication.service';
import { CalcuttaMatkaService } from '../services/calcutta-matka.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-calcutta-matka',
  templateUrl: './calcutta-matka.component.html',
  styleUrls: ['./calcutta-matka.component.css']
})
export class CalcuttaMatkaComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private AuthGuardService: AuthenticationService, private CalcuttaMatkaService: CalcuttaMatkaService) { }
  public error_msg = false;
  public errorMsg = '';
  public leagueData = [];
  public gamesData = [];
  currentDate = new Date();

  public leagueId = this.route.snapshot.paramMap.get('id');
  ngOnInit(): void {
    
   
    this.getGames();
    this.getLigues();
  }
  getLigues(){

    this.CalcuttaMatkaService.getMatkaLigues().subscribe({
      next: (v) => {
        console.log(v);
        if(v.data.leaguesData.length>0){          
        this.leagueData=v.data.leaguesData
        console.log('Ligue Data - ',this.leagueData);
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


  getGames(){
    console.log('Game id --------',this.leagueId);

    this.CalcuttaMatkaService.getGames(this.leagueId).subscribe({
      next: (v) => {
        console.log('Games Data - ',v.data);
        if(v.data.gamesData){          
         this.gamesData=v.data.gamesData;

        console.log('gamesData Data - ',this.gamesData);
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
