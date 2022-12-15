const modeloUsuarios = {
    queryGetUsers: "SELECT * FROM Cliente",
    queryUserByID : `SELECT * FROM Cliente WHERE ID=?`,
    queryDeleteUserByID : `UPDATE Cliente SET Activo='N' WHERE ID=?`,
    queryUserExists : `SELECT Usuario FROM Cliente WHERE Usuario = ?`,
    queryAddUser:`
    INSERT INTO Cliente(
        Usuario,
        Nombre,
        Apellidos,
        Contrasena,
        Especificaciones,
        Activo
    )VALUES(
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    )`,
    queryGetUserInfo : `SELECT Usuario,Nombre,Apellidos,Especificaciones FROM Cliente WHERE Usuario = ?`,
    queryUpdateByUsuario : `
    UPDATE Cliente SET
        Nombre=?,
        Apellidos= ?,
        Especificaciones= ?
    WHERE Usuario= ?`,

}
const updateUsuario = (
    Nombre,
    Apellidos,
    Especificaciones,
    Usuario
) => {
    return `UPDATE Cliente SET
                Nombre = '${Nombre}',
                Apellidos = '${Apellidos}',
                Especificaciones = '${Especificaciones}'
            WHERE Usuario = '${Usuario}'`
}

module.exports = {modeloUsuarios, updateUsuario}