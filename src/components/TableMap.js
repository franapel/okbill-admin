import { useState } from "react"
import { useGetList, useListContext, ReferenceField, TextField } from "react-admin"
import { ImageList, ImageListItem, ClickAwayListener, Slide, Paper, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { getTableImgSrc, getTimeAndMid } from "./Useful";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { List as MuiList, ListItem } from "@mui/material"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PendingIcon from '@mui/icons-material/Pending';

const useStyles = makeStyles({
    list_container: {
        display: "flex",
        height: "70vh"
    },
    image_list: {
        width: "60%",
        height: "fit-content",
        margin: "auto"
    },
    image_number: {
        position: "absolute",
        left: "50%",
        bottom: "50%",
        transform: "translate(-50%, 0)"
    },
    slide: {
        width: "30%",
        height: "100%",
        position: "relative",
        top: -10,
        padding: "15px 30px"
    },

    user_order_item: {
        margin: 0,
        width: "100%",
        display: "flex",
        justifyContent: "space-around"
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
            <ImageList className={classes.image_list} cols={4} gap={100}>
                {ids.map(id =>
                    <ImageListItem key={id}>
                        <img
                            src={getTableImgSrc(data[id].state)}
                            alt="Mesa"
                            onClick={() => handleClick(id)} />
                        <div className={classes.image_number}>
                            {id}
                        </div>
                    </ImageListItem>
                )}
            </ImageList>

            {openTableDetail &&
                <ClickAwayListener onClickAway={handleClickAway}>
                    <Slide direction="left" in={openTableDetail} mountOnEnter unmountOnExit>
                        <Paper className={classes.slide} elevation={4}>
                            <Typography variant="h4" gutterBottom style={{ marginLeft: -10 }}>
                                Mesa {tableToShow.id}
                            </Typography>
                            {orders[tableToShow.current_order] ?
                                <>
                                    <Typography variant="body1" gutterBottom>
                                        Hora de llegada: {
                                            getTimeAndMid(orders[tableToShow.current_order].date).time + " " +
                                            getTimeAndMid(orders[tableToShow.current_order].date).mid
                                        }
                                    </Typography>
                                    {orders[tableToShow.current_order].users.map(user => 
                                        <UserExpandable orderUser={user} />
                                    )}
                                    
                                </>
                                : <Typography variant="h6">Libre</Typography>
                            }

                        </Paper>
                    </Slide>
                </ClickAwayListener>
            }

        </div>
    )
}

const UserExpandable = ({ orderUser }) => {
    const classes = useStyles()

    const [expanded, setExpanded] = useState(false)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
        >
            <ReferenceField record={orderUser} source="user_id" reference="users" link={false} sx={{ width: '33%', flexShrink: 0 }}>
                <TextField source="name" />
            </ReferenceField>
        </AccordionSummary>
        <AccordionDetails>
            <MuiList >
                {console.log(orderUser.user_orders)}
                {orderUser.user_orders.map(userOrder =>
                    <ListItem className={classes.user_order_item} divider sx={{justifyContent: "space-between"}}>
                        <Typography variant="body1">{getTimeAndMid(userOrder.date).time}</Typography>
                        <Typography variant="body1">{userOrder.quantity}</Typography>
                        <ReferenceField record={userOrder} source="product_id" reference="products" sx={{ width: '33%', flexShrink: 0 }}>
                            <Typography variant="body1"><TextField source="name" /></Typography>
                        </ReferenceField>
                        {userOrder.completed ?
                            <CheckCircleOutlineIcon color="success" fontSize="large"/>
                            : <PendingIcon color="warning" fontSize="large"/> }
                    </ListItem>
                )}

            </MuiList>
        </AccordionDetails>
    </Accordion>
}

export default TableMap