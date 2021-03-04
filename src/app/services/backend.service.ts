import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';
import { AssetDto, PortfolioDto } from '../dto';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private apiBaseUrl = 'https://localhost:44329/apiv1';
  private assetsUrl = this.apiBaseUrl + '/asset';
  private assetsUrl_create = this.apiBaseUrl + '/create';
  private assetsUrl_search = this.assetsUrl + '/search';
  private assetsUrl_delete = this.assetsUrl + '/delete';
  private assetsUrl_update = this.assetsUrl + '/update';

  private portfolioUrl = this.apiBaseUrl + '/portfolio';
  private portfolioUrl_create = this.portfolioUrl + '/create';

  constructor(
    private http: HttpClient
  ) { }

  createPortfolio(portfolio: PortfolioDto): Observable<PortfolioDto> {
    return this.http.post<PortfolioDto>(this.portfolioUrl_create, portfolio, {})
      .pipe(
        catchError(this.handleError<PortfolioDto>('createPortfolio', {} as PortfolioDto))
      );
  }

  getAssets(): Observable<AssetDto[]> {
    return this.http.get<AssetDto[]>(this.assetsUrl)
      .pipe(
        catchError(this.handleError<AssetDto[]>('getAssets', []))
      );
  }

  createAsset(newAsset: AssetDto): Observable<AssetDto>{
    return this.http.post<AssetDto>(this.assetsUrl_create, newAsset, {})
      .pipe(
        catchError(this.handleError<AssetDto>('createAsset', {} as AssetDto))
      );
  }

  updateAsset(newAsset: AssetDto): Observable<AssetDto>{
    return this.http.post<AssetDto>(this.assetsUrl_update, newAsset, {})
      .pipe(
        catchError(this.handleError<AssetDto>('updateAsset', {} as AssetDto))
      );
  }

  searchAsset(searchString: string): Observable<AssetDto[]>{
    return this.http.get<AssetDto[]>(this.assetsUrl_search + "/" + searchString)
      .pipe(
        catchError(this.handleError<AssetDto[]>('searchAsset', []))
      );
  }

  deleteAsset(id: string): Observable<{}> {
    return this.http.delete<string>(this.assetsUrl_delete + '/' + id)
      .pipe(
        catchError(this.handleError<AssetDto>('deleteAsset'))
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
