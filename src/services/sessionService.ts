
import Models from '../database/models'
const {users_sessions} = Models

const getUserSession = async(user_id:string)=>{
  
    const session  = await users_sessions.findOne({ where: { user_id } })
  
     return session
    
}

export default getUserSession