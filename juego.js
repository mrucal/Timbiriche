class Juego{

    constructor(id_tabla, rows, cols, nj0, nj1){        
        this.table = new Table(id_tabla,rows,cols);
        this.jugadores = new Array(2);
        this.jugadores[0] = new Jugador(nj0,"pj0");
        this.jugadores[1] = new Jugador(nj1,"pj1");
        this.turno = 0;
        $(".turno"+this.turno).show();
        $(".turno"+((this.turno+1)%2)).hide();
        this.ultima_celda = null;
        this.nclick = -1;
        this.positions = ["t","r","b","l"];
        $("td").click($.proxy(this.clickCelda, this));
        $("#confirmar").click($.proxy(this.confirmarJugada, this));
    }

    clickCelda(e){      
        var r = getRowCelda(e.target.id);
        var c = getColCelda(e.target.id);
        if(!this.table.isCeldaCompleta(r,c)) {

            // Saltar lineas ocupadas
            do{
                this.nclick=(this.nclick+1)%4;
            }while(this.table.hasJugada(r,c,this.nclick));

            // Eliminar seleccion
            for(var i = 0; i < 4; i++)
                $("#"+this.ultima_celda).removeClass(this.positions[i]+"s");
            
            // Si se ha seleccionado una celda distinta                    
            if(this.ultima_celda!=e.target.id){
                // Reiniciar clicks
                this.nclick=-1;
                // Saltar lineas ocupadas
                do{
                    this.nclick=(this.nclick+1)%4;
                }while(this.table.hasJugada(r,c,this.nclick));
            }

            // Seleccionar
            $("#"+e.target.id).addClass(this.positions[this.nclick]+"s");  
            this.ultima_celda = e.target.id;
        }
    }

    confirmarJugada(e){
        
        if(this.ultima_celda!=null){

            // Cambiar seleccion en la ultima celda por linea del color del jugador
            $("#"+this.ultima_celda).removeClass(this.positions[this.nclick]+"s");
            $("#"+this.ultima_celda).addClass(this.positions[this.nclick]+this.turno);


            var r = getRowCelda(this.ultima_celda);
            var c = getColCelda(this.ultima_celda);
            // Almacenar jugada en la tabla
            this.table.insertarJugada(r,c,this.nclick,this.turno);

            var celda_completa = false;
            // Comprobar si la celda esta completa (y se gana la celda)
            if(this.table.isCeldaCompleta(r,c)){
                celda_completa = true;
                this.ganar(r,c);
            }

            // Comprobar si la celda contigua (depende de la ultima posicion) esta completa
            switch(this.nclick){
                case 0:
                    if(r!=0)
                        if(this.table.isCeldaCompleta(r-1,c)){
                            celda_completa = true;
                            this.ganar(r-1,c);
                        }
                        break;
                case 1:
                    if(c<this.table.cols-1)
                        if(this.table.isCeldaCompleta(r,c+1)){
                            celda_completa = true;
                            this.ganar(r,c+1);
                        }
                        break;                
                case 2:
                    if(r<this.table.rows-1)
                        if(this.table.isCeldaCompleta(r+1,c)){
                            celda_completa = true;
                            this.ganar(r+1,c);
                        }
                        break;
                case 3:
                    if(c!=0)
                        if(this.table.isCeldaCompleta(r,c-1)){
                            celda_completa = true;
                            this.ganar(r,c-1);
                        }            
                        break;
            }

            // Si no se ha ganado la celda, se cambia de turno
            if(!celda_completa)
                this.cambiarTurno();
        }else
            alert("No hay seleccion.");
    }

    ganar(r,c){

        // Incrementar puntos del jugador actual y decrementar las celdas restantes
        this.jugadores[this.turno].incrementarPuntos();
        this.table.restantes--;

        // Cambiar color de fondo de la celda para indicar a quien pertenece
        $("#r"+r+"c"+c).addClass("j"+this.turno);  

        // Cambiar clase a full para eliminar el estado hover de la celda
        $("#r"+r+"c"+c).removeClass("empty");  
        $("#r"+r+"c"+c).addClass("full");  

        // Si no quedan celdas mostrar el ganador
        if(this.table.restantes==0)
            if((this.jugadores[0].puntos>this.jugadores[1].puntos)){
                //alert("Gana Jugador AZUL!");
                $("#divj0").addClass("bgreen");
                $("#divj0").removeClass("border border-dark");
            }else if((this.jugadores[0].puntos<this.jugadores[1].puntos)){
                //alert("Gana Jugador ROJO!");
                $("#divj1").addClass("bgreen");
                $("#divj1").removeClass("border border-dark");
            }else {
                //alert("EMPATE!");    
                $("#divj0").addClass("bgreen");
                $("#divj0").removeClass("border border-dark");
                $("#divj1").addClass("bgreen");  
                $("#divj1").removeClass("border border-dark");
            }  
    }

    cambiarTurno(){

        // Reiniciar valores y cambiar de jugador
        $(".turno"+this.turno).hide();
        this.turno = (this.turno+1)%2;
        $(".turno"+this.turno).show();
        this.ultima_celda = null;
        this.nclick = -1; 
        

    }


}