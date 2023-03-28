import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { getAll, saveRole, getRoleByTitle } from "../../../services/roles.services";
import { Role as RoleModel }from "../../../database/models/role";


export const getRoles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title } = req.query;

  try {
    let roles: Role[];
    if (title) {
      roles = await getRoleByTitle(title as string);
    } else {
      roles = await getAll();
    }
    if (!roles && title)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({
          success: false,
          message: `Role with title [${title}] is not found`,
        });
    return res.status(StatusCodes.OK).json({ success: true, data: roles });
  } catch (error) {
    next(error);
  }
};

export const getRoleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roleData: Role = req.role;
    res.status(StatusCodes.OK).json({ success: true, role: roleData });
  } catch (error) {
    next(error);
  }
};

export const createRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const role: Role = req.body;
  try {
    const roleData: Role = await saveRole({
      ...role,
      title: role?.title?.toLowerCase(),
    });
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Role created successfully",
      role: roleData,
    });
  } catch (error) {
    next(error);
  }
};

export const updateRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newRole: Role = req.body;
  try {
    const updatedRole: Role = await req.role.update(newRole);
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Role updated successfully",
      role: updatedRole,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRoleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await req.role.destroy();
    res
      .status(StatusCodes.OK)
      .json({ message: `Role with id ['${req.role.id}'] has been deleted` });
  } catch (error) {
    next(error);
  }
};
