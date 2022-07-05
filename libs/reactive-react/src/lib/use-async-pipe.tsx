import { useEffect, useState } from "react";
/**
 * @values: this is an observable value
 *
 * **/

interface IValues$ {
  subscribe: (value: any) => any
}

export function AsyncPipe({ values$ }:{values$:IValues$}) {
  const [value, setValue] = useState(null);
  useEffect(() => {
    const sub = values$.subscribe((value:any) => {
      //console.log("storeValue", value);
      setValue(value);
    });

    return () => {
      if (sub) {
        sub.unsubscribe();
      }
    };
  }, []);

  return value;
}

