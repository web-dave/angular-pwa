import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListViewComponent } from './list-view/list-view.component';
import { BuddiesComponent } from './buddies/buddies.component';
import { NewBuddyComponent } from './new-buddy/new-buddy.component';
import { NewConfComponent } from './new-conf/new-conf.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/conf',
    pathMatch: 'full'
  },
  {
    path: 'conf',
    component: ListViewComponent
  },
  {
    path: 'conf/add',
    component: NewConfComponent
  },
  {
    path: 'conf/:id',
    component: BuddiesComponent
  },
  {
    path: 'conf/:id/add',
    component: NewBuddyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
