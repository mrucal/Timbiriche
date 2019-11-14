// Obtener indices a partir del id de la celda. Formato del id de la celda rnrcnc
function getRowCelda(id){
    return parseInt(id.slice(id.indexOf('r')+1,id.indexOf('c')));
}

function getColCelda(id){
    return parseInt(id.slice(id.indexOf('c')+1,id.length));
}