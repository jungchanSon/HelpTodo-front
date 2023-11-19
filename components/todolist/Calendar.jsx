import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import React, { useEffect } from 'react'
import timeGridPlugin from '@fullcalendar/timegrid'
import todoTableStore from '../../store/todoTableStore'
import axios from 'axios'
import roomData from '../../store/roomData'

const Calendar = () => {
    const { teamName, setTeamName, setTeamCreator, setTeamCreateDate } = roomData()
    const { todoTableData, setTodoTableData, is_reloadTodoTableData, off_Is_reloadTodoData } = todoTableStore()

    function renderEventContent(eventInfo) {
        return (
            <>
                <b>{eventInfo.event.title}</b>
                <i>{eventInfo.event._instance.range.end.toDateString()}</i>
            </>
        )
    }

    const getRandomColor = () => {
        return '#' + Math.floor(Math.random() * 16777215).toString(16)
    }
    useEffect(() => {
        document.addEventListener('DOMContentLoaded', function() {
            let draggableEl = document.getElementById('123')
            let calendarEl = document.getElementById('mycalendar')

            let calendar = new Calendar(calendarEl, {
                plugins: [interactionPlugin],
                droppable: true,
            })
            new Draggable(draggableEl)
            calendar.render()
        })
    }, [])

    const updateDate = ({ event }) => {
        const startDate = new Date(event.start)
        const endDate = new Date(event.end)

        const startMonth = startDate.getMonth() + 1
        const startDateString =
            startDate.getFullYear() +
            '-' +
            (startDate.getMonth() + 1 < 10
                ? '0' + startDate.getMonth() + 1
                : startDate.getMonth() + 1) +
            '-' +
            (startDate.getDate() < 10 ? '0' + startDate.getDate() : startDate.getDate())

        const endDateString =
            endDate.getFullYear() +
            '-' +
            (endDate.getMonth() + 1 < 10 ? '0' + endDate.getMonth() + 1 : endDate.getMonth() + 1) +
            '-' +
            (endDate.getDate() < 10 ? '0' + endDate.getDate() : endDate.getDate())

        const reqParam = {
            id: event.id,
            teamName: teamName,
            startDate: startDateString,
            endDate: endDateString,
        }
        axios.post(process.env.NEXT_PUBLIC_CHANGE_TODO_DATE, null, {
            params: reqParam,
        })
    }
    return (
        <div className='mt-10 sm:mx-auto sm:w-full bg-white border-solid border-1 rounded-3 opacity-90 p-2'>
            <div id={'mycalendar'}></div>
            <FullCalendar
                id='mycalendar'
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                droppable={true}
                initialView='dayGridMonth'
                slotMaxTime={'00:00:00'}
                locale={'ko'}
                events={todoTableData[0].resTodos && todoTableData[0].resTodos.map((todo) => ({
                    title: todo.content,
                    date: todo.startDate,
                    end: todo.endDate,
                    color: getRandomColor(),
                    id: todo.tddId,
                }))}
                editable={true}
                eventResize={updateDate}
                eventDrop={updateDate}
                slotEventOverlap={true}
                eventContent={renderEventContent}
            ></FullCalendar>
        </div>
    )
}

export default Calendar
