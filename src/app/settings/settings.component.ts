import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router'; 
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    console.log('Logout');
    localStorage.setItem('email','');  
    localStorage.setItem('token','');   
    localStorage.setItem('isAuthenticate','false');
    this.router.navigate(['/login']);
  }

}
