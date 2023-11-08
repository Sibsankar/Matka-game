import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router'; 
import { MatkaGameService } from '../services/matka-game.service';
import { AuthenticationService } from '../services/authentication.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-calcutta-matka',
  templateUrl: './calcutta-matka.component.html',
  styleUrls: ['./calcutta-matka.component.css']
})
export class CalcuttaMatkaComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private MatkaGameService: MatkaGameService) { }
  public token = localStorage.getItem('token'); 
  public error_msg = false;
  public errorMsg = '';
  public userName='';
  public matkaData:any;
  ngOnInit(): void {
    this.getAllLeagues();
  }

  
    getAllLeagues(){
     
      
      this.MatkaGameService.getAllLeagues().subscribe({
        next: (v) => {
          console.log(v.data);
          if(v.data){
            console.log(v.data);
           this.matkaData = v.data.leaguesData;
           console.log('Matka List ',this.matkaData);
            //this.router.navigate(['/calcutta-matka']);
          }
          
        },
        error: (e) => {
          console.log(e.status);
          console.log(e.status);
            if(e.status==400){
              this.error_msg = true;
              this.errorMsg = "Please enter Registered Email id and Password";
            }
            if(e.status==401){
              localStorage.clear();
              this.error_msg = true;
              this.errorMsg = "Please enter valid Registered Email id and Password";
            }
        },
        complete: () => console.info('complete'),
        
    });
    }
  

}
