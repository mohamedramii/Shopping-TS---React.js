import { Button } from '@mui/material';
//types
import {CartltemType} from '../App'
//styles 
import {Wrapper} from './Item.styles'

type Props ={
    item:CartltemType
    handleAddToCart:(clickedItem:CartltemType) => void;
}

const Item:React.FC<Props> = ({item , handleAddToCart}) => (
    <Wrapper>

    <img src={item.image} />
    <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h3>{item.price}</h3>
    <Button onClick={()=> handleAddToCart(item)}>Add to cart</Button>
    </div>
    </Wrapper>
);

    
  


export default Item