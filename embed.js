/**
 * Составляет embed из выбранной директории
 */
var fs = require("fs");
var path = require("path");

/**
 * Config
 */
var className = "Embed";
var workingDir = __dirname + "/img/";
var outputFile = __dirname + "/src/" + className + ".as";

if (fs.lstatSync(workingDir).isDirectory() == false)
{
	console.log("Error: " + __filename + " is not directory");
	process.exit(-1);
}

var images = fs.readdirSync(workingDir).filter(isImage).map(getBaseName);
var classes = images.map(getClassName);

var embeds = [];
var initializers = [];
for (var i = 0; i < images.length; i++)
{
	embeds.push(generateEmbed(images[i], classes[i]));
	var init = "new {{className}}()".replace("{{className}}", classes[i])
	initializers.push(init);
}
var embedsConcat = embeds.join("\n		");
var initializersConcat = initializers.join(",\n			");

var template = fs.readFileSync("classTemplate.txt", {encoding: "UTF-8"});
template = template.replace("{{embeds}}", embedsConcat);
template = template.replace("{{className}}", className);
template = template.replace("{{className}}", className);
template = template.replace("{{init}}", initializersConcat);

fs.writeFile(outputFile, template, function (err)
{
	if (err)
	{
		return console.log(err);
	}
	
	console.log("The file was saved!");
});

function generateEmbed(fileName, className)
{
	var embedTemplate = "[Embed(source = \"../img/{{name}}\")] public static const {{className}}:Class;";
	embedTemplate = embedTemplate.replace("{{name}}", fileName).replace("{{className}}", className);
	return embedTemplate;
}

function getClassName(str)
{
	var extRemoved = str.split(".")[0];
	var upper = toUpperCaseEachWord(extRemoved, "_");
	return upper;
}

function getBaseName(str)
{
	return path.basename(str);
}

function isImage(str)
{
	var ext = extension(str);
	return ext == "jpg" || ext == "png"
}

function extension(str)
{
	var arr = str.split(".");
	return arr[arr.length - 1];
}

function toUpperCaseEachWord(str, delim)
{
	delim = delim ? delim : ' ';
	return str.split(delim).map(function (v)
	{
		return toUpperCaseFirstChar(v)
	}).join("");
}

function toUpperCaseFirstChar(str)
{
	return str.substr(0, 1).toUpperCase() + str.substr(1);
}

//Может лучше брать директории из аргументов? а если запускать без аргументов, использовать дефолтные директории
//if (process.argv.length <= 2) {
//	console.log("Usage: " + __filename + " path/to/directory");
//	process.exit(-1);
//}
//var workingDir = process.argv[2];