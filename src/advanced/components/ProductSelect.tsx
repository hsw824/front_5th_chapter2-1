import ProductSelectItem from './ProductSelectItem';

import { useProdListContext } from '../store/ProdListContext';

interface PropsType {
  select: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ProductSelect = ({ select, handleChange }: PropsType) => {
  const { prodList } = useProdListContext();
  return (
    <select className="border rounded p-2 mr-2" onChange={handleChange} value={select}>
      {prodList.map((item) => {
        return <ProductSelectItem key={item.id} {...item} />;
      })}
    </select>
  );
};

export default ProductSelect;
