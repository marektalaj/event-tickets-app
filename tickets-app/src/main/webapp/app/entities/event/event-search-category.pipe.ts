import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'eventSearchCategory'
})
export class EventSearchCategoryPipe implements PipeTransform {
    transform(value: any[], term: number): any[] {
        if (value == null || term == null) {
            return value;
        }
        return value.filter((x: any) => x.categoryId.id === term);
    }
}
