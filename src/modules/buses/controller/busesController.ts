'use strict'
import { Request, Response } from 'express';
//import { Bus } from '../../../database/models/buses';

import models from '../../../database/models/index'
const { Bus } = models
 const createBus = async (req: Request, res: Response): Promise<void> => {
  try {
    const carData = req.body;
    const bus = await Bus.create(carData);
    res.status(201).json({ success: true, data: bus });
  } catch (err:any) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

/**
export const createNoteController = async (req: Request,res: Response) => {
  try {
    const { title, content, category, published } = req.body;

    const bus = await Bus.create({
      title,
      content,
      category,
      published,
    });

    res.status(201).json({
      status: "success",
      data: {
        bus,
      },
    });
  } catch (error: any) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        status: "failed",
        message: "Note with that title already exists",
      });
    }

    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

 */

export const updateBus = async (req: Request,res: Response) => {
  try {
    const result = await Bus.update(
      { ...req.body, updatedAt: Date.now() },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (result[0] === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Bus with that ID not found",
      });
    }

    const bus = await Bus.findByPk(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        bus,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};



export const deleteBus = async (req: Request,res: Response) => {
  try {
    const result = await Bus.destroy({
      where: { id: req.params.id },
      force: true,
    });

    if (result === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Bus with that ID not found",
      });
    }

    res.status(204).json();
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};



export const findBus = async (req: Request, res: Response) => {
  try {
    const bus = await Bus.findByPk(req.params.id);

    if (!bus) {
      return res.status(404).json({
        status: "fail",
        message: "Bus with that ID not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        bus,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};




export const findAllBuses = async (req: Request,res: Response) => {
  try {
    const page:any = req.query.page || 1;
    const limit:any = req.query.limit || 10;
    const skip = (page - 1) * limit;

    const buses = await Bus.findAll({ limit, offset: skip,include:'agency' });

    res.status(200).json({
      status: "success",
      results: buses.length,
      buses,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export default{createBus,deleteBus,updateBus,findAllBuses,findBus}
