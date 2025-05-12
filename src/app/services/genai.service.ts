import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenaiService {
  private apiUrl = 'https://api-inference.huggingface.co/models/Salesforce/codegen-350M-multi';
  // private apiUrl = 'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev';
  private apiKey = ''; // 🔒 Replace this

  constructor(private http: HttpClient) {}

  generateImage(prompt: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    });

    const body = { inputs: prompt };
    // return this.http.post(this.apiUrl, body, { headers, responseType: 'blob' });
    return this.http.post(this.apiUrl, body, { headers });
  }
}
