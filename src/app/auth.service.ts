import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

interface User {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new ReplaySubject<User>(1);
  constructor() {
    setTimeout(() => {
      this.user.next({ name: 'Malav' });
    }, 2000);
  }
}
