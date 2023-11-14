import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.css']
})
export class AddMoneyComponent implements OnInit {

  constructor() { }
  public req_balance=false;
  public qr_code = true;
  
  ngOnInit(): void {
  }

  reqbal(){
    this.qr_code = false;
    this.req_balance = true;
  }

  addMoney(){
    this.qr_code = true;
    this.req_balance = false;
  }

}
