const { default: mongoose } = require("mongoose");

let MONGO_URL=`mongodb+srv://abhi:abhi@cluster0.4e79vwe.mongodb.net/mock11?retryWrites=true&w=majority`;

const server = async () => {
  try {
    await mongoose.connect(`${MONGO_URL}`);
    console.log(`server is running at port ${4500}`);
  } catch (error) {
    console.log(error.message);
  }
};


module.exports=server;