import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Items } from '../models';
import { routes } from '../../../consts';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
                             'Authorization': 'Bearer '+ localStorage.getItem('token')      
                            })
};



@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  public loadItemsTableData(): Observable<Items[]> {

    return this.http.post<Items[]>(routes.AUTH_API + 'items', {}, httpOptions)
      .pipe(
        tap(
          data => console.log('All: ' +JSON.stringify(data["items"]))
        )
      );
  }

  public loadItemsSelectData(): Observable<Items[]> {

    return this.http.post<Items[]>(routes.AUTH_API + 'itemsSelect', {}, httpOptions)
      .pipe(
        tap(
          data => console.log('All: ' +JSON.stringify(data["items"]))
        )
      );
  }

  public insertItem(name: string): Observable<Items[]> {
    const nombre= name;
    console.log(nombre)
    return this.http.post<Items[]>(routes.AUTH_API + 'insertItems', {nombre}, httpOptions)
      .pipe(
        tap(
          data => console.log('All: ' +JSON.stringify(data))
        )
      );
  }

  public updateItems(data:any): Observable<Items[]> {
    const body=JSON.stringify(data);
    return this.http.post<Items[]>(routes.AUTH_API + 'updateItems', {body}, httpOptions)
      .pipe(
        tap(
          data => data
        )
      );
  }

  public deleteItem(id:any): Observable<Items[]> {
    return this.http.post<Items[]>(routes.AUTH_API + 'deleteItem', {id}, httpOptions)
      .pipe(
        tap(
          data => data
        )
      );
  }
}
