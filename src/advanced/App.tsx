import AddButton from './components/AddButton';
import CartTitle from './components/CartTitle';
import Container from './components/Container';
import OrderedList from './components/OrderedList';
import PaymentInfo from './components/PaymentInfo';
import ProductSelect from './components/ProductSelect';
import SoldOutInfo from './components/SoldOutInfo';
import Wrapper from './components/Wrapper';
import ProdListProvider from './store/ProdListProvider';

import { useState } from 'react';

function App() {
  const [select, setSelect] = useState('p1');
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
  };
  return (
    <Container>
      <Wrapper>
        <ProdListProvider>
          <CartTitle />
          <OrderedList />
          <PaymentInfo />
          <ProductSelect select={select} handleChange={handleChange} />
          <AddButton select={select} />
          <SoldOutInfo />
        </ProdListProvider>
      </Wrapper>
    </Container>
  );
}

export default App;
