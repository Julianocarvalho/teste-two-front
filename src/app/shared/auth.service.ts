import { Injectable } from "@angular/core";
import { Response } from "@angular/http";

import { Observable } from "rxjs/Observable";
import { Angular2TokenService } from "angular2-token";

import { User } from "./user.model";

@Injectable()

export class AuthService {
    public constructor(private tokenService: Angular2TokenService) { }

    public signUp(user: User): Observable<Response> {
        return this.tokenService.registerAccount(user as any)
            .catch(this.handleErrors)
    }

    public signIn(uid: string, password: string): Observable<Response> {
        let signInData = {
            email: uid,
            password: password
        };

        return this.tokenService.signIn(signInData)
            .catch(this.handleErrors);
    }


    public signOut(): Observable<Response> {
        return this.tokenService.signOut()
            .catch(this.handleErrors);
    }

    public userSignedIn() {
        return this.tokenService.userSignedIn();
    }


    private handleErrors(error: Response) {
        console.log("SALVANDO O ERRO NUM ARQUIVO DE LOG - DETALHES DO ERRO => ", error);
        return Observable.throw(error);
    }
}