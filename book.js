
 function saveToLocalStorage(event){
     event.preventDefault();
     const name = event.target.username.value;
     const email= event.target.emailId.value;
     const phonenumber = event.target.phonenumber.value;
    // localStorage.setItem('name' , name);
    // localStorage.setItem('email' , email);
    // localStorage.setItem('phonenumber', phonenumber);
     const myObj ={
         name,
         email, 
         phonenumber,
     }
         localStorage.setItem(myObj.email , JSON.stringify(myObj));
         showNewUserOnScreen(myObj)
     
     }
    
 window.addEventListener("DOMContentLoaded", () => {
     const localStorageObj = localStorage;
     const localStorageKeys = Object.keys(localStorageObj)
 
     for(var i=0; i<localStorageKeys.length; i++){
         const key = localStorageKeys[i];
         const userDetailsString= localStorageObj[key];
         const userDetailsObj = JSON.parse(userDetailsString);
         showNewUserOnScreen(userDetailsObj)
     }
 })
 
 
 function showNewUserOnScreen(user){
     document.getElementById('email').value= "";
     document.getElementById('username').value= "";
     document.getElementById('phonenumber').value= "";
     if(localStorage.getItem(user.email) !==null){
         removeUserFromScreen(user.email);
     }
    
     const parentNode = document.getElementById('listOfUsers');
     const childHTML  = `<li id= ${user.email}> ${user.name}  -  ${user.email}
                          <button onclick=deleteUser('${user.email}')>Delete User</button>
                          <button onclick=editUserDetails('${user.email}','${user.name}','${user.phonenumber}')>Edit User</button>
                           </li>`
     parentNode.innerHTML = parentNode.innerHTML + childHTML;
 }
 
 //edit user 
 function editUserDetails(emailId , name , phonenumber){
     document.getElementById('email').value= emailId;
     document.getElementById('username').value= name;
     document.getElementById('phonenumber').value= phonenumber;
     
     deleteUser(emailId);
 }
 
 //delete user 
 function deleteUser(emailId){
     console.log(emailId);
     localStorage.removeItem(emailId);
     removeUserFromScreen(emailId);
 }
 function removeUserFromScreen(emailId){
     const parentNode=document.getElementById('listOfUsers');
     const childNodeToBeDeleted = document.getElementById(emailId);
     if(childNodeToBeDeleted){
         parentNode.removeChild(childNodeToBeDeleted);
     }
 }