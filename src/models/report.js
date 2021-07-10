import pkg from "mongoose";
const { Schema, model } = pkg;

const reportSchema = new Schema({
  recipients: {
    type: [String],
    required: true,
  },
  emailBody: {
    type: String,
    default() {
        return "";
      },
  },
  //The day & hour according to utc +0
  //(They will be converted in the client according to the timezone offset)
  days: {
    type: [Number],
    required: true,
  },
  hour: {
    type: Number,
    required: true,
  },
  timeZoneOffset: {
    type: Number,
    default(){
        return new Date().getTimezoneOffset()/60*-1;
    }
  },
  treated: {
    type: Boolean,
    default() {
        return false;
      },
  },
});

export default model("Report", reportSchema);
