const obj = {
  cantidad: 20,
  obtenerCantidad: function() {
    return this.cantidad
  }
}

console.log(obj.cantidad)
console.log(obj.obtenerCantidad())

const instancia = obj.obtenerCantidad.bind(obj)
console.log(instancia())