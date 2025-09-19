import fs from "fs";
import chalk from "chalk";
import validator from "validator";

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const loadContact = () => {
  const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(fileBuffer);
  return contacts;
};

const saveContact = (nama, email, noHp) => {
  const contact = { nama, email, noHp };
  const contacts = loadContact();

  // cek duplikat
  const duplicate = contacts.find((contact) => contact.nama === nama);
  if (duplicate) {
    console.log(chalk.bgRed("Contact sudah terdaftar, gunakan no hp lain !"));
    return false;
  }

  // cek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold("Email tidak valid !"));
      return false;
    }
  }

  // cek no hp
  if (!validator.isMobilePhone(noHp, "id-ID")) {
    console.log(chalk.red.inverse.bold("Nomor Handphone tidak valid !"));
    return false;
  }

  contacts.push(contact);

  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
  console.log(chalk.green("Terima kasih, data segera dimasukkan !\n"));
};

const removeContact = (nama) => {
  const contacts = loadContact();

  const newContacts = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );

  if (contacts.length === newContacts.length) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan !`));
    return false;
  }

  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));
  console.log(
    chalk.green.inverse.bold(`Data contact ${nama} berhasil dihapus !`)
  );
  console.log("\n");
  listContact();
};

const detailContact = (nama) => {
  const contacts = loadContact();

  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );

  if (!contact) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan !`));
    return false;
  }

  console.log(chalk.cyan.inverse.bold("Detail Contact :"));
  console.log(chalk.bgBlack.bold("Nama : " + contact.nama));
  if (contact.email) {
    console.log(chalk.bgBlack.bold("Email : " + contact.email));
  }
  console.log(chalk.bgBlack.bold("No Hp : " + contact.noHp));
  console.log("\n");
};

const listContact = () => {
  const contacts = loadContact();

  console.log(chalk.cyan.inverse.bold("Daftar Contact : (nama - noHp)"));
  contacts.forEach((contact, i) => {
    console.log(
      chalk.bgBlack.bold(`${i + 1}.`) +
        chalk.bgWhite(`${contact.nama} - ${contact.noHp}`)
    );
  });
  console.log("\n");
};

export { saveContact, removeContact, detailContact, listContact };
