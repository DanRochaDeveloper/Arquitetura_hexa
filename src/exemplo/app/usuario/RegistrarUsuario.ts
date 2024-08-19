//import BancoEmMemoria from "./BancoEmMemoria"
import Colecao from "../portas/Colecao";
import InverterSenha from "../../adaptadores/auth/InverterSenha";
import ProvedorCriptografia from "../portas/ProvedorCriptografia";
import Usuario from "./Usuario";
import ColecaoUsuario from "./ColecaoUsuario";
import Id from "../shared/Id";

export default class RegistrarUsuario{

    //usuarios: any[] = []
    //private banco = new BancoEmMemoria()
    //private invertSenha = new InverterSenha()

    constructor(
        private colecao: ColecaoUsuario,
        private provedorCripto: ProvedorCriptografia
    ){

    }

    async executar(nome:string, email:string, senha:string): Promise<Usuario>{

        

        //const senhaCripto = senha.split('').reverse().join('');
        const senhaCripto = this.provedorCripto.criptografar(senha)

        const usuarioExistente = await this.colecao.buscarPorEmail(email)

        if(usuarioExistente) throw new Error('Usuário já existe!')


        const usuario: Usuario={
            id: Id.gerar(),
            nome,
            email,
            senha: senhaCripto
        }

        this.colecao.inserir(usuario)
        //this.usuarios.push(usuario) 

        return usuario

    }
    
}