import * as React from "react"
import { Admin, Resource, ListGuesser, EditGuesser, List, TextInput, Datagrid, TextField } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server'
import TableList from "./components/tables/TableList"

const URL = process.env.REACT_APP_API_URL || 'http://localhost:8080'
const dataProvider = jsonServerProvider(URL)

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="users" list={UserList} edit={EditGuesser} />
    <Resource name="tables" list={TableList} edit={EditGuesser} />
    <Resource name="products" list={ListGuesser} edit={EditGuesser} />
    <Resource name="orders" list={OrderList} edit={EditGuesser} />
  </Admin>
)

export default App

const OrderList = (props) => (
  <List pagination={null} {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="table_id" />
      <TextField source="done" />
      <TextField source="date" />
    </Datagrid>
  </List>
)

const UserList = (props) => (
  <List filters={userFilters} pagination={null} {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
    </Datagrid>
  </List>
)
const userFilters = [
  <TextInput label="Search ID" source="id" alwaysOn />
]