import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ApiService} from "../../shared/api.service";

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.scss'
})
export class CallbackComponent implements OnInit{
  code: any
  constructor(private _activeRoute: ActivatedRoute, private _router: Router, private _ApiService: ApiService) {}


   ngOnInit() {
     const urlParams = new URLSearchParams(window.location.search);
    this.code = urlParams.get('code');

     console.log(this.code);
   }

   authenticate() {
    console.log("Authenticate");
    this._ApiService.requestAccessToken(this.code).subscribe((response) => {
      localStorage.setItem('access_token', response.access_token);
      console.log(response);
    });
   }

}
