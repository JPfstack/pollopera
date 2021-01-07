// VENTANA AÑADIR EMPLEADO
webix.ui({

    view: "window",
    id: "vtn_nuevo",
    position: "center",
    modal: true,
    head: "Añadir nuevo empleado",
    close: true,
    body: {
        view: "form",
        id: "nuevo_form",
        width: 600,
        elements: [

            {
                view: "text", label: "Nombre", name: "nombre", labelWidth: 100
            },
            {
                view: "text", type: "email", label: "eMail", name: "email", labelWidth: 100
            },
            {
                view: "text", type: "number", label: "Teléfono", name: "telefono", labelWidth: 100
            },
            {
                view: "text", type: "date", label: "Fecha ingreso", name: "fecha_ing", labelWidth: 100
            },
            {
                view: "text", label: "Departamento", name: "departamento", labelWidth: 100
            },
            {
                view: "text", type: "number", label: "Salario", name: "salario", labelWidth: 100
            },
            {
                view: "text", label: "Sede", name: "sede", labelWidth: 100
            },
            {
                margin: 5, cols: [
                    {
                        view: "button", value: "Guardar", css: "webix_primary", click: saveNuevo
                    }
                ]
            }
        ]
    }
});


// VENTANA EDITAR EMPLEADO
webix.ui({

    view: "window",
    id: "vtn_editar",
    position: "center",
    modal: true,
    head: "Editar empleado",
    close: true,
    body: {
        view: "form",
        id: "edit_form",
        width: 500,
        elements: [
            { view: "text", label: "ID empleado", name: "id", labelWidth: 100 },
            { view: "text", label: "Nombre", name: "nombre", labelWidth: 100 },
            { view: "text", label: "eMail", name: "email", labelWidth: 100 },
            { view: "text", label: "Teléfono", name: "telefono", labelWidth: 100 },
            { view: "text", label: "Departamento", name: "departamento", labelWidth: 100 },
            { view: "text", type: "number", label: "Salario", name: "salario", labelWidth: 100 },
            { view: "text", label: "Sede", name: "sede", labelWidth: 100 },
            {
                margin: 5, cols: [
                    { view: "button", value: "Guardar", css: "webix_primary", click: saveEditado }
                ]
            }
        ]
    }
});
