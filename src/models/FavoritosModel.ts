export class Favoritos {
    private idLivro: number;
    private idUsuario: number;

    constructor(idLivro: number, idUsuario: number) {
        this.idLivro = idLivro;
        this.idUsuario = idUsuario;
    }

    set setIdLivro(idLivro: number) { this.idLivro = idLivro; }
    set setIdUsuario(idUsuario: number) { this.idUsuario = idUsuario; }

    get getIdLivro() { return this.idLivro; }
    get getIdUsuario() { return this.idUsuario; }
}