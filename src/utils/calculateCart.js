import { initProdList } from '../initialItems';
import { renderBonusPts } from '../utils/renderBonusPts';
import { updateStockInfo } from '../utils/updateStockInfo';
import { createElement } from './createElement';

export const calculateCart = (totalAmount, itemCount, orderedList, paymentInfo, soldOutInfo) => {
  const cartItems = orderedList.children;
  var subTot = 0;
  for (var i = 0; i < cartItems.length; i++) {
    (function () {
      var curItem;
      for (let j = 0; j < initProdList.length; j++) {
        if (initProdList[j].id === cartItems[i].id) {
          curItem = initProdList[j];
          break;
        }
      }
      var q = parseInt(cartItems[i].querySelector('span').textContent.split('x ')[1]);
      var itemTot = curItem.price * q;
      var disc = 0;
      itemCount += q;
      subTot += itemTot;
      if (q >= 10) {
        if (curItem.id === 'p1') disc = 0.1;
        else if (curItem.id === 'p2') disc = 0.15;
        else if (curItem.id === 'p3') disc = 0.2;
        else if (curItem.id === 'p4') disc = 0.05;
        else if (curItem.id === 'p5') disc = 0.25;
      }
      totalAmount += itemTot * (1 - disc);
    })();
  }
  let discRate = 0;
  if (itemCount >= 30) {
    var bulkDisc = totalAmount * 0.25;
    var itemDisc = subTot - totalAmount;
    if (bulkDisc > itemDisc) {
      totalAmount = subTot * (1 - 0.25);
      discRate = 0.25;
    } else {
      discRate = (subTot - totalAmount) / subTot;
    }
  } else {
    discRate = (subTot - totalAmount) / subTot;
  }
  if (new Date().getDay() === 2) {
    totalAmount *= 1 - 0.1;
    discRate = Math.max(discRate, 0.1);
  }
  paymentInfo.textContent = '총액: ' + Math.round(totalAmount) + '원';
  if (discRate > 0) {
    const span = createElement('span', {
      className: 'text-green-500 ml-2',
      textContent: `(${(discRate * 100).toFixed(1)}% 할인 적용)`,
    });

    paymentInfo.appendChild(span);
  }
  updateStockInfo(soldOutInfo);
  renderBonusPts(paymentInfo, renderBonusPts);
};
