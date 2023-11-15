import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of, map, timer } from 'rxjs';
import { DateTime, DurationObjectUnits, DurationLikeObject } from 'luxon';

@Pipe({
  name: 'countdown'
})

export class TimerpipePipe implements PipeTransform {

  
  transform(value: string): Observable<DurationLikeObject> {
    console.log('indateeeeeee', value);
    var indate = new Date(value);
    var ctime = indate.getHours() + ":" + indate.getMinutes() + ":" + ('0'+indate.getSeconds()).slice(-2);
    console.log('ctimeeeeee', ctime);
    const target = DateTime.fromFormat(ctime, 'hh:mm:ss');

    return timer(0, 1000).pipe(map(() => {
      const now = DateTime.now();
      return target.diff(now, ['hour', 'minute', 'second']).toObject();
    }));
  }

}
