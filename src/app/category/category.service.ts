import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './category.model';
import { Subject } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient,
              ) { }

  category_list: Category[] = [];

  category_fetched_event_emitter = new Subject<Category[]>();


  addCategory(formdata:any) {
    const catdata = new FormData();
    catdata.append('inputCategory', formdata.inputCategory);
    catdata.append('inputCategoryImage', formdata.inputCategoryImage, 'Catpic1');
    return this.http.post(environment.apiUrl+'/api/category',catdata);
  }

  CategoryListObservable() {
    return this.category_fetched_event_emitter.asObservable();
  }

  getCategoryList() {
    this.http.get<{ message: string, clist: Category[]}>(environment.apiUrl+'/api/category')
              .subscribe((resultdata) => {
                this.category_list = resultdata.clist;
                this.category_fetched_event_emitter.next([...this.category_list]);

              });
  }

  getSingleCategory(catid:string) {
    return this.http.get<{message: string, cdata: any}>(environment.apiUrl+'/api/category/' + catid);

  }

}
