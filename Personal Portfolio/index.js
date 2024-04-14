
function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}
let sleeptime=100;
const el=document.getElementById('typewriter');
var jobs=['Frontend Developer', 'Backend Developer' , 'Penetration Tester'];
let job_index=0;

const writeloop=async()=>{
    while (true){
        let job= jobs[job_index++%jobs.length];
        for(let i=0;i<job.length;i++){
            el.innerText=job.substring(0,i+1);
            await sleep(sleeptime);
        }
        await sleep(1000);

        for(let i=job.length-1;i>=0;i--){
            el.innerText=job.substring(0,i+1);
            await sleep(sleeptime);
        }

    }
}
writeloop();
