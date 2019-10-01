
const School = require('./node-school-kr');

const school = new School();
school.init(School.Type.HIGH, School.Region.INCHEON, 'E100002238');
school.getMeal(2019, 10, 1).then(meal => {
    console.log(meal);
});
const sampleAsync = async function() {
    meal = await school.getMeal(2019,10,1);
    console.log(meal);
};

sampleAsync();