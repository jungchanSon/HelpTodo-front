import { next } from 'next'
import styled from 'styled-components'
import { useCallback } from 'react'
import Particles from 'react-particles'
import { loadFull } from 'tsparticles' // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from 'tsparticles-slim'
import { Autocomplete, Card, CardActions, CardContent, TextField, Typography } from '@mui/material'
import Button from 'react-bootstrap/Button'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

// fake data generator(가짜 데이터 제너레이터)
const getItems = (count) => Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`,
}))

// a little function to help us with reordering the result(결과 재정렬을 돕는 함수)
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
}

// using some little inline style helpers to make the app look okay(보기좋게 앱을 만드는 인라인 스타일 헬퍼)
const grid = 8
const getItemStyle = (draggableStyle, isDragging) => ({
    // some basic styles to make the items look a bit nicer(아이템을 보기 좋게 만드는 몇 가지 기본 스타일)
    userSelect: 'none',
    padding: grid * 2,
    marginBottom: grid,

    // change background colour if dragging(드래깅시 배경색 변경)
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables(드래그에 필요한 스타일 적용)
    ...draggableStyle,
})
const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250,
})

const TempPage = () => {
    const getItems = count =>
        Array.from({ length: count }, (v, k) => k).map(k => ({
            id: `item-${k}`,
            content: `item ${k}`,
        }))
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)

        return result
    }

    const grid = 8

    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,

        // change background colour if dragging
        background: isDragging ? 'lightgreen' : 'grey',

        // styles we need to apply on draggables
        ...draggableStyle,
    })

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? 'lightblue' : 'lightgrey',
        padding: grid,
        width: 250,
    })
    const particlesInit = useCallback(async engine => {
        console.log(engine)
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        //await loadFull(engine);
        await loadSlim(engine)
    }, [])

    const particlesLoaded = useCallback(async container => {
        await console.log(container)
    }, [])
    const opts = [
        { label: 'The Godfather', id: 1 },
        { label: 'Pulp Fiction', id: 2 },
    ]
    let options = {
        background: {
            color: {
                value: '#ABD9FF',
            },
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: 'push',
                },
                onHover: {
                    enable: true,
                    mode: 'repulse',
                },
                resize: true,
            },
            modes: {
                push: {
                    quantity: 4,
                },
                repulse: {
                    distance: 200,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: {
                value: '#EAE8FF',
            },
            links: {
                color: '#ffffff',
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
            },
            move: {
                direction: 'none',
                enable: true,
                outModes: {
                    default: 'bounce',
                },
                random: false,
                speed: 1,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 80,
            },
            opacity: {
                value: 0.5,
            },
            shape: {
                type: 'circle',
            },
            size: {
                value: { min: 1, max: 5 },
            },
        },
        detectRetina: true,
    }

    var onDragEnd = (result) => {
        // dropped outside the list(리스트 밖으로 드랍한 경우)
        if (!result.destination) {
            return
        }

        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index,
        )

        this.setState({
            items,
        })
    }
    return (
        <Div>
            <Card>
                <Image
                    alt='Random image'
                    src='https://source.unsplash.com/random'
                    width={640}
                    height={480}
                    style={{
                        maxWidth: '100%',
                        height: '200px',
                        objectFit: 'cover',
                    }}
                />
                <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                        {'heading'}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        {'text'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size='small'>Share</Button>
                    <Button size='small'>Learn More</Button>
                </CardActions>
            </Card>

            <Particles
                id='tsparticles'
                init={particlesInit}
                loaded={particlesLoaded}
                options={options}
            />

            <Autocomplete
                disablePortal
                id='combo-box-demo'
                options={opts}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label='Movie' />}
            />
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='droppable'>
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {this.state.items.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style,
                                            )}
                                        >
                                            {item.content}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </Div>
    )
}
const Div = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 50px;
  background-color: #f9f9f9;
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.06), 0 1px 0 0 rgba(0, 0, 0, 0.02);
`
const Canv = styled.canvas`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  width: 1000px;
  height: 1000px;
  background-color: black;
`

export default TempPage
