export const observer = {
  next: (value: any) => {
    console.log('next', value);
  },
  error: (value: any) => {
    console.log('error', value);
  },
  complete: () => {
    console.log('complete');
  },
};

// export function OfType(obs: Observable<any>) {
//   return obs.pipe(
//     map(obs=>)
//   )
// }
