import { asteroids } from './SimpleAsteroids'

window.addEventListener('load', async () => {
  const game = document.getElementById('game')
  if (!game) {
    return
  }

  await asteroids(game)
})
