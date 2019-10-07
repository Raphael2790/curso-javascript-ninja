/*
Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
As regras são:

- Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
diretamente;
- O input deve iniciar com valor zero;
- Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
- Deve haver 4 botões para as operações principais: soma (+), subtração(-),
multiplicação(x) e divisão(÷);
- Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
que irá limpar o input, deixando-o com valor 0;

- A cada número pressionado, o input deve atualizar concatenando cada valor
digitado, como em uma calculadora real;
- Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
operação no input. Se o último caractere no input já for um símbolo de alguma
operação, esse caractere deve ser substituído pelo último pressionado.
Exemplo:
- Se o input tem os valores: "1+2+", e for pressionado o botão de
multiplicação (x), então no input deve aparecer "1+2x".
- Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
input;
- Ao pressionar o botão "CE", o input deve ficar zerado.
*/

(function (){
    'use strict';

    var $input = document.querySelector('#visor')
    var $botaonum = document.querySelectorAll('.btnum')
    var $botaoper = document.querySelectorAll('.btnop')
    var botaoce = document.querySelector('[data-js="CE"]')
    var botaoIgual = document.querySelector('[data-js="Igual"]')

    Array.prototype.forEach.call( $botaonum , function (item) {
        item.addEventListener('click', adicionaNumeros, false)
    })

    Array.prototype.forEach.call( $botaoper, function (item) {
        item.addEventListener('click', adicionaOperadores, false)
    })

    botaoce.addEventListener('click', limpaVisor , false)

    botaoIgual.addEventListener('click', mostraResultado, false)

    function limpaVisor() {
        $input.value = '0'
    }

    function adicionaNumeros() {
        return $input.value = $input.value + this.value
    }

    function adicionaOperadores() {
        $input.value = removeOperador($input.value)
        $input.value += this.value
    }

    function isTheLastItemAnOperator(number) {
        var operadores = ['+' , '-', '*', '/']
        var lastItem = number.split('').pop()
        return operadores.some(function (operador) {
            return operador === lastItem
        })  
    }
    
    function removeOperador(number) {
        if(isTheLastItemAnOperator(number)) {
            return number.slice(0, -1)
        }
        return number;
    }
    
    function mostraResultado() {
        $input.value = removeOperador($input.value)
        var visorValues = $input.value.match(/(?:\d+)[\+\-\*\/]?/g)
        $input.value = visorValues.reduce( function ( acumulado , atual) {
            var firstValue = acumulado.slice(0, -1);
            var operador = acumulado.split('').pop();
            var lastValue = removeOperador(atual);
            var lastOperator = isTheLastItemAnOperator(atual) ? atual.split('').pop() : ''
            switch(operador) {
                case '+':
                    return (+firstValue + +lastValue) + lastOperator;
                case '-':
                    return (+firstValue - +lastValue) + lastOperator;
                case '*' :
                    return (+firstValue * +lastValue) + lastOperator;
                case '/' :
                    return (+firstValue / +lastValue) + lastOperator;
            }
        })
    }
    

})()