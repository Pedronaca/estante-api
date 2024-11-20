import { UserModel } from "../models/UserModel.js";
import { db } from "./db.js";

export class UserDal {
    static async deleteUser(id: number) {
        const query = `DELETE FROM Usuarios WHERE id = $1 RETURNING *`;
        const { rows } = await db.pool.query(query, [id]);
        return rows[0];
    }

    static async updateUser(id: number, userData: any) {
        const query = `
            UPDATE Usuarios
            SET nome = $1, email = $2, senha = $3
            WHERE id = $4
            RETURNING *;
        `;
        const { rows } = await db.pool.query(query, [userData.nome, userData.email, userData.senha, id]);
        return rows[0];
    }

    static async selectById(id: number) {
        const query = `SELECT * FROM Usuarios WHERE id = $1`;
        const { rows } = await db.pool.query(query, [id]);
        return rows[0];
    }

    static async selectByEmail(email: string) {
        const query = `SELECT * FROM Usuarios WHERE email = $1`;
        const { rows } = await db.pool.query(query, [email]);
        return rows[0];
    }

    static async create(name: string, email: string, password: string) {
        const query = `
            INSERT INTO usuarios (nome, email, senha) 
            VALUES ($1, $2, $3) 
            RETURNING *;
        `;
        const values = [name, email, password];
    
        try {
            const { rows } = await db.pool.query(query, values);

            console.log(rows[0])

            return rows[0];
        } catch (error) {
            console.error("Erro ao inserir usuário:", error);
            throw error;
        }
    }
}
