import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router'; 
import { MatkaGameService } from '../services/matka-game.service';
import { AuthenticationService } from '../services/authentication.service';
import { GameService } from '../services/game.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-game-component',
  templateUrl: './game-component.component.html',
  styleUrls: ['./game-component.component.css']
})
export class GameComponentComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private AuthGuardService: AuthenticationService, private GameService: GameService) { }
  public error_msg = false;
  public errorMsg = '';
  public gamesData = {title: '', start_time: '', end_time: ''};
  currentDate = new Date();

  public gameId = this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    this.getGame();
  }

  getGame(){
    // console.log('Game id --------',this.gameId);
    this.GameService.getGameDetails(this.gameId).subscribe({
      next: (v) => {
        // console.log('Games Data - ',v.data);
        if(v.data.gameData){          
          this.gamesData = v.data.gameData;
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
