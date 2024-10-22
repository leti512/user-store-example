import { compareSync, genSaltSync, hashSync } from 'bcryptjs'

export const bcryptAdapter = {
   //se usa dentro de objetos literales y define una propiedad del objeto que es una función
    hash: (password: string) => {
        const salt = genSaltSync();
        return hashSync(password, salt);
    },
    compare: (password: string, hashed: string) => {
        return compareSync(password, hashed);
    }


}