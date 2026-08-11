import GameCanvas from "./game/GameCanvas";

export default function Home() {
  return (
    <main>
      <header className="masthead">
        <div className="brand"><span>EMBER</span>WAKE</div>
        <p>Wayfarer field record / The Mossbound Road</p>
        <div className="status"><i /> Vertical slice · v2</div>
      </header>
      <section className="game-shell" aria-label="Emberwake action platformer">
        <GameCanvas />
      </section>
      <footer>
        <p>Bind the wayside embers. Break the Warchief.</p>
        <div><kbd>A</kbd><kbd>D</kbd> move <kbd>Space</kbd> jump <kbd>J</kbd> slash <kbd>K</kbd> heavy <kbd>L</kbd> dodge <kbd>M</kbd> sound <kbd>Esc</kbd> pause</div>
      </footer>
    </main>
  );
}
