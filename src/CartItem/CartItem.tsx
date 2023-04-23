import { Button } from "@mui/material";
import { CartltemType } from "../App";
import { Wrapper } from "./CartItem.styles";

type Props = {
  item: CartltemType;
  addtocart: (clickedItem: CartltemType) => void;
  removefromCart: (id: number) => void;
};

const CartItem: React.FC<Props> = ({ item, addtocart, removefromCart }) => (
  <Wrapper>
    <div>
      <h3>{item.title}</h3>
      <div className="information">
        <p>Price : ${item.price}</p>
        <p>Total : ${(item.amount * item.price).toFixed(2)}</p>
      </div>
      <div className="buttons">
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => addtocart(item)}>
          +
        </Button>
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => removefromCart(item.id)}>
          -
        </Button>
      </div>
      
    </div>
    <img src={item.image} alt="" />
  </Wrapper>
);

export default CartItem;
