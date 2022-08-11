let buttons=document.querySelectorAll(".addCard")
let countArea=document.querySelector(".count")
let priceArea=document.querySelector(".priceZone")
let priceZone=document.querySelector(".price-area")
let tBody=document.querySelector("tbody")
let tableZone=document.querySelector(".basket-not-empty")
let empty=document.querySelector(".empty")
let table=document.querySelector("table")

let basket;
let result=localStorage.getItem("basket");
if (!result) {
    localStorage.setItem("basket",JSON.stringify([]))
}
buttons.forEach((button)=>{
    button.addEventListener("click",function(){
        basket=JSON.parse(localStorage.getItem("basket")) || [];
        let imgs=this.parentElement.parentElement.parentElement.querySelector("img").getAttribute("src").split("/")
        let img=imgs[imgs.length-1]
        let id=this.parentElement.parentElement.parentElement.getAttribute("data-id")
        let name=this.parentElement.parentElement.querySelector(".card-title").innerText
        let price=this.parentElement.parentElement.parentElement.querySelector(".price").innerText
        let existed=basket.find((item)=>{
           return item.id == id
        })
            
        if(!existed){
            let item={id,img,name,price,count:1}
            basket.push(item)
        }
        else{
            existed.count++;
        }
        localStorage.setItem("basket",JSON.stringify(basket))
        if (countArea) {
            GetCount()
        }
        if (priceArea) {
            GetPrice()
        }
        AddToCard()
        if (tBody) {
            if (tBody.firstChild) {
                tableZone.style.display="none"
            }
        }
    })
})
if (countArea) {
    GetCount()
}
if (priceArea) {
    GetPrice()
}
function GetCount() {
    let CountBasket=JSON.parse(localStorage.getItem("basket")) || []
    let count=CountBasket.reduce((total,val)=>{
       return total+=val.count;
    },0)
    countArea.innerText=count
    console.log(count);
}
function GetPrice() {
    let Basket=JSON.parse(localStorage.getItem("basket")) || []
    let totalPrice=Basket.reduce((total,val)=>{
        return total+=val.count * val.price;
     },0)
     priceArea.innerText=totalPrice;
}
function AddToCard() {

        
        let basket=JSON.parse(localStorage.getItem("basket"))

        basket.forEach((obj)=>{

            let tr=document.createElement("tr")
            let td1=document.createElement("td")
            let td2=document.createElement("td")
            let image=document.createElement("img")
            image.style.width="100%"
            let td3=document.createElement("td")
            let td4=document.createElement("td")
            let tdCount=document.createElement("td")
            let tdId=document.createElement("td")
            tdId.innerText=obj.id
            tdId.id="id"
            tdCount.innerText=obj.count
            let btn=document.createElement("button")
            btn.className="btn btn-danger"
            btn.innerText="X"
            image.src=`./assets/img/${obj.img}`
            td1.append(image)
            td2.innerText=obj.name
            td3.innerText=obj.price
            td4.append(btn)
            tr.append(td1)
            tr.append(td2)
            tr.append(td3)
            tr.append(tdCount)
            tr.append(tdId)
            tr.append(td4)
        
            if (tBody) {
                
                tBody.append(tr)

            }
            btn.addEventListener("click",function(e){
                let basket=JSON.parse(localStorage.getItem("basket"))
                let res=basket.find((val)=>{
                  return  val.id==e.target.parentElement.parentElement.querySelector("#id").innerText
                })
                

                let map=basket.map((val)=>{
                    if (val.id!=res.id) {
                        return val
                    }
                })
                console.log(map);

                
               let aaa= map.filter((val)=>{
                return val;
               })
                console.log(aaa);
                localStorage.setItem("basket",JSON.stringify(aaa))
                e.target.parentElement.parentElement.remove();
                
                if (tBody) {
                    if (!tBody.firstElementChild) {
                        tableZone.style.display="none"
                        priceZone.style.display="none"
                        empty.style.display="block"
                        empty.style.textAlign="center"
                    }
                    else{
                        empty.style.display="none"
                    }
                }
            })
            
        })
        
        
        // 
        
}
window.addEventListener("DOMContentLoaded",function(){
    if (tBody) {
        if (!tBody.firstElementChild) {
            tableZone.style.display="none"
            priceZone.style.display="none"
            empty.style.display="block"
            empty.style.textAlign="center"
        }
        else{
            empty.style.display="none"
        }
    }
    
})
AddToCard()