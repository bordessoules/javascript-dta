var _toppings = [
  'tomato sauce',
  'mozzarella',
  'mushrooms',
  'ham',
  'eggs',
  'artichoke',
  'green olives',
  'onion',
  'sweet corn',
  'green peppers',
  'black olives',
  'peas',
  'salami'
]

export var _map = {
  'tomato_sauce': {'fr': 'sauce tomate', 'en': 'tomato sauce'},
  'mozzarella': {'fr': 'mozzarelle', 'en': 'mozzarella'},
  'mushrooms': {'fr': 'champignon', 'en': 'mushrooms'},
  'ham': {'fr': 'jambon', 'en': 'ham'},
  'eggs': {'fr': 'oeuf', 'en': 'eggs'},
  'artichoke': {'fr': 'articho', 'en': 'artichoke'},
  'green_olives': {'fr': 'olives verte', 'en': 'green olives'},
  'onion': {'fr': 'oignon', 'en': 'onion'},
  'sweet_corn': {'fr': 'mais', 'en': 'sweet corn'},
  'green_peppers': {'fr': 'poivre vert', 'en': 'green peppers'},
  'black_olives': {'fr': 'olive noir', 'en': 'black olives'},
  'peas': {'fr': 'pois', 'en': 'peas'},
  'salami': {'fr': 'salami', 'en': 'salami'}
}

export class Pizza {
  constructor (name, toppings, isCook) {
    this.name = name || 'default_name'
    this.toppings = toppings || []
    this.isCook = isCook || false
  }


  monNom () {
    return this.name
  }

  setNom (name) {
    this.name = name || 'default_name'
    return this
  }

  addTopping (toppings) {
    const filtre = function (v) {
      return v === toppings
    }

    if (_toppings.filter(filtre).length !== 0 && this.toppings.filter(filtre).length < 2) {
      this.toppings.push(toppings)
    }
    return this
  }

  deleteTopping (toppings) {
    const filtre = function (v) {
      return v !== toppings
    }
    this.toppings = this.toppings.filter(filtre)
    return this
  }

  toString (lang = 'en') {
    var chaine = ''
    const uniqueArray = this.toppings.reduce(function (accu, item, index, array) {
      if (accu.indexOf(item) === -1) {
        accu.push(item)
      }
      return accu
    }, [])
    const self = this
    chaine += '<td>'
    uniqueArray.forEach(function (item, index, array) {
      var nb = self.toppings.reduce(function (accu, item1) {
        if (item1 === item) {
          return accu + 1
        }
        return accu
      }, 0)
      chaine += self.translate(item, lang) + ' (' + nb + ')'
      if (index < array.length - 1) chaine += ','
    })
    return chaine + '</td>'
  }

  translate (topping, lang = 'en') {
    return _map[topping][lang] || topping
  }

  isToppingPresent (topping) {
    if (this.toppings.indexOf(topping) === -1) {
      return false
    }
    return true
  }

  cook (time = 1000) {
    return new Promise((resolve, reject) => {
      if (this.isCook) return reject('pizza déjà cuite')

      setTimeout(() => {
        this.isCook = true
        resolve()
      }, time)
    })
  }
}
