import { Component, OnInit } from '@angular/core';
import { MovementService } from '../services/movement.service';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Helper } from 'app/helper/helper';
import { AlertType } from 'app/model/alert-type';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {

  value;
  account;
  msgErro;
  msgOK;
  agencia: string;
  conta: string;
  bank = 103;

  constructor(private movement: MovementService, private router: Router,
    private _avRoute: ActivatedRoute) { }

  ngOnInit() {
    if (this._avRoute.snapshot.queryParamMap.get("agencia")) {
      this.agencia = this._avRoute.snapshot.queryParamMap.get("agencia");
    }
    
    if (this._avRoute.snapshot.queryParamMap.get("conta")) {
      this.conta = this._avRoute.snapshot.queryParamMap.get("conta");
    }
    
    this.msgOK = null;
    this.msgErro = null;
  }

  deposit() {
    if (this.value) {
      const move = {
        valor: this.value,
        banco: this.bank,
        agencia: this.agencia,
        numConta: this.conta
      }
      this.movement.depositar(move).pipe(take(1)).subscribe(item => {
        this.value = null;
        Helper.showNotification("Depósito realizado com sucesso!", AlertType.Success);
      }, error => {
        Helper.showNotification("Depósito não realizado!", AlertType.Error);
      })
    } else {
      Helper.showNotification("Informe o valor do depósito.", AlertType.Warning);
    }

  }

  voltar(){
    this.router.navigate(['home'], { queryParams: { agencia: this.agencia, conta: this.conta, returnUrl: this.router.url }, skipLocationChange: true });
  }

  receiver(event) {
    if (event.account)
      this.account = event.account;
  }

}
