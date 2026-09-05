import { gsap, SplitText } from './gsap'

// Shared scroll-reveal helpers.
// Every reveal plays on the way down and rewinds on the way back up, so
// sections animate in both scroll directions instead of firing once.
const REPLAY = 'play none none reverse'

export const revealTrigger = (trigger, start = 'top 85%') => ({
  trigger,
  start,
  toggleActions: REPLAY,
})

export const whenFontsReady = (cb) => {
  if (document.fonts?.status === 'loaded') return cb()
  if (document.fonts?.ready) return void document.fonts.ready.then(cb)
  return cb()
}

export const revealUp = (targets, { trigger, y = 26, stagger = 0.08, duration = 0.7, start = 'top 85%' } = {}) => {
  const items = gsap.utils.toArray(targets)
  if (!items.length) return null

  return gsap.fromTo(
    items,
    { y, autoAlpha: 0 },
    {
      y: 0,
      autoAlpha: 1,
      duration,
      stagger,
      ease: 'power3.out',
      scrollTrigger: revealTrigger(trigger || items[0], start),
    }
  )
}

// Animates .section-index / .section-title / .section-kicker as one sequence.
// Returns a cleanup that reverts the SplitText DOM.
export const revealHead = (root, start = 'top 85%') => {
  const head = root.querySelector('.section-head') || root
  const index = head.querySelector('.section-index')
  const title = head.querySelector('.section-title')
  const kicker = head.querySelector('.section-kicker')
  const splits = []

  const tl = gsap.timeline({ scrollTrigger: revealTrigger(head, start) })

  if (index) {
    tl.fromTo(index, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: 'power3.out' })
  }

  if (title) {
    const split = SplitText.create(title, { type: 'chars', aria: 'auto', mask: 'chars' })
    splits.push(split)
    tl.fromTo(
      split.chars,
      { yPercent: 115 },
      { yPercent: 0, duration: 0.9, stagger: 0.025, ease: 'power4.out' },
      '-=0.25'
    )
  }

  if (kicker) {
    tl.fromTo(kicker, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' }, '-=0.6')
  }

  return () => splits.forEach((s) => s.revert())
}

// Continuous scroll-linked drift; moves with the scrollbar in both directions.
export const drift = (target, { from = -6, to = 6, trigger, scrub = 0.9 } = {}) => {
  if (!target) return null
  return gsap.fromTo(
    target,
    { yPercent: from },
    {
      yPercent: to,
      ease: 'none',
      scrollTrigger: {
        trigger: trigger || target,
        start: 'top bottom',
        end: 'bottom top',
        scrub,
      },
    }
  )
}
