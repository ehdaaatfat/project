import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { CartMyproductComponent } from './pages/cart-myproduct/cart-myproduct.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { ErrorComponent } from './pages/error/error.component';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductComponent } from './pages/product/product.component';
import { RegisterComponent } from './pages/register/register.component';
import { SinglproductComponent } from './pages/singlproduct/singlproduct.component';
//import { SinglproductComponent } from './pages/singleproduct/singlproduct.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UsersInfoComponent } from './pages/users-info/users-info.component';

const routes: Routes = [
{  path:"", component : IndexComponent},
//{  path:"product", component : ProductComponent},

{path:"product", children:[
  //http://localhost:4200/product
  {path:"", component : ProductComponent},
  //http://localhost:4200/product/:id
  {path:":productId", component : SinglproductComponent},
    //http://localhost:4200/product/singlProduct

  {path:"singlproduct", component : SinglproductComponent},

]},
{  path:"card", component : CardComponent},
{  path:"user-form", component : UserFormComponent},
{  path:"cart-myproduct", component : CartMyproductComponent},
{  path:"edit-profile", component : EditProfileComponent},
{  path:"error", component : ErrorComponent},
{  path:"login", component : LoginComponent},
{  path:"register", component : RegisterComponent},
//{  path:"product/:id", component : SinglproductComponent},
//{  path:"singleproduct", component : SinglproductComponent},
{  path:"user-list", component : UserListComponent},
{  path:"user-info", component : UsersInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
