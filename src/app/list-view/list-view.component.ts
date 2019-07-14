import { Component, OnInit } from '@angular/core';
import { BuddyService } from '../buddy.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  conference$;
  displayedColumns: string[] = ['name', 'buddies'];
  constructor(private service: BuddyService) {}
  ngOnInit(): void {
    this.conference$ = this.service.getConferences();
  }
  selected(e) {
    console.log(e);
  }
}
