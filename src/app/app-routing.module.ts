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
    path: 'chat/:chatid',
    component: ChatComponent,
  },
  {
    path: 'chat-list',
    component: ChatListComponent,
  },
  {
    path: 'create-offer/:userid',
    component: CreateOfferComponent,
  },
  {
    path: 'received-offer',
    component: ReceivedOfferComponent,
  },
  {
    path: 'sent-offer',
    component: SentOfferComponent,
  },
  {
    path: 'view-sent-offer/:offerid',
    component: ViewSentOfferComponent,
  },
  {
    path: 'view-received-offer/:offerid',
    component: ViewReceivedOfferComponent,
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
