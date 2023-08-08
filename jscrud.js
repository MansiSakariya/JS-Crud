window.alert("JS Crud..................");
let studentinfo = JSON.parse(localStorage.getItem("studentinfo")) || [];
isEdit = -1;

const randertable = () => {
    document.getElementById('tbl').innerHTML =
        studentinfo.map((item, index) =>
            `<tr>
        <td>${item.fname}</td>
        <td>${item.gender}</td>
        <td>${item.email}</td>
        <td>${item.psw}</td>
        <td>${item.add}</td>
        <td>${item.phone}</td>
        <td>${item.box}</td>
        <td><button type="button" onclick="deletedata(${index})">Delete</button></td>
        <td><button type="button" onclick="editdata(${index})">Edit</button></td>
    </tr>`)
}

//edit record

const editdata = (index) => {
    isEdit = index;
    let editrecord = studentinfo.find((item, index1) => { return index1 === index });
    console.log("editrecord", editrecord);
    document.getElementById('fname').value = editrecord.fname
    document.getElementById('email').value = editrecord.email
    document.getElementById('psw').value = editrecord.psw
    document.getElementById('add').value = editrecord.add
    document.getElementById('phone').value = editrecord.phone
}

function myfun() {
    let firstname = document.getElementById('fname').value
    let gender = '';
    if (document.getElementById('female').checked) {
        gender += document.getElementById("female").value
    }
    if (document.getElementById('male').checked) {
        gender += document.getElementById("male").value
    }
    let email = document.getElementById('email').value
    let password = document.getElementById('psw').value
    let address = document.getElementById('add').value
    let phonenumber = document.getElementById('phone').value
    let box = '';
    if (document.getElementById('true').checked) {
        box += document.getElementById("true").value
    }
    if (document.getElementById('false').checked) {
        box += document.getElementById("false").value
    }

    studentdata = {
        fname: firstname, gender: gender, email: email,
        psw: password, add: address, phone: phonenumber, box: box
    }
    console.log("studentdata", studentdata);

    if (isEdit !== -1) {
        const updatedData = studentinfo.map((item, index) => {
            if (index === isEdit) {
                return studentdata
            }
            else {
                return item
            }
        })
        studentinfo = updatedData
        localStorage.setItem("studentinfo", JSON.stringify(updatedData));
    }

    // duplicate record

    else {
        let duplicatedata = studentinfo.some((item) => item.fname === firstname);
        console.log("duplicatedata", duplicatedata);
        if (duplicatedata) {
            window.alert("Already exist data")
        }
        else {
            studentinfo.push(studentdata);
            localStorage.setItem("studentinfo", JSON.stringify(studentinfo));
        }
    }
    randertable();
}

// search record

function search() {
    const student = document.getElementById('search').value
    let searchdata = studentinfo.filter((item) => item.fname === student || item.email === student || item.add === student);
    studentinfo = searchdata
    randertable();
}

// delete record

const deletedata = (index) => {
    const deleteinfo = studentinfo.filter((value, ind) => ind !== index);
    console.log("deleteinfo", deleteinfo)
    studentinfo = deleteinfo;
    localStorage.setItem("studentinfo", JSON.stringify(studentinfo));
    randertable();
}

//sort record

function sort() {
    let sortdata = studentinfo.sort((a, b) => a.fname.localeCompare(b.fname));
    studentinfo = sortdata
    console.log("sortdata", sortdata);
    randertable()
}
function sorting() {
    let sortdata = studentinfo.sort((a, b) => a.add.localeCompare(b.add));
    console.log("sortdata", sortdata);
    studentinfo = sortdata;
    randertable();
}
function sortrecord() {
    let sortdata = studentinfo.sort((a, b) => a.email.localeCompare(b.email));
    console.log("sortdata", sortdata);
    studentinfo = sortdata;
    randertable();
}
function sortdata() {
    let sortdata = studentinfo.sort((a, b) => a.gender.localeCompare(b.gender));
    console.log("sortdata", sortdata);
    studentinfo = sortdata;
    randertable();
}
randertable();