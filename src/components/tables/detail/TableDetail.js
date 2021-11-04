import { useGetList } from "react-admin"
import { Slide, Paper, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/styles"
import { getTime } from "../../Useful";
import UserItem from "./UserItem"
import CloseIcon from '@mui/icons-material/Close'

const useStyles = makeStyles({
    slide: {
        position: "relative",
        top: -10,
        width: "50%",
        height: "100%",
        padding: "15px 30px",
        overflowY: "auto"
    },
    close_icon_cont: {
        width: 40,
        height: 40,
        position: "absolute",
        top: 15,
        right: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: .5,
        borderRadius: "100%",
        "&:hover": {
            backgroundColor: "gainsboro",
            cursor: "pointer"
        }
    }
})

const TableDetail = ({ table, setOpen, open }) => {

    const classes = useStyles()

    const orders = useGetList("orders").data

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Slide direction="left" in={open} mountOnEnter unmountOnExit>
            <Paper className={classes.slide} elevation={4}>
                <div className={classes.close_icon_cont}>
                    <CloseIcon onClick={handleClose} />
                </div>
                
                <Typography variant="h4" gutterBottom style={{ marginLeft: -10 }}>
                    Mesa {table.id}
                </Typography>

                {orders[table.current_order] ?
                    <>
                        <Typography variant="body1" gutterBottom>
                            Llegada: {
                                getTime(orders[table.current_order].date).date + " " +
                                getTime(orders[table.current_order].date).fullTime
                            }
                        </Typography>
                        {orders[table.current_order].users.map(user =>
                            <UserItem key={user.user_id} user={user} />
                        )}
                    </>
                    : <Typography variant="h6">Libre</Typography>
                }
            </Paper>
        </Slide>
    )

}

export default TableDetail