import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { OutterNavigationComponent } from './components/navigation/outter-navigation/outter-navigation.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { InnerNavigationComponent } from './components/navigation/inner-navigation/inner-navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';
import { AddProductComponent } from './components/add-product/add-product.component';
import { SearchProductsComponent } from './components/search/search-products/search-products.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FooterComponent } from './components/footer/footer.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { UserListDialogComponent } from './components/user-list-dialog/user-list-dialog.component';
import { SearchUsersComponent } from './components/search/search-users/search-users.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { JwtTokenInterceptor } from './interceptors/jwt-token';
import { NotificationsDialogComponent } from './components/notifications-dialog/notifications-dialog.component';
import { SavedProductsComponent } from './components/saved-products/saved-products.component';
import { SaveDirective } from './directives/save.directive';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    OutterNavigationComponent,
    MyProfileComponent,
    HomePageComponent,
    InnerNavigationComponent,
    AddProductComponent,
    SearchProductsComponent,
    SignUpComponent,
    FooterComponent,
    ViewProductComponent,
    UserListDialogComponent,
    SearchUsersComponent,
    ViewUserComponent,
    NotificationsDialogComponent,
    SavedProductsComponent,
    SaveDirective
  ],
  entryComponents: [AddProductComponent, UserListDialogComponent, NotificationsDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtTokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
