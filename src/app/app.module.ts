import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { AssetsComponent } from './assets/assets.component';
import { HomeComponent } from './home/home.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    AssetsComponent,
    HomeComponent,
    TransactionsComponent,
    PortfolioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
