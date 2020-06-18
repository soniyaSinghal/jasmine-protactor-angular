import { of, Observable, throwError } from 'rxjs';

export class MockAuthenticationService {
  login(payload): Observable<object> {
    if (payload.username === 'admin' && payload.password === 'admin') {
      return of({ isValid: true });
    }
    if (payload && payload.username === 'sendError') {
      return throwError('User not found');
    }
    return of({ isValid: false });
  }
}
