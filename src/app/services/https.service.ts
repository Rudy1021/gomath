import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class HttpsService {
  private BaseUrl: string = 'http://127.0.0.1:4501';
  constructor(
    private http: HttpClient,
    private CookieService: CookieService
  ) { }
  getScores(): Observable<any> {
    return this.http.get(this.BaseUrl + '/Account/AnalyzeTestAll2/' + this.CookieService.get("School"));
  }
  getScoresAllToExcel(): Observable<any> {
    return this.http.get(this.BaseUrl + '/Account/AnalyzeTestAllToExcel/' + this.CookieService.get("School"));
  }
  setPriority(id: any): Observable<any> {
    return this.http.get(`${this.BaseUrl}/Account/PrioritySchool/${id}`);
  }
  getStudents(): Observable<any> {
    return this.http.get(this.BaseUrl + '/Account/StudentList2/' + this.CookieService.get("School"));
  }
  uploadStudent(Request: any) {
    const url = `${this.BaseUrl}/Account/ImportStudent`;
    return this.http.post(url, Request, {
      responseType: 'text',
      observe: 'response'
    });
  }
  getSchools(): Observable<any> {
    return this.http.get(this.BaseUrl + '/Account/GetSchoolList');
  }
  delStudentScore(id: any) {
    const url = `${this.BaseUrl}/Account/DeleteStudentFeedback/${id}`;
    return this.http.delete(url);
  }
  delStudentScore15(id: any) {
    const url = `${this.BaseUrl}/Account/DeleteStudentFeedback15/${id}`;
    return this.http.delete(url);
  }
  delStudentScore16(id: any) {
    const url = `${this.BaseUrl}/Account/DeleteStudentFeedback16/${id}`;
    return this.http.delete(url);
  }
  uploadSchool(Request: any) {
    const url = `${this.BaseUrl}/Account/AddSchool`;
    return this.http.post(url, Request, {
      observe: 'response'
    });
  }
  deleteSchool(id: string) {
    const url = `${this.BaseUrl}/Account/DeleteSchool/${id}`;
    return this.http.delete(url);
  }
  unlockAllStudent(id: any) {
    const url = `${this.BaseUrl}/Account/UnlockAllStudent/${id}`;
    return this.http.get(url)
  }
  ReRecognize() {
    const url = `${this.BaseUrl}/Feedback/ReRecognize`;
    return this.http.get(url)
  }
  PatchSchool(id: any, Request: any) {
    const url = `${this.BaseUrl}/Account/PatchSchool/${id}`;
    return this.http.patch(url, Request, {
      observe: 'response'
    });
  }
  logouts(id: string, Request: any) {
    const url = `${this.BaseUrl}/Account/PatchStudent/${id}`;
    return this.http.patch(url, Request, {
      observe: 'response'
    });
  }
  deleteStudent(id: string) {
    const url = `${this.BaseUrl}/Account/DeleteStudent/${id}`;
    return this.http.delete(url);
  }
  uploadProjectRequest(Request: any) {
    const url = `${this.BaseUrl}/Account/ImportStudent`;
    return this.http.post(url, Request, {
      observe: 'response'
    });
  }
  updateStudent(id: string, Request: any) {
    const url = `${this.BaseUrl}/Account/PatchStudent/${id}`;
    return this.http.patch(url, Request, {
      observe: 'response'
    });
  }
  getSearch(route: string): Observable<any> {
    return this.http.get(this.BaseUrl + '/Account/AnalyzeTestCondition?' + route);
  }
  getSearchStudent(route: string): Observable<any> {
    return this.http.get(this.BaseUrl + '/Account/AnalyzeTestCondition2?' + route);
  }
  getTopicName(): Observable<any> {
    return this.http.get(this.BaseUrl + '/Topic/GetQuestionTypeIdToName');
  }
  getGroup(): Observable<any> {
    return this.http.get(this.BaseUrl + '/Topic/GetTopicCusomizedSettings');
  }
  updateGroup(id: string, Request: any) {
    const url = `${this.BaseUrl}/Topic/PatchTopicCustomizedSettings/${id}`;
    return this.http.patch(url, Request);
  }
  uploadGroup(Request: any) {
    const url = `${this.BaseUrl}/Topic/NewTopicCusomizedSettings`;
    return this.http.post(url, Request)
  }
  updateFeedback(Request: any, feedbackId: string) {
    const url = `${this.BaseUrl}/Account/PatchStudentAnswer/${feedbackId}`;
    return this.http.patch(url, Request)
  }
  getStudentsScores(id: string): Observable<any> {
    return this.http.get(this.BaseUrl + '/Account/AnalyzeTestReport/' + `${id}`);
  }
}
