"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useDialogStore from "@/zustand/dialog-store";
import { FC } from "react";
import ImportExcel from "./import-excel";
import RouterForm from "../dashboard/tsi/router-form";

export const DialogCustom: FC = () => {
  const { isOpen, closeDialog, dialogType } = useDialogStore();
  console.log("😗 ~ dialogType:", dialogType);

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent className="w-full max-w-fit max-h-dvh">
        <DialogHeader>
          <DialogTitle>{dialogType}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&#39;re done.
          </DialogDescription>
        </DialogHeader>
        <div>{dialogType === "Import Excel" && <ImportExcel />}</div>
        <div>{dialogType === "Create Router" && <RouterForm />}</div>
      </DialogContent>
    </Dialog>
  );
};
