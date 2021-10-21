// import * as React from "react";
// import { List, useRecordContext, useListContext, TextField, ReferenceField, EditButton, Edit, SimpleForm, TextInput, required, Datagrid, DateTimeInput, BooleanInput, SelectInput } from 'react-admin';
// import { Card, CardActions, CardContent, CardHeader, Avatar } from '@material-ui/core';
// import PersonIcon from '@material-ui/icons/Person';
// import "../style/tableList.css";
// import { List as MUIList } from '@mui/material';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import ImageListItem from '@mui/material/ImageListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import { ImageList } from "@mui/material";
// import { useHistory } from "react-router"
// import { getRoles } from "@testing-library/dom";
// import { grey } from "@material-ui/core/colors";

// const tableStates = ["seated", "free", "reserved"]

// function getTimeAndMid(dateString) {
//     const date = new Date(dateString)
//     const minutes = date.getMinutes()
//     let hour = date.getHours()
//     let mid = "AM"
//     if (hour >= 12) {
//         mid = "PM"
//         if (hour > 12) hour-=12
//     }
//     let preZero = ""
//     if (hour < 10) preZero = "0"
//     const time = preZero + hour + ":" + minutes
//     return [time, mid]
// }

// function getTableImageSrc(tableState) { //para las pruebas este tabletype corresponde al id de la persona en posts
//     let tableImgSrc
//     switch (tableState) {
//         case tableStates[0]:
//             tableImgSrc = "img/cuadro_azul.png"
//             break
//         case tableStates[1]:
//             tableImgSrc = "img/cuadro_rojo.png"
//             break
//         case tableStates[2]:
//             tableImgSrc = "img/cuadro_verde.png"
//             break
//         default:
//             tableImgSrc = "img/cuadro_roza.png"
//             break
//     }
//     return tableImgSrc
// }

// const TableField = (props) => {
//     const record = useRecordContext(props);
//     //return <span>{record.firstName} {record.lastName}</span>;
//     const tableState = record.state
//     return (
//         <></>
//     )
// }

// const TableImageField = (props) => {
//     const record = useRecordContext(props);
//     //return <span>{record.firstName} {record.lastName}</span>;
//     const tableState = record.state
//     return (
//         <div>
//             <img src={getTableImageSrc(tableState)} alt="Tabla" />
//         </div>
//     )
// }

// const cardStyle = {
//     width: 300,
//     minHeight: 300,
//     margin: '0.5em',
//     display: 'inline-block',
//     verticalAlign: 'top'
// };

// const CommentGrid = () => {
//     const { ids, data, basePath } = useListContext();
//     const history = useHistory()
//     return (
//         <MUIList style={{ maxHeight: 400, overflowY: "scroll" }} disablePadding>

//             {ids.map(id =>
//                 // <Card key={id} style={cardStyle}>
//                 //     <CardHeader
//                 //         title={<TextField record={data[id]} source="id" />}
//                 //         subheader={<DateField record={data[id]} source="number" />}
//                 //         avatar={<Avatar icon={<PersonIcon />} />}
//                 //     />
//                 //     <CardContent>
//                 //         <TextField record={data[id]} source="lastUserId" />
//                 //     </CardContent>
//                 //     <CardContent>
//                 //         about&nbsp;
//                 //         <ReferenceField label="Post" resource="state" record={data[id]} source="id" reference="tables" basePath={basePath}>
//                 //             <TextField source="id" />
//                 //         </ReferenceField>
//                 //     </CardContent>
//                 //     <CardActions style={{ textAlign: 'right' }}>
//                 //         <EditButton resource="tables" basePath={basePath} record={data[id]} />
//                 //     </CardActions>
//                 // </Card>
//                 <ListItem sx={{ p: 0, m: 0, height: 75, borderBottom: 1, borderColor: "grey.300", "&:hover": { backgroundColor: "grey.300" } }} onClick={e => {
//                     e.stopPropagation()
//                     history.push("/tables/" + id)
//                 }}>
//                     <ListItemText primary={getTimeAndMid(data[id].date)[0]} secondary={getTimeAndMid(data[id].date)[1]} sx={{ width: "20%", textAlign: "center" }} />
//                     <ListItemText primary={
//                         <ReferenceField record={data[id]} source="lastUserId" reference="users">
//                             <TextField source="name" />
//                         </ReferenceField>
//                     } sx={{ width: "60%", height: 1, borderLeft: 1, borderColor: "grey.300", }}>

//                     </ListItemText>
//                     <ListItemIcon sx={{ width: "20%" }}>
//                         <img src={getTableImageSrc(data[id].state)} style={{ maxWidth: "100%" }} />
//                     </ListItemIcon>
//                 </ListItem>


//             )}

//         </MUIList>
//     );
// };

// const TablesMap = () => {
//     const { data, ids } = useListContext();
//     return (
//         <ImageList sx={{ width: "50%", padding: '2em 6em' }} cols={4} rowHeight={50}>
//             {ids.map(id =>
//                 <ImageListItem >
//                     <img src={getTableImageSrc(data[id].state)} />
//                 </ImageListItem>)}
//         </ImageList>
//     );
// }

// export const CommentList = (props) => (
//     <List aside={<TablesMap />} pagination={null} {...props}>
//         <CommentGrid />
//     </List>
// );

// const PostEdit = (props) => (
//     <Edit {...props}>
//         <SimpleForm>
//             <TextInput disabled label="ID de la mesa" source="id" />
//             <TextInput source="number" label="Número de la mesa" validate={required()} />
//             <TextInput source="lastUserId" label="ID del último usuario" />
//             <SelectInput source="state" choices={[
//                 { id: tableStates[0], name: 'Sentado' },
//                 { id: tableStates[1], name: 'Libre' },
//                 { id: tableStates[2], name: 'Reservado' },
//             ]} />
//             <BooleanInput source="payed" label="Pagado" />
//             <DateTimeInput source="date" validate={required()} />
//         </SimpleForm>
//     </Edit>
// );

// export { PostEdit }