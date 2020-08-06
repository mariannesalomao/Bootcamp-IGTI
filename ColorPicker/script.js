// addEventListener('change') Evento de mudança de valor, mas o change só pega quando vc largar o cursor do mouse em determinado valor. O 'input' pega todo mundo

const range = document.querySelector('.color-picker')

range.addEventListener('input', () => {
  const red = document.querySelector('.red-range').value
  const green = document.querySelector('.green-range').value
  const blue = document.querySelector('.blue-range').value
  console.log(red, green, blue)

  const rgbColor = `RGB(${red}, ${green}, ${blue})`

  document.querySelector('.red-value').value = red
  document.querySelector('.green-value').value = green
  document.querySelector('.blue-value').value = blue

  document.querySelector('.square-color').style.background = rgbColor
  document.querySelector('.number-color').innerHTML = rgbColor
})