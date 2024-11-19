import { LivrosDal } from "../dal/LivrosDal.ts";
import { LivrosModel } from "../models/LivrosModel";

export class LivroBll {
    static async selectLivros(idUsuario: number): Promise<LivrosModel[]> { 
        if (idUsuario <= 0) {
            throw (console.log(2));
        } 

        try {
            return await LivrosDal.selectLivros(idUsuario);
        } catch (error: any) {
            throw error.message;
        }
    }

    // static async update(id: number): Promise<> { }

    // static async delete(id: number): Promise<> { }
}