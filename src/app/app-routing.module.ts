import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashdoardComponent } from './dashdoard/dashdoard.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'dashboard', component: DashdoardComponent },
  { path: 'login', component: LoginComponent },
  // otherwise redirect to home
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
