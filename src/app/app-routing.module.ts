import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component'; // Import the DashboardComponent
import { ListFeedbackComponent } from './list-feedback/list-feedback.component';
import { AddFeedbackComponent } from './Feedback/add-feedback/add-feedback.component';
import { FeedbackListComponent } from './Feedback/feedback-list/feedback-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent }, // Add the route for the sidebar test
  { path: 'list-Feedback', component: FeedbackListComponent},
  { path: 'add-Feedback', component: AddFeedbackComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
