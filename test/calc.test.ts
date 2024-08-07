import {soma} from "../src/calc";


test('Deve somar dois números', ()=>{
    expect(soma(1,2)).toBe(3)
})