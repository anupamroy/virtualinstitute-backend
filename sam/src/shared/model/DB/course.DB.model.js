"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectCombination = exports.Course = void 0;
const DB_model_1 = require("./imports/DB.model");
class Course extends DB_model_1.GeneralDBItem {
    constructor() {
        super(...arguments);
        this.courseName = "";
        this.courseCode = "";
        this.courseType = "";
        this.courselevel = "";
        this.courseStream = "";
        this.subjectCombinationIds = [];
    }
}
exports.Course = Course;
class SubjectCombination extends DB_model_1.GeneralDBItem {
}
exports.SubjectCombination = SubjectCombination;
// export class Semester extends GeneralDBItem {
//   subjects: Subject[] = [];
// }
// export class Subject extends GeneralDBItem {
//   subjectName: string = "";
//   subjectCode: string = "";
//   subjectGroup: SubjectGroup = "";
//   islabBased: boolean = true;
//   islanguage: boolean = true;
// }
