import { initProdList } from '../initialItems';

export function updateStockInfo(soldOutInfo) {
  var infoMsg = '';
  initProdList.forEach(function (item) {
    if (item.quantity < 5) {
      infoMsg += item.name + ': ' + (item.quantity > 0 ? '재고 부족 (' + item.quantity + '개 남음)' : '품절') + '\n';
    }
  });
  soldOutInfo.textContent = infoMsg;
}
