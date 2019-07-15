import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuddyService {
  url = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  getConferences(): Observable<IConf[]> {
    return this.http.get<IConf[]>(this.url + 'conferences');
  }

  addConferences(conf: IConf): Observable<IConf[]> {
    return this.http.post<IConf[]>(this.url + 'conferences', conf);
  }

  getBuddies(id: number): Observable<IBuddy[]> {
    return this.http.get<IBuddy[]>(this.url + 'buddies').pipe(
      tap(b => console.log(b)),
      map(buddies =>
        buddies.filter(buddy => buddy.conferences.indexOf(id) !== -1)
      ),
      tap(b => console.log(b))
    );
  }

  addBuddies(buddy: IBuddy, id: number): Observable<IBuddy[]> {
    return this.http
      .post<IBuddy[]>(this.url + 'buddies', buddy)
      .pipe(switchMap(() => this.getBuddies(id)));
  }
}

export interface IConf {
  id: number;
  name: string;
  buddies: number;
}
export interface IBuddy {
  id: number;
  name: string;
  link: string;
  img: string;
  conferences: number[];
}
