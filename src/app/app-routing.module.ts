import { SchoolModifyComponent } from './components/school-modify/school-modify.component';
import { SchoolListComponent } from './components/school-list/school-list.component';
import { NewGroupComponent } from './components/new-group/new-group.component';
import { TopicComponent } from './components/topic/topic.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { StudentInfoComponent } from './components/student-info/student-info.component';
import { LoginComponent } from './components/login/login.component';
import { ImportComponent } from './components/import/import.component';
import { AnalyzeComponent } from './components/analyze/analyze.component';
import { FilesComponent } from './components/files/files.component';
import { MainComponent } from './components/main/main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnsPageComponent } from './components/ans-page/ans-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { NewStudentComponent } from './components/new-student/new-student.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'StudentInfo', component: StudentInfoComponent },
  { path: 'main', component: MainComponent },
  { path: 'files', component: FilesComponent },
  { path: 'analyze/:arg', component: AnalyzeComponent },
  { path: 'import', component: ImportComponent },
  { path: 'newStudent/:schoolId', component: NewStudentComponent },
  { path: 'editStudent/:accountId', component: EditStudentComponent },
  { path: 'topic', component: TopicComponent },
  { path: 'newGroup', component: NewGroupComponent },
  { path: 'ansPage', component: AnsPageComponent },
  { path: 'searchPage/:id', component: SearchPageComponent },
  { path: 'schoolList', component: SchoolListComponent },
  { path: 'schoolModify/:option', component: SchoolModifyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
