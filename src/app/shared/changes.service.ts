import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangesService {

  constructor() { }

  private filterSubject = new BehaviorSubject<any>({});
  private changes = new BehaviorSubject<object>({});
  private posts = new BehaviorSubject<Boolean>(false);
  private search = new BehaviorSubject<any>({});
  private loadButton = new BehaviorSubject<string>('nothing');

  changeFilter = this.changes.asObservable();
  callPosts = this.posts.asObservable();
  searchVehicle = this.search.asObservable();


  filter(changeId: object) {
    this.changes.next(changeId);
  }

  callPost(call : Boolean = false) {
    this.posts.next(call);
  }

  setFilters(filters: any): void {
    this.filterSubject.next(filters);
  }

  getFilters(): BehaviorSubject<any> {
    return this.filterSubject;
  }

  callSearch(search: any): void {
    this.search.next(search);
  }

  setButton(value: string) {
    this.loadButton.next(value);
  }

  getButton(): BehaviorSubject<any> {
    return this.loadButton;
  }
}
