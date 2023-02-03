import partyPlaceholder from "../assets/defaultPartyImg.png"

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
 
// We are deconstructing props object directly in the parentheses of the function
function ClubCard ( { name, streetName, streetNumber, image } ) {
  
  return (

    <Card className="w-96">
      <CardHeader color="gray" className="relative h-15">
        <img
          src={image !== "" ? image : partyPlaceholder}
          alt={image}
          className="h-full w-full"
        />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h5" className="mb-2">
          {name}
        </Typography>
        <Typography>
          ...
        </Typography>
      </CardBody>
      <CardFooter divider className="flex items-center justify-between py-3">
        <Typography variant="small">€15</Typography>
        <Typography variant="small" color="gray" className="flex gap-1">
          <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
          <p>{streetName},{streetNumber}</p>
        </Typography>
      </CardFooter>
    </Card>



    /* <div className="bg-white shadow-lg flex items-center flex-col w-96 rounded-2xl m-8 p-5 ">
      <h1>{name}</h1>
      <p>{streetName},{streetNumber}</p>
      <img className="img-card" src={image} alt={image} />
      
    </div> */
  );
}
 
export default ClubCard;