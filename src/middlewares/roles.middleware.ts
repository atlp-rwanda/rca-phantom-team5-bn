import { StatusCodes } from "http-status-codes";
import { getRoleById, getRoleByTitle } from "../services/roles.services";
import type { RoleAttributes } from "../database/models/role";

import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
    role?: RoleAttributes;
  }

  export const roleExistsByTitle = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    const method: string = req.method;
    const roleTitle: string = method === "GET" ? req?.params?.title : req?.body?.title;
    const roleExists = await getRoleByTitle(roleTitle.toLowerCase());
  
    if (method === "POST" && roleExists) {
      res.status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: "Role already exists." });
    } else if (method === "GET") {
      if (!roleExists) {
        res.status(StatusCodes.NOT_FOUND)
          .json({
            success: false,
            message: `Role with title [${roleTitle}] is not found`,
          });
      } else {
        req.role = roleExists;
      }
    }
    next();
  };
  
  export const roleExistsById = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    const role = await getRoleById(Number(req.params.id));
    if (!role) {
      res.status(StatusCodes.NOT_FOUND)
        .json({
          success: false,
          message: `Role with id [${req.params.id}] is not found`,
        });
    } else {
      req.role = role;
      next();
    }
  };