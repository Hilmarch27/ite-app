import { create, edit, remove } from "@/app/actions/router";
import { RouterType } from "@/lib/validations/router";
import useSWR, { mutate } from "swr";

const url = "http://localhost:3000/api/routers";

// const dev = `${process.env.API_URL_DEV}/routers`;
// const prod = `${process.env.URL_API}/routers`;
// const url = process.env.NODE_ENV === "development" ? dev : prod;

async function getRequest() {
  const response = await fetch(url);
  return response.json();
}

export default function useRouters() {
  const { data, isValidating } = useSWR(url, getRequest);

  // Fungsi untuk memperbarui row di server
  const updateRow = async (id: string, router: RouterType) => {
    try {
      await edit(id, router);
      console.log(`Row ${id} updated successfully`);
      // Panggil SWR mutate untuk memperbarui cache setelah update
      mutate(url);
    } catch (error) {
      console.error(`Error updating row ${id}:`, error);
    }
  };

  const removeRouter = async (id: string) => {
    try {
      const result = await remove(id);
      mutate(url);
      console.log(`Router ${id} deleted successfully`);
      return result; // Mengembalikan hasil success atau error dari server
    } catch (error) {
      console.error(`Error deleting router ${id}:`, error);
      return { success: false, error }; // Mengembalikan status gagal
    }
  };

  const createRouter = async (router: RouterType) => {
    try {
      const result = await create(router);
      console.log(`Router created successfully`);
      mutate(url);
      return result; // Mengembalikan hasil success atau error dari server
    } catch (error) {
      console.error(`Error creating router:`, error);
      return { success: false, error }; // Mengembalikan status gagal
    }
  };

  return {
    data: data ?? [],
    isValidating,
    updateRow,
    removeRouter,
    createRouter,
  };
}
