

const adminAuth = (req,res,next)=>{
  const token = "mysecrettoken";
  const isAuthorised = token === "mysecrettoken";
  if (!isAuthorised) {
    return res.status(401).send("Unauthorized Access Denied");
  }else{
    next();
  };
}

const userAuth = (req,res,next)=>{
  const token = "mysecrettoken";
  const isAuthorised = token === "mysecrettoken";
  if (!isAuthorised) {
    return res.status(401).send("Unauthorized Access Denied");
  }else{
    next();
  };
}


module.exports ={ adminAuth,userAuth};