import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangesService {

  constructor() { }

  private changes = new BehaviorSubject<string>(''); // Valor inicial vazio
  currentChangeId = this.changes.asObservable();

  changeBrandId(changeId: string) {
    this.changes.next(changeId);
  }

}
