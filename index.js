//Dependencies
const Request = require("request")
const Chalk = require("chalk")

//Variables
const Self_Args = process.argv.slice(2)

//Main
if(!Self_Args.length){
    console.log("node index.js <ip>")
    process.exit()
}

Request(`https://www.shodan.io/host/${Self_Args[0]}`, function(err, res, body){
    let cves_found = []
    let cves = body.match(/CVE-\d+-\d+/g)

    if(!cves){
        console.log("No vulnerabilities found in the IP.")
        process.exit()
    }

    for( i in cves ){
        if(cves_found.indexOf(cves[i]) == -1){
            cves_found.push(cves[i])
        }
    }

    console.log(Chalk.blueBright(`${cves_found.length} vulnerables found in the IP`))
    for( i in cves_found ){
        console.log(Chalk.redBright(cves_found[i]))
    }
})
