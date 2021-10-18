import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpsService {
  private BaseUrl: string = 'http://163.18.22.59';
  constructor(
    private http: HttpClient
  ) { }
  getScores(): Observable<any> {
    return this.http.get(this.BaseUrl + '/Account/AnalyzeTestAll');
  }
  getStudents(): Observable<any> {
    return this.http.get(this.BaseUrl + '/Account/StudentList');
  }
  uploadProjectRequest(Request: any) {
    const url = `${this.BaseUrl}/Account/ImportStudent`;
    return this.http.post(url, Request, {
      observe: 'response'
    });
  }
  updateStudent(id: string, Request: any) {
    const url = `${this.BaseUrl}/Account/UpdateStudent/${id}`;
    return this.http.put(url, Request, {
      observe: 'response'
    });
  }
}
