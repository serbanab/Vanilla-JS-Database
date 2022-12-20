
class LS{

    constructor(){
        this.uploadVectorTh = [];
        this.uploadVectorTd = [];

    }

    download(tb){

        let vectorTd;
        let vectorTh;

        if(localStorage.getItem("th")  === null && localStorage.getItem("td") === null ){

            let vectorTd = [];
            let vectorTh = [];
            
        }else{

            vectorTd = JSON.parse(localStorage.getItem("td"));
            vectorTh = JSON.parse(localStorage.getItem("th")); 

        }

        return {
            vectorTd,
            vectorTh
        }

    }

    upload(tr){

        this.uploadVectorTd =  JSON.parse(localStorage.getItem("td"));
        this.uploadVectorTh = JSON.parse(localStorage.getItem("th"));
   
       Array.from(tr.children).forEach((td , index) => {

        if(index !== 0 && index !== tr.children.length - 1){

            this.uploadVectorTd.push(td.textContent);

        }

       });

       this.uploadVectorTh.push(tr.firstElementChild.textContent);


       localStorage.setItem("td" , JSON.stringify(this.uploadVectorTd));
       localStorage.setItem("th" , JSON.stringify(this.uploadVectorTh));

    }

    uploadInitial(tb){

        const vectorTh = [];
        const vectorTd = [];

        document.querySelectorAll("tbody")[0].querySelectorAll("th").forEach((th) => {

            vectorTh.push(th.textContent);

        });

        tb.querySelectorAll("td").forEach((td) => {

            
            if(!td.firstElementChild.classList.contains("bi-x-lg")){

               vectorTd.push(td.textContent); 

            }

        });

    
        localStorage.setItem("th" , JSON.stringify(vectorTh));
        localStorage.setItem("td" , JSON.stringify(vectorTd));

    }

    updateST(tb){

        console.log("text");

        const vectorTh = [];
        const vectorTd = [];

        tb.querySelectorAll("th").forEach(th => {

            vectorTh.push(th.textContent);

        })

        tb.querySelectorAll("td").forEach(td => {

            if(!td.firstElementChild.classList.contains("bi-x-lg")){

            vectorTd.push(td.textContent);

        }

        });

       localStorage.setItem("th" , JSON.stringify(vectorTh));
       localStorage.setItem("td" , JSON.stringify(vectorTd));

    }

    deleteAllSt(){

        console.log("delete all");

        const vectorTd = [];
        const vectorTh = [];

        localStorage.setItem("th" , JSON.stringify(vectorTh));
        localStorage.setItem("td" , JSON.stringify(vectorTd));

    }

}

class UI extends LS {

    constructor(){

        super();

       this.input = document.querySelector("input");
       this.tableBody = document.querySelector("tbody");
       this.form = document.querySelector("form");
       this.btnEdit = document.getElementById("btn-edit");
       this.btnDelete = document.getElementById("btn-delete");
       this.sectionAdd = document.getElementById("section-add");
       this.btnBack = document.getElementById("btn-back");
       this.btnSearch = document.getElementById("btn-search");
       this.btnAdd = document.getElementById("btn-add");
       this.inputs = this.sectionAdd.querySelectorAll("input");
       this.pencils = document.querySelectorAll(".bi-pencil");
       this.element = '';
      
    }

    uiName(child){

        Array.from(child.parentElement.children).forEach(child2 => {

            child.style.display = "table-row";

            if(child !== child2){
                
                child2.style.display = "none";

            }

        });

    }

    trShow(){

        Array.from(this.tableBody.children).forEach(child => {

            child.style.display = "table-row"

        });

    }

    trNone(){

        Array.from(this.tableBody.children).forEach(child => {

            child.style.display = "none";

        });

    }

    editState(){

        let pencils = document.querySelectorAll(".bi-pencil");

        this.sectionAdd.classList.remove("d-none");
        this.btnDelete.classList.remove("d-none");
        this.btnEdit.classList.add("d-none");
        this.btnBack.classList.remove("d-none");
        this.btnSearch.textContent = "Update";

        pencils.forEach(pencil => {

            pencil.classList.remove("d-none");

        });
        


    }

    defaultState(){

        let pencils = document.querySelectorAll(".bi-pencil");

        this.sectionAdd.classList.add("d-none");
        this.btnDelete.classList.add("d-none");
        this.btnEdit.classList.remove("d-none");
        this.btnBack.classList.add("d-none");
        this.btnSearch.textContent = "Search";

        pencils.forEach(pencil => {

            pencil.classList.add("d-none");
           
        });

    }


