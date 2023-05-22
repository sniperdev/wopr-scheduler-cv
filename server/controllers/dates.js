import { db } from "../dbConnection.js";

export const getDates = (req, res) => {
  const q = "SELECT * FROM daty WHERE ID_RATOWNIKA = ?";

  db.query(q, [req.body.id_ratownika], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0)
      return res.status(404).json("There is no dates available");
    if (data.length > 0) return res.status(200).json(data);
  });
};

export const addDate = (req, res) => {
  const q = "INSERT INTO daty (ID_RATOWNIKA, DATA, ZMIANA) VALUES (?,?,?)";

  db.query(
    q,
    [req.body.id_ratownika, req.body.data, req.body.zmiana],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Date has been sent");
    }
  );
};
export const removeDate = (req, res) => {
  const q = "DELETE FROM daty WHERE id = ?";

  db.query(q, [req.body.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Date has been removed");
  });
};