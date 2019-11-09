import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { KitchenComponent } from './kitchen/kitchen.component';
import { EntranceComponent } from './entrance/entrance.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ProductComponent } from './product/product.component';
import { CommentsComponent } from './product/comments/comments.component';
import { AccessFormToCommComponent } from './product/comments/access-form-to-comm/access-form-to-comm.component';




const routes: Routes = [
  { path: '', redirectTo: 'catalog', pathMatch: 'full' },
  { path: 'kitchen', component: KitchenComponent, children: [
    { path: '', redirectTo: 'reg', pathMatch: 'full' },
    { path: 'ent', component: EntranceComponent },
    { path: 'reg', component: RegistrationComponent }
  ]},
  { path: 'catalog', component: CatalogComponent },

  { path: 'catalog/:product/:id', component: ProductComponent, children: [
    { path: 'comments-list/:id', component: CommentsComponent, children: [
      { path: 'access-form-to-comm/:id', component: AccessFormToCommComponent }
    ]} 
  ]} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


