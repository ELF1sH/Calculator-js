import { setBtnListeners } from "./client.js";
import {calcHistory} from "./history.js"

setBtnListeners()

const CH = new calcHistory()
CH.init()