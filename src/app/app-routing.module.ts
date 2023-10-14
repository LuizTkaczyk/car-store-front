import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewPostComponent } from './home/view-post/view-post.component';
import { PostsComponent } from './home/posts/posts.component';
import { LoginComponent } from './admin/login/login.component';
import { PanelComponent } from './admin/panel/panel.component';
import { ListComponent } from './admin/list/list.component';
import { EditComponent } from './admin/edit/edit.component';
import { AddComponent } from './admin/add/add.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, children: [
    { path: '', component: PostsComponent },
    { path: 'view-post', component: ViewPostComponent },
  ]},

  { path: 'login', component: LoginComponent},
  { path: 'admin', component: PanelComponent, children: [
    { path: 'lista', component: ListComponent },
    { path: 'editar/:type/:id', component: EditComponent },
    { path: 'adicionar/:type', component: AddComponent },
  ]},
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
