
export function validateRoute(name, city, time, driver){

  if(!city.trim()){
    return "Ingrese el lugar";
  }

  return true;
}

export function validateStudent(name,route){

  if(!name.trim()){
    return "Ingrese nombre del estudiante";
  }

  if(!route){
    return "Seleccione una ruta";
  }

  return true;
}