class Jugador{
    //static total = 0;
    constructor(nombre){
        /*this.id = this.total;
        this.total++;*/
        this.nombre = nombre;
        this.puntos = 0;
    }

    incrementarPuntos(){
        this.puntos+=10;
    }
}