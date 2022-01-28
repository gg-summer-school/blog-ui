import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {

  transform(text: string =''): string {
    if(text.length > 440){
      return text.substr(0, 440)+"...";
      
    }
    return text;
  }

}
