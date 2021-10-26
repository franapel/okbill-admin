import { useListContext } from "react-admin"
import Grid from '@mui/material/Grid'
import { makeStyles } from "@material-ui/styles"
import TableItem from "./TableItem";




const useStyles = makeStyles({
    table_grid: {
        alignItems: "center",
        margin: "0 2%"
    },
    table_grid_item: {
        position: "relative"
    }
})


const TableMap = ({ handleTableClick }) => {
    const classes = useStyles()
    const { ids, data } = useListContext()
    return (
        <Grid className={classes.table_grid} container columns={4}>
            {ids.map(id =>
                <Grid key={id} className={classes.table_grid_item} item xs={1}>
                    <TableItem tableData={data[id]} handleTableClick={handleTableClick} />
                </Grid>
            )}
        </Grid>
    )
}

export default TableMap