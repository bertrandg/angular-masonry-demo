import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'masonry',
  pure: true,
})
export class MasonryPipe implements PipeTransform {

  transform(value: any[], numColumns: number, colNum: number): unknown {
    if (value.length === 0) {
      return value;
    }
    
    if (numColumns < 1 || colNum < 1 || isNaN(numColumns) || isNaN(colNum) ||colNum > numColumns) {
      console.error("Invalid column configuration");
      return value;
    }

    return value.filter((val, index) => index % numColumns === colNum - 1);
  }

}