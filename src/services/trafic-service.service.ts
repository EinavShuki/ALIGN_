import {
  DestroyRef,
  Injectable,
  Signal,
  WritableSignal,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { cars } from '../utils';
import { ICars, TActiveRoad, TCarsToActiveRoad } from '../type';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  delay,
  distinctUntilChanged,
  filter,
  interval,
  map,
  of,
  shareReplay,
  switchMap,
  tap,
  timer,
} from 'rxjs';
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
  private _currentTimer = signal(0);
  private _carMap$: Observable<ICars> = of(cars);
  private _carsNs = signal<number[]>([]);
  private _carsEw = signal<number[]>([]);
  private _timesSet = this._getTimesSet();
  private _nsRoad: Signal<Map<number, number>> = computed(() => {
    return this._carsNs().reduce((acc: any, curr: number) => {
      if (!acc) {
        acc = new Map<number, number>();
      } else {
        if (!acc.has(curr)) {
          acc.set(curr, 1);
        } else acc.set(curr, acc.get(curr)! + 1);
      }
      return acc;
    }, {});
  });

  private _esRoad: Signal<Map<number, number>> = computed(() => {
    return this._carsEw().reduce((acc: any, curr: number) => {
      if (!acc) {
        acc = new Map<number, number>();
      } else {
        if (!acc.has(curr)) {
          acc.set(curr, 1);
        } else acc.set(curr, acc.get(curr)! + 1);
      }
      return acc;
    }, {});
  });

  activeRoad: WritableSignal<TActiveRoad> = signal(
    CARS_TO_ACTIVE_ROADS['carsNs'],
  );

  constructor() {
    debugger;
    this._generateActiveRoad(this._timesSet());
    this._getCarsStream();
  }

  private _getTimesSet(): Signal<number[]> {
    return computed(() => {
      const set = new Set<number>([...this._carsNs(), ...this._carsEw()]);
      const sortedArray = Array.from(set).sort((a, b) => a - b);
      return sortedArray;
    });
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

  private _generateActiveRoad(timeSet: number[]): void {
    debugger;
    if (!timeSet.length) {
      return;
    }

    let currentActiveRoad: TActiveRoad | undefined;

    const reducingNs = () => {
      currentActiveRoad = CARS_TO_ACTIVE_ROADS['carsNs'];

      if (this._nsRoad().get(currentTime)! > 0) {
        this._nsRoad().set(currentTime, this._nsRoad().get(currentTime)! - 1);
      } else {
        this._nsRoad().delete(currentTime);
      }
    };

    const reducingEW = () => {
      currentActiveRoad = CARS_TO_ACTIVE_ROADS['carsEw'];

      if (this._esRoad().get(currentTime)! > 0) {
        this._esRoad().set(currentTime, this._esRoad().get(currentTime)! - 1);
      } else {
        this._esRoad().delete(currentTime);
      }
    };

    const currentTime: number = timeSet.shift()!;
    if (this._nsRoad().has(currentTime) && this._esRoad().has(currentTime)) {
      if (this._nsRoad().get(currentTime)! > this._esRoad().get(currentTime)!) {
        reducingNs();
      } else if (
        this._nsRoad().get(currentTime)! < this._esRoad().get(currentTime)!
      ) {
        reducingEW();
      } else {
        //EQUALS
        if (this.activeRoad() === 'NorthSouth') {
          reducingNs();
        } else {
          reducingEW();
        }
      }
    } else if (this._nsRoad().has(currentTime)) {
      reducingNs();
    } else {
      reducingEW();
    }

    if (currentActiveRoad && currentActiveRoad !== this.activeRoad()) {
      this._currentTimer.set(0);
      this.activeRoad.set(currentActiveRoad);
    } else {
      this._currentTimer.update((prev) => prev + 2);
    }

    setTimeout(() => this._generateActiveRoad(timeSet), 2000);
  }
}
