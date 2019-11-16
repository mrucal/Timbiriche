class Jugador{

    constructor(nombre,id){
        this.nombre = nombre;
        this.puntos = 0;
        this.id_putnos = "#"+id;
        var nombre_html = $("#name_"+id).html();
        $("#name_"+id).html(nombre+nombre_html.substring(9,nombre_html.length));
    }

    incrementarPuntos(){
        this.puntos+=10;
        $(this.id_putnos).html(this.puntos);
    }
}