
 
// We are deconstructing props object directly in the parentheses of the function
function ClubCard ( { name, streetName, streetNumber, image } ) {
  
  return (
    <div className="Club-card">
      <h1>{name}</h1>
      <p>{streetName},{streetNumber}</p>
      <img className="img-card" src={image} alt={image} />
      
    </div>
  );
}
 
export default ClubCard;