import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/category/category.service';
import { Category } from 'src/app/category/category.model';
import { Subscription } from 'rxjs';
import { ItemService } from '../item.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CustomValidators } from 'src/app/errors/custom-validator';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit,OnDestroy {


  constructor(private fb:FormBuilder,
              private catservice:CategoryService,
              private _flashMessagesService: FlashMessagesService,
              private itemService:ItemService) {

  }

  isLoading:boolean = false;

  category_list: Category[] = [];

  myform:FormGroup;

  category_list_sub:Subscription;

  public imagePreview: string;

  ngOnInit() {
    this.myform = this.fb.group({
      'inputCategory': this.fb.control('',[Validators.required]),
      'inputItemName' : this.fb.control('',[Validators.required,Validators.minLength(3)]),
      'inputDescription' : this.fb.control('',[Validators.required,Validators.minLength(10)]),
      'inputIngridients' : this.fb.control('',[Validators.required,Validators.minLength(10)]),
      'inputHealthBenifits' : this.fb.control('',[Validators.required,Validators.minLength(10)]),
      'inputIsVeg' : this.fb.control('1',[Validators.required]),
      'inputItemImage': this.fb.control(null, {validators: [Validators.required]}),
      'inputUnitPrice' : this.fb.control('',[Validators.required,CustomValidators.numberValidate])

    });

    this.catservice.getCategoryList();

    this.category_list_sub = this.catservice.CategoryListObservable()
                                            .subscribe((catlist)=>{
                                               this.category_list=catlist;
                                            });
  }

  onImagePicked(event: Event ) {
    const file = (event.target as HTMLInputElement).files[0];
    this.myform.patchValue({'inputItemImage': file});
    this.myform.get('inputItemImage').updateValueAndValidity();
    console.log(file);
    console.log(this.myform);

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = (reader.result as string);
    };

    reader.readAsDataURL(file);


  }

  ngOnDestroy(): void {
    this.category_list_sub.unsubscribe();
  }

  onSavePost() {
    if (this.myform.invalid) {
      return;
    }
    this.isLoading = true;
    this.itemService.addItem(this.myform.value)
    .subscribe((result)=>{
      this._flashMessagesService.show('Success! Item Added Successfully', { cssClass: 'alert-success', timeout: 5000 ,role:'alert'});
     })
     this.isLoading = false;
    this.myform.reset();
  }

}
