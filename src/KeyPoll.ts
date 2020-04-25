/* eslint-disable no-bitwise */
const WORD_SIZE = 32;

export class KeyPoll {
  private keys:Int32Array = new Int32Array(4);

  public constructor() {
    window.addEventListener('keyup', this.keyUpHandler);
    window.addEventListener('keydown', this.keyDownHandler);
  }

  public isDown(key:number):boolean {
    const i = Math.floor(key / WORD_SIZE);
    return (this.keys[i] & (1 << key - i * WORD_SIZE)) !== 0;
  }

  public isUp(key:number):boolean {
    return !this.isDown(key);
  }

  private keyDownHandler = (event:KeyboardEvent):void => {
    const { keyCode } = event;
    const index = Math.floor(keyCode / WORD_SIZE);
    this.keys[index] |= (1 << keyCode - index * WORD_SIZE);
  };

  private keyUpHandler = (event:KeyboardEvent):void => {
    const { keyCode } = event;
    const index = Math.floor(keyCode / WORD_SIZE);
    this.keys[index] &= ~(1 << keyCode - index * WORD_SIZE);
  };
}
