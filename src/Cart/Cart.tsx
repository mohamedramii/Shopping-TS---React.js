import CartItem from "../CartItem/CartItem";
import { Wrapper } from "./Cart.styles";
import { CartltemType } from "../App";

type Props = {
  cartItems: CartltemType[];
  addtocart: (clickedItem: CartltemType) => void;
  removefromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addtocart, removefromCart }) => {
  const calculateTotal = (items: CartltemType[]) =>
  items.reduce((ack: number, item) => ack + item.amount * item.price, 0);
  return (
    <Wrapper>
      <h2>your Shopping cart</h2>
      {cartItems.length === 0 ? <p>No Items in cart</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addtocart={addtocart}
          removefromCart={removefromCart}
        />
      ))}
            <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </Wrapper>
  );
};

export default Cart;
