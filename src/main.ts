import { initNonogram } from './nonogram'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div id="game"></div>
  </div>
`

initNonogram(document.querySelector<HTMLDivElement>('#game')!)
