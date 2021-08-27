import {
  ElementRef,
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

export class ItemList {
  constructor(public item: string, public selected?: boolean) {
    if (selected === undefined) selected = false;
  }
}

@Component({
  selector: 'multiselect-autocomplete',
  templateUrl: 'multiselect-autocomplete-example.html',
  styleUrls: ['multiselect-autocomplete-example.css']
})
export class MultiselectAutocompleteExample implements OnInit {
  @ViewChild('inputTrigger', { read: MatAutocompleteTrigger })
  inputTrigger: MatAutocompleteTrigger;
  @ViewChild('input', { read: ElementRef }) public input: ElementRef;
  itemControl = new FormControl();
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  private _placeholder: string;
  public _items: ItemList[];
  @Input() set value(value: any) {
    if (value) {
      this.selectedItems = value;
    }
  }
  get value() {
    return this.selectedItems;
  }
  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
  }
  @Input() set items(value) {
    this._items = value;
  }
  get items() {
    if (!this._items.length) {
      return [];
    }
    if (this.selectedItems.length) {
      this.selectedItems.forEach(o => {
        this._items.forEach(item => {
          if (item.item === o.item) {
            item['selected'] = o.selected;
          }
        });
      });
    }
    return this._items;
  }
  @Output() addNew = new EventEmitter<ItemList[]>();
  focused = false;
  selectedItems: ItemList[] = new Array<ItemList>();
  filteredItems: ItemList[];

  constructor(private elRef: ElementRef<HTMLElement>) {}
  onContainerClick(event: MouseEvent): void {
    throw new Error('Method not implemented.');
  }
  empty: boolean;
  shouldLabelFloat: boolean;
  disabled: boolean;
  lastFilter = '';

  ngOnInit() {
    this.itemControl.valueChanges
      .pipe(
        startWith<string | ItemList[]>(''),
        debounceTime(0),
        map(value => (typeof value === 'string' ? value : this.lastFilter)),
        map((filter: any) => this.filter(filter))
      )
      .subscribe(data => {
        this.filteredItems = data;
      });
  }

  filter(filter: string): ItemList[] {
    this.lastFilter = filter;
    if (filter) {
      return this.items.filter(option => {
        return option.item.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
      });
    } else {
      return this.items.slice();
    }
  }

  optionClicked(event: Event, item: ItemList) {
    event.stopPropagation();
    this.toggleSelection(item);
  }

  toggleSelection(item: ItemList) {
    item.selected = !item.selected;
    if (item.selected) {
      this.selectedItems.push(item);
    } else {
      const i = this.selectedItems.findIndex(value => value.item === item.item);
      this.selectedItems.splice(i, 1);
    }
    const filterdata = this.items.filter(
      item => !this.selectedItems.find(o => o.item === item.item)
    );
    // this.addNew.emit([...this.selectedItems, ...filterdata]);
    this.addNew.emit([...this.selectedItems]);
  }

  add(event): void {
    const value = (event.value || '').trim();
    if (value) {
      const item = new ItemList(value);
      this.toggleSelection(item);
    }
    event.value = ' ';
    if (event.input) {
      event.input.value = ' ';
    }
    this.itemControl.setValue('');
  }

  ngOnDestroy() {
    // this.fm.stopMonitoring(this.elRef.nativeElement);
  }
}
