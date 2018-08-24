import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TopUpIndexComponent } from './top-up-index/top-up-index.component';
import { TopUpIwantComponent } from './top-up-iwant/top-up-iwant.component';
import { TopupTopuplogComponent } from './topup-topuplog/topup-topuplog.component';
import { TopupConsumlogComponent } from './topup-consumlog/topup-consumlog.component';

@NgModule({
  declarations: [
    AppComponent,
    TopUpIndexComponent,
    TopUpIwantComponent,
    TopupTopuplogComponent,
    TopupConsumlogComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
