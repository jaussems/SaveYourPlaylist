import { Component } from '@angular/core';
import {base64encode, generateRandomString, sha256} from "../../utils/utilfunctions";
import {ApiService} from "../../shared/api.service";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  constructor(private _ApiService: ApiService) {

  }


  async createCodeVerifier() {

    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    this._ApiService.authenticateUser(codeChallenge, codeVerifier);

  }
}
