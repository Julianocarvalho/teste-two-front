import { Injectable } from "@angular/core";

import { InMemoryDbService } from "angular-in-memory-web-api";

@Injectable()

export class InMemoryTaskDataService implements InMemoryDbService {

  public createDb(){
    let tasks = [
      { id: 1, title: 'Comprar um celular novo', elapsed_time: 0 },
      { id: 2, title: 'Pagar boleto', elapsed_time: 0 },
      { id: 3, title: 'Pagar Internet', elapsed_time: 0 },
      { id: 4, title: 'Assistir aula sobre Rails', elapsed_time: 0 },
      { id: 5, title: 'Assistir aula sobre Angular', elapsed_time: 0 },
      { id: 6, title: 'Comprar Pizza', elapsed_time: 0 },
      { id: 7, title: 'Pagar Aluguel', elapsed_time: 0 },
    ];

    return { tasks }
  }

}