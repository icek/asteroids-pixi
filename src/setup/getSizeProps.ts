import {
  maxRatio,
  designWidth,
  pixelRatio,
  designHeight,
  minRatio,
} from './dimensions'
import { Point } from '../utils/intersect'

export const getSizeProps = ({ width = 1, height = 1, ratio = pixelRatio }) => {
  const sizeRatio = width / height

  const viewportRatio = Math.min(minRatio, Math.max(maxRatio, sizeRatio))
  const viewportHeight = Math.round(designWidth * (1 / viewportRatio)) // ranges from 700 to 1300

  const canvas = { width: 0, height: 0 }
  const exceedsHeight = sizeRatio <= maxRatio
  if (exceedsHeight) {
    canvas.width = width
    canvas.height = Math.round(width * (1 / viewportRatio))
  } else {
    // widescreen, so based on height
    canvas.height = height
    canvas.width = Math.round(height * viewportRatio)
  }
  const renderer = {
    width: canvas.width * ratio,
    height: canvas.height * ratio,
  }
  const stageScale = renderer.width / designWidth
  const stageTop = ((viewportHeight - designHeight) / 2) * stageScale
  const stage = {
    scale: new Point(stageScale, stageScale),
    position: new Point(0, stageTop),
  }
  return {
    canvas,
    renderer,
    stage,
    viewport: { width: designWidth, height: viewportHeight },
  }
}

// export const useViewport = () => {
//   const { stage } = useSize()
//   const stageTop = stage.position.y
//   const stageScale = stage.scale.x
//   const extraHeight = Math.round(stageTop / stageScale)
//   return { bottom: designHeight + extraHeight, extraHeight }
// }

// export type ViewportProps = ReturnType<typeof useViewport>
