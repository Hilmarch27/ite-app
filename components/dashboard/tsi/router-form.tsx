import { ComboboxForm } from "@/components/custom/combobox-custom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { kanca, routerField, typeOfUker } from "@/data/router-data";
import { InputForm } from "@/components/custom/input-custom";

// Generate Zod schema dynamically based on routerField data
const dynamicFieldsSchema = routerField.reduce((schema, field) => {
  return {
    ...schema,
    [field.value]: z.string({ message: `${field.label} is required` }),
  };
}, {});

const FormSchema = z.object({
  typeOfUker: z.string({ message: "Pilih jenis uker" }),
  kanca: z.string({ message: "Pilih kanca" }),
  ...dynamicFieldsSchema,
});

const RouterForm = () => {
  const form = useForm<any>({
    resolver: zodResolver(FormSchema),
  });

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };
  return (
    <div>
      <Card>
        <CardContent className="mt-2">
          <div className="grid grid-cols-3 gap-3">
            <ComboboxForm
              form={form}
              items={typeOfUker}
              fieldName="typeOfUker"
              placeholder="Jenis Uker"
              onSelect={(value) => form.setValue("typeOfUker", value)}
              desc="Pilih jenis uker"
            />
            <ComboboxForm
              form={form}
              items={kanca}
              fieldName="kanca"
              placeholder="Kanca"
              onSelect={(value) => form.setValue("kanca", value)}
              desc="Pilih kanca"
            />
            {routerField.map((item, idx) => (
              <InputForm
                className={item.label === "Router Series" ? "-mt-[10px]" : ""}
                key={idx}
                type={item.type}
                form={form}
                fieldName={item.value}
                placeholder={item.label}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={form.handleSubmit(handleSubmit)}>Simpan</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RouterForm;
