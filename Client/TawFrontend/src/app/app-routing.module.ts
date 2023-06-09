import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignupComponent } from "./user-signup/user-signup.component";
import { WaiterComponent } from "./waiter/waiter.component";
import {CookComponent} from "./cook/cook.component";
import {BartenderComponent} from "./bartender/bartender.component";
import {CashierComponent} from "./cashier/cashier.component";
import {HomeComponent} from "./home/home.component";
import {TablesListComponent} from "./tables-list/tables-list.component";



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'signup', component: UserSignupComponent },
  { path: 'waiters', component: WaiterComponent },
  { path: 'cooks', component: CookComponent },
  { path: 'bartenders', component: BartenderComponent },
  { path: 'cashiers', component: CashierComponent },
  { path: 'cashiers/tables', component: TablesListComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
