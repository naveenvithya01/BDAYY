'use client'

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react'

type Memory = { src: string; alt: string; caption: string }
type TapHeart = { id: number; x: number; y: number; rotate: number }

const memories: Memory[] = [
  { src: '/yavi-portrait.jpeg', alt: 'Yavi smiling softly at the table', caption: 'The smile that makes everything brighter.' },
  { src: '/memory-garden.jpeg', alt: 'Yavi and Naveen standing together in a leafy garden', caption: 'My favorite kind of happiness.' },
  { src: '/memory-selfie.jpeg', alt: 'A close selfie of Yavi and Naveen', caption: 'A little moment, a forever memory.' },
  { src: '/memory-embrace.jpeg', alt: 'Yavi and Naveen sharing a tender garden moment', caption: 'Some memories need no words.' },
  { src: '/memory-closeup.jpeg', alt: 'A close-up selfie of Yavi and Naveen', caption: 'A thousand little reasons to smile.' },
  { src: '/memory-couple.jpeg', alt: 'Naveen and Yavi taking a garden selfie', caption: 'You make ordinary days magical.' },
  { src: '/memory-heart.jpeg', alt: 'Yavi and Naveen making a heart with their hands', caption: 'Our story, our little world.' },
]

// Personalize the complete letter here.
const birthdayLetter = `My dearest Yavi ❤️,\n\nHappy Birthday to the girl who holds such a special place in my heart.\n\nSometimes I wonder how a single person can bring so much happiness into another person's life. Then I think of you, and suddenly, I understand. It's in your smile, your little habits, your laughter, the way you make ordinary moments feel extraordinary, and all the tiny things that make you who you are.\n\nYavi, I may not always find the perfect words to explain my feelings, but I hope you can feel the love behind every little thing I do. You deserve happiness that never fades, a smile that never loses its light, and dreams that find their way into reality.\n\nOn your birthday, I wish I could wrap all the happiness in the world into a little gift and place it in your hands. I wish I could collect every beautiful sunset, every shining star, and every golden moment just to remind you how precious you are.\n\nThank you for being the beautiful person you are. Thank you for the smiles, the memories, and the feelings that words sometimes cannot explain. No matter how busy life becomes or how quickly the years pass, I hope we always find reasons to smile, laugh, care, and create beautiful memories together.\n\nMy wish for you is simple: may your heart always find peace, may your eyes always have reasons to sparkle, and may life surprise you with more happiness than you ever imagined.\n\nToday, the candles may shine for your birthday, but you are the light that makes this moment beautiful.\n\nAnd if there is one thing I want you to remember after reading this letter, it is this: you are special, you are appreciated, and you deserve all the love and happiness that life can give you.\n\nHappy Birthday once again, my beautiful Yavi. May this new chapter of your life be filled with laughter, adventures, wonderful dreams, and unforgettable moments.\n\nWith every heartbeat, every little wish, and every piece of love I have to give,`

const birthdayNote = `Happy Birthday, my beautiful Yavi ❤️\n\nYou are one of the loveliest reasons behind my happiness. Your smile makes ordinary moments special, and your presence makes my world brighter.\n\nOn your day, I wish you endless joy, beautiful memories, and every little thing your heart dreams of. I hope you always see yourself with the same warmth I see in you.\n\nKeep smiling, keep shining, and never forget how much you mean to me.`
const chapters = ['The beginning', 'A note for you', 'Our memories', 'Our song', 'A little surprise', 'Open my heart', 'Always and forever']
const heartRain = Array.from({ length: 24 }, (_, index) => index)

function HeartAtmosphere() {
  return <div aria-hidden="true" className="heart-atmosphere"><div className="heart-rain">{heartRain.map((heart) => <span key={heart} style={{ '--i': heart } as CSSProperties}>♥</span>)}</div><div className="ambient-glow ambient-glow-left" /><div className="ambient-glow ambient-glow-right" /></div>
}

