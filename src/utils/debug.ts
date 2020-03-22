export const debug = false

// @ts-ignore
window.log = (...params: any[]) => {
  if (debug) {
    console.log(...params)
  }
}
