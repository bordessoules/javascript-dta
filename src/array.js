var array = [1, 2, 3, 4, 5]

var isEven = function (v) {
  return v % 2 === 0
}

var evens1 = array.filter(isEven)
var evens2 = array.reduce(function (accu, item, index, array) {
  if (isEven(item)) {
    accu.push(item)
  }
  return accu
}, [])

function filtre (array, filtre) {
  return array.reduce(function (acc, item) {
    if (filtre(item)) {
      acc.push(item)
    }
    return acc
  }, [])
}

var evens3 = filtre(array, isEven)

console.log(evens1, evens2, evens3)
