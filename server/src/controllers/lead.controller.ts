import { Request, Response } from "express";
import prisma from "../db/db.config";
import { handleError } from "../utils/handleError.utils";
import { hashPassword } from "../utils/password.utils";
import { ZodError } from "zod";
import { leadSchema, updateLeadSchema } from "../validations/lead.validation";

class LeadController {
  // Get all the leads details
  static async getAllLeads(req: Request, res: Response): Promise<void> {
    const { id: userId, role } = req.user;

    try {
      let leads;

      if (role === "ADMIN") {
        leads = await prisma.lead.findMany();
      } else {
        const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
          include: {
            leads: true,
          },
        });
        leads = user?.leads || [];
      }

      if (leads.length === 0) {
        res.status(404).json({ message: "No leads found." });
        return;
      }
      res
        .status(200)
        .json({ success: true, message: "Leads fetched successfully", leads });
    } catch (error) {
      handleError(error, res);
    }
  }

  //Get details of a specific user by id
  static async getLeadById(req: Request, res: Response): Promise<void> {
    const leadId: number = parseInt(req.params.id);
    try {
      const lead = await prisma.lead.findUnique({
        where: {
          id: leadId,
        },
      });
      if (!lead) {
        res.status(404).json({ success: false, message: "Lead not found" });
        return;
      }
      res.status(200).json({
        success: true,
        message: "Lead details fetched successfully",
        lead,
      });
    } catch (error) {
      handleError(error, res);
    }
  }

  // Create a new user
  static async createLead(req: Request, res: Response): Promise<void> {
    const { body } = req;

    const { id: userId } = req.user;

    try {
      const payload = leadSchema.parse(body);

      const existingLead = await prisma.lead.findFirst({
        where: {
          OR: [{ email: payload.email }, { phone: payload.phone }],
        },
      });

      if (existingLead) {
        res.status(400).json({
          success: false,
          message: "Lead with the same email or phone number already exists",
        });
        return;
      }

      const newLead = await prisma.lead.create({
        data: {
          ...payload,
          assignedTo: userId,
          createdBy: userId,
          status: "NEW",
          isActive: true,
        },
      });

      res
        .status(201)
        .json({ success: true, message: "Lead created successfully" });
    } catch (error) {
      if (error instanceof ZodError) {
        res
          .status(400)
          .json({ message: error.errors.map((err) => err.message) });
      } else {
        handleError(error, res);
      }
    }
  }

  // Update an existing lead
  static async updateLead(req: Request, res: Response): Promise<void> {
    const { body } = req;
    const leadId: number = parseInt(req.params.id, 10);
    try {
      const existingLead = await prisma.lead.findUnique({
        where: { id: leadId },
      });

      if (!existingLead) {
        res.status(404).json({ success: false, message: "Lead not found." });
        return;
      }

      const payload = updateLeadSchema.parse(body);

      const updatedLead = await prisma.lead.update({
        where: {
          id: leadId,
        },
        data: {
          ...payload,
        },
      });

      res.status(200).json({
        success: true,
        message: "Lead updated successfully",
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: error.errors.map((err) => err.message),
        });
      } else {
        handleError(error, res);
      }
    }
  }

  // Deactivate an existing user
  static async deactivateLead(req: Request, res: Response): Promise<void> {
    const leadId: number = parseInt(req.params.id, 10);
    try {
      const existingLead = await prisma.lead.findUnique({
        where: { id: leadId },
      });

      if (!existingLead) {
        res.status(404).json({
          success: false,
          message: "Lead not found.",
        });
        return;
      }

      const updateLead = await prisma.lead.update({
        where: {
          id: leadId,
        },
        data: {
          isActive: false,
        },
      });
      res.status(200).json({
        success: true,
        message: "Lead successfully deactivated",
      });
    } catch (error) {
      handleError(error, res);
    }
  }
}

export default LeadController;
