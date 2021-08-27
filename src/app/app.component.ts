import { TestRequest } from '@angular/common/http/testing';
import { isTrustedTypesSink } from '@angular/compiler/src/schema/trusted_types_sinks';
import { Component } from '@angular/core';
import { ItemList } from './multiselect-autocomplete-example';

@Component({
  selector: 'app-comp',
  template: `
    <form>
      <multiselect-autocomplete
        [placeholder]="'New item..'"
        [items]="items"
        [value]="selectedItems"
        (addNew)="addNewItem($event)"
      >
      </multiselect-autocomplete>
    </form>
    <div>
      Some data for scrolling; Some data for scrolling; Some data for scrolling;
      Some data for scrolling; Some data for scrolling; Some data for scrolling;
      Some data for scrolling; Some data for scrolling; Some data for scrolling;
      Some data for scrolling; Some data for scrolling; Some data for scrolling;
      Some data for scrolling; Some data for scrolling; Some data for scrolling;
      Some data for scrolling; Some data for scrolling; Some data for scrolling;
      Some data for scrolling; Some data for scrolling; Some data for scrolling;
      Some data for scrolling; Some data for scrolling; Some data for scrolling;
      Some data for scrolling; Some data for scrolling; Some data for scrolling;
      Some data for scrolling; Some data for scrolling; Some data for scrolling;
      Some data for scrolling; Some data for scrolling; Some data for scrolling;
      Some data for scrolling; Some data for scrolling; Some data for scrolling;
      Some data for scrolling; Some data for scrolling; Some data for scrolling;
      Some data for scrolling; Some data for scrolling;
    </div>
  `
})
export class AppComponent {
  items = [
    new ItemList('Misha Arnold'),
    new ItemList('Felix Godines'),
    new ItemList('Odessa Thorton'),
    new ItemList('Julianne Gills')
  ];
  selectedItems = [
    new ItemList('Misha Arnold', true),
    new ItemList('Odessa Thorton', true)
  ];

  constructor() {}
  public addNewItem(event) {
    // this.items = event;
    const filterdata = this.items.filter(
      item => !this.selectedItems.find(o => o.item === item.item)
    );
    this.items = [...filterdata, ...event];
    console.log(this.items);
  }
}
