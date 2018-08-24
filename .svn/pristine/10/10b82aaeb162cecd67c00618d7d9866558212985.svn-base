import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-up-iwant',
  templateUrl: './top-up-iwant.component.html',
  styleUrls: ['./top-up-iwant.component.css']
})
export class TopUpIwantComponent implements OnInit {

  MONEY_STATUS_Select="50_1";
  PAYMENT_STATUS=0;

  constructor() { }
  
  ngOnInit() {
  }

  select_money(val:string):void{
    console.log(val);
    this.MONEY_STATUS_Select=val+"_1";
  }
  payment(val:number):void{
    this.PAYMENT_STATUS=val;
  }



}
