import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Cake } from '../model/cake';
import { Message } from '../model/message';
import { SlideShow } from '../model/slideshow';
import { User } from '../model/user';

const baseUrl = 'http://localhost:3000/api';
@Injectable({
  providedIn: 'root',
})
export class CakeService {
  constructor(private http: HttpClient) {}

  getSlideShow(): Observable<SlideShow[]> {
    return this.http.get(baseUrl + '/slideshow').pipe(
      map((data: any) => {
        return data && data.map((elem: any) => new SlideShow(elem) || []);
      })
    );
  }
  getCakes(params?: any): Observable<Cake[]> {
    let options = {};

    if (params) {
      options = {
        params: new HttpParams()
          .set('sort', params.sort || '')
          .set('sortDirection', params.sortDirection || '')
          .set(
            'filter',
            (params.filter && JSON.stringify(params.filter)) || ''
          ),
      };
    }
    return this.http.get(baseUrl + '/cakes', options).pipe(
      map((data: any) => {
        return data && data.map((elem: any) => new Cake(elem) || []);
      })
    );
  }
  getIngredients(): Observable<string[]> {
    return this.http.get(baseUrl + '/ingredients').pipe(
      map((data: any) => {
        return data as Array<string>;
      })
    );
  }
  getCakeDetails(id: number): Observable<Cake> {
    return this.http.get(baseUrl + '/cakes' + '/' + id).pipe(
      map((elem: any) => {
        return new Cake(elem);
      })
    );
  }
  getUser(): Observable<User> {
    return this.http.get(baseUrl + '/user').pipe(
      map((data: any) => {
        return data && new User(data[0]);
      })
    );
  }
  updateUser(user: User): Observable<User> {
    return this.http.put(baseUrl + '/user/' + user._id, user).pipe(
      map((data: any) => {
        return new User(data);
      })
    );
  }
  postMessage(message: Message): Observable<any> {
    return this.http.post(baseUrl + '/messages', message);
  }
}
