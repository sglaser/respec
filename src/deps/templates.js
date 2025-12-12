import * as HandlebarsRuntime from "./handlebars.runtime.js";
import "./compiled-templates.js";

const Handlebars = HandlebarsRuntime.default || HandlebarsRuntime;

export default Handlebars.templates;
