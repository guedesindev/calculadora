import { operacoes } from './operacoes.js'
import { constantes } from './constantes.js'

const numberDisplay = document.getElementById('number-display')
const operationDisplay = document.getElementById('operation-display')
const teclas = document.querySelectorAll('.tecla')

const MAX_LENGTH = 10
const pilha = []
let substituirDisplay = false

inicializarDisplay()
registrarEventos()

function inicializarDisplay() {
  numberDisplay.textContent = '0'
}

/** Captar qual tecla foi clicada e recebe o dataset do elemento html */
function registrarEventos() {
  teclas.forEach((tecla) => {
    tecla.addEventListener('click', (e) => {
      processarEntrada(e.target.dataset)
    })
  })
}

/**
 * @param dataset
 * Processar o dataset recebido por meio do click
 */
function processarEntrada(dataset) {
  const tipo = Object.keys(dataset)[0]
  if (tipo === 'op') {
    processarOperacao(dataset.op)
  } else if (tipo === 'num') {
    atualizarDisplay(dataset.num)
  } else if (tipo === 'consts') {
    inserirConstante(dataset.consts)
  } else if (tipo === 'signals') {
    processarSignal(dataset.signals)
  }
}

/**
 * @param {*} operacao
 */
function processarOperacao(operacao) {
  if (operacao === 'raiz') {
    calcularRaiz()
    return
  }

  if (operacao === '!') {
    calcularFatorial()
    return
  }

  if (operacao === 'log') {
    calcularLog()
    return
  }

  //Trogonométricas

  if (['sin', 'cos', 'tan', 'rad', 'inv', 'oposto'].includes(operacao)) {
    calcularTrigs(operacao)
    return
  }

  if (['+', '-', '*', '/', '^', '%'].includes(operacao)) {
    prepararNovaOperacao(operacao)
  }
}

function processarSignal(signal) {
  if (signal === 'clear') {
    limparDisplay()
    return
  }
  if (signal === '=') {
    calcularResultado()
    return
  }
  if (signal === ',') {
    console.log('Sinal: ', signal)
    criarDecimal()
    return
  }

  if (signal === 'parentesis') {
    console.log('Sinal: ', signal)
    inserirParentesis()
    return
  }
}

function inserirConstante(consts) {
  if (consts === 'ln2') {
    atualizarDisplay(constantes[consts])
    return
  }
  if (consts === 'ln10') {
    atualizarDisplay(constantes[consts])
    return
  }
  if (consts === 'pi') {
    atualizarDisplay(constantes[consts])
    return
  }
  if (consts === 'e') {
    atualizarDisplay(constantes[consts])
  }
}

/**
 *
 * @param {*} numero
 */
function atualizarDisplay(numero) {
  if (substituirDisplay) {
    numberDisplay.textContent = numero
    substituirDisplay = false
  } else {
    numberDisplay.textContent =
      numberDisplay.textContent === '0'
        ? numero
        : numberDisplay.textContent + numero
  }

  numberDisplay.textContent = numberDisplay.textContent.substring(0, 12)
}

/**
 * @param null
 * Método para limpar display
 */
function limparDisplay() {
  numberDisplay.textContent = '0'
  operationDisplay.textContent = ''
  pilha.length = 0 //Zerar pilha corretamente
}

/**
 * @param
 * Realizar a operação de radiciação de um número.
 */
function calcularRaiz() {
  const num = parseFloat(numberDisplay.textContent)
  // if (num < 0) {
  //   numberDisplay.textContent = 'Error'
  //   return
  // }

  const resultado = num < 0 ? 'Error' : operacoes['raiz'](num)
  numberDisplay.textContent = limitarDisplay(resultado)
  operationDisplay.textContent = ''
  pilha[0] = resultado //Atualiza a pilha com o resultado
  substituirDisplay = true
}

function calcularFatorial() {
  const num = parseFloat(numberDisplay.textContent)

  const resultado = num <= 1 ? 1 : operacoes['!'](num)
  numberDisplay.textContent = limitarDisplay(resultado)
  operationDisplay.textContent = ''

  pilha[0] = resultado
  substituirDisplay = true
}

function calcularLog() {
  const num = parseFloat(numberDisplay.textContent)
  const resultado = operacoes['log'](num)
  numberDisplay.textContent = limitarDisplay(resultado)
  operationDisplay.textContent = `log(${num})`

  pilha[0] = resultado
  substituirDisplay = true
}

/**
 *
 * @returns null
 * Realizar a operação com os números e operador
 * que preencheram a pilha. Os dados estão no
 * displayNumber e no operationNumber.
 */
function calcularResultado() {
  if (pilha.length < 2) return

  const [num1, operador] = pilha
  const num2 = parseFloat(numberDisplay.textContent)

  if (!operacoes[operador]) return

  const resultado = operacoes[operador](num1, num2)
  numberDisplay.textContent = resultado
  operationDisplay.textContent = ''
  pilha[0] = resultado //mantendo o resultado na pilha para futuras operações
  pilha.length = 1 //Remove a operação
  substituirDisplay = true
}

function prepararNovaOperacao(operacao) {
  //Se já existe uma operação pendente, resolve antes de adicionar uma nova
  if (pilha.length === 2) {
    calcularResultado()
  }

  pilha[0] = parseFloat(numberDisplay.textContent)
  pilha[1] = operacao

  operationDisplay.textContent += `${pilha[0]} ${operacao}`
  numberDisplay.textContent = 0
}

function limitarDisplay(valor) {
  return valor.toString().substring(0, 10)
}

// Funções trigonométricas
function calcularTrigs(op) {
  const angle = parseFloat(numberDisplay.textContent)
  let resultado = operacoes[op](angle)
  numberDisplay.textContent = resultado.toString().substring(0, 12)
  pilha[0] = resultado
  substituirDisplay = true
}

function inserirParentesis() {
  let num = numberDisplay.textContent.trim()

  if (num.length >= MAX_LENGTH) return // Restringe ao limite de caracteres

  let abertos = (num.match(/\(/g) || []).length
  let fechados = (num.match(/\)/g) || []).length

  // Se o último caractere for número ou ")", adiciona ")"
  if (/\d|\)/.test(num.slice(-1)) && abertos > fechados) {
    numberDisplay.textContent += ')'
  }
  // Se o último caractere for um operador ou o visor estiver vazio, adiciona "("
  else if (num === '' || /[\+\-\*\/\(]$/.test(num.slice(-1))) {
    numberDisplay.textContent += '('
  }
}

function criarDecimal() {
  let num = numberDisplay.textContent

  if (num === '' || /[\+\-\*\/\(]$/.test(num)) {
    numberDisplay.textContent += '0.'
    return
  }

  let partes = num.split(/[\+\-\*\/\(\)]/)
  let ultimoNumero = partes[partes.length - 1]

  if (ultimoNumero.includes('.')) {
    return
  } else {
    numberDisplay.textContent += '.'
  }
}
