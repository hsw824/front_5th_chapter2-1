import { initProdList } from '../initialItems';
import { createElement } from '../utils/createElement';

// TODO:createElement 유틸함수 작성 혹은 항목들 만드는 함수 작성 적어도 id className은 유틸로 잡을 수 있을 것 같음 이것들도 전역에 놓을 필요가 없을것 같은디
// id 모두 상수화 해도 될 것 같음

const prodSelect = createElement('select', { id: 'product-select', className: 'border rounded p-2 mr-2' });
const addProdBtn = createElement('button', {
  id: 'add-to-cart',
  className: 'bg-blue-500 text-white px-4 py-2 rounded',
  textContent: '추가',
});
const orderedList = createElement('div', { id: 'cart-items' });
const paymentInfo = createElement('div', { id: 'cart-total', className: 'text-xl font-bold my-4' });
const soldOutInfo = createElement('div', { id: 'stock-status', className: 'text-sm text-gray-500 mt-2' });

let selectedProdId = initProdList[0].id;
let purchasePoints = 0;
let totalAmount = 0;
let itemCount = 0;

const renderCartComponent = () => {
  const root = document.getElementById('app');

  const container = createElement('div', { className: 'bg-gray-100 p-8' });
  const wrapper = createElement('div', {
    className: 'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8',
  });
  const cartTitle = createElement('h1', { className: 'text-2xl font-bold mb-4', textContent: '장바구니' });

  updateSelOpts();

  wrapper.appendChild(cartTitle);
  wrapper.appendChild(orderedList);
  wrapper.appendChild(paymentInfo);
  wrapper.appendChild(prodSelect);
  wrapper.appendChild(addProdBtn);
  wrapper.appendChild(soldOutInfo);

  container.appendChild(wrapper);

  root.appendChild(container);

  calculateCart();

  // 코드 분리 및 매직넘버 구분만 해주면 될 듯
  setTimeout(function () {
    setInterval(function () {
      const flashSaleItem = initProdList[Math.floor(Math.random() * initProdList.length)];
      if (Math.random() < 0.3 && flashSaleItem.quantity > 0) {
        flashSaleItem.price = Math.round(flashSaleItem.price * 0.8);
        alert('번개세일! ' + flashSaleItem.name + '이(가) 20% 할인 중입니다!');
        updateSelOpts();
      }
    }, 30000);
  }, Math.random() * 10000);

  setTimeout(function () {
    setInterval(function () {
      if (selectedProdId) {
        const suggestItem = initProdList.find(function (item) {
          return item.id !== selectedProdId && item.quantity > 0;
        });
        if (suggestItem) {
          alert(suggestItem.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');
          suggestItem.price = Math.round(suggestItem.price * 0.95);
          updateSelOpts();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
};
//updateSelOpts 이거는 일단 생각나는거 없으니까 나중에 다시
const updateSelOpts = () => {
  prodSelect.innerHTML = '';
  initProdList.forEach(function (item) {
    // option도 조금 구림
    const option = createElement('option', {
      value: item.id,
      textContent: `${item.name} - ${item.price}원`,
      disabled: item.quantity === 0,
    });

    prodSelect.appendChild(option);
  });
};

const calculateCart = () => {
  totalAmount = 0;
  itemCount = 0;
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
  updateStockInfo();
  renderBonusPts();
};

const renderBonusPts = () => {
  purchasePoints = Math.floor(totalAmount / 1000);
  let ptsTag = document.getElementById('loyalty-points');
  if (!ptsTag) {
    ptsTag = createElement('span', { id: 'loyalty-points', className: 'text-blue-500 ml-2' });
    paymentInfo.appendChild(ptsTag);
  }
  ptsTag.textContent = '(포인트: ' + purchasePoints + ')';
};

function updateStockInfo() {
  var infoMsg = '';
  initProdList.forEach(function (item) {
    if (item.quantity < 5) {
      infoMsg += item.name + ': ' + (item.quantity > 0 ? '재고 부족 (' + item.quantity + '개 남음)' : '품절') + '\n';
    }
  });
  soldOutInfo.textContent = infoMsg;
}
renderCartComponent();

addProdBtn.addEventListener('click', function () {
  var selItem = prodSelect.value;

  var itemToAdd = initProdList.find(function (p) {
    return p.id === selItem;
  });

  if (itemToAdd && itemToAdd.quantity > 0) {
    var item = document.getElementById(itemToAdd.id);
    if (item) {
      var newQty = parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;
      if (newQty <= itemToAdd.quantity) {
        item.querySelector('span').textContent = itemToAdd.name + ' - ' + itemToAdd.price + '원 x ' + newQty;
        itemToAdd.quantity--;
      } else {
        alert('재고가 부족합니다.');
      }
    } else {
      const newItemInnerHTML = `<span>${itemToAdd.name} - ${itemToAdd.price}원 x 1</span><div><button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="-1">-</button><button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="1">+</button><button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${itemToAdd.id}">삭제</button></div>`;
      const newItem = createElement('div', {
        id: itemToAdd.id,
        className: 'flex justify-between items-center mb-2',
        innerHTML: newItemInnerHTML,
      });

      orderedList.appendChild(newItem);
      itemToAdd.quantity--;
    }
    calculateCart();
    selectedProdId = selItem;
  }
});

orderedList.addEventListener('click', function (event) {
  var tgt = event.target;
  // if (tgt.classList.contains('quantity-change') || tgt.classList.contains('remove-item')) {
  var prodId = tgt.dataset.productId;
  var itemElem = document.getElementById(prodId);
  var prod = initProdList.find(function (p) {
    return p.id === prodId;
  });

  if (tgt.classList.contains('quantity-change')) {
    var qtyChange = parseInt(tgt.dataset.change);
    var newQty = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]) + qtyChange;
    if (newQty > 0 && newQty <= prod.quantity + parseInt(itemElem.querySelector('span').textContent.split('x ')[1])) {
      itemElem.querySelector('span').textContent =
        itemElem.querySelector('span').textContent.split('x ')[0] + 'x ' + newQty;
      prod.quantity -= qtyChange;
    } else if (newQty <= 0) {
      itemElem.remove();
      prod.quantity -= qtyChange;
    } else {
      alert('재고가 부족합니다.');
    }
  } else if (tgt.classList.contains('remove-item')) {
    var remQty = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]);
    prod.quantity += remQty;
    itemElem.remove();
  }
  calculateCart();
  // }
});
