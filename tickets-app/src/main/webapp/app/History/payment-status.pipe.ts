import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'paymentStatusPipek'
})
export class PaymentStatusPipe implements PipeTransform {
    transform(value: any, status: number): any {
        if (value == null || status == null) {
            return value;
        }
        return status == 0 ? 'Zamówienie nieopłacone' : 'Zamówienie opłacone';
    }
}
