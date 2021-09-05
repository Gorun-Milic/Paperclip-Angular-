import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
    ViewProductComponent
  ],
  entryComponents: [AddProductComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
