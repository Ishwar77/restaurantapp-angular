import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './item.model';
import { Subject } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http:HttpClient,
              ) { }

  item_list: Item[] = [];

  item_fetched_event_emitter = new Subject<Item[]>();

  addItem(formdata:any) {
    const itemdata = new FormData();
    itemdata.append('inputCategory', formdata.inputCategory);
    itemdata.append('inputItemName', formdata.inputItemName);
    itemdata.append('inputDescription', formdata.inputDescription);
    itemdata.append('inputIngridients', formdata.inputIngridients);
    itemdata.append('inputHealthBenifits', formdata.inputHealthBenifits);
    itemdata.append('inputIsVeg', formdata.inputIsVeg);
    itemdata.append('inputItemImage', formdata.inputItemImage, 'itempic1');
    itemdata.append('inputUnitPrice', formdata.inputUnitPrice);
    return this.http.post(environment.apiUrl+'/api/item',itemdata);

  }

  ItemListObservable() {
    return this.item_fetched_event_emitter.asObservable();
  }

  getItemList() {
    this.http.get<{ message: string, ilist: Item[]}>(environment.apiUrl+'/api/item')
              .subscribe((resultdata) => {
                this.item_list = resultdata.ilist;
                this.item_fetched_event_emitter.next([...this.item_list]);

              });
  }

  getCatItem(catid:string) {
    return this.http.get<{ message: string, ilist: Item[]}>(environment.apiUrl+'/api/item/'+catid);
  }

}
