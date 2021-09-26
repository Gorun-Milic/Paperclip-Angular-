import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Save } from '../dto/save/save';
import { SaveDto } from '../dto/save/saveDto';
import { User } from '../dto/user/user';

@Injectable({
  providedIn: 'root'
})
export class SaveService {

  constructor(
    private http: HttpClient
  ) { }

  save(save: Save): Observable<Save> {
    return this.http.post<Save>('http://localhost:8080/save/addSave', save);
  }

  isSaved(save: Save): Observable<Save> {
    return this.http.post<Save>('http://localhost:8080/save/isSaved', save);
  }

  forget(id: string): Observable<Save> {
    return this.http.delete<Save>('http://localhost:8080/save/' + id);
  }

  savedByUser(user: User): Observable<SaveDto[]> {
    return this.http.post<SaveDto[]>('http://localhost:8080/save/savedByUser', user);
  }

 
}
