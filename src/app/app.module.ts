import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { EntranceComponent } from './entrance/entrance.component';
import { KitchenComponent } from './kitchen/kitchen.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ProductComponent } from './product/product.component';
import { CommentsComponent } from './product/comments/comments.component';
import { AccessFormToCommComponent } from './product/comments/access-form-to-comm/access-form-to-comm.component';




@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    EntranceComponent,
    KitchenComponent,
    CatalogComponent,
    ProductComponent,
    CommentsComponent,
    AccessFormToCommComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})



export class AppModule { }
