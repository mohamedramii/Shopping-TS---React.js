import {
  Drawer,
  LinearProgress,
  Grid,
  Badge,
  CircularProgress,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useQuery } from "react-query";
import Item from "./Item/Item";
import Cart from "./Cart/Cart";
import { Wrapper, StyledButton } from "./App.styles";
import { useState } from "react";

export type CartltemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartltemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartltemType[]);
  const { data, isLoading, error } = useQuery<CartltemType[]>(
    "products",
    getProducts,
  );
  console.log(data);

  const getTotalItems = (items: CartltemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);
//#####################################################################
  const handleAddToCart = (clickedItem: CartltemType) => {

    setCartItems((prev) => {
      const isitemincart = prev.find((item) => item.id === clickedItem.id);
      if (isitemincart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item,
        );
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };
//#####################################################################

  const handleRemoveFromCart = (id:number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartltemType[])
    );
  };

  

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Something Went Wrong......</div>;
  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addtocart={handleAddToCart}
          removefromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error"></Badge>
        <AddShoppingCartIcon />
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
