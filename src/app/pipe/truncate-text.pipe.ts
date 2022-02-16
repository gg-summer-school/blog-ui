import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {

  transform(text: string = ''): string {
    if (text !== null) {
      if (text.length > 1000) {
        return text.substring(0, 1000) + "...";
      }
    }
    return text;
  }

}
