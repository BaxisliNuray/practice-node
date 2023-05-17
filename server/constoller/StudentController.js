const students = require('../data/index');
module.exports = {
    get: (req,res)=>{
        if (students.length === 0) {
            res.status(204).send("no content");
            return;
          } else {
            let{name} = req.query;
            console.log('query: ',name);
            if (name) {
              res.send(students.filter((x)=>x.name==name));
            }
            res.status(200).send(students);
            return;
          }
    }
}