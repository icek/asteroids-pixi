import asteroidSoundMp3 from './asteroid.mp3';
import asteroidSoundOgg from './asteroid.ogg';
import shootSoundMp3 from './shoot.mp3';
import shootSoundOgg from './shoot.ogg';
import shipSoundMp3 from './ship.mp3';
import shipSoundOgg from './ship.ogg';

export enum Sounds {
  asteroid,
  ship,
  shoot,
}

const sounds = [
  {
    key: Sounds.asteroid,
    mp3: asteroidSoundMp3,
    ogg: asteroidSoundOgg,
  }, {
    key: Sounds.shoot,
    mp3: shootSoundMp3,
    ogg: shootSoundOgg,
  }, {
    key: Sounds.ship,
    mp3: shipSoundMp3,
    ogg: shipSoundOgg,
  },
];

function audioTypeDetect():'mp3' | 'ogg' | null {
  const audio = document.createElement('audio');
  const canPlayMp3 = audio.canPlayType('audio/mpeg');
  const canPlayOgg = audio.canPlayType('audio/ogg');

  let type:'mp3' | 'ogg' | null = null;

  if (canPlayMp3 === 'probably') {
    type = 'mp3';
  } else if (canPlayOgg === 'probably') {
    type = 'ogg';
  } else if (canPlayMp3 === 'maybe') {
    type = 'mp3';
  } else if (canPlayOgg === 'maybe') {
    type = 'ogg';
  }

  return type;
}

export async function loadAudioDB(audioContext:AudioContext):Promise<Map<Sounds, AudioBuffer>> {
  const audioDB = new Map<Sounds, AudioBuffer>();
  const type = audioTypeDetect();

  const loadSound = async (url:string, key:Sounds):Promise<any> => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    audioDB.set(key, audioBuffer);
  };

  if (type) {
    await Promise.all(sounds.map(sound => loadSound(sound[type!], sound.key)));
  }

  return audioDB;
}
