export function joinUsersRole(id) {
  return `SELECT "Users"."id", "Users"."username", "Users"."firstname", "Users"."lastname", "Users"."email", "Users"."roleId", "Users"."password", "Users"."createdAt", "Users"."updatedAt", "Role"."id" AS "Role.id", "Role"."title" AS "Role.title" FROM "Users" AS "Users" LEFT OUTER JOIN "Roles" AS "Role" ON CAST("Users"."roleId" AS INTEGER) = CAST("Role"."id" AS INTEGER) WHERE "Users"."id" = ${id};`
}
