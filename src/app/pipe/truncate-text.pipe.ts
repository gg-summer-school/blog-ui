import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {

  transform(text: string = ''): string {
    if (text !== null) {
      if (text.length > 440) {
        return text.substring(0, 440) + "...";
      }else if(text.length > 20){
        return text.substring(0, 20) + "..."
      }
    }
    return text;
  }

}
