import firebaseConfig from "./config.js";

export const Addtodata = async (IDcontroller, humadity, ligth) => {
  try {
    const checkSection = await new Promise((res) =>
      firebaseConfig
        .firestore()
        .collection(`${IDcontroller}`)
        .where("section", "==", "section")
        .onSnapshot((ss) => {
          const data = {};
          ss.forEach((document) => {
            data[document.id] = document.data();
          });
          res(data);
        })
    );
    const checkData = await new Promise((res) =>
      firebaseConfig
        .firestore()
        .collection(`${IDcontroller}`)
        .where(
          "createdAt",
          "==",
          new Date(
            `${new Date().getMonth() +
              1}/${new Date().getDate()}/${new Date().getFullYear()}/00:00:00`
          )
        )
        .onSnapshot((ss) => {
          const data = {};
          ss.forEach((document) => {
            data[document.id] = document.data();
          });
          res(data);
        })
    );
    if (
      Object.keys(checkSection).length === 0 &&
      checkSection.constructor === Object
    ) {
      console.log("............................insection");
      await firebaseConfig
        .firestore()
        .collection(`${IDcontroller}`)
        .add({
          section: "section",
          humadity: [humadity],
          ligth: [ligth],
          maxHumidity: humadity,
          minHumidity: humadity,
          maxLight: ligth,
          minLigth: ligth,
        });
    }
    if (
      Object.keys(checkData).length === 0 &&
      checkData.constructor === Object
    ) {
      console.log(
        ".....................................................ถ้าไม่มีให้สร้างใหม่"
      );
      await firebaseConfig
        .firestore()
        .collection(`${IDcontroller}`)
        .add({
          humadity: [humadity],
          ligth: [ligth],
          maxHumidity: [humadity],
          minHumidity: [humadity],
          maxLight: [ligth],
          minLigth: [ligth],
          time: [`${new Date().getHours()}:${new Date().getMinutes()}`],
          createdAt: new Date(
            `${new Date().getMonth() +
              1}/${new Date().getDate()}/${new Date().getFullYear()}/00:00:00`
          ),
        });
    } else {
      console.log(
        ".....................................................มีอยู่แล้วให้อัปเดท"
      );
      Object.keys(checkSection).map(async (idsection) => {
        console.log("........................ in section");
        const arrH = checkSection[idsection].humadity;
        const arrL = checkSection[idsection].ligth;
        arrH.push(humadity);
        arrL.push(ligth);
        let maxH = checkSection[idsection].maxHumidity;
        let minH = checkSection[idsection].minHumidity;
        let maxL = checkSection[idsection].maxLight;
        let minL = checkSection[idsection].minLigth;
        if (maxH < humadity) {
          maxH = humadity;
        }
        if (minH > humadity) {
          minH = humadity;
        }
        if (maxL < ligth) {
          maxL = ligth;
        }
        if (minL > ligth) {
          minL = ligth;
        }
        await firebaseConfig
          .firestore()
          .collection(`${IDcontroller}`)
          .doc(`${idsection}`)
          .update({
            section: "section",
            humadity: arrH,
            ligth: arrL,
            maxHumidity: maxH,
            minHumidity: minH,
            maxLight: maxL,
            minLigth: minL,
          });

        if (new Date().getMinutes() % 2 == 0) {
          console.log("..............................10นาที");
          Object.keys(checkData).map(async (id) => {
            console.log(
              `this time........................${checkData[id].time.length -
                1}`
            );

            const timeold = checkData[id].time.length - 1;
            console.log(checkData[id].time[timeold]);
            const check =
              `${checkData[id].time[timeold]}` ==
              `${new String(
                `${new Date().getHours()}:${new Date().getMinutes()}`
              )}`;

            console.log(check);

            if (
              `${checkData[id].time[timeold]}` !==
              `${new String(
                `${new Date().getHours()}:${new Date().getMinutes()}`
              )}`
            ) {
              console.log(
                new String(
                  `${new Date().getHours()}:${new Date().getMinutes()}88888888888888888888888888888888`
                )
              );
              let countH = 0;
              let sumH = 0;
              let countL = 0;
              let sumL = 0;
              const arrHumadity = checkData[id].humadity;
              const arrLigth = checkData[id].ligth;
              const maxHumidity = checkData[id].maxHumidity;
              const minHumidity = checkData[id].minHumidity;
              const maxLight = checkData[id].maxLight;
              const minLigth = checkData[id].minLigth;
              maxHumidity.push(maxH);
              minHumidity.push(minH);
              maxLight.push(maxL);
              minLigth.push(minL);
              arrH.map((valueH, indexH) => {
                countH = indexH + 1;
                sumH = sumH + valueH;
              });
              arrL.map((valueL, indexL) => {
                countL = indexL + 1;
                sumL = sumL + valueL;
              });
              const averageH = (sumH / countH).toFixed(2);
              const averageL = (sumL / countL).toFixed(2);
              arrHumadity.push(averageH);
              arrLigth.push(averageL);
              const timeh = checkData[id].time;
              timeh.push(`${new Date().getHours()}:${new Date().getMinutes()}`);
              await firebaseConfig
                .firestore()
                .collection(`${IDcontroller}`)
                .doc(`${id}`)
                .update({
                  humadity: arrHumadity,
                  ligth: arrLigth,
                  maxHumidity: maxHumidity,
                  minHumidity: minHumidity,
                  maxLight: maxLight,
                  minLigth: minLigth,
                  time: timeh,
                });
              await firebaseConfig
                .firestore()
                .collection(`${IDcontroller}`)
                .doc(`${idsection}`)
                .update({
                  section: "section",
                  humadity: [humadity],
                  ligth: [ligth],
                  maxHumidity: humadity,
                  minHumidity: humadity,
                  maxLight: ligth,
                  minLigth: ligth,
                });
            }
          });
        }
      });
    }
    // eslint-disable-next-line no-empty
  } catch (error) {}
};
