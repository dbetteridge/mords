const fs = require("fs/promises");

fs.readFile("./words_alpha.txt").then((words) => {
  const characters =
    "jjkkqqxxzzbbbcccfffhhhmmmpppvvvwwwyyygggglllllddddddssssssuuuuuunnnnnnnntttttttttrrrrrrrrroooooooooooiiiiiiiiiiiiaaaaaaaaaaaaaeeeeeeeeeeeeeeeeee";
  const usefulWords = words
    .toString()
    .split("\r\n")
    .filter(
      (word) =>
        word.length > 1 &&
        word.length <= 15 &&
        word.split("").every((char) => characters.includes(char))
    );

  fs.writeFile("./words.json", JSON.stringify(usefulWords));
});
