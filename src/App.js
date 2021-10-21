import * as React from "react"
import { Admin, Resource, ListGuesser, EditGuesser, List, TextInput, Datagrid, TextField } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server'
import { EventList, EventCreate, EventEdit } from "./components/HistoryList";

const URL = process.env.API_URL || 'http://localhost:8080'
const dataProvider = jsonServerProvider(URL)
const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="users" list={UserList} edit={EditGuesser} />
    <Resource name="tables" list={ListGuesser} edit={EditGuesser} />
    <Resource name="history" list={EventList} create={EventCreate} edit={EventEdit} />
  </Admin>
)


export default App

const UserList = (props) => (
  <List filters={userFilters} pagination={null} {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
    </Datagrid>
  </List>
);


const userFilters = [
  <TextInput label="Search ID" source="id" alwaysOn />
]