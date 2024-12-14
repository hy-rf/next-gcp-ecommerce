"use client";
import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridSortModel,
  GridPaginationModel,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Product } from "@/model";

const VISIBLE_FIELDS: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "description", headerName: "Description", width: 150 },
  { field: "price", headerName: "Price", width: 150 },
  { field: "stock", headerName: "Stock", width: 150 },
  { field: "sold", headerName: "Sold", width: 150 },
  { field: "createdDateS", headerName: "Created At", width: 150 },
];
export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });
  const [totalRows, setTotalRows] = useState<number>(0);
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  // Fetch product data based on page, sort, and filter options
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log(sortModel);
      let sort = "";
      if (sortModel.length) {
        if (sortModel[0].field == "createdDateS") {
          sort = `created-${sortModel[0].sort}`;
        } else {
          sort = `${sortModel[0].field}-${sortModel[0].sort}`;
        }
      }

      const sortParam = sortModel.length ? sort : "";

      const res = await fetch(
        `/api/product?page=${paginationModel.page + 1}&sort=${sortModel.length ? sortParam : "sold-desc"}`
      );
      const data = await res.json();
      const products: Product[] = data.products as Product[];

      setProducts(
        products.map((ele) => {
          return {
            ...ele,
            createdDateS: ele.createdAt,
          };
        })
      );
      setTotalRows(data.total);
      setLoading(false);
    };

    fetchData();
  }, [paginationModel, sortModel]);
  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={products}
        columns={VISIBLE_FIELDS}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        rowCount={totalRows}
        loading={loading}
        paginationMode="server"
        sortingMode="server"
        sortModel={sortModel}
        onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
      />
    </div>
  );
}
