/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { RouterSchema } from "@/lib/validations/router";



export async function GET(request: NextRequest) {
  try {
    const routers = await prisma.router.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Validate and transform the data
    const transformedRouters = routers.map((router) =>
      RouterSchema.parse(router)
    );

    return NextResponse.json({ success: true, data: transformedRouters });
  } catch (e) {
    console.error("Error fetching routers:", e);

    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Data validation error", details: e.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
