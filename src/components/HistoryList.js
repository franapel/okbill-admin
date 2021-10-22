import {
    List, Create, Edit,
    SimpleForm, ReferenceInput, TextInput, NullableBooleanInput, SelectInput, DateTimeInput, required
}
    from 'react-admin'
import { Box, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import TableList from "./TableList"
import TableMap from "./TableMap"
import { tableStatesPool } from "./Useful"


const historyFilters = [
    <ReferenceInput source="user_id" label="User" reference="users">
        <TextInput label="Search user" source="id" />
    </ReferenceInput>,
    <ReferenceInput source="table_id" label="Tabla" reference="tables">
        <TextInput label="Search table" source="id" />
    </ReferenceInput>,
    <SelectInput label="Estado" source="state" choices={tableStatesPool} />
]

const AsideTablesMap = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    return (matches &&
        <Box sx={{ width: "70%", display: "flex", justifyContent: "center" }}>
            <TableMap />
        </Box>
    )
}

const EventGrid = () => {
    return <TableList />
}

export const EventList = (props) => (
    <List filters={historyFilters} aside={<AsideTablesMap />} pagination={null} {...props}>
        <EventGrid />
    </List>
)

export const EventCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput disabled label="ID" source="id" initialValue="0" />
            <TextInput source="table_id" label="ID de la mesa" />
            <TextInput source="user_id" label="ID del usuario" validate={required()} />
            <SelectInput source="state" choices={tableStatesPool} />
            <NullableBooleanInput source="payed" label="Pagado" trueLabel="Si" falseLabel="No" />
            <DateTimeInput source="date" validate={required()} />
        </SimpleForm>
    </Create>
)

export const EventEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled label="ID" source="id" />
            <TextInput source="table_id" label="ID de la mesa" validate={required()} />
            <TextInput source="user_id" label="ID del usuario" validate={required()} />
            <SelectInput source="state" choices={tableStatesPool} />
            <NullableBooleanInput source="payed" label="Pagado" trueLabel="Si" falseLabel="No" />
            <DateTimeInput source="date" validate={required()} />
        </SimpleForm>
    </Edit>
)
