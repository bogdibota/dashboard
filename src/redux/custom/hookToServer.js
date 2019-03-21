import { loadApi } from '../../api';
import { command } from '../action';

const onStatusChange = async (args) => (await loadApi()).onStatusChange(args);

export default function (store) {
  onStatusChange(({id, status, data}) => {
    if (status !== 'INFO' && status !== 'ERROR') {
      store.dispatch(command.statusChange.emit.create({id, newStatus: status}));
    } else {
      store.dispatch(command.logsChange.emit.create({id, newLog: {status: status, data}}));
    }
  })
    .catch(console.error);
}
