import React, { useState, useEffect } from "react";

const FlyerTable = ({ rows, onDownload, onRemove, onEdit }) => {
  const [imageURLs, setImageURLs] = useState({}); // { index: URL }

  useEffect(() => {
    const urls = {};
    rows.forEach((row, i) => {
      if (row.archivo) {
        urls[i] = URL.createObjectURL(row.archivo);
      }
    });
    setImageURLs(urls);

    return () => {
      Object.values(urls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [rows]);

  return (
    <>
      <table className="flyer-table">
        <thead>
          <tr>
            <th>Modelo</th>
            <th>Color</th>
            <th>Talles</th>
            <th>Costo</th>
            <th>Envío</th>
            <th>Ganancia</th>
            <th>Precio Venta</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.modelo}</td>
              <td>{row.color}</td>
              <td>
                {row.talleDesde}-{row.talleHasta}{" "}
                {row.tallesSinStock && `(sin: ${row.tallesSinStock})`}
              </td>
              <td>${row.costo}</td>
              <td>${row.envio}</td>
              <td>${row.ganancia}</td>
              <td>${row.precioVenta}</td>
              <td>
                {row.archivo ? (
                  <div className="img-container">
                    <img
                      src={imageURLs[index]}
                      alt="miniatura"
                      className="mini-img"
                    />
                    <img
                      src={imageURLs[index]}
                      alt="ampliada"
                      className="zoomed-img"
                    />
                  </div>
                ) : (
                  "-"
                )}
              </td>
              <td>
                <button onClick={() => onEdit(index)}>Editar</button>
                <button onClick={() => onDownload(index)}>Descargar</button>
                <button onClick={() => onRemove(index)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        .img-container {
          position: relative;
          display: inline-block;
          cursor: pointer;
        }
        .mini-img {
          width: 40px;
          height: 40px;
          object-fit: cover;
          border-radius: 4px;
          transition: transform 0.3s ease;
          z-index: 1;
          position: relative;
        }
        .zoomed-img {
          position: fixed;
          top: 50%;
          left: 50%;
          width: auto;
          max-width: 80vw;
          max-height: 80vh;
          transform: translate(-50%, -50%) scale(0);
          border-radius: 8px;
          box-shadow: 0 0 20px #7a8cff;
          transition: transform 0.3s ease, opacity 0.3s ease;
          opacity: 0;
          pointer-events: none;
          z-index: 9999;
        }
        .img-container:hover .mini-img {
          transform: scale(1.1);
        }
        .img-container:hover .zoomed-img {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
          pointer-events: auto;
        }
      `}</style>
    </>
  );
};

export default FlyerTable;
