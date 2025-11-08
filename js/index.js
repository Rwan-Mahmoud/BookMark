// ^ HTML selectors
var siteName = document.getElementById("siteNameInput");
var siteUrl = document.getElementById("siteUrlInput");
var searchInput= document.getElementById("searchSiteInput");
var cont=document.getElementById("tableRows");
var siteError=document.getElementById("noSites")
//^ Variables
var sites = JSON.parse(localStorage.getItem("Sites")) || [];
displayAllSitse();

var validateName = /^[A-Z][a-z0-9 ]{3,}$/;
 var validateUrl = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,15}([-a-zA-Z0-9()!@:%_+.~#?&//=]*)$/;


//^ Functions

function addSite() {
  var validateInput =
    validate(validateName, siteName) && validate(validateUrl, siteUrl);
  if (validateInput == true) {
    var siteInfo = {
      siteIndex: sites.length + 1,
      name: siteName.value,
      url: siteUrl.value,
    };

    sites.push(siteInfo);

    localStorage.setItem("Sites", JSON.stringify(sites));
    displaySite(sites.length - 1);

     siteName.value = "";
    siteUrl.value = "";
  }else
  {
    Swal.fire({
  icon: "error",
  title: "Please Enter valid values",
  text: "Something went wrong!",
  footer: '<a href="#">Why do I have this issue?</a>'
});
}
}

function displaySite(index) {
  var website = `
    
    <tr>
      <th scope="row">${sites[index].siteIndex}</th>
      <td class="">${sites[index].name}</td>
      <td class="">
      <button class="visit_button me-0 text-white px-3 py-2 me-0" onclick="visitSite(${index})" >
       <a href="${sites[index].url}" target="_blank"></a>
        <i class="fa-solid fa-eye"></i>
        Visit
      </button></td>
      <td>
        <button class="delete me-0 text-white px-3 py-2 me-0" onclick="deleteSite(${index})">
        <i class="fa-solid fa-trash"></i>
        Delete
      </button>
      </td>
    </tr>

 
     `;
  tableRows.innerHTML += website;
}

function displayAllSitse() {
  for (var i = 0; i < sites.length; i++) {
    displaySite(i);
  }
}

function visitSite(index) {
  window.open(sites[index].url, "_blank");
}

function deleteSite(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      sites.splice(index, 1);
      tableRows.innerHTML = "";
      localStorage.setItem("Sites", JSON.stringify(sites));
      displayAllSitse();
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
}

function validate(regex, input) {
  if (regex.test(input.value)) {
    console.log("done");
    input.nextElementSibling.classList.add("invisible");
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");

    return true;
  } else {
    console.log("redo");
    input.nextElementSibling.classList.remove("invisible");
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");

    return false;
  }
}

function searchSite(){

  cont.innerHTML="";
  var searchWord = searchInput.value;
   var found = false;
  for(var i=0 ; i <sites.length; i++){
    if(sites[i].name.toLowerCase().includes(searchWord.toLowerCase())){
       siteError.classList.add("invisible")
      displaySite(i);
      found=true;

    }
  }
  if(!found){
    siteError.classList.remove("invisible")
  }

}