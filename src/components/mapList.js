import { List } from "react-admin"
import TableMap from "./TableMap"

export const EventList = (props) => (
    <List pagination={null} {...props}>
        <TableMap />
    </List>
)