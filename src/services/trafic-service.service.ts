import {
  DestroyRef,
  Injectable,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { cars } from '../utils';
import { ICars, TActiveRoad, TCarsToActiveRoad } from '../type';
import { Observable, map, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const CARS_TO_ACTIVE_ROADS: TCarsToActiveRoad = {
  carsNs: 'NorthSouth',
  carsEw: 'EastWest',
};

@Injectable({
  providedIn: 'root',
})
export class TraficService {
  private _destroyRef = inject(DestroyRef);
  private _carMap$: Observable<ICars> = of(cars);
  private _carsNs = signal<number[]>([]);
  private _carsEw = signal<number[]>([]);
  private _timer = signal(0);
  private _nsRoad: WritableSignal<Map<number, number>> = signal(new Map());
  private _ewRoad: WritableSignal<Map<number, number>> = signal(new Map());

  activeRoad: WritableSignal<TActiveRoad> = signal(
    CARS_TO_ACTIVE_ROADS['carsEw'],
  );
  timesArray: number[] = [];
  numberOfCarsEnterNs = signal(0);
  numberOfCarsEnterEw = signal(0);

  constructor() {
    this._getCarsStream();
    this._getRoads();
    this._getTimesSet();
  }

  private _getCarsStream(): void {
    this._carMap$
      .pipe(
        map((cars) => cars),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe((cars) => {
        this._carsNs.set(cars.carsNs.slice());
        this._carsEw.set(cars.carsEw.slice());
      });
  }

  private _getRoads(): void {
    const getRoad = (road: number[]) => {
      return road.reduce((acc: any, curr: number) => {
        if (!acc) {
          acc = new Map<number, number>();
          acc.set(curr, 1);
        } else {
          if (!acc.has(curr)) {
            acc.set(curr, 1);
          } else acc.set(curr, acc.get(curr)! + 1);
        }
        return acc;
      }, null);
    };
    this._nsRoad.set(getRoad(this._carsNs()));
    this._ewRoad.set(getRoad(this._carsEw()));
  }

  private _getTimesSet(): void {
    if (this.timesArray.length) {
      return;
    }
    const set = new Set<number>([...this._carsNs(), ...this._carsEw()]);
    const sortedArray = Array.from(set).sort((a, b) => a - b);
    this.timesArray = sortedArray;
  }

  private _updatenumberOfCars(
    nsRoad: Map<number, number>,
    ewRoad: Map<number, number>,
    timer: number,
  ) {
    if (nsRoad.has(timer + 1) || nsRoad.has(timer + 2)) {
      this.numberOfCarsEnterNs.update(
        (prev) => prev + (nsRoad.get(timer + 2) || 0),
      );
      this.numberOfCarsEnterNs.update(
        (prev) => prev + (nsRoad.get(timer + 1) || 0),
      );
    }

    if (ewRoad.has(timer + 2) || ewRoad.has(timer + 1)) {
      this.numberOfCarsEnterEw.update(
        (prev) => prev + (ewRoad.get(timer + 2) || 0),
      );
      this.numberOfCarsEnterEw.update(
        (prev) => prev + (ewRoad.get(timer + 1) || 0),
      );
    }
  }

  generateActiveRoad(): void {
    debugger;

    const nsRoad: Map<number, number> = this._nsRoad();
    const ewRoad: Map<number, number> = this._ewRoad();

    if (!this.timesArray.length || (!nsRoad.size && !ewRoad.size)) {
      return;
    }
    let currentActiveRoad: TActiveRoad | undefined;

    const reducingNs = () => {
      currentActiveRoad = CARS_TO_ACTIVE_ROADS['carsNs'];
      nsRoad.set(currentTime, nsRoad.get(currentTime)! - 1);
      if (nsRoad.get(currentTime)! === 0) {
        nsRoad.delete(currentTime);
      }
      this.numberOfCarsEnterNs.update((prev) => prev - 1);
      this._nsRoad.set(nsRoad);
    };

    const reducingEW = () => {
      currentActiveRoad = CARS_TO_ACTIVE_ROADS['carsEw'];
      ewRoad.set(currentTime, ewRoad.get(currentTime)! - 1);

      if (ewRoad.get(currentTime)! === 0) {
        ewRoad.delete(currentTime);
      }
      this.numberOfCarsEnterEw.update((prev) => prev - 1);
      this._ewRoad.set(ewRoad);
    };
    let currentTime: number = this.timesArray[0]!;

    if (!nsRoad.has(currentTime) && !ewRoad.has(currentTime)) {
      this.timesArray.shift()!;
      currentTime = this.timesArray[0]!;
    }

    this._timer.update((prev) => prev + 2);
    this._updatenumberOfCars(nsRoad, ewRoad, this._timer());

    if (currentTime > this._timer()) {
      //The car is not there it
      return;
    }

    if (nsRoad.has(currentTime) && ewRoad.has(currentTime)) {
      if (nsRoad.get(currentTime)! > ewRoad.get(currentTime)!) {
        reducingNs();
      } else if (nsRoad.get(currentTime)! < ewRoad.get(currentTime)!) {
        reducingEW();
      } else {
        //EQUALS
        if (this.activeRoad() === 'NorthSouth') {
          reducingNs();
        } else {
          reducingEW();
        }
      }
    } else if (nsRoad.has(currentTime)) {
      reducingNs();
    } else {
      reducingEW();
    }

    if (currentActiveRoad) {
      this.activeRoad.set(currentActiveRoad);
    }
  }
}
