import showdown from "showdown";
import xss from "xss";
import xssFilter from "showdown-xss-filter";

const md = new showdown.Converter({ extensions: [xssFilter] });

export default md;
