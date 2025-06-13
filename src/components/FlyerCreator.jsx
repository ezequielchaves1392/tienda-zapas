import { useState } from "react";
import FlyerDataEditor from "./FlyerDataEditor";
import FlyerTable from "./FlyerTable";
import "../index.css";

const FlyerCreator = () => {
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null); // { index, data } o null

  const handleAddProduct = (producto) => {
    setProductos((prev) => [
      ...prev,
      {
        ...producto,
        precioVenta:
          Number(producto.costo) +
          Number(producto.envio) +
          Number(producto.ganancia),
      },
    ]);
  };

  const handleUpdateProduct = (index, producto) => {
    setProductos((prev) =>
      prev.map((p, i) =>
        i === index
          ? {
              ...producto,
              precioVenta:
                Number(producto.costo) +
                Number(producto.envio) +
                Number(producto.ganancia),
            }
          : p
      )
    );
    setProductoEditando(null);
  };

  const handleEdit = (index) => {
    setProductoEditando({ index, data: productos[index] });
  };

  const handleRemove = (index) => {
    if (window.confirm("¿Eliminar este producto?")) {
      setProductos((prev) => prev.filter((_, i) => i !== index));
      if (productoEditando?.index === index) setProductoEditando(null);
    }
  };

  const handleDownload = (index) => {
    const producto = productos[index];
    if (!producto.archivo) {
      alert("No hay archivo para descargar");
      return;
    }
    const url = URL.createObjectURL(producto.archivo);
    const a = document.createElement("a");
    a.href = url;
    a.download = producto.archivo.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCancelEdit = () => {
    setProductoEditando(null);
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#222" }}>
      <h1 style={{ color: "#eee" }}>Stock Tienda 1.0</h1>

      <FlyerDataEditor
        key={productoEditando ? productoEditando.index : "new"}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        productoEditando={productoEditando}
        onCancelEdit={handleCancelEdit}
      />

      <FlyerTable
        rows={productos}
        onRemove={handleRemove}
        onEdit={handleEdit}
        onDownload={handleDownload}
      />
    </div>
  );
};

export default FlyerCreator;
