import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private apiKey = environment.GEMINI_API_KEY;
  private endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  constructor(private http: HttpClient) {}

  generateText(prompt: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    };
    const url = `${this.endpoint}?key=${this.apiKey}`;
    return this.http.post(url, body, { headers });
  }
}
