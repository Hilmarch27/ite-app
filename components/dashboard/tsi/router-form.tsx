/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComboboxForm } from "@/components/custom/combobox-custom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { kanca, routerField, status, typeOfUker } from "@/data/router-data";
import { InputForm } from "@/components/custom/input-custom";
import { create } from "@/app/actions/router";
import { RouterFormSchema } from "@/lib/validations/router";
import { toast } from "sonner";
import useDialogStore from "@/zustand/dialog-store";

const RouterForm = () => {
  const {closeDialog} = useDialogStore(); 

  const form = useForm<any>({
    resolver: zodResolver(RouterFormSchema),
  });

  const handleSubmit = async (data: any) => {
    console.log(data);
    const result = await create(data);

    if (!result) {
      console.log("Something went wrong");
      return;
    }

    if (result.error) {
      // set local error state
      console.log(result.error);
      return;
    }

    if (result.success === true) {
      toast.success("Berhasil Tambah Data");
      closeDialog();
      return;
    }
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
              placeholder="kanca"
              onSelect={(value) => form.setValue("kanca", value)}
              desc="Pilih kanca"
            />
            <ComboboxForm
              form={form}
              items={status}
              fieldName="status"
              placeholder="status"
              onSelect={(value) => form.setValue("status", value)}
              desc="Pilih status"
            />
            {routerField.map((item, idx) => (
              <InputForm
                // className={item.label === "Router Series" ? "-mt-[10px]" : ""}
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
