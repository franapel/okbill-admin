import { useGetList } from "react-admin"
import { makeStyles } from "@material-ui/styles"
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending'
import PaymentIcon from '@mui/icons-material/Payment';
import { fabClasses } from "@mui/material";

// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
// import PendingIcon from '@mui/icons-material/Pending'

const useStyles = makeStyles({
    table: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "45%",
        aspectRatio: "1/1",
        borderRadius: "20%",
        color: "white"
    },
    chair: {
        position: "absolute",
        width: "22%",
        aspectRatio: "1/1",
        borderRadius: "10%",
        backgroundColor: "gainsboro"
    },
    icon_container: {
        position: "absolute",
        top: "130%"
    }
})

const TableItem = ({ tableData, handleTableClick }) => {

    const orders = useGetList("orders").data

    const classes = useStyles()

    function orderState() {
        let hasReqCancel
        let isServed
        const order = orders[tableData.current_order]
        if (order) {
            hasReqCancel = order.users.find(user => {
                if(user.user_orders.find(userOrder => userOrder.req_cancel)) return true
            })
            const notServed = order.users.find(user => {
                if(user.user_orders.find(userOrder => !userOrder.served)) return true
            })
            if (notServed) isServed = false
            else isServed = true
        }
        return { hasReqCancel, isServed }
    }

    function userState() {
        let reqAttention
        let reqPay
        let notPayed
        const order = orders[tableData.current_order]
        if (order) {
            reqAttention = order.users.find(user => user.request_attention)
            reqPay = order.users.find(user => user.request_pay)
            notPayed = order.users.find(user => !user.payed)
        }
        return { reqAttention, reqPay, notPayed }
    }

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={classes.table}
                style={{ backgroundColor: tableData.state === "free" ? "mediumseagreen" : "steelblue" }}
                onClick={() => handleTableClick(tableData)} >

                <p style={{ fontSize: "2.5vw", position: "absolute" }}>{tableData.id}</p>
                <div className={classes.chair} style={{ top: "20%", right: "-25%" }} />
                <div className={classes.chair} style={{ top: "20%", left: "-25%" }} />
                <div className={classes.chair} style={{ bottom: "20%", right: "-25%" }} />
                <div className={classes.chair} style={{ bottom: "20%", left: "-25%" }} />
                <div className={classes.chair} style={{ top: "-25%", right: "20%" }} />
                <div className={classes.chair} style={{ top: "-25%", left: "20%" }} />
                <div className={classes.chair} style={{ bottom: "-25%", right: "20%" }} />
                <div className={classes.chair} style={{ bottom: "-25%", left: "20%" }} />
            </div>

            { tableData.state === "seated" && <div className={classes.icon_container} >
                {orderState().hasReqCancel &&  <CancelIcon sx={{ fontSize: "2.4vw" }} color="error"/>}
                {userState().reqAttention && <EmojiPeopleIcon sx={{ fontSize: "2.4vw" }} color="secondary"/>}
                {orderState().isServed === false &&  <PendingIcon sx={{ fontSize: "2.4vw" }} color="warning" />}                
                {userState().reqPay && <PaymentIcon sx={{ fontSize: "2.4vw" }} color="primary"/>}
                {userState().notPayed ? <MoneyOffIcon sx={{ fontSize: "2.4vw" }}/>
                    : <AttachMoneyIcon sx={{ fontSize: "2.4vw" }} color="success" />}
            </div>}
        </div>
    )
}



export default TableItem