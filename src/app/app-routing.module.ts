import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatComponent } from './components/chat/chat.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { CreateOfferComponent } from './components/offer/create-offer/create-offer.component';
import { ReceivedOfferComponent } from './components/offer/received-offer/received-offer.component';
import { SentOfferComponent } from './components/offer/sent-offer/sent-offer.component';
import { ViewReceivedOfferComponent } from './components/offer/view-received-offer/view-received-offer.component';
import { ViewSentOfferComponent } from './components/offer/view-sent-offer/view-sent-offer.component';
import { SavedProductsComponent } from './components/saved-products/saved-products.component';
import { SearchProductsComponent } from './components/search/search-products/search-products.component';
import { SearchUsersComponent } from './components/search/search-users/search-users.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { StatisticsDataComponent } from './components/statistics-data/statistics-data.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { JwtTokenGuard } from './guards/jwt-token.guard';


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
    canActivate: [JwtTokenGuard]
  },
  {
    path: 'search/products',
    component: SearchProductsComponent,
    canActivate: [JwtTokenGuard]
  },
  {
    path: 'search/users',
    component: SearchUsersComponent,
    canActivate: [JwtTokenGuard]
  },
  {
    path: 'view-product/:productid',
    component: ViewProductComponent,
    canActivate: [JwtTokenGuard]
  },
  {
    path: 'view-user/:userid',
    component: ViewUserComponent,
    canActivate: [JwtTokenGuard]
  },
  {
    path: 'my-collection',
    component: SavedProductsComponent,
    canActivate: [JwtTokenGuard]
  },
  {
    path: 'chat/:chatid',
    component: ChatComponent,
    canActivate: [JwtTokenGuard]
  },
  {
    path: 'chat-list',
    component: ChatListComponent,
    canActivate: [JwtTokenGuard]
  },
  {
    path: 'create-offer/:userid',
    component: CreateOfferComponent,
    canActivate: [JwtTokenGuard]
  },
  {
    path: 'received-offer',
    component: ReceivedOfferComponent,
    canActivate: [JwtTokenGuard]
  },
  {
    path: 'sent-offer',
    component: SentOfferComponent,
    canActivate: [JwtTokenGuard]
  },
  {
    path: 'view-sent-offer/:offerid',
    component: ViewSentOfferComponent,
    canActivate: [JwtTokenGuard]
  },
  {
    path: 'view-received-offer/:offerid',
    component: ViewReceivedOfferComponent,
    canActivate: [JwtTokenGuard]
  },
  {
    path: 'statistics-data',
    component: StatisticsDataComponent,
    canActivate: [JwtTokenGuard]
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
