import* as generatePassword from "generate-password"
import* as bcrypt from 'bcrypt'

const GenerateUserPassword = ( )=>{
    var password = generatePassword.generate({
      length:10,
      numbers:true,
      symbols:true,
      lowercase:true,
      uppercase:true
  })
  return password;
}

const HashPassword = async (plaintextPassword:string) =>{
    const hash = await bcrypt.hash(plaintextPassword, 10);

    return hash;
}

const passwordFunctions ={
    GenerateUserPassword,
    HashPassword
}


export default passwordFunctions;
