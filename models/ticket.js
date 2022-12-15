const modeloProyecto = {
    queryGetProyecto: "SELECT * FROM Ticket",
    queryProyectoByID : `SELECT * FROM Ticket WHERE ID=?`,
    queryDeleteProyectoByID : `UPDATE Ticket SET Activo='N' WHERE ID=?`,
    queryProyectoExists : `SELECT Responsable FROM Ticket WHERE Responsable = ?`,
    queryAddProyecto:`
    INSERT INTO Ticket(
        Fecha,
        Especificaciones,
        PersonalAsignado,
        TipodeFalla,
        Responsable,
        Activo
    )VALUES(
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    )`,
    queryGetProyectoInfo : `SELECT Fecha,Especificaciones,PersonalAsignado,TipodeFalla,Responsable FROM Ticket WHERE Responsable = ?`,
    queryUpdateByProyecto : `
    UPDATE Ticket SET
        Fecha= ?,
        Especificaciones= ?,
        PersonalAsignado= ?,
        TipodeFalla= ?
    WHERE Responsable= ?`,

}
const updateProyecto = (
    Fecha,
    Especificaciones,
    PersonalAsignado,
    TipodeFalla,
    Responsable

) => {
    return `UPDATE Ticket SET
                Fecha = '${Fecha}',
                Especificaciones = '${Especificaciones}',
                PersonalAsignado = '${PersonalAsignado}',
                TipodeFalla = '${TipodeFalla}'
            WHERE Responsable = '${Responsable}'`
}

module.exports = {modeloProyecto, updateProyecto}