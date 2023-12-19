import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnChanges {

  @Output() file = new EventEmitter<Array<any>>();
  @Output() filesToDelete = new EventEmitter<Array<any>>();
  @Input() inputFile : Array<any> = [];

  files : any[] = [];
  filesToDel : any[] = [];
  selectedFile: File | null = null;
  imagePreview : any;
  imagePath = environment.imagePath;

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['inputFile'] &&
      Array.isArray(changes['inputFile'].currentValue)
    ) {
      // Remove objetos com file igual a 'defaultImage' do array
      this.files = changes['inputFile'].currentValue.filter(item => item.file !== 'defaultImage');
    }
  }

  remove(file: string): void {
    const index = this.files.indexOf(file);
    this.filesToDel.push(file);
    this.filesToDelete.emit(this.filesToDel);

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
          console.log(this.files)
          this.file.emit(this.files);
        };
        reader.readAsDataURL(selectedFile);
      }
    }
  }

}
