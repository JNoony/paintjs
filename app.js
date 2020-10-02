const canvas = document.getElementById('jsCanvas');

/* -----------------------------
   canvas 설정
 - 캔버스 사이즈를 css가 아닌 js로 한번더 정해줘야한다 = 실제 픽셀사이즈
----------------------------- */
const ctx = canvas.getContext('2d');
const colors = document.querySelectorAll('.jsColor');
const range = document.querySelector('#jsRange');
const mode = document.querySelector('#jsMode');
const save = document.querySelector('#jsSave');
const reset = document.querySelector('#jsReset');

const INIT_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;
//실제 픽셀사이즈
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
//defalut setting
ctx.fillStyle = '#fff';
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.strokeStyle =INIT_COLOR;
// ctx.fillStyle = INIT_COLOR; 
ctx.lineWidth = 2.5;

//color 클릭 감지용
let painting = false;
//버튼 감지용
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    // console.log(event);  //마우스 움직임 전체 좌표확인
    //캔버스안 순수 좌표
    const x = event.offsetX;
    const y = event.offsetY;

    //path line만들기
    if(!painting){
        /* painting == false
         - 클릭하지 않은 상태에서 마우스가 캔버스 위에서 움직일때 
            보이지 않는 path 그리기
        */
        ctx.beginPath();
        ctx.moveTo(x, y);

        // console.log('creating path in x : ',x,', y : ',y);
    }else{
        /* painting == true
         - 클릭이 되면 보이는 stroke 그리기
         - lineTo와 stroke는 마우스가 움직이는 동안 path를 내내 만드는거임
        */
        ctx.lineTo(x, y); //클릭하고 있을때 이전위치에서 현재위치까지 라인 좌표
        ctx.stroke();

        // console.log('creating line in x : ',x,', y : ',y);
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color; 
    ctx.fillStyle = ctx.strokeStyle;
    // console.log(event.target.style)
}

function handleRangeChange(event){
    const stroke = event.target.value;
    ctx.lineWidth = stroke;
    // console.log(event.target.value)
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = 'mode-strok';
    }else{
        filling = true;
        mode.innerText = 'mode-fill';
    }
    console.log(event)
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,canvas.width,canvas.height)
    } 
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth()+1;
    const d = today.getDate();
    const h = today.getHours();
    const mm = today.getMinutes();
    const s = today.getSeconds();

    link.href = image;
    link.download = `paintJS[${y}-${m}-${d} ${h}_${mm}_${s}]`;
    link.click(); 
}

function handleReset(){
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = '#fff';
}


// 이벤트 발생
if(canvas){
    canvas.addEventListener('mousemove', onMouseMove) //마우스 움직임
    canvas.addEventListener('mousedown', startPainting) //마우스 클릭 됐을때
    canvas.addEventListener('mouseup', stopPainting) //마우스 클릭 뗐을때
    canvas.addEventListener('mouseleave', stopPainting ) //마우스가 캔버스를 떠났을때

    canvas.addEventListener('click', handleCanvasClick ) 
    canvas.addEventListener('contextmenu', handleCM ) //마우스가 오른쪽 버튼 눌렀을때
}

if(colors){
    // 여러개의 클래스를 가진 버튼들을 배열로 만들어서 클릭 감지
    Array.from(colors).forEach(color => 
        color.addEventListener('click', handleColorClick)
    )
}

if(range){
    //input tag 이벤트 변화 감지
    range.addEventListener('input',handleRangeChange )
}

if(mode){
    //input tag 이벤트 변화 감지
    mode.addEventListener('click',handleModeClick )
}

if(save){
    save.addEventListener('click', handleSaveClick)
}

if(reset){
    reset.addEventListener('click', handleReset )
}