function ChapterProgress({ page }: { page: number }) {
  return <nav className="chapter-progress" aria-label="Birthday story chapters">{chapters.map((chapter, index) => <span key={chapter} className={`progress-heart ${index + 1 === page ? 'is-current' : ''} ${index + 1 < page ? 'is-past' : ''}`} aria-current={index + 1 === page ? 'step' : undefined} title={`Chapter ${index + 1}: ${chapter}`}>♥</span>)}</nav>
}

function Cake() {
  const [lit, setLit] = useState(true)
  const [celebrate, setCelebrate] = useState(false)
  const toggleCandles = () => {
    setLit((value) => !value)
    setCelebrate(true)
    window.setTimeout(() => setCelebrate(false), 1200)
  }
  return <div className={`cake-scene ${celebrate ? 'is-celebrating' : ''}`}>
    <div className="cake-sparkle cake-sparkle-one">♥</div><div className="cake-sparkle cake-sparkle-two">•</div><div className="cake-sparkle cake-sparkle-three">•</div>
    <div className="cake-candles" aria-hidden="true">{[0, 1, 2].map((candle) => <span key={candle} className="cake-candle"><i className={lit ? 'candle-flame is-lit' : 'candle-flame'} /></span>)}</div>
    <button className="cake-button" onClick={toggleCandles} aria-label={lit ? 'Blow out the birthday candles' : 'Light the birthday candles'}>
      <span className="cake-tier cake-top"><i>♥</i></span><span className="cake-tier cake-middle"><i>•</i><i>♥</i><i>•</i></span><span className="cake-tier cake-bottom"><i>♥</i><i>•</i><i>♥</i><i>•</i></span><span className="cake-plate" />
    </button>
    <span className="cake-caption">{lit ? 'Make a little wish' : 'Your wish is on its way'}</span><span className="cake-wish" aria-hidden="true">{celebrate ? '♥ ♥ • ♥ ♥' : ''}</span>
  </div>
}

function StoryButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return <button className="story-button" onClick={onClick}>{children}</button>
}

function AudioPlayer({ isPlaying, onToggle, currentTime, duration, onSeek, volume, onVolumeChange }: { isPlaying: boolean; onToggle: () => void; currentTime: number; duration: number; onSeek: (value: number) => void; volume: number; onVolumeChange: (value: number) => void }) {
  const formatTime = (time: number) => Number.isFinite(time) ? `${Math.floor(time / 60)}:${String(Math.floor(time % 60)).padStart(2, '0')}` : '0:00'
  return <div className="music-player">
    <button className="play-button" onClick={onToggle} aria-label={isPlaying ? 'Pause our song' : 'Play our song'}><span aria-hidden="true">{isPlaying ? 'Ⅱ' : '▶'}</span></button>
    <div className="track-details"><div className={`equalizer ${isPlaying ? 'is-playing' : ''}`} aria-hidden="true"><i /><i /><i /><i /><i /></div><p className="track-title">Kadal Ala Pola</p><p className="track-subtitle">A little song, a lot of us</p><input className="audio-seek" type="range" min="0" max={duration || 100} value={currentTime} onChange={(event) => onSeek(Number(event.target.value))} aria-label="Song progress" /><div className="audio-tools"><div className="audio-times"><span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span></div><label className="volume-control"><span aria-hidden="true">♪</span><input type="range" min="0" max="1" step="0.05" value={volume} onChange={(event) => onVolumeChange(Number(event.target.value))} aria-label="Song volume" /></label></div></div>
    <span className="music-heart" aria-hidden="true">♥</span>
  </div>
}

