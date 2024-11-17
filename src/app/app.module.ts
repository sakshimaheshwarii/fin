import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatOptionModule } from '@angular/material/core';
import { ToastrModule } from 'ngx-toastr';
// Components
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutComponent } from './pages/about/about.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FaqComponent } from './pages/faq/faq.component';
import { IssueResolutionComponent } from './pages/issue-resolution/issue-resolution.component';
import { LoanApplicationComponent } from './pages/loan-application/loan-application.component';
import { LoanCalculatorComponent } from './pages/loan-calculator/loan-calculator.component';
import { LoanHistoryComponent } from './pages/loan-history/loan-history.component';
import { LoanStatusComponent } from './pages/loan-status/loan-status.component';
import { LoanPendingApprovalsComponent } from './pages/loanpendingapprovals/loanpendingapprovals.component';
import { LoanrequestsComponent } from './pages/loanrequests/loanrequests.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { RegisterComponent } from './pages/new-user/new-user.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { RoleconfirmationComponent } from './pages/roleconfirmation/roleconfirmation.component';
import { ServiceComponent } from './pages/service/service.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { UserManagementComponent } from './pages/usermanagement/usermanagement.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { PreloaderComponent } from './pages/preloader/preloader.component';
import { ScoreComponent } from './pages/score/score.component';
import { LoanListComponent } from './pages/loan-list/loan-list.component';


// Services & Guards
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { LoanService } from './services/loan.service';
import { CommonissuesolutionComponent } from './pages/commonissuesolution/commonissuesolution.component';
import { ThemeComponent } from './pages/theme/theme.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { TncComponent } from './components/tnc/tnc.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { HomeDefaultComponent } from './pages/home-default/home-default.component';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
// import { NgxChartsModule } from '@swimlane/ngx-charts';


// Application Routes
const appRoutes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeDefaultComponent },
  { path: 'user/home', component: DashboardComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'admin/overview', component: OverviewComponent, canActivate: [AuthGuard] },
  { path: 'user/users', component: UserManagementComponent, canActivate: [AuthGuard] },
  { path: 'loans', component: LoanrequestsComponent, canActivate: [AuthGuard] },
  { path: 'admin/reports', component: ReportsComponent, canActivate: [AuthGuard] },
  { path: 'admin/settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent },
  { path: 'about', component: AboutComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'loan-history', component: LoanHistoryComponent },
  { path: 'new-loan', component: LoanApplicationComponent },
  { path: 'loan-status', component: LoanStatusComponent },
  { path: 'resolve-issues', component: IssueResolutionComponent },
  { path: 'loan-calculator', component: LoanCalculatorComponent },
  { path: 'admin/user-management', component: UserManagementComponent },
  { path: 'admin/loan-applications', component: LoanApplicationComponent },
  { path: 'admin/pending-approvals', component: LoanPendingApprovalsComponent },
  { path: 'admin/issues/common-solution', component: CommonissuesolutionComponent },
  { path: 'admin/loan-list', component: LoanListComponent },
  { path: 'user/user-score', component: ScoreComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'tnc', component: TncComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'role', component: RoleconfirmationComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    WelcomeComponent,
    AboutComponent,
    ContactComponent,
    ProfileComponent,
    ServiceComponent,
    AdminComponent,
    FaqComponent,
    LogoutComponent,
    RegisterComponent,
    LoanApplicationComponent,
    LoanStatusComponent,
    LoanHistoryComponent,
    IssueResolutionComponent,
    LoanCalculatorComponent,
    OverviewComponent,
    UserManagementComponent,
    LoanrequestsComponent,
    ReportsComponent,
    CommonissuesolutionComponent,
    LoanPendingApprovalsComponent,
    PreloaderComponent,
    ThemeComponent,
    ScoreComponent,
    LoanListComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    HomeDefaultComponent,
    SettingsComponent,
    PrivacyComponent,
    TncComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule,
    MatMenuModule,
    RouterModule.forRoot(appRoutes),
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    MatSlideToggleModule,
    MatTableModule,
    AppRoutingModule,
    MatPaginatorModule,
    MatSortModule,
    MatOptionModule,
    // FontAwesomeModule,
    ToastrModule.forRoot(),
    ChartModule,
    // NgxChartsModule,
  ],
  providers: [AuthService, LoanService, AuthGuard, { provide: MAT_DIALOG_DATA, useValue: {} }, {
    provide: MatDialogRef,
    useValue: {}
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
