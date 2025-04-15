const setAddEventListener = () => {
  addProdBtn.addEventListener('click', function () {
    let selectedProdId = initProdList[0].id;

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
      calculateCart(totalAmount, itemCount, orderedList, paymentInfo, soldOutInfo);
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
    calculateCart(totalAmount, itemCount, orderedList, paymentInfo, soldOutInfo);
    // }
  });
};
