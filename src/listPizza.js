import Dexie from 'dexie'
import { Pizza } from './pizza.js'

export class ListPizza {
  constructor () {
    this.db = new Dexie('pizzas')
    this.db.version(1).stores({
      pizzas: '++id, name'
    })
    this.db.open()
  }

  addPizza (pizza) {
    return this.db.pizzas.add(pizza)
  }

  deletePizza (pizzaId) {
    this.pizzas = this.db.pizzas.delete(pizzaId)
    return this
  }

  getPizzas () {
    return this.db.pizzas.toArray()
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

  addLinePizza (pizza, idPizza, pizzaList) {
    const tr = document.createElement('tr')
    const tdName = document.createElement('td')
    tdName.innerHTML = pizza.monNom()
    const tdTopping = document.createElement('td')
    tdTopping.innerHTML = pizza.toString('fr')
    const tdCook = document.createElement('td')
    const cookButton = document.createElement('button')
    cookButton.innerHTML = 'Cuire'
    cookButton.addEventListener('click', function () {
      if (pizza && !pizza.isCook) {
        pizza.cook()
        document.activeElement.parentNode.innerHTML = 'cuit!!!'
      }
    })
    const tdRemove = document.createElement('td')
    const removeButton = document.createElement('button')
    removeButton.innerHTML = 'Supprimer'
    removeButton.addEventListener('click', function () {
      if (pizza) {
        this.deletePizza(idPizza)
        console.log(pizza.monNom() + ' supprimé')
        pizzaList.removeChild(tr)
      }
    }.bind(this))
    tdRemove.appendChild(removeButton)
    tdCook.appendChild(cookButton)
    tr.appendChild(tdName)
    tr.appendChild(tdTopping)
    tr.appendChild(tdCook)
    tr.appendChild(tdRemove)
    return tr
  }

  addHtml () {
    const pizzaList = document.getElementById('listePizza')
    this.getPizzas().then(data => {
      data.forEach((item) => {
        const pizza = new Pizza(item.name, item.toppings, item.isCook)
        const tr = this.addLinePizza(pizza, item.id, pizzaList)
        pizzaList.appendChild(tr)
      })
    // document.getElementById('test').innerHTML = html
    })
  }

}
