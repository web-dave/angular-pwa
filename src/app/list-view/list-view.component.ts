import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent {
  conferences = [
    { id: 1, name: 'ng-de', buddies: 2 },
    { id: 2, name: 'ng-de1', buddies: 7 }
  ];
  displayedColumns: string[] = ['name', 'buddies'];
  constructor() {}
  selected(e) {
    console.log(e);
  }
}
