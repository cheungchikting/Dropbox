fetch('http://localhost:3000/')
    .then(response => response.json())
    .then((data) => {
        console.log(data)
        for (let i = 0; i < data.length; i++) {
            if (data[i].fileSize / 1000 < 1000) {
                $("tbody").append(
                    `<tr>
        <th scope="row" class="align-middle">${i+1}</th>
        <td class="align-middle">${data[i].fileName}</td>
        <td class="align-middle">${(data[i].fileSize/1000).toFixed(0)} KB</td>
        <td class="align-middle">${data[i].timeUpload}</td>
        <td class="align-middle">
        <form action="/uploaded/${data[i].fileName}" method="get" enctype="multipart/form-data">
        <button type="submit" id="submit" class="btn btn-primary">Download</button>
        </form>
        </td>
      </tr>`)
            } else {
                $("tbody").append(
                    `<tr>
        <th scope="row" class="align-middle">${i+1}</th>
        <td class="align-middle">${data[i].fileName}</td>
        <td class="align-middle">${(data[i].fileSize/1000000).toFixed(1)} MB</td>
        <td class="align-middle">${data[i].timeUpload}</td>
        <td class="align-middle">
        <form action="/uploaded/${data[i].fileName}" method="get" enctype="multipart/form-data">
        <button type="submit" id="submit" class="btn btn-primary">Download</button>
        </form>
        </td>
      </tr>`)
            }

        }
    });