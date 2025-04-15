import { createElement } from './createElement';

export const renderBonusPts = (paymentInfo, totalAmount) => {
  let purchasePoints = 0;

  purchasePoints = Math.floor(totalAmount / 1000);
  let ptsTag = document.getElementById('loyalty-points');
  if (!ptsTag) {
    ptsTag = createElement('span', { id: 'loyalty-points', className: 'text-blue-500 ml-2' });
    paymentInfo.appendChild(ptsTag);
  }
  ptsTag.textContent = '(포인트: ' + purchasePoints + ')';
};
