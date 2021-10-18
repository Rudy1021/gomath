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

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'StudentInfo', component: StudentInfoComponent },
  { path: 'main', component: MainComponent },
  { path: 'files', component: FilesComponent },
  { path: 'analyze/:name', component: AnalyzeComponent },
  { path: 'import', component: ImportComponent },
  { path: 'editStudent/:accountId', component: EditStudentComponent },
  { path: 'topic', component: TopicComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
