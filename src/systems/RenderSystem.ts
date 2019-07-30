import { Engine, NodeList, System } from '@ash.ts/ash';
import * as PIXI from 'pixi.js';
import { RenderNode } from '../nodes';

interface RenderSystemOptions {
  emitStageEvents:boolean;
}

export class RenderSystem extends System {
  private nodes:NodeList<RenderNode> | null = null;

  private readonly renderer:PIXI.Renderer;

  private readonly stage:PIXI.Container;

  private readonly view:HTMLCanvasElement;

  private container:HTMLElement;

  private options:RenderSystemOptions;

  public constructor(container:HTMLElement, options:RenderSystemOptions = { emitStageEvents: true }) {
    super();

    this.container = container;
    this.options = options;
    const app = new PIXI.Application({
      width: container.clientWidth,
      height: container.clientHeight,
      backgroundColor: 0,
    });

    this.renderer = app.renderer;
    this.stage = app.stage;
    this.view = app.view;
  }

  public addToEngine(engine:Engine):void {
    this.container.appendChild(this.view);
    this.nodes = engine.getNodeList(RenderNode);
    for (let node:RenderNode | null = this.nodes.head; node; node = node.next) {
      this.addToDisplay(node);
    }
    this.nodes.nodeAdded.add(this.addToDisplay);
    this.nodes.nodeRemoved.add(this.removeFromDisplay);
  }

  private addToDisplay = (node:RenderNode) => {
    const { displayObject } = node.display;
    this.stage.addChild(displayObject);
    if (this.options.emitStageEvents) {
      displayObject.emit('addedToStage');
    }
  };

  private removeFromDisplay = (node:RenderNode) => {
    const { displayObject } = node.display;
    this.stage.removeChild(displayObject);
    if (this.options.emitStageEvents) {
      displayObject.emit('removedFromStage');
    }
  };

  public update(time:number):void {
    for (let node = this.nodes!.head; node; node = node.next) {
      const { display, position } = node;
      display.displayObject.setTransform(position.x, position.y, 1, 1, position.rotation);
    }
    this.renderer.render(this.stage);
  }

  public removeFromEngine(engine:Engine):void {
    this.container.removeChild(this.view);
    this.nodes = null;
  }
}
