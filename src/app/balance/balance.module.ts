import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceComponent } from './balance.component';
import { AccountsModule } from '../accounts/accounts.module';
import { MatIconModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [BalanceComponent],
  imports: [
    CommonModule,
    AccountsModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt'}]
})
export class BalanceModule { }
