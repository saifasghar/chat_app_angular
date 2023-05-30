import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideBarComponent } from './Components/Dashboard/side-bar/side-bar.component';
import { IndexJsComponent } from './Components/Dashboard/index.js/index.js.component';

const routes: Routes = [
  { path: '', component: IndexJsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
