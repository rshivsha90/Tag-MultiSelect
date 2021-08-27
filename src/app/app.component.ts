import { Component } from '@angular/core';
import { ItemList } from './multiselect-autocomplete-example';

@Component({
  selector: 'app-comp',
  template: `
    <form>
      <multiselect-autocomplete
        [placeholder]="'New item..'"
        [items]="items"
        [value]="value"
        (addNew)="addNewItem($event)"
      >
      </multiselect-autocomplete>
    </form>
  `
})
export class AppComponent {
  items = [
    new ItemList('Misha Arnold'),
    new ItemList('Felix Godines'),
    new ItemList('Odessa Thorton'),
    new ItemList('Julianne Gills')
  ];
  value = [
    new ItemList('Misha Arnold', true),
    new ItemList('Odessa Thorton', true)
  ];

  constructor() {}
  public addNewItem(event) {
    this.items = event;
    console.log('newItems:',this.items);
  }
}
