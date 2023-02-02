
 
// We are deconstructing props object directly in the parentheses of the function
function ClubCard ( { name, streetName, streetNumber, image } ) {
  
  return (
    <div className="bg-white drop-shadow-lg flex items-center flex-col w-96 rounded-2xl m-8 p-5 ">
      <h1>{name}</h1>
      <p>{streetName},{streetNumber}</p>
      <img className="img-card" src={image} alt={image} />
      
    </div>
  );
}
 
export default ClubCard;