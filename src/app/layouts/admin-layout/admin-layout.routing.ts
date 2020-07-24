import { Routes } from '@angular/router';
import { BalanceComponent } from '../../balance/balance.component';
import { DepositComponent } from '../../deposit/deposit.component';
import { WithdrawalComponent } from '../../withdrawal/withdrawal.component';
import { HomeComponent } from '../../home/home.component';
import { LoginComponent } from '../../login/login.component';


export const AdminLayoutRoutes: Routes = [
    { path: '', redirectTo: 'login' },
    { path: 'login',      component: LoginComponent},
    { path: 'balances',      component: BalanceComponent},
    { path: 'deposits',      component: DepositComponent},
    { path: 'withdrawal',      component: WithdrawalComponent},
    { path: 'home',      component: HomeComponent},
];
