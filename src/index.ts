import { asteroids } from './Asteroids';

window.addEventListener('load', async () => {
  const canvas = document.getElementById('game');
  if(!canvas) {
    return;
  }

  await asteroids(canvas);
});
