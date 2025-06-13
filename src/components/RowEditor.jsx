// RowEditor.jsx
import React from "react";

const RowEditor = ({ row, index, onChange, onFileUpload, onRemove }) => {
  const handleChange = (field, value) => {
    onChange(index, field, value);
  };

  return (
    <tr style={{ borderBottom: "1px solid #444" }}>
      {["nombre", "modelo", "color"].map((field) => (
        <td key={field}>
          <input
            type="text"
            value={row[field] || ""}
            onChange={(e) => handleChange(field, e.target.value)}
          />
        </td>
      ))}

      {["talleDesde", "talleHasta", "tallesSinStock"].map((field) => (
        <td key={field}>
          <input
            type={field === "tallesSinStock" ? "text" : "number"}
            value={row[field] || ""}
            onChange={(e) => handleChange(field, e.target.value)}
          />
        </td>
      ))}

      {["costo", "envio", "ganancia", "precioVenta"].map((field) => (
        <td key={field}>
          <input
            type="number"
            value={row[field] || 0}
            onChange={(e) => handleChange(field, e.target.value)}
          />
        </td>
      ))}

      <td>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => onFileUpload(index, e)}
        />
        {row.archivo && <small>{row.archivo.name}</small>}
      </td>

      <td>
        <button onClick={() => onRemove(index)}>🗑️</button>
      </td>
    </tr>
  );
};

export default RowEditor;
