export function createSearchItem({
  id,
  title,
  href,
  active,
  onStop,
  onRemove,
  onRun
}: {
  id: string
  title: string
  href: string
  active: boolean
  onStop: (id: string) => void
  onRemove: (id: string) => void
  onRun: (id: string) => void
}) {
  const item = document.createElement('tr')
  item.dataset.id = id
  item.innerHTML = `<td>${title}</td>
<td><a class="search-list__href" href="${href}" target="_blank">${href}</a></td> 
${active 
    ? `<td><button data-id="${id}" data-handler="stop" class="button">Stop</button></td>`
   : `<td><button data-id="${id}" data-handler="run" class="button">Run</button></td>`
  }
<td><button data-id="${id}" data-handler="remove" class="button">Remove</button></td>
<td>${active ? '✅' : '❌' }</td>`

  const buttonStop = item.querySelector('[data-handler="stop"]') as HTMLButtonElement
  buttonStop?.addEventListener('click', (e) => {
    onStop(e.target?.dataset.id)
  })

  const buttonRemove = item.querySelector('[data-handler="remove"]') as HTMLButtonElement
  buttonRemove.addEventListener('click', (e) => {
    onRemove(e.target?.dataset.id)
  })

  const buttonRun = item.querySelector('[data-handler="run"]') as HTMLButtonElement
  buttonRun?.addEventListener('click', (e) => {
    onRun(e.target?.dataset.id)
  })

  return item
}