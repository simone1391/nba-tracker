import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path:'',
    loadComponent: () => import('./components/home/home.component').then(c=> c.HomeComponent)
  },
  {
    path:'results/:teamCode',
    loadComponent: () => import('./components/result/result.component').then(c=> c.ResultComponent)
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

