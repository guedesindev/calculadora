export const operacoes = {
  raiz: calcularRaiz,
  '^': calcularPontenciacao,
  '!': calcularFatorial,
  log: calcularLogaritmos,
  '%': calcularPorcentagem,
  '+': somar,
  '-': subtrair,
  '*': multiplicar,
  '/': dividir,
  sin: calcularSeno,
  cos: calcularCosseno,
  tan: calcularTan,
  rad: converterRadianos,
  oposto: opostoNumero
}

function calcularRaiz(num) {
  return Math.sqrt(num)
}

function calcularPontenciacao(num1, num2) {
  return Math.pow(num1, num2)
}

function calcularFatorial(num) {
  if (num === 0 || num === 1) return 1
  let resultado = 1

  for (let i = num - 1; i > 0; i--) {
    resultado *= i
  }
  return resultado
}

function calcularPorcentagem(n, percent) {
  return n * (percent / 100)
}

//Operações Básicas
function somar(num1, num2) {
  return num1 + num2
}

function subtrair(num1, num2) {
  return num1 - num2
}

function multiplicar(num1, num2) {
  return num1 * num2
}

function dividir(num1, num2) {
  return num1 / num2
}

function opostoNumero(num) {
  return -num
}

//operacoes avançadas
function calcularLogaritmos(num) {
  return Math.log(num)
}

function calcularSeno(angle) {
  const angleRadian = angle * (Math.PI / 180)
  return Math.sin(angleRadian)
}

function calcularCosseno(angle) {
  const angleRadians = angle * (Math.PI / 180)
  return Math.cos(angleRadians)
}

function calcularTan(angle) {
  const angleRadians = angle * (Math.PI / 100)
  return Math.tan(angleRadians)
}

function converterRadianos(angle) {
  return angle * (Math.PI / 180)
}
