import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { CreateSteganoComponent } from './pages/create-stegano/create-stegano.component';
import { SharedFilesComponent } from './pages/shared-files/shared-files.component';
import { DecryptComponent } from './pages/decrypt/decrypt.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"home",component:HomeComponent},
  {path:"create-stegano",component:CreateSteganoComponent},
  {path:"shared-files",component:SharedFilesComponent},
  {path:"decrypt",component:DecryptComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const RoutingComponent = [
  LoginComponent,
  RegisterComponent,
  HomeComponent,
  CreateSteganoComponent,
  SharedFilesComponent,
  DecryptComponent
];
