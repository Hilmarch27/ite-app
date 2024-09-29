"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isNumbers?: boolean; // Add the isNumbers prop
  isPhone?: boolean;
  isRupiah?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      isNumbers = false,
      isPhone = false,
      isRupiah = false,
      ...props
    },
    ref
  ) => {
    // format handphone
    const formatPhone = (value: string) => {
      // Remove any non-digit characters
      let phoneVal = value.replace(/\D/g, "");
      // Ensure the number starts with 0 or 62
      if (phoneVal.startsWith("62")) {
        phoneVal = phoneVal.slice(2);
      } else if (phoneVal.startsWith("0")) {
        phoneVal = phoneVal.slice(1);
      }
      return (phoneVal = `+62 ${phoneVal.slice(0, 3)} ${phoneVal.slice(
        3,
        7
      )} ${phoneVal.slice(7)}`);
    };

    // format rupiah
    const formatRupiah = (value: string) => {
      const numberValue = parseFloat(value.replace(/[^0-9]/g, ""));
      if (isNaN(numberValue)) return "";
      return `Rp. ${numberValue.toLocaleString("id-ID")}`;
    };

    const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
      const input = event.currentTarget;
      let value = input.value;

      if (isNumbers) {
        // Remove non-numeric characters
        value = value.replace(/[^0-9]/g, "");
        input.value = value;
      }
      if (isPhone) {
        // Format as Phone
        input.value = formatPhone(value);
      }

      if (isRupiah) {
        // Format as Rupiah
        input.value = formatRupiah(value);
      }
    };

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm accent-primary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        onInput={handleInput} // Use the handleInput function
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
