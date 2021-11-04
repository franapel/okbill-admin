import { useState } from "react"
import { List } from "react-admin"
import { makeStyles } from "@material-ui/styles"
import TableMap from "./map/TableMap"
import TableDetail from "./detail/TableDetail"

const useStyles = makeStyles({
    list_container: {
        display: "flex",
        height: "70vh"
    }
})

const ListContent = () => {
    const classes = useStyles()

    const [openTableDetail, setOpenTableDetail] = useState(false)
    const [tableToShow, setTableToShow] = useState()

    function handleTableClick(table) {
        if (!openTableDetail) {
            setOpenTableDetail(true)
        }
        setTableToShow(table)
    }
    
    return (
        <div className={classes.list_container}>
            <TableMap handleTableClick={handleTableClick} />
            {
                openTableDetail &&
                <TableDetail table={tableToShow} setOpen={setOpenTableDetail} open={openTableDetail} />
            }
        </div >
    )
}

const TableList = (props) => {

    return (
        <List pagination={null} {...props}>
            <ListContent/>
        </List>
    )
}
export default TableList

