import { StatusCodes } from "http-status-codes";
import RandomUser from "../model/RandomUser.js";
import axios from "axios";
const getRandUser = async () => {
    const apiUrl = "https://randomuser.me/api/";
    try {
        const res = await axios.get(apiUrl);
        return res.data;
    }
    catch (err) {
        console.log(err);
    }
};
const populateDBFakeUsers = async (req, res) => {
    console.log("Staring Population");
    for (let i = 0; i < 100; i++) {
        const res = await getRandUser();
        const user = res.results[0];
        console.log(user);
        await RandomUser.create({
            displayName: user.name.first + " " + user.name.last,
            username: user.login.username,
            password: user.login.password,
        });
    }
    console.log("Completed");
    return res.status(StatusCodes.OK).json({ msg: "population Successfull" });
};
export { populateDBFakeUsers };
//# sourceMappingURL=populateDb.js.map