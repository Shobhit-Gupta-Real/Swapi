import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Resident = ({ residentUrl }) => {
  console.log(residentUrl);

  const [residentData, setResidentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchResident() {
    setIsLoading(true);
    const response = await fetch(residentUrl);
    const data = await response.json();
    console.log("iteratirve", data);
    setResidentData(data);
    setIsLoading(false);
  }

  useEffect(() => {
    // fetchResident();
  }, []);

  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Resident</AccordionTrigger>
          <AccordionContent>
            {isLoading ? (
              <>
                <p>Name: </p>
                <p>Height: </p>
                <p>Mass: </p>
                <p>Hair Color: </p>
                <p>Skin Color: </p>
                <p>Eye Color: </p>
                <p>Birth Year: </p>
                <p>Gender: </p>
                <p>homeworld: </p>
                <p>films: </p>
              </>
            ) : (
              <>
                <p>Name: {residentData.name}</p>
                <p>Height: {residentData.height}</p>
                <p>Mass: {residentData.mass}</p>
                <p>Hair Color: {residentData.hair_color}</p>
                <p>Skin Color: {residentData.skin_color}</p>
                <p>Eye Color: {residentData.eye_color}</p>
                <p>Birth Year: {residentData.birth_year}</p>
                <p>Gender: {residentData.gender}</p>
                <p>homeworld: {residentData.homeworld}</p>
                <p>films: {residentData.films}</p>
              </>
            )}
            <div className="text-center ">
              <Button
                onClick={() => {
                  fetchResident();
                }}
                className="bg-[#0708454e] text-white border border-[#7b7ba195] rounded-full hover:bg-[#4e41b592] focus:outline-none focus:shadow-outline pb-[10px]"
              >
                Get Resident
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Resident;
