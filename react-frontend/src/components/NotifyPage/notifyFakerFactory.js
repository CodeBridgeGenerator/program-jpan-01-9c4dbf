
import { faker } from "@faker-js/faker";
export default (user,count,tajukIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
tajuk: tajukIds[i % tajukIds.length],
venue: faker.lorem.sentence(""),
tarikh: faker.lorem.sentence(""),
penganjur: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
