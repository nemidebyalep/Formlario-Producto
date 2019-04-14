var inputs = document.getElementsByClassName('formulario__input');
for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('keyup', function(){
        if(this.value.length>=1){
            this.nextElementSibling.classList.add('fijar');
        }else{
            this.nextElementSibling.classList.remove('fijar');
        }
    });
}


var productos = [];

function enviar() {
    let nom = document.getElementById('nombre').value;
    let pre = document.getElementById('precio').value;
    let cant = document.getElementById('cantidad').value;
    console.log(nom);
    console.log(pre);
    console.log(cant);
    let p = parseFloat(pre);
    let cat = parseInt(cant);
    let sub = p*cat;
    console.log(p);
    console.log(cat);
    console.log(sub);

    var objProduct = {
        nombre : nom,
        precio : p,
        cantidad : cat,
        subtotal : sub
    }

    productos.push(objProduct);

    listar();

    document.getElementById("nombre").value = '';
    document.getElementById("precio").value = "";
    document.getElementById("cantidad").value = "";
}

function listar(){
    let contenido = '';
    let suma = 0.0;
    for (let i = 0; i < productos.length; i++) {
        const element = productos[i];
        suma += parseFloat(element.subtotal);
        contenido = contenido + '<tr><td>' + (i+1) + '</td><td>' + element.nombre + '</td><td>' + element.precio + 
        '</td><td>' + element.cantidad + '</td><td>' + element.subtotal + '</td><td>'+ '<img src="image/modificar.png" width="30px" onclick="modificar(' + i + ')">' + 
        '<img src="image/supri.png" width="30px" onclick="eliminar(' + i +')">' + '</td></tr>';
    }
    console.log(suma);
    let igv = suma*0.18;
    let total = suma + igv;
    document.getElementsByTagName('tbody')[0].innerHTML = contenido;
    document.getElementById('total_sub').value = suma;
    document.getElementById('igv').value = igv;
    document.getElementById('total').value = total;
    let data = document.getElementsByTagName("td");
    alinear_tdata(data);
}
function alinear_tdata(data){
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        element.classList.add('dato');
    }
}

function eliminar(index) {
    console.log(index);
    if (confirm("Confirmar eliminación de producto")) {

        productos.splice(index , 1);
        listar();
    }
}

function modificar(index){
    console.log(index);
    document.getElementById("nombre").value = productos[index].nombre;
    document.getElementById("precio").value = productos[index].precio;
    document.getElementById("cantidad").value = productos[index].cantidad;
    document.getElementById('boton_enviar').innerHTML = '<input type="submit" value="Modificar" class="formulario__submit btn_modificar" onclick="cambiar(' + index + ')">';

}

function cambiar(index){
    let nom = document.getElementById('nombre').value;
    let pre = document.getElementById('precio').value;
    let cant = document.getElementById('cantidad').value;
    console.log(nom);
    console.log(pre);
    console.log(cant);
    let p = parseFloat(pre);
    let cat = parseInt(cant);
    let sub = p*cat;
    console.log(p);
    console.log(cat);
    console.log(sub);
    var objProduct = {
        nombre : nom,
        precio : p,
        cantidad : cat,
        subtotal : sub
    }
    productos[index] = objProduct;
    listar();

    document.getElementById("nombre").value = '';
    document.getElementById("precio").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById('boton_enviar').innerHTML = '<input type="submit" class="formulario__submit" onclick="enviar()">';
}