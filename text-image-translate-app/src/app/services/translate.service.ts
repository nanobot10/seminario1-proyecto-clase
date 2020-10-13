import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(private http: HttpClient) { }


  detectText( body: any) {
    return this.http.post(API_URL, body);
  }

  translateText(body: any) {
    return this.http.post(`${API_URL}/translate-text`, body);
  }


}
