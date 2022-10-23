import { useEffect, useState } from 'react';
import { Observable, Subject, takeUntil } from 'rxjs';

/**
 * @values: accepts an observable
 * **/

function useAsyncPipe({ values$ }: { values$: Observable<any> }) {
  const [value, setValue] = useState(null);
  const stop$ = new Subject<void>();

  useEffect(() => {
    const sub = values$.pipe(takeUntil(stop$)).subscribe((value: any) => {
      setValue(value);
    });

    return () => {
      stop$.next();
      stop$.complete();
    };
  }, []);

  return value;
}

export default useAsyncPipe;
