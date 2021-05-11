import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getFileSrc'
})
export class GetFileSrcPipe implements PipeTransform {

  transform(file: File|Blob|undefined|null, ...args: unknown[]): string {
    

        if (file) {
            
            return URL.createObjectURL(file);

        }

        return "";
    
  }

}
