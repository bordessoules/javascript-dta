import {Pizza, _map} from './pizza.js'
import {ListPizza} from './listPizza.js'

var p = new Pizza('peperoni')
var t = new Pizza('reine')

t
  .addTopping('mushrooms')
  .addTopping('mushrooms')
  .addTopping('ham')
  .addTopping('peas')
p
  .addTopping('test')
  .addTopping('test')
  .addTopping('test')
  .addTopping('test')
  .addTopping('mozzarella')
  .addTopping('mozzarella')
  .addTopping('mozzarella')
  .addTopping('eggs')
  .addTopping('ham')

var arrayPizza = new ListPizza()

// arrayPizza.addPizza(t)
// p.cook(2000)
//   .then(() => console.log('pizza cuite'))
//   .then(() => {
//     t.cook(2000)
//       .then(() => console.log('pizza cuite'),
//        (error) => console.log(error))
//   })

arrayPizza.addHtml()

let pizza = null

document.getElementById('addPizza')
  .addEventListener('click', function (evt) {
    if (!pizza) {
      const value = document.getElementById('value_addPizza')
      pizza = new Pizza(value.value)
      console.log('Pizza en préparation')
    }
  }, false)

var toppingsButtons = document.getElementById('toppings')
Object.keys(_map).forEach(topping => {
  const toppingButton = document.createElement('button')
  toppingButton.innerHTML = _map[topping]['fr']
  toppingButton.addEventListener('click', evt => {
    if (pizza) {
      pizza.addTopping(topping)
      console.log(_map[topping]['fr'] + ' ajouté')
    }
  })
  toppingsButtons.appendChild(toppingButton)
})

document.getElementById('enregistrer')
  .addEventListener('click', function (evt) {
    if (pizza) {
      arrayPizza.addPizza(pizza)
      console.log('pizza ajouté')
      pizza = null
      arrayPizza.addHtml()
    }
  }, false)


// function getAvg (array) {
//   return array.reduce((acc, cv, idx, arr) => acc + cv / arr.length, 0)
// }


// function getUser (api) {
//   return fetch(api)
//     .then(response => {
//       if (!response.ok) throw Error(response.status)
//       return response.json()
//     })
// }

// Promise.all([
//   getUser('/user1.json'),
//   getUser('/user2.json')
// ])


// let cacheOfUsers =
//   {
//     'users': null,
//     'users1': null,
//     'users2': null
//   }

// function getUsers (file = 'users') {

//   // si cache existe l'utiliser
//   if (cacheOfUsers[file]) return Promise.resolve(cacheOfUsers[file])

//   // sinon faire la requête et mettre en cache
//   return fetch(file + '.json')
//     // tranforme la réponse http en json
//     .then((response) => {
//       if (!response.ok) throw Error(response.status)
//       return response.json()
//     })
//     .then(data => {
//       cacheOfUsers[file] = data
//       return cacheOfUsers[file]
//     })
// }


// getUsers('users')
//  .then(users => {
//    console.log('1', users)
//  })

// setTimeout(function () {
//   getUsers('users')
//   .then(users => {
//     console.log('2', users)
//   })
// }, 1000)

// setTimeout(function () {
//   getUsers('users1')
//   .then(users => {
//     console.log('3', users)
//   })
// }, 2000)
