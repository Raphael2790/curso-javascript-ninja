/*
Aproveitando a lib DOM que fizemos na semana anterior, crie agora para ela
métodos semelhantes aos que existem no array, mas que sirvam para os
elementos do DOM selecionados.
Crie os seguintes métodos:
- forEach, map, filter, reduce, reduceRight, every e some.

Crie também métodos que verificam o tipo do objeto passado por parâmetro.
Esses métodos não precisam depender de criar um novo elmento do DOM, podem
ser métodos estáticos.

Métodos estáticos não obrigam o uso do `new`, podendo ser usados diretamente
no objeto, como nos exemplos abaixo:
DOM.isArray([1, 2, 3]); // true
DOM.isFunction(function() {}); // true
DOM.isNumber('numero'); // false

Crie os seguintes métodos para verificação de tipo:
- isArray, isObject, isFunction, isNumber, isString, isBoolean, isNull.
O método isNull deve retornar `true` se o valor for null ou undefined.
*/

(function (){
    'use strict';

    var $selections = new DOM('[data-js="link"]')

    function DOM(elements) {
        this.element = document.querySelectorAll(elements)
    }

    DOM.prototype.forEach = function (){
        return Array.prototype.forEach.apply( this.element, arguments)    
    }

    DOM.prototype.map = function () {
        return Array.prototype.map.apply(this.element, arguments)
    }

    DOM.prototype.filter = function () {
        return Array.prototype.filter.apply(this.element, arguments)
    }

    DOM.prototype.every = function () {
        return Array.prototype.every.apply(this.element, arguments)
    }

    DOM.prototype.some = function () {
        return Array.prototype.some.apply(this.element, arguments)
    }

    DOM.prototype.reduce = function (){
        return Array.prototype.reduce.apply(this.element, arguments)
    }

    DOM.prototype.reduceRight = function () {
        return Array.prototype.reduceRight.apply(this.element, arguments)
    }

    DOM.prototype.isArray = function (param) {
        return Object.prototype.toString.call(param) === '[object Array]'
    }

    console.log($selections)
    $selections.forEach(function (item) {
        console.log(item)
    })

    $selections.map(function (item, index) {
        console.log(item, index)
    })

    $selections.filter(function (item, index) {
        if(index / 2 !== 0)
        console.log(item, index)
    })

    $selections.every( function (item) {
        if(item)
        console.log('O item existe')
    })

    $selections.some( function (item) {
        if(item.firstChild.nodeValue === 'Link 1')
        console.log(item)
    })

    var links =  $selections.reduce( function (acumulador,atual,index) {
        return acumulador + '' + atual.getAttribute('data-js') + '' + index
    }, 0)
    alert(links)

    var linksAoContrario =  $selections.reduceRight( function (acumulador,atual,index) {
        return acumulador + '' + atual.getAttribute('data-js') + '' + index
    })
    alert(linksAoContrario)

    alert($selections.isArray([0, 1 , 4 , 6]))

})()