export default function BirthdayExperience() {
  const [page, setPage] = useState(1)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [letterOpen, setLetterOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [noteCharacters, setNoteCharacters] = useState(0)
  const [letterCharacters, setLetterCharacters] = useState(0)
  const [tapHearts, setTapHearts] = useState<TapHeart[]>([])
  const audioRef = useRef<HTMLAudioElement>(null)

  const goToPage = (nextPage: number) => {
    setPage(Math.max(1, Math.min(7, nextPage)))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const toggleAudio = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      try { await audio.play(); setIsPlaying(true) } catch { setIsPlaying(false) }
    } else { audio.pause(); setIsPlaying(false) }
  }
  const seekAudio = (time: number) => {
    if (audioRef.current) audioRef.current.currentTime = time
    setCurrentTime(time)
  }
  const changeVolume = (nextVolume: number) => {
    if (audioRef.current) audioRef.current.volume = nextVolume
    setVolume(nextVolume)
  }
  const createTapHeart = (event: MouseEvent<HTMLElement>) => {
    const id = Date.now() + Math.random()
    setTapHearts((current) => [...current.slice(-6), { id, x: event.clientX, y: event.clientY, rotate: Math.random() * 30 - 15 }])
    window.setTimeout(() => setTapHearts((current) => current.filter((item) => item.id !== id)), 950)
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const syncTime = () => setCurrentTime(audio.currentTime)
    const syncDuration = () => setDuration(audio.duration)
    const handleEnded = () => setIsPlaying(false)
    syncTime()
    syncDuration()
    audio.addEventListener('timeupdate', syncTime)
    audio.addEventListener('loadedmetadata', syncDuration)
    audio.addEventListener('ended', handleEnded)
    return () => { audio.removeEventListener('timeupdate', syncTime); audio.removeEventListener('loadedmetadata', syncDuration); audio.removeEventListener('ended', handleEnded) }
  }, [])
  useEffect(() => {
    if (page !== 2 || noteCharacters >= birthdayNote.length) return
    const timer = window.setInterval(() => setNoteCharacters((current) => Math.min(birthdayNote.length, current + 2)), 18)
    return () => window.clearInterval(timer)
  }, [page, noteCharacters])
  useEffect(() => {
    if (page !== 6 || !letterOpen || letterCharacters >= birthdayLetter.length) return
    const timer = window.setInterval(() => setLetterCharacters((current) => Math.min(birthdayLetter.length, current + 3)), 18)
    return () => window.clearInterval(timer)
  }, [page, letterOpen, letterCharacters])
  useEffect(() => {
    if (lightbox === null) return
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightbox(null)
      if (event.key === 'ArrowRight') setLightbox((current) => current === null ? null : (current + 1) % memories.length)
      if (event.key === 'ArrowLeft') setLightbox((current) => current === null ? null : (current - 1 + memories.length) % memories.length)
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [lightbox])

  return <main className="birthday-app" onClick={createTapHeart}>
    <HeartAtmosphere />
    {tapHearts.map((heart) => <span key={heart.id} className="tap-heart" style={{ left: heart.x, top: heart.y, rotate: `${heart.rotate}deg` }} aria-hidden="true">♥</span>)}
    <audio ref={audioRef} src="/kadal-ala-pola.mp3" preload="metadata" className="persistent-audio" aria-label="Kadal Ala Pola" />
    <div className="story-shell">
      <header className="story-header"><button className="wordmark" onClick={() => goToPage(1)} aria-label="Return to the beginning"><span className="wordmark-heart">♥</span> a little story for Yavi</button><ChapterProgress page={page} /><span className="chapter-count">{String(page).padStart(2, '0')} <i>/</i> 07</span></header>
      <section className="story-content" key={page} aria-live="polite">
        {page === 1 && <section className="chapter hero-chapter"><div className="hero-copy"><p className="eyebrow"><span /> A day made for you <span /></p><h1>Happy birthday,<br /><em>Yavi.</em><span className="title-heart">♥</span></h1><p className="hero-intro">Today, the world became a little more beautiful because you were born.</p><p className="hero-byline">A tiny love story, made just for you <span>—</span> Naveen</p><StoryButton onClick={() => goToPage(2)}>Start your surprise <span>♥</span></StoryButton><button className="wish-link" onClick={() => document.querySelector<HTMLButtonElement>('.cake-button')?.click()}>and make a wish</button></div><div className="hero-art"><div className="cake-halo" /><Cake /><span className="cake-side-note">baked with<br />all my heart</span></div><div className="chapter-edition">A birthday keepsake <span>·</span> 01 / 07</div></section>}

        {page === 2 && <section className="chapter note-chapter"><div className="note-photo-wrap"><span className="photo-sparkle sparkle-a">♥</span><span className="photo-sparkle sparkle-b">•</span><figure className="note-photo"><img src="/yavi-portrait.jpeg" alt="Yavi smiling at the table" /><figcaption>my favorite person, just being you</figcaption></figure><span className="photo-flower" aria-hidden="true">✿</span></div><div className="note-copy"><p className="eyebrow">A little note from me</p><h2>For the girl who<br /><em>makes life glow.</em></h2><div className="note-letter">{birthdayNote.slice(0, noteCharacters).split('\n\n').map((paragraph, index, paragraphs) => <p className={index === 0 ? 'note-opening' : undefined} key={index}>{paragraph}{index === paragraphs.length - 1 && noteCharacters < birthdayNote.length && <span className="typing-cursor" aria-hidden="true">▍</span>}</p>)}{noteCharacters === birthdayNote.length && <p className="note-signoff">With all my love,<br /><em>Naveen ♾️</em></p>}</div><StoryButton onClick={() => goToPage(3)}>Keep our story going <span>→</span></StoryButton></div></section>}

        {page === 3 && <section className="chapter memories-chapter"><div className="section-heading"><p className="eyebrow">Little moments, kept forever</p><h2>Our <em>beautiful</em> memories</h2><p>Every picture has a little piece of my heart in it.</p></div><div className="memory-grid">{memories.map((memory, index) => <button className={`memory-card memory-card-${index + 1}`} key={memory.src} onClick={() => setLightbox(index)} aria-label={`Open memory: ${memory.caption}`}><span className="memory-image"><img src={memory.src} alt={memory.alt} loading="lazy" /><span className="memory-zoom" aria-hidden="true">↗</span></span><span className="memory-caption">{memory.caption}</span></button>)}</div><p className="memory-footnote"><span>♥</span> A few favorite pages from our story <span>♥</span></p></section>}

        {page === 4 && <section className="chapter song-chapter"><div className="song-photo-column"><figure className="song-photo"><img src="/memory-garden.jpeg" alt="Yavi and Naveen together in the garden" /><span className="song-photo-stamp">you + me<br />always</span></figure><div className={`song-note-float ${isPlaying ? 'is-playing' : ''}`} aria-hidden="true">♪ ♫ ♪</div></div><div className="song-copy"><p className="eyebrow">A melody with a little meaning</p><h2>Our song,<br /><em>our little world.</em></h2><p className="song-message">Every love story has a song, but ours has a place in my heart that no other melody can replace. Whenever you hear it, remember that somewhere, someone is smiling because you exist.</p><AudioPlayer isPlaying={isPlaying} onToggle={toggleAudio} currentTime={currentTime} duration={duration} onSeek={seekAudio} volume={volume} onVolumeChange={changeVolume} /><button className="text-control" onClick={toggleAudio}>{isPlaying ? 'Pause our magic' : 'Play our magic'} <span>{isPlaying ? 'Ⅱ' : '♪'}</span></button><p className="song-dedication">A song for my favorite person <span>♥</span></p></div></section>}

        {page === 5 && <section className="chapter video-chapter"><div className="section-heading"><p className="eyebrow">A little surprise, made with all my love</p><h2>A moment <em>for you.</em></h2><p>Press play when you&apos;re ready. This one is just for you, Yavi.</p></div><div className="video-frame"><span className="video-frame-corner corner-one" /><span className="video-frame-corner corner-two" /><video src="/yavi-surprise.mp4" controls playsInline preload="metadata" aria-label="A birthday video surprise for Yavi">Your browser does not support the video element.</video><span className="video-heart video-heart-left">♥</span><span className="video-heart video-heart-right">♥</span></div><p className="video-dedication">Some feelings are too beautiful for words. I made this little surprise just for you. Watch it with a smile—every second comes with love from me. <span>♥</span></p></section>}

        {page === 6 && <section className={`chapter letter-chapter ${letterOpen ? 'letter-is-open' : ''}`}><div className="letter-intro"><p className="eyebrow">Just one more thing, from my heart</p><h2>Yavi, <em>open my heart.</em></h2><p>There are a few things I never want you to forget.</p>{!letterOpen && <button className="heart-envelope" onClick={() => { setLetterCharacters(0); setLetterOpen(true) }} aria-label="Open the letter from Naveen"><span className="envelope-heart">♥</span><span className="envelope-label">Open my heart</span><span className="envelope-hint">a letter, just for you</span></button>}</div>{letterOpen && <article className="love-letter" aria-label="Birthday letter from Naveen to Yavi">{birthdayLetter.slice(0, letterCharacters).split('\n\n').map((paragraph, index, paragraphs) => <p className={index === 0 ? 'letter-salutation' : undefined} key={index}>{paragraph}{index === paragraphs.length - 1 && letterCharacters < birthdayLetter.length && <span className="typing-cursor" aria-hidden="true">▍</span>}</p>)}{letterCharacters === birthdayLetter.length && <><p className="letter-signature">Forever yours,<br /><strong>NAVEEN <span>♾️ ♥</span></strong></p><StoryButton onClick={() => goToPage(7)}>One last surprise <span>♥</span></StoryButton></>}</article>}</section>}

        {page === 7 && <section className="chapter finale-chapter"><div className="finale-content"><p className="eyebrow">And with all my heart...</p><div className="final-heart-wrap" aria-hidden="true"><span className="heart-orbit orbit-one" /><span className="heart-orbit orbit-two" /><span className="final-heart">♥</span><span className="final-heart-sparkle">♥</span></div><p className="finale-kicker">a wish for you, always</p><h2>Happy birthday,<br /><em>Yavi.</em><span>♥</span></h2><p className="finale-message">Out of all the beautiful moments in this world, I&apos;m grateful for every moment that brings a smile to your face.<br /><br />Today is your birthday, but the happiness you bring is a gift that stays with me every day.<br /><br />May your life be filled with love, laughter, courage, beautiful surprises, and dreams that come true.<br /><br />If this little website could hold a thousand hearts, every single one would carry the same wish: may you always be happy, my Yavi. 💛❤️</p><p className="finale-signature">Forever yours,<br /><strong>NAVEEN ♾️</strong></p><StoryButton onClick={() => { setLetterOpen(false); goToPage(1) }}>Replay our love story <span>↻</span></StoryButton></div><div className="finale-edition">made with every bit of love <span>♥</span></div></section>}
      </section>
      <footer className="story-footer">{page > 1 ? <button className="footer-nav footer-prev" onClick={() => goToPage(page - 1)}><span>←</span> Previous</button> : <span className="footer-note">Made with love by Naveen <span>♾️</span></span>}<span className="footer-chapter">{chapters[page - 1]}</span>{page < 7 ? <button className="footer-nav footer-next" onClick={() => goToPage(page + 1)}>Next page <span>→</span></button> : <span className="footer-note">Always yours <span>♥</span></span>}</footer>
    </div>
    {lightbox !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Memory photo" onClick={() => setLightbox(null)}><button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close photo">×</button><button className="lightbox-arrow lightbox-left" aria-label="Previous photo" onClick={(event) => { event.stopPropagation(); setLightbox((lightbox - 1 + memories.length) % memories.length) }}>←</button><figure onClick={(event) => event.stopPropagation()}><img src={memories[lightbox].src} alt={memories[lightbox].alt} /><figcaption>{memories[lightbox].caption}</figcaption></figure><button className="lightbox-arrow lightbox-right" aria-label="Next photo" onClick={(event) => { event.stopPropagation(); setLightbox((lightbox + 1) % memories.length) }}>→</button></div>}
  </main>
}
