class Jugador{

    constructor(nombre,id){
        this.nombre = nombre;
        this.puntos = 0;
        this.id_putnos = "#"+id;
        $("#name_"+id).html(nombre+$("#name_"+id).html());
    }

    incrementarPuntos(){
        this.puntos+=10;
        $(this.id_putnos).html(this.puntos);
    }
}