
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router'; 
import { AuthenticationService } from '../services/authentication.service';
import { DashboardService } from '../services/dashboard.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private AuthGuardService: AuthenticationService, private DashboardService: DashboardService) { }
  public error_msg = false;
  public errorMsg = '';
  public leagueData = [];
  public pageData = '';
  ngOnInit(): void {
    this.getLigues();
    this.getPageText();
  }
  getGame(getGame:any){
    console.log('getGame------',getGame);

  }
  getPageText(){
    this.DashboardService.getpageText().subscribe({
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

    this.DashboardService.getMatkaLigues().subscribe({
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

}

