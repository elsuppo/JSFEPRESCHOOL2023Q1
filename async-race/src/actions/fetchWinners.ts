import { getWinners } from '../api/requests';
import winnersStore from '../store/winnersStore';

const fetchWinners = async () => {
  try {
    const { page, sort, order } = winnersStore.getState();
    const { data, count } = await getWinners(page, sort, order);
    winnersStore.dispatch({ type: 'FETCH', payload: data, count });
  } catch (error) {
    winnersStore.dispatch({ type: 'FETCH_ERROR', error: error as string });
  }
};

export default fetchWinners;
