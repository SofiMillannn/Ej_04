import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Result, Root} from "../common/interface";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() { }
  private http: HttpClient = inject(HttpClient);
  url:string = "https://rickandmortyapi.com/api/character";

  getRicky(): Observable<Root> {
    return this.http.get<Root>(this.url);
  }
}
