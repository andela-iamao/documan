 /**
  * joinUsersRole
  * @param {number} id - id of user to get
  * @return {string} sequelize query to return
  */
export function joinUsersRole(id) {
  return `SELECT "Users"."id", "Users"."username", "Users"."firstname", "Users"."lastname", "Users"."email", "Users"."roleId", "Users"."password", "Users"."createdAt", "Users"."updatedAt", "Role"."id" AS "Role.id", "Role"."title" AS "Role.title" FROM "Users" AS "Users" LEFT OUTER JOIN "Roles" AS "Role" ON CAST("Users"."roleId" AS INTEGER) = CAST("Role"."id" AS INTEGER) WHERE "Users"."id" = ${id};`;
}

export const searchQuery = (table, field, query, permission, as) => {
  const sequelizeQuery = (as) ?
    `SELECT * FROM "${table}" AS "${as}" WHERE ${field} LIKE '%${query}%'`
    :
    `SELECT * FROM "${table}" WHERE ${field} LIKE '%${query}%' ${(!permission.isAdmin) ? `AND ("accessId"=1 OR "ownerId"=${permission.userId})` : ''}`;
  return sequelizeQuery;
};

export const selectPublicRoleDocuments = id =>
  `SELECT * FROM "Documents" WHERE "ownerId"=${id} AND ("accessId"=1 OR "accessId"=3)`;
