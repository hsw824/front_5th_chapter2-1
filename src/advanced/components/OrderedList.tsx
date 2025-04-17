import OrderedItem from './OrderdItem';

import { useProdListContext } from '../store/ProdListContext';

const OrderedList = () => {
  const { prodList } = useProdListContext();
  return (
    <div>
      {prodList
        .filter((item) => item.cartCount > 0)
        .map((item) => {
          return <OrderedItem key={item.id} {...item} prodList={prodList} />;
        })}
    </div>
  );
};

export default OrderedList;
