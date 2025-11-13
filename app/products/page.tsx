"use client";

import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  // ambil data
  const fetchProducts = async () => {
    const res = await fetch("https://api.roniprsty.com/produk/read.php");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0 && typeof window !== "undefined") {
      const $ = (window as any).$;

      setTimeout(() => {
        if ($.fn.dataTable.isDataTable("#productTable")) {
          $("#productTable").DataTable().destroy();
        }
        $("#productTable").DataTable();
      }, 50);
    }
  }, [products]);

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;

    await fetch(`https://api.roniprsty.com/produk/delete.php?id=${id}`);

    const $ = (window as any).$;
    $("#productTable")
      .DataTable()
      .row($(`button[data-id="${id}"]`).parents("tr"))
      .remove()
      .draw();

    fetchProducts();
  };

  return (
    <div className="container mt-4">
      <h1>Daftar Produk</h1>

      <a href="/products/add" className="btn btn-primary mb-3">
        + Add Product
      </a>

      <table id="productTable" className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nama Produk</th>
            <th>Jenis</th>
            <th>Stok</th>
            <th>Harga Jual</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p: any) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nama_produk}</td>
              <td>{p.jenis_produk}</td>
              <td>{p.stok}</td>
              <td>Rp {Number(p.harga_jual).toLocaleString()}</td>
              <td>
                <span
                  className={
                    p.status === "Aktif"
                      ? "badge bg-success"
                      : "badge bg-secondary"
                  }
                >
                  {p.status || "-"}
                </span>
              </td>
              <td>
                <button
                  data-id={p.id}
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => handleDelete(p.id)}
                >
                  Hapus
                </button>

                <a
                  href={`/products/${p.id}`}
                  className="btn btn-info btn-sm me-2"
                >
                  Detail
                </a>

                <a
                  href={`/products/edit/${p.id}`}
                  className="btn btn-warning btn-sm"
                >
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
