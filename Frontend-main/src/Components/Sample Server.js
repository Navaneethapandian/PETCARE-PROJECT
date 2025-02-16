 app.post('/loginform', (req, res) => {
    console.log("post Connecion Success")





    const email=req.body.email;
    const password=req.body.password;
    localStorage.setItem('id',req.body.email);

    console.log("query Exceution Success")
    ////
  
////
    //db.query("Insert into user(name,email,password) Values(?,?,?)",[name,email,password],(err,data)=>{
        // console.log("query Exceution Success 3")
        db.query("select * from pet_adaption.user where email=?and password=?",[email,password],(err,data)=>{
        if(err)
        {
            console.log("query Exceution Success 8")
            return res.json("error")
        }
        if(data.length>0)
        {
          
          console.log("Sucess")
          console.log(key);
          return res.json("ok");
        }
        else
        {
          console.log("Failure")
          return res.json("faliure")
        }
        
        // console.log("query Exceution Success 4")

        return res.json(data)
        
        
    })

  });



