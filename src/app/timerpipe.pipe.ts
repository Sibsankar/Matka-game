import { Pipe, PipeTransform } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { GameService } from '../app/services/game.service';

@Pipe({
  name: 'countdown'
})
export class TimerpipePipe implements PipeTransform {

    constructor(private GameService: GameService) { }
    /**
     * Gets the millisecond difference between a future date and now
     * @private
     * @param   futureDate: string
     * @returns number  milliseconds remaining
     */
    private getMsDiff (futureDate: string, endDate?: string, gameId?: string): number {
        
        if (endDate && ((+(new Date(endDate)) - Date.now()) < 0)) {
            console.log('eeend', endDate);
            // make api call for generate result here
            // this.GameService.generateResult(gameId).subscribe({
            //     next: (v) => {
            //       // console.log('Games Data - ',v.data);
            //       if(v.data.msg){  
            //         console.log('gamesData Data - ', v.data.msg);
            //       }
            //     },
            //     error: (e) => {        
            //         console.log(e);
            //     },
            //     complete: () => console.info('complete'),
                
            // });
            return 0.01;
        } else {
            return (+(new Date(futureDate)) - Date.now());
        }
       
    } 

    /**
     * Converts milliseconds to the
     *
     * @private
     * @param msRemaining
     * @returns null    when no time is remaining
     *          string  in the format `HH:mm:ss`
     */
    private msToTime(msRemaining: number): string | null {
        if (msRemaining < 0) {
            console.info('No Time Remaining:', msRemaining);
            return 'Play';
        }

        if (msRemaining == 0.01) {
            console.info('end Time Remaining:', msRemaining);
            return 'Game Over';
        }

        let seconds: string | number = Math.floor((msRemaining / 1000) % 60),
            minutes: string | number = Math.floor((msRemaining / (1000 * 60)) % 60),
            hours: string | number = Math.floor((msRemaining / (1000 * 60 * 60)) % 24);

        /**
         * Add the relevant `0` prefix if any of the numbers are less than 10
         * i.e. 5 -> 05
         */
        seconds = (seconds < 10) ? '0' + seconds : seconds;
        minutes = (minutes < 10) ? '0' + minutes : minutes;
        hours = (hours < 10) ? '0' + hours : hours;

        return `${hours}:${minutes}:${seconds}`;
    }

    /**
     * @param futureDate    should be in a valid Date Time format
     *                      e.g. YYYY-MM-DDTHH:mm:ss.msz
     *                      e.g. 2021-06-04T17:27:10.740z
     */
    public transform(futureDate: string, endDate?: string, gameId?: string): Observable<any> {
        /**
         * Initial check to see if time remaining is in the future
         * If not, don't bother creating an observable
         */
        // if (!futureDate || this.getMsDiff(futureDate) < 0) {
        //     return null;
        // }
        return timer(0, 1000).pipe(
            map(() => {
                return this.msToTime(this.getMsDiff(futureDate, endDate, gameId));
            })
        );
    }
}