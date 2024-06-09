import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ITokenResponse} from "./models";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = 'https://accounts.spotify.com';
  constructor(private _Http: HttpClient) {

  }

  authenticateUser(codeChallenge: any, codeVerifier: any) {
    const clientId = '';
    const redirectUri = 'http://localhost:4200/callback';
    const scope = 'user-read-private user-read-email';
    const authUrl = new URL("https://accounts.spotify.com/authorize")

    window.localStorage.setItem('code_verifier', codeVerifier);

    const paramsObject =  {
      response_type: 'code',
      client_id: clientId,
      scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    }
    // let params = new HttpParams()
    //
    // for (const [key, value] of Object.entries(paramsObject)) {
    //   params.set(key, value);
    // }

    // return this._Http.get(`${this.apiUrl}/authorize`, {
    // params: params
    // })

    authUrl.search = new URLSearchParams(paramsObject).toString();
    window.location.href = authUrl.toString();
  }

  requestAccessToken(code: any):Observable<ITokenResponse> {
    const clientId = '';
    let codeVerifier: string | null = localStorage.getItem('code_verifier') as string;
    const redirectUri = 'http://localhost:4200/callback';
    let params = new HttpParams()

    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }
    );

    const paramsObject =  {
      client_id: clientId,
      grant_type: 'authorization_code',
      code : code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }

    const body = new URLSearchParams(paramsObject)

    return this._Http.post<ITokenResponse>(`${this.apiUrl}/api/token`,
      body
    , {  params: params, headers: headers});
  }
}
