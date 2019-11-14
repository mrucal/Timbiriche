class Table{

    table;

    constructor(t, r, c){
        this.rows = r;
        this.cols = c;
        this.table_html = t;
        this.restantes = r*c;

        this.table = new Array(this.rows);
        for(var i = 0; i < this.rows; i++){
            this.table[i] = new Array(this.cols);
            for(var j = 0; j < this.cols; j++)
                this.table[i][j] = [2, 2, 2, 2];
        }
        this.createTable();
    }

    createTable() {
        var contenido = "";
        for(var i = 0; i < this.rows; i++){
            contenido += "<tr>"
            for(var j = 0; j < this.cols; j++){
                contenido += "<td class='empty' id=r"+i+"c"+j+"></td>";
            }
            contenido += "</tr>";
        }
        $(this.table_html).html(contenido);
    }

    hasJugada(r,c,k){
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
        var completa = false;
        for(var k = 0; k < 4; k++)
            if(this.table[r][c][k]==2)
                return false;
        return true;
        /*var top = false, right = false, bottom = false, left = false;
        
        if(r!=0)
            top     =   (this.table[r][c][0]!=2 || this.table[r-1][c][2]!=2);
        if(c<this.cols-1)
            right   =   (this.table[r][c][1]!=2 || this.table[r][c+1][3]!=2);
        if(r<this.rows-1)
            bottom  =   (this.table[r][c][2]!=2 || this.table[r+1][c][0]!=2);
        if(c!=0)
            left    =   (this.table[r][c][3]!=2 || this.table[r][c-1][1]!=2);

        return top && right && bottom && left;*/

        
        
    }

    getJugada(r,c,k){
        return this.table[r][c][k];
    }

    alertCelda(i,j){
        window.alert("Celda ("+i+","+j+"): "+this.table[i][j][0]);
    }
}