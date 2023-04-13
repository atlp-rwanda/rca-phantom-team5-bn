import bcrypt from 'bcrypt';
import generatePassword from 'generate-password'

const generateUserPassword = async ( )=>{
    return await generatePassword.
    generate({ length:10, numbers:true, symbols:true, lowercase:true, uppercase:true })
 }
 
const hashPassword = (password: string)=>{
    return bcrypt.hashSync(password, 10);
}

const comparePassword= (plainPassword: string, hashedPassword: string)=>{
    return bcrypt.compareSync(plainPassword, hashedPassword);
}

export { generateUserPassword, comparePassword, hashPassword };