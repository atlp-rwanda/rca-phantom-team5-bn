import * as Joi from 'joi';

export class UserValidator{

    validUpdatedUser(user:any):any{
        const schema = Joi.object({
            user_id:Joi.string().allow(null),
            name:Joi.string().min(4).max(50).required(),
        })
        return schema.validate(user)
    }
    

}