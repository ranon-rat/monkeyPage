let monkey = {
  adn: [],
  score: 0,
  val: "",
  prob: 0,
  findThis: ""
};
// source del proyecto https://github.com/ranon-rat/monkeyPage


////// funciones de monkey

function generateADN(generate) {
  // te genera una parte del adn
  this.adn=[]
  this.score=0
  this.porb=0
  this.findThis = generate;
  console.log("esto funciona");
  for (let i = 0; i < generate.split("").length; i++) {
    
    this.adn.push({
      char: String.fromCharCode(Math.random() * 300),
      edit: true
    });
    
  }
}
function editARN(i) {
  
  // edita una parte del adn
  this.adn[i] = {
    //te genera una letra al azar
    char: String.fromCharCode(Math.random() * 300),
    edit: true
  };
}
function scor() {
  this.comp();
  if (this.score >= this.findThis.split("").length) {
    // si el score es mayor a el string deberia de parar
    return true;
  } else {
    this.comp();
    return false;
  }
}
function comp(compare) {
  // se que hablan en español asi que los comentarios estaran en español
  let SC = this.findThis;

  this.prob = this.score / SC.length;

  for (let y = 0; y < this.adn.length; y++) {
    for (let x = 0; x < SC.length; x++) {
      if (this.adn[y].char == SC[x] && this.adn[y].edit && x == y) {
        this.score += 1;
        console.log(this.adn[y].char, SC[x]);
        console.log(this.adn);
        this.adn[y].edit = false;
      } else if (y.char != SC[x] && this.adn[y].edit) {
        this.editARN(y);
      }
    }
  }
}
monkey.comp = comp;
monkey.generate = generateADN;
monkey.editARN = editARN;
monkey.scor = scor;
// hasta aqui es el individuo ahora sigue funciones de la pagina
function aalo(valor){
  monkey.generate(valor)
  let id=setInterval(()=>{
  let n =monkey.scor()
    document.querySelector("#asi > h2").innerText=monkey.adn.map((i)=>{
      return i.char
    }).join("")
    if (n){
      clearInterval(id)

    }
  },1)
 
}
/// /////// ///// /// /// /// onclick
aalo("freddy realmente me haces reir con cada uno de tus videos, gracias por hacer un hermoso contenido")
function myfunction(){
  let m=document.getElementById("añañin").value
  if(m!=""){
    document.getElementById("añañin").value=""
    aalo(m)
  }
  else{
    aalo("freddy sos un pro")
       
  }
}



/// HASTA ESTE PUNTO ES EL INDIVIDUO
