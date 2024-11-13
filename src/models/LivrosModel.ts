export class LivrosModel {
    private id: number;
    private idUsuario: number;
    private idGenero: number;
    private nome: string;
    private numPag: number;
    private autor: string;
    private dtPubli: Date;
    private lido: boolean;

    constructor(id: number, idUsuario: number, idGenero: number, nome: string, numPag: number, autor: string, dtPubli: Date, lido: boolean) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.idGenero = idGenero;
        this.nome = nome;
        this.numPag = numPag;
        this.autor = autor;
        this.dtPubli = dtPubli;
        this.lido = lido;
    }

    set setId(id: number) { this.id = id; }
    set setIdUsuario(idUsuario: number) { this.idUsuario = idUsuario; }
    set setIdGenero(idGenero: number) { this.idGenero = idGenero; }
    set setNome(nome: string) { this.nome = nome; }
    set setNumPag(numPag: number) { this.numPag = numPag; }
    set setAutor(autor: string) { this.autor = autor; }
    set setDtPubli(dtPubli: Date) { this.dtPubli = dtPubli; }
    set setLido(lido: boolean) { this.lido = lido; }

    get getId() { return this.id; }
    get getIdUsuario() { return this.idUsuario; }
    get getIdGenero() { return this.idGenero; }
    get getNome() { return this.nome; }
    get getNumPag() { return this.numPag; }
    get getAutor() { return this.autor; }
    get getDtPubli() { return this.dtPubli; }
    get getLido() { return this.lido; }
}
