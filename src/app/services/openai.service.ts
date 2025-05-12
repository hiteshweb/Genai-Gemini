import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  private apiKey = '';
  private apiUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(private http: HttpClient) {}

  generateCode(prompt: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const body = {
      model: 'gpt-3.5-turbo-16k',
      messages: [
        { role: 'system', content: 'You are a helpful assistant for Angular code generation.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
