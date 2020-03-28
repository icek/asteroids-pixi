import { WaitForStartView } from '../graphics'

export class WaitForStartComponent {
  public waitForStart: WaitForStartView

  public startGame: boolean = false

  public constructor(waitForStart: WaitForStartView) {
    this.waitForStart = waitForStart
    waitForStart.click.add(() => {
      this.startGame = true
    })
  }
}
