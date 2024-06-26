export interface weatherData {
    coord: Coord
    weather?: Weather[]
    base: string
    main: Main
    visibility?: number|string
    wind?: Wind
    clouds?: Clouds
    dt: number|string
    sys: Sys
    timezone: number|string
    id: number|string
    name: string
    cod: number|string
  }
  
  export interface Coord {
    lon: number|string
    lat: number|string
  }
  
  export interface Weather {
    id: number|string
    main: string
    description: string
    icon: string
  }
  
  export interface Main {
    temp: number|string
    feels_like: number|string
    temp_min: number|string
    temp_max: number|string
    pressure: number|string
    humidity: number|string
  }
  
  export interface Wind {
    speed: number|string
    deg: number|string
    gust: number|string
  }
  
  export interface Clouds {
    all: number
  }
  
  export interface Sys {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }
  export interface tabs { 
    title:string, 
    zip:string, 
    name: string
   }