let user_form = document.getElementById("form");
const retriveEntries = () => {
  let entries = localStorage.getItem("userEntry");

  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};
let Entries = retriveEntries();

const displayEntries = () => {
  const entries = retriveEntries();

  const rows = entries
    .map((entry) => {
      const name = `<td class="td">${entry.name}</td>`;
      const email = `<td class="td">${entry.email}</td>`;
      const password = `<td class="td">${entry.password}</td>`;
      const dob = `<td class="td">${entry.dob}</td>`;
      const acceptConditions = `<td class="td">${entry.acceptConditions}</td>`;

      const row = `<tr>${name} ${email} ${password} ${dob} ${acceptConditions}</tr>`;
      return row;
    })
    .join("\n");

  let tableDiv = document.getElementById("tableDiv");

  tableDiv.innerHTML = `<table class="table" border="1">
  <tr>
    <th class="th">Name</th>
    <th class="th">Email</th>
    <th class="th">Password</th>
    <th class="th">Dob</th>
    <th class="th">Accepted terms?</th>
  </tr>
    ${rows}
  </table>`;
};
const saveUserFrom = (event) => {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let dob = document.getElementById("dob").value;
  let acceptConditions = document.getElementById("acceptTerms").checked;

  let entry_obj = {
    name,
    email,
    password,
    dob,
    acceptConditions,
  };

  Entries.push(entry_obj);

  localStorage.setItem("userEntry", JSON.stringify(Entries));

  displayEntries();
};

user_form.addEventListener("submit", saveUserFrom);

displayEntries();


let setdate = document.getElementById("dob");

setdate.addEventListener("change", () => {
  let [year, month, date] = document.getElementById("dob").value.split("-");

  let dob = new Date(year, month, date);

  let month_diff = Date.now() - dob.getTime();  
      
  //convert the calculated difference in date format  
  let age_dt = new Date(month_diff);   
    
  //extract year from date      
  let year_ = age_dt.getUTCFullYear();  
    
  //now calculate the age of the user  
  let age = Math.abs(year_ - 1970);

  setdate.style.border = "2px solid rgba(0, 0, 0, 0.4)";
  if (age < 18 || age > 55) {
    setdate.setCustomValidity("Your age doesn't lie between 18 and 55");
    setdate.style.border = "2px solid red";
    return;
  } else {
    setdate.setCustomValidity("");
  }
});

const email = document.getElementById("email");

email.addEventListener("input", () => validate(email));

function validate(ele) {
  if (ele.validity.typeMismatch) {
    ele.setCustomValidity("The Email is not in the right format!!!");
    ele.reportValidity();
  } else {
    ele.setCustomValidity("");
  }
}
