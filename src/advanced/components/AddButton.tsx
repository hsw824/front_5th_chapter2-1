import { useProdListContext } from '../store/ProdListContext';

interface PropTypes {
  select: string;
}

const AddButton = ({ select }: PropTypes) => {
  const { prodList, setProdList } = useProdListContext();
  const handleClick = () => {
    const targetItem = prodList.find((item) => item.id === select);

    if (!targetItem || targetItem.quantity <= 0) return;

    setProdList(
      prodList.map((item) => {
        if (item.id === select) {
          return { ...item, cartCount: item.cartCount + 1, quantity: item.quantity - 1 };
        }
        return item;
      }),
    );
  };

  return (
    <button onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 rounded">
      추가
    </button>
  );
};

export default AddButton;
