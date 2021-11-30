import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class HttpsService {
  private BaseUrl: string = 'http://163.18.110.100:4500';
  constructor(
    private http: HttpClient,
    private CookieService: CookieService
  ) { }
  getScores(): Observable<any> {
    return this.http.get(this.BaseUrl + '/Account/AnalyzeTestAll2/' + this.CookieService.get("School"));
  }
  setPriority(id: any): Observable<any> {
    return this.http.get(`${this.BaseUrl}/Account/PrioritySchool/${id}`);
  }
  getStudents(): Observable<any> {
    return this.http.get(this.BaseUrl + '/Account/StudentList2/' + this.CookieService.get("School"));
  }
  getSchools(): Observable<any> {
    return this.http.get(this.BaseUrl + '/Account/GetSchoolList');
  }
  uploadSchool(Request: any) {
    const url = `${this.BaseUrl}/Account/AddSchool`;
    return this.http.post(url, Request, {
      observe: 'response'
    });
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
}
