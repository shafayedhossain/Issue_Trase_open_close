const openBtn =document.getElementById("open-btn");
const allBtn =document.getElementById("all-btn");
const closeBtn =document.getElementById("close-btn");
let allIssues = [];

const updateIssueCount = (count) => {
    document.getElementById("issue-count").innerText = `${count} Issues`;
};

const manageSpinner = (manage) =>{
    if(manage=== true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("container").classList.add("hidden");
    }
    else{
        document.getElementById("container").classList.remove("hidden")
        document.getElementById("spinner").classList.add("hidden")
    }
}


const loadButton = () =>{
    manageSpinner(true);
   
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) =>res.json())
    .then(json =>{
        allIssues =json.data;
        console.log(allIssues.length)
        displayLesson(allIssues);
    });
    
};
openBtn.addEventListener("click", () => {

const openIssues = allIssues.filter(issue => issue.status === "open");
displayLesson(openIssues);
    updateIssueCount(openIssues.length);
});

closeBtn.addEventListener("click", () => {
    const closedIssues = allIssues.filter(issue => issue.status === "closed");
displayLesson(closedIssues);
    updateIssueCount(closedIssues.length);


});
allBtn.addEventListener("click", () => {
    displayLesson(allIssues);
        updateIssueCount(allIssues.length);
});



const displayLesson =(lessons) =>{
    
    const levelContainer = document.getElementById("container");
     
    levelContainer.innerHTML = "";
    for(let issue of lessons){
       console.log(issue);
       const divBtn = document.createElement("div");
        const borderColor = issue.status === "open" ? "border-t-green-500" : "border-t-violet-500";

        divBtn.innerHTML =`
        <div class=" space-y-2 w-[260px]  border-t-4 border-gray-100 shadow-md p-3 ${borderColor} rounded-md">
      <div class="icon flex justify-between p-2">
      <div class="w-4 h-4 rounded-full border border-green-500 border-dashed bg-green-100 p-2.5 shadow-md"></div>
       <p class="w-[80px] h-[24px] bg-red-300 text-red-500  text-center rounded-md">${issue.priority}</p>
      </div>
           
      <h2 onclick="loadWord(${issue.id})" class="font-bold cursor-pointer">${issue.title}</h2>
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
        
       
       `;
       levelContainer.appendChild(divBtn);
    }
    manageSpinner(false);
};

const loadWord= async (id)=>{
    manageSpinner(false)
 const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res =await fetch(url);
  const details = await res.json();
  displayWord(details.data);
};
const displayWord = (word) =>{
         console.log(word);
         const detailsBox= document.getElementById("details-container");
         
         detailsBox.innerHTML =     `
    
              <div class="text-2xl font-bold">
     <h2>${word.title}</h2>
        </div>
       <div class="flex gap-8 text-gray-500">
          <div class="badge badge-success">${word.status}</div>
          <li>Opened by ${word.assignee}</li>
          <li>22/02/2026</li>
       </div>
       <div class="flex gap-2 py-3 px-2">
          ${word.labels.map(label=> `<p class=" W-[60px] h-[24px] p-1   bg-yellow-300 rounded-md text-red-500
          text-center text-[12px] font-medium">${label}</p>` ).join('')} 
       </div>
          <p class="line-clamp-2">${word.description}</p>
    <div class="flex justify-around p-3 bg-gray-300 ">
        <div>
            <p><span class="text-gray-500">Assignee: </span><br> <span class="font-bold">${word.assignee}</span></p>
        </div>
        <p><span class="text-gray-500">Priority : </span><br> <span class="w-[80px] h-[24px] bg-red-300 text-red-500  text-center rounded-md p-1">${word.priority}</span></p>

    </div>
         
         `;
         document.getElementById("word_Modal").showModal();

}
   
loadButton();

allBtn.addEventListener("click", () => {
    setActiveButton("all-btn");
});

openBtn.addEventListener("click", () => {
    setActiveButton("open-btn");
});

closeBtn.addEventListener("click", () => {
    setActiveButton("close-btn");
});

function setActiveButton(id) {
    allBtn.classList.remove('bg-primary', 'text-white')
    openBtn.classList.remove('bg-primary', 'text-white')
    closeBtn.classList.remove('bg-primary', 'text-white')
    
    allBtn.classList.add('bg-gray-300', 'text-black')
    openBtn.classList.add('bg-gray-300', 'text-black')
    closeBtn.classList.add('bg-gray-300', 'text-black')

     const activeBtn = document.getElementById(id);

    activeBtn.classList.remove('bg-gray-300', 'text-black');
    activeBtn.classList.add('bg-primary', 'text-white');
}
    



// const container = document.getElementById("container")
// let IssueCount = document.getElementById("issue-count");



// const loadAll =() =>{
   
//     fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues ")
//      .then(res => res.json())
//     .then(json =>{
//        console.log(json.data);
//        allBtn.innerText = `All (${json.data.length})`
//        IssueCount.innerText = `${json.data.length}`

//     json.data.forEach(issue => {
//         const div = document.createElement("div");
    //    const borderColor = issue.status === "open" ? "border-t-green-500" : "border-t-violet-500";

    //     div.innerHTML =`
    //     <div class=" space-y-2 w-[260px]  border-t-4 border-gray-100 shadow-md p-3 ${borderColor} rounded-md">
    //   <div class="icon flex justify-between p-2">
    //   <div class="w-4 h-4 rounded-full border border-green-500 border-dashed bg-green-100 p-2.5 shadow-md"></div>
    //    <p class="w-[80px] h-[24px] bg-red-300 text-red-500  text-center rounded-md">${issue.priority}</p>
    //   </div>
    //        <h2 class="font-bold">${issue.title}</h2>
    //   <p class="line-clamp-2 text-gray-500 text-[12px]">${issue.description}Lorem ipsum dolor sit amet 
    //      consectetur adipisicing elit. <br> Consectetur.</p>
    //      <div class="flex gap-2 py-3 px-2">
    //      ${issue.labels.map(label => `<p class="W-[60px] h-[24px] p-1   bg-yellow-300 rounded-md text-red-500
    //          text-center text-[12px] font-medium">${label}</p>`).join('')}
           
    //      </div>
    //         <div class="border border-gray-100 opacity-10"><hr></div>
    //         <div class="flex gap-2">
    //             <div>
    //                 <p class="text-gray-500 text-[12px]">${issue.author}</p>
    //                 <p class="text-gray-500 text-[12px]">${issue.assignee}</p>
    //           </div>
    //               <p class="text-gray-500 text-[12px]">${issue.createdAt}</p>
    //             <p class="text-gray-500 text-[12px]">${issue.updatedAt}</p>
    //         </div>
    //  </div>
    //  </div>
        
        
//         `
//         container.appendChild(div);
        
//     });
    
//     })
// }


// loadAll();