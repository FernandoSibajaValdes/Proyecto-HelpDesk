const modeloUsuarios = {
    queryGetUsers: "SELECT * FROM Personal",
    queryUserByID : `SELECT * FROM Personal WHERE ID=?`,
    queryDeleteUserByID : `UPDATE Personal SET Activo='N' WHERE ID=?`,
    queryUserExists : `SELECT Usuario FROM Personal WHERE Usuario = ?`,
    queryAddUser:`
    INSERT INTO Personal(
        Usuario,
        Nombre,
        Apellidos,
        Contrasena,
        Departamento,
        Activo
    )VALUES(
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    )`,
    queryGetUserInfo : `SELECT Usuario,Nombre,Apellidos,Departamento FROM Personal WHERE Usuario = ?`,
    queryUpdateByUsuario : `
    UPDATE Personal SET
        Nombre=?,
        Apellidos= ?,
        Departamento= ?
    WHERE Usuario= ?`,

}
const updateUsuario = (
    Nombre,
    Apellidos,
    Departamento,
    Usuario
) => {
    return `UPDATE Personal SET
                Nombre = '${Nombre}',
                Apellidos = '${Apellidos}',
                Departamento = '${Departamento}'
            WHERE Usuario = '${Usuario}'`
}

module.exports = {modeloUsuarios, updateUsuario}