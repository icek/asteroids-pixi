import { asteroids } from './Asteroids'

window.addEventListener('load', async () => {
  const game = document.getElementById('game')
  if (!game) {
    return
  }

  await asteroids(game)
})
