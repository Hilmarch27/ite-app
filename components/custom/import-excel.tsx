/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import {
  ChangeEventHandler,
  DragEventHandler,
  FormEvent,
  useState,
} from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FileDown, SendHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
// import api from "@/utils/axios";
import { toast } from "sonner";
function ImportExcel() {
  const [data, setData] = useState<any[]>([]);
  console.log("😗 ~ data:", data);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null); // State untuk menyimpan file
  console.log("😗 ~ uploadedFile:", uploadedFile);

  const expectedHeaders = [
    "branch_code",
    "branch_office",
    "uker",
    "pn_pengelola",
    "nama_debitur",
    "nomor_rekening",
    "out_standing",
    "segmen",
    "phone",
    "desc_loan",
    "intra_ekstra",
    "kolektibilitas",
    "tanggal_charge_off",
    "klasifikasiEc",
    "aging_ph_1",
    "aging_ph_2",
  ];

  const handleFileUpload: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault(); // Prevent default behavior (stop file from being opened)

    const files = e.dataTransfer
      ? e.dataTransfer.files
      : (e.target as HTMLInputElement)?.files;
    if (!files || files.length === 0) {
      toast.warning("Tidak Ada File Yang Diunggah");
      return;
    }
    const file = files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      let arrayBuffer;
      if (event.target) {
        arrayBuffer = event.target.result;
      }
      const workbook = XLSX.read(arrayBuffer, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);

      const fileHeaders = Object.keys(jsonData[0]);
      const isValid = expectedHeaders.every((header) =>
        fileHeaders.includes(header)
      );

      if (!isValid) {
        toast.error("Format File Tidak Valid");
        return;
      }

      setData(jsonData);
      setUploadedFile(file); // Simpan file yang diunggah
    };

    reader.readAsArrayBuffer(file);
    toast.success("Berhasil Import File Excel");
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files) {
      handleFileUpload(event as any);
    }
  };

  const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  const handleDeleteFile = () => {
    setUploadedFile(null);
    setData([]); // Reset data jika file dihapus
    toast.success("Berhasil Hapus File Excel");
  };

  const handleDownloadFormat = () => {
    const exportData = [
      {
        branch_code: "001",
        branch_office: "Pusat",
        uker: "001",
        pn_pengelola: "001",
        nama_debitur: "Dini Nur Aprilia Anggraeni",
        nomor_rekening: "1234567891",
        out_standing: "1000000",
        segmen: "Segmen 1",
        phone: "081234567890",
        desc_loan: "Pembiayaan Umum",
        intra_ekstra: "Intra",
        kolektibilitas: "Bulanan",
        tanggal_charge_off: "12/06/2024",
        klasifikasiEc: "1",
        aging_ph_1: "10",
        aging_ph_2: "20",
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Format Import");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(blob, "format_import.xlsx");
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!uploadedFile) {
      toast.warning("Tidak Ada File Yang Diunggah");
      return;
    }

    const formData = new FormData();
    formData.append("file", uploadedFile);

    try {
      console.log(formData);
    } catch (error) {
      toast.error("Gagal Menambahkan Data");
      console.error("File upload failed:", error);
    }
  };
  console.log("😗 ~ uploadedFile:", uploadedFile);

  return (
    <>
      <div>
        <div className="flex justify-center flex-col">
          <div
            className="mt-3 w-full h-full mx-auto my-5 text-center leading-[100px] border-2 border-dashed border-gray-300 cursor-pointer max-h-[100px]"
            onDrop={handleFileUpload}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById("input-xlsx")?.click()}
            id="drop-area"
          >
            {uploadedFile ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span>{uploadedFile.name}</span>
                <Trash2
                  style={{
                    zIndex: "30",
                    cursor: "pointer",
                    marginLeft: "10px",
                    color: "red",
                  }}
                  onClick={handleDeleteFile}
                />
              </div>
            ) : (
              "Drag and drop or select an Excel file here"
            )}
          </div>
          <input
            disabled={uploadedFile ? true : false}
            onChange={handleInputChange}
            type="file"
            id="input-xlsx"
            className="hidden"
          />
          <div className="flex justify-between ">
            <Button onClick={handleDownloadFormat}>
              Download Format Import
              <FileDown className="my-auto ms-2 mb-1" />
            </Button>
            <Button onClick={handleSubmit}>
              Tambahkan
              <SendHorizontal className="my-auto ms-2 mb-1" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImportExcel;
