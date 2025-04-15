import { updateSelOpts } from '../components/cart/productSelect';
import { calculateCart } from '../utils/calculateCart';
import { createElement } from '../utils/createElement';
import { flashSaleItemAlert } from '../utils/flashSaleItemAlert';
import { globalStore } from '../utils/globalStore';
import { suggestItemAlert } from '../utils/suggestItemAlert';

// TODO:createElement 유틸함수 작성 혹은 항목들 만드는 함수 작성 적어도 id className은 유틸로 잡을 수 있을 것 같음 이것들도 전역에 놓을 필요가 없을것 같은디
// id 모두 상수화 해도 될 것 같음

//initProdList까지 포함해서 state
const { getState } = globalStore;
const { prodList } = getState();

const prodSelect = createElement('select', { id: 'product-select', className: 'border rounded p-2 mr-2' });
const addProdBtn = createElement('button', {
  id: 'add-to-cart',
  className: 'bg-blue-500 text-white px-4 py-2 rounded',
  textContent: '추가',
});
const orderedList = createElement('div', { id: 'cart-items' });
const paymentInfo = createElement('div', { id: 'cart-total', className: 'text-xl font-bold my-4' });
const soldOutInfo = createElement('div', { id: 'stock-status', className: 'text-sm text-gray-500 mt-2' });

const renderUi = () => {
  const root = document.getElementById('app');

  const container = createElement('div', { className: 'bg-gray-100 p-8' });
  const wrapper = createElement('div', {
    className: 'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8',
  });
  const cartTitle = createElement('h1', { className: 'text-2xl font-bold mb-4', textContent: '장바구니' });

  updateSelOpts(prodSelect, prodList);

  wrapper.appendChild(cartTitle);
  wrapper.appendChild(orderedList);
  wrapper.appendChild(paymentInfo);
  wrapper.appendChild(prodSelect);
  wrapper.appendChild(addProdBtn);
  wrapper.appendChild(soldOutInfo);

  container.appendChild(wrapper);

  root.appendChild(container);
};

const setAddEventListener = () => {
  addProdBtn.addEventListener('click', function () {
    let selectedProdId = prodList[0].id;

    var selItem = prodSelect.value;

    var itemToAdd = prodList.find(function (p) {
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
      calculateCart(orderedList, paymentInfo, soldOutInfo);
      selectedProdId = selItem;
    }
  });

  orderedList.addEventListener('click', function (event) {
    var tgt = event.target;
    // if (tgt.classList.contains('quantity-change') || tgt.classList.contains('remove-item')) {
    var prodId = tgt.dataset.productId;
    var itemElem = document.getElementById(prodId);
    var prod = prodList.find(function (p) {
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
    calculateCart(orderedList, paymentInfo, soldOutInfo);
    // }
  });
};

const renderCartComponent = () => {
  renderUi();
  calculateCart(orderedList, paymentInfo, soldOutInfo);

  setAddEventListener();
  flashSaleItemAlert();
  suggestItemAlert();
};

renderCartComponent();
