// import { initProdList } from '../initialItems';
import { globalStore } from './globalStore';

let timer = null;

export const flashSaleItemAlert = () => {
  const { prodList } = globalStore.getState();

  if (!timer) {
    setTimeout(function () {
      timer = setInterval(function () {
        const flashSaleItem = prodList[Math.floor(Math.random() * prodList.length)];
        if (Math.random() < 0.3 && flashSaleItem.quantity > 0) {
          flashSaleItem.price = Math.round(flashSaleItem.price * 0.8);
          alert('번개세일! ' + flashSaleItem.name + '이(가) 20% 할인 중입니다!');
          // updateSelOpts(prodSelect, initProdList);
        }
      }, 30000);
    }, Math.random() * 10000);
  } else {
    clearTimeout(timer);
  }
};
