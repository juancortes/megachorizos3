import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Persona } from '../models';
import { routes } from '../../../consts';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
                             'Authorization': 'Bearer '+ localStorage.getItem('token')      
                            })
};

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http: HttpClient) { }

  public loadPersonaTableData(): Observable<Persona[]> {

    return this.http.post<Persona[]>(routes.AUTH_API + 'personal', {}, httpOptions)
      .pipe(
        tap(
          data => console.log('All: ' +JSON.stringify(data["personal"]))
        )
      );
  }

  public updatePersona(data:any): Observable<Persona[]> {
    const body=JSON.stringify(data);
    console.log(body)
    return this.http.post<Persona[]>(routes.AUTH_API + 'updatePersonal', {body}, httpOptions)
      .pipe(
        tap(
          data => console.log('All: ' +JSON.stringify(data["status"]))
        )
      );
  }
}
