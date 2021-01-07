
// CODIGO NECESARIO PARA REALIZAR LAS DIFERENTES FUNCIONES DE LA APLICACION


// ELIMINAR EMPLEADO
function eliminarEmpleado() {
    var seleccion = $$("tabla_empleados");
    var itemID = seleccion.getSelectedId();
    if (itemID) {
        webix.confirm("¿Eliminar?", "confirm-warning").then(function () {
            seleccion.remove(itemID);
            webix.ajax().del("https://empleados1.herokuapp.com/api/v1/empleados/eliminar", { id: itemID.id }).then(function (data) {
                console.log(data.text());
            });
        });
    } else {
        mostrarMensaje();
    }
};


// DESPLEGAR VENTANA EMERGENTE PARA CREAR EMPLEADO
function nuevoEmpleado() {
    var nuevo = $$("vtn_nuevo");
    $$("nuevo_form").clear();
    nuevo.show();
};


// GUARDAR NUEVO EMPLEADO 
function saveNuevo() {
    var saveEmpleado = $$("nuevo_form").getValues();
    webix.ajax().post('https://empleados1.herokuapp.com/api/v1/empleados', saveEmpleado).then(function (data) {
        console.log(data.text());
    });
    var ventanaNueva = $$("vtn_nuevo");
    ventanaNueva.hide();
    $$("tabla_empleados").load("https://empleados1.herokuapp.com/api/v1/empleados");
};


// EDITAR EMPLEADO
function editarEmpleado() {
    var seleccion = $$("tabla_empleados");
    var itemID = seleccion.getSelectedId();

    if (itemID) {
        var editarEmpleado = $$("vtn_editar");
        editarEmpleado.show();

        var values = $$("tabla_empleados").getItem(itemID);
        $$("edit_form").setValues(values)
    } else {
        mostrarMensaje();
    }
};


// GUARDAR EMPLEADO EDITADO
function saveEditado() {
    var formulario = $$("edit_form");
    var tabla = $$("tabla_empleados");
    var ventanaForm = $$("vtn_editar");
    var saveEmpleado = formulario.getValues();

    tabla.updateItem(saveEmpleado.id, saveEmpleado);
    webix.ajax().post('https://empleados1.herokuapp.com/api/v1/empleados/edit', saveEmpleado).then(function (data) {
        console.log(data.text());
    });

    ventanaForm.hide();
};


// ACTUALIZAR DATOS
function actualizarDatos() {
    $$("tabla_empleados").load("https://empleados1.herokuapp.com/api/v1/empleados");
    webix.message("Actualizando datos...");
};


// MOSTRAR MENSAJE
function mostrarMensaje() {
    webix.message("Debe seleccionar un registro");
};


// MOSTRAR DETALLE EMPLEADO
function detalleEmpleado() {
    var seleccion = $$("tabla_empleados");
    var itemID = seleccion.getSelectedId();

    var valores = $$("tabla_empleados").getItem(itemID);

    webix.ui({

        view: "window",
        id: "vtn_detalle",
        fullscreen: true,
        head: {
            view: "toolbar",
            css: "main_toolbar",
            padding: 20,
            elements: [

                { template: "<h3>PolloPera SL</h3>" },
                {
                    view: "icon", icon: "wxi-close", click: function () {
                        $$("vtn_detalle").hide();
                    }
                }
            ]
        },
        body: {
            id: "datos_empleados",
            rows: [
                {
                    view: "toolbar", padding: 3,
                    elements: [
                        { view: "label", label: "Detalle de empleado" }
                    ]
                },
                {
                    cols: [
                        {
                            rows: [
                                {
                                    width: 300,
                                    height: 300,
                                    view: "template",
                                    template: `   <img style="width: 200px; height: auto; padding: 35px; margin: 0 auto;" id="foto"
                                src="./imagenes/foto.jpg">`
                                },
                                {
                                    view: "uploader",
                                    id: "uploader_1",
                                    left: 20,
                                    width: 300,
                                    value: "Subir foto",
                                    on: {
                                        "onItemClick": function () {
                                            webix.message("No habilitado")
                                        }
                                    }
                                }


                            ]
                        },
                        {
                            height: 500,
                            view: "template",

                            template: `
                            <div>
    
                            <h1>#nombre#</h1>
                            <h3>ID empleado: #id#</h3>
                            <h3>Fecha de ingreso: #fecha_ing#</h3>
                            <h3>eMail: #email#</h3>
                            <h3>Teléfono: #telefono#</h3>
                    
                            <hr>
                    
                            <textarea name="" id="" cols="75" rows="10" >Agregar notas</textarea>
                    
                            </div>`,

                            data: [
                                {
                                    id: valores.id,
                                    nombre: valores.nombre,
                                    fecha_ing: webix.i18n.longDateFormatStr(valores.fecha_ing),
                                    email: valores.email,
                                    telefono: valores.telefono,
                                    departamento: valores.departamento,
                                    sede: valores.sede,
                                    salario: valores.salario
                                },

                            ]
                        },

                        {
                            view: "timeline",
                            width: 500,
                            data: [
                                { id: 1, value: "Incorporación", date: valores.fecha_ing },
                                { id: 2, value: "Departamento", details: valores.departamento },
                                { id: 3, value: "Sede", details: valores.sede },
                                { id: 4, value: "Salario", details: valores.salario }


                            ]
                        }
                    ]
                }
            ]
        }
    }
    );

    var ventanaDetalle = $$("vtn_detalle");
    ventanaDetalle.show();

};



