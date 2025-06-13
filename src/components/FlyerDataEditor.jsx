import { useState, useEffect } from "react";

const FlyerDataEditor = ({
  onAddProduct,
  onUpdateProduct,
  productoEditando,
  onCancelEdit,
}) => {
  const [form, setForm] = useState({
    modelo: "",
    color: "",
    talleDesde: 33,
    talleHasta: 40,
    tallesSinStock: "",
    costo: 0,
    envio: 0,
    ganancia: 0,
    archivo: null,
  });

  useEffect(() => {
    if (productoEditando) {
      setForm(productoEditando.data);
    } else {
      setForm({
        modelo: "",
        color: "",
        talleDesde: 33,
        talleHasta: 40,
        tallesSinStock: "",
        costo: 0,
        envio: 0,
        ganancia: 0,
        archivo: null,
      });
    }
  }, [productoEditando]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      handleChange("archivo", file);
    } else {
      alert("Por favor selecciona un archivo de imagen válido.");
      e.target.value = null;
      handleChange("archivo", null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.modelo.trim()) {
      alert("Por favor ingresa el modelo");
      return;
    }

    if (productoEditando) {
      onUpdateProduct(productoEditando.index, form);
    } else {
      onAddProduct(form);
    }

    if (!productoEditando) {
      setForm({
        modelo: "",
        color: "",
        talleDesde: 33,
        talleHasta: 40,
        tallesSinStock: "",
        costo: 0,
        envio: 0,
        ganancia: 0,
        archivo: null,
      });
      e.target.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flyer-form">
      {/* Modelo */}
      <label>
        Modelo
        <input
          type="text"
          placeholder="Modelo"
          value={form.modelo}
          onChange={(e) => handleChange("modelo", e.target.value)}
          required
        />
      </label>

      {/* Color */}
      <label>
        Color
        <input
          type="text"
          placeholder="Color"
          value={form.color}
          onChange={(e) => handleChange("color", e.target.value)}
        />
      </label>

      {/* Talle Desde */}
      <label>
        Talle Desde
        <input
          type="number"
          min={1}
          value={form.talleDesde}
          onChange={(e) => handleChange("talleDesde", Number(e.target.value))}
        />
      </label>

      {/* Talle Hasta */}
      <label>
        Talle Hasta
        <input
          type="number"
          min={form.talleDesde}
          value={form.talleHasta}
          onChange={(e) => handleChange("talleHasta", Number(e.target.value))}
        />
      </label>

      {/* Talles Sin Stock */}
      <label>
        Talles sin stock
        <input
          type="text"
          placeholder="Ej: 35,37"
          value={form.tallesSinStock}
          onChange={(e) => handleChange("tallesSinStock", e.target.value)}
        />
      </label>

      {/* Costo */}
      <label>
        Costo
        <input
          type="number"
          min={0}
          value={form.costo}
          onChange={(e) => handleChange("costo", Number(e.target.value))}
        />
      </label>

      {/* Envío */}
      <label>
        Envío
        <input
          type="number"
          min={0}
          value={form.envio}
          onChange={(e) => handleChange("envio", Number(e.target.value))}
        />
      </label>

      {/* Ganancia */}
      <label>
        Ganancia
        <input
          type="number"
          min={0}
          value={form.ganancia}
          onChange={(e) => handleChange("ganancia", Number(e.target.value))}
        />
      </label>

      {/* Archivo */}
      <label>
        Imagen
        <input type="file" onChange={handleFileChange} accept="image/*" />
      </label>

      {/* Botones */}
      <button type="submit">
        {productoEditando ? "Actualizar producto" : "Agregar producto"}
      </button>
      {productoEditando && (
        <button type="button" className="cancel-edit" onClick={onCancelEdit}>
          Cancelar edición
        </button>
      )}
    </form>
  );
};

export default FlyerDataEditor;
