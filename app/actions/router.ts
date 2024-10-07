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

// Fungsi remove yang dimodifikasi
export async function remove(ids: string | string[]) {
  try {
    const userId: string = (await getUserId()) || "";
    const idsArray = Array.isArray(ids) ? ids : [ids];

    // Verifikasi kepemilikan dan keberadaan router
    const routers = await prisma.router.findMany({
      where: { id: { in: idsArray } },
      select: { id: true, userId: true },
    });

    if (routers.length !== idsArray.length) {
      console.log(`Some routers not found`);
      return { success: false, error: "Some routers not found" };
    }

    const unauthorizedRouters = routers.filter(
      (router) => router.userId !== userId
    );
    if (unauthorizedRouters.length > 0) {
      console.log(`Unauthorized to delete some routers`);
      return { success: false, error: "Unauthorized to delete some routers" };
    }

    // Hapus router
    const result = await prisma.router.deleteMany({
      where: { id: { in: idsArray } },
    });

    console.log("Routers successfully deleted:", idsArray);
    return { success: true, data: { count: result.count, ids: idsArray } };
  } catch (e) {
    console.error("Error deleting routers:", e);
    return {
      success: false,
      error: e instanceof Error ? e.message : "Unknown error occurred",
    };
  }
}
