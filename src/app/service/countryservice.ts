import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CountryService {

    constructor(private http: HttpClient) { }

    getCountries() {
    return this.http.get('assets/data/countries.json');
    }
}
