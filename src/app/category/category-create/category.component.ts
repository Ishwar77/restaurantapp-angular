import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {


  constructor(private fb:FormBuilder,
              private catservice:CategoryService,
              private _flashMessagesService: FlashMessagesService) {

   }

  myform:FormGroup;

  public imagePreview: string;

  ngOnInit() {
    this.myform = this.fb.group({
      'inputCategory': this.fb.control('',[Validators.required,Validators.minLength(3)]),
      'inputCategoryImage': this.fb.control(null, {validators: [Validators.required]}),
    });
  }

  onImagePicked(event: Event ) {
    const file = (event.target as HTMLInputElement).files[0];
    this.myform.patchValue({'inputCategoryImage': file});
    this.myform.get('inputCategoryImage').updateValueAndValidity();
    console.log(file);
    console.log(this.myform);

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = (reader.result as string);
    };

    reader.readAsDataURL(file);


  }

  onFormSubmit(){
    //console.log(this.myform.value);
    this.catservice.addCategory(this.myform.value)
                  .subscribe((result)=>{
                    console.log(result);

                            this._flashMessagesService.show('Category Added Successfully', { cssClass: 'alert-success', timeout: 5000 });
                  },
                  (errdata)=>{
                    console.log(errdata);
                    alert('Category Already Exists');
                  }
                  )

    this.myform.reset;
  }

}
