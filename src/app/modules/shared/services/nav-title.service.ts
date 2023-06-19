import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavTitleService {
  constructor() { }
  title=new Subject<string>()
}
