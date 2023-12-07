import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './admin/add/add.component';
import { EditComponent } from './admin/edit/edit.component';
import { ListComponent } from './admin/list/list.component';
import { LoginComponent } from './admin/login/login.component';
import { PanelComponent } from './admin/panel/panel.component';
import { authGuard } from './admin/shared/Auth.guard';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './home/posts/posts.component';
import { ViewPostComponent } from './home/view-post/view-post.component';
import { ContactComponent } from './home/contact/contact.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: HomeComponent, children: [
    { path: '', component: PostsComponent },
  ]},
  { path: 'veiculo/:id', component: ViewPostComponent },
  { path: 'contact', component: ContactComponent },

  { path: 'login', component: LoginComponent},
  { path: 'admin', component: PanelComponent,canActivate: [authGuard], children: [
    { path: 'lista', component: ListComponent, canActivate: [authGuard] },
    { path: 'editar/:type/:id', component: EditComponent , canActivate: [authGuard]},
    { path: 'adicionar/:type', component: AddComponent, canActivate: [authGuard] },
  ]},
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
