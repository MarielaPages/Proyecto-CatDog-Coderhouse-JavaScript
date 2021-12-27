/*capturo los elementos del formulario y le digo al usuario que se tomo su mensaje*/
class ClienteForm{
    constructor(nombre, email, mensaje, sexo){
        this.nombre = nombre;
        this.email = email;
        this.mensaje = mensaje;
        this.sexo = sexo;
    }  
}

$("#buttonForm").on("click", validarFormulario);

function validarFormulario(e){
    e.preventDefault();
    let nombre = document.getElementById("nombre-usuario").value;
    let email = document.getElementById("mail").value;
    let mensaje = document.getElementById("message").value;
    let sexo; 
    elemntosSex = document.getElementsByName("sex");
    elemntosSex.forEach((item) => { 
        if (item.checked == true) {sexo = item.value;} 
    })
    let cliente = new ClienteForm(nombre, email, mensaje, sexo);
    console.log(cliente);
    mensajeTomado(cliente);
}

const URLPOST = "https://jsonplaceholder.typicode.com/posts"
function mensajeTomado(cliente){
    $.post(URLPOST, cliente, (response, estado) => {
        if (estado === "success"){
            let formulario = document.getElementById("form");
            formulario.parentNode.removeChild(formulario);
            $("#divFormulario").append(`<p class="textCenter fontBig"><b>Thank you ${response.nombre} for you message. We will contact you soon</b></p>`);
        }
    })
}

//animacion del formulario
$(document).ready(function(){
    $("#divFormulario").css("opacity", "0.5")
                    .slideUp(0)
                    .slideDown(2000, () => {
                        $("#divFormulario").css("opacity", "1")
                    });
})