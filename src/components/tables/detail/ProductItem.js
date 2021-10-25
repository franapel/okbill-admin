import { ReferenceField } from "react-admin"
import { TextField } from "react-admin"
import { ListItem } from "@mui/material"
import { Typography } from "@mui/material"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import PendingIcon from '@mui/icons-material/Pending'
import { getTime } from "../../Useful"

const ProductItem = ({ productOrder }) => {
    return (
        <ListItem style={{ justifyContent: "space-between" }} divider>
            <Typography variant="body1">{getTime(productOrder.date).time}</Typography>
            <Typography variant="body1">{productOrder.quantity}</Typography>
            <ReferenceField record={productOrder} source="product_id" reference="products">
                <TextField source="name" />
            </ReferenceField>
            {productOrder.served ?
                <CheckCircleOutlineIcon color="success" fontSize="medium" />
                : <PendingIcon color="warning" fontSize="medium" />}
        </ListItem>
    )
}
export default ProductItem