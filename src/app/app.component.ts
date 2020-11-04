import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SwUpdate, SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pwa-workshop';
  constructor(private update: SwUpdate, private push: SwPush) {
    this.update.available.subscribe((u) => {
      console.log(u);
      confirm('New Content! Reload?') ? location.reload() : null;
    });
    this.push
      .requestSubscription({
        serverPublicKey:
          'BBJjW-Pj7eihJThP8MErXTvjszIwu-owH2C0TeZbOWZmuUO9aWiIba6mDVa0NLQonLi-PLHt0BJ-cqw1N0lSQVM',
      })
      .then((pushSub) => console.log(pushSub.toJSON()));

    this.push.messages.subscribe((m) => console.table(m));
  }
}
