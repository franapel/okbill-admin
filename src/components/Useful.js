const emptyTableEvent = {
    id: "",
    table_id: "",
    user_id: "",
    state: "",
    payed: "",
    date: ""
}

const tableStatesPool = [
    { id: "seated", name: "Sentado"},
    { id: "free", name: "Libre" },
    { id: "reserved", name: "Reservado" }
]

function getTableImgSrc(tableState) {
    let imgSrc
    switch (tableState) {
        case tableStatesPool[0].id:
            imgSrc = "img/cuadro_azul.webp"
            break
        case tableStatesPool[1].id:
            imgSrc = "img/cuadro_verde.webp"
            break
        case tableStatesPool[2].id:
            imgSrc = "img/cuadro_rojo.webp"
            break
        default:
            imgSrc = "img/cuadro_vacio.webp"
            break
    }
    return imgSrc
}

function getTime(dateString) {
    const fullDate = new Date(dateString)

    const day = fullDate.getDate()
    const month = fullDate.getMonth() + 1
    const year = fullDate.getFullYear().toString().substr(-2)

    let preZeroDay = ""
    let preZeroMonth = ""
    if (day < 10) preZeroDay = "0"
    if (month < 10) preZeroMonth = "0"

    const date = preZeroDay + day + "-" + preZeroMonth + month + "-" + year

    const minutes = fullDate.getMinutes()
    let hours = fullDate.getHours()
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
    const fullTime = preZeroHour + hours + ":" + preZeroMinute + minutes + " " + mid
    return { date, time, fullTime }
}

function getLatestTableEvent(table_id, history) {
    if (!history) return emptyTableEvent
    const tableHistory = history.filter(tableEvent => tableEvent.table_id === table_id)
    let lastEvent = tableHistory[0]
    tableHistory.forEach(tableEvent => {
        if (lastEvent.date < tableEvent.date) lastEvent = tableEvent
    })
    if (lastEvent) return lastEvent
    else return emptyTableEvent
}

export { emptyTableEvent, tableStatesPool, getTableImgSrc, getTime
, getLatestTableEvent }