import './input.css'
function Input({type, placeholder,svg,...field}:{type:string, placeholder:string, svg:string}) {
  return (
  <div className="input">
    <div className="relative">
      <div className="input-icon">
        <img src={svg}/>
      </div>
      <input
        type={type}
        id={placeholder}
        className="input-field"
        placeholder={placeholder}
        {...field}
      />
      {field?.disabled&&<img src="./assets/tick.svg" className='check-icon'/>}
    </div>
  </div>
  )
}

export default Input
