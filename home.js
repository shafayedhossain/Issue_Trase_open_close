const allBtn =document.getElementById("all-btn");
const container = document.getElementById("container")

const loadAll =() =>{
   
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues ")
     .then(res => res.json())
    .then(json =>{
       console.log(json.data);
       allBtn.innerText = `All (${json.data.length})`

    json.data.forEach(issue => {
        const div = document.createElement("div");
       const borderColor = issue.status === "open" ? "border-t-green-500" : "border-t-violet-500";

        div.innerHTML =`
        <div class=" space-y-2 w-[260px]  border-t-4 border-gray-100 shadow-md p-3 ms-3 ${borderColor} rounded-md">
      <div class="icon flex justify-between p-2">
      <div class="w-4 h-4 rounded-full border border-green-500 border-dashed bg-green-100 p-2.5 shadow-md"></div>
       <p class="w-[80px] h-[24px] bg-red-300 text-red-500  text-center rounded-md">${issue.priority}</p>
      </div>
           <h2 class="font-bold">${issue.title}</h2>
      <p class="line-clamp-2 text-gray-500 text-[12px]">${issue.description}Lorem ipsum dolor sit amet 
         consectetur adipisicing elit. <br> Consectetur.</p>
         <div class="flex gap-2 py-3 px-2">
         ${issue.labels.map(label => `<p class="W-[60px] h-[24px] p-1   bg-yellow-300 rounded-md text-red-500
             text-center text-[12px] font-medium">${label}</p>`).join('')}
           
         </div>
            <div class="border border-gray-100 opacity-10"><hr></div>
            <div class="flex gap-2">
                <div>
                    <p class="text-gray-500 text-[12px]">${issue.author}</p>
                    <p class="text-gray-500 text-[12px]">${issue.assignee}</p>
              </div>
                  <p class="text-gray-500 text-[12px]">${issue.createdAt}</p>
                <p class="text-gray-500 text-[12px]">${issue.updatedAt}</p>
            </div>
     </div>
     </div>
        
        
        `
        container.appendChild(div);
        
    });
    
    })
}


loadAll();