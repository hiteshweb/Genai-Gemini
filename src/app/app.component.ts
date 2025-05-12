import { AfterViewChecked, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GenaiService } from './services/genai.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GeminiService } from './services/gemini.service';
import { OpenaiService } from './services/openai.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  prompt = '';
  response = '';
  loading = false;
  imageUrl:any = '';
  result = '';

  // constructor(private genaiService: GenaiService) {}

  // generate() {
  //   this.response = '';
  //   this.loading = true;

  //   this.genaiService.generateText(this.prompt).subscribe({
  //     next: res => {
  //       this.loading = false;
  //       this.response = res?.[0]?.generated_text || 'No output';
  //     },
  //     error: err => {
  //       this.loading = false;
  //       this.response = 'Error: ' + JSON.stringify(err);
  //       console.error(err);
  //     }
  //   });
  // }

  constructor(private geminiService: GeminiService, private genaiService: GenaiService, private openai: OpenaiService) {}

  generateImage(){

    this.genaiService.generateImage(this.prompt).subscribe({
      next: (blob: Blob) => {
        this.imageUrl = URL.createObjectURL(blob);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.imageUrl = null;
      }
    });
  }

  generateText() {
    if (!this.prompt.trim()) return;
    this.loading = true;
    this.response = '';
    this.geminiService.generateText(this.prompt).subscribe({
      next: (res: any) => {
        const candidates = res?.candidates;
        this.response = candidates?.[0]?.content?.parts?.[0]?.text || 'No response.';
        this.loading = false;
      },
      error: err => {
        console.error('Gemini error:', err);
        this.response = 'Error calling Gemini API.';
        this.loading = false;
      }
    });
  }

  getFormattedResponse(): string {
    return this.response.replace(/\n/g, '<br>');
  }

  generateCode() {
    if (!this.prompt.trim()) return;

    this.loading = true;
    this.openai.generateCode(this.prompt).subscribe({
      next: (res) => {
        this.result = res.choices?.[0]?.message?.content || 'No response.';
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.result = 'Error generating code.';
      }
    });
  }
}
