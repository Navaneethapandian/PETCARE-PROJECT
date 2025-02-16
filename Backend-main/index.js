

const bcrypt=require('bcrypt')
const passowrd="12345678"
const salt=10;
bcrypt.hash(passowrd,salt,function(err,result){
const hash=result;
console.log(hash)
});
