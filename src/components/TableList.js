
import { useHistory } from "react-router"
import { ReferenceField, TextField, useListContext } from "react-admin"
import { List as MuiList, ListItem, ListItemText } from "@mui/material"
import { makeStyles } from "@material-ui/styles"
import { purple } from '@mui/material/colors'
import { getTimeAndMid, getTableImgSrc } from "./Useful"

const useStyles = makeStyles({
    list: {
        height: "70vh",
        overflowY: "auto"
    },
    list_item: {
        p: 0,
        m: 0,
        height: 75,
        border: "1 solid black",
        "&:hover": { backgroundColor: purple[50] }
    },
    list_item_left: {
        width: "20%",
        textAlign: "center"
    },
    list_item_center: {
        width: "60%", 
        height: 1
    },
    list_item_right: {
        width: "20%",
        textAlign: "center"
    }
})


const TableList = () => {    

    const { ids, data } = useListContext();
    const history = useHistory()
    const classes = useStyles()

    const handleListItem = (e, id) => {
        e.stopPropagation()
        history.push("/history/" + id)
    }

    return (
        <MuiList className={classes.list} disablePadding>
            {ids.map(id =>
                <ListItem key={id} className={classes.list_item} onClick={e => handleListItem(e, id)}>
                    <ListItemText className={classes.list_item_left}
                        primary={getTimeAndMid(data[id].date).time} 
                        secondary={getTimeAndMid(data[id].date).mid}/>
                    <ListItemText className={classes.list_item_center}
                        primary={
                            <ReferenceField record={data[id]} source="user_id" reference="users">
                                <TextField source="name" />
                            </ReferenceField>
                        }>
                    </ListItemText>
                    <img src={getTableImgSrc(data[id].state)} style={{ height: "80%" }} alt="Mesa" />
                </ListItem>
            )}
        </MuiList>
    )
}

export default TableList