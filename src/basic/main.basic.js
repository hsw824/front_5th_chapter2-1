import { renderUi } from '../utils/renderUi';
import { setEventListener } from '../utils/setEventListener';
import { setTimer } from '../utils/setTimer';

const main = () => {
  renderUi();
  setEventListener();
  setTimer();
};

main();
