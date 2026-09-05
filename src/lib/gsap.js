import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { SplitText } from 'gsap/SplitText'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText, ScrambleTextPlugin, useGSAP)

gsap.defaults({ ease: 'power3.out', duration: 0.8 })

export { gsap, ScrollTrigger, ScrollToPlugin, SplitText, ScrambleTextPlugin, useGSAP }
