import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { RegistroComponent } from './registro/registro.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { LocalStorageService } from './services/local-storage.service';
import { AuthGuard } from './services/auth.guard';
import { LoginGuard } from './services/login.guard';



@NgModule({
  declarations: [RegistroComponent, LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [AuthService, LocalStorageService, AuthGuard, LoginGuard],
})
export class AuthModule { }
