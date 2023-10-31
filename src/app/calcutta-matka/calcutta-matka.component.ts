import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router'; 
import { AuthenticationService } from '../services/authentication.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-calcutta-matka',
  templateUrl: './calcutta-matka.component.html',
  styleUrls: ['./calcutta-matka.component.css']
})
export class CalcuttaMatkaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
