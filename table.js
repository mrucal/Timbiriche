class Table{

    table;

    constructor(t, r, c){
        this.rows = r;
        this.cols = c;
        this.table_id = t;
        this.restantes = r*c;

        this.table = new Array(this.rows);
        for(var i = 0; i < this.rows; i++){
            this.table[i] = new Array(this.cols);
            for(var j = 0; j < this.cols; j++)
                // 0: jugador0 1: jugador1 2: linea vacia
                this.table[i][j] = [2, 2, 2, 2];
        }
        this.createTable();
    }

    createTable() {
        // Construir la tabla con el numero de filas y columnas indicadas
        // Formato del id de cada celda: rn_filacn_columna
        var contenido = "";
        for(var i = 0; i < this.rows; i++){
            contenido += "<tr>"
            for(var j = 0; j < this.cols; j++){
                contenido += "<td class='empty' id=r"+i+"c"+j+"></td>";
            }
            contenido += "</tr>";
        }
        $(this.table_id).html(contenido);
    }

    hasJugada(r,c,k){
        // True si la linea k de la celda r,c o la celda analoga esta ocupada
        var has_jugada = (this.table[r][c][k] != 2);
        switch(k){
            case 0:
                if(r!=0)
                    has_jugada = (has_jugada || (this.table[r-1][c][2]) != 2);
                break;
            case 1:
                if(c<this.cols-1)
                    has_jugada = (has_jugada || (this.table[r][c+1][3]) != 2);
                break;                
            case 2:
                if(r!=this.rows-1)
                    has_jugada = (has_jugada || (this.table[r+1][c][0]) != 2);
                break;
            case 3:
                if(c!=0)
                    has_jugada = (has_jugada || (this.table[r][c-1][1]) != 2);
                break;
        }
        return has_jugada;
    }

    insertarJugada(r,c,k,jugador){
        // Insertar linea del jugador en la celda r,c posicion k (puede ser top, right, bottom o left)
        // y en su analoga
        this.table[r][c][k] = jugador; 
        switch(k){
            case 0:
                if(r!=0)
                    this.table[r-1][c][2] = jugador; 
                    break;
            case 1:
                if(c<this.cols-1)
                    this.table[r][c+1][3] = jugador; 
                    break;                
            case 2:
                if(r<this.rows-1)
                    this.table[r+1][c][0] = jugador; 
                    break;
            case 3:
                if(c!=0)
                    this.table[r][c-1][1] = jugador;            
                    break;
        }
    }

    isCeldaCompleta(r,c){
        // True si las cuatro posiciones de la celda (top, right, bottom o left)
        // estan ocupadas por un jugador
        var completa = false;
        for(var k = 0; k < 4; k++)
            if(this.table[r][c][k]==2)
                return false;
        return true;
    }
    
}