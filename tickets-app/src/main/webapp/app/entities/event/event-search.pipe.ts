import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'eventSearch'
})
export class EventSearchPipe implements PipeTransform {
    transform(value: any[], term: any): any[] {
        if (value == null || term == null) {
            return value;
        }
        return value.filter(
            (x: any) =>
                x.name
                    .toString()
                    .toLowerCase()
                    .includes(term.toLowerCase()) ||
                x.eventAddress
                    .toString()
                    .toLowerCase()
                    .includes(term.toLowerCase())
        );
    }
}
