

// FUNCION QUE SE EJECUTA AL CARGAR EL INDEX.HTML DONDE SE DESPLIEGA LA VISTA DE LA APLICACION Y LA CARGA DE DATOS DESDE EL SERVIDOR

function cargarDatos() {
    webix.i18n.setLocale("es-ES");

    webix.ajax().get('https://empleados1.herokuapp.com/api/v1/empleados').then(function (data) {
        let objeto = data.text();
        let lista = JSON.parse(objeto);

        webix.ui({
            rows: [
                {
                    view: "toolbar",
                    css: "main_toolbar",
                    id: "top_toolbar",
                    padding: 30,
                    elements: [
                        {
                            view: "label",
                            label: "Lista de empleados",
                            css: "toolbar_label"
                        },
                        { view: "button", id: "nuevo", value: "Nuevo empleado", width: 120, height: 50, click: nuevoEmpleado },
                        { view: "button", id: "editar", value: "Editar empleado", width: 120, height: 50, click: editarEmpleado },
                        { view: "button", id: "eliminar", value: "Eliminar empleado", width: 120, height: 50, click: eliminarEmpleado },
                        { view: "button", id: "actualizar", value: "Actualizar datos", width: 120, height: 50, click: actualizarDatos }

                    ]
                },
                {
                    rows: [
                        {

                            view: "datatable",
                            css: "main_datatable",
                            id: "tabla_empleados",
                            select: true,
                            editable: true,
                            data: lista,

                            on: {
                                onBeforeLoad: function () {
                                    this.showOverlay("Cargando datos...");
                                },
                                onAfterLoad: function () {
                                    this.hideOverlay();
                                },
                                onItemDblClick: detalleEmpleado
                            },

                            columns: [
                                {
                                    id: "id", header: [{ text: "ID Empleado" }], width: 120, sort: "int"
                                },
                                {
                                    id: "nombre", header: [{ text: "Nombre completo" }, { content: "textFilter" }], fillspace: true, sort: "string"
                                },
                                {
                                    id: "email", header: [{ text: "eMail" }, { content: "textFilter" }], sort: "string", width: 200
                                },
                                {
                                    id: "telefono", header: [{ text: "Teléfono" }, { content: "textFilter" }], sort: "number", width: 150
                                },
                                {
                                    map: "(date)#fecha_ing#", fillspace: true, header: [{ text: "Fecha ingreso" }, { content: "textFilter" }], sort: "date", format: webix.i18n.longDateFormatStr
                                },
                                {
                                    id: "departamento", header: [{ text: "Departamento" }, { content: "selectFilter" }], width: 150, sort: "string"
                                },
                                {
                                    id: "salario", header: [{ text: "Salario" }, { content: "selectFilter" }], sort: "int"
                                },
                                {
                                    id: "sede", header: [{ text: "Sede" }, { content: "selectFilter" }], sort: "string"
                                }
                            ]
                        }
                    ]
                }
            ]
        });
    });
};