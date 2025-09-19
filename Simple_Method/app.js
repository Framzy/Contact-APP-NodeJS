import { ask, saveContact } from "./contacts";
const main = async () => {
  const nama = await ask("Masukan nama anda = ");
  const email = await ask("Masukan email anda = ");
  const noHp = await ask("Masukan no hp anda = ");

  saveContact(nama, email, noHp);
};

main();
