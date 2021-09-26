import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { SavedProductsComponent } from './components/saved-products/saved-products.component';
import { SearchProductsComponent } from './components/search/search-products/search-products.component';
import { SearchUsersComponent } from './components/search/search-users/search-users.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { ViewUserComponent } from './components/view-user/view-user.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'my-profile',
    component: MyProfileComponent,
  },
  {
    path: 'search/products',
    component: SearchProductsComponent,
  },
  {
    path: 'search/users',
    component: SearchUsersComponent,
  },
  {
    path: 'view-product/:productid',
    component: ViewProductComponent,
  },
  {
    path: 'view-user/:userid',
    component: ViewUserComponent,
  },
  {
    path: 'my-collection',
    component: SavedProductsComponent,
  },
  {
    path: '**',
    component: HomePageComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
