import { z } from "zod";

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const RouterFormSchema = z.object({
  typeOfUker: z.string({ message: "Please select a type of Uker" }).trim(),
  routerSeries: z
    .string()
    .min(1, { message: "Please select a router series" })
    .trim(),
  nameUker: z.string().min(1, { message: "Please select a name Uker" }).trim(),
  kanca: z.string({ message: "Please select a kanca" }).trim(),
  kanwil: z
    .string({ message: "Please select a kanwil" })
    .transform((val) => capitalize(val)),
  ipUker: z.string().min(1, { message: "Please select a IP Uker" }).trim(),
  snDevice: z.string().min(1, { message: "Please select a SN Device" }).trim(),
  status: z.enum(["AKTIF", "TUTUP"]),
  information: z
    .string()
    .min(1, { message: "Please select a information" })
    .trim(),
});

export const RouterSchema = z.object({
  id: z.string(),
  typeOfUker: z.string({ message: "Please select a type of Uker" }).trim(),
  routerSeries: z
    .string()
    .min(1, { message: "Please select a router series" })
    .trim(),
  nameUker: z.string().min(1, { message: "Please select a name Uker" }).trim(),
  kanca: z.string({ message: "Please select a kanca" }).trim(),
  kanwil: z
    .string({ message: "Please select a kanwil" })
    .transform((val) => capitalize(val)),
  ipUker: z.string().min(1, { message: "Please select a IP Uker" }).trim(),
  snDevice: z.string().min(1, { message: "Please select a SN Device" }).trim(),
  status: z.enum(["AKTIF", "TUTUP"]),
  information: z
    .string()
    .min(1, { message: "Please select a information" })
    .trim(),
});

export type RouterType = z.infer<typeof RouterSchema>;
