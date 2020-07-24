import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Helper } from '../helper/helper';
import { AlertType } from '../model/alert-type';
import { take } from 'rxjs/operators';
import { BankService } from 'app/services/bank.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  newForm: FormGroup;
  loading = false;
  returnUrl: string;
  bank = 103;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private accountService: BankService) { }

  ngOnInit() {
    this.buildForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  autenticar() {
    if (!this.newForm.valid) {
      Helper.showNotification("Todos os campos são obrigatórios", AlertType.Warning);
      return;
    }
    this.loading = true;

    this.accountService.getSaldo(this.bank,this.newForm.value.agencia, this.newForm.value.conta)
    .pipe(take(1)).subscribe(value=>{
      console.log(value)
      this.router.navigate(['home'], { queryParams: { agencia: value.idAgencia, conta: value.idNumConta, returnUrl: this.router.url }, skipLocationChange: true });
    }, erro=>{
      Helper.showNotification("Conta não encontrada!", AlertType.Error);
      this.loading = false;
    });
   
  }

  buildForm() {
    this.newForm = new FormGroup({
      'agencia': new FormControl('', Validators.required),
      'conta': new FormControl('', Validators.required),
    });
  }

}
