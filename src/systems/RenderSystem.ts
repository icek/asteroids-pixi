import { Engine, NodeList, System } from '@ash.ts/ash'
import * as PIXI from 'pixi.js'
import { RenderNode } from '../nodes'
import { getSizeProps } from '../setup/getSizeProps'

interface RenderSystemOptions {
  emitStageEvents: boolean
}

export class RenderSystem extends System {
  private nodes: NodeList<RenderNode> | null = null

  private readonly renderer: PIXI.Renderer

  private readonly stage: PIXI.Container

  private readonly view: HTMLCanvasElement

  private container: HTMLElement

  private options: RenderSystemOptions

  public constructor(
    container: HTMLElement,
    options: RenderSystemOptions = { emitStageEvents: true },
  ) {
    super()

    this.container = container
    this.options = options
    const app = new PIXI.Application({
      width: container.clientWidth,
      height: container.clientHeight,
      backgroundColor: 0,
    })

    this.renderer = app.renderer
    this.stage = app.stage
    this.view = app.view

    // const canvas = app.view
    // const { renderer, stage } = app
    // const onResize = () => {
    //   const sizeProps = getSizeProps({
    //     width: window.innerWidth,
    //     height: window.innerHeight,
    //   })

    //   Object.assign(stage, sizeProps.stage)

    //   renderer.resize(sizeProps.renderer.width, sizeProps.renderer.height)
    //   canvas.style.width = `${sizeProps.canvas.width}px`
    //   canvas.style.height = `${sizeProps.canvas.height}px`
    // }
    // onResize()
    // window.addEventListener('resize', onResize)
  }

  public addToEngine(engine: Engine): void {
    this.container.appendChild(this.view)
    this.nodes = engine.getNodeList(RenderNode)
    for (
      let node: RenderNode | null = this.nodes.head;
      node;
      node = node.next
    ) {
      this.addToStage(node)
    }
    this.nodes.nodeAdded.add(this.addToStage)
    this.nodes.nodeRemoved.add(this.removeFromStage)
  }

  private addToStage = (node: RenderNode) => {
    this.stage.addChild(node.display.object)
    if (this.options.emitStageEvents) {
      node.display.object.emit('addedToStage')
    }
  }

  private removeFromStage = (node: RenderNode) => {
    this.stage.removeChild(node.display.object)
    if (this.options.emitStageEvents) {
      node.display.object.emit('removedFromStage')
    }
  }

  public update(time: number): void {
    for (let node = this.nodes!.head; node; node = node.next) {
      const { display, transform } = node
      display.object.setTransform(
        transform.x,
        transform.y,
        1,
        1,
        transform.rotation,
      )
    }
    this.renderer.render(this.stage)
  }

  public removeFromEngine(engine: Engine): void {
    this.container.removeChild(this.view)
    this.nodes = null
  }
}
