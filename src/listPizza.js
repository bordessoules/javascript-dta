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
    let list = this.db.pizzas.toArray()
    var pizzaList = document.getElementById('listePizza')
    list.then(data => {
      data.forEach(function (item) {
        var pizza = new Pizza(item.name, item.toppings, item.isCook)
        let tr = document.createElement('tr')
        let tdName = document.createElement('td')
        tdName.innerHTML = pizza.monNom()
        let tdTopping = document.createElement('td')
        tdTopping.innerHTML = pizza.toString('fr')
        let tdCook = document.createElement('td')
        // a faire

        let tdRemove = document.createElement('td')
        let RemoveButton = document.createElement('button')
        RemoveButton.innerHTML = 'Supprimer'
        RemoveButton.addEventListener('click', evt => {
          if (pizza) {
            this.deletePizza(pizza)
            console.log(pizza.monNom() + ' supprimé')
          }
        })
        tdRemove.appendChild(RemoveButton)

        tr.appendChild(tdName)
        tr.appendChild(tdTopping)
        tr.appendChild(tdCook)
        tr.appendChild(tdRemove)
        pizzaList.appendChild(tr)
      })
      // document.getElementById('test').innerHTML = html
    })
  }

}
