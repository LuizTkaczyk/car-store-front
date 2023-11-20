import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-logo-input',
  templateUrl: './logo-input.component.html',
  styleUrls: ['./logo-input.component.scss']
})
export class LogoInputComponent implements OnInit, OnChanges {
  @Output() logoOutput = new EventEmitter<Array<any>>();
  @Input() inputLogo: any = '';

  file: any = undefined;
  showLogo: Boolean = true;
  selectedFile: File | null = null;

  ngOnInit(): void {
   // this.file = this.inputLogo;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.file = changes['inputLogo'].currentValue;
 }

  remove(): void {
    this.file = undefined;
    this.showLogo = false;
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
