import { useState } from "react"
import { useGetList, useListContext, ReferenceField, TextField } from "react-admin"
import { ClickAwayListener, Slide, Paper, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/styles"
import { getTimeAndMid } from "./Useful";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { List as MuiList, ListItem } from "@mui/material"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PendingIcon from '@mui/icons-material/Pending';
import Grid from '@mui/material/Grid'

const useStyles = makeStyles({
    list_container: {
        display: "flex",
        height: "70vh"
    },
    table_grid: {
        alignContent: "center",
        padding: "0 5%"
    },
    table_grid_item: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        padding: "0 5%"
    },
    chair: {
        width: "22%",
        aspectRatio: "1/1",
        backgroundColor: "gainsboro",
        position: "absolute",
        borderRadius: "10%"
    },
    image_number: {
        position: "absolute",
        left: "50%",
        bottom: "50%"
    },
    slide: {
        width: "40%",
        height: "100%",
        position: "relative",
        top: -10,
        padding: "15px 30px"
    },

    user_order_item: {
    }
})


const TableMap = () => {
    const { ids, data } = useListContext()
    const orders = useGetList("orders").data

    const classes = useStyles()

    const [openTableDetail, setOpenTableDetail] = useState(false)
    const [activatedTableClick, setActivatedTableClick] = useState(true)
    const [tableToShow, setTableToShow] = useState()


    function handleClick(tableId) {
        if (activatedTableClick && !openTableDetail) {
            setTableToShow(data[tableId])
            setOpenTableDetail(true)
            setActivatedTableClick(false)
        }
    }

    let timeout
    function handleClickAway() {
        if (openTableDetail) {
            if (timeout !== undefined) clearTimeout(timeout)
            timeout = setTimeout(() => {
                setOpenTableDetail(false)
                setActivatedTableClick(true)
            }, 50)
        }
    }

    return (
        <div className={classes.list_container}>
            <Grid className={classes.table_grid} container columns={4}>
                {ids.map(id =>
                    <Grid className={classes.table_grid_item} item xs={1} key={id} >
                        <div style={{
                            width: "10vw",
                            backgroundColor: data[id].state === "free" ? "mediumseagreen" : "steelblue",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "white",
                            borderRadius: "20%",
                            position: "relative",
                            aspectRatio: "1/1"
                        }} onClick={() => handleClick(id)} >
                            {id}
                            <div className={classes.chair} style={{ top: "20%", right: "-25%" }} />
                            <div className={classes.chair} style={{ top: "20%", left: "-25%" }} />
                            <div className={classes.chair} style={{ bottom: "20%", right: "-25%" }} />
                            <div className={classes.chair} style={{ bottom: "20%", left: "-25%" }} />
                            <div className={classes.chair} style={{ top: "-25%", right: "20%" }} />
                            <div className={classes.chair} style={{ top: "-25%", left: "20%" }} />
                            <div className={classes.chair} style={{ bottom: "-25%", right: "20%" }} />
                            <div className={classes.chair} style={{ bottom: "-25%", left: "20%" }} />
                        </div>
                    </Grid>
                )}
            </Grid>

            {
                openTableDetail &&
                <ClickAwayListener onClickAway={handleClickAway}>
                    <Slide direction="left" in={openTableDetail} mountOnEnter unmountOnExit>
                        <Paper className={classes.slide} elevation={4}>
                            <Typography variant="h4" gutterBottom style={{ marginLeft: -10 }}>
                                Mesa {tableToShow.id}
                            </Typography>
                            {orders[tableToShow.current_order] ?
                                <>
                                    <Typography variant="body1" gutterBottom>
                                        Llegada: {
                                            getTimeAndMid(orders[tableToShow.current_order].date).time + " " +
                                            getTimeAndMid(orders[tableToShow.current_order].date).mid
                                        }
                                    </Typography>
                                    {orders[tableToShow.current_order].users.map(user =>
                                        <UserExpandable key={user.user_id} orderUser={user} />
                                    )}

                                </>
                                : <Typography variant="h6">Libre</Typography>
                            }

                        </Paper>
                    </Slide>
                </ClickAwayListener>
            }

        </div >
    )
}

const UserExpandable = ({ orderUser }) => {
    const classes = useStyles()

    const [expanded, setExpanded] = useState(false)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    function isUserOrderPending() {
        const incompleteOrder = orderUser.user_orders.find(order => !order.completed)
        if (incompleteOrder) return true
        else return false
    }

    return <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            
        >
            <div style={{ display: "flex", width: "100%",justifyContent: "space-between" }}>
                <ReferenceField record={orderUser} source="user_id" reference="users" link={false}>
                    <TextField source="name" />
                </ReferenceField>
                {isUserOrderPending() &&
                <div style={{width: 12, height: 12, backgroundColor:"gold", borderRadius:"100%", alignSelf:"center"}}/>}
            </div>

        </AccordionSummary>
        <AccordionDetails>
            <MuiList >
                {orderUser.user_orders.map((userOrder, i) =>
                    <ListItem key={i} className={classes.user_order_item} divider style={{ justifyContent: "space-between" }}>
                        <Typography variant="body1">{getTimeAndMid(userOrder.date).time}</Typography>
                        <Typography variant="body1">{userOrder.quantity}</Typography>
                        <ReferenceField record={userOrder} source="product_id" reference="products" sx={{ width: '33%', flexShrink: 0 }}>
                            <TextField source="name" />
                        </ReferenceField>
                        {userOrder.completed ?
                            <CheckCircleOutlineIcon color="success" fontSize="large" />
                            : <PendingIcon color="warning" fontSize="large" />}
                    </ListItem>
                )}

            </MuiList>
        </AccordionDetails>
    </Accordion>
}

export default TableMap