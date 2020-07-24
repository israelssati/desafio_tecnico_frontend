import { Component, OnInit } from '@angular/core';
import { BankService } from '../services/bank.service';
import { take } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  account;
  balance = {} as any;
  agencia: string;
  conta: string;
  bank = 103;
  
  constructor(private accountService: BankService, private router: Router,
    private _avRoute: ActivatedRoute) { }

  ngOnInit() {
    if (this._avRoute.snapshot.queryParamMap.get("agencia")) {
      this.agencia = this._avRoute.snapshot.queryParamMap.get("agencia");
    }
    
    if (this._avRoute.snapshot.queryParamMap.get("conta")) {
      this.conta = this._avRoute.snapshot.queryParamMap.get("conta");
    }

    this.display();
  }

  receiver(event) {
    this.account = event.account;
  }

  display(){
    this.balance = this.accountService
      .getSaldo(this.bank, this.agencia, this.conta)
      .pipe(take(1)).subscribe(value=>{
        this.balance = value;
      }, erro=>{
        this.balance.saldo = erro.error.message
      });
  }

  voltar(){
    this.router.navigate(['home'], { queryParams: { agencia: this.agencia, conta: this.conta, returnUrl: this.router.url }, skipLocationChange: true });
  }

}
