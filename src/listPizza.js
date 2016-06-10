import Dexie from 'dexie'
import {Pizza} from './pizza.js'

export class ListPizza {
  constructor () {
    this.db = new Dexie('pizzas')
    this.db.version(1).stores({
      pizzas: '++id, name'
    })
    this.db.open()
    this.pizzas = []
  }

  addPizza (pizza) {
    this.db.pizzas.add(pizza)
    return this
  }

  deletePizza (pizza) {
    const filtre = function (v) {
      return v !== pizza
    }
    this.pizzas = this.pizzas.filter(filtre)
    return this
  }

  filtre (topping) {
    const newArray = new ListPizza()
    this.pizzas.forEach(function (item) {
      if (item.isToppingPresent(topping)) {
        newArray.addPizza(item)
      }
    })
    return newArray
  }

  addHtml () {
    let html = '<thead><tr><td>Nom pizza</td><td>Ingredients</td><td>Cuisson</td></tr></thead>'
    let list = this.db.pizzas.toArray()
    list.then(data => {
      data.forEach(function (item) {
        var pizza = new Pizza(item.name, item.toppings, item.isCook)
        html += '<tr><td>' + pizza.monNom() + '</td>'
        html += pizza.toString('fr')
        html += '</tr>'
      })
      document.getElementById('test').innerHTML = html
    })
  }

}
