import { flashSaleItemAlert } from '../utils/flashSaleItemAlert';
import { renderUi } from '../utils/renderUi';
import { setEventListener } from '../utils/setEventListener';
import { suggestItemAlert } from '../utils/suggestItemAlert';

const main = () => {
  renderUi();
  setEventListener();
  flashSaleItemAlert();
  suggestItemAlert();
};

main();
