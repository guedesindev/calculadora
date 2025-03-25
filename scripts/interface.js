const operacoesContainer = document.querySelector('.operacoes-container')
const tecladoNumerico = document.querySelector('.comprimido')

const btn = document.querySelector('[data-op="open"]')

function toggleOperacoes() {
  operacoesContainer.classList.toggle('show')
  tecladoNumerico.classList.toggle('comprimido')
}

btn.addEventListener('click', toggleOperacoes)
