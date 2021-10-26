import { useGetList } from "react-admin"
import { ClickAwayListener, Slide, Paper, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/styles"
import { getTime } from "../../Useful";
import UserItem from "./UserItem"

const useStyles = makeStyles({
    slide: {
        position: "relative",
        top: -10,
        width: "50%",
        height: "100%",
        padding: "15px 30px",
    }
})

const TableDetail = ({ table, handleClickAway, open }) => {

    const classes = useStyles()

    const orders = useGetList("orders").data

    return (
        <ClickAwayListener onClickAway={handleClickAway}>

            <Slide direction="left" in={open} mountOnEnter unmountOnExit>

                <Paper className={classes.slide} elevation={4}>
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
        </ClickAwayListener>
    )

}

export default TableDetail