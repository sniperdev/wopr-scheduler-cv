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

export const getAllDates = (req, res) => {
  const q =
    "SELECT ratownicy.ID_RATOWNIKA, ratownicy.imie, ratownicy.nazwisko, daty.start, daty.end, daty.ZMIANA FROM ratownicy JOIN daty ON ratownicy.ID_RATOWNIKA = daty.ID_RATOWNIKA ORDER BY daty.start";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0)
      return res.status(404).json("There is no dates available");
    if (data.length > 0) return res.status(200).json(data);
  });
};

export const addDate = (req, res) => {
  const q =
    "INSERT INTO daty (ID_RATOWNIKA, START, END, ZMIANA) VALUES (?,?,?,?)";

  db.query(
    q,
    [req.body.id_ratownika, req.body.start, req.body.end, req.body.zmiana],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Date has been sent");
    }
  );
};
export const removeDate = (req, res) => {
  const q = "DELETE FROM daty WHERE id_ratownika = ? AND start = ?";

  db.query(q, [req.body.id_ratownika, req.body.start], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Date has been removed");
  });
};

export const readyWorkShifts = (req, res) => {
  const q =
    "INSERT INTO gotowezmiany (ID_RATOWNIKA, START, END, ZMIANA) VALUES (?,?,?,?)";
  db.query(
    q,
    [req.body.id_ratownika, req.body.start, req.body.end, req.body.zmiana],
    (err) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Date added");
    }
  );
};
