import { Component, OnInit } from '@angular/core';
import { MovementService } from 'app/services/movement.service';
import { take } from 'rxjs/operators';
import { Helper } from 'app/helper/helper';
import { AlertType } from 'app/model/alert-type';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.scss']
})
export class WithdrawalComponent implements OnInit {

  value;
  account;
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
  }

  saque() {
    if (this.value) {
      const move = {
        valor: this.value,
        banco: this.bank,
        agencia: this.agencia,
        numConta: this.conta
      }
      this.movement.retirar(move).pipe(take(1)).subscribe(item => {
        this.value = null;
        Helper.showNotification("Saque realizado com sucesso!", AlertType.Success);
      }, error => {
        Helper.showNotification("Saque não realizado!", AlertType.Error);
      })
    } else {
      Helper.showNotification("Informe o valor do saque.", AlertType.Warning);
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
