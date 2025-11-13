"use client";

import { useState } from "react";

export default function AddProductPage() {
  const [nama_produk, setNama] = useState("");
  const [jenis_produk, setJenis] = useState("");
  const [stok, setStok] = useState("");
  const [harga_beli, setHargaBeli] = useState("");
  const [harga_jual, setHargaJual] = useState("");
  const [status, setStatus] = useState("Aktif");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = {
      nama_produk,
      jenis_produk,
      stok,
      harga_beli,
      harga_jual,
      status
    };

    const res = await fetch("https://api.roniprsty.com/produk/create.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    alert("Produk berhasil ditambahkan!");
    window.location.href = "/products"; // redirect
  };

  return (
    <div className="container mt-4">
      <h1>Tambah Produk</h1>

      <form onSubmit={handleSubmit} className="mt-3">

        <div className="mb-3">
          <label className="form-label">Nama Produk</label>
          <input
            type="text"
            className="form-control"
            value={nama_produk}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Jenis Produk</label>
          <input
            type="text"
            className="form-control"
            value={jenis_produk}
            onChange={(e) => setJenis(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Stok</label>
          <input
            type="number"
            className="form-control"
            value={stok}
            onChange={(e) => setStok(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Harga Beli</label>
          <input
            type="number"
            className="form-control"
            value={harga_beli}
            onChange={(e) => setHargaBeli(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Harga Jual</label>
          <input
            type="number"
            className="form-control"
            value={harga_jual}
            onChange={(e) => setHargaJual(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Aktif">Aktif</option>
            <option value="Non-Aktif">Non-Aktif</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Simpan
        </button>
        <a href="/products" className="btn btn-secondary ms-2">
          Kembali
        </a>
      </form>
    </div>
  );
}
