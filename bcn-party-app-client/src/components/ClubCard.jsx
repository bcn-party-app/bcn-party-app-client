
 
// We are deconstructing props object directly in the parentheses of the function
function ClubCard ( { name, streetName, streetNumber, image } ) {
  
  return (
    <div className="Club-card">
      <h2>{name}</h2>
      <p>{streetName},{streetNumber}</p>
      <img src={image} alt={image} />
    </div>
  );
}
 
export default ClubCard;