import { Component, OnInit, Input } from '@angular/core';
import { init_data } from "../class/models.all"

@Component({
  selector: 'app-topup-topuplog',
  templateUrl: './topup-topuplog.component.html',
  styleUrls: ['./topup-topuplog.component.css']
})


export class TopupTopuplogComponent implements OnInit {

   mydata=init_data;

  constructor() { }

  ngOnInit() {
  }

}


