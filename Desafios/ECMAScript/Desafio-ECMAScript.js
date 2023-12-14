class ProductManager {
    constructor() {
        this.products = []
    }

    addProduct(title, description, price, thumbnail, code, stock) {

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return "No product was added, please complete all fields";
        }

        const codeRepeat = this.products.find(product => product.code === code)

        if (codeRepeat) {
            return "Code already exists"
        }

        const newProduct = {
            id: this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }

        this.products.push(newProduct)
        return "Product added successfully";
    }

    getProducts() {
        if (this.products.length === 0) {
            return "List empty";
        }
        return this.products;
    }

    getProductById(id) {
        const prodId = this.products.find(product => product.id === id)
        if (prodId) {
            return prodId
        } else {
            return "Not found"
        }
    }
}



// Se agregan productos

const producto1 = new ProductManager()

console.log(producto1.addProduct("Puzzle Ravensburger Ciervo", "Puzzle Ravensburger Ciervo en Primavera de 1000 Piezas", 10000, "../images/ravensburger/ravensburger-ciervo-1000.webp", "r1", 12));

console.log(producto1.addProduct("Puzzle Ravensburger Jardín Japonés", "Puzzle Ravensburger Jardín Japonés de 1000 Piezas", 10000, "../images/ravensburger/ravensburger-jardin-japones-1000.webp", "r2", 21));

console.log(producto1.addProduct("Puzzle Educa Maravillas del Mundo", "Puzzle Educa Maravillas del Mundo de 1000 Piezas", 8000, "../images/educa/educa-mundo-1000.webp", "e2", 17));



// consultas

console.log(producto1.getProducts());
console.log(producto1.getProductById(2));
console.log(producto1.getProductById(4));



// producto repetido

console.log(
    producto1.addProduct("Puzzle de madera Sweet Cat", "Puzzle de madera Sweet Cat de 1000 Piezas", 15000, "../images/madera/puzzle-madera-1000-gato.jpg", "e2", 4)
);


// prodcuto informacion faltante

console.log(
    producto1.addProduct("Puzzle de madera Sweet Cat de 1000 Piezas", 15000, "m1", 4)
);
