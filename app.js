import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  saveContact,
  removeContact,
  listContact,
  detailContact,
} from "./contacts.mjs";

// yargs(hideBin(process.argv))
//   .command(
//     "add",
//     "Menambahkan contact baru",
//     (yargs) => {
//       return yargs.option("nama", {
//         alias: "n",
//         type: "string",
//         demandOption: true,
//         describe: "Nama contact",
//       });
//     },
//     (argv) => {
//       console.log("Nama:", argv.nama);
//     }
//   )
//   .parse();

yargs(hideBin(process.argv))
  //command add
  .command({
    command: "add",
    describe: "Menambahkan contact baru",
    builder: (yargs) => {
      return yargs.option({
        nama: {
          alias: "nm",
          type: "string",
          demandOption: true,
          describe: "Nama contact",
        },
        email: {
          alias: "em",
          type: "string",
          demandOption: false,
          describe: "Email contact",
        },
        nohp: {
          alias: "hp",
          type: "string",
          demandOption: true,
          describe: "Nomor Handphone contact",
        },
      });
    },
    handler: (argv) => {
      saveContact(argv.nama, argv.email, argv.nohp);
    },
  })

  //command remove
  .command({
    command: "remove",
    describe: "Menghapus contact berdasarkan nama",
    builder: (yargs) => {
      return yargs.option("nama", {
        alias: "nm",
        type: "string",
        demandOption: true,
        describe: "Nama contact yang ingin dihapus",
      });
    },
    handler: (argv) => {
      removeContact(argv.nama);
    },
  })

  //command detail
  .command({
    command: "detail",
    describe: "Menampilkan detail contact berdasarkan nama",
    builder: (yargs) => {
      return yargs.option("nama", {
        alias: "nm",
        type: "string",
        demandOption: true,
        describe: "Nama contact yang ingin dilihat",
      });
    },
    handler: (argv) => {
      detailContact(argv.nama);
    },
  })

  //command list
  .command({
    command: "list",
    describe: "Menampilkan semua contact",
    handler: () => {
      listContact();
    },
  })
  .demandCommand(1, "Silahkan masukkan command yang ingin dijalankan !")
  .parse();
