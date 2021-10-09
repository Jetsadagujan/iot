import axios from "axios";

export const test = async (selectedUser, ligth, humadity, museum) => {
  if (museum == "museum") {
    await axios({
      method: "POST",
      url: "https://notify-api.line.me/api/notify",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer g5HhoWzTfrOuZpTbEVNY1JMQuhI9NqadU1NZNSlRonE",
      },
      data: `message=${selectedUser} มีถานะผิดปกติ 
                    ความชื้นสัมพัทธ์ : ${humadity}
                    แสงสว่าง      : ${ligth}`,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (museum == "museum02") {
    await axios({
      method: "POST",
      url: "https://notify-api.line.me/api/notify",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer Rzs2jSQ4rZNaa0r7JfvUKWXzay8XqyxHjpOBntgFgn3",
      },
      data: `message=${selectedUser} มีถานะผิดปกติ 
                    ความชื้นสัมพัทธ์ : ${humadity}
                    แสงสว่าง      : ${ligth}`,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
