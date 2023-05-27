import { Injectable } from '@angular/core';

@Injectable()
export class Jwt {
    constructor() { }

    decodeJwtToken(token: string): any {
        const tokenPayload = token.split('.')[1];
        const decodedPayload = atob(tokenPayload);
        return JSON.parse(decodedPayload);
    }
}
