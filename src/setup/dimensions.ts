export const maxRatio = 6 / 13
export const designRatio = 6 / 8 // 4 / 3
export const minRatio = 6 / 7

export const designWidth = 288
export const viewportWidth = designWidth
export const designHeight = designWidth * (1 / designRatio) // 800
export const minHeight = designWidth * (1 / minRatio)
export const maxHeight = designWidth * (1 / maxRatio)
export const pixelRatio = window.devicePixelRatio || 1
export const center = {
  x: designWidth / 2,
  y: designHeight / 2,
  anchor: 0.5,
}

export const centerBottom = {
  x: designWidth / 2,
  y: designHeight,
  anchor: 0.5,
}
