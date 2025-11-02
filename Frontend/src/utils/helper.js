export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";
  // console.log(words);

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    // console.log(i);
    // console.log(Math.min(words.length, 2));

    initials += words[i][0];
    // console.log(initials);
    // Will return initials
    // console.log(words[i][0]);
  }
  return initials.toUpperCase();
};
