class Juego{

    constructor(id_tabla){        
        this.table = new Table(id_tabla,4,4);
        this.jugadores = new Array(2);
        this.jugadores[0] = new Jugador("m");
        this.jugadores[1] = new Jugador("a");
        this.turno = 0;
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
            do{
                this.nclick=(this.nclick+1)%4;
            }while(this.table.hasJugada(r,c,this.nclick));
            for(var i = 0; i < 4; i++)
                $("#"+this.ultima_celda).removeClass(this.positions[i]+"s");
            if(this.ultima_celda!=e.target.id){
                this.nclick=-1;
                do{
                    this.nclick=(this.nclick+1)%4;
                }while(this.table.hasJugada(r,c,this.nclick));
            }
            $("#"+e.target.id).addClass(this.positions[this.nclick]+"s");  
            this.ultima_celda = e.target.id;
        }
    }

    confirmarJugada(e){
        //alert("CONFIRMAR");
        if(this.ultima_celda!=null){
            $("#"+this.ultima_celda).removeClass(this.positions[this.nclick]+"s");
            $("#"+this.ultima_celda).addClass(this.positions[this.nclick]+this.turno);
            var r = getRowCelda(this.ultima_celda);
            var c = getColCelda(this.ultima_celda);
            this.table.insertarJugada(r,c,this.nclick,this.turno);
            /*if(this.table.isCeldaCompleta(r,c)){
               this.ganar(r,c)
            }else{
            //alert(getRowCelda(this.ultima_celda)+" "+getColCelda(this.ultima_celda));
            this.cambiarTurno();
            }*/
            var celda_completa = false;
            if(this.table.isCeldaCompleta(r,c)){
                celda_completa = true;
                this.ganar(r,c);
            }
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
            if(!celda_completa)
                this.cambiarTurno();
        }else
            alert("No hay seleccion.");
    }

    ganar(r,c){
        this.jugadores[this.turno].incrementarPuntos();
        this.table.restantes--;
        alert("Restantes: "+this.table.restantes);
        if(this.table.restantes==0)
            if((this.jugadores[0].puntos>this.jugadores[1].puntos))
                alert("Gana Jugador AZUL!");
            else if((this.jugadores[0].puntos<this.jugadores[1].puntos))
                alert("Gana Jugador ROJO!");
            else 
                alert("EMPATE!");
        $("#r"+r+"c"+c).addClass("j"+this.turno);  
        $("#r"+r+"c"+c).removeClass("empty");  
        $("#r"+r+"c"+c).addClass("full");  
    }

    cambiarTurno(){
        this.turno = (this.turno+1)%2;
        this.ultima_celda = null;
        this.nclick = -1; 

    }


}