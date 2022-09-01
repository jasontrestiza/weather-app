import React from "react"
import axios from "axios"
import {BsSunFill,BsCloudyFill,BsFillCloudHazeFill,BsFillCloudRainFill} from "react-icons/bs"

function App() {

  
  const [data,setData] = React.useState([])
  const [city,setCity] = React.useState('')
  // const [weather,setWeather] = React.useState('')
  const [error,setError] = React.useState('')
  let b;

  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2266b1ecf9dd81686d9f5edfc5fe3cd1&units=metric`
  
  function renameWeather(){
  
    if(data.weather){
      if(data.weather[0].main === 'Clouds'){
        b = 'Cloudy'
        return b
      }
      else if(data.weather[0].main === 'Rain'){
        b = 'Rainy'
        return b
      }
      else if(data.weather[0].main === 'Haze'){
        b = 'Hazy'
        return b
      }
      else if(data.weather[0].main === 'Clear'){
        b = 'Sunny'
        return b
      }
    }
  }

  function weatherIcon(){
    if(b === 'Cloudy'){
      return <BsCloudyFill className="inline-block relative text-white/60"/>
    }
    else if(b === 'Rainy'){
      return <BsFillCloudRainFill className="inline-block relative text-blue-300/50"/>
    }
    else if(b === 'Hazy'){
      return <BsFillCloudHazeFill className="inline-block relative text-blue-300/40"/>
    }
    else if(b === 'Sunny'){
      return <BsSunFill className="inline-block relative text-amber-600"/>
    }
    else{
      return null
    }
  }
  
  const handleChange = (event) => {
    setCity(event.target.value)
    
  }


  const searchLocation = async (event) => {
    if(event.key === 'Enter'){
      try{
      await axios.get(api).then((response)=>{
        setData(response.data)
      })
      setCity('')
      setError('')
      }
      catch(error){
      
        setError(error)
      }
    }
  }

  
  return (
    <div className="w-full h-screen relative  text-white">
      <div className="bg-bg-image bg-cover bg-no-repeat bg-center absolute w-full h-screen">
        <div className="bg-black/50 h-full w-full m-auto ">
          <div className="flex flex-col justify-between max-w-[700px] max-h-[90%] top-10  m-auto px-4  relative md:top-5 md:px-0 md:h-[600px]">
              
              {
              error 
              ? <p className=" text-sm text-center max-w-[80%] md:max-w-[50%] w-full my-2  items-center justify-center m-auto text-red-500 bg-black/40 rounded-full"
                    style={{display: error ? 'flex' : 'none'}}
              >
                Location not found. Please try again.
                </p> 
              : null
              }

              <div className="flex flex-row justify-center items-center m-auto w-full h-screen">
                <input 
                  className="rounded-full m-auto py-2 px-4 bg-white/40 text-black/40 outline-transparent w-[90%]  
                           focus:outline-orange-500/40 focus:outline-none md:w-[70%] placeholder:text-black/40" 
                  type="text" 
                  placeholder="Search location.."
                  name="city" 
                  onChange={handleChange}
                  onKeyPress={searchLocation}
                />
              </div>

              <div className="w-full h-full my-4 mx-auto p-4 py-40 md:py-20"
                   style={{display: data.main ? 'block' : 'none'}}>
                <div>
                  <p className="text-2xl tracking-widest">
                    {
                      data.name 
                    
                    }
                  <span className="text-sm text-gray-300 ">,{data.name ? data.sys?.country : null}</span>
                  </p>
                </div>
                <div>
                  {
                    data.main 
                    ? <p className="text-8xl md:text-6xl font-bold">{data.main.temp.toFixed()}&deg;C</p>
                    : null
                  }
                </div>
                <div className="text-white/60">
                  
                  <p className="text-lg tracking-wider  flex flex-row justify-center items-center text-center py-8 ">
                    {renameWeather()} <span className="px-1 flex justify-center items-center">{weatherIcon()}</span>
                  </p>
                 
                 
                </div>
              </div>

              {data.main ? 
                <div className="flex justify-evenly text-center w-full p-4 rounded-full 
                                bg-gradient-to-r from-orange-500/20 to-red-700/20 md:mx-auto md:w-[60%]"
                     style={{display: data.main ? 'flex' : 'none'}}>
                  <div>
                    {
                      data.main
                      ? <p className="border-b border-orange-700/60 font-bold text-xl text-amber-500">{data.main.feels_like.toFixed()}&deg;C</p>
                      : null
                    }
                    <p className="text-sm text-amber-500">Feels Like</p>
                  </div>
                  <div>
                  {
                      data.main
                      ? <p className="border-b border-orange-700/60 font-bold text-xl text-amber-500">{data.main.humidity}%</p>
                      : null
                    }
                    <p className="text-sm text-amber-600">Humidity</p>
                  </div>
                  <div>
                    {
                      data.wind
                      ? <p className="border-b border-orange-700/60 font-bold text-xl text-amber-700">{data.wind.speed}mph</p>
                      : null
                    }
                    <p className="text-sm text-amber-700">Wind Speed</p>
                  </div>
                </div>
              : null}

          </div>
          
        </div>
        
      </div>
    </div>
  );
}

export default App;
