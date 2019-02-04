import { Component } from '@angular/core';

import { Angular2TokenService } from 'angular2-token';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Gerenciador de Tarefas';

  public constructor(private tokenService: Angular2TokenService) {
    this.tokenService.init({
      apiBase: 'http://api.teste-two.test:3000',
      globalOptions: {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.teste-two.v1'
        }
      }
    })
  }
}
