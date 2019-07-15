import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap, mergeMap } from 'rxjs/operators';
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

  addConference(conf: IConf): Observable<IConf[]> {
    return this.http.post<IConf[]>(this.url + 'conferences', conf);
  }

  updateConference(conf: IConf): Observable<IConf> {
    return this.http.put<IConf>(this.url + 'conferences/' + conf.id, conf);
  }

  // count how many buddies are at each conf
  updateConfBuddyCount(buddies: IBuddy[]) {
    this.getConferences()
      .pipe(
        map(v => {
          console.log(v);
          v.forEach(conf => {
            conf.buddies = this.countBuddies(conf.id, buddies);
            this.updateConference(conf).subscribe();
          });
        })
      )
      .subscribe();
  }

  countBuddies(confID: number, buddies: IBuddy[]): number {
    return buddies.filter(buddy => buddy.conferences.indexOf(confID) !== -1)
      .length;
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

  addBuddy(buddy: IBuddy, id: number): Observable<IBuddy[]> {
    return this.http.post<IBuddy[]>(this.url + 'buddies', buddy).pipe(
      switchMap(() => this.getBuddies(id)),
      tap(b => this.updateConfBuddyCount(b))
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
