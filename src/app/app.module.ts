import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ImportComponent } from './components/import/import.component';
import { AnalyzeComponent } from './components/analyze/analyze.component';
import { FilesComponent } from './components/files/files.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { StudentInfoComponent } from './components/student-info/student-info.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { TopicComponent } from './components/topic/topic.component';
import { NewGroupComponent } from './components/new-group/new-group.component';
import { AnsPageComponent } from './components/ans-page/ans-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { CookieService } from 'ngx-cookie-service';
import { SchoolListComponent } from './components/school-list/school-list.component';
import { SchoolModifyComponent } from './components/school-modify/school-modify.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewStudentComponent } from './components/new-student/new-student.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ImportComponent,
    AnalyzeComponent,
    FilesComponent,
    StudentInfoComponent,
    EditStudentComponent,
    TopicComponent,
    NewGroupComponent,
    AnsPageComponent,
    SearchPageComponent,
    SchoolListComponent,
    SchoolModifyComponent,
    NewStudentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    HttpClientModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    MatIconModule,
    MatSortModule,
    BrowserAnimationsModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
