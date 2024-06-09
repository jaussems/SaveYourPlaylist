import { Routes } from '@angular/router';
import {AuthComponent} from "./pages/auth/auth.component";
import {HomeComponent} from "./pages/home/home.component";
import {CallbackComponent} from "./pages/callback/callback.component";

export const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'callback', component: CallbackComponent},
];
