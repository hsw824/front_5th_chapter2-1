import { createElement } from '../../utils/createElement';

export const updateSelOpts = (select, items) => {
  select.innerHTML = '';
  items.forEach(function (item) {
    const option = createElement('option', {
      value: item.id,
      textContent: `${item.name} - ${item.price}원`,
      disabled: item.quantity === 0,
    });

    select.appendChild(option);
  });
};
