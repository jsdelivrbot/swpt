import { Component, OnInit, Output, Input,EventEmitter } from '@angular/core';
import { AppComponent } from "../app.component"

@Component({
  selector: 'app-top-up-index',
  templateUrl: './top-up-index.component.html',
  styleUrls: ['./top-up-index.component.css']
})

export class TopUpIndexComponent implements OnInit {
  @Output() titleReceive=new EventEmitter();

  onclick(type:string):void{
    this.titleReceive.emit(type);
  }

  constructor() {  }

  ngOnInit() {
  }

}

