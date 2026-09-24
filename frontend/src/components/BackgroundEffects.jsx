import { useEffect, useRef } from 'react'
import './BackgroundEffects.css'
import stadiumImage from '../assets/uefa-champions-league-star-arena-design-a41vpzhw46us8102.jpg'

function BackgroundEffects() {
  const sceneRef = useRef(null)
  const frameRef = useRef(null)

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const handleMouseMove = (event) => {
      if (frameRef.current) return
      frameRef.current = window.requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * -24
        const y = (event.clientY / window.innerHeight - 0.5) * -24
        scene.style.setProperty('--parallax-x', `${x}px`)
        scene.style.setProperty('--parallax-y', `${y}px`)
        frameRef.current = null
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return (
    <div className="background-scene" ref={sceneRef} aria-hidden="true">
    <img
        className="stadium-image"
        src={stadiumImage}
        alt=""
    />  
      <div className="navy-overlay" />
      <div className="vignette-overlay" />
      <div className="light-beam light-beam-one" />
      <div className="light-beam light-beam-two" />
      <div className="light-beam light-beam-three" />
      <div className="haze haze-one" />
      <div className="haze haze-two" />
      <div className="film-grain" />
    </div>
  )
}

export default BackgroundEffects
