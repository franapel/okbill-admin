import { ReferenceField } from "react-admin"
import { TextField } from "react-admin"
import { ListItem } from "@mui/material"
import { Typography } from "@mui/material"
import { Button } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import PendingIcon from '@mui/icons-material/Pending'
import CancelIcon from '@mui/icons-material/Cancel';
import { getTime } from "../../Useful"


const ProductItem = ({ productOrder }) => {
    return (
        <ListItem sx={{ flexDirection: "column" }} divider>
            <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
                <Typography sx={{ width: "15%" }} variant="body2">{getTime(productOrder.date).time}</Typography>
                <Typography sx={{ width: "13%", textAlign: "end" }} variant="body2">{productOrder.quantity}x</Typography>
                <ReferenceField record={productOrder} source="product_id" reference="products">
                    <TextField source="name" style={{ fontSize: ".95rem", margin: 5 }} />
                </ReferenceField>
                <div style={{ display: "flex", marginLeft: "auto" }}>
                    {productOrder.req_cancel && <CancelIcon color="error" />}
                    {productOrder.served ?
                        <CheckCircleOutlineIcon color="success" variant="standard" />
                        : <PendingIcon color="warning" fontSize="medium" />}
                </div>
            </div>
            <p style={{ margin: "5% 0 0 auto" }}>
                Precio: 3000
            </p>
            {productOrder.req_cancel &&
                <div style={{ width: "100%", display: "flex", justifyContent: "space-evenly", margin: "5% 0" }}>
                    <Button variant="contained" size="small" color="error" >Anular</Button>
                    <Button variant="contained" size="small" color="secondary">Rechazar</Button>
                </div>}

        </ListItem>
    )
}
export default ProductItem