import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/new-user/new-user.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { ServiceComponent } from './pages/service/service.component';
import { AuthGuard } from './guards/auth.guard';
import { FaqComponent } from './pages/faq/faq.component';
import { LoanHistoryComponent } from './pages/loan-history/loan-history.component';
import { LoanApplicationComponent } from './pages/loan-application/loan-application.component';
import { IssueResolutionComponent } from './pages/issue-resolution/issue-resolution.component';
import { LoanStatusComponent } from './pages/loan-status/loan-status.component';
import { LoanCalculatorComponent } from './pages/loan-calculator/loan-calculator.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { UserManagementComponent } from './pages/usermanagement/usermanagement.component';
import { LoanPendingApprovalsComponent } from './pages/loanpendingapprovals/loanpendingapprovals.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ScoreComponent } from './pages/score/score.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { LoanListComponent } from './pages/loan-list/loan-list.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { TncComponent } from './components/tnc/tnc.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { RoleconfirmationComponent } from './pages/roleconfirmation/roleconfirmation.component';
import { HomeDefaultComponent } from './pages/home-default/home-default.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'user/home', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent,},
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'user/loan-history', component: LoanHistoryComponent },
  { path: 'user/new-loan', component: LoanApplicationComponent },
  { path: 'user/loan-status', component: LoanStatusComponent},
  { path: 'user/resolve-issues', component: IssueResolutionComponent  },
  { path: 'user/loan-calculator', component: LoanCalculatorComponent , },
  {path:'user-score', component:ScoreComponent },
  {path: 'admin/reports', component: ReportsComponent },
  {path:'admin/user-management', component: UserManagementComponent },
  {path:'admin/loan-applications', component:LoanApplicationComponent },
  {path:'admin/pending-approvals', component: LoanPendingApprovalsComponent },
  { path: 'admin/overview', component: OverviewComponent },
  {path:'admin/settings', component:SettingsComponent },
  { path: 'admin', component: AdminComponent  },
  {path:'logout', component: LogoutComponent },
  {path:'admin/loan-list', component: LoanListComponent},
  { path: 'privacy', component: PrivacyComponent },
  { path: 'tnc', component: TncComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
{path:'role', component:RoleconfirmationComponent},
{path:'home', component:HomeDefaultComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
