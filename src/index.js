import firebaseConfig from "./config.js";
import { checkIfInRange } from "./utils.js";
import { test } from "./lineconfig.js";
import { Addtodata } from "./addtodatafire.js";

const main = async () => {
  // let count = 0;
  // const museums = ["museum", "museum02"];
  // museums.forEach(async (museum) => {
  //   console.log(`start watching: ${museum}`);
  //   const users = await new Promise((res) =>
  //     firebaseConfig
  //       .firestore()
  //       .collection(museum)
  //       .onSnapshot((ss) => {
  //         const _users = ss.docs.map((doc) => doc.data());
  //         res(_users);
  //       })
  //   );

  // users.forEach((user) => {
  // const mydata = firebaseConfig.database().ref(`data/${user.IDcontroller}`);
  // mydata.on("value", async (datasnap) => {
  //   const selectedUser = user;
  //   const data = await datasnap.val();

  //   // await Addtodata(selectedUser.IDcontroller, data.humadity, data.ligth);

  //   if (checkIfInRange(selectedUser, data)) {
  //     await test(selectedUser.titleRoom, data.ligth, data.humadity, museum);

  //     return;
  //   }
  // });
  const mydata = firebaseConfig.database().ref(`data/`);
  mydata.on("value", async (datasnap) => {
    const data = await datasnap.val();
    Object.keys(data).map((id) => {
      Addtodata(id, data[id].humadity, data[id].ligth);
      if (checkIfInRange(data[id])) {
        test(
          data[id].titleRoom,
          data[id].ligth,
          data[id].humadity,
          data[id].IDmuseum
        );
      }
    });
  });
};

main();
