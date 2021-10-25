import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles({
    table : {
        
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "10vw",
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
    }
})

const TableItem = ( {tableData, handleTableClick} ) => {

    const classes = useStyles()

    return (
        <div className={classes.table} 
            style={{backgroundColor: tableData.state === "free" ? "mediumseagreen" : "steelblue"}} 
            onClick={() => handleTableClick(tableData)} >

            {tableData.id}
            <div className={classes.chair} style={{ top: "20%", right: "-25%" }} />
            <div className={classes.chair} style={{ top: "20%", left: "-25%" }} />
            <div className={classes.chair} style={{ bottom: "20%", right: "-25%" }} />
            <div className={classes.chair} style={{ bottom: "20%", left: "-25%" }} />
            <div className={classes.chair} style={{ top: "-25%", right: "20%" }} />
            <div className={classes.chair} style={{ top: "-25%", left: "20%" }} />
            <div className={classes.chair} style={{ bottom: "-25%", right: "20%" }} />
            <div className={classes.chair} style={{ bottom: "-25%", left: "20%" }} />
        </div>
    )
}



export default TableItem