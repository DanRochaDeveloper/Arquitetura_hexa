import RegistrarUsuario from '../src/exemplo/app/usuario/RegistrarUsuario';
import UsuarioEmMemoria from "../src/exemplo/adaptadores/db/UsuarioEmMemoria"
import InverterSenha from '../src/exemplo/adaptadores/auth/InverterSenha';
import SenhaComEspaco from '../src/exemplo/adaptadores/auth/SenhaComEspaco';
import CriptoReal from '../src/exemplo/adaptadores/auth/CriptoReal';
import ColecaoUsuario from '../src/exemplo/app/usuario/ColecaoUsuario';
import ColecaoUsuarioDB from '../src/exemplo/adaptadores/db/knex/migrations/ColecaoUsuarioDB';

test('Deve registrar um usuário', async ()=>{

    const colecao = new UsuarioEmMemoria()
    const provedorCripto = new InverterSenha()
    const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)
    const usuario =  await casoDeUso.executar('Daniel Rocha', 'danferocha@gmail.com', 'abc123')

    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('Daniel Rocha')
    expect(usuario.email).toBe('danferocha@gmail.com')
    expect(usuario.senha).toBe('321cba')
    

});


test('Deve registrar um usuário senha com espaço', async ()=>{

    const colecao = new UsuarioEmMemoria()
    const provedorCripto = new SenhaComEspaco()
    const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)
    const usuario = await casoDeUso.executar('Daniel Rocha', 'danferocha@gmail.com', 'abc123')

    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('Daniel Rocha')
    expect(usuario.email).toBe('danferocha@gmail.com')
    expect(usuario.senha).toBe('a b c 1 2 3')
    

})


test('Deve registrar um usuário com senha criptografada', async ()=>{

    const colecao = new UsuarioEmMemoria()
    const provedorCripto = new CriptoReal()
    const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)
    const usuario = await casoDeUso.executar('Daniel Rocha', 'danferocha@gmail.com', '123456')

    console.log(usuario.senha)

    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('Daniel Rocha')
    expect(usuario.email).toBe('danferocha@gmail.com')
    expect(provedorCripto.comparar('123456', usuario.senha!)).toBeTruthy()
    

})



test('Deve registrar um usuário banco real', async ()=>{

    const colecao = new ColecaoUsuarioDB()
    const provedorCripto = new CriptoReal()
    const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)
    const usuario = await casoDeUso.executar('Daniel Rocha', 'danferocha@gmail.com', '123456')

    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('Daniel Rocha')
    expect(usuario.email).toBe('danferocha@gmail.com')
    expect(provedorCripto.comparar('123456', usuario.senha!)).toBeTruthy()

})