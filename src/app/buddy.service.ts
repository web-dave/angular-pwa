import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BuddyService {
  url = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  getConferences() {
    return this.http.get<IConf[]>(this.url + 'conferences');
  }
  getBuddies(id: number) {
    return this.http.get<IBuddy[]>(this.url + 'buddies').pipe(
      tap(b => console.log(b)),
      map(buddies =>
        buddies.filter(
          buddy => buddy.conferences.indexOf(parseInt(id, 10)) !== -1
        )
      ),
      tap(b => console.log(b))
    );
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
