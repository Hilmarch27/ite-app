"use server";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { RouterFormSchema } from "@/lib/validations/router";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export interface Router {
  id: string;
  typeOfUker: string;
  routerSeries: string;
  nameUker: string;
  kanca: string;
  kanwil: string;
  status: "AKTIF" | "TUTUP";
  ipUker: string;
  snDevice: string;
  information: string;
}


export async function create(formData: z.infer<typeof RouterFormSchema>) {
  const userId: string = (await getUserId()) || "";
  // Validate form fields
  const result = RouterFormSchema.safeParse(formData);
  if (!result.success) {
    return { success: false, error: result.error.format() };
  }

  const {
    typeOfUker,
    routerSeries,
    nameUker,
    kanca,
    kanwil,
    ipUker,
    snDevice,
    status,
    information,
  } = result.data;

  try {
    // Create new router
    const router = await prisma.router.create({
      data: {
        typeOfUker,
        routerSeries,
        nameUker,
        kanca,
        kanwil,
        ipUker,
        snDevice,
        status,
        information,
        userId,
      },
    });
    console.log("create success", router);
    revalidatePath("/dashboard");
    return { success: true, data: router };
  } catch (e) {
    console.log(e);
    return { success: false, error: e };
  }
}


export async function edit(
  id: string,
  formData: z.infer<typeof RouterFormSchema>
) {
  const userId: string = (await getUserId()) || "";

  // Validate form fields
  const result = RouterFormSchema.safeParse(formData);
  if (!result.success) {
    return { success: false, error: result.error.format() };
  }

  const {
    typeOfUker,
    routerSeries,
    nameUker,
    kanca,
    kanwil,
    ipUker,
    snDevice,
    status,
    information,
  } = result.data;

  try {
    // Update existing router
    const updatedRouter = await prisma.router.update({
      where: { id },
      data: {
        typeOfUker,
        routerSeries,
        nameUker,
        kanca,
        kanwil,
        ipUker,
        snDevice,
        status,
        information,
        userId, // Assuming you want to update the userId as well
      },
    });

    console.log("update success", updatedRouter);
    revalidatePath("/dashboard");
    return { success: true, data: updatedRouter };
  } catch (e) {
    console.error("Error updating router:", e);
    return {
      success: false,
      error: e instanceof Error ? e.message : "Unknown error occurred",
    };
  }
}



export async function remove(id: string) {
  try {
    const userId: string = (await getUserId()) || "";

    const router = await prisma.router.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!router) {
      console.log(`Router with id ${id} not found`);
      return { success: false, error: "Router not found" }; // Tambahkan pesan error
    }

    if (router.userId !== userId) {
      console.log(`Unauthorized to delete router with id ${id}`);
      return { success: false, error: "Unauthorized to delete this router" }; // Tambahkan pesan error
    }

    await prisma.router.delete({
      where: { id },
    });

    console.log("Router successfully deleted:", id);
    return { success: true, data: { id } };
  } catch (e) {
    console.error("Error deleting router:", e);
    return {
      success: false,
      error: e instanceof Error ? e.message : "Unknown error occurred",
    };
  }
}
