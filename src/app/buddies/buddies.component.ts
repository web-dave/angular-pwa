import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { BuddyService } from '../buddy.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buddies',
  templateUrl: './buddies.component.html',
  styleUrls: ['./buddies.component.scss']
})
export class BuddiesComponent implements OnInit {
  buddie$;
  /** Based on the screen size, switch from standard to one column per row */
  card = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return { cols: 1, rows: 1 };
      }

      return { cols: 2, rows: 1 };
    })
  );
  ngOnInit() {
    this.buddie$ = this.service.getBuddies(
      parseInt(this.route.snapshot.params.id, 10)
    );
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private service: BuddyService,
    private route: ActivatedRoute
  ) {}
}
