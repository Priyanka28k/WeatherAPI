const http = require("http");
const fs = require("fs");
const axios = require("axios");

const mainFile = fs.readFileSync("index.html", "utf-8");

const styleFile = fs.readFileSync("style.css", "utf-8");

const port = 8000;

const server = http.createServer(async (req, res) => {
  if (req.url === "/" || req.url === "/style.css") {
    try {
      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=ac158760c9d52aab0d272a566e0e3d79"
      );

      const object = response.data;
      const arrData = [object];
    //   console.log((arrData[0].main.temp - 273.25).toFixed(1) + "°C")
    //   console.log(arrData[0].name);

      let myWeatherState = '<i class="fa fa-cloud" style="font-size: 170px; color: rgb(92, 92, 92)" ></i>';
      let realTime = mainFile
        .replace("{%temperature%}", ((arrData[0].main.temp - 273.15).toFixed(1) + "°C"))
        .replace("{%city%}", arrData[0].name)
        .replace("{%weathericon%}", myWeatherState);

      res.write(realTime, "utf-8");
      res.write(styleFile);
    // console.log(realTime);
      res.end();
    } catch (err) {
      console.error("Error fetching weather data:", err.message);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  }
//   else if (req.url === "/style.css") {
//     // Serve the CSS file
//     res.writeHead(200, { "Content-Type": "text/css" });
//     res.write(styleFile);
//     res.end();
// }
});

server.listen(port, () => {
  console.log(`Server is running at port : ${port}`);
});









// const http = require("http");
// const fs = require("fs");
// const requests = require("requests");

// const mainFile = fs.readFileSync("index.html","utf-8");

// const port = 8000;

// // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// // https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=ac158760c9d52aab0d272a566e0e3d79
// const server = http.createServer((req,res) => {
//     if(req.url === '/'){
//         requests("https://api.openweathermap.org/data/2.5/weather?q=Modinagar&appid=ac158760c9d52aab0d272a566e0e3d79")

//         .on("data",function(chunk){
//             const object = JSON.parse(chunk);
//             const arrData = [object];
//             console.log(arrData)
//             // console.log((arrData[0].main.temp - 273.25).toFixed(1) + "°C")
//             // console.log(arrData[0].name);

//             myWeatherState = '<i class="fa fa-cloud" style="font-size: 170px; color: rgb(92, 92, 92)" ></i>';
            
//             // .replace("{%temperature%}",())
//             // .replace("{%temperature%}",((arrData[0].main.temp - 273.15).toFixed(1) + "°C"))
            
//             // let realTime = mainFile.replace(
//             //     "{%temperature%}",((arrData[0].main.temp - 273.15).toFixed(1) + "°C")
//             //     )

//             let realTime = mainFile.replace(
//                 // "{%temperature%}",((arrData[0].main.temp - 273.15).toFixed(1) + "°C")
//                 )
//                 // .replace("{%city%}",arrData[0].name).replace("{%weathericon%}",myWeatherState)

//             // res.write(realTime,"utf-8");
//             // console.log(realTime);
//             // res.end();
//         })

//         .on("end",function(err){
//             // if(err) throw err;
//             console.log("ended successfully");
//         })
        
//     }
// });


// server.listen(port,() => {
//     console.log(`Server is running at port : ${port}`);
// });