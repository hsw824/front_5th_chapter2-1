import AddButton from './components/AddButton';
import CartTitle from './components/CartTitle';
import Container from './components/Container';
import OrderedList from './components/OrderedList';
import PaymentInfo from './components/PaymentInfo';
import ProductSelect from './components/ProductSelect';
import SoldOutInfo from './components/SoldOutInfo';
import Wrapper from './components/Wrapper';

function App() {
  return (
    <Container>
      <Wrapper>
        <CartTitle />
        <OrderedList />
        <PaymentInfo />
        <ProductSelect />
        <AddButton />
        <SoldOutInfo />
      </Wrapper>
    </Container>
  );
}

export default App;
