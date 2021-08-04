import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category/category.service';
import { Category } from 'src/app/category/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  cat_list:Category[]=[];

  category_list_sub:Subscription;

  constructor(private category_service:CategoryService) { }

  ngOnInit() {
    this.category_service.getCategoryList();
    this.category_list_sub = this.category_service.CategoryListObservable()
                                            .subscribe((catlist)=>{
                                               this.cat_list=catlist;
                                            });
  }

  ngOnDestroy(): void {
    this.category_list_sub.unsubscribe();
  }

}
