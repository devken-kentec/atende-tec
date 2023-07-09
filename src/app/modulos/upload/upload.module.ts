import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRoutingModule } from './upload-routing.module';
import { UploadFileComponent } from './upload-file/upload-file.component';


@NgModule({
  declarations: [UploadFileComponent],
  imports: [
    CommonModule,
    UploadRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class UploadModule { }
