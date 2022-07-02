import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './pages/index/index.component';
import { CartMyproductComponent } from './pages/cart-myproduct/cart-myproduct.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SinglproductComponent } from './pages/singlproduct/singlproduct.component';
import { UsersInfoComponent } from './pages/users-info/users-info.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ErrorComponent } from './pages/error/error.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { CardComponent } from './components/card/card.component';
import { ProductComponent } from './pages/product/product.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    CartMyproductComponent,
    LoginComponent,
    RegisterComponent,
    SinglproductComponent,
    UsersInfoComponent,
    UserListComponent,
    NavbarComponent,
    FooterComponent,
    ErrorComponent,
    EditProfileComponent,
    UserFormComponent,
    CardComponent,
    ProductComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
