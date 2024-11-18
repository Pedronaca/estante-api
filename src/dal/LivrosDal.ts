import { LivrosModel } from "../models/LivrosModel.ts";
import { db } from "./db.ts";

export class LivrosDal {

    static async selectLivros(idUsuario: number): Promise<LivrosModel[]> {
        try {
            const query = {
                text: 'SELECT * FROM livros WHERE id_usuario = $1;',
                values: [idUsuario],
            }

            const res = await db.pool.query(query);

            if (res.rowCount! > 0) {
                return res.rows.map(row => new LivrosModel(
                    row.id,
                    row.id_usuario,
                    row.id_genero,
                    row.nome,
                    row.num_pag,
                    row.autor,
                    row.db_publi,
                    row.lido,
                ));
            }

            return [];
        } catch (error: any) {
            console.error(`Erro ao buscar livros: ${error.message}`);
            throw error.message;
        }
    }

    // static async create(user: UserModel): Promise<> { }

    // static async update(user: UserModel): Promise<> { }

    // static async delete(id: number): Promise<> { }
}