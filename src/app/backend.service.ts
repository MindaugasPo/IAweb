import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';
import { AssetDto } from './dto';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private apiBaseUrl = 'http://localhost:49977/api';
  private assetsUrl = this.apiBaseUrl + '/apiasset';

  constructor(
    private http: HttpClient
  ) { }

  getAssets(): Observable<AssetDto[]> {
    return this.http.get<AssetDto[]>(this.assetsUrl)
      .pipe(
        catchError(this.handleError<AssetDto[]>('getAssets', []))
      );;
  }

  createAsset(newAsset: AssetDto): Observable<AssetDto>{
    return this.http.post<AssetDto>(this.assetsUrl, newAsset, {})
      .pipe(
        catchError(this.handleError<AssetDto>('createAsset', {} as AssetDto))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
