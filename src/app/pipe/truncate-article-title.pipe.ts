import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateArticleTitle'
})
export class TruncateArticleTitlePipe implements PipeTransform {

  transform(text: string = ''): string {
    if (text !== null) {
      if (text.length > 20) {
        return text.substring(0, 20) + "...";
      }
    }
    return text;
  }

}
