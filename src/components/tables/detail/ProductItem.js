import { useGetList } from "react-admin"
import { ReferenceField } from "react-admin"
import { TextField } from "react-admin"
import { ListItem } from "@mui/material"
import { Typography } from "@mui/material"
import { Button } from '@mui/material'
import { getTime } from "../../Useful"

import Icons from "../../Icons"


const ProductItem = ({ productOrder }) => {

    const products = useGetList("products").data

    return (
        <ListItem sx={{ flexDirection: "column" }} divider>
            <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
                <Typography sx={{ width: "15%" }} variant="body2">{getTime(productOrder.date).time}</Typography>
                <Typography sx={{ width: "13%", textAlign: "end" }} variant="body2">{productOrder.quantity}x</Typography>
                <ReferenceField record={productOrder} source="product_id" reference="products" style={{ display: "flex", margin: "0 5px" }}>
                    <TextField source="name" />
                </ReferenceField>
                <div style={{ display: "flex", marginLeft: "auto" }}>
                    {productOrder.req_cancel && <Icons icon="cancel"/>}
                    {productOrder.served ?
                        <Icons icon="served" />
                        : <Icons icon="pending" />}
                </div>
            </div>
            <div style={{width: "100%", display: "flex"}}>
                <p style={{margin: "10px 0 0 auto"}}>
                    {products[productOrder.product_id] && "$ " + products[productOrder.product_id].price * productOrder.quantity}
                </p>
            </div>

            {productOrder.req_cancel &&
                <div style={{ width: "100%", display: "flex", justifyContent: "space-evenly", margin: "5% 0" }}>
                    <Button variant="contained" size="small" color="error" >Anular</Button>
                    <Button variant="contained" size="small" color="secondary">Rechazar</Button>
                </div>}

        </ListItem>
    )
}
export default ProductItem