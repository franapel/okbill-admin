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
    const [activatedTableClick, setActivatedTableClick] = useState(true)
    const [tableToShow, setTableToShow] = useState()

    function handleTableClick(table) {
        if (activatedTableClick && !openTableDetail) {
            setTableToShow(table)
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
            <TableMap handleTableClick={handleTableClick} />
            {
                openTableDetail &&
                <TableDetail table={tableToShow} handleClickAway={handleClickAway} open={openTableDetail} />
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

