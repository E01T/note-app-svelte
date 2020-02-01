// setItem(key, value), getItem(key), removeItem("key"), clear()
const db = window.localStorage;

export const getDbRef = () => db;
export const setNote = (key, value) => db.setItem(key, JSON.stringify(value));
export const getNote = key => JSON.parse(db.getItem(key));
export const removeNote = key => db.removeItem(key);
export const deleteAllNotes = () => db.clear();

export const getAllNotesR = () => {
  let tempArray = [],
    keys = Object.keys(db),
    i = keys.length;

  while (i--) {
    const valuesObj = JSON.parse(db.getItem(keys[i]));
    const text = valuesObj.text;
    const createdAt = valuesObj.createdAt;
    tempArray.push({ id: keys[i], text, createdAt });
  }

  return tempArray;
};
