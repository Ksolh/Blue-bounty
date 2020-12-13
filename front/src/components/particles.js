import Particles from "react-tsparticles"

function ParticlesElement() {
    return (
        <Particles
            width='100vw'
            height='100vh'
            position='fixed'
            options={{
                background: {
                    color: {
                        value: "#2C2F33"
                    },
                },
                fpsLimit: 60,
                interactivity: {
                    detectsOn: "window",
                    events: {
                        onHover: {
                            enable: true,
                            mode: "grab"
                        },
                        onClick: {
                            enabled: true,
                            mode: 'repulse'
                        }
                    },
                    modes: {
                        attract: {
                            quantity: .1
                        },
                        grab: {
                            distance: 150
                        }
                    }
                },
                particles: {
                    number: {
                        value: 60,
                    },
                    color: {
                        value: "#8730d9"
                    },
                    links: {
                        color: "#99AAB5",
                        distance: 50,
                        enable: true,
                        opacity: .5,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 1,
                        direction: 'random',
                        random: true
                    },
                }
            }}
        />
    )
}

export default ParticlesElement;