import bcrypt from 'bcrypt';

const hashPassword = (password: string)=>{
    return bcrypt.hashSync(password, 10);
}

const comparePassword= (plainPassword: string, hashedPassword: string)=>{
    return bcrypt.compareSync(plainPassword, hashedPassword);
}

export { comparePassword, hashPassword };