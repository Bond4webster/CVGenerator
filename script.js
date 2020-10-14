const photoInput = document.getElementById('photo-upload')

const hobbyAddHeader= document.getElementById('inputHeaderHobby')
const hobbyListElement = document.getElementById('hobbyList')
const hobbyList = [];

const skillsAddHeader = document.getElementById('inputHeaderSkills')
const skillsListElement= document.getElementById('skillsList')
const skillsList = [];

const person ={
    fio:'',
    year:'',
    phone:'',
    email:'',
    photo:'',
    hobbyList,skillsList
}

function photoInfo(){
    const div = document.getElementsByClassName('photo')[0]
    const reader = new FileReader();

    reader.onload = function (e) {
        const result = e.target.result+''
        person.photo = result
        let img = document.getElementById('blah')
        if(img){
            img.setAttribute('src', result);
        }else{
            img = document.createElement('img')
            img.id = 'blah';
            img.setAttribute('src', result);
            div.append(img)
        }
    }
    reader.readAsDataURL(photoInput.files[0]);
}
photoInput.addEventListener('change',()=>{
    if (photoInput.files.length){
        photoInfo()
    }})


hobbyAddHeader.addEventListener('keydown',event =>{
    if((event.key === 'Enter' ) && (hobbyAddHeader.value)){
        hobbyList.push({header:hobbyAddHeader.value,info:[]})
        hobbyAddHeader.value = '';
        upgradeView(hobbyAddHeader,hobbyListElement,hobbyList)
    }
})
skillsAddHeader.addEventListener('keydown',event =>{
    if((event.key === 'Enter' ) && (skillsAddHeader.value)){
        skillsList.push({header:skillsAddHeader.value,info:[]})
        skillsAddHeader.value = '';
        upgradeView(skillsAddHeader,skillsListElement,skillsList)
    }
})

function upgradeView (addHeader,listElement,list){
    listElement.innerHTML = '';

    list.forEach((e,i)=>{
        const liElement = document.createElement('li');
        liElement.innerHTML = e.header;
        liElement.id = 'id_'+i;
        listElement.append(liElement);

        const btnDel = document.createElement('button')
        btnDel.innerHTML= 'Удалить заголовок'
        btnDel.id = 'btnDel_id_'+i
        btnDel.onclick = delHeaderHandler
        liElement.append(btnDel)

        const input = document.createElement('input')
        input.type='text'
        input.placeholder='Введите содержание'
        input.className='inputHeader'
        input.id = 'input_id_'+i
        input.addEventListener('keydown',event =>{
            if((event.key === 'Enter' ) && (input.value)){
                list[i].info.push(input.value)
                input.value = '';
                upgradeView(addHeader,listElement,list)
            }
        })
        liElement.append(input)

        const ul = document.createElement('ul')
        ul.style.margin = '15px'
        liElement.append(ul)

        e.info.forEach((elem,ind)=>{
            const liChild = document.createElement('li')
            liChild.innerHTML = elem
            liChild.id = i+'_Child_id_'+ind
            ul.append(liChild)

            const btnDel = document.createElement('button')
            btnDel.innerHTML= 'Удалить'
            btnDel.id = i+'_btnDel_id_'+ind
            btnDel.onclick = delInfoHandler
            liChild.append(btnDel)

        })
    })

    function delHeaderHandler(e){
        const ind = e.target.id.split('_')[2]
        list.splice(ind,1)
        upgradeView(addHeader,listElement,list)
    }

    function delInfoHandler(e){
        const number = e.target.id.split('_')[0]
        const ind = e.target.id.split('_')[3]
        list[number].info.splice(ind,1)
        upgradeView(addHeader,listElement,list)
    }
}


function isCorrectFIO() {
    person.fio =[]
    const label =document.getElementById('fio').childNodes[5]
    const fio= document.getElementById('fio').childNodes[1].value
    const fioArr = fio.split(' ');
    if (!fio || fioArr.length !== 3) {
        label.style.color='red'
    }else{
        fioArr.forEach(e=>{
            if (/(^[A-Z]{1}[a-z]{1,14})|(^[А-Я]{1}[а-я]{1,14})/.test(e)){
                person.fio.push(e)
                label.style.color ='#07575b'
            } else {
                label.style.color='red'
                person.fio=[]
            }
        })

    }
}

function isCorrectYear(){
    person.year = ''
    const label =document.getElementById('year').childNodes[5]
    const year= document.getElementById('year').childNodes[1].value
    if(year <2020 && year>1900){
        person.year = year
        label.style.color ='#07575b'
    }else {
        label.style.color ='red'
    }
}

function isCorrectPhone(){
    person.phone = ''
    const label =document.getElementById('phone').childNodes[5]
    const phone= document.getElementById('phone').childNodes[1].value
    if(phone.length>4 && phone.length<15){
        person.phone = phone
        label.style.color ='#07575b'
    }else {
        label.style.color ='red'
    }
}

function isCorrectEmail(){
    person.email = ''
    const label =document.getElementById('email').childNodes[5]
    const email= document.getElementById('email').childNodes[1].value
    if(/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(email)){
        person.email = email
        label.style.color ='#07575b'
    }else {
        label.style.color ='red'
    }
}

function saveCV(){

    for(let k in person){
        if(person[k] == ''){
            alert(`Заполните ${k}`)
            return
        }
    }
    const btnArr = document.getElementsByTagName('button');
    for(let i =0;i<btnArr.length;i++){
        btnArr[i].style.opacity='0'
    }
    const inputArr = document.getElementsByTagName('input');
    for(let i =5;i<inputArr.length;i++){
        inputArr[i].style.opacity='0'
    }
    print()
    for(let i =0;i<btnArr.length;i++){
        btnArr[i].style.opacity='1'
    }
    for(let i =5;i<inputArr.length;i++){
        inputArr[i].style.opacity='1'
    }
}