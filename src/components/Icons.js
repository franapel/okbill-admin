import { useState } from 'react';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending'
import PaymentIcon from '@mui/icons-material/Payment';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Popover = ({ msg }) => {
    return (
        <div style={{
            width: "max-content",
            height: "min-content",
            position: "absolute",
            top: "-75%",
            padding: "2px 7px",
            borderRadius: "5%",
            border: "1px solid",
            backgroundColor: "white"
        }}
        >
            {msg}
        </div>
    )
}

const Icons = ({ icon, msg, fontSize }) => {

    const [over, setOver] = useState(false)

    const handleIn = () => {
        setOver(true)
    }
    const handleOut = () => {
        setOver(false)
        if (timeout !== undefined) clearTimeout(timeout)
    }

    let timeout
    const handleClick = () => {
        setOver(true)
        if (timeout !== undefined) clearTimeout(timeout)
        timeout = setTimeout(() => {
            setOver(false)
        }, 1500)
    }

    return (
        <div style={{ position: "relative", display: "flex", justifyContent: "center" }}
            onMouseOver={handleIn} onMouseOut={handleOut} onClick={handleClick}>

            {icon === "cancel" && <CancelIcon color="error" sx={{ fontSize: fontSize }} />}
            {icon === "pay" && <PaymentIcon color="primary" sx={{ fontSize: fontSize }} />}
            {icon === "attention" && <EmojiPeopleIcon color="secondary" sx={{ fontSize: fontSize }} />}
            {icon === "pending" && <PendingIcon color="warning" sx={{ fontSize: fontSize }} />}
            {icon === "payed" && <AttachMoneyIcon color="success" sx={{ fontSize: fontSize }} />}
            {icon === "notpayed" && <MoneyOffIcon color="disabled" sx={{ fontSize: fontSize }} />}
            {icon === "served" && <CheckCircleOutlineIcon color="success" sx={{ fontSize: fontSize }} />}
            {(msg && over) && <Popover msg={msg} />}
        </div>
    )
}

export default Icons