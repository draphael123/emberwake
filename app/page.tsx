import GameCanvas from "./game/GameCanvas";

export default function Home() {
  return (
    <main>
      <header className="masthead">
        <div className="brand"><span>EMBER</span>WAKE</div>
        <p>Field build / The Mossbound Road</p>
        <div className="status"><i /> Playable prototype</div>
      </header>
      <section className="game-shell" aria-label="Emberwake action platformer">
        <GameCanvas />
      </section>
      <footer>
        <p>Reach the old gate. Break the Warchief.</p>
        <div><kbd>A</kbd><kbd>D</kbd> move <kbd>Space</kbd> jump <kbd>J</kbd> slash <kbd>K</kbd> heavy <kbd>L</kbd> dodge</div>
      </footer>
    </main>
  );
}
