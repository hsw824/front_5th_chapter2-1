import { flashSaleItemAlert } from '../utils/flashSaleItemAlert';
import { suggestItemAlert } from '../utils/suggestItemAlert';

export const setTimer = () => {
  flashSaleItemAlert();
  suggestItemAlert();
};
