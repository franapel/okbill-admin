import { useState } from "react"
import { ReferenceField } from "react-admin"
import { TextField } from "react-admin"
import { useGetList } from "react-admin"
import { List as MuiList } from "@mui/material"
import { ListItem } from "@mui/material"
import { Typography } from "@mui/material"
import { Button } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import { makeStyles } from "@material-ui/styles"
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ProductItem from "./ProductItem"

import Icons from "../../Icons"

const useStyles = makeStyles({
    item_head: {
        width: "100%",
        display: "flex",
        alignItems: "center"
    },
    icon_container: {
        display: "flex"
    }
})

const UserItem = ({ user }) => {

    const classes = useStyles()

    const products = useGetList("products").data

    const [expanded, setExpanded] = useState(false)

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    function orderState() {
        let hasReqCancel
        let isServed

        hasReqCancel = user.user_orders.find(userOrder => userOrder.req_cancel)
        const notServed = user.user_orders.find(userOrder => userOrder.served)
        if (notServed) isServed = false
        else isServed = true

        return { hasReqCancel, isServed }
    }

    function totalPrice() {
        let total = 0

        user.user_orders.forEach(order => {
            const product = products[order.product_id]
            if (product) {
                total += product.price * order.quantity
            }
        })

        return total
    }


    return <Accordion expanded={expanded === 'panel1'} onChange={handleAccordionChange('panel1')}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header">

            <div className={classes.item_head} style={{ justifyContent: "space-between" }}>
                <ReferenceField record={user} source="user_id" reference="users" link={false}>
                    <TextField source="name" />
                </ReferenceField>
                <div className={classes.icon_container} >
                    {orderState().hasReqCancel && <Icons icon="cancel" msg="Anular" />}
                    {user.request_pay && <Icons icon="pay" msg="Pagar" />}
                    {user.request_attention && <Icons icon="attention" msg="Atención"/>}
                    {orderState().isServed === false && <Icons icon="pending" msg="Pendiente" />}
                    {user.payed ? <Icons icon="payed" msg="Pagado" />
                        : <Icons icon="notpayed" msg="Impago" />}
                </div>
            </div>
        </AccordionSummary>


        <AccordionDetails sx={{ p: 0 }}>
            <MuiList disablePadding>

                {user.user_orders.map((productOrder, index) =>
                    <ProductItem key={index} productOrder={productOrder} />
                )}

                <ListItem style={{ paddingTop: "40px", flexDirection: "column" }}>
                    <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
                        <Typography variant="body1">Total precuenta: </Typography>
                        <Typography style={{ marginLeft: "auto", color: "limegreen" }} variant="h6">
                            $ {totalPrice()}
                        </Typography>
                    </div>
                    {!user.payed && <Button variant="contained" size="small" color="success" sx={{ mt: 2, mb: 1 }}>
                        Imprimir
                    </Button>}

                </ListItem>

            </MuiList>
        </AccordionDetails>


    </Accordion>
}

export default UserItem