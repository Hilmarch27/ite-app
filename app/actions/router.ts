"use server";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { RouterFormSchema } from "@/lib/validations/router";
import { z } from "zod";

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
    return { success: true, data: router };
  } catch (e) {
    console.log(e);
    return { success: false, error: e };
  }
}
