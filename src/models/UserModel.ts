export class UserModel {
    private id?: number;
    private nome: string;
    private email: string;
    private senha: string;

    constructor(nome: string, email: string, senha: string, id?: number);
    constructor(user: UserModel);
    constructor(arg: string | UserModel, email?: string, senha?: string, id?: number) {
        if (typeof arg === 'string') {
            this.nome = arg;
            this.email = email!;
            this.senha = senha!;
            this.id = id;
        } else {
            const userModel = arg as UserModel;
            this.nome = userModel.getNome;
            this.email = userModel.getEmail;
            this.senha = userModel.getSenha;
            this.id = userModel.getId;
        }
    }

    set setId(id: number) { this.id = id; }
    set setNome(name: string) { this.nome = name; }
    set setEmail(email: string) { this.email = email; }
    set setSenha(password: string) { this.senha = password; }

    get getId() { return this.id; }
    get getNome() { return this.nome; }
    get getEmail() { return this.email; }
    get getSenha() { return this.senha; }
}
