import { useListContext } from "react-admin"
import Grid from '@mui/material/Grid'
import { makeStyles } from "@material-ui/styles"
import TableItem from "./TableItem";

// import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
// import LocalDiningIcon from '@mui/icons-material/LocalDining';
// import MoneyOffIcon from '@mui/icons-material/MoneyOff';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import CancelIcon from '@mui/icons-material/Cancel';


const useStyles = makeStyles({
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
    }
})


const TableMap = ({ handleTableClick }) => {
    const classes = useStyles()
    const { ids, data } = useListContext()
    return (
        <Grid className={classes.table_grid} container columns={4}>
            {ids.map(id =>
                <Grid className={classes.table_grid_item} item xs={1} key={id} >
                    <TableItem tableData={data[id]} handleTableClick={handleTableClick} />
                </Grid>
            )}
        </Grid>
    )
}

export default TableMap