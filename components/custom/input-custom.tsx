/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Form,
  FormControl,
//   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { id } from "date-fns/locale"; // Indonesian locale

interface InputFormProps {
  form: ReturnType<typeof useForm<any>>;
  fieldName: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
}

export function InputForm({
  form,
  fieldName,
  placeholder,
  type,
  disabled,
  className,
}: InputFormProps) {
  return (
    <div className={className}>
      <Form {...form}>
        <FormField
          control={form.control}
          name={fieldName as any}
          render={({ field }) => (
            <FormItem>
              <Popover>
                <FormLabel>{placeholder}</FormLabel>
                <FormControl>
                  {type === "date" ? (
                    <>
                      <PopoverTrigger asChild>
                        <Button
                          data-id={`button-calendar-${fieldName}`}
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: id }) // Use Indonesian locale here
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0"
                        align="start"
                        data-id="date-picker-content"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date: Date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </>
                  ) : (
                    <Input
                      data-id={`input-${fieldName}`}
                      disabled={disabled}
                      isNumbers={type === "Numbers" ? true : false}
                      isPhone={type === "Phone" ? true : false}
                      isRupiah={type === "Rupiah" ? true : false}
                      className="w-full"
                      type={type}
                      placeholder={placeholder?.toLowerCase()}
                      {...field}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </Popover>
            </FormItem>
          )}
        />
      </Form>
    </div>
  );
}
