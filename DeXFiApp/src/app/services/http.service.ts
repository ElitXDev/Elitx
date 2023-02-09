import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  // url = 'http://localhost:8070/creds';
  url = 'https://creds.dexfi.pro/creds';
  options = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'content-type': 'application/json',
    },
  };
  constructor(private http: HttpClient) {}

  async getCreds() {
    try {
      return await lastValueFrom(
        this.http.get<{ seeds: string[] }>(this.url /*, this.options*/)
      );
    } catch (error: any) {
      console.log('HTTP:', error['statusText']);
      return { seeds: [] };
    }
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
