/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface ComboboxFormProps<T> {
  form: ReturnType<typeof useForm<any>>;
  items: { label: string; value: string }[];
  fieldName: string;
  placeholder?: string;
  onSelect?: (value: string) => void; // Callback for selection
  desc?: string;
}

export function ComboboxForm<T>({
  form,
  items,
  fieldName,
  placeholder = "Select...",
  onSelect,
  desc,
}: ComboboxFormProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name={fieldName as any}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>{placeholder}</FormLabel>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? items.find((item) => item.value === field.value)?.label
                      : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder={`Search ${placeholder}...`} />
                  <CommandList>
                    <CommandEmpty>No {placeholder} found.</CommandEmpty>
                    <CommandGroup>
                      {items.map((item) => (
                        <CommandItem
                          value={item.label}
                          key={item.value}
                          onSelect={() => {
                            form.setValue(fieldName as any, item.value);
                            setIsOpen(false); // Close the popover
                            if (onSelect) {
                              onSelect(item.value); // Call onSelect callback
                            }
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              item.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {item.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormDescription>{desc}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
}
