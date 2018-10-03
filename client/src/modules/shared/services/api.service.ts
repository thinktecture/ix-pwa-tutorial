import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable()
export class ApiService {
    private _apiBaseUrl: string;

    constructor(private _httpClient: HttpClient) {
        this._apiBaseUrl = environment.apiUrl;
        if (!this._apiBaseUrl.endsWith('/')) {
            this._apiBaseUrl += '/';
        }
    }

    public get(urlSuffix: string): Observable<any> {
        return this._httpClient.get(this._getApiUrl(urlSuffix));
    }

    public put(urlSuffix: string, payload: any): Observable<any> {
        return this._httpClient.put(this._getApiUrl(urlSuffix), payload);
    }

    public post(urlSuffix: string, payload: any): Observable<any> {
        return this._httpClient.post(this._getApiUrl(urlSuffix), payload);
    }

    public delete(urlSuffix: string): Observable<any> {
        return this._httpClient.delete(this._getApiUrl(urlSuffix));
    }

    private _getApiUrl(urlSuffix: string): string {
        return `${this._apiBaseUrl}${urlSuffix}`;
    }
}
