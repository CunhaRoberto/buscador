import{useState} from 'react'
import {FiSearch} from 'react-icons/fi'
import { BsCalendar2DateFill } from "react-icons/bs";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './styles.css'
import api from './services/api'
import Select from 'react-select';

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})
  const [selectedDate, setSelectedeDate] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null);


  const options = [
    { value: 'chocolate', label: '23/06/24 -  ORIGEM  SAO JOSE DO RIO PRETO  - DESTINO SAO PAULO' },
    { value: 'strawberry', label: '28/06/24 - ORIGEM  SAO PAULO - DESTINO SAO JOSE DO RIO PRETO' },
    
  ];

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
  }

  function formatCPF(cpf) {  
    cpf = cpf.replace(/\D/g, '');     
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

 async function handleSearch(){
  if(input === ''){
    alert("Nenhum CEP foi informado." )
    return
  }
  /* if(input.length < 8 || input.length > 8){
    alert("CEP informado é inválido." )
    return
  } */

  
  try{
    const baseURL = 'https://user-api-p9ru.onrender.com/v1/user/id?id=';
    const url = `${baseURL}${input}`;
    const response = await api.get(url) 
    setCep(response.data)  
    console.log(response.data)
    setInput('')   
    console.log(cep) 

  }catch{
    alert("Algo de errado aconteceu." )  
    setInput('')  
  }


  
const dateNew = formatDate(cep.created_at)
 }
 return (
  <div className="container">
    <h1 className="title"> 
     Viagem Segura - CPI-5
    </h1>

    <div className="container2">

          <div className="containerInput">
            <div className="datePickerWrapper">
              <DatePicker 
                selected={selectedDate}
                onChange={(date) => setSelectedeDate(date)}
                
                id='dateTravel'
                placeholderText='Data da viagem'
                dateFormat={"dd/MM/yyyy"}
              />
              <button className="buttonCalendar" onClick={handleSearch}>
                <BsCalendar2DateFill size={25} color='#000'/>
              </button>
            </div> 
          </div>

        <div className="containerInput">
          <div className="containerSelect">
            <Select
            placeholder=' Selecione a viagem'
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
          </div> 

          
               
       
        </div> 
      

        {Object.keys(cep).length > 0 && (
          <main className='main'>
            <h2>Nome: {cep.name}</h2>
            <span>Email: {cep.email}</span>
            <span>CPF: {formatCPF(cep.cpf)}</span>
            <span>Data do cadastro: {formatDate(cep.created_at)}</span>
          </main>
        )}

      </div>
    </div>
    
);
}

export default App;
