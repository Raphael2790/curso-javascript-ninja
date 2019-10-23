  /*
  No HTML:
  - Crie um formulário com um input de texto que receberá um CEP e um botão
  de submit;
  - Crie uma estrutura HTML para receber informações de endereço:
  "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
  preenchidas com os dados da requisição feita no JS.
  - Crie uma área que receberá mensagens com o status da requisição:
  "Carregando, sucesso ou erro."

  No JS:
  - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
  deve ser limpo e enviado somente os números para a requisição abaixo;
  - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
  "https://viacep.com.br/ws/[CEP]/json/", onde [CEP] será o CEP passado
  no input criado no HTML;
  - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
  com os dados recebidos.
  - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
  a mensagem: "Buscando informações para o CEP [CEP]..."
  - Se não houver dados para o CEP entrado, mostrar a mensagem:
  "Não encontramos o endereço para o CEP [CEP]."
  - Se houver endereço para o CEP digitado, mostre a mensagem:
  "Endereço referente ao CEP [CEP]:"
  - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
  adicionar as informações em tela.
  */

(() => {
  'use strict';

    var $selections = new DOM('[data-js="link"]')

    function DOM(elements) {
        this.element = document.querySelectorAll(elements)
    }

    DOM.prototype.on = function on(eventType, callback) {
      Array.prototype.forEach.call(this.element, function (element) {
        element.addEventListener(eventType, callback, false);
      })
    }
    
    DOM.prototype.off = function off(eventType, callback) {
      Array.prototype.forEach.call( this.element, function (element) {
        element.removeEventListener(eventType, callback, false);
      })
    }
    
    DOM.prototype.get = function get () {
      return this.element
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

    DOM.prototype.isObject = function (param) {
        return Object.prototype.toString.call(param) === '[object Object]'
    }

    DOM.prototype.isFunction = function (param) {
        return Object.prototype.toString.call(param) === '[object Function]'
    }

    DOM.prototype.isNumber = function (param) {
        return Object.prototype.toString.call(param) === '[object Number]'
    }

    DOM.prototype.isString = function (param) {
        return Object.prototype.toString.call(param) === '[object String]'
    }

    DOM.prototype.isBoolean = function (param) {
        return Object.prototype.toString.call(param) === '[object Boolean]'
    }

    DOM.prototype.isNull = function (param) {
        return Object.prototype.toString.call(param) === '[object Null]' ||
        Object.prototype.toString.call(param) === '[object Undefined]'
    }

    var $formCEP = new DOM('[data-js="form-cep"]')
    var $inputCEP = new DOM('[data-js="input-cep"]')
    $formCEP.on('submit', handleClickSubmitForm, false)
    var ajax = new XMLHttpRequest()

    function handleClickSubmitForm() {
      event.preventDefault()
      var url = `http://apps.widenet.com.br/busca-cep/api/cep/${cleanCEP()}.json`
      ajax.open('GET', url);
      ajax.send();
      ajax.addEventListener('readystatechange', handleReadyStateChange)
    }

    function cleanCEP() {
      var regex = new RegExp('\D', 'g')
      return $inputCEP.get()[0].value.replace(regex, '')
    }

    function handleReadyStateChange() {
      if(isRequestOk()) 
       fillCEPFields()
    }

    function isRequestOk() {
      return ajax.readyState === 4 && ajax.status === 200;
    }

    function fillCEPFields() {
      var data = parseData();
      var $logradouro = new DOM('[data-js="logradouro"]')
      var $bairro = new DOM('[data-js="bairro"]')
      var $estado = new DOM('[data-js="estado"]')
      var $cidade = new DOM('[data-js="cidade"]')
      var $cep = new DOM('[data-js="cep"]')
      $logradouro.get()[0].textContent = ` ${data.address}`
      $bairro.get()[0].textContent = ` ${data.district}`
      $estado.get()[0].textContent = ` ${data.state}`
      $cidade.get()[0].textContent = ` ${data.city}`
      $cep.get()[0].textContent = ` ${data.code}` 
    }

    function parseData() {
      var result;
      try {
        result = JSON.parse(ajax.responseText);
      } catch (error) {
        result = null;
      }
      return result
    }

})()