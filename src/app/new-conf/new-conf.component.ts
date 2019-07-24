import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuddyService } from '../buddy.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-conf',
  templateUrl: './new-conf.component.html',
  styleUrls: ['./new-conf.component.scss']
})
export class NewConfComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: BuddyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      buddies: ['']
    });
  }
  save() {
    this.service
      .addConference(this.form.value)
      .subscribe(() =>
        this.router.navigate(['..'], { relativeTo: this.route })
      );
  }
}
