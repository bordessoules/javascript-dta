import Dexie from 'dexie'
import { Pizza } from './pizza.js'

export class ListPizza {
  constructor () {
    this.db = new Dexie('pizzas')
    this.db.version(1).stores({
      pizzas: '++id, name'
    })
    this.db.open()
    this.pizzaAttenteCuisson = []
    this.fourActif = false
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

  tamponFunction () {
    if (!this.fourActif && this.pizzaAttenteCuisson.length === 1) {
      this.fourActif = true
      this.cuissonFour().then(() => {
        this.fourActif = false
      })
    }
  }

  cuissonFour () {
    let pizzaACuir = this.pizzaAttenteCuisson.shift()
    return pizzaACuir['pizza'].cook(3000)
      .then(function () {
        this.updatePizza(pizzaACuir['id'], { 'isCook': 'true' }).then(() => {
          pizzaACuir['field'].innerHTML = 'Cuit'
        })
        if (this.pizzaAttenteCuisson.length !== 0) {
          this.cuissonFour(this.pizzaAttenteCuisson)
        }
      }.bind(this))
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
        this.pizzaAttenteCuisson.push({ pizza: pizza, field: cookField, id: idPizza })
        this.tamponFunction()

        // pizza.cook().then(() => {
        //   this.updatePizza(idPizza, { 'isCook': 'true' }).then(() => {
        //     cookField.innerHTML = 'Cuit'
        //   })
        // })
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
