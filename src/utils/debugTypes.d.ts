declare let log: typeof console.log

interface Window {
  log: typeof log
}
