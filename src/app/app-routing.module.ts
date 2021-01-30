import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AssetsComponent } from './assets/assets.component';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'assets', component: AssetsComponent},
  {path: 'home', component: HomeComponent},
  {path: 'transactions', component: TransactionsComponent},
  {path: 'portfolio', component: PortfolioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
