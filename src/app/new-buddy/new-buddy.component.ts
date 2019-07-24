import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuddyService } from '../buddy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCropperComponent, CropperSettings } from 'ngx-img-cropper';

@Component({
  selector: 'app-new-buddy',
  templateUrl: './new-buddy.component.html',
  styleUrls: ['./new-buddy.component.scss']
})
export class NewBuddyComponent implements OnInit {
  @ViewChild('cropper', { static: false })
  public cropper: ImageCropperComponent;
  form: FormGroup;
  confId: number;
  data = { image: null };
  cropperSettings: CropperSettings;

  constructor(
    private fb: FormBuilder,
    private service: BuddyService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.keepAspect = false;

    this.cropperSettings.croppedWidth = 90;
    this.cropperSettings.croppedHeight = 90;

    this.cropperSettings.canvasWidth = 300;
    this.cropperSettings.canvasHeight = 180;

    this.cropperSettings.minWidth = 50;
    this.cropperSettings.minHeight = 50;

    this.cropperSettings.rounded = true;
    this.cropperSettings.minWithRelativeToResolution = false;

    this.cropperSettings.cropperDrawSettings.strokeColor =
      'rgba(255,255,255,1)';
    this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
    this.cropperSettings.noFileInput = false;
    this.cropperSettings.fileType = 'image/jpeg';
  }

  ngOnInit() {
    this.confId = parseInt(this.route.snapshot.params.id, 10);
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      link: ['', Validators.required],
      img: [''],
      conferences: [[this.confId]]
    });
  }

  save() {
    const img = this.cropper.cropper.getCroppedImage(true).src;
    this.form.get('img').setValue(img);
    this.service
      .addBuddy(this.form.value, this.confId)
      .subscribe(() =>
        this.router.navigate(['..'], { relativeTo: this.route })
      );
  }
}
