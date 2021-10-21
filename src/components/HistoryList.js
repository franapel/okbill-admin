import * as React from "react";
import { List, useListContext, TextField, ReferenceField, ReferenceInput, Create, Edit, SimpleForm, TextInput, required, DateTimeInput, NullableBooleanInput, SelectInput, useGetList } from 'react-admin';
import { List as MUIList, ListItem, ListItemText, ImageList, ImageListItem, ListItemIcon } from '@mui/material';
import { useHistory } from "react-router"

const tableStates = [
    {
        id: "seated",
        name: "Sentado"
    },
    {
        id: "free",
        name: "Libre"
    },
    {
        id: "reserved",
        name: "Reservado"
    }
]

function getTableImageSrc(tableState) { //para las pruebas este tabletype corresponde al id de la persona en posts
    let tableImgSrc
    switch (tableState) {
        case tableStates[0].id:
            tableImgSrc = "img/cuadro_azul.png"
            break
        case tableStates[1].id:
            tableImgSrc = "img/cuadro_rojo.png"
            break
        case tableStates[2].id:
            tableImgSrc = "img/cuadro_verde.png"
            break
        default:
            tableImgSrc = "img/cuadro_roza.png"
            break
    }
    return tableImgSrc
}

function getTimeAndMid(dateString) {
    const date = new Date(dateString)
    const minutes = date.getMinutes()
    let hours = date.getHours()
    let mid = "AM"
    if (hours >= 12) {
        mid = "PM"
        if (hours > 12) hours -= 12
    }
    let preZeroHour = ""
    let preZeroMinute = ""
    if (hours < 10) preZeroHour = "0"
    if (minutes < 10) preZeroMinute = "0"
    const time = preZeroHour + hours + ":" + preZeroMinute + minutes
    return { time, mid }
}

function getLatestTableEvent(table_id, history) {
    const tableHistory = history.filter(tableEvent => tableEvent.table_id === table_id)
    let lastEvent = tableHistory[0]
    tableHistory.forEach(tableEvent => {
        if (lastEvent.date < tableEvent.date) lastEvent = tableEvent
    })
    return lastEvent
}
function getLatestTableState(table_id, history) {
    const tableEvent = getLatestTableEvent(table_id, history)
    if (tableEvent) return tableEvent.state
    else return "none"
}

const EventGrid = () => {
    const { ids, data } = useListContext();
    const history = useHistory()
    return (
        <MUIList style={{ minHeight: 500, maxHeight: 500, overflowY: "scroll" }} disablePadding>

            {ids.map(id =>
                <ListItem key={id} sx={{ p: 0, m: 0, height: 75, borderBottom: 1, borderColor: "grey.300", "&:hover": { backgroundColor: "grey.300" } }} onClick={e => {
                    e.stopPropagation()
                    history.push("/history/" + id)
                }}>
                    <ListItemText primary={getTimeAndMid(data[id].date).time} secondary={getTimeAndMid(data[id].date).mid} sx={{ width: "20%", textAlign: "center" }} />
                    <ListItemText primary={
                        <ReferenceField record={data[id]} source="user_id" reference="users">
                            <TextField source="name" />
                        </ReferenceField>
                    } sx={{ width: "60%", height: 1, borderLeft: 1, borderColor: "grey.300" }}>
                    </ListItemText>
                    <ListItemIcon sx={{ width: "20%" }}>
                        <img src={getTableImageSrc(data[id].state)} style={{ maxWidth: "100%" }} alt="Mesa" />
                    </ListItemIcon>
                </ListItem>
            )}
        </MUIList>
    );
};

const TablesMap = () => {
    let { ids } = useGetList('tables');
    const hData = useGetList("history").data
    const hIds = useGetList("history").ids
    const history = hIds.map(id => hData[id])
    return (
        <ImageList sx={{ width: "50%", padding: '2em 6em' }} cols={4}>
            {ids.map(id =>
                <ImageListItem key={id}  >
                    <img src={getTableImageSrc(getLatestTableState(id, history))} alt="Mesa" />
                    <div style={{ position: "absolute", left: "50%", bottom: "50%", transform: "translate(-50%, 0)" }}>
                        {id}
                    </div>
                </ImageListItem>
            ).reverse()
            }
        </ImageList>
    );
}

const historyFilters = [
    <ReferenceInput source="user_id" label="User" reference="users">
        <TextInput label="Search user" source="id" />
    </ReferenceInput>,
    <ReferenceInput source="table_id" label="Tabla" reference="tables">
        <TextInput label="Search table" source="id" />
    </ReferenceInput>,
    <SelectInput label="Estado" source="state" choices={tableStates} />
]

export const EventList = (props) => (
    <List filters={historyFilters} aside={<TablesMap />} pagination={null} {...props}>
        <EventGrid />
    </List>
);

export const EventCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput disabled label="ID" source="id" initialValue="0"/>
            <TextInput source="table_id" label="ID de la mesa" />
            <TextInput source="user_id" label="ID del usuario" validate={required()} />
            <SelectInput source="state" choices={tableStates} />
            <NullableBooleanInput source="payed" label="Pagado" trueLabel="Si" falseLabel="No" />
            <DateTimeInput source="date" validate={required()} />
        </SimpleForm>
    </Create>
);

export const EventEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled label="ID" source="id" />
            <TextInput source="table_id" label="ID de la mesa" validate={required()} />
            <TextInput source="user_id" label="ID del usuario" validate={required()} />
            <SelectInput source="state" choices={tableStates} />
            <NullableBooleanInput source="payed" label="Pagado" trueLabel="Si" falseLabel="No" />
            <DateTimeInput source="date" validate={required()} />
        </SimpleForm>
    </Edit>
);
