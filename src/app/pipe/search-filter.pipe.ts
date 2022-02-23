import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  // transform(value: any, args?: any): any{
  //   if(!value)return null;
  //   if(!args)return value;
  //
  //   args = args.toLowerCase();
  //
  //   return value.filter(function(data:any){
  //     return JSON.stringify(data).toLowerCase().includes(args);
  //   });
  // }
  transform(list: any[], filterText: string): any {
    return list ? list.filter(item => item.name.search(new RegExp(filterText, 'i')) > -1) : [];
  }
}

