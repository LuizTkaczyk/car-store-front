import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo-input',
  templateUrl: './logo-input.component.html',
  styleUrls: ['./logo-input.component.scss']
})
export class LogoInputComponent implements OnInit {
  @Output() logoOutput = new EventEmitter<Array<any>>();
  @Input() inputLogo: any = '';

  file: any = undefined;
  selectedFile: File | null = null;

  ngOnInit(): void {
    this.file = this.inputLogo;
  }

  remove(): void {
    this.file = undefined;
    this.logoOutput.emit(this.file);
  }

  addFiles(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files?.length) {
      this.selectedFile = inputElement.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.file = reader.result;
        this.logoOutput.emit(this.file);
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

}
