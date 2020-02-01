export const convertObjToArray = obj =>
  Object.keys(obj).map(key => ({ [key]: obj[key] }));

export const getCurrentTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return date + " " + time;
};

// export const sortArray = array => {
//   array.map(obj => console.log("obj", obj));
// };

export const selectText = element => {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(element);
  selection.removeAllRanges();
  selection.addRange(range);
};

export const sortArrayByDate = array => {
  const tempArray = [...array];
  return tempArray.sort((a, b) => {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
};
