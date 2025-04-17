import ProductSelectItem from './ProductSelectItem';
import { prodList } from '../constants/initialValue';

const ProductSelect = () => {
  return (
    <select className="border rounded p-2 mr-2">
      {prodList.map((item) => {
        return <ProductSelectItem key={item.id} {...item} />;
      })}
    </select>
  );
};

export default ProductSelect;
