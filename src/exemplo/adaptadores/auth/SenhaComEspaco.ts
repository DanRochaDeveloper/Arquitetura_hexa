export default class SenhaComEspaco{
    criptografar(senha:string):string{
        return senha.split('').join(' ');
    }


    comparar(senha: string, senhaCriptografada: string): boolean {
        const senhaFornecida = this.criptografar(senha)
        return senhaFornecida === senhaCriptografada
    }

}