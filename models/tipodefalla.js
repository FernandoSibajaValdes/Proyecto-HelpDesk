const modeloProyecto = {
    queryGetProyecto: "SELECT * FROM TiposdeFallas",
    queryProyectoByID : `SELECT * FROM TiposdeFallas WHERE ID=?`,
    queryDeleteProyectoByID : `UPDATE TiposdeFallas SET Activo='N' WHERE ID=?`,
    queryProyectoExists : `SELECT NombredeFalla FROM TiposdeFallas WHERE NombredeFalla = ?`,
    queryAddProyecto:`
    INSERT INTO TiposdeFallas(
        NombredeFalla,
        DescripciondeFalla,
        PrioridaddeFalla,
        Activo
    )VALUES(
        ?,
        ?,
        ?,
        ?
    )`,
    queryGetProyectoInfo : `SELECT NombredeFalla,DescripciondeFalla,PrioridaddeFalla FROM TiposdeFallas WHERE NombredeFalla = ?`,
    queryUpdateByProyecto : `
    UPDATE TiposdeFallas SET
        DescripciondeFalla= ?,
        PrioridaddeFalla= ?
    WHERE NombredeFalla= ?`,

}
const updateProyecto = (
    DescripciondeFalla,
    PrioridaddeFalla,
    NombredeFalla

) => {
    return `UPDATE TiposdeFallas SET
                DescripciondeFalla = '${DescripciondeFalla}',
                PrioridaddeFalla = '${PrioridaddeFalla}'
            WHERE NombredeFalla = '${NombredeFalla}'`
}

module.exports = {modeloProyecto, updateProyecto}