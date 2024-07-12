import axios from "axios";


const baseUrl = "http://softinz20233-001-site1.gtempurl.com/api/users";

export const checkUser = (username,password) => {
    axios.get(baseUrl)
      .then(res => {
        if(res.status == 200 && res.data != null){
          const users = res.data;
          const check = users.filter(u => u.username == 
            username && u.password == password);
          if(check.length > 0){
            alert("Ulogovani ste");
            localStorage.setItem('ulogovan',true);
          }
          else{
            alert("Neispravni podaci za logovanje");
          }
        }
        else{
          console.log("Desila se greska");
        }
      })
      .catch(error => console.log(error));
}
export const registerUser = (username,password)=>{
  const obj = {
    Username:username,
    Password:password
  };
  axios.post(baseUrl, obj)
  .then(res => console.log(res))
  .catch(err => console.log(err));
}

export const registerUserAsync = async (username,password)=>{
  const obj = {
    Username:username,
    Password:password
  };
  const res = await axios.post(baseUrl, obj);
  if(res.status == 200)
  {
    console.log("Dodat je novi user u bazu");
  }
}