import React, { useCallback, useEffect, useState } from 'react'
import { loadSlim } from 'tsparticles-slim'
import Particles from 'react-particles'
import styled from 'styled-components'

const GlobalBackground = () => {
    const [scrollPos, setScrollPos] = useState(0)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            setScrollPos(1 - (document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight)))
        })
    })
    const particlesInit = useCallback(async engine => {
        await loadSlim(engine)
    }, [])

    const particlesLoaded = useCallback(async container => {
    }, [])

    let options = {
        background: {
            opacity: 0.8,
            color: {
                value: '#E9F3FE',
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
                    distance: 100,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: {
                value: '#EAE8FF',
            },
            links: {
                color: '#9190F5',
                distance: 150,
                enable: true,
                opacity: 0.7,
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
                value: 0.8,
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

    return (
        <ParticlesContainer>

            <Particles
                id='tsparticles'
                init={particlesInit}
                loaded={particlesLoaded}
                options={options}
                style={'background: radial-gradient(circle, rgba(255, 255, 255, 255) 0%,'}>

            </Particles>
            <GradinetContainer>
                <div
                    className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
                    aria-hidden='true'
                >
                    <div
                        className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <div
                    className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
                    aria-hidden='true'
                >
                    <div
                        className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
            </GradinetContainer>
            {/*<Title scrollPos={scrollPos}>Help Todo</Title>*/}
        </ParticlesContainer>
    )
}
const ParticlesContainer = styled.div`
  position: fixed;
  width: 100%;
  z-index: -10;
`
const GradinetContainer = styled.div`
  position: fixed;
  width: 100%;
`
const Title = styled.h1`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  color: darkblue;
  opacity: ${props => props.scrollPos};
  font-weight: 700;
  text-align: center;
  margin-top: 6rem;
  margin-bottom: 10rem;
`
export default GlobalBackground