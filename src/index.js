import firebaseConfig from "./config.js";
import { checkIfInRange } from "./utils.js";
import { test } from "./lineconfig.js";
import { Addtodata } from "./addtodatafire.js";

const main = async () => {
  // let count = 0;
  const museums = ["museum", "museum02"];
  museums.forEach(async (museum) => {
    console.log(`start watching: ${museum}`);
    const users = await new Promise((res) =>
      firebaseConfig
        .firestore()
        .collection(museum)
        .onSnapshot((ss) => {
          const _users = ss.docs.map((doc) => doc.data());
          res(_users);
        })
    );

    users.forEach((user) => {
      const mydata = firebaseConfig.database().ref(`data/${user.IDcontroller}`);
      mydata.on("value", async (datasnap) => {
        const selectedUser = await user;
        const data = await datasnap.val();

        await Addtodata(selectedUser.IDcontroller, data.humadity, data.ligth);

        if (checkIfInRange(selectedUser, data)) {
          console.log(`notify here ${museum}`);
          console.log(
            `data not in range alert: ${selectedUser.titleRoom}: ligth ${data.ligth} :humadity ${data.humadity}`
          );
          await test(selectedUser.titleRoom, data.ligth, data.humadity, museum);

          return;
        }
      });
    });
  });
};

main();
