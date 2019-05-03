import { WaitForStartView } from '../graphics/WaitForStartView';

export class WaitForStart {
  public waitForStart:WaitForStartView;
  public startGame:boolean = false;

  constructor(waitForStart:WaitForStartView) {
    this.waitForStart = waitForStart;
    waitForStart.click.add(() => this.startGame = true);
  }
}
