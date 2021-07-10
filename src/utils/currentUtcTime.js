import moment from "moment";

//return current utc +0 day of the week and hour
const currentUtcTime = () => {
    const day = moment.utc().weekday();
    const hour = moment.utc().hour()

    return {day, hour};
}

export default currentUtcTime;