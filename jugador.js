class Jugador{

    constructor(nombre,id){
        this.nombre = nombre;
        this.puntos = 0;
        this.id_putnos = "#"+id;
    }

    incrementarPuntos(){
        this.puntos+=10;
        $(this.id_putnos).html(this.puntos);
    }
}