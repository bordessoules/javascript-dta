import Dexie from 'dexie'
import { Pizza } from './pizza.js'

export class ListPizza {
  constructor () {
    this.db = new Dexie('pizzas')
    this.db.version(1).stores({
      pizzas: '++id, name'
    })
    this.db.open()
    this.thingsToCook = []
    console.log
    this.four()
  }

  addPizza (pizza) {
    return this.db.pizzas.add(pizza)
  }

  deletePizza (pizzaId) {
    this.pizzas = this.db.pizzas.delete(pizzaId)
    return this
  }
  updatePizza (pizzaId, pizzaModification) {
    return this.db.pizzas.update(pizzaId, pizzaModification)
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
  four (thingsToCook) {
    if (this.thingsToCook && this.thingsToCook.length === 0) {
      return setTimeout(this.four.bind(this), 500)
    } else {
      console.log('je suis dans le four')
      var objectToCook = thingsToCook.shift()
      objectToCook.pizza.cook().then(() => {
        this.updatePizza(objectToCook.idPizza, { 'isCook': 'true' }).then(() => {
          objectToCook.cookField.innerHTML = 'Cuit'
          this.four(thingsToCook)
        })
      })
    }
  }

  addLinePizza (pizza, idPizza, pizzaList) {
    const tr = document.createElement('tr')
    const tdName = document.createElement('td')
    tdName.innerHTML = pizza.monNom()
    const tdTopping = document.createElement('td')
    tdTopping.innerHTML = pizza.toString('fr')
    const tdCook = document.createElement('td')
    var cookField
    if (pizza && pizza.isCook) {
      cookField = document.createElement('p')
      cookField.innerHTML = 'Cuit'
    } else {
      cookField = document.createElement('button')
      cookField.innerHTML = 'Cuire'
      cookField.addEventListener('click', function () {
        tdCook.removeChild(cookField)
        cookField = document.createElement('p')
        cookField.innerHTML = 'cooking in progress'
        tdCook.appendChild(cookField)
        this.thingsToCook.push({pizza: pizza, iPpizza: idPizza, cookField: cookField})
        this.four(this.thingsToCook)
      /* pizza.cook().then(() => {
        this.updatePizza(idPizza, { 'isCook': 'true' }).then(() => {
          cookField.innerHTML = 'Cuit'
        })
      })*/
      }.bind(this))
    }
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
    tdCook.appendChild(cookField)
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
    })
  }

}
