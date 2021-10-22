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
            imgSrc = "img/cuadro_azul.png"
            break
        case tableStatesPool[1].id:
            imgSrc = "img/cuadro_rojo.png"
            break
        case tableStatesPool[2].id:
            imgSrc = "img/cuadro_verde.png"
            break
        default:
            imgSrc = "img/cuadro_roza.png"
            break
    }
    return imgSrc
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
    if (!history) return emptyTableEvent
    const tableHistory = history.filter(tableEvent => tableEvent.table_id === table_id)
    let lastEvent = tableHistory[0]
    tableHistory.forEach(tableEvent => {
        if (lastEvent.date < tableEvent.date) lastEvent = tableEvent
    })
    if (lastEvent) return lastEvent
    else return emptyTableEvent
}

export { emptyTableEvent, tableStatesPool, getTableImgSrc, getTimeAndMid, getLatestTableEvent }