import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductItemsComponent } from './components/product-items/product-items.component';
import { ProductItemComponent } from './components/product-item/product-item.component';

@NgModule({
  declarations: [AppComponent, ProductItemsComponent, ProductItemComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
