"use client";

import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  // Ambil data dari API
  const fetchProducts = async () => {
    const res = await fetch("https://api.roniprsty.com/produk/read.php");
    const data = await res.json();
    setProducts(data);
  };

  // Load data saat awal
  useEffect(() => {
    fetchProducts();
  }, []);

  // Inisialisasi DataTable setiap kali data berubah
  useEffect(() => {
    if (products.length > 0) {
      if ($.fn.dataTable.isDataTable("#productTable")) {
        $("#productTable").DataTable().destroy();
      }
      $("#productTable").DataTable();
    }
  }, [products]);

  // Delete produk
  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;

    await fetch(`https://api.roniprsty.com/produk/delete.php?id=${id}`);

    // Hilangkan baris secara instan (tanpa reload)
    $("#productTable")
      .DataTable()
      .row($(`button[data-id="${id}"]`).parents("tr"))
      .remove()
      .draw();

    // Sync ulang ke API biar data valid
    fetchProducts();
  };

  return (
    <div className="container mt-4">
      <h1>Daftar Produk</h1>

      <div className="d-flex justify-content-end mb-3">
        <a href="/products/add" className="btn btn-primary">
          + Add Product
        </a>
      </div>

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
                  onClick={() => handleDelete(p.id)}
                  className="btn btn-danger btn-sm me-2"
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
