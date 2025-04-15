import { updateSelOpts } from '../components/cart/productSelect';
import { initProdList } from '../initialItems';

export const suggestItemAlert = () => {
  const selectedProdId = initProdList[0].id;

  setTimeout(function () {
    setInterval(function () {
      if (selectedProdId) {
        const suggestItem = initProdList.find(function (item) {
          return item.id !== selectedProdId && item.quantity > 0;
        });
        if (suggestItem) {
          alert(suggestItem.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');
          suggestItem.price = Math.round(suggestItem.price * 0.95);
          //   updateSelOpts(prodSelect, initProdList);
        }
      }
    }, 60000);
  }, Math.random() * 20000);
};
