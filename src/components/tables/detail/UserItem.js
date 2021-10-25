import { useState } from "react"
import { ReferenceField } from "react-admin"
import { TextField } from "react-admin"
import { List as MuiList } from "@mui/material"
import Accordion from '@mui/material/Accordion'
import { makeStyles } from "@material-ui/styles"
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ProductItem from "./ProductItem"

const useStyles = makeStyles({
    item_head: {
        display: "flex",
        width: "100%"
    },
    item_head_pending: {
        alignSelf: "center",
        width: 12,
        height: 12,
        borderRadius: "100%",
        backgroundColor: "gold"
    }
})

const UserItem = ({ user }) => {

    const classes = useStyles()

    const [expanded, setExpanded] = useState(false)

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    function hasOrderPending() {
        const incompleteOrder = user.user_orders.find(order => !order.served)
        if (incompleteOrder) return true
        else return false
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
                {hasOrderPending() && <div className={classes.item_head_pending} />}
            </div>
        </AccordionSummary>


        <AccordionDetails sx={{ p: 0 }}>
            <MuiList disablePadding>
                {user.user_orders.map((productOrder, index) =>
                    <ProductItem key={index} productOrder={productOrder}/>
                )}
            </MuiList>
        </AccordionDetails>


    </Accordion>
}

export default UserItem