    newRow(){

        let i = 0;
        const tr = document.createElement("tr");
        const th = document.createElement("th");
        const td = document.createElement("td");

       
        td.innerHTML = `<i class="bi bi-x-lg  text-danger "></i>`;
        this.tableBody.children.length > 0 ?  th.innerHTML =` ${Number(this.tableBody.children[this.tableBody.children.length -1].firstElementChild.textContent) + 1}  <i class="bi bi-pencil ms-3 text-success  "></i> `
        : th.textContent = 1;          

        tr.appendChild(th);
        
        Array.from({length : 4} , () => {
            
            const td = document.createElement("td");
            td.innerHTML = `${this.inputs[i].value} <i class="bi bi-pencil ms-3 text-success"></i>`;
            tr.appendChild(td);

            i++;
        });
        tr.appendChild(td);
        this.tableBody.appendChild(tr);
        i = 0;

        this.upload(tr);

    }


    emptyTable(){

        while(this.tableBody.children.length > 0 ){

            this.tableBody.firstChild.remove();

        }

    }

    soloDelete(e){
        e.target.classList.contains("bi-x-lg") && e.target.parentElement.parentElement.remove();
    }

    tdText(e){


       e.target.classList.contains("bi-pencil") && ( 
        this.input.value = e.target.parentElement.textContent,
        this.element = e.target.parentElement
        );

    }

    updateTd(){

        try {
            this.element.innerHTML = `${this.input.value}  <i class="bi bi-pencil ms-3 text-success  "></i>`;
        } catch (error) {
            console.log(error);
        }
        console.log(this.tableBody.children);
    }

    resetInputs(){

        this.inputs.forEach(input => {

            input.value = "";
            
        })

    }


    removeAlert(div){

        setTimeout(() => {

            div.remove();

        },3000);


    }


    alert(){

        if(document.querySelector(".added") === null){

        const div = document.createElement('div')
        div.classList.add("d-flex" , "added");

        div.innerHTML = `<span class = " text-danger align-self-center me-3  "   ><i class="bi bi-exclamation-diamond-fill "   ></i></span>`;

        this.form.insertBefore(div , this.input);

        this.removeAlert(div);
       
           
        }

    }

    loadData(data){

        
        let j = 0;
        const TB = document.createElement("tbody");

       if(data.vectorTd !== undefined && data.vectorTh !== undefined){
       for(let i = 0 ; i < data.vectorTd.length / 4; i++){

       const tr = document.createElement("tr");
       const th = document.createElement("th");
       
       th.innerHTML = `${data.vectorTh[i]}  <i class="bi bi-pencil ms-3 text-success d-none"></i> `
       tr.appendChild(th);

       Array.from({length : 4} , () => {

        const td = document.createElement("td");
        td.innerHTML = `${data.vectorTd[j]}  <i class="bi bi-pencil ms-3 text-success d-none "></i> `;

        tr.appendChild(td);

        j++;        

       });

       const td = document.createElement("td");

       td.innerHTML = `<i class="bi bi-x-lg  text-danger "></i>`
       tr.appendChild(td);

       TB.appendChild(tr);

       }

       this.tableBody.innerHTML = TB.innerHTML;
    }
    }  
}

class Control extends UI {


    constructor(){

        super()

    }


    find(){
 
        if(this.input.value !== ""){
  const found =  Array.from(this.tableBody.children).find(child => {

    let childText = child.children[2].textContent.split(" " , 1);

         if(childText[0] === this.input.value){
            
            this.uiName(child);
            return child
 
         }

 
        });

        console.log(found);

       found === undefined && this.trNone(); 
    }else{
        this.alert();
    }
     }


     eventsEdit(){

        this.form.removeEventListener("submit" , Submit);
        this.btnSearch.addEventListener("click" , Update);

     }

     eventsDefault(){

         this.form.addEventListener("submit" , Submit);
         this.btnSearch.removeEventListener("click" , Update);

     }

 
     init(){

    const data =  this.download(this.tableBody);
    this.loadData(data);
    this.uploadInitial(this.tableBody);
    
     }

}


const ct = new Control();


const Submit = (e) =>{

    e.preventDefault();
    ct.find();
    

}


inputChange = (e) => {

    e.target.value === "" && ct.trShow();


}


const Edit = (e) => {

    ct.editState();
    ct.eventsEdit();

}

const Back = () => {

    ct.defaultState();
    ct.eventsDefault();

}

const Update = (e) => {

    e.preventDefault();
    ct.updateTd();
    ct.updateST(ct.tableBody);
   
}

const Add = (e) => {

    e.preventDefault();
    ct.newRow();
    ct.resetInputs();
    

}

const DeleteAll = (e) => {

    e.preventDefault();
    ct.emptyTable();
    ct.deleteAllSt();

}

const soloDelete = (e) => {
    
    ct.soloDelete(e);
    ct.tdText(e);
    e.target.classList.contains("bi-x-lg") &&  ct.updateST(ct.tableBody);

}

ct.form.addEventListener("submit" , Submit);
ct.input.addEventListener("keyup", inputChange);
ct.btnEdit.addEventListener("click" , Edit);
ct.btnBack.addEventListener("click" , Back);
ct.btnAdd.addEventListener("click" , Add);
ct.btnDelete.addEventListener("click" ,DeleteAll );
ct.tableBody.addEventListener("click" , soloDelete);

ct.init();