import fs from "fs";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contact.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const ask = (question) => {
  return new Promise((resolve, reject) => {
    rl.question(question, (data) => {
      resolve(data);
    });
  });
};

const saveContact = (nama, email, noHp) => {
  const contact = { nama, email, noHp };
  const fileBuffer = fs.readFileSync("data/contact.json", "utf-8");
  const contacts = JSON.parse(fileBuffer);

  contacts.push(contact);

  fs.writeFileSync("data/contact.json", JSON.stringify(contacts));
  console.log("data segera dimasukkan !");
  rl.close();
};

export { ask, saveContact };
