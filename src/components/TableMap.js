import { useState } from "react"
import { useGetList, useListContext, ReferenceField, TextField } from "react-admin"
import { ImageList, ImageListItem, ClickAwayListener, Slide, Paper } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { getLatestTableEvent, getTableImgSrc } from "./Useful";

const useStyles = makeStyles({
    image_list: {
        width: "60%",
        height: "fit-content"
    },
    image_number: {
        position: "absolute",
        left: "50%",
        bottom: "50%",
        transform: "translate(-50%, 0)"
    },
    slide: {
        width: "30%",
        height: "90vh",
        position: "absolute",
        top: 60,
        right: 0
    }
})


const TableMap = () => {
    const tableIds = useGetList('tables').ids;
    const { ids, data } = useListContext()
    const tablesHistory = ids.map(id => data[id])

    const classes = useStyles()

    const [openTableDetail, setOpenTableDetail] = useState(false)
    const [activatedTableClick, setActivatedTableClick] = useState(true)
    const [tableEventToShow, setTableEventToShow] = useState()

    
    function handleClick(tableId) {
        if (activatedTableClick && !openTableDetail) {
            setTableEventToShow(getLatestTableEvent(tableId, tablesHistory))
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
        <>
            <ImageList className={classes.image_list} cols={4}>
                {tableIds.map(tableId =>
                    <ImageListItem key={tableId}>
                        <img
                            src={getTableImgSrc(getLatestTableEvent(tableId, tablesHistory).state)}
                            alt="Mesa"
                            onClick={() => handleClick(tableId)} />
                        <div className={classes.image_number}>
                            {tableId}
                        </div>
                    </ImageListItem>
                ).reverse()}
            </ImageList>

            {openTableDetail && 
            <ClickAwayListener onClickAway={handleClickAway}>
                <Slide direction="left" in={openTableDetail} mountOnEnter unmountOnExit>
                    <Paper className={classes.slide} elevation={4}>
                        <p>ID tabla: <TextField record={tableEventToShow} source="table_id" /></p>
                        <p>Usuario: <ReferenceField record={tableEventToShow} source="user_id" reference="users">
                                <TextField source="name" />
                            </ReferenceField>
                        </p>
                        <p>Estado: <TextField record={tableEventToShow} source="state" /></p>
                        <p>Fecha: <TextField record={tableEventToShow} source="date" /></p>
                        <p>Pagado: <TextField record={tableEventToShow} source="payed" /></p>
                    </Paper>
                </Slide>
            </ClickAwayListener>}
        </>
    )
}

export default TableMap