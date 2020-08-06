let globalNames = ['Um', 'Dois', 'Três', 'Quatro']
let inputName = null
let isEditing = false
let currentIndex = null

const preventFormSubmit = () => {
  let form = document.querySelector('form')

  const handleFormSubmit = (event) => {
    event.preventDefault()
  }
  form.addEventListener('submit', handleFormSubmit)
}

const activateInput = () => {
  const insertName = (newName) => {
    // globalNames.push(newName)
    globalNames = [...globalNames, newName]
  }

  const updateName = (newName) => {
    globalNames[currentIndex] = newName
  }

  const handleTyping = (event) => {
    let hasText = !!event.target.value && event.target.value.trim() !== ''

    if (!hasText) {
      clearInput()
      return
    }
    if (event.key === 'Enter') {
      if (isEditing) {
        updateName(event.target.value)
      } else {
        insertName(event.target.value)
      }
      render()
      isEditing = false
      clearInput()
    }
  }
  
  inputName.addEventListener('keyup', handleTyping)
  inputName.focus()
}

const render = () => {
  const createDeleteButton = (index) => {
    const deleteName = () => {
      // globalNames.splice(index, 1)
      // globalNames = globalNames.filter((name, i) => {
        // if (i === index) {
        //   return false
        // }
        // return true
        // É a mesma coisa que:
        globalNames = globalNames.filter((_, i) => i !== index) // Se coloca um underscore, underline quando ignorar um parâmetro
      // })
      render() // Eu mexi no meu estado e o JS puro não sabe, o js puro não é reativo. Sendo assim devo chamar o render de novo
    }

    let button = document.createElement('button')
    button.classList.add('deleteButton')
    button.textContent = 'X'

    button.addEventListener('click', deleteName)

    return button
  }

  const createSpan = (name, index) => {
    const editItem = () => {
      inputName.value = name
      inputName.focus()
      isEditing = true
      currentIndex = index
    }


    let span = document.createElement('span')
    span.classList.add('clickable')
    span.textContent = name
    span.addEventListener('click', editItem)

    return span
  }

  let divNames = document.querySelector('#names')
  divNames.innerHTML = ''

  let ul = document.createElement('ul')
  
  for (let i = 0; i < globalNames.length; i++) {
    let currentName = globalNames[i]

    let li = document.createElement('li')

    let button = createDeleteButton(i)

    let span = createSpan(currentName, i)

    li.appendChild(button)
    li.appendChild(span)
    ul.appendChild(li)
  }
  
  divNames.appendChild(ul)
  clearInput()
}

window.addEventListener('load', () => {
  inputName = document.querySelector('#inputName')
  preventFormSubmit()
  activateInput()
  render()
})

const clearInput = () => {
  inputName.value = ''
  inputName.focus()
}