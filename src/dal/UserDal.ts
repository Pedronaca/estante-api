import { db } from "./dal/db";

export class UserDal {
    static async deleteUser(id: number) {
        const query = `DELETE FROM Usuarios WHERE id = $1 RETURNING *`;
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }

    static async updateUser(id: number, userData: any) {
        const query = `
            UPDATE Usuarios
            SET nome = $1, email = $2, senha = $3
            WHERE id = $4
            RETURNING *;
        `;
        const { rows } = await db.query(query, [userData.nome, userData.email, userData.senha, id]);
        return rows[0];
    }

    static async selectById(id: number) {
        const query = `SELECT * FROM Usuarios WHERE id = $1`;
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }

    static async selectByEmail(email: string) {
        const query = `SELECT * FROM Usuarios WHERE email = $1`;
        const { rows } = await db.query(query, [email]);
        return rows[0];
    }
}
