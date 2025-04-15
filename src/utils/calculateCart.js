import { renderBonusPts } from '../utils/renderBonusPts';
import { updateStockInfo } from '../utils/updateStockInfo';
import { createElement } from './createElement';
import { globalStore } from './globalStore';

export const calculateCart = () => {
  const { getState, setState } = globalStore;
  const { prodList } = getState();

  const orderedList = document.getElementById('cart-items');
  const paymentInfo = document.getElementById('cart-total');
  const soldOutInfo = document.getElementById('stock-status');

  if (!orderedList || !paymentInfo || !soldOutInfo) return;

  const cartItems = orderedList.children;

  // 임시 변수로 계산 결과 저장
  let newTotalAmount = 0;
  let newItemCount = 0;
  let subTot = 0;

  // 각 아이템 계산
  for (let i = 0; i < cartItems.length; i++) {
    let curItem;
    for (let j = 0; j < prodList.length; j++) {
      if (prodList[j].id === cartItems[i].id) {
        curItem = prodList[j];
        break;
      }
    }

    const q = parseInt(cartItems[i].querySelector('span').textContent.split('x ')[1]);
    const itemTot = curItem.price * q;
    let disc = 0;

    newItemCount += q;
    subTot += itemTot;

    if (q >= 10) {
      if (curItem.id === 'p1') disc = 0.1;
      else if (curItem.id === 'p2') disc = 0.15;
      else if (curItem.id === 'p3') disc = 0.2;
      else if (curItem.id === 'p4') disc = 0.05;
      else if (curItem.id === 'p5') disc = 0.25;
    }

    newTotalAmount += itemTot * (1 - disc);
  }

  // 할인율 계산
  let discRate = 0;
  if (newItemCount >= 30) {
    const bulkDisc = newTotalAmount * 0.25;
    const itemDisc = subTot - newTotalAmount;
    if (bulkDisc > itemDisc) {
      newTotalAmount = subTot * (1 - 0.25);
      discRate = 0.25;
    } else {
      discRate = (subTot - newTotalAmount) / subTot;
    }
  } else {
    discRate = (subTot - newTotalAmount) / subTot;
  }

  // 화요일 할인
  if (new Date().getDay() === 2) {
    newTotalAmount *= 1 - 0.1;
    discRate = Math.max(discRate, 0.1);
  }

  // 상태 한 번에 업데이트
  setState({
    totalAmount: newTotalAmount,
    itemCount: newItemCount,
  });

  // UI 업데이트
  paymentInfo.textContent = '총액: ' + Math.round(newTotalAmount) + '원';
  if (discRate > 0) {
    const span = createElement('span', {
      className: 'text-green-500 ml-2',
      textContent: `(${(discRate * 100).toFixed(1)}% 할인 적용)`,
    });
    paymentInfo.appendChild(span);
  }

  updateStockInfo();
  renderBonusPts();
};
