/* CONNECTING TO WEB SOCKET */
const socket = new WebSocket("ws://localhost:8080");

const CONNECTION_ESTABLISHED_AT = Date.now();

socket.onopen =  (e) => {
    console.log("[open] Connection established");
    console.log("Sending to server");
};

socket.onmessage = async  (e) => {
  console.log("data recieved");
  console.log(e);
  addDataToTable(e);
};

socket.onclose = (e) => {
  console.log("connection closed");
}; 

{/* <tr>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
          <td>Germany</td>
        </tr>
 */}

async function addDataToTable  (res){
    let table = document.getElementById("firstRow");

    let source = res.origin;
    let type = res.type;
    let data =  await (new Response(res.data)).text();

    let row = document.createElement("tr");
    var cell1 = document.createElement("td");
    cell1.appendChild(document.createTextNode(source));
    var cell2 = document.createElement("td");
    cell2.appendChild(document.createTextNode(data));
    var cell3 = document.createElement("td");
    cell3.appendChild(document.createTextNode(type));

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);

    table.appendChild(row);

    // `<tr><td>${source}</td><td>${data}</td><td>${data}</td></tr>`
}









