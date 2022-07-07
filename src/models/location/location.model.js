import mongoose from "mongoose";

import locationSchema from "../schemas/location.schema";

const Location = mongoose.model('Location', locationSchema);

export default Location;