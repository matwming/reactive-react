import {
  BehaviorSubject,
  concatMap,
  Observable,
  shareReplay,
  ShareReplayConfig,
  take,
  tap,
} from 'rxjs';

class CacheHttp {
  constructor(
    private replayConfig: ShareReplayConfig,
    private api$: Observable<any>
  ) {
    this.replayConfig = replayConfig;
    this.api$ = api$;
  }

  createShared() {
    return this.api$.pipe(
      shareReplay({
        windowTime: this.replayConfig.windowTime,
        bufferSize: this.replayConfig.bufferSize,
        refCount: this.replayConfig.refCount ?? false,
      })
    );
  }

  private sharedSupplier = new BehaviorSubject(this.createShared());

  public cache$ = this.sharedSupplier.pipe(
    concatMap((shared$) =>
      shared$.pipe(
        tap({ complete: () => this.sharedSupplier.next(this.createShared()) })
      )
    ),
    take(1) // emit once and complete so subscribers don't receive values from newly created shared Observables
  );
}

export default CacheHttp;
