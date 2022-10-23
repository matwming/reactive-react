import { useAsyncPipe } from 'reactive-react';
import { state$ } from './state-management-examples';

const Child = () => {
  const _state: any = useAsyncPipe({ values$: state$ });

  return <div>The child id: {_state?.id}</div>;
};

export default Child;
