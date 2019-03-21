import { loadApi } from '../../api';
import { command } from '../action';

const onStatusChange = async (args) => (await loadApi()).onStatusChange(args);

export default function (store) {
  onStatusChange(({id, status}) => {
    if (status !== 'INFO' && status !== 'ERROR') {
      store.dispatch(command.statusChange.emit.create({id, newStatus: status}));
    }
  })
    .catch(console.error);
}
