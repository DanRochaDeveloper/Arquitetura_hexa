import Colecao from "../../app/portas/Colecao"
import ColecaoUsuario from "../../app/usuario/ColecaoUsuario"
import Usuario from "../../app/usuario/Usuario"

//export default class BancoEmMemoria{
export default class UsuarioEmMemoria implements ColecaoUsuario {



    private static itens: Usuario[] = []

    async inserir(item: Usuario): Promise<void> {
        UsuarioEmMemoria.itens.push(item)

    }

    async buscarPorEmail(email: string): Promise<Usuario | null> {
        const usuario = UsuarioEmMemoria.itens.find(
            (usuario) => usuario.email === email
        )
        return usuario ?? null;
    }

}