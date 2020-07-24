import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  agencia: string;
  conta: string;

  constructor(private router: Router,
    private _avRoute: ActivatedRoute) { }

  ngOnInit() {
    if (this._avRoute.snapshot.queryParamMap.get("agencia")) {
      this.agencia = this._avRoute.snapshot.queryParamMap.get("agencia");
    }
    
    if (this._avRoute.snapshot.queryParamMap.get("conta")) {
      this.conta = this._avRoute.snapshot.queryParamMap.get("conta");
    }
  }

  withdrawal(){
    this.router.navigate(['withdrawal'], { queryParams: { agencia: this.agencia, conta: this.conta, returnUrl: this.router.url }, skipLocationChange: true });
  }

  deposit(){
    this.router.navigate(['deposits'], { queryParams: { agencia: this.agencia, conta: this.conta, returnUrl: this.router.url }, skipLocationChange: true });
  }

  balance(){
    this.router.navigate(['balances'], { queryParams: { agencia: this.agencia, conta: this.conta, returnUrl: this.router.url }, skipLocationChange: true });
  }

  sair(){
    this.router.navigate(['login']);
  }

}
