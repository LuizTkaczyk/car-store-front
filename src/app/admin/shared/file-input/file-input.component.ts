import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit, OnChanges {
  
  @Output() file = new EventEmitter<Array<any>>();
  @Input() inputFile : Array<any> = []; 
  
  files : any[] = [];
  selectedFile: File | null = null;
  imagePreview : any;
  
  ngOnInit(): void {
    this.files = this.inputFile;
  }
  
  ngOnChanges(changes: SimpleChanges): void {
     this.files = changes['inputFile'].currentValue;
  }

  remove(file: string): void {
    const index = this.files.indexOf(file);
    if (index >= 0) {
      this.files.splice(index, 1);
      this.file.emit(this.files);
    }
  }

  addFiles(event:any){
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files?.length) {
      for (let i = 0; i < inputElement.files.length; i++) {
        const selectedFile = inputElement.files[i];
        const reader = new FileReader();
        reader.onload = () => {
          const imagePreview = reader.result;
          this.files.push({file: imagePreview});
          this.file.emit(this.files);
        };
        reader.readAsDataURL(selectedFile);
      }
    }
  }

}
