

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
                                    view: "icon",
                                    width: 50,
                                    template: "<span class='webix_icon wxi-user'></span>",
                                },
                                {
                                    id: "id", header: ["id", { content: "textFilter", placeholder: "Busque por cualquier campo", compare: filtrado, colspan: 3 }], width: 120, sort: "int"
                                },
                                {
                                    id: "nombre", header: ["Nombre completo", null], fillspace: true, sort: "string"
                                },
                                {
                                    id: "email", header: ["eMail", null], sort: "string", width: 200
                                },
                                {
                                    id: "telefono", header: ["Teléfono", { content: "textFilter" }], sort: "number", width: 150
                                },
                                {
                                    id: "fecha_ing",
                                    map: "(date)#fecha_ing#", fillspace: true, header: ["Fecha ingreso", { content: "textFilter" }], sort: "date", format: webix.i18n.longDateFormatStr
                                },
                                {
                                    id: "departamento", header: ["Departamento", { content: "selectFilter" }], width: 150, sort: "string"
                                },
                                {
                                    id: "sede", header: ["Sede", { content: "textFilter" }], sort: "string"
                                },
                                {
                                    id: "salario", header: ["Salario", { content: "numberFilter" }], sort: "int"
                                }
                            ]
                        }
                    ]
                }
            ]
        });
    });
};

